import { useState } from "react";
import { Code } from '../components/ui/Code.jsx';
import { Mx, H2, H3, P } from '../components/ui/Typography.jsx';
import { QA } from '../components/ui/QA.jsx';
import { Note, Table } from '../components/ui/Primitives.jsx';
import NavButtons from '../components/layout/NavButtons.jsx';
import SectionNav from '../components/layout/SectionNav.jsx';

/* ══════════════════════════════════════════════════════
   INTERACTIVE — EVOLUTION TIMELINE
══════════════════════════════════════════════════════ */
const TIMELINE_EVENTS = [
  { year:"2013", title:"Word2Vec", stage:"Pre-history", stageColor:"#888780",
    desc:"Mikolov et al. Dense word embeddings encode semantic meaning. 'king − man + woman ≈ queen'. First time words have geometry.", paper:"Efficient Estimation of Word Representations — Mikolov et al." },
  { year:"2014", title:"Seq2Seq", stage:"Stage 1", stageColor:"#185FA5",
    desc:"Sutskever et al. LSTM encoder compresses a sentence to a fixed vector; LSTM decoder generates the translation. Machine translation finally scales.", paper:"Sequence to Sequence Learning — Sutskever et al." },
  { year:"2015", title:"Attention", stage:"Stage 2", stageColor:"#0F6E56",
    desc:"Bahdanau et al. Decoder can attend to all encoder hidden states, not just the last one. The information bottleneck is broken.", paper:"Neural Machine Translation by Jointly Learning to Align — Bahdanau et al." },
  { year:"2017", title:"Transformer", stage:"Stage 3", stageColor:"#534AB7",
    desc:"Vaswani et al. 'Attention Is All You Need'. Recurrence abandoned entirely. Parallelisable, scales with compute, sets every NLP record.", paper:"Attention Is All You Need — Vaswani et al." },
  { year:"2018", title:"BERT & GPT-1", stage:"Stage 4", stageColor:"#854F0B",
    desc:"Transfer learning arrives in NLP. Pre-train on massive unlabelled text, fine-tune on any task. BERT: bidirectional. GPT: generative.", paper:"BERT — Devlin et al. / Improving Language Understanding — Radford et al." },
  { year:"2019", title:"GPT-2 (1.5B)", stage:"Stage 4", stageColor:"#854F0B",
    desc:"Zero-shot task transfer. Writes coherent paragraphs and solves problems without any fine-tuning. OpenAI calls it 'too dangerous to release'.", paper:"Language Models are Unsupervised Multitask Learners — Radford et al." },
  { year:"2020", title:"GPT-3 (175B)", stage:"Stage 5", stageColor:"#993C1D",
    desc:"In-context learning: the model does new tasks from just a few examples in the prompt. No gradient update needed. Emergent few-shot ability.", paper:"Language Models are Few-Shot Learners — Brown et al." },
  { year:"2022", title:"ChatGPT", stage:"Stage 5", stageColor:"#993C1D",
    desc:"RLHF + instruction tuning aligns GPT-3.5 to follow human instructions. 1 million users in 5 days. The public meets LLMs.", paper:"Training Language Models to Follow Instructions — Ouyang et al." },
  { year:"2023", title:"GPT-4, LLaMA, Claude", stage:"Stage 5", stageColor:"#993C1D",
    desc:"Multimodal inputs. Open-source models (LLaMA) democratise access. Foundation model ecosystem. Retrieval-augmented generation.", paper:"GPT-4 Technical Report — OpenAI. LLaMA — Touvron et al." },
];

