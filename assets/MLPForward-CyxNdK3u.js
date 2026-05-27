import{r as F,j as e}from"./index-BQO4ci8G.js";import{S as H,P as m,H as s,N as A,M as y,a as M,Q as v,G as T,C,V as U,T as q}from"./SectionNav-BDxYvY3P.js";import{N as X}from"./NavButtons-Bz-HQEP4.js";const O=t=>1/(1+Math.exp(-t)),E=t=>Math.tanh(t);function N({layers:t,activeLayer:l=-1,activeNeuron:r=-1}){Math.max(...t);const a=t.map((h,n)=>60+n*480/(t.length-1)),c=(h,n)=>{const _=Math.min(52,260/h),x=(h-1)*_;return 300/2-x/2+n*_},o=["#185FA5","#0F6E56","#853E0B","#7A2048","#2D2D2D"],d=["Input",...t.slice(1,-1).map((h,n)=>`Hidden ${n+1}`),"Output"];return e.jsxs("svg",{width:"100%",viewBox:"0 0 560 300",role:"img",children:[e.jsx("title",{children:"MLP Architecture Diagram"}),e.jsx("defs",{children:e.jsx("marker",{id:"arr2",viewBox:"0 0 10 10",refX:"8",refY:"5",markerWidth:"5",markerHeight:"5",orient:"auto-start-reverse",children:e.jsx("path",{d:"M2 1L8 5L2 9",fill:"none",stroke:"context-stroke",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})})}),t.slice(0,-1).map((h,n)=>Array.from({length:h},(_,x)=>Array.from({length:t[n+1]},($,k)=>{const L=l===n+1,b=a[n]+14,R=c(h,x),I=a[n+1]-14,B=c(t[n+1],k);return e.jsx("line",{x1:b,y1:R,x2:I,y2:B,stroke:L?"#EF9F27":"rgba(136,135,128,0.2)",strokeWidth:L?1.2:.6,opacity:L?.8:1},`${n}-${x}-${k}`)}))),t.map((h,n)=>Array.from({length:h},(_,x)=>{const $=a[n],k=c(h,x),b=n===l&&(r===-1||r===x);return e.jsxs("g",{children:[e.jsx("circle",{cx:$,cy:k,r:13,fill:b?o[n%o.length]:"var(--color-background-secondary)",stroke:b?o[n%o.length]:"var(--color-border-secondary)",strokeWidth:b?2:.8}),e.jsx("text",{x:$,y:k,textAnchor:"middle",dominantBaseline:"central",style:{fontSize:10,fontFamily:"var(--font-mono)",fill:b?"#fff":"var(--color-text-secondary)",fontWeight:b?500:400},children:n===0?`x${x+1}`:n===t.length-1?"ŷ":`h${x+1}`})]},`${n}-${x}`)})),t.map((h,n)=>e.jsx("text",{x:a[n],y:292,textAnchor:"middle",style:{fontSize:11,fontFamily:"var(--font-sans)",fill:"var(--color-text-tertiary)"},children:d[n]},n))]})}const p=[[.1,.4],[.2,.3],[.5,.1]],j=[.1,.2,.3],z=[[.3,.2,.4]],S=[.1],i=[.5,.8];function G(){const t=p.map((f,a)=>f.reduce((c,o,d)=>c+o*i[d],j[a])),l=t.map(E),r=z.map((f,a)=>f.reduce((c,o,d)=>c+o*l[d],S[a])),u=r.map(O);return{z1:t,a1:l,z2:r,a2:u}}const{z1:w,a1:g,z2:P,a2:W}=G();function D(){const[t,l]=F.useState(0),r=[{title:"Input layer (layer 0)",layer:0,neuron:-1,content:e.jsxs("div",{children:[e.jsx(m,{children:"The input is passed directly as the activation of layer 0 — no computation."}),e.jsx(y,{block:!0,children:`  a⁽⁰⁾ = x = [${i.join(", ")}]
  
  a⁽⁰⁾₁ = x₁ = ${i[0]}   (feature 1)
  a⁽⁰⁾₂ = x₂ = ${i[1]}   (feature 2)`})]})},{title:"Hidden layer pre-activation z⁽¹⁾",layer:1,neuron:-1,content:e.jsxs("div",{children:[e.jsx(m,{children:"Compute the weighted sum for each hidden neuron: z⁽¹⁾ = W⁽¹⁾ · a⁽⁰⁾ + b⁽¹⁾"}),e.jsx(y,{block:!0,children:`  z⁽¹⁾₁ = ${p[0][0]}×${i[0]} + ${p[0][1]}×${i[1]} + ${j[0]}
        = ${(p[0][0]*i[0]).toFixed(3)} + ${(p[0][1]*i[1]).toFixed(3)} + ${j[0]} = ${w[0].toFixed(4)}

  z⁽¹⁾₂ = ${p[1][0]}×${i[0]} + ${p[1][1]}×${i[1]} + ${j[1]}
        = ${(p[1][0]*i[0]).toFixed(3)} + ${(p[1][1]*i[1]).toFixed(3)} + ${j[1]} = ${w[1].toFixed(4)}

  z⁽¹⁾₃ = ${p[2][0]}×${i[0]} + ${p[2][1]}×${i[1]} + ${j[2]}
        = ${(p[2][0]*i[0]).toFixed(3)} + ${(p[2][1]*i[1]).toFixed(3)} + ${j[2]} = ${w[2].toFixed(4)}`})]})},{title:"Hidden layer activation a⁽¹⁾",layer:1,neuron:-1,content:e.jsxs("div",{children:[e.jsx(m,{children:"Apply the activation function element-wise. Here we use tanh."}),e.jsx(y,{block:!0,children:`  a⁽¹⁾ = tanh(z⁽¹⁾)

  a⁽¹⁾₁ = tanh(${w[0].toFixed(4)}) = ${g[0].toFixed(5)}
  a⁽¹⁾₂ = tanh(${w[1].toFixed(4)}) = ${g[1].toFixed(5)}
  a⁽¹⁾₃ = tanh(${w[2].toFixed(4)}) = ${g[2].toFixed(5)}

  tanh(z) = (eᶻ - e⁻ᶻ) / (eᶻ + e⁻ᶻ)    range: (-1, 1)`})]})},{title:"Output layer pre-activation z⁽²⁾",layer:2,neuron:0,content:e.jsxs("div",{children:[e.jsx(m,{children:"Same operation as the hidden layer — weighted sum of hidden activations."}),e.jsx(y,{block:!0,children:`  z⁽²⁾₁ = ${z[0][0]}×${g[0].toFixed(4)} + ${z[0][1]}×${g[1].toFixed(4)} + ${z[0][2]}×${g[2].toFixed(4)} + ${S[0]}
        = ${(z[0][0]*g[0]).toFixed(4)} + ${(z[0][1]*g[1]).toFixed(4)} + ${(z[0][2]*g[2]).toFixed(4)} + ${S[0]}
        = ${P[0].toFixed(5)}`})]})},{title:"Output layer activation ŷ",layer:2,neuron:0,content:e.jsxs("div",{children:[e.jsx(m,{children:"Apply sigmoid to get a probability output for binary classification."}),e.jsx(y,{block:!0,children:`  ŷ = σ(z⁽²⁾) = σ(${P[0].toFixed(4)})
    = 1 / (1 + e^{-${P[0].toFixed(4)}})
    = ${W[0].toFixed(6)}

  Interpretation:
    P(y=1 | x=[${i}]) ≈ ${(W[0]*100).toFixed(1)}%`}),e.jsxs(A,{color:"success",icon:"ti-check",children:["Forward pass complete! The input [0.5, 0.8] maps to output probability ≈ ",(W[0]*100).toFixed(1),"%"]})]})}],u=r[t];return e.jsxs("div",{style:{background:"var(--color-background-secondary)",border:"0.5px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-lg)",padding:"1rem",marginBottom:"1.25rem"},children:[e.jsx("div",{style:{marginBottom:10},children:e.jsx(N,{layers:[2,3,1],activeLayer:u.layer,activeNeuron:u.neuron})}),e.jsx("div",{style:{display:"flex",gap:4,marginBottom:12,flexWrap:"wrap"},children:r.map((f,a)=>e.jsxs("button",{onClick:()=>l(a),style:{padding:"4px 10px",fontSize:11.5,fontWeight:a===t?500:400,border:`0.5px solid var(--color-border-${a===t?"info":"tertiary"})`,borderRadius:"20px",background:a===t?"var(--color-background-info)":"transparent",color:a===t?"var(--color-text-info)":"var(--color-text-secondary)",cursor:"pointer"},children:["Step ",a+1]},a))}),e.jsxs("div",{style:{background:"var(--color-background-primary)",border:"0.5px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",padding:"1rem"},children:[e.jsxs("div",{style:{fontWeight:500,fontSize:14,color:"var(--color-text-primary)",marginBottom:8},children:["Step ",t+1," / ",r.length,": ",u.title]}),u.content]}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginTop:10},children:[e.jsxs("button",{onClick:()=>l(Math.max(0,t-1)),disabled:t===0,style:{padding:"6px 14px",fontSize:13,border:"0.5px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:t>0?"var(--color-text-secondary)":"var(--color-text-tertiary)",cursor:t>0?"pointer":"default",display:"flex",alignItems:"center",gap:5},children:[e.jsx("i",{className:"ti ti-arrow-left","aria-hidden":!0})," Prev"]}),e.jsxs("button",{onClick:()=>l(Math.min(r.length-1,t+1)),disabled:t===r.length-1,style:{padding:"6px 14px",fontSize:13,border:"0.5px solid var(--color-border-info)",borderRadius:"var(--border-radius-md)",background:"var(--color-background-info)",color:"var(--color-text-info)",cursor:t<r.length-1?"pointer":"default",display:"flex",alignItems:"center",gap:5},children:["Next ",e.jsx("i",{className:"ti ti-arrow-right","aria-hidden":!0})]})]})]})}function Z(){const[t,l]=F.useState(1),[r,u]=F.useState(4),f=[3,...Array(t).fill(r),2];return e.jsxs("div",{children:[e.jsx(m,{children:"A Multi-Layer Perceptron (MLP) stacks multiple layers of neurons. Each layer transforms the previous layer's representation, enabling non-linear decision boundaries that a single perceptron cannot achieve."}),e.jsx(s,{children:"Why sigmoid over the step function?"}),e.jsx(T,{cols:2,children:[{label:"Step function (perceptron)",color:"danger",items:["Output: {−1, +1} — hard binary","Gradient = 0 everywhere (except z=0)","Cannot use gradient descent","No probability — just a class label","Learning requires the special 'perceptron trick'"]},{label:"Sigmoid activation",color:"success",items:["Output: (0,1) — soft probability","Gradient = σ(z)·(1−σ(z)) — smooth, non-zero","Enables full gradient-based training","Differentiable → backpropagation works","Composable: stack many sigmoid layers"]}].map(({label:a,color:c,items:o})=>e.jsx(C,{title:a,color:c,children:o.map(d=>e.jsxs("div",{style:{marginBottom:4},children:["• ",d]},d))},a))}),e.jsx(s,{children:"MLP construction"}),e.jsx(m,{children:"We connect perceptrons (now with smooth activations) in layers. Each neuron in layer l receives all activations from layer l−1 — this is called a fully connected or dense layer."}),e.jsx(y,{block:!0,children:`  Single sigmoid neuron (layer l, neuron j):
  
    z⁽ˡ⁾_j = Σₖ w⁽ˡ⁾_{jk} · a⁽ˡ⁻¹⁾_k  +  b⁽ˡ⁾_j
    a⁽ˡ⁾_j = σ(z⁽ˡ⁾_j)

  In matrix form for the whole layer:
    z⁽ˡ⁾ = W⁽ˡ⁾ · a⁽ˡ⁻¹⁾  +  b⁽ˡ⁾
    a⁽ˡ⁾ = f⁽ˡ⁾(z⁽ˡ⁾)       (element-wise)

  W⁽ˡ⁾ ∈ ℝ^(n_l × n_{l-1})
  b⁽ˡ⁾ ∈ ℝ^(n_l)`}),e.jsx(s,{children:"Interactive architecture builder"}),e.jsx(m,{children:"Adjust the hidden layers and neurons to see how the MLP structure changes."}),e.jsxs(U,{children:[e.jsx(N,{layers:f}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"120px 1fr 48px",alignItems:"center",gap:8,marginTop:12,fontSize:13},children:[e.jsx("span",{style:{color:"var(--color-text-secondary)"},children:"Hidden layers"}),e.jsx("input",{type:"range",min:1,max:3,value:t,onChange:a=>l(+a.target.value)}),e.jsx("span",{style:{fontFamily:"var(--font-mono)",fontSize:12,textAlign:"right"},children:t}),e.jsx("span",{style:{color:"var(--color-text-secondary)"},children:"Neurons/layer"}),e.jsx("input",{type:"range",min:2,max:6,value:r,onChange:a=>u(+a.target.value)}),e.jsx("span",{style:{fontFamily:"var(--font-mono)",fontSize:12,textAlign:"right"},children:r})]}),e.jsxs("div",{style:{marginTop:10,fontSize:12,color:"var(--color-text-secondary)",display:"flex",gap:16,justifyContent:"center"},children:[e.jsxs("span",{children:["Architecture: [",f.join(", "),"]"]}),e.jsxs("span",{children:["Parameters: ",f.slice(1).reduce((a,c,o)=>a+c*(f[o]+1),0).toLocaleString()]})]})]}),e.jsx(s,{children:"MLP architecture components"}),e.jsx(q,{heads:["Component","Role","Typical size","Activation"],rows:[["Input layer (l=0)","Passes raw features; no computation","= feature dimension d","Identity (no activation)"],["Hidden layer(s)","Learn non-linear feature representations","Tunable: 64, 128, 256, 512…","ReLU (default), tanh, GELU"],["Output layer","Produces final prediction","= number of classes / 1 for regression","Sigmoid, Softmax, Linear"]]}),e.jsx(s,{children:"Architecture modifications and their effects"}),e.jsx(T,{cols:2,children:[{mod:"Increase depth (more layers)",effect:"More abstract representations; can model more complex functions; risk of vanishing gradients",color:"info"},{mod:"Increase width (more neurons/layer)",effect:"Larger function class; more parameters; diminishing returns after a point; better for wide shallow tasks",color:"info"},{mod:"Add Batch Normalization",effect:"Stabilizes training; allows higher learning rates; reduces internal covariate shift; acts as regularizer",color:"success"},{mod:"Add Dropout(p)",effect:"Regularization; prevents co-adaptation; equivalent to training ensemble of 2^N networks; use p=0.3–0.5",color:"success"},{mod:"Residual connections (skip)",effect:"Solves vanishing gradient for very deep nets; identity shortcut ensures gradient flow; enables 100+ layer training",color:"warning"},{mod:"Change activation to ReLU",effect:"Sparse activations; no vanishing gradient in positive region; faster training; may cause dead neurons",color:"warning"}].map(({mod:a,effect:c,color:o})=>e.jsx(C,{color:o,title:a,children:c},a))}),e.jsx(s,{children:"Performance comparison: perceptron vs MLP"}),e.jsx("div",{style:{overflowX:"auto"},children:e.jsxs("table",{style:{width:"100%",borderCollapse:"collapse",fontSize:13},children:[e.jsx("thead",{children:e.jsx("tr",{style:{background:"var(--color-background-secondary)"},children:["Task / dataset","Single perceptron","1-hidden-layer MLP","Deep MLP (3+ layers)"].map(a=>e.jsx("th",{style:{padding:"7px 12px",textAlign:"left",borderBottom:"0.5px solid var(--color-border-tertiary)",fontWeight:500},children:a},a))})}),e.jsx("tbody",{children:[["Linearly separable (AND, OR)","100%","100%","100%"],["XOR","75% max (wrong)","100%","100%"],["MNIST digits","~92%","~97%","~99%"],["Concentric circles","~50% (random)","~98%","~99%"],["Complex tabular data","~60–70%","~80–90%","~85–95%"]].map(([a,...c],o)=>e.jsxs("tr",{style:{background:o%2?"var(--color-background-secondary)":"transparent"},children:[e.jsx("td",{style:{padding:"7px 12px",fontWeight:500,fontSize:12.5,color:"var(--color-text-primary)"},children:a}),c.map((d,h)=>e.jsx("td",{style:{padding:"7px 12px",fontSize:12.5,color:d.includes("wrong")?"var(--color-text-danger)":d==="100%"||d.startsWith("~99")?"var(--color-text-success)":"var(--color-text-secondary)",fontFamily:"var(--font-mono)"},children:d},h))]},a))})]})}),e.jsx(s,{children:"Interview Q&A"}),e.jsx(v,{q:"Why can a single hidden layer MLP theoretically approximate any function, yet deep MLPs are preferred?",a:"The Universal Approximation Theorem (Cybenko 1989, Hornik 1991) guarantees that a 1-hidden-layer MLP with enough neurons can approximate any continuous function on a compact domain. However, 'enough neurons' may be <em>exponentially many</em> for complex functions. Depth provides an exponentially more efficient parameterization — a deep network can approximate exponentially more functions with the same number of parameters. Additionally, depth enables hierarchical feature reuse (each layer builds on the previous), regularization via compositionality, and better empirical generalization."}),e.jsx(v,{q:"What is the 'dying ReLU' problem and how do you fix it?",a:"A ReLU neuron dies when its pre-activation z is permanently negative for all inputs, producing zero output and zero gradient. Once dead, the neuron never receives a gradient and never updates — it's frozen. Causes: large negative bias initialized or large learning rate pushing weights negative. Fixes: (1) Leaky ReLU: f(z) = max(αz, z) with α≈0.01 — always has non-zero gradient, (2) Parametric ReLU (PReLU): α is learned, (3) ELU: f(z) = z if z>0 else α(e^z − 1) — smooth and non-zero everywhere, (4) careful weight initialization and learning rate scheduling."}),e.jsx(v,{q:"How does Batch Normalization help training deep MLPs?",a:"Batch Normalization (Ioffe & Szegedy, 2015) normalizes the pre-activations of each layer to have zero mean and unit variance across the mini-batch, then applies learned scale (γ) and shift (β) parameters. Benefits: (1) Reduces internal covariate shift — subsequent layers see a more stable distribution, (2) allows higher learning rates — less sensitivity to initialization, (3) acts as a regularizer — reduces need for dropout, (4) smooths the loss landscape. The key formula is: BN(z) = γ·(z − μ_B)/√(σ²_B + ε) + β."})]})}function V(){return e.jsxs("div",{children:[e.jsx(m,{children:"Forward propagation is the process of computing the output of a neural network given an input — passing data from input to output, layer by layer, applying the learned weight matrices and activation functions."}),e.jsx(s,{children:"Notation guide"}),e.jsx(A,{color:"info",icon:"ti-code",children:"Consistent notation is critical for understanding backpropagation later. Memorize these conventions."}),e.jsx("div",{style:{overflowX:"auto"},children:e.jsxs("table",{style:{width:"100%",borderCollapse:"collapse",fontSize:13},children:[e.jsx("thead",{children:e.jsx("tr",{style:{background:"var(--color-background-secondary)"},children:["Symbol","Meaning","Shape"].map(t=>e.jsx("th",{style:{padding:"7px 12px",textAlign:"left",borderBottom:"0.5px solid var(--color-border-tertiary)",fontWeight:500},children:t},t))})}),e.jsx("tbody",{children:[["L","Total number of layers (excluding input)","scalar"],["nˡ","Number of neurons in layer l","scalar"],["x = a⁽⁰⁾","Input vector (activation of layer 0)","ℝ^(n⁰)"],["W⁽ˡ⁾","Weight matrix of layer l","ℝ^(nˡ × nˡ⁻¹)"],["w⁽ˡ⁾_{jk}","Weight from neuron k in layer l−1 to neuron j in layer l","scalar"],["b⁽ˡ⁾","Bias vector of layer l","ℝ^(nˡ)"],["z⁽ˡ⁾","Pre-activation (weighted sum) of layer l","ℝ^(nˡ)"],["a⁽ˡ⁾","Post-activation of layer l","ℝ^(nˡ)"],["f⁽ˡ⁾","Activation function of layer l","ℝ → ℝ (applied element-wise)"],["ŷ = a⁽ᴸ⁾","Final output (prediction)","ℝ^(nᴸ)"]].map(([t,l,r],u)=>e.jsxs("tr",{style:{background:u%2?"var(--color-background-secondary)":"transparent"},children:[e.jsx("td",{style:{padding:"7px 12px",fontFamily:"var(--font-mono)",fontSize:12.5,fontWeight:500,color:"var(--color-text-primary)"},children:t}),e.jsx("td",{style:{padding:"7px 12px",fontSize:12.5,color:"var(--color-text-secondary)"},children:l}),e.jsx("td",{style:{padding:"7px 12px",fontFamily:"var(--font-mono)",fontSize:12,color:"var(--color-text-secondary)"},children:r})]},t))})]})}),e.jsx(s,{children:"The forward pass equations"}),e.jsx(y,{block:!0,children:`  For each layer l = 1, 2, ..., L:

    z⁽ˡ⁾ = W⁽ˡ⁾ · a⁽ˡ⁻¹⁾  +  b⁽ˡ⁾      ← linear transform
    a⁽ˡ⁾ = f⁽ˡ⁾(z⁽ˡ⁾)                   ← non-linear activation

  Initial condition:
    a⁽⁰⁾ = x                              ← input is layer-0 activation

  Output:
    ŷ = a⁽ᴸ⁾                             ← last layer's activation

  Full pass (composition notation):
    ŷ = f⁽ᴸ⁾(W⁽ᴸ⁾ · f⁽ᴸ⁻¹⁾(... f⁽¹⁾(W⁽¹⁾·x + b⁽¹⁾) ...) + b⁽ᴸ⁾)`}),e.jsx(s,{children:"Why z and a are stored separately"}),e.jsx(A,{color:"warning",icon:"ti-alert-triangle",children:"During training, both z⁽ˡ⁾ and a⁽ˡ⁾ must be cached for every layer during the forward pass. Backpropagation needs them to compute gradients. Storing only a⁽ˡ⁾ is insufficient because ∂L/∂z⁽ˡ⁾ requires knowing f′(z⁽ˡ⁾)."}),e.jsx(s,{children:"Step-by-step traced example: 2 → 3 → 1 network"}),e.jsx(m,{children:"Network: 2 input features, 3 hidden neurons (tanh), 1 output (sigmoid). Walk through each computation step using the buttons below."}),e.jsx(D,{}),e.jsx(s,{children:"Matrix form: full mini-batch forward pass"}),e.jsx(m,{children:"In practice, we process a mini-batch of m samples simultaneously using matrix operations:"}),e.jsx(y,{block:!0,children:`  Let X ∈ ℝ^(m × n⁰) be a mini-batch of m samples.
  
  Transposed convention (batch dimension first):

  Z⁽ˡ⁾ = A⁽ˡ⁻¹⁾ · W⁽ˡ⁾ᵀ  +  b⁽ˡ⁾     (b is broadcast over m rows)
  A⁽ˡ⁾ = f⁽ˡ⁾(Z⁽ˡ⁾)

  Where:
    A⁽ˡ⁻¹⁾ ∈ ℝ^(m × nˡ⁻¹)     (m activations from previous layer)
    W⁽ˡ⁾   ∈ ℝ^(nˡ × nˡ⁻¹)    (weight matrix)
    Z⁽ˡ⁾   ∈ ℝ^(m × nˡ)        (pre-activations for whole batch)
    A⁽ˡ⁾   ∈ ℝ^(m × nˡ)        (activations for whole batch)

  Computational advantage: one BLAS (matrix multiply) call
  processes all m samples in parallel on GPU.`}),e.jsx(s,{children:"Computational complexity"}),e.jsx(y,{block:!0,children:`  Single forward pass through one fully-connected layer:
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
  Compare ResNet-50: ~4 billion FLOPs per image!`}),e.jsx(s,{children:"Implementation: vectorized forward pass from scratch"}),e.jsx(M,{children:`import numpy as np

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
    print(f"Layer {l}: Z shape={Z.shape}, A shape={A.shape}")`}),e.jsx(s,{children:"Forward pass in PyTorch — under the hood"}),e.jsx(M,{children:`import torch
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
    print(f"  {name}: {act.squeeze().numpy().round(4)}")`}),e.jsx(s,{children:"Interview Q&A"}),e.jsx(v,{q:"What is the difference between z⁽ˡ⁾ and a⁽ˡ⁾, and why must both be cached?",a:"z⁽ˡ⁾ is the <em>pre-activation</em> (raw weighted sum): z⁽ˡ⁾ = W⁽ˡ⁾·a⁽ˡ⁻¹⁾ + b⁽ˡ⁾. a⁽ˡ⁾ is the <em>post-activation</em>: a⁽ˡ⁾ = f(z⁽ˡ⁾). Both must be cached because during backpropagation, the gradient through a layer requires f′(z⁽ˡ⁾) — the derivative of the activation evaluated at the pre-activation, not the activation itself. For ReLU, f′(z) = 1 if z > 0 else 0 — this cannot be recovered from a⁽ˡ⁾ alone (you can't distinguish a⁽ˡ⁾=0 from dead neuron vs. z slightly negative)."}),e.jsx(v,{q:"What is the computational bottleneck of the forward pass in a large MLP?",a:"The matrix multiplication W⁽ˡ⁾ · A⁽ˡ⁻¹⁾ dominates — it is O(nˡ × nˡ⁻¹ × m) per layer (m = batch size). For large hidden dimensions (e.g., 4096), this is billions of FLOPs. This is why GPUs are essential — their thousands of cores can compute large GEMMs (General Matrix Multiplications) in parallel. Memory bandwidth is also critical: weights must be loaded from GPU VRAM for every forward pass, making memory-bound layers a bottleneck."}),e.jsx(v,{q:"Why do we use mini-batch training rather than computing the loss on one sample at a time?",a:"Three reasons: (1) <strong>Efficiency</strong> — processing m samples simultaneously as a matrix multiply achieves near-linear speedup on GPUs rather than m sequential calls. (2) <strong>Gradient stability</strong> — the gradient estimate from a mini-batch has lower variance than a single sample (stochastic) gradient, giving more reliable update directions. (3) <strong>Generalization</strong> — the noise from mini-batch sampling acts as implicit regularization (similar to adding noise to the gradient), often improving test performance versus full-batch gradient descent."}),e.jsx(v,{q:"How does weight initialization affect the forward pass in a deep MLP?",a:"Poor initialization causes either vanishing (outputs → 0) or exploding (outputs → ∞) activations in the forward pass, which then causes corresponding vanishing or exploding gradients in the backward pass. If all weights are initialized to the same value (e.g., 0), all neurons compute the same output and receive the same gradient — symmetry is never broken and all neurons learn the same function. Correct strategies: Xavier initialization (σ² = 2/(n_in + n_out)) for tanh/sigmoid, He initialization (σ² = 2/n_in) for ReLU — both ensure the variance of activations is approximately preserved through each layer."}),e.jsx(v,{q:"What does nn.Linear actually compute, and how does it correspond to the matrix equations?",a:"nn.Linear(n_in, n_out) stores weight W of shape (n_out, n_in) and bias b of shape (n_out,). Its forward call computes: output = input @ W.T + b. This is exactly z = W · aᵀ transposed to batch-first convention: for input of shape (batch, n_in), output is (batch, n_out). The weights are stored transposed relative to the mathematical convention W⁽ˡ⁾ ∈ ℝ^(n_out × n_in) so that @ W.T performs the standard row-vector × matrix multiply."})]})}const Q=[{id:"mlp",label:"MLP Intuition"},{id:"fwd",label:"Forward Propagation"}];function ee(){const[t,l]=F.useState("mlp"),r={mlp:e.jsx(Z,{}),fwd:e.jsx(V,{})};return e.jsxs("div",{children:[e.jsxs("div",{className:"page-header",children:[e.jsx("div",{className:"page-header-eyebrow",children:"Deep Learning — Module 03"}),e.jsx("h1",{className:"page-header-title",children:"Multi-Layer Perceptrons & Forward Propagation"}),e.jsx("p",{className:"page-header-subtitle",children:"Architecture intuition · Full notation system · Step-by-step numerical trace · Vectorized implementation"})]}),e.jsx(H,{tabs:Q,active:t,onChange:l}),e.jsx("div",{style:{padding:"0.5rem 0 2rem"},children:r[t]}),e.jsx(X,{moduleId:3})]})}export{ee as default};
