import { useState, useRef, useEffect, useCallback } from "react";
import { Code } from '../components/ui/Code.jsx';
import { Mx, H2, H3, P } from '../components/ui/Typography.jsx';
import { QA } from '../components/ui/QA.jsx';
import { Note, Grid, Card, Table, VizBox } from '../components/ui/Primitives.jsx';
import NavButtons from '../components/layout/NavButtons.jsx';
import SectionNav from '../components/layout/SectionNav.jsx';

/* ══════════════════════════════════════════════════════
   INTERACTIVE MLP ARCHITECTURE DIAGRAM
══════════════════════════════════════════════════════ */
const sigmoid = z => 1 / (1 + Math.exp(-z));
const tanh_fn = z => Math.tanh(z);
const relu = z => Math.max(0, z);

function MLPDiagram({ layers, activeLayer = -1, activeNeuron = -1 }) {
  const W = 560, H = 300;
  const maxN = Math.max(...layers);
  const layerX = layers.map((_, i) => 60 + i * (W - 80) / (layers.length - 1));

  const neuronY = (count, idx) => {
    const spacing = Math.min(52, (H - 40) / count);
    const total = (count - 1) * spacing;
    return H / 2 - total / 2 + idx * spacing;
  };

  const colors = ["#185FA5", "#0F6E56", "#853E0B", "#7A2048", "#2D2D2D"];
  const layerNames = ["Input", ...layers.slice(1, -1).map((_, i) => `Hidden ${i + 1}`), "Output"];

  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} role="img">
      <title>MLP Architecture Diagram</title>
      <defs>
        <marker id="arr2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </marker>
      </defs>

      {/* Connections */}
      {layers.slice(0, -1).map((n1, li) =>
        Array.from({ length: n1 }, (_, i) =>
          Array.from({ length: layers[li + 1] }, (_, j) => {
            const isActive = activeLayer === li + 1;
            const x1 = layerX[li] + 14, y1 = neuronY(n1, i);
            const x2 = layerX[li + 1] - 14, y2 = neuronY(layers[li + 1], j);
            return (
              <line key={`${li}-${i}-${j}`} x1={x1} y1={y1} x2={x2} y2={y2}
                stroke={isActive ? "#EF9F27" : "rgba(136,135,128,0.2)"}
                strokeWidth={isActive ? 1.2 : 0.6}
                opacity={isActive ? 0.8 : 1} />
            );
          })
        )
      )}

      {/* Neurons */}
      {layers.map((count, li) =>
        Array.from({ length: count }, (_, ni) => {
          const cx = layerX[li], cy = neuronY(count, ni);
          const isActive = li === activeLayer;
          const isHighlight = isActive && (activeNeuron === -1 || activeNeuron === ni);
          return (
            <g key={`${li}-${ni}`}>
              <circle cx={cx} cy={cy} r={13}
                fill={isHighlight ? colors[li % colors.length] : "var(--color-background-secondary)"}
                stroke={isHighlight ? colors[li % colors.length] : "var(--color-border-secondary)"}
                strokeWidth={isHighlight ? 2 : 0.8} />
              <text x={cx} y={cy} textAnchor="middle" dominantBaseline="central"
                style={{ fontSize: 10, fontFamily: "var(--font-mono)", fill: isHighlight ? "#fff" : "var(--color-text-secondary)", fontWeight: isHighlight ? 500 : 400 }}>
                {li === 0 ? `x${ni + 1}` : li === layers.length - 1 ? "ŷ" : `h${ni + 1}`}
              </text>
            </g>
          );
        })
      )}

      {/* Layer labels */}
      {layers.map((_, li) => (
        <text key={li} x={layerX[li]} y={H - 8} textAnchor="middle"
          style={{ fontSize: 11, fontFamily: "var(--font-sans)", fill: "var(--color-text-tertiary)" }}>
          {layerNames[li]}
        </text>
      ))}
    </svg>
  );
}

/* ══════════════════════════════════════════════════════
   FORWARD PROPAGATION TRACER
══════════════════════════════════════════════════════ */
const FP_W1 = [[0.1, 0.4], [0.2, 0.3], [0.5, 0.1]];
const FP_b1 = [0.1, 0.2, 0.3];
const FP_W2 = [[0.3, 0.2, 0.4]];
const FP_b2 = [0.1];
const FP_x = [0.5, 0.8];

