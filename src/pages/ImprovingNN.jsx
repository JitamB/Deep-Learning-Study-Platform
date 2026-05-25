import { useState, useRef, useEffect, useCallback } from "react";
import { Code } from '../components/ui/Code.jsx';
import { Mx, H2, H3, P } from '../components/ui/Typography.jsx';
import { QA } from '../components/ui/QA.jsx';
import { Note, Grid, Card, Table, VizBox } from '../components/ui/Primitives.jsx';
import NavButtons from '../components/layout/NavButtons.jsx';
import SectionNav from '../components/layout/SectionNav.jsx';

/* ══════════════════════════════════════════════════════
   SECTION 1 — OVERVIEW + EARLY STOPPING
══════════════════════════════════════════════════════ */
function EarlyStoppingCurve() {
  const ref = useRef(null);
  const [patience, setPatience] = useState(10);
  const [noise, setNoise] = useState(0.5);

  useEffect(() => {
    const cv = ref.current; if (!cv) return;
    const ctx = cv.getContext("2d");
    const W = cv.width, H = cv.height;
    ctx.clearRect(0, 0, W, H);

    // Simulate training/val loss curves
    const n = 80;
    const trainLoss = [], valLoss = [];
    let rng = 42;
    const rand = () => { rng = (rng * 1664525 + 1013904223) & 0xFFFFFFFF; return (rng >>> 0) / 0xFFFFFFFF; };

    for (let i = 0; i < n; i++) {
      const t = i / n;
      trainLoss.push(1.8 * Math.exp(-4.5 * t) + 0.12 + 0.03 * (rand() - 0.5));
      const overfit = i > 35 ? 0.008 * (i - 35) : 0;
      valLoss.push(1.9 * Math.exp(-4 * t) + 0.18 + noise * 0.06 * (rand() - 0.5) + overfit);
    }

    // Find best val epoch
    let bestEpoch = 0, bestVal = Infinity;
    valLoss.forEach((v, i) => { if (v < bestVal) { bestVal = v; bestEpoch = i; } });
    const stopEpoch = Math.min(n - 1, bestEpoch + patience);

    const padL = 45, padR = 15, padT = 15, padB = 25;
    const toX = i => padL + (i / (n - 1)) * (W - padL - padR);
    const maxL = Math.max(...trainLoss, ...valLoss.slice(0, stopEpoch + 1));
    const toY = v => padT + (1 - v / maxL) * (H - padT - padB);

    // Grid
    ctx.strokeStyle = "rgba(128,128,128,0.12)"; ctx.lineWidth = 0.5;
    for (let g = 0; g <= 4; g++) { const y = toY(maxL * g / 4); ctx.beginPath(); ctx.moveTo(padL, y); ctx.lineTo(W - padR, y); ctx.stroke(); }
    ctx.fillStyle = "rgba(128,128,128,0.45)"; ctx.font = "10px var(--font-mono)"; ctx.textAlign = "right";
    for (let g = 0; g <= 4; g++) ctx.fillText((maxL * g / 4).toFixed(2), 42, toY(maxL * g / 4) + 3);
    ctx.textAlign = "start";

    // Best epoch vertical line (green)
    ctx.strokeStyle = "rgba(29,158,117,0.5)"; ctx.lineWidth = 1.5; ctx.setLineDash([4, 3]);
    ctx.beginPath(); ctx.moveTo(toX(bestEpoch), padT); ctx.lineTo(toX(bestEpoch), H - padB); ctx.stroke();
    ctx.setLineDash([]);

    // Stop epoch vertical line (red)
    ctx.strokeStyle = "rgba(226,75,74,0.6)"; ctx.lineWidth = 1.5; ctx.setLineDash([4, 3]);
    ctx.beginPath(); ctx.moveTo(toX(stopEpoch), padT); ctx.lineTo(toX(stopEpoch), H - padB); ctx.stroke();
    ctx.setLineDash([]);

    // Shade overfitting zone
    ctx.fillStyle = "rgba(226,75,74,0.06)";
    ctx.fillRect(toX(bestEpoch), padT, toX(stopEpoch) - toX(bestEpoch), H - padT - padB);

    // Train curve
    ctx.beginPath(); ctx.strokeStyle = "#4FC3F7"; ctx.lineWidth = 2;
    trainLoss.slice(0, stopEpoch + 1).forEach((v, i) => i === 0 ? ctx.moveTo(toX(i), toY(v)) : ctx.lineTo(toX(i), toY(v)));
    ctx.stroke();

    // Val curve
    ctx.beginPath(); ctx.strokeStyle = "#FF8A65"; ctx.lineWidth = 2;
    valLoss.slice(0, stopEpoch + 1).forEach((v, i) => i === 0 ? ctx.moveTo(toX(i), toY(v)) : ctx.lineTo(toX(i), toY(v)));
    ctx.stroke();

    // Best weights dot
    ctx.beginPath(); ctx.arc(toX(bestEpoch), toY(valLoss[bestEpoch]), 6, 0, Math.PI * 2);
    ctx.fillStyle = "#1D9E75"; ctx.fill();

    // Labels
    ctx.font = "11px var(--font-sans)"; ctx.fillStyle = "#4FC3F7"; ctx.fillText("Training loss", padL + 4, padT + 14);
    ctx.fillStyle = "#FF8A65"; ctx.fillText("Validation loss", padL + 4, padT + 28);
    ctx.fillStyle = "#1D9E75"; ctx.fillText(`Best: epoch ${bestEpoch}`, toX(bestEpoch) + 5, padT + 14);
    ctx.fillStyle = "#E24B4A"; ctx.fillText(`Stop: epoch ${stopEpoch} (patience=${patience})`, toX(Math.max(0, stopEpoch - 18)) - 2, padT + 32);

    // Axis
    ctx.fillStyle = "rgba(128,128,128,0.5)"; ctx.textAlign = "center";
    ctx.fillText("Epoch →", W / 2, H - 3);
    ctx.textAlign = "left";
  }, [patience, noise]);

  return (
    <VizBox>
      <canvas ref={ref} width={520} height={200} style={{ display: "block", margin: "0 auto", maxWidth: "100%" }} />
      <div style={{ display: "grid", gridTemplateColumns: "80px 1fr 44px", gap: 8, maxWidth: 400, margin: "10px auto 0", fontSize: 12.5, alignItems: "center" }}>
        <span style={{ color: "var(--color-text-secondary)" }}>Patience</span>
        <input type="range" min={3} max={25} value={patience} onChange={e => setPatience(+e.target.value)} />
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, textAlign: "right" }}>{patience}</span>
        <span style={{ color: "var(--color-text-secondary)" }}>Val noise</span>
        <input type="range" min={0} max={1} step={0.05} value={noise} onChange={e => setNoise(+e.target.value)} />
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, textAlign: "right" }}>{noise.toFixed(2)}</span>
      </div>
    </VizBox>
  );
}

