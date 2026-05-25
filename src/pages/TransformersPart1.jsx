import { useState, useEffect } from "react";
import { Code } from '../components/ui/Code.jsx';
import { Mx, H2, H3, P } from '../components/ui/Typography.jsx';
import { QA } from '../components/ui/QA.jsx';
import { Note, Grid, Card, Table, VizBox } from '../components/ui/Primitives.jsx';
import NavButtons from '../components/layout/NavButtons.jsx';
import SectionNav from '../components/layout/SectionNav.jsx';

/* ══════════════════════════════════════════════════════
   INTERACTIVE — SELF-ATTENTION STEP STEPPER
══════════════════════════════════════════════════════ */
// Concrete example: 3 words, d_model=4, d_k=3
// Pre-computed values for "The cat sat"
const ATTN_EXAMPLE = {
  words: ["The", "cat", "sat"],
  // Embeddings (d_model=4, illustrative)
  X: [[0.8,0.1,0.2,0.5], [0.2,0.9,0.7,0.1], [0.5,0.3,0.8,0.4]],
  // After projection to Q,K,V (d_k=d_v=3)
  Q: [[0.4,0.2,0.6], [0.7,0.8,0.1], [0.3,0.5,0.7]],
  K: [[0.3,0.5,0.4], [0.8,0.2,0.6], [0.5,0.4,0.3]],
  V: [[0.1,0.6,0.3], [0.7,0.2,0.8], [0.4,0.5,0.1]],
  // Raw scores Q @ K^T  (3x3, pre-scaled)
  rawScores: [
    [0.44, 0.58, 0.42],
    [0.62, 0.74, 0.56],
    [0.53, 0.65, 0.49],
  ],
  // Scaled by 1/sqrt(3)=0.577
  scaledScores: [
    [0.25, 0.34, 0.24],
    [0.36, 0.43, 0.32],
    [0.31, 0.38, 0.28],
  ],
  // Softmax of scaled scores (row-wise)
  attnWeights: [
    [0.31, 0.37, 0.32],
    [0.30, 0.40, 0.30],
    [0.31, 0.38, 0.31],
  ],
  // Output = attnWeights @ V  (3x3)
  output: [
    [0.39, 0.43, 0.39],
    [0.40, 0.42, 0.43],
    [0.39, 0.43, 0.39],
  ],
};

const ATTN_STEPS = [
  {
    id:"embed",
    title:"Step 1: Input embeddings",
    color:"info",
    desc:"Each token in the input sequence is mapped to a dense embedding vector of dimension d_model. These embeddings encode the token's identity and position (positional encoding is added). Here d_model = 4.",
    highlight: "X",
  },
  {
    id:"proj",
    title:"Step 2: Linear projections → Q, K, V",
    color:"success",
    desc:"Three separate learned weight matrices W_Q, W_K, W_V project each embedding into a lower-dimensional Query, Key, and Value vector (d_k = d_v = 3). These projections allow the model to learn different roles for each token.",
    highlight: "QKV",
  },
  {
    id:"scores",
    title:"Step 3: Raw attention scores Q·Kᵀ",
    color:"warning",
    desc:"The attention score between positions i and j is the dot product of query Q_i and key K_j. High score = strong relevance. For a sequence of length 3, this produces a 3×3 score matrix — one score per token pair.",
    highlight: "raw",
  },
  {
    id:"scale",
    title:"Step 4: Scale by 1/√d_k",
    color:"warning",
    desc:"Divide every score by √d_k = √3 ≈ 1.73. Without this, large d_k causes large dot products → softmax saturates → vanishing gradients. Scaling normalises variance back to ~1.0 regardless of d_k.",
    highlight: "scaled",
  },
  {
    id:"softmax",
    title:"Step 5: Softmax → attention weights",
    color:"danger",
    desc:"Apply softmax row-wise: each row becomes a probability distribution over all positions. Row i tells us: 'when computing the output for token i, how much should it attend to each token j?' All rows sum to 1.",
    highlight: "weights",
  },
  {
    id:"output",
    title:"Step 6: Weighted sum of Values → output",
    color:"purple",
    desc:"Output Z_i = Σ_j α_{ij} · V_j. Each output vector is a weighted combination of all Value vectors, where the weights come from the attention distribution. Token i's output now encodes context from all other tokens.",
    highlight: "output",
  },
];

