import{r as m,j as e}from"./index-BQO4ci8G.js";import{S as q,P as A,H as l,M as v,a as M,G as W,Q as D,T as H,N as F,C as O,V as C}from"./SectionNav-BDxYvY3P.js";import{N as $}from"./NavButtons-Bz-HQEP4.js";function K(){const i=m.useRef(null),[u,o]=m.useState(!1),[a,f]=m.useState({bgd:[],sgd:[],mgd:[]}),[y,x]=m.useState({bgd:[],sgd:[],mgd:[]});m.useRef(null);const w=(s,t)=>.6*(s-1)**2+1.8*(t-.5)**2,n=(s,t)=>[1.2*(s-1),3.6*(t-.5)],d=(s,t,b)=>{const[z,h]=n(s,t);return[z+b*(Math.random()-.5)*4,h+b*(Math.random()-.5)*4]},r=m.useCallback(()=>{const s=[[-2.5,2.5]],t=[[-2.5,2.5]],b=[[-2.5,2.5]],z=[],h=[],L=[],j=.15,S=.08,R=.12;for(let c=0;c<60;c++){let[p,g]=s[s.length-1];const[k,G]=n(p,g);s.push([p-j*k,g-j*G]),z.push(w(p,g));let[T,N]=t[t.length-1];const[I,P]=d(T,N,1.4);t.push([T-S*I,N-S*P]),h.push(w(T,N));let[E,X]=b[b.length-1];const[U,V]=d(E,X,.45);b.push([E-R*U,X-R*V]),L.push(w(E,X))}return{paths:{bgd:s,sgd:t,mgd:b},losses:{bgd:z,sgd:h,mgd:L}}},[]),_=()=>{const s=r();f(s.paths),x(s.losses)},B=()=>{f({bgd:[],sgd:[],mgd:[]}),x({bgd:[],sgd:[],mgd:[]})};return m.useEffect(()=>{const s=i.current;if(!s)return;const t=s.getContext("2d"),b=s.width,z=s.height,h=3.5;t.clearRect(0,0,b,z);const L=c=>(c+h)/(2*h)*b,j=c=>z-(c+h)/(2*h)*z,S=55;for(let c=0;c<S;c++)for(let p=0;p<S;p++){const g=-h+c/S*2*h,k=-h+p/S*2*h,G=w(g,k),T=Math.max(0,Math.min(1,1-G/8));t.fillStyle=`rgba(${Math.round(20+T*20)},${Math.round(30+T*100)},${Math.round(60+T*140)},0.9)`,t.fillRect(L(g),j(k+.13),b/S+1,z/S+1)}t.beginPath(),t.arc(L(1),j(.5),7,0,Math.PI*2),t.fillStyle="#FFD700",t.fill(),t.strokeStyle="#000",t.lineWidth=1.5,t.stroke();const R=(c,p)=>{c.length<2||(t.beginPath(),t.strokeStyle=p,t.lineWidth=1.8,t.globalAlpha=.9,c.forEach(([g,k],G)=>G===0?t.moveTo(L(g),j(k)):t.lineTo(L(g),j(k))),t.stroke(),c.forEach(([g,k],G)=>{(G%8===0||G===c.length-1)&&(t.beginPath(),t.arc(L(g),j(k),G===0?6:3,0,Math.PI*2),t.fillStyle=p,t.fill())}),t.globalAlpha=1)};R(a.bgd,"#4FC3F7"),R(a.sgd,"#FF8A65"),R(a.mgd,"#81C784"),t.font="11.5px var(--font-sans)",t.globalAlpha=.9,[["#4FC3F7","Batch GD"],["#FF8A65","SGD"],["#81C784","Mini-batch GD"]].forEach(([c,p],g)=>{t.fillStyle=c,t.fillText("─ "+p,8,16+g*17)}),t.fillStyle="rgba(255,255,255,0.5)",t.fillText("⭐ global min",L(1)+9,j(.5)+4),t.globalAlpha=1},[a]),e.jsxs(C,{children:[e.jsx("canvas",{ref:i,width:440,height:280,style:{display:"block",margin:"0 auto",borderRadius:"var(--border-radius-md)",maxWidth:"100%"}}),y.bgd.length>0&&e.jsx(Q,{losses:y}),e.jsxs("div",{style:{display:"flex",gap:8,justifyContent:"center",marginTop:10},children:[e.jsx("button",{onClick:_,style:{padding:"6px 16px",fontSize:13,background:"var(--color-background-info)",border:"0.5px solid var(--color-border-info)",color:"var(--color-text-info)",borderRadius:"var(--border-radius-md)",cursor:"pointer",fontWeight:500},children:"Run all three"}),e.jsx("button",{onClick:B,style:{padding:"6px 12px",fontSize:13,border:"0.5px solid var(--color-border-tertiary)",background:"transparent",color:"var(--color-text-secondary)",borderRadius:"var(--border-radius-md)",cursor:"pointer"},children:"Reset"})]})]})}function Q({losses:i}){const u=m.useRef(null);return m.useEffect(()=>{const o=u.current;if(!o)return;const a=o.getContext("2d"),f=o.width,y=o.height;a.clearRect(0,0,f,y);const x=Math.max(...i.bgd,...i.sgd,...i.mgd)*1.05,w=(r,_)=>50+r/_*(f-60),n=r=>y-20-r/x*(y-30);a.strokeStyle="rgba(128,128,128,0.1)",a.lineWidth=.5;for(let r=0;r<=4;r++){const _=n(x*r/4);a.beginPath(),a.moveTo(50,_),a.lineTo(f,_),a.stroke()}a.fillStyle="rgba(128,128,128,0.5)",a.font="10px var(--font-mono)",a.textAlign="right";for(let r=0;r<=4;r++)a.fillText((x*r/4).toFixed(1),44,n(x*r/4)+3);a.textAlign="start";const d=(r,_)=>{a.beginPath(),a.strokeStyle=_,a.lineWidth=1.8,r.forEach((B,s)=>s===0?a.moveTo(w(s,r.length),n(B)):a.lineTo(w(s,r.length),n(B))),a.stroke()};d(i.bgd,"#4FC3F7"),d(i.sgd,"#FF8A65"),d(i.mgd,"#81C784"),a.fillStyle="rgba(128,128,128,0.6)",a.font="10px var(--font-sans)",a.textAlign="center",a.fillText("Training step →",f/2,y-3),a.textAlign="left",a.fillText("Loss",8,12)},[i]),e.jsx("canvas",{ref:u,width:440,height:120,style:{display:"block",margin:"8px auto 0",borderRadius:"var(--border-radius-md)",background:"var(--color-background-tertiary)",maxWidth:"100%"}})}function Y(){const[i,u]=m.useState(6),[o,a]=m.useState("sigmoid"),f={sigmoid:.15,tanh:.5,relu:.55,"leaky-relu":.55},y=n=>{const d=f[o];return Math.pow(d,i-n)},x=Array.from({length:i},(n,d)=>d+1),w=y(i);return e.jsxs(C,{children:[e.jsxs("div",{style:{display:"flex",gap:12,flexWrap:"wrap",alignItems:"center",marginBottom:12,fontSize:13},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8},children:[e.jsx("span",{style:{color:"var(--color-text-secondary)"},children:"Depth (layers)"}),e.jsx("input",{type:"range",min:3,max:12,value:i,onChange:n=>u(+n.target.value),style:{width:100}}),e.jsx("span",{style:{fontFamily:"var(--font-mono)",fontSize:12,minWidth:16},children:i})]}),e.jsx("div",{style:{display:"flex",gap:5,flexWrap:"wrap"},children:["sigmoid","tanh","relu","leaky-relu"].map(n=>e.jsx("button",{onClick:()=>a(n),style:{padding:"3px 10px",fontSize:11.5,fontWeight:n===o?500:400,border:`0.5px solid var(--color-border-${n===o?"info":"tertiary"})`,borderRadius:"20px",background:n===o?"var(--color-background-info)":"transparent",color:n===o?"var(--color-text-info)":"var(--color-text-secondary)",cursor:"pointer"},children:n},n))})]}),e.jsxs("div",{style:{padding:"0 4px"},children:[e.jsx("div",{style:{display:"flex",alignItems:"flex-end",gap:6,height:100,marginBottom:6},children:x.map(n=>{const d=y(n),r=Math.max(2,d/w*95),B=d<.001?"var(--color-text-danger)":d<.05?"var(--color-text-warning)":"var(--color-text-success)";return e.jsx("div",{style:{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"flex-end",height:"100%"},children:e.jsx("div",{style:{width:"100%",height:`${r}%`,background:B,borderRadius:"3px 3px 0 0",transition:"all 0.3s",opacity:.85}})},n)})}),e.jsx("div",{style:{display:"flex",gap:6,marginBottom:4},children:x.map(n=>e.jsxs("div",{style:{flex:1,textAlign:"center",fontSize:9.5,fontFamily:"var(--font-mono)",color:"var(--color-text-tertiary)"},children:["L",n]},n))}),e.jsx("div",{style:{display:"flex",gap:6},children:x.map(n=>{const d=y(n),r=d<.001;return e.jsx("div",{style:{flex:1,textAlign:"center",fontSize:9,fontFamily:"var(--font-mono)",color:r?"var(--color-text-danger)":d<.05?"var(--color-text-warning)":"var(--color-text-success)"},children:d<1e-4?"≈0":d.toFixed(3)},n)})}),e.jsxs("div",{style:{fontSize:11.5,color:"var(--color-text-secondary)",marginTop:8,textAlign:"center"},children:["Gradient magnitude at each layer (L",i," = output → L1 = input)",o==="sigmoid"&&i>=6&&e.jsx("span",{style:{color:"var(--color-text-danger)",fontWeight:500},children:" — Early layers are DEAD"})]})]})]})}function Z(){return e.jsxs("div",{children:[e.jsx(A,{children:"Gradient descent has three variants that differ in how much data is used per weight update. This single choice has cascading effects on speed, stability, memory usage, and generalization."}),e.jsx(l,{children:"The three variants — formal definitions"}),e.jsx(v,{block:!0,children:`  Given n training samples {(x₁,y₁), ..., (xₙ,yₙ)}, loss L, LR η:

  ━━ Batch Gradient Descent (BGD) ━━━━━━━━━━━━━━━━━━━━━━
  for epoch in range(T):
    g = (1/n) Σᵢ₌₁ⁿ ∇L(xᵢ,yᵢ; w)    ← gradient over ALL n samples
    w ← w − η · g

  ━━ Stochastic Gradient Descent (SGD) ━━━━━━━━━━━━━━━━
  for epoch in range(T):
    shuffle data
    for i in range(n):
      g = ∇L(xᵢ,yᵢ; w)               ← gradient over 1 sample
      w ← w − η · g

  ━━ Mini-Batch Gradient Descent ━━━━━━━━━━━━━━━━━━━━━━
  for epoch in range(T):
    shuffle data
    for batch B in batches(X, y, size=B):
      g = (1/|B|) Σᵢ∈B ∇L(xᵢ,yᵢ; w)  ← gradient over B samples
      w ← w − η · g`}),e.jsx(l,{children:"Interactive comparison — loss landscape paths"}),e.jsx(A,{children:"Batch GD follows a smooth path. SGD bounces erratically but can escape local minima. Mini-batch strikes the balance."}),e.jsx(K,{}),e.jsx(l,{children:"Performance metrics: 500 rows, 10 epochs, batch size 32"}),e.jsx(H,{heads:["Metric","Batch GD","SGD","Mini-batch (B=32)"],rows:[["Weight updates / epoch","1 (uses all 500)","500 (one/sample)","⌈500/32⌉ = 16"],["Weight updates / 10 epochs","10 total","5,000 total","160 total"],["Gradient noise","None (exact gradient)","Very high","Moderate"],["Memory per update","All 500 samples","1 sample","32 samples"],["GPU utilization","Poor (one big pass)","Very poor (serial)","Excellent (BLAS)"],["Convergence path","Smooth monotone","Erratic/noisy","Smooth with slight noise"],["Epoch time","Slow (all data)","Moderate","Fast (vectorized)"],["Generalization","Can overfit","Often better","Best in practice"]]}),e.jsx(l,{children:"Batch Gradient Descent — detailed"}),e.jsx(v,{block:!0,children:`  Pseudocode:
  ─────────────────────────────────────────────────
  Initialize w randomly
  for epoch = 1 to T:
    grad_sum = 0
    for i = 1 to n:
      grad_sum += ∇L(xᵢ, yᵢ; w)      ← accumulate all
    g = grad_sum / n                    ← average gradient
    w ← w − η · g                      ← single update
  ─────────────────────────────────────────────────

  Key characteristics:
  + Exact gradient (no noise)
  + Deterministic — same result every run
  + Guaranteed convergence for convex loss with correct η
  − One update per epoch (extremely slow learning)
  − Entire dataset must fit in memory
  − Cannot exploit GPU parallelism efficiently
  − Useless for online/streaming learning`}),e.jsx(l,{children:"Stochastic Gradient Descent (SGD) — detailed"}),e.jsx(v,{block:!0,children:`  Pseudocode:
  ─────────────────────────────────────────────────
  Initialize w randomly
  for epoch = 1 to T:
    shuffle {(x₁,y₁),...,(xₙ,yₙ)}
    for i = 1 to n:
      g = ∇L(xᵢ, yᵢ; w)              ← gradient of ONE sample
      w ← w − η · g                    ← update immediately
  ─────────────────────────────────────────────────

  Key characteristics:
  + n updates per epoch (fast early learning)
  + Noise helps escape local minima and saddle points
  + Works for online/streaming learning
  + Low memory (one sample at a time)
  − Very noisy loss curve (hard to diagnose training)
  − Cannot use matrix operations efficiently (no vectorization)
  − High variance → may not converge to minimum
  − Needs learning rate decay to settle`}),e.jsx(l,{children:"Mini-Batch Gradient Descent — detailed"}),e.jsx(v,{block:!0,children:`  Pseudocode:
  ─────────────────────────────────────────────────
  Initialize w randomly
  for epoch = 1 to T:
    shuffle data
    for batch B ⊆ {1,...,n}, |B| = batch_size:
      g = (1/|B|) Σᵢ∈B ∇L(xᵢ, yᵢ; w) ← avg gradient over batch
      w ← w − η · g
  ─────────────────────────────────────────────────

  Best of both worlds:
  ✓ Vectorized matrix ops → GPU-efficient
  ✓ Moderate noise → escapes saddle points
  ✓ Lower variance than SGD → more stable convergence
  ✓ Memory-efficient: only batch_size samples in RAM at once
  ✓ Standard choice in all modern deep learning frameworks`}),e.jsx(l,{children:"Mathematical representation — why mini-batch gradient is unbiased"}),e.jsx(v,{block:!0,children:`  True gradient:   g* = (1/n) Σᵢ₌₁ⁿ ∇L(xᵢ,yᵢ;w)

  Mini-batch gradient (random batch B of size b):
    ĝ = (1/b) Σᵢ∈B ∇L(xᵢ,yᵢ;w)

  E[ĝ] = g*    (unbiased estimator of true gradient)

  Variance:  Var[ĝ] = (1/b) · Var[∇L(xᵢ,yᵢ;w)]
             ↑ decreases as batch size b increases
  
  SGD (b=1):     highest variance, unbiased
  BGD (b=n):     zero variance (exact), unbiased
  Mini-batch:    variance = (1/b)σ², tunable`}),e.jsx(l,{children:"Why SGD's erratic behavior is useful"}),e.jsxs(F,{color:"info",icon:"ti-bulb",children:[e.jsx("strong",{children:"The noise is a feature, not a bug."})," SGD's gradient noise acts like simulated annealing — it prevents the optimizer from getting stuck in sharp local minima. Empirically, SGD-trained models often generalize better than those trained with full-batch GD, even on the same dataset (Keskar et al., 2017)."]}),e.jsx(v,{block:!0,children:`  Sharp minimum:   small perturbation → large loss increase
                   → poor generalization on test data
  
  Flat minimum:   small perturbation → small loss increase
                  → good generalization on test data

  SGD noise preferentially finds flat minima.
  Batch GD converges to whatever minimum it first encounters
  (often a sharper one) with no stochasticity to escape.`}),e.jsx(l,{children:"Vectorization — why powers of 2 for batch size"}),e.jsx(v,{block:!0,children:`  Vectorized (mini-batch, matrix form):
    Z = X_batch @ W.T + b        ← ONE BLAS call, GPU-optimized
    X_batch shape: (batch_size, n_features)

  Non-vectorized (SGD, loop):
    for xi in X_batch:
      z = xi @ W.T + b            ← n separate operations
    
  GPU hardware:
    — CUDA cores work in warps of 32 threads
    — Tensor cores operate on 8×8 or 16×16 tiles
    — Powers of 2 (16, 32, 64, 128, 256) align to these tiles
    — Non-power-of-2 batch sizes waste GPU capacity

  Memory coalescing:
    — GPU reads memory in 128-byte chunks
    — Batch sizes of 2^k ensure full cache line utilization`}),e.jsx(l,{children:"Edge case: non-perfect division"}),e.jsx(F,{color:"warning",icon:"ti-alert-triangle",children:"When n=500 and batch_size=32: 500/32 = 15.625 → 15 full batches + 1 partial batch of 20 samples. The last batch has 20 samples, not 32."}),e.jsx(v,{block:!0,children:`  Problem: n=500, batch_size=32
    Full batches:   ⌊500/32⌋ = 15  (15 × 32 = 480 samples)
    Last batch:     500 - 480 = 20 samples

  Solution options:
  1. drop_last=True:  discard last incomplete batch
     — 15 updates per epoch, loses 20 samples
  2. drop_last=False: use partial batch (default in PyTorch)
     — 16 updates per epoch, slight gradient variance in last step
  3. Oversampling: pad last batch to size 32 with random repeats
     — Always 16 full batches, slight bias

  In PyTorch:
    DataLoader(dataset, batch_size=32, drop_last=False)  ← default
    DataLoader(dataset, batch_size=32, drop_last=True)   ← uniform`}),e.jsx(l,{children:"Implementation: all three variants"}),e.jsx(M,{children:`import numpy as np

def sigmoid(z):   return 1/(1+np.exp(-np.clip(z,-500,500)))
def bce_loss(y, yhat): return -np.mean(y*np.log(yhat+1e-15) + (1-y)*np.log(1-yhat+1e-15))
def bce_grad(X, y, yhat): return X.T @ (yhat-y) / len(y)

# ── Shared: generate toy binary data ──────────────────────
np.random.seed(42)
n, d = 500, 10
X = np.hstack([np.random.randn(n,d), np.ones((n,1))])   # +bias col
y = (X[:,0]+X[:,1] > 0).astype(float)

def accuracy(X, y, w):
    return np.mean((sigmoid(X@w)>=0.5)==y)

# ══ 1. BATCH GRADIENT DESCENT ══════════════════════════════
def batch_gd(X, y, epochs=50, lr=0.1):
    w = np.zeros(X.shape[1])
    history = []
    for epoch in range(epochs):
        yhat = sigmoid(X @ w)              # ALL n samples
        grad = bce_grad(X, y, yhat)        # full gradient
        w -= lr * grad                     # 1 update per epoch
        history.append(bce_loss(y, yhat))
    return w, history

# ══ 2. STOCHASTIC GRADIENT DESCENT ═════════════════════════
def sgd(X, y, epochs=50, lr=0.01):
    w = np.zeros(X.shape[1])
    history = []
    for epoch in range(epochs):
        idx = np.random.permutation(len(y))  # shuffle
        epoch_loss = 0
        for i in idx:                         # n=500 updates/epoch
            xi   = X[i:i+1]                  # (1, d+1) — keep 2D
            yi   = y[i:i+1]
            yhat = sigmoid(xi @ w)
            w -= lr * bce_grad(xi, yi, yhat)  # 1 update per sample
            epoch_loss += bce_loss(yi, yhat)
        history.append(epoch_loss / len(y))
    return w, history

# ══ 3. MINI-BATCH GRADIENT DESCENT ═════════════════════════
def minibatch_gd(X, y, epochs=50, lr=0.05, batch_size=32):
    w = np.zeros(X.shape[1])
    history = []
    for epoch in range(epochs):
        idx = np.random.permutation(len(y))
        X_s, y_s = X[idx], y[idx]             # shuffle
        epoch_loss = 0; n_batches = 0
        for start in range(0, len(y), batch_size):
            Xb = X_s[start:start+batch_size]   # (B, d+1)
            yb = y_s[start:start+batch_size]   # (B,)
            yhat = sigmoid(Xb @ w)
            w -= lr * bce_grad(Xb, yb, yhat)   # 1 update/batch
            epoch_loss += bce_loss(yb, yhat); n_batches+=1
        history.append(epoch_loss / n_batches)
    return w, history

# Run and compare
w_bgd, h_bgd = batch_gd(X, y)
w_sgd, h_sgd = sgd(X, y)
w_mgd, h_mgd = minibatch_gd(X, y)

print(f"Batch GD    — Final loss: {h_bgd[-1]:.4f}  Acc: {accuracy(X,y,w_bgd):.3f}")
print(f"SGD         — Final loss: {h_sgd[-1]:.4f}  Acc: {accuracy(X,y,w_sgd):.3f}")
print(f"Mini-batch  — Final loss: {h_mgd[-1]:.4f}  Acc: {accuracy(X,y,w_mgd):.3f}")

# PyTorch DataLoader — the standard mini-batch interface
import torch
from torch.utils.data import TensorDataset, DataLoader

dataset = TensorDataset(torch.FloatTensor(X), torch.FloatTensor(y))
loader  = DataLoader(dataset, batch_size=32, shuffle=True, drop_last=False)

# Standard training loop with DataLoader
model = torch.nn.Sequential(torch.nn.Linear(11,1), torch.nn.Sigmoid())
opt   = torch.optim.SGD(model.parameters(), lr=0.05)
loss_fn = torch.nn.BCELoss()

for epoch in range(10):
    for Xb, yb in loader:              # automatic mini-batching!
        pred = model(Xb).squeeze()
        loss = loss_fn(pred, yb)
        opt.zero_grad(); loss.backward(); opt.step()`}),e.jsx(l,{children:"When to use which"}),e.jsx(W,{cols:3,children:[{title:"Batch GD",color:"warning",items:["Very small datasets (<1K)","When exact gradient required","Convex optimization problems","Research / debugging","Never for production deep learning"]},{title:"SGD",color:"info",items:["Online/streaming learning","Extremely large datasets","When memory is severely limited","Recommendation systems","Built-in LR decay needed"]},{title:"Mini-batch (default)",color:"success",items:["All modern deep learning","Batch size 32–256 (powers of 2)","Fits in GPU VRAM","Best GPU utilization","Standard: Adam + mini-batch"]}].map(({title:i,color:u,items:o})=>e.jsx(O,{title:i,color:u,children:o.map(a=>e.jsxs("div",{style:{marginBottom:3},children:["• ",a]},a))},i))}),e.jsx(l,{children:"Interview Q&A"}),e.jsx(D,{q:"What is the difference between an epoch and an iteration?",a:"An <strong>epoch</strong> is one full pass through the entire training dataset. An <strong>iteration</strong> (or step) is one weight update — i.e., one forward + backward pass on one batch. For n=1000 samples and batch_size=32: iterations per epoch = ⌈1000/32⌉ = 32. After 10 epochs: 320 total iterations. In BGD, iterations = epochs (1 update per epoch). In SGD, iterations = n×epochs."}),e.jsx(D,{q:"Why does mini-batch SGD generalize better than full-batch GD?",a:"Empirically and theoretically (Keskar et al. 2017, Smith & Le 2018), large-batch training converges to sharp minima of the loss landscape — points where the loss increases steeply in every direction. These sharp minima correspond to poor generalization because a small shift in the weight space (as encountered on test data) dramatically increases the loss. Mini-batch noise acts as a regularizer that steers optimization toward flat minima, where loss changes slowly in all directions and the model generalizes better."}),e.jsx(D,{q:"What happens if the learning rate is not decayed when using SGD?",a:"SGD's gradient estimate has variance σ²/b where σ² is the sample gradient variance. With a fixed learning rate η, even at the true minimum, each SGD step moves by η × noise — the optimizer bounces around the minimum indefinitely without converging. Gradient descent theory shows convergence requires η→0. Solutions: (1) Learning rate decay schedules (step, cosine, exponential), (2) Adaptive optimizers (Adam, RMSProp) that automatically reduce effective LR based on gradient history."}),e.jsx(D,{q:"Why are batch sizes typically powers of 2?",a:"Modern GPU memory controllers read data in 32- or 128-byte cache lines. NVIDIA CUDA executes threads in warps of 32. Tensor core operations work on tiles of dimensions that are multiples of 8 or 16. Batch sizes that are powers of 2 (32, 64, 128, 256) align perfectly with these hardware constraints, maximizing memory coalescing and compute utilization. A batch size of 33 wastes one slot in a 64-element GPU warp, while 32 fills it perfectly."})]})}function J(){return e.jsxs("div",{children:[e.jsx(A,{children:"The vanishing gradient problem is one of the fundamental obstacles in training deep networks. It causes early layers to learn exponentially slower than later layers, effectively freezing them."}),e.jsx(l,{children:"The mathematical root cause"}),e.jsx(A,{children:"Recall the backpropagation recurrence (BP2):"}),e.jsx(v,{block:!0,children:`  δ⁽ˡ⁾ = (W⁽ˡ⁺¹⁾)ᵀ · δ⁽ˡ⁺¹⁾  ⊙  f'(z⁽ˡ⁾)

  Expanding the recurrence from output (L) to layer l:
  
  δ⁽ˡ⁾ = [Π_{k=l}^{L-1} (W⁽ᵏ⁺¹⁾)ᵀ ⊙ f'(z⁽ᵏ⁾)] · δ⁽ᴸ⁾

  This is a product of (L-l) matrices × (L-l) derivative scalars.

  For sigmoid with |W| ≈ 1:
    f'(z) = σ(z)·(1-σ(z)) ≤ 0.25  (maximum derivative)
    average ≈ 0.15

  After 6 layers:  0.25⁶ ≈ 0.00024   (×4000 smaller)
                   0.15⁶ ≈ 0.0000114  (×88000 smaller!)

  → Layer 1 gradient is 10,000–100,000× smaller than layer 6 gradient`}),e.jsx(l,{children:"Interactive: gradient magnitude across layers"}),e.jsx(A,{children:"Drag depth and switch activations to see how gradients vanish or survive."}),e.jsx(Y,{}),e.jsx(l,{children:"Why sigmoid causes vanishing gradients"}),e.jsx(v,{block:!0,children:`  σ(z) = 1/(1+e^{-z})
  σ'(z) = σ(z)·(1-σ(z))

  σ'(z) has a MAXIMUM at z=0: σ'(0) = 0.5·0.5 = 0.25
  For large |z|: σ'(z) → 0 (flat tails, zero gradient)
  
  In a product over L layers:
    Π_{l=1}^L σ'(z_l) ≤ 0.25^L

  L=5:   ≤ 0.00098  (1000× attenuation)
  L=10:  ≤ 9.5×10⁻⁷  (one million× attenuation)
  L=20:  ≤ 9×10⁻¹³  (one trillion× attenuation!)
  
  tanh is only slightly better: max derivative = 1.0
  but average derivative ≈ 0.5, same exponential decay`}),e.jsx(l,{children:"How to detect the vanishing gradient problem"}),e.jsx(M,{children:`import torch
import torch.nn as nn
import numpy as np

def monitor_gradients(model, X, y, loss_fn):
    """
    Run one forward+backward pass and report gradient norms per layer.
    Call AFTER loss.backward() and BEFORE optimizer.step().
    """
    # Forward + backward pass
    y_pred = model(X)
    loss   = loss_fn(y_pred, y)
    model.zero_grad()
    loss.backward()

    print(f"Loss: {loss.item():.4f}")
    print(f"{'Layer':<30} {'Grad Norm':>12} {'Max Abs Grad':>14} {'Status'}")
    print("─"*70)

    for name, param in model.named_parameters():
        if param.grad is not None:
            grad_norm = param.grad.norm().item()
            grad_max  = param.grad.abs().max().item()
            if grad_norm < 1e-5:   status = "⚠️  VANISHING"
            elif grad_norm > 100:  status = "💥 EXPLODING"
            else:                  status = "✓  healthy"
            print(f"{name:<30} {grad_norm:>12.2e} {grad_max:>14.2e}   {status}")

# ── Build a deep sigmoid network (will vanish) ──────────────
def build_deep_sigmoid(depth=8, width=64):
    layers = [nn.Linear(10, width), nn.Sigmoid()]
    for _ in range(depth - 2):
        layers += [nn.Linear(width, width), nn.Sigmoid()]
    layers.append(nn.Linear(width, 1))
    return nn.Sequential(*layers)

model_sig = build_deep_sigmoid(depth=8)
X = torch.randn(64, 10)
y = torch.randint(0, 2, (64,1)).float()

print("=== Deep Sigmoid Network (vanishing gradients expected) ===")
monitor_gradients(model_sig, X, y, nn.BCEWithLogitsLoss())
# Typical output for early layers: 1e-8 to 1e-12 (VANISHING)

# ── Same depth but with ReLU (gradient survives) ────────────
def build_deep_relu(depth=8, width=64):
    layers = [nn.Linear(10, width), nn.ReLU()]
    for _ in range(depth - 2):
        layers += [nn.Linear(width, width), nn.ReLU()]
    layers.append(nn.Linear(width, 1))
    return nn.Sequential(*layers)

model_relu = build_deep_relu(depth=8)
print("\\n=== Deep ReLU Network (gradients survive) ===")
monitor_gradients(model_relu, X, y, nn.BCEWithLogitsLoss())`}),e.jsx(l,{children:"5 solutions to vanishing gradients"}),e.jsx(W,{cols:2,children:[{n:"1",title:"ReLU activation",color:"success",desc:"f(z) = max(0,z), f'(z) = 1 for z>0. No saturation in positive region — gradient flows through intact. Most effective and widely used fix.",code:`nn.ReLU()       # standard
nn.LeakyReLU()  # prevents dead neurons (α=0.01)
nn.GELU()       # smooth ReLU, used in Transformers`},{n:"2",title:"Weight initialization (He/Xavier)",color:"success",desc:"He init (ReLU): σ²=2/nᵢₙ ensures activation variance ≈ 1 per layer, preventing exponential shrink in forward pass (which maps to gradient vanish in backward pass).",code:`nn.Linear(d_in, d_out)  # PyTorch uses Kaiming He by default
# Manual:
torch.nn.init.kaiming_uniform_(layer.weight, nonlinearity='relu')
torch.nn.init.xavier_uniform_(layer.weight)  # for tanh/sigmoid`},{n:"3",title:"Batch Normalization",color:"info",desc:"Normalizes pre-activations to N(0,1) before the activation function. This keeps inputs in the non-saturated region of sigmoid/tanh, preventing the zero-derivative regime.",code:`# After Linear, before activation:
nn.Sequential(
  nn.Linear(in, out),
  nn.BatchNorm1d(out),   # ← normalize
  nn.Sigmoid()            # now inputs are near 0, gradient ≠ 0
)`},{n:"4",title:"Residual connections (ResNets)",color:"info",desc:"Identity skip connections: output = F(x) + x. The gradient of the identity is exactly 1, providing a 'gradient highway' that bypasses any number of layers, making deep training stable.",code:`class ResBlock(nn.Module):
    def __init__(self, d):
        super().__init__()
        self.layers = nn.Sequential(
            nn.Linear(d,d), nn.BatchNorm1d(d), nn.ReLU(),
            nn.Linear(d,d), nn.BatchNorm1d(d)
        )
    def forward(self, x):
        return nn.ReLU()(self.layers(x) + x)  # ← skip!`},{n:"5",title:"Gradient clipping (exploding)",color:"warning",desc:"For the related exploding gradient problem (common in RNNs), clip the gradient norm to a maximum value before the update step.",code:`# In PyTorch training loop:
loss.backward()
torch.nn.utils.clip_grad_norm_(
    model.parameters(),
    max_norm=1.0      # clips ‖∇‖ to max 1.0
)
optimizer.step()`}].map(({n:i,title:u,color:o,desc:a,code:f})=>e.jsxs("div",{style:{border:`0.5px solid var(--color-border-${o})`,borderRadius:"var(--border-radius-lg)",overflow:"hidden"},children:[e.jsxs("div",{style:{background:`var(--color-background-${o})`,padding:"10px 13px"},children:[e.jsxs("div",{style:{fontWeight:500,fontSize:13.5,color:`var(--color-text-${o})`},children:[i,". ",u]}),e.jsx("div",{style:{fontSize:12.5,color:`var(--color-text-${o})`,marginTop:5,lineHeight:1.6},children:a})]}),e.jsx("pre",{style:{background:"#1E1E1E",color:"#D4D4D4",fontSize:11.5,fontFamily:"var(--font-mono)",padding:"10px 12px",margin:0,overflowX:"auto",lineHeight:1.6},children:f})]},i))}),e.jsx(l,{children:"Brief: exploding gradient problem"}),e.jsx(v,{block:!0,children:`  Cause: weight matrices with eigenvalues > 1
    δ⁽ˡ⁾ = Π_{k=l}^{L} W⁽ᵏ⁾ · δ⁽ᴸ⁾
    If ‖W‖ > 1 consistently:  ‖δ⁽ˡ⁾‖ grows exponentially

  Symptoms:
    — NaN loss during training
    — Weight values → ∞
    — Loss oscillates wildly then diverges
    — More common in RNNs than feedforward networks

  Solutions:
    1. Gradient clipping: clip_grad_norm_(params, max_norm=1.0)
    2. Smaller learning rate
    3. Weight regularization (L2 penalty on ‖W‖)
    4. Careful weight initialization (keep ‖W‖ near 1)
    5. Batch Normalization (bounds activations, bounds gradients)

  Comparison:
    Vanishing:  gradients → 0   → early layers don't learn
    Exploding:  gradients → ∞   → weights → ∞, loss → NaN`}),e.jsx(M,{children:`# Complete demonstration: vanishing vs exploding vs healthy
import torch, torch.nn as nn
import matplotlib.pyplot as plt

def get_grad_norms(model, X, y):
    """Returns dict of {layer_name: grad_norm} after one backward."""
    pred = model(X)
    loss = nn.BCEWithLogitsLoss()(pred, y)
    model.zero_grad(); loss.backward()
    return {n: p.grad.norm().item()
            for n,p in model.named_parameters()
            if p.grad is not None and 'weight' in n}

X = torch.randn(32, 20); y = torch.randint(0,2,(32,1)).float()

configs = {
    "Deep sigmoid (vanishing)": lambda:nn.Sequential(
        *sum([[nn.Linear(20,20),nn.Sigmoid()] for _ in range(8)],[]),
        nn.Linear(20,1)),
    "Large weights (exploding)": lambda: (
        m := nn.Sequential(*sum([[nn.Linear(20,20),nn.Tanh()] for _ in range(8)],[]),nn.Linear(20,1)),
        [nn.init.normal_(p, std=5.0) for p in m.parameters()], m)[-1],
    "ReLU + He init (healthy)": lambda:nn.Sequential(
        *sum([[nn.Linear(20,20),nn.ReLU()] for _ in range(8)],[]),
        nn.Linear(20,1)),
}

for name, builder in configs.items():
    model = builder()
    norms = get_grad_norms(model, X, y)
    vals  = list(norms.values())
    ratio = vals[0]/vals[-1] if vals[-1] > 0 else float('inf')
    print(f"\\n{name}")
    print(f"  Layer 1 grad norm: {vals[0]:.2e}")
    print(f"  Layer 8 grad norm: {vals[-1]:.2e}")
    print(f"  Ratio (L1/L8):     {ratio:.2e}  ← {'OK' if 0.01<ratio<100 else 'PROBLEM'}")`}),e.jsx(l,{children:"Interview Q&A"}),e.jsx(D,{q:"Explain mathematically why sigmoid causes vanishing gradients in deep networks.",a:"The backpropagation recurrence expands to δ⁽ˡ⁾ = [Π_{k=l}^{L-1} (W⁽ᵏ⁾)ᵀ ⊙ σ'(z⁽ᵏ⁾)] · δ⁽ᴸ⁾. The sigmoid derivative σ'(z) = σ(z)(1-σ(z)) ≤ 0.25 everywhere, with typical values around 0.15. For a 10-layer network, the product of 9 such derivatives: 0.15⁹ ≈ 3.8×10⁻⁸ — the early layers receive gradients 10 million times smaller than the output layer. At this scale, floating-point precision is lost and the early layers effectively stop learning."}),e.jsx(D,{q:"Why does ReLU solve the vanishing gradient problem?",a:"ReLU f(z) = max(0,z) has derivative f'(z) = 1 for z > 0 and 0 for z < 0. For neurons that are active (z > 0), the gradient passes through exactly unchanged — the product Π f'(z⁽ˡ⁾) includes factors of 1, not 0.25. This allows gradients to flow back through many layers without exponential attenuation. The trade-off is the 'dying ReLU' problem (neurons where z < 0 get exactly 0 gradient), addressed by Leaky ReLU, ELU, or GELU."}),e.jsx(D,{q:"How do residual connections solve the vanishing gradient problem?",a:"A residual block computes output = F(x) + x. By chain rule, ∂output/∂x = ∂F/∂x + I (identity). The gradient flowing backward through this block is: ∂L/∂x = ∂L/∂output · (∂F/∂x + I). Even if ∂F/∂x → 0 (vanished), the identity term I ensures the gradient is at least ∂L/∂output · I — it passes through unchanged. With skip connections, the network has a direct gradient path from the loss to every layer, bypassing potentially vanishing intermediate layers. This is why ResNets can be trained with 100+ layers."}),e.jsx(D,{q:"What is the difference between vanishing and exploding gradients?",a:"Both stem from the same multiplication of matrices in BP2. <strong>Vanishing</strong>: when weight matrices have spectral radius < 1 (or activation derivatives < 1 consistently), the product shrinks exponentially → early layer gradients → 0 → early layers don't update. <strong>Exploding</strong>: when weight matrices have spectral radius > 1, the product grows exponentially → gradients → ∞ → NaN weights. Vanishing is more common in feedforward networks; exploding in RNNs (unrolled over many time steps). Both are fixed by residual connections; exploding additionally by gradient clipping."})]})}const ee=[{id:"gd",label:"Gradient Descent"},{id:"vg",label:"Vanishing & Exploding"}];function ie(){const[i,u]=m.useState("gd"),o={gd:e.jsx(Z,{}),vg:e.jsx(J,{})};return e.jsxs("div",{children:[e.jsxs("div",{className:"page-header",children:[e.jsx("div",{className:"page-header-eyebrow",children:"Deep Learning — Module 06"}),e.jsx("h1",{className:"page-header-title",children:"Gradient Descent Variants · Vanishing & Exploding Gradients"}),e.jsx("p",{className:"page-header-subtitle",children:"Batch vs SGD vs Mini-batch · Vectorization · Vanishing gradient derivation · 5 solutions · Code diagnostics"})]}),e.jsx(q,{tabs:ee,active:i,onChange:u}),e.jsx("div",{style:{padding:"0.5rem 0 2rem"},children:o[i]}),e.jsx($,{moduleId:6})]})}export{ie as default};