function SectionEarlyStopping() {
  return (
    <div>
      <H2>Ch. 21 — How to improve a neural network: the full map</H2>
      <Grid cols={2}>
        <Card color="info" title="Part I: Hyperparameter Tuning">
          {"• Learning rate (most important)\n• Batch size\n• Network depth and width\n• Activation functions\n• Weight initialization\n• Optimizer choice (SGD, Adam…)".split("\n").map(i => <div key={i}>{i}</div>)}
        </Card>
        <Card color="warning" title="Part II: Common problems & fixes">
          {"• Overfitting → Dropout, Regularization, Early Stopping\n• Vanishing grad → ReLU, BatchNorm, ResNets\n• Slow convergence → Feature scaling, better init\n• Exploding grad → Gradient clipping\n• Poor generalization → Data augmentation".split("\n").map(i => <div key={i}>{i}</div>)}
        </Card>
      </Grid>

      <H2>Ch. 22 — Early Stopping</H2>
      <P>Early stopping halts training when a monitored metric (typically validation loss) stops improving for a specified number of epochs, and optionally restores the weights from the best epoch.</P>

      <Note color="info" icon="ti-bulb">
        Early stopping is both a <strong>regularization technique</strong> (prevents overfitting) and a <strong>compute optimization</strong> (avoids wasted training). It is arguably the most widely used improvement technique in practice.
      </Note>

      <H3>Interactive: patience vs. overfitting</H3>
      <P>Drag patience to see how long training continues after the best validation loss. The green dot marks where best weights are saved.</P>
      <EarlyStoppingCurve />

      <H3>The bias-variance view</H3>
      <Mx block>{`  Too few epochs  → High bias (underfitting)
                        model hasn't learned the data yet

  Too many epochs → High variance (overfitting)
                        memorizes training noise, val loss rises

  Early stopping  → Finds the sweet spot (bias-variance tradeoff)
                        stops before val loss begins to degrade

  Regularization effect:
    The norm ‖w‖ grows monotonically during training.
    Early stopping implicitly bounds ‖w‖ ← equivalent to L2 reg!`}</Mx>

      <H3>All early stopping parameters</H3>
      <Table heads={["Parameter", "Default", "Meaning"]} rows={[
        ["monitor", "'val_loss'", "Metric to watch. Use 'val_accuracy' for classification"],
        ["patience", "0", "Epochs with no improvement before stopping. Typical: 10–20"],
        ["min_delta", "0", "Minimum change to qualify as improvement"],
        ["mode", "'auto'", "'min' for loss, 'max' for accuracy"],
        ["restore_best_weights", "False", "Set True to get best-epoch weights back (almost always True)"],
        ["start_from_epoch", "0", "Skip early stop check for first N epochs (warm-up)"],
        ["baseline", "None", "Stop only if metric improves beyond this baseline"],
      ]} />

      <H3>Complete implementation with all best practices</H3>
      <Code>{`import tensorflow as tf
from tensorflow import keras

# ── Core callback ─────────────────────────────────────────
early_stop = keras.callbacks.EarlyStopping(
    monitor='val_loss',
    patience=15,                   # wait 15 epochs after best
    min_delta=1e-4,                # ignore tiny improvements
    restore_best_weights=True,     # CRITICAL: revert to best epoch
    mode='min',
    verbose=1,
    start_from_epoch=10            # let model warm up first
)

# ── Combine with LR reduction ─────────────────────────────
reduce_lr = keras.callbacks.ReduceLROnPlateau(
    monitor='val_loss',
    factor=0.5,       # halve LR on plateau
    patience=5,       # sooner than early stop patience
    min_lr=1e-7,
    verbose=1
)

# ── Save best model independently ────────────────────────
checkpoint = keras.callbacks.ModelCheckpoint(
    filepath='best_model.keras',
    monitor='val_loss',
    save_best_only=True,
    mode='min'
)

# ── Full training loop ────────────────────────────────────
history = model.fit(
    X_train, y_train,
    epochs=1000,             # large upper bound; early stop controls actual
    batch_size=32,
    validation_split=0.2,   # or validation_data=(X_val, y_val)
    callbacks=[early_stop, reduce_lr, checkpoint],
    verbose=1
)

stopped_epoch = early_stop.stopped_epoch
best_epoch    = stopped_epoch - early_stop.patience
print(f"Training stopped at epoch {stopped_epoch}")
print(f"Best weights from epoch {best_epoch}")
print(f"Best val_loss: {min(history.history['val_loss']):.5f}")

# ── Plot training history ─────────────────────────────────
import matplotlib.pyplot as plt
plt.plot(history.history['loss'],     label='Train loss')
plt.plot(history.history['val_loss'], label='Val loss')
plt.axvline(best_epoch, c='green',   ls='--', label='Best weights')
plt.axvline(stopped_epoch, c='red',  ls='--', label='Stopped here')
plt.legend(); plt.xlabel('Epoch'); plt.ylabel('Loss')
plt.title('Early Stopping Visualization'); plt.show()`}</Code>

      <QA q="Why should restore_best_weights=True almost always be set?"
          a="Without restore_best_weights=True, training stops at epoch best+patience, but the returned model has the weights from the last epoch — not the best epoch. These later weights are by definition overfitted (the validation loss was worse). restore_best_weights=True internally saves a copy of weights at each validation improvement and restores them at the end, giving you the model from epoch best rather than epoch best+patience. This is almost always what you want." />
      <QA q="Is early stopping equivalent to L2 regularization?"
          a="They are closely related but not identical. During gradient descent, weight norms grow monotonically. Early stopping halts this growth at some point, implicitly bounding ‖w‖ — similar to L2 regularization which penalizes large weights. For linear models with quadratic loss, there is a precise mathematical equivalence (Goodfellow et al., 2016). For deep networks the equivalence is approximate, but both achieve similar regularization effect. In practice, early stopping is preferred when you want to avoid tuning λ, and L2 is preferred when you want a fixed regularization strength." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 2 — FEATURE SCALING
══════════════════════════════════════════════════════ */
function ScalingLandscape() {
  const ref = useRef(null);
  const [scaled, setScaled] = useState(false);

  useEffect(() => {
    const cv = ref.current; if (!cv) return;
    const ctx = cv.getContext("2d");
    const W = cv.width, H = cv.height;
    ctx.clearRect(0, 0, W, H);

    const cx = W / 2, cy = H / 2;
    // Unscaled: very elongated ellipses  Scaled: circular
    const a = scaled ? 1 : 4, b = scaled ? 1 : 0.25;

    // Draw elliptical contours
    for (let r = 0.5; r <= 3; r += 0.5) {
      ctx.beginPath();
      ctx.ellipse(cx, cy, r * 60 * a, r * 60 * b, 0, 0, Math.PI * 2);
      const alpha = 0.12 + r * 0.08;
      ctx.strokeStyle = `rgba(55,138,221,${Math.min(0.7, alpha)})`;
      ctx.lineWidth = 1; ctx.stroke();
    }

    // Draw GD path
    const path = scaled
      ? [[cx - 160, cy + 60], [cx - 110, cy + 30], [cx - 60, cy + 10], [cx - 20, cy + 3], [cx, cy]]
      : [[cx - 160, cy + 20], [cx - 80, cy - 30], [cx - 20, cy + 25], [cx + 10, cy - 15], [cx + 3, cy + 5], [cx, cy]];

    ctx.beginPath(); ctx.strokeStyle = "#FF8A65"; ctx.lineWidth = 2;
    path.forEach(([x, y], i) => i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y));
    ctx.stroke();
    path.forEach(([x, y], i) => { ctx.beginPath(); ctx.arc(x, y, i === 0 ? 6 : 3.5, 0, Math.PI * 2); ctx.fillStyle = i === 0 ? "#FF8A65" : `rgba(255,138,101,${0.5 + 0.5 * i / path.length})`; ctx.fill(); });

    // Minimum
    ctx.beginPath(); ctx.arc(cx, cy, 6, 0, Math.PI * 2); ctx.fillStyle = "#FFD700"; ctx.fill(); ctx.strokeStyle = "#000"; ctx.lineWidth = 1.5; ctx.stroke();

    ctx.font = "12px var(--font-sans)"; ctx.fillStyle = "rgba(128,128,128,0.7)";
    ctx.fillText(scaled ? "Scaled features → circular contours → direct path" : "Unscaled → elongated → zig-zag path", 8, H - 6);
    ctx.fillStyle = "#FF8A65"; ctx.fillText("─ GD path", 8, 14);
    ctx.fillStyle = "#FFD700"; ctx.fillText("⭐ optimum", 8, 28);
  }, [scaled]);

  return (
    <VizBox>
      <canvas ref={ref} width={480} height={200} style={{ display: "block", margin: "0 auto", maxWidth: "100%" }} />
      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 8 }}>
        {["Unscaled (zig-zag)", "Scaled (direct)"].map((l, i) => (
          <button key={l} onClick={() => setScaled(!!i)} style={{ padding: "5px 14px", fontSize: 12.5, fontWeight: scaled === !!i ? 500 : 400, border: `0.5px solid var(--color-border-${scaled === !!i ? "success" : "tertiary"})`, borderRadius: "var(--border-radius-md)", background: scaled === !!i ? "var(--color-background-success)" : "transparent", color: scaled === !!i ? "var(--color-text-success)" : "var(--color-text-secondary)", cursor: "pointer" }}>{l}</button>
        ))}
      </div>
    </VizBox>
  );
}