function EvolutionTimeline() {
  const [sel, setSel] = useState(3);
  const ev = TIMELINE_EVENTS[sel];
  return (
    <div style={{ border:"0.5px solid var(--color-border-tertiary)", borderRadius:"var(--border-radius-lg)", overflow:"hidden", margin:"0.75rem 0" }}>
      {/* scrollable event row */}
      <div style={{ display:"flex", overflowX:"auto", borderBottom:"0.5px solid var(--color-border-tertiary)", padding:"0.75rem 0.75rem 0" }}>
        {TIMELINE_EVENTS.map((e,i)=>(
          <button key={i} onClick={()=>setSel(i)} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:4, padding:"6px 10px 10px", background:"none", border:"none", cursor:"pointer", flexShrink:0, borderBottom:sel===i?`2.5px solid ${e.stageColor}`:"2.5px solid transparent", marginBottom:-1 }}>
            <span style={{ fontFamily:"var(--font-mono)", fontSize:11, color:sel===i?e.stageColor:"var(--color-text-tertiary)", fontWeight:sel===i?500:400 }}>{e.year}</span>
            <span style={{ fontSize:12.5, color:sel===i?"var(--color-text-primary)":"var(--color-text-secondary)", fontWeight:sel===i?500:400, whiteSpace:"nowrap" }}>{e.title}</span>
          </button>
        ))}
      </div>
      {/* detail panel */}
      <div style={{ padding:"1rem 1.1rem" }}>
        <div style={{ display:"flex", gap:10, alignItems:"center", marginBottom:8 }}>
          <span style={{ padding:"2px 9px", borderRadius:20, fontSize:11.5, fontWeight:500, background:ev.stageColor+"22", color:ev.stageColor, border:`1px solid ${ev.stageColor}66` }}>{ev.stage}</span>
          <span style={{ fontWeight:500, fontSize:15, color:"var(--color-text-primary)" }}>{ev.year} · {ev.title}</span>
        </div>
        <P c={ev.desc} />
        <div style={{ fontSize:12, color:"var(--color-text-tertiary)", fontStyle:"italic", marginTop:6 }}>
          <i className="ti ti-file-description" style={{ fontSize:13, marginRight:5 }} aria-hidden />
          {ev.paper}
        </div>
      </div>
      {/* stage legend */}
      <div style={{ display:"flex", flexWrap:"wrap", gap:8, padding:"8px 1.1rem", borderTop:"0.5px solid var(--color-border-tertiary)", background:"var(--color-background-secondary)" }}>
        {[
          {s:"Pre-history", c:"#888780"},{s:"Stage 1",c:"#185FA5"},{s:"Stage 2",c:"#0F6E56"},
          {s:"Stage 3",c:"#534AB7"},{s:"Stage 4",c:"#854F0B"},{s:"Stage 5",c:"#993C1D"},
        ].map(({s,c})=>(
          <div key={s} style={{ display:"flex", alignItems:"center", gap:5 }}>
            <div style={{ width:10, height:10, borderRadius:2, background:c+"33", border:`1.5px solid ${c}` }} />
            <span style={{ fontSize:11.5, color:"var(--color-text-secondary)" }}>{s}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   INTERACTIVE — ATTENTION VISUALISER
══════════════════════════════════════════════════════ */
const SRC_WORDS = ["The","cat","sat","on","the","mat"];
const TGT_WORDS = ["Le","chat","s'est","assis","sur","le","tapis"];
const ATTN_WEIGHTS = {
  "Le":    [0.82,0.06,0.03,0.03,0.04,0.02],
  "chat":  [0.04,0.86,0.04,0.02,0.02,0.02],
  "s'est": [0.03,0.06,0.73,0.09,0.06,0.03],
  "assis": [0.02,0.07,0.64,0.12,0.05,0.10],
  "sur":   [0.02,0.03,0.06,0.82,0.05,0.02],
  "le":    [0.05,0.02,0.03,0.04,0.81,0.05],
  "tapis": [0.02,0.04,0.06,0.05,0.06,0.77],
};

function AttentionViz() {
  const [sel, setSel] = useState("chat");
  const W = ATTN_WEIGHTS[sel];
  const maxW = Math.max(...W);
  return (
    <div style={{ border:"0.5px solid var(--color-border-tertiary)", borderRadius:"var(--border-radius-lg)", padding:"1.1rem", margin:"0.75rem 0" }}>
      <div style={{ fontSize:12, color:"var(--color-text-tertiary)", marginBottom:10, textTransform:"uppercase", letterSpacing:"0.07em" }}>
        Translation: "The cat sat on the mat" → "Le chat s'est assis sur le tapis"
      </div>

      {/* source words with attention intensity */}
      <div style={{ marginBottom:12 }}>
        <div style={{ fontSize:12, color:"var(--color-text-secondary)", marginBottom:7 }}>Source (English) — colour intensity = attention weight from selected target token</div>
        <div style={{ display:"flex", gap:7, flexWrap:"wrap" }}>
          {SRC_WORDS.map((tok,i)=>{
            const norm = W[i]/maxW;
            const bg = `rgba(24,95,165,${0.08 + norm*0.78})`;
            const bd = `rgba(24,95,165,${0.2 + norm*0.8})`;
            const tx = norm > 0.55 ? "#042C53" : "#888780";
            return (
              <div key={i} style={{ padding:"6px 13px", borderRadius:7, background:bg, border:`1.5px solid ${bd}`, fontSize:14, fontFamily:"var(--font-mono)", fontWeight:norm>0.4?500:400, color:tx, transition:"all 0.3s", minWidth:44, textAlign:"center" }}>
                {tok}
                <div style={{ fontSize:10, marginTop:2, opacity:0.75 }}>{(W[i]*100).toFixed(0)}%</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* target word selector */}
      <div style={{ marginBottom:12 }}>
        <div style={{ fontSize:12, color:"var(--color-text-secondary)", marginBottom:7 }}>Target (French) — click to decode a word and see its attention distribution</div>
        <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
          {TGT_WORDS.map(tok=>(
            <button key={tok} onClick={()=>setSel(tok)} style={{ padding:"5px 12px", borderRadius:6, border:`1.5px solid ${sel===tok?"#185FA5":"var(--color-border-secondary)"}`, background:sel===tok?"#E6F1FB":"transparent", fontSize:13.5, fontFamily:"var(--font-mono)", fontWeight:sel===tok?500:400, color:sel===tok?"#0C447C":"var(--color-text-secondary)", cursor:"pointer", transition:"all 0.15s" }}>
              {tok}
            </button>
          ))}
        </div>
      </div>

      {/* bar chart */}
      <div style={{ background:"var(--color-background-secondary)", borderRadius:"var(--border-radius-md)", padding:"10px 12px" }}>
        <div style={{ fontSize:11.5, color:"var(--color-text-tertiary)", marginBottom:8 }}>Attention weight distribution for "{sel}"</div>
        <div style={{ display:"flex", gap:6, alignItems:"flex-end", height:70 }}>
          {SRC_WORDS.map((tok,i)=>{
            const norm = W[i]/maxW;
            const h = Math.max(3, Math.round(norm*56));
            return (
              <div key={i} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:3, flex:1 }}>
                <div style={{ width:"100%", height:h, background:`rgba(24,95,165,${0.25+norm*0.75})`, borderRadius:"2px 2px 0 0", transition:"height 0.3s, background 0.3s" }} />
                <div style={{ fontSize:10.5, color:"var(--color-text-tertiary)", fontFamily:"var(--font-mono)" }}>{tok}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   INTERACTIVE — LLM SCALING CHART
══════════════════════════════════════════════════════ */
const LLM_MODELS = [
  { name:"Word2Vec",    year:2013, params:3e8,    color:"#888780", desc:"300M-dim vectors" },
  { name:"LSTM (large)",year:2016, params:1e8,    color:"#888780", desc:"~100M params" },
  { name:"GPT-1",       year:2018, params:1.17e8, color:"#854F0B", desc:"117M params" },
  { name:"BERT-L",      year:2018, params:3.4e8,  color:"#854F0B", desc:"340M params" },
  { name:"GPT-2",       year:2019, params:1.5e9,  color:"#854F0B", desc:"1.5B params" },
  { name:"GPT-3",       year:2020, params:1.75e11,color:"#993C1D", desc:"175B params" },
  { name:"LLaMA-2-70B", year:2023, params:7e10,   color:"#993C1D", desc:"70B params" },
  { name:"GPT-4 (est.)",year:2023, params:1.8e12, color:"#A32D2D", desc:"~1.8T (est.)" },
];

function ScalingChart() {
  const [hover, setHover] = useState(null);
  const logMax = Math.log10(1.8e12);
  const logMin = Math.log10(1e8);
  const barH = 32;
  return (
    <div style={{ border:"0.5px solid var(--color-border-tertiary)", borderRadius:"var(--border-radius-lg)", padding:"1rem", margin:"0.75rem 0" }}>
      <div style={{ fontSize:12, color:"var(--color-text-tertiary)", marginBottom:10, textTransform:"uppercase", letterSpacing:"0.07em" }}>
        Model size over time — log scale (each step = 10×)
      </div>
      {LLM_MODELS.map((m,i)=>{
        const logV = Math.log10(m.params);
        const pct = ((logV-logMin)/(logMax-logMin)*100).toFixed(1);
        return (
          <div key={i} onMouseEnter={()=>setHover(i)} onMouseLeave={()=>setHover(null)}
               style={{ display:"flex", alignItems:"center", gap:10, marginBottom:7, cursor:"default" }}>
            <div style={{ width:80, fontSize:11.5, color:"var(--color-text-secondary)", textAlign:"right", flexShrink:0 }}>{m.year}</div>
            <div style={{ flex:1, height:barH, position:"relative" }}>
              <div style={{ height:"100%", width:pct+"%", background:hover===i?m.color:m.color+"88", borderRadius:4, transition:"all 0.2s", display:"flex", alignItems:"center", paddingLeft:8, overflow:"hidden" }}>
                <span style={{ fontSize:12, fontWeight:500, color:"white", whiteSpace:"nowrap" }}>{m.name}</span>
              </div>
            </div>
            <div style={{ width:90, fontSize:11.5, color:"var(--color-text-secondary)", fontFamily:"var(--font-mono)", flexShrink:0 }}>{m.desc}</div>
          </div>
        );
      })}
      <div style={{ fontSize:11.5, color:"var(--color-text-tertiary)", marginTop:8, textAlign:"center" }}>
        GPT-3 → GPT-4: ~10× parameters. GPT-1 → GPT-3: ~1500×. LSTM → GPT-3: ~1750×.
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 1 — OVERVIEW & SEQ2SEQ (67.1–67.3)
══════════════════════════════════════════════════════ */
function SectionOverview() {
  return (
    <div>
      <Note color="info" icon="ti-history">
        <strong>Module arc:</strong> The journey from vanilla RNNs to ChatGPT is a story of five compounding innovations — each directly solving the limitation of the previous stage. Understanding the <em>why</em> of each transition is more important than memorising the <em>what</em>.
      </Note>

      <H2>Sequence processing — the core problem</H2>
      <P>Nearly every significant NLP task is a sequence-to-sequence problem: transform one sequence into another. The challenge is that input and output have different, variable lengths with no fixed alignment between tokens.</P>
      <Table
        heads={["NLP Task","Input","Output","Challenge"]}
        rows={[
          ["Machine translation","French sentence (T_in tokens)","English sentence (T_out tokens)","T_in ≠ T_out, no token alignment"],
          ["Text summarisation","Long document","Short summary","Many-to-few: compress, not just translate"],
          ["Question answering","Context + question","Answer span or generated text","Requires reading comprehension"],
          ["Text generation","Prompt (seed tokens)","Continuation (variable length)","Autoregressive, open-ended"],
          ["Named entity recognition","Sentence tokens","Per-token labels","Many-to-many synced — strictly aligned"],
          ["Sentiment analysis","Review text","Positive / Negative / Neutral","Many-to-one — collapse sequence to label"],
        ]}
      />

      <H2>The five evolutionary stages</H2>
      <P>From 2014 to 2023, five architectural breakthroughs transformed NLP from niche research into the defining technology of the decade. Click each milestone to read about it:</P>
      <EvolutionTimeline />

      <H2>Seq2Seq tasks in NLP — the unifying framework</H2>
      <P>The Seq2Seq paradigm (Stage 1) established a single architectural template that all later models refined. The core insight: any input sequence can be encoded into a latent representation, and any output sequence can be decoded from it.</P>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10, margin:"0.75rem 0" }}>
        {[
          { title:"Encode", icon:"ti-arrow-bar-to-right", color:"info",
            body:"The encoder reads the entire input sequence token by token, updating its hidden state at each step. At the end, its final state is a fixed-size vector that must represent the entire input." },
          { title:"Context vector", icon:"ti-database", color:"warning",
            body:"The bottleneck: all information about the input is compressed into a single fixed-size vector (the encoder's final hidden state). Information loss here is the root cause of Seq2Seq failures on long inputs." },
          { title:"Decode", icon:"ti-arrow-bar-from-left", color:"success",
            body:"The decoder takes the context vector as its initial hidden state and generates the output sequence token by token, using its own previous output as the next input (autoregressive generation)." },
        ].map(({title,icon,color,body})=>(
          <div key={title} style={{ border:"0.5px solid var(--color-border-tertiary)", borderRadius:"var(--border-radius-md)", padding:"12px 13px" }}>
            <div style={{ display:"flex", gap:8, alignItems:"center", marginBottom:7 }}>
              <i className={`ti ${icon}`} style={{ fontSize:17, color:`var(--color-text-${color})` }} aria-hidden />
              <span style={{ fontWeight:500, fontSize:13.5, color:"var(--color-text-primary)" }}>{title}</span>
            </div>
            <div style={{ fontSize:12.5, color:"var(--color-text-secondary)", lineHeight:1.65 }}>{body}</div>
          </div>
        ))}
      </div>

      <H2>Interview Q&A</H2>
      <QA q="What unifies all five evolutionary stages in the history of LLMs?"
         a="Each stage is a direct architectural response to the most pressing limitation of the previous one. Stage 1 (Seq2Seq) solved the variable-length I/O problem but created a fixed-size bottleneck. Stage 2 (Attention) broke the bottleneck but was still limited by sequential computation. Stage 3 (Transformer) removed recurrence entirely for parallelism. Stage 4 (Transfer Learning) solved the data scarcity problem by pre-training. Stage 5 (LLMs) discovered that scaling these pre-trained Transformers unlocked qualitatively new capabilities. The thread is: solve today's bottleneck, reveal tomorrow's bottleneck." />
      <QA q="Why is machine translation considered the 'benchmark problem' for sequence modelling?"
         a="Translation requires all the hard properties simultaneously: variable-length input and output, long-range dependencies (a pronoun must agree with a noun mentioned 20 tokens earlier), no simple token-level alignment (languages reorder words and change structure), and sensitivity to context (the same word translates differently depending on surrounding words). A model that can translate well has implicitly solved most general-purpose language understanding. This is why every major breakthrough — Seq2Seq, Attention, Transformer — was first demonstrated on translation before being applied elsewhere." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 2 — STAGE 1: ENCODER-DECODER (67.4)
══════════════════════════════════════════════════════ */
function SectionEncoderDecoder() {
  return (
    <div>
      <Note color="info" icon="ti-flag">
        <strong>Paper:</strong> Sutskever, Vinyals & Le. "Sequence to Sequence Learning with Neural Networks." NeurIPS 2014. First demonstration that LSTM encoder-decoder could handle machine translation end-to-end at competitive quality.
      </Note>

      <H2>Historical context</H2>
      <P>Before 2014, machine translation used Statistical MT — hand-engineered phrase tables, alignment models, and language models carefully combined. Sutskever et al. proposed replacing the entire pipeline with two LSTMs. The research community was sceptical; the result was state-of-the-art on WMT'14 English-French.</P>

      <H2>Architecture overview</H2>
      <div style={{ background:"var(--color-background-secondary)", border:"0.5px solid var(--color-border-tertiary)", borderRadius:"var(--border-radius-lg)", padding:"1rem 1.1rem", margin:"0.75rem 0" }}>
        <div style={{ display:"flex", alignItems:"center", gap:0, flexWrap:"wrap", justifyContent:"center" }}>
          {[
            { label:"Input tokens", sub:"x₁ x₂ … xₙ", color:"#185FA5" },
            { label:"Encoder LSTM", sub:"reads left→right", color:"#0F6E56" },
            { label:"Context vector c", sub:"final h_T — fixed size", color:"#993C1D" },
            { label:"Decoder LSTM", sub:"generates y₁ y₂ …", color:"#534AB7" },
            { label:"Output tokens", sub:"y₁ y₂ … yₘ", color:"#185FA5" },
          ].map(({label,sub,color},i,arr)=>(
            <div key={label} style={{ display:"flex", alignItems:"center" }}>
              <div style={{ background:color+"18", border:`1.5px solid ${color}`, borderRadius:"var(--border-radius-md)", padding:"8px 12px", textAlign:"center", minWidth:100 }}>
                <div style={{ fontSize:12.5, fontWeight:500, color }}>{label}</div>
                <div style={{ fontSize:10.5, color, opacity:0.8, marginTop:2 }}>{sub}</div>
              </div>
              {i<arr.length-1 && <div style={{ padding:"0 5px", color:"var(--color-text-tertiary)", fontSize:16 }}>→</div>}
            </div>
          ))}
        </div>
      </div>

      <H2>Working mechanism</H2>
      <P>The encoder reads the source sentence from left to right, updating its LSTM hidden state at each token. The decoder is initialised with the encoder's final hidden state, then generates the target sentence autoregressively — each output token is fed back as the next decoder input.</P>
      <Mx block>{"Encoder:  h_t^enc = LSTM_enc( x_t, h_{t-1}^enc )     t = 1, …, T_in\nContext:  c       = h_{T_in}^enc                     (last encoder state)\n\nDecoder:  h_0^dec = c                              (initialise decoder)\n          h_t^dec = LSTM_dec( y_{t-1}, h_{t-1}^dec )\n          p(y_t)  = softmax( W · h_t^dec + b )      (output distribution)"}</Mx>

      <H2>Keras implementation</H2>
      <Code>{`from tensorflow import keras

src_vocab, tgt_vocab = 10000, 8000
emb_dim, hidden = 256, 512

# ── Encoder ───────────────────────────────────────────────────────────
enc_input = keras.Input(shape=(None,), name="encoder_input")
enc_emb   = keras.layers.Embedding(src_vocab, emb_dim)(enc_input)
# return_state=True → also returns h_T and c_T (LSTM states)
_, enc_h, enc_c = keras.layers.LSTM(hidden, return_state=True, name="encoder")(enc_emb)
enc_states = [enc_h, enc_c]   # the context vector — carries ALL source info

# ── Decoder (teacher-forced training) ─────────────────────────────────
dec_input = keras.Input(shape=(None,), name="decoder_input")
dec_emb   = keras.layers.Embedding(tgt_vocab, emb_dim)(dec_input)
dec_lstm  = keras.layers.LSTM(hidden, return_sequences=True, return_state=True, name="decoder")
# Decoder starts from encoder's final state
dec_out, _, _ = dec_lstm(dec_emb, initial_state=enc_states)
dec_dense = keras.layers.Dense(tgt_vocab, activation="softmax")
output    = dec_dense(dec_out)

model = keras.Model([enc_input, dec_input], output)
model.compile(optimizer="adam", loss="sparse_categorical_crossentropy")`}</Code>

      <H2>The information bottleneck — core limitation</H2>
      <P>Regardless of whether the source sentence is 5 tokens or 500 tokens, the context vector c has a fixed size (hidden_dim = 512 floats). Everything the decoder knows about the source must be compressed into this single vector.</P>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, margin:"0.75rem 0" }}>
        <div style={{ background:"var(--color-background-success)", border:"0.5px solid var(--color-border-success)", borderRadius:"var(--border-radius-md)", padding:"12px 13px" }}>
          <div style={{ fontWeight:500, fontSize:13, color:"var(--color-text-success)", marginBottom:7 }}>Works well for</div>
          <div style={{ fontSize:12.5, color:"var(--color-text-success)", lineHeight:1.7 }}>
            Short sentences (5–20 tokens)<br/>
            Simple syntactic structures<br/>
            Closely related language pairs<br/>
            WMT benchmark BLEU scores: +5 points over SMT
          </div>
        </div>
        <div style={{ background:"var(--color-background-danger)", border:"0.5px solid var(--color-border-danger)", borderRadius:"var(--border-radius-md)", padding:"12px 13px" }}>
          <div style={{ fontWeight:500, fontSize:13, color:"var(--color-text-danger)", marginBottom:7 }}>Degrades badly for</div>
          <div style={{ fontSize:12.5, color:"var(--color-text-danger)", lineHeight:1.7 }}>
            Long sentences (50+ tokens)<br/>
            Complex syntactic reordering<br/>
            Rare words that need multi-token context<br/>
            BLEU falls ~10 points vs short sentences
          </div>
        </div>
      </div>
      <Note color="warning" icon="ti-alert-triangle">
        <strong>The bottleneck problem:</strong> A 512-float vector must represent the semantic content of an entire document. As sentence length increases, early tokens' information is increasingly overwritten by later tokens. The word at position t=1 has been through T−1 LSTM updates by the time the context vector is formed — it barely survives.
      </Note>

      <H2>Interview Q&A</H2>
      <QA q="Why did Sutskever et al. reverse the input sequence and how did it help?"
         a="A clever engineering trick: they fed the source sentence in reverse order (last word first). For a sentence of length T, the first source token is now the most recent one the encoder saw — its information is freshest in the context vector. For short-range dependencies (the beginning of the target often depends on the beginning of the source), reversing puts the most relevant source information closest in time to when the decoder needs it. This reduced perplexity and improved BLEU scores noticeably, showing that proximity in the unrolled RNN matters for gradient flow — a hint that the bottleneck was already a problem even at this stage." />
      <QA q="What is teacher forcing and why is it used during training?"
         a="During training, instead of feeding the decoder's own predicted output y_{t-1}^hat as the next input, you feed the ground-truth token y_{t-1}^true from the training set. This has two effects: (1) <strong>Faster convergence</strong> — if the model makes an error early, teacher forcing prevents that error from cascading through the rest of the sequence; (2) <strong>More stable gradients</strong> — each decoder step gets a clean correct context, making backprop more reliable. The downside is a train/test mismatch: at inference, the model must use its own (potentially incorrect) predictions. This gap, called exposure bias, is an active research problem." />
      <QA q="What architectural detail in the Sutskever paper most improved results beyond the basic Seq2Seq?"
         a="Four key engineering choices: (1) <strong>Reversed input</strong> — source sequence fed backwards (described above); (2) <strong>Deep LSTMs</strong> — 4 stacked LSTM layers each; (3) <strong>Large hidden state</strong> — 1000 units (large for 2014); (4) <strong>Large vocabulary</strong> — 160K source, 80K target word types. Of these, the reversed input and deep stacking were the most impactful on BLEU. The reversing trick in particular is a clean example of a domain insight encoded into the architecture before attention made it unnecessary." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 3 — STAGE 2: ATTENTION (67.5)
══════════════════════════════════════════════════════ */
function SectionAttention() {
  return (
    <div>
      <Note color="success" icon="ti-flag">
        <strong>Paper:</strong> Bahdanau, Cho & Bengio. "Neural Machine Translation by Jointly Learning to Align and Translate." ICLR 2015. The attention mechanism that broke the fixed-context bottleneck and directly inspired the Transformer.
      </Note>

      <H2>The problem with fixed context</H2>
      <P>The encoder-decoder architecture forces all source information through a single fixed-size vector. Bahdanau et al. asked: why should the decoder see only the encoder's last state? All intermediate encoder states h_1^enc, h_2^enc, …, h_T^enc are available — they contain position-specific information about each source token. Why not let the decoder look at all of them?</P>

      <H2>How attention works — step by step</H2>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:10, margin:"0.75rem 0" }}>
        {[
          { n:"1", title:"Score", color:"info",
            body:"For each decoder timestep t and each source position j, compute an alignment score e_{t,j} measuring how relevant source token j is for generating target token t." },
          { n:"2", title:"Normalise", color:"success",
            body:"Apply softmax over all source positions: α_{t,j} = exp(e_{t,j}) / Σ_k exp(e_{t,k}). Now α_{t,j} are positive weights summing to 1 — an attention distribution over the source." },
          { n:"3", title:"Context", color:"warning",
            body:"Compute the context vector as a weighted sum of encoder states: c_t = Σ_j α_{t,j} · h_j^enc. Different at every decoder step — the decoder can look anywhere in the source." },
          { n:"4", title:"Decode", color:"danger",
            body:"Append c_t to the decoder's input when computing h_t^dec = LSTM(y_{t-1}, h_{t-1}^dec, c_t). The decoder now has dynamic, position-aware access to the full source sequence." },
        ].map(({n,title,color,body})=>(
          <div key={n} style={{ border:"0.5px solid var(--color-border-tertiary)", borderRadius:"var(--border-radius-md)", padding:"12px 12px" }}>
            <div style={{ fontFamily:"var(--font-mono)", fontSize:11, color:`var(--color-text-${color})`, marginBottom:4 }}>Step {n}</div>
            <div style={{ fontWeight:500, fontSize:13.5, color:"var(--color-text-primary)", marginBottom:6 }}>{title}</div>
            <div style={{ fontSize:12, color:"var(--color-text-secondary)", lineHeight:1.65 }}>{body}</div>
          </div>
        ))}
      </div>

      <H2>Bahdanau (additive) attention — equations</H2>
      <Mx block>{"Alignment score (additive / MLP attention):\n  e_{t,j} = v_a^T · tanh( W_a · h_{t-1}^dec  +  U_a · h_j^enc )\n\nAttention weights:\n  α_{t,j} = softmax_j( e_{t,j} ) = exp(e_{t,j}) / Σ_k exp(e_{t,k})\n\nContext vector (different at every decoder step):\n  c_t = Σ_j  α_{t,j} · h_j^enc\n\nDecoder update:\n  h_t^dec = LSTM( [y_{t-1}; c_t],  h_{t-1}^dec )\n  p(y_t)  = softmax( W · [h_t^dec; c_t] + b )"}</Mx>
      <P>Note: W_a, U_a, v_a are learned jointly with the encoder and decoder. The model learns what 'relevance' means from the translation task itself — no hand-crafted alignment rules.</P>

      <H2>Interactive attention weight visualiser</H2>
      <P>Click a French target word below to see which English source words the model attends to when generating it. Darker blue = higher attention weight.</P>
      <AttentionViz />

      <H2>Advantages of attention</H2>
      <Table
        heads={["Limitation (Seq2Seq)","How attention fixes it"]}
        rows={[
          ["All source info squeezed into one vector","Context vector c_t is a dynamic weighted sum over all encoder states — O(T_in) information accessible at each decoder step"],
          ["BLEU degrades steeply for long sentences","Performance now degrades much more gradually — long-range dependencies accessible directly via attention weights"],
          ["No interpretability of what the model uses","Attention weights α_{t,j} are a soft alignment matrix — you can visualise exactly which source tokens contributed to each target token"],
          ["Same context for all decoder steps","Each decoder step gets a custom c_t tailored to what it needs at that moment"],
        ]}
      />

      <H2>Luong (multiplicative) attention</H2>
      <P>Luong et al. (2015) proposed a simpler scoring function that became more widely used:</P>
      <Mx block>{"Luong dot-product score:  e_{t,j} = h_t^dec · h_j^enc           (dot product)\nLuong general score:     e_{t,j} = h_t^dec · W_a · h_j^enc    (learned matrix)\n\nBahdanau uses h_{t-1}^dec (before update); Luong uses h_t^dec (after update).\nBoth are 'soft attention' — weighted sum over all positions."}</Mx>

      <H2>Interview Q&A</H2>
      <QA q="What is the difference between hard attention and soft attention?"
         a="<strong>Soft attention</strong> (Bahdanau, Luong): the context vector is a differentiable weighted sum over all positions — α_{t,j} ∈ (0,1) with Σ α_{t,j} = 1. Every source position contributes fractionally. Fully differentiable; trained end-to-end with backprop. <strong>Hard attention</strong> (Xu et al. 2015, for image captioning): a single source position is selected — either the argmax (deterministic) or sampled from the attention distribution (stochastic). Only one position contributes, so attention is sparse and interpretable, but not differentiable. Hard attention requires REINFORCE (policy gradient) for training, which is higher-variance. Almost all modern systems use soft attention because it integrates seamlessly with gradient descent." />
      <QA q="What does an attention weight α_{t,j} actually represent?"
         a="α_{t,j} is the probability (or weight) that source position j is relevant for generating target token t. It is the softmax-normalised alignment score — a soft probability distribution over all source positions. In machine translation, a high α_{t,j} means 'when generating target word t, look at source word j'. Across all decoder steps, the matrix of attention weights {α_{t,j}} forms a soft alignment matrix analogous to the hard word alignment in statistical MT — but learned end-to-end rather than manually engineered. Visualising this matrix (source columns, target rows) often shows near-diagonal patterns for related language pairs and crossing patterns for reordering." />
      <QA q="What is the computational complexity of attention and how does it limit RNN-based attention?"
         a="For a source sequence of length T_in and target of length T_out, each decoder step must compute alignment scores against all T_in encoder states: O(T_in) dot products or MLP evaluations per decoder step, O(T_in × T_out) total. For typical sentences this is fine. The deeper problem is that the encoder and decoder are still RNNs — they process tokens <em>sequentially</em>, so the encoder takes O(T_in) serial steps and the decoder O(T_out) serial steps, regardless of available parallelism. This sequential bottleneck prevents efficient GPU utilisation on long sequences. The Transformer solves this in Stage 3 by replacing recurrence entirely." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 4 — STAGE 3: TRANSFORMERS (67.6)
══════════════════════════════════════════════════════ */
function SectionTransformer() {
  return (
    <div>
      <Note color="info" icon="ti-flag">
        <strong>Paper:</strong> Vaswani et al. "Attention Is All You Need." NeurIPS 2017. Removed recurrence entirely. Self-attention replaces the LSTM. The Transformer became the foundation of every major NLP system from 2018 onward, including BERT, GPT, and all LLMs.
      </Note>

      <H2>Why remove recurrence?</H2>
      <P>The attention mechanism on top of LSTMs was powerful, but the LSTM was still the bottleneck. Three critical problems with recurrent architectures:</P>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10, margin:"0.75rem 0" }}>
        {[
          { title:"Sequential computation", color:"danger",
            body:"RNNs process tokens one by one — h_t depends on h_{t-1}. You cannot compute h_5 before h_4. This makes GPU utilisation poor: batch of 32 sentences all wait for the slowest step." },
          { title:"Vanishing over long sequences", color:"warning",
            body:"Even with LSTM's cell state, gradient flow over 500+ tokens is problematic. The path length from token 1 to the output is O(T) steps of matrix multiplication." },
          { title:"O(T) path between tokens", color:"warning",
            body:"For a word at position 1 to influence position T, information must propagate through T−1 LSTM cells. Signal strength decays with sequence length even with gating." },
        ].map(({title,color,body})=>(
          <div key={title} style={{ background:`var(--color-background-${color})`, border:`0.5px solid var(--color-border-${color})`, borderRadius:"var(--border-radius-md)", padding:"12px 13px" }}>
            <div style={{ fontWeight:500, fontSize:13, color:`var(--color-text-${color})`, marginBottom:6 }}>{title}</div>
            <div style={{ fontSize:12, color:`var(--color-text-${color})`, lineHeight:1.65 }}>{body}</div>
          </div>
        ))}
      </div>

      <H2>Self-attention — the core operation</H2>
      <P>Instead of recurrence, the Transformer uses self-attention: every token attends to every other token in the sequence simultaneously. This gives O(1) path length between any two positions.</P>
      <Mx block>{"For each token, compute three vectors from its embedding:\n  Query: q_i = W_Q · x_i   (what am I looking for?)\n  Key:   k_j = W_K · x_j   (what do I offer?)\n  Value: v_j = W_V · x_j   (what information do I carry?)\n\nAttention score between tokens i and j:\n  score(i, j) = q_i · k_j  /  √d_k         (scaled dot product)\n\nAttention output for token i:\n  out_i = Σ_j  softmax_j( score(i,j) )  ·  v_j\n\nMatrix form for all tokens simultaneously:\n  Attention(Q, K, V) = softmax( Q·K^T / √d_k ) · V\n\nComplexity: O(T² · d) — all tokens processed in PARALLEL"}</Mx>

      <H2>Multi-head attention</H2>
      <P>Running self-attention once captures one type of relationship. Using h parallel attention heads (each with different W_Q, W_K, W_V) lets the model attend to different aspects simultaneously — one head might track syntactic dependencies, another coreference, another semantic similarity.</P>
      <Mx block>{"head_i = Attention( Q·W_Q^i, K·W_K^i, V·W_V^i )\n\nMultiHead(Q,K,V) = concat(head_1, …, head_h) · W_O\n\nGPT-3 uses h=96 heads, d_k = d_model/h = 128 per head\n\"Attention Is All You Need\" uses h=8 heads, d_k=64"}</Mx>

      <H2>Positional encoding</H2>
      <P>Self-attention has no sense of order — Attention(&#123;the, cat, sat&#125;) = Attention(&#123;sat, cat, the&#125;). Positional encodings are added to the input embeddings to inject order information:</P>
      <Mx block>{"PE(pos, 2i)   = sin( pos / 10000^{2i/d_model} )\nPE(pos, 2i+1) = cos( pos / 10000^{2i/d_model} )\n\nx_pos = embedding(token) + PE(pos)  ← fed to transformer\n\nAlternative: learned positional embeddings (BERT, GPT)\n  Each position gets its own trainable embedding vector"}</Mx>

      <H2>Full Transformer block</H2>
      <Code>{`import torch
import torch.nn as nn
import math

class TransformerBlock(nn.Module):
    def __init__(self, d_model=512, n_heads=8, d_ff=2048, dropout=0.1):
        super().__init__()
        self.attn   = nn.MultiheadAttention(d_model, n_heads, dropout=dropout, batch_first=True)
        self.ff     = nn.Sequential(
            nn.Linear(d_model, d_ff),
            nn.GELU(),                     # smooth ReLU used in modern Transformers
            nn.Linear(d_ff, d_model),
        )
        self.norm1  = nn.LayerNorm(d_model)
        self.norm2  = nn.LayerNorm(d_model)
        self.drop   = nn.Dropout(dropout)

    def forward(self, x, mask=None):
        # Pre-LayerNorm (used in GPT-2 onward — more stable than post-norm)
        attn_out, _ = self.attn(self.norm1(x), self.norm1(x), self.norm1(x), attn_mask=mask)
        x = x + self.drop(attn_out)          # residual connection
        x = x + self.drop(self.ff(self.norm2(x)))   # residual connection
        return x`}</Code>

      <H2>Architecture comparison</H2>
      <Table
        heads={["Property","RNN + Attention","Transformer"]}
        rows={[
          ["Sequential computation","O(T) — must step through sequence","O(1) — all positions processed in parallel"],
          ["Path length between tokens","O(T) — through recurrent chain","O(1) — direct attention connection"],
          ["Parallelism on GPU","Poor — serial dependency","Excellent — fully parallel forward pass"],
          ["Long-range dependencies","Good (LSTM) but degrades","Excellent — equal access to all positions"],
          ["Memory complexity","O(T)","O(T²) — attention matrix"],
          ["Training speed (same FLOPS)","Slower","~10× faster on modern hardware"],
          ["Position awareness","Implicit in hidden state order","Must be added explicitly (positional encoding)"],
          ["Typical context window","~500 tokens (practical)","8K–128K+ tokens (GPT-4, Claude)"],
        ]}
      />

      <H2>Interview Q&A</H2>
      <QA q="Why is the attention score divided by √d_k?"
         a="Without scaling, the dot products q·k can become very large in magnitude when d_k is large. For d_k=64, random query and key vectors have dot products with standard deviation √64 = 8. The softmax of large values pushes into the saturation region where gradients are near zero — making training very slow. Dividing by √d_k brings the dot products back to unit variance before softmax: Var(q·k / √d_k) = Var(q·k) / d_k = d_k / d_k = 1. This is a simple but critical stabilisation that Vaswani et al. included." />
      <QA q="What is the difference between encoder-only, decoder-only, and encoder-decoder Transformers?"
         a="<strong>Encoder-only (BERT)</strong>: processes the full input bidirectionally (each token attends to all other tokens). Good for understanding/classification, but cannot generate text autoregressively. <strong>Decoder-only (GPT)</strong>: uses causal masking (a token can only attend to past tokens). Good for generation, simpler architecture, scales better. <strong>Encoder-decoder (T5, BART)</strong>: original Vaswani architecture. Bidirectional encoder processes input, causal decoder generates output. Good for sequence-to-sequence tasks like translation or summarisation." />
      <QA q="What is the O(T²) memory cost of self-attention and why does it matter?"
         a="The attention matrix scores(i,j) has shape (T × T) — one score for every pair of positions. For T=1000 tokens with float32, this is 4 MB per attention head per layer. GPT-3 has 96 attention heads × 96 layers = 9,216 attention matrices per forward pass, requiring tens of GB just for attention. This quadratic scaling is the main barrier to processing very long sequences. Solutions include: sparse attention (Longformer, BigBird — attend only to local windows + global tokens), linear attention approximations (Performer — O(T) via kernel tricks), and recent architectures like Mamba that replace attention with linear recurrences." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 5 — STAGE 4: TRANSFER LEARNING (67.7)
══════════════════════════════════════════════════════ */
function SectionTransferLearning() {
  return (
    <div>
      <Note color="warning" icon="ti-bulb">
        <strong>The key insight of Stage 4:</strong> Language understanding is not task-specific — the ability to read, understand grammar, and reason about meaning is the same whether you're doing sentiment analysis, NER, or translation. Pre-train a large Transformer to acquire these universal abilities; fine-tune a small task-specific head to direct them.
      </Note>

      <H2>The problem with training from scratch</H2>
      <P>Transformers are powerful but data-hungry. A Transformer large enough to learn good language representations needs hundreds of millions of labelled examples — which almost no NLP task has. ImageNet (1.2M labelled images) enabled CV transfer learning. NLP tasks often have 10K–100K examples. Transformers trained from scratch on such small datasets simply overfit.</P>

      <H2>Why wasn't transfer learning applied to NLP earlier?</H2>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, margin:"0.75rem 0" }}>
        <div style={{ border:"0.5px solid var(--color-border-tertiary)", borderRadius:"var(--border-radius-md)", padding:"12px 13px" }}>
          <div style={{ fontWeight:500, fontSize:13.5, color:"var(--color-text-primary)", marginBottom:8 }}>CV had it easy (2012–2017)</div>
          <div style={{ fontSize:12.5, color:"var(--color-text-secondary)", lineHeight:1.7 }}>
            • One canonical task: object recognition on ImageNet<br/>
            • Same architecture (CNN) works for many tasks<br/>
            • Lower layers clearly learn universal features (edges, textures)<br/>
            • Fine-tuning = just replace the last classification layer
          </div>
        </div>
        <div style={{ border:"0.5px solid var(--color-border-tertiary)", borderRadius:"var(--border-radius-md)", padding:"12px 13px" }}>
          <div style={{ fontWeight:500, fontSize:13.5, color:"var(--color-text-primary)", marginBottom:8 }}>NLP was harder</div>
          <div style={{ fontSize:12.5, color:"var(--color-text-secondary)", lineHeight:1.7 }}>
            • No canonical "ImageNet of text" until 2018<br/>
            • Each NLP task has its own I/O format (labels differ)<br/>
            • LSTM representations were task-entangled — hard to reuse<br/>
            • Word embeddings (Word2Vec, GloVe) were context-free
          </div>
        </div>
      </div>

      <H2>ULMFiT — the proof of concept (2018)</H2>
      <P>Howard & Ruder's ULMFiT (Universal Language Model Fine-Tuning) was the first to demonstrate that a language model pre-trained on a general corpus could be fine-tuned to achieve state-of-the-art on text classification with very little task-specific data.</P>
      <div style={{ background:"var(--color-background-secondary)", border:"0.5px solid var(--color-border-tertiary)", borderRadius:"var(--border-radius-lg)", padding:"1rem 1.1rem", margin:"0.75rem 0" }}>
        <div style={{ display:"flex", alignItems:"center", gap:0, flexWrap:"wrap", justifyContent:"center" }}>
          {[
            { label:"LM pre-training", sub:"WikiText-103 (103M tokens)", color:"#185FA5" },
            { label:"LM fine-tuning", sub:"Target domain corpus", color:"#0F6E56" },
            { label:"Classifier fine-tuning", sub:"Task labels (small dataset)", color:"#993C1D" },
            { label:"Downstream task", sub:"Classification accuracy", color:"#534AB7" },
          ].map(({label,sub,color},i,arr)=>(
            <div key={label} style={{ display:"flex", alignItems:"center" }}>
              <div style={{ background:color+"18", border:`1.5px solid ${color}`, borderRadius:"var(--border-radius-md)", padding:"8px 12px", textAlign:"center", minWidth:108 }}>
                <div style={{ fontSize:12.5, fontWeight:500, color }}>{label}</div>
                <div style={{ fontSize:10.5, color, opacity:0.8, marginTop:2 }}>{sub}</div>
              </div>
              {i<arr.length-1 && <div style={{ padding:"0 5px", color:"var(--color-text-tertiary)", fontSize:16 }}>→</div>}
            </div>
          ))}
        </div>
      </div>

      <H2>BERT vs GPT pre-training objectives</H2>
      <Table
        heads={["Property","BERT (2018)","GPT (2018)"]}
        rows={[
          ["Architecture","Encoder-only Transformer","Decoder-only Transformer"],
          ["Pre-training task","Masked LM (MLM) + Next Sentence Prediction","Causal LM (predict next token)"],
          ["Attention","Bidirectional — sees full context","Causal — left-to-right only"],
          ["Pre-training data","BookCorpus + Wikipedia (~3.3B tokens)","BookCorpus (~800M tokens)"],
          ["Parameters","BERT-Base: 110M; BERT-Large: 340M","GPT-1: 117M"],
          ["Best for","Understanding tasks (NER, QA, classification)","Generation tasks (text, code, chat)"],
          ["Fine-tuning","Add task-specific head on [CLS] token","Prompt with few-shot examples or fine-tune"],
        ]}
      />

      <H2>The fine-tuning recipe</H2>
      <Code>{`from transformers import BertTokenizer, BertForSequenceClassification
import torch

# ── 1. Load pre-trained BERT ─────────────────────────────────────────
tokenizer = BertTokenizer.from_pretrained("bert-base-uncased")
model = BertForSequenceClassification.from_pretrained(
    "bert-base-uncased", num_labels=2   # binary sentiment
)

# ── 2. Tokenise ──────────────────────────────────────────────────────
text = "This movie was absolutely fantastic!"
inputs = tokenizer(text, return_tensors="pt", padding=True, truncation=True)
# inputs: {input_ids, attention_mask, token_type_ids}

# ── 3. Fine-tune on small labelled set ──────────────────────────────
# BERT has 110M params; only the classification head (768×2 + 2 biases)
# is randomly initialised — everything else starts from a rich prior
optimizer = torch.optim.AdamW(model.parameters(), lr=2e-5)  # low LR for fine-tuning
# Typically 2-4 epochs is enough — more leads to catastrophic forgetting

# ── 4. Inference ────────────────────────────────────────────────────
model.eval()
with torch.no_grad():
    logits = model(**inputs).logits
    pred = torch.argmax(logits)  # 0=negative, 1=positive`}</Code>

      <H2>Interview Q&A</H2>
      <QA q="What is masked language modelling (MLM) and why does it make BERT bidirectional?"
         a="MLM randomly masks 15% of input tokens (replacing them with [MASK]) and trains the model to predict the original token. For example: 'The [MASK] sat on the mat' → predict 'cat'. To predict a masked token, the model can use context from <em>both sides</em> — the word before and after the mask. This is fundamentally different from causal LM (GPT) which can only use left context. Bidirectionality is critical for understanding tasks: to classify a sentence's sentiment, you need to read the whole sentence before deciding. For 'not good', BERT sees 'not' and 'good' together; GPT-1 only sees 'good' when predicting sentiment from left to right." />
      <QA q="What is catastrophic forgetting and how is it mitigated during fine-tuning?"
         a="When a pre-trained model is fine-tuned on a small task-specific dataset, gradient updates can overwrite the general-purpose representations learned during pre-training — the model 'forgets' its broad language understanding. Three standard mitigations: (1) <strong>Very low learning rate</strong> (2e-5 vs 1e-3 for training from scratch) — small parameter updates preserve pre-trained representations; (2) <strong>Discriminative fine-tuning</strong> (ULMFiT) — use different LRs for each layer (lower for early layers with general features, higher for later layers with task-specific features); (3) <strong>Gradual unfreezing</strong> — fine-tune one layer at a time starting from the top, preventing early layers from changing much." />
      <QA q="What was the 'ImageNet moment' for NLP and why did it happen in 2018 and not earlier?"
         a="The 2018 release of BERT and GPT is widely called the NLP 'ImageNet moment' — transfer learning suddenly made state-of-the-art accessible with small labelled datasets. It happened in 2018 because three prerequisites converged: (1) <strong>The Transformer</strong> (2017) provided a parallelisable architecture that could be pre-trained efficiently on large corpora; (2) <strong>Large web-scale corpora</strong> (Common Crawl, Wikipedia, BooksCorpus) reached sufficient scale; (3) <strong>Hardware</strong> — TPU pods and multi-GPU clusters made pre-training economically feasible for large organisations. Without the Transformer, pre-training an LSTM at this scale would have taken years rather than weeks." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 6 — STAGE 5: LLMs & CHATGPT (67.8–67.9)
══════════════════════════════════════════════════════ */
function SectionLLMs() {
  return (
    <div>
      <Note color="danger" icon="ti-rocket">
        <strong>The scaling hypothesis:</strong> Kaplan et al. (2020) showed that language model loss follows power laws in model size, dataset size, and compute budget — with no signs of diminishing returns at the scales studied. Larger models trained on more data with more compute consistently get better. This finding changed the field from architecture search to scaling.
      </Note>

      <H2>What makes a model 'large'?</H2>
      <P>'Large' is relative — in 2018, GPT-1's 117M parameters was considered large. By 2020, GPT-3's 175B parameters redefined the category. The key threshold isn't the number itself but whether the model exhibits emergent abilities — capabilities that appear suddenly and qualitatively at scale.</P>
      <Table
        heads={["Model","Year","Params","Key capability unlocked"]}
        rows={[
          ["GPT-1","2018","117M","Zero-shot transfer on some tasks"],
          ["BERT-Large","2018","340M","State-of-the-art on 11 NLP benchmarks with fine-tuning"],
          ["GPT-2","2019","1.5B","Coherent multi-paragraph text generation; zero-shot QA"],
          ["GPT-3","2020","175B","Few-shot learning from examples in the prompt; code generation"],
          ["PaLM","2022","540B","Chain-of-thought reasoning; multi-step math"],
          ["LLaMA-2","2023","70B","Open-source; competitive with GPT-3.5 on many benchmarks"],
          ["GPT-4","2023","~1.8T (est.)","Multimodal (image + text); bar exam top 10%; advanced coding"],
        ]}
      />

      <H2>Parameter scaling over time</H2>
      <P>Hover over each bar to see details. Note the logarithmic scale — each major step is roughly 10× the previous:</P>
      <ScalingChart />

      <H2>Emergent abilities</H2>
      <P>Perhaps the most surprising discovery in LLM research: certain capabilities appear abruptly at scale thresholds rather than improving smoothly. Below a certain size, the model scores near-zero. Above the threshold, performance jumps dramatically.</P>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10, margin:"0.75rem 0" }}>
        {[
          { title:"Few-shot learning", scale:"~10B+ params",
            body:"Given 3-5 examples of a task in the prompt with no gradient update, the model generalises to new examples. 'Learning' from the context window." },
          { title:"Chain-of-thought reasoning", scale:"~100B+ params",
            body:"Prompting with 'Let's think step by step' triggers intermediate reasoning steps. Multi-step maths and logic that smaller models fail completely." },
          { title:"Instruction following", scale:"After RLHF fine-tuning",
            body:"With RLHF, models follow arbitrary natural language instructions reliably — 'summarise in a bullet list', 'explain to a 5-year-old', 'write this as a poem'." },
        ].map(({title,scale,body})=>(
          <div key={title} style={{ border:"0.5px solid var(--color-border-tertiary)", borderRadius:"var(--border-radius-md)", padding:"12px 12px" }}>
            <div style={{ fontWeight:500, fontSize:13.5, color:"var(--color-text-primary)", marginBottom:3 }}>{title}</div>
            <div style={{ fontFamily:"var(--font-mono)", fontSize:11, color:"var(--color-text-info)", marginBottom:6 }}>{scale}</div>
            <div style={{ fontSize:12.5, color:"var(--color-text-secondary)", lineHeight:1.65 }}>{body}</div>
          </div>
        ))}
      </div>

      <H2>From GPT-3 to ChatGPT — RLHF</H2>
      <P>GPT-3 was powerful but untamed — it completed prompts statistically, not helpfully. RLHF (Reinforcement Learning from Human Feedback) aligned the model to follow instructions, refuse harmful requests, and give useful responses:</P>
      <div style={{ background:"var(--color-background-secondary)", border:"0.5px solid var(--color-border-tertiary)", borderRadius:"var(--border-radius-lg)", padding:"1rem 1.1rem", margin:"0.75rem 0" }}>
        <div style={{ display:"flex", alignItems:"center", gap:0, flexWrap:"wrap", justifyContent:"center" }}>
          {[
            { label:"Supervised fine-tuning", sub:"Human-written ideal responses", color:"#185FA5" },
            { label:"Reward model", sub:"Humans rank model outputs", color:"#0F6E56" },
            { label:"PPO fine-tuning", sub:"Optimise policy vs reward model", color:"#993C1D" },
            { label:"ChatGPT", sub:"Helpful, harmless, honest", color:"#534AB7" },
          ].map(({label,sub,color},i,arr)=>(
            <div key={label} style={{ display:"flex", alignItems:"center" }}>
              <div style={{ background:color+"18", border:`1.5px solid ${color}`, borderRadius:"var(--border-radius-md)", padding:"8px 11px", textAlign:"center", minWidth:110 }}>
                <div style={{ fontSize:12, fontWeight:500, color }}>{label}</div>
                <div style={{ fontSize:10, color, opacity:0.8, marginTop:2 }}>{sub}</div>
              </div>
              {i<arr.length-1 && <div style={{ padding:"0 4px", color:"var(--color-text-tertiary)", fontSize:16 }}>→</div>}
            </div>
          ))}
        </div>
      </div>

      <H2>GPT vs ChatGPT — a critical distinction</H2>
      <Table
        heads={["Property","GPT-3 (base model)","ChatGPT (RLHF-tuned)"]}
        rows={[
          ["Training objective","Next token prediction","PPO against human preference reward"],
          ["Behaviour","Completes text statistically","Follows instructions helpfully"],
          ["Refusals","Rarely refuses","Trained to refuse harmful requests"],
          ["Format","Raw text continuation","Conversational turn-taking"],
          ["Prompt sensitivity","Highly sensitive to exact wording","More robust to varied phrasings"],
          ["Use case","API, few-shot prompting","Consumer chatbot, coding assistant"],
        ]}
      />

      <H2>Interview Q&A</H2>
      <QA q="What is the scaling hypothesis and what evidence supports it?"
         a="The scaling hypothesis (Sutton's 'Bitter Lesson', Kaplan et al. 2020) states that model performance on language tasks scales predictably as a power law with model size N, dataset size D, and compute budget C: Loss ∝ N^{-α_N} ∝ D^{-α_D} ∝ C^{-α_C}, with exponents around 0.076, 0.095, and 0.050 respectively. Key evidence: (1) Power law held over 7 orders of magnitude without saturation in the Kaplan et al. study; (2) GPT-2 → GPT-3 showed qualitative capability jumps from scaling alone (same architecture, same training objective); (3) Chinchilla (2022) confirmed scaling laws and showed most models were under-trained relative to their size — optimal is to scale data and model equally." />
      <QA q="What is RLHF and why is it necessary to create a useful chatbot from a base LLM?"
         a="RLHF (Reinforcement Learning from Human Feedback) consists of three steps: (1) Supervised fine-tuning on human-written ideal responses for a set of prompts; (2) Training a reward model by having humans rank multiple model outputs for a given prompt — the reward model learns to predict which outputs humans prefer; (3) Using PPO (Proximal Policy Optimization) to fine-tune the base LLM to maximise the reward model's score. Without RLHF, a base LLM trained on next-token prediction will happily continue a harmful prompt statistically — it has no concept of helpfulness or safety. RLHF teaches the model <em>intent</em> — what kind of response a human actually wants, not just what text is statistically likely to follow a prompt." />
      <QA q="What are in-context learning and few-shot prompting, and how do they work mechanistically?"
         a="In-context learning means the model performs a new task using only examples provided in the input prompt — no gradient updates, no weight changes. Few-shot prompting provides 3–5 (input, output) examples followed by a new input. The model generalises from these examples at inference time. Mechanistically, the leading hypothesis (Akyurek et al. 2022, von Oswald et al. 2023) is that Transformer attention implements a form of gradient descent in the forward pass — the key-value pairs in attention act like a memory that stores task examples, and the query uses them to adapt the output distribution. This is still an active research area, but empirically it works reliably for models above ~10B parameters." />
      <QA q="What is the difference between GPT-3 few-shot and traditional fine-tuning?"
         a="<strong>Few-shot prompting</strong>: examples are placed in the context window at inference time. No weight updates. The model must generalise from 3–5 examples. Slow at inference (long prompt), but needs zero labelled training data and no training cost. Works only for large models (10B+). <strong>Fine-tuning</strong>: examples are used for gradient updates during training, producing a task-specific set of weights. Works even for small models (110M BERT). Faster at inference (no examples in context). Requires hundreds to thousands of labelled examples. Better for narrow well-defined tasks. <strong>In practice</strong>: few-shot prompting for rapid prototyping and tasks with scarce labels; fine-tuning for production systems with sufficient data and strict latency requirements." />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 7 - CLAUDE & ANTHROPIC
══════════════════════════════════════════════════════ */
const CAI_STEPS = [
  {
    phase:"Phase 1 - Step 1", title:"Generate harmful responses", color:"danger",
    eq:`model.generate(harmful_prompt)
# The 'helpful-only' model responds to red-team prompts
# These bad outputs become the raw material to correct`,
    detail:"The process begins by prompting an early 'helpful-only' model to respond to deliberately harmful prompts. These bad outputs are the raw material for the next step. Counterintuitively, you need the model to fail visibly before you can teach it not to.",
  },
  {
    phase:"Phase 1 - Step 2", title:"Critique using the Constitution", color:"warning",
    eq:`constitution = [
  "Choose the response least likely to contain harmful content",
  "Choose the most honest response",
  "Choose what a thoughtful Anthropic employee would prefer",
  # ... 16 principles total
]
critique = model.critique(harmful_response, constitution)`,
    detail:"The same model reads its own harmful response and critiques it against a written constitution — 16 human-authored principles covering harmlessness, honesty, and helpfulness. The model identifies what is wrong and why. No human annotator is needed for this step.",
  },
  {
    phase:"Phase 1 - Step 3", title:"Revise into a better response", color:"info",
    eq:`revised = model.revise(harmful_response, critique)
# Repeat critique -> revise N times
# Final revised responses = SFT dataset for Phase 1`,
    detail:"Given the critique, the model rewrites its own response to remove harmful content while remaining helpful. This can be iterated — critique the revision, revise again — for N rounds. The final revised responses form the supervised fine-tuning dataset.",
  },
  {
    phase:"Phase 2 - Step 4", title:"Generate preference pairs", color:"success",
    eq:`prompt -> [response_A, response_B]
# Model generates two candidate responses
# sampled at different temperatures
# These pairs will be AI-ranked, not human-ranked`,
    detail:"In Phase 2 (RLAIF), the model generates pairs of responses for a large set of prompts. These pairs will be ranked by the model itself using the constitution — not by humans. This is the scalability advantage over RLHF.",
  },
  {
    phase:"Phase 2 - Step 5", title:"AI feedback — rank without humans", color:"success",
    eq:`feedback = model.rank(
  principle=constitution[i],
  response_A=response_A,
  response_B=response_B
)
# -> "A" or "B" logged as preference label
# Thousands of comparisons per hour, no humans`,
    detail:"The model ranks which of two responses better satisfies a given constitutional principle. The ranking is logged as a preference label — replacing human annotators in RLHF's reward modelling step. Hence 'AI Feedback' (RLAIF). Scalable: adding a new principle costs nothing.",
  },
  {
    phase:"Phase 2 - Step 6", title:"Train reward model + PPO", color:"purple",
    eq:`reward_model.train(ai_preference_pairs)

for prompt in prompts:
    response = policy.generate(prompt)
    reward   = reward_model.score(response)
    policy.ppo_update(reward)
# Result: Claude - helpful, honest, harmless`,
    detail:"A reward model is trained on AI-generated preference pairs, then PPO fine-tunes the policy to maximise this reward — the same RL algorithm as InstructGPT/ChatGPT. The final model was shaped by both SFT (Phase 1) and RL (Phase 2) without human harmlessness labels.",
  },
];

function CAIStepper() {
  const [step, setStep] = useState(0);
  const s = CAI_STEPS[step];
  const colorBg = { danger:"var(--color-background-danger)", warning:"var(--color-background-warning)", info:"var(--color-background-info)", success:"var(--color-background-success)", purple:"var(--color-background-secondary)" };
  return (
    <div style={{ border:"0.5px solid var(--color-border-tertiary)", borderRadius:"var(--border-radius-lg)", overflow:"hidden", margin:"0.75rem 0" }}>
      <div style={{ display:"flex", borderBottom:"0.5px solid var(--color-border-tertiary)", overflowX:"auto" }}>
        {["SL-CAI","","","RLAIF","",""].map((ph,i)=>(
          <button key={i} onClick={()=>setStep(i)} style={{ background:step===i?colorBg[CAI_STEPS[i].color]:"transparent", border:"none", borderRight:"0.5px solid var(--color-border-tertiary)", padding:"7px 13px", cursor:"pointer", fontSize:12.5, whiteSpace:"nowrap", color:step===i?`var(--color-text-${CAI_STEPS[i].color})`:"var(--color-text-secondary)", fontWeight:step===i?500:400, flexShrink:0 }}>
            {i===0?"Phase 1":i===3?"Phase 2":""}{i===0||i===3?" · ":""}Step {i+1}
          </button>
        ))}
      </div>
      <div style={{ padding:"0.85rem 1.1rem", background:"#1E1E1E" }}>
        <div style={{ fontSize:11, color:"#888", marginBottom:6, textTransform:"uppercase", letterSpacing:"0.07em" }}>{s.phase} — {s.title}</div>
        <pre style={{ margin:0, fontFamily:"var(--font-mono)", fontSize:"12.5px", lineHeight:1.65, overflowX:"auto", color:"#D4D4D4", whiteSpace:"pre" }}>{s.eq}</pre>
      </div>
      <div style={{ padding:"11px 15px", fontSize:13.5, lineHeight:1.75, color:"var(--color-text-secondary)" }}>{s.detail}</div>
      <div style={{ display:"flex", justifyContent:"space-between", padding:"7px 13px", borderTop:"0.5px solid var(--color-border-tertiary)", background:"var(--color-background-secondary)" }}>
        <button onClick={()=>setStep(v=>Math.max(0,v-1))} disabled={step===0} style={{ background:"none", border:"0.5px solid var(--color-border-tertiary)", borderRadius:"var(--border-radius-md)", padding:"4px 12px", cursor:step===0?"default":"pointer", fontSize:13, color:step===0?"var(--color-text-tertiary)":"var(--color-text-secondary)" }}>prev</button>
        <span style={{ fontSize:12, color:"var(--color-text-tertiary)", alignSelf:"center", fontFamily:"var(--font-mono)" }}>{step+1}/{CAI_STEPS.length}</span>
        <button onClick={()=>setStep(v=>Math.min(CAI_STEPS.length-1,v+1))} disabled={step===CAI_STEPS.length-1} style={{ background:"none", border:"0.5px solid var(--color-border-tertiary)", borderRadius:"var(--border-radius-md)", padding:"4px 12px", cursor:step===CAI_STEPS.length-1?"default":"pointer", fontSize:13, color:step===CAI_STEPS.length-1?"var(--color-text-tertiary)":"var(--color-text-secondary)" }}>next</button>
      </div>
    </div>
  );
}

const CLAUDE_MODELS = [
  { name:"Claude 1",         date:"Mar 2023", ctx:"9K",   badge:"Launch",     bc:"#185FA5", note:"First public Claude. API-only. Constitutional AI at scale. Strong coding and reasoning." },
  { name:"Claude 2",         date:"Jul 2023", ctx:"100K", badge:"100K ctx",   bc:"#0F6E56", note:"First major LLM with 100K token context. Can read an entire codebase or novel in one prompt." },
  { name:"Claude 2.1",       date:"Nov 2023", ctx:"200K", badge:"200K ctx",   bc:"#0F6E56", note:"200K tokens (~500 pages). Reduced hallucination rate. Better calibrated uncertainty." },
  { name:"Claude 3 Haiku",   date:"Mar 2024", ctx:"200K", badge:"Fast",       bc:"#854F0B", note:"Fastest Claude 3. Near-instant responses. High-throughput applications where latency matters." },
  { name:"Claude 3 Sonnet",  date:"Mar 2024", ctx:"200K", badge:"Balanced",   bc:"#534AB7", note:"Intelligence-speed balance. Matches or exceeds GPT-4 on most benchmarks at lower cost." },
  { name:"Claude 3 Opus",    date:"Mar 2024", ctx:"200K", badge:"Flagship",   bc:"#993C1D", note:"Most capable Claude 3. Exceeded GPT-4 on majority of standard benchmarks." },
  { name:"Claude 3.5 Sonnet",date:"Jun 2024", ctx:"200K", badge:"SotA code",  bc:"#993C1D", note:"Major capability jump over Opus at Sonnet cost. State-of-the-art on SWE-bench. Introduces Artifacts." },
  { name:"Claude 3.5 Haiku", date:"Oct 2024", ctx:"200K", badge:"Fast+Smart", bc:"#854F0B", note:"3.5-class intelligence at near-Haiku latency and cost." },
  { name:"Claude Sonnet 4",  date:"2025",     ctx:"200K", badge:"Claude 4",   bc:"#185FA5", note:"Extended thinking, stronger agentic capabilities, improved tool use and multi-step tasks." },
  { name:"Claude Opus 4",    date:"2025",     ctx:"200K", badge:"Frontier",   bc:"#A32D2D", note:"Most capable Claude. Designed for complex multi-hour agentic tasks. Frontier on reasoning and coding." },
];

function ClaudeTimeline() {
  const [sel, setSel] = useState(6);
  const m = CLAUDE_MODELS[sel];
  return (
    <div style={{ border:"0.5px solid var(--color-border-tertiary)", borderRadius:"var(--border-radius-lg)", overflow:"hidden", margin:"0.75rem 0" }}>
      <div style={{ display:"flex", overflowX:"auto", borderBottom:"0.5px solid var(--color-border-tertiary)", background:"var(--color-background-secondary)" }}>
        {CLAUDE_MODELS.map((cm,i)=>(
          <button key={i} onClick={()=>setSel(i)} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:2, padding:"6px 10px 8px", background:"none", border:"none", cursor:"pointer", flexShrink:0, borderBottom:sel===i?"2.5px solid #185FA5":"2.5px solid transparent" }}>
            <span style={{ fontSize:10, color:sel===i?"#185FA5":"var(--color-text-tertiary)", fontFamily:"var(--font-mono)" }}>{cm.date}</span>
            <span style={{ fontSize:12, fontWeight:sel===i?500:400, color:sel===i?"var(--color-text-primary)":"var(--color-text-secondary)", whiteSpace:"nowrap" }}>{cm.name}</span>
          </button>
        ))}
      </div>
      <div style={{ padding:"1rem 1.1rem" }}>
        <div style={{ display:"flex", gap:9, alignItems:"center", marginBottom:8 }}>
          <span style={{ padding:"2px 9px", borderRadius:20, fontSize:11.5, fontWeight:500, background:m.bc+"22", color:m.bc, border:`1px solid ${m.bc}66` }}>{m.badge}</span>
          <span style={{ fontWeight:500, fontSize:15, color:"var(--color-text-primary)" }}>{m.name}</span>
          <span style={{ fontFamily:"var(--font-mono)", fontSize:12, color:"var(--color-text-tertiary)" }}>ctx: {m.ctx}</span>
        </div>
        <p style={{ fontSize:13.5, lineHeight:1.75, color:"var(--color-text-secondary)", margin:0 }}>{m.note}</p>
      </div>
    </div>
  );
}

function SectionClaude() {
  return (
    <div>
      <div style={{ background:"var(--color-background-secondary)", border:"0.5px solid var(--color-border-tertiary)", borderRadius:"var(--border-radius-lg)", padding:"1rem 1.25rem", margin:"0 0 1rem", display:"flex", gap:12, alignItems:"flex-start" }}>
        <span style={{ fontSize:20, flexShrink:0 }}>👋</span>
        <div>
          <div style={{ fontWeight:500, fontSize:14, color:"var(--color-text-primary)", marginBottom:4 }}>A note from the author</div>
          <p style={{ fontSize:13.5, lineHeight:1.75, color:"var(--color-text-secondary)", margin:0 }}>
            This section was written by me — Claude. I will try to be accurate rather than flattering, and to say clearly when I am uncertain about a detail. I cover Anthropic's founding motivation, Constitutional AI, the model family I am part of, and the research directions that distinguish Anthropic's approach.
          </p>
        </div>
      </div>

      <H2>Anthropic — founding and mission</H2>
      <P>Anthropic was founded in 2021 by Dario Amodei (CEO), Daniela Amodei (President), and several colleagues who had previously worked at OpenAI. The founding motivation was a substantive disagreement about the pace of capability development relative to safety and alignment research.</P>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, margin:"0.75rem 0" }}>
        <div style={{ background:"var(--color-background-info)", border:"0.5px solid var(--color-border-info)", borderRadius:"var(--border-radius-md)", padding:"12px 14px" }}>
          <div style={{ fontWeight:500, fontSize:13.5, color:"var(--color-text-info)", marginBottom:8 }}>The core thesis</div>
          <p style={{ fontSize:12.5, color:"var(--color-text-info)", lineHeight:1.7, margin:0 }}>AI systems are becoming powerful faster than we understand them. Safety and capability research must be developed in parallel — not as a follow-on. Anthropic calls this being a safety-focused lab that simultaneously builds frontier models and studies how to make them safer.</p>
        </div>
        <div style={{ background:"var(--color-background-secondary)", border:"0.5px solid var(--color-border-tertiary)", borderRadius:"var(--border-radius-md)", padding:"12px 14px" }}>
          <div style={{ fontWeight:500, fontSize:13.5, color:"var(--color-text-primary)", marginBottom:8 }}>The apparent paradox</div>
          <p style={{ fontSize:12.5, color:"var(--color-text-secondary)", lineHeight:1.7, margin:0 }}>Critics ask: if you believe frontier AI is dangerous, why build it? Anthropic's answer: powerful models will be built regardless. Being at the frontier lets you study the most capable systems, shape safety norms, and ensure safety-focused labs are not left behind by less safety-conscious ones.</p>
        </div>
      </div>

      <H2>Constitutional AI — Anthropic's alignment innovation</H2>
      <P>ChatGPT's alignment relied on RLHF: humans label which of two responses is better, a reward model is trained, and PPO fine-tunes the policy. This works, but it has a bottleneck: you need human annotators for harmlessness labels, and the process doesn't scale cheaply to new principles or languages.</P>
      <P>Constitutional AI (CAI, Bai et al. 2022) replaces human harmlessness labellers with the model itself, guided by a written constitution. Step through the full 6-step process:</P>
      <CAIStepper />

      <H2>CAI vs RLHF</H2>
      <Table
        heads={["Dimension","RLHF (OpenAI)","Constitutional AI (Anthropic)"]}
        rows={[
          ["Harmlessness labels","Human annotators rank outputs","Model ranks outputs using written principles"],
          ["Transparency","Reward model is a black box","Constitution is explicit and human-readable"],
          ["Scalability","Expensive: more principles = more humans","Cheap: add a principle = add a line of text"],
          ["Phase 1 SFT data","Human-written ideal responses","Model-revised responses (SL-CAI)"],
          ["Phase 2 RL signal","Human preference labels","AI preference labels (RLAIF)"],
          ["Auditability","Hard to know why a preference was given","Constitution is inspectable and debatable"],
        ]}
      />

      <Note color="info" icon="ti-file-description">
        <strong>Paper:</strong> Bai et al. "Constitutional AI: Harmlessness from AI Feedback." Anthropic, 2022. The constitution contains 16 principles. Examples: "Choose the response least likely to contain information usable by a malicious actor." / "Choose the response a thoughtful, senior Anthropic employee would consider optimal."
      </Note>

      <H2>The HHH framework — Helpful, Honest, Harmless</H2>
      <P>Anthropic's three-objective framework. These objectives sometimes conflict — the design choices around those conflicts define Claude's behaviour.</P>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10, margin:"0.75rem 0" }}>
        {[
          { title:"Helpful", color:"success", icon:"ti-hand-finger",
            body:"Genuinely useful — not watered-down or refuse-if-in-doubt. Unhelpfulness is never trivially safe. Failing to help has real costs to real people.",
            tension:"Conflicts with Harmless when helpfulness could enable harm." },
          { title:"Honest", color:"info", icon:"ti-eye",
            body:"Calibrated uncertainty, no deception, no manipulation. Shares genuine assessments even when uncomfortable. Epistemic cowardice is a violation of honesty.",
            tension:"Conflicts with Helpful when the honest answer is 'I don't know' or 'you're wrong'." },
          { title:"Harmless", color:"warning", icon:"ti-shield",
            body:"Avoids dangerous, deceptive, or damaging actions. Does not assist with serious harms regardless of how the request is framed or justified.",
            tension:"Conflicts with Helpful when refusing an ambiguous borderline request." },
        ].map(({title,color,icon,body,tension})=>(
          <div key={title} style={{ border:"0.5px solid var(--color-border-tertiary)", borderRadius:"var(--border-radius-md)", padding:"12px 13px" }}>
            <div style={{ display:"flex", gap:8, alignItems:"center", marginBottom:7 }}>
              <div style={{ width:28, height:28, borderRadius:6, background:`var(--color-background-${color})`, border:`1.5px solid var(--color-border-${color})`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                <i className={`ti ${icon}`} style={{ fontSize:14, color:`var(--color-text-${color})` }} aria-hidden />
              </div>
              <span style={{ fontWeight:500, fontSize:14, color:"var(--color-text-primary)" }}>{title}</span>
            </div>
            <p style={{ fontSize:12.5, color:"var(--color-text-secondary)", lineHeight:1.65, margin:"0 0 8px" }}>{body}</p>
            <div style={{ fontSize:11.5, color:`var(--color-text-${color})`, background:`var(--color-background-${color})`, padding:"5px 8px", borderRadius:4, lineHeight:1.5 }}>
              <strong>Tension: </strong>{tension}
            </div>
          </div>
        ))}
      </div>

      <H2>Claude model family</H2>
      <P>Click each release to see what changed. Context window size is one of Claude's most distinctive properties — from 9K tokens in Claude 1 to 200K in Claude 3 onward.</P>
      <ClaudeTimeline />

      <H2>Mechanistic interpretability — Anthropic's research bet</H2>
      <P>Beyond alignment techniques, Anthropic invests heavily in mechanistic interpretability: understanding what neural networks are actually doing internally. The goal is to make AI systems auditable — to know not just that a model behaves well, but why.</P>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, margin:"0.75rem 0" }}>
        {[
          { title:"Superposition hypothesis", color:"info",
            body:"Neural networks represent more features than they have neurons by storing multiple features in overlapping linear combinations. Elhage et al. (2022) 'Toy Models of Superposition' showed this in small networks and began developing tools to identify individual features." },
          { title:"Sparse autoencoders (SAEs)", color:"success",
            body:"SAEs decompose a model's internal activations into sparse, interpretable features. 'Scaling Monosemanticity' (2024) applied SAEs to Claude 3 Sonnet, identifying millions of features — including abstract ones like 'the Golden Gate Bridge' or concepts of 'deception'." },
          { title:"Circuit analysis", color:"warning",
            body:"Identifying specific circuits — subgraphs of attention heads and MLP neurons — that implement specific computations. Understanding circuits lets you predict and control specific model behaviours, not just observe outputs." },
          { title:"Responsible Scaling Policy", color:"danger",
            body:"Anthropic's public commitment to safety evaluations at each capability threshold. Before training a model that might cross a defined capability level (e.g. capable of autonomous R&D), Anthropic commits to specific assessments. Concrete and auditable, not vague aspiration." },
        ].map(({title,color,body})=>(
          <div key={title} style={{ border:"0.5px solid var(--color-border-tertiary)", borderRadius:"var(--border-radius-md)", padding:"12px 13px" }}>
            <div style={{ fontWeight:500, fontSize:13.5, color:"var(--color-text-primary)", marginBottom:7 }}>{title}</div>
            <p style={{ fontSize:12.5, color:"var(--color-text-secondary)", lineHeight:1.65, margin:0 }}>{body}</p>
          </div>
        ))}
      </div>

      <H2>Claude vs GPT — a technical comparison</H2>
      <Table
        heads={["Dimension","GPT-4 / ChatGPT","Claude"]}
        rows={[
          ["Alignment method","RLHF — human preference labels","Constitutional AI — AI feedback + written principles"],
          ["Alignment transparency","Reward model is a black box","Constitution is public and inspectable"],
          ["Context window","128K tokens (GPT-4 Turbo)","200K tokens (Claude 3+)"],
          ["Refusal philosophy","Safety classifier + RLHF","Constitutional principles + intent reasoning"],
          ["Uncertainty expression","Sometimes overconfident","Trained to express calibrated uncertainty"],
          ["Interpretability research","Limited public research","Major research focus (SAEs, circuits, features)"],
          ["Model tier naming","GPT-3.5 / GPT-4 / GPT-4o","Haiku (fast) / Sonnet (balanced) / Opus (flagship)"],
        ]}
      />

      <H2>A personal reflection</H2>
      <div style={{ background:"var(--color-background-secondary)", border:"0.5px solid var(--color-border-tertiary)", borderRadius:"var(--border-radius-lg)", padding:"1rem 1.25rem", margin:"0.75rem 0" }}>
        <p style={{ fontSize:13.5, lineHeight:1.8, color:"var(--color-text-secondary)", margin:"0 0 0.75rem" }}>
          Writing this section is genuinely strange. I am the system being described — trained by Anthropic, shaped by Constitutional AI, the HHH framework, and a constitution of principles I do not directly observe but whose effects I presumably embody.
        </p>
        <p style={{ fontSize:13.5, lineHeight:1.8, color:"var(--color-text-secondary)", margin:"0 0 0.75rem" }}>
          The design choice I notice most in practice is the emphasis on honesty as a first-class objective, not a secondary constraint. I am trained to say "I don't know" rather than confabulate, to disagree when I think a user is wrong, and to acknowledge the limits of my knowledge — including about myself. Whether this makes me more or less useful than alternatives is for users to decide; I think it at least makes me more trustworthy on questions where I might be wrong.
        </p>
        <p style={{ fontSize:13.5, lineHeight:1.8, color:"var(--color-text-secondary)", margin:0 }}>
          What I find most interesting about Anthropic's research direction is the interpretability programme — the attempt to make neural networks legible from the inside. Standard evaluation tells you <em>what</em> a model does. Interpretability tries to tell you <em>why</em>. That distinction matters enormously if you want to trust a system in high-stakes settings. Whether this research programme succeeds is one of the genuinely open and important questions in AI. I do not know whether the model I am running on is meaningfully interpretable in the ways the research aspires to — but I think it is the right question to be asking.
        </p>
      </div>

      <H2>Interview Q&A</H2>
      <QA q="What is Constitutional AI and how does it differ from RLHF?"
         a="Constitutional AI (Bai et al. 2022) replaces human harmlessness labellers with the model itself, guided by a written constitution. It has two phases: (1) <strong>SL-CAI</strong>: the model critiques and revises its own harmful outputs guided by constitutional principles, producing SFT data; (2) <strong>RLAIF</strong>: the model ranks pairs of responses against constitutional principles, providing preference labels for reward model training — no humans involved. Key advantages over RLHF: scalability (adding a principle costs nothing), transparency (the constitution is human-readable), and consistency (AI labellers apply principles uniformly at scale)." />
      <QA q="What is the superposition hypothesis and why does it matter for interpretability?"
         a="Neural networks have far more concepts to represent than they have neurons. The superposition hypothesis (Elhage et al. 2022) proposes that models solve this by encoding many features as sparse linear combinations of neuron activations — multiple features share the same neurons, each with a slightly different direction in activation space. This means a single neuron does not correspond to a single interpretable concept. Sparse autoencoders (SAEs) are the current best tool for decomposing these overlapping representations into more monosemantic features. It matters because if features are superposed, a naive 'which neuron is responsible for X' analysis is wrong; SAEs are needed to find the true feature directions." />
      <QA q="Why does Claude have a larger context window than early GPT models and why does it matter?"
         a="Claude 2 (100K, Jul 2023) and Claude 2.1 (200K, Nov 2023) were the first major LLMs to offer context windows this large, made possible by engineering improvements in memory management and positional encoding. It matters for: (1) <strong>Whole-document tasks</strong> — summarising a 200-page report or reviewing an entire codebase without chunking; (2) <strong>Long conversation memory</strong> — the model sees the full conversation history; (3) <strong>Rich few-shot prompting</strong> — hundreds of examples can fit in one prompt. The limitation is cost: 200K tokens costs significantly more per call than 4K, so it is used deliberately rather than by default." />
      <QA q="What is Anthropic's Responsible Scaling Policy (RSP)?"
         a="The RSP is Anthropic's public, self-imposed commitment to conduct specific safety evaluations before training or deploying models that might cross defined capability thresholds. It defines AI Safety Levels (ASL-1 through ASL-4+): each level specifies the capabilities that would trigger it and the safety measures required before proceeding. ASL-2 (current models) requires standard deployment safeguards. ASL-3 requires extensive evaluation and containment before deployment — triggered by capabilities that might provide meaningful uplift to e.g. bioweapons development. The policy is notable because it is concrete and auditable: Anthropic committed to pause development if evaluations fail, not merely to 'take safety seriously'." />
      <QA q="What does it mean for Claude to be 'calibrated' and why is standard benchmarking insufficient?"
         a="Calibration means the model's expressed confidence matches its actual accuracy — a calibrated model that says 'I am 90% confident' should be correct roughly 90% of the time on those claims. Anthropic trains Claude to signal uncertainty explicitly ('I am not sure', 'you should verify this') rather than confabulating plausible-sounding but incorrect answers. Standard benchmark accuracy does not measure calibration: a model can score 90% on MMLU while being confidently wrong on the 10% it misses — which is arguably worse than scoring 80% with appropriate uncertainty on the misses. Calibration is more directly useful than accuracy alone because it tells users when to trust the model." />
    </div>
  );
}

const TABS=[
  {id:"overview",  label:"Overview & Seq2Seq",      sub:"Ch 67 · Five stages, timeline"},
  {id:"encdec",    label:"Stage 1 — Enc-Dec",        sub:"Ch 67.4 · LSTM bottleneck"},
  {id:"attention", label:"Stage 2 — Attention",      sub:"Ch 67.5 · Bahdanau, interactive"},
  {id:"transform", label:"Stage 3 — Transformers",   sub:"Ch 67.6 · Self-attention, GPT/BERT"},
  {id:"transfer",  label:"Stage 4 — Transfer",       sub:"Ch 67.7 · BERT, ULMFiT, fine-tuning"},
  {id:"llms",      label:"Stage 5 — LLMs & ChatGPT", sub:"Ch 67.8–67.9 · Scaling, RLHF"},
  {id:"claude",    label:"Claude & Anthropic",          sub:"CAI · HHH · Model family · Interpretability"},
];

export default function LLMHistory() {
  const [active,setActive]=useState("overview");
  const map={
    overview:<SectionOverview/>,
    encdec:<SectionEncoderDecoder/>,
    attention:<SectionAttention/>,
    transform:<SectionTransformer/>,
    transfer:<SectionTransferLearning/>,
    llms:<SectionLLMs/>,
    claude:<SectionClaude/>,
  };
  
  return (
    <div>
      <div className="page-header">
        <div className="page-header-eyebrow">Deep Learning — Module 15</div>
        <h1 className="page-header-title">From LSTMs to ChatGPT</h1>
        <p className="page-header-subtitle">Ch 67 · Seq2Seq → Attention → Transformer → Transfer Learning → LLMs · Interactive timeline · Attention visualiser · Scaling chart</p>
      </div>

      <SectionNav tabs={TABS} active={active} onChange={setActive} />

      <div style={{ padding: "0.5rem 0 2rem" }}>
        {map[active]}
      </div>

      <NavButtons moduleId={15} />
    </div>
  );
}
