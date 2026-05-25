import { useState } from 'react';
import Code from '../components/ui/Code.jsx';
import { Mx, H2, H3, P } from '../components/ui/Typography.jsx';
import QA from '../components/ui/QA.jsx';
import { Note, Table, Grid, Card, Badge } from '../components/ui/Primitives.jsx';
import SectionNav from '../components/layout/SectionNav.jsx';
import NavButtons from '../components/layout/NavButtons.jsx';

const TABS = [
  { id: 'def',     label: 'What is DL?',         sub: 'Definition & biology' },
  { id: 'nn',      label: 'Neural Networks',      sub: 'Anatomy & equations'  },
  { id: 'mldl',    label: 'ML vs DL',             sub: 'Comparison'           },
  { id: 'arch',    label: 'Architectures',         sub: 'ANN, CNN, RNN, GAN'   },
  { id: 'hier',    label: 'Hierarchical Features', sub: 'Representation'       },
  { id: 'history', label: 'The DL Revolution',    sub: 'Timeline'             },
];

/* ─────────────────── Section: What is DL? ─────────────────── */
function SectionDef() {
  return (
    <div>
      <P c="Deep Learning (DL) is a subfield of Machine Learning that uses <strong>multi-layered neural networks</strong> to learn hierarchical representations of data — automatically extracting features from raw input without explicit programming." />

      <Grid cols={3} gap={12}>
        <Card color="info" title="Artificial Intelligence">Simulating human intelligence broadly.</Card>
        <Card color="success" title="Machine Learning">Learning patterns from data.</Card>
        <Card color="purple" title="Deep Learning">Multi-layer feature learning from raw data.</Card>
      </Grid>

      <H2 c="Biological Inspiration" />
      <P c="A biological neuron receives signals via <em>dendrites</em>, integrates them in the <em>soma</em>, and fires if a threshold is exceeded. An artificial neuron mirrors this:" />
      <Mx block>{`  z = Σᵢ wᵢ·xᵢ + b     (weighted sum)
  a = f(z)             (activation / "fire?")`}</Mx>
      <P c="Where <Mx>wᵢ</Mx> = synaptic weights, <Mx>xᵢ</Mx> = inputs, <Mx>b</Mx> = bias, and <Mx>f</Mx> = activation function (ReLU, sigmoid, tanh…)" />

      <H2 c="What makes DL 'deep'?" />
      <P c="The word <em>deep</em> refers to the number of hidden layers. Depth lets the network approximate complex functions <em>efficiently</em> with fewer parameters than a wide shallow network." />
      <Mx block>{`  Universal Approximation Theorem (Cybenko, 1989):
  A 1-hidden-layer network with sigmoid activations can approximate
  any continuous function f: Rⁿ → R on a compact domain,
  given enough hidden units.`}</Mx>
      <Note color="warning" icon="ti-alert-triangle">UAT says "can", not "easily trained." Depth is the practical solution.</Note>

      <H2 c="Interview Q&A" />
      <QA q="What is the difference between AI, ML, and DL?"
          a="AI is the broad discipline of making machines behave intelligently. ML is a subset of AI that learns patterns from data rather than following hard-coded rules. DL is a subset of ML using multi-layer neural networks — it automates feature extraction, making it especially powerful for unstructured data like images, audio, and text." />
      <QA q="Why does depth help more than width in practice?"
          a="A deep network can compose simple functions layer by layer, learning increasingly abstract representations with an exponentially richer function class. Adding width helps, but the function class grows only polynomially. Empirically, depth generalizes better and requires fewer parameters for the same expressive power." />
      <QA q="Is the Universal Approximation Theorem a justification for using deep networks?"
          a="No — it's often misused. UAT shows a 1-hidden-layer network *can* approximate any continuous function, but it may require exponentially many neurons. Depth provides a more parameter-efficient and empirically tractable path. UAT is a theoretical lower bound, not a design principle." />
    </div>
  );
}