function SectionFeatureScaling() {
  return (
    <div>
      <P>Feature scaling ensures all input features have comparable magnitudes. Without it, gradient descent follows an inefficient zig-zag path on an elongated loss landscape — features with large ranges dominate the gradient.</P>
      <H2>Why scaling matters — loss landscape geometry</H2>
      <ScalingLandscape />
      <Mx block>{`  Unscaled features: feature₁ ∈ [0,1], feature₂ ∈ [0,10000]
  
  Loss contours are elongated ellipses (like a valley):
    ∂L/∂w₁ ≪ ∂L/∂w₂ → gradient dominated by w₂ direction
    → gradient descent oscillates in w₂, barely moves in w₁
    → many more iterations to converge

  After scaling: both features ∈ [0,1] or N(0,1)
    Contours are roughly circular
    Gradient descent takes direct paths → faster convergence`}</Mx>

      <H2>The three main scaling techniques</H2>
      <Mx block>{`  1. Standard Scaler (Z-score normalization):
     x̃ = (x − μ) / σ        result: mean=0, std=1
     μ = mean(X_train),  σ = std(X_train)
     Best for: normally distributed data, neural networks (default)

  2. Min-Max Scaler:
     x̃ = (x − x_min) / (x_max − x_min)   result: x̃ ∈ [0,1]
     Best for: bounded distributions, image pixel values (÷255)
     Weakness: sensitive to outliers (outlier → everything else squashed)

  3. Robust Scaler:
     x̃ = (x − median) / IQR    (IQR = Q75 − Q25)
     Best for: data with many outliers
     IQR is resistant to extreme values`}</Mx>

      <H2>Critical rule: fit on train, transform all</H2>
      <Note color="danger" icon="ti-alert-triangle">
        <strong>Never fit the scaler on test/validation data.</strong> Fitting on test data leaks test statistics into your preprocessing — a form of data leakage that gives overly optimistic performance estimates.
      </Note>
      <Code>{`from sklearn.preprocessing import StandardScaler, MinMaxScaler, RobustScaler
import numpy as np

# ── CORRECT: fit only on training data ───────────────────
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)  # learns μ, σ from train
X_val_scaled   = scaler.transform(X_val)         # applies SAME μ, σ
X_test_scaled  = scaler.transform(X_test)        # applies SAME μ, σ

# ── WRONG: leaks test info ────────────────────────────────
# scaler.fit(X_test)  ← DO NOT DO THIS

# ── Visual impact on convergence ─────────────────────────
results = {}
for name, scale in [("no_scaling", False), ("standard", True)]:
    X = X_train_scaled if scale else X_train
    model = build_model()
    h = model.fit(X, y_train, validation_split=0.2,
                  epochs=100, verbose=0)
    results[name] = {
        'final_val_loss': min(h.history['val_loss']),
        'epochs_to_95':  next((i for i,v in enumerate(h.history['val_accuracy'])
                               if v>=0.95), None)
    }

for name, r in results.items():
    print(f"{name:15}: val_loss={r['final_val_loss']:.4f}  "
          f"epochs_to_95={r['epochs_to_95']}")`}</Code>

      <H2>When NOT to scale</H2>
      <Grid cols={2}>
        <Card color="warning" title="Do NOT scale">
          {"• Target variable in regression (usually)\n• Tree-based models (RF, XGBoost)\n• Features that are already probabilities\n• Binary/one-hot features\n• Ordinal features where order matters (sometimes)".split("\n").map((i, k) => <div key={k}>{i}</div>)}
        </Card>
        <Card color="success" title="Always scale for">
          {"• Neural network inputs (always)\n• Distance-based models (KNN, SVM, K-means)\n• PCA / dimensionality reduction\n• Lasso/Ridge regression\n• Any gradient descent optimization".split("\n").map((i, k) => <div key={k}>{i}</div>)}
        </Card>
      </Grid>
      <QA q="Why does lack of feature scaling cause the zig-zag convergence pattern?"
          a="Without scaling, features with large ranges produce large partial derivatives ∂L/∂w for the corresponding weights. The gradient vector is dominated by these large-scale dimensions, causing the optimizer to make big steps in those directions and overshoot repeatedly. Features with small ranges have tiny gradients and barely update. This creates an elongated loss landscape where gradient descent bounces between the steep walls of the elongated contours — the zig-zag pattern — instead of going directly to the minimum. Scaling makes all features contribute proportionally, creating approximately circular contours and allowing the gradient to point nearly directly toward the minimum." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 3 — DROPOUT + REGULARIZATION
══════════════════════════════════════════════════════ */
function DropoutViz({ dropRate }) {
  const layers = [4, 6, 4, 2], cx = [60, 180, 300, 420];
  const dropped = layers.map((n, li) =>
    Array.from({ length: n }, (_, ni) => li > 0 && li < layers.length - 1 && Math.random() < dropRate)
  );
  return (
    <svg width="100%" viewBox="0 0 480 180" role="img"><title>Dropout visualization</title>
      {layers.map((n, li) => Array.from({ length: n }, (_, ni) => {
        const y = 30 + ni * (140 / (n - 1 || 1));
        const isDead = dropped[li][ni];
        // connections to next layer
        if (li < layers.length - 1) return (
          <g key={`${li}-${ni}-g`}>
            {Array.from({ length: layers[li + 1] }, (_, nj) => {
              const y2 = 30 + nj * (140 / (layers[li + 1] - 1 || 1));
              const skipConn = isDead || dropped[li + 1][nj];
              return <line key={nj} x1={cx[li] + 12} y1={y} x2={cx[li + 1] - 12} y2={y2} stroke={skipConn ? "transparent" : "rgba(128,128,128,0.2)"} strokeWidth={0.8} />;
            })}
            <circle cx={cx[li]} cy={y} r={12} fill={isDead ? "rgba(226,75,74,0.15)" : "var(--color-background-secondary)"} stroke={isDead ? "var(--color-border-danger)" : "var(--color-border-secondary)"} strokeWidth={isDead ? 1.5 : 0.8} />
            {isDead && <line x1={cx[li] - 6} y1={y - 6} x2={cx[li] + 6} y2={y + 6} stroke="var(--color-border-danger)" strokeWidth={1.5} />}
            {isDead && <line x1={cx[li] + 6} y1={y - 6} x2={cx[li] - 6} y2={y + 6} stroke="var(--color-border-danger)" strokeWidth={1.5} />}
            {!isDead && <circle cx={cx[li]} cy={y} r={5} fill="var(--color-border-info)" />}
          </g>
        );
        return (
          <g key={`${li}-${ni}-end`}>
            <circle cx={cx[li]} cy={y} r={12} fill={"var(--color-background-secondary)"} stroke={"var(--color-border-secondary)"} strokeWidth={0.8} />
            <circle cx={cx[li]} cy={y} r={5} fill="var(--color-border-success)" />
          </g>
        );
      }))}
      {["Input", "Hidden 1", "Hidden 2", "Output"].map((l, i) => <text key={l} x={cx[i]} y={170} textAnchor="middle" style={{ fontSize: 10, fontFamily: "var(--font-sans)", fill: "var(--color-text-tertiary)" }}>{l}</text>)}
    </svg>
  );
}

function SectionDropoutReg() {
  const [dropRate, setDropRate] = useState(0.3);
  const [redraw, setRedraw] = useState(0);
  return (
    <div>
      <H2>Ch. 24–25 — Dropout</H2>
      <P>Dropout randomly deactivates neurons during each training forward pass with probability p, forcing the network to learn redundant, distributed representations. At inference time, all neurons are active.</P>

      <H3>Interactive: neurons dropped (×) at each forward pass</H3>
      <VizBox>
        <DropoutViz dropRate={dropRate} key={redraw} />
        <div style={{ display: "flex", gap: 10, justifyContent: "center", alignItems: "center", marginTop: 8, fontSize: 12.5, flexWrap: "wrap" }}>
          <span style={{ color: "var(--color-text-secondary)" }}>Drop rate p</span>
          <input type="range" min={0} max={0.7} step={0.05} value={dropRate} onChange={e => setDropRate(+e.target.value)} style={{ width: 100 }} />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 12 }}>{dropRate.toFixed(2)}</span>
          <button onClick={() => setRedraw(r => r + 1)} style={{ padding: "4px 12px", fontSize: 12, border: "0.5px solid var(--color-border-info)", background: "var(--color-background-info)", color: "var(--color-text-info)", borderRadius: "var(--border-radius-md)", cursor: "pointer" }}>Resample</button>
        </div>
      </VizBox>

      <H3>The mathematics of inverted dropout</H3>
      <Mx block>{`  Training forward pass (drop rate = p):

  mask ~ Bernoulli(1-p)          each element 0 or 1
  a_dropped = a ⊙ mask           zero out dropped neurons
  a_scaled  = a_dropped / (1-p)  ← INVERTED DROPOUT: scale up!

  Why scale? Maintain expected value:
    E[a_scaled] = E[mask/(1-p)] · a = [(1-p)·1 + p·0]/(1-p) · a = a
    → Expected activation at test time equals training time.

  Inference: NO dropout, NO scaling. Use full network.
  
  Ensemble interpretation:
    N neurons → 2^N possible sub-networks per forward pass.
    Training = simultaneously training 2^N different models.
    Inference = geometric mean over all 2^N sub-networks.`}</Mx>

      <Code>{`# ── Manual inverted dropout (NumPy) ──────────────────────
def dropout_forward(A, p, training=True):
    """
    A: activation matrix (batch, n_neurons)
    p: dropout probability (fraction to DROP, not keep)
    """
    if not training:
        return A, None                       # no dropout at inference

    keep_prob = 1 - p
    mask = (np.random.rand(*A.shape) < keep_prob).astype(float)
    A_out = A * mask / keep_prob             # inverted scaling
    return A_out, mask                       # cache mask for backprop

def dropout_backward(dA_out, mask, p):
    """Gradient flows only through kept neurons, same scaling."""
    return dA_out * mask / (1 - p)

# ── Keras/TensorFlow ──────────────────────────────────────
model = keras.Sequential([
    layers.Dense(256, activation='relu'),
    layers.Dropout(0.4),           # p=0.4 during training only
    layers.Dense(128, activation='relu'),
    layers.Dropout(0.3),
    layers.Dense(10, activation='softmax'),
])
# keras.layers.Dropout handles train vs test mode automatically
# via the training= argument in layer.call()

# ── Regression vs Classification dropout rates ──────────
DROPOUT_GUIDELINES = {
    "classification (few classes)": 0.2,
    "classification (many classes)": 0.3,
    "regression":                    0.1,   # gentler
    "convolutional layers":           0.1,   # spatial dropout preferred
    "recurrent layers (LSTM)":        0.2,   # Variational dropout
    "transformer feedforward":        0.1,
    "very small dataset":             0.5,   # stronger regularization
}

# ── SpatialDropout2D for CNNs ─────────────────────────────
# Drops entire feature maps (channels), not individual pixels
layers.SpatialDropout2D(rate=0.1)  # better than Dropout for conv layers

# ── MC Dropout: uncertainty estimation at inference ───────
def mc_predict(model, X, n_samples=100):
    """Run n_samples forward passes with dropout ON → uncertainty."""
    preds = np.stack([
        model(X, training=True).numpy()   # training=True keeps dropout
        for _ in range(n_samples)
    ])
    return preds.mean(0), preds.std(0)    # mean prediction, uncertainty`}</Code>

      <H2>Ch. 26 — L1 and L2 Regularization</H2>
      <P>Regularization adds a penalty term to the loss function that discourages large weights, controlling model complexity.</P>

      <H3>Modified cost function</H3>
      <Mx block>{`  Original:   C = (1/m) Σᵢ L(ŷᵢ, yᵢ)

  ── L2 (Ridge / Weight Decay) ──────────────────────────
  C_L2 = C + (λ/2m) Σₗ ‖W⁽ˡ⁾‖²_F       (Frobenius norm)
       = C + (λ/2m) Σₗ Σⱼ Σₖ (w⁽ˡ⁾_{jk})²

  Weight gradient:   ∂C/∂W = ∂C_orig/∂W + (λ/m)W

  Update rule:       W ← W - η(∂C_orig/∂W + (λ/m)W)
                        = W(1 - ηλ/m) - η·∂C_orig/∂W
                           ↑ weight decay factor < 1

  ── L1 (Lasso) ─────────────────────────────────────────
  C_L1 = C + (λ/m) Σₗ ‖W⁽ˡ⁾‖₁
       = C + (λ/m) Σₗ Σⱼ Σₖ |w⁽ˡ⁾_{jk}|

  Weight gradient:   ∂C/∂W = ∂C_orig/∂W + (λ/m)·sign(W)

  Effect: drives weights exactly to 0 (sparse weights!)
          L2 shrinks weights but keeps them non-zero`}</Mx>

      <H3>Geometric intuition</H3>
      <Mx block>{`  L2 constraint: weights must lie in a ball  ‖w‖₂ ≤ r
  L1 constraint: weights must lie in a diamond ‖w‖₁ ≤ r

  The optimal (unregularized) solution is outside these regions.
  The regularized solution is where the loss contour first TOUCHES
  the constraint region:

  L2 ball (smooth): tangency → small weights everywhere
  L1 diamond (corners): tangency → solution often at corner
                         where one or more weights = EXACTLY 0
                         → automatic feature selection!`}</Mx>

      <Code>{`import tensorflow as tf
from tensorflow.keras import regularizers

# ── L2 regularization in Keras ────────────────────────────
model_l2 = keras.Sequential([
    layers.Dense(128, activation='relu',
                 kernel_regularizer=regularizers.l2(1e-4)),   # λ=0.0001
    layers.Dense(64,  activation='relu',
                 kernel_regularizer=regularizers.l2(1e-4)),
    layers.Dense(1,   activation='sigmoid')
])

# ── L1 regularization ─────────────────────────────────────
model_l1 = keras.Sequential([
    layers.Dense(128, activation='relu',
                 kernel_regularizer=regularizers.l1(1e-4)),
])

# ── L1 + L2 combined (Elastic Net) ────────────────────────
model_en = keras.Sequential([
    layers.Dense(128, activation='relu',
                 kernel_regularizer=regularizers.l1_l2(l1=1e-5, l2=1e-4)),
])

# ── Manual L2 in PyTorch (weight decay in optimizer) ──────
# PyTorch's weight_decay IS L2 regularization:
optimizer = torch.optim.Adam(
    model.parameters(),
    lr=1e-3,
    weight_decay=1e-4     # λ/m — equivalent to L2 regularizer
)

# ── Comparison: λ effect on weight norms ──────────────────
for lam in [0, 1e-5, 1e-4, 1e-3, 1e-2]:
    m = build_model_l2(lam)
    m.fit(X_train, y_train, epochs=50, verbose=0)
    w_norms = [np.linalg.norm(w.numpy())
               for w in m.trainable_variables if len(w.shape)==2]
    val_acc = m.evaluate(X_val, y_val, verbose=0)[1]
    print(f"λ={lam:.0e}  ‖W‖={np.mean(w_norms):.2f}  val_acc={val_acc:.4f}")`}</Code>

      <Grid cols={2}>
        <Card color="info" title="L2 (Ridge / Weight Decay)">
          {"✓ Smooth penalty — easy gradient\n✓ Works well in practice for NNs\n✓ Equivalent to Gaussian weight prior\n✓ weight_decay param in optimizers\n✗ Doesn't produce sparse weights".split("\n").map((i, k) => <div key={k}>{i}</div>)}
        </Card>
        <Card color="warning" title="L1 (Lasso)">
          {"✓ Produces sparse weights (many = 0)\n✓ Implicit feature selection\n✓ Equivalent to Laplace weight prior\n✗ Non-differentiable at 0\n✗ Less common in deep learning\n✗ Use Elastic Net for best of both".split("\n").map((i, k) => <div key={k}>{i}</div>)}
        </Card>
      </Grid>

      <QA q="Why is L2 regularization called 'weight decay'?"
          a="The L2 gradient update is: W ← W(1 − ηλ/m) − η·∂Loss/∂W. The factor (1 − ηλ/m) multiplies the current weight before adding the loss gradient. This is equivalent to decaying (shrinking) the weights by a fixed fraction each step — hence 'weight decay'. In PyTorch, the weight_decay parameter in optimizers implements exactly this multiplicative shrinkage, which is computationally equivalent to adding (λ/2m)‖W‖² to the loss." />
      <QA q="When should you use Dropout vs L2 regularization?"
          a="Both address overfitting but via different mechanisms. <strong>Dropout</strong> prevents co-adaptation (neurons relying on specific others) and approximates ensemble averaging — best for large networks with many neurons. <strong>L2</strong> directly constrains weight magnitude — more interpretable, better when you want principled Bayesian justification. In practice: use both together. L2 on weights (small λ=1e-4) + Dropout (p=0.2–0.5) in hidden layers is the standard recipe for large networks." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 4 — ACTIVATION FUNCTIONS
══════════════════════════════════════════════════════ */
function ActFnPlot() {
  const ref = useRef(null);
  const [fn, setFn] = useState("relu");

  const fns = {
    sigmoid: { f: z => 1 / (1 + Math.exp(-z)), fp: z => { const s = 1 / (1 + Math.exp(-z)); return s * (1 - s); }, color: "#4FC3F7", range: [-4, 4], yrange: [-0.2, 1.2] },
    tanh: { f: z => Math.tanh(z), fp: z => 1 - Math.tanh(z) ** 2, color: "#81C784", range: [-3, 3], yrange: [-1.2, 1.2] },
    relu: { f: z => Math.max(0, z), fp: z => z > 0 ? 1 : 0, color: "#FF8A65", range: [-3, 3], yrange: [-0.5, 3] },
    "leaky-relu": { f: z => z > 0 ? z : 0.1 * z, fp: z => z > 0 ? 1 : 0.1, color: "#CE93D8", range: [-3, 3], yrange: [-0.5, 3] },
    elu: { f: z => z > 0 ? z : (Math.exp(z) - 1), fp: z => z > 0 ? 1 : Math.exp(z), color: "#F48FB1", range: [-3, 3], yrange: [-1.5, 3] },
    gelu: { f: z => 0.5 * z * (1 + Math.tanh(Math.sqrt(2 / Math.PI) * (z + 0.044715 * z ** 3))), fp: z => { const phi = t => 0.5 * (1 + Math.tanh(Math.sqrt(2 / Math.PI) * (t + 0.044715 * t ** 3))); const eps = 1e-4; return (phi(z + eps) - phi(z - eps)) / (2 * eps); }, color: "#80DEEA", range: [-3, 3], yrange: [-0.5, 3] },
    selu: { f: z => z > 0 ? 1.0507 * z : 1.0507 * 1.6733 * (Math.exp(z) - 1), fp: z => z > 0 ? 1.0507 : 1.0507 * 1.6733 * Math.exp(z), color: "#FFCC80", range: [-3, 3], yrange: [-2, 3] },
  };

  useEffect(() => {
    const cv = ref.current; if (!cv) return;
    const ctx = cv.getContext("2d");
    const W = cv.width, H = cv.height;
    const half = H / 2;
    ctx.clearRect(0, 0, W, H);

    const { f, fp, color, range, yrange } = fns[fn];
    const n = 200;
    const zs = Array.from({ length: n }, (_, i) => range[0] + i * (range[1] - range[0]) / (n - 1));

    const toX = z => (z - range[0]) / (range[1] - range[0]) * W;

    // Top half: f(z)
    const fVals = zs.map(f);
    const fMin = yrange[0], fMax = yrange[1];
    const toY1 = v => half - 10 - (v - fMin) / (fMax - fMin) * (half - 25);

    ctx.strokeStyle = "rgba(128,128,128,0.12)"; ctx.lineWidth = 0.5;
    [0, 1].forEach(v => { const y = toY1(v); ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); });
    ctx.strokeStyle = "rgba(128,128,128,0.3)"; ctx.lineWidth = 1;
    const y0 = toY1(0); ctx.beginPath(); ctx.moveTo(0, y0); ctx.lineTo(W, y0); ctx.stroke();
    const x0 = toX(0); ctx.beginPath(); ctx.moveTo(x0, 0); ctx.lineTo(x0, half - 5); ctx.stroke();

    ctx.beginPath(); ctx.strokeStyle = color; ctx.lineWidth = 2.5;
    zs.forEach((z, i) => i === 0 ? ctx.moveTo(toX(z), toY1(fVals[i])) : ctx.lineTo(toX(z), toY1(fVals[i])));
    ctx.stroke();

    ctx.font = "11px var(--font-sans)"; ctx.fillStyle = color; ctx.fillText(`f(z) = ${fn}`, 6, 14);

    // Bottom half: f'(z)
    const fpVals = zs.map(fp);
    const fpMax = Math.max(...fpVals.map(Math.abs)) * 1.2 || 1;
    const toY2 = v => H - 10 - (v + fpMax) / (2 * fpMax) * (half - 25);

    ctx.strokeStyle = "rgba(128,128,128,0.12)"; ctx.lineWidth = 0.5;
    ctx.beginPath(); ctx.moveTo(0, toY2(0)); ctx.lineTo(W, toY2(0)); ctx.stroke();
    ctx.strokeStyle = "rgba(128,128,128,0.3)"; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(0, toY2(0)); ctx.lineTo(W, toY2(0)); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x0, half + 5); ctx.lineTo(x0, H); ctx.stroke();

    ctx.beginPath(); ctx.strokeStyle = color; ctx.lineWidth = 2; ctx.setLineDash([4, 3]);
    zs.forEach((z, i) => i === 0 ? ctx.moveTo(toX(z), toY2(fpVals[i])) : ctx.lineTo(toX(z), toY2(fpVals[i])));
    ctx.stroke(); ctx.setLineDash([]);

    ctx.fillStyle = color; ctx.fillText(`f'(z) — derivative`, 6, half + 18);
    ctx.fillStyle = "rgba(128,128,128,0.5)"; ctx.fillText("z →", W - 30, toY2(0) - 4);
  }, [fn]);

  return (
    <VizBox>
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 10 }}>
        {Object.keys(fns).map(k => (
          <button key={k} onClick={() => setFn(k)} style={{ padding: "4px 10px", fontSize: 11.5, fontWeight: k === fn ? 500 : 400, border: `0.5px solid var(--color-border-${k === fn ? "info" : "tertiary"})`, borderRadius: "20px", background: k === fn ? "var(--color-background-info)" : "transparent", color: k === fn ? "var(--color-text-info)" : "var(--color-text-secondary)", cursor: "pointer" }}>{k}</button>
        ))}
      </div>
      <canvas ref={ref} width={480} height={240} style={{ display: "block", margin: "0 auto", maxWidth: "100%" }} />
    </VizBox>
  );
}

