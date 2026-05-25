import { useState, useEffect, useRef } from "react";
import { Code } from '../components/ui/Code.jsx';
import { Mx, H2, H3, P } from '../components/ui/Typography.jsx';
import { QA } from '../components/ui/QA.jsx';
import { Note, Grid, Card, Table, VizBox } from '../components/ui/Primitives.jsx';
import NavButtons from '../components/layout/NavButtons.jsx';
import SectionNav from '../components/layout/SectionNav.jsx';

/* ══════════════════════════════════════════════════════
   SECTION 1 — What is a Perceptron
══════════════════════════════════════════════════════ */
const SectionWhat = () => {
  /* Interactive demo: drag weights and see decision boundary */
  const canvasRef = useRef(null);
  const [w1, setW1] = useState(1.0);
  const [w2, setW2] = useState(1.0);
  const [bias, setBias] = useState(0.0);

  const points = [
    { x: 1.5, y: 2.0, label: 1 }, { x: 2.0, y: 2.5, label: 1 },
    { x: 0.5, y: 3.0, label: 1 }, { x: 1.0, y: 1.5, label: 1 },
    { x: -1.5, y: -1.0, label: -1 }, { x: -2.0, y: -2.0, label: -1 },
    { x: -0.5, y: -2.5, label: -1 }, { x: -1.0, y: -1.5, label: -1 },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width, H = canvas.height;
    const cx = W / 2, cy = H / 2, scale = 40;

    const toCanvas = (x, y) => [cx + x * scale, cy - y * scale];

    ctx.clearRect(0, 0, W, H);

    // Grid
    ctx.strokeStyle = "rgba(128,128,128,0.12)";
    ctx.lineWidth = 0.5;
    for (let i = -5; i <= 5; i++) {
      ctx.beginPath(); ctx.moveTo(cx + i * scale, 0); ctx.lineTo(cx + i * scale, H); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, cy - i * scale); ctx.lineTo(W, cy - i * scale); ctx.stroke();
    }

    // Axes
    ctx.strokeStyle = "rgba(128,128,128,0.4)";
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(0, cy); ctx.lineTo(W, cy); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx, 0); ctx.lineTo(cx, H); ctx.stroke();

    // Decision boundary: w1*x1 + w2*x2 + b = 0  =>  x2 = -(w1*x1 + b) / w2
    ctx.strokeStyle = "#378ADD";
    ctx.lineWidth = 2;
    ctx.beginPath();
    if (Math.abs(w2) > 0.01) {
      const x1L = -5, x2L = -(w1 * x1L + bias) / w2;
      const x1R = 5, x2R = -(w1 * x1R + bias) / w2;
      const [lx, ly] = toCanvas(x1L, x2L);
      const [rx, ry] = toCanvas(x1R, x2R);
      ctx.moveTo(lx, ly); ctx.lineTo(rx, ry);
    } else {
      const xV = -bias / (w1 || 0.001);
      const [vx] = toCanvas(xV, 0);
      ctx.moveTo(vx, 0); ctx.lineTo(vx, H);
    }
    ctx.stroke();

    // Normal vector (weights direction)
    ctx.strokeStyle = "#EF9F27";
    ctx.lineWidth = 2;
    const norm = Math.sqrt(w1 * w1 + w2 * w2) || 1;
    const [nx, ny] = toCanvas(0, 0);
    const [ex, ey] = toCanvas(w1 / norm * 1.5, w2 / norm * 1.5);
    ctx.beginPath(); ctx.moveTo(nx, ny); ctx.lineTo(ex, ey); ctx.stroke();
    ctx.fillStyle = "#EF9F27";
    ctx.font = "11px var(--font-sans)"; ctx.fillText("w", ex + 5, ey - 5);

    // Points
    points.forEach(({ x, y, label }) => {
      const score = w1 * x + w2 * y + bias;
      const predicted = score >= 0 ? 1 : -1;
      const correct = predicted === label;
      const [px, py] = toCanvas(x, y);
      ctx.beginPath();
      ctx.arc(px, py, 7, 0, Math.PI * 2);
      ctx.fillStyle = label === 1
        ? (correct ? "#1D9E75" : "#E24B4A")
        : (correct ? "#378ADD" : "#E24B4A");
      ctx.fill();
      ctx.strokeStyle = correct ? "transparent" : "#E24B4A";
      ctx.lineWidth = correct ? 0 : 2.5;
      if (!correct) ctx.stroke();
    });

    // Legend
    ctx.fillStyle = "#378ADD"; ctx.font = "12px var(--font-sans)";
    ctx.fillText("— decision boundary", 8, 16);
    ctx.fillStyle = "#EF9F27"; ctx.fillText("→ weight vector", 8, 32);
  }, [w1, w2, bias]);

  const correct = points.filter(({ x, y, label }) => (w1 * x + w2 * y + bias >= 0 ? 1 : -1) === label).length;

  return (
    <div>
      <p className="p">A <strong>perceptron</strong> is the simplest neural network: a single artificial neuron that computes a <em>linear</em> combination of its inputs and emits a binary decision via a step function.</p>

      <H2>Formal definition</H2>
      <Mx block>{`  Given inputs x = [x₁, x₂, ..., xₙ]ᵀ, weights w, bias b:

  z  =  w · x + b  =  Σᵢ wᵢxᵢ + b          (net input)

        ⎧ +1   if z ≥ 0
  ŷ  =  ⎨                                    (step function)
        ⎩ -1   if z < 0

  Decision boundary:  w · x + b = 0          (hyperplane in ℝⁿ)`}</Mx>

      <H2>Neuron vs. Perceptron</H2>
      <Table
        heads={["Dimension", "Biological Neuron", "Perceptron"]}
        rows={[
          ["Input signal", "Dendrites (electrochemical)", "Feature values x₁…xₙ"],
          ["Weighting", "Synaptic strength", "Learnable weights wᵢ"],
          ["Integration", "Soma (cell body summation)", "Σ wᵢxᵢ + b"],
          ["Threshold", "Action potential threshold", "Step function at z = 0"],
          ["Output", "Spike / no spike (binary)", "+1 / −1 (binary)"],
          ["Learning", "Hebbian / synaptic plasticity", "Perceptron update rule"],
          ["Key difference", "Graded, analog, stochastic", "Deterministic, discrete"],
        ]}
      />

      <H2>Geometric intuition — interactive</H2>
      <P c="The weight vector <Mx>w</Mx> is always perpendicular to the decision boundary. Points on the <Mx>w</Mx> side get +1; the other side gets −1. Adjust the sliders to rotate and translate the boundary." />

      <VizBox>
        <canvas ref={canvasRef} width={400} height={320} style={{ display: "block", margin: "0 auto", borderRadius: "var(--border-radius-md)" }} />

        <div style={{ display: "grid", gridTemplateColumns: "80px 1fr 48px", alignItems: "center", gap: 8, marginTop: 12, fontSize: 13 }}>
          {[
            { label: "w₁", val: w1, set: setW1 },
            { label: "w₂", val: w2, set: setW2 },
            { label: "bias b", val: bias, set: setBias },
          ].map(({ label, val, set }) => (
            <div key={label} style={{ display: "contents" }}>
              <span style={{ color: "var(--color-text-secondary)" }}>{label}</span>
              <input type="range" min="-3" max="3" step="0.1" value={val} onChange={e => set(+e.target.value)} style={{ width: "100%" }} />
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, textAlign: "right", color: "var(--color-text-primary)" }}>{val.toFixed(1)}</span>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 10, fontSize: 13, display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <span style={{ color: "#1D9E75" }}>● class +1</span>
          <span style={{ color: "#378ADD" }}>● class −1</span>
          <span style={{ color: "#E24B4A" }}>● misclassified</span>
          <span style={{ fontWeight: 500, color: "var(--color-text-primary)" }}>Accuracy: {correct}/8</span>
        </div>
      </VizBox>

      <H3>Key geometric facts</H3>
      <Mx block>{`  1. The boundary w·x + b = 0 is an (n-1)-dimensional hyperplane.
     In 2D: a line. In 3D: a plane.

  2. The signed distance from point x to the boundary:
        d(x) = (w·x + b) / ‖w‖
     Positive = same side as w (class +1)
     Negative = opposite side (class -1)

  3. Scaling w and b by any positive constant λ:
     — does NOT change the boundary (same hyperplane)
     — DOES change the margin (distance to nearest point)

  4. The bias b shifts the boundary parallel to itself.
     Without b: boundary always passes through origin.`}</Mx>

      <H2>Understanding weights</H2>
      <p className="p">Each weight <code className="math-inline">wᵢ</code> measures the <em>contribution</em> (and direction of influence) of feature <code className="math-inline">xᵢ</code> on the output:</p>
      <Note color="info" icon="ti-bulb">
        Large positive <strong>wᵢ</strong> → feature xᵢ strongly pushes toward class +1. Large negative wᵢ → strongly pushes toward class −1. Near-zero wᵢ → feature is irrelevant to the decision.
      </Note>

      <H2>Code: Perceptron from scratch</H2>
      <Code>{`import numpy as np

class Perceptron:
    """
    Binary perceptron with step-function output.
    Labels must be +1 / -1.
    """
    def __init__(self, lr=0.1, n_iter=100):
        self.lr = lr
        self.n_iter = n_iter

    def fit(self, X, y):
        n_samples, n_features = X.shape
        self.w = np.zeros(n_features)   # weight vector
        self.b = 0.0                    # bias
        self.errors_ = []

        for _ in range(self.n_iter):
            errors = 0
            for xi, yi in zip(X, y):
                pred = self.predict_single(xi)
                if pred != yi:                  # misclassified
                    self.w += self.lr * yi * xi  # rotate boundary toward xi
                    self.b += self.lr * yi        # translate boundary
                    errors += 1
            self.errors_.append(errors)
            if errors == 0:                     # converged
                break
        return self

    def net_input(self, X):
        return X @ self.w + self.b              # z = w·x + b

    def predict_single(self, x):
        return 1 if self.net_input(x) >= 0 else -1

    def predict(self, X):
        return np.where(self.net_input(X) >= 0, 1, -1)

    def score(self, X, y):
        return np.mean(self.predict(X) == y)

# ─── Usage ───────────────────────────────────────────────
from sklearn.datasets import make_blobs
X, y = make_blobs(n_samples=200, centers=2, random_state=42)
y = np.where(y == 0, -1, 1)    # convert to ±1

p = Perceptron(lr=0.1, n_iter=100)
p.fit(X, y)
print(f"Accuracy: {p.score(X, y):.2%}")
print(f"Weights: {p.w}, Bias: {p.b:.3f}")`}</Code>

      <H2>Interview Q&A</H2>
      <QA q="What is the mathematical difference between a perceptron and a logistic regression neuron?"
          a="Both compute z = w·x + b (linear combination), but differ in the output function. A perceptron applies the Heaviside step function: ŷ = sign(z), producing a hard binary output (+1/−1). Logistic regression applies the sigmoid: ŷ = σ(z) = 1/(1+e^{−z}), producing a probability in (0,1). Logistic regression is differentiable everywhere, enabling gradient-based optimization; the perceptron step function has zero gradient almost everywhere, requiring the special perceptron update rule." />
      <QA q="Why is the bias term necessary? What happens without it?"
          a="Without bias, the decision boundary z = w·x = 0 must always pass through the origin. This means the model cannot separate classes whose boundary doesn't intersect the origin — e.g., AND gate labels (0,0)→0, (0,1)→0, (1,0)→0, (1,1)→1 requires a boundary that doesn't pass through origin. The bias b acts as a learnable threshold, giving the boundary translational freedom." />
      <QA q="What does the weight vector w represent geometrically?"
          a="w is the normal vector to the decision hyperplane — it points perpendicularly away from the boundary into the positive class region. The magnitude ‖w‖ is inversely related to the margin (distance from boundary to nearest point). The signed distance from any point x to the boundary is (w·x + b)/‖w‖, which is exactly the net input z normalized by weight magnitude." />
    </div>
  );
};

