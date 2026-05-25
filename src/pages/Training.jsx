import { useState, useRef, useEffect, useCallback } from "react";
import { Code } from '../components/ui/Code.jsx';
import { Mx, H2, H3, P } from '../components/ui/Typography.jsx';
import { QA } from '../components/ui/QA.jsx';
import { Note, Grid, Card, Table, VizBox } from '../components/ui/Primitives.jsx';
import NavButtons from '../components/layout/NavButtons.jsx';
import SectionNav from '../components/layout/SectionNav.jsx';

/* ══════════════════════════════════════════════════════
   SECTION 1 — LOSS FUNCTIONS
══════════════════════════════════════════════════════ */
function SectionLoss() {
  const canvasRef = useRef(null);
  const [delta, setDelta] = useState(1.0);

  useEffect(() => {
    const cv = canvasRef.current; if (!cv) return;
    const ctx = cv.getContext("2d");
    const W = cv.width, H = cv.height;
    ctx.clearRect(0, 0, W, H);

    const errors = Array.from({ length: 200 }, (_, i) => -3 + i * 6 / 199);
    const toX = e => W * (e + 3) / 6;
    const toY = (v, maxV) => H - 10 - (H - 20) * (v / maxV);

    const mse  = errors.map(e => 0.5 * e * e);
    const mae  = errors.map(e => Math.abs(e));
    const hub  = errors.map(e => Math.abs(e) <= delta ? 0.5 * e * e : delta * Math.abs(e) - 0.5 * delta * delta);
    const maxV = 4.5;

    const draw = (vals, color, label) => {
      ctx.beginPath(); ctx.strokeStyle = color; ctx.lineWidth = 2;
      vals.forEach((v, i) => {
        const x = toX(errors[i]), y = toY(Math.min(v, maxV), maxV);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      });
      ctx.stroke();
    };

    ctx.strokeStyle = "rgba(128,128,128,0.15)"; ctx.lineWidth = 0.5;
    for (let g = -3; g <= 3; g++) {
      const x = toX(g); ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
    }
    ctx.strokeStyle = "rgba(128,128,128,0.3)"; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(toX(0), 0); ctx.lineTo(toX(0), H); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, toY(0, maxV)); ctx.lineTo(W, toY(0, maxV)); ctx.stroke();

    draw(mse, "#378ADD", "MSE");
    draw(mae, "#1D9E75", "MAE");
    draw(hub, "#EF9F27", "Huber");

    ctx.font = "12px var(--font-sans)";
    [["#378ADD", "MSE (0.5e²)"], ["#1D9E75", "MAE (|e|)"], ["#EF9F27", `Huber (δ=${delta.toFixed(1)})`]]
      .forEach(([c, l], i) => { ctx.fillStyle = c; ctx.fillText(l, 8, 18 + i * 18); });
    ctx.fillStyle = "rgba(128,128,128,0.6)"; ctx.fillText("error (e = y − ŷ)", W / 2 - 40, H - 3);
  }, [delta]);

  return (
    <div>
      <P>A loss function measures how wrong a single prediction is. The cost function is its average over all training samples. Both terms are often used interchangeably, but the distinction matters for derivations.</P>

      <Note color="info" icon="ti-scale">
        <strong>Loss</strong> = error for one sample. <strong>Cost</strong> = average loss over the full dataset. Gradient descent minimizes the cost; backpropagation computes ∂Cost/∂w.
      </Note>

      <H2>Regression losses</H2>

      <H3>Mean Squared Error (MSE / L2 loss)</H3>
      <Mx block>{`  L_MSE = (1/2)(y - ŷ)²           (per sample, factor ½ for clean derivative)
  C_MSE = (1/n) Σᵢ (yᵢ - ŷᵢ)²

  Gradient:  ∂C/∂ŷ = -(2/n) Σ (yᵢ - ŷᵢ) = (2/n)(ŷ - y)
  
  Properties:
  ✓ Smooth everywhere — clean gradient
  ✓ Large errors penalized heavily (quadratic growth)
  ✗ Very sensitive to outliers (outlier error² dominates)
  ✗ Units are squared (RMSE is more interpretable)`}</Mx>

      <H3>Mean Absolute Error (MAE / L1 loss)</H3>
      <Mx block>{`  L_MAE = |y - ŷ|
  C_MAE = (1/n) Σᵢ |yᵢ - ŷᵢ|

  Gradient:  ∂C/∂ŷ = -(1/n) Σ sign(yᵢ - ŷᵢ)

  Properties:
  ✓ Robust to outliers (linear growth, not quadratic)
  ✓ Units interpretable (same scale as target)
  ✗ Non-differentiable at y = ŷ (subgradient needed)
  ✗ Gradient is constant magnitude — slow near minimum`}</Mx>

      <H3>Huber Loss (smooth MAE)</H3>
      <Mx block>{`         ⎧  ½(y-ŷ)²                    if |y-ŷ| ≤ δ   (quadratic zone)
  L_δ = ⎨
         ⎩  δ|y-ŷ| - ½δ²              if |y-ŷ| > δ   (linear zone)

  Gradient:  ∂L/∂ŷ = -(y-ŷ)        in quadratic zone
                    = -δ·sign(y-ŷ)  in linear zone

  Properties:
  ✓ Smooth everywhere (differentiable, even at ±δ)
  ✓ Best of both: MSE for small errors, MAE for large ones
  ✓ δ is a hyperparameter controlling outlier sensitivity
  ✓ Used in Huber regression, Faster R-CNN bounding box loss`}</Mx>

      <VizBox>
        <canvas ref={canvasRef} width={560} height={200} style={{ display: "block", margin: "0 auto", maxWidth: "100%" }} />
        <div style={{ display: "grid", gridTemplateColumns: "80px 1fr 52px", alignItems: "center", gap: 8, marginTop: 10, fontSize: 12.5, maxWidth: 400, margin: "10px auto 0" }}>
          <span style={{ color: "var(--color-text-secondary)" }}>Huber δ</span>
          <input type="range" min={0.2} max={3} step={0.1} value={delta} onChange={e => setDelta(+e.target.value)} />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, textAlign: "right" }}>{delta.toFixed(1)}</span>
        </div>
      </VizBox>

      <H2>Classification losses</H2>
      <H3>Binary Cross-Entropy (BCE)</H3>
      <Mx block>{`  For binary labels y ∈ {0, 1},  ŷ = σ(z) ∈ (0,1):

  L_BCE = -[y·log(ŷ) + (1-y)·log(1-ŷ)]

  Gradient w.r.t. ŷ:
    ∂L/∂ŷ = -y/ŷ + (1-y)/(1-ŷ)

  Gradient w.r.t. z (combined with sigmoid derivative — cancels neatly):
    ∂L/∂z = ŷ - y     ← elegant result!

  Why not MSE for classification?
    MSE with sigmoid output → vanishing gradient when ŷ is wrong
    BCE gradient is large exactly when the prediction is very wrong`}</Mx>

      <H3>Categorical Cross-Entropy (CCE)</H3>
      <Mx block>{`  For K-class problem, y is one-hot, ŷ = softmax(z):

  L_CCE = -Σₖ yₖ · log(ŷₖ)
         = -log(ŷ_correct)    (since only the true class term survives)

  Example: 3 classes, true label = class 2
    y = [0, 1, 0]   ŷ = [0.1, 0.7, 0.2]
    L = -(0·log0.1 + 1·log0.7 + 0·log0.2)
      = -log(0.7) = 0.3567

  Combined gradient (softmax + CCE):
    ∂L/∂zₖ = ŷₖ - yₖ    ← same elegant form as BCE!
    → gradient vector = predicted - one_hot_true`}</Mx>

      <H3>Sparse Categorical Cross-Entropy</H3>
      <Mx block>{`  Same as CCE, but accepts INTEGER labels (not one-hot).
  
  CCE     requires: y = [0, 1, 0, 0]   (one-hot)
  Sparse  requires: y = 1              (integer index)

  Loss computation internally:
    L = -log(ŷ[y_int])   — index into ŷ with the true label

  When to use:
  ✓ Many classes (e.g., 1000 classes) → one-hot wastes memory
  ✓ Default in Keras/TF when passing integer labels to fit()

  In Keras:
    model.compile(loss='categorical_crossentropy')         # one-hot labels
    model.compile(loss='sparse_categorical_crossentropy')  # integer labels`}</Mx>

      <H2>When to use which</H2>
      <Table
        heads={["Task", "Loss function", "Output activation", "Label format"]}
        rows={[
          ["Regression (no outliers)", "MSE", "Linear", "Float"],
          ["Regression (with outliers)", "MAE or Huber", "Linear", "Float"],
          ["Binary classification", "Binary Cross-Entropy", "Sigmoid", "{0,1}"],
          ["Multi-class (one-hot)", "Categorical Cross-Entropy", "Softmax", "One-hot vector"],
          ["Multi-class (integer)", "Sparse Categorical CE", "Softmax", "Integer index"],
          ["Multi-label classification", "BCE (per output)", "Sigmoid (each)", "Binary vector"],
          ["Object detection (bbox)", "Huber / Smooth L1", "Linear", "Float coordinates"],
        ]}
      />

      <Code>{`# All major loss functions in Keras/TensorFlow
import tensorflow as tf

# Regression
mse  = tf.keras.losses.MeanSquaredError()
mae  = tf.keras.losses.MeanAbsoluteError()
hub  = tf.keras.losses.Huber(delta=1.0)      # δ is tunable

# Binary classification
bce  = tf.keras.losses.BinaryCrossentropy(from_logits=False)  # sigmoid output
bce_logits = tf.keras.losses.BinaryCrossentropy(from_logits=True)  # raw z — more stable

# Multi-class
cce  = tf.keras.losses.CategoricalCrossentropy()        # one-hot labels
scce = tf.keras.losses.SparseCategoricalCrossentropy()  # integer labels

# Numerical example — BCE
y_true = tf.constant([1.0, 0.0, 1.0])
y_pred = tf.constant([0.9, 0.1, 0.7])
print(f"BCE loss: {bce(y_true, y_pred).numpy():.4f}")
# Manual: -(1·log0.9 + 0·log0.9 + 1·log0.7) / 3 = -(−0.105 + 0 − 0.357)/3 = 0.154

# Numerical example — CCE
y_true_oh = tf.constant([[0,1,0], [1,0,0]], dtype=tf.float32)
y_pred_sm = tf.constant([[0.1,0.7,0.2],[0.8,0.1,0.1]], dtype=tf.float32)
print(f"CCE loss: {cce(y_true_oh, y_pred_sm).numpy():.4f}")
# = (-log(0.7) - log(0.8)) / 2 = (0.3567 + 0.2231)/2 = 0.2899`}</Code>

      <H2>Interview Q&A</H2>
      <QA q="What is the mathematical reason to prefer BCE over MSE for binary classification?"
          a="With a sigmoid output σ(z), MSE loss is L = (y − σ(z))². The gradient ∂L/∂z = −2(y−σ(z))·σ(z)(1−σ(z)). When the prediction is very wrong (e.g. y=1, σ(z)≈0), the term σ(z)(1−σ(z)) ≈ 0 — this is the <em>vanishing gradient</em> problem. Learning stalls exactly when the network is most wrong. With BCE, ∂L/∂z = σ(z) − y, which is large (≈ −1) when σ(z)≈0 and y=1 — the gradient is largest when the prediction is worst. This is why BCE is the principled and practical choice." />
      <QA q="Derive the combined gradient of Categorical Cross-Entropy + Softmax."
          a="L = −Σₖ yₖ log(ŷₖ) where ŷₖ = softmax(z)ₖ = e^{zₖ}/Σⱼe^{zⱼ}. By chain rule: ∂L/∂zₖ = Σⱼ (∂L/∂ŷⱼ)(∂ŷⱼ/∂zₖ). The softmax Jacobian: ∂ŷⱼ/∂zₖ = ŷⱼ(δⱼₖ − ŷₖ). Substituting: ∂L/∂zₖ = −Σⱼ (yⱼ/ŷⱼ)·ŷⱼ(δⱼₖ − ŷₖ) = −Σⱼ yⱼ(δⱼₖ − ŷₖ) = −yₖ + ŷₖΣⱼyⱼ. Since y is one-hot, Σⱼyⱼ=1, giving <strong>∂L/∂zₖ = ŷₖ − yₖ</strong> — the softmax Jacobian complexity completely cancels out." />
      <QA q="What is the difference between from_logits=True and from_logits=False in Keras BCE?"
          a="<code>from_logits=True</code> means the model output is the raw pre-activation z (not passed through sigmoid). Keras then internally computes sigmoid and BCE using the numerically stable formula log(1+e^{−z}) rather than log(σ(z)) — avoiding log(0) errors when σ(z) is very close to 0 or 1. <code>from_logits=False</code> expects probability outputs (already passed through sigmoid). Using from_logits=True is recommended whenever possible for numerical stability." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 2 — BACKPROP PART 1: WHAT