function SectionActivations() {
  return (
    <div>
      <P>Activation functions introduce non-linearity. Without them, any depth network collapses to a single linear transformation. The choice of activation affects gradient flow, training speed, and achievable function class.</P>
      <H2>Interactive: function and derivative</H2>
      <P>Click any activation to see f(z) (solid) and f′(z) (dashed). The derivative shape directly determines gradient flow in backpropagation.</P>
      <ActFnPlot />

      <H2>Complete reference</H2>
      <Table heads={["Function", "Formula", "Range", "f′ max", "Key trait", "Use when"]} rows={[
        ["Sigmoid", "1/(1+e^{−z})", "(0,1)", "0.25", "Saturates", "Output: binary prob"],
        ["Tanh", "(e^z−e^{−z})/(e^z+e^{−z})", "(−1,1)", "1.0", "Zero-centered", "Hidden: shallow nets"],
        ["ReLU", "max(0,z)", "[0,∞)", "1.0", "Sparse, fast", "Default: all hidden layers"],
        ["Leaky ReLU", "max(αz,z)  α=0.01", "(−∞,∞)", "1.0", "No dead neurons", "When dying ReLU is issue"],
        ["PReLU", "max(αz,z)  α learned", "(−∞,∞)", "1.0", "Adaptive slope", "CNNs, more params OK"],
        ["ELU", "z≥0→z;  z<0→α(e^z−1)", "(−α,∞)", "1.0", "Smooth, neg mean", "Deep nets, better than ReLU"],
        ["SELU", "λ·ELU(z)  self-normalizing", "auto", "λ≈1.05", "Self-normalizing", "Very deep, no BatchNorm"],
        ["GELU", "z·Φ(z)", "(−0.17,∞)", "≈1.0", "Smooth ReLU", "Transformers, BERT, GPT"],
        ["Softmax", "e^{zₖ}/Σe^{zⱼ}", "(0,1)", "—", "Prob distribution", "Output: multi-class"],
        ["Swish", "z·σ(z)", "(−0.28,∞)", "≈1.0", "Smooth, non-mono", "EfficientNet, modern CNNs"],
      ]} />

      <H2>Leaky ReLU and PReLU — fixing the dying neuron</H2>
      <Mx block>{`  Dying ReLU: if z < 0 for ALL training samples,
  neuron gets gradient = 0 forever → never recovers.

  Leaky ReLU:   f(z) = z       if z > 0
                       αz      if z ≤ 0    (α = 0.01, fixed)
                f'(z) = 1       if z > 0
                        α       if z ≤ 0   (always non-zero!)

  PReLU (Parametric):  same, but α is a LEARNED parameter
    — One α per channel (in CNNs) or one per neuron
    — Updated by backprop: ∂L/∂α = δ · z  for z ≤ 0

  SELU (Self-normalizing):
    f(z) = λ·z                    if z ≥ 0   λ = 1.0507
           λ·α·(e^z − 1)          if z < 0   α = 1.6733
    
    Self-normalizing property: if inputs ~ N(0,1),
    outputs also ~ N(0,1) → no BatchNorm needed!
    Requires LeCun normal initialization + AlphaDropout`}</Mx>

      <Code>{`# Activation function implementation and comparison
import tensorflow as tf
from tensorflow.keras import layers

# Built-in activations
act_map = {
    'relu':       layers.ReLU(),
    'leaky_relu': layers.LeakyReLU(alpha=0.01),
    'prelu':      layers.PReLU(),              # learned alpha
    'elu':        layers.ELU(alpha=1.0),
    'selu':       layers.Activation('selu'),
    'gelu':       layers.Activation('gelu'),
    'swish':      layers.Activation('swish'),
}

# Build identical networks with different activations
def build_with_act(act_name, act_layer):
    return keras.Sequential([
        layers.Dense(256, input_shape=(784,)),
        act_layer,
        layers.Dense(128),
        act_layer.__class__(**act_layer.get_config()) if hasattr(act_layer,'get_config') else act_layer,
        layers.Dense(10, activation='softmax'),
    ], name=f'model_{act_name}')

# SELU requires specific init and dropout
model_selu = keras.Sequential([
    layers.Dense(256, activation='selu',
                 kernel_initializer='lecun_normal',  # required!
                 input_shape=(784,)),
    layers.AlphaDropout(0.1),                        # not regular Dropout!
    layers.Dense(128, activation='selu',
                 kernel_initializer='lecun_normal'),
    layers.Dense(10, activation='softmax'),
])`}</Code>

      <QA q="Why is ReLU preferred over sigmoid/tanh in hidden layers?"
          a="Three reasons: (1) <strong>No vanishing gradient</strong> — ReLU derivative is exactly 1 for z>0, allowing clean gradient flow in deep networks, while sigmoid derivative ≤ 0.25 causes exponential attenuation. (2) <strong>Sparsity</strong> — roughly 50% of neurons are inactive (output 0) at any step, creating sparse representations that are often more efficient. (3) <strong>Computation</strong> — max(0,z) is a single comparison operation, much faster than exp() in sigmoid/tanh. Sigmoid/tanh are still used at output layers (probability outputs) and in LSTM gates." />
      <QA q="What is GELU and why do Transformers use it instead of ReLU?"
          a="GELU (Gaussian Error Linear Unit) is f(z) = z·Φ(z) where Φ is the Gaussian CDF. It can be approximated as 0.5z(1+tanh(√(2/π)(z+0.044715z³))). Unlike ReLU which hard-gates at 0, GELU softly gates: for z≪0 the output smoothly approaches 0, and for z≫0 it's approximately z. This smooth, non-monotonic shape empirically performs better in Transformers (BERT, GPT use GELU; ViT and many modern models prefer it). The smooth gradient everywhere (no kink at 0) helps in deep architectures with attention mechanisms." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 5 — WEIGHT INITIALIZATION
══════════════════════════════════════════════════════ */
function InitViz() {
  const ref = useRef(null);
  const [initType, setInitType] = useState("he");
  const [depth, setDepth] = useState(8);

  useEffect(() => {
    const cv = ref.current; if (!cv) return;
    const ctx = cv.getContext("2d");
    const W = cv.width, H = cv.height;
    ctx.clearRect(0, 0, W, H);

    const n = 32; // neurons per layer
    let acts = Array.from({ length: n }, () => Math.random() * 2 - 1);

    const varAtLayer = [];
    for (let l = 0; l < depth; l++) {
      let scale;
      if (initType === "zeros") scale = 0;
      else if (initType === "large") scale = 3.0 / Math.sqrt(n);
      else if (initType === "small") scale = 0.01 / Math.sqrt(n);
      else if (initType === "xavier") scale = Math.sqrt(2 / (n + n));
      else scale = Math.sqrt(2 / n); // He

      // Compute next layer activations (ReLU for He, tanh for Xavier)
      const W_mat = Array.from({ length: n }, () => Array.from({ length: n }, () => scale * (Math.random() * 2 - 1) * (initType === "zeros" ? 0 : 1)));
      acts = acts.map((_, j) => {
        const z = W_mat[j].reduce((s, w, k) => s + w * acts[k], 0);
        return initType === "xavier" ? Math.tanh(z) : Math.max(0, z);
      });
      varAtLayer.push(acts.reduce((s, v) => s + v * v, 0) / n);
    }

    const maxV = Math.max(...varAtLayer, 0.01);
    const padL = 50, padB = 25, padT = 15;
    const toX = l => padL + (l / (depth - 1)) * (W - padL - 15);
    const toY = v => H - padB - (v / maxV) * (H - padT - padB);

    ctx.strokeStyle = "rgba(128,128,128,0.12)"; ctx.lineWidth = 0.5;
    for (let g = 0; g <= 4; g++) { const y = toY(maxV * g / 4); ctx.beginPath(); ctx.moveTo(padL, y); ctx.lineTo(W, y); ctx.stroke(); }
    ctx.fillStyle = "rgba(128,128,128,0.45)"; ctx.font = "10px var(--font-mono)"; ctx.textAlign = "right";
    for (let g = 0; g <= 4; g++) ctx.fillText((maxV * g / 4).toFixed(3), 44, toY(maxV * g / 4) + 3);
    ctx.textAlign = "start";

    const colorMap = { zeros: "var(--color-border-danger)", large: "var(--color-border-danger)", small: "var(--color-border-warning)", xavier: "var(--color-border-success)", he: "var(--color-border-info)" };
    ctx.beginPath(); ctx.strokeStyle = colorMap[initType] || "var(--color-border-info)"; ctx.lineWidth = 2.5;
    varAtLayer.forEach((v, i) => i === 0 ? ctx.moveTo(toX(i), toY(v)) : ctx.lineTo(toX(i), toY(v)));
    ctx.stroke();
    varAtLayer.forEach((v, i) => { ctx.beginPath(); ctx.arc(toX(i), toY(v), 4, 0, Math.PI * 2); ctx.fillStyle = colorMap[initType]; ctx.fill(); });

    ctx.fillStyle = "rgba(128,128,128,0.5)"; ctx.font = "10px var(--font-sans)";
    ctx.fillText("Layer →", W - 50, H - 5);
    ctx.save(); ctx.translate(12, H / 2); ctx.rotate(-Math.PI / 2); ctx.textAlign = "center"; ctx.fillText("Activation variance", 0, 0); ctx.restore();
  }, [initType, depth]);

  return (
    <VizBox>
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 8 }}>
        {[["zeros", "All zeros (symmetry!)"], ["large", "Too large"], ["small", "Too small"], ["xavier", "Xavier/Glorot"], ["he", "He (ReLU)"]].map(([k, l]) => (
          <button key={k} onClick={() => setInitType(k)} style={{ padding: "4px 10px", fontSize: 11.5, fontWeight: k === initType ? 500 : 400, border: `0.5px solid var(--color-border-${k === initType ? "info" : "tertiary"})`, borderRadius: "20px", background: k === initType ? "var(--color-background-info)" : "transparent", color: k === initType ? "var(--color-text-info)" : "var(--color-text-secondary)", cursor: "pointer" }}>{l}</button>
        ))}
      </div>
      <canvas ref={ref} width={460} height={180} style={{ display: "block", margin: "0 auto", maxWidth: "100%" }} />
      <div style={{ display: "flex", gap: 8, alignItems: "center", justifyContent: "center", marginTop: 8, fontSize: 12.5 }}>
        <span style={{ color: "var(--color-text-secondary)" }}>Depth</span>
        <input type="range" min={3} max={15} value={depth} onChange={e => setDepth(+e.target.value)} style={{ width: 100 }} />
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 12 }}>{depth} layers</span>
      </div>
    </VizBox>
  );
}

