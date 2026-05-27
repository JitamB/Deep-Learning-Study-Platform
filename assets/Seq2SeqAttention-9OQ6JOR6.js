import{r as m,j as e}from"./index-BQO4ci8G.js";import{S as _,N as f,H as n,P as p,T as v,M as x,a as g,Q as l}from"./SectionNav-BDxYvY3P.js";import{N as j}from"./NavButtons-Bz-HQEP4.js";function k({items:t}){return e.jsx("div",{style:{background:"var(--color-background-secondary)",border:"0.5px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-lg)",padding:"1rem 0.75rem",margin:"0.75rem 0",overflowX:"auto"},children:e.jsx("div",{style:{display:"flex",alignItems:"center",gap:0,flexWrap:"nowrap",justifyContent:"center",minWidth:Math.max(480,t.length*110)},children:t.map(({label:a,sub:o,color:r},d)=>e.jsxs("div",{style:{display:"flex",alignItems:"center"},children:[e.jsxs("div",{style:{background:r+"18",border:`1.5px solid ${r}`,borderRadius:"var(--border-radius-md)",padding:"8px 11px",textAlign:"center",minWidth:90},children:[e.jsx("div",{style:{fontSize:12.5,fontWeight:500,color:r},children:a}),o&&e.jsx("div",{style:{fontSize:10.5,color:r,opacity:.8,marginTop:2},children:o})]}),d<t.length-1&&e.jsx("div",{style:{padding:"0 5px",color:"var(--color-text-tertiary)",fontSize:16,flexShrink:0},children:"→"})]},d))})})}function w(){const[t,a]=m.useState(null),o={special:[{tok:"<SOS>",name:"Start of Sequence",color:"#0F6E56",desc:"Fed as the first input to the decoder at inference time. Signals: 'begin generating'. During teacher-forced training, it is the first decoder input before the first target token."},{tok:"<EOS>",name:"End of Sequence",color:"#993C1D",desc:"Appended to the end of every target sentence. The decoder learns to predict this token when the output is complete. Generation stops when <EOS> is sampled. Its loss is included in the training objective."},{tok:"<PAD>",name:"Padding",color:"#888780",desc:"Appended to shorter sequences in a batch so all sequences have the same length for GPU tensor operations. Loss at <PAD> positions is masked out — the model is not penalised for what it predicts at padding positions."},{tok:"<UNK>",name:"Unknown",color:"#854F0B",desc:"Replaces any word not in the vocabulary (rare words, proper nouns, typos). The model learns a generic representation for out-of-vocabulary tokens. Modern systems use subword tokenisation (BPE) to minimise <UNK> occurrences."}]};return e.jsxs("div",{children:[e.jsxs(f,{color:"info",icon:"ti-bulb",children:[e.jsx("strong",{children:"Big picture:"})," Seq2Seq is the architectural template that unifies machine translation, summarisation, speech recognition, and code generation under one framework. The key innovation was realising that both encoder and decoder can be LSTMs — the encoder reads, compresses, the decoder generates."]}),e.jsx(n,{c:"Three challenges of sequence-to-sequence problems"}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,margin:"0.75rem 0"},children:[{n:"1",title:"Variable I/O length",color:"danger",body:"The source and target sequences can have different lengths with no relationship between them. 'Guten Morgen' (2 tokens) → 'Good morning' (2 tokens). 'I love deep learning' (4) → 'J'adore l'apprentissage profond' (4). But 'I love it' (3) → 'Je l'adore' (2). A fixed-size ANN cannot handle this."},{n:"2",title:"No token alignment",color:"warning",body:"In language pairs, word order changes. German: 'Er hat gestern ein Buch gelesen.' (He has yesterday a book read.) → English: 'He read a book yesterday.' Token i in the source does not correspond to token i in the target — a position-indexed ANN is wrong by construction."},{n:"3",title:"Different vocabularies",color:"warning",body:"Source and target languages have completely different vocabulary sets. The encoder must map source tokens to a language-agnostic latent space, and the decoder must map from that space back to the target language vocabulary. A single shared vocabulary makes no linguistic sense."}].map(({n:r,title:d,color:i,body:c})=>e.jsxs("div",{style:{background:`var(--color-background-${i})`,border:`0.5px solid var(--color-border-${i})`,borderRadius:"var(--border-radius-md)",padding:"12px 13px"},children:[e.jsxs("div",{style:{fontFamily:"var(--font-mono)",fontSize:11,color:`var(--color-text-${i})`,marginBottom:4},children:["Challenge ",r]}),e.jsx("div",{style:{fontWeight:500,fontSize:13,color:`var(--color-text-${i})`,marginBottom:6},children:d}),e.jsx("div",{style:{fontSize:12,color:`var(--color-text-${i})`,lineHeight:1.65},children:c})]},r))}),e.jsx(n,{c:"High-level architecture"}),e.jsx(k,{items:[{label:"Source tokens",sub:"x₁ x₂ … xₙ",color:"#185FA5"},{label:"Encoder LSTM",sub:"reads source L→R",color:"#0F6E56"},{label:"Context vector",sub:"h_T (fixed dim)",color:"#993C1D"},{label:"Decoder LSTM",sub:"generates target",color:"#534AB7"},{label:"Target tokens",sub:"y₁ y₂ … yₘ",color:"#185FA5"}]}),e.jsx(n,{c:"Encoder deep dive"}),e.jsx(p,{c:"The encoder is a standard LSTM (or stacked LSTM) that reads the source sequence from left to right. It produces one hidden state per timestep, but only the final hidden state h_T is passed to the decoder as the context vector."}),e.jsx(x,{block:!0,children:`Encoder at each timestep t:
  h_t^enc = LSTM_enc( x_t, h_{t-1}^enc )

After all T source tokens:
  context vector c = h_T^enc   ← entire source compressed here

  c contains:  [h_T,  c_T]    for LSTM (hidden state + cell state)
  Both passed to decoder as initial state

  Shape: (batch_size, hidden_dim)
  Example: batch=32, hidden=512 → c is a 32×512 matrix`}),e.jsxs(f,{color:"warning",icon:"ti-alert-triangle",children:[e.jsx("strong",{children:"The bottleneck:"})," Regardless of whether the source is 5 or 500 tokens, c always has the same shape. Every piece of information the decoder will ever use about the source must fit in hidden_dim floats. This is the fundamental limitation that Attention (Ch 69) solves."]}),e.jsx(n,{c:"Decoder deep dive"}),e.jsx(p,{c:"The decoder is an autoregressive LSTM that generates the target sequence one token at a time. It is initialised with the encoder's context vector and generates until it produces the <EOS> token."}),e.jsx(x,{block:!0,children:`Decoder initialisation:
  h_0^dec  =  h_T^enc     (encoder's final hidden state)
  c_0^dec  =  c_T^enc     (encoder's final cell state)

Decoder at each timestep i:
  h_i^dec  =  LSTM_dec( y_{i-1},  h_{i-1}^dec )
  logits_i =  W_out · h_i^dec  +  b_out       ← (vocab_size,)
  p(y_i)   =  softmax( logits_i )

During training:    y_{i-1} = y_{i-1}^true  (teacher forcing)
During inference:   y_{i-1} = argmax( p(y_{i-1}) )  or sample`}),e.jsx(n,{c:"Special tokens system"}),e.jsx(p,{c:"Click each token to understand its role:"}),e.jsx("div",{style:{display:"flex",gap:8,flexWrap:"wrap",margin:"0.75rem 0"},children:o.special.map(r=>e.jsx("button",{onClick:()=>a(t===r.tok?null:r.tok),style:{padding:"5px 13px",borderRadius:6,border:`1.5px solid ${r.color}`,background:t===r.tok?r.color+"22":"transparent",fontSize:14,fontFamily:"var(--font-mono)",fontWeight:600,color:r.color,cursor:"pointer",transition:"all 0.15s"},children:r.tok},r.tok))}),t&&o.special.filter(r=>r.tok===t).map(r=>e.jsxs("div",{style:{background:r.color+"12",border:`1.5px solid ${r.color}55`,borderRadius:"var(--border-radius-md)",padding:"12px 14px",marginBottom:"0.75rem"},children:[e.jsxs("div",{style:{fontWeight:500,fontSize:13.5,color:r.color,marginBottom:6},children:[r.tok," — ",r.name]}),e.jsx("div",{style:{fontSize:13,color:"var(--color-text-secondary)",lineHeight:1.7},children:r.desc})]},r.tok)),e.jsx(n,{c:"Visual architecture summary — full data flow"}),e.jsxs("div",{style:{overflowX:"auto",border:"0.5px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-lg)",padding:"1rem",margin:"0.75rem 0",background:"var(--color-background-secondary)"},children:[e.jsxs("div",{style:{marginBottom:12},children:[e.jsx("div",{style:{fontSize:11,color:"var(--color-text-tertiary)",textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:6},children:'Encoder (training on "bonjour monde")'}),e.jsxs("div",{style:{display:"flex",gap:6,alignItems:"center",flexWrap:"wrap"},children:[["bonjour","monde","<EOS>"].map((r,d)=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6},children:[e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:4},children:[e.jsx("div",{style:{padding:"3px 8px",borderRadius:4,background:"#E6F1FB",border:"1px solid #185FA5",fontFamily:"var(--font-mono)",fontSize:12,color:"#0C447C"},children:r}),e.jsx("div",{style:{width:1.5,height:10,background:"#185FA5"}}),e.jsxs("div",{style:{padding:"4px 10px",borderRadius:6,background:"#EAF3DE",border:"1px solid #3B6D11",fontSize:11.5,color:"#27500A",fontFamily:"var(--font-mono)"},children:["h_",d+1,"^enc"]})]}),d<2&&e.jsx("div",{style:{color:"var(--color-text-tertiary)",fontSize:14},children:"→"})]},r)),e.jsx("div",{style:{color:"var(--color-text-tertiary)",fontSize:14,padding:"0 4px"},children:"⟶"}),e.jsx("div",{style:{padding:"6px 12px",borderRadius:8,background:"#FAECE7",border:"1.5px solid #993C1D",fontFamily:"var(--font-mono)",fontSize:12.5,fontWeight:500,color:"#712B13"},children:"c = h_T^enc"})]})]}),e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:11,color:"var(--color-text-tertiary)",textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:6},children:'Decoder (target "hello world")'}),e.jsxs("div",{style:{display:"flex",gap:6,alignItems:"center",flexWrap:"wrap"},children:[e.jsx("div",{style:{padding:"6px 12px",borderRadius:8,background:"#FAECE7",border:"1.5px solid #993C1D",fontFamily:"var(--font-mono)",fontSize:12,color:"#712B13"},children:"c"}),e.jsx("div",{style:{color:"var(--color-text-tertiary)",fontSize:14},children:"→"}),["<SOS>→hello","hello→world","world→<EOS>"].map((r,d)=>{const[i,c]=r.split("→");return e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:5},children:[e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:3},children:[e.jsx("div",{style:{padding:"2px 7px",borderRadius:4,background:"#EEEDFE",border:"1px solid #534AB7",fontFamily:"var(--font-mono)",fontSize:11,color:"#3C3489"},children:i}),e.jsx("div",{style:{width:1.5,height:8,background:"#534AB7"}}),e.jsxs("div",{style:{padding:"3px 8px",borderRadius:4,background:"#EEEDFE",border:"1px solid #534AB7",fontFamily:"var(--font-mono)",fontSize:11.5,fontWeight:500,color:"#3C3489"},children:["→ ",c]})]}),d<2&&e.jsx("div",{style:{color:"var(--color-text-tertiary)",fontSize:13,marginLeft:3},children:"→"})]},d)})]})]})]}),e.jsx(n,{c:"Interview Q&A"}),e.jsx(l,{q:"Why does the encoder pass both h_T and c_T to the decoder, not just h_T?",a:"In an LSTM, the hidden state h_T is the 'working memory' — a filtered, task-relevant summary. The cell state c_T is the 'long-term memory' — a less processed version that may contain raw information that was gated out of h_T. If you only pass h_T, the decoder starts with half of the encoder's final state. For short sequences this rarely matters; for longer sequences c_T can carry crucial information about the beginning of the source that was partially forgotten in h_T due to the forget gate. Sutskever et al. (2014) passed both; it is now standard practice."}),e.jsx(l,{q:"What problem does <EOS> solve that <SOS> alone cannot?",a:"<code><SOS></code> tells the decoder where to <em>start</em>. Without <code><EOS></code>, the decoder has no learned signal for when to <em>stop</em> — it would generate indefinitely. <code><EOS></code> is included as a training target token: the model learns to predict it with high probability once the translation is complete. At inference, generation halts when <code><EOS></code> is the argmax output. Without it, you'd need a heuristic stopping criterion (e.g. max length), which produces incomplete or runaway translations."}),e.jsx(l,{q:"What is the information bottleneck and why does sequence length make it worse?",a:"The context vector c = h_T^enc has a fixed dimension (e.g. 512 floats) regardless of source length. For a 5-token sentence, 512 floats provides ~100 floats per token — plenty. For a 100-token sentence, 512 floats provides ~5 floats per token — severe compression. The LSTM's forget gate means early tokens' information is progressively overwritten as later tokens are processed. Empirically, BLEU score for basic Seq2Seq drops significantly for sentences longer than ~30 tokens. This is the exact problem attention was designed to fix."})]})}const y={tgt:["My","name","is","Claude","<EOS>"]};function T(){const[t,a]=m.useState("tf"),[o,r]=m.useState(0),d=["My","name","is","Claude","<EOS>"],i=["My","name","was","something","random"],c=t==="tf"?d:i,u=t==="tf"?["<SOS>","My","name","is","Claude"]:["<SOS>",...i.slice(0,4)];return e.jsxs("div",{style:{border:"0.5px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-lg)",overflow:"hidden",margin:"0.75rem 0"},children:[e.jsx("div",{style:{display:"flex",borderBottom:"0.5px solid var(--color-border-tertiary)"},children:[{id:"tf",label:"Teacher Forcing (training)"},{id:"fr",label:"Free Running (inference)"}].map(s=>e.jsx("button",{onClick:()=>{a(s.id),r(0)},style:{flex:1,padding:"9px 0",border:"none",background:t===s.id?"var(--color-background-info)":"transparent",color:t===s.id?"var(--color-text-info)":"var(--color-text-secondary)",fontWeight:t===s.id?500:400,fontSize:13,cursor:"pointer",borderRight:s.id==="tf"?"0.5px solid var(--color-border-tertiary)":"none"},children:s.label},s.id))}),e.jsxs("div",{style:{padding:"1rem",borderBottom:"0.5px solid var(--color-border-tertiary)"},children:[e.jsx("div",{style:{fontSize:11,color:"var(--color-text-tertiary)",marginBottom:8,textTransform:"uppercase",letterSpacing:"0.07em"},children:"Decoder input → prediction at each step"}),e.jsx("div",{style:{display:"flex",gap:6,flexWrap:"wrap"},children:u.map((s,h)=>e.jsxs("div",{onClick:()=>r(h),style:{display:"flex",flexDirection:"column",alignItems:"center",gap:4,cursor:"pointer"},children:[e.jsx("div",{style:{padding:"4px 9px",borderRadius:5,background:h===o?"var(--color-background-success)":"var(--color-background-secondary)",border:`1.5px solid ${h===o?"var(--color-border-success)":"var(--color-border-tertiary)"}`,fontFamily:"var(--font-mono)",fontSize:12.5,fontWeight:500,color:h===o?"var(--color-text-success)":"var(--color-text-primary)",transition:"all 0.15s"},children:t==="tf"?h===0?"<SOS>":y.tgt[h-1]:s}),e.jsx("div",{style:{width:1.5,height:10,background:"var(--color-border-secondary)"}}),e.jsx("div",{style:{padding:"3px 7px",borderRadius:4,background:"var(--color-background-info)",border:"1px solid var(--color-border-info)",fontSize:11,color:"var(--color-text-info)"},children:"LSTM"}),e.jsx("div",{style:{width:1.5,height:10,background:"var(--color-border-secondary)"}}),e.jsx("div",{style:{padding:"4px 9px",borderRadius:5,background:h===o?"var(--color-background-danger)":"var(--color-background-secondary)",border:`1.5px solid ${h===o?"var(--color-border-danger)":"var(--color-border-tertiary)"}`,fontFamily:"var(--font-mono)",fontSize:12.5,fontWeight:500,color:h===o?"var(--color-text-danger)":"var(--color-text-primary)",transition:"all 0.15s"},children:c[h]})]},h))})]}),e.jsx("div",{style:{padding:"11px 15px"},children:t==="tf"?e.jsxs("div",{children:[e.jsxs("div",{style:{fontWeight:500,fontSize:13.5,color:"var(--color-text-primary)",marginBottom:5},children:["Step ",o+1,": input = ",e.jsx("code",{style:{fontFamily:"var(--font-mono)",background:"var(--color-background-secondary)",padding:"1px 5px",borderRadius:3},children:o===0?"<SOS>":y.tgt[o-1]})," → predict ",e.jsx("code",{style:{fontFamily:"var(--font-mono)",background:"var(--color-background-secondary)",padding:"1px 5px",borderRadius:3},children:d[o]})]}),e.jsxs("div",{style:{fontSize:13,color:"var(--color-text-secondary)",lineHeight:1.7},children:["The decoder receives the ",e.jsx("strong",{children:"ground-truth"})," previous token regardless of what it predicted. Even if it made an error at step ",o,", step ",o+1," still sees the correct token. This prevents error cascading during training and provides cleaner gradient signals."]})]}):e.jsxs("div",{children:[e.jsxs("div",{style:{fontWeight:500,fontSize:13.5,color:"var(--color-text-primary)",marginBottom:5},children:["Step ",o+1,": input = ",e.jsx("code",{style:{fontFamily:"var(--font-mono)",background:"var(--color-background-secondary)",padding:"1px 5px",borderRadius:3},children:u[o]})," → predict ",e.jsx("code",{style:{fontFamily:"var(--font-mono)",background:"var(--color-background-secondary)",padding:"1px 5px",borderRadius:3},children:i[o]})]}),e.jsxs("div",{style:{fontSize:13,color:"var(--color-text-secondary)",lineHeight:1.7},children:["The decoder receives its ",e.jsx("strong",{children:"own previous prediction"})," as the next input. If it predicted wrong at step ",o,", that error cascades — step ",o+1," sees bad input and is likely to produce another error. This is the ",e.jsx("em",{children:"exposure bias"})," problem: training used teacher forcing, but inference uses free running."]})]})})]})}function S(){return e.jsxs("div",{children:[e.jsx(n,{c:"Dataset preparation and tokenisation"}),e.jsx(p,{c:"Before any model sees data, the parallel corpus (source sentence, target sentence pairs) must be preprocessed into a uniform format."}),e.jsx(g,{children:`import tensorflow as tf
from tensorflow import keras
import numpy as np

# ── 1. Build vocabularies ─────────────────────────────────────────────
def build_vocab(sentences, max_vocab=10000):
    # Count word frequencies and keep top-k
    from collections import Counter
    counts = Counter(word for s in sentences for word in s.split())
    vocab = ["<PAD>","<SOS>","<EOS>","<UNK>"] + \\
            [w for w,_ in counts.most_common(max_vocab-4)]
    return {w:i for i,w in enumerate(vocab)}, vocab

src_word2idx, src_vocab = build_vocab(source_sentences)
tgt_word2idx, tgt_vocab = build_vocab(target_sentences)

# ── 2. Encode sentences ───────────────────────────────────────────────
def encode(sentence, word2idx, add_eos=True):
    unk = word2idx["<UNK>"]
    ids = [word2idx.get(w, unk) for w in sentence.split()]
    if add_eos: ids.append(word2idx["<EOS>"])
    return ids

# ── 3. Pad to uniform length ──────────────────────────────────────────
src_seqs = keras.preprocessing.sequence.pad_sequences(
    [encode(s, src_word2idx, add_eos=False) for s in source_sentences],
    padding="post", value=src_word2idx["<PAD>"]
)
tgt_seqs = keras.preprocessing.sequence.pad_sequences(
    [encode(s, tgt_word2idx) for s in target_sentences],
    padding="post", value=tgt_word2idx["<PAD>"]
)

# Decoder input  = [<SOS>, y_1, y_2, …, y_{m-1}]  (shift right)
# Decoder target = [y_1,   y_2, …, y_m,   <EOS>]  (shift left)
dec_inputs  = np.hstack([
    np.full((len(tgt_seqs),1), tgt_word2idx["<SOS>"]),
    tgt_seqs[:, :-1]
])
dec_targets = tgt_seqs`}),e.jsx(n,{c:"Teacher forcing — interactive visualiser"}),e.jsx(p,{c:"Click any step to inspect it. Toggle between training mode (teacher forcing) and inference mode (free running) to see the exposure bias problem."}),e.jsx(T,{}),e.jsx(n,{c:"Loss calculation — masked cross-entropy"}),e.jsx(p,{c:"The total loss sums cross-entropy over every decoder step. Critically, PAD positions must be masked out — the model should not be penalised for predictions at padding tokens."}),e.jsx(x,{block:!0,children:`Total loss per sentence:
  L = -1/m  Σ_{i=1}^{m}  mask_i · log p( y_i^true | y_{<i}, c )

where:
  m        = target sequence length (excluding PAD)
  mask_i   = 1 if y_i != <PAD>,  else 0
  p(y_i)   = softmax( W_out · h_i^dec )

Batch loss:
  L_batch  = mean over batch of per-sentence losses
  (each sentence weighted equally, not each token)`}),e.jsx(g,{children:`# Masked sparse categorical cross-entropy
def masked_loss(y_true, y_pred, pad_idx=0):
    loss_fn = tf.keras.losses.SparseCategoricalCrossentropy(
        from_logits=True, reduction="none"
    )
    loss = loss_fn(y_true, y_pred)          # (batch, seq_len)
    mask = tf.cast(y_true != pad_idx, tf.float32)   # 0 at PAD
    loss = loss * mask                      # zero out PAD positions
    return tf.reduce_sum(loss) / tf.reduce_sum(mask)  # mean over non-PAD`}),e.jsx(n,{c:"Backpropagation through the encoder-decoder"}),e.jsx(p,{c:"BPTT runs through the decoder first, then the encoder. The gradients from the decoder's loss must flow all the way back through the encoder to update the encoder's weights — through the context vector bottleneck."}),e.jsx(x,{block:!0,children:`Gradient flow path:
  L (total loss)
    → ∂L/∂W_out      (output projection weights)
    → ∂L/∂h_i^dec    (decoder hidden states, step i)
    → BPTT through decoder LSTM (back through i timesteps)
    → ∂L/∂h_0^dec    (= ∂L/∂c = ∂L/∂h_T^enc)
    → BPTT through encoder LSTM (back through T timesteps)
    → ∂L/∂W_enc, ∂L/∂W_x^enc  (encoder weights)

Key bottleneck: ∂L/∂h_T^enc is a single vector (hidden_dim,)
  All gradient signal for the entire encoder passes through
  this single vector — gradient compression matches info compression`}),e.jsx(n,{c:"Complete training loop"}),e.jsx(g,{children:`# ── Full Keras training setup ────────────────────────────────────────
HIDDEN = 256; EMBED = 128; BATCH = 64; EPOCHS = 30

# Build model (encoder-decoder with teacher forcing)
enc_in   = keras.Input(shape=(None,))
enc_emb  = keras.layers.Embedding(len(src_vocab), EMBED)(enc_in)
enc_out, enc_h, enc_c = keras.layers.LSTM(HIDDEN, return_state=True)(enc_emb)

dec_in   = keras.Input(shape=(None,))
dec_emb  = keras.layers.Embedding(len(tgt_vocab), EMBED)(dec_in)
dec_lstm = keras.layers.LSTM(HIDDEN, return_sequences=True, return_state=True)
dec_out, _, _ = dec_lstm(dec_emb, initial_state=[enc_h, enc_c])
dec_dense = keras.layers.Dense(len(tgt_vocab))   # logits (no softmax — handled by loss)
output   = dec_dense(dec_out)

model = keras.Model([enc_in, dec_in], output)
model.compile(
    optimizer=keras.optimizers.Adam(learning_rate=1e-3, clipnorm=5.0),
    loss=masked_loss,
)
# clipnorm=5.0 prevents exploding gradients common in deep seq2seq

# Callbacks
callbacks = [
    keras.callbacks.ReduceLROnPlateau(monitor="val_loss", patience=3, factor=0.5),
    keras.callbacks.EarlyStopping(monitor="val_loss", patience=8, restore_best_weights=True),
]
history = model.fit(
    [src_seqs, dec_inputs], dec_targets,
    batch_size=BATCH, epochs=EPOCHS,
    validation_split=0.1, callbacks=callbacks,
)`}),e.jsx(n,{c:"Key training insights"}),e.jsx(v,{heads:["Issue","Symptom","Solution"],rows:[["Exploding gradients","NaN loss within first few batches","clipnorm=1.0 to 5.0 on the optimizer"],["Vanishing gradients (long seq)","Encoder weights learn very slowly","Use LSTM (not SimpleRNN), deep stacking"],["Slow convergence","Loss barely decreases after epoch 5","Reduce LR on plateau, check learning rate schedule"],["Overfitting","Train loss << val loss","Dropout on LSTM (both dropout and recurrent_dropout)"],["Exposure bias","Good BLEU on short outputs, poor on long","Scheduled sampling: gradually replace teacher forcing with free running"],["OOM on GPU","CUDA out of memory","Reduce batch size, use gradient accumulation"]]}),e.jsx(n,{c:"Interview Q&A"}),e.jsx(l,{q:"What is teacher forcing and what is the exposure bias it creates?",a:"<strong>Teacher forcing:</strong> during training, the decoder receives the ground-truth previous token y_{i-1}^true as its input at each step, regardless of its own prediction. This prevents error cascading — a wrong prediction at step 3 does not corrupt step 4's input — and produces cleaner, more informative gradients.<br/><br/><strong>Exposure bias:</strong> at inference, there are no ground-truth tokens — the decoder uses its own previous output. But during training it never saw this situation (it always received correct inputs). This mismatch means errors compound at inference in a way the training procedure never modelled. The model is 'exposed' to a different input distribution during training vs inference. Mitigations: scheduled sampling (gradually replace ground-truth tokens with model predictions during training), REINFORCE-based training, or minimum risk training."}),e.jsx(l,{q:"Why must PAD tokens be masked in the loss and what happens if they are not?",a:"<code><PAD></code> tokens are added to make sequences in a batch the same length — they carry no linguistic meaning. If PAD positions are included in the loss, the model receives a gradient signal telling it to predict <code><PAD></code> at those positions. Since shorter sequences have more PAD tokens, the loss would be dominated by padding, the model would overfit to predicting <code><PAD></code>, and true vocabulary predictions would receive proportionally less gradient signal. Masking sets the loss to zero at PAD positions: the model is neither rewarded nor penalised for what it predicts there."}),e.jsx(l,{q:"Why is gradient clipping especially important for encoder-decoder training?",a:"Gradients in an encoder-decoder must travel through the full decoder LSTM (m timesteps) plus the full encoder LSTM (T timesteps) — a total of m+T LSTM steps. For a translation pair with 20-token source and 20-token target, gradients traverse 40 recurrent steps. Even with LSTM's cell state, the product of 40 Jacobians can occasionally produce large gradient norms — especially early in training when weights are random. A single large gradient update can destabilise the model. Gradient clipping by norm (clip the gradient vector to have norm ≤ threshold) prevents this while preserving the gradient's direction."})]})}function E(){const[t,a]=m.useState(3),o={step0:[["My",.6],["I",.25],["The",.15]],step1_My:[["My name",.38],["My life",.14],["My heart",.08]],step1_I:[["I am",.12],["I have",.08],["I need",.05]],step1_The:[["The cat",.06],["The dog",.05],["The man",.04]]};return e.jsxs("div",{children:[e.jsx(n,{c:"Improvement 1 — embeddings over one-hot encoding"}),e.jsx(p,{c:"The original Seq2Seq used one-hot vectors as token representations. This has two problems: (1) vectors are sparse and high-dimensional (vocab_size = 30,000+ zeros + 1 one); (2) all tokens are equidistant — 'cat' and 'kitten' have the same cosine distance as 'cat' and 'democracy'. Learned embeddings fix both."}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,margin:"0.75rem 0"},children:[e.jsxs("div",{style:{background:"var(--color-background-danger)",border:"0.5px solid var(--color-border-danger)",borderRadius:"var(--border-radius-md)",padding:"12px 13px"},children:[e.jsx("div",{style:{fontWeight:500,fontSize:13,color:"var(--color-text-danger)",marginBottom:6},children:"One-hot (bad)"}),e.jsx(g,{children:`# vocab_size = 10,000
# "cat" = [0,0,...,1,...,0]  # 9,999 zeros
# "dog" = [0,0,...,0,...,1]  # different position
# cos("cat","dog") = cos("cat","democracy") = 0
# All semantically different — no geometry`})]}),e.jsxs("div",{style:{background:"var(--color-background-success)",border:"0.5px solid var(--color-border-success)",borderRadius:"var(--border-radius-md)",padding:"12px 13px"},children:[e.jsx("div",{style:{fontWeight:500,fontSize:13,color:"var(--color-text-success)",marginBottom:6},children:"Embedding (good)"}),e.jsx(g,{children:`# Learned dense vectors (dim=128)
# "cat"  ≈ [0.3, -0.1, 0.8, ...]
# "dog"  ≈ [0.4, -0.2, 0.7, ...]  # similar to cat
# "king" - "man" + "woman" ≈ "queen"
# Geometric semantic relationships!`})]})]}),e.jsxs(f,{color:"info",icon:"ti-info-circle",children:["Embedding layers in Keras are trainable lookup tables — effectively a Dense layer without bias or activation applied to a one-hot vector. ",e.jsx("code",{children:"Embedding(10000, 128)"})," stores a 10,000 × 128 matrix; integer token IDs index rows directly (no matrix multiply needed)."]}),e.jsx(n,{c:"Improvement 2 — deep (stacked) LSTMs"}),e.jsx(p,{c:"Stacking LSTM layers in the encoder and decoder dramatically increases representational capacity. Layer 1 learns token-level patterns; layer 2 learns phrase-level patterns; layer 3 learns sentence-level structure."}),e.jsx(x,{block:!0,children:`Layer 1:  h_t^(1) = LSTM_1( x_t,          h_{t-1}^(1) )
Layer 2:  h_t^(2) = LSTM_2( h_t^(1),     h_{t-1}^(2) )
Layer 3:  h_t^(3) = LSTM_3( h_t^(2),     h_{t-1}^(3) )

Context vector from deep encoder:
  c = [ h_T^(1), h_T^(2), h_T^(3) ]   → initialise all decoder layers

Sutskever et al. used 4 layers each, hidden_dim=1000
 → +2.2 BLEU over a 1-layer model on WMT English-French`}),e.jsx(g,{children:`# Deep encoder-decoder in Keras
n_layers = 4; HIDDEN = 256

# Encoder — stack with return_state=True on each layer
enc_in  = keras.Input(shape=(None,))
x = keras.layers.Embedding(src_vocab_size, 128)(enc_in)
enc_states = []
for i in range(n_layers):
    return_seq = True   # all layers pass sequence to next layer
    lstm = keras.layers.LSTM(HIDDEN, return_sequences=return_seq, return_state=True)
    x, h, c = lstm(x)
    enc_states.extend([h, c])   # collect all (h,c) pairs

# Decoder — initialise each layer with corresponding encoder state
dec_in = keras.Input(shape=(None,))
x = keras.layers.Embedding(tgt_vocab_size, 128)(dec_in)
for i in range(n_layers):
    lstm = keras.layers.LSTM(HIDDEN, return_sequences=True, return_state=True)
    x, _, _ = lstm(x, initial_state=enc_states[i*2:(i+1)*2])`}),e.jsx(n,{c:"Improvement 3 — input sequence reversal"}),e.jsx(p,{c:"Sutskever et al.'s key engineering insight: feed the source sequence to the encoder in reverse order. 'bonjour monde' becomes 'monde bonjour'."}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,margin:"0.75rem 0"},children:[e.jsxs("div",{style:{border:"0.5px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",padding:"12px 13px"},children:[e.jsx("div",{style:{fontWeight:500,fontSize:13,color:"var(--color-text-primary)",marginBottom:6},children:"Without reversal"}),e.jsxs("p",{style:{fontSize:12.5,color:"var(--color-text-secondary)",lineHeight:1.65,margin:"0 0 8px"},children:["Source: ",e.jsx("code",{style:{fontFamily:"var(--font-mono)"},children:"x₁ x₂ x₃ x₄"})," → encoder → c = h₄"]}),e.jsx("p",{style:{fontSize:12.5,color:"var(--color-text-secondary)",lineHeight:1.65,margin:0},children:"x₁ was processed T−1 = 3 steps before c is formed. Its information has been through 3 rounds of LSTM gating and may be largely forgotten. Decoder starts generating y₁ which often depends on x₁ — but x₁ is weakest in c."})]}),e.jsxs("div",{style:{background:"var(--color-background-success)",border:"0.5px solid var(--color-border-success)",borderRadius:"var(--border-radius-md)",padding:"12px 13px"},children:[e.jsx("div",{style:{fontWeight:500,fontSize:13,color:"var(--color-text-success)",marginBottom:6},children:"With reversal"}),e.jsxs("p",{style:{fontSize:12.5,color:"var(--color-text-success)",lineHeight:1.65,margin:"0 0 8px"},children:["Source reversed: ",e.jsx("code",{style:{fontFamily:"var(--font-mono)",color:"inherit"},children:"x₄ x₃ x₂ x₁"})," → encoder → c = h₄"]}),e.jsx("p",{style:{fontSize:12.5,color:"var(--color-text-success)",lineHeight:1.65,margin:0},children:"Now x₁ is the most recent token — freshest in c. The decoder starts with y₁ which depends on x₁, and x₁ is strongest. Short-range dependencies (beginning of source → beginning of target) get the best gradient paths. Sutskever: −4.7 perplexity, +4.2 BLEU."})]})]}),e.jsx(g,{children:`# Reversing the source — one line in data preprocessing
src_reversed = src_seqs[:, ::-1]   # flip along time axis
# Train with src_reversed instead of src_seqs
# No architecture change needed`}),e.jsx(n,{c:"Inference — greedy vs beam search"}),e.jsx(p,{c:"At inference, greedy decoding picks argmax at each step. Beam search maintains the top-k most probable partial sequences and picks the best complete sequence."}),e.jsx(x,{block:!0,children:`Greedy:  y_i = argmax_v p(v | y_{<i}, c)
  Fast but suboptimal — local maxima trap
  Example: 'My name is' → picks 'Claude' even if 'Claude Monet' would score higher overall

Beam search (width k):
  Maintain k candidate sequences ("beams") at each step
  At step i: each beam expands to vocab_size candidates
  Keep top-k by cumulative log probability
  Score: log P(y_1,...,y_m) = Σ_i log p(y_i | y_{<i}, c)
  Length normalise: score / m^α  (α≈0.6 prevents short-sequence bias)`}),e.jsxs("div",{style:{border:"0.5px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-lg)",padding:"1rem",margin:"0.75rem 0"},children:[e.jsxs("div",{style:{display:"flex",gap:10,alignItems:"center",marginBottom:10,fontSize:13},children:[e.jsx("span",{style:{color:"var(--color-text-secondary)"},children:"Beam width k:"}),e.jsx("input",{type:"range",min:1,max:5,value:t,onChange:r=>a(+r.target.value),style:{flex:1}}),e.jsx("span",{style:{fontFamily:"var(--font-mono)",fontSize:12,color:"var(--color-text-primary)",minWidth:16},children:t})]}),e.jsxs("div",{style:{fontSize:12,color:"var(--color-text-tertiary)",marginBottom:8},children:["Top-",t," beams after step 1 (showing top 3 expansions per beam at step 2):"]}),e.jsx("div",{style:{overflowX:"auto"},children:e.jsx("div",{style:{display:"flex",gap:12,minWidth:320},children:o.step0.slice(0,t).map(([r,d],i)=>e.jsxs("div",{style:{flex:1,minWidth:110},children:[e.jsxs("div",{style:{padding:"5px 10px",borderRadius:6,background:"var(--color-background-info)",border:"1.5px solid var(--color-border-info)",fontFamily:"var(--font-mono)",fontSize:13,fontWeight:500,color:"var(--color-text-info)",marginBottom:5,textAlign:"center"},children:[r," ",e.jsxs("span",{style:{fontSize:10.5,fontWeight:400},children:["(p=",d,")"]})]}),(o[`step1_${r}`]||[]).map(([c,u],s)=>e.jsxs("div",{style:{padding:"3px 8px",borderRadius:4,background:s===0?"var(--color-background-success)":"var(--color-background-secondary)",border:`1px solid ${s===0?"var(--color-border-success)":"var(--color-border-tertiary)"}`,fontFamily:"var(--font-mono)",fontSize:11.5,color:s===0?"var(--color-text-success)":"var(--color-text-secondary)",marginBottom:3,display:"flex",justifyContent:"space-between"},children:[e.jsx("span",{children:c}),e.jsx("span",{style:{opacity:.7},children:u})]},s))]},i))})}),e.jsxs("div",{style:{fontSize:11.5,color:"var(--color-text-tertiary)",marginTop:8},children:["Green = beam that survives into the next step. Beam search keeps top-",t," globally, not top-1 per starting token."]})]}),e.jsx(n,{c:"Interview Q&A"}),e.jsx(l,{q:"Why does beam search outperform greedy decoding and when does it fail?",a:"<strong>Why it outperforms:</strong> greedy decoding is a locally optimal strategy — it picks the most probable next token at each step. But the globally most probable sequence may start with a moderately probable token. Beam search maintains k alternatives and selects the sequence with the highest <em>joint</em> probability. For k=5, typical BLEU improvements over greedy are 2–5 points on translation benchmarks.<br/><br/><strong>When it fails:</strong> (1) <strong>Length bias</strong>: log probabilities are sums — longer sequences always score lower. Length normalisation (divide by m^α) partially fixes this. (2) <strong>Repetition</strong>: beam search has a tendency to repeat phrases in neural MT. N-gram blocking (penalise repeated n-grams) is a common heuristic fix. (3) <strong>Diversity</strong>: beams quickly become near-identical (they all start from the same distribution). Diverse beam search addresses this."}),e.jsx(l,{q:"How does the embedding lookup work mechanically and why is it more efficient than Dense(one_hot)?",a:"An Embedding layer stores a weight matrix E ∈ ℝ^{vocab × dim}. Given an integer token ID i, it returns row i of E: <code>E[i, :]</code>. This is a pure table lookup — O(1) rather than a matrix multiply. The equivalent operation with one-hot encoding would be: one_hot_vector · E, which is O(vocab × dim) arithmetic. For vocab=10,000 and dim=128, that is 1.28 million multiplications vs one memory read. During backpropagation, only the rows corresponding to tokens that appeared in the batch receive gradient updates — sparse gradient flow."}),e.jsx(l,{q:"What is length normalisation in beam search and why is the exponent α < 1?",a:"Beam scores are sums of log probabilities: score(y) = Σ_i log p(y_i). Each term log p(y_i) ≤ 0, so longer sequences always have lower (more negative) raw scores. Without correction, beam search systematically prefers short outputs. Length normalisation divides by m^α where m is the output length. α=1 is too aggressive — it linearly compensates and tends to produce overly long outputs. α=0 is no correction (raw score). Empirically, α≈0.6–0.7 works best for translation. Google's NMT system uses α=0.6 with a coverage penalty to further penalise translations that ignore parts of the source."})]})}function L(){const t=["The","animal","didn't","cross","the","street","because","it","was","too","tired"],[a,o]=m.useState(7),r=[[.05,.05,.04,.04,.04,.04,.04,.05,.04,.04,.05],[.05,.15,.04,.04,.04,.04,.05,.12,.04,.04,.09],[.04,.04,.12,.04,.04,.04,.04,.06,.04,.04,.04],[.04,.04,.04,.15,.04,.1,.04,.04,.04,.05,.04],[.04,.04,.04,.04,.1,.08,.04,.04,.04,.04,.04],[.04,.04,.04,.1,.04,.15,.04,.04,.04,.05,.04],[.04,.04,.04,.04,.04,.04,.18,.06,.04,.04,.04],[.04,.62,.05,.05,.04,.04,.04,.04,.04,.04,.04],[.04,.04,.04,.04,.04,.06,.06,.04,.16,.04,.12],[.04,.04,.04,.04,.04,.04,.04,.05,.04,.18,.09],[.04,.12,.04,.04,.04,.04,.06,.08,.04,.1,.2]],d=r[a]||r[7],i=Math.max.apply(null,d);return e.jsxs("div",{children:[e.jsxs(f,{color:"info",icon:"ti-bulb",children:[e.jsx("strong",{children:"Core insight:"})," A human translator does not read the full source sentence, memorise it perfectly, then translate without looking back. They ",e.jsx("em",{children:"refer back"})," to specific source words while translating each target word. Attention gives the decoder exactly this ability — a soft pointer back to the source at every step."]}),e.jsx(n,{c:"The problem with fixed context"}),e.jsx(p,{c:"No matter how powerful the encoder LSTM, compressing an entire sentence into one vector loses information. Here is what that means for a difficult sentence:"}),e.jsxs("div",{style:{background:"var(--color-background-secondary)",border:"0.5px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",padding:"12px 14px",margin:"0.75rem 0",fontFamily:"var(--font-mono)",fontSize:13.5,lineHeight:2},children:[`"The animal didn't cross the street because `,e.jsx("strong",{style:{color:"var(--color-text-danger)"},children:"it"}),' was too tired."',e.jsxs("div",{style:{fontSize:12,color:"var(--color-text-secondary)",fontFamily:"var(--font-sans)",marginTop:4},children:["What does ",e.jsx("strong",{children:'"it"'})," refer to — the ",e.jsx("em",{children:"animal"})," or the ",e.jsx("em",{children:"street"}),"? A human resolves this by looking back at 'animal' (living things get tired) vs 'street' (streets don't). A Seq2Seq decoder has only c — a fixed-size vector — to work with."]})]}),e.jsx(p,{c:"Attention fixes this by letting the decoder look directly at the encoder hidden state for 'animal' when processing 'it'. Click any source word below to see which words the model attends to:"}),e.jsxs("div",{style:{border:"0.5px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-lg)",padding:"1rem",margin:"0.75rem 0"},children:[e.jsx("div",{style:{fontSize:11,color:"var(--color-text-tertiary)",marginBottom:10,textTransform:"uppercase",letterSpacing:"0.07em"},children:"Click a word to see its attention distribution over the full sentence"}),e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:6,marginBottom:14},children:t.map(function(c,u){var s=a===u;return e.jsx("button",{onClick:function(){o(u)},style:{padding:"5px 11px",borderRadius:6,border:s?"1.5px solid #185FA5":"1.5px solid var(--color-border-secondary)",background:s?"#E6F1FB":"transparent",fontFamily:"var(--font-mono)",fontSize:13,fontWeight:s?600:400,color:s?"#0C447C":"var(--color-text-primary)",cursor:"pointer",transition:"all 0.15s"},children:c},u)})}),e.jsx("div",{style:{display:"flex",gap:5,alignItems:"flex-end",height:"90px"},children:t.map(function(c,u){var s=d[u]/i,h=Math.max(3,Math.round(s*68)),b=.18+s*.82;return e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:3,flex:1},children:[e.jsx("div",{style:{width:"100%",height:String(h)+"px",background:"rgba(24,95,165,"+b.toFixed(2)+")",borderRadius:"2px 2px 0 0",transition:"all 0.3s"}}),e.jsx("div",{style:{fontSize:9,color:"var(--color-text-tertiary)",fontFamily:"var(--font-mono)",textAlign:"center",overflow:"hidden",maxWidth:"100%",whiteSpace:"nowrap"},children:c})]},u)})}),a===7&&e.jsx("div",{style:{marginTop:8,fontSize:12.5,color:"var(--color-text-info)",background:"var(--color-background-info)",padding:"6px 10px",borderRadius:5},children:'"it" strongly attends to "animal" (62%) — the coreference the fixed context vector cannot reliably capture.'}),e.jsx("div",{style:{marginTop:12,display:"flex",gap:4,flexWrap:"wrap"},children:t.map(function(c,u){var s=Math.round(d[u]*100),h=a===u;return e.jsxs("div",{style:{padding:"2px 7px",borderRadius:4,background:h?"#E6F1FB":"var(--color-background-secondary)",border:h?"1px solid #185FA5":"0.5px solid var(--color-border-tertiary)",fontSize:11,fontFamily:"var(--font-mono)",color:h?"#0C447C":"var(--color-text-secondary)"},children:[c,": ",s,"%"]},u)})})]}),e.jsx(n,{c:"The human translation analogy"}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,margin:"0.75rem 0"},children:[e.jsxs("div",{style:{border:"0.5px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",padding:"12px 13px"},children:[e.jsx("div",{style:{fontWeight:500,fontSize:13.5,color:"var(--color-text-primary)",marginBottom:7},children:"How humans translate"}),e.jsxs("p",{style:{fontSize:12.5,color:"var(--color-text-secondary)",lineHeight:1.7,margin:0},children:["A professional translator reads the source once to understand context, then translates word by word. They ",e.jsx("em",{children:"glance back"}),' at specific source words: when writing "tired", they look at "animal" to confirm it is the subject. They do not rely purely on memory of the whole sentence.']})]}),e.jsxs("div",{style:{background:"var(--color-background-success)",border:"0.5px solid var(--color-border-success)",borderRadius:"var(--border-radius-md)",padding:"12px 13px"},children:[e.jsx("div",{style:{fontWeight:500,fontSize:13.5,color:"var(--color-text-success)",marginBottom:7},children:"How attention translates"}),e.jsx("p",{style:{fontSize:12.5,color:"var(--color-text-success)",lineHeight:1.7,margin:0},children:`At each decoder step, attention computes a soft distribution over all source positions. The weighted sum c = sum(alpha_j * h_j^enc) acts as a focused look at the relevant source words. When generating "tired", alpha puts high weight on "animal". This is a learned, differentiable version of the translator's glance-back.`})]})]}),e.jsx(n,{c:"Interview Q&A"}),e.jsx(l,{q:"Why is attention described as solving the 'information bottleneck' rather than just improving the encoder?",a:"The bottleneck is structural, not a capacity problem. Even if you use a 4096-dim hidden state, the context vector is still a <em>single fixed-size vector</em> — information from all T source positions must coexist in this one vector. Attention changes the architecture: instead of a single vector, the decoder has access to <em>all T encoder hidden states</em> at every step. The context c_i is now a dynamic, query-dependent weighted combination of T vectors. The decoder chooses which encoder states to read at each step. This is not improving compression — it is bypassing compression entirely."}),e.jsx(l,{q:"Is attention a replacement for the encoder and decoder, or an addition to them?",a:"An addition, not a replacement. In Bahdanau's original formulation, the encoder is still a bidirectional LSTM and the decoder is still an LSTM. Attention adds a third component: an alignment model that computes attention weights at each decoder step, and a mechanism to form the dynamic context vector c_i from those weights. The encoder still runs and produces all hidden states h_1^enc through h_T^enc; the decoder still runs an LSTM. Attention adds a trainable bridge between them. The Transformer eventually replaced the LSTMs entirely — but attention was first used as an add-on to the existing Seq2Seq architecture."})]})}function W(){const t=[{title:"Notation setup",eq:`Source encoder states (bidirectional LSTM):
  h_j^enc  ∈ ℝ^{2H}   for j = 1, …, T_src   (fwd + bwd concat)

Decoder hidden states:
  s_i      ∈ ℝ^H       for i = 1, …, T_tgt   (decoder step)

We want: at decoder step i, how relevant is encoder state j?
  → compute alignment score  e_{i,j}  for every (i, j) pair`,color:"info"},{title:"Alignment score e_{i,j}",eq:`Bahdanau uses a small feedforward network (the alignment model):

  e_{i,j} = v_a^T · tanh( W_a · s_{i-1}  +  U_a · h_j^enc )

Where:
  s_{i-1} ∈ ℝ^H       decoder state BEFORE step i
  h_j^enc ∈ ℝ^{2H}    encoder state at source position j
  W_a     ∈ ℝ^{d×H}   learned weight for decoder state
  U_a     ∈ ℝ^{d×2H}  learned weight for encoder state
  v_a     ∈ ℝ^d        learned scoring vector
  d = attention_dim    (hyperparameter, typically H or H/2)

Note: U_a · h_j^enc can be precomputed for all j
  → only W_a · s_{i-1} changes at each decoder step`,color:"success"},{title:"Attention weights α_{i,j}",eq:`Softmax over all source positions:

  α_{i,j} = exp(e_{i,j}) / Σ_{k=1}^{T_src} exp(e_{i,k})

Properties:
  α_{i,j} ∈ (0, 1)                 always positive
  Σ_j α_{i,j} = 1                  sums to 1 (probability distribution)
  "Soft alignment": every source position contributes

The matrix A ∈ ℝ^{T_tgt × T_src} where A[i,j] = α_{i,j}
  is the soft alignment matrix — visualisable!
  Near-diagonal for related language pairs.
  Off-diagonal for reordering (SOV → SVO languages).`,color:"warning"},{title:"Context vector c_i",eq:`Weighted sum of encoder hidden states:

  c_i = Σ_{j=1}^{T_src}  α_{i,j} · h_j^enc

  c_i ∈ ℝ^{2H}    (same dim as encoder states)
  c_i is different at EVERY decoder step i
  "Soft read" over the source — differentiable and trainable

For the Bahdanau example "it" → "animal":
  α_{i, pos(animal)} ≈ 0.62    (strong alignment)
  α_{i, pos(street)} ≈ 0.04    (weak alignment)
  c_i ≈ 0.62 · h_{animal}^enc + 0.04 · h_{street}^enc + …`,color:"danger"},{title:"Decoder update with attention",eq:`Bahdanau decoder at step i:

  input_i = concat( y_{i-1},  c_i )          ← c_i appended to input
  s_i = LSTM( input_i,  s_{i-1} )
  output_i = W_out · concat( s_i,  c_i ) + b  ← c_i also appended to output
  p(y_i) = softmax( output_i )

Note: c_i is used TWICE — at input AND at output projection
  → richer conditioning on source at every prediction step

Total new parameters added by attention:
  W_a: d × H
  U_a: d × 2H
  v_a: d
  Total: d(3H+1)  ← small compared to LSTM weights O(H²)`,color:"purple"}],[a,o]=m.useState(0),r=t[a],d={info:"var(--color-background-info)",success:"var(--color-background-success)",warning:"var(--color-background-warning)",danger:"var(--color-background-danger)",purple:"var(--color-background-secondary)"};return e.jsxs("div",{children:[e.jsx(n,{c:"Mathematical notation setup"}),e.jsx(p,{c:"Step through the complete mathematical derivation of the Bahdanau attention mechanism — from raw encoder states to the dynamic context vector fed into the decoder:"}),e.jsxs("div",{style:{border:"0.5px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-lg)",overflow:"hidden",margin:"0.75rem 0"},children:[e.jsx("div",{style:{display:"flex",borderBottom:"0.5px solid var(--color-border-tertiary)",overflowX:"auto"},children:t.map((i,c)=>e.jsxs("button",{onClick:()=>o(c),style:{background:c===a?d[i.color]:"transparent",border:"none",borderRight:"0.5px solid var(--color-border-tertiary)",padding:"7px 13px",cursor:"pointer",fontSize:12.5,whiteSpace:"nowrap",color:c===a?`var(--color-text-${i.color})`:"var(--color-text-secondary)",fontWeight:c===a?500:400,flexShrink:0},children:["Step ",c+1]},c))}),e.jsxs("div",{style:{padding:"0.85rem 1.1rem",background:"#1E1E1E"},children:[e.jsx("div",{style:{fontSize:11,color:"#888",marginBottom:6,textTransform:"uppercase",letterSpacing:"0.07em"},children:r.title}),e.jsx("pre",{style:{margin:0,fontFamily:"var(--font-mono)",fontSize:"12.5px",lineHeight:1.7,overflowX:"auto",color:"#D4D4D4",whiteSpace:"pre"},children:r.eq})]}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",padding:"7px 13px",borderTop:"0.5px solid var(--color-border-tertiary)",background:"var(--color-background-secondary)"},children:[e.jsx("button",{onClick:()=>o(i=>Math.max(0,i-1)),disabled:a===0,style:{background:"none",border:"0.5px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",padding:"4px 12px",cursor:a===0?"default":"pointer",fontSize:13,color:a===0?"var(--color-text-tertiary)":"var(--color-text-secondary)"},children:"← prev"}),e.jsxs("span",{style:{fontSize:12,color:"var(--color-text-tertiary)",alignSelf:"center",fontFamily:"var(--font-mono)"},children:[a+1,"/",t.length]}),e.jsx("button",{onClick:()=>o(i=>Math.min(t.length-1,i+1)),disabled:a===t.length-1,style:{background:"none",border:"0.5px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",padding:"4px 12px",cursor:a===t.length-1?"default":"pointer",fontSize:13,color:a===t.length-1?"var(--color-text-tertiary)":"var(--color-text-secondary)"},children:"next →"})]})]}),e.jsx(n,{c:"Complete Keras attention implementation"}),e.jsx(g,{children:`import tensorflow as tf
from tensorflow import keras

class BahdanauAttention(keras.layers.Layer):
    def __init__(self, attention_dim):
        super().__init__()
        self.W_a = keras.layers.Dense(attention_dim, use_bias=False)  # decoder state
        self.U_a = keras.layers.Dense(attention_dim, use_bias=False)  # encoder states
        self.v_a = keras.layers.Dense(1, use_bias=False)              # scoring

    def call(self, decoder_state, encoder_states):
        # decoder_state: (batch, H) = s_{i-1}
        # encoder_states: (batch, T_src, 2H) = all h_j^enc
        # Expand decoder state for broadcasting: (batch, 1, H)
        dec_expanded = tf.expand_dims(decoder_state, 1)

        # score: (batch, T_src, attn_dim) → (batch, T_src, 1) → (batch, T_src)
        score = self.v_a(
            tf.nn.tanh(self.W_a(dec_expanded) + self.U_a(encoder_states))
        )
        score = tf.squeeze(score, axis=-1)           # (batch, T_src)

        # Attention weights: (batch, T_src)
        alpha = tf.nn.softmax(score, axis=-1)

        # Context vector: (batch, 2H)
        context = tf.reduce_sum(
            tf.expand_dims(alpha, -1) * encoder_states,  # (batch, T_src, 2H)
            axis=1
        )
        return context, alpha    # return alpha for visualisation


# Usage in decoder step
attention = BahdanauAttention(attention_dim=256)

# Inside decoder loop at step i:
context, alpha = attention(prev_decoder_state, encoder_all_states)
# context: (batch, 512) — the c_i vector
# alpha:   (batch, T_src) — soft alignment weights for visualisation

decoder_input = tf.concat([y_prev_embedding, context], axis=-1)
decoder_out, new_h, new_c = decoder_lstm(
    tf.expand_dims(decoder_input, 1),
    initial_state=[prev_h, prev_c]
)`}),e.jsx(n,{c:"Experimental results — Bahdanau (2015)"}),e.jsx(v,{heads:["Model","WMT'14 EN-FR BLEU","Notes"],rows:[["RNNsearch-50 (attention)","28.45","Trained on sentences ≤ 50 words — state-of-the-art at the time"],["RNNenc-50 (no attention)","26.75","Same architecture without attention"],["RNNsearch-30 → long","Degrades gracefully","Still competitive on sentences > 50 words"],["RNNenc-30 → long","Degrades sharply","BLEU drops ~10 points on long sentences without attention"],["Moses (statistical MT)","33.30","Phrase-based SMT benchmark; attention began closing the gap"]]}),e.jsx(n,{c:"Interview Q&A"}),e.jsx(l,{q:"Why does Bahdanau use s_{i-1} (before the update) rather than s_i (after the update) in the alignment score?",a:"The decoder hidden state s_i at step i is computed <em>using</em> the context vector c_i. If you used s_i in the alignment score to compute c_i, you would have a circular dependency: c_i = f(s_i) and s_i = f(c_i). Using s_{i-1} (the state before the current step) breaks this cycle — it is available before c_i is computed. Luong attention uses s_i precisely because Luong reverses the order: compute s_i from the input alone (without context), then use s_i to compute attention and c_i as a post-hoc refinement of the output. Both approaches are valid; they just represent different choices about where in the computation graph to inject the attention context."}),e.jsx(l,{q:"What is the soft alignment matrix and what does it tell you?",a:"The soft alignment matrix A ∈ ℝ^{T_tgt × T_src} has A[i,j] = α_{i,j} — the attention weight from decoder step i to encoder position j. Each row sums to 1 (it is a probability distribution over source positions). Visualising this matrix as a heatmap is a powerful interpretability tool: for aligned language pairs (English-French) the matrix is near-diagonal (target word i mostly attends to source word i). For language pairs with different word orders (German-English, where verbs appear at sentence-end in German but mid-sentence in English), the matrix shows clear crossing patterns. This was one of the first visualisable interpretability windows into NMT."}),e.jsx(l,{q:"What is the computational cost of Bahdanau attention and how is it optimised?",a:"At each of the T_tgt decoder steps, attention must compute scores against all T_src encoder states: O(T_src × attention_dim) per step, O(T_src × T_tgt × attention_dim) total. The key optimisation: U_a · h_j^enc (the encoder projection) is <em>independent of the decoder step</em> and can be precomputed once for all j before decoding begins. Only W_a · s_{i-1} (the decoder projection) must be recomputed at each step. This reduces the per-step cost from O(T_src × 3 × attention_dim) to O(T_src × attention_dim) for the scoring, with the encoder projection precomputed. In practice, attention adds about 15–30% overhead to Seq2Seq training time — a worthwhile trade for the BLEU improvement."})]})}function q(){const[t,a]=m.useState("both");return e.jsxs("div",{children:[e.jsxs(f,{color:"info",icon:"ti-flag",children:[e.jsx("strong",{children:"Papers:"}),' Bahdanau, Cho & Bengio. "Neural Machine Translation by Jointly Learning to Align and Translate." ICLR 2015. Luong, Pham & Manning. "Effective Approaches to Attention-based Neural Machine Translation." EMNLP 2015.']}),e.jsx(n,{c:"High-level difference"}),e.jsx(p,{c:"Both mechanisms compute a dynamic context vector by attending over encoder states. The differences are: (1) when in the decoder step the attention is computed, (2) how the alignment score is calculated, and (3) how the context is used."}),e.jsx("div",{style:{display:"flex",gap:6,marginBottom:"0.85rem"},children:[{id:"both",label:"Side-by-side"},{id:"bah",label:"Bahdanau only"},{id:"luo",label:"Luong only"}].map(o=>e.jsx("button",{onClick:()=>a(o.id),style:{padding:"5px 12px",borderRadius:"var(--border-radius-md)",border:"0.5px solid "+(t===o.id?"var(--color-border-info)":"var(--color-border-tertiary)"),background:t===o.id?"var(--color-background-info)":"transparent",fontSize:13,color:t===o.id?"var(--color-text-info)":"var(--color-text-secondary)",cursor:"pointer",fontWeight:t===o.id?500:400},children:o.label},o.id))}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:t==="both"?"1fr 1fr":"1fr",gap:14,margin:"0.75rem 0"},children:[(t==="both"||t==="bah")&&e.jsxs("div",{style:{border:"0.5px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-lg)",overflow:"hidden"},children:[e.jsxs("div",{style:{padding:"10px 14px",background:"var(--color-background-info)",borderBottom:"0.5px solid var(--color-border-info)"},children:[e.jsx("div",{style:{fontWeight:500,fontSize:14,color:"var(--color-text-info)"},children:"Bahdanau Attention"}),e.jsx("div",{style:{fontSize:11.5,color:"var(--color-text-info)",opacity:.85},children:"Additive / MLP attention (2015)"})]}),e.jsx("div",{style:{padding:"12px 14px",background:"#1E1E1E"},children:e.jsx("pre",{style:{margin:0,fontFamily:"var(--font-mono)",fontSize:"12px",lineHeight:1.7,color:"#D4D4D4",whiteSpace:"pre"},children:`# Step 1: score BEFORE decoder update
e_{i,j} = v_a^T tanh(
    W_a · s_{i-1}   +   U_a · h_j^enc
)
# Uses s_{i-1} — state BEFORE step i

# Step 2: softmax
α_{i,j} = softmax_j(e_{i,j})

# Step 3: context
c_i = Σ_j α_{i,j} · h_j^enc

# Step 4: decode — c_i used as INPUT
s_i = LSTM( concat(y_{i-1}, c_i),  s_{i-1} )

# Step 5: output
ŷ_i = softmax( W · concat(s_i, c_i) + b )`})}),e.jsxs("div",{style:{padding:"10px 14px",fontSize:12.5,color:"var(--color-text-secondary)",lineHeight:1.7},children:[e.jsx("strong",{style:{color:"var(--color-text-primary)"},children:"Scoring function:"})," small feedforward network (MLP). More expressive but slower — requires a tanh and two matrix multiplies per (i,j) pair.",e.jsx("br",{}),e.jsx("br",{}),e.jsx("strong",{style:{color:"var(--color-text-primary)"},children:"When:"})," attention before decoder update (uses s_","{i-1}","). Context c_i is used as ",e.jsx("em",{children:"input"})," to the LSTM."]})]}),(t==="both"||t==="luo")&&e.jsxs("div",{style:{border:"0.5px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-lg)",overflow:"hidden"},children:[e.jsxs("div",{style:{padding:"10px 14px",background:"var(--color-background-success)",borderBottom:"0.5px solid var(--color-border-success)"},children:[e.jsx("div",{style:{fontWeight:500,fontSize:14,color:"var(--color-text-success)"},children:"Luong Attention"}),e.jsx("div",{style:{fontSize:11.5,color:"var(--color-text-success)",opacity:.85},children:"Multiplicative / dot-product attention (2015)"})]}),e.jsx("div",{style:{padding:"12px 14px",background:"#1E1E1E"},children:e.jsx("pre",{style:{margin:0,fontFamily:"var(--font-mono)",fontSize:"12px",lineHeight:1.7,color:"#D4D4D4",whiteSpace:"pre"},children:`# Step 1: decode WITHOUT attention first
s_i = LSTM( y_{i-1},  s_{i-1} )
# Uses s_i — state AFTER decoder update

# Step 2: score (three variants)
# dot:     e_{i,j} = s_i · h_j^enc
# general: e_{i,j} = s_i · W_a · h_j^enc
# concat:  e_{i,j} = v_a tanh(W_a [s_i; h_j^enc])

# Step 3: softmax
α_{i,j} = softmax_j(e_{i,j})

# Step 4: context
c_i = Σ_j α_{i,j} · h_j^enc

# Step 5: output — c_i used at OUTPUT only
ỹ_i = tanh( W_c · concat(c_i, s_i) )
ŷ_i = softmax( W_out · ỹ_i + b )`})}),e.jsxs("div",{style:{padding:"10px 14px",fontSize:12.5,color:"var(--color-text-secondary)",lineHeight:1.7},children:[e.jsx("strong",{style:{color:"var(--color-text-primary)"},children:"Scoring functions:"})," dot (cheapest, requires same dim), general (most common, adds W_a), concat (similar to Bahdanau).",e.jsx("br",{}),e.jsx("br",{}),e.jsx("strong",{style:{color:"var(--color-text-primary)"},children:"When:"})," attention after decoder update (uses s_","{i}","). Context c_i is used at ",e.jsx("em",{children:"output"})," only — the LSTM runs clean, attention refines the prediction."]})]})]}),e.jsx(n,{c:"Comprehensive comparison"}),e.jsx(v,{heads:["Dimension","Bahdanau","Luong"],rows:[["Paper year","ICLR 2015","EMNLP 2015"],["Scoring function","Additive: v^T tanh(W_a s + U_a h)","Dot / General / Concat (3 variants)"],["Decoder state used","s_{i-1} (before LSTM update at step i)","s_i (after LSTM update at step i)"],["How context is used","Concatenated with y_{i-1} as LSTM input","Concatenated with s_i at output layer"],["Parameter count","W_a (d×H) + U_a (d×2H) + v (d)","W_a (H×H) for 'general'; zero for 'dot'"],["Computational cost","Higher: tanh + 2 matmuls per (i,j)","Lower: 1 matmul (general) or dot product"],["Requires same dim?","No — W_a and U_a can bridge different dims","Dot requires H_dec = H_enc; General adds W_a"],["Bidirectional encoder?","Yes (original paper uses biLSTM)","Both work; original uses unidirectional"],["BLEU on EN-DE WMT","Competitive baseline","Slightly better, faster training"],["Legacy / modern use","Conceptual foundation; BERT's attention differs","Luong's 'general' score ≈ Transformer's QK^T/√d"]]}),e.jsx(n,{c:"Luong's three scoring functions — details"}),e.jsx(x,{block:!0,children:`dot:     e_{i,j} = s_i · h_j^enc
  → requires dim(s_i) = dim(h_j^enc)
  → no learned parameters
  → fastest; works well when dims match

general: e_{i,j} = s_i^T · W_a · h_j^enc
  → W_a ∈ ℝ^{H_dec × H_enc}
  → one learned matrix — bridges different dims
  → Luong's best-performing variant
  → direct precursor to Transformer's Q·K^T

concat:  e_{i,j} = v_a^T · tanh( W_a · concat(s_i, h_j^enc) )
  → similar to Bahdanau but uses s_i not s_{i-1}
  → slower than dot/general, rarely preferred`}),e.jsx(n,{c:"Full Keras seq2seq with Luong attention"}),e.jsx(g,{children:`class LuongAttention(keras.layers.Layer):
    def __init__(self, hidden_dim):
        super().__init__()
        self.W_a = keras.layers.Dense(hidden_dim, use_bias=False)  # 'general' variant

    def call(self, decoder_state, encoder_states):
        # decoder_state:  (batch, H)         = s_i (AFTER LSTM update)
        # encoder_states: (batch, T_src, H)  = all h_j^enc
        # Transform decoder state: (batch, H) → (batch, H, 1)
        s = tf.expand_dims(self.W_a(decoder_state), axis=-1)

        # Scores: (batch, T_src, H) · (batch, H, 1) = (batch, T_src, 1)
        scores = tf.matmul(encoder_states, s)
        scores = tf.squeeze(scores, axis=-1)         # (batch, T_src)

        alpha = tf.nn.softmax(scores, axis=-1)       # (batch, T_src)

        # Context: (batch, H)
        context = tf.reduce_sum(
            encoder_states * tf.expand_dims(alpha, -1), axis=1
        )
        return context, alpha


# ── Complete Luong decoder step ────────────────────────────────────
class LuongDecoder(keras.layers.Layer):
    def __init__(self, vocab_size, embed_dim, hidden_dim):
        super().__init__()
        self.embed     = keras.layers.Embedding(vocab_size, embed_dim)
        self.lstm      = keras.layers.LSTMCell(hidden_dim)
        self.attention = LuongAttention(hidden_dim)
        self.W_c       = keras.layers.Dense(hidden_dim, activation="tanh")
        self.W_out     = keras.layers.Dense(vocab_size)

    def call(self, y_prev, prev_state, encoder_states):
        emb = self.embed(y_prev)
        # Step 1: LSTM update WITHOUT attention
        _, [h, c] = self.lstm(emb, prev_state)

        # Step 2: attention on updated state s_i = h
        context, alpha = self.attention(h, encoder_states)

        # Step 3: output via attended state
        attended = self.W_c(tf.concat([h, context], axis=-1))
        logits   = self.W_out(attended)
        return logits, [h, c], alpha`}),e.jsx(n,{c:"Connection to Transformers"}),e.jsx(p,{c:"Luong's 'general' scoring function is the direct conceptual precursor to the Transformer's scaled dot-product attention:"}),e.jsx(x,{block:!0,children:`Luong general:       e_{i,j} = s_i^T · W_a · h_j^enc

Transformer (QKV):   e_{i,j} = (W_Q · x_i)^T · (W_K · x_j) / √d_k
                            = q_i · k_j / √d_k

Mapping:
  s_i         → query   q_i  = W_Q · x_i
  h_j^enc     → key     k_j  = W_K · x_j
  h_j^enc     → value   v_j  = W_V · x_j
  W_a         → W_Q · W_K^T  (factored into two matrices)
  / √d_k      → scaling factor (Bahdanau/Luong do not scale)

The Transformer generalises attention by:
  1. Removing the LSTM entirely (no sequential dependency)
  2. Applying attention within the same sequence (self-attention)
  3. Using multiple attention heads in parallel
  4. Scaling by 1/√d_k to stabilise softmax gradients`}),e.jsx(n,{c:"Interview Q&A"}),e.jsx(l,{q:"What is the key computational advantage of Luong's dot-product attention over Bahdanau's additive attention?",a:"Bahdanau's score requires: W_a · s_{i-1} + U_a · h_j^enc → tanh → v_a^T → scalar. This involves two dense projections plus a nonlinearity per (i,j) pair. Luong's dot-product score is just s_i · h_j^enc — a single dot product with no additional parameters (for the 'dot' variant). For a sequence of T_src=50 and attention_dim=256, Bahdanau requires ~2×50×256 = 25,600 multiply-adds plus the tanh; Luong requires 50 dot products of dimension H. In practice, Luong's 'general' variant (one extra W_a) trains ~20% faster than Bahdanau while achieving slightly better BLEU. The 'dot' variant is faster still but requires matching encoder/decoder dimensions."}),e.jsx(l,{q:"How does Luong's 'general' scoring function relate to the Transformer's self-attention?",a:"Luong general: e_{i,j} = s_i^T W_a h_j^enc. Transformer: e_{i,j} = (W_Q x_i)^T (W_K x_j) / √d_k = q_i · k_j / √d_k. Mapping: the query q_i = W_Q x_i corresponds to the decoder state s_i; the key k_j = W_K x_j corresponds to the encoder state h_j^enc; the weight W_a in Luong is factored into separate query (W_Q) and key (W_K) projections in the Transformer. The critical additions in the Transformer: (1) the value vector v_j = W_V x_j separates 'what to retrieve' from 'what to attend to'; (2) the 1/√d_k scaling prevents softmax saturation; (3) self-attention applies the same mechanism to the same sequence; (4) multiple heads run in parallel."}),e.jsx(l,{q:"When would you choose Bahdanau over Luong today?",a:"In practice, for new Seq2Seq systems you would almost never use either — you would use a Transformer. But if you are using an RNN-based Seq2Seq (e.g. on edge devices or small datasets where Transformers overfit), Luong's 'general' attention is the pragmatic choice: fewer parameters, faster training, slightly better empirical BLEU. Bahdanau attention is conceptually useful for teaching because it is more explicit about what the alignment model learns, and its additive form is easier to analyse mathematically. The original BERT and GPT also use dot-product attention (Transformer), not additive attention."}),e.jsx(l,{q:"What is the 'alignment quality' insight from the soft alignment matrix?",a:"The soft alignment matrix A[i,j] = α_{i,j} is a T_tgt × T_src matrix where each row is a probability distribution over source positions. When visualised as a heatmap, several patterns emerge: (1) <strong>Near-diagonal</strong> (related languages like EN-FR): target word i mostly attends to source word i — roughly monotonic alignment; (2) <strong>Off-diagonal blocks</strong> (EN-DE, EN-JA): verb phrases appear in different positions; the matrix shows systematic crossing patterns corresponding to grammatical reordering; (3) <strong>Diffuse rows</strong>: function words (<EOS>, 'the', 'a') tend to spread attention over many source positions — they don't anchor to specific source tokens; (4) <strong>Sharp rows</strong>: content words (nouns, verbs) tend to have peaked α — they align strongly to their translation equivalent. This was the first interpretable view into neural machine translation."})]})}const B=[{id:"encdec",label:"Encoder-Decoder",sub:"Ch 68.1-68.2 · Architecture, tokens"},{id:"training",label:"Training",sub:"Ch 68.3 · Teacher forcing, BPTT"},{id:"improve",label:"Improvements",sub:"Ch 68.4 · Embeddings, deep, reversal"},{id:"attn_int",label:"Attention Intuition",sub:"Ch 69.1 · Bottleneck, analogy"},{id:"attn_math",label:"Attention Math",sub:"Ch 69.2 · e_ij, α_ij, c_i derivation"},{id:"bvsl",label:"Bahdanau vs Luong",sub:"Ch 70 · Comparison, equations, code"}];function z(){const[t,a]=m.useState("encdec"),o={encdec:e.jsx(w,{}),training:e.jsx(S,{}),improve:e.jsx(E,{}),attn_int:e.jsx(L,{}),attn_math:e.jsx(W,{}),bvsl:e.jsx(q,{})};return e.jsxs("div",{children:[e.jsxs("div",{className:"page-header",children:[e.jsx("div",{className:"page-header-eyebrow",children:"Deep Learning — Module 16"}),e.jsx("h1",{className:"page-header-title",children:"Seq2Seq and Attention"}),e.jsx("p",{className:"page-header-subtitle",children:"Ch 68–70 · Architecture · Teacher forcing · Beam search · Attention math · Interactive alignment visualiser · Bahdanau vs Luong comparison"})]}),e.jsx(_,{tabs:B,active:t,onChange:a}),e.jsx("div",{style:{padding:"0.5rem 0 2rem"},children:o[t]}),e.jsx(j,{moduleId:16})]})}export{z as default};