/* ─────────────────── Section: Neural Networks ─────────────── */
function SectionNN() {
  return (
    <div>
      <H2 c="Anatomy of a feedforward network" />
      <P c="A standard ANN stacks layers: an <strong>input layer</strong>, one or more <strong>hidden layers</strong>, and an <strong>output layer</strong>." />

      <H3 c="Forward pass equations" />
      <Mx block>{`  Layer l:
    z⁽ˡ⁾ = W⁽ˡ⁾ · a⁽ˡ⁻¹⁾ + b⁽ˡ⁾      (linear transform)
    a⁽ˡ⁾ = f⁽ˡ⁾(z⁽ˡ⁾)               (element-wise activation)

  Dimensions:
    W⁽ˡ⁾ ∈ ℝ^(nˡ × nˡ⁻¹)
    b⁽ˡ⁾ ∈ ℝ^nˡ
    a⁽⁰⁾ = x  (input vector)`}</Mx>

      <H3 c="Common activation functions" />
      <Table
        heads={['Function', 'Formula', 'Range', 'Key property']}
        rows={[
          ['ReLU',       'max(0, z)',                 '[0, ∞)',       'Sparse, avoids vanishing grad, default choice'],
          ['Leaky ReLU', 'max(αz, z), α≪1',           '(-∞, ∞)',     'Prevents dead neurons (α ≈ 0.01)'],
          ['Sigmoid',    '1 / (1 + e⁻ᶻ)',             '(0, 1)',       'Output as probability; saturates → vanishing grad'],
          ['Tanh',       '(eᶻ - e⁻ᶻ)/(eᶻ + e⁻ᶻ)',  '(-1, 1)',      'Zero-centered; still saturates'],
          ['Softmax',    'eᶻⁱ / Σⱼ eᶻʲ',             '(0,1) Σ=1',  'Multi-class output layer'],
          ['GELU',       'z·Φ(z)',                    '≈ ReLU',       'Used in Transformers; smooth'],
        ]}
      />

      <H3 c="Loss functions" />
      <Mx block>{`  MSE (regression):   L = (1/n) Σᵢ (yᵢ - ŷᵢ)²
  
  Binary cross-entropy (classification, σ output):
    L = -(1/n) Σᵢ [yᵢ log(ŷᵢ) + (1-yᵢ) log(1-ŷᵢ)]
  
  Categorical cross-entropy (softmax output):
    L = -(1/n) Σᵢ Σₖ yᵢₖ log(ŷᵢₖ)`}</Mx>

      <H3 c="Implementation" />
      <Code>{`import torch
import torch.nn as nn

class FeedforwardNet(nn.Module):
    def __init__(self, input_dim, hidden_dims, output_dim):
        super().__init__()
        layers = []
        prev = input_dim
        for h in hidden_dims:
            layers += [nn.Linear(prev, h), nn.ReLU()]
            prev = h
        layers.append(nn.Linear(prev, output_dim))
        self.net = nn.Sequential(*layers)
    
    def forward(self, x):
        return self.net(x)          # logits (no softmax here)

# Instantiate
model = FeedforwardNet(784, [256, 128], 10)

# Training step
criterion = nn.CrossEntropyLoss()   # includes softmax internally
optimizer = torch.optim.Adam(model.parameters(), lr=1e-3)

def train_step(x, y):
    optimizer.zero_grad()
    logits = model(x)               # shape: [batch, 10]
    loss = criterion(logits, y)
    loss.backward()                 # backprop
    optimizer.step()
    return loss.item()`}</Code>

      <H3 c="Parameter count" />
      <Mx block>{`  For a layer (nˡ⁻¹ → nˡ):
    weights: nˡ × nˡ⁻¹
    biases:  nˡ
    total:   nˡ × (nˡ⁻¹ + 1)

  Example: 784 → 256 → 128 → 10
    784→256:  256×(784+1) = 200,960
    256→128:  128×(256+1) = 32,896
    128→10:    10×(128+1) = 1,290
    Total:  ≈ 235,146 parameters`}</Mx>

      <H2 c="Interview Q&A" />
      <QA q="Why does ReLU outperform sigmoid/tanh in deep networks?"
          a="Sigmoid and tanh saturate (gradient ≈ 0) for large |z|, causing vanishing gradients in deep networks. ReLU's gradient is exactly 1 for z > 0, allowing clean gradient flow. It also produces sparse activations (≈50% neurons inactive), which acts as implicit regularization." />
      <QA q="What is the vanishing gradient problem?"
          a="In a deep network, gradients are multiplied across layers during backprop (chain rule). If each layer's gradient is < 1 (as with sigmoid whose derivative ≤ 0.25), the product shrinks exponentially with depth, making early layers learn extremely slowly or not at all. Solutions: ReLU, residual connections, batch normalization, careful weight initialization (He/Xavier)." />
      <QA q="What is the difference between parameters and hyperparameters?"
          a="Parameters (weights W, biases b) are learned during training via gradient descent. Hyperparameters (learning rate, number of layers, hidden size, activation choice, batch size) are set before training and control the learning process. They're tuned via search strategies (grid, random, Bayesian)." />
      <QA q="Why is bias important in a neural network?"
          a="Without bias, every neuron's activation function is centered at the origin — the decision boundary always passes through zero. Bias lets the network shift activation functions horizontally. Mathematically, it makes each layer an affine (not merely linear) transformation." />
    </div>
  );
}