function SectionWeightInit() {
  return (
    <div>
      <P>Weight initialization determines the starting point of optimization and critically affects whether gradients vanish or explode in the first forward and backward passes.</P>
      <H2>Interactive: activation variance across layers</H2>
      <P>Good initialization preserves variance ~ 1 throughout the network. See what happens with zeros, too-large, or too-small weights.</P>
      <InitViz />

      <H2>Why initialization matters — 4 failure modes</H2>
      <Grid cols={2}>
        <Card color="danger" title="All zeros (symmetry breaking failure)">
          All neurons in a layer receive the same gradient and update identically — they never differentiate. The network is equivalent to a single neuron per layer, regardless of width. <strong>Never initialize to all zeros.</strong>
        </Card>
        <Card color="danger" title="Large random values (exploding activations)">
          Forward pass: activations grow exponentially layer by layer → saturate tanh/sigmoid → zero gradient. Backward pass: gradients explode. Signs: NaN loss, activations &gt;&gt; 1.
        </Card>
        <Card color="warning" title="Small random values (vanishing activations)">
          Forward pass: activations shrink layer by layer → all near zero. Backward pass: gradients vanish (∂L/∂W = δ·a ≈ 0 if a≈0). Signs: very slow training, early layers frozen.
        </Card>
        <Card color="success" title="Correct initialization (variance preserved)">
          Variance of activations stays approximately 1 through all layers. Gradients flow cleanly. Training is fast and stable. This is exactly what Xavier and He achieve.
        </Card>
      </Grid>

      <H2>Xavier / Glorot Initialization (for tanh/sigmoid)</H2>
      <Mx block>{`  Goal: Var[a⁽ˡ⁾] ≈ Var[a⁽ˡ⁻¹⁾]   for all layers l

  Derivation:
    Var[z] = Var[Σⱼ wⱼaⱼ] = nᵢₙ · Var[w] · Var[a]
    For Var[z] = Var[a]: need Var[w] = 1/nᵢₙ

  Similarly for backward pass:  Var[w] = 1/nₒᵤₜ

  Xavier compromise (geometric mean of forward/backward):
    Var[w] = 2 / (nᵢₙ + nₒᵤₜ)

  Implementations:
    Normal:  w ~ N(0, 2/(nᵢₙ + nₒᵤₜ))
    Uniform: w ~ U[-√(6/(nᵢₙ+nₒᵤₜ)),  √(6/(nᵢₙ+nₒᵤₜ))]

  Best for: tanh, sigmoid, linear activations`}</Mx>

      <H2>He Initialization (for ReLU)</H2>
      <Mx block>{`  Problem with Xavier + ReLU:
    ReLU zeroes out ~50% of activations → effective nᵢₙ halved
    Xavier variance is too small → vanishing activations

  He (Kaiming) fix: compensate for ReLU's 50% kill rate
    Var[w] = 2 / nᵢₙ   (double the Xavier variance)

  Implementations:
    Normal:  w ~ N(0, 2/nᵢₙ)
    Uniform: w ~ U[-√(6/nᵢₙ),  √(6/nᵢₙ)]

  Proof sketch:
    E[ReLU(z)²] = E[z²]/2  (half the inputs are zeroed)
    → to maintain variance: Var[w] · nᵢₙ · E[a²] = Var[a]
    → Var[w] = 2/nᵢₙ  ✓

  Best for: ReLU, Leaky ReLU, ELU, GELU, Swish`}</Mx>

      <H2>Complete comparison</H2>
      <Table heads={["Init", "Variance", "Distribution", "Best for", "PyTorch / Keras"]} rows={[
        ["All zeros", "0", "—", "❌ Never", "zeros()"],
        ["Random Normal", "0.01²", "N(0,0.01)", "Tiny networks only", "normal(0,0.01)"],
        ["LeCun Normal", "1/nᵢₙ", "N(0,1/nᵢₙ)", "SELU activation", "lecun_normal"],
        ["Xavier Uniform", "6/(nᵢₙ+nₒᵤₜ)", "Uniform", "tanh, sigmoid", "glorot_uniform (default Keras)"],
        ["Xavier Normal", "2/(nᵢₙ+nₒᵤₜ)", "Normal", "tanh, sigmoid", "glorot_normal"],
        ["He Uniform", "6/nᵢₙ", "Uniform", "ReLU, variants", "he_uniform"],
        ["He Normal", "2/nᵢₙ", "Normal", "ReLU, variants", "he_normal / kaiming_normal"],
        ["Orthogonal", "—", "Orthogonal matrix", "Deep RNNs, ResNets", "orthogonal"],
      ]} />

      <Code>{`import torch
import torch.nn as nn
import numpy as np

# ── PyTorch initialization ────────────────────────────────
layer = nn.Linear(256, 128)

# He (Kaiming) — for ReLU
nn.init.kaiming_normal_(layer.weight, mode='fan_in', nonlinearity='relu')
nn.init.zeros_(layer.bias)

# Xavier — for tanh/sigmoid
nn.init.xavier_normal_(layer.weight)
nn.init.zeros_(layer.bias)

# Apply globally across a model
def init_weights(m):
    if isinstance(m, nn.Linear):
        nn.init.kaiming_uniform_(m.weight, nonlinearity='relu')
        if m.bias is not None:
            nn.init.constant_(m.bias, 0)
    elif isinstance(m, nn.Conv2d):
        nn.init.kaiming_normal_(m.weight, mode='fan_out', nonlinearity='relu')

model = MyModel()
model.apply(init_weights)   # applies recursively

# ── Keras initialization ──────────────────────────────────
from tensorflow.keras import initializers

# Keras default is glorot_uniform — fine for tanh, change for ReLU
layer_tanh = tf.keras.layers.Dense(
    128, activation='tanh',
    kernel_initializer='glorot_uniform'    # default, explicit
)
layer_relu = tf.keras.layers.Dense(
    128, activation='relu',
    kernel_initializer='he_normal'         # correct for ReLU!
)
layer_selu = tf.keras.layers.Dense(
    128, activation='selu',
    kernel_initializer='lecun_normal'      # required for SELU
)

# ── Verify initialization quality ────────────────────────
def check_init_quality(model, X_sample):
    """Forward pass once and check activation statistics per layer."""
    activations = []
    def hook_fn(module, inp, out):
        activations.append(out.detach())

    hooks = [l.register_forward_hook(hook_fn)
             for l in model.modules() if isinstance(l, nn.ReLU)]

    with torch.no_grad(): model(X_sample)
    for hook in hooks: hook.remove()

    print(f"{'Layer':<8} {'Mean':>10} {'Std':>10} {'% dead':>10}")
    for i, act in enumerate(activations):
        mean = act.mean().item(); std = act.std().item()
        dead = (act == 0).float().mean().item()
        status = "✓" if 0.4 < std < 1.5 else "⚠️"
        print(f"  {i:<6} {mean:>10.4f} {std:>10.4f} {dead*100:>9.1f}%  {status}")`}</Code>

      <QA q="Derive the He initialization variance from first principles."
          a="For a ReLU network: z = Σⱼ wⱼaⱼ where Var[aⱼ] = σ²_a. Assuming i.i.d. weights with E[w]=0, E[a]=0: Var[z] = nᵢₙ · Var[w] · Var[a]. After ReLU, activations have: E[ReLU(z)] = 0 (by symmetry when z ~ N(0,σ²)), E[ReLU(z)²] = E[z²]/2 = σ²_z/2 (half the Gaussian mass is zeroed). For variance to be preserved layer to layer: Var[z_{l+1}] = Var[z_l]. This requires nᵢₙ · Var[w] · Var[a] = Var[a], so Var[w] = 1/nᵢₙ. But since ReLU halves the effective variance, we need to double it: <strong>Var[w] = 2/nᵢₙ</strong>." />
      <QA q="Why does Keras default to glorot_uniform and not he_uniform?"
          a="Keras was designed when sigmoid/tanh were the dominant activations (pre-2012), and glorot_uniform is optimal for those. It was kept as the default for backward compatibility. When using ReLU (the modern default), you should always explicitly set kernel_initializer='he_normal' or 'he_uniform'. In practice, for deep networks with ReLU, glorot_uniform's variance of 2/(nᵢₙ+nₒᵤₜ) ≈ 1/nᵢₙ is close to He's 2/nᵢₙ only for the first few layers, but diverges increasingly with depth." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   ROOT
══════════════════════════════════════════════════════ */
const TABS = [
  { id: "es", label: "Early Stopping" },
  { id: "scale", label: "Feature Scaling" },
  { id: "drop", label: "Dropout & L1/L2" },
  { id: "act", label: "Activation Fns" },
  { id: "init", label: "Weight Init" },
];

export default function ImprovingNN() {
  const [active, setActive] = useState("es");
  const map = {
    es: <SectionEarlyStopping />,
    scale: <SectionFeatureScaling />,
    drop: <SectionDropoutReg />,
    act: <SectionActivations />,
    init: <SectionWeightInit />
  };

  return (
    <div>
      <div className="page-header">
        <div className="page-header-eyebrow">Deep Learning — Module 07</div>
        <h1 className="page-header-title">Performance: Early Stopping · Scaling · Dropout · Regularization · Activations · Init</h1>
        <p className="page-header-subtitle">Chapters 21–30 · Interactive visualizations · Complete math · Production code</p>
      </div>

      <SectionNav tabs={TABS} active={active} onChange={setActive} />

      <div style={{ padding: "0.5rem 0 2rem" }}>
        {map[active]}
      </div>

      <NavButtons moduleId={7} />
    </div>
  );
}
