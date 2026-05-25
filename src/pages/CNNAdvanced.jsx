import { useState, useRef, useEffect, useCallback } from "react";
import { Code } from '../components/ui/Code.jsx';
import { Mx, H2, H3, P } from '../components/ui/Typography.jsx';
import { QA } from '../components/ui/QA.jsx';
import { Note, Grid, Card, Table, VizBox } from '../components/ui/Primitives.jsx';
import NavButtons from '../components/layout/NavButtons.jsx';
import SectionNav from '../components/layout/SectionNav.jsx';

/* ══════════════════════════════════════════════════════
   SECTION 1 — CNN VS ANN (Ch. 46)
══════════════════════════════════════════════════════ */
function ParamCompare() {
  const [H, setH] = useState(64), [C, setC] = useState(3);
  const [h1, setH1] = useState(512), [filters, setFilters] = useState(32), [F, setF] = useState(3);
  const ann = H * H * C * h1 + h1;
  const cnn = filters * (F * F * C + 1);
  const ratio = (ann / cnn).toFixed(0);
  const fmt = n => n >= 1e6 ? (n / 1e6).toFixed(2) + "M" : n >= 1e3 ? (n / 1e3).toFixed(0) + "K" : n;
  
  return (
    <VizBox>
      <div style={{ display: "grid", gridTemplateColumns: "120px 1fr 52px", gap: 7, marginBottom: 12, fontSize: 12.5, alignItems: "center" }}>
        {[
          ["Image H=W", H, setH, 4, 224, 4],
          ["Channels", C, setC, 1, 3, 1],
          ["ANN hidden", h1, setH1, 64, 4096, 64],
          ["CNN filters", filters, setFilters, 8, 128, 8],
          ["Filter size F", F, setF, 3, 7, 2]
        ].map(([l, v, sv, mn, mx, st], i) => (
          <div key={i} style={{ display: "contents" }}>
            <span style={{ color: "var(--color-text-secondary)" }}>{l}</span>
            <input type="range" min={mn} max={mx} step={st} value={v} onChange={e => sv(+e.target.value)} />
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, textAlign: "right" }}>{v}</span>
          </div>
        ))}
      </div>
      <Grid cols={2}>
        <div style={{ background: "var(--color-background-danger)", border: "0.5px solid var(--color-border-danger)", borderRadius: "var(--border-radius-md)", padding: "12px" }}>
          <div style={{ fontWeight: 500, fontSize: 12.5, color: "var(--color-text-danger)", marginBottom: 6 }}>ANN — First Dense layer</div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 14, color: "var(--color-text-danger)", fontWeight: 700 }}>{fmt(ann)}</div>
          <div style={{ fontSize: 11.5, color: "var(--color-text-danger)", marginTop: 4 }}>{H}×{H}×{C} × {h1} + {h1}</div>
        </div>
        <div style={{ background: "var(--color-background-success)", border: "0.5px solid var(--color-border-success)", borderRadius: "var(--border-radius-md)", padding: "12px" }}>
          <div style={{ fontWeight: 500, fontSize: 12.5, color: "var(--color-text-success)", marginBottom: 6 }}>CNN — First Conv layer</div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 14, color: "var(--color-text-success)", fontWeight: 700 }}>{fmt(cnn)}</div>
          <div style={{ fontSize: 11.5, color: "var(--color-text-success)", marginTop: 4 }}>{filters} × ({F}×{F}×{C} + 1)</div>
        </div>
      </Grid>
      <div style={{ textAlign: "center", fontSize: 13, fontWeight: 500, color: "var(--color-text-primary)", marginTop: 6 }}>
        CNN is <span style={{ color: "var(--color-text-success)", fontSize: 15 }}>{ratio}×</span> more parameter-efficient on layer 1 alone
      </div>
    </VizBox>
  );
}

function SectionCNNvsANN() {
  return (
    <div>
      <P>ANN and CNN both learn by adjusting weights via backpropagation. The difference is in how each layer is connected — fully vs. locally — and whether weights are shared across positions.</P>
      <H2>Core similarities</H2>
      <Grid cols={3}>
        <Card color="info" title="Both learn from data">Both are trained with gradient descent and backpropagation. The loss function, optimizer, and training loop are identical.</Card>
        <Card color="info" title="Both use activations">ReLU, sigmoid, softmax — all standard activation functions work identically in ANN and CNN layers.</Card>
        <Card color="info" title="Both have bias terms">Every neuron (ANN) and every filter (CNN) has a learnable bias. Regularization techniques (Dropout, L2) apply to both.</Card>
      </Grid>

      <H2>Detailed comparison</H2>
      <Table heads={["Dimension", "ANN (MLP)", "CNN"]} rows={[
        ["Layer type", "Dense (fully connected)", "Convolutional + Pooling + Dense"],
        ["Connectivity", "Every input → every neuron", "Each neuron → small local patch (kernel)"],
        ["Weight sharing", "None — unique weight per connection", "Yes — same kernel weights at all positions"],
        ["Input format", "Flattened 1D vector", "2D/3D spatial grid (H×W×C)"],
        ["Spatial structure", "Destroyed (flattening)", "Preserved through all conv layers"],
        ["Translation invariance", "None", "Built-in via weight sharing + pooling"],
        ["Parameter count", "O(H×W×C×hidden) — huge", "O(F²×C×filters) — constant vs image size"],
        ["Best for", "Tabular, structured data", "Images, audio spectrograms, video"],
        ["Overfitting risk", "High on image data", "Lower — strong inductive bias for vision"],
        ["Feature engineering", "Manual (for images)", "Automatic — learned from data"],
        ["Depth needed", "Shallow often works", "Deep is essential for rich features"],
        ["Typical first layer", "Dense(512–4096)", "Conv2D(32–64, 3×3)"],
      ]} />

      <H2>Live parameter count comparison</H2>
      <ParamCompare />

      <H2>Visual architecture difference</H2>
      <div style={{ background: "var(--color-background-secondary)", border: "0.5px solid var(--color-border-tertiary)", borderRadius: "var(--border-radius-lg)", padding: "1.1rem", marginBottom: "1rem" }}>
        <div style={{ fontSize: 12, fontWeight: 500, color: "var(--color-text-secondary)", marginBottom: 10 }}>ANN on images (inefficient path)</div>
        <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap", marginBottom: 16 }}>
          {[
            ["Image\n(64×64×3)", "#E24B4A"],
            ["Flatten\n12,288 values", "#E24B4A"],
            ["Dense\n12,288→512", "#E24B4A"],
            ["Dense\n512→256", "#853E0B"],
            ["Output\n10", "#7A2048"]
          ].map(([l, c], i, arr) => (
            <div key={l} style={{ display: "flex", alignItems: "center" }}>
              <div style={{ background: c + "22", border: `1.5px solid ${c}`, borderRadius: "var(--border-radius-md)", padding: "7px 10px", textAlign: "center", whiteSpace: "pre", fontSize: 10.5, color: c, fontWeight: 500 }}>{l}</div>
              {i < arr.length - 1 && <div style={{ color: "var(--color-text-tertiary)", padding: "0 4px", fontSize: 14 }}>→</div>}
            </div>
          ))}
        </div>
        <div style={{ fontSize: 12, fontWeight: 500, color: "var(--color-text-secondary)", marginBottom: 10 }}>CNN on images (efficient path)</div>
        <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
          {[
            ["Image\n(64×64×3)", "#185FA5"],
            ["Conv+Pool\n32×32×32", "#0F6E56"],
            ["Conv+Pool\n16×16×64", "#0F6E56"],
            ["Conv+Pool\n8×8×128", "#0F6E56"],
            ["GAP\n128", "#853E0B"],
            ["Output\n10", "#7A2048"]
          ].map(([l, c], i, arr) => (
            <div key={l} style={{ display: "flex", alignItems: "center" }}>
              <div style={{ background: c + "22", border: `1.5px solid ${c}`, borderRadius: "var(--border-radius-md)", padding: "7px 10px", textAlign: "center", whiteSpace: "pre", fontSize: 10.5, color: c, fontWeight: 500 }}>{l}</div>
              {i < arr.length - 1 && <div style={{ color: "var(--color-text-tertiary)", padding: "0 4px", fontSize: 14 }}>→</div>}
            </div>
          ))}
        </div>
      </div>

      <QA q="If CNNs are strictly better for images, why are ANNs still used inside CNNs?"
          a="CNNs still use fully connected (Dense) layers at the end — the classifier head. The convolutional layers extract spatial features, but the final mapping from 'feature vector → class probability' is a task with no spatial structure, making a fully connected layer the right tool. The modern trend is to shrink this head (using Global Average Pooling to replace Flatten+Dense), but the output Dense layer remains. Pure ANN architectures are preferred for tabular/structured data where spatial relationships don't exist." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 2 — BACKPROP IN CNN (Ch. 47-48)
══════════════════════════════════════════════════════ */
function BackpropStepViz() {
  const [step, setStep] = useState(0);
  const steps = [
    {
      label: "Forward: Conv", color: "info",
      title: "Forward pass through Conv layer",
      eq: `  Input patch P (3×3), kernel K (3×3):
  Z[i,j] = Σₘ Σₙ P[i+m, j+n] · K[m,n] + b
  A[i,j] = ReLU(Z[i,j])

  Cache: P, K, Z, A  ← ALL needed for backprop` },
    {
      label: "Forward: MaxPool", color: "info",
      title: "Forward pass through MaxPool",
      eq: `  For each 2×2 pool window:
  output = max(A[i,j], A[i,j+1], A[i+1,j], A[i+1,j+1])

  Cache: mask M  where M[i,j]=1 if A[i,j] was the max, else 0
  ← This mask is CRITICAL for the backward pass` },
    {
      label: "Forward: Flatten", color: "info",
      title: "Forward pass through Flatten",
      eq: `  f = reshape(A_pool, (-1,))   # 3D → 1D vector
  Cache: original_shape of A_pool (e.g. (4,4,32))
  ← needed to reshape gradient back in backward pass` },
    {
      label: "Forward: Dense+Loss", color: "warning",
      title: "Forward: FC layer → Loss",
      eq: `  logits = W_fc · f + b_fc
  ŷ = softmax(logits)
  L = -Σ y_true · log(ŷ)
  
  ∂L/∂logits = ŷ - y_true  ← starting gradient (δ_fc)` },
    {
      label: "Backward: Dense", color: "success",
      title: "Backward: gradient through Dense layer",
      eq: `  Given: δ_fc = ∂L/∂logits = ŷ - y  (shape: num_classes)

  ∂L/∂W_fc = δ_fc ⊗ f              (outer product)
  ∂L/∂b_fc = δ_fc
  
  Propagate to flatten output:
  ∂L/∂f = W_fc^T · δ_fc            (shape: same as f)` },
    {
      label: "Backward: Flatten", color: "success",
      title: "Backward: gradient through Flatten",
      eq: `  Given: ∂L/∂f  (1D vector of gradients)

  Simply reshape back to pool output shape:
  ∂L/∂A_pool = reshape(∂L/∂f, original_shape)
  
  No computation — just a view/reshape operation.
  ← Gradients flow through unchanged` },
    {
      label: "Backward: MaxPool", color: "warning",
      title: "Backward: gradient through MaxPool",
      eq: `  Given: ∂L/∂output_pool  (gradients from above)
  
  The gradient routes ONLY to the max element (argmax):
  ∂L/∂A[i,j] = ∂L/∂output[i//2, j//2]  if M[i,j] = 1
              = 0                          if M[i,j] = 0
  
  This is why we cached mask M during forward pass!
  ← Non-max positions get zero gradient` },
    {
      label: "Backward: Conv", color: "warning",
      title: "Backward: gradient through Conv layer",
      eq: `  Given: ∂L/∂A (gradients from above, before ReLU)
  
  1. Through ReLU:
     ∂L/∂Z = ∂L/∂A ⊙ (Z > 0)   ← element-wise, cached Z
  
  2. Through kernel (compute ∂L/∂K):
     ∂L/∂K[m,n] = Σᵢ Σⱼ ∂L/∂Z[i,j] · P[i+m, j+n]
     ← a convolution of the input patch with the error signal!
  
  3. Through bias:
     ∂L/∂b = Σᵢ Σⱼ ∂L/∂Z[i,j]
  
  4. Propagate to previous layer (∂L/∂P):
     ∂L/∂P[i,j] = Σₘ Σₙ ∂L/∂Z[i-m,j-n] · K[m,n]
     ← a full convolution (with flipped kernel!)` },
  ];
  const s = steps[step];
  return (
    <VizBox>
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 12 }}>
        {steps.map((st, i) => (
          <button key={i} onClick={() => setStep(i)} style={{ padding: "4px 9px", fontSize: 11.5, fontWeight: i === step ? 500 : 400, border: `0.5px solid var(--color-border-${i === step ? st.color : "tertiary"})`, borderRadius: "20px", background: i === step ? `var(--color-background-${st.color})` : "transparent", color: i === step ? `var(--color-text-${st.color})` : "var(--color-text-secondary)", cursor: "pointer" }}>{st.label}</button>
        ))}
      </div>
      <div style={{ background: "var(--color-background-primary)", border: `0.5px solid var(--color-border-${s.color})`, borderRadius: "var(--border-radius-md)", padding: "1rem" }}>
        <div style={{ fontWeight: 500, fontSize: 14, color: `var(--color-text-${s.color})`, marginBottom: 8 }}>{s.title}</div>
        <Mx block>{s.eq}</Mx>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10 }}>
        <button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0} style={{ padding: "5px 13px", fontSize: 12.5, border: "0.5px solid var(--color-border-tertiary)", borderRadius: "var(--border-radius-md)", background: "transparent", color: step > 0 ? "var(--color-text-secondary)" : "var(--color-text-tertiary)", cursor: step > 0 ? "pointer" : "default", display: "flex", alignItems: "center", gap: 5 }}>
          <i className="ti ti-arrow-left" aria-hidden /> Prev
        </button>
        <span style={{ fontSize: 11.5, color: "var(--color-text-tertiary)", alignSelf: "center" }}>Step {step + 1}/{steps.length} — {step < 3 ? "Forward pass" : "Backward pass"}</span>
        <button onClick={() => setStep(s => Math.min(steps.length - 1, s + 1))} disabled={step >= steps.length - 1} style={{ padding: "5px 13px", fontSize: 12.5, border: "0.5px solid var(--color-border-info)", borderRadius: "var(--border-radius-md)", background: "var(--color-background-info)", color: "var(--color-text-info)", cursor: step < steps.length - 1 ? "pointer" : "default", display: "flex", alignItems: "center", gap: 5 }}>
          Next <i className="ti ti-arrow-right" aria-hidden />
        </button>
      </div>
    </VizBox>
  );
}

