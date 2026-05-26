import { useState, useCallback, useEffect } from "react";
import { Code } from '../components/ui/Code.jsx';
import { Mx, H2, H3, P } from '../components/ui/Typography.jsx';
import { QA } from '../components/ui/QA.jsx';
import { Note, Table, VizBox } from '../components/ui/Primitives.jsx';
import NavButtons from '../components/layout/NavButtons.jsx';
import SectionNav from '../components/layout/SectionNav.jsx';

/* ══════════════════════════════════════════════════════
   SECTION 1 — WHY RNNs (Ch 55)
══════════════════════════════════════════════════════ */
function SectionWhyRNN() {
  return (
    <div>
      <Note color="info" icon="ti-bulb">
        <strong>Core intuition:</strong> ANNs and CNNs are stateless — they process each input independently with no memory of what came before. Sequential data (text, audio, time-series) has <em>temporal dependencies</em>: the meaning of "bank" depends on whether "river" or "money" came before it. RNNs solve this by maintaining a hidden state that persists across timesteps.
      </Note>

      <H2>55.1.3 · What is sequential data?</H2>
      <P c="Sequential data is any data where order matters — swapping two elements changes the meaning. This covers an enormous fraction of real-world data:"/>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:10, margin:"0.75rem 0" }}>
        {[
          { title:"Text / NLP", icon:"ti-letter-case", color:"info",
            ex:"Sentiment analysis, translation, summarisation. Words depend on context; 'not good' ≠ 'good not'." },
          { title:"Time-series", icon:"ti-chart-line", color:"success",
            ex:"Stock prices, ECG signals, weather. The value at t depends on values at t−1, t−2, …" },
          { title:"Audio / Speech", icon:"ti-wave-sine", color:"warning",
            ex:"Speech recognition, music generation. A phoneme depends on the preceding phonemes." },
          { title:"Video", icon:"ti-video", color:"danger",
            ex:"Action recognition, video captioning. Frame t is contextualised by frames t−1, t−2, …" },
        ].map(({title,icon,color,ex})=>(
          <div key={title} style={{ border:"0.5px solid var(--color-border-tertiary)", borderRadius:"var(--border-radius-md)", padding:"12px 12px" }}>
            <div style={{ display:"flex", gap:7, alignItems:"center", marginBottom:7 }}>
              <i className={`ti ${icon}`} style={{ fontSize:16, color:`var(--color-text-${color})` }} aria-hidden />
              <span style={{ fontWeight:500, fontSize:13, color:"var(--color-text-primary)" }}>{title}</span>
            </div>
            <div style={{ fontSize:12, color:"var(--color-text-secondary)", lineHeight:1.6 }}>{ex}</div>
          </div>
        ))}
      </div>

      <H2>55.2 · Why traditional ANNs fail for sequences</H2>
      <P c="Three fundamental structural problems prevent vanilla ANNs and CNNs from handling sequential data well:"/>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10, margin:"0.75rem 0" }}>
        {[
          { n:"1", title:"No temporal memory", color:"danger",
            body:"ANNs process each input independently. Each forward pass starts with zero knowledge of previous inputs. Given 'The movie was not ___', an ANN seeing only '___' has no context for what came before." },
          { n:"2", title:"Fixed input size", color:"warning",
            body:"An ANN's weight matrix W has fixed dimensions. A sentence of 5 words and a sentence of 500 words cannot share the same architecture. Padding to max length is wasteful and creates spurious patterns." },
          { n:"3", title:"No weight sharing across time", color:"warning",
            body:"If an ANN were unrolled across time with separate weights for each position, the same feature (e.g. a verb) would need to be re-learned at every timestep independently — exponentially more parameters." },
        ].map(({n,title,color,body})=>(
          <div key={n} style={{ background:`var(--color-background-${color})`, border:`0.5px solid var(--color-border-${color})`, borderRadius:"var(--border-radius-md)", padding:"12px 13px" }}>
            <div style={{ fontFamily:"var(--font-mono)", fontSize:11, color:`var(--color-text-${color})`, marginBottom:4 }}>Problem {n}</div>
            <div style={{ fontWeight:500, fontSize:13, color:`var(--color-text-${color})`, marginBottom:6 }}>{title}</div>
            <div style={{ fontSize:12, color:`var(--color-text-${color})`, lineHeight:1.65 }}>{body}</div>
          </div>
        ))}
      </div>

      <H2>55.2.5 · Zero padding — the naive fix and why it fails</H2>
      <P c="The standard ANN workaround is to pad all sequences to the maximum length with zeros, then use a fixed-size input layer."/>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, margin:"0.75rem 0" }}>
        <div style={{ border:"0.5px solid var(--color-border-tertiary)", borderRadius:"var(--border-radius-md)", padding:"12px 13px" }}>
          <div style={{ fontWeight:500, fontSize:13, color:"var(--color-text-primary)", marginBottom:7 }}>Zero padding approach</div>
          <Code>{`# Sentence: "I love AI"  → tokens [2, 45, 89]
# Sentence: "Deep learning changes everything today" → [12,55,3,8,77]
# Pad to length 5:
[2,  45, 89,  0,  0]   # padded with 2 zeros
[12, 55,  3,  8, 77]   # no padding needed`}</Code>
        </div>
        <div style={{ background:"var(--color-background-danger)", border:"0.5px solid var(--color-border-danger)", borderRadius:"var(--border-radius-md)", padding:"12px 13px" }}>
          <div style={{ fontWeight:500, fontSize:13, color:"var(--color-text-danger)", marginBottom:7 }}>Why it fails</div>
          <div style={{ fontSize:12.5, color:"var(--color-text-danger)", lineHeight:1.7 }}>
            • Zeros are meaningless but the model treats them as signals<br/>
            • The model learns different weights for each position — no generalisation<br/>
            • Memory waste for very long sequences<br/>
            • No temporal dependencies captured regardless<br/>
            • Padding position matters — pre vs post padding changes learned features
          </div>
        </div>
      </div>

      <H2>What RNNs do differently</H2>
      <P c="An RNN introduces a hidden state h_t that is updated at each timestep — a form of memory that carries information forward. The same weight matrices W_x and W_h are shared across every timestep (weight sharing across time"/>
      <Mx block>{"h_t = tanh(W_h · h_{t-1}  +  W_x · x_t  +  b)"}</Mx>
      <P c="This single equation gives RNNs three properties that ANNs lack: (1) temporal memory via h_{t-1}, (2) variable-length input by running for as many steps as needed, (3) weight sharing across all timesteps — the same W_x and W_h see every token." />

      <H2>Applications</H2>
      <Table
        heads={["Application","Input","Output","RNN type"]}
        rows={[
          ["Sentiment analysis","Sequence of words","Positive/Negative","Many-to-one"],
          ["Machine translation","Source sentence","Target sentence","Many-to-many (encoder-decoder)"],
          ["Speech recognition","Audio frames","Text tokens","Many-to-many"],
          ["Image captioning","Image (via CNN)","Caption words","One-to-many"],
          ["Text generation / next word","Prefix tokens","Next token probabilities","Many-to-one (at each step)"],
          ["Named entity recognition","Words in sentence","Entity tags per word","Many-to-many (synced)"],
          ["ECG anomaly detection","Time-series signal","Normal / anomaly","Many-to-one"],
          ["Music generation","Seed note sequence","Next notes","Many-to-many"],
        ]}
      />

      <H2>Interview Q&A</H2>
      <QA q="What is the fundamental problem with using a standard ANN for NLP tasks?"
         a="Three structural problems: (1) <strong>Fixed input size</strong> — ANNs require a fixed-length input vector, but sentences have variable lengths; (2) <strong>No temporal dependencies</strong> — flattening a sequence to a vector destroys word order; 'not good' and 'good not' produce identical input vectors; (3) <strong>No weight sharing across positions</strong> — the same word appearing at position 1 vs position 10 would require learning completely separate weights, wasting parameters and preventing generalisation." />
      <QA q="Why is zero-padding insufficient even if it solves the fixed-input-size problem?"
         a="Zero padding fixes the shape mismatch but not the fundamental issues. (1) The zeros themselves carry no meaningful signal but the ANN assigns weights to them, creating spurious gradients. (2) The model still learns position-specific weights — a feature detected at position 3 has different weights from the same feature at position 7, so knowledge doesn't generalise across positions. (3) Most critically, no temporal dependency is captured — the model cannot learn that the word at position 5 modifies the meaning of the word at position 2. Padding is a practical engineering workaround, not a solution to the representational problem." />
      <QA q="What does 'weight sharing across time' mean in an RNN and why is it important?"
         a="In an RNN, the same weight matrices W_h and W_x are used at every timestep. When the word 'good' appears at step t=2, the same W_x that processed it there also processes it at t=7 if it appears again. This has two major benefits: (1) <strong>Parameter efficiency</strong> — one set of weights instead of T separate sets for a sequence of length T; (2) <strong>Generalisation</strong> — a pattern learned at one position generalises to all positions. This is the temporal analogue of CNNs' spatial weight sharing." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 2 — ARCHITECTURE & FORWARD PROP (Ch 56)
══════════════════════════════════════════════════════ */
const FWD_TOKENS = ["I", "love", "deep", "learning"];
const FWD_STEPS = [
  {
    title:"Initialise hidden state",
    token:null, step:-1,
    eq:"h₋₁ = [0, 0, 0]   (zero vector)",
    detail:"The hidden state is initialised to a zero vector before the first token. Its dimension (hidden_units) is a hyperparameter — often 64, 128, or 256.",
    color:"info",
  },
  {
    title:'Step t=0  →  token "I"',
    token:0, step:0,
    eq:"h₀ = tanh(W_h·h₋₁ + W_x·x₀ + b)\n   = tanh(W_h·[0,0,0] + W_x·embed(\"I\") + b)",
    detail:"x₀ is the embedding of 'I' — a dense vector. Since h₋₁ = 0, only the input branch W_x·x₀ contributes. h₀ encodes only the first token.",
    color:"teal",
  },
  {
    title:'Step t=1  →  token "love"',
    token:1, step:1,
    eq:"h₁ = tanh(W_h·h₀ + W_x·x₁ + b)",
    detail:"Now both branches contribute: W_h·h₀ carries information about 'I', and W_x·x₁ injects 'love'. h₁ encodes the context 'I love'.",
    color:"purple",
  },
  {
    title:'Step t=2  →  token "deep"',
    token:2, step:2,
    eq:"h₂ = tanh(W_h·h₁ + W_x·x₂ + b)",
    detail:"h₁ already encodes 'I love', so h₂ now encodes 'I love deep'. Each step compresses the growing context into a fixed-size vector.",
    color:"purple",
  },
  {
    title:'Step t=3  →  token "learning"  (output)',
    token:3, step:3,
    eq:"h₃ = tanh(W_h·h₂ + W_x·x₃ + b)\nŷ  = softmax(W_y·h₃ + b_y)",
    detail:"Final hidden state h₃ is a compressed encoding of the entire sequence. For many-to-one tasks (e.g. sentiment), only this last state is passed to the output layer.",
    color:"coral",
  },
];

