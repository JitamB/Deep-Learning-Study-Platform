import{r as W,j as e}from"./index-BQO4ci8G.js";import{S as D,P as E,H as d,N as q,M as y,V as P,G as O,a as N,Q as _,C as G,b as M,T as H}from"./SectionNav-BDxYvY3P.js";import{N as X}from"./NavButtons-Bz-HQEP4.js";function K(){const r=W.useRef(null),[g,x]=W.useState(1);return W.useEffect(()=>{const p=r.current;if(!p)return;const o=p.getContext("2d"),C=p.width,L=p.height;o.clearRect(0,0,C,L);const m=Array.from({length:200},(s,f)=>-3+f*6/199),j=s=>C*(s+3)/6,n=(s,f)=>L-10-(L-20)*(s/f),u=m.map(s=>.5*s*s),i=m.map(s=>Math.abs(s)),a=m.map(s=>Math.abs(s)<=g?.5*s*s:g*Math.abs(s)-.5*g*g),w=4.5,l=(s,f,k)=>{o.beginPath(),o.strokeStyle=f,o.lineWidth=2,s.forEach((v,h)=>{const S=j(m[h]),z=n(Math.min(v,w),w);h===0?o.moveTo(S,z):o.lineTo(S,z)}),o.stroke()};o.strokeStyle="rgba(128,128,128,0.15)",o.lineWidth=.5;for(let s=-3;s<=3;s++){const f=j(s);o.beginPath(),o.moveTo(f,0),o.lineTo(f,L),o.stroke()}o.strokeStyle="rgba(128,128,128,0.3)",o.lineWidth=1,o.beginPath(),o.moveTo(j(0),0),o.lineTo(j(0),L),o.stroke(),o.beginPath(),o.moveTo(0,n(0,w)),o.lineTo(C,n(0,w)),o.stroke(),l(u,"#378ADD"),l(i,"#1D9E75"),l(a,"#EF9F27"),o.font="12px var(--font-sans)",[["#378ADD","MSE (0.5e²)"],["#1D9E75","MAE (|e|)"],["#EF9F27",`Huber (δ=${g.toFixed(1)})`]].forEach(([s,f],k)=>{o.fillStyle=s,o.fillText(f,8,18+k*18)}),o.fillStyle="rgba(128,128,128,0.6)",o.fillText("error (e = y − ŷ)",C/2-40,L-3)},[g]),e.jsxs("div",{children:[e.jsx(E,{children:"A loss function measures how wrong a single prediction is. The cost function is its average over all training samples. Both terms are often used interchangeably, but the distinction matters for derivations."}),e.jsxs(q,{color:"info",icon:"ti-scale",children:[e.jsx("strong",{children:"Loss"})," = error for one sample. ",e.jsx("strong",{children:"Cost"})," = average loss over the full dataset. Gradient descent minimizes the cost; backpropagation computes ∂Cost/∂w."]}),e.jsx(d,{children:"Regression losses"}),e.jsx(M,{children:"Mean Squared Error (MSE / L2 loss)"}),e.jsx(y,{block:!0,children:`  L_MSE = (1/2)(y - ŷ)²           (per sample, factor ½ for clean derivative)
  C_MSE = (1/n) Σᵢ (yᵢ - ŷᵢ)²

  Gradient:  ∂C/∂ŷ = -(2/n) Σ (yᵢ - ŷᵢ) = (2/n)(ŷ - y)
  
  Properties:
  ✓ Smooth everywhere — clean gradient
  ✓ Large errors penalized heavily (quadratic growth)
  ✗ Very sensitive to outliers (outlier error² dominates)
  ✗ Units are squared (RMSE is more interpretable)`}),e.jsx(M,{children:"Mean Absolute Error (MAE / L1 loss)"}),e.jsx(y,{block:!0,children:`  L_MAE = |y - ŷ|
  C_MAE = (1/n) Σᵢ |yᵢ - ŷᵢ|

  Gradient:  ∂C/∂ŷ = -(1/n) Σ sign(yᵢ - ŷᵢ)

  Properties:
  ✓ Robust to outliers (linear growth, not quadratic)
  ✓ Units interpretable (same scale as target)
  ✗ Non-differentiable at y = ŷ (subgradient needed)
  ✗ Gradient is constant magnitude — slow near minimum`}),e.jsx(M,{children:"Huber Loss (smooth MAE)"}),e.jsx(y,{block:!0,children:`         ⎧  ½(y-ŷ)²                    if |y-ŷ| ≤ δ   (quadratic zone)
  L_δ = ⎨
         ⎩  δ|y-ŷ| - ½δ²              if |y-ŷ| > δ   (linear zone)

  Gradient:  ∂L/∂ŷ = -(y-ŷ)        in quadratic zone
                    = -δ·sign(y-ŷ)  in linear zone

  Properties:
  ✓ Smooth everywhere (differentiable, even at ±δ)
  ✓ Best of both: MSE for small errors, MAE for large ones
  ✓ δ is a hyperparameter controlling outlier sensitivity
  ✓ Used in Huber regression, Faster R-CNN bounding box loss`}),e.jsxs(P,{children:[e.jsx("canvas",{ref:r,width:560,height:200,style:{display:"block",margin:"0 auto",maxWidth:"100%"}}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"80px 1fr 52px",alignItems:"center",gap:8,marginTop:10,fontSize:12.5,maxWidth:400,margin:"10px auto 0"},children:[e.jsx("span",{style:{color:"var(--color-text-secondary)"},children:"Huber δ"}),e.jsx("input",{type:"range",min:.2,max:3,step:.1,value:g,onChange:p=>x(+p.target.value)}),e.jsx("span",{style:{fontFamily:"var(--font-mono)",fontSize:12,textAlign:"right"},children:g.toFixed(1)})]})]}),e.jsx(d,{children:"Classification losses"}),e.jsx(M,{children:"Binary Cross-Entropy (BCE)"}),e.jsx(y,{block:!0,children:`  For binary labels y ∈ {0, 1},  ŷ = σ(z) ∈ (0,1):

  L_BCE = -[y·log(ŷ) + (1-y)·log(1-ŷ)]

  Gradient w.r.t. ŷ:
    ∂L/∂ŷ = -y/ŷ + (1-y)/(1-ŷ)

  Gradient w.r.t. z (combined with sigmoid derivative — cancels neatly):
    ∂L/∂z = ŷ - y     ← elegant result!

  Why not MSE for classification?
    MSE with sigmoid output → vanishing gradient when ŷ is wrong
    BCE gradient is large exactly when the prediction is very wrong`}),e.jsx(M,{children:"Categorical Cross-Entropy (CCE)"}),e.jsx(y,{block:!0,children:`  For K-class problem, y is one-hot, ŷ = softmax(z):

  L_CCE = -Σₖ yₖ · log(ŷₖ)
         = -log(ŷ_correct)    (since only the true class term survives)

  Example: 3 classes, true label = class 2
    y = [0, 1, 0]   ŷ = [0.1, 0.7, 0.2]
    L = -(0·log0.1 + 1·log0.7 + 0·log0.2)
      = -log(0.7) = 0.3567

  Combined gradient (softmax + CCE):
    ∂L/∂zₖ = ŷₖ - yₖ    ← same elegant form as BCE!
    → gradient vector = predicted - one_hot_true`}),e.jsx(M,{children:"Sparse Categorical Cross-Entropy"}),e.jsx(y,{block:!0,children:`  Same as CCE, but accepts INTEGER labels (not one-hot).
  
  CCE     requires: y = [0, 1, 0, 0]   (one-hot)
  Sparse  requires: y = 1              (integer index)

  Loss computation internally:
    L = -log(ŷ[y_int])   — index into ŷ with the true label

  When to use:
  ✓ Many classes (e.g., 1000 classes) → one-hot wastes memory
  ✓ Default in Keras/TF when passing integer labels to fit()

  In Keras:
    model.compile(loss='categorical_crossentropy')         # one-hot labels
    model.compile(loss='sparse_categorical_crossentropy')  # integer labels`}),e.jsx(d,{children:"When to use which"}),e.jsx(H,{heads:["Task","Loss function","Output activation","Label format"],rows:[["Regression (no outliers)","MSE","Linear","Float"],["Regression (with outliers)","MAE or Huber","Linear","Float"],["Binary classification","Binary Cross-Entropy","Sigmoid","{0,1}"],["Multi-class (one-hot)","Categorical Cross-Entropy","Softmax","One-hot vector"],["Multi-class (integer)","Sparse Categorical CE","Softmax","Integer index"],["Multi-label classification","BCE (per output)","Sigmoid (each)","Binary vector"],["Object detection (bbox)","Huber / Smooth L1","Linear","Float coordinates"]]}),e.jsx(N,{children:`# All major loss functions in Keras/TensorFlow
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
# = (-log(0.7) - log(0.8)) / 2 = (0.3567 + 0.2231)/2 = 0.2899`}),e.jsx(d,{children:"Interview Q&A"}),e.jsx(_,{q:"What is the mathematical reason to prefer BCE over MSE for binary classification?",a:"With a sigmoid output σ(z), MSE loss is L = (y − σ(z))². The gradient ∂L/∂z = −2(y−σ(z))·σ(z)(1−σ(z)). When the prediction is very wrong (e.g. y=1, σ(z)≈0), the term σ(z)(1−σ(z)) ≈ 0 — this is the <em>vanishing gradient</em> problem. Learning stalls exactly when the network is most wrong. With BCE, ∂L/∂z = σ(z) − y, which is large (≈ −1) when σ(z)≈0 and y=1 — the gradient is largest when the prediction is worst. This is why BCE is the principled and practical choice."}),e.jsx(_,{q:"Derive the combined gradient of Categorical Cross-Entropy + Softmax.",a:"L = −Σₖ yₖ log(ŷₖ) where ŷₖ = softmax(z)ₖ = e^{zₖ}/Σⱼe^{zⱼ}. By chain rule: ∂L/∂zₖ = Σⱼ (∂L/∂ŷⱼ)(∂ŷⱼ/∂zₖ). The softmax Jacobian: ∂ŷⱼ/∂zₖ = ŷⱼ(δⱼₖ − ŷₖ). Substituting: ∂L/∂zₖ = −Σⱼ (yⱼ/ŷⱼ)·ŷⱼ(δⱼₖ − ŷₖ) = −Σⱼ yⱼ(δⱼₖ − ŷₖ) = −yₖ + ŷₖΣⱼyⱼ. Since y is one-hot, Σⱼyⱼ=1, giving <strong>∂L/∂zₖ = ŷₖ − yₖ</strong> — the softmax Jacobian complexity completely cancels out."}),e.jsx(_,{q:"What is the difference between from_logits=True and from_logits=False in Keras BCE?",a:"<code>from_logits=True</code> means the model output is the raw pre-activation z (not passed through sigmoid). Keras then internally computes sigmoid and BCE using the numerically stable formula log(1+e^{−z}) rather than log(σ(z)) — avoiding log(0) errors when σ(z) is very close to 0 or 1. <code>from_logits=False</code> expects probability outputs (already passed through sigmoid). Using from_logits=True is recommended whenever possible for numerical stability."})]})}function Q(){const[r,g]=W.useState(0),x=[{title:"Define composition",eq:"L = L(a²),  a² = σ(z²),  z² = W²·a¹ + b²"},{title:"∂L/∂z² (output layer δ)",eq:`∂L/∂z² = ∂L/∂a² · ∂a²/∂z²
       = (a²−y) · σ'(z²)  =  a²−y   [BCE+sigmoid]`},{title:"∂L/∂W² (output weights)",eq:`∂L/∂W² = ∂L/∂z² · ∂z²/∂W²
       = δ² · (a¹)ᵀ`},{title:"∂L/∂a¹ (propagate back)",eq:`∂L/∂a¹ = ∂L/∂z² · ∂z²/∂a¹
       = (W²)ᵀ · δ²`},{title:"∂L/∂z¹ (hidden layer δ)",eq:`∂L/∂z¹ = ∂L/∂a¹ ⊙ f'(z¹)
       = [(W²)ᵀ·δ²] ⊙ σ'(z¹)`},{title:"∂L/∂W¹ (hidden weights)",eq:"∂L/∂W¹ = δ¹ · (a⁰)ᵀ = δ¹ · xᵀ"}];return e.jsxs("div",{children:[e.jsx(E,{children:"Backpropagation is the algorithm that computes ∂Loss/∂w for every weight w in the network. It applies the chain rule of calculus layer-by-layer, starting from the output and moving backward."}),e.jsx(d,{children:"Why 'backward' propagation?"}),e.jsx(E,{children:"The loss depends on the output, which depends on each layer's output, which depends on the weights. To find how loss changes with weight wᵢⱼ, we must traverse this chain of dependencies — in reverse, from output to input."}),e.jsx(d,{children:"The chain rule — the mathematical engine of backprop"}),e.jsx(y,{block:!0,children:`  Chain rule (single variable):
    If L = f(g(x)),  then  dL/dx = dL/dg · dg/dx

  Chain rule (vectors — partial derivatives):
    If L = f(a),  a = g(z),  z = h(w)
    ∂L/∂w = ∂L/∂a · ∂a/∂z · ∂z/∂w
    
  ↑ This is EXACTLY one forward dependency chain in an ANN.
  Each "·" is a matrix multiply (Jacobian × vector).`}),e.jsx(d,{children:"Key notation: the error signal δ⁽ˡ⁾"}),e.jsx(y,{block:!0,children:`  δ⁽ˡ⁾ := ∂L/∂z⁽ˡ⁾    (gradient of loss w.r.t. pre-activation)

  This is the "credit" or "error signal" at layer l.
  It is the most important intermediate quantity in backprop.

  Recurrence (the backprop equation):
    δ⁽ˡ⁾ = (W⁽ˡ⁺¹⁾)ᵀ · δ⁽ˡ⁺¹⁾  ⊙  f'(z⁽ˡ⁾)

  Weight gradient (once we have δ⁽ˡ⁾):
    ∂L/∂W⁽ˡ⁾ = δ⁽ˡ⁾ · (a⁽ˡ⁻¹⁾)ᵀ
    ∂L/∂b⁽ˡ⁾ = δ⁽ˡ⁾

  Output layer (special case, BCE + sigmoid):
    δ⁽ᴸ⁾ = ∂L/∂z⁽ᴸ⁾ = a⁽ᴸ⁾ − y`}),e.jsx(d,{children:"Chain rule traced step-by-step"}),e.jsxs(P,{children:[e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:5,marginBottom:12},children:x.map((p,o)=>e.jsxs("button",{onClick:()=>g(o),style:{padding:"4px 10px",fontSize:11.5,fontWeight:o===r?500:400,border:`0.5px solid var(--color-border-${o===r?"info":"tertiary"})`,borderRadius:"20px",background:o===r?"var(--color-background-info)":"transparent",color:o===r?"var(--color-text-info)":"var(--color-text-secondary)",cursor:"pointer"},children:["Step ",o+1]},o))}),e.jsxs("div",{style:{background:"var(--color-background-primary)",border:"0.5px solid var(--color-border-info)",borderRadius:"var(--border-radius-md)",padding:"1rem"},children:[e.jsx("div",{style:{fontWeight:500,fontSize:13.5,color:"var(--color-text-info)",marginBottom:8},children:x[r].title}),e.jsx("pre",{style:{fontFamily:"var(--font-mono)",fontSize:13,color:"var(--color-text-primary)",whiteSpace:"pre",margin:0,background:"var(--color-background-secondary)",padding:"0.7rem 1rem",borderRadius:"var(--border-radius-md)",lineHeight:1.7},children:x[r].eq})]})]}),e.jsx(d,{children:"Four fundamental equations of backpropagation"}),e.jsx(y,{block:!0,children:`  (BP1)  δ⁽ᴸ⁾ = ∇_a L  ⊙  f'(z⁽ᴸ⁾)         output layer error
  (BP2)  δ⁽ˡ⁾ = (W⁽ˡ⁺¹⁾)ᵀ δ⁽ˡ⁺¹⁾  ⊙  f'(z⁽ˡ⁾)  propagate error backward
  (BP3)  ∂L/∂b⁽ˡ⁾ = δ⁽ˡ⁾                       bias gradient
  (BP4)  ∂L/∂W⁽ˡ⁾ = δ⁽ˡ⁾ (a⁽ˡ⁻¹⁾)ᵀ             weight gradient

  These four equations are all you need.
  BP2 is the recurrence — it propagates δ from output back to input.
  BP3 and BP4 give actual gradients for gradient descent.`}),e.jsx(d,{children:"Computational graph view"}),e.jsx(y,{block:!0,children:`  Forward pass builds a directed graph:
    x → [W¹,b¹] → z¹ → f → a¹ → [W²,b²] → z² → f → a² → L

  Backward pass traverses in REVERSE, computing:
    ← ∂L/∂z¹ ← ∂L/∂a¹ ← ∂L/∂z² ← ∂L/∂a² ← ∂L/∂L=1

  At each node, multiply by the local Jacobian.
  Each weight's gradient is computed once and exactly once.`}),e.jsx(d,{children:"Interview Q&A"}),e.jsx(_,{q:"What is backpropagation and what problem does it solve?",a:"Backpropagation is an efficient algorithm for computing the gradient of the loss with respect to every weight in the network. Without it, computing ∂L/∂wᵢ for each weight independently would require a separate forward pass — O(|W|) passes for |W| weights. Backprop computes all gradients in O(1) passes (one forward + one backward), both having the same computational cost. It achieves this by recognizing that ∂L/∂wᵢⱼ⁽ˡ⁾ can be factored as δ⁽ˡ⁾·a⁽ˡ⁻¹⁾, where δ⁽ˡ⁾ is computed via a backward recurrence that shares computation across all weights in the same layer."}),e.jsx(_,{q:"Why is the chain rule applicable to neural network gradient computation?",a:"A neural network is a composition of differentiable functions: L = loss(f_L(f_{L-1}(...f_1(x)))). Since each layer's output is a function of the previous layer's output (and the layer's weights), the loss is a composition of these functions. The chain rule states that the derivative of a composition equals the product of derivatives of each component. Backprop is simply a systematic application of the chain rule, organized to avoid redundant computation by propagating error signals δ backward."}),e.jsx(_,{q:"What does δ⁽ˡ⁾ = ∂L/∂z⁽ˡ⁾ represent intuitively?",a:"δ⁽ˡ⁾ is the 'error signal' at layer l — it measures how much the loss would change if we directly perturbed the pre-activation z⁽ˡ⁾ at each neuron. A large |δⱼ⁽ˡ⁾| means neuron j in layer l has strong influence on the loss; a near-zero δⱼ⁽ˡ⁾ means it barely affects the loss. The weight gradient ∂L/∂wᵢⱼ⁽ˡ⁾ = δⱼ⁽ˡ⁾ · a_i⁽ˡ⁻¹⁾ combines this error signal with the neuron's input activation — the weight should be updated proportionally to both 'how wrong the neuron is' and 'how strongly it was activated'."})]})}const R=r=>1/(1+Math.exp(-r)),A=r=>R(r)*(1-R(r));function Z(){const[r,g]=W.useState("fwd"),x=[[.1,.4],[.2,.3]],p=[.1,.2],o=[[.3,.2]],C=[.1],L=[.5,.8],m=1,j=.5,n=x.map((c,b)=>c.reduce((T,F,I)=>T+F*L[I],p[b])),u=n.map(R),i=[o[0].reduce((c,b,T)=>c+b*u[T],C[0])],a=[R(i[0])],w=-Math.log(a[0]),l=[a[0]-m],s=[l.map((c,b)=>[c*u[0],c*u[1]])[0]],f=l,k=o[0].map(c=>c*l[0]),v=k.map((c,b)=>c*A(n[b])),h=v.map(c=>L.map(b=>c*b)),S=v,z=x.map((c,b)=>c.map((T,F)=>T-j*h[b][F])),$=o.map((c,b)=>c.map((T,F)=>T-j*s[b][F])),t=c=>c.toFixed(5),B={fwd:{label:"Forward pass",color:"info",content:e.jsxs("div",{children:[e.jsx(E,{children:"Given: x=[0.5, 0.8], y=1 (binary label), learning rate η=0.5"}),e.jsx(y,{block:!0,children:`  ── Layer 1 (hidden, sigmoid) ─────────────────────────
  z¹₁ = 0.1×0.5 + 0.4×0.8 + 0.1 = ${t(n[0])}
  z¹₂ = 0.2×0.5 + 0.3×0.8 + 0.2 = ${t(n[1])}
  
  a¹₁ = σ(${t(n[0])}) = ${t(u[0])}
  a¹₂ = σ(${t(n[1])}) = ${t(u[1])}

  ── Layer 2 (output, sigmoid) ─────────────────────────
  z²  = 0.3×${t(u[0])} + 0.2×${t(u[1])} + 0.1 = ${t(i[0])}
  
  ŷ = a² = σ(${t(i[0])}) = ${t(a[0])}

  ── Loss (BCE, y=1) ───────────────────────────────────
  L = -log(ŷ) = -log(${t(a[0])}) = ${t(w)}`})]})},out:{label:"Output layer δ",color:"warning",content:e.jsxs("div",{children:[e.jsx(E,{children:"The output layer error signal δ² — elegant because BCE + sigmoid derivatives cancel."}),e.jsx(y,{block:!0,children:`  δ² = ∂L/∂z² = a² - y
     = ${t(a[0])} - 1
     = ${t(l[0])}   ← negative because prediction too low

  ∂L/∂W²₁ = δ² · a¹₁ = ${t(l[0])} × ${t(u[0])} = ${t(s[0][0])}
  ∂L/∂W²₂ = δ² · a¹₂ = ${t(l[0])} × ${t(u[1])} = ${t(s[0][1])}
  ∂L/∂b²  = δ²        = ${t(f[0])}`})]})},prop:{label:"Propagate to hidden",color:"warning",content:e.jsxs("div",{children:[e.jsx(E,{children:"Propagate δ² back through W² to get ∂L/∂a¹, then through σ'(z¹) to get δ¹."}),e.jsx(y,{block:!0,children:`  ∂L/∂a¹₁ = W²₁ · δ² = 0.3 × ${t(l[0])} = ${t(k[0])}
  ∂L/∂a¹₂ = W²₂ · δ² = 0.2 × ${t(l[0])} = ${t(k[1])}

  σ'(z¹₁) = σ(${t(n[0])})·(1-σ(${t(n[0])})) = ${t(A(n[0]))}
  σ'(z¹₂) = σ(${t(n[1])})·(1-σ(${t(n[1])})) = ${t(A(n[1]))}

  δ¹₁ = ${t(k[0])} × ${t(A(n[0]))} = ${t(v[0])}
  δ¹₂ = ${t(k[1])} × ${t(A(n[1]))} = ${t(v[1])}`})]})},wgrad:{label:"Hidden layer gradients",color:"success",content:e.jsx("div",{children:e.jsx(y,{block:!0,children:`  ∂L/∂W¹₁₁ = δ¹₁ · x₁ = ${t(v[0])} × 0.5 = ${t(h[0][0])}
  ∂L/∂W¹₁₂ = δ¹₁ · x₂ = ${t(v[0])} × 0.8 = ${t(h[0][1])}
  ∂L/∂W¹₂₁ = δ¹₂ · x₁ = ${t(v[1])} × 0.5 = ${t(h[1][0])}
  ∂L/∂W¹₂₂ = δ¹₂ · x₂ = ${t(v[1])} × 0.8 = ${t(h[1][1])}
  ∂L/∂b¹₁  = δ¹₁        = ${t(S[0])}
  ∂L/∂b¹₂  = δ¹₂        = ${t(S[1])}`})})},update:{label:"Weight update",color:"success",content:e.jsxs("div",{children:[e.jsx(E,{children:"Apply gradient descent: w_new = w_old − η · ∂L/∂w, with η = 0.5"}),e.jsx(y,{block:!0,children:`  W¹ updates (η=0.5):
  W¹₁₁: ${t(x[0][0])} - 0.5×${t(h[0][0])} = ${t(z[0][0])}
  W¹₁₂: ${t(x[0][1])} - 0.5×${t(h[0][1])} = ${t(z[0][1])}
  W¹₂₁: ${t(x[1][0])} - 0.5×${t(h[1][0])} = ${t(z[1][0])}
  W¹₂₂: ${t(x[1][1])} - 0.5×${t(h[1][1])} = ${t(z[1][1])}

  W² updates:
  W²₁: ${t(o[0][0])} - 0.5×${t(s[0][0])} = ${t($[0][0])}
  W²₂: ${t(o[0][1])} - 0.5×${t(s[0][1])} = ${t($[0][1])}`}),e.jsxs(q,{color:"success",icon:"ti-trending-down",children:["New loss after update: run forward pass again with updated weights → loss decreases from ",t(w),"."]})]})}};return e.jsxs("div",{children:[e.jsx(E,{children:"A fully worked numerical example on a 2→2→1 network with all five backpropagation steps computed explicitly."}),e.jsx(q,{color:"info",icon:"ti-settings",children:"Network: x=[0.5, 0.8], y=1 (true class). W¹=[[0.1,0.4],[0.2,0.3]], b¹=[0.1,0.2]. W²=[[0.3,0.2]], b²=[0.1]. Activation: sigmoid throughout."}),e.jsx("div",{style:{display:"flex",gap:6,flexWrap:"wrap",margin:"12px 0"},children:Object.entries(B).map(([c,b])=>e.jsx("button",{onClick:()=>g(c),style:{padding:"6px 14px",fontSize:12.5,fontWeight:c===r?500:400,border:`0.5px solid var(--color-border-${c===r?b.color:"tertiary"})`,borderRadius:"var(--border-radius-md)",background:c===r?`var(--color-background-${b.color})`:"transparent",color:c===r?`var(--color-text-${b.color})`:"var(--color-text-secondary)",cursor:"pointer"},children:b.label},c))}),e.jsx(P,{children:B[r].content}),e.jsx(d,{children:"Full implementation from scratch (NumPy)"}),e.jsx(N,{children:`import numpy as np

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
        print(f"Epoch {epoch:4d} | Loss: {loss:.4f} | Acc: {acc:.3f}")`}),e.jsx(d,{children:"Interview Q&A"}),e.jsx(_,{q:"Walk me through one complete backprop step on a 2-layer network.",a:"(1) Forward pass: z¹=W¹x+b¹, a¹=f(z¹), z²=W²a¹+b², ŷ=a²=f(z²), compute L. (2) Output δ: δ²=a²−y (BCE+sigmoid). (3) Weight gradient at output: ∂L/∂W²=δ²·(a¹)ᵀ, ∂L/∂b²=δ². (4) Propagate back: da¹=(W²)ᵀ·δ², then δ¹=da¹⊙f'(z¹). (5) Hidden weight gradient: ∂L/∂W¹=δ¹·xᵀ, ∂L/∂b¹=δ¹. (6) Update: w←w−η·∂L/∂w. The key insight is that δ is computed once per layer and reused for both weight and bias gradients."}),e.jsx(_,{q:"What is the time complexity of one backpropagation pass and how does it compare to numerical differentiation?",a:"One backprop pass costs O(|W|) — proportional to the total number of weights, same as one forward pass. Numerical differentiation (finite differences: ∂L/∂w ≈ (L(w+ε)−L(w))/ε) requires one forward pass per weight — O(|W|²) total. For a modern network with 10M parameters, backprop costs ~10M FLOPs while numerical differentiation costs ~100T FLOPs. This 10,000× efficiency is why backprop made deep learning practically trainable."})]})}function U(){const r=W.useRef(null),[g,x]=W.useState(.15),[p,o]=W.useState([]),[C,L]=W.useState(!1),m=W.useCallback((i,a)=>.5*(i-1)**2+1.2*(a+.5)**2+.3*Math.sin(3*i)*Math.cos(2*a)*.3,[]),j=W.useCallback((i,a)=>{const l=(m(i+1e-5,a)-m(i-1e-5,a))/2e-5,s=(m(i,a+1e-5)-m(i,a-1e-5))/(2*1e-5);return[l,s]},[m]);W.useEffect(()=>{const i=r.current;if(!i)return;const a=i.getContext("2d"),w=i.width,l=i.height;a.clearRect(0,0,w,l);const s=3.5,f=h=>(h+s)/(2*s)*w,k=h=>l-(h+s)/(2*s)*l,v=60;for(let h=0;h<v;h++)for(let S=0;S<v;S++){const z=-s+h/v*2*s,$=-s+S/v*2*s,t=m(z,$),B=Math.max(0,Math.min(1,1-t/5)),c=Math.round(30+(1-B)*170),b=Math.round(50+B*120),T=Math.round(80+B*140);a.fillStyle=`rgba(${c},${b},${T},0.85)`,a.fillRect(f(z),k($+.12),w/v+1,l/v+1)}a.beginPath(),a.arc(f(1),k(-.5),6,0,Math.PI*2),a.fillStyle="#FFD700",a.fill(),a.strokeStyle="#000",a.lineWidth=1.5,a.stroke(),a.fillStyle="#FFD700",a.font="11px var(--font-sans)",a.fillText("minimum",f(1)+8,k(-.5)+4),p.length>1&&(a.beginPath(),a.strokeStyle="#FFFFFF",a.lineWidth=2,p.forEach(([h,S],z)=>{const $=f(h),t=k(S);z===0?a.moveTo($,t):a.lineTo($,t)}),a.stroke(),p.forEach(([h,S],z)=>{a.beginPath(),a.arc(f(h),k(S),z===0?7:4,0,Math.PI*2),a.fillStyle=z===0?"#FF6B6B":`rgba(255,255,255,${.5+.5*z/p.length})`,a.fill()})),a.fillStyle="rgba(255,255,255,0.7)",a.font="11px var(--font-sans)",a.fillText("w₁ →",w-40,l/2),a.save(),a.translate(12,l/2),a.rotate(-Math.PI/2),a.fillText("w₂ →",0,0),a.restore()},[p,m]);const n=()=>{let i=-2.5,a=2.5;const w=[[i,a]];for(let l=0;l<40;l++){const[s,f]=j(i,a);if(i-=g*s,a-=g*f,w.push([i,a]),Math.abs(s)<1e-4&&Math.abs(f)<1e-4)break}o(w)},u=()=>o([]);return e.jsxs("div",{children:[e.jsx(E,{children:"The WHY behind backpropagation: understanding gradients geometrically, learning rate effects, convergence, and the loss landscape."}),e.jsx(d,{children:"The gradient — direction of steepest ascent"}),e.jsx(y,{block:!0,children:`  For loss L(w₁, w₂, ..., wₙ):

  ∇L = [∂L/∂w₁,  ∂L/∂w₂,  ...,  ∂L/∂wₙ]ᵀ

  The gradient vector points in the direction of STEEPEST INCREASE.
  Gradient descent moves in the OPPOSITE direction:

  w ← w - η · ∇L

  Analogy: you're blindfolded on a hilly landscape.
  The gradient tells you which direction is uphill.
  Gradient descent always steps downhill.`}),e.jsx(d,{children:"Interactive: gradient descent on a 2D loss landscape"}),e.jsxs(P,{children:[e.jsx("canvas",{ref:r,width:440,height:300,style:{display:"block",margin:"0 auto",borderRadius:"var(--border-radius-md)",maxWidth:"100%"}}),e.jsxs("div",{style:{display:"flex",gap:10,justifyContent:"center",marginTop:10,flexWrap:"wrap",alignItems:"center",fontSize:13},children:[e.jsx("span",{style:{color:"var(--color-text-secondary)"},children:"η (learning rate)"}),e.jsx("input",{type:"range",min:.02,max:.8,step:.01,value:g,onChange:i=>{x(+i.target.value),u()},style:{width:120}}),e.jsx("span",{style:{fontFamily:"var(--font-mono)",fontSize:12,minWidth:36},children:g.toFixed(2)}),e.jsx("button",{onClick:n,style:{padding:"5px 14px",background:"var(--color-background-info)",border:"0.5px solid var(--color-border-info)",color:"var(--color-text-info)",borderRadius:"var(--border-radius-md)",cursor:"pointer",fontSize:12.5,fontWeight:500},children:"Run GD from (-2.5, 2.5)"}),e.jsx("button",{onClick:u,style:{padding:"5px 10px",border:"0.5px solid var(--color-border-tertiary)",background:"transparent",color:"var(--color-text-secondary)",borderRadius:"var(--border-radius-md)",cursor:"pointer",fontSize:12.5},children:"Reset"})]}),p.length>0&&e.jsxs("div",{style:{textAlign:"center",marginTop:6,fontSize:12,color:"var(--color-text-secondary)",fontFamily:"var(--font-mono)"},children:["Steps: ",p.length-1," | Final loss: ",m(...p[p.length-1]).toFixed(5)," | w = [",p[p.length-1].map(i=>i.toFixed(3)).join(", "),"]"]})]}),e.jsx(d,{children:"Learning rate effects"}),e.jsx(O,{cols:3,children:[{label:"η too small",color:"warning",items:["Slow convergence (many steps)","Safe, stable updates","Gets stuck in shallow local minima","Computationally expensive","Typical: 1e-5 or lower"]},{label:"η just right",color:"success",items:["Fast, stable convergence","Reaches good minimum","Loss decreases smoothly","Typical: 1e-3 for Adam","Found via LR search or schedule"]},{label:"η too large",color:"danger",items:["Oscillates / diverges","Overshoots the minimum","Loss may increase!","Common: loss goes to NaN","Typical: > 0.1 for most tasks"]}].map(({label:i,color:a,items:w})=>e.jsx(G,{color:a,title:i,children:w.map(l=>e.jsxs("div",{style:{marginBottom:4},children:["• ",l]},l))},i))}),e.jsx(d,{children:"Gradient, derivative, and the loss landscape"}),e.jsx(y,{block:!0,children:`  Derivative (1D intuition):
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
    but SGD noise helps escape them.`}),e.jsx(d,{children:"Convergence criteria"}),e.jsx(y,{block:!0,children:`  Gradient descent converges when:
    ‖∇L‖ < ε    (gradient magnitude below threshold)
    |Lₜ₊₁ - Lₜ| < ε  (loss change below threshold)
    t > T_max   (maximum steps reached)

  Convergence is GUARANTEED for:
  ✓ Convex loss landscapes (e.g., logistic regression)
  ✓ Appropriate learning rate (η ≤ 1/L where L = Lipschitz constant)
  
  NOT guaranteed for:
  ✗ Non-convex landscapes (all deep networks!)
  — but empirically still finds good solutions`}),e.jsx(d,{children:"Learning rate scheduling"}),e.jsx(N,{children:`import tensorflow as tf

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
)`}),e.jsx(d,{children:"Interview Q&A"}),e.jsx(_,{q:"What is a gradient and why does gradient descent minimize the loss?",a:"The gradient ∇L(w) is a vector where each component ∂L/∂wᵢ gives the rate of change of the loss with respect to wᵢ. Mathematically, the gradient points in the direction of steepest increase of the function at the current point. By updating w ← w − η∇L (moving opposite to the gradient), we move in the direction of steepest decrease. For a differentiable loss function, taking small enough steps in this direction is guaranteed to decrease the loss. With a convex loss, this reaches the global minimum; with non-convex losses (all deep networks), it finds a good local minimum or saddle-point neighborhood."}),e.jsx(_,{q:"Why does a high learning rate cause divergence rather than oscillation?",a:"If η is too large, the step size overshoots the minimum — we jump past it to the other side of the loss curve. Since the landscape is often curved (second derivative > 0 near a minimum), the overshoot lands at an even steeper region, causing the next step to be even larger. This compounding effect causes exponentially growing oscillations, which appears in practice as loss going to NaN. The condition for convergence in gradient descent is η < 2/λ_max where λ_max is the largest eigenvalue of the Hessian (curvature matrix) — too large an η violates this."}),e.jsx(_,{q:"Why doesn't the non-convexity of deep learning loss landscapes prevent good training?",a:"Several empirical and theoretical reasons: (1) In high dimensions (millions of weights), almost all critical points are saddle points rather than poor local minima — SGD noise helps escape saddle points. (2) Most local minima in overparameterized networks have similar loss values (Choromanska et al., 2015) — the landscape has many good solutions. (3) SGD's inherent noise from mini-batches prevents getting trapped in sharp minima, often converging to flat minima that generalize better. (4) Modern optimizers (Adam, momentum) navigate non-convex landscapes more effectively than vanilla GD."})]})}function V(){const[r,g]=W.useState(8),x=L=>{let m=0;const j=n=>(m++,n<=1?n:j(n-1)+j(n-2));return{result:j(L),calls:m}},p=L=>{const m={};let j=0;const n=u=>(j++,u in m||(m[u]=u<=1?u:n(u-1)+n(u-2)),m[u]);return{result:n(L),calls:j}},o=x(r),C=p(r);return e.jsxs("div",{children:[e.jsx(E,{children:"Memoization is the practice of caching the results of expensive function calls. In backpropagation, it is what makes the algorithm O(L) rather than O(2^L) — the key insight that makes deep network training tractable."}),e.jsx(d,{children:"What is memoization?"}),e.jsxs(q,{color:"info",icon:"ti-database",children:[e.jsx("strong",{children:"Memoization"})," = store the result of a computation the first time it's computed, then look it up on subsequent requests instead of recomputing. It trades memory for speed."]}),e.jsx(y,{block:!0,children:`  Without memoization:
    compute(n) = compute(n-1) + compute(n-2)   → tree of calls → O(2ⁿ)

  With memoization:
    if n in cache: return cache[n]
    else: cache[n] = compute(n-1) + compute(n-2)  → O(n)

  Same result. Drastically different cost.`}),e.jsx(d,{children:"Fibonacci: a perfect analogy for backprop caching"}),e.jsxs(P,{children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12,marginBottom:12,flexWrap:"wrap",fontSize:13},children:[e.jsx("span",{style:{color:"var(--color-text-secondary)"},children:"Compute Fib(n) where n ="}),e.jsx("input",{type:"range",min:3,max:20,value:r,onChange:L=>g(+L.target.value),style:{width:120}}),e.jsx("span",{style:{fontFamily:"var(--font-mono)",fontSize:12},children:r})]}),e.jsxs(O,{cols:2,children:[e.jsxs("div",{style:{background:"var(--color-background-danger)",border:"0.5px solid var(--color-border-danger)",borderRadius:"var(--border-radius-md)",padding:"12px 14px"},children:[e.jsx("div",{style:{fontWeight:500,fontSize:12.5,color:"var(--color-text-danger)",marginBottom:8},children:"Without memoization"}),e.jsxs("div",{style:{fontFamily:"var(--font-mono)",fontSize:12,color:"var(--color-text-danger)"},children:[e.jsxs("div",{children:["Result: ",o.result]}),e.jsxs("div",{children:["Function calls: ",e.jsx("strong",{children:o.calls.toLocaleString()})]}),e.jsxs("div",{children:["Complexity: O(2ⁿ) = O(",Math.round(2**r).toLocaleString(),")"]})]})]}),e.jsxs("div",{style:{background:"var(--color-background-success)",border:"0.5px solid var(--color-border-success)",borderRadius:"var(--border-radius-md)",padding:"12px 14px"},children:[e.jsx("div",{style:{fontWeight:500,fontSize:12.5,color:"var(--color-text-success)",marginBottom:8},children:"With memoization"}),e.jsxs("div",{style:{fontFamily:"var(--font-mono)",fontSize:12,color:"var(--color-text-success)"},children:[e.jsxs("div",{children:["Result: ",C.result]}),e.jsxs("div",{children:["Function calls: ",e.jsx("strong",{children:C.calls})]}),e.jsxs("div",{children:["Complexity: O(n) = O(",r,")"]})]})]})]})]}),e.jsx(d,{children:"How memoization applies in backpropagation"}),e.jsx(y,{block:!0,children:`  Without memoization — naive repeated differentiation:

  ∂L/∂W¹₁₁  needs  ∂L/∂z¹₁  which needs  ∂L/∂a¹₁  which needs  ∂L/∂z²...
  ∂L/∂W¹₁₂  needs  ∂L/∂z¹₁  (SAME!)  → recomputed!
  ∂L/∂W¹₂₁  needs  ∂L/∂z¹₂  (also needs ∂L/∂z²!)  → recomputed!
  
  For a layer with n neurons, ∂L/∂z⁽ˡ⁾ is recomputed n times.
  For L layers with average width n: O(n × 2^L) total operations.

  With memoization (what backprop actually does):

  Compute δ⁽ˡ⁾ = ∂L/∂z⁽ˡ⁾ ONCE for each layer l.
  Store it (this is exactly self.cache in our implementation!).
  Reuse it for ALL weight gradients ∂L/∂W⁽ˡ⁾_{jk} = δ⁽ˡ⁾_j · a⁽ˡ⁻¹⁾_k.
  
  Total: one δ computation per layer → O(L) passes.`}),e.jsx(d,{children:"The cache in backpropagation is memoization"}),e.jsx(N,{children:`# Every time you do this in forward pass:
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
print(w.grad)      # ∂L/∂w = (σ(z)-1)·x = (σ(6)-1)·3 ≈ -0.0074`}),e.jsx(d,{children:"Multi-layer backprop: the dependency chain"}),e.jsx(y,{block:!0,children:`  Without memoization: to compute ∂L/∂W⁽¹⁾, expand fully:
  
  ∂L/∂W⁽¹⁾ = ∂L/∂a⁽ᴸ⁾ · ∂a⁽ᴸ⁾/∂z⁽ᴸ⁾ · ∂z⁽ᴸ⁾/∂a⁽ᴸ⁻¹⁾ · ... · ∂z⁽¹⁾/∂W⁽¹⁾
  
  Every weight layer shares the SAME prefix of this chain:
    δ⁽ᴸ⁾, δ⁽ᴸ⁻¹⁾, ..., δ⁽²⁾ are the same for ALL weights in layer 1.
  
  With memoization: compute δ⁽ˡ⁾ once per layer, reuse everywhere.
  
  Time complexity comparison (L layers, n neurons, m samples):
    Naive:       O(m · n² · 2^L)    — exponential in depth!
    Backprop:    O(m · n² · L)      — LINEAR in depth ← the magic`}),e.jsx(d,{children:"Interview Q&A"}),e.jsx(_,{q:"What is memoization and why is it essential to backpropagation?",a:"Memoization is caching the result of a computation on first evaluation, then returning the cached value on future requests instead of recomputing. In backpropagation, the gradient ∂L/∂W⁽ˡ⁾ requires δ⁽ˡ⁾ = ∂L/∂z⁽ˡ⁾ for every weight in layer l. Without memoization, δ⁽ˡ⁾ would be recomputed for each weight separately — O(n) times per layer. By computing and caching δ⁽ˡ⁾ once per layer (which itself requires δ⁽ˡ⁺¹⁾ — already cached from the previous backward step), we reduce the total computation from exponential to linear in depth."}),e.jsx(_,{q:"How does PyTorch's autograd relate to memoization?",a:"PyTorch's autograd builds a dynamic computation graph during the forward pass. Each node in the graph stores its inputs (the intermediate tensors) — this is explicit memoization. When .backward() is called, autograd traverses this graph in reverse topological order, computing gradients using stored intermediate values rather than re-running the forward pass. The requires_grad and grad_fn attributes track which tensors need gradients and which function created them. torch.no_grad() disables this storage, saving memory when gradients aren't needed (inference)."}),e.jsx(_,{q:"What is the connection between memoization in backprop and dynamic programming?",a:"Backpropagation is a specific instance of the dynamic programming (DP) paradigm. DP solves problems by breaking them into overlapping subproblems and storing solutions. In backprop: the 'subproblems' are computing δ⁽ˡ⁾ for each layer; they 'overlap' because every weight in layer l shares the same δ⁽ˡ⁾; and memoization stores each δ⁽ˡ⁾ so it's computed once. The backward recurrence δ⁽ˡ⁾ = (W⁽ˡ⁺¹⁾)ᵀδ⁽ˡ⁺¹⁾⊙f'(z⁽ˡ⁾) is exactly the DP recurrence relation. This is why backpropagation is sometimes called 'reverse-mode automatic differentiation' — it's DP applied to the chain rule."})]})}const Y=[{id:"loss",label:"Loss Functions"},{id:"bp1",label:"Backprop: What"},{id:"bp2",label:"Backprop: How"},{id:"bp3",label:"Backprop: Why"},{id:"memo",label:"Memoization"}];function ae(){const[r,g]=W.useState("loss"),x={loss:e.jsx(K,{}),bp1:e.jsx(Q,{}),bp2:e.jsx(Z,{}),bp3:e.jsx(U,{}),memo:e.jsx(V,{})};return e.jsxs("div",{children:[e.jsxs("div",{className:"page-header",children:[e.jsx("div",{className:"page-header-eyebrow",children:"Deep Learning — Module 05"}),e.jsx("h1",{className:"page-header-title",children:"Loss Functions · Backpropagation · Memoization"}),e.jsx("p",{className:"page-header-subtitle",children:"Full mathematical derivations · Numerical traced examples · Interactive gradient descent · Memoization complexity analysis"})]}),e.jsx(D,{tabs:Y,active:r,onChange:g}),e.jsx("div",{style:{padding:"0.5rem 0 2rem"},children:x[r]}),e.jsx(X,{moduleId:5})]})}export{ae as default};