function SectionBackpropCNN() {
  return (
    <div>
      <P>Backpropagation in a CNN follows the same chain rule as in a standard ANN, but three layers require special treatment: convolution, max pooling, and flatten. Each has a distinct gradient propagation mechanism.</P>
      <Note color="info" icon="ti-bulb">
        <strong>Key insight:</strong> The gradient of a convolution is also a convolution — just with a flipped kernel. This means backprop through a conv layer is computationally equivalent to another forward pass, which is why training CNNs takes roughly 2–3× the memory of inference.
      </Note>

      <H2>CNN forward + backward — full 8-step walkthrough</H2>
      <BackpropStepViz />

      <H2>Gradient through Convolution — full derivation</H2>
      <Mx block>{`  Forward:  Z = X * K  (convolution, no padding, stride 1)
  Z[i,j] = Σₘ Σₙ X[i+m, j+n] · K[m,n]

  Given ∂L/∂Z from the layer above, we need:
    (a) ∂L/∂K  — to update the kernel weights
    (b) ∂L/∂X  — to propagate error to previous layer

  ─── (a) Kernel gradient ∂L/∂K ─────────────────────────────
  ∂L/∂K[m,n] = Σᵢ Σⱼ ∂L/∂Z[i,j] · X[i+m, j+n]

  This is a convolution of X with ∂L/∂Z !
  In compact notation:  ∂L/∂K = X * (∂L/∂Z)
  where the 'filter' is now the error signal.

  ─── (b) Input gradient ∂L/∂X ──────────────────────────────
  ∂L/∂X[i,j] = Σₘ Σₙ ∂L/∂Z[i-m, j-n] · K[m,n]

  This is a FULL convolution of ∂L/∂Z with K flipped 180°.
  (Full convolution = VALID convolution with zero-padded input)
  In compact notation:  ∂L/∂X = ∂L/∂Z ⋆ K_flipped
  where ⋆ denotes full convolution (with padding F-1).

  ─── (c) Bias gradient ∂L/∂b ───────────────────────────────
  ∂L/∂b = Σᵢ Σⱼ ∂L/∂Z[i,j]   ← sum all error signals

  WHY IS ∂L/∂X A FULL CONVOLUTION?
  Because in the forward pass, X[0,0] contributes to ALL
  output positions that overlap it. Its gradient accumulates
  all these contributions. Full convolution naturally sums them.`}</Mx>

      <H2>Gradient through MaxPool — routing mechanism</H2>
      <Mx block>{`  Forward:  output = max_pool(A, size=2, stride=2)
  Cache:    mask M where M[i,j] = 1 iff A[i,j] was the max

  Backward:
    ∂L/∂A[i,j] = ∂L/∂output[⌊i/2⌋, ⌊j/2⌋]  if M[i,j]=1
                = 0                             if M[i,j]=0

  Intuition: Only the maximum element "participated" in the
  forward pass output. The chain rule gives non-zero derivative
  only at that element. All others have zero local gradient.

  This creates a "gradient routing" pattern:
  The error flows back along the path of maximum activation.

  Example (2×2 pool window):
    Forward:
      Input:  [3, 7]   Max = 7 → M = [0,1]
              [5, 2]                  [0,0]
    Backward (say ∂L/∂output = -0.5):
      ∂L/∂Input: [0,   -0.5]  ← gradient routes to max only
                 [0,   0   ]`}</Mx>

      <H2>Gradient through Flatten — a reshape</H2>
      <Mx block>{`  Forward:  f = reshape(A_pool, (-1,))
  Backward: ∂L/∂A_pool = reshape(∂L/∂f, A_pool.shape)

  That's literally it. Flatten has no weights, no nonlinearity.
  The gradient simply gets reshaped back to the 3D structure.
  This is why Flatten is sometimes called a "view" operation.`}</Mx>

      <H2>Numerical example — one full backward pass</H2>
      <Mx block>{`  Setup: 3×3 input, 2×2 kernel, no padding, no activation
  
  Input X:    [1 2 3]     Kernel K: [1 0]
              [4 5 6]               [0 1]
              [7 8 9]

  Forward (valid conv, 2×2 output):
    Z[0,0] = 1·1 + 2·0 + 4·0 + 5·1 = 6
    Z[0,1] = 2·1 + 3·0 + 5·0 + 6·1 = 8
    Z[1,0] = 4·1 + 5·0 + 7·0 + 8·1 = 12
    Z[1,1] = 5·1 + 6·0 + 8·0 + 9·1 = 14

  Assume loss gives:  ∂L/∂Z = [-1  0]
                                [ 0  1]

  ─── Kernel gradient ∂L/∂K: ────────────────────────────────
  ∂L/∂K[0,0] = Σ ∂L/∂Z[i,j]·X[i,j]
             = (-1)·1 + 0·2 + 0·4 + 1·5 = 4
  ∂L/∂K[0,1] = (-1)·2 + 0·3 + 0·5 + 1·6 = 4
  ∂L/∂K[1,0] = (-1)·4 + 0·5 + 0·7 + 1·8 = 4
  ∂L/∂K[1,1] = (-1)·5 + 0·6 + 0·8 + 1·9 = 4
  → ∂L/∂K = [[4,4],[4,4]]

  ─── Input gradient ∂L/∂X (full conv with flipped K): ──────
  K_flipped = [[1,0],[0,1]]  (180° rotation of K = K itself here)
  Full conv of ∂L/∂Z with K_flipped (pad ∂L/∂Z with F-1=1):
    ∂L/∂X = [[-1, 0, 0],   (top-left: only Z[0,0] covers X[0,0])
              [ 0, 0, 0],
              [ 0, 0, 1]]  (bottom-right: only Z[1,1] covers X[2,2])`}</Mx>

      <H2>Full implementation — manual backprop in CNN</H2>
      <Code>{`import numpy as np

def relu(x):    return np.maximum(0, x)
def relu_bp(x): return (x > 0).astype(float)

# ── FORWARD CONVOLUTION (single filter, no padding) ────────
def conv_forward(X, K, b):
    H_in, W_in = X.shape[:2]
    F = K.shape[0]
    H_out, W_out = H_in - F + 1, W_in - F + 1
    Z = np.zeros((H_out, W_out))
    for i in range(H_out):
        for j in range(W_out):
            Z[i,j] = np.sum(X[i:i+F, j:j+F] * K) + b
    cache = (X, K, Z)
    A = relu(Z)
    return A, cache

# ── BACKWARD CONVOLUTION ────────────────────────────────────
def conv_backward(dA, cache):
    X, K, Z = cache
    F = K.shape[0]
    H_out, W_out = dA.shape

    # 1. Backprop through ReLU: dL/dZ = dL/dA * ReLU'(Z)
    dZ = dA * relu_bp(Z)          # element-wise

    # 2. Kernel gradient: dL/dK = conv(X, dZ)
    dK = np.zeros_like(K)
    for m in range(F):
        for n in range(F):
            dK[m,n] = np.sum(dZ * X[m:m+H_out, n:n+W_out])

    # 3. Bias gradient: dL/db = sum(dZ)
    db = np.sum(dZ)

    # 4. Input gradient: dL/dX = full_conv(dZ, K_flipped)
    K_flip = K[::-1, ::-1]         # flip kernel 180°
    pad    = F - 1                  # full convolution needs F-1 padding
    dZ_pad = np.pad(dZ, pad)
    dX = np.zeros_like(X)
    for i in range(X.shape[0]):
        for j in range(X.shape[1]):
            dX[i,j] = np.sum(dZ_pad[i:i+F, j:j+F] * K_flip)

    return dX, dK, db

# ── FORWARD MAX POOL ────────────────────────────────────────
def maxpool_forward(A, size=2, stride=2):
    H, W = A.shape
    H_out, W_out = (H-size)//stride+1, (W-size)//stride+1
    out  = np.zeros((H_out, W_out))
    mask = np.zeros_like(A)              # record argmax positions
    for i in range(H_out):
        for j in range(W_out):
            patch = A[i*stride:i*stride+size, j*stride:j*stride+size]
            out[i,j] = patch.max()
            # Mark the maximum position
            r,c = np.unravel_index(patch.argmax(), patch.shape)
            mask[i*stride+r, j*stride+c] = 1
    return out, mask

# ── BACKWARD MAX POOL ────────────────────────────────────────
def maxpool_backward(dout, mask, size=2, stride=2):
    """Route gradient ONLY to the max-position (mask==1)."""
    dA = np.zeros_like(mask)
    H_out, W_out = dout.shape
    for i in range(H_out):
        for j in range(W_out):
            # Distribute gradient to the winning neuron in each window
            dA[i*stride:i*stride+size, j*stride:j*stride+size] += (
                mask[i*stride:i*stride+size, j*stride:j*stride+size]
                * dout[i, j]
            )
    return dA

# ── FLATTEN / UNFLATTEN ────────────────────────────────────
def flatten_forward(A):
    return A.flatten(), A.shape          # cache original shape

def flatten_backward(df, shape):
    return df.reshape(shape)             # just reshape gradient back

# ── VERIFY GRADIENTS WITH NUMERICAL CHECK ──────────────────
np.random.seed(42)
X  = np.random.randn(5, 5)              # 5×5 input
K  = np.random.randn(3, 3) * 0.1       # 3×3 kernel
b  = 0.1

A, cache = conv_forward(X, K, b)
dA = np.random.randn(*A.shape)          # mock upstream gradient
dX, dK, db_val = conv_backward(dA, cache)

# Numerical gradient check for K
eps = 1e-5
for m in range(3):
    for n in range(3):
        K_plus  = K.copy(); K_plus[m,n]  += eps
        K_minus = K.copy(); K_minus[m,n] -= eps
        A_p,_ = conv_forward(X, K_plus,  b)
        A_m,_ = conv_forward(X, K_minus, b)
        numerical = np.sum(dA * (A_p - A_m)) / (2*eps)
        analytical= dK[m,n]
        assert abs(numerical-analytical) < 1e-5, f"Gradient check failed at K[{m},{n}]!"
print("All gradient checks passed!")`}</Code>

      <QA q="Why is the gradient w.r.t. the input a full (padded) convolution with a flipped kernel?"
          a="In the forward pass, each input pixel X[i,j] contributes to every output position Z[r,c] where the kernel overlaps position (i,j). Specifically, X[i,j] contributes to Z[i-m, j-n] via kernel weight K[m,n] for all valid (m,n). Summing all these contributions (chain rule): ∂L/∂X[i,j] = Σₘ Σₙ ∂L/∂Z[i-m, j-n] · K[m,n]. This pattern — sliding K over ∂L/∂Z and summing — is exactly the definition of a convolution, but with K applied in reverse direction (indices −m, −n instead of +m, +n), which is equivalent to flipping K by 180° and doing a standard full convolution." />
      <QA q="Why does max pooling during backprop create 'winner-take-all' gradients?"
          a="Max pooling selects max(A[i,j]) in the forward pass. The derivative of max(x) with respect to xₖ is 1 if xₖ is the maximum, 0 otherwise (Heaviside). By the chain rule: ∂L/∂A[i,j] = ∂L/∂output · I[A[i,j] = max]. This means only the 'winning' neuron in each pool window receives a gradient. The non-winners' gradients are exactly zero — they didn't affect the output, so the loss didn't depend on them. This sparse gradient flow is one reason why strided convolutions (which have dense gradients) sometimes outperform max pooling for representation learning." />
      <QA q="What does PyTorch's autograd actually store for conv and pool layers?"
          a="For a Conv2d layer: autograd stores the input tensor X and the weight tensor K during forward pass (as the 'saved_tensors' in the backward context). During backward, it uses X to compute ∂L/∂K and K to compute ∂L/∂X using the full-convolution formula. For MaxPool2d: autograd stores the 'indices' — the argmax positions for each pool window (equivalent to our mask M). This is why PyTorch MaxPool2d has a return_indices parameter — those indices are used internally for the backward pass, and also externally for operations like MaxUnpool2d in autoencoders." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 3 — CAT VS DOG PROJECT (Ch. 49)
══════════════════════════════════════════════════════ */
function SectionCatDog() {
  const [tab, setTab] = useState("setup");
  const tabs = [
    ["setup", "Setup & Data"],
    ["model", "Architecture"],
    ["train", "Training"],
    ["overfit", "Overfitting Fix"],
    ["predict", "Predictions"]
  ];

  return (
    <div>
      <P>End-to-end binary image classification project. Kaggle Dogs vs. Cats dataset — 25,000 images. This project covers the full pipeline: preprocessing, architecture, diagnosing overfitting, and deploying fixes.</P>
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 14 }}>
        {tabs.map(([k, l]) => (
          <button key={k} onClick={() => setTab(k)} style={{ padding: "5px 13px", fontSize: 12.5, fontWeight: k === tab ? 500 : 400, border: `0.5px solid var(--color-border-${k === tab ? "info" : "tertiary"})`, borderRadius: "var(--border-radius-md)", background: k === tab ? "var(--color-background-info)" : "transparent", color: k === tab ? "var(--color-text-info)" : "var(--color-text-secondary)", cursor: "pointer" }}>{l}</button>
        ))}
      </div>

      {tab === "setup" && <>
        <H2>Dataset overview</H2>
        <Table heads={["Property", "Value"]} rows={[
          ["Source", "Kaggle Dogs vs. Cats (2013 challenge)"],
          ["Total images", "25,000 (12,500 cats, 12,500 dogs)"],
          ["Format", "JPEG, variable resolution"],
          ["Split used", "Train:20,000 / Val:2,500 / Test:2,500"],
          ["Class balance", "50/50 — binary classification"],
          ["Challenge", "Huge variation in pose, lighting, background"],
        ]} />
        <Code>{`import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
from tensorflow.keras.preprocessing.image import ImageDataGenerator
import matplotlib.pyplot as plt
import numpy as np, os, pathlib

# ── Dataset setup ─────────────────────────────────────────
# Option 1: TensorFlow Datasets (easiest)
import tensorflow_datasets as tfds
(ds_train, ds_val, ds_test), info = tfds.load(
    'cats_vs_dogs',
    split=['train[:80%]', 'train[80%:90%]', 'train[90%:]'],
    as_supervised=True,
    with_info=True
)

# Option 2: Kaggle + local folder structure
# └── data/
#     ├── train/
#     │   ├── cats/  ← image files
#     │   └── dogs/
#     └── validation/
#         ├── cats/
#         └── dogs/

BASE_DIR   = pathlib.Path("data/catdog")
IMG_SIZE   = (180, 180)     # resize all images to this
BATCH_SIZE = 32

# ── Data pipeline with Keras preprocessing ────────────────
def preprocess(image, label):
    image = tf.image.resize(image, IMG_SIZE)          # uniform size
    image = tf.cast(image, tf.float32) / 255.0        # normalize [0,1]
    return image, label

AUTOTUNE = tf.data.AUTOTUNE
train_ds = ds_train.map(preprocess).shuffle(1000).batch(BATCH_SIZE).prefetch(AUTOTUNE)
val_ds   = ds_val.map(preprocess).batch(BATCH_SIZE).prefetch(AUTOTUNE)
test_ds  = ds_test.map(preprocess).batch(BATCH_SIZE).prefetch(AUTOTUNE)

# ── Visualize samples ─────────────────────────────────────
class_names = ["cat", "dog"]
fig, axes = plt.subplots(3, 6, figsize=(14, 7))
for images, labels in train_ds.take(1):
    for i, ax in enumerate(axes.flat):
        ax.imshow(images[i])
        ax.set_title(class_names[labels[i].numpy()], fontsize=9)
        ax.axis('off')
plt.suptitle("Sample Training Images", fontweight='bold')
plt.tight_layout(); plt.show()`}</Code>
      </>}

      {tab === "model" && <>
        <H2>Custom CNN architecture — baseline</H2>
        <Code>{`def build_catdog_cnn(input_shape=(180,180,3)):
    """
    3-block CNN for binary cat/dog classification.
    Each block: Conv → BN → ReLU → MaxPool
    Increasing filter count: 32 → 64 → 128
    """
    model = keras.Sequential([
        layers.Input(shape=input_shape),

        # ── Block 1: low-level features (edges, colors) ───
        layers.Conv2D(32, (3,3), padding='same'),        # (180,180,32)
        layers.BatchNormalization(),
        layers.Activation('relu'),
        layers.Conv2D(32, (3,3), padding='same'),
        layers.BatchNormalization(),
        layers.Activation('relu'),
        layers.MaxPooling2D(2,2),                         # (90, 90,32)
        layers.Dropout(0.25),

        # ── Block 2: mid-level features (textures, shapes) ─
        layers.Conv2D(64, (3,3), padding='same'),         # (90, 90,64)
        layers.BatchNormalization(),
        layers.Activation('relu'),
        layers.Conv2D(64, (3,3), padding='same'),
        layers.BatchNormalization(),
        layers.Activation('relu'),
        layers.MaxPooling2D(2,2),                         # (45, 45,64)
        layers.Dropout(0.25),

        # ── Block 3: high-level features (parts, semantics) ─
        layers.Conv2D(128, (3,3), padding='same'),        # (45, 45,128)
        layers.BatchNormalization(),
        layers.Activation('relu'),
        layers.Conv2D(128, (3,3), padding='same'),
        layers.BatchNormalization(),
        layers.Activation('relu'),
        layers.MaxPooling2D(2,2),                         # (22, 22,128)
        layers.Dropout(0.25),

        # ── Classifier head ──────────────────────────────
        layers.GlobalAveragePooling2D(),                  # (128,)
        layers.Dense(256, activation='relu'),
        layers.Dropout(0.5),
        layers.Dense(1, activation='sigmoid'),            # binary output
    ])

    model.compile(
        optimizer=keras.optimizers.Adam(learning_rate=1e-3),
        loss='binary_crossentropy',
        metrics=['accuracy',
                 keras.metrics.AUC(name='auc'),
                 keras.metrics.Precision(),
                 keras.metrics.Recall()]
    )
    return model

model = build_catdog_cnn()
model.summary()
# Total params: ~1.3M — reasonable for 180×180 input`}</Code>
      </>}

      {tab === "train" && <>
        <H2>Training with callbacks</H2>
        <Code>{`# ── Callbacks ─────────────────────────────────────────────
callbacks_list = [
    keras.callbacks.EarlyStopping(
        monitor='val_accuracy', patience=10,
        restore_best_weights=True
    ),
    keras.callbacks.ReduceLROnPlateau(
        monitor='val_loss', factor=0.5,
        patience=4, min_lr=1e-7, verbose=1
    ),
    keras.callbacks.ModelCheckpoint(
        'best_catdog.keras', monitor='val_accuracy',
        save_best_only=True, mode='max'
    ),
    keras.callbacks.TensorBoard(log_dir='./logs')
]

# ── Training ──────────────────────────────────────────────
history = model.fit(
    train_ds,
    epochs=50,
    validation_data=val_ds,
    callbacks=callbacks_list,
    verbose=1
)

# ── Evaluate on test set ──────────────────────────────────
results = model.evaluate(test_ds, verbose=0)
for name, val in zip(model.metrics_names, results):
    print(f"  {name:<12}: {val:.4f}")

# ── Training curves ───────────────────────────────────────
fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 4))
ax1.plot(history.history['accuracy'],     label='Train', color='steelblue')
ax1.plot(history.history['val_accuracy'], label='Val',   color='coral')
ax1.set_title('Accuracy'); ax1.legend(); ax1.grid(alpha=0.3)

ax2.plot(history.history['loss'],     label='Train', color='steelblue')
ax2.plot(history.history['val_loss'], label='Val',   color='coral')
ax2.set_title('Loss'); ax2.legend(); ax2.grid(alpha=0.3)
plt.suptitle('Training History', fontweight='bold')
plt.tight_layout(); plt.show()

# Typical baseline result (without augmentation):
# Train accuracy: ~92%   Val accuracy: ~78%  → OVERFITTING!`}</Code>
      </>}

      {tab === "overfit" && <>
        <H2>Diagnosing and fixing overfitting</H2>
        <Note color="danger" icon="ti-trending-up">
          <strong>Overfitting signature:</strong> train accuracy → 92%, val accuracy plateaus at ~78%. The 14% gap means the model memorized training examples rather than learning generalizable features.
        </Note>
        <H3>Solution 1: Data Augmentation</H3>
        <Code>{`# ── Augmentation layer (built into model = runs on GPU) ───
data_augmentation = keras.Sequential([
    layers.RandomFlip("horizontal"),          # mirror left-right
    layers.RandomRotation(0.15),              # ±15% rotation
    layers.RandomZoom(0.15),                  # zoom in/out 15%
    layers.RandomTranslation(0.1, 0.1),       # shift 10%
    layers.RandomContrast(0.2),               # brightness/contrast
], name="augmentation")

# ── New model WITH augmentation ───────────────────────────
def build_augmented_cnn(input_shape=(180,180,3)):
    inputs = keras.Input(shape=input_shape)
    x = data_augmentation(inputs)             # augment only during training

    # Block 1
    x = layers.Conv2D(32, 3, padding='same', activation='relu')(x)
    x = layers.BatchNormalization()(x)
    x = layers.Conv2D(32, 3, padding='same', activation='relu')(x)
    x = layers.MaxPooling2D()(x)
    x = layers.Dropout(0.3)(x)               # increased dropout

    # Block 2
    x = layers.Conv2D(64, 3, padding='same', activation='relu')(x)
    x = layers.BatchNormalization()(x)
    x = layers.Conv2D(64, 3, padding='same', activation='relu')(x)
    x = layers.MaxPooling2D()(x)
    x = layers.Dropout(0.3)(x)

    # Block 3
    x = layers.Conv2D(128, 3, padding='same', activation='relu')(x)
    x = layers.BatchNormalization()(x)
    x = layers.MaxPooling2D()(x)

    # Classifier
    x = layers.GlobalAveragePooling2D()(x)
    x = layers.Dense(128, activation='relu',
                     kernel_regularizer=keras.regularizers.l2(1e-4))(x)
    x = layers.Dropout(0.5)(x)
    outputs = layers.Dense(1, activation='sigmoid')(x)
    return keras.Model(inputs, outputs)

model_aug = build_augmented_cnn()
model_aug.compile(optimizer=keras.optimizers.Adam(1e-3),
                  loss='binary_crossentropy', metrics=['accuracy'])

history_aug = model_aug.fit(
    train_ds, epochs=50, validation_data=val_ds,
    callbacks=callbacks_list
)

# Improved result:
# Train accuracy: ~85%   Val accuracy: ~84%  ← gap reduced to 1%!`}</Code>
        <H3>Summary: overfitting solutions applied</H3>
        <Table heads={["Technique", "What it does", "Effect on val accuracy"]} rows={[
          ["Data augmentation", "Creates synthetic variations of training images", "+ 4–6% typically"],
          ["Dropout (0.3–0.5)", "Randomly drops neurons — prevents co-adaptation", "+ 2–3% typically"],
          ["L2 regularization", "Penalizes large weights in FC layers", "+ 1–2% typically"],
          ["BatchNormalization", "Stabilizes activations, mild regularization", "Faster convergence"],
          ["Early stopping", "Stops before val loss begins rising", "Prevents late overfitting"],
          ["Reduce FC size", "Fewer Dense neurons = less capacity to memorize", "+ 1–2% typically"],
          ["Transfer learning", "Use pretrained features (best fix)", "+ 8–15% typically"],
        ]} />
      </>}

      {tab === "predict" && <>
        <H2>Making predictions on new images</H2>
        <Code>{`import numpy as np
from PIL import Image as PILImage

def predict_image(model, img_path, img_size=(180,180), threshold=0.5):
    """
    Full prediction pipeline for a single image file.
    Returns: class name, probability, raw logit
    """
    # Load and preprocess
    img = PILImage.open(img_path).convert('RGB')
    img = img.resize(img_size)
    img_array = np.array(img, dtype='float32') / 255.0
    img_batch = np.expand_dims(img_array, axis=0)  # add batch dim: (1,H,W,C)

    # Predict
    prob = model.predict(img_batch, verbose=0)[0][0]  # scalar in (0,1)
    label = 'dog' if prob >= threshold else 'cat'

    return {
        'label':       label,
        'probability': float(prob),
        'confidence':  float(max(prob, 1-prob)) * 100  # % confident
    }

# ── Batch prediction ──────────────────────────────────────
import glob
test_images = glob.glob("test_images/*.jpg")
results = []
for path in test_images:
    r = predict_image(model_aug, path)
    results.append({'file': path, **r})
    print(f"  {path:<30} → {r['label']:<4}  ({r['confidence']:.1f}% confident)")

# ── Visualize predictions ─────────────────────────────────
fig, axes = plt.subplots(2, 5, figsize=(14, 6))
for ax, res in zip(axes.flat, results[:10]):
    img = PILImage.open(res['file']).resize((180,180))
    ax.imshow(img)
    color = 'green' if res['confidence'] > 85 else 'orange'
    ax.set_title(f"{res['label']} ({res['confidence']:.0f}%)",
                 color=color, fontsize=9)
    ax.axis('off')
plt.suptitle('Cat vs Dog Predictions', fontweight='bold')
plt.tight_layout(); plt.show()

# ── Class Activation Maps (what the model focused on) ─────
def get_class_activation_map(model, img_array):
    """Grad-CAM: highlight which regions influenced the prediction."""
    grad_model = keras.Model(
        inputs=model.inputs,
        outputs=[model.get_layer('conv2d_6').output, model.output]
    )
    with tf.GradientTape() as tape:
        last_conv_output, predictions = grad_model(img_array[np.newaxis])
        pred_index = tf.argmax(predictions[0])
        class_channel = predictions[:, 0]

    grads = tape.gradient(class_channel, last_conv_output)
    pooled_grads = tf.reduce_mean(grads, axis=(0,1,2))
    cam = last_conv_output[0] @ pooled_grads[..., tf.newaxis]
    cam = tf.squeeze(cam)
    cam = tf.maximum(cam, 0) / (tf.math.reduce_max(cam) + 1e-8)
    return cam.numpy()`}</Code>
      </>}

      <H2>Key takeaways</H2>
      <Grid cols={2}>
        <Card color="info" title="Always check for overfitting first">Plot train vs val accuracy every run. A gap &gt; 5% means your model has memorized training data. Apply augmentation and dropout before adding model capacity.</Card>
        <Card color="success" title="Augmentation is free data">Horizontal flip, rotation, zoom, contrast shifts are always safe for natural images. They effectively multiply your dataset 5–10× and are the #1 fix for small datasets.</Card>
      </Grid>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 4 — DATA AUGMENTATION (Ch. 50)
══════════════════════════════════════════════════════ */
function AugViz() {
  const canvasRef = useRef(null);
  const [augType, setAugType] = useState("flip");
  const [intensity, setIntensity] = useState(0.5);

  useEffect(() => {
    const cv = canvasRef.current; if (!cv) return;
    const ctx = cv.getContext("2d");
    const W = cv.width, H = cv.height;
    ctx.clearRect(0, 0, W, H);

    // Draw a simple "cat face" silhouette
    const cx = 80, cy = 80, r = 50;
    const drawCat = (tx, ty, scaleX = 1, scaleY = 1, angle = 0, alpha = 1) => {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.translate(tx, ty);
      ctx.rotate(angle);
      ctx.scale(scaleX, scaleY);
      // Face
      ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.fillStyle = "#EF9F2788"; ctx.fill();
      ctx.strokeStyle = "#EF9F27"; ctx.lineWidth = 2; ctx.stroke();
      // Eyes
      [[-20, -10], [20, -10]].forEach(([ex, ey]) => {
        ctx.beginPath(); ctx.arc(ex, ey, 8, 0, Math.PI * 2);
        ctx.fillStyle = "#185FA5"; ctx.fill();
      });
      // Nose
      ctx.beginPath(); ctx.arc(0, 10, 5, 0, Math.PI * 2);
      ctx.fillStyle = "#E24B4A"; ctx.fill();
      // Ears
      [[cx - 50 + r * 0.4, cy - r, cx - 50 + r * 0.6, cy - r * 1.3, cx - 50 + r * 0.8, cy - r],
       [cx - cx + r * -0.4 - cx / 2, cy - r, cx - cx + r * -0.6 - cx / 2, cy - r * 1.3, cx - cx + r * -0.8 - cx / 2, cy - r]
      ];
      [[-1, 1], [1, 1]].forEach(([sx]) => {
        ctx.beginPath();
        ctx.moveTo(sx * 20, -r + 5); ctx.lineTo(sx * 35, -r - 20); ctx.lineTo(sx * 5, -r + 5);
        ctx.fillStyle = "#EF9F27"; ctx.fill();
      });
      ctx.restore();
    };

    // Original
    ctx.fillStyle = "rgba(128,128,128,0.1)"; ctx.fillRect(10, 10, 155, 155);
    ctx.fillStyle = "var(--color-text-tertiary)"; ctx.font = "11px var(--font-sans)"; ctx.fillText("Original", 10, 175);
    drawCat(82, 82);

    // Augmented versions
    const aug = {
      flip: () => { ctx.fillRect(180, 10, 155, 155); ctx.fillText("Horizontal Flip", 180, 175); drawCat(257, 82, -1, 1); },
      rotate: () => { ctx.fillRect(180, 10, 155, 155); ctx.fillText(`Rotate ${(intensity * 30).toFixed(0)}°`, 180, 175); drawCat(257, 82, 1, 1, intensity * 0.52); },
      zoom: () => { ctx.fillRect(180, 10, 155, 155); ctx.fillText(`Zoom ${(1 + intensity * 0.3).toFixed(2)}×`, 180, 175); drawCat(257, 82, 1 + intensity * 0.3, 1 + intensity * 0.3); },
      translate: () => { ctx.fillRect(180, 10, 155, 155); ctx.fillText(`Translate`, 180, 175); drawCat(257 + intensity * 30, 82 + intensity * 20); },
      contrast: () => { ctx.fillRect(180, 10, 155, 155); ctx.fillText(`Contrast ↑`, 180, 175); drawCat(257, 82, 1, 1, 0, 0.3 + intensity * 0.7); },
    };
    ctx.fillStyle = "rgba(128,128,128,0.1)";
    if (aug[augType]) aug[augType]();
  }, [augType, intensity]);

  return (
    <VizBox>
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 10 }}>
        {[
          ["flip", "H-Flip"],
          ["rotate", "Rotation"],
          ["zoom", "Zoom"],
          ["translate", "Translate"],
          ["contrast", "Contrast"]
        ].map(([k, l]) => (
          <button key={k} onClick={() => setAugType(k)} style={{ padding: "4px 10px", fontSize: 11.5, fontWeight: k === augType ? 500 : 400, border: `0.5px solid var(--color-border-${k === augType ? "info" : "tertiary"})`, borderRadius: "20px", background: k === augType ? "var(--color-background-info)" : "transparent", color: k === augType ? "var(--color-text-info)" : "var(--color-text-secondary)", cursor: "pointer" }}>{l}</button>
        ))}
      </div>
      <canvas ref={canvasRef} width={370} height={185} style={{ display: "block", margin: "0 auto", maxWidth: "100%" }} />
      {augType !== "flip" && (
        <div style={{ display: "flex", gap: 8, alignItems: "center", justifyContent: "center", marginTop: 8, fontSize: 12.5 }}>
          <span style={{ color: "var(--color-text-secondary)" }}>Intensity</span>
          <input type="range" min={0.1} max={1} step={0.05} value={intensity} onChange={e => setIntensity(+e.target.value)} style={{ width: 120 }} />
        </div>
      )}
    </VizBox>
  );
}