══════════════════════════════════════════════════════ */
function SectionBackpropWhat() {
  const [step, setStep] = useState(0);

  const chainSteps = [
    { title: "Define composition", eq: "L = L(a²),  a² = σ(z²),  z² = W²·a¹ + b²" },
    { title: "∂L/∂z² (output layer δ)", eq: "∂L/∂z² = ∂L/∂a² · ∂a²/∂z²\n       = (a²−y) · σ'(z²)  =  a²−y   [BCE+sigmoid]" },
    { title: "∂L/∂W² (output weights)", eq: "∂L/∂W² = ∂L/∂z² · ∂z²/∂W²\n       = δ² · (a¹)ᵀ" },
    { title: "∂L/∂a¹ (propagate back)", eq: "∂L/∂a¹ = ∂L/∂z² · ∂z²/∂a¹\n       = (W²)ᵀ · δ²" },
    { title: "∂L/∂z¹ (hidden layer δ)", eq: "∂L/∂z¹ = ∂L/∂a¹ ⊙ f'(z¹)\n       = [(W²)ᵀ·δ²] ⊙ σ'(z¹)" },
    { title: "∂L/∂W¹ (hidden weights)", eq: "∂L/∂W¹ = δ¹ · (a⁰)ᵀ = δ¹ · xᵀ" },
  ];

  return (
    <div>
      <P>Backpropagation is the algorithm that computes ∂Loss/∂w for every weight w in the network. It applies the chain rule of calculus layer-by-layer, starting from the output and moving backward.</P>

      <H2>Why 'backward' propagation?</H2>
      <P>The loss depends on the output, which depends on each layer's output, which depends on the weights. To find how loss changes with weight wᵢⱼ, we must traverse this chain of dependencies — in reverse, from output to input.</P>

      <H2>The chain rule — the mathematical engine of backprop</H2>
      <Mx block>{`  Chain rule (single variable):
    If L = f(g(x)),  then  dL/dx = dL/dg · dg/dx

  Chain rule (vectors — partial derivatives):
    If L = f(a),  a = g(z),  z = h(w)
    ∂L/∂w = ∂L/∂a · ∂a/∂z · ∂z/∂w
    
  ↑ This is EXACTLY one forward dependency chain in an ANN.
  Each "·" is a matrix multiply (Jacobian × vector).`}</Mx>

      <H2>Key notation: the error signal δ⁽ˡ⁾</H2>
      <Mx block>{`  δ⁽ˡ⁾ := ∂L/∂z⁽ˡ⁾    (gradient of loss w.r.t. pre-activation)

  This is the "credit" or "error signal" at layer l.
  It is the most important intermediate quantity in backprop.

  Recurrence (the backprop equation):
    δ⁽ˡ⁾ = (W⁽ˡ⁺¹⁾)ᵀ · δ⁽ˡ⁺¹⁾  ⊙  f'(z⁽ˡ⁾)

  Weight gradient (once we have δ⁽ˡ⁾):
    ∂L/∂W⁽ˡ⁾ = δ⁽ˡ⁾ · (a⁽ˡ⁻¹⁾)ᵀ
    ∂L/∂b⁽ˡ⁾ = δ⁽ˡ⁾

  Output layer (special case, BCE + sigmoid):
    δ⁽ᴸ⁾ = ∂L/∂z⁽ᴸ⁾ = a⁽ᴸ⁾ − y`}</Mx>

      <H2>Chain rule traced step-by-step</H2>
      <VizBox>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 12 }}>
          {chainSteps.map((s, i) => (
            <button key={i} onClick={() => setStep(i)} style={{ padding: "4px 10px", fontSize: 11.5, fontWeight: i === step ? 500 : 400, border: `0.5px solid var(--color-border-${i === step ? "info" : "tertiary"})`, borderRadius: "20px", background: i === step ? "var(--color-background-info)" : "transparent", color: i === step ? "var(--color-text-info)" : "var(--color-text-secondary)", cursor: "pointer" }}>
              Step {i + 1}
            </button>
          ))}
        </div>
        <div style={{ background: "var(--color-background-primary)", border: "0.5px solid var(--color-border-info)", borderRadius: "var(--border-radius-md)", padding: "1rem" }}>
          <div style={{ fontWeight: 500, fontSize: 13.5, color: "var(--color-text-info)", marginBottom: 8 }}>{chainSteps[step].title}</div>
          <pre style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--color-text-primary)", whiteSpace: "pre", margin: 0, background: "var(--color-background-secondary)", padding: "0.7rem 1rem", borderRadius: "var(--border-radius-md)", lineHeight: 1.7 }}>{chainSteps[step].eq}</pre>
        </div>
      </VizBox>

      <H2>Four fundamental equations of backpropagation</H2>
      <Mx block>{`  (BP1)  δ⁽ᴸ⁾ = ∇_a L  ⊙  f'(z⁽ᴸ⁾)         output layer error
  (BP2)  δ⁽ˡ⁾ = (W⁽ˡ⁺¹⁾)ᵀ δ⁽ˡ⁺¹⁾  ⊙  f'(z⁽ˡ⁾)  propagate error backward
  (BP3)  ∂L/∂b⁽ˡ⁾ = δ⁽ˡ⁾                       bias gradient
  (BP4)  ∂L/∂W⁽ˡ⁾ = δ⁽ˡ⁾ (a⁽ˡ⁻¹⁾)ᵀ             weight gradient

  These four equations are all you need.
  BP2 is the recurrence — it propagates δ from output back to input.
  BP3 and BP4 give actual gradients for gradient descent.`}</Mx>

      <H2>Computational graph view</H2>
      <Mx block>{`  Forward pass builds a directed graph:
    x → [W¹,b¹] → z¹ → f → a¹ → [W²,b²] → z² → f → a² → L

  Backward pass traverses in REVERSE, computing:
    ← ∂L/∂z¹ ← ∂L/∂a¹ ← ∂L/∂z² ← ∂L/∂a² ← ∂L/∂L=1

  At each node, multiply by the local Jacobian.
  Each weight's gradient is computed once and exactly once.`}</Mx>

      <H2>Interview Q&A</H2>
      <QA q="What is backpropagation and what problem does it solve?"
          a="Backpropagation is an efficient algorithm for computing the gradient of the loss with respect to every weight in the network. Without it, computing ∂L/∂wᵢ for each weight independently would require a separate forward pass — O(|W|) passes for |W| weights. Backprop computes all gradients in O(1) passes (one forward + one backward), both having the same computational cost. It achieves this by recognizing that ∂L/∂wᵢⱼ⁽ˡ⁾ can be factored as δ⁽ˡ⁾·a⁽ˡ⁻¹⁾, where δ⁽ˡ⁾ is computed via a backward recurrence that shares computation across all weights in the same layer." />
      <QA q="Why is the chain rule applicable to neural network gradient computation?"
          a="A neural network is a composition of differentiable functions: L = loss(f_L(f_{L-1}(...f_1(x)))). Since each layer's output is a function of the previous layer's output (and the layer's weights), the loss is a composition of these functions. The chain rule states that the derivative of a composition equals the product of derivatives of each component. Backprop is simply a systematic application of the chain rule, organized to avoid redundant computation by propagating error signals δ backward." />
      <QA q="What does δ⁽ˡ⁾ = ∂L/∂z⁽ˡ⁾ represent intuitively?"
          a="δ⁽ˡ⁾ is the 'error signal' at layer l — it measures how much the loss would change if we directly perturbed the pre-activation z⁽ˡ⁾ at each neuron. A large |δⱼ⁽ˡ⁾| means neuron j in layer l has strong influence on the loss; a near-zero δⱼ⁽ˡ⁾ means it barely affects the loss. The weight gradient ∂L/∂wᵢⱼ⁽ˡ⁾ = δⱼ⁽ˡ⁾ · a_i⁽ˡ⁻¹⁾ combines this error signal with the neuron's input activation — the weight should be updated proportionally to both 'how wrong the neuron is' and 'how strongly it was activated'." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 3 — BACKPROP PART 2: HOW (NUMERICAL)