/* ─────────────────── Section: ML vs DL ──────────────────── */
function SectionMLDL() {
  return (
    <div>
      <P c="Both ML and DL learn from data. The key distinction is <strong>feature engineering</strong>: ML requires human-crafted features; DL learns them end-to-end." />

      <H2 c="Detailed comparison" />
      <Table
        heads={['Dimension', 'Classical ML', 'Deep Learning']}
        rows={[
          ['Feature engineering',             'Manual, domain expert required',           'Automatic, learned from raw data'],
          ['Data requirements',               'Works well on small/medium (~1K–100K)',     'Needs large datasets (100K–millions+)'],
          ['Compute',                         'CPU, minutes–hours',                        'GPU/TPU, hours–weeks'],
          ['Interpretability',                'High (decision tree, linear model)',         'Low — often a "black box"'],
          ['Performance on structured data',  'Often better (XGBoost, RF)',               'Comparable or worse'],
          ['Performance on unstructured',     'Requires hand-crafted features',           'State-of-the-art (images, text, audio)'],
          ['Transfer learning',               'Limited',                                   'Very powerful (pretrained models)'],
        ]}
      />

      <H2 c="When to use each" />
      <Grid cols={2} gap={12}>
        <Card color="success" title="Use classical ML when…">
          Data &lt; 50K · Structured/tabular data · Need interpretability · Limited compute · Fast iteration required
        </Card>
        <Card color="info" title="Use DL when…">
          Data &gt; 100K · Images, text, audio · Raw features hard to engineer · GPU available · Transfer learning can help
        </Card>
      </Grid>

      <H2 c="Interview Q&A" />
      <QA q="Why does XGBoost still beat deep learning on tabular data?"
          a="Tabular datasets tend to be small, have mixed feature types, and contain hand-engineered signals that tree ensembles exploit naturally. XGBoost handles missing data, categorical variables, and feature interactions natively. DL on tabular data needs careful architecture design, large amounts of data to generalize, and doesn't implicitly respect feature semantics. Multiple Kaggle benchmarks confirm tree ensembles dominate tabular tasks." />
      <QA q="Is deep learning always better than machine learning?"
          a="No. DL is a specialized tool. For tabular/structured data with < 50K rows, tree ensembles (XGBoost, LightGBM) typically win. DL shines on high-dimensional unstructured data (images, text, audio) where manual feature engineering is intractable and massive datasets exist. The choice should be driven by data type, size, interpretability needs, and compute constraints." />
    </div>
  );
}