function SectionAugmentation() {
  return (
    <div>
      <P>Data augmentation artificially increases training set size by creating modified copies of existing images. It's the single most effective technique to reduce overfitting when you have limited data.</P>
      <H2>Why augmentation works</H2>
      <Mx block>{`  Model learns: "this pattern → cat" (from one pose, one lighting)
  
  With augmentation:
  - Horizontal flip: "cat facing right" ≡ "cat facing left"
  - Rotation: "upright cat" ≡ "slightly tilted cat"
  - Zoom: "close cat" ≡ "distant cat"
  - Brightness shift: "well-lit cat" ≡ "dark cat"
  
  The model sees more diverse examples → stronger generalization.
  The LABEL stays the same — only the IMAGE changes.
  
  Key constraint: augmentations must be LABEL-PRESERVING.
  ✓ Horizontal flip of a cat = still a cat
  ✗ Rotating a digit 6 by 180° → looks like 9 (wrong label!)`}</Mx>

      <H2>Interactive augmentation demo</H2>
      <AugViz />

      <H2>Complete augmentation reference</H2>
      <Table heads={["Augmentation", "Safe for", "Avoid when", "Keras API"]} rows={[
        ["Horizontal flip", "Most objects, animals, scenes", "Text, asymmetric objects", "RandomFlip('horizontal')"],
        ["Vertical flip", "Satellite imagery, textures", "Faces, animals, most scenes", "RandomFlip('vertical')"],
        ["Rotation", "Circular objects, cells", "Digits (6→9), text", "RandomRotation(0.1)"],
        ["Random crop", "All images (with padding)", "Very small subjects", "RandomCrop / CenterCrop"],
        ["Zoom in/out", "Most objects", "Very fine-grained details", "RandomZoom(0.1,0.1)"],
        ["Brightness/contrast", "Natural images", "Medical imaging (calibrated)", "RandomBrightness(0.2)"],
        ["Color jitter", "Natural images", "Grayscale images", "RandomContrast(0.2)"],
        ["Gaussian noise", "All images", "Noise-sensitive tasks", "Add Gaussian noise layer"],
        ["Cutout / CutMix", "Classification", "Detection (bboxes need update)", "tf-addons or custom"],
        ["MixUp", "Classification", "When interpretability matters", "Custom implementation"],
      ]} />

      <H2>Implementation — all strategies</H2>
      <Code>{`import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
import numpy as np

# ══ Strategy 1: Keras built-in augmentation layers ═════════
# Runs ON GPU — augmentation happens inside model.fit()
data_augmentation = keras.Sequential([
    layers.RandomFlip("horizontal"),
    layers.RandomRotation(0.1),           # ±10% of 2π radians
    layers.RandomZoom(0.1),               # zoom factor in [-0.1, 0.1]
    layers.RandomTranslation(0.1, 0.1),   # shift ±10% of H and W
    layers.RandomContrast(0.2),           # contrast factor
], name="augmentation")

# ══ Strategy 2: tf.image ops in dataset pipeline ═══════════
def augment_fn(image, label):
    # Geometric
    image = tf.image.random_flip_left_right(image)
    image = tf.image.random_flip_up_down(image)       # for satellite imagery
    image = tf.image.rot90(image, k=tf.random.uniform([], 0, 4, dtype=tf.int32))

    # Color
    image = tf.image.random_brightness(image, max_delta=0.2)
    image = tf.image.random_contrast(image, lower=0.8, upper=1.2)
    image = tf.image.random_saturation(image, lower=0.8, upper=1.2)
    image = tf.image.random_hue(image, max_delta=0.1)
    image = tf.clip_by_value(image, 0.0, 1.0)         # keep in valid range

    # Noise
    noise = tf.random.normal(tf.shape(image), stddev=0.02)
    image = tf.clip_by_value(image + noise, 0.0, 1.0)
    return image, label

# Apply only to training set!
train_ds_aug = train_ds.map(augment_fn, num_parallel_calls=tf.data.AUTOTUNE)

# ══ Strategy 3: Advanced — CutMix (state of the art) ═══════
def cutmix(images, labels, alpha=1.0):
    """
    CutMix: paste a rectangular crop from image B onto image A.
    Label is a weighted combination based on crop area.
    """
    batch_size = tf.shape(images)[0]
    H, W = tf.shape(images)[1], tf.shape(images)[2]

    # Sample mixing ratio from Beta distribution
    lam = tf.random.uniform((), minval=0, maxval=1)
    cut_ratio = tf.sqrt(1.0 - lam)
    cut_h = tf.cast(tf.cast(H, tf.float32) * cut_ratio, tf.int32)
    cut_w = tf.cast(tf.cast(W, tf.float32) * cut_ratio, tf.int32)

    # Random position
    cy = tf.random.uniform((), 0, H, dtype=tf.int32)
    cx = tf.random.uniform((), 0, W, dtype=tf.int32)
    y1 = tf.maximum(0, cy - cut_h // 2)
    x1 = tf.maximum(0, cx - cut_w // 2)
    y2 = tf.minimum(H, cy + cut_h // 2)
    x2 = tf.minimum(W, cx + cut_w // 2)

    # Create mixed images (simplified version)
    indices = tf.random.shuffle(tf.range(batch_size))
    mixed_images = images  # In practice, paste crop from shuffled images
    lam = 1.0 - tf.cast((y2-y1)*(x2-x1), tf.float32) / tf.cast(H*W, tf.float32)
    mixed_labels = lam * labels + (1-lam) * tf.gather(labels, indices)
    return mixed_images, mixed_labels

# ══ Strategy 4: MixUp ══════════════════════════════════════
def mixup(images, labels, alpha=0.2):
    """Linearly interpolate pairs of images and their labels."""
    batch_size = tf.shape(images)[0]
    lam = tf.random.uniform((), minval=0, maxval=1)
    indices = tf.random.shuffle(tf.range(batch_size))
    mixed_images = lam * images + (1-lam) * tf.gather(images, indices)
    mixed_labels = lam * labels + (1-lam) * tf.gather(labels, indices)
    return mixed_images, mixed_labels

# ══ Augmentation schedule tip: warm up, then augment ═══════
class AugmentationScheduler(keras.callbacks.Callback):
    """Gradually increase augmentation intensity during training."""
    def __init__(self, aug_layer, warmup_epochs=5):
        self.aug_layer = aug_layer
        self.warmup = warmup_epochs

    def on_epoch_begin(self, epoch, logs=None):
        # Enable augmentation only after warmup
        self.aug_layer.trainable = epoch >= self.warmup`}</Code>

      <QA q="Should augmentation be applied during validation and testing?"
          a="<strong>Never.</strong> Augmentation is purely a training-time technique. During validation and testing, you evaluate on clean, unmodified images to get an unbiased estimate of real-world performance. Augmenting test images would add randomness to your evaluation — you'd get different accuracy each run — making results meaningless. In Keras, the built-in augmentation layers (RandomFlip, etc.) automatically turn off during inference (when <code>training=False</code>, the default in model.evaluate and model.predict)." />
      <QA q="What is the difference between CutMix, MixUp, and standard augmentation?"
          a="Standard augmentation (flip, rotate, zoom) transforms a single image without changing its label. <strong>MixUp</strong> creates a new image as a pixel-wise linear interpolation of two images: x = λ·x₁ + (1-λ)·x₂, with a soft label y = λ·y₁ + (1-λ)·y₂. <strong>CutMix</strong> is stronger: it pastes a rectangular region from one image into another and adjusts labels proportionally to the pasted area. Both MixUp and CutMix train the model to produce smoother decision boundaries and are particularly effective for fine-grained classification. They were state-of-the-art on ImageNet benchmarks for 2019-2021." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 5 — PRETRAINED MODELS + TRANSFER LEARNING (Ch. 51-53)
══════════════════════════════════════════════════════ */
function ArchitectureTimeline() {
  const archs = [
    { year: 1998, name: "LeNet-5", params: "61K", top5: "—", key: "First practical CNN; digit recognition" },
    { year: 2012, name: "AlexNet", params: "60M", top5: "15.3%", key: "Won ImageNet by huge margin; ReLU, GPU, Dropout" },
    { year: 2014, name: "VGG-16", params: "138M", top5: "7.3%", key: "All 3×3 kernels; very deep; simple design" },
    { year: 2014, name: "GoogLeNet", params: "7M", top5: "6.7%", key: "Inception modules; 10× fewer params than VGG" },
    { year: 2015, name: "ResNet-50", params: "25M", top5: "5.3%", key: "Residual connections; 152 layers; human-level" },
    { year: 2017, name: "DenseNet", params: "8M", top5: "5.3%", key: "Dense connections; feature reuse; efficient" },
    { year: 2019, name: "EfficientNet", params: "5.3M", top5: "2.9%", key: "Neural architecture search; compound scaling" },
    { year: 2021, name: "ViT-L/16", params: "307M", top5: "1.5%", key: "Vision Transformer; attention, no conv" },
  ];
  return (
    <VizBox>
      <div style={{ position: "relative", paddingLeft: 24, borderLeft: "2px solid var(--color-border-secondary)" }}>
        {archs.map(({ year, name, params, top5, key }) => (
          <div key={name} style={{ marginBottom: 12, position: "relative" }}>
            <div style={{ position: "absolute", left: -30, top: 4, width: 11, height: 11, borderRadius: "50%", background: "var(--color-background-info)", border: "2px solid var(--color-border-info)" }} />
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "baseline" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 11.5, color: "var(--color-text-info)", minWidth: 36 }}>{year}</span>
              <span style={{ fontWeight: 600, fontSize: 13.5, color: "var(--color-text-primary)", minWidth: 90 }}>{name}</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 11.5, color: "var(--color-text-secondary)", minWidth: 50 }}>{params}</span>
              {top5 !== "—" && <span style={{ fontSize: 11.5, color: "var(--color-text-success)" }}>Top-5: {top5}</span>}
            </div>
            <div style={{ fontSize: 12, color: "var(--color-text-secondary)", marginLeft: 46, marginTop: 2 }}>{key}</div>
          </div>
        ))}
      </div>
    </VizBox>
  );
}