/* ══════════════════════════════════════════════════════
   SECTION 2 — Perceptron Trick
══════════════════════════════════════════════════════ */
const SectionTrick = () => {
  const [step, setStep] = useState(0);
  const steps = [
    { title: "Initialize", desc: "Set w = 0, b = 0 (or small random values). Pick a learning rate η.", color: "info" },
    { title: "Pick misclassified point", desc: "Find any point xᵢ where ŷᵢ ≠ yᵢ (i.e., sign(w·xᵢ + b) ≠ yᵢ).", color: "warning" },
    { title: "Apply the update", desc: "w ← w + η·yᵢ·xᵢ     b ← b + η·yᵢ\nThis rotates the boundary toward the misclassified point.", color: "success" },
    { title: "Repeat", desc: "Cycle through all points. If no misclassification, stop. Otherwise, go to step 2.", color: "info" },
    { title: "Convergence", desc: "If data is linearly separable, the algorithm is guaranteed to converge in a finite number of steps (Perceptron Convergence Theorem).", color: "success" },
  ];

  return (
    <div>
      <P>The perceptron learning algorithm works by iteratively nudging the decision boundary toward each misclassified point until all points are correctly classified — or until a stopping criterion is met.</P>

      <H2>The update rule derived</H2>
      <P c="Suppose point <Mx>(xᵢ, yᵢ)</Mx> is misclassified: <Mx>sign(w·xᵢ + b) ≠ yᵢ</Mx>." />
      <P c="We want to move the boundary so that <Mx>w·xᵢ + b</Mx> becomes more positive (if yᵢ = +1) or more negative (if yᵢ = −1). The update:" />
      <Mx block>{`  w_new = w_old + η · yᵢ · xᵢ
  b_new = b_old + η · yᵢ

  where η > 0 is the learning rate.

  Check: what does this do to the score of xᵢ?
    w_new · xᵢ + b_new
  = (w_old + η·yᵢ·xᵢ) · xᵢ + (b_old + η·yᵢ)
  = (w_old · xᵢ + b_old) + η·yᵢ·‖xᵢ‖² + η·yᵢ
  = z_old + η·yᵢ·(‖xᵢ‖² + 1)

  Since η > 0 and ‖xᵢ‖² + 1 > 0:
    yᵢ = +1 → score increases ✓ (want score ≥ 0)
    yᵢ = -1 → score decreases ✓ (want score < 0)`}</Mx>

      <H2>Algorithm walkthrough</H2>
      <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
        {steps.map((s, i) => (
          <button key={i} onClick={() => setStep(i)} style={{ padding: "6px 14px", fontSize: 12.5, fontWeight: i === step ? 500 : 400, border: `0.5px solid var(--color-border-${i === step ? s.color : "tertiary"})`, borderRadius: "var(--border-radius-md)", background: i === step ? `var(--color-background-${s.color})` : "var(--color-background-primary)", color: i === step ? `var(--color-text-${s.color})` : "var(--color-text-secondary)", cursor: "pointer" }}>
            {i + 1}. {s.title}
          </button>
        ))}
      </div>
      <div style={{ background: `var(--color-background-${steps[step].color})`, border: `0.5px solid var(--color-border-${steps[step].color})`, borderRadius: "var(--border-radius-lg)", padding: "1rem 1.25rem", minHeight: 80 }}>
        <div style={{ fontWeight: 500, fontSize: 14, color: `var(--color-text-${steps[step].color})`, marginBottom: 6 }}>{steps[step].title}</div>
        <div style={{ fontSize: 13.5, color: `var(--color-text-${steps[step].color})`, whiteSpace: "pre-line", lineHeight: 1.7 }}>{steps[step].desc}</div>
      </div>

      <H2>Geometric intuition of the update</H2>
      <Mx block>{`  Case: yᵢ = +1, misclassified (w·xᵢ + b < 0, so point is on wrong side)

  Before update:    w                     (normal vector)
  After update:     w' = w + η·xᵢ         (add the point's position vector)

  Effect: w' is w rotated/pulled toward xᵢ
  → The boundary (perpendicular to w) rotates to move xᵢ
    from the negative region into the positive region.

  Case: yᵢ = -1, misclassified (w·xᵢ + b ≥ 0, so point is on wrong side)

  w' = w - η·xᵢ    (subtract, pull away from xᵢ)
  → Boundary rotates away from xᵢ, pushing it into negative region.`}</Mx>

      <H2>Perceptron Convergence Theorem</H2>
      <Note color="info" icon="ti-certificate">
        <strong>Theorem (Rosenblatt, 1962 / Novikoff, 1962):</strong> If the training data is <em>linearly separable</em>, the Perceptron algorithm converges in at most <strong>(R / γ)²</strong> updates, where R = max ‖xᵢ‖ (data radius) and γ = margin (distance from boundary to nearest point).
      </Note>
      <Mx block>{`  Formal bound:
    Number of mistakes ≤ (R/γ)²

  where:
    R = max_i ‖xᵢ‖           (max norm of input vectors)
    γ = min_i yᵢ(w*·xᵢ + b*) (margin with unit-norm w*)

  Implication:
    — Convergence is guaranteed for separable data
    — The tighter the margin γ, the more updates required
    — For non-separable data: the algorithm cycles forever!`}</Mx>

      <H2>Positive and negative regions</H2>
      <P>The decision boundary splits space into two half-spaces:</P>
      <Grid cols={2}>
        {[
          { label: "Positive region (+1)", color: "success", items: ["w·x + b > 0", "Point on the same side as weight vector w", "All +1 labeled points should be here", "Increasing any wᵢ pulls boundary away from this side if xᵢ > 0"] },
          { label: "Negative region (−1)", color: "danger", items: ["w·x + b < 0", "Point on opposite side from w", "All −1 labeled points should be here", "Boundary: w·x + b = 0 is the exact dividing surface"] },
        ].map(({ label, color, items }) => (
          <Card key={label} color={color} title={label}>
            {items.map(i => <div key={i} style={{ marginBottom: 4 }}>• {i}</div>)}
          </Card>
        ))}
      </Grid>

      <H2>Full training code</H2>
      <Code>{`import numpy as np
import matplotlib.pyplot as plt

def perceptron_train(X, y, lr=0.1, max_iter=1000):
    """
    X: (n, d) float array
    y: (n,)  int array with values +1 / -1
    Returns: weight vector w, bias b, update history
    """
    n, d = X.shape
    w = np.zeros(d)
    b = 0.0
    history = []          # (w copy, b) at each update

    for epoch in range(max_iter):
        mistakes = 0
        for i in range(n):
            z = w @ X[i] + b
            y_pred = 1 if z >= 0 else -1
            if y_pred != y[i]:              # misclassified
                w = w + lr * y[i] * X[i]   # THE TRICK
                b = b + lr * y[i]
                history.append((w.copy(), b))
                mistakes += 1
        if mistakes == 0:
            print(f"Converged at epoch {epoch+1}")
            break
    return w, b, history

# ─── Visualization of convergence ────────────────────────
def plot_boundary(X, y, w, b, ax, title=""):
    ax.scatter(X[y==1, 0], X[y==1, 1], c='steelblue', s=40, label='+1')
    ax.scatter(X[y==-1, 0], X[y==-1, 1], c='coral', s=40, label='-1')
    if abs(w[1]) > 1e-6:
        x_range = np.linspace(X[:,0].min()-0.5, X[:,0].max()+0.5, 100)
        y_line = -(w[0]*x_range + b) / w[1]
        ax.plot(x_range, y_line, 'k-', linewidth=1.5)
    ax.set_title(title, fontsize=11); ax.legend(fontsize=9)

# Linearly separable data
from sklearn.datasets import make_blobs
X, y_raw = make_blobs(n_samples=100, centers=2, random_state=0, cluster_std=0.8)
y = np.where(y_raw == 0, -1, 1)

w, b, hist = perceptron_train(X, y)
print(f"Total updates: {len(hist)}")
print(f"Final accuracy: {np.mean(np.sign(X@w+b)==y):.1%}")`}</Code>

      <H2>Interview Q&A</H2>
      <QA q="Derive the perceptron update rule from a geometric argument."
          a="For a misclassified point xᵢ with true label yᵢ = +1, the current w places xᵢ on the wrong side (w·xᵢ + b < 0). We want a new w′ such that w′·xᵢ + b′ > 0. Setting w′ = w + η·xᵢ gives w′·xᵢ = w·xᵢ + η‖xᵢ‖², which increases the score by η‖xᵢ‖² > 0. Geometrically, adding xᵢ to the weight vector rotates w toward xᵢ, which rotates the perpendicular decision boundary so that xᵢ crosses to the correct side. The symmetric argument holds for yᵢ = −1 with subtraction." />
      <QA q="What is the effect of the learning rate η in the perceptron algorithm?"
          a="The learning rate η scales the magnitude of each update. For the perceptron, η > 0 only affects the speed of convergence, not whether convergence occurs — since convergence depends only on linear separability. A larger η makes larger rotations per step (faster but potentially oscillatory); a smaller η makes smaller, more conservative updates. Note: this is different from gradient descent where η critically affects convergence stability." />
      <QA q="What happens to the perceptron algorithm on non-linearly separable data?"
          a="The algorithm cycles indefinitely — it never converges. Every pass through the data will have at least one misclassification, so updates continue forever without reaching a stable boundary. Practical fixes include: (1) setting a maximum iteration limit, (2) tracking the best solution found so far (Pocket Algorithm), (3) switching to logistic regression with soft probabilities, or (4) using multi-layer networks for non-linear decision boundaries." />
      <QA q="What is the Pocket Algorithm?"
          a="The Pocket Algorithm (Gallant, 1986) extends the perceptron for non-separable data. It runs the standard perceptron update but maintains a 'pocket' storing the best weight vector seen so far (the one with the fewest misclassifications on the full training set). When done iterating, it returns the pocket weights, not the current weights. This gives the best linear classifier found rather than a diverging oscillating solution." />
    </div>
  );
};