function ForwardPropStepper() {
  const [step, setStep] = useState(0);
  const s = FWD_STEPS[step];
  const colorMap = { info:"#185FA5", teal:"#0F6E56", purple:"#534AB7", coral:"#993C1D" };
  const bgMap = { info:"var(--color-background-info)", teal:"var(--color-background-success)", purple:"var(--color-background-secondary)", coral:"var(--color-background-danger)" };
  return (
    <VizBox>
      {/* token track */}
      <div style={{ padding:"12px 14px", borderBottom:"0.5px solid var(--color-border-tertiary)", background:"var(--color-background-secondary)" }}>
        <div style={{ fontSize:11, color:"var(--color-text-tertiary)", marginBottom:8, textTransform:"uppercase", letterSpacing:"0.07em" }}>Input sequence</div>
        <div style={{ display:"flex", gap:8, alignItems:"center" }}>
          {FWD_TOKENS.map((tok,i)=>(
            <div key={i} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}>
              <div style={{ padding:"6px 14px", borderRadius:"var(--border-radius-md)", border:"1.5px solid "+(s.token===i?colorMap[s.color]:"var(--color-border-tertiary)"), background:s.token===i?bgMap[s.color]:"var(--color-background-primary)", fontFamily:"var(--font-mono)", fontSize:13.5, fontWeight:s.token===i?500:400, color:s.token===i?colorMap[s.color]:"var(--color-text-primary)", transition:"all 0.2s" }}>
                {tok}
              </div>
              <div style={{ fontSize:10.5, color:"var(--color-text-tertiary)", fontFamily:"var(--font-mono)" }}>x_{i}</div>
            </div>
          ))}
          <div style={{ marginLeft:8, fontSize:12, color:"var(--color-text-tertiary)" }}>→ ... → </div>
          <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}>
            <div style={{ padding:"6px 14px", borderRadius:"var(--border-radius-md)", border:"1.5px solid "+(step===4?"#993C1D":"var(--color-border-tertiary)"), background:step===4?"var(--color-background-danger)":"var(--color-background-secondary)", fontFamily:"var(--font-mono)", fontSize:13, fontWeight:500, color:step===4?"#993C1D":"var(--color-text-tertiary)" }}>
              ŷ
            </div>
            <div style={{ fontSize:10.5, color:"var(--color-text-tertiary)" }}>output</div>
          </div>
        </div>
      </div>
      {/* hidden state track */}
      <div style={{ padding:"10px 14px", borderBottom:"0.5px solid var(--color-border-tertiary)", background:"var(--color-background-primary)", display:"flex", gap:8, alignItems:"center", overflowX:"auto" }}>
        <span style={{ fontSize:11, color:"var(--color-text-tertiary)", whiteSpace:"nowrap", textTransform:"uppercase", letterSpacing:"0.07em", marginRight:4 }}>Hidden states</span>
        {[-1,0,1,2,3].map(t=>(
          <div key={t} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:4, flexShrink:0 }}>
            <div style={{ width:48, height:48, borderRadius:8, border:"1.5px solid "+(step-1>=t?"var(--color-border-info)":"var(--color-border-tertiary)"), background:step-1>=t?"var(--color-background-info)":"var(--color-background-secondary)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontFamily:"var(--font-mono)", color:step-1>=t?"var(--color-text-info)":"var(--color-text-tertiary)", transition:"all 0.2s" }}>
              h_{t}
            </div>
            {t < 3 && <div style={{ fontSize:10, color:"var(--color-text-tertiary)" }}>→</div>}
          </div>
        ))}
      </div>
      {/* equation */}
      <div style={{ padding:"0.85rem 1.1rem", background:"#1E1E1E" }}>
        <div style={{ fontSize:11, color:"#888", marginBottom:6, textTransform:"uppercase", letterSpacing:"0.07em" }}>{s.title}</div>
        <pre style={{ margin:0, fontFamily:"var(--font-mono)", fontSize:"13px", lineHeight:1.7, color:"#D4D4D4", whiteSpace:"pre" }}>{s.eq}</pre>
      </div>
      {/* explanation */}
      <div style={{ padding:"11px 15px", fontSize:13.5, lineHeight:1.75, color:"var(--color-text-secondary)" }}>{s.detail}</div>
      {/* controls */}
      <div style={{ display:"flex", justifyContent:"space-between", padding:"7px 13px", borderTop:"0.5px solid var(--color-border-tertiary)", background:"var(--color-background-secondary)" }}>
        <button onClick={()=>setStep(v=>Math.max(0,v-1))} disabled={step===0} style={{ background:"none", border:"0.5px solid var(--color-border-tertiary)", borderRadius:"var(--border-radius-md)", padding:"4px 12px", cursor:step===0?"default":"pointer", fontSize:13, color:step===0?"var(--color-text-tertiary)":"var(--color-text-secondary)" }}>← prev</button>
        <span style={{ fontSize:12, color:"var(--color-text-tertiary)", alignSelf:"center", fontFamily:"var(--font-mono)" }}>step {step}/{FWD_STEPS.length-1}</span>
        <button onClick={()=>setStep(v=>Math.min(FWD_STEPS.length-1,v+1))} disabled={step===FWD_STEPS.length-1} style={{ background:"none", border:"0.5px solid var(--color-border-tertiary)", borderRadius:"var(--border-radius-md)", padding:"4px 12px", cursor:step===FWD_STEPS.length-1?"default":"pointer", fontSize:13, color:step===FWD_STEPS.length-1?"var(--color-text-tertiary)":"var(--color-text-secondary)" }}>next →</button>
      </div>
    </VizBox>
  );
}

