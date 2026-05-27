import{r as b,j as e}from"./index-BQO4ci8G.js";import{S as de,H as C,P as T,N as H,b as d,M as R,G as re,C as V,a as Z,T as X,Q as G,V as ee}from"./SectionNav-BDxYvY3P.js";import{N as me}from"./NavButtons-Bz-HQEP4.js";const O=({label:_,min:o,max:E,step:i,value:r,onChange:l,fmt:t=c=>c.toFixed(2)})=>e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"86px 1fr 48px",gap:8,alignItems:"center",fontSize:12.5},children:[e.jsx("span",{style:{color:"var(--color-text-secondary)"},children:_}),e.jsx("input",{type:"range",min:o,max:E,step:i,value:r,onChange:c=>l(+c.target.value),style:{width:"100%"}}),e.jsx("span",{style:{color:"var(--color-text-primary)",fontFamily:"var(--font-mono)",textAlign:"right"},children:t(r)})]});function he(){const _=b.useRef(null),[o,E]=b.useState(1.5),[i,r]=b.useState(1);return b.useEffect(()=>{const l=_.current;if(!l)return;const t=l.getContext("2d"),c=l.width,x=l.height;t.clearRect(0,0,c,x);let j=12345;const k=()=>(j=j*1664525+1013904223&4294967295,(j>>>0)/4294967295),W=()=>Math.sqrt(-2*Math.log(k()+1e-9))*Math.cos(2*Math.PI*k()),A=200,v=Array.from({length:A},()=>4+2.5*W()),w=v.reduce((m,h)=>m+h,0)/A,S=Math.sqrt(v.reduce((m,h)=>m+(h-w)**2,0)/A+1e-5),M=v.map(m=>o*((m-w)/S)+i),y=(m,h,N,p,g)=>{const u=Math.min(...m),n=Math.max(...m),a=n-u+1e-9,D=new Array(18).fill(0);m.forEach(L=>D[Math.min(Math.floor((L-u)/a*18),17)]++);const I=Math.max(...D),q=32,K=26,$=(N-12)/18;t.fillStyle=p,t.font="10.5px var(--font-sans)",t.textAlign="center",t.fillText(g,h+N/2,K-11);const Y=m.reduce((L,B)=>L+B,0)/A,U=Math.sqrt(m.reduce((L,B)=>L+(B-Y)**2,0)/A);t.fillStyle="rgba(150,150,150,0.6)",t.font="9px var(--font-mono)",t.fillText(`μ=${Y.toFixed(2)}, σ=${U.toFixed(2)}`,h+N/2,K-2),D.forEach((L,B)=>{const z=L/I*(x-K-q),Q=h+6+B*$,J=x-q-z;t.fillStyle=p+"44",t.fillRect(Q,J,$-1,z),t.strokeStyle=p+"bb",t.lineWidth=.8,t.strokeRect(Q,J,$-1,z)}),t.fillStyle="rgba(140,140,140,0.6)",t.font="9px var(--font-mono)",t.textAlign="left",t.fillText(u.toFixed(1),h+6,x-q+12),t.textAlign="right",t.fillText(n.toFixed(1),h+N-6,x-q+12)},f=(c-10)/2;y(v,0,f,"#4FC3F7","Before BN  —  raw activations"),y(M,f+10,f,"#66BB6A","After BN  (γ·x̂ + β)")},[o,i]),e.jsxs(ee,{children:[e.jsx("canvas",{ref:_,width:520,height:185,style:{display:"block",margin:"0 auto",maxWidth:"100%"}}),e.jsxs("div",{style:{display:"grid",gap:7,maxWidth:400,margin:"10px auto 0"},children:[e.jsx(O,{label:"γ (scale)",min:.1,max:3,step:.1,value:o,onChange:E,fmt:l=>l.toFixed(1)}),e.jsx(O,{label:"β (shift)",min:-2.5,max:3,step:.1,value:i,onChange:r,fmt:l=>l.toFixed(1)})]}),e.jsx("p",{style:{textAlign:"center",fontSize:11,color:"var(--color-text-tertiary)",margin:"6px 0 0"},children:"γ controls output std, β controls output mean — both are learnable parameters"})]})}function ge(){return e.jsxs("div",{children:[e.jsx(C,{children:"31 — Batch Normalization"}),e.jsx(T,{children:"Introduced by Ioffe & Szegedy (2015), Batch Normalization normalizes the inputs to each layer across a mini-batch during training. It dramatically accelerates convergence, stabilizes gradients, and acts as an implicit regularizer."}),e.jsx(d,{children:"The problem: internal covariate shift"}),e.jsx(T,{children:"As earlier weights update, the distribution of inputs to each subsequent layer shifts continuously — the layer must keep re-adapting. BN addresses this by fixing the input statistics of each layer at every training step using the current mini-batch."}),e.jsx(d,{children:"The 4-step BN forward pass"}),e.jsx(R,{block:!0,children:`Given mini-batch  B = {x₁, ..., xₘ}:

  Step 1 — batch mean:     μ_B  = (1/m) Σᵢ xᵢ

  Step 2 — batch variance: σ²_B = (1/m) Σᵢ (xᵢ − μ_B)²

  Step 3 — normalize:      x̂ᵢ  = (xᵢ − μ_B) / √(σ²_B + ε)      ← zero mean, unit variance

  Step 4 — scale & shift:  yᵢ  = γ · x̂ᵢ + β                     ← learnable γ, β

ε ≈ 1e-5 for numerical stability
γ, β are trainable — setting γ=σ_B and β=μ_B recovers the original distribution.`}),e.jsx(d,{children:"Interactive: effect of γ and β"}),e.jsx(he,{}),e.jsx(d,{children:"Training vs inference"}),e.jsx(T,{children:"At inference time, a single sample arrives — batch statistics are meaningless. BN maintains running statistics during training and uses them frozen at test time:"}),e.jsx(R,{block:!0,children:`Running mean:  μ_run ← momentum · μ_run + (1−momentum) · μ_B
Running var:   σ²_run← momentum · σ²_run + (1−momentum) · σ²_B

At test time:  x̂ = (x − μ_run) / √(σ²_run + ε)
               y = γ·x̂ + β`}),e.jsxs(H,{color:"danger",icon:"ti-alert-triangle",children:["The most common BN bug: forgetting ",e.jsx("code",{children:"model.eval()"})," before inference in PyTorch. In train mode, BN computes fresh batch statistics that behave incorrectly for a single sample or small test batch."]}),e.jsx(d,{children:"Where to place BN?"}),e.jsxs(re,{cols:2,gap:10,children:[e.jsx(V,{color:"info",title:"Original paper (Ioffe & Szegedy, 2015)",children:"Linear → BN → Activation. Normalizes pre-activation logits. Theoretically motivated."}),e.jsx(V,{color:"warning",title:"Modern practice",children:"Linear → Activation → BN, or just experiment. Empirically better for deep ReLU networks. Use your framework's default."})]}),e.jsxs(H,{color:"warning",icon:"ti-info-circle",children:["For ",e.jsx("strong",{children:"Transformers"})," and variable-length sequences, use ",e.jsx("strong",{children:"Layer Normalization"})," (normalizes across feature dimension, not batch). BN is primarily for CNNs and MLPs with batch size ≥ 16."]}),e.jsx(d,{children:"Why BN works — competing theories"}),e.jsx(X,{heads:["Theory","Claim"],rows:[["Internal covariate shift","Stabilizes layer input distributions; reduces re-adaptation cost per update"],["Implicit regularization","Batch-dependent μ_B, σ_B add stochastic noise → similar to Dropout"],["Gradient flow","Keeps pre-activations in linear regime of tanh/sigmoid → larger usable gradients"],["Loss landscape smoothing","Reduces Lipschitz constant (Santurkar et al., 2018) → allows bigger stable LR"]]}),e.jsx(d,{children:"Code"}),e.jsx(Z,{children:`import torch, torch.nn as nn

# ── Manual BN (for understanding) ────────────────────────
def bn_manual(x, gamma, beta, eps=1e-5):
    mu  = x.mean(dim=0)                     # shape: (features,)
    var = x.var(dim=0, unbiased=False)
    x_hat = (x - mu) / torch.sqrt(var + eps)
    return gamma * x_hat + beta

# ── nn.BatchNorm1d for FC layers, BatchNorm2d for conv ───
bn1d = nn.BatchNorm1d(num_features=256,
                      eps=1e-5, momentum=0.1,
                      affine=True,              # learnable γ and β
                      track_running_stats=True) # for inference

# ── BN-enabled MLP ────────────────────────────────────────
class BNMLP(nn.Module):
    def __init__(self):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(784, 256), nn.BatchNorm1d(256), nn.ReLU(),
            nn.Linear(256, 128), nn.BatchNorm1d(128), nn.ReLU(),
            nn.Linear(128, 10)
        )
    def forward(self, x): return self.net(x)

model = BNMLP()
model.train()   # BN uses current batch stats
model.eval()    # BN uses frozen running stats  ← essential for inference!

# ── Keras ─────────────────────────────────────────────────
import tensorflow as tf
model_k = tf.keras.Sequential([
    tf.keras.layers.Dense(256), tf.keras.layers.BatchNormalization(),
    tf.keras.layers.Activation('relu'),
    tf.keras.layers.Dense(128), tf.keras.layers.BatchNormalization(),
    tf.keras.layers.Activation('relu'),
    tf.keras.layers.Dense(10, activation='softmax')
])
# BatchNorm in Keras automatically uses running stats during model(x, training=False)`}),e.jsx(G,{q:"Why does BN act as a regularizer even without explicit penalty terms?",a:"Each sample's normalized value depends on the other samples in the same mini-batch: x̂ᵢ = (xᵢ − μ_B)/σ_B. Since the batch is a random subset, μ_B and σ_B are stochastic — so the normalized value of xᵢ changes randomly across batches. This is implicit noise injection, similar in effect to Dropout. The regularization disappears as batch size → ∞ (statistics converge to population values), which is why very large batches often need additional regularization."}),e.jsx(G,{q:"When does BN fail and what are the alternatives?",a:"<strong>Very small batches (m≤4):</strong> μ_B and σ_B are unreliable estimates — use <em>Layer Normalization</em> (normalizes across features per sample, batch-independent) or <em>Group Normalization</em>. <strong>RNNs / variable-length sequences:</strong> Sequence statistics vary wildly across time steps — use Layer Norm. <strong>Transformers:</strong> Use Layer Norm exclusively (it's the standard). BN's sweet spot: CNNs and MLPs with batch size 32–512 and i.i.d. data."}),e.jsx(G,{q:"If γ ≈ 0 for a neuron after training, what does it mean?",a:"The output yᵢ = γ·x̂ᵢ + β ≈ β — a constant, ignoring the activation entirely. The network has effectively <em>pruned</em> that neuron through learning. This is the basis of <strong>network slimming</strong>: train a BN-equipped model, identify channels where γ is near zero, remove those channels, and fine-tune. Since γ is regularizable (add L1 penalty on γ → push small ones to zero), this gives a differentiable approach to structured pruning."})]})}function ue(){const _=b.useRef(null),[o,E]=b.useState(.9);return b.useEffect(()=>{const i=_.current;if(!i)return;const r=i.getContext("2d"),l=i.width,t=i.height;r.clearRect(0,0,l,t);let c=77777;const x=()=>(c=c*1664525+1013904223&4294967295,(c>>>0)/4294967295),j=100,k=Array.from({length:j},(n,a)=>15+10*Math.sin(a/j*2*Math.PI*1.5)+5*(x()-.5)*2);let W=0,A=0;const v=k.map(n=>(W=o*W+(1-o)*n,W)),w=k.map((n,a)=>(A=o*A+(1-o)*n,A/(1-Math.pow(o,a+1)))),S=[...k,...v,...w],M=Math.min(...S)-1,y=Math.max(...S)+1,f=38,m=10,h=15,N=22,p=n=>f+n/(j-1)*(l-f-m),g=n=>h+(1-(n-M)/(y-M))*(t-h-N);r.strokeStyle="rgba(128,128,128,0.1)",r.lineWidth=.5;for(let n=0;n<=4;n++){const a=g(M+n/4*(y-M));r.beginPath(),r.moveTo(f,a),r.lineTo(l-m,a),r.stroke()}r.fillStyle="rgba(128,128,128,0.45)",r.font="9px var(--font-mono)",r.textAlign="right";for(let n=0;n<=4;n++)r.fillText((M+n/4*(y-M)).toFixed(0),f-3,g(M+n/4*(y-M))+3);r.fillStyle="rgba(150,150,150,0.3)",k.forEach((n,a)=>{r.beginPath(),r.arc(p(a),g(n),1.8,0,Math.PI*2),r.fill()}),r.beginPath(),r.strokeStyle="rgba(255,138,101,0.5)",r.lineWidth=1.5,v.forEach((n,a)=>a===0?r.moveTo(p(a),g(n)):r.lineTo(p(a),g(n))),r.stroke(),r.beginPath(),r.strokeStyle="#66BB6A",r.lineWidth=2.2,w.forEach((n,a)=>a===0?r.moveTo(p(a),g(n)):r.lineTo(p(a),g(n))),r.stroke(),r.font="10.5px var(--font-sans)",r.textAlign="left",r.fillStyle="rgba(150,150,150,0.5)",r.fillText("Raw signal",f+5,h+13),r.fillStyle="rgba(255,138,101,0.8)",r.fillText("EMA (no bias correction)",f+5,h+27),r.fillStyle="#66BB6A",r.fillText(`Bias-corrected EMA  (β=${o.toFixed(2)})`,f+5,h+41),r.textAlign="center",r.fillStyle="rgba(128,128,128,0.4)",r.font="10px var(--font-sans)",r.fillText("t →",l/2,t-3);const P=g(v[0]),u=g(w[0]);Math.abs(P-u)>10&&(r.strokeStyle="rgba(150,150,150,0.3)",r.lineWidth=.8,r.setLineDash([3,3]),r.beginPath(),r.moveTo(p(0),P),r.lineTo(p(0),u),r.stroke(),r.setLineDash([]),r.fillStyle="rgba(200,200,200,0.5)",r.font="9px var(--font-sans)",r.textAlign="center",r.fillText("bias",p(0)+20,(P+u)/2+4))},[o]),e.jsxs(ee,{children:[e.jsx("canvas",{ref:_,width:520,height:195,style:{display:"block",margin:"0 auto",maxWidth:"100%"}}),e.jsx("div",{style:{maxWidth:360,margin:"10px auto 0"},children:e.jsx(O,{label:"β",min:.5,max:.99,step:.01,value:o,onChange:E})}),e.jsx("p",{style:{textAlign:"center",fontSize:11,color:"var(--color-text-tertiary)",margin:"6px 0 0"},children:"Larger β → smoother (more memory) but larger initial bias  |  Effective memory ≈ 1/(1−β) steps"})]})}function pe(){return e.jsxs("div",{children:[e.jsx(C,{children:"32 — Gradient Descent Variants"}),e.jsx(T,{children:"Three flavors of GD differ only in how much data is used per weight update:"}),e.jsx(X,{heads:["Variant","Data per step","Gradient quality","Wall-clock cost","In practice"],rows:[["Batch GD","Full dataset N","Exact","Very high (full pass)","Tiny datasets only"],["Stochastic GD","1 sample","Very noisy","Minimal","Rarely used alone"],["Mini-batch GD","m samples (32–512)","Near-exact","Efficient (GPU vectorized)","Standard everywhere"]]}),e.jsxs(H,{color:"info",icon:"ti-info-circle",children:['When anyone says "SGD" in a deep learning context, they almost always mean ',e.jsx("strong",{children:"mini-batch GD"}),". The noise from mini-batches is actually beneficial — it helps escape sharp local minima and acts as implicit regularization."]}),e.jsx(C,{children:"33 — Exponential Moving Average (EMA)"}),e.jsx(T,{children:"EMA is the mathematical backbone of every momentum-based optimizer (Momentum, RMSProp, Adam). It computes a smoothed estimate of a sequence with exponentially decaying weights on older values."}),e.jsx(d,{children:"Formula and recursive expansion"}),e.jsx(R,{block:!0,children:`Recurrence:   v_t = β · v_{t−1} + (1−β) · θ_t

Unrolled:     v_t = (1−β) · Σ_{k=0}^{t−1} β^k · θ_{t−k}
                  = (1−β)[θ_t + β·θ_{t−1} + β²·θ_{t−2} + ···]

Weights:  geometrically decaying  (1−β), (1−β)β, (1−β)β², ...
Sum → 1 as t → ∞  (geometric series: (1−β)/(1−β) = 1)

"Memory window":  the ~1/(1−β) most recent values carry most weight
  β = 0.9   →  ~10  steps
  β = 0.99  →  ~100 steps
  β = 0.999 →  ~1000 steps`}),e.jsx(d,{children:"Bias correction"}),e.jsx(T,{children:"Starting from v₀ = 0 means early estimates are biased toward zero. For β = 0.99 at t=1:"}),e.jsx(R,{block:!0,children:`v_1 = (1−0.99)·θ_1 = 0.01·θ_1   ← 100× too small!

Bias-corrected:  v̂_t = v_t / (1 − β^t)

At t=1, β=0.99: v̂_1 = 0.01·θ_1 / (1−0.99) = θ_1  ✓  (exact)
At large t:      β^t → 0,  so v̂_t → v_t             ✓  (correction vanishes)`}),e.jsx(d,{children:"Interactive: EMA smoothing and bias correction"}),e.jsx(ue,{}),e.jsx(G,{q:"Why is EMA called 'exponentially weighted' when the formula looks recursive?",a:"Unrolling the recurrence reveals that the weight of θ_{t−k} is (1−β)·β^k. For 0 < β < 1, β^k decays as e^{−k/τ} where τ = 1/log(1/β) ≈ 1/(1−β) for β near 1 — this is the discrete analogue of an exponential decay function. So 'exponentially weighted' describes how the contribution of a past value decays as a function of its age k, not the recurrence itself."}),e.jsx(G,{q:"Show that bias correction is exact at t=1 and approaches identity for large t.",a:"At t=1: v₁ = (1−β)·θ₁ (since v₀=0). Bias-corrected: v̂₁ = v₁/(1−β¹) = (1−β)θ₁/(1−β) = θ₁ — exactly the current value, as desired. At large t: β^t → 0 since |β| < 1, so 1−β^t → 1, meaning v̂_t → v_t. The correction is exact when needed (early steps) and invisible when not (later steps). This is what makes bias correction elegant — it costs almost nothing asymptotically."})]})}function fe(){const _=b.useRef(null),[o,E]=b.useState(.85),[i,r]=b.useState(.9),[l,t]=b.useState({sgd:!0,mom:!0,nag:!0});return b.useEffect(()=>{const c=s=>.2*s,x=s=>2*s,A=[[4,2]];let[v,w]=[4,2];for(let s=0;s<80&&(v-=o*c(v),w-=o*x(w),A.push([v,w]),!(v*v+w*w<.001));s++);const S=o*.2,M=[[4,2]];let[y,f]=[4,2],[m,h]=[0,0];for(let s=0;s<80&&(m=i*m+c(y),h=i*h+x(f),y-=S*m,f-=S*h,M.push([y,f]),!(y*y+f*f<.001));s++);const N=[[4,2]];let[p,g]=[4,2],[P,u]=[0,0];for(let s=0;s<80;s++){const F=p-S*i*P,ae=g-S*i*u;if(P=i*P+c(F),u=i*u+x(ae),p-=S*P,g-=S*u,N.push([p,g]),p*p+g*g<.001)break}const n=_.current;if(!n)return;const a=n.getContext("2d"),D=n.width,I=n.height;a.clearRect(0,0,D,I);const q=-5.5,K=5.5,$=-3,Y=3,U=K-q,L=Y-$,B=s=>(s-q)/U*D,z=s=>(1-(s-$)/L)*I;a.fillStyle="rgb(13,17,26)",a.fillRect(0,0,D,I);const Q=[12,8,5,3,1.8,1,.5,.2,.07],J=[220,225,230,235,240,245,250,260,40];Q.forEach((s,F)=>{a.beginPath(),a.ellipse(B(0),z(0),Math.sqrt(s/.1)/U*D,Math.sqrt(s/1)/L*I,0,0,Math.PI*2),a.fillStyle=`hsla(${J[F]},40%,${16+F*3}%,1)`,a.fill()}),[.1,.3,.7,1.5,3,6,10].forEach((s,F)=>{a.strokeStyle=`rgba(100,140,220,${.1+F*.03})`,a.lineWidth=.7,a.beginPath(),a.ellipse(B(0),z(0),Math.sqrt(s/.1)/U*D,Math.sqrt(s)/L*I,0,0,Math.PI*2),a.stroke()}),a.beginPath(),a.arc(B(0),z(0),5,0,Math.PI*2),a.fillStyle="#FFD700",a.fill();const te=(s,F,ae,se)=>{if(!s||s.length<2)return;a.beginPath(),a.strokeStyle=F,a.lineWidth=2,s.forEach(([ne,ie],ce)=>ce===0?a.moveTo(B(ne),z(ie)):a.lineTo(B(ne),z(ie))),a.stroke(),a.beginPath(),a.arc(B(s[0][0]),z(s[0][1]),4,0,Math.PI*2),a.fillStyle=F,a.fill();const[oe,le]=s[s.length-1];a.beginPath(),a.arc(B(oe),z(le),3,0,Math.PI*2),a.strokeStyle=F,a.lineWidth=1.5,a.stroke(),a.font="10.5px var(--font-sans)",a.textAlign="left",a.fillStyle=F,a.fillText(ae,8,se)};l.sgd&&te(A,"#FF7043",`SGD  lr=${o.toFixed(2)}`,18),l.mom&&te(M,"#42A5F5",`Momentum  β=${i.toFixed(2)}, lr=${S.toFixed(3)}`,33),l.nag&&te(N,"#66BB6A",`NAG  β=${i.toFixed(2)}`,48),a.fillStyle="rgba(255,215,0,0.7)",a.font="9.5px var(--font-sans)",a.textAlign="left",a.fillText("min",B(0)+7,z(0)+4)},[o,i,l]),e.jsxs(ee,{children:[e.jsx("div",{style:{display:"flex",gap:8,marginBottom:8,flexWrap:"wrap"},children:[["sgd","SGD","#FF7043"],["mom","Momentum","#42A5F5"],["nag","NAG","#66BB6A"]].map(([c,x,j])=>e.jsxs("button",{onClick:()=>t(k=>({...k,[c]:!k[c]})),style:{padding:"3px 10px",fontSize:12,border:`1px solid ${j}`,borderRadius:"var(--border-radius-md)",background:l[c]?j+"22":"transparent",color:j,cursor:"pointer"},children:[l[c]?"✓ ":"",x]},c))}),e.jsx("canvas",{ref:_,width:500,height:280,style:{display:"block",width:"100%",maxWidth:500,margin:"0 auto",borderRadius:"var(--border-radius-md)"}}),e.jsxs("div",{style:{display:"grid",gap:7,maxWidth:420,margin:"10px auto 0"},children:[e.jsx(O,{label:"SGD lr",min:.3,max:1.3,step:.05,value:o,onChange:E,fmt:c=>c.toFixed(2)}),e.jsx(O,{label:"β",min:.5,max:.99,step:.01,value:i,onChange:r})]}),e.jsxs("p",{style:{textAlign:"center",fontSize:11,color:"var(--color-text-tertiary)",margin:"6px 0 0"},children:["f(x,y) = 0.1x² + y²  ·  start: (4, 2)  ·  Momentum/NAG use lr×0.2  ·  try lr ",">"," 1.0 to see SGD diverge"]})]})}function xe(){return e.jsxs("div",{children:[e.jsx(C,{children:"34 — SGD with Momentum"}),e.jsx(T,{children:"On a ravine (surface with very different curvatures in different directions), SGD oscillates heavily in the steep dimension while barely moving in the flat one. Momentum fixes this by accumulating velocity — building speed in consistent gradient directions and dampening oscillations."}),e.jsx(d,{children:"Mathematical formulation — two conventions"}),e.jsx(R,{block:!0,children:`Classical form (PyTorch default):
  v_t = β · v_{t−1} + g_t           [no (1−β) factor]
  θ_{t+1} = θ_t − α · v_t

EMA form (used in Adam derivations):
  v_t = β · v_{t−1} + (1−β) · g_t   [EMA of gradients]
  θ_{t+1} = θ_t − α · v_t

Both are equivalent up to a rescaling of α.
g_t = ∇_θ L(θ_t),   β ∈ [0.85, 0.99],  typical default β = 0.9`}),e.jsx(d,{children:"Why it works: effective LR and oscillation damping"}),e.jsx(T,{children:"In an oscillating direction, gradients alternate sign (+g, −g, +g, ...) so accumulated velocity cancels out. In a consistent direction, velocity builds up:"}),e.jsx(R,{block:!0,children:`Steady-state velocity for constant gradient g:
  v* = β·v* + g  →  v*(1−β) = g  →  v* = g/(1−β)

Effective LR in consistent direction:  α_eff = α/(1−β)

β=0.9  →  α_eff = 10α   (10× speed-up in flat directions)
β=0.99 →  α_eff = 100α  (must reduce α accordingly to avoid divergence)`}),e.jsx(C,{children:"35 — Nesterov Accelerated Gradient (NAG)"}),e.jsx(T,{children:"NAG adds a look-ahead correction: compute the gradient not at the current position, but at the estimated future position after momentum would have moved the parameters. This brakes early instead of correcting after overshooting."}),e.jsxs(re,{cols:2,gap:10,children:[e.jsx(V,{color:"danger",title:"Momentum — reactive",children:"Compute grad at θ_t → update velocity → step. By the time we compute the gradient, momentum has already committed to a direction. Correction is always one step late."}),e.jsx(V,{color:"success",title:"NAG — anticipatory",children:"Look-ahead to θ̃ = θ − α·β·v → compute grad there → update. Like a car that brakes when it sees the curve ahead, not after entering it."})]}),e.jsx(d,{children:"NAG formulation"}),e.jsx(R,{block:!0,children:`Look-ahead position:  θ̃_t = θ_t − α·β·v_{t−1}

Gradient at look-ahead: g̃_t = ∇L(θ̃_t)

Velocity update:      v_t = β·v_{t−1} + g̃_t

Parameter update:     θ_{t+1} = θ_t − α·v_t

Convergence:  O(1/t²) for convex problems  vs  O(1/t) for standard momentum.`}),e.jsx(d,{children:"Interactive: optimizer paths on elongated bowl"}),e.jsx(fe,{}),e.jsx(H,{color:"info",icon:"ti-info-circle",children:"Increase lr past 1.0 — SGD diverges (oscillation amplitude grows) while Momentum and NAG remain stable due to their smaller effective lr. Notice NAG takes a smoother, more direct path than Momentum near the minimum."}),e.jsx(d,{children:"Implementation"}),e.jsx(Z,{children:`import torch.optim as optim, tensorflow as tf

# ── PyTorch ───────────────────────────────────────────────
opt_mom = optim.SGD(model.parameters(), lr=0.01, momentum=0.9, nesterov=False)
opt_nag = optim.SGD(model.parameters(), lr=0.01, momentum=0.9, nesterov=True)

# ── Keras ─────────────────────────────────────────────────
opt_mom_k = tf.keras.optimizers.SGD(learning_rate=0.01, momentum=0.9, nesterov=False)
opt_nag_k = tf.keras.optimizers.SGD(learning_rate=0.01, momentum=0.9, nesterov=True)

# Training loop is identical — optimizer handles the internals
for X, y in dataloader:
    opt_nag.zero_grad()
    loss = criterion(model(X), y)
    loss.backward()
    opt_nag.step()`}),e.jsx(d,{children:"β sensitivity"}),e.jsx(X,{heads:["β","Memory ≈ 1/(1−β)","Behaviour"],rows:[["0.0","1","Pure SGD — no momentum at all"],["0.5","2","Light smoothing, quick adaptation"],["0.9","10","Standard default — solid balance"],["0.99","100","Heavy smoothing, sluggish adaptation, halve α"]]}),e.jsx(G,{q:"Derive the effective learning rate boost from momentum for constant gradients.",a:"For constant gradient g_t = g (classical form), velocity reaches a fixed point v*: v* = β·v* + g → v*(1−β) = g → v* = g/(1−β). The update θ_{t+1} = θ_t − α·v* = θ_t − α·g/(1−β) is equivalent to SGD with effective LR α_eff = α/(1−β). For β=0.9 and α=0.01: α_eff = 0.1 — a 10× increase. This explains the dramatic speed-up in low-curvature (consistent gradient) directions while oscillating directions remain bounded because their gradients cancel in the EMA."}),e.jsx(G,{q:"What is the key algorithmic difference between Momentum and NAG, and why does it matter?",a:"<strong>Momentum</strong>: compute gradient at current θ_t, then update velocity, then move. <strong>NAG</strong>: first project to the look-ahead position θ̃ = θ − α·β·v, compute gradient there, then update. The key difference is that NAG's gradient evaluates the loss at a position closer to where the parameters will actually end up after the step. For convex objectives this gives a faster O(1/t²) convergence rate vs O(1/t) for standard momentum (Nesterov, 1983). In practice for non-convex deep learning, the gap is empirically smaller but NAG still oscillates less near minima."})]})}function ve(){const _=b.useRef(null),[o,E]=b.useState(.9),[i,r]=b.useState(.1);return b.useEffect(()=>{const l=_.current;if(!l)return;const t=l.getContext("2d"),c=l.width,x=l.height;t.clearRect(0,0,c,x);let j=99991;const k=()=>(j=j*1664525+1013904223&4294967295,(j>>>0)/4294967295),W=()=>Math.sqrt(-2*Math.log(k()+1e-9))*Math.cos(2*Math.PI*k()),A=150,v=1e-8,w=Array.from({length:A},()=>W()+.3);let S=0;const M=w.map(n=>(S+=n*n,i/Math.sqrt(S+v)));let y=0;const f=w.map(n=>(y=o*y+(1-o)*n*n,i/Math.sqrt(y+v))),m=44,h=12,N=15,p=22,g=n=>m+n/(A-1)*(c-m-h),P=n=>Math.max(0,Math.min(n,i*1.05)),u=n=>N+(1-P(n)/(i*1.05))*(x-N-p);t.strokeStyle="rgba(128,128,128,0.1)",t.lineWidth=.5,[0,.25,.5,.75,1].forEach(n=>{const a=u(i*n);t.beginPath(),t.moveTo(m,a),t.lineTo(c-h,a),t.stroke()}),t.fillStyle="rgba(128,128,128,0.45)",t.font="9px var(--font-mono)",t.textAlign="right",[0,.5,1].forEach(n=>t.fillText((i*n).toFixed(3),m-3,u(i*n)+3)),t.setLineDash([5,4]),t.strokeStyle="rgba(150,150,150,0.2)",t.lineWidth=.8,t.beginPath(),t.moveTo(m,u(i)),t.lineTo(c-h,u(i)),t.stroke(),t.setLineDash([]),t.fillStyle="rgba(150,150,150,0.4)",t.font="9px var(--font-mono)",t.textAlign="left",t.fillText("α₀",m+2,u(i)-3),t.beginPath(),t.strokeStyle="#FF7043",t.lineWidth=2,M.forEach((n,a)=>a===0?t.moveTo(g(a),u(n)):t.lineTo(g(a),u(n))),t.stroke(),t.beginPath(),t.strokeStyle="#42A5F5",t.lineWidth=2,f.forEach((n,a)=>a===0?t.moveTo(g(a),u(n)):t.lineTo(g(a),u(n))),t.stroke(),t.font="10.5px var(--font-sans)",t.textAlign="left",t.fillStyle="#FF7043",t.fillText("AdaGrad — monotonically → 0",m+5,N+14),t.fillStyle="#42A5F5",t.fillText(`RMSProp — stabilizes  (ρ=${o.toFixed(2)})`,m+5,N+28),t.textAlign="center",t.fillStyle="rgba(128,128,128,0.4)",t.font="10px var(--font-sans)",t.fillText("Iterations →",c/2,x-3)},[o,i]),e.jsxs(ee,{children:[e.jsx("canvas",{ref:_,width:520,height:200,style:{display:"block",margin:"0 auto",maxWidth:"100%"}}),e.jsxs("div",{style:{display:"grid",gap:7,maxWidth:400,margin:"10px auto 0"},children:[e.jsx(O,{label:"ρ (RMSProp)",min:.5,max:.99,step:.01,value:o,onChange:E}),e.jsx(O,{label:"α₀ (base lr)",min:.01,max:.5,step:.01,value:i,onChange:r,fmt:l=>l.toFixed(2)})]}),e.jsx("p",{style:{textAlign:"center",fontSize:11,color:"var(--color-text-tertiary)",margin:"6px 0 0"},children:"AdaGrad denominator: √(Σg²) — grows forever.  RMSProp denominator: √(EMA of g²) — stays bounded."})]})}function ye(){return e.jsxs("div",{children:[e.jsx(C,{children:"36 — AdaGrad: Adaptive Gradient"}),e.jsx(T,{children:"AdaGrad (Duchi et al., 2011) gives each parameter its own adaptive learning rate: frequently-updated parameters with large gradients get smaller updates; rarely-updated (sparse) parameters get larger updates. This is ideal for NLP tasks with sparse vocabulary gradients."}),e.jsx(d,{children:"The sparse feature motivation"}),e.jsx(T,{children:"In NLP, most word embeddings are zero-gradient for any given batch (the word didn't appear). AdaGrad amplifies updates for these rare features and shrinks updates for common ones — automatic per-parameter LR tuning."}),e.jsx(d,{children:"Mathematical formulation"}),e.jsx(R,{block:!0,children:`Accumulate squared gradients (per-parameter, element-wise):
  G_t = Σ_{τ=1}^{t} g_τ²          ← cumulative sum, grows monotonically

Adaptive update:
  θ_{t+1} = θ_t − (α / √(G_t + ε)) · g_t

Interpretation:
  Large consistent gradients → G_t grows fast → small effective LR  ✓
  Small / sparse gradients  → G_t stays small→ large effective LR   ✓`}),e.jsxs(H,{color:"danger",icon:"ti-x",children:[e.jsx("strong",{children:"Fatal flaw:"})," G_t is a cumulative sum that never decreases. For any densely-updated parameter, α/√G_t → 0 and training effectively stops, well before convergence. AdaGrad is unsuitable for deep networks trained for many steps."]}),e.jsx(C,{children:"37 — RMSProp: Root Mean Square Propagation"}),e.jsx(T,{children:"Proposed by Hinton (2012, unpublished — Coursera lecture). The fix is surgical: replace AdaGrad's cumulative sum with an Exponential Moving Average of squared gradients. Old gradients are forgotten, so the denominator stays bounded."}),e.jsx(d,{children:"Mathematical formulation"}),e.jsx(R,{block:!0,children:`EMA of squared gradients (per-parameter):
  E[g²]_t = ρ · E[g²]_{t−1} + (1−ρ) · g_t²   ← forgets old gradients

Adaptive update:
  θ_{t+1} = θ_t − (α / √(E[g²]_t + ε)) · g_t

Key difference:
  AdaGrad:  denominator = √(Σ_{all past} g_τ²)        → grows forever → lr → 0
  RMSProp:  denominator = √(recent weighted avg of g²)  → stabilizes   → lr bounded

Defaults: ρ = 0.9,  α = 0.001,  ε = 1e-8`}),e.jsx(d,{children:"Interactive: effective learning rate comparison"}),e.jsx(ve,{}),e.jsx(d,{children:"Code"}),e.jsx(Z,{children:`import torch.optim as optim, tensorflow as tf

# ── AdaGrad ───────────────────────────────────────────────
optim.Adagrad(model.parameters(), lr=0.01, eps=1e-10)

# ── RMSProp ───────────────────────────────────────────────
optim.RMSprop(
    model.parameters(),
    lr=0.001,
    alpha=0.99,       # ρ in our notation (EMA decay for squared grad)
    eps=1e-8,
    momentum=0,       # optional: add momentum on top
    centered=False    # if True: normalizes by variance (not RMS)
)

# ── Keras ─────────────────────────────────────────────────
tf.keras.optimizers.RMSprop(learning_rate=0.001, rho=0.9, epsilon=1e-07)`}),e.jsx(G,{q:"Why does AdaGrad excel for NLP/sparse features but fail for dense deep networks?",a:"In NLP, word k's embedding gradient is zero for most batches (k didn't appear). G_{t,k} accumulates slowly, keeping a large effective LR for that embedding when it does appear — perfect for rare features. For a common word, G_{t,k} grows quickly, shrinking the LR proportionally. This is ideal for sparse gradients. The failure mode: in a dense deep network, every parameter gets a gradient every step. G_{t,i} grows for all parameters simultaneously, and all effective learning rates decay to zero well before the model converges."}),e.jsx(G,{q:"Prove that RMSProp's effective LR stabilizes for stationary gradient distributions.",a:"If g_t is i.i.d. with E[g²] = σ², then E[g²]_t converges to a fixed point: E* = ρ·E* + (1−ρ)·σ² → E*(1−ρ) = (1−ρ)σ² → E* = σ². The effective LR stabilizes at α/√(σ²+ε) ≈ α/σ — constant over time, not decaying. Large-gradient parameters get a small but stable LR (α/σ_large), small-gradient ones get a larger but stable LR (α/σ_small). RMSProp thus normalizes by gradient scale without the collapse problem of AdaGrad."})]})}function be(){return e.jsxs("div",{children:[e.jsx(C,{children:"38 — Adam: Adaptive Moment Estimation"}),e.jsx(T,{children:"Adam (Kingma & Ba, 2014) combines SGD with Momentum (1st moment) and RMSProp (2nd moment) with bias correction for both. It is the de-facto standard optimizer for deep learning."}),e.jsxs(H,{color:"info",icon:"ti-bulb",children:[e.jsx("strong",{children:"Mental model:"})," Adam tracks ",e.jsx("em",{children:"where"})," the gradient has been pointing recently (1st moment → direction) and ",e.jsx("em",{children:"how large"})," the gradients have been (2nd moment → scale). Dividing direction by scale gives nearly unit-magnitude steps — Adam is approximately scale-invariant."]}),e.jsx(d,{children:"Full algorithm"}),e.jsx(R,{block:!0,children:`Hyperparameters:  α=0.001  β₁=0.9  β₂=0.999  ε=1e-8
Initialize:  m₀=0, v₀=0

At each step t:
  (1) g_t = ∇_θ L(θ_{t−1})                  [compute gradient]

  (2) m_t = β₁·m_{t−1} + (1−β₁)·g_t        [1st moment: EMA of gradient]
  (3) v_t = β₂·v_{t−1} + (1−β₂)·g_t²       [2nd moment: EMA of gradient²]

  (4) m̂_t = m_t / (1 − β₁ᵗ)                [bias-correct 1st moment]
      v̂_t = v_t / (1 − β₂ᵗ)                [bias-correct 2nd moment]

  (5) θ_t = θ_{t−1} − α · m̂_t / (√v̂_t + ε) [update]`}),e.jsx(d,{children:"Bias correction: why it matters"}),e.jsx(T,{children:"Both m₀=0 and v₀=0 cause severe underestimation in early steps:"}),e.jsx(R,{block:!0,children:`At t=1, β₁=0.9, β₂=0.999:
  m₁ = 0.1·g₁          → 10× too small
  v₁ = 0.001·g₁²       → 1000× too small!

Without correction: update ≈ 3.16·α (unpredictably large first step)
With correction:    m̂₁ = g₁, v̂₁ = g₁²  → update ≈ α·sign(g₁)  ✓

At large t: β₁ᵗ → 0 and β₂ᵗ → 0, so m̂_t → m_t, v̂_t → v_t (corrections vanish).`}),e.jsx(d,{children:"Scale-invariance (why Adam needs little LR tuning)"}),e.jsx(R,{block:!0,children:`For large t with approximately constant gradient g:
  m̂_t → g,    v̂_t → g²

  update = α · g / (√g² + ε) ≈ α · sign(g)

→ Adam always takes steps of magnitude ≈ α regardless of gradient scale.
  This is why the same α=1e-3 works across wildly different architectures.`}),e.jsx(d,{children:"The three components"}),e.jsxs(re,{cols:3,gap:10,children:[e.jsx(V,{color:"info",title:"1st moment m̂_t (Momentum)",children:"EMA of recent gradients. Provides directional smoothing. Accelerates in consistent gradient directions."}),e.jsx(V,{color:"success",title:"2nd moment v̂_t (RMSProp)",children:"EMA of recent gradient². Estimates gradient magnitude. Normalizes update size per-parameter."}),e.jsx(V,{color:"warning",title:"Bias correction",children:"Compensates for zero initialization of m₀, v₀. Ensures correct step size from the very first update."})]}),e.jsx(d,{children:"Code"}),e.jsx(Z,{children:`import torch, torch.nn as nn, torch.optim as optim

model = YourModel()
criterion = nn.CrossEntropyLoss()

# ── Standard Adam ─────────────────────────────────────────
optimizer = optim.Adam(
    model.parameters(),
    lr=1e-3,           # α — the most important hyperparameter to tune
    betas=(0.9, 0.999),# (β₁, β₂)
    eps=1e-8,          # ε — numerical stability
    weight_decay=0,    # L2 regularization (use AdamW for decoupled version)
    amsgrad=False
)

# ── AdamW (preferred for Transformers / fine-tuning) ─────
optimizer_w = optim.AdamW(
    model.parameters(),
    lr=1e-3,
    betas=(0.9, 0.999),
    eps=1e-8,
    weight_decay=1e-2  # applied directly to θ, not via gradient
)

# ── Manual implementation (for full understanding) ───────
def adam_step(params, grads, m, v, t, lr=1e-3, b1=0.9, b2=0.999, eps=1e-8):
    for i, (p, g) in enumerate(zip(params, grads)):
        m[i] = b1*m[i] + (1-b1)*g
        v[i] = b2*v[i] + (1-b2)*g**2
        m_hat = m[i] / (1 - b1**t)          # bias correction
        v_hat = v[i] / (1 - b2**t)
        p.data -= lr * m_hat / (torch.sqrt(v_hat) + eps)
    return params, m, v

# Training loop
for epoch in range(num_epochs):
    for X, y in dataloader:
        optimizer.zero_grad()
        loss = criterion(model(X), y)
        loss.backward()
        optimizer.step()

# ── Keras ─────────────────────────────────────────────────
import tensorflow as tf
model.compile(
    optimizer=tf.keras.optimizers.Adam(lr=0.001, beta_1=0.9, beta_2=0.999, epsilon=1e-7),
    loss='sparse_categorical_crossentropy', metrics=['accuracy']
)`}),e.jsx(d,{children:"Complete optimizer comparison"}),e.jsx(X,{heads:["Optimizer","1st moment","2nd moment","Adaptive LR","Bias Corr.","Best use case"],rows:[["SGD","—","—","No","No","Convex problems; CV with careful LR schedule"],["Momentum","β·v+g (classical)","—","No","No","Faster than SGD; classic DL training"],["NAG","look-ahead g","—","No","No","Better Momentum; O(1/t²) convex convergence"],["AdaGrad","—","Σg² (cumulative)","Per-param","No","Sparse NLP embeddings; short training runs"],["RMSProp","—","EMA(g²)","Per-param","No","RNNs; non-stationary objectives"],["Adam","EMA(g)","EMA(g²)","Per-param","Yes","Default for nearly all DL tasks"],["AdamW","EMA(g)","EMA(g²)","Per-param","Yes","Transformers; BERT/GPT fine-tuning"],["AMSGrad","EMA(g)","max(EMA(g²))","Per-param","Yes","Needs convergence guarantee; rarely outperforms Adam"]]}),e.jsx(d,{children:"Hyperparameter guide"}),e.jsx(X,{heads:["Param","Default","Common range","Effect if too large"],rows:[["α (lr)","1e-3","1e-5 – 1e-2","Divergence or oscillation"],["β₁","0.9","0.85 – 0.95","Slower direction adaptation"],["β₂","0.999","0.99 – 0.9999","Noisy 2nd moment estimate (smaller β₂)"],["ε","1e-8","1e-9 – 1e-4","Reduced per-param adaptation (larger ε)"],["weight_decay","0","0 – 0.1","Overly shrunk weights; underfitting"]]}),e.jsxs(H,{color:"success",icon:"ti-check",children:[e.jsx("strong",{children:"Practical defaults:"}),' Start with Adam + lr=1e-3. For Transformers use AdamW + lr=2e-5 (fine-tuning) or 1e-4 (from scratch). For vision CNNs, SGD+Momentum+cosine schedule often beats Adam on final test accuracy. The "Karpathy constant" lr=3e-4 works surprisingly often for Adam on vision tasks.']}),e.jsx(G,{q:"Why does Adam sometimes generalize worse than well-tuned SGD?",a:"Adam converges to sharper minima (narrower loss valleys with large Hessian eigenvalues). Sharp minima generalize poorly because small perturbations to weights cause large loss changes (Keskar et al., 2016). SGD's noise from mini-batches acts as implicit regularization, preferring <em>flat</em> minima that generalize better. Practically: Adam is faster to converge but SGD+Momentum+cosine LR schedule often reaches lower test error given enough training time. One hybrid strategy: train with Adam for fast initial convergence, then switch to SGD for the last few epochs ('SWATS' method)."}),e.jsx(G,{q:"What is AdamW and why is decoupled weight decay better than L2 regularization in Adam?",a:"Standard Adam with weight_decay adds λ||θ||² to the loss. The gradient then includes λθ, which gets divided by √v̂_t — so the effective regularization strength per parameter depends on its gradient history in an unintuitive way (parameters with large gradients get less regularization). <strong>AdamW</strong> (Loshchilov & Hutter, 2017) directly subtracts α·λ·θ from the parameters: θ ← θ − α·m̂/√v̂ − α·λ·θ. Weight decay applies uniformly regardless of gradient magnitude, matching the theoretical motivation for L2 regularization. This matters especially for Transformers where AdamW is now the standard."}),e.jsx(G,{q:"Derive why Adam's update has magnitude approximately α, regardless of gradient scale.",a:"For large t (bias correction ≈ 1) and approximately constant gradient g: m̂_t ≈ EMA(g) ≈ g and v̂_t ≈ EMA(g²) ≈ g². The update per dimension is: α · m̂_t / (√v̂_t + ε) ≈ α · g / (|g| + ε) ≈ α · sign(g). The magnitude is α regardless of whether g = 1e-5 or g = 1e5. In practice gradients aren't constant so the update varies, but it stays in a well-bounded range around α. This scale-invariance is why Adam rarely needs per-layer LR adjustment and transfers hyperparameters across architectures."}),e.jsx(G,{q:"What is AMSGrad and when should you use it?",a:"AMSGrad (Reddi et al., 2018) replaces v̂_t with v̂_t_max = max(v̂_{t−1,max}, v̂_t), ensuring the denominator is monotonically non-decreasing. This provides a formal convergence guarantee similar to AdaGrad — standard Adam can theoretically fail to converge on certain adversarial examples. In practice AMSGrad rarely outperforms standard Adam on real-world deep learning tasks; the non-convergence pathology is mostly a theoretical concern on toy problems. Use AMSGrad if: (1) you need a provable convergence guarantee, or (2) standard Adam fails to converge on your specific problem."})]})}const _e=[{id:"bn",label:"Batch Norm",sub:"Ch. 31"},{id:"ema",label:"GD + EMA",sub:"Ch. 32–33"},{id:"mom",label:"Momentum + NAG",sub:"Ch. 34–35"},{id:"ada",label:"AdaGrad + RMSProp",sub:"Ch. 36–37"},{id:"adam",label:"Adam",sub:"Ch. 38"}];function Se(){const[_,o]=b.useState("bn"),E={bn:e.jsx(ge,{}),ema:e.jsx(pe,{}),mom:e.jsx(xe,{}),ada:e.jsx(ye,{}),adam:e.jsx(be,{})};return e.jsxs("div",{children:[e.jsxs("div",{className:"page-header",children:[e.jsx("div",{className:"page-header-eyebrow",children:"Deep Learning — Module 8"}),e.jsx("h1",{className:"page-header-title",children:"Batch Norm · GD Variants · EMA · Momentum · NAG · AdaGrad · RMSProp · Adam"}),e.jsx("p",{className:"page-header-subtitle",children:"Chapters 31–38 · Interactive visualizations · Derivations · Production-grade code"})]}),e.jsx(de,{tabs:_e,active:_,onChange:o}),e.jsx("div",{style:{padding:"0.5rem 0 2rem"},children:E[_]}),e.jsx(me,{moduleId:8})]})}export{Se as default};