/* ══════════════════════════════════════════════════════
   SECTION 3 — Loss Functions
══════════════════════════════════════════════════════ */
const SectionLoss = () => {
  const [showFn, setShowFn] = useState("perceptron");

  const lossFunctions = {
    perceptron: {
      name: "Perceptron loss",
      formula: "L = max(0, −y · z)   where z = w·x + b",
      desc: "Zero for correctly classified points (margin doesn't matter). Non-zero only for misclassified points.",
      color: "warning",
      gradient: "∂L/∂w = −y·x  if y·z < 0,  else 0",
      problem: "Zero gradient for all correctly classified points — no incentive to push them further from the boundary. Equivalent to the perceptron update rule.",
    },
    hinge: {
      name: "Hinge loss (SVM)",
      formula: "L = max(0, 1 − y · z)",
      desc: "Zero only when the point is correctly classified with a margin of at least 1. Penalizes points that are correct but inside the margin.",
      color: "info",
      gradient: "∂L/∂w = −y·x  if y·z < 1,  else 0",
      problem: "Non-differentiable at z = 1/y. Requires subgradient methods. Not probabilistic.",
    },
    bce: {
      name: "Binary cross-entropy",
      formula: "L = −[y·log(σ(z)) + (1−y)·log(1−σ(z))]\n     where σ(z) = 1/(1+e^{−z}), y ∈ {0,1}",
      desc: "The log-likelihood loss for Bernoulli outputs. Smooth and differentiable everywhere. Encourages the model to output calibrated probabilities.",
      color: "success",
      gradient: "∂L/∂w = (σ(z) − y) · x   [elegant!]",
      problem: "Requires labels y ∈ {0,1} (not ±1). Can suffer from numerical instability if not implemented with log-sum-exp trick.",
    },
    mse: {
      name: "Squared error (MSE on perceptron)",
      formula: "L = (y − z)²   or   L = (y − σ(z))²",
      desc: "Intuitive, but problematic for classification: far-from-boundary points get large gradient, pulling incorrectly classified AND correctly classified far points back toward boundary.",
      color: "danger",
      gradient: "∂L/∂w = −2(y − z) · x",
      problem: "Saturated correct predictions still get gradient. Known as the 'saturation' problem. Not recommended for classification.",
    },
  };

  const fn = lossFunctions[showFn];

  return (
    <div>
      <P>The perceptron update rule works but has no principled notion of "how wrong" a prediction is. Loss functions formalize this and enable gradient-based optimization over a smooth objective.</P>

      <H2>The problem with the raw perceptron trick</H2>
      <Note color="warning" icon="ti-alert-triangle">
        The perceptron update fires <em>only</em> on misclassified points, with a fixed step size regardless of how badly wrong the prediction is. Two identical misclassifications — one barely wrong, one wildly wrong — get the same update. There is no concept of distance to the boundary.
      </Note>

      <H2>The sigmoid function</H2>
      <P>Before discussing cross-entropy, we need the sigmoid — the bridge between a raw score and a probability:</P>
      <Mx block>{`  σ(z) = 1 / (1 + e^{-z})      range: (0, 1)

  Properties:
    σ(0)   = 0.5              (uncertain at boundary)
    σ(+∞)  → 1                (strongly positive → class 1)
    σ(-∞)  → 0                (strongly negative → class 0)
    σ(-z)  = 1 - σ(z)         (antisymmetric around 0.5)

  Derivative (crucial for backprop):
    σ'(z) = σ(z) · (1 − σ(z))

  Interpretation:
    ŷ = σ(w·x + b) = P(y=1 | x; w, b)
    1 − ŷ          = P(y=0 | x; w, b)`}</Mx>

      <H2>Comparing loss functions</H2>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
        {Object.entries(lossFunctions).map(([key, v]) => (
          <button key={key} onClick={() => setShowFn(key)} style={{ padding: "6px 14px", fontSize: 12.5, fontWeight: key === showFn ? 500 : 400, border: `0.5px solid var(--color-border-${key === showFn ? v.color : "tertiary"})`, borderRadius: "var(--border-radius-md)", background: key === showFn ? `var(--color-background-${v.color})` : "var(--color-background-primary)", color: key === showFn ? `var(--color-text-${v.color})` : "var(--color-text-secondary)", cursor: "pointer" }}>
            {v.name}
          </button>
        ))}
      </div>

      <div style={{ border: `0.5px solid var(--color-border-${fn.color})`, borderRadius: "var(--border-radius-lg)", padding: "1.25rem", background: `var(--color-background-${fn.color})` }}>
        <div style={{ fontWeight: 500, fontSize: 15, color: `var(--color-text-${fn.color})`, marginBottom: 10 }}>{fn.name}</div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 12.5, background: "var(--color-background-primary)", border: "0.5px solid var(--color-border-tertiary)", padding: "8px 12px", borderRadius: "var(--border-radius-md)", marginBottom: 10, whiteSpace: "pre", color: "var(--color-text-primary)" }}>{fn.formula}</div>
        <P style={{ marginBottom: 6, color: `var(--color-text-${fn.color})` }}>{fn.desc}</P>
        <div style={{ fontSize: 12.5, marginBottom: 6, color: `var(--color-text-${fn.color})` }}>
          <strong>Gradient: </strong><span style={{ fontFamily: "var(--font-mono)" }}>{fn.gradient}</span>
        </div>
        <div style={{ fontSize: 12.5, color: `var(--color-text-${fn.color})`, background: "rgba(0,0,0,0.04)", borderRadius: "var(--border-radius-md)", padding: "8px 10px" }}>
          <strong>Note: </strong>{fn.problem}
        </div>
      </div>

      <H2>Loss landscape — geometric view</H2>
      <Mx block>{`  For a single sample (x, y), as z = w·x + b varies:

  Perceptron:   L(z) = max(0, -yz)
    — zero for z·y ≥ 0 (correct), grows linearly for z·y < 0

  Hinge:        L(z) = max(0, 1 - yz)
    — zero for z·y ≥ 1 (margin satisfied), grows linearly otherwise
    — Note: hinge > perceptron loss (higher, wider penalty zone)

  Log loss:     L(z) = log(1 + e^{-yz})   [equivalent form, y∈{±1}]
    — never truly zero, but exponentially small for large y·z
    — smooth and differentiable everywhere`}</Mx>

      <H2>Gradient descent with perceptron loss</H2>
      <Note color="info" icon="ti-trending-down">
        Gradient descent minimizes a loss by updating parameters in the direction of the negative gradient: <strong>w ← w − η · ∂L/∂w</strong>. For the perceptron loss, this recovers exactly the perceptron update rule — connecting the trick to formal optimization.
      </Note>
      <Mx block>{`  Perceptron loss for one sample:
    L = max(0, -y·(w·x + b))

  Subgradient:
    ∂L/∂w = -y·x  if y·(w·x + b) < 0  (misclassified)
           =  0    otherwise

  Gradient descent step:
    w ← w - η · (-y·x) = w + η·y·x        ← same as perceptron trick!
    b ← b - η · (-y)   = b + η·y`}</Mx>

      <H2>Cross-entropy loss derivation</H2>
      <Mx block>{`  Model: P(y=1|x) = σ(z) = ŷ
  
  Negative log-likelihood (NLL) for one sample:
    L = -log P(y|x)
      = -[y·log(ŷ) + (1-y)·log(1-ŷ)]       (y ∈ {0,1})

  Gradient (elegantly simplifies via chain rule):
    ∂L/∂z = ŷ - y                           (predicted - true)
    ∂L/∂w = (ŷ - y) · x
    ∂L/∂b = (ŷ - y)

  Note: No explicit σ'(z) in the gradient! It cancels out,
  giving an intuitive form: error × input.`}</Mx>

      <H2>Implementation: logistic perceptron with BCE</H2>
      <Code>{`import numpy as np

class LogisticPerceptron:
    """
    Single-neuron logistic classifier trained with
    binary cross-entropy + gradient descent.
    """
    def __init__(self, lr=0.01, n_iter=1000):
        self.lr, self.n_iter = lr, n_iter

    def sigmoid(self, z):
        # Numerically stable sigmoid
        return np.where(z >= 0,
                        1 / (1 + np.exp(-z)),
                        np.exp(z) / (1 + np.exp(z)))

    def fit(self, X, y):
        """y must be 0/1 (not ±1)"""
        n, d = X.shape
        self.w = np.zeros(d)
        self.b = 0.0
        self.loss_history = []

        for _ in range(self.n_iter):
            z = X @ self.w + self.b          # (n,)
            y_hat = self.sigmoid(z)          # P(y=1|x)

            # Binary cross-entropy loss (mean)
            eps = 1e-15
            loss = -np.mean(y * np.log(y_hat + eps)
                          + (1-y) * np.log(1 - y_hat + eps))
            self.loss_history.append(loss)

            # Gradients (vectorized over all samples)
            error = y_hat - y                # (n,)  ← predicted - true
            self.w -= self.lr * (X.T @ error) / n
            self.b -= self.lr * error.mean()

        return self

    def predict_proba(self, X):
        return self.sigmoid(X @ self.w + self.b)

    def predict(self, X, threshold=0.5):
        return (self.predict_proba(X) >= threshold).astype(int)

    def score(self, X, y):
        return np.mean(self.predict(X) == y)

# Hinge loss variant (for SVM-like training)
def hinge_loss_gradient(X, y, w, b):
    """y must be +1 / -1"""
    z = X @ w + b                  # (n,)
    margin = y * z                 # y·(w·x+b)
    mask = margin < 1              # inside margin or wrong side
    dw = -np.mean(y[mask, None] * X[mask], axis=0)
    db = -np.mean(y[mask])
    return dw, db`}</Code>

      <H2>Interview Q&A</H2>
      <QA q="Why is binary cross-entropy preferred over MSE for classification?"
          a="MSE loss (y − ŷ)² suffers from saturation: for sigmoid outputs, when a point is <em>very</em> wrong (e.g., true y=1, predicted ŷ≈0), the gradient ∂MSE/∂w = 2(ŷ−y)·σ′(z)·x becomes tiny because σ′(z) ≈ 0 near saturation — this is the exact opposite of what we want. Cross-entropy loss doesn't have this problem: its gradient is simply (ŷ−y)·x, growing large exactly when predictions are most wrong. Additionally, BCE is the proper negative log-likelihood for Bernoulli outputs, making it the principled maximum-likelihood choice." />
      <QA q="What is the difference between hinge loss and cross-entropy loss?"
          a="Hinge loss max(0, 1 − y·z) is piecewise linear and non-differentiable at z = 1/y; it becomes exactly zero once a margin of 1 is achieved (SVM philosophy: 'good enough'). Cross-entropy − log σ(y·z) is smooth everywhere, never exactly zero, and continues to reward pushing points further from the boundary. Hinge loss leads to sparse support vectors; cross-entropy produces calibrated probabilities. Cross-entropy is generally preferred for deep networks due to smooth gradients." />
      <QA q="Derive the gradient of cross-entropy loss with respect to the weights."
          a="L = −[y log σ(z) + (1−y) log(1−σ(z))], z = w·x + b. By chain rule: ∂L/∂w = (∂L/∂z)(∂z/∂w). The first factor: ∂L/∂z = −y(1−σ(z)) + (1−y)σ(z) = σ(z)−y = ŷ−y. The second: ∂z/∂w = x. So ∂L/∂w = (ŷ−y)·x. The σ′(z) term cancels naturally — a key reason why sigmoid + cross-entropy is the standard pairing." />
      <QA q="What does 'calibrated probability' mean and why does BCE encourage it?"
          a="A calibrated model means that when it predicts P(y=1|x) = 0.7, approximately 70% of such predictions should be correct. BCE is derived from maximum likelihood estimation of a Bernoulli distribution, which directly optimizes for calibration — the model is penalized not just for wrong hard decisions but for being confident in wrong directions. A model trained with MSE or hinge loss doesn't have this calibration guarantee." />
    </div>
  );
};