function MatrixDisplay({ data, label, color, small }) {
  const cellSize = small ? 30 : 38;
  const fontSize = small ? 9.5 : 11;
  const bgMap = {
    info:"#E6F1FB", success:"#EAF3DE", warning:"#FAEEDA",
    danger:"#FAECE7", purple:"#EEEDFE", gray:"#F0EFEE"
  };
  const bdMap = {
    info:"#185FA5", success:"#3B6D11", warning:"#854F0B",
    danger:"#993C1D", purple:"#534AB7", gray:"#888780"
  };
  const txMap = {
    info:"#0C447C", success:"#27500A", warning:"#633806",
    danger:"#712B13", purple:"#3C3489", gray:"#5F5E5A"
  };
  const bg = bgMap[color] || bgMap.info;
  const bd = bdMap[color] || bdMap.info;
  const tx = txMap[color] || txMap.info;
  return (
    <div style={{ display:"inline-block", margin:"0 6px 6px 0" }}>
      {label && <div style={{ fontSize:11, fontWeight:500, color:tx, marginBottom:3, fontFamily:"var(--font-mono)" }}>{label}</div>}
      <div style={{ border:"1.5px solid " + bd, borderRadius:6, overflow:"hidden", background:bg }}>
        {data.map((row, ri) => (
          <div key={ri} style={{ display:"flex" }}>
            {row.map((val, ci) => (
              <div key={ci} style={{ width:cellSize+"px", height:cellSize+"px", display:"flex", alignItems:"center", justifyContent:"center", fontSize:fontSize, fontFamily:"var(--font-mono)", color:tx, borderRight:ci<row.length-1?"0.5px solid "+bd+"66":"none", borderBottom:ri<data.length-1?"0.5px solid "+bd+"66":"none" }}>
                {typeof val === "number" ? val.toFixed(2) : val}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function SelfAttnStepper() {
  const [step, setStep] = useState(0);
  const s = ATTN_STEPS[step];
  const E = ATTN_EXAMPLE;

  const colorBg = {
    info:"var(--color-background-info)", success:"var(--color-background-success)",
    warning:"var(--color-background-warning)", danger:"var(--color-background-danger)",
    purple:"var(--color-background-secondary)"
  };

  return (
    <div style={{ border:"0.5px solid var(--color-border-tertiary)", borderRadius:"var(--border-radius-lg)", overflow:"hidden", margin:"0.75rem 0" }}>
      <div style={{ display:"flex", borderBottom:"0.5px solid var(--color-border-tertiary)", overflowX:"auto" }}>
        {ATTN_STEPS.map((st, idx) => (
          <button key={idx} onClick={() => setStep(idx)} style={{ background:step===idx?colorBg[st.color]:"transparent", border:"none", borderRight:"0.5px solid var(--color-border-tertiary)", padding:"7px 13px", cursor:"pointer", fontSize:12.5, whiteSpace:"nowrap", color:step===idx?"var(--color-text-"+st.color+")":"var(--color-text-secondary)", fontWeight:step===idx?500:400, flexShrink:0 }}>
            {idx+1}. {st.id}
          </button>
        ))}
      </div>

      <div style={{ padding:"0.85rem 1rem", background:"var(--color-background-secondary)", borderBottom:"0.5px solid var(--color-border-tertiary)", overflowX:"auto" }}>
        <div style={{ fontSize:11, color:"var(--color-text-tertiary)", marginBottom:8, textTransform:"uppercase", letterSpacing:"0.06em" }}>Example: ["The", "cat", "sat"], d_model=4, d_k=3</div>
        <div style={{ display:"flex", alignItems:"flex-start", flexWrap:"wrap", gap:4 }}>
          {(s.highlight === "X" || s.highlight === "QKV") && (
            <MatrixDisplay data={E.X} label={"X  (3×4)"} color="info" />
          )}
          {s.highlight === "QKV" && <>
            <div style={{ alignSelf:"center", fontSize:16, color:"var(--color-text-tertiary)", padding:"0 4px" }}>→</div>
            <MatrixDisplay data={E.Q} label={"Q  (3×3)"} color="success" />
            <MatrixDisplay data={E.K} label={"K  (3×3)"} color="warning" />
            <MatrixDisplay data={E.V} label={"V  (3×3)"} color="danger" />
          </>}
          {s.highlight === "raw" && <>
            <MatrixDisplay data={E.Q} label={"Q"} color="success" small />
            <div style={{ alignSelf:"center", fontSize:18, color:"var(--color-text-tertiary)", padding:"0 2px" }}>×</div>
            <MatrixDisplay data={E.K[0].map((_, ci) => E.K.map(row => row[ci]))} label={"Kᵀ"} color="warning" small />
            <div style={{ alignSelf:"center", fontSize:18, color:"var(--color-text-tertiary)", padding:"0 2px" }}>=</div>
            <MatrixDisplay data={E.rawScores} label={"raw scores (3×3)"} color="info" />
          </>}
          {s.highlight === "scaled" && <>
            <MatrixDisplay data={E.rawScores} label={"raw ÷ √3"} color="info" small />
            <div style={{ alignSelf:"center", fontSize:16, color:"var(--color-text-tertiary)", padding:"0 4px" }}>→</div>
            <MatrixDisplay data={E.scaledScores} label={"scaled (3×3)"} color="warning" />
          </>}
          {s.highlight === "weights" && <>
            <MatrixDisplay data={E.scaledScores} label={"softmax input"} color="warning" small />
            <div style={{ alignSelf:"center", fontSize:16, color:"var(--color-text-tertiary)", padding:"0 4px" }}>→</div>
            <MatrixDisplay data={E.attnWeights} label={"α  weights (3×3)"} color="danger" />
            <div style={{ alignSelf:"center", fontSize:12, color:"var(--color-text-tertiary)", padding:"0 6px", maxWidth:160, lineHeight:1.4 }}>Each row sums to 1</div>
          </>}
          {s.highlight === "output" && <>
            <MatrixDisplay data={E.attnWeights} label={"α weights"} color="danger" small />
            <div style={{ alignSelf:"center", fontSize:18, color:"var(--color-text-tertiary)", padding:"0 2px" }}>×</div>
            <MatrixDisplay data={E.V} label={"V"} color="success" small />
            <div style={{ alignSelf:"center", fontSize:18, color:"var(--color-text-tertiary)", padding:"0 2px" }}>=</div>
            <MatrixDisplay data={E.output} label={"Z  output (3×3)"} color="purple" />
          </>}
        </div>
      </div>

      <div style={{ padding:"11px 15px" }}>
        <div style={{ fontWeight:500, fontSize:13.5, color:"var(--color-text-primary)", marginBottom:6 }}>{s.title}</div>
        <div style={{ fontSize:13.5, color:"var(--color-text-secondary)", lineHeight:1.75 }}>{s.desc}</div>
      </div>
      <div style={{ display:"flex", justifyContent:"space-between", padding:"7px 13px", borderTop:"0.5px solid var(--color-border-tertiary)", background:"var(--color-background-secondary)" }}>
        <button onClick={() => setStep(v => Math.max(0,v-1))} disabled={step===0} style={{ background:"none", border:"0.5px solid var(--color-border-tertiary)", borderRadius:"var(--border-radius-md)", padding:"4px 12px", cursor:step===0?"default":"pointer", fontSize:13, color:step===0?"var(--color-text-tertiary)":"var(--color-text-secondary)" }}>← prev</button>
        <span style={{ fontSize:12, color:"var(--color-text-tertiary)", alignSelf:"center", fontFamily:"var(--font-mono)" }}>{step+1}/{ATTN_STEPS.length}</span>
        <button onClick={() => setStep(v => Math.min(ATTN_STEPS.length-1,v+1))} disabled={step===ATTN_STEPS.length-1} style={{ background:"none", border:"0.5px solid var(--color-border-tertiary)", borderRadius:"var(--border-radius-md)", padding:"4px 12px", cursor:step===ATTN_STEPS.length-1?"default":"pointer", fontSize:13, color:step===ATTN_STEPS.length-1?"var(--color-text-tertiary)":"var(--color-text-secondary)" }}>next →</button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   INTERACTIVE — SCALING DEMO (Ch 74)
══════════════════════════════════════════════════════ */
function ScalingDemo() {
  const [dk, setDk] = useState(8);
  const rawDots = [2.1, 3.4, 1.8, 4.2, 2.7];
  const labels  = ["bank","river","money","finance","water"];
  const scaleFactor = 1.0 / Math.sqrt(dk);
  const scaled = rawDots.map(v => v * scaleFactor);

  function softmax(arr) {
    const maxV = Math.max(...arr);
    const exps = arr.map(v => Math.exp(v - maxV));
    const sum  = exps.reduce((a,b) => a+b, 0);
    return exps.map(v => v/sum);
  }
  const smRaw = softmax(rawDots);
  const smScaled = softmax(scaled);
  const maxH = 80;

  return (
    <div style={{ border:"0.5px solid var(--color-border-tertiary)", borderRadius:"var(--border-radius-lg)", padding:"1rem", margin:"0.75rem 0" }}>
      <div style={{ display:"flex", gap:10, alignItems:"center", marginBottom:10, fontSize:13 }}>
        <span style={{ color:"var(--color-text-secondary)", whiteSpace:"nowrap" }}>d_k =</span>
        <input type="range" min={1} max={64} step={1} value={dk} onChange={e => setDk(Number(e.target.value))} style={{ flex:1 }} />
        <span style={{ fontFamily:"var(--font-mono)", fontSize:12, color:"var(--color-text-primary)", minWidth:24, textAlign:"right" }}>{dk}</span>
        <span style={{ fontSize:12, color:"var(--color-text-tertiary)" }}>scale = 1/√{dk} = {scaleFactor.toFixed(3)}</span>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
        {[
          { title:"UNSCALED softmax — raw Q·Kᵀ scores", vals:smRaw, color:"#A32D2D", note:"Peaky — one token dominates, others near zero. Vanishing gradients." },
          { title:"SCALED softmax — after ÷ √d_k", vals:smScaled, color:"#185FA5", note:"Balanced distribution. Gradients flow to all positions." },
        ].map(panel => (
          <div key={panel.title}>
            <div style={{ fontSize:11, fontWeight:500, color:panel.color, marginBottom:8, textTransform:"uppercase", letterSpacing:"0.05em" }}>{panel.title}</div>
            <div style={{ display:"flex", gap:4, alignItems:"flex-end", height:"88px", background:"var(--color-background-secondary)", borderRadius:"var(--border-radius-md)", padding:"8px 6px 4px" }}>
              {panel.vals.map((v, idx) => {
                const barH = Math.max(2, Math.round(v * maxH));
                const alpha = 0.3 + v * 0.7;
                return (
                  <div key={idx} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:2, flex:1 }}>
                    <div style={{ fontSize:9, color:panel.color, fontFamily:"var(--font-mono)" }}>{(v*100).toFixed(0)+"%"}</div>
                    <div style={{ width:"100%", height:barH+"px", background:panel.color, opacity:alpha, borderRadius:"2px 2px 0 0", transition:"all 0.3s" }} />
                    <div style={{ fontSize:9.5, color:"var(--color-text-tertiary)", fontFamily:"var(--font-mono)", textAlign:"center" }}>{labels[idx]}</div>
                  </div>
                );
              })}
            </div>
            <div style={{ fontSize:11.5, color:"var(--color-text-secondary)", marginTop:5, lineHeight:1.5 }}>{panel.note}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop:10, padding:"8px 10px", background:"var(--color-background-secondary)", borderRadius:"var(--border-radius-md)", fontSize:12.5, color:"var(--color-text-secondary)", lineHeight:1.6 }}>
        <strong style={{ color:"var(--color-text-primary)" }}>Why it matters:</strong> With d_k={dk}, the standard deviation of Q·Kᵀ dot products grows as √{dk} ≈ {Math.sqrt(dk).toFixed(1)}. Without scaling, softmax receives inputs with std ≈ {(Math.sqrt(dk)*0.5).toFixed(1)}, pushing attention toward a hard argmax. Dividing by √d_k = {Math.sqrt(dk).toFixed(2)} restores std ≈ 1 and keeps the softmax in a well-behaved gradient region.
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   INTERACTIVE — GEOMETRIC INTUITION (Ch 75)
══════════════════════════════════════════════════════ */
function GeometricViz() {
  const [isDark, setIsDark] = useState(false);
  const [context, setContext] = useState("river");
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDark(mq.matches);
    const h = e => setIsDark(e.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);

  const riverCtx = {
    words: [
      { w:"river",   x:80,  y:80,  r:6, col:"#185FA5", moved:false },
      { w:"water",   x:120, y:110, r:6, col:"#185FA5", moved:false },
      { w:"stream",  x:60,  y:130, r:6, col:"#185FA5", moved:false },
      { w:"bank",    x:160, y:160, r:8, col:"#993C1D", moved:false },
      { w:"bank*",   x:110, y:100, r:8, col:"#0F6E56", moved:true  },
      { w:"money",   x:310, y:120, r:6, col:"#854F0B", moved:false },
      { w:"finance", x:340, y:160, r:6, col:"#854F0B", moved:false },
      { w:"credit",  x:290, y:170, r:6, col:"#854F0B", moved:false },
    ],
    label: "Context: 'I fished by the bank of the river'",
    note:  "bank* moves toward river/water cluster — context signals geographic bank",
  };
  const moneyCtx = {
    words: [
      { w:"river",   x:80,  y:80,  r:6, col:"#185FA5", moved:false },
      { w:"water",   x:120, y:110, r:6, col:"#185FA5", moved:false },
      { w:"stream",  x:60,  y:130, r:6, col:"#185FA5", moved:false },
      { w:"bank",    x:160, y:160, r:8, col:"#993C1D", moved:false },
      { w:"bank*",   x:310, y:140, r:8, col:"#0F6E56", moved:true  },
      { w:"money",   x:310, y:120, r:6, col:"#854F0B", moved:false },
      { w:"finance", x:340, y:160, r:6, col:"#854F0B", moved:false },
      { w:"credit",  x:290, y:170, r:6, col:"#854F0B", moved:false },
    ],
    label: "Context: 'I deposited money at the bank'",
    note:  "bank* moves toward money/finance cluster — context signals financial bank",
  };

  const scene = context === "river" ? riverCtx : moneyCtx;
  const bg = isDark ? "#1a1918" : "#F8F7F6";
  const grid = isDark ? "#333" : "#E8E7E5";
  const textC = isDark ? "#C8C7C3" : "#3F3E3A";

  return (
    <VizBox>
      <div style={{ display:"flex", gap:8, marginBottom:"0.75rem", flexWrap:"wrap" }}>
        {[
          { id:"river", label:"River context", sub:"'fished by the bank of the river'" },
          { id:"money", label:"Finance context", sub:"'deposited money at the bank'" },
        ].map(btn => (
          <button key={btn.id} onClick={() => setContext(btn.id)} style={{ padding:"6px 13px", borderRadius:"var(--border-radius-md)", border:"0.5px solid "+(context===btn.id?"var(--color-border-info)":"var(--color-border-tertiary)"), background:context===btn.id?"var(--color-background-info)":"transparent", fontSize:13, color:context===btn.id?"var(--color-text-info)":"var(--color-text-secondary)", fontWeight:context===btn.id?500:400, cursor:"pointer" }}>
            {btn.label}
            <div style={{ fontSize:10.5, opacity:0.8 }}>{btn.sub}</div>
          </button>
        ))}
      </div>

      <div style={{ border:"0.5px solid var(--color-border-tertiary)", borderRadius:"var(--border-radius-lg)", overflow:"hidden" }}>
        <svg width="100%" viewBox="0 0 420 240" style={{ display:"block", background:bg }}>
          {[60,120,180,240,300,360].map(x => <line key={"gx"+x} x1={x} y1={0} x2={x} y2={240} stroke={grid} strokeWidth={0.5} />)}
          {[60,120,180].map(y => <line key={"gy"+y} x1={0} y1={y} x2={420} y2={y} stroke={grid} strokeWidth={0.5} />)}

          <text x={210} y={225} textAnchor="middle" style={{ fill:textC, fontSize:"10px", fontFamily:"var(--font-sans)" }}>semantic dimension 1</text>
          <text x={10} y={120} textAnchor="middle" style={{ fill:textC, fontSize:"10px", fontFamily:"var(--font-sans)" }} transform="rotate(-90,10,120)">dim 2</text>

          {(() => {
            const from = scene.words.find(w => w.w==="bank");
            const to   = scene.words.find(w => w.w==="bank*");
            if (!from || !to) return null;
            const dx = to.x - from.x, dy = to.y - from.y;
            const len = Math.sqrt(dx*dx + dy*dy);
            const ux = dx/len, uy = dy/len;
            const x2 = to.x - ux*10, y2 = to.y - uy*10;
            return (
              <g>
                <defs>
                  <marker id="geo-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                    <path d="M2 1L8 5L2 9" fill="none" stroke="#0F6E56" strokeWidth={1.5} strokeLinecap="round"/>
                  </marker>
                </defs>
                <line x1={from.x} y1={from.y} x2={x2} y2={y2} stroke="#0F6E56" strokeWidth={1.5} strokeDasharray="4 3" markerEnd="url(#geo-arr)" />
              </g>
            );
          })()}

          {scene.words.map(w => (
            <g key={w.w}>
              <circle cx={w.x} cy={w.y} r={w.r} fill={w.col} opacity={w.moved ? 1 : 0.75} />
              <text x={w.x + (w.r + 3)} y={w.y + 4} style={{ fill:w.col, fontSize: w.moved ? "12px" : "10.5px", fontWeight: w.moved ? "bold" : "normal", fontFamily:"var(--font-sans)" }}>{w.w}</text>
            </g>
          ))}

          {[
            { col:"#993C1D", lbl:"bank (static embedding)" },
            { col:"#0F6E56", lbl:"bank* (after self-attention)" },
            { col:"#185FA5", lbl:"river/water cluster" },
            { col:"#854F0B", lbl:"money/finance cluster" },
          ].map((item, idx) => (
            <g key={item.lbl}>
              <circle cx={220} cy={10 + idx*16} r={4} fill={item.col} />
              <text x={228} y={14 + idx*16} style={{ fill:textC, fontSize:"9.5px", fontFamily:"var(--font-sans)" }}>{item.lbl}</text>
            </g>
          ))}
        </svg>
      </div>
      <div style={{ marginTop:8, padding:"7px 10px", background:"var(--color-background-success)", border:"0.5px solid var(--color-border-success)", borderRadius:"var(--border-radius-md)", fontSize:12.5, color:"var(--color-text-success)" }}>
        <strong>{scene.label}:</strong> {scene.note}
      </div>
    </VizBox>
  );
}

/* ══════════════════════════════════════════════════════
   INTERACTIVE — MULTI-HEAD ATTENTION (Ch 77)
══════════════════════════════════════════════════════ */
const MHA_HEADS = [
  {
    id:0, label:"Head 1 — Syntactic", color:"#185FA5",
    desc:"Attends to grammatical relationships. Subject 'cat' attends to its verb 'sat'. Determiner 'The' attends closely to its noun 'cat'.",
    attn:[[0.7,0.2,0.1],[0.2,0.6,0.2],[0.1,0.3,0.6]],
  },
  {
    id:1, label:"Head 2 — Positional", color:"#0F6E56",
    desc:"Attends primarily to nearby tokens (local context window). Strong diagonal with spread to immediate neighbours only.",
    attn:[[0.8,0.15,0.05],[0.2,0.65,0.15],[0.05,0.25,0.70]],
  },
  {
    id:2, label:"Head 3 — Global context", color:"#534AB7",
    desc:"Spreads attention widely across the sequence. Every token weakly attends to all others — captures global sentence-level semantics.",
    attn:[[0.4,0.3,0.3],[0.3,0.4,0.3],[0.3,0.3,0.4]],
  },
];

function MultiHeadViz() {
  const [activeHead, setActiveHead] = useState(null);
  const words = ["The","cat","sat"];

  return (
    <VizBox>
      <P>Each head runs a complete self-attention operation with its own W_Q, W_K, W_V matrices. Different heads learn different relationship types. Click a head to inspect its attention pattern:</P>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10, marginBottom:12 }}>
        {MHA_HEADS.map(head => {
          const isActive = activeHead === head.id;
          return (
            <div key={head.id} onClick={() => setActiveHead(isActive ? null : head.id)} style={{ border:"1.5px solid "+(isActive?head.color:"var(--color-border-tertiary)"), borderRadius:"var(--border-radius-md)", padding:"10px 11px", cursor:"pointer", background:isActive?head.color+"12":"transparent", transition:"all 0.15s" }}>
              <div style={{ fontWeight:500, fontSize:13, color:isActive?head.color:"var(--color-text-primary)", marginBottom:6 }}>{head.label}</div>
              <div style={{ display:"inline-block" }}>
                {head.attn.map((row, ri) => (
                  <div key={ri} style={{ display:"flex" }}>
                    {row.map((val, ci) => {
                      const alpha = 0.1 + val * 0.9;
                      return (
                        <div key={ci} style={{ width:"22px", height:"22px", background:head.color, opacity:alpha, border:"0.5px solid white", display:"flex", alignItems:"center", justifyContent:"center", fontSize:8, color:"white", fontFamily:"var(--font-mono)" }}>
                          {(val*100).toFixed(0)}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
              <div style={{ display:"flex", gap:3, marginTop:4 }}>
                {words.map(w => <div key={w} style={{ fontSize:9, color:"var(--color-text-tertiary)", width:22, textAlign:"center" }}>{w}</div>)}
              </div>
            </div>
          );
        })}
      </div>
      {activeHead !== null && (() => {
        const h = MHA_HEADS.find(x => x.id === activeHead);
        if (!h) return null;
        return (
          <div style={{ padding:"10px 14px", background:h.color+"12", border:"1.5px solid "+h.color+"44", borderRadius:"var(--border-radius-md)", marginBottom:10, fontSize:13.5, color:"var(--color-text-secondary)" }}>
            <strong style={{ color:h.color }}>{h.label}:</strong> {h.desc}
          </div>
        );
      })()}
      <Note color="info" icon="ti-info-circle">
        After all heads run in parallel, their outputs are <strong>concatenated</strong> along the feature dimension (producing h × d_v features) then projected through W_O back to d_model. Each token's final representation has been informed by every head's perspective simultaneously.
      </Note>
    </VizBox>
  );
}

/* ══════════════════════════════════════════════════════
   SECTIONS
══════════════════════════════════════════════════════ */
function SectionIntro() {
  return (
    <div>
      <Note color="info" icon="ti-flag">
        <strong>Paper:</strong> Vaswani et al. "Attention Is All You Need." NeurIPS 2017. One of the most cited papers in the history of AI. Introduced the Transformer architecture that replaced RNNs/LSTMs entirely and became the foundation of every major language model.
      </Note>

      <H2>What is a Transformer?</H2>
      <P>A Transformer is a deep learning architecture that processes sequences using only attention mechanisms — no recurrence, no convolution. Every output position attends directly to every input position simultaneously, giving O(1) path length between any two tokens regardless of sequence length.</P>
      
      <Grid cols={3}>
        <Card color="success" title="No recurrence">
          <div style={{ display:"flex", gap:7, alignItems:"center", marginBottom:7 }}>
            <i className="ti ti-ban" style={{ fontSize:16, color:"var(--color-text-success)" }} aria-hidden="true" />
          </div>
          Unlike RNNs/LSTMs, the Transformer processes all positions in parallel. No sequential dependency between timesteps. GPU utilisation is near-optimal — every attention computation runs simultaneously.
        </Card>
        <Card color="info" title="Direct long-range connections">
          <div style={{ display:"flex", gap:7, alignItems:"center", marginBottom:7 }}>
            <i className="ti ti-arrows-up-down" style={{ fontSize:16, color:"var(--color-text-info)" }} aria-hidden="true" />
          </div>
          Token 1 and token 512 are connected by a single attention operation — O(1) path length. RNNs require 511 sequential steps to connect them. Long-range dependencies are learned as easily as short-range ones.
        </Card>
        <Card color="warning" title="Universal architecture">
          <div style={{ display:"flex", gap:7, alignItems:"center", marginBottom:7 }}>
            <i className="ti ti-topology-star-3" style={{ fontSize:16, color:"var(--color-text-warning)" }} aria-hidden="true" />
          </div>
          The same Transformer architecture works for text, images (ViT), audio, protein sequences, code, and multimodal data. A change in domain requires only changing the tokenizer, not the architecture.
        </Card>
      </Grid>

      <H2>The origin story — why Transformers were created</H2>
      <P>The Transformer did not appear from nowhere. It was a direct engineering response to two accumulated bottlenecks in the Seq2Seq + Attention pipeline:</P>
      <div style={{ position:"relative", paddingLeft:24, borderLeft:"2px solid var(--color-border-secondary)", margin:"1rem 0" }}>
        {[
          { year:"2014", color:"#185FA5", title:"Seq2Seq (Sutskever et al.)", body:"LSTM encoder-decoder solves variable-length I/O. But: fixed context vector bottleneck. BLEU degrades on long sentences." },
          { year:"2015", color:"#0F6E56", title:"Attention (Bahdanau et al.)", body:"Decoder attends over all encoder states. Breaks the bottleneck. But: encoder/decoder still RNNs — sequential computation, O(T) path length." },
          { year:"2015", color:"#0F6E56", title:"Luong Attention", body:"Simpler multiplicative attention. Faster. Still RNN-based — the sequential bottleneck remains." },
          { year:"2017", color:"#534AB7", title:"Transformer (Vaswani et al.)", body:"Remove recurrence entirely. Self-attention replaces the RNN. Fully parallel. O(1) path length. 'Attention Is All You Need'." },
          { year:"2018+", color:"#993C1D", title:"BERT, GPT, T5, ViT…", body:"Every major AI system since 2018 is a Transformer. The architecture scales with data and compute in ways RNNs never could." },
        ].map(ev => (
          <div key={ev.year+ev.title} style={{ marginBottom:14, position:"relative" }}>
            <div style={{ position:"absolute", left:-30, top:3, width:12, height:12, borderRadius:"50%", background:ev.color+"33", border:"2px solid "+ev.color }} />
            <span style={{ fontFamily:"var(--font-mono)", fontSize:12, fontWeight:500, color:ev.color }}>{ev.year}</span>
            <span style={{ fontWeight:500, fontSize:13.5, color:"var(--color-text-primary)", marginLeft:8 }}>{ev.title}</span>
            <div style={{ fontSize:13, color:"var(--color-text-secondary)", lineHeight:1.65, marginTop:2 }}>{ev.body}</div>
          </div>
        ))}
      </div>

      <H2>Advantages and limitations</H2>
      <Grid cols={2}>
        <Card color="success" title="Advantages">
          {["Parallelisable — all positions computed simultaneously","O(1) path length between any two tokens","Scales with compute and data (power law)","Transfer learning — pre-train once, fine-tune anywhere","Handles variable-length sequences naturally","Works for text, images, audio, code, proteins"].map(t => (
            <div key={t} style={{ display:"flex", gap:6, marginBottom:5, fontSize:12.5, color:"var(--color-text-success)", alignItems:"flex-start" }}><i className="ti ti-check" style={{ fontSize:12, flexShrink:0, marginTop:2 }} aria-hidden="true" />{t}</div>
          ))}
        </Card>
        <Card color="danger" title="Limitations">
          {["O(T²) memory in self-attention — context window is expensive","No inherent sequential bias — needs positional encoding","Large models require GPUs/TPUs — not edge-friendly","Data-hungry — needs massive pre-training corpus","Interpretability is challenging despite attention weights","Training instability at large scale (careful LR scheduling needed)"].map(t => (
            <div key={t} style={{ display:"flex", gap:6, marginBottom:5, fontSize:12.5, color:"var(--color-text-danger)", alignItems:"flex-start" }}><i className="ti ti-x" style={{ fontSize:12, flexShrink:0, marginTop:2 }} aria-hidden="true" />{t}</div>
          ))}
        </Card>
      </Grid>

      <H2>Interview Q&A</H2>
      <QA q="What fundamental problem does the Transformer solve that RNNs + Attention cannot?"
         a="Two problems simultaneously: (1) <strong>Sequential computation bottleneck</strong> — RNNs must process tokens one at a time; h_t depends on h_{t-1}, making GPU parallelism impossible. Transformers compute all positions in parallel. (2) <strong>O(T) path length</strong> — in an RNN, information from position 1 to position T must traverse T-1 recurrent cells, each introducing multiplicative decay. In a Transformer, any two positions are connected by a single self-attention operation. These two properties together explain why Transformers train ~10× faster and handle much longer dependencies." />
      <QA q="Why didn't researchers just use deeper RNNs instead of inventing the Transformer?"
         a="Deeper RNNs (more stacked layers) add a new dependency: gradient must flow through depth as well as time. A 4-layer LSTM on a 100-token sequence requires gradients to traverse 4×100 = 400 multiplicative steps. Stacking makes the vanishing gradient problem worse, not better. The Transformer's residual connections and layer normalisation address the depth problem, while self-attention addresses the time problem — they solved both simultaneously. Additionally, deeper RNNs still cannot be parallelised across the time axis, so training remains slow." />
    </div>
  );
}

function SectionEmbeddings() {
  const [sentence, setSentence] = useState("bank");
  const contexts = {
    bank: { s1:"I deposited money at the bank.", s2:"I fished by the bank of the river.", issue:"'bank' has TWO very different meanings. A static embedding assigns ONE vector to 'bank' — always the same, regardless of surrounding words." },
    crane: { s1:"The crane lifted the steel beam.", s2:"The crane flew over the wetland.", issue:"'crane' is a machine or a bird. Static embedding = one averaged vector that is accurate for neither." },
    light: { s1:"Turn on the light switch.", s2:"She packed a light suitcase.", issue:"'light' is a noun/verb or an adjective. Static embedding collapses both into one meaningless average." },
  };
  const ctx = contexts[sentence];

  return (
    <div>
      <H2>Evolution of word representations</H2>
      <Table
        heads={["Method","Year","Representation","Problem"]}
        rows={[
          ["One-hot","Pre-2013","[0,0,…,1,…,0] sparse","Vocab-sized; no semantic geometry; 'cat'≡'dog'≡'democracy'"],
          ["Word2Vec","2013","Dense 300-d static vector","Context-free: 'bank' has one vector for all uses"],
          ["GloVe","2014","Dense static, global co-occurrence","Same context-free problem"],
          ["ELMo","2018","Contextual LSTM embeddings","Sequential — slow; limited context"],
          ["Transformer","2017+","Self-attention contextual","Every token's representation depends on the full context"],
        ]}
      />

      <H2>The average-meaning problem with static embeddings</H2>
      <P>Static word embeddings (Word2Vec, GloVe) assign a single vector to each word type, computed as a weighted average over all contexts in the training corpus. For ambiguous words, this average is meaningful for neither sense.</P>
      
      <VizBox>
        <div style={{ display:"flex", gap:8, marginBottom:"0.75rem", flexWrap:"wrap" }}>
          {Object.keys(contexts).map(w => (
            <button key={w} onClick={() => setSentence(w)} style={{ padding:"5px 13px", borderRadius:"var(--border-radius-md)", border:"0.5px solid "+(sentence===w?"var(--color-border-info)":"var(--color-border-tertiary)"), background:sentence===w?"var(--color-background-info)":"transparent", fontSize:13.5, fontFamily:"var(--font-mono)", fontWeight:sentence===w?600:400, color:sentence===w?"var(--color-text-info)":"var(--color-text-primary)", cursor:"pointer" }}>{w}</button>
          ))}
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
          {[ctx.s1, ctx.s2].map((sent, idx) => {
            const words = sent.split(" ");
            return (
              <div key={idx} style={{ background:"var(--color-background-secondary)", borderRadius:"var(--border-radius-md)", padding:"12px 13px" }}>
                <div style={{ fontSize:11, color:"var(--color-text-tertiary)", marginBottom:6, textTransform:"uppercase", letterSpacing:"0.06em" }}>Context {idx+1}</div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:5 }}>
                  {words.map((w, wi) => {
                    const isTarget = w.toLowerCase().replace(".","") === sentence;
                    return (
                      <div key={wi} style={{ padding:"3px 8px", borderRadius:4, background:isTarget?"var(--color-background-danger)":"transparent", border:isTarget?"1.5px solid var(--color-border-danger)":"1.5px solid transparent", fontFamily:"var(--font-mono)", fontSize:13.5, fontWeight:isTarget?600:400, color:isTarget?"var(--color-text-danger)":"var(--color-text-primary)" }}>{w}</div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        <Note color="warning" icon="ti-alert-triangle">
          <strong>Problem:</strong> {ctx.issue} Self-attention solves this by making every token's vector a function of its entire surrounding context — different contexts produce different output representations for the same input token.
        </Note>
      </VizBox>

      <H2>How self-attention produces contextual representations</H2>
      <P>Instead of a single static vector per word, self-attention computes a new representation for each token that is a weighted combination of all other tokens' value vectors — weighted by how relevant each other token is. The same token 'bank' produces a completely different output vector depending on whether 'river' or 'money' appear nearby.</P>
      <Mx block>{`Static:   embed("bank") = [0.3, -0.2, 0.7, ...]   ← same always

Self-attn context 1 ("river" nearby):
  output_bank = 0.62·V_river + 0.18·V_bank + 0.10·V_water + ...
  → vector pulled toward river/water cluster

Self-attn context 2 ("money" nearby):
  output_bank = 0.55·V_money + 0.20·V_bank + 0.15·V_finance + ...
  → vector pulled toward money/finance cluster`}</Mx>

      <H2>Interview Q&A</H2>
      <QA q="What is the 'average meaning' problem and why does it matter for NLP?"
         a="Static embeddings like Word2Vec represent each word type with a single vector, computed as an average over all training contexts. For polysemous words (words with multiple meanings), this average vector represents none of the individual senses accurately. 'Bank' (financial) and 'bank' (riverside) are entirely different concepts that happen to share a spelling — their average vector is a meaningless mixture. This is why systems based on static embeddings struggle with disambiguation, coreference resolution, and any task requiring contextual understanding. Self-attention produces contextual embeddings: the same input token produces a different output vector depending on its neighbouring tokens — effectively performing word sense disambiguation as part of the forward pass." />
      <QA q="How is ELMo's contextual embedding different from Transformer self-attention?"
         a="Both produce contextual embeddings, but differently. ELMo uses bidirectional LSTMs: a forward LSTM reads the sentence left-to-right and a backward LSTM reads right-to-left. The contextual embedding is the concatenation of the hidden states at that position. It suffers from the same sequential bottleneck as all RNNs and has effectively limited context windows (LSTM memory fades). Transformer self-attention computes context through direct pairwise interactions (O(1) path length) across the entire sequence simultaneously." />
    </div>
  );
}

function SectionSelfAttention() {
  return (
    <div>
      <Note color="info" icon="ti-bulb">
        <strong>One-sentence definition:</strong> Self-attention is a mechanism that computes a new representation for each token in a sequence by taking a weighted average of all tokens' value vectors, where the weights are determined by the relevance between tokens — all computed in parallel with a single matrix operation.
      </Note>

      <H2>Why 'self' attention?</H2>
      <P>In Bahdanau/Luong attention, queries come from the decoder and keys/values come from the encoder — two different sequences. In self-attention, queries, keys, and values all come from the same sequence — the model attends to itself. This is what 'self' means.</P>
      <Table
        heads={["","Bahdanau/Luong (cross-attention)","Self-Attention"]}
        rows={[
          ["Source of Q","Decoder hidden state","Same sequence as K,V"],
          ["Source of K,V","Encoder hidden states","Same sequence as Q"],
          ["Sequences involved","Two (encoder + decoder)","One (itself)"],
          ["Used in","Encoder-decoder bridge","Encoder layers, decoder layers"],
          ["Purpose","Let decoder read encoder","Let each token read all others"],
          ["Parallelism","Limited by RNN","Fully parallel"],
        ]}
      />

      <H2>Step-by-step self-attention computation — interactive</H2>
      <P>Step through the complete computation below. Example: 3-token sequence ['The','cat','sat'], d_model=4, d_k=3.</P>
      <SelfAttnStepper />

      <H2>Complete self-attention equations</H2>
      <Mx block>{`Input:  X ∈ ℝ^{T × d_model}   (T tokens, each d_model-dimensional)

Projections (learned weight matrices):
  Q = X · W_Q   W_Q ∈ ℝ^{d_model × d_k}   Q ∈ ℝ^{T × d_k}
  K = X · W_K   W_K ∈ ℝ^{d_model × d_k}   K ∈ ℝ^{T × d_k}
  V = X · W_V   W_V ∈ ℝ^{d_model × d_v}   V ∈ ℝ^{T × d_v}

Scaled dot-product attention:
  Attention(Q,K,V) = softmax( Q·Kᵀ / √d_k ) · V

Output:  Z ∈ ℝ^{T × d_v}   (same shape as input if d_v = d_model)

Parameter count per self-attention layer:
  W_Q: d_model × d_k
  W_K: d_model × d_k
  W_V: d_model × d_v
  Total: d_model · (2·d_k + d_v)   e.g. 512×(2×64+64) = 98,304`}</Mx>

      <H2>PyTorch implementation from scratch</H2>
      <Code>{`import torch
import torch.nn as nn
import math

class SelfAttention(nn.Module):
    def __init__(self, d_model, d_k, d_v):
        super().__init__()
        self.d_k  = d_k
        self.W_Q  = nn.Linear(d_model, d_k, bias=False)   # (d_model → d_k)
        self.W_K  = nn.Linear(d_model, d_k, bias=False)
        self.W_V  = nn.Linear(d_model, d_v, bias=False)

    def forward(self, X, mask=None):
        # X: (batch, T, d_model)
        Q = self.W_Q(X)              # (batch, T, d_k)
        K = self.W_K(X)              # (batch, T, d_k)
        V = self.W_V(X)              # (batch, T, d_v)

        # Scaled dot-product scores: (batch, T, T)
        scores = torch.matmul(Q, K.transpose(-2, -1)) / math.sqrt(self.d_k)

        # Causal mask (decoder): prevent attending to future positions
        if mask is not None:
            scores = scores.masked_fill(mask == 0, float('-inf'))

        # Attention weights + weighted sum of V
        weights = torch.softmax(scores, dim=-1)   # (batch, T, T)
        output  = torch.matmul(weights, V)        # (batch, T, d_v)
        return output, weights   # return weights for visualisation

# Usage
d_model, d_k, d_v = 512, 64, 64
attn  = SelfAttention(d_model, d_k, d_v)
X     = torch.randn(32, 100, d_model)   # batch=32, seq_len=100
Z, W  = attn(X)
print(Z.shape)   # (32, 100, 64)
print(W.shape)   # (32, 100, 100)  — attention matrix`}</Code>

      <H2>Interview Q&A</H2>
      <QA q="What are the roles of Query, Key, and Value in self-attention?"
         a="An intuitive way to think about it: imagine a search engine. <strong>Query (Q)</strong>: what this token is looking for — 'what context am I seeking?' <strong>Key (K)</strong>: what each token can offer to others — 'what information do I advertise?' <strong>Value (V)</strong>: the actual information each token provides — 'what content do I carry?' The attention weight between tokens i and j = similarity(Q_i, K_j). The output for token i = weighted sum of all V vectors, with weights proportional to how well each token's Key matched token i's Query. The Query-Key-Value separation is what allows the model to learn different behaviours for the same input depending on whether it is asking (as a query) or being asked (as a key/value)." />
      <QA q="Why does self-attention have O(T²) complexity and what does this mean in practice?"
         a="The score matrix Q·Kᵀ has shape (T × T) — one score for every pair of positions. Computing it requires O(T² · d_k) multiply-adds. Storing it requires O(T²) floats. For T=512, this is 256K scores per head; manageable. For T=8192 (GPT-4 context), it is 67M scores per head × 96 heads × 96 layers = hundreds of GB just for attention matrices. This is why increasing context window length is expensive — not just training but inference too. Solutions: sparse attention (attend only to windows + global tokens), linear attention (approximate Q·Kᵀ without materialising the matrix), or sliding window attention (Longformer)." />
      <QA q="In self-attention, why are W_Q, W_K, W_V all separate matrices instead of one?"
         a="Using three separate projection matrices allows the model to learn three different roles for the same input vector. The Query role (what am I looking for) is different from the Key role (what do I advertise) and both differ from the Value role (what do I carry). If you used one shared matrix, you would force Q=K=V which constrains attention weights to be a function of token similarity to itself — removing the flexibility to attend to semantically different tokens. The three matrices are what makes self-attention a learnable, flexible routing mechanism rather than a fixed similarity kernel." />
    </div>
  );
}

function SectionScaledAttn() {
  return (
    <div>
      <H2>The scaling problem — why unscaled attention fails</H2>
      <P>Without scaling, the dot product Q·Kᵀ grows in magnitude with d_k. This is not just a numerical issue — it directly breaks training via vanishing gradients.</P>

      <Grid cols={2}>
        <Card title="Why dot products grow with d_k">
          If Q,K ∼ N(0,1) independently (zero mean, unit variance), the dot product Q·K = Σᵢ qᵢkᵢ is a sum of d_k independent random variables each with mean 0 and variance 1. By the central limit theorem, the variance of the sum is d_k. So Std(Q·K) = √d_k. For d_k=64, std≈8. For d_k=512, std≈22.6.
        </Card>
        <Card title="Why large inputs break softmax">
          Softmax(z)_i = exp(zᵢ) / Σ exp(zⱼ). When the input magnitudes are large (std=8), the largest value dominates exponentially — the output is nearly a one-hot vector. The gradient of softmax in the saturation region is ≈0, so backpropagation sends nearly zero gradient to the Q and K projections, making them learn very slowly or not at all.
        </Card>
      </Grid>

      <H2>Mathematical proof of the scaling fix</H2>
      <Mx block>{`If q, k ∈ ℝ^{d_k} with qᵢ, kⱼ ~ N(0,1):
  q·k = Σᵢ qᵢkᵢ

  E[q·k] = 0              (mean is zero)
  Var(q·k) = d_k           (each term has var 1, they are independent)
  Std(q·k) = √d_k

Scaled: q·k / √d_k
  Var(q·k / √d_k) = Var(q·k) / d_k = d_k / d_k = 1
  Std = 1   ← unit variance regardless of d_k

Full formula:
  Attention(Q,K,V) = softmax( Q·Kᵀ / √d_k ) · V

The softmax now operates on inputs with std≈1,
keeping it in the well-gradiated region of its derivative.`}</Mx>

      <H2>Interactive scaling demo</H2>
      <P>Drag the slider to change d_k and observe how scaling affects the softmax output distribution. Unscaled = peaky (bad). Scaled = balanced (good).</P>
      <ScalingDemo />

      <H2>Causal masking in the decoder</H2>
      <P>For autoregressive generation, the decoder must not attend to future positions — it hasn't generated them yet. A causal mask sets all future scores to -∞ before the softmax, making their attention weight exactly 0.</P>
      <Mx block>{`Causal mask (lower-triangular, T=4):
  mask = [[1,0,0,0],
          [1,1,0,0],
          [1,1,1,0],
          [1,1,1,1]]

scores_masked[i,j] = scores[i,j]   if mask[i,j]=1
                   = -∞             if mask[i,j]=0

After softmax: exp(-∞) = 0 → zero attention to future tokens
Position 0 can only attend to itself.
Position 3 can attend to positions 0,1,2,3.`}</Mx>
      <Code>{`# Causal mask in PyTorch — used in GPT decoder
T = seq_len
mask = torch.tril(torch.ones(T, T))  # lower triangular
# shape: (T, T), dtype: float32

# In scaled dot-product attention:
scores = (Q @ K.transpose(-2,-1)) / math.sqrt(d_k)
scores = scores.masked_fill(mask == 0, float('-inf'))
weights = torch.softmax(scores, dim=-1)
# Positions beyond current can't contribute — gradient to future = 0`}</Code>

      <H2>Interview Q&A</H2>
      <QA q="Why is the scaling factor specifically 1/√d_k rather than 1/d_k or some other function?"
         a="We want the scaled dot product to have unit variance. Var(q·k) = d_k (sum of d_k independent unit-variance terms). To normalise: we need to divide by √(Var(q·k)) = √d_k. Dividing by d_k would over-correct — the variance would become 1/d_k which goes to zero. Dividing by √d_k gives exactly Var(q·k / √d_k) = d_k / d_k = 1. The square root is the correct choice from the statistics of summed random variables, not an arbitrary design decision." />
      <QA q="What is the difference between additive and multiplicative attention regarding scaling?"
         a="Bahdanau attention uses <em>additive</em> scoring: e_{i,j} = v^T tanh(W_a s + U_a h). The tanh nonlinearity inherently bounds the output to (-1,1), so inputs to the softmax are naturally bounded regardless of dimension. Multiplicative attention (Luong / Transformer) uses the dot product Q·K which grows unboundedly with d_k. This is why the Transformer needs the explicit √d_k scaling — Bahdanau attention does not. The trade-off: multiplicative attention is faster (matrix multiply vs feedforward network per pair) but requires the scaling; additive attention is slower but more numerically stable without modification." />
    </div>
  );
}

function SectionGeometric() {
  return (
    <div>
      <Note color="info" icon="ti-bulb">
        <strong>Geometric intuition:</strong> Static embeddings place each word at a fixed point in high-dimensional space. Self-attention is a context-dependent <em>movement</em> of each word's position — pulling it toward semantically relevant neighbours as determined by the current sentence context.
      </Note>

      <H2>Visualising word embeddings in 2D space</H2>
      <P>Click between the two contexts below to see how 'bank' moves from its static position toward different semantic clusters depending on surrounding words:</P>
      <GeometricViz />

      <H2>The gravity effect of self-attention</H2>
      <P>A useful mental model: each token exerts 'gravitational pull' on other tokens proportional to their attention weight. The output representation for token i is drawn toward the positions of the tokens it attends to heavily.</P>
      <Grid cols={3}>
        <Card color="warning" title="Before attention">
          Each token sits at its static embedding position. 'bank' is at the average of all its training-corpus uses — equidistant from both senses. Semantically ambiguous.
        </Card>
        <Card color="info" title="During attention">
          Context-dependent attention scores are computed. 'river' and 'water' nearby → high α_{"{bank,river}"}, α_{"{bank,water}"}. 'money' nearby → high α_{"{bank,money}"}, α_{"{bank,finance}"}.
        </Card>
        <Card color="success" title="After attention">
          Output = weighted average of Value vectors. 'bank' has moved to a new position: near river cluster (context 1) or money cluster (context 2). Disambiguation achieved.
        </Card>
      </Grid>

      <H2>Why this matters — residual stream perspective</H2>
      <P>The Transformer stack can be viewed as each layer 'editing' the representation stream with small, contextual updates. The residual connection preserves the original embedding while self-attention adds a context-dependent delta:</P>
      <Mx block>{`x_out = x_in + SelfAttention(LayerNorm(x_in))

The residual x_in preserves the token's identity.
SelfAttention(...) computes a context-dependent adjustment.
Result: the token knows both what it is AND what context it is in.

Stacked over L layers: each layer can refine the contextual
representation further, attending to progressively more abstract
combinations of the sequence's information.`}</Mx>

      <H2>Interview Q&A</H2>
      <QA q="What is the 'residual stream' perspective on the Transformer and why is it useful?"
         a="The residual stream view (Elhage et al. 2021) treats the Transformer's computation as a sequence of additive updates to a shared residual stream: x ← x + Attention(x) + FFN(x). Each component (attention head, MLP layer) reads from this stream and writes back a delta. This framing makes several things clear: (1) early layers preserve the original token embedding while adding small context-dependent adjustments; (2) the stream at the final layer must encode everything needed for the output prediction; (3) individual attention heads can be seen as specialised functions that detect specific patterns and 'write' relevant information to the stream. This view is foundational to mechanistic interpretability research." />
      <QA q="How does geometric intuition explain why Transformers outperform static embeddings on NLP tasks?"
         a="Static embeddings fix each word in vector space permanently — they cannot represent context-dependence. Downstream classifiers must disentangle polysemy, idioms, and pragmatic meaning from a single vector. Self-attention provides each word with a context-dependent representation that has already resolved most of these ambiguities: 'bank' near 'river' has moved near the water cluster; 'bank' near 'money' has moved near the finance cluster. The classifier sees a representation that is geometrically separated by meaning, not by word form. This is why even a linear probing classifier on Transformer representations outperforms deep classifiers on static embeddings — the geometry of the space does most of the work." />
    </div>
  );
}

function SectionMultiHead() {
  return (
    <div>
      <H2>The limitation of single-head self-attention</H2>
      <P>A single self-attention head collapses all its attention capacity into one weighted combination. The model must simultaneously track syntactic roles, semantic similarity, positional proximity, and coreference links — with a single set of Q, K, V projections. This is a severe representational bottleneck.</P>
      <Note color="warning" icon="ti-alert-triangle">
        Example: In "The animal didn't cross the street because it was too tired," a single head must decide: does 'it' attend most to 'animal' (coreference), 'street' (proximity), or 'cross' (verb dependency)? A single head can only pick one dominant pattern per forward pass.
      </Note>

      <H2>Multi-head attention — the key idea</H2>
      <P>Run h independent self-attention operations ('heads') in parallel, each with its own learned W_Q, W_K, W_V matrices. Each head learns to attend to a different type of relationship. Concatenate all outputs, then project back to d_model.</P>
      <Mx block>{`For head i  (i = 1, …, h):
  head_i = Attention( X·W_Q^i,  X·W_K^i,  X·W_V^i )

  W_Q^i ∈ ℝ^{d_model × d_k}    d_k = d_model / h
  W_K^i ∈ ℝ^{d_model × d_k}
  W_V^i ∈ ℝ^{d_model × d_v}    d_v = d_model / h

MultiHead(X) = Concat(head_1, …, head_h) · W_O

  Concat output: ℝ^{T × (h·d_v)} = ℝ^{T × d_model}
  W_O ∈ ℝ^{d_model × d_model}   (output projection)
  Final output: ℝ^{T × d_model}   ← same shape as input

GPT-3 parameters:
  h = 96 heads,  d_model = 12288,  d_k = d_v = 128`}</Mx>

      <H2>Interactive multi-head attention visualiser</H2>
      <MultiHeadViz />

      <H2>Full implementation — PyTorch</H2>
      <Code>{`import torch
import torch.nn as nn
import math

class MultiHeadAttention(nn.Module):
    def __init__(self, d_model, n_heads):
        super().__init__()
        assert d_model % n_heads == 0, "d_model must be divisible by n_heads"
        self.d_model  = d_model
        self.n_heads  = n_heads
        self.d_k      = d_model // n_heads   # per-head key/query dim
        self.d_v      = d_model // n_heads   # per-head value dim

        # Single large projection matrices (more efficient than h small ones)
        self.W_Q = nn.Linear(d_model, d_model, bias=False)
        self.W_K = nn.Linear(d_model, d_model, bias=False)
        self.W_V = nn.Linear(d_model, d_model, bias=False)
        self.W_O = nn.Linear(d_model, d_model, bias=False)

    def split_heads(self, x):
        # x: (batch, T, d_model) → (batch, n_heads, T, d_k)
        B, T, _ = x.shape
        x = x.view(B, T, self.n_heads, self.d_k)
        return x.transpose(1, 2)          # (B, n_heads, T, d_k)

    def forward(self, X, mask=None):
        B, T, _ = X.shape

        # Project and split into heads
        Q = self.split_heads(self.W_Q(X))  # (B, h, T, d_k)
        K = self.split_heads(self.W_K(X))
        V = self.split_heads(self.W_V(X))

        # Scaled dot-product for all heads simultaneously
        scores = torch.matmul(Q, K.transpose(-2,-1)) / math.sqrt(self.d_k)
        if mask is not None:
            scores = scores.masked_fill(mask == 0, float('-inf'))
        weights = torch.softmax(scores, dim=-1)  # (B, h, T, T)

        # Weighted sum of V, then merge heads
        out = torch.matmul(weights, V)            # (B, h, T, d_v)
        out = out.transpose(1,2).contiguous()     # (B, T, h, d_v)
        out = out.view(B, T, self.d_model)        # (B, T, d_model) — concat
        return self.W_O(out), weights              # project output

# Usage
mha   = MultiHeadAttention(d_model=512, n_heads=8)
X     = torch.randn(32, 100, 512)
Z, W  = mha(X)
print(Z.shape)   # (32, 100, 512)
print(W.shape)   # (32, 8, 100, 100) — one matrix per head`}</Code>

      <H2>Parameter count analysis</H2>
      <Mx block>{`MultiHeadAttention(d_model=512, n_heads=8):
  W_Q: 512 × 512 = 262,144
  W_K: 512 × 512 = 262,144
  W_V: 512 × 512 = 262,144
  W_O: 512 × 512 = 262,144
  Total: 1,048,576  ≈ 1M parameters

Note: d_model² × 4 regardless of n_heads — the total parameter
count is constant! More heads = smaller per-head dimension (d_k = d_model/h),
not more parameters. Heads share the parameter budget.

GPT-3 per layer: d_model=12288 → 12288² × 4 = 603M params/layer
× 96 layers = 58B params in attention alone`}</Mx>

      <H2>Why multi-head outperforms single-head of equal size</H2>
      <Table
        heads={["Property","Single head (d_k=512)","8 heads (d_k=64 each)"]}
        rows={[
          ["Attention patterns learned","1 — must multiplex all patterns","8 — each head specialises"],
          ["Expressiveness","High d_k per head — rich per-query","Lower d_k — simpler per head, diverse overall"],
          ["Parameters","Same total (d_model² × 4)","Same total — no extra cost"],
          ["Rank of attention matrix","Up to min(T, d_k)","Sum of 8 rank-d_k matrices — higher rank"],
          ["Regularisation effect","Harder to diversify","Different random init → specialisation emerges"],
          ["Empirical performance","Lower on NLP benchmarks","Higher — multi-head is the standard"],
        ]}
      />

      <H2>Interview Q&A</H2>
      <QA q="Why does multi-head attention use d_k = d_model/n_heads rather than d_k = d_model for each head?"
         a="Two reasons: (1) <strong>Parameter budget</strong>: if each head used d_k = d_model, the total parameter count would be h × 4 × d_model² — h times larger, which is computationally prohibitive for h=8 or h=96. By using d_k = d_model/h, each head operates in a smaller subspace but the total parameter count remains 4 × d_model² regardless of h. (2) <strong>Diversity</strong>: forcing each head into a lower-dimensional subspace encourages the heads to focus on different aspects of the representation — a head with full d_model capacity could theoretically learn everything the others do, reducing to effectively one head." />
      <QA q="What does W_O (the output projection) do and why is it necessary?"
         a="After concatenating the h head outputs, the result has shape (T, h × d_v) = (T, d_model). W_O ∈ ℝ^{d_model × d_model} projects this back to d_model. It serves two purposes: (1) <strong>Integration</strong>: the concatenation of heads is a raw juxtaposition; W_O learns to mix information across heads, weighting and combining their outputs in task-specific ways; (2) <strong>Residual compatibility</strong>: the original Transformer adds the attention output back to the residual stream (x = x + MultiHead(x)). W_O ensures the output is in the same d_model space as the residual stream. Without W_O, you could not have a residual connection." />
      <QA q="Can you implement multi-head attention as h separate SingleHeadAttention modules?"
         a="Yes, and this is how it was first described conceptually. In practice, using a single batched matrix multiply is much more efficient. Instead of h separate (d_model × d_k) matrices, you use one (d_model × d_model) matrix and then reshape/split the output into h heads. The computation is identical but the batched version parallelises all h heads in a single GEMM (General Matrix Multiply) operation — h times faster on GPU hardware. Most modern implementations (PyTorch's nn.MultiheadAttention, Flash Attention) use this batched approach." />
    </div>
  );
}

const TABS = [
  { id:"intro",    label:"Introduction",          sub:"Ch 71" },
  { id:"embed",    label:"Word Embeddings",        sub:"Ch 72" },
  { id:"selfattn", label:"Self-Attention",         sub:"Ch 73" },
  { id:"scaled",   label:"Scaled Dot Product",     sub:"Ch 74" },
  { id:"geo",      label:"Geometric Intuition",    sub:"Ch 75" },
  { id:"multi",    label:"Multi-Head Attention",   sub:"Ch 76–77" },
];

export default function TransformersPart1() {
  const [active, setActive] = useState("intro");
  const map = {
    intro:    <SectionIntro />,
    embed:    <SectionEmbeddings />,
    selfattn: <SectionSelfAttention />,
    scaled:   <SectionScaledAttn />,
    geo:      <SectionGeometric />,
    multi:    <SectionMultiHead />,
  };
  return (
    <div>
      <div className="page-header">
        <div className="page-header-eyebrow">Deep Learning — Module 17</div>
        <h1 className="page-header-title">Transformers — Self-Attention to Multi-Head</h1>
        <p className="page-header-subtitle">Self-attention stepper · Scaling demo · Geometric viz · Multi-head visualiser · Full PyTorch implementations</p>
      </div>

      <SectionNav tabs={TABS} active={active} onChange={setActive} />

      <div style={{ padding: "0.5rem 0 2rem" }}>
        {map[active]}
      </div>

      <NavButtons moduleId={17} />
    </div>
  );
}