══════════════════════════════════════════════════════ */
const sig = z => 1 / (1 + Math.exp(-z));
const sigP = z => sig(z) * (1 - sig(z));

function SectionBackpropHow() {
  const [showStep, setShowStep] = useState("fwd");

  const W1 = [[0.1, 0.4], [0.2, 0.3]], b1 = [0.1, 0.2];
  const W2 = [[0.3, 0.2]], b2 = [0.1];
  const x = [0.5, 0.8], y = 1, lr = 0.5;

  const z1 = W1.map((row, i) => row.reduce((s, w, j) => s + w * x[j], b1[i]));
  const a1 = z1.map(sig);
  const z2 = [W2[0].reduce((s, w, j) => s + w * a1[j], b2[0])];
  const a2 = [sig(z2[0])];
  const L = -Math.log(a2[0]);
  const d2 = [a2[0] - y];
  const dW2 = [d2.map((d, i) => [d * a1[0], d * a1[1]])[0]];
  const db2 = d2;
  const da1 = W2[0].map(w => w * d2[0]);
  const d1 = da1.map((d, i) => d * sigP(z1[i]));
  const dW1 = d1.map(di => x.map(xi => di * xi));
  const db1 = d1;
  const W1_new = W1.map((row, i) => row.map((w, j) => w - lr * dW1[i][j]));
  const W2_new = W2.map((row, i) => row.map((w, j) => w - lr * dW2[i][j]));

  const f = n => n.toFixed(5);

  const steps = {
    fwd: {
      label: "Forward pass", color: "info",
      content: (
        <div>
          <P>Given: x=[0.5, 0.8], y=1 (binary label), learning rate η=0.5</P>
          <Mx block>{`  ── Layer 1 (hidden, sigmoid) ─────────────────────────
  z¹₁ = 0.1×0.5 + 0.4×0.8 + 0.1 = ${f(z1[0])}
  z¹₂ = 0.2×0.5 + 0.3×0.8 + 0.2 = ${f(z1[1])}
  
  a¹₁ = σ(${f(z1[0])}) = ${f(a1[0])}
  a¹₂ = σ(${f(z1[1])}) = ${f(a1[1])}

  ── Layer 2 (output, sigmoid) ─────────────────────────
  z²  = 0.3×${f(a1[0])} + 0.2×${f(a1[1])} + 0.1 = ${f(z2[0])}
  
  ŷ = a² = σ(${f(z2[0])}) = ${f(a2[0])}

  ── Loss (BCE, y=1) ───────────────────────────────────
  L = -log(ŷ) = -log(${f(a2[0])}) = ${f(L)}`}</Mx>
        </div>
      ),
    },
    out: {
      label: "Output layer δ", color: "warning",
      content: (
        <div>
          <P>The output layer error signal δ² — elegant because BCE + sigmoid derivatives cancel.</P>
          <Mx block>{`  δ² = ∂L/∂z² = a² - y
     = ${f(a2[0])} - 1
     = ${f(d2[0])}   ← negative because prediction too low

  ∂L/∂W²₁ = δ² · a¹₁ = ${f(d2[0])} × ${f(a1[0])} = ${f(dW2[0][0])}
  ∂L/∂W²₂ = δ² · a¹₂ = ${f(d2[0])} × ${f(a1[1])} = ${f(dW2[0][1])}
  ∂L/∂b²  = δ²        = ${f(db2[0])}`}</Mx>
        </div>
      ),
    },
    prop: {
      label: "Propagate to hidden", color: "warning",
      content: (
        <div>
          <P>Propagate δ² back through W² to get ∂L/∂a¹, then through σ'(z¹) to get δ¹.</P>
          <Mx block>{`  ∂L/∂a¹₁ = W²₁ · δ² = 0.3 × ${f(d2[0])} = ${f(da1[0])}
  ∂L/∂a¹₂ = W²₂ · δ² = 0.2 × ${f(d2[0])} = ${f(da1[1])}

  σ'(z¹₁) = σ(${f(z1[0])})·(1-σ(${f(z1[0])})) = ${f(sigP(z1[0]))}
  σ'(z¹₂) = σ(${f(z1[1])})·(1-σ(${f(z1[1])})) = ${f(sigP(z1[1]))}

  δ¹₁ = ${f(da1[0])} × ${f(sigP(z1[0]))} = ${f(d1[0])}
  δ¹₂ = ${f(da1[1])} × ${f(sigP(z1[1]))} = ${f(d1[1])}`}</Mx>
        </div>
      ),
    },
    wgrad: {
      label: "Hidden layer gradients", color: "success",
      content: (
        <div>
          <Mx block>{`  ∂L/∂W¹₁₁ = δ¹₁ · x₁ = ${f(d1[0])} × 0.5 = ${f(dW1[0][0])}
  ∂L/∂W¹₁₂ = δ¹₁ · x₂ = ${f(d1[0])} × 0.8 = ${f(dW1[0][1])}
  ∂L/∂W¹₂₁ = δ¹₂ · x₁ = ${f(d1[1])} × 0.5 = ${f(dW1[1][0])}
  ∂L/∂W¹₂₂ = δ¹₂ · x₂ = ${f(d1[1])} × 0.8 = ${f(dW1[1][1])}
  ∂L/∂b¹₁  = δ¹₁        = ${f(db1[0])}
  ∂L/∂b¹₂  = δ¹₂        = ${f(db1[1])}`}</Mx>
        </div>
      ),
    },
    update: {
      label: "Weight update", color: "success",
      content: (
        <div>
          <P>Apply gradient descent: w_new = w_old − η · ∂L/∂w, with η = 0.5</P>
          <Mx block>{`  W¹ updates (η=0.5):
  W¹₁₁: ${f(W1[0][0])} - 0.5×${f(dW1[0][0])} = ${f(W1_new[0][0])}
  W¹₁₂: ${f(W1[0][1])} - 0.5×${f(dW1[0][1])} = ${f(W1_new[0][1])}
  W¹₂₁: ${f(W1[1][0])} - 0.5×${f(dW1[1][0])} = ${f(W1_new[1][0])}
  W¹₂₂: ${f(W1[1][1])} - 0.5×${f(dW1[1][1])} = ${f(W1_new[1][1])}

  W² updates:
  W²₁: ${f(W2[0][0])} - 0.5×${f(dW2[0][0])} = ${f(W2_new[0][0])}
  W²₂: ${f(W2[0][1])} - 0.5×${f(dW2[0][1])} = ${f(W2_new[0][1])}`}</Mx>
          <Note color="success" icon="ti-trending-down">New loss after update: run forward pass again with updated weights → loss decreases from {f(L)}.</Note>
        </div>
      ),
    },
  };

  return (
    <div>
      <P>A fully worked numerical example on a 2→2→1 network with all five backpropagation steps computed explicitly.</P>
      <Note color="info" icon="ti-settings">Network: x=[0.5, 0.8], y=1 (true class). W¹=[[0.1,0.4],[0.2,0.3]], b¹=[0.1,0.2]. W²=[[0.3,0.2]], b²=[0.1]. Activation: sigmoid throughout.</Note>

      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", margin: "12px 0" }}>
        {Object.entries(steps).map(([k, v]) => (
          <button key={k} onClick={() => setShowStep(k)} style={{ padding: "6px 14px", fontSize: 12.5, fontWeight: k === showStep ? 500 : 400, border: `0.5px solid var(--color-border-${k === showStep ? v.color : "tertiary"})`, borderRadius: "var(--border-radius-md)", background: k === showStep ? `var(--color-background-${v.color})` : "transparent", color: k === showStep ? `var(--color-text-${v.color})` : "var(--color-text-secondary)", cursor: "pointer" }}>
            {v.label}
          </button>
        ))}
      </div>

      <VizBox>
        {steps[showStep].content}
      </VizBox>

      <H2>Full implementation from scratch (NumPy)</H2>
      <Code>{`import numpy as np

def sigmoid(z):    return 1 / (1 + np.exp(-z))
def sigmoid_p(z):  return sigmoid(z) * (1 - sigmoid(z))  # σ'(z)

class TwoLayerNet:
    def __init__(self, n0, n1, n2):
        # He init for sigmoid layers
        self.W1 = np.random.randn(n1, n0) * np.sqrt(1/n0)
        self.b1 = np.zeros((n1, 1))
        self.W2 = np.random.randn(n2, n1) * np.sqrt(1/n1)
        self.b2 = np.zeros((n2, 1))

    def forward(self, X):
        """X: (n0, m) — m samples"""
        self.a0 = X
        self.z1 = self.W1 @ X   + self.b1   # (n1, m)
        self.a1 = sigmoid(self.z1)           # (n1, m)
        self.z2 = self.W2 @ self.a1 + self.b2  # (n2, m)
        self.a2 = sigmoid(self.z2)           # (n2, m)
        return self.a2

    def compute_loss(self, y):
        """BCE loss. y: (1, m)"""
        m = y.shape[1]
        eps = 1e-15
        return -np.mean(y*np.log(self.a2+eps) + (1-y)*np.log(1-self.a2+eps))

    def backward(self, y, lr=0.01):
        """
        Full backprop using the 4 equations:
          BP1: δ² = a² - y
          BP2: δ¹ = (W²)ᵀ·δ² ⊙ σ'(z¹)
          BP3: ∂L/∂b = δ
          BP4: ∂L/∂W = δ · aᵀ
        """
        m = y.shape[1]

        # ── Output layer ───────────────────────────────
        delta2   = self.a2 - y                     # BP1: (n2, m)
        dW2      = (delta2 @ self.a1.T) / m        # BP4
        db2      = delta2.mean(axis=1, keepdims=True)  # BP3

        # ── Hidden layer ───────────────────────────────
        da1      = self.W2.T @ delta2              # ∂L/∂a¹ = W²ᵀ δ²
        delta1   = da1 * sigmoid_p(self.z1)        # BP2: ⊙ σ'(z¹)
        dW1      = (delta1 @ self.a0.T) / m        # BP4
        db1      = delta1.mean(axis=1, keepdims=True)  # BP3

        # ── Gradient descent update ────────────────────
        self.W2 -= lr * dW2
        self.b2 -= lr * db2
        self.W1 -= lr * dW1
        self.b1 -= lr * db1

        return {"dW1":dW1,"db1":db1,"dW2":dW2,"db2":db2}

# ── Training loop ──────────────────────────────────────
from sklearn.datasets import make_moons
X_raw, y_raw = make_moons(300, noise=0.2, random_state=42)
X = X_raw.T                        # (2, 300) — column-per-sample
y = y_raw.reshape(1, -1)           # (1, 300)

net = TwoLayerNet(n0=2, n1=8, n2=1)
for epoch in range(3000):
    net.forward(X)
    loss = net.compute_loss(y)
    net.backward(y, lr=0.1)
    if epoch % 500 == 0:
        preds = (net.a2 >= 0.5).astype(int)
        acc   = np.mean(preds == y)
        print(f"Epoch {epoch:4d} | Loss: {loss:.4f} | Acc: {acc:.3f}")`}</Code>

      <H2>Interview Q&A</H2>
      <QA q="Walk me through one complete backprop step on a 2-layer network."
          a="(1) Forward pass: z¹=W¹x+b¹, a¹=f(z¹), z²=W²a¹+b², ŷ=a²=f(z²), compute L. (2) Output δ: δ²=a²−y (BCE+sigmoid). (3) Weight gradient at output: ∂L/∂W²=δ²·(a¹)ᵀ, ∂L/∂b²=δ². (4) Propagate back: da¹=(W²)ᵀ·δ², then δ¹=da¹⊙f'(z¹). (5) Hidden weight gradient: ∂L/∂W¹=δ¹·xᵀ, ∂L/∂b¹=δ¹. (6) Update: w←w−η·∂L/∂w. The key insight is that δ is computed once per layer and reused for both weight and bias gradients." />
      <QA q="What is the time complexity of one backpropagation pass and how does it compare to numerical differentiation?"
          a="One backprop pass costs O(|W|) — proportional to the total number of weights, same as one forward pass. Numerical differentiation (finite differences: ∂L/∂w ≈ (L(w+ε)−L(w))/ε) requires one forward pass per weight — O(|W|²) total. For a modern network with 10M parameters, backprop costs ~10M FLOPs while numerical differentiation costs ~100T FLOPs. This 10,000× efficiency is why backprop made deep learning practically trainable." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 4 — BACKPROP PART 3: WHY (INTUITION)
══════════════════════════════════════════════════════ */
function SectionBackpropWhy() {
  const canvasRef = useRef(null);
  const [lr, setLr] = useState(0.15);
  const [steps, setSteps] = useState([]);
  const [running, setRunning] = useState(false);

  const lossLandscape = useCallback((w1, w2) => {
    // Bowl with a slight asymmetry and local roughness
    return 0.5*(w1-1)**2 + 1.2*(w2+0.5)**2 + 0.3*Math.sin(3*w1)*Math.cos(2*w2)*0.3;
  }, []);

  const gradient = useCallback((w1, w2) => {
    const eps = 1e-5;
    const dw1 = (lossLandscape(w1+eps,w2) - lossLandscape(w1-eps,w2))/(2*eps);
    const dw2 = (lossLandscape(w1,w2+eps) - lossLandscape(w1,w2-eps))/(2*eps);
    return [dw1, dw2];
  }, [lossLandscape]);

  useEffect(() => {
    const cv = canvasRef.current; if (!cv) return;
    const ctx = cv.getContext("2d");
    const W = cv.width, H = cv.height;
    ctx.clearRect(0, 0, W, H);

    const range = 3.5;
    const toX = w => (w + range) / (2*range) * W;
    const toY = w => H - (w + range) / (2*range) * H;

    // Draw contours
    const res = 60;
    for (let i = 0; i < res; i++) {
      for (let j = 0; j < res; j++) {
        const w1 = -range + (i / res) * 2*range;
        const w2 = -range + (j / res) * 2*range;
        const L = lossLandscape(w1, w2);
        const intensity = Math.max(0, Math.min(1, 1 - L / 5));
        const r = Math.round(30 + (1-intensity)*170);
        const g = Math.round(50 + intensity*120);
        const b = Math.round(80 + intensity*140);
        ctx.fillStyle = `rgba(${r},${g},${b},0.85)`;
        ctx.fillRect(toX(w1), toY(w2+0.12), W/res+1, H/res+1);
      }
    }

    // Minimum marker
    ctx.beginPath();
    ctx.arc(toX(1), toY(-0.5), 6, 0, Math.PI*2);
    ctx.fillStyle = "#FFD700";
    ctx.fill();
    ctx.strokeStyle = "#000"; ctx.lineWidth = 1.5; ctx.stroke();
    ctx.fillStyle = "#FFD700"; ctx.font = "11px var(--font-sans)";
    ctx.fillText("minimum", toX(1)+8, toY(-0.5)+4);

    // Draw gradient descent path
    if (steps.length > 1) {
      ctx.beginPath();
      ctx.strokeStyle = "#FFFFFF"; ctx.lineWidth = 2;
      steps.forEach(([w1,w2], i) => {
        const x = toX(w1), y = toY(w2);
        i === 0 ? ctx.moveTo(x,y) : ctx.lineTo(x,y);
      });
      ctx.stroke();
      steps.forEach(([w1,w2], i) => {
        ctx.beginPath();
        ctx.arc(toX(w1), toY(w2), i===0?7:4, 0, Math.PI*2);
        ctx.fillStyle = i === 0 ? "#FF6B6B" : `rgba(255,255,255,${0.5+0.5*i/steps.length})`;
        ctx.fill();
      });
    }

    // Axis labels
    ctx.fillStyle = "rgba(255,255,255,0.7)"; ctx.font = "11px var(--font-sans)";
    ctx.fillText("w₁ →", W-40, H/2);
    ctx.save(); ctx.translate(12, H/2); ctx.rotate(-Math.PI/2);
    ctx.fillText("w₂ →", 0, 0); ctx.restore();
  }, [steps, lossLandscape]);

  const runGD = () => {
    let w1 = -2.5, w2 = 2.5;
    const path = [[w1, w2]];
    for (let i = 0; i < 40; i++) {
      const [g1, g2] = gradient(w1, w2);
      w1 -= lr * g1;  w2 -= lr * g2;
      path.push([w1, w2]);
      if (Math.abs(g1) < 1e-4 && Math.abs(g2) < 1e-4) break;
    }
    setSteps(path);
  };

  const resetGD = () => setSteps([]);

  return (
    <div>
      <P>The WHY behind backpropagation: understanding gradients geometrically, learning rate effects, convergence, and the loss landscape.</P>

      <H2>The gradient — direction of steepest ascent</H2>
      <Mx block>{`  For loss L(w₁, w₂, ..., wₙ):

  ∇L = [∂L/∂w₁,  ∂L/∂w₂,  ...,  ∂L/∂wₙ]ᵀ

  The gradient vector points in the direction of STEEPEST INCREASE.
  Gradient descent moves in the OPPOSITE direction:

  w ← w - η · ∇L

  Analogy: you're blindfolded on a hilly landscape.
  The gradient tells you which direction is uphill.
  Gradient descent always steps downhill.`}</Mx>

      <H2>Interactive: gradient descent on a 2D loss landscape</H2>
      <VizBox>
        <canvas ref={canvasRef} width={440} height={300} style={{ display: "block", margin: "0 auto", borderRadius: "var(--border-radius-md)", maxWidth: "100%" }} />
        <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 10, flexWrap: "wrap", alignItems: "center", fontSize: 13 }}>
          <span style={{ color: "var(--color-text-secondary)" }}>η (learning rate)</span>
          <input type="range" min={0.02} max={0.8} step={0.01} value={lr} onChange={e => { setLr(+e.target.value); resetGD(); }} style={{ width: 120 }} />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, minWidth: 36 }}>{lr.toFixed(2)}</span>
          <button onClick={runGD} style={{ padding: "5px 14px", background: "var(--color-background-info)", border: "0.5px solid var(--color-border-info)", color: "var(--color-text-info)", borderRadius: "var(--border-radius-md)", cursor: "pointer", fontSize: 12.5, fontWeight: 500 }}>
            Run GD from (-2.5, 2.5)
          </button>
          <button onClick={resetGD} style={{ padding: "5px 10px", border: "0.5px solid var(--color-border-tertiary)", background: "transparent", color: "var(--color-text-secondary)", borderRadius: "var(--border-radius-md)", cursor: "pointer", fontSize: 12.5 }}>Reset</button>
        </div>
        {steps.length > 0 && (
          <div style={{ textAlign: "center", marginTop: 6, fontSize: 12, color: "var(--color-text-secondary)", fontFamily: "var(--font-mono)" }}>
            Steps: {steps.length - 1} | Final loss: {lossLandscape(...steps[steps.length-1]).toFixed(5)} | w = [{steps[steps.length-1].map(v=>v.toFixed(3)).join(", ")}]
          </div>
        )}
      </VizBox>

      <H2>Learning rate effects</H2>
      <Grid cols={3}>
        {[
          { label: "η too small", color: "warning", items: ["Slow convergence (many steps)", "Safe, stable updates", "Gets stuck in shallow local minima", "Computationally expensive", "Typical: 1e-5 or lower"] },
          { label: "η just right", color: "success", items: ["Fast, stable convergence", "Reaches good minimum", "Loss decreases smoothly", "Typical: 1e-3 for Adam", "Found via LR search or schedule"] },
          { label: "η too large", color: "danger", items: ["Oscillates / diverges", "Overshoots the minimum", "Loss may increase!", "Common: loss goes to NaN", "Typical: > 0.1 for most tasks"] },
        ].map(({ label, color, items }) => (
          <Card key={label} color={color} title={label}>
            {items.map(i => <div key={i} style={{ marginBottom: 4 }}>• {i}</div>)}
          </Card>
        ))}
      </Grid>

      <H2>Gradient, derivative, and the loss landscape</H2>
      <Mx block>{`  Derivative (1D intuition):
    f'(w) > 0  →  increase w increases loss  →  decrease w
    f'(w) < 0  →  increase w decreases loss  →  increase w
    f'(w) = 0  →  stationary point (minimum, maximum, or saddle)

  Types of stationary points in high-D loss landscapes:
    Global minimum: lowest loss achievable
    Local minimum:  lower than neighbors, but not globally lowest
    Saddle point:   min in some dimensions, max in others
    
  Key insight (Dauphin et al., 2014):
    In high-dimensional spaces, saddle points are FAR more
    common than local minima. Saddle points have zero gradient
    but SGD noise helps escape them.`}</Mx>

      <H2>Convergence criteria</H2>
      <Mx block>{`  Gradient descent converges when:
    ‖∇L‖ < ε    (gradient magnitude below threshold)
    |Lₜ₊₁ - Lₜ| < ε  (loss change below threshold)
    t > T_max   (maximum steps reached)

  Convergence is GUARANTEED for:
  ✓ Convex loss landscapes (e.g., logistic regression)
  ✓ Appropriate learning rate (η ≤ 1/L where L = Lipschitz constant)
  
  NOT guaranteed for:
  ✗ Non-convex landscapes (all deep networks!)
  — but empirically still finds good solutions`}</Mx>

      <H2>Learning rate scheduling</H2>
      <Code>{`import tensorflow as tf

# 1. Step decay: reduce LR by factor every N epochs
lr_schedule = tf.keras.optimizers.schedules.ExponentialDecay(
    initial_learning_rate=1e-3,
    decay_steps=1000,
    decay_rate=0.9
)

# 2. Cosine annealing: smooth decay with warm restarts
cosine_lr = tf.keras.optimizers.schedules.CosineDecay(
    initial_learning_rate=1e-3,
    decay_steps=10000,
    alpha=1e-6   # minimum LR
)

# 3. Warm-up + decay (common in Transformers)
class WarmupSchedule(tf.keras.optimizers.schedules.LearningRateSchedule):
    def __init__(self, d_model, warmup_steps=4000):
        self.d_model = tf.cast(d_model, tf.float32)
        self.warmup_steps = warmup_steps
    def __call__(self, step):
        step = tf.cast(step, tf.float32)
        arg1 = tf.math.rsqrt(step)
        arg2 = step * (self.warmup_steps ** -1.5)
        return tf.math.rsqrt(self.d_model) * tf.math.minimum(arg1, arg2)

# 4. ReduceLROnPlateau (adaptive)
cb = tf.keras.callbacks.ReduceLROnPlateau(
    monitor='val_loss', factor=0.5, patience=5, min_lr=1e-7
)`}</Code>

      <H2>Interview Q&A</H2>
      <QA q="What is a gradient and why does gradient descent minimize the loss?"
          a="The gradient ∇L(w) is a vector where each component ∂L/∂wᵢ gives the rate of change of the loss with respect to wᵢ. Mathematically, the gradient points in the direction of steepest increase of the function at the current point. By updating w ← w − η∇L (moving opposite to the gradient), we move in the direction of steepest decrease. For a differentiable loss function, taking small enough steps in this direction is guaranteed to decrease the loss. With a convex loss, this reaches the global minimum; with non-convex losses (all deep networks), it finds a good local minimum or saddle-point neighborhood." />
      <QA q="Why does a high learning rate cause divergence rather than oscillation?"
          a="If η is too large, the step size overshoots the minimum — we jump past it to the other side of the loss curve. Since the landscape is often curved (second derivative > 0 near a minimum), the overshoot lands at an even steeper region, causing the next step to be even larger. This compounding effect causes exponentially growing oscillations, which appears in practice as loss going to NaN. The condition for convergence in gradient descent is η < 2/λ_max where λ_max is the largest eigenvalue of the Hessian (curvature matrix) — too large an η violates this." />
      <QA q="Why doesn't the non-convexity of deep learning loss landscapes prevent good training?"
          a="Several empirical and theoretical reasons: (1) In high dimensions (millions of weights), almost all critical points are saddle points rather than poor local minima — SGD noise helps escape saddle points. (2) Most local minima in overparameterized networks have similar loss values (Choromanska et al., 2015) — the landscape has many good solutions. (3) SGD's inherent noise from mini-batches prevents getting trapped in sharp minima, often converging to flat minima that generalize better. (4) Modern optimizers (Adam, momentum) navigate non-convex landscapes more effectively than vanilla GD." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 5 — MEMOIZATION