function SectionArchitecture() {
  return (
    <div>
      <H2>56.1.3 · Data format for RNNs</H2>
      <P c="RNNs expect 3D input tensors. The three dimensions are: batch, timesteps, features."/>
      <Mx block>{"Input shape:  (batch_size, timesteps, input_features)\n\nExample — 32 sentences, each 100 tokens, each token a 64-dim embedding:\n  → (32, 100, 64)\n\nExample — 32 ECG samples, each 500 time steps, single channel:\n  → (32, 500, 1)"}</Mx>

      <H2>56.1.4–5 · RNN cell equations</H2>
      <P c="The core RNN cell computes two things at each timestep: a new hidden state h_t, and optionally an output y_t. The same weights W_h, W_x, W_y are shared across every timestep."/>
      <Mx block>{"Hidden state:  h_t = tanh(W_h · h_{t-1}  +  W_x · x_t  +  b_h)\nOutput:        y_t  = W_y · h_t  +  b_y\n\nDimensions:\n  x_t   ∈ ℝ^{input_dim}     (current token embedding)\n  h_t   ∈ ℝ^{hidden_units}  (hidden state / memory)\n  W_x   ∈ ℝ^{hidden × input}\n  W_h   ∈ ℝ^{hidden × hidden}\n  W_y   ∈ ℝ^{output × hidden}"}</Mx>

      <H2>56.3.2 · Unfolding through time</H2>
      <P c="An RNN with a single recurrent cell can be 'unrolled' into a deep feedforward network where each 'layer' corresponds to a timestep. This unrolled view is how BPTT (backpropagation through time) is derived."/>
      <div style={{ background:"var(--color-background-secondary)", border:"0.5px solid var(--color-border-tertiary)", borderRadius:"var(--border-radius-lg)", padding:"1rem", margin:"0.75rem 0", overflowX:"auto" }}>
        <div style={{ display:"flex", alignItems:"center", gap:0, minWidth:580 }}>
          {[
            { label:"h₋₁", sub:"zeros", dim:"init" },
            { label:"Cell", sub:"t=0, x₀", dim:"tanh" },
            { label:"h₀", sub:"", dim:"state" },
            { label:"Cell", sub:"t=1, x₁", dim:"tanh" },
            { label:"h₁", sub:"", dim:"state" },
            { label:"Cell", sub:"t=2, x₂", dim:"tanh" },
            { label:"h₂", sub:"", dim:"state" },
            { label:"Cell", sub:"t=T, xₜ", dim:"tanh" },
            { label:"hₜ", sub:"→ ŷ", dim:"output" },
          ].map(({label,sub,dim},i)=>{
            const isCell=dim==="tanh"; const isOut=dim==="output"; const isInit=dim==="init";
            const isDots=label==="…";
            if(isDots) return <div key={i} style={{ padding:"0 10px", fontSize:18, color:"var(--color-text-tertiary)" }}>…</div>;
            return (
              <div key={i} style={{ display:"flex", alignItems:"center" }}>
                <div style={{ background:isCell?"var(--color-background-info)":isOut?"var(--color-background-danger)":"var(--color-background-primary)", border:`1.5px solid ${isCell?"var(--color-border-info)":isOut?"var(--color-border-danger)":"var(--color-border-secondary)"}`, borderRadius:isCell?8:50, padding:isCell?"8px 12px":"10px 10px", textAlign:"center", minWidth:isCell?64:42, display:"flex", flexDirection:"column", alignItems:"center" }}>
                  <div style={{ fontSize:12.5, fontWeight:500, color:isCell?"var(--color-text-info)":isOut?"var(--color-text-danger)":"var(--color-text-primary)", fontFamily:"var(--font-mono)" }}>{label}</div>
                  {sub && <div style={{ fontSize:10, color:isCell?"var(--color-text-info)":isOut?"var(--color-text-danger)":"var(--color-text-secondary)", marginTop:2 }}>{sub}</div>}
                </div>
                {i<8 && <div style={{ color:"var(--color-text-tertiary)", fontSize:14, padding:"0 4px" }}>→</div>}
              </div>
            );
          })}
        </div>
        <div style={{ fontSize:11.5, color:"var(--color-text-tertiary)", marginTop:8, textAlign:"center" }}>
          Same W_x, W_h, W_y used at every cell — weight sharing across time
        </div>
      </div>

      <H2>56.3.3 · Step-by-step forward propagation</H2>
      <P c="Step through the forward pass of an RNN processing the sentence 'I love deep learning' for sentiment analysis:"/>
      <ForwardPropStepper />

      <H2>56.2 · Keras SimpleRNN — implementation & parameter count</H2>
      <Code>{`import tensorflow as tf
from tensorflow import keras

# ── Minimal SimpleRNN for sentiment classification ─────────────────
model = keras.Sequential([
    keras.layers.Embedding(vocab_size=10000, output_dim=64),
    # Input: (batch, timesteps, 64)  Output: (batch, 128) — last h_t only
    keras.layers.SimpleRNN(units=128, activation="tanh"),
    keras.layers.Dense(1, activation="sigmoid"),
])
model.summary()

# ── Parameter count analysis ─────────────────────────────────────────
# SimpleRNN(128) on input_dim=64:
#   W_x: 64 × 128    = 8,192
#   W_h: 128 × 128   = 16,384
#   bias: 128         = 128
#   Total per layer: 24,704
# Key: parameter count does NOT grow with sequence length T

# ── Return all hidden states (needed for encoder-decoder, attention) ─
model2 = keras.Sequential([
    keras.layers.Embedding(10000, 64),
    keras.layers.SimpleRNN(128, return_sequences=True),  # shape: (batch, T, 128)
    keras.layers.SimpleRNN(64),                          # shape: (batch, 64)
    keras.layers.Dense(1, activation="sigmoid"),
])`}</Code>

      <H2>56.4.5 · Simplified matrix view</H2>
      <p c="The two separate matrix multiplications can be written as a single concatenated operation, which is how most implementations compute it:"/>
      <Mx block>{"h_t = tanh( [W_h | W_x] · [h_{t-1}; x_t]  +  b )\n\n    = tanh( W · concat(h_{t-1}, x_t) + b )\n\nwhere W ∈ ℝ^{hidden × (hidden + input)}"}</Mx>

      <H2>Interview Q&A</H2>
      <QA q="What is the input shape to a Keras RNN layer and why is it 3D?"
         a="Keras RNN layers expect <code>(batch_size, timesteps, features)</code>. The three dimensions correspond to: (1) the batch — multiple sequences processed in parallel for GPU efficiency; (2) the time axis — the RNN steps through this axis, processing one slice <code>(batch, features)</code> at each timestep; (3) the feature dimension — the embedding or feature vector at each step. This 3D convention is consistent across SimpleRNN, LSTM, GRU, and Bidirectional wrappers." />
      <QA q="What does return_sequences=True do and when do you need it?"
         a="By default, Keras RNN layers return only the final hidden state h_T — shape <code>(batch, units)</code>. With <code>return_sequences=True</code> they return every hidden state h_0, h_1, …, h_T — shape <code>(batch, timesteps, units)</code>. You need it when: (1) stacking RNN layers — all but the last need to output sequences; (2) sequence-to-sequence tasks (translation, tagging) where you need an output at every timestep; (3) attention mechanisms that attend over all hidden states; (4) Bidirectional wrappers that merge forward and backward sequences." />
      <QA q="How many parameters does a SimpleRNN(units=H) layer have for input dimension D?"
         a="Three weight matrices: W_x ∈ ℝ^(H×D) with D·H weights, W_h ∈ ℝ^(H×H) with H² weights, and bias b ∈ ℝ^H with H weights. Total = H·D + H² + H = H·(D + H + 1). For H=128, D=64: 128×(64+128+1) = 24,704 parameters. Crucially, this count is <strong>independent of sequence length T</strong> — the same parameters are reused at every timestep." />
      <QA q="What is the difference between h_t and y_t in an RNN?"
         a="h_t is the <strong>hidden state</strong> — an internal vector that summarises all information seen up to timestep t. It is passed to the next timestep and is the RNN's 'memory'. y_t is the <strong>output</strong> at timestep t — obtained by projecting h_t through a learned matrix W_y. In many-to-one tasks (sentiment), only y_T is used. In many-to-many tasks (NER, translation), y_t is computed at every step. In Keras, h_t is what RNN layers return; y_t corresponds to a subsequent Dense layer." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 3 — RNN TYPES (Ch 58)
══════════════════════════════════════════════════════ */
function RNNTypeDiagram({ type }) {
  const [isDark, setIsDark] = useState(false);
  useEffect(()=>{
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDark(mq.matches);
    const h = e => setIsDark(e.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);

  const T = isDark ? {
    cellBg:"#042C53", cellBd:"#378ADD", cellTx:"#85B7EB",
    outBg:"#501313",  outBd:"#E24B4A",  outTx:"#F09595",
    inBg:"#173404",   inBd:"#639922",   inTx:"#C0DD97",
    arr:"#378ADD", vOut:"#E24B4A", vIn:"#639922",
  } : {
    cellBg:"#E6F1FB", cellBd:"#185FA5", cellTx:"#0C447C",
    outBg:"#FCEBEB",  outBd:"#A32D2D",  outTx:"#791F1F",
    inBg:"#EAF3DE",   inBd:"#3B6D11",   inTx:"#27500A",
    arr:"#185FA5", vOut:"#A32D2D", vIn:"#3B6D11",
  };

  const configs = {
    m2o:   { hasIn:[true,true,true,true],   inLbl:["x₀","x₁","x₂","x₃"],
              hasOut:[false,false,false,true],  outLbl:["","","","ŷ"],
              label:"Many-to-One", ex:"Sentiment analysis, document classification" },
    o2m:   { hasIn:[true,false,false,false], inLbl:["x₀","","",""],
              hasOut:[true,true,true,true],     outLbl:["ŷ₀","ŷ₁","ŷ₂","ŷ₃"],
              label:"One-to-Many", ex:"Image captioning, music generation" },
    m2m_s: { hasIn:[true,true,true,true],   inLbl:["x₀","x₁","x₂","x₃"],
              hasOut:[true,true,true,true],     outLbl:["ŷ₀","ŷ₁","ŷ₂","ŷ₃"],
              label:"Many-to-Many (synced)", ex:"POS tagging, NER, video labelling" },
    m2m_u: { hasIn:[true,true,false,false],  inLbl:["x₀","x₁","",""],
              hasOut:[false,false,true,true],   outLbl:["","","ŷ₀","ŷ₁"],
              label:"Many-to-Many (unsynced)", ex:"Machine translation, seq2seq" },
  };
  const c = configs[type];

  return (
    <div style={{ padding:"1rem 0.75rem" }}>
      <div style={{ display:"flex", justifyContent:"center", alignItems:"center", gap:8 }}>
        {[0,1,2,3].map(i=>(
          <div key={i} style={{ display:"flex", alignItems:"center" }}>

            {/* ── cell column ── */}
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center", width:82 }}>

              {/* output label zone — fixed 30px so rows stay aligned */}
              <div style={{ height:30, display:"flex", alignItems:"flex-end", justifyContent:"center", width:"100%" }}>
                {c.hasOut[i] && c.outLbl[i]
                  ? <div style={{ padding:"2px 9px", borderRadius:5, background:T.outBg, border:`1.5px solid ${T.outBd}`, fontSize:12.5, fontFamily:"var(--font-mono)", fontWeight:500, color:T.outTx }}>{c.outLbl[i]}</div>
                  : null}
              </div>

              {/* vertical line: output → cell */}
              <div style={{ width:2, height:10, background:c.hasOut[i] ? T.vOut : "transparent" }} />

              {/* cell box */}
              <div style={{ width:74, height:36, borderRadius:8, background:T.cellBg, border:`1.5px solid ${T.cellBd}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12.5, fontWeight:500, color:T.cellTx, flexShrink:0 }}>
                Cell {i}
              </div>

              {/* vertical line: cell → input */}
              <div style={{ width:2, height:10, background:c.hasIn[i] ? T.vIn : "transparent" }} />

              {/* input label zone — fixed 30px */}
              <div style={{ height:30, display:"flex", alignItems:"flex-start", justifyContent:"center", width:"100%" }}>
                {c.hasIn[i] && c.inLbl[i]
                  ? <div style={{ padding:"2px 9px", borderRadius:5, background:T.inBg, border:`1.5px solid ${T.inBd}`, fontSize:12.5, fontFamily:"var(--font-mono)", fontWeight:500, color:T.inTx }}>{c.inLbl[i]}</div>
                  : null}
              </div>
            </div>

            {/* horizontal arrow between cells */}
            {i < 3 && <div style={{ fontSize:18, color:T.arr, lineHeight:1, flexShrink:0, padding:"0 1px" }}>&#8594;</div>}

          </div>
        ))}
      </div>

      <div style={{ textAlign:"center", marginTop:12 }}>
        <div style={{ fontSize:13.5, fontWeight:500, color:"var(--color-text-primary)", marginBottom:3 }}>{c.label}</div>
        <div style={{ fontSize:12.5, color:"var(--color-text-secondary)" }}>{c.ex}</div>
      </div>

      <div style={{ display:"flex", justifyContent:"center", gap:18, marginTop:10, fontSize:11.5 }}>
        {[{bg:T.cellBg,bd:T.cellBd,tx:T.cellTx,lbl:"RNN cells"},{bg:T.inBg,bd:T.inBd,tx:T.inTx,lbl:"Inputs"},{bg:T.outBg,bd:T.outBd,tx:T.outTx,lbl:"Outputs"}].map(k=>(
          <div key={k.lbl} style={{ display:"flex", alignItems:"center", gap:5 }}>
            <div style={{ width:12, height:12, borderRadius:3, background:k.bg, border:`1.5px solid ${k.bd}` }} />
            <span style={{ color:"var(--color-text-secondary)" }}>{k.lbl}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SectionRNNTypes() {
  const [sel, setSel] = useState("m2o");
  const types = [
    {id:"m2o", label:"Many → One"},
    {id:"o2m", label:"One → Many"},
    {id:"m2m_s", label:"Many → Many (synced)"},
    {id:"m2m_u", label:"Many → Many (unsynced)"},
  ];
  return (
    <div>
      <Note color="info" icon="ti-layout-grid">
        RNNs are flexible enough to map sequences of different input and output lengths. The four canonical types cover virtually every sequence modelling task. The key insight: the recurrent cell is the same in all cases — what changes is <em>when</em> you read the output.
      </Note>

      <H2>58.1.3 · The four canonical RNN architectures</H2>
      <P c="Select a type below to see its data flow. Blue = RNN cells, green = inputs, red = outputs:"/>
      <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:"0.85rem" }}>
        {types.map(t=>(
          <button key={t.id} onClick={()=>setSel(t.id)} style={{ background:sel===t.id?"var(--color-background-info)":"var(--color-background-secondary)", border:"0.5px solid "+(sel===t.id?"var(--color-border-info)":"var(--color-border-tertiary)"), borderRadius:"var(--border-radius-md)", padding:"5px 12px", cursor:"pointer", fontSize:13, color:sel===t.id?"var(--color-text-info)":"var(--color-text-secondary)", fontWeight:sel===t.id?500:400 }}>
            {t.label}
          </button>
        ))}
      </div>
      <VizBox>
        <RNNTypeDiagram type={sel} />
      </VizBox>

      <H2>58.1.4–7 · Detailed breakdown</H2>
      <Table
        heads={["Type","Input","Output","Keras pattern","Classic applications"]}
        rows={[
          ["Many-to-one","Sequence of length T","Single vector","SimpleRNN / LSTM + Dense","Sentiment, topic classification, ECG diagnosis"],
          ["One-to-many","Single vector (image CNN features)","Sequence of length T","RepeatVector → LSTM(return_sequences=True)","Image captioning, music generation from seed"],
          ["Many-to-many (synced)","Sequence length T","Sequence length T (aligned)","LSTM(return_sequences=True)","NER, POS tagging, frame-level video labelling"],
          ["Many-to-many (unsynced)","Sequence length T_in","Sequence length T_out","Encoder LSTM → Decoder LSTM","Machine translation, text summarisation"],
          ["One-to-one","Single vector","Single scalar/vector","Dense (no recurrence)","Standard ANN — included for completeness"],
        ]}
      />

      <H3>Many-to-One — Keras</H3>
      <Code>{`# Sentiment analysis: sequence → single label
model = keras.Sequential([
    keras.layers.Embedding(10000, 64),
    keras.layers.LSTM(128),            # returns only final h_T
    keras.layers.Dense(1, activation="sigmoid"),
])`}</Code>

      <H3>One-to-Many — Keras</H3>
      <Code>{`# Image captioning sketch: one CNN feature vector → word sequence
img_features = keras.Input(shape=(2048,))
x = keras.layers.RepeatVector(max_caption_len)(img_features)  # (batch, T, 2048)
x = keras.layers.LSTM(256, return_sequences=True)(x)
output = keras.layers.TimeDistributed(keras.layers.Dense(vocab_size, activation="softmax"))(x)`}</Code>

      <H3>Many-to-Many synced — Keras</H3>
      <Code>{`# NER: every token gets a tag
model = keras.Sequential([
    keras.layers.Embedding(10000, 64),
    keras.layers.Bidirectional(keras.layers.LSTM(128, return_sequences=True)),
    keras.layers.TimeDistributed(keras.layers.Dense(num_tags, activation="softmax")),
])`}</Code>

      <H3>Many-to-Many unsynced (Seq2Seq) — Keras</H3>
      <Code>{`# Encoder
enc_input  = keras.Input(shape=(None,), name="enc")
enc_emb    = keras.layers.Embedding(src_vocab, 64)(enc_input)
_, h, c    = keras.layers.LSTM(256, return_state=True)(enc_emb)

# Decoder (teacher-forced training)
dec_input  = keras.Input(shape=(None,), name="dec")
dec_emb    = keras.layers.Embedding(tgt_vocab, 64)(dec_input)
dec_out, _,_ = keras.layers.LSTM(256, return_sequences=True, return_state=True)(
                    dec_emb, initial_state=[h, c])
output     = keras.layers.Dense(tgt_vocab, activation="softmax")(dec_out)
model      = keras.Model([enc_input, dec_input], output)`}</Code>

      <H2>Interview Q&A</H2>
      <QA q="What is the difference between many-to-many synced and unsynced?"
         a="<strong>Synced</strong>: input and output sequences have the same length and are aligned — position i in the output corresponds to position i in the input. Used when every input token gets a label (NER: each word → entity tag, POS tagging: each word → grammatical tag). Implementation: a single RNN with <code>return_sequences=True</code>. <strong>Unsynced</strong> (seq2seq): input and output have different (and unknown) lengths, and there is no token-level alignment — 'Je suis étudiant' (3 tokens) maps to 'I am a student' (4 tokens). Implementation: requires an encoder–decoder architecture where the encoder compresses the input to a context vector, and the decoder generates the output autoregressively." />
      <QA q="Why does One-to-Many use RepeatVector instead of a single Dense layer?"
         a="One-to-many tasks require the decoder to generate a sequence of T outputs. The single input vector (e.g. CNN image features of shape (2048,)) has no time dimension for the LSTM to iterate over. <code>RepeatVector(T)</code> tiles the vector T times to create an input of shape (batch, T, 2048), giving the LSTM a concrete sequence to process at each of its T steps. The alternative is to use the input as the initial hidden state and feed the previous output token as the next input (autoregressive generation)." />
      <QA q="In encoder-decoder, how does the decoder know the encoder's output?"
         a="The decoder is initialised with the encoder's final hidden state (and cell state for LSTM): <code>initial_state=[h_encoder, c_encoder]</code>. This context vector acts as a compressed representation of the entire input sequence, giving the decoder its starting 'memory'. During training, the decoder uses teacher forcing — it receives the correct previous output token at each step. At inference, it autoregressively feeds its own previous output. This basic approach is the foundation of seq2seq; attention mechanisms (Chapter 14) improve it by letting the decoder access all encoder hidden states." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 4 — BPTT + PROBLEMS (Ch 59–60)
══════════════════════════════════════════════════════ */
function GradientDecayViz() {
  const [T, setT] = useState(10);
  const [gamma, setGamma] = useState(0.7);
  const maxBars = T;
  const barW = Math.min(40, Math.floor(480 / maxBars) - 4);
  const maxH = 120;
  return (
    <VizBox>
      <div style={{ display:"grid", gridTemplateColumns:"80px 1fr 52px", alignItems:"center", gap:8, marginBottom:12, fontSize:13 }}>
        <span style={{ color:"var(--color-text-secondary)" }}>Seq length T</span>
        <input type="range" min={3} max={20} step={1} value={T} onChange={e=>setT(+e.target.value)} />
        <span style={{ fontFamily:"var(--font-mono)", fontSize:12, textAlign:"right" }}>{T}</span>
        <span style={{ color:"var(--color-text-secondary)" }}>γ (grad factor)</span>
        <input type="range" min={10} max={99} step={1} value={Math.round(gamma*100)} onChange={e=>setGamma(e.target.value/100)} />
        <span style={{ fontFamily:"var(--font-mono)", fontSize:12, textAlign:"right" }}>{gamma.toFixed(2)}</span>
      </div>
      <div style={{ background:"var(--color-background-secondary)", borderRadius:"var(--border-radius-md)", padding:"12px 8px", overflowX:"auto" }}>
        <div style={{ display:"flex", alignItems:"flex-end", gap:4, minHeight:maxH+40, paddingBottom:8 }}>
          {Array.from({length:T},(_,i)=>{
            const dist = T - 1 - i;
            const mag = Math.pow(gamma, dist);
            const h = Math.max(2, Math.round(mag * maxH));
            const opacity = 0.35 + 0.65*mag;
            return (
              <div key={i} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:3 }}>
                <div style={{ width:barW, height:h, background:`rgba(56,138,221,${opacity})`, borderRadius:"3px 3px 0 0", border:"0.5px solid rgba(56,138,221,0.4)", transition:"all 0.2s", position:"relative" }}>
                  {mag>0.15 && <div style={{ position:"absolute", bottom:3, left:0, right:0, textAlign:"center", fontSize:9, color:"white", fontFamily:"var(--font-mono)" }}>{(mag*100).toFixed(0)}%</div>}
                </div>
                <div style={{ fontSize:9.5, color:"var(--color-text-tertiary)", fontFamily:"var(--font-mono)", textAlign:"center" }}>t={i}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div style={{ textAlign:"center", marginTop:8, fontSize:12.5, color:"var(--color-text-secondary)" }}>
        Gradient magnitude at timestep t = γ<sup>T−1−t</sup> · (gradient at output)
      </div>
      <div style={{ textAlign:"center", fontSize:12, fontFamily:"var(--font-mono)", color:"var(--color-text-tertiary)", marginTop:4 }}>
        At t=0:  {(Math.pow(gamma,T-1)*100).toFixed(3)}% of original gradient reaches earliest token
      </div>
    </VizBox>
  );
}

function SectionBPTT() {
  return (
    <div>
      <H2>59.1.5 · Backpropagation through time (BPTT)</H2>
      <P c="BPTT is just standard backpropagation applied to the unrolled RNN. The key difference: the same weight matrices appear at every timestep, so their gradients are the SUM of contributions from all timesteps."/>
      <Mx block>{"Total loss:  L = Σ_{t=0}^{T}  L_t(ŷ_t, y_t)\n\nGradient of W_h (shared across all steps):\n  ∂L/∂W_h  =  Σ_{t=0}^{T}  ∂L_t/∂W_h\n\nTo compute ∂L_t/∂W_h, chain rule back through time:\n  ∂L_t/∂W_h  =  Σ_{k=0}^{t}  (∂L_t/∂h_t) · (∏_{j=k+1}^{t} ∂h_j/∂h_{j-1}) · (∂h_k/∂W_h)"}</Mx>
      <P c="The product ∏ ∂h_j/∂h_{j-1} is the source of both problems: vanishing and exploding gradients."/>

      <H2>59.1.6 · Gradient calculation at each step</H2>
      <Mx block>{"h_t = tanh(W_h · h_{t-1} + W_x · x_t + b)\n\n∂h_t/∂h_{t-1}  =  W_h^T · diag(1 - h_t²)\n\n  where diag(1 - h_t²) is the Jacobian of tanh (element-wise).\n\nThe chain from t back to k:\n  ∂h_t/∂h_k  =  ∏_{j=k+1}^{t}  W_h^T · diag(1 - h_j²)"}</Mx>

      <H2>60.2.5 · Vanishing gradient — mathematical proof</H2>
      <P c="For tanh activation, the derivative is bounded: |tanh'(z)| = |1 - tanh²(z)| ≤ 1. If the maximum singular value σ_max of W_h satisfies σ_max < 1, then:" />
      <Mx block>{"|| ∂h_t/∂h_k ||  ≤  (σ_max · 1)^{t-k}  =  σ_max^{t-k}\n\nIf σ_max < 1:  σ_max^{t-k} → 0  exponentially as (t-k) grows.\n\nConsequence: for a sequence of length T=50 with σ_max=0.9:\n  Gradient at t=0: 0.9^50 ≈ 0.005  (0.5% of original)\n  Gradient at t=0 for T=100: 0.9^100 ≈ 0.000027  (near zero)"}</Mx>
      <P c="Drag the sliders below to see how gradient magnitude decays at earlier timesteps:"/>
      <GradientDecayViz />

      <H2>60.2.7 · Exploding gradient</H2>
      <P c="The symmetric case: if σ_max > 1, the gradient product grows exponentially with distance. A gradient that starts at 1.0 becomes 1.5^50 ≈ 637,000 for σ_max=1.5 over 50 steps. This manifests as NaN losses and wildly oscillating weights." />
      <Mx block>{"If σ_max > 1:  σ_max^{t-k} → ∞  (exploding gradients)\n\nSolution — gradient clipping:\n  if ||g|| > threshold:\n      g ← g · threshold / ||g||"}</Mx>

      <H2>60.2.6 & 60.2.8 · Solutions summary</H2>
      <Table
        heads={["Problem","Root cause","Solution","Mechanism"]}
        rows={[
          ["Vanishing","σ_max(W_h) < 1, repeated multiply","LSTM / GRU","Cell state uses additive update, not multiplicative chain"],
          ["Vanishing","σ_max(W_h) < 1, repeated multiply","Gradient clipping","Caps gradient norm but doesn't fix the root cause"],
          ["Vanishing","Sigmoid/tanh saturation","ReLU-based RNN","ReLU derivative is 1 (not < 1) for positive inputs"],
          ["Exploding","σ_max(W_h) > 1","Gradient clipping","Norm-rescales gradient: g ← g · τ / ||g|| when ||g|| > τ"],
          ["Exploding","σ_max(W_h) > 1","Weight regularisation","L2 penalty keeps weights small, controls σ_max"],
          ["Both (long seq)","Long dependency chain","Truncated BPTT","Only backprop through last k steps, not full T"],
        ]}
      />

      <H3>Gradient clipping in Keras</H3>
      <Code>{`# Option 1: clip by norm (recommended — preserves gradient direction)
optimizer = keras.optimizers.Adam(learning_rate=1e-3, clipnorm=1.0)

# Option 2: clip by value (changes gradient direction — less preferred)
optimizer = keras.optimizers.Adam(learning_rate=1e-3, clipvalue=0.5)

# Manual clipping in custom training loop
with tf.GradientTape() as tape:
    loss = model(x, training=True)
grads = tape.gradient(loss, model.trainable_variables)
# Clip: scale all gradients so global norm ≤ 1.0
grads, global_norm = tf.clip_by_global_norm(grads, clip_norm=1.0)
optimizer.apply_gradients(zip(grads, model.trainable_variables))`}</Code>

      <H2>Interview Q&A</H2>
      <QA q="Derive why vanishing gradients occur in vanilla RNNs during BPTT."
         a="During BPTT, the gradient of the loss at timestep t with respect to h_k (k &lt; t) involves the product ∏_{j=k+1}^{t} ∂h_j/∂h_{j-1}. Each factor equals W_h^T · diag(tanh'(z_j)). The Jacobian of tanh satisfies ||diag(tanh'(z))|| ≤ 1, and the spectral norm of W_h is σ_max(W_h). If σ_max &lt; 1, then each factor in the product has norm &lt; 1, and their product over (t−k) steps decays as σ_max^(t−k) → 0 exponentially. This means gradients from the loss at timestep t carry virtually zero signal to weights influencing hidden states from many steps earlier — the RNN cannot learn long-range dependencies." />
      <QA q="What is truncated BPTT and what are its trade-offs?"
         a="In full BPTT, gradients flow back through all T timesteps — O(T) memory and compute. Truncated BPTT divides the sequence into windows of length k and backpropagates only within each window (forward state still flows across windows). Trade-offs: (1) <strong>Pro</strong>: O(k) memory instead of O(T), enabling training on very long sequences; (2) <strong>Con</strong>: dependencies longer than k steps cannot be learned, since gradients from step t cannot reach step t−k−1; (3) In practice, k≈100–200 is used for language modelling. LSTMs/GRUs mitigate the dependency problem even within truncated windows via cell state." />
      <QA q="Why does gradient clipping by norm preserve direction while clipping by value does not?"
         a="<strong>Clip by norm</strong>: if ||g|| > τ, set g ← g · τ/||g||. This uniformly scales all gradient components by the same scalar, preserving the relative magnitudes between components (direction preserved). <strong>Clip by value</strong>: independently clamps each component: g_i ← clip(g_i, −v, v). A gradient vector (3.0, 0.001) clipped at ±0.5 becomes (0.5, 0.001), completely changing the direction — the step is no longer toward the steepest descent. Clip by norm is preferred in RNN training." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 5 — LSTM (Ch 61–63)
══════════════════════════════════════════════════════ */
const LSTM_GATES = [
  {
    name:"Forget gate  f_t",
    color:"danger",
    icon:"ti-trash",
    eq:"f_t = σ( W_f · [h_{t-1}, x_t] + b_f )\n\nf_t ∈ (0,1)^{hidden}  element-wise",
    intuition:"Controls what to <strong>erase</strong> from the long-term cell state. f_t ≈ 0 → forget completely; f_t ≈ 1 → keep completely. Example: when a new subject appears in a sentence, the gate learns to flush the previous subject's gender/number from memory.",
    story:"'I grew up in France … I speak fluent ___' — when the network sees 'I speak', it forgets the noun 'France' (country info) since it's no longer grammatically relevant.",
  },
  {
    name:"Input gate  i_t",
    color:"info",
    icon:"ti-plus",
    eq:"i_t = σ( W_i · [h_{t-1}, x_t] + b_i )\n\ni_t ∈ (0,1)^{hidden}  element-wise",
    intuition:"Controls <strong>how much</strong> of the new candidate information to write into the cell. Works in conjunction with the cell candidate g_t — together they form the write head of the memory.",
    story:"Seeing 'France' in the sentence, i_t activates strongly to write 'current country = France' into the cell state for future reference.",
  },
  {
    name:"Cell candidate  g_t",
    color:"success",
    icon:"ti-pencil",
    eq:"g_t = tanh( W_g · [h_{t-1}, x_t] + b_g )\n\ng_t ∈ (-1, 1)^{hidden}  element-wise",
    intuition:"Generates the <strong>new candidate values</strong> to potentially write to the cell. tanh squashes to (-1,1). The actual write is i_t ⊙ g_t — the input gate decides how much of this candidate actually gets stored.",
    story:"g_t computes 'what is potentially important about this input?' — e.g., that this is a European country. i_t then filters how much of this to actually remember.",
  },
  {
    name:"Cell state update  c_t",
    color:"warning",
    icon:"ti-refresh",
    eq:"c_t = f_t ⊙ c_{t-1}  +  i_t ⊙ g_t\n\nAdditive update — the key to long-range memory",
    intuition:"The <strong>highway for gradients</strong>. Because this is an <em>addition</em> (not multiplication), the gradient of the loss w.r.t. c_{t-k} contains the constant 1 from the additive path — no repeated multiplication, no exponential decay.",
    story:"Old cell state is selectively erased by f_t, then new information i_t·g_t is added. The result c_t is the updated long-term memory of the entire sequence so far.",
  },
  {
    name:"Output gate  o_t  &  hidden state  h_t",
    color:"purple",
    icon:"ti-logout",
    eq:"o_t  = σ( W_o · [h_{t-1}, x_t] + b_o )\nh_t  = o_t ⊙ tanh(c_t)",
    intuition:"o_t controls <strong>which parts of cell memory to expose</strong> as the short-term output. tanh(c_t) normalises the full cell to (-1,1); o_t filters what the next layer and next timestep will see. h_t is the working memory — the hidden state passed downstream.",
    story:"After reading 'I speak fluent', o_t activates the 'language' slot of the cell state to expose it, producing h_t used for the final prediction '___ French'.",
  },
];

function LSTMGateStepper() {
  const [step, setStep] = useState(0);
  const g = LSTM_GATES[step];
  const colorBorder = { danger:"var(--color-border-danger)", info:"var(--color-border-info)", success:"var(--color-border-success)", warning:"var(--color-border-warning)", purple:"var(--color-border-tertiary)" };
  const colorBg = { danger:"var(--color-background-danger)", info:"var(--color-background-info)", success:"var(--color-background-success)", warning:"var(--color-background-warning)", purple:"var(--color-background-secondary)" };
  return (
    <VizBox>
      {/* gate tabs */}
      <div style={{ display:"flex", borderBottom:"0.5px solid var(--color-border-tertiary)", overflowX:"auto" }}>
        {LSTM_GATES.map((gx,i)=>(
          <button key={i} onClick={()=>setStep(i)} style={{ background:i===step?colorBg[gx.color]:"transparent", border:"none", borderRight:"0.5px solid var(--color-border-tertiary)", padding:"7px 13px", cursor:"pointer", fontSize:12.5, whiteSpace:"nowrap", color:i===step?`var(--color-text-${gx.color})`:"var(--color-text-secondary)", fontWeight:i===step?500:400, flexShrink:0 }}>
            <i className={`ti ${gx.icon}`} style={{ fontSize:12, marginRight:5 }} aria-hidden />{`Gate ${i+1}`}
          </button>
        ))}
      </div>
      {/* equation */}
      <div style={{ padding:"0.85rem 1.1rem", background:"#1E1E1E", borderBottom:"0.5px solid #333" }}>
        <div style={{ fontSize:11, color:"#888", marginBottom:6, textTransform:"uppercase", letterSpacing:"0.07em" }}>{g.name}</div>
        <pre style={{ margin:0, fontFamily:"var(--font-mono)", fontSize:"12.5px", lineHeight:1.7, color:"#D4D4D4", whiteSpace:"pre" }}>{g.eq}</pre>
      </div>
      {/* intuition */}
      <div style={{ padding:"11px 15px", borderBottom:"0.5px solid var(--color-border-tertiary)" }}>
        <div style={{ fontSize:12, fontWeight:500, color:`var(--color-text-${g.color})`, marginBottom:6, textTransform:"uppercase", letterSpacing:"0.06em" }}>Intuition</div>
        <div style={{ fontSize:13.5, lineHeight:1.75, color:"var(--color-text-secondary)" }} dangerouslySetInnerHTML={{ __html:g.intuition }} />
      </div>
      {/* story */}
      <div style={{ padding:"10px 15px", background:colorBg[g.color], borderLeft:`3px solid ${colorBorder[g.color]}` }}>
        <div style={{ fontSize:12, fontWeight:500, color:`var(--color-text-${g.color})`, marginBottom:4 }}>Story context: "I grew up in France … I speak fluent ___"</div>
        <div style={{ fontSize:13, lineHeight:1.7, color:`var(--color-text-${g.color})` }}>{g.story}</div>
      </div>
      {/* controls */}
      <div style={{ display:"flex", justifyContent:"space-between", padding:"7px 13px", borderTop:"0.5px solid var(--color-border-tertiary)", background:"var(--color-background-secondary)" }}>
        <button onClick={()=>setStep(v=>Math.max(0,v-1))} disabled={step===0} style={{ background:"none", border:"0.5px solid var(--color-border-tertiary)", borderRadius:"var(--border-radius-md)", padding:"4px 12px", cursor:step===0?"default":"pointer", fontSize:13, color:step===0?"var(--color-text-tertiary)":"var(--color-text-secondary)" }}>← prev gate</button>
        <span style={{ fontSize:12, color:"var(--color-text-tertiary)", alignSelf:"center", fontFamily:"var(--font-mono)" }}>gate {step+1}/{LSTM_GATES.length}</span>
        <button onClick={()=>setStep(v=>Math.min(LSTM_GATES.length-1,v+1))} disabled={step===LSTM_GATES.length-1} style={{ background:"none", border:"0.5px solid var(--color-border-tertiary)", borderRadius:"var(--border-radius-md)", padding:"4px 12px", cursor:step===LSTM_GATES.length-1?"default":"pointer", fontSize:13, color:step===LSTM_GATES.length-1?"var(--color-text-tertiary)":"var(--color-text-secondary)" }}>next gate →</button>
      </div>
    </VizBox>
  );
}

function SectionLSTM() {
  return (
    <div>
      <Note color="info" icon="ti-bulb">
        <strong>Core LSTM insight:</strong> Vanilla RNNs fail on long sequences because gradients must be multiplied back through every timestep. LSTM solves this with a <em>cell state</em> c_t — a separate memory highway that uses <strong>addition</strong> instead of multiplication for updates. This creates an unobstructed gradient path, enabling dependencies across hundreds of timesteps.
      </Note>

      <H2>61.2.5 · Dual memory architecture</H2>
      <P c="LSTM maintains two vectors per timestep, compared to RNN's one:"/>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, margin:"0.75rem 0" }}>
        <div style={{ background:"var(--color-background-info)", border:"0.5px solid var(--color-border-info)", borderRadius:"var(--border-radius-md)", padding:"12px 13px" }}>
          <div style={{ fontWeight:500, fontSize:13.5, color:"var(--color-text-info)", marginBottom:7 }}>c_t — Cell state (long-term memory)</div>
          <div style={{ fontSize:12.5, color:"var(--color-text-info)", lineHeight:1.7 }}>
            Slow-changing, long-range information. Flows through the network with minimal transformation — only additive changes via gates. Analogy: <em>the whiteboard</em> — information can be written, erased, or preserved. Gradient flows nearly intact over hundreds of steps.
          </div>
        </div>
        <div style={{ background:"var(--color-background-success)", border:"0.5px solid var(--color-border-success)", borderRadius:"var(--border-radius-md)", padding:"12px 13px" }}>
          <div style={{ fontWeight:500, fontSize:13.5, color:"var(--color-text-success)", marginBottom:7 }}>h_t — Hidden state (short-term memory)</div>
          <div style={{ fontSize:12.5, color:"var(--color-text-success)", lineHeight:1.7 }}>
            Fast-changing, local context. Filtered output of c_t via the output gate. Passed to the next timestep and to downstream layers. Analogy: <em>working memory</em> — what you're currently thinking about, derived from the whiteboard.
          </div>
        </div>
      </div>

      <H2>62.1.4–5 · Complete LSTM equations</H2>
      <P c="Step through each gate below. All gates concatenate [h_{t-1}, x_t] — this is the input to every gate computation:" />
      <LSTMGateStepper />

      <H2>62.1.5 · All six equations in one place</H2>
      <Mx block>{"Forget gate:     f_t = σ( W_f · [h_{t-1}, x_t] + b_f )\nInput gate:      i_t = σ( W_i · [h_{t-1}, x_t] + b_i )\nCell candidate:  g_t = tanh( W_g · [h_{t-1}, x_t] + b_g )\nCell state:      c_t = f_t ⊙ c_{t-1}  +  i_t ⊙ g_t\nOutput gate:     o_t = σ( W_o · [h_{t-1}, x_t] + b_o )\nHidden state:    h_t = o_t ⊙ tanh(c_t)\n\nParameter count per LSTM cell (input_dim=D, hidden=H):\n  4 weight matrices: 4 × H × (D + H)  +  4 × H (biases)\n  = 4H(D + H + 1)\n\nExample H=128, D=64: 4×128×(64+128+1) = 98,816  (4× SimpleRNN)"}</Mx>

      <H2>61.1.3 · Why LSTM solves vanishing gradients</H2>
      <P c="The cell state update c_t = f_t ⊙ c_{t-1} + i_t ⊙ g_t creates an additive gradient path:" />
      <Mx block>{"∂c_t/∂c_{t-1}  =  f_t  (just the forget gate values)\n\n∂L/∂c_k  =  ∂L/∂c_T · ∏_{t=k+1}^{T}  f_t\n\nKey: if f_t ≈ 1 (keep gate open), the product = 1 · 1 · 1 … = 1\n  → gradient flows unchanged over arbitrary distances!\n\nCompare to RNN:  ∂L/∂h_k = ∂L/∂h_T · ∏ W_h^T · diag(tanh') → 0 exponentially"}</Mx>

      <H2>57.0.6 · IMDB sentiment analysis — full code</H2>
      <Code>{`import tensorflow as tf
from tensorflow import keras

# ── Data ──────────────────────────────────────────────────────────────────────
(x_train, y_train), (x_test, y_test) = keras.datasets.imdb.load_data(num_words=10000)
x_train = keras.preprocessing.sequence.pad_sequences(x_train, maxlen=200)
x_test  = keras.preprocessing.sequence.pad_sequences(x_test,  maxlen=200)

# ── Model ─────────────────────────────────────────────────────────────────────
model = keras.Sequential([
    keras.layers.Embedding(input_dim=10000, output_dim=128, input_length=200),
    # input: (batch, 200)  →  output: (batch, 200, 128)
    keras.layers.LSTM(64, dropout=0.3, recurrent_dropout=0.3),
    # input: (batch, 200, 128) → output: (batch, 64)  [last h_T]
    keras.layers.Dense(1, activation="sigmoid"),
], name="lstm_sentiment")

model.compile(
    optimizer=keras.optimizers.Adam(1e-3),
    loss="binary_crossentropy",
    metrics=["accuracy"],
)
history = model.fit(
    x_train, y_train,
    epochs=5, batch_size=128,
    validation_split=0.2,
)
# Typical: ~87-89% test accuracy (vs ~85% for SimpleRNN)`}</Code>

      <H2>63 · Next word predictor — LSTM language model</H2>
      <Code>{`import numpy as np
from tensorflow import keras

# ── 1. Preprocessing ──────────────────────────────────────────────────────────
text = open("corpus.txt").read().lower()
chars = sorted(set(text))
char2idx = {c:i for i,c in enumerate(chars)}
idx2char = {i:c for c,i in char2idx.items()}

SEQ_LEN = 40
step     = 3
sequences, targets = [], []
for i in range(0, len(text)-SEQ_LEN, step):
    sequences.append([char2idx[c] for c in text[i:i+SEQ_LEN]])
    targets.append(char2idx[text[i+SEQ_LEN]])

X = keras.utils.to_categorical(sequences, num_classes=len(chars))
y = keras.utils.to_categorical(targets,   num_classes=len(chars))

# ── 2. Model ──────────────────────────────────────────────────────────────────
model = keras.Sequential([
    keras.layers.LSTM(256, input_shape=(SEQ_LEN, len(chars)), return_sequences=True),
    keras.layers.Dropout(0.3),
    keras.layers.LSTM(128),
    keras.layers.Dropout(0.3),
    keras.layers.Dense(len(chars), activation="softmax"),
])
model.compile(optimizer=keras.optimizers.RMSprop(1e-3), loss="categorical_crossentropy")

# ── 3. Sampling with temperature ──────────────────────────────────────────────
def sample(preds, temperature=1.0):
    # temperature < 1 = conservative; > 1 = creative
    preds = np.asarray(preds).astype("float64")
    preds = np.log(preds + 1e-8) / temperature
    preds = np.exp(preds) / np.sum(np.exp(preds))
    return np.argmax(np.random.multinomial(1, preds))`}</Code>

      <H2>Interview Q&A</H2>
      <QA q="How does the LSTM cell state solve the vanishing gradient problem?"
         a="The key is in the cell state update: c_t = f_t ⊙ c_{t-1} + i_t ⊙ g_t. Because this is an <strong>addition</strong>, the gradient ∂c_t/∂c_{t-1} = f_t. If the forget gate learns to stay open (f_t ≈ 1), the gradient flows back unchanged: ∂L/∂c_k = ∂L/∂c_T · ∏ f_t ≈ 1. Compare this to RNN where ∂h_t/∂h_{t-1} = W_h^T · diag(tanh') — a matrix multiply that shrinks the gradient each step. The LSTM cell state creates an 'unobstructed gradient highway' that can carry learning signal over hundreds of timesteps." />
      <QA q="What are the forget, input, and output gates conceptually?"
         a="<strong>Forget gate f_t</strong>: 'What old information is no longer relevant?' Multiplies c_{t-1} element-wise — values close to 0 erase, close to 1 retain. <strong>Input gate i_t</strong>: 'How much of this new candidate information should we write?' Works with g_t (the candidate): actual write = i_t ⊙ g_t. <strong>Output gate o_t</strong>: 'What do we expose from memory to the outside world?' Filters the full cell state c_t before outputting as h_t: h_t = o_t ⊙ tanh(c_t). Together they implement a learnable read-write memory system." />
      <QA q="Why does LSTM use 4× more parameters than SimpleRNN?"
         a="A SimpleRNN has one gate: one set of {W_x, W_h, b}. An LSTM has four parallel gate computations (forget, input, cell candidate, output), each requiring their own full weight matrices. For hidden_size=H and input_size=D: SimpleRNN has H(D+H+1) parameters; LSTM has 4H(D+H+1). For H=128, D=64: SimpleRNN ≈ 24.7K, LSTM ≈ 98.8K parameters. The 4× cost is the price for solving the vanishing gradient problem and enabling long-range memory." />
      <QA q="What is recurrent_dropout in Keras LSTM and how does it differ from regular dropout?"
         a="Regular <code>dropout</code> drops inputs at each timestep — it masks the input vector x_t. <code>recurrent_dropout</code> drops the hidden state recurrent connections — it masks h_{t-1} when computing gate values. Crucially, the same dropout mask is applied at every timestep within a single forward pass (not resampled per step), making it a proper variational dropout. This is important because resampling at every step would break temporal correlations and destabilise training. Both should typically be set to the same value (e.g. 0.3)." />
      <QA q="What is temperature in next-word prediction and what does changing it do?"
         a="Temperature T rescales the logits before the softmax: p_i = exp(logit_i / T) / Σ exp(logit_j / T). <strong>T &lt; 1</strong>: sharpens the distribution — the most probable next token dominates, output is more predictable and repetitive. <strong>T = 1</strong>: standard softmax, samples proportional to learned probabilities. <strong>T &gt; 1</strong>: flattens the distribution — less probable tokens get more chance, output is more diverse and creative but may be less coherent. T is not a trained parameter — it is a decoding hyperparameter set at inference time." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 6 — GRU (Ch 65)
══════════════════════════════════════════════════════ */
function SectionGRU() {
  return (
    <div>
      <Note color="success" icon="ti-arrows-minimize">
        <strong>GRU in one sentence:</strong> GRU (Gated Recurrent Unit, Cho et al. 2014) merges the LSTM's cell state and hidden state into a single vector, and replaces the three gates with two — achieving comparable performance to LSTM with 25% fewer parameters and faster training.
      </Note>

      <H2>65.2 · Why GRU exists — motivation</H2>
      <P c="LSTM has 4 gate matrices and dual memory (c_t, h_t) — expressive but expensive. For many tasks, especially smaller datasets, this extra capacity is unnecessary and the added parameters increase overfitting risk. GRU collapses the architecture to its minimal effective form."/>

      <H2>65.6 · GRU architecture — equations</H2>
      <Mx block>{"Reset gate:       r_t = σ( W_r · [h_{t-1}, x_t] + b_r )\n  → How much of h_{t-1} to 'forget' when computing candidate\n\nUpdate gate:      z_t = σ( W_z · [h_{t-1}, x_t] + b_z )\n  → How much of h_{t-1} to keep vs. replace with new content\n\nCandidate state:  h̃_t = tanh( W_h · [r_t ⊙ h_{t-1}, x_t] + b_h )\n  → New candidate hidden state, conditioned on reset gate\n\nNew hidden state: h_t = (1 - z_t) ⊙ h_{t-1}  +  z_t ⊙ h̃_t\n  → Interpolate: z_t≈0 keeps old, z_t≈1 takes new candidate\n\nParameter count (input_dim=D, hidden=H):\n  3 weight matrices: 3H(D+H) + 3H biases = 3H(D+H+1)\n  Example H=128, D=64: 3×128×193 = 74,112  (vs LSTM: 98,816)"}</Mx>

      <H2>65.7 · Step-by-step GRU forward pass</H2>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10, margin:"0.75rem 0" }}>
        {[
          { step:"Step 1", name:"Reset gate r_t", color:"danger",
            body:"r_t ∈ (0,1). When r_t ≈ 0, the reset gate ignores h_{t-1} — the candidate h̃_t is computed as if starting fresh from x_t alone. Useful at sentence boundaries or topic shifts." },
          { step:"Step 2", name:"Update gate z_t", color:"info",
            body:"z_t ∈ (0,1). Controls interpolation between old state and new candidate. When z_t ≈ 0, h_t ≈ h_{t-1} (copy old state — long-term memory). When z_t ≈ 1, h_t ≈ h̃_t (replace with new info)." },
          { step:"Step 3", name:"New hidden h_t", color:"success",
            body:"h_t = (1-z_t)⊙h_{t-1} + z_t⊙h̃_t. This linear interpolation is differentiable and creates a gradient path analogous to LSTM's cell state — gradients flow through the (1-z_t) copy path without shrinking." },
        ].map(({step,name,color,body})=>(
          <div key={step} style={{ border:"0.5px solid var(--color-border-tertiary)", borderRadius:"var(--border-radius-md)", padding:"12px 13px" }}>
            <div style={{ fontFamily:"var(--font-mono)", fontSize:11, color:`var(--color-text-${color})`, marginBottom:4 }}>{step}</div>
            <div style={{ fontWeight:500, fontSize:13, color:"var(--color-text-primary)", marginBottom:6 }}>{name}</div>
            <div style={{ fontSize:12.5, color:"var(--color-text-secondary)", lineHeight:1.65 }}>{body}</div>
          </div>
        ))}
      </div>

      <H2>65.11 · LSTM vs GRU — comprehensive comparison</H2>
      <Table
        heads={["Dimension","LSTM","GRU","Winner"]}
        rows={[
          ["Gates","3 (forget, input, output)","2 (reset, update)","GRU (simpler)"],
          ["Memory vectors","2 (c_t and h_t)","1 (h_t only)","GRU (simpler)"],
          ["Parameters (H=128, D=64)","~98,816","~74,112","GRU (−25%)"],
          ["Training speed","Slower","~33% faster","GRU"],
          ["Long-range dependencies","Excellent (additive c_t)","Good (interpolation in h_t)","LSTM (theoretically)"],
          ["Practical performance","Slightly better on long sequences","Comparable on most tasks","Task-dependent"],
          ["Memory usage","Higher (store c_t and h_t)","Lower (h_t only)","GRU"],
          ["Default choice","Long text, complex sequences","Time-series, speech, faster training","Context-dependent"],
        ]}
      />

      <H2>65 · Keras implementation</H2>
      <Code>{`# Drop-in replacement for LSTM — same API
model = keras.Sequential([
    keras.layers.Embedding(10000, 64),
    keras.layers.GRU(128, dropout=0.3, recurrent_dropout=0.3),
    keras.layers.Dense(1, activation="sigmoid"),
])
# GRU trains ~30% faster than equivalent LSTM on same hardware

# Stacked GRU (return_sequences=True for all but last)
model2 = keras.Sequential([
    keras.layers.Embedding(10000, 64),
    keras.layers.GRU(128, return_sequences=True, dropout=0.2),
    keras.layers.GRU(64),
    keras.layers.Dense(1, activation="sigmoid"),
])

# GRU with return_state for encoder-decoder
output, last_state = keras.layers.GRU(
    128, return_sequences=True, return_state=True
)(embedded_input)
# Note: GRU returns ONE state (h_T); LSTM returns TWO (h_T, c_T)`}</Code>

      <H2>Interview Q&A</H2>
      <QA q="Explain the role of the update gate z_t in GRU — what LSTM functionality does it replace?"
         a="The update gate z_t ∈ (0,1) controls the interpolation: h_t = (1-z_t)⊙h_{t-1} + z_t⊙h̃_t. It simultaneously plays two roles: (1) <strong>Like LSTM's forget gate</strong>: (1-z_t) determines how much of the old state to keep; when z_t≈0, h_t≈h_{t-1}, copying the old state. (2) <strong>Like LSTM's input gate</strong>: z_t determines how much of the new candidate h̃_t to accept. By combining these two roles into one gate, GRU reduces parameters by 25% while achieving similar long-range memory via the copy path (z_t≈0 creates a gradient highway analogous to LSTM's f_t≈1 cell state path)." />
      <QA q="What does the reset gate r_t do and when would it fire strongly?"
         a="r_t = σ(W_r·[h_{t-1}, x_t]) ∈ (0,1). It modulates how much of h_{t-1} influences the candidate: h̃_t = tanh(W_h·[r_t⊙h_{t-1}, x_t]). When r_t≈0: h_{t-1} is zeroed out before computing the candidate — the new candidate is computed almost entirely from the current input x_t. When r_t≈1: h_{t-1} fully influences the candidate. r_t fires strongly (≈0) at natural sentence or topic boundaries, where past context is irrelevant. This is analogous to LSTM's forget gate erasing the cell state." />
      <QA q="When would you choose GRU over LSTM in practice?"
         a="Choose GRU when: (1) <strong>Compute budget is limited</strong> — GRU trains ~30% faster and uses less memory; (2) <strong>Dataset is small to medium</strong> — GRU has fewer parameters, reducing overfitting risk; (3) <strong>The task involves shorter dependencies</strong> — speech, short-text sentiment, time-series; (4) <strong>Rapid prototyping</strong> — faster iteration. Choose LSTM when: (1) very long sequences (e.g. paragraph-level language modelling); (2) you need separate c_t and h_t for downstream use (e.g. seq2seq where initial state matters); (3) empirical experiments show LSTM outperforms GRU on your specific task." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 7 — DEEP RNNs + BiRNN (Ch 64, 66)
══════════════════════════════════════════════════════ */
function SectionDeepBi() {
  return (
    <div>
      <H2>64.1 · Deep / Stacked RNNs</H2>
      <Note color="info" icon="ti-layers">
        Just as deep CNNs learn hierarchical features (edges → textures → objects), stacked RNNs learn hierarchical temporal features. Layer 1 learns short-range patterns; deeper layers synthesise longer-range abstractions. The key change: intermediate layers must output sequences, not just final states.
      </Note>

      <H2>64.1.3 · Stacked LSTM information flow</H2>
      <Mx block>{"Layer 1:  h_t^(1) = LSTM_1( x_t,  h_{t-1}^(1),  c_{t-1}^(1) )\nLayer 2:  h_t^(2) = LSTM_2( h_t^(1), h_{t-1}^(2), c_{t-1}^(2) )\nLayer l:  h_t^(l) = LSTM_l( h_t^(l-1), h_{t-1}^(l), c_{t-1}^(l) )\n\nThe input to layer l at time t is the OUTPUT of layer l-1 at time t.\nEvery layer has its own independent hidden state and cell state.\nOutput of the stack = {h_t^(L)} for all t, or just h_T^(L)."}</Mx>

      <H2>64.1.5 · Deep RNN implementation</H2>
      <Code>{`# Stacked LSTM — return_sequences=True for all but the last
model = keras.Sequential([
    keras.layers.Embedding(10000, 128),
    keras.layers.LSTM(256, return_sequences=True, dropout=0.2),  # → (batch, T, 256)
    keras.layers.LSTM(128, return_sequences=True, dropout=0.2),  # → (batch, T, 128)
    keras.layers.LSTM(64),                                        # → (batch, 64) final
    keras.layers.Dense(1, activation="sigmoid"),
])

# Stacked GRU — same pattern
model_gru = keras.Sequential([
    keras.layers.Embedding(10000, 64),
    keras.layers.GRU(128, return_sequences=True),
    keras.layers.GRU(64, return_sequences=True),
    keras.layers.GRU(32),
    keras.layers.Dense(10, activation="softmax"),
])

# Why NOT too many layers? Diminishing returns + BPTT across layers
# Best practice: 2-4 stacked layers; deeper → use Transformers instead`}</Code>

      <H2>Bidirectional RNNs — motivation</H2>
      <P c="A standard RNN at timestep t can only use context from the past (x_0, …, x_{t-1}). For many NLP tasks, future context is equally important: in 'I went to the bank to ___ money', 'bank' can only be correctly disambiguated by reading ahead to 'money'. A Bidirectional RNN runs two RNNs in parallel:"/>
      <Mx block>{"Forward RNN (→):   h_t^f = RNN_f( x_0, x_1, …, x_t )\n  processes left to right; h_t^f has access to past context\n\nBackward RNN (←):  h_t^b = RNN_b( x_T, x_{T-1}, …, x_t )\n  processes right to left; h_t^b has access to future context\n\nMerged output at t:  ỹ_t = merge( h_t^f, h_t^b )\n  merge modes: Concatenate (default), Add, Multiply, Average"}</Mx>

      <H2>66.2.4 · Bidirectional RNN — Keras</H2>
      <Code>{`# Bidirectional wrapper works with any RNN: SimpleRNN, LSTM, GRU
model = keras.Sequential([
    keras.layers.Embedding(10000, 64),
    # Default merge_mode="concat" → output dim = 2 × units = 256
    keras.layers.Bidirectional(keras.layers.LSTM(128)),
    keras.layers.Dense(1, activation="sigmoid"),
])

# For sequence-to-sequence — return all timestep representations
model2 = keras.Sequential([
    keras.layers.Embedding(10000, 64),
    keras.layers.Bidirectional(
        keras.layers.LSTM(128, return_sequences=True),
        merge_mode="concat",          # (batch, T, 256)
    ),
    keras.layers.TimeDistributed(keras.layers.Dense(num_tags, activation="softmax")),
])

# Stacked Bidirectional layers
model3 = keras.Sequential([
    keras.layers.Embedding(10000, 64),
    keras.layers.Bidirectional(keras.layers.LSTM(128, return_sequences=True)),
    keras.layers.Bidirectional(keras.layers.LSTM(64)),
    keras.layers.Dense(1, activation="sigmoid"),
])`}</Code>

      <H2>66.2.3 · Merge modes compared</H2>
      <Table
        heads={["merge_mode","Output dim","Operation","Use case"]}
        rows={[
          ["concat (default)","2 × units","[h^f; h^b] — concatenate","Most expressive; default choice"],
          ["sum","units","h^f + h^b","Parameter-free combination; lower dim"],
          ["mul","units","h^f ⊙ h^b","Element-wise product; captures interactions"],
          ["ave","units","(h^f + h^b) / 2","Compromise between sum and concat"],
        ]}
      />

      <H2>66.2.6 · Advantages and limitations</H2>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, margin:"0.75rem 0" }}>
        <div style={{ background:"var(--color-background-success)", border:"0.5px solid var(--color-border-success)", borderRadius:"var(--border-radius-md)", padding:"12px 14px" }}>
          <div style={{ fontWeight:500, fontSize:13, color:"var(--color-text-success)", marginBottom:8 }}>Advantages</div>
          {["Accesses full sequence context at every position","Significantly improves NER, POS tagging, reading comprehension","BiLSTM is the backbone of pre-Transformer models (ELMo, BERT precursors)","Same API as unidirectional — Bidirectional() wrapper"].map(a=>(
            <div key={a} style={{ display:"flex", gap:6, marginBottom:5, fontSize:12.5, color:"var(--color-text-success)" }}>
              <i className="ti ti-check" style={{ fontSize:12, flexShrink:0, marginTop:2 }} aria-hidden />{a}
            </div>
          ))}
        </div>
        <div style={{ background:"var(--color-background-danger)", border:"0.5px solid var(--color-border-danger)", borderRadius:"var(--border-radius-md)", padding:"12px 14px" }}>
          <div style={{ fontWeight:500, fontSize:13, color:"var(--color-text-danger)", marginBottom:8 }}>Limitations</div>
          {["Cannot be used for real-time generation — requires full sequence upfront","2× compute and memory vs unidirectional","Cannot be used as a generative decoder — decoders must be causal (left-to-right only)","Merge modes lose information vs attention mechanisms on long sequences"].map(a=>(
            <div key={a} style={{ display:"flex", gap:6, marginBottom:5, fontSize:12.5, color:"var(--color-text-danger)" }}>
              <i className="ti ti-x" style={{ fontSize:12, flexShrink:0, marginTop:2 }} aria-hidden />{a}
            </div>
          ))}
        </div>
      </div>

      <H2>64.2 · Why and when to use deep RNNs</H2>
      <Table
        heads={["Consideration","Shallow RNN (1 layer)","Deep RNN (2-4 layers)","Very Deep (5+)→ Transformer"]}
        rows={[
          ["Feature hierarchy","Single-level patterns","Hierarchical abstractions","Rich compositional features"],
          ["Short sequences < 100","Often sufficient","Marginal gain","Unnecessary complexity"],
          ["Long sequences > 500","Struggles","Better generalisation","Transformers recommended"],
          ["Training stability","Easy","Add dropout between layers","Use residual connections"],
          ["Parameter count","H(D+H+1)","L × H(H+H+1) ≈ 2LH²","Scales quadratically with attention"],
          ["Typical choice","Baseline/prototype","Most real-world tasks","NLP state-of-the-art"],
        ]}
      />

      <H2>Interview Q&A</H2>
      <QA q="Why does stacking RNN layers require return_sequences=True?"
         a="Each RNN layer processes a <em>sequence</em> and outputs a representation for each timestep. Without <code>return_sequences=True</code>, the layer discards all intermediate hidden states and returns only the final state h_T — a single vector of shape (batch, units). The next RNN layer needs a 3D tensor (batch, timesteps, features) as input; a 2D tensor (batch, units) has no time dimension to iterate over. Only the last RNN layer in a stack can return the final state alone; all preceding layers must return the full sequence." />
      <QA q="Why can't a Bidirectional RNN be used for text generation?"
         a="Text generation is inherently a left-to-right, causal process — you generate token t+1 using only tokens 0…t. A bidirectional RNN's backward pass reads tokens t+1, t+2, … — future tokens that don't exist yet at generation time. Using a BiRNN for generation would require the entire output sequence to be available before producing any token, which is a contradiction for autoregressive generation. Bidirectional models are encoder-only — they can understand an existing sequence but cannot generate one token at a time." />
      <QA q="How does a stacked LSTM differ from a single wider LSTM?"
         a="A single wider LSTM (e.g. LSTM(512)) has more capacity within one layer, but all transformations happen at the same 'level of abstraction'. A stacked LSTM (e.g. LSTM(256) × 2 layers) allows the architecture to build hierarchical representations: layer 1 learns local short-range patterns; layer 2 synthesises longer-range dependencies from layer 1's abstractions. This is analogous to CNNs where early layers detect edges and later layers detect faces. Empirically, 2-3 stacked layers outperform single wide layers for NLP tasks, but diminishing returns set in quickly — beyond 4 layers, Transformer architectures are more parameter-efficient." />
      <QA q="What is the gradient flow path in a stacked BiLSTM?"
         a="In a stacked bidirectional LSTM, gradients flow through multiple pathways: (1) <strong>Through time</strong>: for each layer, gradients flow backwards through timesteps via the cell state (additive path — LSTM's key property); (2) <strong>Through layers</strong>: gradients also flow from the top layer back down through intermediate layers at each timestep; (3) <strong>Both directions</strong>: both the forward and backward LSTM sub-networks have their own gradient paths. The cell state's additive update in each direction mitigates vanishing gradients across time; residual connections between stacked layers mitigate vanishing across depth (used in modern implementations like BERT's bidirectional transformer)." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   ROOT
══════════════════════════════════════════════════════ */
const TABS=[
  {id:"why",   label:"Why RNNs",            sub:"Ch 55 · Seq data, ANN limits"},
  {id:"arch",  label:"Architecture",         sub:"Ch 56 · Forward prop, Keras"},
  {id:"types", label:"RNN Types",            sub:"Ch 58 · M2M, M2O, O2M"},
  {id:"bptt",  label:"BPTT & Problems",      sub:"Ch 59–60 · Vanishing gradients"},
  {id:"lstm",  label:"LSTM",                 sub:"Ch 61–63 · Gates, Sentiment, LM"},
  {id:"gru",   label:"GRU",                  sub:"Ch 65 · Architecture, vs LSTM"},
  {id:"deep",  label:"Deep & BiRNN",         sub:"Ch 64, 66 · Stacked, Bidirectional"},
];

export default function RNN() {
  const [active,setActive]=useState("why");
  const map={
    why:<SectionWhyRNN/>,
    arch:<SectionArchitecture/>,
    types:<SectionRNNTypes/>,
    bptt:<SectionBPTT/>,
    lstm:<SectionLSTM/>,
    gru:<SectionGRU/>,
    deep:<SectionDeepBi/>,
  };
  
  return (
    <div>
      <div className="page-header">
        <div className="page-header-eyebrow">Deep Learning — Module 14</div>
        <h1 className="page-header-title">RNNs · LSTM · GRU · BiRNN · Deep RNNs</h1>
        <p className="page-header-subtitle">Sequential data · Forward prop stepper · BPTT gradient decay · LSTM gate walkthrough · Stacked & Bidirectional</p>
      </div>

      <SectionNav tabs={TABS} active={active} onChange={setActive} />

      <div style={{ padding: "0.5rem 0 2rem" }}>
        {map[active]}
      </div>

      <NavButtons moduleId={14} />
    </div>
  );
}