/* ─────────────────── Section: Architectures ───────────────── */
function SectionArch() {
  const archs = [
    {
      name: 'ANN / MLP', badge: 'tabular / general', color: 'info',
      desc: 'The general-purpose building block. Fully connected layers with no inductive bias.',
      when: 'Classification, regression on tabular data; output heads of larger models.',
      math: `  y = f_L(W_L · f_{L-1}(... f_1(W_1·x + b_1) ...) + b_L)
  Complexity: O(n_in × n_hidden) per layer`,
      code: `# Minimal MLP in PyTorch
model = nn.Sequential(
    nn.Linear(128, 256), nn.ReLU(), nn.Dropout(0.3),
    nn.Linear(256, 128), nn.ReLU(),
    nn.Linear(128, 10)
)`,
      limit: "Doesn't exploit spatial/temporal structure — needs flat input.",
    },
    {
      name: 'CNN', badge: 'vision / audio', color: 'success',
      desc: 'Exploits spatial locality and translation equivariance via shared convolutional filters.',
      when: 'Image classification, object detection, segmentation.',
      math: `  (I * K)[i,j] = Σ_m Σ_n I[i+m, j+n] · K[m,n]
  
  Output size: ⌊(W - F + 2P)/S⌋ + 1
  Parameter sharing: one 3×3 filter has only 9 weights`,
      code: `class SimpleCNN(nn.Module):
    def __init__(self):
        super().__init__()
        self.features = nn.Sequential(
            nn.Conv2d(3, 32, 3, padding=1), nn.BatchNorm2d(32), nn.ReLU(),
            nn.MaxPool2d(2),
            nn.Conv2d(32, 64, 3, padding=1), nn.BatchNorm2d(64), nn.ReLU(),
            nn.MaxPool2d(2),
        )
        self.classifier = nn.Sequential(
            nn.AdaptiveAvgPool2d(1), nn.Flatten(), nn.Linear(64, 10)
        )
    def forward(self, x): return self.classifier(self.features(x))`,
      limit: 'Not naturally suited to sequential/variable-length data.',
    },
    {
      name: 'RNN / LSTM', badge: 'sequences', color: 'warning',
      desc: 'Processes sequences by maintaining a hidden state updated at each timestep. LSTM/GRU solve vanishing gradient over long sequences.',
      when: 'Language modeling, time-series, speech. (Largely replaced by Transformers for NLP.)',
      math: `  Vanilla RNN:  h_t = tanh(W_h·h_{t-1} + W_x·x_t + b)
  LSTM gates:
    f_t = σ(W_f·[h_{t-1},x_t]+b_f)   (forget)
    i_t = σ(W_i·[h_{t-1},x_t]+b_i)   (input)
    c_t = f_t⊙c_{t-1} + i_t⊙tanh(W_c·[h_{t-1},x_t]+b_c)
    h_t = σ(W_o·[h_{t-1},x_t]+b_o)⊙tanh(c_t)`,
      code: `class LSTMClassifier(nn.Module):
    def __init__(self, vocab_size, embed_dim, hidden, n_class):
        super().__init__()
        self.embed = nn.Embedding(vocab_size, embed_dim)
        self.lstm  = nn.LSTM(embed_dim, hidden, batch_first=True, num_layers=2, dropout=0.3)
        self.fc    = nn.Linear(hidden, n_class)
    def forward(self, x):
        e = self.embed(x)
        out, (h, c) = self.lstm(e)
        return self.fc(h[-1])`,
      limit: 'Sequential computation prevents parallelization; struggles with very long-range dependencies.',
    },
    {
      name: 'GAN', badge: 'generative', color: 'danger',
      desc: 'Two networks trained adversarially: Generator creates fakes, Discriminator distinguishes real from fake.',
      when: 'Image synthesis, data augmentation, style transfer.',
      math: `  Minimax (Goodfellow et al., 2014):
  min_G max_D V(D,G) = 𝔼_{x~p_data}[log D(x)] + 𝔼_{z~p_z}[log(1-D(G(z)))]
  At Nash equilibrium: D(x) = 1/2 everywhere`,
      code: `criterion = nn.BCELoss()
def train_gan_step(real, G, D, opt_G, opt_D, latent_dim):
    batch = real.size(0)
    real_labels, fake_labels = torch.ones(batch,1), torch.zeros(batch,1)
    # Train D
    z = torch.randn(batch, latent_dim)
    fake = G(z).detach()
    loss_D = criterion(D(real), real_labels) + criterion(D(fake), fake_labels)
    opt_D.zero_grad(); loss_D.backward(); opt_D.step()
    # Train G
    z = torch.randn(batch, latent_dim)
    loss_G = criterion(D(G(z)), real_labels)
    opt_G.zero_grad(); loss_G.backward(); opt_G.step()`,
      limit: 'Training instability (mode collapse). Largely superseded by diffusion models.',
    },
  ];

  return (
    <div>
      <P>Four foundational architectures that underpin most modern DL systems.</P>
      {archs.map(({ name, badge, color, desc, when, math, code, limit }) => (
        <div key={name} style={{ border: '1px solid var(--color-border-tertiary)', borderRadius: 'var(--border-radius-lg)', padding: '1rem 1.25rem', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <span style={{ fontWeight: 500, fontSize: 15, color: 'var(--color-text-primary)' }}>{name}</span>
            <Badge color={color}>{badge}</Badge>
          </div>
          <P>{desc}</P>
          <div style={{ fontSize: 12.5, color: 'var(--color-text-secondary)', marginBottom: 8 }}>
            <strong style={{ color: 'var(--color-text-primary)' }}>Best for: </strong>{when}
          </div>
          <Mx block>{math}</Mx>
          <Code>{code}</Code>
          <Note color="warning" icon="ti-alert-triangle">{limit}</Note>
        </div>
      ))}

      <H2 c="Comparative overview" />
      <Table
        heads={['Architecture', 'Inductive bias', 'Input type', 'Key operation', 'Params']}
        rows={[
          ['MLP/ANN',     'None (fully connected)',   'Fixed-size vectors',  'Matrix multiply',          '100K–10M'],
          ['CNN',         'Translation equivariance', 'Grids (images)',       'Convolution + pooling',    '1M–100M'],
          ['RNN/LSTM',    'Sequential order matters', 'Variable sequences',   'Hidden state recurrence',  '1M–50M'],
          ['GAN',         'Adversarial game',          'Latent noise → data', 'Generator + Discriminator','10M–200M'],
          ['Transformer', 'Attention (no locality)',  'Sequences (tokens)',   'Self-attention',           '100M–1T+'],
        ]}
      />

      <H2 c="Interview Q&A" />
      <QA q="Why do CNNs use parameter sharing, and what does it assume?"
          a="A convolutional filter is applied at every spatial location, sharing the same weights. This assumes translation equivariance — the same feature (e.g., an edge) is meaningful wherever it appears in the image. This reduces parameters from O(H·W·C) per neuron to O(F²·C) per filter, enabling much deeper networks on high-resolution inputs." />
      <QA q="What problem do LSTM gates solve compared to vanilla RNNs?"
          a="Vanilla RNNs suffer from vanishing gradients over long sequences because gradients are multiplied by W_h at each step — if its largest eigenvalue < 1, gradients shrink exponentially. LSTMs introduce a cell state c_t with additive updates (not multiplicative) and gating mechanisms (forget, input, output gates) that let the network learn what to remember and what to discard over arbitrary time spans." />
      <QA q="Why have Transformers largely replaced RNNs for NLP?"
          a="Two main reasons: (1) Parallelization — RNNs process tokens sequentially, making GPU utilization poor. Transformers compute all-pairs attention in parallel. (2) Long-range dependencies — self-attention has O(1) path length between any two tokens (vs O(n) for RNNs), making it much easier to learn long-range relationships." />
    </div>
  );
}

/* ─────────────────── Section: Hierarchical Features ───────── */
function SectionHier() {
  return (
    <div>
      <P c="Hierarchical feature extraction is the <em>defining</em> property of deep learning. Each layer transforms its input into progressively more abstract, semantically rich representations." />

      <H2 c="Mathematical view: composition of functions" />
      <Mx block>{`  A deep network is a composition of learned functions:
  F(x) = f_L ∘ f_{L-1} ∘ ... ∘ f_2 ∘ f_1 (x)

  Key insight: non-linearity is essential.
  Without it: the whole network collapses to a single linear layer.`}</Mx>

      <H2 c="Transfer learning — reusing hierarchical features" />
      <P>Lower layers learn universal low-level features (edges, textures) reusable across tasks:</P>
      <Code>{`# Transfer learning with pretrained ResNet
import torchvision.models as models

backbone = models.resnet50(pretrained=True)

# Freeze early layers (generic features)
for name, param in backbone.named_parameters():
    if 'layer4' not in name and 'fc' not in name:
        param.requires_grad = False

# Replace head for new task
backbone.fc = nn.Linear(backbone.fc.in_features, 5)

optimizer = torch.optim.Adam(
    filter(lambda p: p.requires_grad, backbone.parameters()), lr=1e-4
)`}</Code>

      <H2 c="Interview Q&A" />
      <QA q="What do the first and last layers of a deep network learn?"
          a="Early layers (near input) learn low-level, general features: edges, color gradients, simple textures. These are similar across architectures and datasets. Later layers learn highly task-specific, abstract representations: object parts, semantic attributes, class identities. This has been empirically verified by visualizing CNN filters (Zeiler & Fergus 2014)." />
      <QA q="Why is non-linearity essential in deep networks?"
          a="Without non-linear activation functions, composing multiple linear layers (Wₗ·Wₗ₋₁·...·W₁·x) collapses to a single matrix W = Wₗ·...·W₁. The network depth provides no benefit — it's equivalent to a linear model regardless of how many layers you stack." />
      <QA q="How does transfer learning exploit hierarchical features?"
          a="Since early layers learn generic, task-agnostic features (edges, textures), a network pretrained on a large dataset has already learned a rich feature extractor. For a new task with limited data, you freeze these early layers and fine-tune only the later task-specific layers. This prevents overfitting and dramatically reduces the data needed for good performance." />
    </div>
  );
}

/* ─────────────────── Section: History ─────────────────────── */
function SectionHistory() {
  const timeline = [
    { year: '1943', event: 'McCulloch–Pitts neuron — first mathematical model of a neuron' },
    { year: '1958', event: 'Perceptron (Rosenblatt) — first trainable single-layer network' },
    { year: '1969', event: "Minsky & Papert — XOR problem shows perceptron limits; first 'AI winter'" },
    { year: '1986', event: 'Backpropagation popularized (Rumelhart, Hinton, Williams)' },
    { year: '1989', event: "Universal Approximation Theorem (Cybenko); LeCun's LeNet" },
    { year: '2012', event: 'AlexNet wins ImageNet by 10.8% — the watershed moment' },
    { year: '2014', event: 'GANs (Goodfellow et al.); VGGNet; word2vec' },
    { year: '2015', event: 'ResNet — 152 layers, residual connections, surpasses human on ImageNet' },
    { year: '2017', event: "Transformer (Vaswani et al.) — 'Attention Is All You Need'" },
    { year: '2018–22', event: 'BERT, GPT series, ViT, DALL-E, diffusion models — scale era' },
    { year: '2023+', event: 'LLMs at scale (GPT-4, Gemini, Claude); multimodal foundation models' },
  ];

  return (
    <div>
      <P>The "deep learning revolution" required the convergence of data, compute, and algorithmic advances — decades in the making.</P>

      <H2 c="Key timeline" />
      <div style={{ position: 'relative', paddingLeft: 24, borderLeft: '2px solid var(--color-border-secondary)', margin: '1rem 0' }}>
        {timeline.map(({ year, event }) => (
          <div key={year} style={{ marginBottom: 12, position: 'relative' }}>
            <div style={{ position: 'absolute', left: -30, top: 3, width: 12, height: 12, borderRadius: '50%', background: 'var(--color-background-info)', border: '2px solid var(--color-border-info)' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 500, color: 'var(--color-text-info)' }}>{year}</span>
            <span style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginLeft: 10 }}>{event}</span>
          </div>
        ))}
      </div>

      <H2 c="Why the 2010s? The perfect storm" />
      <Grid cols={3} gap={10}>
        <Card color="info" title="Big Data">ImageNet (1.2M images) · Common Crawl · YouTube · Digitization of records</Card>
        <Card color="success" title="GPU Compute">NVIDIA CUDA (2007) · 1000× speedup over CPU · Cloud GPU (AWS, GCP)</Card>
        <Card color="purple" title="Algorithmic Advances">ReLU · Dropout · Batch normalization · Residual connections · Adam optimizer</Card>
      </Grid>

      <H2 c="Interview Q&A" />
      <QA q="What are the three pillars that enabled the deep learning revolution?"
          a="(1) Big data — massive labeled datasets like ImageNet, Common Crawl, and YouTube provided the supervision signal deep networks need. (2) GPU compute — the parallelism of GPUs matches the matrix multiply operations in neural networks, giving 100–1000× speedup over CPUs. (3) Algorithmic advances — ReLU, dropout, batch normalization, residual connections, and Adam together made training very deep networks stable and practical." />
      <QA q="What made AlexNet's 2012 ImageNet result significant?"
          a="It beat the second-place model by 10.8 percentage points (15.3% vs 26.2% top-5 error) — a margin so large it convinced the research community that deep learning was qualitatively different from prior approaches. It validated GPU training, demonstrated data augmentation and dropout prevent overfitting at scale, and sparked a wave of investment that continues today." />
      <QA q="What is the 'scaling hypothesis'?"
          a="The scaling hypothesis (Kaplan et al., 2020) observes that model performance consistently improves with more compute, more data, and larger models — with predictable power-law scaling. This shifted research from hand-crafted architectures to scaling general-purpose ones, explaining the dominance of large foundation models (GPT, BERT, CLIP)." />
    </div>
  );
}

/* ─────────────────── Page Root ─────────────────────────────── */
const SECTION_MAP = {
  def:     <SectionDef />,
  nn:      <SectionNN />,
  mldl:    <SectionMLDL />,
  arch:    <SectionArch />,
  hier:    <SectionHier />,
  history: <SectionHistory />,
};

export default function Fundamentals() {
  const [active, setActive] = useState('def');
  return (
    <div>
      <div className="page-header">
        <div className="page-header-eyebrow">Deep Learning — Module 01</div>
        <h1 className="page-header-title">Fundamentals, Architectures &amp; History</h1>
        <p className="page-header-subtitle">Math · Implementation · Interview prep. Expand any Q&amp;A to see a model answer.</p>
      </div>

      <SectionNav tabs={TABS} active={active} onSelect={setActive} />

      <div role="tabpanel" id={`panel-${active}`} aria-labelledby={`tab-${active}`}>
        {SECTION_MAP[active]}
      </div>

      <NavButtons moduleId={1} />
    </div>
  );
}
