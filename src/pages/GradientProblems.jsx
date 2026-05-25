import { useState, useRef, useEffect, useCallback } from "react";
import { Code } from '../components/ui/Code.jsx';
import { Mx, H2, H3, P } from '../components/ui/Typography.jsx';
import { QA } from '../components/ui/QA.jsx';
import { Note, Grid, Card, Table, VizBox } from '../components/ui/Primitives.jsx';
import NavButtons from '../components/layout/NavButtons.jsx';
import SectionNav from '../components/layout/SectionNav.jsx';

/* ══════════════════════════════════════════════════════
   GRADIENT DESCENT VISUALIZER
══════════════════════════════════════════════════════ */
function GDVisualizer() {
  const canvasRef = useRef(null);
  const [running, setRunning] = useState(false);
  const [paths, setPaths] = useState({ bgd: [], sgd: [], mgd: [] });
  const [losses, setLosses] = useState({ bgd: [], sgd: [], mgd: [] });
  const animRef = useRef(null);

  // Quadratic bowl with slight asymmetry
  const loss = (w1, w2) => 0.6 * (w1 - 1) ** 2 + 1.8 * (w2 - 0.5) ** 2;
  const gradLoss = (w1, w2) => [1.2 * (w1 - 1), 3.6 * (w2 - 0.5)];
  // SGD noise function
  const noisyGrad = (w1, w2, noise) => {
    const [g1, g2] = gradLoss(w1, w2);
    return [g1 + noise * (Math.random() - 0.5) * 4, g2 + noise * (Math.random() - 0.5) * 4];
  };

  const simulate = useCallback(() => {
    const bgd = [[-2.5, 2.5]], sgd = [[-2.5, 2.5]], mgd = [[-2.5, 2.5]];
    const lBgd = [], lSgd = [], lMgd = [];
    const lr_bgd = 0.15, lr_sgd = 0.08, lr_mgd = 0.12;
    for (let i = 0; i < 60; i++) {
      // BGD — smooth full gradient
      let [w1b, w2b] = bgd[bgd.length - 1];
      const [g1b, g2b] = gradLoss(w1b, w2b);
      bgd.push([w1b - lr_bgd * g1b, w2b - lr_bgd * g2b]);
      lBgd.push(loss(w1b, w2b));
      // SGD — very noisy
      let [w1s, w2s] = sgd[sgd.length - 1];
      const [g1s, g2s] = noisyGrad(w1s, w2s, 1.4);
      sgd.push([w1s - lr_sgd * g1s, w2s - lr_sgd * g2s]);
      lSgd.push(loss(w1s, w2s));
      // Mini-batch — moderate noise
      let [w1m, w2m] = mgd[mgd.length - 1];
      const [g1m, g2m] = noisyGrad(w1m, w2m, 0.45);
      mgd.push([w1m - lr_mgd * g1m, w2m - lr_mgd * g2m]);
      lMgd.push(loss(w1m, w2m));
    }
    return { paths: { bgd, sgd, mgd }, losses: { bgd: lBgd, sgd: lSgd, mgd: lMgd } };
  }, []);

  const run = () => {
    const result = simulate();
    setPaths(result.paths); setLosses(result.losses);
  };
  const reset = () => { setPaths({ bgd: [], sgd: [], mgd: [] }); setLosses({ bgd: [], sgd: [], mgd: [] }); };

  useEffect(() => {
    const cv = canvasRef.current; if (!cv) return;
    const ctx = cv.getContext("2d");
    const W = cv.width, H = cv.height, range = 3.5;
    ctx.clearRect(0, 0, W, H);
    const toX = w => (w + range) / (2 * range) * W;
    const toY = w => H - (w + range) / (2 * range) * H;

    // Contour background
    const res = 55;
    for (let i = 0; i < res; i++) for (let j = 0; j < res; j++) {
      const w1 = -range + (i / res) * 2 * range, w2 = -range + (j / res) * 2 * range;
      const L = loss(w1, w2), intensity = Math.max(0, Math.min(1, 1 - L / 8));
      ctx.fillStyle = `rgba(${Math.round(20 + intensity * 20)},${Math.round(30 + intensity * 100)},${Math.round(60 + intensity * 140)},0.9)`;
      ctx.fillRect(toX(w1), toY(w2 + 0.13), W / res + 1, H / res + 1);
    }
    // Minimum star
    ctx.beginPath(); ctx.arc(toX(1), toY(0.5), 7, 0, Math.PI * 2);
    ctx.fillStyle = "#FFD700"; ctx.fill();
    ctx.strokeStyle = "#000"; ctx.lineWidth = 1.5; ctx.stroke();

    const drawPath = (pts, color) => {
      if (pts.length < 2) return;
      ctx.beginPath(); ctx.strokeStyle = color; ctx.lineWidth = 1.8; ctx.globalAlpha = 0.9;
      pts.forEach(([w1, w2], i) => i === 0 ? ctx.moveTo(toX(w1), toY(w2)) : ctx.lineTo(toX(w1), toY(w2)));
      ctx.stroke();
      pts.forEach(([w1, w2], i) => { if (i % 8 === 0 || i === pts.length - 1) { ctx.beginPath(); ctx.arc(toX(w1), toY(w2), i === 0 ? 6 : 3, 0, Math.PI * 2); ctx.fillStyle = color; ctx.fill(); } });
      ctx.globalAlpha = 1;
    };
    drawPath(paths.bgd, "#4FC3F7");
    drawPath(paths.sgd, "#FF8A65");
    drawPath(paths.mgd, "#81C784");

    ctx.font = "11.5px var(--font-sans)"; ctx.globalAlpha = 0.9;
    [["#4FC3F7", "Batch GD"], ["#FF8A65", "SGD"], ["#81C784", "Mini-batch GD"]].forEach(([c, l], i) => {
      ctx.fillStyle = c; ctx.fillText("─ " + l, 8, 16 + i * 17);
    });
    ctx.fillStyle = "rgba(255,255,255,0.5)"; ctx.fillText("⭐ global min", toX(1) + 9, toY(0.5) + 4);
    ctx.globalAlpha = 1;
  }, [paths]);

  return (
    <VizBox>
      <canvas ref={canvasRef} width={440} height={280} style={{ display: "block", margin: "0 auto", borderRadius: "var(--border-radius-md)", maxWidth: "100%" }} />
      {losses.bgd.length > 0 && (
        <LossCurves losses={losses} />
      )}
      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 10 }}>
        <button onClick={run} style={{ padding: "6px 16px", fontSize: 13, background: "var(--color-background-info)", border: "0.5px solid var(--color-border-info)", color: "var(--color-text-info)", borderRadius: "var(--border-radius-md)", cursor: "pointer", fontWeight: 500 }}>
          Run all three
        </button>
        <button onClick={reset} style={{ padding: "6px 12px", fontSize: 13, border: "0.5px solid var(--color-border-tertiary)", background: "transparent", color: "var(--color-text-secondary)", borderRadius: "var(--border-radius-md)", cursor: "pointer" }}>
          Reset
        </button>
      </div>
    </VizBox>
  );
}