══════════════════════════════════════════════════════ */
function SectionMemo() {
  const [fibN, setFibN] = useState(8);

  const fibNaive = (n) => {
    let calls = 0;
    const fib = (k) => { calls++; return k <= 1 ? k : fib(k-1) + fib(k-2); };
    return { result: fib(n), calls };
  };

  const fibMemo = (n) => {
    const cache = {}; let calls = 0;
    const fib = (k) => { calls++; if (k in cache) return cache[k]; cache[k] = k <= 1 ? k : fib(k-1) + fib(k-2); return cache[k]; };
    return { result: fib(n), calls };
  };

  const naive = fibNaive(fibN);
  const memo  = fibMemo(fibN);

  return (
    <div>
      <P>Memoization is the practice of caching the results of expensive function calls. In backpropagation, it is what makes the algorithm O(L) rather than O(2^L) — the key insight that makes deep network training tractable.</P>

      <H2>What is memoization?</H2>
      <Note color="info" icon="ti-database">
        <strong>Memoization</strong> = store the result of a computation the first time it's computed, then look it up on subsequent requests instead of recomputing. It trades memory for speed.
      </Note>
      <Mx block>{`  Without memoization:
    compute(n) = compute(n-1) + compute(n-2)   → tree of calls → O(2ⁿ)

  With memoization:
    if n in cache: return cache[n]
    else: cache[n] = compute(n-1) + compute(n-2)  → O(n)

  Same result. Drastically different cost.`}</Mx>

      <H2>Fibonacci: a perfect analogy for backprop caching</H2>
      <VizBox>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12, flexWrap: "wrap", fontSize: 13 }}>
          <span style={{ color: "var(--color-text-secondary)" }}>Compute Fib(n) where n =</span>
          <input type="range" min={3} max={20} value={fibN} onChange={e => setFibN(+e.target.value)} style={{ width: 120 }} />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 12 }}>{fibN}</span>
        </div>
        <Grid cols={2}>
          <div style={{ background: "var(--color-background-danger)", border: "0.5px solid var(--color-border-danger)", borderRadius: "var(--border-radius-md)", padding: "12px 14px" }}>
            <div style={{ fontWeight: 500, fontSize: 12.5, color: "var(--color-text-danger)", marginBottom: 8 }}>Without memoization</div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--color-text-danger)" }}>
              <div>Result: {naive.result}</div>
              <div>Function calls: <strong>{naive.calls.toLocaleString()}</strong></div>
              <div>Complexity: O(2ⁿ) = O({Math.round(2**fibN).toLocaleString()})</div>
            </div>
          </div>
          <div style={{ background: "var(--color-background-success)", border: "0.5px solid var(--color-border-success)", borderRadius: "var(--border-radius-md)", padding: "12px 14px" }}>
            <div style={{ fontWeight: 500, fontSize: 12.5, color: "var(--color-text-success)", marginBottom: 8 }}>With memoization</div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--color-text-success)" }}>
              <div>Result: {memo.result}</div>
              <div>Function calls: <strong>{memo.calls}</strong></div>
              <div>Complexity: O(n) = O({fibN})</div>
            </div>
          </div>
        </Grid>
      </VizBox>

      <H2>How memoization applies in backpropagation</H2>
      <Mx block>{`  Without memoization — naive repeated differentiation:

  ∂L/∂W¹₁₁  needs  ∂L/∂z¹₁  which needs  ∂L/∂a¹₁  which needs  ∂L/∂z²...
  ∂L/∂W¹₁₂  needs  ∂L/∂z¹₁  (SAME!)  → recomputed!
  ∂L/∂W¹₂₁  needs  ∂L/∂z¹₂  (also needs ∂L/∂z²!)  → recomputed!
  
  For a layer with n neurons, ∂L/∂z⁽ˡ⁾ is recomputed n times.
  For L layers with average width n: O(n × 2^L) total operations.

  With memoization (what backprop actually does):

  Compute δ⁽ˡ⁾ = ∂L/∂z⁽ˡ⁾ ONCE for each layer l.
  Store it (this is exactly self.cache in our implementation!).
  Reuse it for ALL weight gradients ∂L/∂W⁽ˡ⁾_{jk} = δ⁽ˡ⁾_j · a⁽ˡ⁻¹⁾_k.
  
  Total: one δ computation per layer → O(L) passes.`}</Mx>

      <H2>The cache in backpropagation is memoization</H2>
      <Code>{`# Every time you do this in forward pass:
self.cache[l] = (Z_l, A_l)   # ← THIS IS MEMOIZATION

# You are pre-computing and storing:
#   Z_l = W_l @ A_{l-1} + b_l     (pre-activation)
#   A_l = activation(Z_l)          (post-activation)

# And in backward pass, you retrieve them:
Z_l, A_l = self.cache[l]      # ← CACHE HIT (no recomputation!)
delta_l = delta_next * activation_prime(Z_l)  # uses cached Z_l

# Without this cache, you would need to:
#   1. Rerun the forward pass for each layer's gradient (O(L²))
#   2. Or symbolically expand the full expression (exponential)

# PyTorch's autograd does this automatically:
# Every .backward() call uses the computation graph built during
# forward pass — each node stores its inputs for the backward step.

import torch
w = torch.tensor(2.0, requires_grad=True)
x = torch.tensor(3.0)
z = w * x          # PyTorch stores (w, x) at this node
a = torch.sigmoid(z)  # stores z at this node
L = -torch.log(a)

L.backward()       # traverses stored graph backward
print(w.grad)      # ∂L/∂w = (σ(z)-1)·x = (σ(6)-1)·3 ≈ -0.0074`}</Code>

      <H2>Multi-layer backprop: the dependency chain</H2>
      <Mx block>{`  Without memoization: to compute ∂L/∂W⁽¹⁾, expand fully:
  
  ∂L/∂W⁽¹⁾ = ∂L/∂a⁽ᴸ⁾ · ∂a⁽ᴸ⁾/∂z⁽ᴸ⁾ · ∂z⁽ᴸ⁾/∂a⁽ᴸ⁻¹⁾ · ... · ∂z⁽¹⁾/∂W⁽¹⁾
  
  Every weight layer shares the SAME prefix of this chain:
    δ⁽ᴸ⁾, δ⁽ᴸ⁻¹⁾, ..., δ⁽²⁾ are the same for ALL weights in layer 1.
  
  With memoization: compute δ⁽ˡ⁾ once per layer, reuse everywhere.
  
  Time complexity comparison (L layers, n neurons, m samples):
    Naive:       O(m · n² · 2^L)    — exponential in depth!
    Backprop:    O(m · n² · L)      — LINEAR in depth ← the magic`}</Mx>

      <H2>Interview Q&A</H2>
      <QA q="What is memoization and why is it essential to backpropagation?"
          a="Memoization is caching the result of a computation on first evaluation, then returning the cached value on future requests instead of recomputing. In backpropagation, the gradient ∂L/∂W⁽ˡ⁾ requires δ⁽ˡ⁾ = ∂L/∂z⁽ˡ⁾ for every weight in layer l. Without memoization, δ⁽ˡ⁾ would be recomputed for each weight separately — O(n) times per layer. By computing and caching δ⁽ˡ⁾ once per layer (which itself requires δ⁽ˡ⁺¹⁾ — already cached from the previous backward step), we reduce the total computation from exponential to linear in depth." />
      <QA q="How does PyTorch's autograd relate to memoization?"
          a="PyTorch's autograd builds a dynamic computation graph during the forward pass. Each node in the graph stores its inputs (the intermediate tensors) — this is explicit memoization. When .backward() is called, autograd traverses this graph in reverse topological order, computing gradients using stored intermediate values rather than re-running the forward pass. The requires_grad and grad_fn attributes track which tensors need gradients and which function created them. torch.no_grad() disables this storage, saving memory when gradients aren't needed (inference)." />
      <QA q="What is the connection between memoization in backprop and dynamic programming?"
          a="Backpropagation is a specific instance of the dynamic programming (DP) paradigm. DP solves problems by breaking them into overlapping subproblems and storing solutions. In backprop: the 'subproblems' are computing δ⁽ˡ⁾ for each layer; they 'overlap' because every weight in layer l shares the same δ⁽ˡ⁾; and memoization stores each δ⁽ˡ⁾ so it's computed once. The backward recurrence δ⁽ˡ⁾ = (W⁽ˡ⁺¹⁾)ᵀδ⁽ˡ⁺¹⁾⊙f'(z⁽ˡ⁾) is exactly the DP recurrence relation. This is why backpropagation is sometimes called 'reverse-mode automatic differentiation' — it's DP applied to the chain rule." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   ROOT
══════════════════════════════════════════════════════ */
const TABS = [
  { id: "loss",  label: "Loss Functions" },
  { id: "bp1",   label: "Backprop: What" },
  { id: "bp2",   label: "Backprop: How" },
  { id: "bp3",   label: "Backprop: Why" },
  { id: "memo",  label: "Memoization" },
];

export default function Training() {
  const [active, setActive] = useState("loss");
  const map = { loss: <SectionLoss />, bp1: <SectionBackpropWhat />, bp2: <SectionBackpropHow />, bp3: <SectionBackpropWhy />, memo: <SectionMemo /> };

  return (
    <div>
      <div className="page-header">
        <div className="page-header-eyebrow">Deep Learning — Module 05</div>
        <h1 className="page-header-title">Loss Functions · Backpropagation · Memoization</h1>
        <p className="page-header-subtitle">Full mathematical derivations · Numerical traced examples · Interactive gradient descent · Memoization complexity analysis</p>
      </div>

      <SectionNav tabs={TABS} active={active} onChange={setActive} />

      <div style={{ padding: "0.5rem 0 2rem" }}>
        {map[active]}
      </div>

      <NavButtons moduleId={5} />
    </div>
  );
}