function SectionTransferLearning() {
  const [tlMode, setTlMode] = useState("extract");
  return (
    <div>
      <H2>Famous CNN architectures & ImageNet</H2>
      <P>ImageNet has 1.2M training images across 1,000 classes. The ILSVRC (ImageNet Large Scale Visual Recognition Challenge) drove the deep learning revolution. Models pretrained on it have learned powerful general visual features reusable for most vision tasks.</P>
      <ArchitectureTimeline />

      <H2>AlexNet — the architecture that changed everything</H2>
      <Mx block>{`  Input: 224×224×3 RGB image

  Layer 1: Conv(96, 11×11, stride=4)  → 55×55×96
           MaxPool(3×3, stride=2)      → 27×27×96
  Layer 2: Conv(256, 5×5, padding=2)  → 27×27×256
           MaxPool(3×3, stride=2)      → 13×13×256
  Layer 3: Conv(384, 3×3, padding=1)  → 13×13×384
  Layer 4: Conv(384, 3×3, padding=1)  → 13×13×384
  Layer 5: Conv(256, 3×3, padding=1)  → 13×13×256
           MaxPool(3×3, stride=2)      → 6×6×256
  Flatten:                            → 9,216
  FC1: Dense(4096)  + ReLU + Dropout
  FC2: Dense(4096)  + ReLU + Dropout
  FC3: Dense(1000)  + Softmax

  Total: ~60M parameters
  
  Key innovations:
  ✓ ReLU activations (first mainstream use)
  ✓ Dropout in FC layers (0.5)
  ✓ GPU training (2× GTX 580)
  ✓ Local Response Normalization (later replaced by BatchNorm)
  ✓ Data augmentation (crops + color jitter)
  ✓ Won ILSVRC 2012 with 15.3% top-5 error (vs 26.2% second)`}</Mx>

      <H2>Transfer Learning: Feature Extraction vs Fine-Tuning</H2>
      <P>Transfer learning reuses a model trained on a large dataset (typically ImageNet) for a new, different task. The key insight: early CNN layers learn universal features (edges, textures, shapes) that are useful for almost any visual task.</P>

      <Note color="info" icon="ti-arrows-transfer">
        <strong>Why it works:</strong> A ResNet-50 trained on 1,000 ImageNet classes has learned to detect edges → textures → object parts → objects in a universal hierarchy. For a new task (e.g., classifying medical X-rays), the lower layers' features (edges, textures) are immediately useful — you're not starting from scratch.
      </Note>

      <H3>Two approaches — choose based on data size and similarity</H3>
      <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
        {[
          ["extract", "Feature Extraction"],
          ["finetune", "Fine-Tuning"]
        ].map(([k, l]) => (
          <button key={k} onClick={() => setTlMode(k)} style={{ padding: "6px 16px", fontSize: 13, fontWeight: k === tlMode ? 500 : 400, border: `0.5px solid var(--color-border-${k === tlMode ? "info" : "tertiary"})`, borderRadius: "var(--border-radius-md)", background: k === tlMode ? "var(--color-background-info)" : "transparent", color: k === tlMode ? "var(--color-text-info)" : "var(--color-text-secondary)", cursor: "pointer" }}>{l}</button>
        ))}
      </div>

      {tlMode === "extract" && <>
        <Note color="success" icon="ti-lock">
          <strong>Feature Extraction:</strong> Freeze ALL pretrained layers. Add a new head. Only the new head's weights are trained. The pretrained network is used as a fixed feature extractor.
        </Note>
        <Mx block>{`  Frozen backbone → new classifier head

  ┌──────────────────────────────────────────────────────┐
  │ VGG16 / ResNet50 (ImageNet weights) — FROZEN         │
  │  Conv blocks 1–5: learning edges, textures, objects  │
  │  weights are LOCKED — gradient does NOT flow through │
  └─────────────────────────────────────────────────────┘
                          ↓ feature vector
  ┌──────────────────────────────────────────────────────┐
  │ NEW HEAD — only this is trained                      │
  │  GlobalAveragePooling → Dense(256) → Dense(N_classes)│
  └──────────────────────────────────────────────────────┘

  When to use:
  ✓ Small dataset (< 2,000 images per class)
  ✓ New task similar to ImageNet (natural images)
  ✓ Limited compute budget
  ✓ Want fast training (train only new head)`}</Mx>
        <Code>{`import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers

# ── Feature Extraction with VGG16 ─────────────────────────
base_model = keras.applications.VGG16(
    weights='imagenet',        # download pretrained weights
    include_top=False,         # exclude VGG's 3 FC layers
    input_shape=(224, 224, 3)
)

# FREEZE the entire backbone — no updates during training
base_model.trainable = False

# Build new classifier head
inputs  = keras.Input(shape=(224, 224, 3))
x       = base_model(inputs, training=False)   # training=False = no BatchNorm update
x       = layers.GlobalAveragePooling2D()(x)
x       = layers.Dense(256, activation='relu')(x)
x       = layers.Dropout(0.5)(x)
outputs = layers.Dense(5, activation='softmax')(x)  # 5 new classes

model = keras.Model(inputs, outputs)

# Only the new head's params train:
print(f"Total params:     {model.count_params():,}")
print(f"Trainable:        {sum(v.numpy().size for v in model.trainable_weights):,}")
print(f"Non-trainable:    {sum(v.numpy().size for v in model.non_trainable_weights):,}")

model.compile(
    optimizer=keras.optimizers.Adam(learning_rate=1e-3),
    loss='sparse_categorical_crossentropy',
    metrics=['accuracy']
)

# Preprocessing: VGG16 expects images preprocessed its specific way
preprocess_input = keras.applications.vgg16.preprocess_input

def preprocess(img, label):
    img = tf.image.resize(img, (224, 224))
    img = preprocess_input(img)    # specific to VGG16 (subtracts ImageNet mean)
    return img, label

# Typical result on small custom dataset:
# Without transfer learning:  ~55% accuracy
# With feature extraction:    ~85% accuracy
# With fine-tuning (below):   ~93% accuracy`}</Code>
      </>}

      {tlMode === "finetune" && <>
        <Note color="warning" icon="ti-settings">
          <strong>Fine-Tuning:</strong> Unfreeze SOME pretrained layers (usually the later ones) and train them together with the new head at a very low learning rate. Deeper customization at the cost of more compute and data.
        </Note>
        <Mx block>{`  Strategy: two-phase training

  Phase 1 (Feature Extraction):
    Freeze backbone → train new head only
    LR = 1e-3, epochs = 10
    Goal: initialize new head weights to reasonable values
    (If you unfreeze immediately, large gradients from random
     head will destroy pretrained weights → catastrophic forgetting)

  Phase 2 (Fine-Tuning):
    Unfreeze LAST N layers of backbone
    Use VERY LOW LR = 1e-5 (or 1e-4 max!)
    Train backbone + head jointly
    Goal: adapt late features to your specific domain

  Which layers to unfreeze?
  ✓ Later layers (block4, block5 in VGG): task-specific features
  ✗ Early layers (block1, block2): universal edges/textures
                                   — these are already optimal
                                   — low LR, barely update
  
  Rule of thumb:
    Data very similar to ImageNet:  unfreeze last 1–2 blocks
    Data somewhat different:        unfreeze last 3–4 blocks
    Data very different (medical):  unfreeze more or from scratch`}</Mx>
        <Code>{`# ── Phase 1: Feature Extraction (same as above) ───────────
base_model = keras.applications.ResNet50(
    weights='imagenet', include_top=False, input_shape=(224,224,3)
)
base_model.trainable = False

inputs  = keras.Input(shape=(224,224,3))
x       = base_model(inputs, training=False)
x       = layers.GlobalAveragePooling2D()(x)
x       = layers.Dense(256, activation='relu')(x)
x       = layers.Dropout(0.5)(x)
outputs = layers.Dense(n_classes, activation='softmax')(x)

model = keras.Model(inputs, outputs)
model.compile(keras.optimizers.Adam(1e-3), 'sparse_categorical_crossentropy', ['accuracy'])

print("Phase 1: Training new head only...")
model.fit(train_ds, epochs=10, validation_data=val_ds)

# ── Phase 2: Fine-Tune last N layers of backbone ───────────
base_model.trainable = True   # unfreeze all layers first

# Then RE-FREEZE early layers: keep robust low-level features
freeze_until = 'conv4_block1_1_conv'  # layer name in ResNet50
set_trainable = False
for layer in base_model.layers:
    if layer.name == freeze_until:
        set_trainable = True
    layer.trainable = set_trainable

trainable_count = sum(v.numpy().size for v in model.trainable_weights)
print(f"Phase 2: {trainable_count:,} trainable params ({trainable_count/model.count_params()*100:.1f}%)")

# CRUCIAL: very low LR to avoid destroying pretrained weights!
model.compile(
    optimizer=keras.optimizers.Adam(learning_rate=1e-5),   # 100× lower!
    loss='sparse_categorical_crossentropy',
    metrics=['accuracy']
)

callbacks_ft = [
    keras.callbacks.EarlyStopping(patience=5, restore_best_weights=True),
    keras.callbacks.ReduceLROnPlateau(factor=0.2, patience=2, min_lr=1e-8),
]

print("Phase 2: Fine-tuning last blocks...")
history_ft = model.fit(
    train_ds, epochs=30,
    validation_data=val_ds,
    callbacks=callbacks_ft
)

# ── Alternative: use all major pretrained models ────────────
MODEL_REGISTRY = {
    'vgg16':        (keras.applications.VGG16,        keras.applications.vgg16.preprocess_input),
    'resnet50':     (keras.applications.ResNet50,      keras.applications.resnet50.preprocess_input),
    'resnet50v2':   (keras.applications.ResNet50V2,    keras.applications.resnet_v2.preprocess_input),
    'efficientnetb0':(keras.applications.EfficientNetB0, keras.applications.efficientnet.preprocess_input),
    'efficientnetb3':(keras.applications.EfficientNetB3, keras.applications.efficientnet.preprocess_input),
    'mobilenetv2':  (keras.applications.MobileNetV2,   keras.applications.mobilenet_v2.preprocess_input),
    'inceptionv3':  (keras.applications.InceptionV3,   keras.applications.inception_v3.preprocess_input),
    'densenet121':  (keras.applications.DenseNet121,   keras.applications.densenet.preprocess_input),
    'xception':     (keras.applications.Xception,      keras.applications.xception.preprocess_input),
}

def build_transfer_model(model_name, n_classes, input_shape=(224,224,3),
                          freeze=True, fine_tune_layers=0):
    ModelClass, preprocess = MODEL_REGISTRY[model_name]
    base = ModelClass(weights='imagenet', include_top=False, input_shape=input_shape)
    if freeze:
        base.trainable = False
        if fine_tune_layers > 0:
            for layer in base.layers[-fine_tune_layers:]:
                layer.trainable = True
    inputs  = keras.Input(shape=input_shape)
    x       = preprocess(inputs)             # model-specific preprocessing
    x       = base(x, training=not freeze)
    x       = layers.GlobalAveragePooling2D()(x)
    x       = layers.Dense(256, 'relu')(x)
    x       = layers.Dropout(0.4)(x)
    outputs = layers.Dense(n_classes, 'softmax')(x)
    return keras.Model(inputs, outputs, name=f"transfer_{model_name}")`}</Code>
      </>}

      <H2>Decision framework: which approach?</H2>
      <Table heads={["Scenario", "Dataset size", "Similarity to ImageNet", "Recommended approach", "Expected accuracy gain"]} rows={[
        ["Natural images, few shots", "< 500/class", "High", "Feature extraction", "60% → 85-90%"],
        ["Natural images, moderate", "500-2K/class", "High", "Feature extraction + fine-tune last block", "80% → 90-93%"],
        ["Natural images, large", "> 5K/class", "High", "Full fine-tuning all blocks", "Train fresh or fine-tune all"],
        ["Domain-specific (medical)", "Any", "Low", "Fine-tune more layers or from scratch", "Highly variable"],
        ["Very different domain (satellite)", "Large", "Low", "Fine-tune all or train from scratch", "Depends on data quality"],
        ["Production, edge device", "—", "—", "MobileNetV2 / EfficientNetB0", "Speed-accuracy trade-off"],
      ]} />

      <H2>What does a CNN see? Visualizing features</H2>
      <Code>{`import numpy as np
import matplotlib.pyplot as plt
import tensorflow as tf
from tensorflow import keras

# ── 1. Visualize Conv1 filters ────────────────────────────
model = keras.applications.VGG16(weights='imagenet', include_top=False)

def visualize_filters(model, layer_name, n_cols=8):
    layer = model.get_layer(layer_name)
    filters = layer.get_weights()[0]                # (F,F,C_in,C_out)
    n_filters = filters.shape[-1]
    n_rows = (n_filters + n_cols - 1) // n_cols
    fig, axes = plt.subplots(n_rows, n_cols, figsize=(n_cols*1.5, n_rows*1.5))
    for i in range(n_filters):
        ax = axes[i//n_cols, i%n_cols] if n_rows > 1 else axes[i%n_cols]
        f = filters[:,:,:,i]
        f = (f - f.min()) / (f.max() - f.min() + 1e-8)  # normalize
        # For RGB (C_in=3), show as color filter
        if f.shape[2] >= 3:
            ax.imshow(f[:,:,:3])
        else:
            ax.imshow(f[:,:,0], cmap='viridis')
        ax.axis('off'); ax.set_title(f"F{i}", fontsize=6)
    plt.suptitle(f"Learned filters: {layer_name}", fontweight='bold')
    plt.tight_layout(); plt.show()

visualize_filters(model, 'block1_conv1')
# Layer 1: Gabor-like edge detectors at various orientations/colors
# Layer 2: More complex texture detectors
# Layer 5: Abstract, hard to interpret visually

# ── 2. Visualize feature maps (activations) ───────────────
def visualize_feature_maps(model, img_array, layer_names):
    """Show what each conv layer 'sees' for a given image."""
    activation_model = keras.Model(
        inputs=model.inputs,
        outputs=[model.get_layer(name).output for name in layer_names]
    )
    activations = activation_model.predict(img_array[np.newaxis])

    for layer_name, activation in zip(layer_names, activations):
        n_features = activation.shape[-1]
        n_cols = 8
        n_rows = min(4, (n_features + n_cols - 1) // n_cols)
        fig, axes = plt.subplots(n_rows, n_cols, figsize=(n_cols*2, n_rows*2))
        for i in range(n_rows * n_cols):
            ax = axes[i//n_cols, i%n_cols] if n_rows > 1 else axes[i]
            if i < n_features:
                channel_image = activation[0, :, :, i]
                channel_image = (channel_image - channel_image.mean()) / (channel_image.std() + 1e-8)
                ax.imshow(channel_image, cmap='viridis')
            ax.axis('off')
        plt.suptitle(f"Feature maps: {layer_name} ({n_features} filters)",
                     fontweight='bold')
        plt.tight_layout(); plt.show()

layer_names = ['block1_conv1', 'block2_conv1', 'block3_conv1', 'block4_conv1']
# Layer 1: edge detectors — sharp, interpretable patterns
# Layer 2: texture combinations — stripes, grids, circles
# Layer 3-4: complex patterns — hard to interpret visually
# Layer 5: very abstract — semantic object detectors

# ── 3. Grad-CAM: localization maps ────────────────────────
def grad_cam(model, img_array, class_index, last_conv_layer_name):
    """
    Highlight regions that most influenced the prediction.
    Result: heatmap overlay on original image.
    """
    grad_model = keras.Model(
        inputs=model.inputs,
        outputs=[model.get_layer(last_conv_layer_name).output, model.output]
    )
    with tf.GradientTape() as tape:
        last_conv_output, preds = grad_model(img_array[np.newaxis])
        class_score = preds[:, class_index]

    # Compute gradient of class score w.r.t. last conv output
    grads = tape.gradient(class_score, last_conv_output)          # (1,H,W,C)
    pooled_grads = tf.reduce_mean(grads, axis=(0,1,2))            # (C,)

    # Weight each feature map by its gradient importance
    last_conv_output = last_conv_output[0]                        # (H,W,C)
    cam = last_conv_output @ pooled_grads[..., tf.newaxis]        # (H,W,1)
    cam = tf.squeeze(cam)
    cam = tf.nn.relu(cam)                                         # keep positive only
    cam = cam / (tf.reduce_max(cam) + 1e-8)                      # normalize [0,1]

    # Resize to original image size and overlay
    cam_resized = tf.image.resize(cam[..., tf.newaxis], img_array.shape[:2])
    return cam_resized.numpy().squeeze()

# Usage:
# heatmap = grad_cam(model, img, predicted_class, 'block5_conv3')
# plt.imshow(img); plt.imshow(heatmap, cmap='jet', alpha=0.5)`}</Code>

      <QA q="What is catastrophic forgetting and how do you prevent it in fine-tuning?"
          a="Catastrophic forgetting occurs when fine-tuning a pretrained model with a large learning rate — the backpropagated gradients from the new task's loss are so large they overwrite the carefully learned ImageNet weights, destroying the representations. The model 'forgets' what it learned before. Prevention: (1) <strong>Two-phase training</strong> — first train only the new head (keeps backbone weights stable), then fine-tune with a very low LR (1e-5 or less). (2) <strong>Layer-wise learning rate decay</strong> — earlier layers get even lower LR (e.g., 1e-6) since their features need less adjustment. (3) <strong>Elastic Weight Consolidation (EWC)</strong> — adds a penalty for changing weights that were important to the original task." />
      <QA q="Why does feature extraction work even when the new task is very different from ImageNet?"
          a="The first few layers of any CNN trained on natural images learn genuinely universal features: Gabor-like edge detectors, color blob detectors, texture patterns. These emerge because they are the optimal first-stage representation of natural image statistics — not specific to ImageNet's 1,000 classes. Even for medical images (X-rays, histology), the low-level features from ImageNet provide a better initialization than random weights, because (1) gradient descent starts from a much better basin of attraction, (2) the optimization landscape near ImageNet weights is smoother, (3) the network doesn't waste capacity re-learning basic image statistics." />
      <QA q="How do you choose between VGG, ResNet, EfficientNet, and MobileNet for transfer learning?"
          a="<strong>VGG16/19</strong>: simplest architecture, easy to interpret feature maps, large (138M params) — good for research and prototyping but slow in production. <strong>ResNet50/101</strong>: excellent balance of accuracy and speed, widely studied, good transfer performance across domains — the default choice for most tasks. <strong>EfficientNetB0-B7</strong>: best accuracy per parameter, uses compound scaling — best choice when parameter efficiency matters. <strong>MobileNetV2/V3</strong>: optimized for mobile/edge devices (extremely fast, small) — use when deploying on phones or IoT devices. Rule: start with EfficientNetB0 for accuracy, MobileNetV2 for speed, ResNet50 for reliability and interpretability." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   ROOT
══════════════════════════════════════════════════════ */
const TABS = [
  { id: "vs", label: "CNN vs ANN" },
  { id: "bp", label: "Backprop in CNN" },
  { id: "proj", label: "Cat vs Dog Project" },
  { id: "aug", label: "Data Augmentation" },
  { id: "tl", label: "Pretrained & TL" },
];

export default function CNNAdvanced() {
  const [active, setActive] = useState("vs");
  const map = { vs: <SectionCNNvsANN />, bp: <SectionBackpropCNN />, proj: <SectionCatDog />, aug: <SectionAugmentation />, tl: <SectionTransferLearning /> };
  
  return (
    <div>
      <div className="page-header">
        <div className="page-header-eyebrow">Deep Learning — Module 12</div>
        <h1 className="page-header-title">CNN vs ANN · Backprop · Projects · Augmentation · Transfer Learning</h1>
        <p className="page-header-subtitle">Chapters 46–53 · Full backprop math · Complete projects · Production transfer learning code</p>
      </div>

      <SectionNav tabs={TABS} active={active} onChange={setActive} />

      <div style={{ padding: "0.5rem 0 2rem" }}>
        {map[active]}
      </div>

      <NavButtons moduleId={12} />
    </div>
  );
}