function computeForwardPass() {
  // Layer 1
  const z1 = FP_W1.map((row, i) => row.reduce((s, w, j) => s + w * FP_x[j], FP_b1[i]));
  const a1 = z1.map(tanh_fn);
  // Layer 2
  const z2 = FP_W2.map((row, i) => row.reduce((s, w, j) => s + w * a1[j], FP_b2[i]));
  const a2 = z2.map(sigmoid);
  return { z1, a1, z2, a2 };
}

const { z1, a1, z2, a2 } = computeForwardPass();

function ForwardPropTracer() {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: "Input layer (layer 0)",
      layer: 0, neuron: -1,
      content: (
        <div>
          <P>The input is passed directly as the activation of layer 0 — no computation.</P>
          <Mx block>{`  a⁽⁰⁾ = x = [${FP_x.join(", ")}]
  
  a⁽⁰⁾₁ = x₁ = ${FP_x[0]}   (feature 1)
  a⁽⁰⁾₂ = x₂ = ${FP_x[1]}   (feature 2)`}</Mx>
        </div>
      ),
    },
    {
      title: "Hidden layer pre-activation z⁽¹⁾",
      layer: 1, neuron: -1,
      content: (
        <div>
          <P>Compute the weighted sum for each hidden neuron: z⁽¹⁾ = W⁽¹⁾ · a⁽⁰⁾ + b⁽¹⁾</P>
          <Mx block>{`  z⁽¹⁾₁ = ${FP_W1[0][0]}×${FP_x[0]} + ${FP_W1[0][1]}×${FP_x[1]} + ${FP_b1[0]}
        = ${(FP_W1[0][0] * FP_x[0]).toFixed(3)} + ${(FP_W1[0][1] * FP_x[1]).toFixed(3)} + ${FP_b1[0]} = ${z1[0].toFixed(4)}

  z⁽¹⁾₂ = ${FP_W1[1][0]}×${FP_x[0]} + ${FP_W1[1][1]}×${FP_x[1]} + ${FP_b1[1]}
        = ${(FP_W1[1][0] * FP_x[0]).toFixed(3)} + ${(FP_W1[1][1] * FP_x[1]).toFixed(3)} + ${FP_b1[1]} = ${z1[1].toFixed(4)}

  z⁽¹⁾₃ = ${FP_W1[2][0]}×${FP_x[0]} + ${FP_W1[2][1]}×${FP_x[1]} + ${FP_b1[2]}
        = ${(FP_W1[2][0] * FP_x[0]).toFixed(3)} + ${(FP_W1[2][1] * FP_x[1]).toFixed(3)} + ${FP_b1[2]} = ${z1[2].toFixed(4)}`}</Mx>
        </div>
      ),
    },
    {
      title: "Hidden layer activation a⁽¹⁾",
      layer: 1, neuron: -1,
      content: (
        <div>
          <P>Apply the activation function element-wise. Here we use tanh.</P>
          <Mx block>{`  a⁽¹⁾ = tanh(z⁽¹⁾)

  a⁽¹⁾₁ = tanh(${z1[0].toFixed(4)}) = ${a1[0].toFixed(5)}
  a⁽¹⁾₂ = tanh(${z1[1].toFixed(4)}) = ${a1[1].toFixed(5)}
  a⁽¹⁾₃ = tanh(${z1[2].toFixed(4)}) = ${a1[2].toFixed(5)}

  tanh(z) = (eᶻ - e⁻ᶻ) / (eᶻ + e⁻ᶻ)    range: (-1, 1)`}</Mx>
        </div>
      ),
    },
    {
      title: "Output layer pre-activation z⁽²⁾",
      layer: 2, neuron: 0,
      content: (
        <div>
          <P>Same operation as the hidden layer — weighted sum of hidden activations.</P>
          <Mx block>{`  z⁽²⁾₁ = ${FP_W2[0][0]}×${a1[0].toFixed(4)} + ${FP_W2[0][1]}×${a1[1].toFixed(4)} + ${FP_W2[0][2]}×${a1[2].toFixed(4)} + ${FP_b2[0]}
        = ${(FP_W2[0][0] * a1[0]).toFixed(4)} + ${(FP_W2[0][1] * a1[1]).toFixed(4)} + ${(FP_W2[0][2] * a1[2]).toFixed(4)} + ${FP_b2[0]}
        = ${z2[0].toFixed(5)}`}</Mx>
        </div>
      ),
    },
    {
      title: "Output layer activation ŷ",
      layer: 2, neuron: 0,
      content: (
        <div>
          <P>Apply sigmoid to get a probability output for binary classification.</P>
          <Mx block>{`  ŷ = σ(z⁽²⁾) = σ(${z2[0].toFixed(4)})
    = 1 / (1 + e^{-${z2[0].toFixed(4)}})
    = ${a2[0].toFixed(6)}

  Interpretation:
    P(y=1 | x=[${FP_x}]) ≈ ${(a2[0] * 100).toFixed(1)}%`}</Mx>
          <Note color="success" icon="ti-check">Forward pass complete! The input [0.5, 0.8] maps to output probability ≈ {(a2[0] * 100).toFixed(1)}%</Note>
        </div>
      ),
    },
  ];

  const s = steps[step];

  return (
    <div style={{ background: "var(--color-background-secondary)", border: "0.5px solid var(--color-border-tertiary)", borderRadius: "var(--border-radius-lg)", padding: "1rem", marginBottom: "1.25rem" }}>
      <div style={{ marginBottom: 10 }}>
        <MLPDiagram layers={[2, 3, 1]} activeLayer={s.layer} activeNeuron={s.neuron} />
      </div>

      <div style={{ display: "flex", gap: 4, marginBottom: 12, flexWrap: "wrap" }}>
        {steps.map((st, i) => (
          <button key={i} onClick={() => setStep(i)} style={{ padding: "4px 10px", fontSize: 11.5, fontWeight: i === step ? 500 : 400, border: `0.5px solid var(--color-border-${i === step ? "info" : "tertiary"})`, borderRadius: "20px", background: i === step ? "var(--color-background-info)" : "transparent", color: i === step ? "var(--color-text-info)" : "var(--color-text-secondary)", cursor: "pointer" }}>
            Step {i + 1}
          </button>
        ))}
      </div>

      <div style={{ background: "var(--color-background-primary)", border: "0.5px solid var(--color-border-tertiary)", borderRadius: "var(--border-radius-md)", padding: "1rem" }}>
        <div style={{ fontWeight: 500, fontSize: 14, color: "var(--color-text-primary)", marginBottom: 8 }}>
          Step {step + 1} / {steps.length}: {s.title}
        </div>
        {s.content}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10 }}>
        <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0} style={{ padding: "6px 14px", fontSize: 13, border: "0.5px solid var(--color-border-tertiary)", borderRadius: "var(--border-radius-md)", background: "transparent", color: step > 0 ? "var(--color-text-secondary)" : "var(--color-text-tertiary)", cursor: step > 0 ? "pointer" : "default", display: "flex", alignItems: "center", gap: 5 }}>
          <i className="ti ti-arrow-left" aria-hidden /> Prev
        </button>
        <button onClick={() => setStep(Math.min(steps.length - 1, step + 1))} disabled={step === steps.length - 1} style={{ padding: "6px 14px", fontSize: 13, border: "0.5px solid var(--color-border-info)", borderRadius: "var(--border-radius-md)", background: "var(--color-background-info)", color: "var(--color-text-info)", cursor: step < steps.length - 1 ? "pointer" : "default", display: "flex", alignItems: "center", gap: 5 }}>
          Next <i className="ti ti-arrow-right" aria-hidden />
        </button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 1 — MLP INTUITION