function LossCurves({ losses }) {
  const ref = useRef(null);
  useEffect(() => {
    const cv = ref.current; if (!cv) return;
    const ctx = cv.getContext("2d");
    const W = cv.width, H = cv.height;
    ctx.clearRect(0, 0, W, H);
    const maxL = Math.max(...losses.bgd, ...losses.sgd, ...losses.mgd) * 1.05;
    const toX = (i, n) => 50 + (i / n) * (W - 60);
    const toY = v => H - 20 - (v / maxL) * (H - 30);
    ctx.strokeStyle = "rgba(128,128,128,0.1)"; ctx.lineWidth = 0.5;
    for (let i = 0; i <= 4; i++) { const y = toY(maxL * i / 4); ctx.beginPath(); ctx.moveTo(50, y); ctx.lineTo(W, y); ctx.stroke(); }
    ctx.fillStyle = "rgba(128,128,128,0.5)"; ctx.font = "10px var(--font-mono)"; ctx.textAlign = "right";
    for (let i = 0; i <= 4; i++) ctx.fillText((maxL * i / 4).toFixed(1), 44, toY(maxL * i / 4) + 3);
    ctx.textAlign = "start";
    const drawLine = (arr, color) => { ctx.beginPath(); ctx.strokeStyle = color; ctx.lineWidth = 1.8; arr.forEach((v, i) => i === 0 ? ctx.moveTo(toX(i, arr.length), toY(v)) : ctx.lineTo(toX(i, arr.length), toY(v))); ctx.stroke(); };
    drawLine(losses.bgd, "#4FC3F7");
    drawLine(losses.sgd, "#FF8A65");
    drawLine(losses.mgd, "#81C784");
    ctx.fillStyle = "rgba(128,128,128,0.6)"; ctx.font = "10px var(--font-sans)"; ctx.textAlign = "center";
    ctx.fillText("Training step →", W / 2, H - 3);
    ctx.textAlign = "left";
    ctx.fillText("Loss", 8, 12);
  }, [losses]);
  return <canvas ref={ref} width={440} height={120} style={{ display: "block", margin: "8px auto 0", borderRadius: "var(--border-radius-md)", background: "var(--color-background-tertiary)", maxWidth: "100%" }} />;
}

