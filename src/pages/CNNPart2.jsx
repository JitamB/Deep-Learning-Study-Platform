import { useState, useRef, useEffect, useCallback } from "react";
import { Code } from '../components/ui/Code.jsx';
import { Mx, H2, H3, P } from '../components/ui/Typography.jsx';
import { QA } from '../components/ui/QA.jsx';
import { Note, Grid, Card, Table, VizBox } from '../components/ui/Primitives.jsx';
import NavButtons from '../components/layout/NavButtons.jsx';
import SectionNav from '../components/layout/SectionNav.jsx';

/* ══════════════════════════════════════════════════════
   PADDING & STRIDES INTERACTIVE
══════════════════════════════════════════════════════ */
function PaddingStrideExplorer() {
  const [H, setH] = useState(6);
  const [F, setF] = useState(3);
  const [P, setP] = useState(0);
  const [S, setS] = useState(1);
  const canvasRef = useRef(null);

  const H_out_raw = (H - F + 2 * P) / S + 1;
  const H_out = Math.floor(H_out_raw);
  const valid = H_out_raw === H_out && H_out > 0;

  useEffect(() => {
    const cv = canvasRef.current; if (!cv) return;
    const ctx = cv.getContext("2d");
    const W = cv.width, HH = cv.height;
    ctx.clearRect(0, 0, W, HH);

    const paddedSize = H + 2 * P;
    const cellSize = Math.min(28, Math.floor(Math.min(W * 0.45, HH * 0.85) / paddedSize));
    const gridW = paddedSize * cellSize;
    const startX = 18, startY = 18;

    // Draw padded input
    for (let r = 0; r < paddedSize; r++) {
      for (let c = 0; c < paddedSize; c++) {
        const isPad = r < P || r >= H + P || c < P || c >= H + P;
        ctx.fillStyle = isPad ? "rgba(226,75,74,0.18)" : "var(--color-background-secondary)";
        ctx.fillRect(startX + c * cellSize, startY + r * cellSize, cellSize - 1, cellSize - 1);
        ctx.strokeStyle = isPad ? "#E24B4A55" : "var(--color-border-secondary)";
        ctx.lineWidth = 0.5;
        ctx.strokeRect(startX + c * cellSize, startY + r * cellSize, cellSize - 1, cellSize - 1);
        if (isPad && cellSize > 14) {
          ctx.fillStyle = "#E24B4A88"; ctx.font = `${Math.min(9, cellSize - 3)}px var(--font-mono)`;
          ctx.textAlign = "center"; ctx.textBaseline = "middle";
          ctx.fillText("0", startX + c * cellSize + cellSize / 2 - 0.5, startY + r * cellSize + cellSize / 2);
        }
      }
    }

    // Highlight first kernel position
    if (valid && H_out > 0) {
      ctx.fillStyle = "rgba(55,138,221,0.22)";
      ctx.fillRect(startX, startY, F * cellSize - 1, F * cellSize - 1);
      ctx.strokeStyle = "#378ADD"; ctx.lineWidth = 2;
      ctx.strokeRect(startX, startY, F * cellSize - 1, F * cellSize - 1);
    }

    // Labels
    ctx.fillStyle = "var(--color-text-secondary)"; ctx.font = "11px var(--font-sans)"; ctx.textAlign = "left"; ctx.textBaseline = "alphabetic";
    ctx.fillText(`Padded input: ${paddedSize}×${paddedSize}`, startX, startY + paddedSize * cellSize + 14);
    if (P > 0) {
      ctx.fillStyle = "#E24B4A";
      ctx.fillText(`Red border = ${P}px zero padding`, startX, startY + paddedSize * cellSize + 26);
    }
    ctx.fillStyle = "#378ADD";
    ctx.fillText(`Blue = kernel position 0 (${F}×${F})`, startX, startY + paddedSize * cellSize + 38);

    // Draw output grid
    if (valid && H_out > 0) {
      const outCellSize = Math.min(30, Math.floor(Math.min(W * 0.38, HH * 0.8) / H_out));
      const outStartX = startX + gridW + 32;
      const outStartY = startY + (paddedSize * cellSize - H_out * outCellSize) / 2;

      for (let r = 0; r < H_out; r++) {
        for (let c = 0; c < H_out; c++) {
          ctx.fillStyle = "var(--color-background-info)";
          ctx.fillRect(outStartX + c * outCellSize, outStartY + r * outCellSize, outCellSize - 1, outCellSize - 1);
          ctx.strokeStyle = "var(--color-border-info)"; ctx.lineWidth = 0.5;
          ctx.strokeRect(outStartX + c * outCellSize, outStartY + r * outCellSize, outCellSize - 1, outCellSize - 1);
        }
      }
      ctx.fillStyle = "var(--color-text-info)"; ctx.font = "11px var(--font-sans)"; ctx.textAlign = "left";
      ctx.fillText(`Output: ${H_out}×${H_out}`, outStartX, outStartY + H_out * outCellSize + 14);

      // Arrow
      const midY = startY + (paddedSize * cellSize) / 2;
      ctx.strokeStyle = "var(--color-text-tertiary)"; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(startX + gridW + 4, midY); ctx.lineTo(outStartX - 4, midY); ctx.stroke();
      ctx.fillStyle = "var(--color-text-tertiary)"; ctx.font = "11px var(--font-sans)"; ctx.textAlign = "center";
      ctx.fillText("conv", startX + gridW + 18, midY - 5);
    } else {
      ctx.fillStyle = "#E24B4A"; ctx.font = "12px var(--font-sans)"; ctx.textAlign = "left";
      ctx.fillText("⚠ Non-integer output!", 220, HH / 2);
    }
  }, [H, F, P, S, valid, H_out, H_out_raw]);

  return (
    <VizBox>
      <div style={{ display: "grid", gridTemplateColumns: "80px 1fr 44px", gap: 8, marginBottom: 12, fontSize: 12.5, alignItems: "center" }}>
        {[
          ["Input H=W", H, setH, 2, 12, 1],
          ["Filter F", F, setF, 2, 7, 1],
          ["Padding P", P, setP, 0, 4, 1],
          ["Stride S", S, setS, 1, 4, 1]
        ].map(([label, val, set, min, max, step], i) => (
          <div key={i} style={{ display: "contents" }}>
            <span style={{ color: "var(--color-text-secondary)" }}>{label}</span>
            <input type="range" min={min} max={max} step={step} value={val} onChange={e => set(+e.target.value)} />
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, textAlign: "right", color: valid ? "var(--color-text-primary)" : "var(--color-text-danger)" }}>{val}</span>
          </div>
        ))}
      </div>
      <canvas ref={canvasRef} width={500} height={230} style={{ display: "block", margin: "0 auto", maxWidth: "100%" }} />
      <div style={{ marginTop: 10, display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap", fontSize: 13, fontFamily: "var(--font-mono)" }}>
        <span>Formula: ({H} - {F} + 2×{P}) / {S} + 1 =</span>
        <span style={{ fontWeight: 500, color: valid ? "var(--color-text-success)" : "var(--color-text-danger)" }}>
          {valid ? `${H_out} × ${H_out}` : `${H_out_raw.toFixed(2)} ← NOT integer!`}
        </span>
      </div>
    </VizBox>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 1 — PADDING & STRIDES
══════════════════════════════════════════════════════ */
function SectionPaddingStrides() {
  return (
    <div>
      <H2>Problems without padding</H2>
      <Grid cols={2}>
        <Card color="danger" title="Problem 1: Spatial shrinkage">
          Every conv layer reduces spatial dimensions. With a 3×3 kernel and no padding: 28→26→24→...→4. After just 12 layers on a 28×28 image, you're left with a tiny 4×4 feature map — too much information is lost before deep features can form.
        </Card>
        <Card color="warning" title="Problem 2: Border pixel bias">
          Without padding, a corner pixel is visited by the kernel only once (in its one overlapping position). A center pixel is visited F² times. This means border pixels contribute far less to the learned features — information at image edges is systematically underused.
        </Card>
      </Grid>

      <H2>What is padding?</H2>
      <P>Padding adds extra rows/columns of zeros (or other values) around the input before applying the convolution. This gives the kernel 'room' to be centered on border pixels.</P>
      <Mx block>{`  Without padding (VALID):
    Input 6×6, kernel 3×3, stride 1:
    H_out = (6 - 3)/1 + 1 = 4  →  output is 4×4  (shrank!)

  With padding P=1 (SAME):
    Input becomes 8×8 (padded), kernel 3×3, stride 1:
    H_out = (6 - 3 + 2×1)/1 + 1 = 6  →  output is 6×6  (preserved!)

  SAME padding formula:
    P = (F - 1) / 2    (works for odd F: 3→P=1, 5→P=2, 7→P=3)

  Zero padding: most common — pad with 0s
  Reflect padding: mirror border values — avoids zero artifacts
  Replicate padding: repeat edge pixels`}</Mx>

      <H2>Interactive: padding + stride explorer</H2>
      <P>Drag the sliders. Watch the padded input (red border = zeros) and output grid update. Set stride &gt; 1 to see spatial shrinkage. Try non-divisible combos to see the decimal problem.</P>
      <PaddingStrideExplorer />

      <H2>Strides — controlling step size</H2>
      <P>Stride S is how many pixels the kernel moves at each step. Default S=1 moves one pixel at a time. S=2 skips every other position — a fast way to downsample without a pooling layer.</P>
      <Mx block>{`  Stride = 1 (default):  kernel moves 1 pixel → fine-grained output
  Stride = 2:             kernel moves 2 pixels → roughly halves output
  Stride = 3:             moves 3 pixels → output ≈ 1/3 of input

  General formula:
    H_out = ⌊(H_in - F + 2P) / S⌋ + 1

  Example — same input (7×7), same kernel (3×3), no padding:
    S=1:  (7-3)/1+1 = 5×5   (moderate shrink)
    S=2:  (7-3)/2+1 = 3×3   (aggressive shrink)
    S=3:  (7-3)/3+1 = 2×2   (very aggressive)

  Note the FLOOR: (7-3)/2 = 2.0 exactly here.
  Non-integer case: (6-3)/2 = 1.5 → floor = 1 (last column skipped!)`}</Mx>

      <H2>The decimal / edge case problem</H2>
      <Note color="warning" icon="ti-alert-triangle">
        When <Mx>(H_in - F + 2P) % S ≠ 0</Mx>, the kernel's last position would partially extend beyond the input. The floor function truncates — some pixels at the right/bottom edge are silently dropped.
      </Note>
      <Mx block>{`  Problem: H=5, F=3, P=0, S=2
    H_out = (5-3+0)/2 + 1 = 2.0 + 1 = 3.0  ← OK, exact
    Positions: col=0, col=2 → col=4 would need pixels 4,5,6 → out of bounds!
    Framework behavior: DROPS the last step → output = 2 (not 3)

  Problem: H=6, F=3, P=0, S=2
    H_out = (6-3)/2 + 1 = 1.5 + 1 = 2.5 → floor = 2
    Column 4 would cover pixels [4,5,6] → col 6 doesn't exist → skipped

  Solutions:
  1. TensorFlow SAME padding + stride: automatically pads to make it work
     tf.keras.layers.Conv2D(filters, F, strides=S, padding='same')

  2. Ensure (H - F) is divisible by S before choosing hyperparameters

  3. PyTorch 'same' padding mode (added in PyTorch 1.9):
     nn.Conv2d(C_in, C_out, F, stride=S, padding='same')`}</Mx>

      <H2>Why use strides? Two key reasons</H2>
      <Grid cols={2}>
        <Card color="success" title="1. Downsampling without pooling">
          Strided convolutions can replace max pooling for downsampling, but they're learnable — the network learns HOW to downsample optimally. Used heavily in modern architectures (ResNet, All-CNN). Keeps more information than fixed pooling.
        </Card>
        <Card color="success" title="2. Computational efficiency">
          S=2 roughly halves the number of output positions, reducing FLOPs by ~4× (halved in both H and W). This allows deeper networks without memory explosion. Used in the first layer of many large networks (ResNet-50: 7×7 conv, S=2).
        </Card>
      </Grid>

      <H2>Architecture comparison: padding + stride impact</H2>
      <Table
        heads={["Architecture", "Input", "Config", "Output", "Params", "Use case"]}
        rows={[
          ["VALID, S=1", "28×28×1", "F=3,P=0,S=1", "26×26×32", "896", "Max info, shrinks"],
          ["SAME, S=1", "28×28×1", "F=3,P=1,S=1", "28×28×32", "896", "Preserve dims (standard)"],
          ["VALID, S=2", "28×28×1", "F=3,P=0,S=2", "13×13×32", "896", "Fast downsample"],
          ["SAME, S=2", "28×28×1", "F=3,P=1,S=2", "14×14×32", "896", "Clean half-size output"],
          ["Large kernel", "28×28×1", "F=7,P=3,S=2", "14×14×64", "3,200", "ResNet-style stem"],
        ]}
      />

      <H2>MNIST CNN with explicit dimension tracking</H2>
      <Code>{`import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers

# ── Model with SAME padding (recommended) ─────────────────
def build_cnn_same(input_shape=(28,28,1), num_classes=10):
    model = keras.Sequential(name="CNN_SAME")
    model.add(layers.Input(shape=input_shape))                  # (28,28,1)

    model.add(layers.Conv2D(32, (3,3), padding='same',          # SAME: (28,28,32)
                            activation='relu'))
    model.add(layers.MaxPooling2D((2,2)))                        # (14,14,32)

    model.add(layers.Conv2D(64, (3,3), padding='same',          # SAME: (14,14,64)
                            activation='relu'))
    model.add(layers.MaxPooling2D((2,2)))                        # (7, 7, 64)

    model.add(layers.Conv2D(64, (3,3), padding='same',          # SAME: (7, 7, 64)
                            activation='relu'))
    # No pooling here — 7×7 is small enough

    model.add(layers.Flatten())                                  # (7*7*64,) = (3136,)
    model.add(layers.Dense(64, activation='relu'))               # (64,)
    model.add(layers.Dense(num_classes, activation='softmax'))   # (10,)
    return model

# ── Model with VALID padding — watch the shrinkage! ────────
def build_cnn_valid(input_shape=(28,28,1), num_classes=10):
    model = keras.Sequential(name="CNN_VALID")
    model.add(layers.Input(shape=input_shape))                  # (28,28,1)

    model.add(layers.Conv2D(32, (3,3), padding='valid',         # (26,26,32)
                            activation='relu'))
    model.add(layers.MaxPooling2D((2,2)))                        # (13,13,32)

    model.add(layers.Conv2D(64, (3,3), padding='valid',         # (11,11,64)
                            activation='relu'))
    model.add(layers.MaxPooling2D((2,2)))                        # (5, 5, 64)

    model.add(layers.Conv2D(64, (3,3), padding='valid',         # (3, 3, 64)
                            activation='relu'))

    model.add(layers.Flatten())                                  # (576,) — much less!
    model.add(layers.Dense(64, activation='relu'))
    model.add(layers.Dense(num_classes, activation='softmax'))
    return model

# ── Verify dimensions programmatically ───────────────────
model_same  = build_cnn_same()
model_valid = build_cnn_valid()

def print_layer_shapes(model):
    print(f"\\n{'Layer':<35} {'Output Shape'}")
    print("─"*55)
    for layer in model.layers:
        print(f"  {layer.name:<33} {str(layer.output_shape)}")

print_layer_shapes(model_same)
print_layer_shapes(model_valid)

# ── Strides as downsampling replacement ──────────────────
# Replace MaxPool with strided conv — learnable downsampling
model_strided = keras.Sequential([
    layers.Input(shape=(28,28,1)),
    layers.Conv2D(32, (3,3), padding='same', activation='relu'),  # (28,28,32)
    layers.Conv2D(32, (3,3), strides=2, padding='same',           # (14,14,32)
                  activation='relu'),                              # ← stride replaces pool

    layers.Conv2D(64, (3,3), padding='same', activation='relu'),  # (14,14,64)
    layers.Conv2D(64, (3,3), strides=2, padding='same',           # (7, 7, 64)
                  activation='relu'),

    layers.GlobalAveragePooling2D(),                               # (64,)
    layers.Dense(10, activation='softmax'),
])`}</Code>

      <QA q="What is the difference between SAME and VALID padding, precisely?"
          a="<strong>VALID</strong>: P=0. No zeros are added. The kernel only slides where it fully overlaps the input. Output size: H_out = ⌊(H−F)/S⌋+1. Edge pixels contribute to fewer output positions than center pixels. <strong>SAME</strong>: padding is automatically computed so H_out = ⌈H/S⌉ (with S=1, H_out = H exactly). For odd F: P=(F-1)/2. Zeros are added symmetrically around the border. Every pixel contributes equally. SAME is the standard choice for hidden conv layers to avoid uncontrolled shrinkage." />
      <QA q="Why does TensorFlow's 'same' padding produce different results from manual P=(F-1)/2 with even kernels?"
          a="For even kernel sizes (F=2, F=4), (F-1)/2 is not an integer, so equal padding on both sides is impossible. TensorFlow's SAME adds one extra padding row/column on the right/bottom when needed — asymmetric padding. This is why even-sized kernels are rarely used in practice: they create subtle asymmetries and complicate the output dimension calculation. Sticking to odd F (3,5,7) ensures symmetric SAME padding always works cleanly." />
      <QA q="When should you use strided convolutions instead of pooling?"
          a="Use strided convolutions (S=2 conv) instead of MaxPool when: (1) you want the network to learn how to downsample rather than using a fixed max/avg operation — strided conv is parametric and can optimize its own downsampling for the task. (2) In generative models (GANs, autoencoders) where pooling's information loss is harmful. (3) In all-convolutional networks (Springenberg et al., 2015) where pooling is completely removed. Use MaxPool when: you want guaranteed translation invariance, fewer parameters, and the computational savings of a non-parametric operation." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 2 — POOLING DEEP DIVE
══════════════════════════════════════════════════════ */
function PoolingAnimator() {
  const [step, setStep] = useState(0);
  const [poolType, setPoolType] = useState("max");

  const input = [
    [12, 20, 30, 0],
    [8, 12, 2, 0],
    [34, 70, 37, 4],
    [112, 100, 25, 12],
  ];
  const poolSize = 2, stride = 2;
  const outSize = 2;
  const positions = [[0, 0], [0, 1], [1, 0], [1, 1]];

  const compute = (r, c) => {
    const vals = [input[r * stride][c * stride], input[r * stride][c * stride + 1], input[r * stride + 1][c * stride], input[r * stride + 1][c * stride + 1]];
    return poolType === "max" ? Math.max(...vals) : Math.round(vals.reduce((a, b) => a + b) / vals.length);
  };

  const outputs = positions.map(([r, c]) => compute(r, c));
  const cellColors = ["rgba(55,138,221,0.25)", "rgba(29,158,117,0.25)", "rgba(239,159,39,0.25)", "rgba(162,84,172,0.25)"];
  const borderColors = ["#378ADD", "#1D9E75", "#EF9F27", "#A254AC"];
  const [ar, ac] = step < 4 ? positions[step] : [0, 0];

  return (
    <VizBox>
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        {["max", "avg"].map(t => (
          <button key={t} onClick={() => { setPoolType(t); setStep(0); }} style={{ padding: "4px 14px", fontSize: 12.5, fontWeight: t === poolType ? 500 : 400, border: `0.5px solid var(--color-border-${t === poolType ? "info" : "tertiary"})`, borderRadius: "var(--border-radius-md)", background: t === poolType ? "var(--color-background-info)" : "transparent", color: t === poolType ? "var(--color-text-info)" : "var(--color-text-secondary)", cursor: "pointer" }}>
            {t === "max" ? "Max Pooling" : "Avg Pooling"}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", gap: 32, justifyContent: "center", alignItems: "flex-start", flexWrap: "wrap" }}>
        {/* Input */}
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 12, color: "var(--color-text-secondary)", marginBottom: 6, fontWeight: 500 }}>Input (4×4)</div>
          <div style={{ display: "inline-grid", gridTemplateColumns: "repeat(4,52px)", gap: 2 }}>
            {input.map((row_, ri) => row_.map((val, ci) => {
              const qi = Math.floor(ri / 2) * 2 + Math.floor(ci / 2);
              const isActive = step < 4 && Math.floor(ri / 2) === ar && Math.floor(ci / 2) === ac;
              return (
                <div key={`${ri}${ci}`} style={{ width: 52, height: 52, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 4, background: isActive ? cellColors[qi] : qi < step ? cellColors[qi] + "44" : "var(--color-background-secondary)", border: isActive ? `2px solid ${borderColors[qi]}` : `0.5px solid var(--color-border-${qi < step ? "secondary" : "tertiary"})`, fontFamily: "var(--font-mono)", fontSize: 15, fontWeight: isActive ? 700 : 400, color: "var(--color-text-primary)", transition: "all 0.2s" }}>
                  {val}
                </div>
              );
            }))}
          </div>
        </div>

        {/* Output */}
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 12, color: "var(--color-text-secondary)", marginBottom: 6, fontWeight: 500 }}>Output (2×2)</div>
          <div style={{ display: "inline-grid", gridTemplateColumns: "repeat(2,52px)", gap: 2 }}>
            {positions.map(([r, c], i) => (
              <div key={`o${r}${c}`} style={{ width: 52, height: 52, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 4, background: i < step ? cellColors[i] : i === step ? "var(--color-background-primary)" : "var(--color-background-secondary)", border: i === step ? `2px solid ${borderColors[i]}` : i < step ? `1.5px solid ${borderColors[i]}` : "0.5px solid var(--color-border-tertiary)", fontFamily: "var(--font-mono)", fontSize: 18, fontWeight: 700, color: i < step ? borderColors[i] : "var(--color-text-tertiary)", transition: "all 0.2s" }}>
                {i < step ? outputs[i] : "?"}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Computation display */}
      {step < 4 && (
        <div style={{ marginTop: 12, padding: "9px 14px", background: "var(--color-background-primary)", border: `0.5px solid ${borderColors[step]}`, borderRadius: "var(--border-radius-md)", fontFamily: "var(--font-mono)", fontSize: 13 }}>
          <span style={{ color: "var(--color-text-secondary)" }}>Window [{ar},{ac}] values: </span>
          <span style={{ color: "var(--color-text-primary)" }}>
            {[input[ar * 2][ac * 2], input[ar * 2][ac * 2 + 1], input[ar * 2 + 1][ac * 2], input[ar * 2 + 1][ac * 2 + 1]].join(", ")}
          </span>
          <span style={{ color: "var(--color-text-secondary)" }}> → {poolType === "max" ? "max" : "avg"} = </span>
          <span style={{ color: borderColors[step], fontWeight: 700 }}>{outputs[step]}</span>
        </div>
      )}

      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 10 }}>
        <button onClick={() => setStep(0)} style={{ padding: "4px 10px", fontSize: 12, border: "0.5px solid var(--color-border-tertiary)", borderRadius: "var(--border-radius-md)", background: "transparent", color: "var(--color-text-secondary)", cursor: "pointer" }}>⏮</button>
        <button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0} style={{ padding: "4px 10px", fontSize: 12, border: "0.5px solid var(--color-border-tertiary)", borderRadius: "var(--border-radius-md)", background: "transparent", color: step > 0 ? "var(--color-text-secondary)" : "var(--color-text-tertiary)", cursor: step > 0 ? "pointer" : "default" }}>◀</button>
        <button onClick={() => setStep(s => Math.min(4, s + 1))} disabled={step >= 4} style={{ padding: "4px 16px", fontSize: 13, fontWeight: 500, border: "0.5px solid var(--color-border-info)", borderRadius: "var(--border-radius-md)", background: "var(--color-background-info)", color: "var(--color-text-info)", cursor: step < 4 ? "pointer" : "default" }}>Next ▶</button>
      </div>
    </VizBox>
  );
}

function SectionPooling() {
  return (
    <div>
      <P>Pooling solves two problems that arise after convolution: memory explosion from large feature maps, and translation variance (the network being too sensitive to exact pixel positions).</P>

      <H2>The two problems pooling solves</H2>
      <Grid cols={2}>
        <Card color="danger" title="Problem 1: Memory">
          A 224×224 image with 256 feature maps = 224×224×256 = ~12M activations per layer. Without downsampling, deep networks become computationally infeasible. Pooling cuts this by 4× per layer (2×2 pool, stride 2).
        </Card>
        <Card color="warning" title="Problem 2: Translation variance">
          Without pooling, a feature shifted by 1 pixel produces a completely different activation map. Pooling aggregates a local region — "was this feature somewhere in this 2×2 patch?" — making detection robust to small position shifts.
        </Card>
      </Grid>

      <H2>Step-by-step pooling animation</H2>
      <PoolingAnimator />

      <H2>All pooling types — complete reference</H2>
      <Mx block>{`  Max Pooling:
    output[i,j] = max(patch[i,j])
    Effect: keeps the strongest activation in each region.
    Meaning: "Was this feature detected ANYWHERE in this patch?"
    Most common. Used in AlexNet, VGG, LeNet.

  Average Pooling:
    output[i,j] = mean(patch[i,j])
    Effect: smooth, softer representation.
    Meaning: "How much was this feature detected on average?"
    Used in: GoogLeNet, when you need smooth gradients.

  Global Average Pooling (GAP):
    One pooling window = entire feature map.
    (H, W, C) → (C,)   — one number per channel.
    No learnable parameters! Replaces Flatten+Dense.
    Used in: ResNet, MobileNet, EfficientNet.

  Global Max Pooling (GMP):
    (H, W, C) → (C,)   — max per channel.
    Less common than GAP.

  L2 Pooling:
    output = sqrt(sum(patch²))   — Euclidean norm of patch.
    Used in: some specialized architectures.

  Fractional Max Pooling (FMP):
    Pool size can be non-integer (e.g., 1.5×1.5).
    Stochastic; used as data augmentation. Rare.`}</Mx>

      <H2>Pooling properties — what it preserves and loses</H2>
      <Table
        heads={["Property", "Max Pooling", "Average Pooling", "Note"]}
        rows={[
          ["Translation invariance", "High", "Medium", "Max: exact position doesn't matter within pool"],
          ["Gradient flow", "Sparse (only max)", "Dense (all cells)", "Avg has smoother gradients"],
          ["Feature preservation", "Strongest only", "Average of all", "Max can miss weak-but-consistent signals"],
          ["Noise robustness", "High", "Medium", "Max ignores weak activations from noise"],
          ["Spatial info loss", "Yes", "Yes", "Both discard exact position within window"],
          ["Parameters", "0", "0", "Pooling is always parameter-free!"],
          ["Output range", "Same as input", "Same as input", "No normalization occurs"],
        ]}
      />

      <H2>Disadvantages of pooling</H2>
      <Grid cols={2}>
        {[
          { title: "Information loss", color: "danger", body: "Pooling permanently discards spatial precision. After 3 max-pool layers, you know a feature exists somewhere in an 8×8 region, but not where exactly. Fatal for tasks needing precise localization (segmentation, keypoint detection, object detection)." },
          { title: "Spatial hierarchy loss", color: "danger", body: "Capsule Networks (Hinton, 2017) argue pooling destroys the spatial relationships between features — a CNN could recognize 'nose above mouth above chin' and 'chin above mouth above nose' equally as a face. Pooling's invariance is too aggressive." },
          { title: "Not differentiable everywhere (max)", color: "warning", body: "Max pooling has zero gradient for all non-maximum elements. During backprop, only the max pixel's gradient is non-zero. This can reduce learning signal in early layers if max positions change frequently." },
          { title: "Fixed stride is suboptimal", color: "warning", body: "A 2×2 stride-2 pool always halves dimensions regardless of the task. Strided convolutions are learnable alternatives that can adapt the downsampling to the data." },
        ].map(({ title, color, body }) => (
          <div key={title} style={{ background: `var(--color-background-${color})`, border: `0.5px solid var(--color-border-${color})`, borderRadius: "var(--border-radius-md)", padding: "11px 13px" }}>
            <div style={{ fontWeight: 500, fontSize: 12.5, color: `var(--color-text-${color})`, marginBottom: 6 }}>{title}</div>
            <div style={{ fontSize: 12, color: `var(--color-text-${color})`, lineHeight: 1.65 }}>{body}</div>
          </div>
        ))}
      </Grid>

      <H2>Alternatives to pooling</H2>
      <Table
        heads={["Alternative", "How", "Best for", "Used in"]}
        rows={[
          ["Strided convolution", "S=2 in conv layer", "Learnable downsampling", "ResNet, DCGAN, All-CNN"],
          ["Dilated / Atrous conv", "Skip pixels in filter application", "Large receptive field, no downsample", "DeepLab, semantic segmentation"],
          ["Global Average Pooling", "Average entire feature map", "Final layer, no flattening", "ResNet, MobileNet, EfficientNet"],
          ["Spatial Pyramid Pooling", "Pool at multiple scales", "Multi-scale features", "SPPNet, Faster R-CNN"],
          ["No pooling (large FC)", "Keep full spatial resolution", "Very small inputs", "Simple MLPs on tiny images"],
        ]}
      />

      <H2>Complete MNIST CNN with pooling — annotated</H2>
      <Code>{`import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers

# ── Build CNN with explicit pooling annotation ─────────────
model = keras.Sequential([
    layers.Input(shape=(28, 28, 1)),              # (28, 28, 1)

    # ── Block 1 ────────────────────────────────────────────
    layers.Conv2D(32, (3,3), activation='relu',
                  padding='same',
                  kernel_initializer='he_normal'), # (28, 28, 32)
    layers.MaxPooling2D(pool_size=(2,2),           # pool_size: window
                        strides=(2,2)),            # strides: step size
                                                   # (14, 14, 32)
    # ── Block 2 ────────────────────────────────────────────
    layers.Conv2D(64, (3,3), activation='relu',
                  padding='same',
                  kernel_initializer='he_normal'), # (14, 14, 64)
    layers.MaxPooling2D(2, 2),                     # (7,  7,  64)

    # ── Classifier ─────────────────────────────────────────
    layers.Flatten(),                              # (7*7*64,) = (3136,)
    layers.Dense(128, activation='relu'),          # (128,)
    layers.Dropout(0.5),
    layers.Dense(10, activation='softmax'),        # (10,)
])

model.compile(
    optimizer='adam',
    loss='sparse_categorical_crossentropy',
    metrics=['accuracy']
)

# ── Load and preprocess MNIST ─────────────────────────────
(X_train, y_train), (X_test, y_test) = keras.datasets.mnist.load_data()
X_train = X_train[..., tf.newaxis].astype('float32') / 255.0  # add channel dim
X_test  = X_test[...,  tf.newaxis].astype('float32') / 255.0

history = model.fit(
    X_train, y_train,
    epochs=15, batch_size=64,
    validation_split=0.1
)
print(f"Test accuracy: {model.evaluate(X_test, y_test, verbose=0)[1]:.4f}")
# Typical result: ~99.2% on MNIST

# ── GAP version (modern alternative) ─────────────────────
model_gap = keras.Sequential([
    layers.Input(shape=(28, 28, 1)),
    layers.Conv2D(32, 3, padding='same', activation='relu'),
    layers.MaxPooling2D(2),
    layers.Conv2D(64, 3, padding='same', activation='relu'),
    layers.MaxPooling2D(2),
    layers.Conv2D(128, 3, padding='same', activation='relu'),
    layers.GlobalAveragePooling2D(),    # (128,) — no Flatten needed!
    layers.Dense(10, activation='softmax'),
])
# Much fewer FC parameters, better generalization`}</Code>

      <QA q="Why does max pooling produce sparse gradients during backpropagation?"
          a="During forward pass, max pooling records which element in each pool window was the maximum (the argmax). During backprop, the gradient from the output flows entirely to that maximum element — all other elements in the window receive zero gradient. This means only the 'winning' pixel in each 2×2 window gets updated. With 2×2 max pooling, 75% of pre-pooling gradients are zero. This sparsity can slow learning in early layers but also provides a form of regularization by forcing competition within each window." />
      <QA q="What is the key advantage of Global Average Pooling over Flatten+Dense?"
          a="Three advantages: (1) <strong>Parameters</strong> — GAP has zero parameters; Flatten+(H×W×C→N) Dense has H×W×C×N weights — for a 7×7×512 feature map connecting to 4096 neurons: 7×7×512×4096 = 102M params! GAP eliminates this entirely. (2) <strong>Input-size flexibility</strong> — GAP works on any spatial size; you can test on different resolution images. (3) <strong>Regularization</strong> — GAP forces each channel to summarize a complete object concept over the entire spatial extent, reducing overfitting. It was introduced in Network-in-Network (Lin et al. 2013) and adopted by ResNet." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 3 — LENET-5
══════════════════════════════════════════════════════ */
function LeNetDiagram({ activeLayer }) {
  const layers_info = [
    { name: "INPUT", shape: "32×32×1", color: "#185FA5" },
    { name: "C1 Conv", shape: "28×28×6", color: "#0F6E56" },
    { name: "S2 Pool", shape: "14×14×6", color: "#1D9E75" },
    { name: "C3 Conv", shape: "10×10×16", color: "#0F6E56" },
    { name: "S4 Pool", shape: "5×5×16", color: "#1D9E75" },
    { name: "C5 Conv", shape: "1×1×120", color: "#0F6E56" },
    { name: "F6 FC", shape: "84", color: "#853E0B" },
    { name: "OUTPUT", shape: "10", color: "#7A2048" },
  ];
  return (
    <VizBox>
      <div style={{ display: "flex", gap: 0, alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}>
        {layers_info.map(({ name, shape, color }, i) => (
          <div key={name} style={{ display: "flex", alignItems: "center" }}>
            <div style={{ background: i === activeLayer ? color : color + "22", border: `1.5px solid ${i === activeLayer ? color : color + "88"}`, borderRadius: "var(--border-radius-md)", padding: "8px 10px", textAlign: "center", minWidth: 72, cursor: "default", transition: "all 0.2s", transform: i === activeLayer ? "scale(1.08)" : "scale(1)" }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: i === activeLayer ? "#fff" : color }}>{name}</div>
              <div style={{ fontSize: 10, color: i === activeLayer ? "rgba(255,255,255,0.8)" : color, opacity: 0.85, marginTop: 2 }}>{shape}</div>
            </div>
            {i < layers_info.length - 1 && <div style={{ padding: "0 3px", color: "var(--color-text-tertiary)", fontSize: 14 }}>→</div>}
          </div>
        ))}
      </div>
    </VizBox>
  );
}

function SectionLeNet() {
  const [activeLayer, setActiveLayer] = useState(0);

  const layerDetails = [
    {
      name: "INPUT — 32×32×1",
      desc: "LeNet-5 was designed for handwritten digit recognition. Input images are 32×32 grayscale (MNIST 28×28 images are zero-padded to 32×32). Single channel (C=1) since images are grayscale.",
      math: `Input: (32, 32, 1)
Preprocessing: normalize to [-1, 1] (original paper)
Note: 28×28 MNIST padded with 2px border → 32×32` },
    {
      name: "C1 — Conv Layer (6 filters, 5×5, VALID)",
      desc: "First convolutional layer. 6 learnable 5×5 filters slide across the 32×32 input with no padding (VALID). Each filter produces one 28×28 feature map. At this stage the network learns primitive features: edges, blobs, corners.",
      math: `Config: 6 filters, F=5, P=0 (VALID), S=1
H_out = (32-5)/1+1 = 28
Output: (28, 28, 6)
Parameters: 6×(5×5×1+1) = 6×26 = 156
Activation: tanh (original) / ReLU (modern impl)` },
    {
      name: "S2 — Avg Pool (2×2, stride 2)",
      desc: "Average pooling layer (called 'subsampling' in the original paper). Reduces each 28×28 map to 14×14. Original paper used a learnable scale factor and bias after pooling (not standard today). Modern: MaxPool.",
      math: `Config: pool_size=(2,2), stride=2
H_out = 28/2 = 14
Output: (14, 14, 6)
Parameters: 0  (pooling has no weights)
Note: original paper had 2 trainable params per map` },
    {
      name: "C3 — Conv Layer (16 filters, 5×5, VALID)",
      desc: "Second conv layer. 16 filters of size 5×5. The original LeNet used a specific sparse connectivity between S2 maps and C3 filters (not all 6 input maps connect to all 16 output maps) — a form of manual regularization. Modern implementations use full connectivity.",
      math: `Config: 16 filters, F=5, P=0 (VALID), S=1
H_out = (14-5)/1+1 = 10
Output: (10, 10, 16)
Parameters: 16×(5×5×6+1) = 16×151 = 2,416` },
    {
      name: "S4 — Avg Pool (2×2, stride 2)",
      desc: "Second pooling layer. Reduces 10×10 to 5×5. After two rounds of conv+pool, the spatial resolution is greatly reduced while channel depth has increased — the spatial→semantic trade-off.",
      math: `Config: pool_size=(2,2), stride=2
H_out = 10/2 = 5
Output: (5, 5, 16)
Parameters: 0` },
    {
      name: "C5 — Conv Layer (120 filters, 5×5, VALID)",
      desc: "Third conv layer — but since input is exactly 5×5 and kernel is 5×5, this is functionally equivalent to a fully connected layer. Output is a 1×1×120 volume. This clever design bridges the conv and FC worlds.",
      math: `Config: 120 filters, F=5, P=0 (VALID), S=1
H_out = (5-5)/1+1 = 1
Output: (1, 1, 120) ≡ (120,) — fully connected!
Parameters: 120×(5×5×16+1) = 120×401 = 48,120` },
    {
      name: "F6 — Fully Connected (84 neurons)",
      desc: "Dense layer with 84 neurons. The choice of 84 was deliberate: ASCII has 84 printable characters, so in principle each neuron could represent one character in an expanded recognition system. Activation: tanh.",
      math: `Input: 120, Output: 84
Parameters: 120×84 + 84 = 10,164
Activation: tanh (original)
Note: 84 = number of ASCII printable chars` },
    {
      name: "OUTPUT — FC (10 neurons, Softmax)",
      desc: "Output layer with 10 neurons — one per digit class. Original paper used Euclidean RBF units; modern implementation uses Dense + Softmax with cross-entropy loss.",
      math: `Input: 84, Output: 10
Parameters: 84×10 + 10 = 850
Activation: Softmax (modern) / RBF (original)
Loss: CrossEntropy (modern) / MSE (original)` },
  ];

  const detail = layerDetails[activeLayer];
  const totalParams = 156 + 2416 + 48120 + 10164 + 850;

  return (
    <div>
      <P>LeNet-5 (LeCun et al., 1998) is the foundational CNN architecture — the first deep learning model to achieve practical success at scale, deployed commercially to read cheques. Every modern CNN descends from its design principles.</P>

      <H2>Architecture diagram — click any layer</H2>
      <LeNetDiagram activeLayer={activeLayer} />

      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 12 }}>
        {layerDetails.map((l, i) => (
          <button key={i} onClick={() => setActiveLayer(i)} style={{ padding: "4px 10px", fontSize: 11.5, fontWeight: i === activeLayer ? 500 : 400, border: `0.5px solid var(--color-border-${i === activeLayer ? "info" : "tertiary"})`, borderRadius: "20px", background: i === activeLayer ? "var(--color-background-info)" : "transparent", color: i === activeLayer ? "var(--color-text-info)" : "var(--color-text-secondary)", cursor: "pointer" }}>
            {l.name.split(" ")[0]}
          </button>
        ))}
      </div>

      <div style={{ border: "0.5px solid var(--color-border-info)", borderRadius: "var(--border-radius-lg)", padding: "1.1rem", marginBottom: "1rem", background: "var(--color-background-primary)" }}>
        <div style={{ fontWeight: 500, fontSize: 14.5, color: "var(--color-text-info)", marginBottom: 8 }}>{detail.name}</div>
        <P c={detail.desc} s={{ marginBottom: 8 }} />
        <Mx block>{detail.math}</Mx>
      </div>

      <H2>Complete parameter count</H2>
      <Table
        heads={["Layer", "Config", "Output shape", "Parameters"]}
        rows={[
          ["Input", "—", "32×32×1", "0"],
          ["C1 Conv", "6×5×5, VALID", "28×28×6", "156"],
          ["S2 Pool", "2×2, stride 2", "14×14×6", "0"],
          ["C3 Conv", "16×5×5, VALID", "10×10×16", "2,416"],
          ["S4 Pool", "2×2, stride 2", "5×5×16", "0"],
          ["C5 Conv", "120×5×5, VALID", "1×1×120", "48,120"],
          ["F6 FC", "120→84", "84", "10,164"],
          ["Output FC", "84→10, softmax", "10", "850"],
          ["TOTAL", "—", "—", totalParams.toLocaleString() + " ≈ 61K"],
        ]}
      />

      <Note color="success" icon="ti-star">
        <strong>Historical context:</strong> LeNet-5's ~61K parameters achieved 99.2% accuracy on MNIST in 1998 and was deployed at scale to read bank cheques. Modern ResNet-50 has 25M parameters but builds on exactly the same conv→pool→FC design principle.
      </Note>

      <H2>Complete implementation — original + modern</H2>
      <Code>{`import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers

# ── Original LeNet-5 (faithful to 1998 paper) ─────────────
def lenet5_original(input_shape=(32,32,1), num_classes=10):
    return keras.Sequential([
        layers.Input(shape=input_shape),

        # C1: 6 filters, 5×5, VALID, tanh
        layers.Conv2D(6, (5,5), activation='tanh',
                      padding='valid'),            # 32→28: (28,28,6)

        # S2: Average pool 2×2, stride 2
        layers.AveragePooling2D((2,2), strides=2), # 28→14: (14,14,6)

        # C3: 16 filters, 5×5, VALID, tanh
        layers.Conv2D(16, (5,5), activation='tanh',
                      padding='valid'),            # 14→10: (10,10,16)

        # S4: Average pool 2×2, stride 2
        layers.AveragePooling2D((2,2), strides=2), # 10→5:  (5,5,16)

        # C5: 120 filters, 5×5, VALID — fully connected conv!
        layers.Conv2D(120, (5,5), activation='tanh',
                      padding='valid'),            # 5→1:   (1,1,120)

        # Flatten: (1,1,120) → (120,)
        layers.Flatten(),

        # F6: Dense 84, tanh
        layers.Dense(84, activation='tanh'),       # (84,)

        # Output: 10 classes, softmax
        layers.Dense(num_classes, activation='softmax'),  # (10,)
    ], name='LeNet5_Original')

# ── Modern LeNet-5 (common improvements) ──────────────────
def lenet5_modern(input_shape=(28,28,1), num_classes=10):
    """
    Improvements over original:
    - Input 28×28 directly (no padding to 32×32 needed)
    - ReLU instead of tanh
    - MaxPool instead of AveragePool
    - BatchNorm for training stability
    - Softmax + CrossEntropy instead of RBF + MSE
    """
    return keras.Sequential([
        layers.Input(shape=input_shape),                  # (28,28,1)

        layers.Conv2D(6, (5,5), padding='same',
                      activation='relu'),                  # (28,28,6)
        layers.BatchNormalization(),
        layers.MaxPooling2D((2,2)),                        # (14,14,6)

        layers.Conv2D(16, (5,5), padding='valid',
                      activation='relu'),                  # (10,10,16)
        layers.BatchNormalization(),
        layers.MaxPooling2D((2,2)),                        # (5, 5,16)

        layers.Flatten(),                                  # (400,)
        layers.Dense(120, activation='relu'),              # (120,)
        layers.Dense(84,  activation='relu'),              # (84,)
        layers.Dense(num_classes, activation='softmax'),   # (10,)
    ], name='LeNet5_Modern')

# ── Train on MNIST ────────────────────────────────────────
(X_train, y_train), (X_test, y_test) = keras.datasets.mnist.load_data()

# For original: pad 28×28 → 32×32
X_32 = tf.pad(X_train[...,tf.newaxis], [[0,0],[2,2],[2,2],[0,0]])
X_32 = tf.cast(X_32, tf.float32) / 255.0

# For modern: use 28×28 directly
X_28 = X_train[..., tf.newaxis].astype('float32') / 255.0

model_orig   = lenet5_original()
model_modern = lenet5_modern()

for name, model, X, y in [
    ("Original LeNet-5", model_orig,   X_32[:50000], y_train[:50000]),
    ("Modern  LeNet-5",  model_modern, X_28[:50000], y_train[:50000]),
]:
    model.compile(optimizer='adam',
                  loss='sparse_categorical_crossentropy',
                  metrics=['accuracy'])
    model.fit(X, y, epochs=10, batch_size=64,
              validation_split=0.1, verbose=0)
    X_t = (tf.pad(X_test[...,tf.newaxis],[[0,0],[2,2],[2,2],[0,0]]).numpy()/255.0
           if name.startswith("Original") else
           X_test[...,tf.newaxis].astype('float32')/255.0)
    acc = model.evaluate(X_t, y_test, verbose=0)[1]
    params = model.count_params()
    print(f"{name}: accuracy={acc:.4f}  params={params:,}")

# Typical output:
# Original LeNet-5: accuracy=0.9884  params=61,470
# Modern  LeNet-5:  accuracy=0.9921  params=44,426`}</Code>

      <H2>LeNet-5's legacy — what it introduced</H2>
      <Grid cols={3}>
        {[
          { idea: "Local receptive fields", legacy: "Every modern CNN uses locally-connected conv layers, not globally connected ones." },
          { idea: "Parameter sharing (weight tying)", legacy: "The same filter weights detect features anywhere in the image — fundamental to all CNNs." },
          { idea: "Spatial subsampling", legacy: "Pooling (or strided conv) after each conv block — the standard CNN 'block' structure." },
          { idea: "Hierarchical features", legacy: "Low-level (edges) → mid-level (shapes) → high-level (objects) representation learning." },
          { idea: "End-to-end learning", legacy: "Features and classifier trained jointly — no separate feature engineering step." },
          { idea: "Practical deployment", legacy: "First deep learning system deployed at industrial scale (millions of cheques/day)." },
        ].map(({ idea, legacy }) => (
          <div key={idea} style={{ border: "0.5px solid var(--color-border-tertiary)", borderRadius: "var(--border-radius-md)", padding: "10px 12px" }}>
            <div style={{ fontWeight: 500, fontSize: 12.5, color: "var(--color-text-primary)", marginBottom: 5 }}>{idea}</div>
            <div style={{ fontSize: 12, color: "var(--color-text-secondary)", lineHeight: 1.6 }}>{legacy}</div>
          </div>
        ))}
      </Grid>

      <QA q="Why is C5 in LeNet-5 called a convolutional layer even though it produces a 1×1 output?"
          a="C5 uses 120 filters of size 5×5 applied to a 5×5×16 feature map with VALID padding. Since kernel size equals feature map size, each filter computes a dot product over the entire 5×5 spatial extent — identical to a fully connected computation from 400 inputs to 120 outputs. LeCun kept it as a conv layer (rather than Dense) because it preserves the design principle of spatially-sliding filters, and if the input were larger than 5×5, C5 would produce a spatial output (enabling the network to process larger images naturally). This is the idea behind Fully Convolutional Networks (FCN)." />
      <QA q="What are the two most impactful changes in modernizing LeNet-5?"
          a="(1) <strong>ReLU instead of tanh</strong>: tanh saturates and causes vanishing gradients in deep networks; ReLU trains faster (no saturation for z>0) and enables much deeper architectures. (2) <strong>MaxPool instead of AveragePool</strong>: max pooling provides stronger translation invariance by reporting the peak activation (feature presence) rather than the average, and produces sparser, more discriminative representations. Secondary improvements: BatchNorm for training stability, and Softmax+CrossEntropy instead of RBF+MSE for better gradient signals at the output layer." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   ROOT
══════════════════════════════════════════════════════ */
const TABS = [
  { id: "ps", label: "Padding & Strides" },
  { id: "pool", label: "Pooling Deep Dive" },
  { id: "lenet", label: "LeNet-5" },
];

export default function CNNPart2() {
  const [active, setActive] = useState("ps");
  const map = { ps: <SectionPaddingStrides />, pool: <SectionPooling />, lenet: <SectionLeNet /> };

  return (
    <div>
      <div className="page-header">
        <div className="page-header-eyebrow">Deep Learning — Module 11</div>
        <h1 className="page-header-title">Padding · Strides · Pooling Deep Dive · LeNet-5</h1>
        <p className="page-header-subtitle">Chapters 43–45 · Interactive dimension explorer · Step-by-step pooling · Full LeNet-5 layer-by-layer breakdown</p>
      </div>

      <SectionNav tabs={TABS} active={active} onChange={setActive} />

      <div style={{ padding: "0.5rem 0 2rem" }}>
        {map[active]}
      </div>

      <NavButtons moduleId={11} />
    </div>
  );
}