══════════════════════════════════════════════════════ */
function SectionMLP() {
  const [hlayers, setHlayers] = useState(1);
  const [hneurons, setHneurons] = useState(4);

  const layers = [3, ...Array(hlayers).fill(hneurons), 2];

  return (
    <div>
      <P>A Multi-Layer Perceptron (MLP) stacks multiple layers of neurons. Each layer transforms the previous layer's representation, enabling non-linear decision boundaries that a single perceptron cannot achieve.</P>

      <H2>Why sigmoid over the step function?</H2>
      <Grid cols={2}>
        {[
          { label: "Step function (perceptron)", color: "danger", items: ["Output: {−1, +1} — hard binary", "Gradient = 0 everywhere (except z=0)", "Cannot use gradient descent", "No probability — just a class label", "Learning requires the special 'perceptron trick'"] },
          { label: "Sigmoid activation", color: "success", items: ["Output: (0,1) — soft probability", "Gradient = σ(z)·(1−σ(z)) — smooth, non-zero", "Enables full gradient-based training", "Differentiable → backpropagation works", "Composable: stack many sigmoid layers"] },
        ].map(({ label, color, items }) => (
          <Card key={label} title={label} color={color}>
            {items.map(i => <div key={i} style={{ marginBottom: 4 }}>• {i}</div>)}
          </Card>
        ))}
      </Grid>

      <H2>MLP construction</H2>
      <P>We connect perceptrons (now with smooth activations) in layers. Each neuron in layer l receives all activations from layer l−1 — this is called a fully connected or dense layer.</P>
      <Mx block>{`  Single sigmoid neuron (layer l, neuron j):
  
    z⁽ˡ⁾_j = Σₖ w⁽ˡ⁾_{jk} · a⁽ˡ⁻¹⁾_k  +  b⁽ˡ⁾_j
    a⁽ˡ⁾_j = σ(z⁽ˡ⁾_j)

  In matrix form for the whole layer:
    z⁽ˡ⁾ = W⁽ˡ⁾ · a⁽ˡ⁻¹⁾  +  b⁽ˡ⁾
    a⁽ˡ⁾ = f⁽ˡ⁾(z⁽ˡ⁾)       (element-wise)

  W⁽ˡ⁾ ∈ ℝ^(n_l × n_{l-1})
  b⁽ˡ⁾ ∈ ℝ^(n_l)`}</Mx>

      <H2>Interactive architecture builder</H2>
      <P>Adjust the hidden layers and neurons to see how the MLP structure changes.</P>
      <VizBox>
        <MLPDiagram layers={layers} />
        <div style={{ display: "grid", gridTemplateColumns: "120px 1fr 48px", alignItems: "center", gap: 8, marginTop: 12, fontSize: 13 }}>
          <span style={{ color: "var(--color-text-secondary)" }}>Hidden layers</span>
          <input type="range" min={1} max={3} value={hlayers} onChange={e => setHlayers(+e.target.value)} />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, textAlign: "right" }}>{hlayers}</span>
          <span style={{ color: "var(--color-text-secondary)" }}>Neurons/layer</span>
          <input type="range" min={2} max={6} value={hneurons} onChange={e => setHneurons(+e.target.value)} />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, textAlign: "right" }}>{hneurons}</span>
        </div>
        <div style={{ marginTop: 10, fontSize: 12, color: "var(--color-text-secondary)", display: "flex", gap: 16, justifyContent: "center" }}>
          <span>Architecture: [{layers.join(", ")}]</span>
          <span>Parameters: {layers.slice(1).reduce((s, n, i) => s + n * (layers[i] + 1), 0).toLocaleString()}</span>
        </div>
      </VizBox>

      <H2>MLP architecture components</H2>
      <Table
        heads={["Component", "Role", "Typical size", "Activation"]}
        rows={[
          ["Input layer (l=0)", "Passes raw features; no computation", "= feature dimension d", "Identity (no activation)"],
          ["Hidden layer(s)", "Learn non-linear feature representations", "Tunable: 64, 128, 256, 512…", "ReLU (default), tanh, GELU"],
          ["Output layer", "Produces final prediction", "= number of classes / 1 for regression", "Sigmoid, Softmax, Linear"],
        ]}
      />

      <H2>Architecture modifications and their effects</H2>
      <Grid cols={2}>
        {[
          { mod: "Increase depth (more layers)", effect: "More abstract representations; can model more complex functions; risk of vanishing gradients", color: "info" },
          { mod: "Increase width (more neurons/layer)", effect: "Larger function class; more parameters; diminishing returns after a point; better for wide shallow tasks", color: "info" },
          { mod: "Add Batch Normalization", effect: "Stabilizes training; allows higher learning rates; reduces internal covariate shift; acts as regularizer", color: "success" },
          { mod: "Add Dropout(p)", effect: "Regularization; prevents co-adaptation; equivalent to training ensemble of 2^N networks; use p=0.3–0.5", color: "success" },
          { mod: "Residual connections (skip)", effect: "Solves vanishing gradient for very deep nets; identity shortcut ensures gradient flow; enables 100+ layer training", color: "warning" },
          { mod: "Change activation to ReLU", effect: "Sparse activations; no vanishing gradient in positive region; faster training; may cause dead neurons", color: "warning" },
        ].map(({ mod, effect, color }) => (
          <Card key={mod} color={color} title={mod}>
            {effect}
          </Card>
        ))}
      </Grid>

      <H2>Performance comparison: perceptron vs MLP</H2>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ background: "var(--color-background-secondary)" }}>
              {["Task / dataset", "Single perceptron", "1-hidden-layer MLP", "Deep MLP (3+ layers)"].map(h => (
                <th key={h} style={{ padding: "7px 12px", textAlign: "left", borderBottom: "0.5px solid var(--color-border-tertiary)", fontWeight: 500 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ["Linearly separable (AND, OR)", "100%", "100%", "100%"],
              ["XOR", "75% max (wrong)", "100%", "100%"],
              ["MNIST digits", "~92%", "~97%", "~99%"],
              ["Concentric circles", "~50% (random)", "~98%", "~99%"],
              ["Complex tabular data", "~60–70%", "~80–90%", "~85–95%"],
            ].map(([task, ...cols], i) => (
              <tr key={task} style={{ background: i % 2 ? "var(--color-background-secondary)" : "transparent" }}>
                <td style={{ padding: "7px 12px", fontWeight: 500, fontSize: 12.5, color: "var(--color-text-primary)" }}>{task}</td>
                {cols.map((c, j) => (
                  <td key={j} style={{ padding: "7px 12px", fontSize: 12.5, color: c.includes("wrong") ? "var(--color-text-danger)" : c === "100%" || c.startsWith("~99") ? "var(--color-text-success)" : "var(--color-text-secondary)", fontFamily: "var(--font-mono)" }}>{c}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <H2>Interview Q&A</H2>
      <QA q="Why can a single hidden layer MLP theoretically approximate any function, yet deep MLPs are preferred?"
          a="The Universal Approximation Theorem (Cybenko 1989, Hornik 1991) guarantees that a 1-hidden-layer MLP with enough neurons can approximate any continuous function on a compact domain. However, 'enough neurons' may be <em>exponentially many</em> for complex functions. Depth provides an exponentially more efficient parameterization — a deep network can approximate exponentially more functions with the same number of parameters. Additionally, depth enables hierarchical feature reuse (each layer builds on the previous), regularization via compositionality, and better empirical generalization." />
      <QA q="What is the 'dying ReLU' problem and how do you fix it?"
          a="A ReLU neuron dies when its pre-activation z is permanently negative for all inputs, producing zero output and zero gradient. Once dead, the neuron never receives a gradient and never updates — it's frozen. Causes: large negative bias initialized or large learning rate pushing weights negative. Fixes: (1) Leaky ReLU: f(z) = max(αz, z) with α≈0.01 — always has non-zero gradient, (2) Parametric ReLU (PReLU): α is learned, (3) ELU: f(z) = z if z>0 else α(e^z − 1) — smooth and non-zero everywhere, (4) careful weight initialization and learning rate scheduling." />
      <QA q="How does Batch Normalization help training deep MLPs?"
          a="Batch Normalization (Ioffe & Szegedy, 2015) normalizes the pre-activations of each layer to have zero mean and unit variance across the mini-batch, then applies learned scale (γ) and shift (β) parameters. Benefits: (1) Reduces internal covariate shift — subsequent layers see a more stable distribution, (2) allows higher learning rates — less sensitivity to initialization, (3) acts as a regularizer — reduces need for dropout, (4) smooths the loss landscape. The key formula is: BN(z) = γ·(z − μ_B)/√(σ²_B + ε) + β." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 2 — FORWARD PROPAGATION
══════════════════════════════════════════════════════ */
function SectionForward() {
  return (
    <div>
      <P>Forward propagation is the process of computing the output of a neural network given an input — passing data from input to output, layer by layer, applying the learned weight matrices and activation functions.</P>

      <H2>Notation guide</H2>
      <Note color="info" icon="ti-code">
        Consistent notation is critical for understanding backpropagation later. Memorize these conventions.
      </Note>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ background: "var(--color-background-secondary)" }}>
              {["Symbol", "Meaning", "Shape"].map(h => (
                <th key={h} style={{ padding: "7px 12px", textAlign: "left", borderBottom: "0.5px solid var(--color-border-tertiary)", fontWeight: 500 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ["L", "Total number of layers (excluding input)", "scalar"],
              ["nˡ", "Number of neurons in layer l", "scalar"],
              ["x = a⁽⁰⁾", "Input vector (activation of layer 0)", "ℝ^(n⁰)"],
              ["W⁽ˡ⁾", "Weight matrix of layer l", "ℝ^(nˡ × nˡ⁻¹)"],
              ["w⁽ˡ⁾_{jk}", "Weight from neuron k in layer l−1 to neuron j in layer l", "scalar"],
              ["b⁽ˡ⁾", "Bias vector of layer l", "ℝ^(nˡ)"],
              ["z⁽ˡ⁾", "Pre-activation (weighted sum) of layer l", "ℝ^(nˡ)"],
              ["a⁽ˡ⁾", "Post-activation of layer l", "ℝ^(nˡ)"],
              ["f⁽ˡ⁾", "Activation function of layer l", "ℝ → ℝ (applied element-wise)"],
              ["ŷ = a⁽ᴸ⁾", "Final output (prediction)", "ℝ^(nᴸ)"],
            ].map(([sym, mean, shape], i) => (
              <tr key={sym} style={{ background: i % 2 ? "var(--color-background-secondary)" : "transparent" }}>
                <td style={{ padding: "7px 12px", fontFamily: "var(--font-mono)", fontSize: 12.5, fontWeight: 500, color: "var(--color-text-primary)" }}>{sym}</td>
                <td style={{ padding: "7px 12px", fontSize: 12.5, color: "var(--color-text-secondary)" }}>{mean}</td>
                <td style={{ padding: "7px 12px", fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--color-text-secondary)" }}>{shape}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <H2>The forward pass equations</H2>
      <Mx block>{`  For each layer l = 1, 2, ..., L:

    z⁽ˡ⁾ = W⁽ˡ⁾ · a⁽ˡ⁻¹⁾  +  b⁽ˡ⁾      ← linear transform
    a⁽ˡ⁾ = f⁽ˡ⁾(z⁽ˡ⁾)                   ← non-linear activation

  Initial condition:
    a⁽⁰⁾ = x                              ← input is layer-0 activation

  Output:
    ŷ = a⁽ᴸ⁾                             ← last layer's activation

  Full pass (composition notation):
    ŷ = f⁽ᴸ⁾(W⁽ᴸ⁾ · f⁽ᴸ⁻¹⁾(... f⁽¹⁾(W⁽¹⁾·x + b⁽¹⁾) ...) + b⁽ᴸ⁾)`}</Mx>

      <H2>Why z and a are stored separately</H2>
      <Note color="warning" icon="ti-alert-triangle">
        During training, both z⁽ˡ⁾ and a⁽ˡ⁾ must be cached for every layer during the forward pass. Backpropagation needs them to compute gradients. Storing only a⁽ˡ⁾ is insufficient because ∂L/∂z⁽ˡ⁾ requires knowing f′(z⁽ˡ⁾).
      </Note>

      <H2>Step-by-step traced example: 2 → 3 → 1 network</H2>
      <P>Network: 2 input features, 3 hidden neurons (tanh), 1 output (sigmoid). Walk through each computation step using the buttons below.</P>
      <ForwardPropTracer />

      <H2>Matrix form: full mini-batch forward pass</H2>
      <P>In practice, we process a mini-batch of m samples simultaneously using matrix operations:</P>
      <Mx block>{`  Let X ∈ ℝ^(m × n⁰) be a mini-batch of m samples.
  
  Transposed convention (batch dimension first):

  Z⁽ˡ⁾ = A⁽ˡ⁻¹⁾ · W⁽ˡ⁾ᵀ  +  b⁽ˡ⁾     (b is broadcast over m rows)
  A⁽ˡ⁾ = f⁽ˡ⁾(Z⁽ˡ⁾)

  Where:
    A⁽ˡ⁻¹⁾ ∈ ℝ^(m × nˡ⁻¹)     (m activations from previous layer)
    W⁽ˡ⁾   ∈ ℝ^(nˡ × nˡ⁻¹)    (weight matrix)
    Z⁽ˡ⁾   ∈ ℝ^(m × nˡ)        (pre-activations for whole batch)
    A⁽ˡ⁾   ∈ ℝ^(m × nˡ)        (activations for whole batch)

  Computational advantage: one BLAS (matrix multiply) call
  processes all m samples in parallel on GPU.`}</Mx>

      <H2>Computational complexity</H2>
      <Mx block>{`  Single forward pass through one fully-connected layer:
    FLOPs ≈ 2 · nˡ · nˡ⁻¹       (multiply-add for each weight)
                                   (bias adds: + nˡ)

  Full network, one sample:
    FLOPs ≈ 2 · Σˡ nˡ · nˡ⁻¹

  Example — [784, 256, 128, 10]:
    Layer 1: 2 · 256 · 784  =  401,408
    Layer 2: 2 · 128 · 256  =   65,536
    Layer 3: 2 ·  10 · 128  =    2,560
    Total:                     ~470K FLOPs per sample

  Mini-batch of 32:  ~15M FLOPs — trivial on GPU.
  Compare ResNet-50: ~4 billion FLOPs per image!`}</Mx>

      <H2>Implementation: vectorized forward pass from scratch</H2>
      <Code>{`import numpy as np

class MLP:
    """
    MLP with configurable architecture.
    Caches z and a at each layer for use in backpropagation.
    """
    def __init__(self, layer_dims, activations):
        """
        layer_dims : [n₀, n₁, ..., nL]  (includes input dimension)
        activations: list of L strings  (one per non-input layer)
                     e.g. ['relu', 'relu', 'sigmoid']
        """
        assert len(layer_dims) - 1 == len(activations)
        self.L = len(layer_dims) - 1
        self.activations = activations
        self.params = {}

        # He initialization for ReLU, Xavier for tanh/sigmoid
        for l in range(1, self.L + 1):
            n_in, n_out = layer_dims[l - 1], layer_dims[l]
            act = activations[l - 1]
            if act == 'relu':
                scale = np.sqrt(2.0 / n_in)       # He initialization
            else:
                scale = np.sqrt(1.0 / n_in)       # Xavier initialization
            self.params[f'W{l}'] = np.random.randn(n_out, n_in) * scale
            self.params[f'b{l}'] = np.zeros((n_out, 1))

    def _activate(self, z, fn):
        if fn == 'relu':    return np.maximum(0, z)
        if fn == 'sigmoid': return 1 / (1 + np.exp(-np.clip(z, -500, 500)))
        if fn == 'tanh':    return np.tanh(z)
        if fn == 'softmax':
            e = np.exp(z - z.max(axis=0, keepdims=True))
            return e / e.sum(axis=0, keepdims=True)
        if fn == 'linear':  return z
        raise ValueError(f"Unknown activation: {fn}")

    def forward(self, X):
        """
        X: (n_features, m)  column-per-sample convention

        Returns ŷ and caches (Z, A) per layer for backprop.
        Cache layout: cache[l] = (Z^(l), A^(l))
                      cache[0] = (None, X)
        """
        self.cache = {0: (None, X)}
        A = X                           # a⁽⁰⁾ = x

        for l in range(1, self.L + 1):
            W = self.params[f'W{l}']
            b = self.params[f'b{l}']

            Z = W @ A + b               # z⁽ˡ⁾ = W⁽ˡ⁾ · a⁽ˡ⁻¹⁾ + b⁽ˡ⁾
            A = self._activate(Z, self.activations[l - 1])
            self.cache[l] = (Z, A)      # store for backprop!

        return A                        # ŷ = a⁽ᴸ⁾

    def predict(self, X, threshold=0.5):
        y_hat = self.forward(X)
        if self.activations[-1] == 'sigmoid':
            return (y_hat >= threshold).astype(int)
        return np.argmax(y_hat, axis=0)

# ─── Usage ───────────────────────────────────────────────
np.random.seed(42)
model = MLP(
    layer_dims=[2, 4, 4, 1],
    activations=['relu', 'relu', 'sigmoid']
)

# XOR data
X_xor = np.array([[-1,-1,-1,1], [-1,1,-1,1]], dtype=float)
print("Input shape:", X_xor.shape)  # (2, 4) — 2 features, 4 samples

y_hat = model.forward(X_xor)
print("Output shape:", y_hat.shape)  # (1, 4) — 1 output per sample
print("Raw outputs:", y_hat.round(4))

# Inspect cache
for l in range(1, model.L + 1):
    Z, A = model.cache[l]
    print(f"Layer {l}: Z shape={Z.shape}, A shape={A.shape}")`}</Code>

      <H2>Forward pass in PyTorch — under the hood</H2>
      <Code>{`import torch
import torch.nn as nn

# PyTorch's nn.Linear computes: output = input @ W.T + b
# This is exactly z⁽ˡ⁾ = W⁽ˡ⁾ · a⁽ˡ⁻¹⁾ + b⁽ˡ⁾

class MLP_Torch(nn.Module):
    def __init__(self, dims, acts):
        super().__init__()
        act_map = {'relu': nn.ReLU, 'tanh': nn.Tanh,
                   'sigmoid': nn.Sigmoid, 'gelu': nn.GELU}
        layers = []
        for i in range(len(dims) - 1):
            layers.append(nn.Linear(dims[i], dims[i+1]))
            if i < len(acts):
                layers.append(act_map[acts[i]]())
        self.net = nn.Sequential(*layers)

    def forward(self, x):
        return self.net(x)   # PyTorch builds the graph automatically

model = MLP_Torch([2, 64, 64, 1], ['relu', 'relu', 'sigmoid'])
x = torch.tensor([[0.5, 0.8]], dtype=torch.float32)  # (1, 2)
with torch.no_grad():
    y = model(x)
    print(f"ŷ = {y.item():.6f}")

# See the full computation graph
from torchinfo import summary           # pip install torchinfo
summary(model, input_size=(1, 2))

# PyTorch hooks: inspect intermediate activations
activations = {}
def make_hook(name):
    def hook(module, input, output):
        activations[name] = output.detach()
    return hook

for name, layer in model.net.named_modules():
    if isinstance(layer, nn.Linear):
        layer.register_forward_hook(make_hook(name))

_ = model(x)
for name, act in activations.items():
    print(f"  {name}: {act.squeeze().numpy().round(4)}")`}</Code>

      <H2>Interview Q&A</H2>
      <QA q="What is the difference between z⁽ˡ⁾ and a⁽ˡ⁾, and why must both be cached?"
          a="z⁽ˡ⁾ is the <em>pre-activation</em> (raw weighted sum): z⁽ˡ⁾ = W⁽ˡ⁾·a⁽ˡ⁻¹⁾ + b⁽ˡ⁾. a⁽ˡ⁾ is the <em>post-activation</em>: a⁽ˡ⁾ = f(z⁽ˡ⁾). Both must be cached because during backpropagation, the gradient through a layer requires f′(z⁽ˡ⁾) — the derivative of the activation evaluated at the pre-activation, not the activation itself. For ReLU, f′(z) = 1 if z > 0 else 0 — this cannot be recovered from a⁽ˡ⁾ alone (you can't distinguish a⁽ˡ⁾=0 from dead neuron vs. z slightly negative)." />
      <QA q="What is the computational bottleneck of the forward pass in a large MLP?"
          a="The matrix multiplication W⁽ˡ⁾ · A⁽ˡ⁻¹⁾ dominates — it is O(nˡ × nˡ⁻¹ × m) per layer (m = batch size). For large hidden dimensions (e.g., 4096), this is billions of FLOPs. This is why GPUs are essential — their thousands of cores can compute large GEMMs (General Matrix Multiplications) in parallel. Memory bandwidth is also critical: weights must be loaded from GPU VRAM for every forward pass, making memory-bound layers a bottleneck." />
      <QA q="Why do we use mini-batch training rather than computing the loss on one sample at a time?"
          a="Three reasons: (1) <strong>Efficiency</strong> — processing m samples simultaneously as a matrix multiply achieves near-linear speedup on GPUs rather than m sequential calls. (2) <strong>Gradient stability</strong> — the gradient estimate from a mini-batch has lower variance than a single sample (stochastic) gradient, giving more reliable update directions. (3) <strong>Generalization</strong> — the noise from mini-batch sampling acts as implicit regularization (similar to adding noise to the gradient), often improving test performance versus full-batch gradient descent." />
      <QA q="How does weight initialization affect the forward pass in a deep MLP?"
          a="Poor initialization causes either vanishing (outputs → 0) or exploding (outputs → ∞) activations in the forward pass, which then causes corresponding vanishing or exploding gradients in the backward pass. If all weights are initialized to the same value (e.g., 0), all neurons compute the same output and receive the same gradient — symmetry is never broken and all neurons learn the same function. Correct strategies: Xavier initialization (σ² = 2/(n_in + n_out)) for tanh/sigmoid, He initialization (σ² = 2/n_in) for ReLU — both ensure the variance of activations is approximately preserved through each layer." />
      <QA q="What does nn.Linear actually compute, and how does it correspond to the matrix equations?"
          a="nn.Linear(n_in, n_out) stores weight W of shape (n_out, n_in) and bias b of shape (n_out,). Its forward call computes: output = input @ W.T + b. This is exactly z = W · aᵀ transposed to batch-first convention: for input of shape (batch, n_in), output is (batch, n_out). The weights are stored transposed relative to the mathematical convention W⁽ˡ⁾ ∈ ℝ^(n_out × n_in) so that @ W.T performs the standard row-vector × matrix multiply." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   ROOT
══════════════════════════════════════════════════════ */
const TABS = [
  { id: "mlp", label: "MLP Intuition" },
  { id: "fwd", label: "Forward Propagation" },
];

export default function MLPForward() {
  const [active, setActive] = useState("mlp");
  const map = { mlp: <SectionMLP />, fwd: <SectionForward /> };

  return (
    <div>
      <div className="page-header">
        <div className="page-header-eyebrow">Deep Learning — Module 03</div>
        <h1 className="page-header-title">Multi-Layer Perceptrons & Forward Propagation</h1>
        <p className="page-header-subtitle">Architecture intuition · Full notation system · Step-by-step numerical trace · Vectorized implementation</p>
      </div>

      <SectionNav tabs={TABS} active={active} onChange={setActive} />

      <div style={{ padding: "0.5rem 0 2rem" }}>
        {map[active]}
      </div>

      <NavButtons moduleId={3} />
    </div>
  );
}