/* ══════════════════════════════════════════════════════
   VANISHING GRADIENT VISUALIZER
══════════════════════════════════════════════════════ */
function VanishingViz() {
  const [depth, setDepth] = useState(6);
  const [actFn, setActFn] = useState("sigmoid");

  const maxDerivs = { sigmoid: 0.25, tanh: 1.0, relu: 1.0, "leaky-relu": 1.0 };
  const avgDerivs = { sigmoid: 0.15, tanh: 0.5, relu: 0.55, "leaky-relu": 0.55 };

  const gradAtLayer = (l) => {
    const d = avgDerivs[actFn];
    return Math.pow(d, depth - l);
  };

  const layers = Array.from({ length: depth }, (_, i) => i + 1);
  const maxG = gradAtLayer(depth);

  return (
    <VizBox>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center", marginBottom: 12, fontSize: 13 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ color: "var(--color-text-secondary)" }}>Depth (layers)</span>
          <input type="range" min={3} max={12} value={depth} onChange={e => setDepth(+e.target.value)} style={{ width: 100 }} />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, minWidth: 16 }}>{depth}</span>
        </div>
        <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
          {["sigmoid", "tanh", "relu", "leaky-relu"].map(fn => (
            <button key={fn} onClick={() => setActFn(fn)} style={{ padding: "3px 10px", fontSize: 11.5, fontWeight: fn === actFn ? 500 : 400, border: `0.5px solid var(--color-border-${fn === actFn ? "info" : "tertiary"})`, borderRadius: "20px", background: fn === actFn ? "var(--color-background-info)" : "transparent", color: fn === actFn ? "var(--color-text-info)" : "var(--color-text-secondary)", cursor: "pointer" }}>{fn}</button>
          ))}
        </div>
      </div>

      <div style={{ padding: "0 4px" }}>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 100, marginBottom: 6 }}>
          {layers.map(l => {
            const g = gradAtLayer(l);
            const pct = Math.max(2, (g / maxG) * 95);
            const isVanished = g < 0.001;
            const color = isVanished ? "var(--color-text-danger)" : g < 0.05 ? "var(--color-text-warning)" : "var(--color-text-success)";
            return (
              <div key={l} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", height: "100%" }}>
                <div style={{ width: "100%", height: `${pct}%`, background: color, borderRadius: "3px 3px 0 0", transition: "all 0.3s", opacity: 0.85 }} />
              </div>
            );
          })}
        </div>
        <div style={{ display: "flex", gap: 6, marginBottom: 4 }}>
          {layers.map(l => (
            <div key={l} style={{ flex: 1, textAlign: "center", fontSize: 9.5, fontFamily: "var(--font-mono)", color: "var(--color-text-tertiary)" }}>L{l}</div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {layers.map(l => {
            const g = gradAtLayer(l);
            const isVanished = g < 0.001;
            return (
              <div key={l} style={{ flex: 1, textAlign: "center", fontSize: 9, fontFamily: "var(--font-mono)", color: isVanished ? "var(--color-text-danger)" : g < 0.05 ? "var(--color-text-warning)" : "var(--color-text-success)" }}>
                {g < 0.0001 ? "≈0" : g.toFixed(3)}
              </div>
            );
          })}
        </div>
        <div style={{ fontSize: 11.5, color: "var(--color-text-secondary)", marginTop: 8, textAlign: "center" }}>
          Gradient magnitude at each layer (L{depth} = output → L1 = input)
          {actFn === "sigmoid" && depth >= 6 && <span style={{ color: "var(--color-text-danger)", fontWeight: 500 }}> — Early layers are DEAD</span>}
        </div>
      </div>
    </VizBox>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 1 — GRADIENT DESCENT TYPES
══════════════════════════════════════════════════════ */
function SectionGDTypes() {
  return (
    <div>
      <P>Gradient descent has three variants that differ in how much data is used per weight update. This single choice has cascading effects on speed, stability, memory usage, and generalization.</P>

      <H2>The three variants — formal definitions</H2>
      <Mx block>{`  Given n training samples {(x₁,y₁), ..., (xₙ,yₙ)}, loss L, LR η:

  ━━ Batch Gradient Descent (BGD) ━━━━━━━━━━━━━━━━━━━━━━
  for epoch in range(T):
    g = (1/n) Σᵢ₌₁ⁿ ∇L(xᵢ,yᵢ; w)    ← gradient over ALL n samples
    w ← w − η · g

  ━━ Stochastic Gradient Descent (SGD) ━━━━━━━━━━━━━━━━
  for epoch in range(T):
    shuffle data
    for i in range(n):
      g = ∇L(xᵢ,yᵢ; w)               ← gradient over 1 sample
      w ← w − η · g

  ━━ Mini-Batch Gradient Descent ━━━━━━━━━━━━━━━━━━━━━━
  for epoch in range(T):
    shuffle data
    for batch B in batches(X, y, size=B):
      g = (1/|B|) Σᵢ∈B ∇L(xᵢ,yᵢ; w)  ← gradient over B samples
      w ← w − η · g`}</Mx>

      <H2>Interactive comparison — loss landscape paths</H2>
      <P>Batch GD follows a smooth path. SGD bounces erratically but can escape local minima. Mini-batch strikes the balance.</P>
      <GDVisualizer />

      <H2>Performance metrics: 500 rows, 10 epochs, batch size 32</H2>
      <Table
        heads={["Metric", "Batch GD", "SGD", "Mini-batch (B=32)"]}
        rows={[
          ["Weight updates / epoch", "1 (uses all 500)", "500 (one/sample)", "⌈500/32⌉ = 16"],
          ["Weight updates / 10 epochs", "10 total", "5,000 total", "160 total"],
          ["Gradient noise", "None (exact gradient)", "Very high", "Moderate"],
          ["Memory per update", "All 500 samples", "1 sample", "32 samples"],
          ["GPU utilization", "Poor (one big pass)", "Very poor (serial)", "Excellent (BLAS)"],
          ["Convergence path", "Smooth monotone", "Erratic/noisy", "Smooth with slight noise"],
          ["Epoch time", "Slow (all data)", "Moderate", "Fast (vectorized)"],
          ["Generalization", "Can overfit", "Often better", "Best in practice"],
        ]}
      />

      <H2>Batch Gradient Descent — detailed</H2>
      <Mx block>{`  Pseudocode:
  ─────────────────────────────────────────────────
  Initialize w randomly
  for epoch = 1 to T:
    grad_sum = 0
    for i = 1 to n:
      grad_sum += ∇L(xᵢ, yᵢ; w)      ← accumulate all
    g = grad_sum / n                    ← average gradient
    w ← w − η · g                      ← single update
  ─────────────────────────────────────────────────

  Key characteristics:
  + Exact gradient (no noise)
  + Deterministic — same result every run
  + Guaranteed convergence for convex loss with correct η
  − One update per epoch (extremely slow learning)
  − Entire dataset must fit in memory
  − Cannot exploit GPU parallelism efficiently
  − Useless for online/streaming learning`}</Mx>

      <H2>Stochastic Gradient Descent (SGD) — detailed</H2>
      <Mx block>{`  Pseudocode:
  ─────────────────────────────────────────────────
  Initialize w randomly
  for epoch = 1 to T:
    shuffle {(x₁,y₁),...,(xₙ,yₙ)}
    for i = 1 to n:
      g = ∇L(xᵢ, yᵢ; w)              ← gradient of ONE sample
      w ← w − η · g                    ← update immediately
  ─────────────────────────────────────────────────

  Key characteristics:
  + n updates per epoch (fast early learning)
  + Noise helps escape local minima and saddle points
  + Works for online/streaming learning
  + Low memory (one sample at a time)
  − Very noisy loss curve (hard to diagnose training)
  − Cannot use matrix operations efficiently (no vectorization)
  − High variance → may not converge to minimum
  − Needs learning rate decay to settle`}</Mx>

      <H2>Mini-Batch Gradient Descent — detailed</H2>
      <Mx block>{`  Pseudocode:
  ─────────────────────────────────────────────────
  Initialize w randomly
  for epoch = 1 to T:
    shuffle data
    for batch B ⊆ {1,...,n}, |B| = batch_size:
      g = (1/|B|) Σᵢ∈B ∇L(xᵢ, yᵢ; w) ← avg gradient over batch
      w ← w − η · g
  ─────────────────────────────────────────────────

  Best of both worlds:
  ✓ Vectorized matrix ops → GPU-efficient
  ✓ Moderate noise → escapes saddle points
  ✓ Lower variance than SGD → more stable convergence
  ✓ Memory-efficient: only batch_size samples in RAM at once
  ✓ Standard choice in all modern deep learning frameworks`}</Mx>

      <H2>Mathematical representation — why mini-batch gradient is unbiased</H2>
      <Mx block>{`  True gradient:   g* = (1/n) Σᵢ₌₁ⁿ ∇L(xᵢ,yᵢ;w)

  Mini-batch gradient (random batch B of size b):
    ĝ = (1/b) Σᵢ∈B ∇L(xᵢ,yᵢ;w)

  E[ĝ] = g*    (unbiased estimator of true gradient)

  Variance:  Var[ĝ] = (1/b) · Var[∇L(xᵢ,yᵢ;w)]
             ↑ decreases as batch size b increases
  
  SGD (b=1):     highest variance, unbiased
  BGD (b=n):     zero variance (exact), unbiased
  Mini-batch:    variance = (1/b)σ², tunable`}</Mx>

      <H2>Why SGD's erratic behavior is useful</H2>
      <Note color="info" icon="ti-bulb">
        <strong>The noise is a feature, not a bug.</strong> SGD's gradient noise acts like simulated annealing — it prevents the optimizer from getting stuck in sharp local minima. Empirically, SGD-trained models often generalize better than those trained with full-batch GD, even on the same dataset (Keskar et al., 2017).
      </Note>
      <Mx block>{`  Sharp minimum:   small perturbation → large loss increase
                   → poor generalization on test data
  
  Flat minimum:   small perturbation → small loss increase
                  → good generalization on test data

  SGD noise preferentially finds flat minima.
  Batch GD converges to whatever minimum it first encounters
  (often a sharper one) with no stochasticity to escape.`}</Mx>

      <H2>Vectorization — why powers of 2 for batch size</H2>
      <Mx block>{`  Vectorized (mini-batch, matrix form):
    Z = X_batch @ W.T + b        ← ONE BLAS call, GPU-optimized
    X_batch shape: (batch_size, n_features)

  Non-vectorized (SGD, loop):
    for xi in X_batch:
      z = xi @ W.T + b            ← n separate operations
    
  GPU hardware:
    — CUDA cores work in warps of 32 threads
    — Tensor cores operate on 8×8 or 16×16 tiles
    — Powers of 2 (16, 32, 64, 128, 256) align to these tiles
    — Non-power-of-2 batch sizes waste GPU capacity

  Memory coalescing:
    — GPU reads memory in 128-byte chunks
    — Batch sizes of 2^k ensure full cache line utilization`}</Mx>

      <H2>Edge case: non-perfect division</H2>
      <Note color="warning" icon="ti-alert-triangle">
        When n=500 and batch_size=32: 500/32 = 15.625 → 15 full batches + 1 partial batch of 20 samples. The last batch has 20 samples, not 32.
      </Note>
      <Mx block>{`  Problem: n=500, batch_size=32
    Full batches:   ⌊500/32⌋ = 15  (15 × 32 = 480 samples)
    Last batch:     500 - 480 = 20 samples

  Solution options:
  1. drop_last=True:  discard last incomplete batch
     — 15 updates per epoch, loses 20 samples
  2. drop_last=False: use partial batch (default in PyTorch)
     — 16 updates per epoch, slight gradient variance in last step
  3. Oversampling: pad last batch to size 32 with random repeats
     — Always 16 full batches, slight bias

  In PyTorch:
    DataLoader(dataset, batch_size=32, drop_last=False)  ← default
    DataLoader(dataset, batch_size=32, drop_last=True)   ← uniform`}</Mx>

      <H2>Implementation: all three variants</H2>
      <Code>{`import numpy as np

def sigmoid(z):   return 1/(1+np.exp(-np.clip(z,-500,500)))
def bce_loss(y, yhat): return -np.mean(y*np.log(yhat+1e-15) + (1-y)*np.log(1-yhat+1e-15))
def bce_grad(X, y, yhat): return X.T @ (yhat-y) / len(y)

# ── Shared: generate toy binary data ──────────────────────
np.random.seed(42)
n, d = 500, 10
X = np.hstack([np.random.randn(n,d), np.ones((n,1))])   # +bias col
y = (X[:,0]+X[:,1] > 0).astype(float)

def accuracy(X, y, w):
    return np.mean((sigmoid(X@w)>=0.5)==y)

# ══ 1. BATCH GRADIENT DESCENT ══════════════════════════════
def batch_gd(X, y, epochs=50, lr=0.1):
    w = np.zeros(X.shape[1])
    history = []
    for epoch in range(epochs):
        yhat = sigmoid(X @ w)              # ALL n samples
        grad = bce_grad(X, y, yhat)        # full gradient
        w -= lr * grad                     # 1 update per epoch
        history.append(bce_loss(y, yhat))
    return w, history

# ══ 2. STOCHASTIC GRADIENT DESCENT ═════════════════════════
def sgd(X, y, epochs=50, lr=0.01):
    w = np.zeros(X.shape[1])
    history = []
    for epoch in range(epochs):
        idx = np.random.permutation(len(y))  # shuffle
        epoch_loss = 0
        for i in idx:                         # n=500 updates/epoch
            xi   = X[i:i+1]                  # (1, d+1) — keep 2D
            yi   = y[i:i+1]
            yhat = sigmoid(xi @ w)
            w -= lr * bce_grad(xi, yi, yhat)  # 1 update per sample
            epoch_loss += bce_loss(yi, yhat)
        history.append(epoch_loss / len(y))
    return w, history

# ══ 3. MINI-BATCH GRADIENT DESCENT ═════════════════════════
def minibatch_gd(X, y, epochs=50, lr=0.05, batch_size=32):
    w = np.zeros(X.shape[1])
    history = []
    for epoch in range(epochs):
        idx = np.random.permutation(len(y))
        X_s, y_s = X[idx], y[idx]             # shuffle
        epoch_loss = 0; n_batches = 0
        for start in range(0, len(y), batch_size):
            Xb = X_s[start:start+batch_size]   # (B, d+1)
            yb = y_s[start:start+batch_size]   # (B,)
            yhat = sigmoid(Xb @ w)
            w -= lr * bce_grad(Xb, yb, yhat)   # 1 update/batch
            epoch_loss += bce_loss(yb, yhat); n_batches+=1
        history.append(epoch_loss / n_batches)
    return w, history

# Run and compare
w_bgd, h_bgd = batch_gd(X, y)
w_sgd, h_sgd = sgd(X, y)
w_mgd, h_mgd = minibatch_gd(X, y)

print(f"Batch GD    — Final loss: {h_bgd[-1]:.4f}  Acc: {accuracy(X,y,w_bgd):.3f}")
print(f"SGD         — Final loss: {h_sgd[-1]:.4f}  Acc: {accuracy(X,y,w_sgd):.3f}")
print(f"Mini-batch  — Final loss: {h_mgd[-1]:.4f}  Acc: {accuracy(X,y,w_mgd):.3f}")

# PyTorch DataLoader — the standard mini-batch interface
import torch
from torch.utils.data import TensorDataset, DataLoader

dataset = TensorDataset(torch.FloatTensor(X), torch.FloatTensor(y))
loader  = DataLoader(dataset, batch_size=32, shuffle=True, drop_last=False)

# Standard training loop with DataLoader
model = torch.nn.Sequential(torch.nn.Linear(11,1), torch.nn.Sigmoid())
opt   = torch.optim.SGD(model.parameters(), lr=0.05)
loss_fn = torch.nn.BCELoss()

for epoch in range(10):
    for Xb, yb in loader:              # automatic mini-batching!
        pred = model(Xb).squeeze()
        loss = loss_fn(pred, yb)
        opt.zero_grad(); loss.backward(); opt.step()`}</Code>

      <H2>When to use which</H2>
      <Grid cols={3}>
        {[
          { title: "Batch GD", color: "warning", items: ["Very small datasets (<1K)", "When exact gradient required", "Convex optimization problems", "Research / debugging", "Never for production deep learning"] },
          { title: "SGD", color: "info", items: ["Online/streaming learning", "Extremely large datasets", "When memory is severely limited", "Recommendation systems", "Built-in LR decay needed"] },
          { title: "Mini-batch (default)", color: "success", items: ["All modern deep learning", "Batch size 32–256 (powers of 2)", "Fits in GPU VRAM", "Best GPU utilization", "Standard: Adam + mini-batch"] },
        ].map(({ title, color, items }) => (
          <Card key={title} title={title} color={color}>
            {items.map(i => <div key={i} style={{ marginBottom: 3 }}>• {i}</div>)}
          </Card>
        ))}
      </Grid>

      <H2>Interview Q&A</H2>
      <QA q="What is the difference between an epoch and an iteration?"
          a="An <strong>epoch</strong> is one full pass through the entire training dataset. An <strong>iteration</strong> (or step) is one weight update — i.e., one forward + backward pass on one batch. For n=1000 samples and batch_size=32: iterations per epoch = ⌈1000/32⌉ = 32. After 10 epochs: 320 total iterations. In BGD, iterations = epochs (1 update per epoch). In SGD, iterations = n×epochs." />
      <QA q="Why does mini-batch SGD generalize better than full-batch GD?"
          a="Empirically and theoretically (Keskar et al. 2017, Smith & Le 2018), large-batch training converges to sharp minima of the loss landscape — points where the loss increases steeply in every direction. These sharp minima correspond to poor generalization because a small shift in the weight space (as encountered on test data) dramatically increases the loss. Mini-batch noise acts as a regularizer that steers optimization toward flat minima, where loss changes slowly in all directions and the model generalizes better." />
      <QA q="What happens if the learning rate is not decayed when using SGD?"
          a="SGD's gradient estimate has variance σ²/b where σ² is the sample gradient variance. With a fixed learning rate η, even at the true minimum, each SGD step moves by η × noise — the optimizer bounces around the minimum indefinitely without converging. Gradient descent theory shows convergence requires η→0. Solutions: (1) Learning rate decay schedules (step, cosine, exponential), (2) Adaptive optimizers (Adam, RMSProp) that automatically reduce effective LR based on gradient history." />
      <QA q="Why are batch sizes typically powers of 2?"
          a="Modern GPU memory controllers read data in 32- or 128-byte cache lines. NVIDIA CUDA executes threads in warps of 32. Tensor core operations work on tiles of dimensions that are multiples of 8 or 16. Batch sizes that are powers of 2 (32, 64, 128, 256) align perfectly with these hardware constraints, maximizing memory coalescing and compute utilization. A batch size of 33 wastes one slot in a 64-element GPU warp, while 32 fills it perfectly." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 2 — VANISHING / EXPLODING GRADIENTS
══════════════════════════════════════════════════════ */
function SectionVanishing() {
  return (
    <div>
      <P>The vanishing gradient problem is one of the fundamental obstacles in training deep networks. It causes early layers to learn exponentially slower than later layers, effectively freezing them.</P>

      <H2>The mathematical root cause</H2>
      <P>Recall the backpropagation recurrence (BP2):</P>
      <Mx block>{`  δ⁽ˡ⁾ = (W⁽ˡ⁺¹⁾)ᵀ · δ⁽ˡ⁺¹⁾  ⊙  f'(z⁽ˡ⁾)

  Expanding the recurrence from output (L) to layer l:
  
  δ⁽ˡ⁾ = [Π_{k=l}^{L-1} (W⁽ᵏ⁺¹⁾)ᵀ ⊙ f'(z⁽ᵏ⁾)] · δ⁽ᴸ⁾

  This is a product of (L-l) matrices × (L-l) derivative scalars.

  For sigmoid with |W| ≈ 1:
    f'(z) = σ(z)·(1-σ(z)) ≤ 0.25  (maximum derivative)
    average ≈ 0.15

  After 6 layers:  0.25⁶ ≈ 0.00024   (×4000 smaller)
                   0.15⁶ ≈ 0.0000114  (×88000 smaller!)

  → Layer 1 gradient is 10,000–100,000× smaller than layer 6 gradient`}</Mx>

      <H2>Interactive: gradient magnitude across layers</H2>
      <P>Drag depth and switch activations to see how gradients vanish or survive.</P>
      <VanishingViz />

      <H2>Why sigmoid causes vanishing gradients</H2>
      <Mx block>{`  σ(z) = 1/(1+e^{-z})
  σ'(z) = σ(z)·(1-σ(z))

  σ'(z) has a MAXIMUM at z=0: σ'(0) = 0.5·0.5 = 0.25
  For large |z|: σ'(z) → 0 (flat tails, zero gradient)
  
  In a product over L layers:
    Π_{l=1}^L σ'(z_l) ≤ 0.25^L

  L=5:   ≤ 0.00098  (1000× attenuation)
  L=10:  ≤ 9.5×10⁻⁷  (one million× attenuation)
  L=20:  ≤ 9×10⁻¹³  (one trillion× attenuation!)
  
  tanh is only slightly better: max derivative = 1.0
  but average derivative ≈ 0.5, same exponential decay`}</Mx>

      <H2>How to detect the vanishing gradient problem</H2>
      <Code>{`import torch
import torch.nn as nn
import numpy as np

def monitor_gradients(model, X, y, loss_fn):
    """
    Run one forward+backward pass and report gradient norms per layer.
    Call AFTER loss.backward() and BEFORE optimizer.step().
    """
    # Forward + backward pass
    y_pred = model(X)
    loss   = loss_fn(y_pred, y)
    model.zero_grad()
    loss.backward()

    print(f"Loss: {loss.item():.4f}")
    print(f"{'Layer':<30} {'Grad Norm':>12} {'Max Abs Grad':>14} {'Status'}")
    print("─"*70)

    for name, param in model.named_parameters():
        if param.grad is not None:
            grad_norm = param.grad.norm().item()
            grad_max  = param.grad.abs().max().item()
            if grad_norm < 1e-5:   status = "⚠️  VANISHING"
            elif grad_norm > 100:  status = "💥 EXPLODING"
            else:                  status = "✓  healthy"
            print(f"{name:<30} {grad_norm:>12.2e} {grad_max:>14.2e}   {status}")

# ── Build a deep sigmoid network (will vanish) ──────────────
def build_deep_sigmoid(depth=8, width=64):
    layers = [nn.Linear(10, width), nn.Sigmoid()]
    for _ in range(depth - 2):
        layers += [nn.Linear(width, width), nn.Sigmoid()]
    layers.append(nn.Linear(width, 1))
    return nn.Sequential(*layers)

model_sig = build_deep_sigmoid(depth=8)
X = torch.randn(64, 10)
y = torch.randint(0, 2, (64,1)).float()

print("=== Deep Sigmoid Network (vanishing gradients expected) ===")
monitor_gradients(model_sig, X, y, nn.BCEWithLogitsLoss())
# Typical output for early layers: 1e-8 to 1e-12 (VANISHING)

# ── Same depth but with ReLU (gradient survives) ────────────
def build_deep_relu(depth=8, width=64):
    layers = [nn.Linear(10, width), nn.ReLU()]
    for _ in range(depth - 2):
        layers += [nn.Linear(width, width), nn.ReLU()]
    layers.append(nn.Linear(width, 1))
    return nn.Sequential(*layers)

model_relu = build_deep_relu(depth=8)
print("\\n=== Deep ReLU Network (gradients survive) ===")
monitor_gradients(model_relu, X, y, nn.BCEWithLogitsLoss())`}</Code>

      <H2>5 solutions to vanishing gradients</H2>
      <Grid cols={2}>
        {[
          { n: "1", title: "ReLU activation", color: "success", desc: "f(z) = max(0,z), f'(z) = 1 for z>0. No saturation in positive region — gradient flows through intact. Most effective and widely used fix.", code: `nn.ReLU()       # standard
nn.LeakyReLU()  # prevents dead neurons (α=0.01)
nn.GELU()       # smooth ReLU, used in Transformers` },
          { n: "2", title: "Weight initialization (He/Xavier)", color: "success", desc: "He init (ReLU): σ²=2/nᵢₙ ensures activation variance ≈ 1 per layer, preventing exponential shrink in forward pass (which maps to gradient vanish in backward pass).", code: `nn.Linear(d_in, d_out)  # PyTorch uses Kaiming He by default
# Manual:
torch.nn.init.kaiming_uniform_(layer.weight, nonlinearity='relu')
torch.nn.init.xavier_uniform_(layer.weight)  # for tanh/sigmoid` },
          { n: "3", title: "Batch Normalization", color: "info", desc: "Normalizes pre-activations to N(0,1) before the activation function. This keeps inputs in the non-saturated region of sigmoid/tanh, preventing the zero-derivative regime.", code: `# After Linear, before activation:
nn.Sequential(
  nn.Linear(in, out),
  nn.BatchNorm1d(out),   # ← normalize
  nn.Sigmoid()            # now inputs are near 0, gradient ≠ 0
)` },
          { n: "4", title: "Residual connections (ResNets)", color: "info", desc: "Identity skip connections: output = F(x) + x. The gradient of the identity is exactly 1, providing a 'gradient highway' that bypasses any number of layers, making deep training stable.", code: `class ResBlock(nn.Module):
    def __init__(self, d):
        super().__init__()
        self.layers = nn.Sequential(
            nn.Linear(d,d), nn.BatchNorm1d(d), nn.ReLU(),
            nn.Linear(d,d), nn.BatchNorm1d(d)
        )
    def forward(self, x):
        return nn.ReLU()(self.layers(x) + x)  # ← skip!` },
          { n: "5", title: "Gradient clipping (exploding)", color: "warning", desc: "For the related exploding gradient problem (common in RNNs), clip the gradient norm to a maximum value before the update step.", code: `# In PyTorch training loop:
loss.backward()
torch.nn.utils.clip_grad_norm_(
    model.parameters(),
    max_norm=1.0      # clips ‖∇‖ to max 1.0
)
optimizer.step()` },
        ].map(({ n, title, color, desc, code }) => (
          <div key={n} style={{ border: `0.5px solid var(--color-border-${color})`, borderRadius: "var(--border-radius-lg)", overflow: "hidden" }}>
            <div style={{ background: `var(--color-background-${color})`, padding: "10px 13px" }}>
              <div style={{ fontWeight: 500, fontSize: 13.5, color: `var(--color-text-${color})` }}>{n}. {title}</div>
              <div style={{ fontSize: 12.5, color: `var(--color-text-${color})`, marginTop: 5, lineHeight: 1.6 }}>{desc}</div>
            </div>
            <pre style={{ background: "#1E1E1E", color: "#D4D4D4", fontSize: 11.5, fontFamily: "var(--font-mono)", padding: "10px 12px", margin: 0, overflowX: "auto", lineHeight: 1.6 }}>{code}</pre>
          </div>
        ))}
      </Grid>

      <H2>Brief: exploding gradient problem</H2>
      <Mx block>{`  Cause: weight matrices with eigenvalues > 1
    δ⁽ˡ⁾ = Π_{k=l}^{L} W⁽ᵏ⁾ · δ⁽ᴸ⁾
    If ‖W‖ > 1 consistently:  ‖δ⁽ˡ⁾‖ grows exponentially

  Symptoms:
    — NaN loss during training
    — Weight values → ∞
    — Loss oscillates wildly then diverges
    — More common in RNNs than feedforward networks

  Solutions:
    1. Gradient clipping: clip_grad_norm_(params, max_norm=1.0)
    2. Smaller learning rate
    3. Weight regularization (L2 penalty on ‖W‖)
    4. Careful weight initialization (keep ‖W‖ near 1)
    5. Batch Normalization (bounds activations, bounds gradients)

  Comparison:
    Vanishing:  gradients → 0   → early layers don't learn
    Exploding:  gradients → ∞   → weights → ∞, loss → NaN`}</Mx>

      <Code>{`# Complete demonstration: vanishing vs exploding vs healthy
import torch, torch.nn as nn
import matplotlib.pyplot as plt

def get_grad_norms(model, X, y):
    """Returns dict of {layer_name: grad_norm} after one backward."""
    pred = model(X)
    loss = nn.BCEWithLogitsLoss()(pred, y)
    model.zero_grad(); loss.backward()
    return {n: p.grad.norm().item()
            for n,p in model.named_parameters()
            if p.grad is not None and 'weight' in n}

X = torch.randn(32, 20); y = torch.randint(0,2,(32,1)).float()

configs = {
    "Deep sigmoid (vanishing)": lambda:nn.Sequential(
        *sum([[nn.Linear(20,20),nn.Sigmoid()] for _ in range(8)],[]),
        nn.Linear(20,1)),
    "Large weights (exploding)": lambda: (
        m := nn.Sequential(*sum([[nn.Linear(20,20),nn.Tanh()] for _ in range(8)],[]),nn.Linear(20,1)),
        [nn.init.normal_(p, std=5.0) for p in m.parameters()], m)[-1],
    "ReLU + He init (healthy)": lambda:nn.Sequential(
        *sum([[nn.Linear(20,20),nn.ReLU()] for _ in range(8)],[]),
        nn.Linear(20,1)),
}

for name, builder in configs.items():
    model = builder()
    norms = get_grad_norms(model, X, y)
    vals  = list(norms.values())
    ratio = vals[0]/vals[-1] if vals[-1] > 0 else float('inf')
    print(f"\\n{name}")
    print(f"  Layer 1 grad norm: {vals[0]:.2e}")
    print(f"  Layer 8 grad norm: {vals[-1]:.2e}")
    print(f"  Ratio (L1/L8):     {ratio:.2e}  ← {'OK' if 0.01<ratio<100 else 'PROBLEM'}")`}</Code>

      <H2>Interview Q&A</H2>
      <QA q="Explain mathematically why sigmoid causes vanishing gradients in deep networks."
          a="The backpropagation recurrence expands to δ⁽ˡ⁾ = [Π_{k=l}^{L-1} (W⁽ᵏ⁾)ᵀ ⊙ σ'(z⁽ᵏ⁾)] · δ⁽ᴸ⁾. The sigmoid derivative σ'(z) = σ(z)(1-σ(z)) ≤ 0.25 everywhere, with typical values around 0.15. For a 10-layer network, the product of 9 such derivatives: 0.15⁹ ≈ 3.8×10⁻⁸ — the early layers receive gradients 10 million times smaller than the output layer. At this scale, floating-point precision is lost and the early layers effectively stop learning." />
      <QA q="Why does ReLU solve the vanishing gradient problem?"
          a="ReLU f(z) = max(0,z) has derivative f'(z) = 1 for z > 0 and 0 for z < 0. For neurons that are active (z > 0), the gradient passes through exactly unchanged — the product Π f'(z⁽ˡ⁾) includes factors of 1, not 0.25. This allows gradients to flow back through many layers without exponential attenuation. The trade-off is the 'dying ReLU' problem (neurons where z < 0 get exactly 0 gradient), addressed by Leaky ReLU, ELU, or GELU." />
      <QA q="How do residual connections solve the vanishing gradient problem?"
          a="A residual block computes output = F(x) + x. By chain rule, ∂output/∂x = ∂F/∂x + I (identity). The gradient flowing backward through this block is: ∂L/∂x = ∂L/∂output · (∂F/∂x + I). Even if ∂F/∂x → 0 (vanished), the identity term I ensures the gradient is at least ∂L/∂output · I — it passes through unchanged. With skip connections, the network has a direct gradient path from the loss to every layer, bypassing potentially vanishing intermediate layers. This is why ResNets can be trained with 100+ layers." />
      <QA q="What is the difference between vanishing and exploding gradients?"
          a="Both stem from the same multiplication of matrices in BP2. <strong>Vanishing</strong>: when weight matrices have spectral radius < 1 (or activation derivatives < 1 consistently), the product shrinks exponentially → early layer gradients → 0 → early layers don't update. <strong>Exploding</strong>: when weight matrices have spectral radius > 1, the product grows exponentially → gradients → ∞ → NaN weights. Vanishing is more common in feedforward networks; exploding in RNNs (unrolled over many time steps). Both are fixed by residual connections; exploding additionally by gradient clipping." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   ROOT
══════════════════════════════════════════════════════ */
const TABS = [
  { id:"gd",   label:"Gradient Descent" },
  { id:"vg",   label:"Vanishing & Exploding" },
];

export default function GradientProblems() {
  const [active, setActive] = useState("gd");
  const map = { gd:<SectionGDTypes />, vg:<SectionVanishing /> };

  return (
    <div>
      <div className="page-header">
        <div className="page-header-eyebrow">Deep Learning — Module 06</div>
        <h1 className="page-header-title">Gradient Descent Variants · Vanishing & Exploding Gradients</h1>
        <p className="page-header-subtitle">Batch vs SGD vs Mini-batch · Vectorization · Vanishing gradient derivation · 5 solutions · Code diagnostics</p>
      </div>

      <SectionNav tabs={TABS} active={active} onChange={setActive} />

      <div style={{ padding:"0.5rem 0 2rem" }}>
        {map[active]}
      </div>

      <NavButtons moduleId={6} />
    </div>
  );
}