/* ══════════════════════════════════════════════════════
   SECTION 4 — Problems with Perceptron
══════════════════════════════════════════════════════ */
const SectionProblems = () => {
  const canvasRef = useRef(null);
  const [dataset, setDataset] = useState("xor");

  const datasets = {
    xor: { name: "XOR (non-separable)", points: [{ x: -1, y: -1, label: 1 }, { x: -1, y: 1, label: -1 }, { x: 1, y: -1, label: -1 }, { x: 1, y: 1, label: 1 }] },
    circle: { name: "Concentric circles", points: [{ x: 0.3, y: 0.3, label: 1 }, { x: -0.3, y: 0.3, label: 1 }, { x: 0.2, y: -0.3, label: 1 }, { x: -0.2, y: -0.2, label: 1 }, { x: 1.5, y: 0.2, label: -1 }, { x: -1.5, y: 0.3, label: -1 }, { x: 0.3, y: 1.5, label: -1 }, { x: -0.2, y: -1.5, label: -1 }] },
    linear: { name: "Linearly separable", points: [{ x: -1.5, y: -1, label: 1 }, { x: -1, y: -1.5, label: 1 }, { x: -0.5, y: -0.5, label: 1 }, { x: 1.5, y: 1, label: -1 }, { x: 1, y: 1.5, label: -1 }, { x: 0.5, y: 0.8, label: -1 }] },
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width, H = canvas.height;
    const cx = W / 2, cy = H / 2, scale = 70;
    const toC = (x, y) => [cx + x * scale, cy - y * scale];

    ctx.clearRect(0, 0, W, H);
    ctx.strokeStyle = "rgba(128,128,128,0.12)";
    ctx.lineWidth = 0.5;
    for (let i = -3; i <= 3; i++) {
      ctx.beginPath(); ctx.moveTo(cx + i * scale, 0); ctx.lineTo(cx + i * scale, H); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, cy - i * scale); ctx.lineTo(W, cy - i * scale); ctx.stroke();
    }
    ctx.strokeStyle = "rgba(128,128,128,0.35)";
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(0, cy); ctx.lineTo(W, cy); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx, 0); ctx.lineTo(cx, H); ctx.stroke();

    const pts = datasets[dataset].points;

    if (dataset === "xor") {
      ctx.fillStyle = "rgba(231,92,76,0.1)";
      ctx.fillRect(cx, 0, W - cx, cy);
      ctx.fillRect(0, cy, cx, H - cy);
      ctx.fillStyle = "rgba(55,138,221,0.1)";
      ctx.fillRect(0, 0, cx, cy);
      ctx.fillRect(cx, cy, W - cx, H - cy);
      ctx.font = "11px var(--font-sans)";
      ctx.fillStyle = "rgba(55,138,221,0.7)"; ctx.fillText("+1", cx + 10, 20);
      ctx.fillStyle = "rgba(55,138,221,0.7)"; ctx.fillText("+1", 10, H - 8);
      ctx.fillStyle = "rgba(231,92,76,0.7)"; ctx.fillText("-1", 10, 20);
      ctx.fillStyle = "rgba(231,92,76,0.7)"; ctx.fillText("-1", cx + 10, H - 8);
      ctx.fillStyle = "rgba(0,0,0,0.5)"; ctx.fillText("No single line can separate these!", cx - 100, cy + 20);
    }

    pts.forEach(({ x, y, label }) => {
      const [px, py] = toC(x, y);
      ctx.beginPath(); ctx.arc(px, py, 9, 0, Math.PI * 2);
      ctx.fillStyle = label === 1 ? "#378ADD" : "#E24B4A";
      ctx.fill();
      ctx.fillStyle = "#fff";
      ctx.font = "bold 10px var(--font-sans)";
      ctx.textAlign = "center"; ctx.textBaseline = "middle";
      ctx.fillText(label === 1 ? "+" : "−", px, py);
      ctx.textAlign = "start"; ctx.textBaseline = "alphabetic";
    });
  }, [dataset]);

  return (
    <div>
      <p className="p">The perceptron is a powerful idea, but it has a fundamental and well-known limitation: it can only learn <strong>linearly separable</strong> functions.</p>

      <H2>The XOR problem</H2>
      <p className="p">The XOR function cannot be separated by any single straight line — this was famously proved by Minsky &amp; Papert in their 1969 book <em>Perceptrons</em>, which triggered the first &ldquo;AI winter&rdquo;.</p>

      <VizBox>
        <div style={{ display: "flex", gap: 6, marginBottom: 10, flexWrap: "wrap" }}>
          {Object.entries(datasets).map(([key, { name }]) => (
            <button key={key} onClick={() => setDataset(key)} style={{ padding: "5px 12px", fontSize: 12.5, fontWeight: key === dataset ? 500 : 400, border: `0.5px solid var(--color-border-${key === dataset ? "info" : "tertiary"})`, borderRadius: "var(--border-radius-md)", background: key === dataset ? "var(--color-background-info)" : "transparent", color: key === dataset ? "var(--color-text-info)" : "var(--color-text-secondary)", cursor: "pointer" }}>
              {name}
            </button>
          ))}
        </div>
        <canvas ref={canvasRef} width={380} height={280} style={{ display: "block", margin: "0 auto", borderRadius: "var(--border-radius-md)" }} />
      </VizBox>

      <H2>XOR truth table — why it fails</H2>
      <Mx block>{`  XOR:  (x₁, x₂) → y
    (-1, -1) → +1    (same sign → +1)
    (-1, +1) → -1    (different → -1)
    (+1, -1) → -1    (different → -1)
    (+1, +1) → +1    (same sign → +1)

  For a linear classifier w₁x₁ + w₂x₂ + b = 0 to work,
  we need:
    w₁(-1) + w₂(-1) + b > 0   → (i)
    w₁(-1) + w₂(+1) + b < 0   → (ii)
    w₁(+1) + w₂(-1) + b < 0   → (iii)
    w₁(+1) + w₂(+1) + b > 0   → (iv)

  Adding (i) and (iv): 2b > 0  →  b > 0
  Adding (ii) and (iii): 2b < 0  →  b < 0
  CONTRADICTION. No solution exists. QED.`}</Mx>

      <H2>The complete list of perceptron limitations</H2>
      <Grid cols={2}>
        {[
          { title: "Linear separability required", icon: "ti-topology-star", color: "danger", desc: "Can only learn linearly separable functions. Fails on XOR, circles, spirals — any non-linear boundary." },
          { title: "No probabilistic output", icon: "ti-chart-pie", color: "warning", desc: "Hard +1/−1 output gives no confidence estimate. Can't distinguish 'barely positive' from 'strongly positive'." },
          { title: "Cycles on non-separable data", icon: "ti-refresh", color: "warning", desc: "Algorithm never converges on non-separable data. The Pocket Algorithm is a workaround, not a fix." },
          { title: "No hidden representation", icon: "ti-layers-difference", color: "danger", desc: "Single layer can't learn compositional features. Can't detect 'eye AND nose' → 'face'." },
          { title: "Binary inputs/outputs only", icon: "ti-toggle-left", color: "info", desc: "Classical perceptron defined for {0,1} or {±1} only. Continuous-valued extensions require different training." },
          { title: "No gradient signal when correct", icon: "ti-trending-down", color: "info", desc: "Zero loss for any correctly classified point regardless of margin. No incentive to find a better boundary." },
        ].map(({ title, icon, color, desc }) => (
          <div key={title} style={{ background: `var(--color-background-${color})`, border: `0.5px solid var(--color-border-${color})`, borderRadius: "var(--border-radius-md)", padding: "12px 14px" }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 6 }}>
              <i className={`ti ${icon}`} style={{ fontSize: 16, color: `var(--color-text-${color})` }} aria-hidden="true" />
              <div style={{ fontWeight: 500, fontSize: 13, color: `var(--color-text-${color})` }}>{title}</div>
            </div>
            <div style={{ fontSize: 12.5, color: `var(--color-text-${color})`, lineHeight: 1.6 }}>{desc}</div>
          </div>
        ))}
      </Grid>

      <H2>Code: PyTorch proves it</H2>
      <Code>{`import torch
import torch.nn as nn

X = torch.tensor([[-1., -1.], [-1., 1.], [1., -1.], [1., 1.]])
y = torch.tensor([[1.], [-1.], [-1.], [1.]])

# ─── Single Perceptron fails on XOR ───────────────────────
single = nn.Linear(2, 1)
opt = torch.optim.SGD(single.parameters(), lr=0.1)
criterion = nn.MSELoss()

for _ in range(5000):
    loss = criterion(torch.sign(single(X)), y)
    opt.zero_grad(); loss.backward(); opt.step()
preds_single = (single(X) >= 0).float() * 2 - 1
print("Perceptron XOR accuracy:",
      (preds_single == y).float().mean().item())  # ≤ 0.75 always

# ─── An MLP CAN solve XOR ─────────────────────────────────
mlp = nn.Sequential(
    nn.Linear(2, 4),          # hidden layer: 2 inputs → 4 neurons
    nn.Tanh(),                 # non-linear activation (ESSENTIAL!)
    nn.Linear(4, 1),          # output layer
    nn.Tanh()
)

opt = torch.optim.Adam(mlp.parameters(), lr=0.05)
for epoch in range(5000):
    loss = nn.MSELoss()(mlp(X), y)
    opt.zero_grad(); loss.backward(); opt.step()
    if epoch % 1000 == 0:
        print(f"Epoch {epoch}, Loss: {loss.item():.6f}")

preds_mlp = torch.sign(mlp(X))
print("\\nMLP XOR accuracy:",
      (preds_mlp == y).float().mean().item())     # 1.0

# ─── What does the hidden layer learn? ────────────────────
with torch.no_grad():
    hidden = torch.tanh(mlp[0](X))  # hidden representation
    print("\\nHidden representations of XOR inputs:")
    for i, pt in enumerate(X):
        print(f"  {pt.tolist()} → h={hidden[i].tolist()}"
              f"  y={y[i].item():.0f}")`}</Code>

      <H2>The path forward: what perceptron limitations motivated</H2>
      <Table
        heads={["Limitation", "Solution", "Key innovation"]}
        rows={[
          ["Linear separability only", "Multi-layer perceptron (MLP)", "Hidden layers + non-linear activations"],
          ["No probabilistic output", "Logistic regression / softmax", "Sigmoid output + cross-entropy"],
          ["No gradient through step fn.", "Backpropagation", "Chain rule on differentiable activations"],
          ["Diverges on non-separable data", "Gradient descent on smooth loss", "Differentiable loss + SGD"],
          ["No feature learning", "Deep networks", "Hierarchical layer-wise representation"],
          ["Fixed feature space", "CNNs / attention", "Spatial / sequential inductive bias"],
        ]}
      />

      <H2>Interview Q&A</H2>
      <QA q="Prove that XOR cannot be solved by a single perceptron."
          a="Assume a perceptron w₁x₁ + w₂x₂ + b satisfying XOR. The four constraints are: (i) −w₁−w₂+b > 0, (ii) −w₁+w₂+b < 0, (iii) w₁−w₂+b < 0, (iv) w₁+w₂+b > 0. Adding (i) and (iv): 2b > 0. Adding (ii) and (iii): 2b < 0. These are contradictory — no values of w₁, w₂, b can satisfy all four constraints simultaneously. Therefore, no linear classifier can solve XOR. ∎" />
      <QA q="Why did the Minsky & Papert XOR result cause an 'AI winter'?"
          a="Their 1969 book <em>Perceptrons</em> rigorously proved that single-layer perceptrons could not learn many simple functions including XOR. The book was widely (though somewhat incorrectly) interpreted as showing that neural networks in general were fatally limited. This led to a decade-long reduction in funding and interest in neural network research. The fix — multi-layer networks trained by backpropagation — was known theoretically but wasn't demonstrated convincingly until Rumelhart, Hinton & Williams in 1986." />
      <QA q="How does adding a hidden layer solve XOR? What does it learn?"
          a="The hidden layer performs a non-linear transformation of the input space. In the hidden representation, the XOR-pattern points that were inseparable in the original (x₁, x₂) space become linearly separable. Concretely, the network learns to detect intermediate features (e.g., OR and AND of the inputs) and the output layer combines them. The key requirement is a non-linear activation — without it, composing linear layers is still linear, and XOR remains unsolvable." />
      <QA q="What is the VC dimension of a perceptron in d dimensions, and what does it mean?"
          a="The VC (Vapnik-Chervonenkis) dimension of a linear classifier (perceptron) in d-dimensional space is d + 1. This means it can shatter any d+1 points in general position. Shattering means it can classify all 2^(d+1) labelings of those points correctly. The VC dimension quantifies the model's capacity — if training set size n >> VC_dim, generalization is guaranteed; if n << VC_dim, overfitting is likely. A perceptron in 2D has VC dim = 3: it can classify any 3 non-collinear points in all 8 ways but cannot shatter any 4 points." />
      <QA q="What is the difference between a hard-margin and soft-margin classifier?"
          a="A hard-margin classifier (classical perceptron, SVM with hard margin) requires all training points to be correctly classified with zero margin violation — it fails completely on non-separable data. A soft-margin classifier (SVM with slack variables ξᵢ) allows some points to violate the margin or even be misclassified, with a penalty C·Σξᵢ in the objective. This makes it robust to outliers and applicable to non-linearly separable data, at the cost of a hyperparameter C controlling the trade-off between margin width and violation penalty." />
    </div>
  );
};

/* ══════════════════════════════════════════════════════
   ROOT
══════════════════════════════════════════════════════ */
const TABS = [
  { id: "what", label: "What is a Perceptron?" },
  { id: "trick", label: "The Perceptron Trick" },
  { id: "loss", label: "Loss Functions" },
  { id: "problems", label: "Problems & Limits" },
];

export default function Perceptrons() {
  const [active, setActive] = useState("what");
  const sectionMap = { what: <SectionWhat />, trick: <SectionTrick />, loss: <SectionLoss />, problems: <SectionProblems /> };

  return (
    <div>
      <div className="page-header">
        <div className="page-header-eyebrow">Deep Learning — Module 02</div>
        <h1 className="page-header-title">Perceptrons: From Geometry to Limits</h1>
        <p className="page-header-subtitle">Math · Training algorithms · Loss functions · XOR problem</p>
      </div>

      <SectionNav tabs={TABS} active={active} onChange={setActive} />

      <div style={{ padding: "0.5rem 0 2rem" }}>
        {sectionMap[active]}
      </div>

      <NavButtons moduleId={2} />
    </div>
  );
}
