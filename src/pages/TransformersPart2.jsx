import { useState, useEffect } from "react";
import { Code } from '../components/ui/Code.jsx';
import { Mx, H2, H3, P } from '../components/ui/Typography.jsx';
import { QA } from '../components/ui/QA.jsx';
import { Note, Table } from '../components/ui/Primitives.jsx';
import NavButtons from '../components/layout/NavButtons.jsx';
import SectionNav from '../components/layout/SectionNav.jsx';

/* ══════════════════════════════════════════════════════
   INTERACTIVE — POSITIONAL ENCODING VISUALISER
══════════════════════════════════════════════════════ */
function PEVisualiser() {
  const [selDim, setSelDim] = useState(0);
  var maxPos = 50;
  var dModel  = 16;

  function pe(pos, dim) {
    if (dim % 2 === 0) {
      return Math.sin(pos / Math.pow(10000, dim / dModel));
    } else {
      return Math.cos(pos / Math.pow(10000, (dim - 1) / dModel));
    }
  }

  // Full PE matrix: rows=positions 0..maxPos-1, cols=dims 0..dModel-1
  var matrix = [];
  for (var p = 0; p < maxPos; p++) {
    var row = [];
    for (var d = 0; d < dModel; d++) { row.push(pe(p, d)); }
    matrix.push(row);
  }

  // Selected dimension waveform across positions
  var wave = matrix.map((row, p) => ({ p:p, v:row[selDim] }));

  var W = 460, H = 90, padL = 30, padR = 10, padT = 8, padB = 20;
  var plotW = W - padL - padR;
  var plotH = H - padT - padB;

  function xPx(p){ return padL + (p / (maxPos-1)) * plotW; }
  function yPx(v){ return padT + (1 - (v+1)/2) * plotH; }

  var pathD = wave.map((pt, i) => (i===0?"M":"L") + xPx(pt.p).toFixed(1) + "," + yPx(pt.v).toFixed(1)).join(" ");

  // Heat map: 16 rows (dims) x 50 cols (positions)
  var cellW = Math.floor(plotW / maxPos);
  var cellH = 10;

  return (
    <div style={{ border:"0.5px solid var(--color-border-tertiary)", borderRadius:"var(--border-radius-lg)", overflow:"hidden", margin:"0.75rem 0" }}>
      {/* dim selector */}
      <div style={{ padding:"0.75rem 1rem", borderBottom:"0.5px solid var(--color-border-tertiary)", background:"var(--color-background-secondary)" }}>
        <div style={{ fontSize:11, color:"var(--color-text-tertiary)", marginBottom:6, textTransform:"uppercase", letterSpacing:"0.06em" }}>
          Select dimension to visualise its sine/cosine waveform
        </div>
        <div style={{ display:"flex", flexWrap:"wrap", gap:5 }}>
          {Array.from({length:dModel}, (_, d) => {
            var isSine = d % 2 === 0;
            return (
              <button key={d} onClick={() => setSelDim(d)} style={{ padding:"3px 9px", borderRadius:4, border:"1px solid " + (selDim===d?"#185FA5":"var(--color-border-tertiary)"), background:selDim===d?"#E6F1FB":"transparent", fontSize:12, fontFamily:"var(--font-mono)", fontWeight:selDim===d?600:400, color:selDim===d?"#0C447C":"var(--color-text-secondary)", cursor:"pointer" }}>
                {isSine ? "sin" : "cos"}({d})
              </button>
            );
          })}
        </div>
      </div>

      {/* waveform */}
      <div style={{ padding:"0.75rem 1rem", borderBottom:"0.5px solid var(--color-border-tertiary)" }}>
        <div style={{ fontSize:12, color:"var(--color-text-secondary)", marginBottom:6 }}>
          Dimension {selDim} ({selDim%2===0?"sine":"cosine"}, frequency = 1 / 10000^({selDim%2===0?selDim:selDim-1}/{dModel})) across {maxPos} positions:
        </div>
        <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display:"block" }}>
          {/* axes */}
          <line x1={padL} y1={padT} x2={padL} y2={padT+plotH} stroke="var(--color-border-secondary)" strokeWidth={0.8} />
          <line x1={padL} y1={padT+plotH/2} x2={padL+plotW} y2={padT+plotH/2} stroke="var(--color-border-secondary)" strokeWidth={0.8} strokeDasharray="3 3" />
          <text x={padL-4} y={padT+plotH/2+3} textAnchor="end" style={{ fill:"var(--color-text-tertiary)", fontSize:"8px" }}>0</text>
          <text x={padL-4} y={padT+4} textAnchor="end" style={{ fill:"var(--color-text-tertiary)", fontSize:"8px" }}>1</text>
          <text x={padL-4} y={padT+plotH+4} textAnchor="end" style={{ fill:"var(--color-text-tertiary)", fontSize:"8px" }}>-1</text>
          {/* zero line labels */}
          <text x={padL+plotW/2} y={padT+plotH+padB-2} textAnchor="middle" style={{ fill:"var(--color-text-tertiary)", fontSize:"9px" }}>position</text>
          {/* waveform */}
          <path d={pathD} fill="none" stroke="#185FA5" strokeWidth={2} />
          {/* dots for each integer position */}
          {wave.filter(pt => pt.p % 5 === 0).map(pt => (
            <circle key={pt.p} cx={xPx(pt.p)} cy={yPx(pt.v)} r={2.5} fill="#185FA5" />
          ))}
        </svg>
      </div>

      {/* heatmap */}
      <div style={{ padding:"0.75rem 1rem" }}>
        <div style={{ fontSize:12, color:"var(--color-text-secondary)", marginBottom:6 }}>
          Full PE matrix heatmap ({dModel} dimensions × {maxPos} positions). Each row = one dimension. Blue = positive, Red = negative.
        </div>
        <div style={{ overflowX:"auto" }}>
          <div style={{ display:"inline-block" }}>
            {matrix[0].map((_, d) => (
              <div key={d} style={{ display:"flex", height:cellH+"px" }}>
                {matrix.map((row, p) => {
                  var v = row[d];
                  var r = v > 0 ? 24  : 153;
                  var g = v > 0 ? 95  : 44;
                  var b = v > 0 ? 165 : 29;
                  var alpha = Math.abs(v) * 0.9 + 0.1;
                  return (
                    <div key={p} style={{ width:cellW+"px", height:cellH+"px", background:`rgba(${r},${g},${b},${alpha.toFixed(2)})`, borderRight:d===selDim?"1px solid #534AB7":"none" }} title={`pos=${p}, dim=${d}, val=${v.toFixed(3)}`} />
                  );
                })}
              </div>
            ))}
            <div style={{ display:"flex", marginTop:4 }}>
              {[0,10,20,30,40,49].map(p => (
                <div key={p} style={{ width:cellW*10+"px", fontSize:8.5, color:"var(--color-text-tertiary)", textAlign:"left", fontFamily:"var(--font-mono)" }}>{p}</div>
              ))}
            </div>
          </div>
        </div>
        <div style={{ fontSize:11.5, color:"var(--color-text-tertiary)", marginTop:4 }}>
          Low dimensions (top rows) = slow, low-frequency patterns. High dimensions (bottom rows) = fast, high-frequency patterns. Each position gets a unique fingerprint from this combination.
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   INTERACTIVE — BATCH NORM vs LAYER NORM
══════════════════════════════════════════════════════ */
function NormViz() {
  const [mode, setMode] = useState("layer");
  // 4 samples, 5 features — a mini batch
  var batch = [
    [2.1, 0.3, -1.2, 0.8, 1.5],
    [0.5, -0.8, 2.3, -0.4, 0.9],
    [1.8, 1.2, 0.4, -1.1, -0.6],
    [-0.3, 0.7, -0.9, 1.6, 0.2],
  ];
  var nSamples = batch.length;
  var nFeatures = batch[0].length;
  var cellW = 46, cellH = 36;

  function cellColor(val) {
    var t = Math.max(-1, Math.min(1, val / 2.5));
    if (t > 0) {
      var r = Math.round(248 + (24-248)*t);
      var g = Math.round(247 + (95-247)*t);
      var b = Math.round(246 + (165-246)*t);
      return `rgb(${r},${g},${b})`;
    } else {
      var t2 = -t;
      var r2 = Math.round(248 + (153-248)*t2);
      var g2 = Math.round(247 + (44-247)*t2);
      var b2 = Math.round(246 + (29-246)*t2);
      return `rgb(${r2},${g2},${b2})`;
    }
  }

  return (
    <div style={{ border:"0.5px solid var(--color-border-tertiary)", borderRadius:"var(--border-radius-lg)", overflow:"hidden", margin:"0.75rem 0" }}>
      {/* toggle */}
      <div style={{ display:"flex", borderBottom:"0.5px solid var(--color-border-tertiary)" }}>
        {[{id:"batch",label:"Batch Normalisation"},{id:"layer",label:"Layer Normalisation"}].map(m => (
          <button key={m.id} onClick={() => setMode(m.id)} style={{ flex:1, padding:"9px 0", border:"none", background:mode===m.id?"var(--color-background-secondary)":"transparent", fontSize:13.5, fontWeight:mode===m.id?500:400, color:mode===m.id?"var(--color-text-primary)":"var(--color-text-secondary)", cursor:"pointer", borderBottom:mode===m.id?(`2px solid ${m.id==="layer"?"#0F6E56":"#534AB7"}`):"2px solid transparent" }}>
            {m.label}
          </button>
        ))}
      </div>

      <div style={{ padding:"1rem", display:"grid", gridTemplateColumns:"auto 1fr", gap:12, alignItems:"center" }}>
        {/* matrix */}
        <div>
          <div style={{ fontSize:10, color:"var(--color-text-tertiary)", marginBottom:4, textTransform:"uppercase", letterSpacing:"0.06em" }}>
            Batch (4 samples × 5 features)
          </div>
          {/* column headers */}
          <div style={{ display:"flex", marginBottom:2, paddingLeft:24 }}>
            {batch[0].map((_, ci) => (
              <div key={ci} style={{ width:cellW+"px", textAlign:"center", fontSize:10, color:mode==="batch"?"#534AB7":"var(--color-text-tertiary)", fontWeight:mode==="batch"?600:400 }}>f{ci}</div>
            ))}
          </div>
          {batch.map((row, ri) => (
            <div key={ri} style={{ display:"flex", alignItems:"center", marginBottom:2 }}>
              <div style={{ width:22, fontSize:10, color:mode==="layer"?"#0F6E56":"var(--color-text-tertiary)", fontWeight:mode==="layer"?600:400 }}>s{ri}</div>
              {row.map((val, ci) => (
                <div key={ci} style={{ width:cellW+"px", height:cellH+"px", background:cellColor(val), border:"1px solid var(--color-border-tertiary)", outline:mode==="layer"&&ci===0?"2px solid #0F6E56":mode==="layer"&&ci===nFeatures-1?"2px solid #0F6E56":"none", display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontFamily:"var(--font-mono)", color:"#3F3E3A", position:"relative" }}>
                  {val.toFixed(1)}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* explanation */}
        <div>
          {mode === "batch" ? (
            <div>
              <div style={{ fontWeight:500, fontSize:13.5, color:"#534AB7", marginBottom:8 }}>Batch Norm normalises each feature (column) across the batch</div>
              <p style={{ fontSize:12.5, color:"var(--color-text-secondary)", lineHeight:1.7, margin:"0 0 8px" }}>For each feature fᵢ, compute the mean and std across all 4 samples. Subtract mean, divide by std. Result: every feature column has mean=0, std=1 <em>across the batch</em>.</p>
              <div style={{ background:"#EEEDFE", border:"1px solid #534AB7", borderRadius:6, padding:"7px 10px", fontSize:12, fontFamily:"var(--font-mono)", color:"#3C3489" }}>
                μ_fᵢ = mean(s0[fᵢ], s1[fᵢ], s2[fᵢ], s3[fᵢ])<br/>
                σ_fᵢ = std over batch dimension
              </div>
              <div style={{ marginTop:8, fontSize:12.5, color:"var(--color-text-danger)" }}>
                <strong>Problem in Transformers:</strong> sequences have variable lengths and batch statistics change at every step — the "batch" is not stable. At inference with batch_size=1, there is no batch to compute statistics from.
              </div>
            </div>
          ) : (
            <div>
              <div style={{ fontWeight:500, fontSize:13.5, color:"#0F6E56", marginBottom:8 }}>Layer Norm normalises each sample (row) independently</div>
              <p style={{ fontSize:12.5, color:"var(--color-text-secondary)", lineHeight:1.7, margin:"0 0 8px" }}>For each sample sᵢ, compute mean and std across all its features. Normalise just that one sample. No dependency on other samples or batch size whatsoever.</p>
              <div style={{ background:"#EAF3DE", border:"1px solid #3B6D11", borderRadius:6, padding:"7px 10px", fontSize:12, fontFamily:"var(--font-mono)", color:"#27500A" }}>
                μ_sᵢ = mean(sᵢ[f0], sᵢ[f1], …, sᵢ[f4])<br/>
                σ_sᵢ = std over feature dimension
              </div>
              <div style={{ marginTop:8, fontSize:12.5, color:"var(--color-text-success)" }}>
                <strong>Perfect for Transformers:</strong> each token is one sample. Normalise each token's d_model features independently. Works identically with any batch size, any sequence length, at training and inference.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 1 — POSITIONAL ENCODING (Ch 78)
══════════════════════════════════════════════════════ */
function SectionPosEnc() {
  const [sol, setSol] = useState(0);
  var simpleProblems = [
    {
      title:"Solution A — Integer index (1, 2, 3, …)",
      color:"danger",
      idea:"Assign position 1 to the first token, 2 to the second, and so on. Add this integer directly to the embedding.",
      problems:[
        "The values grow unboundedly with sequence length — position 500 adds 500 to each embedding dimension, completely swamping the semantic information.",
        "The model has never seen positions beyond the training maximum at inference time. If you trained on sequences up to length 100, position 150 produces an out-of-distribution value.",
        "The differences between positions are not uniform in meaning — position 1 and 2 are adjacent, but the raw difference of 1 is also the difference between positions 99 and 100. No positional relativity.",
      ],
    },
    {
      title:"Solution B — Normalised index (0.0 to 1.0)",
      color:"danger",
      idea:"Divide each position by the sequence length so positions range from 0.0 to 1.0. Solves the unbounded growth problem.",
      problems:[
        "Now the meaning of each position value depends on the total sequence length. Position 0.5 in a 10-token sentence means something different from 0.5 in a 100-token sentence.",
        "The model cannot generalise to sequences longer than those seen in training — 1.0 is always the last token, but 1.1 is out of distribution.",
        "Still does not encode relative distance — whether position 0.1 and 0.2 are close or far depends entirely on the total sequence length.",
      ],
    },
    {
      title:"Solution C — Binary encoding",
      color:"warning",
      idea:"Represent each position as a binary number. Position 0 = 000, position 1 = 001, position 7 = 111. These are bounded (log₂N bits) and unique.",
      problems:[
        "Binary encodings are discontinuous — adjacent positions can have very different encodings (position 3 = 011, position 4 = 100 — every bit flips). The model cannot learn that these are close.",
        "The encoding dimension must be fixed at log₂(max_len), tying positional resolution to the model's maximum sequence length in an inflexible way.",
      ],
    },
    {
      title:"Solution D — Sinusoidal encoding (the winner)",
      color:"success",
      idea:"Use sine and cosine waves at different frequencies. Even-indexed dimensions use sine, odd-indexed use cosine. Frequency decreases geometrically with dimension index.",
      properties:[
        "Bounded: all values in [-1, 1] regardless of position or sequence length.",
        "Unique: no two positions produce the same encoding vector.",
        "Smooth: nearby positions have similar encodings — the model can learn that positions 5 and 6 are adjacent.",
        "Relative distance: PE(pos+k) can always be expressed as a linear function of PE(pos), so the model can learn relative positional offsets.",
        "Generalises: the formula works for any position, including those beyond the training maximum.",
      ],
    },
  ];
  var cur = simpleProblems[sol];

  return (
    <div>
      <Note color="info" icon="ti-bulb">
        <strong>Why positions matter:</strong> Self-attention computes attention scores from dot products of Q and K vectors. The dot product is commutative — Q_i·K_j = Q_j·K_i. This means the Transformer cannot tell whether token A came before or after token B without additional positional information. "The cat ate the mouse" and "The mouse ate the cat" would produce identical attention scores without positional encoding.
      </Note>

      <H2 c="Why positional encoding is required" />
      <P c="Unlike RNNs that process tokens sequentially (implicitly encoding order through recurrence), the Transformer processes all tokens simultaneously. The attention mechanism is completely permutation-invariant — shuffle the input tokens and you get the same output, just shuffled. For language, order is everything. We need to inject position information explicitly." />

      <div style={{ background:"var(--color-background-secondary)", border:"0.5px solid var(--color-border-tertiary)", borderRadius:"var(--border-radius-md)", padding:"12px 14px", margin:"0.75rem 0" }}>
        <div style={{ fontSize:11, color:"var(--color-text-tertiary)", marginBottom:6, textTransform:"uppercase", letterSpacing:"0.06em" }}>Proof of permutation invariance</div>
        <div style={{ display:"flex", gap:16, flexWrap:"wrap" }}>
          {[
            { words:["The","cat","sat"], label:"Original order" },
            { words:["sat","The","cat"], label:"Shuffled — same dot products!" },
          ].map(ex => (
            <div key={ex.label}>
              <div style={{ fontSize:11, color:"var(--color-text-secondary)", marginBottom:4 }}>{ex.label}</div>
              <div style={{ display:"flex", gap:4 }}>
                {ex.words.map((w, wi) => (
                  <div key={wi} style={{ padding:"4px 10px", borderRadius:5, background:"var(--color-background-info)", border:"1px solid var(--color-border-info)", fontFamily:"var(--font-mono)", fontSize:13, color:"var(--color-text-info)" }}>{w}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ fontSize:12.5, color:"var(--color-text-secondary)", marginTop:8, lineHeight:1.6 }}>
          Without positional encoding, <code style={{ fontFamily:"var(--font-mono)", fontSize:12 }}>Attention(Q,K,V)</code> returns the same vectors for both orderings (just permuted). The model cannot distinguish them.
        </div>
      </div>

      <H2 c="Proposed solutions — and why they fail" />
      <P c="Click through each candidate solution. The first three have fatal flaws that Vaswani et al.'s sinusoidal encoding elegantly solves:" />
      <div style={{ display:"flex", gap:6, marginBottom:"0.85rem", flexWrap:"wrap" }}>
        {simpleProblems.map((s, idx) => (
          <button key={idx} onClick={() => setSol(idx)} style={{ padding:"5px 12px", borderRadius:"var(--border-radius-md)", border:"0.5px solid "+(sol===idx?"var(--color-border-info)":"var(--color-border-tertiary)"), background:sol===idx?"var(--color-background-info)":"transparent", fontSize:13, color:sol===idx?"var(--color-text-info)":"var(--color-text-secondary)", fontWeight:sol===idx?500:400, cursor:"pointer" }}>
            Solution {String.fromCharCode(65+idx)}
          </button>
        ))}
      </div>
      <div style={{ border:"0.5px solid var(--color-border-tertiary)", borderRadius:"var(--border-radius-lg)", overflow:"hidden" }}>
        <div style={{ padding:"10px 14px", background:`var(--color-background-${cur.color})`, borderBottom:`0.5px solid var(--color-border-${cur.color})` }}>
          <div style={{ fontWeight:500, fontSize:14, color:`var(--color-text-${cur.color})` }}>{cur.title}</div>
          <div style={{ fontSize:13, color:`var(--color-text-${cur.color})`, marginTop:4, lineHeight:1.6 }}><strong>Idea:</strong> {cur.idea}</div>
        </div>
        <div style={{ padding:"11px 15px" }}>
          {cur.problems && (
            <div>
              <div style={{ fontSize:12, fontWeight:500, color:"var(--color-text-danger)", marginBottom:6, textTransform:"uppercase", letterSpacing:"0.06em" }}>Fatal problems:</div>
              {cur.problems.map((prob, pi) => (
                <div key={pi} style={{ display:"flex", gap:8, marginBottom:6, fontSize:13.5, color:"var(--color-text-secondary)", lineHeight:1.7 }}>
                  <i className="ti ti-x" style={{ fontSize:13, color:"var(--color-text-danger)", flexShrink:0, marginTop:2 }} aria-hidden="true" />
                  {prob}
                </div>
              ))}
            </div>
          )}
          {cur.properties && (
            <div>
              <div style={{ fontSize:12, fontWeight:500, color:"var(--color-text-success)", marginBottom:6, textTransform:"uppercase", letterSpacing:"0.06em" }}>Why it works:</div>
              {cur.properties.map((prop, pi) => (
                <div key={pi} style={{ display:"flex", gap:8, marginBottom:6, fontSize:13.5, color:"var(--color-text-secondary)", lineHeight:1.7 }}>
                  <i className="ti ti-check" style={{ fontSize:13, color:"var(--color-text-success)", flexShrink:0, marginTop:2 }} aria-hidden="true" />
                  {prop}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <H2 c="Sinusoidal positional encoding — the formula" />
      <P c="Each position gets a unique vector of length d_model. Even-indexed dimensions use sine, odd-indexed dimensions use cosine. The frequency decreases geometrically as the dimension index increases:" />
      <Mx block>{`PE(pos, 2i)   = sin( pos / 10000^(2i / d_model) )
PE(pos, 2i+1) = cos( pos / 10000^(2i / d_model) )

Where:
  pos = position in the sequence (0, 1, 2, …)
  i   = dimension index pair    (0, 1, 2, …, d_model/2 - 1)
  d_model = embedding dimension (e.g. 512)

Frequencies:
  i=0:  ω = 1 / 10000^(0/512) = 1.0       (fast — changes every position)
  i=1:  ω = 1 / 10000^(2/512) = 0.97      (slightly slower)
  i=128:ω = 1 / 10000^(512/512) = 0.0001  (very slow — changes rarely)

Intuition: like a clock. The lowest dimension is the seconds hand (fast),
the highest dimension is the hours/years hand (slow).
Together they produce a unique "timestamp" for every position.`}</Mx>

      <H2 c="Interactive visualiser — explore the waveforms" />
      <P c="Each dimension of the positional encoding is a sine or cosine wave with a different frequency. Select a dimension below to see its waveform, and observe the full heatmap of all positions × dimensions:" />
      <PEVisualiser />

      <H2 c="Adding PE to token embeddings" />
      <Mx block>{`Final input to Transformer:
  X[pos] = TokenEmbedding(word[pos]) + PE(pos)

Both are vectors of dimension d_model.
Element-wise addition — the positional information is
baked into the same vector space as the semantic content.

During training: the token embedding learns to co-exist
with the positional signal. The model learns to read both
simultaneously from a single vector.`}</Mx>
      <Code>{`import numpy as np
import torch
import torch.nn as nn

class PositionalEncoding(nn.Module):
    def __init__(self, d_model, max_len=5000, dropout=0.1):
        super().__init__()
        self.dropout = nn.Dropout(dropout)

        # Build the PE matrix once — shape (max_len, d_model)
        pe = torch.zeros(max_len, d_model)
        position = torch.arange(0, max_len).unsqueeze(1).float()  # (max_len, 1)

        # Denominator: 10000^(2i/d_model) — computed in log space for stability
        div_term = torch.exp(
            torch.arange(0, d_model, 2).float()
            * -(np.log(10000.0) / d_model)
        )  # shape: (d_model/2,)

        pe[:, 0::2] = torch.sin(position * div_term)  # even dims
        pe[:, 1::2] = torch.cos(position * div_term)  # odd dims

        # Register as buffer (not a parameter — not trained)
        self.register_buffer('pe', pe.unsqueeze(0))    # (1, max_len, d_model)

    def forward(self, x):
        # x: (batch, seq_len, d_model)
        # PE is added element-wise — broadcast over batch dimension
        x = x + self.pe[:, :x.size(1), :]
        return self.dropout(x)   # slight dropout for regularisation`}</Code>

      <H2 c="Interview Q&A" />
      <QA q="Why can't we just use the token index as a positional encoding?"
         a="Three fatal problems: (1) <strong>Unbounded growth</strong> — for long sequences the positional values dominate the semantic values in the embedding, destroying the information. (2) <strong>Out-of-distribution</strong> — if you train on sequences of length ≤ 100, seeing position 200 at inference is completely novel. (3) <strong>No relative distance</strong> — the model must learn that positions 1 and 2 are close while 1 and 100 are far from raw numbers, but the scale is arbitrary. Sinusoidal encoding ensures all values are bounded in [-1,1], works for any sequence length, and encodes relative positions algebraically." />
      <QA q="What is the 'clock' intuition for sinusoidal positional encoding?"
         a="Think of an analogue clock: the seconds hand moves fast (high frequency), the minutes hand moves slowly, the hours hand even slower. A full time reading (seconds + minutes + hours) uniquely identifies a moment in the day. Sinusoidal PE works the same way. Low dimensions (small i) are high-frequency — they change significantly between adjacent positions. High dimensions (large i) are low-frequency — they change slowly over many positions. A full positional vector combines all these frequencies, uniquely identifying each position like a multi-precision timestamp." />
      <QA q="Why does the Transformer paper use PE(pos+k) = linear_function(PE(pos)) and why does this matter?"
         a="The sinusoidal encoding satisfies: PE(pos+k) = M_k · PE(pos) where M_k is a fixed rotation matrix depending only on k. This means the model can learn, through W_Q and W_K, to attend to tokens that are exactly k positions away — the relative offset k is encoded as a linear transformation that attention can detect. This is why Transformers generalise to unseen relative distances: the geometry of relative positions is linear in the encoding space. This property is unique to sinusoidal encoding — none of the simpler solutions (integers, normalised, binary) have it." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 2 — LAYER NORMALISATION (Ch 79)
══════════════════════════════════════════════════════ */
function SectionLayerNorm() {
  return (
    <div>
      <Note color="info" icon="ti-bulb">
        <strong>One-sentence summary:</strong> Batch Normalisation normalises across the batch dimension (across samples, per feature). Layer Normalisation normalises across the feature dimension (across features, per sample). For Transformers, Layer Norm is the correct choice because it requires no batch statistics and works identically at training and inference.
      </Note>

      <H2 c="Why normalisation matters in deep networks" />
      <P c="Without normalisation, the distribution of each layer's activations can shift wildly as parameters update — a phenomenon called internal covariate shift. Layer l receives inputs with a completely different distribution than it was calibrated for, slowing convergence and causing instability. Normalisation keeps each layer's input distribution stable." />
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10, margin:"0.75rem 0" }}>
        {[
          { title:"Stable gradient flow", icon:"ti-arrow-wave-right-up", color:"success", body:"Without normalisation, activations can saturate or explode, pushing the gradient into near-zero or exploding regions. Normalised activations stay in the well-gradiated region of nonlinearities." },
          { title:"Faster convergence", icon:"ti-bolt", color:"info", body:"Normalisation reduces sensitivity to learning rate and weight initialisation. Models train faster and tolerate a wider range of hyperparameters." },
          { title:"Regularisation effect", icon:"ti-shield", color:"warning", body:"Batch Norm in particular adds noise from batch statistics, which acts as a regulariser. Layer Norm's effect is subtler but still helps generalisation." },
        ].map(item => (
          <div key={item.title} style={{ border:"0.5px solid var(--color-border-tertiary)", borderRadius:"var(--border-radius-md)", padding:"12px 13px" }}>
            <div style={{ display:"flex", gap:7, alignItems:"center", marginBottom:7 }}>
              <i className={`ti ${item.icon}`} style={{ fontSize:16, color:`var(--color-text-${item.color})` }} aria-hidden="true" />
              <span style={{ fontWeight:500, fontSize:13.5, color:"var(--color-text-primary)" }}>{item.title}</span>
            </div>
            <div style={{ fontSize:12.5, color:"var(--color-text-secondary)", lineHeight:1.65 }}>{item.body}</div>
          </div>
        ))}
      </div>

      <H2 c="Batch Norm vs Layer Norm — interactive comparison" />
      <P c="Toggle between the two modes. The highlighted axis shows which dimension is averaged over during normalisation. The key question: which axis is 'stable' in Transformer training?" />
      <NormViz />

      <H2 c="Why Batch Norm fails in Transformers" />
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, margin:"0.75rem 0" }}>
        <div style={{ background:"var(--color-background-danger)", border:"0.5px solid var(--color-border-danger)", borderRadius:"var(--border-radius-md)", padding:"12px 14px" }}>
          <div style={{ fontWeight:500, fontSize:13, color:"var(--color-text-danger)", marginBottom:8 }}>Batch Norm problems in Transformers</div>
          {[
            "Variable sequence lengths — sequences in a batch are padded to the same length. Averaging over padded tokens corrupts the batch statistics.",
            "Batch size sensitivity — statistics computed over small batches are noisy, making training unstable. Language model batches are often small due to long sequences.",
            "Train/inference mismatch — at inference, batch_size=1, but Batch Norm needs batch statistics. It must use running averages from training, which may not match the current input.",
            "Autoregressive generation — at each generation step, you process one new token. Batch Norm statistics over a single vector are meaningless.",
          ].map((t, ti) => <div key={ti} style={{ display:"flex", gap:7, marginBottom:5, fontSize:12.5, color:"var(--color-text-danger)", lineHeight:1.6 }}><i className="ti ti-x" style={{ fontSize:12, flexShrink:0, marginTop:2 }} aria-hidden="true" />{t}</div>)}
        </div>
        <div style={{ background:"var(--color-background-success)", border:"0.5px solid var(--color-border-success)", borderRadius:"var(--border-radius-md)", padding:"12px 14px" }}>
          <div style={{ fontWeight:500, fontSize:13, color:"var(--color-text-success)", marginBottom:8 }}>Layer Norm advantages</div>
          {[
            "No batch dependency — each token is normalised using only its own d_model features. Batch size = 1 or 1000 makes no difference.",
            "Works with any sequence length — the normalisation is over the feature dimension which is always d_model (fixed).",
            "Identical at training and inference — no running averages needed; statistics are computed fresh for each token.",
            "Autoregressive-compatible — normalising a single token's d_model features is perfectly well-defined at every generation step.",
          ].map((t, ti) => <div key={ti} style={{ display:"flex", gap:7, marginBottom:5, fontSize:12.5, color:"var(--color-text-success)", lineHeight:1.6 }}><i className="ti ti-check" style={{ fontSize:12, flexShrink:0, marginTop:2 }} aria-hidden="true" />{t}</div>)}
        </div>
      </div>

      <H2 c="Layer Norm — full equations" />
      <Mx block>{`For token x ∈ ℝ^{d_model}:

  μ = (1/d_model) · Σᵢ xᵢ               ← mean over features
  σ² = (1/d_model) · Σᵢ (xᵢ - μ)²      ← variance over features

  x_norm = (x - μ) / √(σ² + ε)          ← normalise (ε≈1e-5 for stability)

  LayerNorm(x) = γ ⊙ x_norm + β         ← scale and shift

Where:
  γ ∈ ℝ^{d_model}  — learned scale parameter (initialised to 1)
  β ∈ ℝ^{d_model}  — learned shift parameter (initialised to 0)
  γ and β allow the network to undo normalisation if needed

Parameter count: 2 × d_model (very small relative to attention layers)`}</Mx>

      <H2 c="Where Layer Norm sits in the Transformer block" />
      <P c="Two common placements. The original 'Attention Is All You Need' paper used Post-LN. GPT-2 onward switched to Pre-LN which is more stable for large models:" />
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, margin:"0.75rem 0" }}>
        <div style={{ border:"0.5px solid var(--color-border-tertiary)", borderRadius:"var(--border-radius-md)", padding:"12px 13px" }}>
          <div style={{ fontWeight:500, fontSize:13.5, color:"var(--color-text-primary)", marginBottom:7 }}>Post-LN (original Transformer)</div>
          <Code>{`# Post-LN — normalise AFTER residual add
x = LayerNorm(x + SelfAttention(x))
x = LayerNorm(x + FFN(x))`}</Code>
          <div style={{ fontSize:12, color:"var(--color-text-secondary)", lineHeight:1.6, marginTop:6 }}>Normalise <em>after</em> adding the residual. Requires careful learning rate warmup — gradient near the output can be large.</div>
        </div>
        <div style={{ background:"var(--color-background-success)", border:"0.5px solid var(--color-border-success)", borderRadius:"var(--border-radius-md)", padding:"12px 13px" }}>
          <div style={{ fontWeight:500, fontSize:13.5, color:"var(--color-text-success)", marginBottom:7 }}>Pre-LN (GPT-2, modern models)</div>
          <Code>{`# Pre-LN — normalise BEFORE attention/FFN
x = x + SelfAttention(LayerNorm(x))
x = x + FFN(LayerNorm(x))`}</Code>
          <div style={{ fontSize:12, color:"var(--color-text-success)", lineHeight:1.6, marginTop:6 }}>Normalise <em>before</em> the sublayer. More stable training — gradient always flows through at least one residual path without normalisation. Preferred for large models.</div>
        </div>
      </div>

      <H2 c="Interview Q&A" />
      <QA q="Explain the difference between Batch Norm and Layer Norm in one sentence, then say why it matters for Transformers."
         a="<strong>One sentence:</strong> Batch Norm normalises across the batch dimension (mean and std computed over all samples for each feature), while Layer Norm normalises across the feature dimension (mean and std computed over all features for each sample). <strong>Why it matters:</strong> Transformers process variable-length sequences, often with small batches; autoregressive generation processes one token at a time. Batch Norm's statistics become meaningless or unavailable in these settings. Layer Norm is computed entirely within a single token's feature vector — it requires no other samples, no running averages, and works identically regardless of batch size or sequence length." />
      <QA q="What do the learnable parameters γ (gamma) and β (beta) do in Layer Norm?"
         a="After normalisation, every feature has mean=0 and std=1 — this is too restrictive. Some tasks benefit from features with non-zero mean or non-unit variance. γ (scale) and β (shift) allow the network to <em>undo</em> the normalisation if that is what the task requires. They are initialised to γ=1, β=0 (identity — keeps the normalised output unchanged) and learned during training. This design gives the model flexibility: it can leverage the stabilising benefits of normalisation while retaining the capacity to represent any distribution the task requires." />
      <QA q="Why did GPT-2 switch from Post-LN to Pre-LN and what practical difference does it make?"
         a="In Post-LN, the final Layer Norm sits after the residual connection at each block's output. The gradient at the output layer passes through this normalisation before reaching the parameters, but for earlier layers the gradient can be large and unstable — causing training to diverge without careful learning rate warmup. Pre-LN moves the normalisation inside the residual branch, leaving a clean gradient path through the residual connections. This makes training significantly more stable — GPT-2 and subsequent large models (GPT-3, LLaMA, Claude) can train with a simple cosine decay schedule without the careful warmup that Post-LN requires. The trade-off is slightly weaker final performance on small models, which is why the original paper used Post-LN." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   INTERACTIVE — ENCODER DATA FLOW STEPPER
══════════════════════════════════════════════════════ */
var ENC_STEPS = [
  {
    id:"input",
    title:"Input block — Token embeddings + Positional encoding",
    color:"info",
    formula:"X_in = TokenEmbedding(tokens) + PE(positions)",
    detail:"Each word in the source sentence is converted to an integer token ID, then looked up in a learned embedding table (shape: vocab_size × d_model). The positional encoding vector for each position is added element-wise. Result: a matrix of shape (seq_len × d_model) where each row is a rich vector encoding both token identity and position.",
    dims:"tokens: (seq_len,)  →  embeddings: (seq_len, d_model)  →  +PE  →  X: (seq_len, d_model)",
  },
  {
    id:"norm1",
    title:"Pre-Layer Norm 1 — Stabilise before attention",
    color:"warning",
    formula:"X_norm = LayerNorm(X)",
    detail:"Before feeding X into self-attention, apply Layer Normalization. This ensures each token vector has mean≈0 and std≈1 across its d_model features, keeping the attention dot products in a well-scaled range and gradients stable during backprop. Shape is unchanged: (seq_len, d_model).",
    dims:"X: (seq_len, d_model)  →  LayerNorm  →  X_norm: (seq_len, d_model)  [mean/std unchanged]",
  },
  {
    id:"mha",
    title:"Multi-Head Self-Attention — Each token reads the full sequence",
    color:"success",
    formula:"Z = MultiHead(Q=X_norm, K=X_norm, V=X_norm)",
    detail:"ALL three of Query, Key, and Value come from the SAME matrix X_norm — this is what makes it SELF-attention (the sequence attends to itself). The attention mechanism produces, for each token, a weighted combination of all other tokens' Value vectors. After multi-head attention, token representations contain contextual information from the entire sequence.",
    dims:"X_norm: (seq_len, d_model)  →  [split into h heads, each (seq_len, d_k)]  →  Z: (seq_len, d_model)",
  },
  {
    id:"res1",
    title:"Residual connection 1 — Skip connection preserves original signal",
    color:"warning",
    formula:"X_after_attn = X + Z   (add original X, not X_norm)",
    detail:"Add the original X (before LayerNorm) to the attention output Z. This is the residual connection. It does two crucial things: (1) prevents vanishing gradients — gradients always have a direct path back through the identity shortcut; (2) lets the attention output represent just the CHANGE ('what needs updating?') rather than the full representation, making optimisation easier.",
    dims:"X: (seq_len, d_model)  +  Z: (seq_len, d_model)  =  X_after_attn: (seq_len, d_model)",
  },
  {
    id:"norm2",
    title:"Pre-Layer Norm 2 — Stabilise before FFN",
    color:"warning",
    formula:"X_norm2 = LayerNorm(X_after_attn)",
    detail:"Apply Layer Norm again before the Feed-Forward Network. Same reason as before — keeps activations stable. The FFN receives clean, normalised input.",
    dims:"X_after_attn: (seq_len, d_model)  →  LayerNorm  →  X_norm2: (seq_len, d_model)",
  },
  {
    id:"ffn",
    title:"Feed-Forward Network — Per-token nonlinear transformation",
    color:"danger",
    formula:"FFN(x) = max(0, x·W₁ + b₁)·W₂ + b₂",
    detail:"A two-layer MLP applied INDEPENDENTLY and IDENTICALLY to each token position. The hidden dimension is typically 4× d_model (e.g. d_ff=2048 for d_model=512). The FFN acts as a per-token memory bank — it stores knowledge learned during training as key-value associations in its weight matrices. The expansion (×4) then compression lets the network form rich intermediate representations.",
    dims:"X_norm2: (seq_len, d_model)  →  Linear(d_model→d_ff)  →  ReLU/GELU  →  Linear(d_ff→d_model)  →  FFN_out: (seq_len, d_model)",
  },
  {
    id:"res2",
    title:"Residual connection 2 — Final encoder block output",
    color:"success",
    formula:"X_out = X_after_attn + FFN_out",
    detail:"Add the second residual connection. X_out is the final output of one complete encoder block. It has the same shape as the input: (seq_len, d_model). This output feeds into the next encoder block as its input. After N encoder blocks (typically 6–96), the final encoder output is a rich contextual representation of the entire source sequence, passed to the decoder via cross-attention.",
    dims:"X_after_attn: (seq_len, d_model)  +  FFN_out: (seq_len, d_model)  =  X_out: (seq_len, d_model)",
  },
];

function EncoderStepper() {
  const [step, setStep] = useState(0);
  var s = ENC_STEPS[step];
  
  return (
    <div style={{ border:"0.5px solid var(--color-border-tertiary)", borderRadius:"var(--border-radius-lg)", overflow:"hidden", margin:"0.75rem 0" }}>
      {/* mini pipeline diagram */}
      <div style={{ padding:"0.75rem 1rem", borderBottom:"0.5px solid var(--color-border-tertiary)", background:"var(--color-background-secondary)", overflowX:"auto" }}>
        <div style={{ display:"flex", alignItems:"center", gap:3, minWidth:520 }}>
          {ENC_STEPS.map((st, idx) => {
            var isActive = idx === step;
            var colorMap = { info:"#185FA5", warning:"#854F0B", success:"#0F6E56", danger:"#993C1D" };
            var c = colorMap[st.color];
            return (
              <div key={idx} style={{ display:"flex", alignItems:"center" }}>
                <button onClick={() => setStep(idx)} style={{ padding:"4px 9px", borderRadius:5, border:"1.5px solid " + (isActive ? c : "var(--color-border-tertiary)"), background:isActive ? (c + "22") : "transparent", fontSize:11.5, color:isActive ? c : "var(--color-text-tertiary)", fontWeight:isActive?600:400, cursor:"pointer", whiteSpace:"nowrap" }}>
                  {st.id}
                </button>
                {idx < ENC_STEPS.length - 1 && <div style={{ fontSize:12, color:"var(--color-text-tertiary)", padding:"0 1px" }}>→</div>}
              </div>
            );
          })}
        </div>
      </div>

      {/* formula */}
      <div style={{ padding:"0.75rem 1.1rem", background:"#1E1E1E", borderBottom:"0.5px solid #333" }}>
        <div style={{ fontSize:11, color:"#888", marginBottom:5, textTransform:"uppercase", letterSpacing:"0.06em" }}>{s.title}</div>
        <div style={{ fontFamily:"var(--font-mono)", fontSize:13.5, color:"#4EC9B0" }}>{s.formula}</div>
        <div style={{ fontFamily:"var(--font-mono)", fontSize:11, color:"#888", marginTop:5 }}>{s.dims}</div>
      </div>

      {/* explanation */}
      <div style={{ padding:"12px 15px", fontSize:13.5, lineHeight:1.8, color:"var(--color-text-secondary)" }}>{s.detail}</div>

      <div style={{ display:"flex", justifyContent:"space-between", padding:"7px 13px", borderTop:"0.5px solid var(--color-border-tertiary)", background:"var(--color-background-secondary)" }}>
        <button onClick={() => setStep(v => Math.max(0,v-1))} disabled={step===0} style={{ background:"none", border:"0.5px solid var(--color-border-tertiary)", borderRadius:"var(--border-radius-md)", padding:"4px 12px", cursor:step===0?"default":"pointer", fontSize:13, color:step===0?"var(--color-text-tertiary)":"var(--color-text-secondary)" }}>← prev</button>
        <span style={{ fontSize:12, color:"var(--color-text-tertiary)", alignSelf:"center", fontFamily:"var(--font-mono)" }}>{step+1}/{ENC_STEPS.length}</span>
        <button onClick={() => setStep(v => Math.min(ENC_STEPS.length-1,v+1))} disabled={step===ENC_STEPS.length-1} style={{ background:"none", border:"0.5px solid var(--color-border-tertiary)", borderRadius:"var(--border-radius-md)", padding:"4px 12px", cursor:step===ENC_STEPS.length-1?"default":"pointer", fontSize:13, color:step===ENC_STEPS.length-1?"var(--color-text-tertiary)":"var(--color-text-secondary)" }}>next →</button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 3 — ENCODER ARCHITECTURE (Ch 80)
══════════════════════════════════════════════════════ */
function SectionEncoder() {
  return (
    <div>
      <Note color="info" icon="ti-bulb">
        <strong>The encoder's job:</strong> Read the entire input sequence and produce a rich, context-aware representation for every token. The encoder output is a matrix of shape (seq_len × d_model) where each row encodes not just the token's meaning but its meaning <em>in the context of the whole sentence</em>.
      </Note>

      <H2 c="Transformer architecture overview" />
      <P c="The complete Transformer has an encoder stack and a decoder stack. The encoder processes the source sequence. The decoder generates the target sequence using the encoder output. For tasks like classification (BERT), only the encoder is used. For generation (GPT), only the decoder is used." />
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, margin:"0.75rem 0" }}>
        {[
          { title:"Encoder stack", color:"info", items:["N identical encoder blocks (typically 6–96)","Each block: Multi-Head Self-Attention + FFN + 2× Layer Norm + 2× Residual","Input: (seq_len, d_model) — same shape output","No masking — every token sees every other token","Output: contextual embeddings for the full source sequence"] },
          { title:"Decoder stack", color:"success", items:["N identical decoder blocks (same N as encoder)","Each block: Masked Self-Attention + Cross-Attention + FFN + 3× Layer Norm","Masked self-attention: tokens can only attend to past tokens","Cross-attention: queries from decoder, keys/values from encoder output","Output: probability distribution over target vocabulary at each step"] },
        ].map(item => (
          <div key={item.title} style={{ background:`var(--color-background-${item.color})`, border:`0.5px solid var(--color-border-${item.color})`, borderRadius:"var(--border-radius-md)", padding:"12px 14px" }}>
            <div style={{ fontWeight:500, fontSize:13.5, color:`var(--color-text-${item.color})`, marginBottom:8 }}>{item.title}</div>
            {item.items.map((t, ti) => (
              <div key={ti} style={{ display:"flex", gap:7, marginBottom:5, fontSize:12.5, color:`var(--color-text-${item.color})`, lineHeight:1.6 }}><i className="ti ti-chevron-right" style={{ fontSize:12, flexShrink:0, marginTop:2 }} aria-hidden="true" />{t}</div>
            ))}
          </div>
        ))}
      </div>

      <H2 c="Single encoder block — complete data flow" />
      <P c="Step through every operation inside one encoder block. Key insight: the shape (seq_len × d_model) is preserved throughout — encoder blocks are shape-preserving transformations:" />
      <EncoderStepper />

      <H2 c="The Feed-Forward Network — the often-overlooked half" />
      <P c="Multi-head attention gets most of the attention (pun intended), but the FFN block contains about two-thirds of the Transformer's parameters and does critical work. Think of attention as the 'routing' mechanism that gathers relevant information, and the FFN as the 'processing' mechanism that transforms it." />
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, margin:"0.75rem 0" }}>
        <div style={{ border:"0.5px solid var(--color-border-tertiary)", borderRadius:"var(--border-radius-md)", padding:"12px 13px" }}>
          <div style={{ fontWeight:500, fontSize:13.5, color:"var(--color-text-primary)", marginBottom:7 }}>What attention does</div>
          <p style={{ fontSize:12.5, color:"var(--color-text-secondary)", lineHeight:1.65, margin:0 }}>Attention is a <em>weighted averaging</em> operation. Its output is always a convex combination of Value vectors. It cannot create information not already in the values — it routes and re-weights existing information.</p>
        </div>
        <div style={{ border:"0.5px solid var(--color-border-tertiary)", borderRadius:"var(--border-radius-md)", padding:"12px 13px" }}>
          <div style={{ fontWeight:500, fontSize:13.5, color:"var(--color-text-primary)", marginBottom:7 }}>What the FFN does</div>
          <p style={{ fontSize:12.5, color:"var(--color-text-secondary)", lineHeight:1.65, margin:0 }}>The FFN applies a nonlinear transformation to each token independently. Research on mechanistic interpretability (Geva et al. 2021) shows FFN layers function as key-value memories — the first layer's rows are keys that pattern-match input features; the second layer's columns are values that store what to emit when a key fires.</p>
        </div>
      </div>
      <Mx block>{`FFN parameter count (d_model=512, d_ff=2048):
  W₁ ∈ ℝ^{512 × 2048}  = 1,048,576  parameters
  b₁ ∈ ℝ^{2048}        = 2,048
  W₂ ∈ ℝ^{2048 × 512}  = 1,048,576
  b₂ ∈ ℝ^{512}         = 512
  Total FFN:   2,099,712  ≈ 2M params/block

  Multi-Head Attention:  4 × 512² = 1,048,576 ≈ 1M params/block

  FFN is 2× larger than attention per block.
  For a 6-block encoder: 6 × (2M + 1M) = ~18M params total`}</Mx>

      <H2 c="Full encoder implementation — PyTorch" />
      <Code>{`import torch
import torch.nn as nn
import math

class EncoderBlock(nn.Module):
    # One complete encoder block: Pre-LN variant (GPT-2 style).
    def __init__(self, d_model, n_heads, d_ff, dropout=0.1):
        super().__init__()
        self.norm1 = nn.LayerNorm(d_model)
        self.norm2 = nn.LayerNorm(d_model)
        self.attn  = nn.MultiheadAttention(d_model, n_heads, dropout=dropout, batch_first=True)
        self.ffn   = nn.Sequential(
            nn.Linear(d_model, d_ff),
            nn.GELU(),              # smooth ReLU; standard in modern Transformers
            nn.Dropout(dropout),
            nn.Linear(d_ff, d_model),
            nn.Dropout(dropout),
        )

    def forward(self, x, src_key_padding_mask=None):
        # Pre-LN: normalise BEFORE each sublayer
        # Residual 1: x = x + Attention(LayerNorm(x))
        x_norm = self.norm1(x)
        attn_out, _ = self.attn(x_norm, x_norm, x_norm,
                                key_padding_mask=src_key_padding_mask)
        x = x + attn_out           # residual connection

        # Residual 2: x = x + FFN(LayerNorm(x))
        x = x + self.ffn(self.norm2(x))
        return x

class TransformerEncoder(nn.Module):
    def __init__(self, vocab_size, d_model=512, n_heads=8,
                 n_layers=6, d_ff=2048, max_len=512, dropout=0.1):
        super().__init__()
        self.d_model   = d_model
        self.embedding = nn.Embedding(vocab_size, d_model)
        self.pos_enc   = PositionalEncoding(d_model, max_len, dropout)
        self.blocks    = nn.ModuleList(
            [EncoderBlock(d_model, n_heads, d_ff, dropout) for _ in range(n_layers)]
        )
        self.norm = nn.LayerNorm(d_model)  # final norm after all blocks

    def forward(self, src, src_key_padding_mask=None):
        # src: (batch, seq_len) — integer token IDs
        x = self.embedding(src) * math.sqrt(self.d_model)  # scale embeddings
        x = self.pos_enc(x)    # add positional encoding

        for block in self.blocks:
            x = block(x, src_key_padding_mask)

        return self.norm(x)   # (batch, seq_len, d_model) = encoder output`}</Code>

      <H2 c="Interview Q&A" />
      <QA q="Why is the input embedding scaled by √d_model before adding positional encoding?"
         a="The token embeddings are initialised with values from a unit normal distribution and then trained. The positional encoding values are bounded in [-1, 1] by construction. If d_model is large (e.g. 512), the embedding vectors have components with magnitude roughly 1/√512 ≈ 0.044 (because the softmax over the vocabulary is trained to spread probability, which keeps embedding norms moderate). Multiplying by √d_model ≈ 22.6 scales the embedding to roughly the same magnitude as the positional encoding, so neither signal drowns the other. Without this scaling, the positional signal would dominate the semantic signal for large d_model." />
      <QA q="Why is the FFN applied to each token independently rather than across all tokens?"
         a="The FFN is a per-position transformation: the same two weight matrices are applied to each token's vector independently (using the same W₁ and W₂ for all positions — this is weight sharing across positions). This is a deliberate design choice. Token mixing — letting tokens communicate with each other — is entirely handled by the attention sublayer. The FFN's job is to transform the already-contextualised representation at each position into a more useful form. Separating these two roles (attention for mixing, FFN for transformation) makes the architecture modular and interpretable." />
      <QA q="What is the 'd_ff = 4 × d_model' convention and where does it come from?"
         a="The original 'Attention Is All You Need' paper (Vaswani et al. 2017) used d_model=512 and d_ff=2048 (4×) as a practical choice that worked well empirically. The expansion-compression structure (expand from 512 to 2048 features, apply nonlinearity, compress back to 512) gives the FFN sufficient capacity to learn complex nonlinear transformations per token while keeping the output in the same d_model space as the residual stream. The factor of 4 has been adopted by virtually all subsequent Transformer models. Some models (e.g. GPT-3 uses 4×, LLaMA uses 8/3×) experiment with different ratios, but 4× remains the convention." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   INTERACTIVE — MASKING DEMO (Ch 81)
══════════════════════════════════════════════════════ */
function MaskingDemo() {
  var words = ["<SOS>", "Hello", "world", "<EOS>"];
  var T = words.length;
  const [hovRow, setHovRow] = useState(null);

  // Causal mask: mask[i][j] = 1 if j <= i (can attend), 0 if j > i (future — blocked)
  var mask = [];
  for (var ri = 0; ri < T; ri++) {
    var row = [];
    for (var ci = 0; ci < T; ci++) {
      row.push(ci <= ri ? 1 : 0);
    }
    mask.push(row);
  }

  return (
    <div style={{ border:"0.5px solid var(--color-border-tertiary)", borderRadius:"var(--border-radius-lg)", padding:"1rem", margin:"0.75rem 0" }}>
      <div style={{ fontSize:11, color:"var(--color-text-tertiary)", marginBottom:10, textTransform:"uppercase", letterSpacing:"0.06em" }}>
        Hover a row to see which positions that token can attend to
      </div>
      <div style={{ display:"flex", gap:12, alignItems:"flex-start", flexWrap:"wrap" }}>
        {/* matrix */}
        <div>
          <div style={{ fontSize:11, color:"var(--color-text-tertiary)", marginBottom:4 }}>Attention mask (row = query token, col = key token)</div>
          {/* col headers */}
          <div style={{ display:"flex", paddingLeft:60 }}>
            {words.map((w, ci) => (
              <div key={ci} style={{ width:52, textAlign:"center", fontSize:10.5, color:"var(--color-text-tertiary)", fontFamily:"var(--font-mono)", overflow:"hidden" }}>{w}</div>
            ))}
          </div>
          {mask.map((row, ri) => (
            <div key={ri} style={{ display:"flex", alignItems:"center", marginBottom:3 }}
                 onMouseEnter={() => setHovRow(ri)}
                 onMouseLeave={() => setHovRow(null)}>
              {/* row label */}
              <div style={{ width:56, fontSize:11, color:hovRow===ri?"var(--color-text-primary)":"var(--color-text-tertiary)", fontFamily:"var(--font-mono)", textAlign:"right", paddingRight:6, fontWeight:hovRow===ri?600:400 }}>{words[ri]}</div>
              {row.map((val, ci) => {
                var canAttend = val === 1;
                var isHoveredRow = hovRow === ri;
                var bg, border, textColor;
                if (!canAttend) {
                  bg = "#FAECE7"; border = "#D85A30"; textColor = "#993C1D";
                } else if (isHoveredRow) {
                  bg = "#EAF3DE"; border = "#3B6D11"; textColor = "#27500A";
                } else {
                  bg = "#E6F1FB"; border = "#185FA5"; textColor = "#0C447C";
                }
                return (
                  <div key={ci} style={{ width:52, height:36, display:"flex", alignItems:"center", justifyContent:"center", background:bg, border:"1.5px solid " + border, borderRadius:4, marginRight:2, fontSize:12, fontFamily:"var(--font-mono)", color:textColor, fontWeight:600 }}>
                    {canAttend ? "✓" : "-∞"}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* explanation */}
        <div style={{ flex:1, minWidth:180 }}>
          <div style={{ fontSize:12.5, color:"var(--color-text-secondary)", lineHeight:1.7, marginBottom:10 }}>
            <strong style={{ color:"var(--color-text-primary)" }}>Green ✓</strong> = position is visible (attention score kept)<br/>
            <strong style={{ color:"#993C1D" }}>Red -∞</strong> = future position (score set to -∞, weight becomes 0 after softmax)
          </div>
          {hovRow !== null && (
            <div style={{ padding:"8px 10px", background:"var(--color-background-success)", border:"0.5px solid var(--color-border-success)", borderRadius:5, fontSize:13, color:"var(--color-text-success)", lineHeight:1.6 }}>
              <strong>"{words[hovRow]}"</strong> at position {hovRow} can attend to: {mask[hovRow].map((v, ci) => v ? '"' + words[ci] + '"' : null).filter(Boolean).join(", ")}
              <br/>Future positions {hovRow < T-1 ? '(' + words.slice(hovRow+1).map(w => '"'+w+'"').join(', ') + ') are blocked.' : '— none (this is the last position).'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 4 — MASKED SELF-ATTENTION (Ch 81)
══════════════════════════════════════════════════════ */
function SectionMaskedAttn() {
  return (
    <div>
      <Note color="info" icon="ti-bulb">
        <strong>The core problem:</strong> During training, the decoder receives the entire target sentence at once (for parallelism). But during inference, it generates one token at a time and has not yet generated future tokens. Masked self-attention solves this by ensuring the decoder cannot "cheat" during training by looking at future target tokens.
      </Note>

      <H2 c="Autoregressive generation — what the decoder does" />
      <P c="The decoder generates the target sequence one token at a time, each step conditioning on all previously generated tokens. This is called autoregressive generation:" />
      <div style={{ background:"var(--color-background-secondary)", border:"0.5px solid var(--color-border-tertiary)", borderRadius:"var(--border-radius-lg)", padding:"1rem", margin:"0.75rem 0", overflowX:"auto" }}>
        <div style={{ fontSize:11, color:"var(--color-text-tertiary)", marginBottom:8, textTransform:"uppercase", letterSpacing:"0.06em" }}>Translating "Bonjour" → "Hello"</div>
        {[
          { step:"Step 1", input:"[SOS]", generates:"Hello",  explanation:'Decoder starts with only the [SOS] token. With no context from the target, it must rely entirely on the encoder output (the source "Bonjour").' },
          { step:"Step 2", input:"[SOS] Hello", generates:"[EOS]", explanation:'Decoder now has [SOS] and "Hello". It predicts the end-of-sequence token, signalling the translation is complete.' },
        ].map(step => (
          <div key={step.step} style={{ display:"grid", gridTemplateColumns:"60px 1fr 80px 1fr", gap:8, alignItems:"center", marginBottom:8, fontSize:13 }}>
            <div style={{ fontFamily:"var(--font-mono)", fontSize:11.5, color:"var(--color-text-info)" }}>{step.step}</div>
            <div style={{ fontFamily:"var(--font-mono)", fontSize:13, color:"var(--color-text-primary)", background:"var(--color-background-info)", padding:"3px 8px", borderRadius:4 }}>input: {step.input}</div>
            <div style={{ textAlign:"center", color:"var(--color-text-tertiary)" }}>→ predicts →</div>
            <div style={{ fontSize:13, color:"var(--color-text-secondary)" }}>{step.explanation}</div>
          </div>
        ))}
      </div>

      <H2 c="The data leakage problem during training" />
      <P c="The Transformer's strength is parallel computation. During training we want to process all target tokens simultaneously (not step by step) for efficiency. But this creates a problem:" />
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, margin:"0.75rem 0" }}>
        <div style={{ background:"var(--color-background-danger)", border:"0.5px solid var(--color-border-danger)", borderRadius:"var(--border-radius-md)", padding:"12px 14px" }}>
          <div style={{ fontWeight:500, fontSize:13.5, color:"var(--color-text-danger)", marginBottom:7 }}>Without masking — cheating!</div>
          <p style={{ fontSize:12.5, color:"var(--color-text-danger)", lineHeight:1.7, margin:0 }}>If the decoder can attend to ALL target tokens during training, when predicting "world" at position 2, it can simply copy the answer from position 2 in the input. It learns nothing — it just memorises by peeking at the future. At inference time, the future tokens don't exist yet, so the model fails completely.</p>
        </div>
        <div style={{ background:"var(--color-background-success)", border:"0.5px solid var(--color-border-success)", borderRadius:"var(--border-radius-md)", padding:"12px 14px" }}>
          <div style={{ fontWeight:500, fontSize:13.5, color:"var(--color-text-success)", marginBottom:7 }}>With masking — parallel + honest</div>
          <p style={{ fontSize:12.5, color:"var(--color-text-success)", lineHeight:1.7, margin:0 }}>The mask sets all future attention scores to -∞ before softmax (so their weight becomes exactly 0). Now all positions are processed simultaneously, but each position can only attend to positions ≤ itself. Training is fully parallel AND produces the same computation the model would do autoregressively at inference.</p>
        </div>
      </div>

      <H2 c="Interactive masking demo" />
      <P c="Hover any row to see exactly which positions that token is allowed to attend to and which are blocked:" />
      <MaskingDemo />

      <H2 c="How the mask is applied — step by step" />
      <Mx block>{`1. Compute scaled attention scores as usual:
   Scores = Q · Kᵀ / √d_k      shape: (T, T)

2. Apply causal mask:
   Scores[i,j] = Scores[i,j]   if j ≤ i  (past or present — visible)
   Scores[i,j] = -∞             if j > i  (future — blocked)

3. Softmax converts -∞ to zero:
   Weights = softmax(Scores)    — future positions have weight = 0

4. Weighted sum:
   Output = Weights · V         — future tokens contribute nothing

Result: position i's output depends ONLY on positions 0…i.
This matches exactly what autoregressive inference would compute.`}</Mx>

      <H2 c="Training vs inference — the elegant unification" />
      <Table
        heads={["Aspect","Training (parallel)","Inference (autoregressive)"]}
        rows={[
          ["Input to decoder","Full target sequence at once","One new token per step"],
          ["Masking applied?","Yes — causal mask blocks future","N/A — future doesn't exist yet"],
          ["Computation per step","All positions simultaneously","Single position per step"],
          ["Speed","Fast (GPU parallelism)","Slow (sequential by nature)"],
          ["Teacher forcing?","Yes — ground truth as decoder input","No — model's own previous output"],
          ["Data leakage?","Prevented by masking","Impossible — no future to peek at"],
          ["The key insight","Masking makes training simulate inference","The same model, the same weights"],
        ]}
      />

      <H2 c="Interview Q&A" />
      <QA q="What is the data leakage problem in Transformer decoder training and how does masking solve it?"
         a="During training, the decoder receives the complete target sequence (e.g. 'Hello world [EOS]') as input for efficiency. Without masking, when computing the representation for 'world' at position 2, the self-attention mechanism can attend to '[EOS]' at position 3 — the answer it should be predicting. The model short-circuits: instead of learning to generate from context, it learns to copy from the future. At inference, the future tokens don't exist, so the model fails. Masking solves this by setting attention scores from position i to any position j > i to -∞. After softmax, these become exactly 0. The model processes all positions in parallel but can only attend to past and present tokens — identical to what autoregressive inference would do." />
      <QA q="Why is masked self-attention called 'masked' and not 'causal' attention?"
         a="Both terms are used — the original paper calls it 'masked attention', while the ML community often calls it 'causal attention' or 'causal self-attention'. 'Masked' describes the mechanism (applying a mask to scores). 'Causal' describes the property achieved (attention respects the causal ordering — outputs only depend on past inputs). The term 'masked' is broader because masks can achieve other effects too (e.g. padding masks that hide padded tokens, prefix masks that allow full attention to a prompt then causal attention to the response). When people say 'masked self-attention' in the context of the decoder, they always mean the causal lower-triangular mask." />
      <QA q="At inference time, why does the decoder process tokens one at a time if the Transformer is supposed to be parallel?"
         a="The Transformer's parallelism applies to processing a <em>given sequence</em> — all positions in a sequence are processed simultaneously. But autoregressive <em>generation</em> is inherently sequential: you cannot generate token t+1 without knowing token t, because token t is part of the input context for token t+1. The mask during training creates the same dependency structure that inference has — only past tokens are visible. At inference, you genuinely do not have future tokens to process. This is the fundamental speed bottleneck of autoregressive generation. Research into non-autoregressive generation (generating all tokens in parallel) is active but challenging because it requires the model to plan the entire output simultaneously." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 5 — CROSS-ATTENTION (Ch 82)
══════════════════════════════════════════════════════ */
function CrossAttnDiagram() {
  const [step, setStep] = useState(0);

  var steps = [
    { label:"Decoder hidden states", info:'The decoder has been running its masked self-attention. Each decoder token position now has a hidden state that encodes "what I have generated so far, what do I need next?"', arrow:false },
    { label:"Encoder output", info:"The encoder has processed the full source sentence and produced one context vector per source token. These rich vectors encode the meaning of each source token in full context.", arrow:false },
    { label:"Q from decoder, K and V from encoder", info:"Cross-attention uses the DECODER's hidden states as Queries ('what am I looking for in the source?') and the ENCODER's output as both Keys ('what does each source token advertise?') and Values ('what does each source token carry?').", arrow:true },
    { label:"Attention weights — where to look", info:"For each decoder position, the cross-attention weights show which source tokens are most relevant. When generating the French word 'chat', the decoder attends heavily to the English word 'cat' in the encoder output.", arrow:true },
    { label:"Context vector — information retrieved", info:"The context vector for each decoder position is a weighted combination of encoder Value vectors. It carries source-language information directly into the decoder's computation at this step.", arrow:true },
  ];

  var s = steps[step];
  return (
    <div style={{ border:"0.5px solid var(--color-border-tertiary)", borderRadius:"var(--border-radius-lg)", overflow:"hidden", margin:"0.75rem 0" }}>
      {/* diagram */}
      <div style={{ background:"var(--color-background-secondary)", padding:"1rem", borderBottom:"0.5px solid var(--color-border-tertiary)" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr auto 1fr", gap:16, alignItems:"center" }}>
          {/* encoder column */}
          <div>
            <div style={{ fontSize:10, color:"var(--color-text-tertiary)", marginBottom:6, textTransform:"uppercase", letterSpacing:"0.06em" }}>Encoder output (source)</div>
            {["The","cat","sat"].map((w, wi) => {
              var isHighlighted = (step >= 3) && (w === "cat");
              return (
                <div key={wi} style={{ padding:"5px 10px", borderRadius:5, background:isHighlighted?"#EAF3DE":"var(--color-background-info)", border:"1.5px solid " + (isHighlighted?"#3B6D11":"var(--color-border-info)"), marginBottom:4, fontFamily:"var(--font-mono)", fontSize:13, color:isHighlighted?"#27500A":"var(--color-text-info)", fontWeight:isHighlighted?600:400, transition:"all 0.3s" }}>
                  {w} → K_{wi}, V_{wi}
                </div>
              );
            })}
          </div>

          {/* cross-attention arrow */}
          <div style={{ textAlign:"center" }}>
            <div style={{ fontSize:11, color:"var(--color-text-tertiary)", marginBottom:4 }}>cross-attention</div>
            <div style={{ fontSize:20, color:step>=2?"#185FA5":"var(--color-text-tertiary)", transition:"all 0.3s" }}>↔</div>
            {step >= 2 && (
              <div style={{ fontSize:10, color:"#185FA5", marginTop:4, lineHeight:1.4, maxWidth:80, textAlign:"center" }}>
                Q←decoder<br/>K,V←encoder
              </div>
            )}
          </div>

          {/* decoder column */}
          <div>
            <div style={{ fontSize:10, color:"var(--color-text-tertiary)", marginBottom:6, textTransform:"uppercase", letterSpacing:"0.06em" }}>Decoder (generating target)</div>
            {["[SOS]","Le","chat"].map((w, wi) => {
              var isQuery = (step >= 2) && (w === "chat");
              return (
                <div key={wi} style={{ padding:"5px 10px", borderRadius:5, background:isQuery?"#EEEDFE":"var(--color-background-success)", border:"1.5px solid " + (isQuery?"#534AB7":"var(--color-border-success)"), marginBottom:4, fontFamily:"var(--font-mono)", fontSize:13, color:isQuery?"#3C3489":"var(--color-text-success)", fontWeight:isQuery?600:400, transition:"all 0.3s" }}>
                  {w} → Q_{wi}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* explanation */}
      <div style={{ padding:"11px 15px" }}>
        <div style={{ fontWeight:500, fontSize:13.5, color:"var(--color-text-primary)", marginBottom:5 }}>Step {step+1}: {s.label}</div>
        <div style={{ fontSize:13.5, color:"var(--color-text-secondary)", lineHeight:1.75 }}>{s.info}</div>
      </div>
      <div style={{ display:"flex", justifyContent:"space-between", padding:"7px 13px", borderTop:"0.5px solid var(--color-border-tertiary)", background:"var(--color-background-secondary)" }}>
        <button onClick={() => setStep(v => Math.max(0,v-1))} disabled={step===0} style={{ background:"none", border:"0.5px solid var(--color-border-tertiary)", borderRadius:"var(--border-radius-md)", padding:"4px 12px", cursor:step===0?"default":"pointer", fontSize:13, color:step===0?"var(--color-text-tertiary)":"var(--color-text-secondary)" }}>← prev</button>
        <span style={{ fontSize:12, color:"var(--color-text-tertiary)", alignSelf:"center", fontFamily:"var(--font-mono)" }}>{step+1}/{steps.length}</span>
        <button onClick={() => setStep(v => Math.min(steps.length-1,v+1))} disabled={step===steps.length-1} style={{ background:"none", border:"0.5px solid var(--color-border-tertiary)", borderRadius:"var(--border-radius-md)", padding:"4px 12px", cursor:step===steps.length-1?"default":"pointer", fontSize:13, color:step===steps.length-1?"var(--color-text-tertiary)":"var(--color-text-secondary)" }}>next →</button>
      </div>
    </div>
  );
}

function SectionCrossAttn() {
  return (
    <div>
      <Note color="success" icon="ti-arrows-exchange">
        <strong>Cross-attention in one sentence:</strong> The decoder looks at the encoder output — the decoder provides the Query (what am I looking for?) and the encoder provides the Keys and Values (what does each source token offer?). This is the bridge between encoder and decoder.
      </Note>

      <H2 c="What problem cross-attention solves" />
      <P c="After masked self-attention, each decoder token has a representation encoding what has been generated so far in the target language. But the decoder also needs to know what the source sentence says — it needs to consult the encoder output. Cross-attention is the mechanism that provides this consultation." />

      <H2 c="Self-attention vs cross-attention — side by side" />
      <Table
        heads={["Aspect","Self-Attention","Cross-Attention"]}
        rows={[
          ["Where used","Encoder and decoder both","Decoder only (second sublayer)"],
          ["Source of Q","Same sequence","Decoder hidden states"],
          ["Source of K","Same sequence","Encoder output"],
          ["Source of V","Same sequence","Encoder output"],
          ["Purpose","Tokens attend to each other in same sequence","Decoder tokens attend to source tokens"],
          ["Masking","None (encoder) / causal (decoder)","None — decoder can see entire source"],
          ["Analogy","Everyone reads their own team's notes","Students read the teacher's notes"],
        ]}
      />

      <H2 c="Cross-attention step by step" />
      <P c="Step through the cross-attention process for translating 'The cat sat' into 'Le chat…':" />
      <CrossAttnDiagram />

      <H2 c="Cross-attention equations" />
      <Mx block>{`Cross-Attention(decoder_state, encoder_output):

  Q = decoder_state · W_Q    ← from DECODER (shape: T_tgt × d_k)
  K = encoder_output · W_K   ← from ENCODER (shape: T_src × d_k)
  V = encoder_output · W_V   ← from ENCODER (shape: T_src × d_v)

  Scores  = Q · Kᵀ / √d_k         (T_tgt × T_src) matrix
            ↑ each decoder pos scores against ALL encoder positions

  Weights = softmax(Scores)         — NO mask applied here!
            Decoder can see entire source sequence (it already exists)

  Output  = Weights · V             (T_tgt × d_v)
            ↑ each decoder pos gets a weighted combination of source values

Key difference from self-attention:
  T_tgt ≠ T_src in general
  Q has shape (T_tgt × d_k) — one per target position
  K,V have shape (T_src × d_k/d_v) — one per source position
  Output has shape (T_tgt × d_v) — one per target position`}</Mx>

      <H2 c="Why no masking in cross-attention?" />
      <P c="Cross-attention has no causal mask because the encoder output represents the entire source sentence, which is fully available before decoding begins. There is no future leakage concern — when generating the target, the decoder is allowed (and should) look at all source tokens freely. The causal mask is only needed in self-attention to prevent target tokens from seeing future target tokens." />

      <H2 c="Interview Q&A" />
      <QA q="What makes cross-attention different from self-attention mechanically?"
         a="In self-attention, Q, K, and V are all computed from the same input tensor X via different projection matrices: Q=XW_Q, K=XW_K, V=XW_V. In cross-attention, Q comes from one tensor (the decoder's hidden states) and K and V come from a different tensor (the encoder output): Q=decoder_states·W_Q, K=encoder_output·W_K, V=encoder_output·W_V. The attention formula is otherwise identical: softmax(Q·Kᵀ/√d_k)·V. The score matrix has shape (T_tgt × T_src) instead of (T × T), and there is no causal mask." />
      <QA q="In cross-attention, why do Keys and Values both come from the encoder, while only Queries come from the decoder?"
         a="The intuition: the decoder's hidden state represents 'what I need' — so it becomes the Query. The encoder output represents the source information — it provides both what to search by (Keys) and what to retrieve (Values). Using the encoder output for both K and V means: the attention pattern (how much to look at each source token) is determined by matching the decoder's current need against the source tokens' content (Q·Kᵀ), and the information retrieved is also the source tokens' content (V). There is no deep mathematical reason K and V must be the same source; in practice they always are in the Transformer because it works well and keeps the design symmetric." />
      <QA q="Does cross-attention replace Bahdanau/Luong attention or extend it?"
         a="It extends and generalises it. Bahdanau/Luong attention (from Seq2Seq RNNs) was also a cross-attention mechanism — decoder attends over encoder states. The Transformer's cross-attention does the same thing but with three key improvements: (1) it uses the multi-head mechanism (8 or more independent attention heads), allowing the decoder to simultaneously retrieve different types of information from the source; (2) the queries, keys, and values are learned linear projections, not raw hidden states; (3) the scores are scaled by 1/√d_k to prevent saturation. Conceptually they solve the same problem; Transformer cross-attention is simply the cleaner, more powerful, and more parallelisable implementation." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 6 — DECODER ARCHITECTURE + INFERENCE (Ch 83-84)
══════════════════════════════════════════════════════ */
var INFER_STEPS = [
  {
    step:1,
    dec_input:["[SOS]"],
    dec_hidden:["h_0"],
    enc_output:"[The cat sat]",
    predicted:"Hello",
    detail:"The decoder receives only [SOS] as its input token. Masked self-attention over this single token is trivial (attends only to itself). Cross-attention retrieves relevant information from the encoder output of 'The cat sat'. The FFN processes the result. The output layer predicts the most probable next token: 'Hello'.",
  },
  {
    step:2,
    dec_input:["[SOS]","Hello"],
    dec_hidden:["h_0","h_1"],
    enc_output:"[The cat sat]",
    predicted:"world",
    detail:"Now the decoder has [SOS, Hello] as input. Masked self-attention lets 'Hello' attend to [SOS] and itself but not future tokens. Cross-attention again consults the encoder output. The model predicts 'world' conditioned on having already generated 'Hello'.",
  },
  {
    step:3,
    dec_input:["[SOS]","Hello","world"],
    dec_hidden:["h_0","h_1","h_2"],
    enc_output:"[The cat sat]",
    predicted:"[EOS]",
    detail:"With [SOS, Hello, world] available, the decoder predicts [EOS] — end of sequence. The causal mask has ensured that at each step, only past tokens were visible. Notice: during inference we re-process ALL previous tokens at each step. Optimisation (KV-cache) can avoid this by caching K and V from previous steps.",
  },
];

function InferenceStepper() {
  const [step, setStep] = useState(0);
  var s = INFER_STEPS[step];
  return (
    <div style={{ border:"0.5px solid var(--color-border-tertiary)", borderRadius:"var(--border-radius-lg)", overflow:"hidden", margin:"0.75rem 0" }}>
      <div style={{ display:"flex", borderBottom:"0.5px solid var(--color-border-tertiary)" }}>
        {INFER_STEPS.map((st, idx) => (
          <button key={idx} onClick={() => setStep(idx)} style={{ flex:1, padding:"8px 4px", border:"none", background:step===idx?"var(--color-background-info)":"transparent", fontSize:13, fontWeight:step===idx?500:400, color:step===idx?"var(--color-text-info)":"var(--color-text-secondary)", cursor:"pointer", borderBottom:step===idx?"2px solid var(--color-border-info)":"2px solid transparent" }}>
            Generation step {st.step}
          </button>
        ))}
      </div>

      {/* token sequence */}
      <div style={{ padding:"0.75rem 1rem", borderBottom:"0.5px solid var(--color-border-tertiary)", background:"var(--color-background-secondary)" }}>
        <div style={{ fontSize:11, color:"var(--color-text-tertiary)", marginBottom:6, textTransform:"uppercase", letterSpacing:"0.06em" }}>Decoder input sequence at this step</div>
        <div style={{ display:"flex", gap:6, alignItems:"center", flexWrap:"wrap" }}>
          {s.dec_input.map((tok, ti) => (
            <div key={ti} style={{ padding:"4px 10px", borderRadius:5, background:"var(--color-background-info)", border:"1px solid var(--color-border-info)", fontFamily:"var(--font-mono)", fontSize:13, color:"var(--color-text-info)" }}>{tok}</div>
          ))}
          <div style={{ color:"var(--color-text-tertiary)", fontSize:16 }}>→ predicts →</div>
          <div style={{ padding:"4px 12px", borderRadius:5, background:"var(--color-background-success)", border:"1.5px solid var(--color-border-success)", fontFamily:"var(--font-mono)", fontSize:13.5, fontWeight:600, color:"var(--color-text-success)" }}>{s.predicted}</div>
        </div>
        <div style={{ marginTop:8, fontSize:12, color:"var(--color-text-tertiary)" }}>
          Encoder input (fixed throughout): <span style={{ fontFamily:"var(--font-mono)", color:"var(--color-text-secondary)" }}>{s.enc_output}</span>
        </div>
      </div>

      {/* causal mask for this step */}
      <div style={{ padding:"0.75rem 1rem", borderBottom:"0.5px solid var(--color-border-tertiary)" }}>
        <div style={{ fontSize:11, color:"var(--color-text-tertiary)", marginBottom:6, textTransform:"uppercase", letterSpacing:"0.06em" }}>Causal mask active for this step ({s.dec_input.length}×{s.dec_input.length})</div>
        <div style={{ display:"inline-flex", flexDirection:"column", gap:2 }}>
          {s.dec_input.map((_, ri) => (
            <div key={ri} style={{ display:"flex", gap:2 }}>
              {s.dec_input.map((tok, ci) => {
                var visible = ci <= ri;
                return (
                  <div key={ci} style={{ width:36, height:28, display:"flex", alignItems:"center", justifyContent:"center", background:visible?"#E6F1FB":"#FAECE7", border:"1px solid " + (visible?"#185FA5":"#D85A30"), borderRadius:3, fontSize:11, fontFamily:"var(--font-mono)", color:visible?"#0C447C":"#993C1D" }}>
                    {visible?"✓":"-∞"}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* explanation */}
      <div style={{ padding:"11px 15px", fontSize:13.5, lineHeight:1.8, color:"var(--color-text-secondary)" }}>{s.detail}</div>
      <div style={{ display:"flex", justifyContent:"space-between", padding:"7px 13px", borderTop:"0.5px solid var(--color-border-tertiary)", background:"var(--color-background-secondary)" }}>
        <button onClick={() => setStep(v => Math.max(0,v-1))} disabled={step===0} style={{ background:"none", border:"0.5px solid var(--color-border-tertiary)", borderRadius:"var(--border-radius-md)", padding:"4px 12px", cursor:step===0?"default":"pointer", fontSize:13, color:step===0?"var(--color-text-tertiary)":"var(--color-text-secondary)" }}>← prev</button>
        <span style={{ fontSize:12, color:"var(--color-text-tertiary)", alignSelf:"center", fontFamily:"var(--font-mono)" }}>{step+1}/{INFER_STEPS.length}</span>
        <button onClick={() => setStep(v => Math.min(INFER_STEPS.length-1,v+1))} disabled={step===INFER_STEPS.length-1} style={{ background:"none", border:"0.5px solid var(--color-border-tertiary)", borderRadius:"var(--border-radius-md)", padding:"4px 12px", cursor:step===INFER_STEPS.length-1?"default":"pointer", fontSize:13, color:step===INFER_STEPS.length-1?"var(--color-text-tertiary)":"var(--color-text-secondary)" }}>next →</button>
      </div>
    </div>
  );
}

function SectionDecoderInference() {
  return (
    <div>
      <Note color="success" icon="ti-bulb">
        <strong>The decoder's three sublayers:</strong> (1) Masked self-attention — lets target tokens attend to past target tokens only; (2) Cross-attention — lets target tokens consult the full source via encoder output; (3) Feed-forward network — per-token nonlinear transformation. Together they generate contextually appropriate, source-conditioned output one token at a time.
      </Note>

      <H2 c="Decoder block — complete architecture" />
      <P c="A single decoder block contains three sublayers, each with its own Layer Norm and residual connection. Compare to the encoder which has only two (no cross-attention):" />
      <div style={{ overflowX:"auto", margin:"0.75rem 0" }}>
        <div style={{ display:"flex", flexDirection:"column", gap:6, minWidth:400 }}>
          {[
            { label:"Input: target tokens + positional encoding", color:"#185FA5", note:"During training: full shifted target sequence. During inference: tokens generated so far." },
            { label:"1. Masked Multi-Head Self-Attention", color:"#993C1D", note:"Target tokens attend to past target tokens only. Causal mask prevents future token leakage." },
            { label:"   + Residual connection + Layer Norm", color:"#888780", note:"x = LayerNorm(x + MaskedSelfAttn(x))" },
            { label:"2. Multi-Head Cross-Attention", color:"#0F6E56", note:"Q from decoder, K and V from encoder output. No masking — full source visible." },
            { label:"   + Residual connection + Layer Norm", color:"#888780", note:"x = LayerNorm(x + CrossAttn(x, encoder_output))" },
            { label:"3. Feed-Forward Network", color:"#534AB7", note:"Per-token two-layer MLP. Same architecture as encoder FFN." },
            { label:"   + Residual connection + Layer Norm", color:"#888780", note:"x = LayerNorm(x + FFN(x))" },
            { label:"Output: Linear projection + Softmax → next token probability", color:"#185FA5", note:"Linear(d_model → vocab_size) then softmax. Pick argmax or sample." },
          ].map((item, idx) => (
            <div key={idx} style={{ display:"flex", gap:10, alignItems:"baseline" }}>
              <div style={{ width:8, height:8, borderRadius:"50%", background:item.color, flexShrink:0, marginTop:5 }} />
              <div style={{ flex:1 }}>
                <span style={{ fontWeight:500, fontSize:13.5, color:"var(--color-text-primary)" }}>{item.label}</span>
                <span style={{ fontSize:12.5, color:"var(--color-text-secondary)", marginLeft:8 }}>{item.note}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <H2 c="Complete decoder block — PyTorch" />
      <Code>{`class DecoderBlock(nn.Module):
    # One decoder block with 3 sublayers (Pre-LN variant).
    def __init__(self, d_model, n_heads, d_ff, dropout=0.1):
        super().__init__()
        self.norm1 = nn.LayerNorm(d_model)
        self.norm2 = nn.LayerNorm(d_model)
        self.norm3 = nn.LayerNorm(d_model)

        # 1. Masked self-attention (target attends to target)
        self.self_attn  = nn.MultiheadAttention(d_model, n_heads,
                            dropout=dropout, batch_first=True)

        # 2. Cross-attention (target attends to source)
        self.cross_attn = nn.MultiheadAttention(d_model, n_heads,
                            dropout=dropout, batch_first=True)

        # 3. Feed-forward network
        self.ffn = nn.Sequential(
            nn.Linear(d_model, d_ff), nn.GELU(),
            nn.Dropout(dropout), nn.Linear(d_ff, d_model), nn.Dropout(dropout),
        )

    def forward(self, tgt, memory, tgt_mask=None, tgt_key_padding_mask=None):
        # tgt: (batch,T_tgt,d_model)  memory: (batch,T_src,d_model)  tgt_mask: (T_tgt,T_tgt)
        # 1. Masked self-attention
        x = self.norm1(tgt)
        x_attn, _ = self.self_attn(x, x, x,
                                   attn_mask=tgt_mask,
                                   key_padding_mask=tgt_key_padding_mask)
        tgt = tgt + x_attn                 # residual

        # 2. Cross-attention (Q=decoder, K=V=encoder)
        x = self.norm2(tgt)
        x_cross, attn_weights = self.cross_attn(x, memory, memory)
        tgt = tgt + x_cross                # residual

        # 3. FFN
        tgt = tgt + self.ffn(self.norm3(tgt))   # residual

        return tgt, attn_weights   # return cross-attn weights for visualisation


def generate_causal_mask(T, device):
    # Lower-triangular causal mask for decoder self-attention.
    mask = torch.triu(torch.ones(T, T, device=device), diagonal=1).bool()
    # True = masked out (set to -inf); False = attend normally
    return mask`}</Code>

      <H2 c="Inference — autoregressive generation step by step" />
      <P c="Step through what happens at each inference step. The encoder runs ONCE. The decoder runs once per output token:" />
      <InferenceStepper />

      <H2 c="The KV-Cache optimisation" />
      <P c="At each generation step, the decoder re-processes ALL previous tokens. For step T, it recomputes K and V for tokens 0…T-1 that haven't changed. The KV-cache avoids this redundancy:" />
      <Mx block>{`Without KV-cache:
  Step 1: process 1 token   → O(1) attention compute
  Step 2: process 2 tokens  → O(4) attention compute (2² matrix)
  Step 3: process 3 tokens  → O(9) attention compute
  Step T: process T tokens  → O(T²) attention compute
  Total over T steps: O(T³) — cubic!

With KV-cache:
  Cache K and V from all previous steps.
  At step T: only compute K_T, V_T (new token).
  Attend new Q_T against cached K_{0..T-1}, V_{0..T-1}.
  Each step: O(T) — just one new row in the attention matrix.
  Total over T steps: O(T²) — quadratic (same as processing once).

Memory cost: store K and V for all layers, all heads, all previous steps.
  GPT-3: 96 layers × 2 (K,V) × 96 heads × 128 d_v × T tokens × 2 bytes
  → ~4.7 MB per token generated → limits practical context length.`}</Mx>

      <H2 c="Complete Transformer — end to end" />
      <Code>{`class Transformer(nn.Module):
    def __init__(self, src_vocab, tgt_vocab, d_model=512, n_heads=8,
                 n_layers=6, d_ff=2048, max_len=512, dropout=0.1):
        super().__init__()
        self.encoder   = TransformerEncoder(src_vocab, d_model, n_heads,
                                            n_layers, d_ff, max_len, dropout)
        self.tgt_embed = nn.Embedding(tgt_vocab, d_model)
        self.pos_enc   = PositionalEncoding(d_model, max_len, dropout)
        self.dec_blocks= nn.ModuleList(
            [DecoderBlock(d_model, n_heads, d_ff, dropout) for _ in range(n_layers)]
        )
        self.norm      = nn.LayerNorm(d_model)
        self.output    = nn.Linear(d_model, tgt_vocab)   # final projection

    def forward(self, src, tgt):
        # Encode source ONCE
        memory = self.encoder(src)          # (batch, T_src, d_model)

        # Build causal mask for target
        T_tgt = tgt.size(1)
        tgt_mask = generate_causal_mask(T_tgt, tgt.device)

        # Decode
        x = self.pos_enc(self.tgt_embed(tgt) * math.sqrt(self.encoder.d_model))
        for block in self.dec_blocks:
            x, _ = block(x, memory, tgt_mask=tgt_mask)
        x = self.norm(x)

        return self.output(x)               # (batch, T_tgt, tgt_vocab) — logits

    @torch.no_grad()
    def generate(self, src, max_new_tokens=50, sos_id=1, eos_id=2):
        # Greedy autoregressive generation.
        memory = self.encoder(src)          # encode source once
        generated = torch.tensor([[sos_id]], device=src.device)

        for _ in range(max_new_tokens):
            logits = self.forward(src, generated)    # (1, T_so_far, vocab)
            next_tok = logits[:, -1, :].argmax(-1, keepdim=True)  # greedy
            generated = torch.cat([generated, next_tok], dim=1)
            if next_tok.item() == eos_id:
                break

        return generated[:, 1:]   # remove [SOS]`}</Code>

      <H2 c="Interview Q&A" />
      <QA q="Walk me through a complete Transformer forward pass for machine translation."
         a="<strong>Encoder (runs once):</strong> Source tokens are embedded and positional encoding is added. The embedding matrix is (T_src, d_model). This passes through N encoder blocks, each containing: LayerNorm → Multi-Head Self-Attention (all source tokens attend to all others) + Residual → LayerNorm → FFN + Residual. Output: memory matrix of shape (T_src, d_model) — a rich contextual representation of every source token.<br/><br/><strong>Decoder (runs T_tgt times at inference, once at training):</strong> Target tokens (or [SOS] at inference start) are embedded + positional encoding. Through N decoder blocks, each containing: LayerNorm → Masked Self-Attention (causal mask blocks future tokens) + Residual → LayerNorm → Cross-Attention (Q from decoder, K/V from encoder memory) + Residual → LayerNorm → FFN + Residual. Final output projected through Linear(d_model → vocab_size) + Softmax to get probability distribution over target vocabulary." />
      <QA q="What is the KV-Cache and why is it important for deployment?"
         a="During autoregressive inference, at generation step T the decoder processes tokens 0 through T. The Keys (K) and Values (V) for tokens 0 through T-1 are identical to what was computed at step T-1 — they come from tokens that haven't changed. The KV-Cache stores these K and V tensors across generation steps so they don't need to be recomputed. Without KV-Cache, inference is O(T³) total compute. With KV-Cache, it is O(T²) — the same as a single full forward pass. The cost is memory: storing K and V for all layers, all heads, and all previous positions. For GPT-3 with a 4096-token context, the KV-Cache requires ~1.6 GB of GPU memory — which is why large models with long contexts require enormous GPU memory budgets." />
      <QA q="What is the difference between the decoder during training vs inference?"
         a="<strong>Training:</strong> The decoder receives the entire target sequence at once (teacher forcing). All T_tgt positions are processed in parallel. The causal mask ensures position i only attends to positions ≤ i. All T_tgt predictions are computed simultaneously and all contribute to the loss. <strong>Inference:</strong> The decoder generates one token per step. At step T, it receives all T previously generated tokens, processes them, takes the prediction at the last position as the new token. There is no teacher forcing — the model's own predictions are fed back as the next input. The causal mask is implicit (there are no future tokens to mask). Training is fast (parallel); inference is slow (sequential). This is the fundamental trade-off in autoregressive models." />
      <QA q="Why does the Transformer encoder run only once per input, not once per output token?"
         a="The encoder's job is to read and understand the source sequence — this computation depends only on the source, which doesn't change during generation. Running it once produces the memory matrix (encoder output), which is then accessed at every decoder step via cross-attention. The decoder reads this cached memory repeatedly without recomputing it. This is efficient: the encoder computation scales with O(T_src²) in attention and is a fixed one-time cost; all the autoregressive expense is in the decoder. For very long source sequences, the encoder is still the expensive part — but you only pay it once per translation." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   ROOT — TABS + APP
══════════════════════════════════════════════════════ */
const TABS = [
  { id:"posenc",   label:"Positional Encoding",    sub:"Ch 78 · Why, simple solutions, sinusoidal" },
  { id:"layernorm",label:"Layer Normalisation",     sub:"Ch 79 · BatchNorm vs LayerNorm" },
  { id:"encoder",  label:"Encoder Architecture",   sub:"Ch 80 · Full block, FFN, code" },
  { id:"maskattn", label:"Masked Self-Attention",  sub:"Ch 81 · Data leakage, causal mask" },
  { id:"crossattn",label:"Cross-Attention",         sub:"Ch 82 · Encoder-decoder bridge" },
  { id:"decoder",  label:"Decoder + Inference",    sub:"Ch 83-84 · Full decoder, KV-cache" },
];

export default function TransformersPart2() {
  const [active, setActive] = useState("posenc");
  var map = {
    posenc:    <SectionPosEnc />,
    layernorm: <SectionLayerNorm />,
    encoder:   <SectionEncoder />,
    maskattn:  <SectionMaskedAttn />,
    crossattn: <SectionCrossAttn />,
    decoder:   <SectionDecoderInference />,
  };
  return (
    <div>
      <div className="page-header">
        <div className="page-header-eyebrow">Deep Learning — Module 18</div>
        <h1 className="page-header-title">Transformers Part 2: Architecture</h1>
        <p className="page-header-subtitle">Ch 78-84 · Positional encoding · Layer norm · Encoder · Masked self-attention · Cross-attention · Decoder · Inference</p>
      </div>

      <SectionNav tabs={TABS} active={active} onChange={setActive} />

      <div style={{ padding: "0.5rem 0 2rem" }}>
        {map[active]}
      </div>

      <NavButtons moduleId={18} />
    </div>
  );
}
