import { useState, useRef, useEffect } from "react";
import { Code } from '../components/ui/Code.jsx';
import { Mx, H2, H3, P } from '../components/ui/Typography.jsx';
import { QA } from '../components/ui/QA.jsx';
import { Note, Table, Grid, Card, VizBox } from '../components/ui/Primitives.jsx';
import NavButtons from '../components/layout/NavButtons.jsx';
import SectionNav from '../components/layout/SectionNav.jsx';

const SliderRow = ({label,min,max,step,value,onChange,fmt=v=>v.toFixed(2)}) => (
  <div style={{ display:"grid", gridTemplateColumns:"86px 1fr 48px", gap:8, alignItems:"center", fontSize:12.5 }}>
    <span style={{ color:"var(--color-text-secondary)" }}>{label}</span>
    <input type="range" min={min} max={max} step={step} value={value} onChange={e=>onChange(+e.target.value)} style={{ width:"100%" }}/>
    <span style={{ color:"var(--color-text-primary)", fontFamily:"var(--font-mono)", textAlign:"right" }}>{fmt(value)}</span>
  </div>
);

/* ══════════════════════════════════════════════════════
   BN HISTOGRAM
══════════════════════════════════════════════════════ */
function BNHistogram() {
  const ref=useRef(null);
  const [gamma,setGamma]=useState(1.5);
  const [beta,setBeta]=useState(1.0);

  useEffect(()=>{
    const cv=ref.current; if(!cv) return;
    const ctx=cv.getContext("2d");
    const W=cv.width, H=cv.height;
    ctx.clearRect(0,0,W,H);

    // Reproducible pseudo-random N(4, 2.5²)
    let s=12345;
    const rand=()=>{ s=(s*1664525+1013904223)&0xFFFFFFFF; return (s>>>0)/0xFFFFFFFF; };
    const randn=()=>Math.sqrt(-2*Math.log(rand()+1e-9))*Math.cos(2*Math.PI*rand());
    const N=200;
    const raw=Array.from({length:N},()=>4+2.5*randn());

    // BN forward pass
    const mu=raw.reduce((a,b)=>a+b,0)/N;
    const sigma=Math.sqrt(raw.reduce((a,b)=>a+(b-mu)**2,0)/N+1e-5);
    const output=raw.map(x=>gamma*((x-mu)/sigma)+beta);

    const drawHist=(data,x0,width,color,title)=>{
      const BINS=18, lo=Math.min(...data), hi=Math.max(...data);
      const range=hi-lo+1e-9;
      const counts=new Array(BINS).fill(0);
      data.forEach(v=>counts[Math.min(Math.floor((v-lo)/range*BINS),BINS-1)]++);
      const maxC=Math.max(...counts);
      const padB=32,padT=26,bw=(width-12)/BINS;

      ctx.fillStyle=color; ctx.font="10.5px var(--font-sans)"; ctx.textAlign="center";
      ctx.fillText(title,x0+width/2,padT-11);
      const dmean=data.reduce((a,b)=>a+b,0)/N;
      const dstd=Math.sqrt(data.reduce((a,b)=>a+(b-dmean)**2,0)/N);
      ctx.fillStyle="rgba(150,150,150,0.6)"; ctx.font="9px var(--font-mono)";
      ctx.fillText(`μ=${dmean.toFixed(2)}, σ=${dstd.toFixed(2)}`,x0+width/2,padT-2);

      counts.forEach((c,i)=>{
        const bh=c/maxC*(H-padT-padB);
        const bx=x0+6+i*bw, by=H-padB-bh;
        ctx.fillStyle=color+"44"; ctx.fillRect(bx,by,bw-1,bh);
        ctx.strokeStyle=color+"bb"; ctx.lineWidth=0.8; ctx.strokeRect(bx,by,bw-1,bh);
      });
      ctx.fillStyle="rgba(140,140,140,0.6)"; ctx.font="9px var(--font-mono)";
      ctx.textAlign="left";  ctx.fillText(lo.toFixed(1),x0+6,H-padB+12);
      ctx.textAlign="right"; ctx.fillText(hi.toFixed(1),x0+width-6,H-padB+12);
    };

    const half=(W-10)/2;
    drawHist(raw,0,half,"#4FC3F7","Before BN  —  raw activations");
    drawHist(output,half+10,half,"#66BB6A","After BN  (γ·x̂ + β)");
  },[gamma,beta]);

  return (
    <VizBox>
      <canvas ref={ref} width={520} height={185} style={{ display:"block",margin:"0 auto", maxWidth: "100%" }}/>
      <div style={{ display:"grid", gap:7, maxWidth:400, margin:"10px auto 0" }}>
        <SliderRow label="γ (scale)" min={0.1} max={3} step={0.1} value={gamma} onChange={setGamma} fmt={v=>v.toFixed(1)}/>
        <SliderRow label="β (shift)" min={-2.5} max={3} step={0.1} value={beta}  onChange={setBeta}  fmt={v=>v.toFixed(1)}/>
      </div>
      <p style={{ textAlign:"center", fontSize:11, color:"var(--color-text-tertiary)", margin:"6px 0 0" }}>
        γ controls output std, β controls output mean — both are learnable parameters
      </p>
    </VizBox>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 1 — BATCH NORMALIZATION
══════════════════════════════════════════════════════ */
function SectionBN() {
  return (
    <div>
      <H2>31 — Batch Normalization</H2>
      <P>Introduced by Ioffe & Szegedy (2015), Batch Normalization normalizes the inputs to each layer across a mini-batch during training. It dramatically accelerates convergence, stabilizes gradients, and acts as an implicit regularizer.</P>

      <H3>The problem: internal covariate shift</H3>
      <P>As earlier weights update, the distribution of inputs to each subsequent layer shifts continuously — the layer must keep re-adapting. BN addresses this by fixing the input statistics of each layer at every training step using the current mini-batch.</P>

      <H3>The 4-step BN forward pass</H3>
      <Mx block>{`Given mini-batch  B = {x₁, ..., xₘ}:

  Step 1 — batch mean:     μ_B  = (1/m) Σᵢ xᵢ

  Step 2 — batch variance: σ²_B = (1/m) Σᵢ (xᵢ − μ_B)²

  Step 3 — normalize:      x̂ᵢ  = (xᵢ − μ_B) / √(σ²_B + ε)      ← zero mean, unit variance

  Step 4 — scale & shift:  yᵢ  = γ · x̂ᵢ + β                     ← learnable γ, β

ε ≈ 1e-5 for numerical stability
γ, β are trainable — setting γ=σ_B and β=μ_B recovers the original distribution.`}</Mx>

      <H3>Interactive: effect of γ and β</H3>
      <BNHistogram/>

      <H3>Training vs inference</H3>
      <P>At inference time, a single sample arrives — batch statistics are meaningless. BN maintains running statistics during training and uses them frozen at test time:</P>
      <Mx block>{`Running mean:  μ_run ← momentum · μ_run + (1−momentum) · μ_B
Running var:   σ²_run← momentum · σ²_run + (1−momentum) · σ²_B

At test time:  x̂ = (x − μ_run) / √(σ²_run + ε)
               y = γ·x̂ + β`}</Mx>
      <Note color="danger" icon="ti-alert-triangle">
        The most common BN bug: forgetting <code>model.eval()</code> before inference in PyTorch. In train mode, BN computes fresh batch statistics that behave incorrectly for a single sample or small test batch.
      </Note>

      <H3>Where to place BN?</H3>
      <Grid cols={2} gap={10}>
        <Card color="info" title="Original paper (Ioffe & Szegedy, 2015)">Linear → BN → Activation. Normalizes pre-activation logits. Theoretically motivated.</Card>
        <Card color="warning" title="Modern practice">Linear → Activation → BN, or just experiment. Empirically better for deep ReLU networks. Use your framework's default.</Card>
      </Grid>
      <Note color="warning" icon="ti-info-circle">
        For <strong>Transformers</strong> and variable-length sequences, use <strong>Layer Normalization</strong> (normalizes across feature dimension, not batch). BN is primarily for CNNs and MLPs with batch size ≥ 16.
      </Note>

      <H3>Why BN works — competing theories</H3>
      <Table heads={["Theory","Claim"]} rows={[
        ["Internal covariate shift","Stabilizes layer input distributions; reduces re-adaptation cost per update"],
        ["Implicit regularization","Batch-dependent μ_B, σ_B add stochastic noise → similar to Dropout"],
        ["Gradient flow","Keeps pre-activations in linear regime of tanh/sigmoid → larger usable gradients"],
        ["Loss landscape smoothing","Reduces Lipschitz constant (Santurkar et al., 2018) → allows bigger stable LR"],
      ]}/>

      <H3>Code</H3>
      <Code>{`import torch, torch.nn as nn

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
# BatchNorm in Keras automatically uses running stats during model(x, training=False)`}</Code>

      <QA q="Why does BN act as a regularizer even without explicit penalty terms?"
          a="Each sample's normalized value depends on the other samples in the same mini-batch: x̂ᵢ = (xᵢ − μ_B)/σ_B. Since the batch is a random subset, μ_B and σ_B are stochastic — so the normalized value of xᵢ changes randomly across batches. This is implicit noise injection, similar in effect to Dropout. The regularization disappears as batch size → ∞ (statistics converge to population values), which is why very large batches often need additional regularization."/>
      <QA q="When does BN fail and what are the alternatives?"
          a="<strong>Very small batches (m≤4):</strong> μ_B and σ_B are unreliable estimates — use <em>Layer Normalization</em> (normalizes across features per sample, batch-independent) or <em>Group Normalization</em>. <strong>RNNs / variable-length sequences:</strong> Sequence statistics vary wildly across time steps — use Layer Norm. <strong>Transformers:</strong> Use Layer Norm exclusively (it's the standard). BN's sweet spot: CNNs and MLPs with batch size 32–512 and i.i.d. data."/>
      <QA q="If γ ≈ 0 for a neuron after training, what does it mean?"
          a="The output yᵢ = γ·x̂ᵢ + β ≈ β — a constant, ignoring the activation entirely. The network has effectively <em>pruned</em> that neuron through learning. This is the basis of <strong>network slimming</strong>: train a BN-equipped model, identify channels where γ is near zero, remove those channels, and fine-tune. Since γ is regularizable (add L1 penalty on γ → push small ones to zero), this gives a differentiable approach to structured pruning."/>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   EMA VISUALIZATION
══════════════════════════════════════════════════════ */
function EMAViz() {
  const ref=useRef(null);
  const [beta,setBeta]=useState(0.9);

  useEffect(()=>{
    const cv=ref.current; if(!cv) return;
    const ctx=cv.getContext("2d");
    const W=cv.width, H=cv.height;
    ctx.clearRect(0,0,W,H);

    let s=77777;
    const rand=()=>{ s=(s*1664525+1013904223)&0xFFFFFFFF; return (s>>>0)/0xFFFFFFFF; };
    const N=100;
    const data=Array.from({length:N},(_,i)=>15+10*Math.sin(i/N*2*Math.PI*1.5)+5*(rand()-0.5)*2);

    let v1=0,v2=0;
    const ema_raw =data.map(x=>{v1=beta*v1+(1-beta)*x; return v1;});
    const ema_bc  =data.map((x,t)=>{v2=beta*v2+(1-beta)*x; return v2/(1-Math.pow(beta,t+1));});

    const all=[...data,...ema_raw,...ema_bc];
    const minV=Math.min(...all)-1, maxV=Math.max(...all)+1;
    const padL=38,padR=10,padT=15,padB=22;
    const toX=i=>padL+i/(N-1)*(W-padL-padR);
    const toY=v=>padT+(1-(v-minV)/(maxV-minV))*(H-padT-padB);

    ctx.strokeStyle="rgba(128,128,128,0.1)"; ctx.lineWidth=0.5;
    for(let g=0;g<=4;g++){const y=toY(minV+g/4*(maxV-minV));ctx.beginPath();ctx.moveTo(padL,y);ctx.lineTo(W-padR,y);ctx.stroke();}
    ctx.fillStyle="rgba(128,128,128,0.45)"; ctx.font="9px var(--font-mono)"; ctx.textAlign="right";
    for(let g=0;g<=4;g++) ctx.fillText((minV+g/4*(maxV-minV)).toFixed(0),padL-3,toY(minV+g/4*(maxV-minV))+3);

    // Raw dots
    ctx.fillStyle="rgba(150,150,150,0.3)";
    data.forEach((v,i)=>{ctx.beginPath();ctx.arc(toX(i),toY(v),1.8,0,Math.PI*2);ctx.fill();});

    // EMA without bias correction
    ctx.beginPath(); ctx.strokeStyle="rgba(255,138,101,0.5)"; ctx.lineWidth=1.5;
    ema_raw.forEach((v,i)=>i===0?ctx.moveTo(toX(i),toY(v)):ctx.lineTo(toX(i),toY(v)));
    ctx.stroke();

    // EMA with bias correction
    ctx.beginPath(); ctx.strokeStyle="#66BB6A"; ctx.lineWidth=2.2;
    ema_bc.forEach((v,i)=>i===0?ctx.moveTo(toX(i),toY(v)):ctx.lineTo(toX(i),toY(v)));
    ctx.stroke();

    ctx.font="10.5px var(--font-sans)"; ctx.textAlign="left";
    ctx.fillStyle="rgba(150,150,150,0.5)"; ctx.fillText("Raw signal",padL+5,padT+13);
    ctx.fillStyle="rgba(255,138,101,0.8)"; ctx.fillText("EMA (no bias correction)",padL+5,padT+27);
    ctx.fillStyle="#66BB6A"; ctx.fillText(`Bias-corrected EMA  (β=${beta.toFixed(2)})`,padL+5,padT+41);
    ctx.textAlign="center"; ctx.fillStyle="rgba(128,128,128,0.4)"; ctx.font="10px var(--font-sans)";
    ctx.fillText("t →",W/2,H-3);

    // Annotation: initial bias gap
    const ry0=toY(ema_raw[0]), by0=toY(ema_bc[0]);
    if(Math.abs(ry0-by0)>10){
      ctx.strokeStyle="rgba(150,150,150,0.3)"; ctx.lineWidth=0.8; ctx.setLineDash([3,3]);
      ctx.beginPath(); ctx.moveTo(toX(0),ry0); ctx.lineTo(toX(0),by0); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle="rgba(200,200,200,0.5)"; ctx.font="9px var(--font-sans)"; ctx.textAlign="center";
      ctx.fillText("bias",toX(0)+20,(ry0+by0)/2+4);
    }
  },[beta]);

  return (
    <VizBox>
      <canvas ref={ref} width={520} height={195} style={{ display:"block",margin:"0 auto", maxWidth: "100%" }}/>
      <div style={{ maxWidth:360, margin:"10px auto 0" }}>
        <SliderRow label="β" min={0.5} max={0.99} step={0.01} value={beta} onChange={setBeta}/>
      </div>
      <p style={{ textAlign:"center", fontSize:11, color:"var(--color-text-tertiary)", margin:"6px 0 0" }}>
        Larger β → smoother (more memory) but larger initial bias  |  Effective memory ≈ 1/(1−β) steps
      </p>
    </VizBox>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 2 — GD VARIANTS + EMA
══════════════════════════════════════════════════════ */
function SectionEMA() {
  return (
    <div>
      <H2>32 — Gradient Descent Variants</H2>
      <P>Three flavors of GD differ only in how much data is used per weight update:</P>
      <Table heads={["Variant","Data per step","Gradient quality","Wall-clock cost","In practice"]} rows={[
        ["Batch GD","Full dataset N","Exact","Very high (full pass)","Tiny datasets only"],
        ["Stochastic GD","1 sample","Very noisy","Minimal","Rarely used alone"],
        ["Mini-batch GD","m samples (32–512)","Near-exact","Efficient (GPU vectorized)","Standard everywhere"],
      ]}/>
      <Note color="info" icon="ti-info-circle">
        When anyone says "SGD" in a deep learning context, they almost always mean <strong>mini-batch GD</strong>. The noise from mini-batches is actually beneficial — it helps escape sharp local minima and acts as implicit regularization.
      </Note>

      <H2>33 — Exponential Moving Average (EMA)</H2>
      <P>EMA is the mathematical backbone of every momentum-based optimizer (Momentum, RMSProp, Adam). It computes a smoothed estimate of a sequence with exponentially decaying weights on older values.</P>

      <H3>Formula and recursive expansion</H3>
      <Mx block>{`Recurrence:   v_t = β · v_{t−1} + (1−β) · θ_t

Unrolled:     v_t = (1−β) · Σ_{k=0}^{t−1} β^k · θ_{t−k}
                  = (1−β)[θ_t + β·θ_{t−1} + β²·θ_{t−2} + ···]

Weights:  geometrically decaying  (1−β), (1−β)β, (1−β)β², ...
Sum → 1 as t → ∞  (geometric series: (1−β)/(1−β) = 1)

"Memory window":  the ~1/(1−β) most recent values carry most weight
  β = 0.9   →  ~10  steps
  β = 0.99  →  ~100 steps
  β = 0.999 →  ~1000 steps`}</Mx>

      <H3>Bias correction</H3>
      <P>Starting from v₀ = 0 means early estimates are biased toward zero. For β = 0.99 at t=1:</P>
      <Mx block>{`v_1 = (1−0.99)·θ_1 = 0.01·θ_1   ← 100× too small!

Bias-corrected:  v̂_t = v_t / (1 − β^t)

At t=1, β=0.99: v̂_1 = 0.01·θ_1 / (1−0.99) = θ_1  ✓  (exact)
At large t:      β^t → 0,  so v̂_t → v_t             ✓  (correction vanishes)`}</Mx>

      <H3>Interactive: EMA smoothing and bias correction</H3>
      <EMAViz/>

      <QA q="Why is EMA called 'exponentially weighted' when the formula looks recursive?"
          a="Unrolling the recurrence reveals that the weight of θ_{t−k} is (1−β)·β^k. For 0 < β < 1, β^k decays as e^{−k/τ} where τ = 1/log(1/β) ≈ 1/(1−β) for β near 1 — this is the discrete analogue of an exponential decay function. So 'exponentially weighted' describes how the contribution of a past value decays as a function of its age k, not the recurrence itself."/>
      <QA q="Show that bias correction is exact at t=1 and approaches identity for large t."
          a="At t=1: v₁ = (1−β)·θ₁ (since v₀=0). Bias-corrected: v̂₁ = v₁/(1−β¹) = (1−β)θ₁/(1−β) = θ₁ — exactly the current value, as desired. At large t: β^t → 0 since |β| < 1, so 1−β^t → 1, meaning v̂_t → v_t. The correction is exact when needed (early steps) and invisible when not (later steps). This is what makes bias correction elegant — it costs almost nothing asymptotically."/>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   OPTIMIZER PATH VISUALIZATION
══════════════════════════════════════════════════════ */
function OptimizerPathViz() {
  const ref=useRef(null);
  const [lrSGD,setLrSGD]=useState(0.85);
  const [betaM,setBetaM]=useState(0.9);
  const [vis,setVis]=useState({sgd:true,mom:true,nag:true});

  useEffect(()=>{
    // f(x,y) = 0.1x² + y²  (elongated bowl: y-direction 10× steeper)
    const gx=x=>0.2*x, gy=y=>2*y;
    const N=80, sx=4, sy=2;

    // SGD
    const pSGD=[[sx,sy]]; let [px,py]=[sx,sy];
    for(let i=0;i<N;i++){
      px-=lrSGD*gx(px); py-=lrSGD*gy(py);
      pSGD.push([px,py]);
      if(px*px+py*py<0.001) break;
    }

    // Momentum (classical: v = β*v + g; θ -= lr*v)
    const lrM=lrSGD*0.2;
    const pMom=[[sx,sy]]; let [mx,my]=[sx,sy],[vx,vy]=[0,0];
    for(let i=0;i<N;i++){
      vx=betaM*vx+gx(mx); vy=betaM*vy+gy(my);
      mx-=lrM*vx; my-=lrM*vy;
      pMom.push([mx,my]);
      if(mx*mx+my*my<0.001) break;
    }

    // NAG (look-ahead gradient at θ − lr·β·v)
    const pNAG=[[sx,sy]]; let [nx,ny]=[sx,sy],[nvx,nvy]=[0,0];
    for(let i=0;i<N;i++){
      const lax=nx-lrM*betaM*nvx, lay=ny-lrM*betaM*nvy;
      nvx=betaM*nvx+gx(lax); nvy=betaM*nvy+gy(lay);
      nx-=lrM*nvx; ny-=lrM*nvy;
      pNAG.push([nx,ny]);
      if(nx*nx+ny*ny<0.001) break;
    }

    const cv=ref.current; if(!cv) return;
    const ctx=cv.getContext("2d");
    const W=cv.width, H=cv.height;
    ctx.clearRect(0,0,W,H);

    const xmin=-5.5,xmax=5.5,ymin=-3,ymax=3;
    const xR=xmax-xmin, yR=ymax-ymin;
    const toX=v=>(v-xmin)/xR*W;
    const toY=v=>(1-(v-ymin)/yR)*H;

    // Background
    ctx.fillStyle="rgb(13,17,26)"; ctx.fillRect(0,0,W,H);

    // Filled contour regions (outer → inner)
    const levels=[12,8,5,3,1.8,1,0.5,0.2,0.07];
    const hues=[220,225,230,235,240,245,250,260,40];
    levels.forEach((c,i)=>{
      ctx.beginPath();
      ctx.ellipse(toX(0),toY(0),Math.sqrt(c/0.1)/xR*W,Math.sqrt(c/1)/yR*H,0,0,Math.PI*2);
      ctx.fillStyle=`hsla(${hues[i]},40%,${16+i*3}%,1)`;
      ctx.fill();
    });

    // Contour strokes
    [0.1,0.3,0.7,1.5,3,6,10].forEach((c,i)=>{
      ctx.strokeStyle=`rgba(100,140,220,${0.1+i*0.03})`; ctx.lineWidth=0.7;
      ctx.beginPath();
      ctx.ellipse(toX(0),toY(0),Math.sqrt(c/0.1)/xR*W,Math.sqrt(c)/yR*H,0,0,Math.PI*2);
      ctx.stroke();
    });

    // Minimum star
    ctx.beginPath(); ctx.arc(toX(0),toY(0),5,0,Math.PI*2);
    ctx.fillStyle="#FFD700"; ctx.fill();

    const drawPath=(path,color,label,ly)=>{
      if(!path||path.length<2) return;
      ctx.beginPath(); ctx.strokeStyle=color; ctx.lineWidth=2;
      path.forEach(([x,y],i)=>i===0?ctx.moveTo(toX(x),toY(y)):ctx.lineTo(toX(x),toY(y)));
      ctx.stroke();
      // start dot
      ctx.beginPath(); ctx.arc(toX(path[0][0]),toY(path[0][1]),4,0,Math.PI*2);
      ctx.fillStyle=color; ctx.fill();
      // end dot (outline)
      const [ex,ey]=path[path.length-1];
      ctx.beginPath(); ctx.arc(toX(ex),toY(ey),3,0,Math.PI*2);
      ctx.strokeStyle=color; ctx.lineWidth=1.5; ctx.stroke();
      ctx.font="10.5px var(--font-sans)"; ctx.textAlign="left";
      ctx.fillStyle=color; ctx.fillText(label,8,ly);
    };

    if(vis.sgd) drawPath(pSGD,"#FF7043",`SGD  lr=${lrSGD.toFixed(2)}`,18);
    if(vis.mom) drawPath(pMom,"#42A5F5",`Momentum  β=${betaM.toFixed(2)}, lr=${lrM.toFixed(3)}`,33);
    if(vis.nag) drawPath(pNAG,"#66BB6A",`NAG  β=${betaM.toFixed(2)}`,48);

    ctx.fillStyle="rgba(255,215,0,0.7)"; ctx.font="9.5px var(--font-sans)"; ctx.textAlign="left";
    ctx.fillText("min",toX(0)+7,toY(0)+4);
  },[lrSGD,betaM,vis]);

  return (
    <VizBox>
      <div style={{ display:"flex", gap:8, marginBottom:8, flexWrap:"wrap" }}>
        {[["sgd","SGD","#FF7043"],["mom","Momentum","#42A5F5"],["nag","NAG","#66BB6A"]].map(([k,label,c])=>(
          <button key={k} onClick={()=>setVis(v=>({...v,[k]:!v[k]}))}
            style={{ padding:"3px 10px", fontSize:12, border:`1px solid ${c}`, borderRadius:"var(--border-radius-md)", background:vis[k]?c+"22":"transparent", color:c, cursor:"pointer" }}>
            {vis[k]?"✓ ":""}{label}
          </button>
        ))}
      </div>
      <canvas ref={ref} width={500} height={280} style={{ display:"block",width:"100%",maxWidth:500,margin:"0 auto",borderRadius:"var(--border-radius-md)" }}/>
      <div style={{ display:"grid", gap:7, maxWidth:420, margin:"10px auto 0" }}>
        <SliderRow label="SGD lr" min={0.3} max={1.3} step={0.05} value={lrSGD} onChange={setLrSGD} fmt={v=>v.toFixed(2)}/>
        <SliderRow label="β" min={0.5} max={0.99} step={0.01} value={betaM} onChange={setBetaM}/>
      </div>
      <p style={{ textAlign:"center", fontSize:11, color:"var(--color-text-tertiary)", margin:"6px 0 0" }}>
        f(x,y) = 0.1x² + y²  ·  start: (4, 2)  ·  Momentum/NAG use lr×0.2  ·  try lr {">"} 1.0 to see SGD diverge
      </p>
    </VizBox>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 3 — MOMENTUM + NAG
══════════════════════════════════════════════════════ */
function SectionMomentum() {
  return (
    <div>
      <H2>34 — SGD with Momentum</H2>
      <P>On a ravine (surface with very different curvatures in different directions), SGD oscillates heavily in the steep dimension while barely moving in the flat one. Momentum fixes this by accumulating velocity — building speed in consistent gradient directions and dampening oscillations.</P>

      <H3>Mathematical formulation — two conventions</H3>
      <Mx block>{`Classical form (PyTorch default):
  v_t = β · v_{t−1} + g_t           [no (1−β) factor]
  θ_{t+1} = θ_t − α · v_t

EMA form (used in Adam derivations):
  v_t = β · v_{t−1} + (1−β) · g_t   [EMA of gradients]
  θ_{t+1} = θ_t − α · v_t

Both are equivalent up to a rescaling of α.
g_t = ∇_θ L(θ_t),   β ∈ [0.85, 0.99],  typical default β = 0.9`}</Mx>

      <H3>Why it works: effective LR and oscillation damping</H3>
      <P>In an oscillating direction, gradients alternate sign (+g, −g, +g, ...) so accumulated velocity cancels out. In a consistent direction, velocity builds up:</P>
      <Mx block>{`Steady-state velocity for constant gradient g:
  v* = β·v* + g  →  v*(1−β) = g  →  v* = g/(1−β)

Effective LR in consistent direction:  α_eff = α/(1−β)

β=0.9  →  α_eff = 10α   (10× speed-up in flat directions)
β=0.99 →  α_eff = 100α  (must reduce α accordingly to avoid divergence)`}</Mx>

      <H2>35 — Nesterov Accelerated Gradient (NAG)</H2>
      <P>NAG adds a look-ahead correction: compute the gradient not at the current position, but at the estimated future position after momentum would have moved the parameters. This brakes early instead of correcting after overshooting.</P>

      <Grid cols={2} gap={10}>
        <Card color="danger" title="Momentum — reactive">Compute grad at θ_t → update velocity → step. By the time we compute the gradient, momentum has already committed to a direction. Correction is always one step late.</Card>
        <Card color="success" title="NAG — anticipatory">Look-ahead to θ̃ = θ − α·β·v → compute grad there → update. Like a car that brakes when it sees the curve ahead, not after entering it.</Card>
      </Grid>

      <H3>NAG formulation</H3>
      <Mx block>{`Look-ahead position:  θ̃_t = θ_t − α·β·v_{t−1}

Gradient at look-ahead: g̃_t = ∇L(θ̃_t)

Velocity update:      v_t = β·v_{t−1} + g̃_t

Parameter update:     θ_{t+1} = θ_t − α·v_t

Convergence:  O(1/t²) for convex problems  vs  O(1/t) for standard momentum.`}</Mx>

      <H3>Interactive: optimizer paths on elongated bowl</H3>
      <OptimizerPathViz/>
      <Note color="info" icon="ti-info-circle">
        Increase lr past 1.0 — SGD diverges (oscillation amplitude grows) while Momentum and NAG remain stable due to their smaller effective lr. Notice NAG takes a smoother, more direct path than Momentum near the minimum.
      </Note>

      <H3>Implementation</H3>
      <Code>{`import torch.optim as optim, tensorflow as tf

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
    opt_nag.step()`}</Code>

      <H3>β sensitivity</H3>
      <Table heads={["β","Memory ≈ 1/(1−β)","Behaviour"]} rows={[
        ["0.0","1","Pure SGD — no momentum at all"],
        ["0.5","2","Light smoothing, quick adaptation"],
        ["0.9","10","Standard default — solid balance"],
        ["0.99","100","Heavy smoothing, sluggish adaptation, halve α"],
      ]}/>

      <QA q="Derive the effective learning rate boost from momentum for constant gradients."
          a="For constant gradient g_t = g (classical form), velocity reaches a fixed point v*: v* = β·v* + g → v*(1−β) = g → v* = g/(1−β). The update θ_{t+1} = θ_t − α·v* = θ_t − α·g/(1−β) is equivalent to SGD with effective LR α_eff = α/(1−β). For β=0.9 and α=0.01: α_eff = 0.1 — a 10× increase. This explains the dramatic speed-up in low-curvature (consistent gradient) directions while oscillating directions remain bounded because their gradients cancel in the EMA."/>
      <QA q="What is the key algorithmic difference between Momentum and NAG, and why does it matter?"
          a="<strong>Momentum</strong>: compute gradient at current θ_t, then update velocity, then move. <strong>NAG</strong>: first project to the look-ahead position θ̃ = θ − α·β·v, compute gradient there, then update. The key difference is that NAG's gradient evaluates the loss at a position closer to where the parameters will actually end up after the step. For convex objectives this gives a faster O(1/t²) convergence rate vs O(1/t) for standard momentum (Nesterov, 1983). In practice for non-convex deep learning, the gap is empirically smaller but NAG still oscillates less near minima."/>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   ADAPTIVE LR VISUALIZATION
══════════════════════════════════════════════════════ */
function AdaptiveLRViz() {
  const ref=useRef(null);
  const [rho,setRho]=useState(0.9);
  const [alpha0,setAlpha0]=useState(0.1);

  useEffect(()=>{
    const cv=ref.current; if(!cv) return;
    const ctx=cv.getContext("2d");
    const W=cv.width, H=cv.height;
    ctx.clearRect(0,0,W,H);

    let s=99991;
    const rand=()=>{ s=(s*1664525+1013904223)&0xFFFFFFFF; return (s>>>0)/0xFFFFFFFF; };
    const randn=()=>Math.sqrt(-2*Math.log(rand()+1e-9))*Math.cos(2*Math.PI*rand());
    const N=150, eps=1e-8;
    const grads=Array.from({length:N},()=>randn()+0.3); // slightly biased (dense feature)

    let G=0;
    const lrAG=grads.map(g=>{G+=g*g; return alpha0/Math.sqrt(G+eps);});
    let E=0;
    const lrRMS=grads.map(g=>{E=rho*E+(1-rho)*g*g; return alpha0/Math.sqrt(E+eps);});

    const padL=44,padR=12,padT=15,padB=22;
    const toX=i=>padL+i/(N-1)*(W-padL-padR);
    const clip=v=>Math.max(0,Math.min(v,alpha0*1.05));
    const toY=v=>padT+(1-clip(v)/(alpha0*1.05))*(H-padT-padB);

    ctx.strokeStyle="rgba(128,128,128,0.1)"; ctx.lineWidth=0.5;
    [0,0.25,0.5,0.75,1].forEach(f=>{const y=toY(alpha0*f);ctx.beginPath();ctx.moveTo(padL,y);ctx.lineTo(W-padR,y);ctx.stroke();});
    ctx.fillStyle="rgba(128,128,128,0.45)"; ctx.font="9px var(--font-mono)"; ctx.textAlign="right";
    [0,0.5,1].forEach(f=>ctx.fillText((alpha0*f).toFixed(3),padL-3,toY(alpha0*f)+3));

    // Reference line at α₀
    ctx.setLineDash([5,4]); ctx.strokeStyle="rgba(150,150,150,0.2)"; ctx.lineWidth=0.8;
    ctx.beginPath(); ctx.moveTo(padL,toY(alpha0)); ctx.lineTo(W-padR,toY(alpha0)); ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle="rgba(150,150,150,0.4)"; ctx.font="9px var(--font-mono)"; ctx.textAlign="left";
    ctx.fillText("α₀",padL+2,toY(alpha0)-3);

    ctx.beginPath(); ctx.strokeStyle="#FF7043"; ctx.lineWidth=2;
    lrAG.forEach((v,i)=>i===0?ctx.moveTo(toX(i),toY(v)):ctx.lineTo(toX(i),toY(v))); ctx.stroke();
    ctx.beginPath(); ctx.strokeStyle="#42A5F5"; ctx.lineWidth=2;
    lrRMS.forEach((v,i)=>i===0?ctx.moveTo(toX(i),toY(v)):ctx.lineTo(toX(i),toY(v))); ctx.stroke();

    ctx.font="10.5px var(--font-sans)"; ctx.textAlign="left";
    ctx.fillStyle="#FF7043"; ctx.fillText("AdaGrad — monotonically → 0",padL+5,padT+14);
    ctx.fillStyle="#42A5F5"; ctx.fillText(`RMSProp — stabilizes  (ρ=${rho.toFixed(2)})`,padL+5,padT+28);
    ctx.textAlign="center"; ctx.fillStyle="rgba(128,128,128,0.4)"; ctx.font="10px var(--font-sans)";
    ctx.fillText("Iterations →",W/2,H-3);
  },[rho,alpha0]);

  return (
    <VizBox>
      <canvas ref={ref} width={520} height={200} style={{ display:"block",margin:"0 auto", maxWidth: "100%" }}/>
      <div style={{ display:"grid", gap:7, maxWidth:400, margin:"10px auto 0" }}>
        <SliderRow label="ρ (RMSProp)" min={0.5} max={0.99} step={0.01} value={rho} onChange={setRho}/>
        <SliderRow label="α₀ (base lr)" min={0.01} max={0.5} step={0.01} value={alpha0} onChange={setAlpha0} fmt={v=>v.toFixed(2)}/>
      </div>
      <p style={{ textAlign:"center", fontSize:11, color:"var(--color-text-tertiary)", margin:"6px 0 0" }}>
        AdaGrad denominator: √(Σg²) — grows forever.  RMSProp denominator: √(EMA of g²) — stays bounded.
      </p>
    </VizBox>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 4 — ADAGRAD + RMSPROP
══════════════════════════════════════════════════════ */
function SectionAdaRMS() {
  return (
    <div>
      <H2>36 — AdaGrad: Adaptive Gradient</H2>
      <P>AdaGrad (Duchi et al., 2011) gives each parameter its own adaptive learning rate: frequently-updated parameters with large gradients get smaller updates; rarely-updated (sparse) parameters get larger updates. This is ideal for NLP tasks with sparse vocabulary gradients.</P>

      <H3>The sparse feature motivation</H3>
      <P>In NLP, most word embeddings are zero-gradient for any given batch (the word didn't appear). AdaGrad amplifies updates for these rare features and shrinks updates for common ones — automatic per-parameter LR tuning.</P>

      <H3>Mathematical formulation</H3>
      <Mx block>{`Accumulate squared gradients (per-parameter, element-wise):
  G_t = Σ_{τ=1}^{t} g_τ²          ← cumulative sum, grows monotonically

Adaptive update:
  θ_{t+1} = θ_t − (α / √(G_t + ε)) · g_t

Interpretation:
  Large consistent gradients → G_t grows fast → small effective LR  ✓
  Small / sparse gradients  → G_t stays small→ large effective LR   ✓`}</Mx>

      <Note color="danger" icon="ti-x">
        <strong>Fatal flaw:</strong> G_t is a cumulative sum that never decreases. For any densely-updated parameter, α/√G_t → 0 and training effectively stops, well before convergence. AdaGrad is unsuitable for deep networks trained for many steps.
      </Note>

      <H2>37 — RMSProp: Root Mean Square Propagation</H2>
      <P>Proposed by Hinton (2012, unpublished — Coursera lecture). The fix is surgical: replace AdaGrad's cumulative sum with an Exponential Moving Average of squared gradients. Old gradients are forgotten, so the denominator stays bounded.</P>

      <H3>Mathematical formulation</H3>
      <Mx block>{`EMA of squared gradients (per-parameter):
  E[g²]_t = ρ · E[g²]_{t−1} + (1−ρ) · g_t²   ← forgets old gradients

Adaptive update:
  θ_{t+1} = θ_t − (α / √(E[g²]_t + ε)) · g_t

Key difference:
  AdaGrad:  denominator = √(Σ_{all past} g_τ²)        → grows forever → lr → 0
  RMSProp:  denominator = √(recent weighted avg of g²)  → stabilizes   → lr bounded

Defaults: ρ = 0.9,  α = 0.001,  ε = 1e-8`}</Mx>

      <H3>Interactive: effective learning rate comparison</H3>
      <AdaptiveLRViz/>

      <H3>Code</H3>
      <Code>{`import torch.optim as optim, tensorflow as tf

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
tf.keras.optimizers.RMSprop(learning_rate=0.001, rho=0.9, epsilon=1e-07)`}</Code>

      <QA q="Why does AdaGrad excel for NLP/sparse features but fail for dense deep networks?"
          a="In NLP, word k's embedding gradient is zero for most batches (k didn't appear). G_{t,k} accumulates slowly, keeping a large effective LR for that embedding when it does appear — perfect for rare features. For a common word, G_{t,k} grows quickly, shrinking the LR proportionally. This is ideal for sparse gradients. The failure mode: in a dense deep network, every parameter gets a gradient every step. G_{t,i} grows for all parameters simultaneously, and all effective learning rates decay to zero well before the model converges."/>
      <QA q="Prove that RMSProp's effective LR stabilizes for stationary gradient distributions."
          a="If g_t is i.i.d. with E[g²] = σ², then E[g²]_t converges to a fixed point: E* = ρ·E* + (1−ρ)·σ² → E*(1−ρ) = (1−ρ)σ² → E* = σ². The effective LR stabilizes at α/√(σ²+ε) ≈ α/σ — constant over time, not decaying. Large-gradient parameters get a small but stable LR (α/σ_large), small-gradient ones get a larger but stable LR (α/σ_small). RMSProp thus normalizes by gradient scale without the collapse problem of AdaGrad."/>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 5 — ADAM
══════════════════════════════════════════════════════ */
function SectionAdam() {
  return (
    <div>
      <H2>38 — Adam: Adaptive Moment Estimation</H2>
      <P>Adam (Kingma & Ba, 2014) combines SGD with Momentum (1st moment) and RMSProp (2nd moment) with bias correction for both. It is the de-facto standard optimizer for deep learning.</P>

      <Note color="info" icon="ti-bulb">
        <strong>Mental model:</strong> Adam tracks <em>where</em> the gradient has been pointing recently (1st moment → direction) and <em>how large</em> the gradients have been (2nd moment → scale). Dividing direction by scale gives nearly unit-magnitude steps — Adam is approximately scale-invariant.
      </Note>

      <H3>Full algorithm</H3>
      <Mx block>{`Hyperparameters:  α=0.001  β₁=0.9  β₂=0.999  ε=1e-8
Initialize:  m₀=0, v₀=0

At each step t:
  (1) g_t = ∇_θ L(θ_{t−1})                  [compute gradient]

  (2) m_t = β₁·m_{t−1} + (1−β₁)·g_t        [1st moment: EMA of gradient]
  (3) v_t = β₂·v_{t−1} + (1−β₂)·g_t²       [2nd moment: EMA of gradient²]

  (4) m̂_t = m_t / (1 − β₁ᵗ)                [bias-correct 1st moment]
      v̂_t = v_t / (1 − β₂ᵗ)                [bias-correct 2nd moment]

  (5) θ_t = θ_{t−1} − α · m̂_t / (√v̂_t + ε) [update]`}</Mx>

      <H3>Bias correction: why it matters</H3>
      <P>Both m₀=0 and v₀=0 cause severe underestimation in early steps:</P>
      <Mx block>{`At t=1, β₁=0.9, β₂=0.999:
  m₁ = 0.1·g₁          → 10× too small
  v₁ = 0.001·g₁²       → 1000× too small!

Without correction: update ≈ 3.16·α (unpredictably large first step)
With correction:    m̂₁ = g₁, v̂₁ = g₁²  → update ≈ α·sign(g₁)  ✓

At large t: β₁ᵗ → 0 and β₂ᵗ → 0, so m̂_t → m_t, v̂_t → v_t (corrections vanish).`}</Mx>

      <H3>Scale-invariance (why Adam needs little LR tuning)</H3>
      <Mx block>{`For large t with approximately constant gradient g:
  m̂_t → g,    v̂_t → g²

  update = α · g / (√g² + ε) ≈ α · sign(g)

→ Adam always takes steps of magnitude ≈ α regardless of gradient scale.
  This is why the same α=1e-3 works across wildly different architectures.`}</Mx>

      <H3>The three components</H3>
      <Grid cols={3} gap={10}>
        <Card color="info" title="1st moment m̂_t (Momentum)">EMA of recent gradients. Provides directional smoothing. Accelerates in consistent gradient directions.</Card>
        <Card color="success" title="2nd moment v̂_t (RMSProp)">EMA of recent gradient². Estimates gradient magnitude. Normalizes update size per-parameter.</Card>
        <Card color="warning" title="Bias correction">Compensates for zero initialization of m₀, v₀. Ensures correct step size from the very first update.</Card>
      </Grid>

      <H3>Code</H3>
      <Code>{`import torch, torch.nn as nn, torch.optim as optim

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
)`}</Code>

      <H3>Complete optimizer comparison</H3>
      <Table
        heads={["Optimizer","1st moment","2nd moment","Adaptive LR","Bias Corr.","Best use case"]}
        rows={[
          ["SGD","—","—","No","No","Convex problems; CV with careful LR schedule"],
          ["Momentum","β·v+g (classical)","—","No","No","Faster than SGD; classic DL training"],
          ["NAG","look-ahead g","—","No","No","Better Momentum; O(1/t²) convex convergence"],
          ["AdaGrad","—","Σg² (cumulative)","Per-param","No","Sparse NLP embeddings; short training runs"],
          ["RMSProp","—","EMA(g²)","Per-param","No","RNNs; non-stationary objectives"],
          ["Adam","EMA(g)","EMA(g²)","Per-param","Yes","Default for nearly all DL tasks"],
          ["AdamW","EMA(g)","EMA(g²)","Per-param","Yes","Transformers; BERT/GPT fine-tuning"],
          ["AMSGrad","EMA(g)","max(EMA(g²))","Per-param","Yes","Needs convergence guarantee; rarely outperforms Adam"],
        ]}
      />

      <H3>Hyperparameter guide</H3>
      <Table
        heads={["Param","Default","Common range","Effect if too large"]}
        rows={[
          ["α (lr)","1e-3","1e-5 – 1e-2","Divergence or oscillation"],
          ["β₁","0.9","0.85 – 0.95","Slower direction adaptation"],
          ["β₂","0.999","0.99 – 0.9999","Noisy 2nd moment estimate (smaller β₂)"],
          ["ε","1e-8","1e-9 – 1e-4","Reduced per-param adaptation (larger ε)"],
          ["weight_decay","0","0 – 0.1","Overly shrunk weights; underfitting"],
        ]}
      />

      <Note color="success" icon="ti-check">
        <strong>Practical defaults:</strong> Start with Adam + lr=1e-3. For Transformers use AdamW + lr=2e-5 (fine-tuning) or 1e-4 (from scratch). For vision CNNs, SGD+Momentum+cosine schedule often beats Adam on final test accuracy. The "Karpathy constant" lr=3e-4 works surprisingly often for Adam on vision tasks.
      </Note>

      <QA q="Why does Adam sometimes generalize worse than well-tuned SGD?"
          a="Adam converges to sharper minima (narrower loss valleys with large Hessian eigenvalues). Sharp minima generalize poorly because small perturbations to weights cause large loss changes (Keskar et al., 2016). SGD's noise from mini-batches acts as implicit regularization, preferring <em>flat</em> minima that generalize better. Practically: Adam is faster to converge but SGD+Momentum+cosine LR schedule often reaches lower test error given enough training time. One hybrid strategy: train with Adam for fast initial convergence, then switch to SGD for the last few epochs ('SWATS' method)."/>
      <QA q="What is AdamW and why is decoupled weight decay better than L2 regularization in Adam?"
          a="Standard Adam with weight_decay adds λ||θ||² to the loss. The gradient then includes λθ, which gets divided by √v̂_t — so the effective regularization strength per parameter depends on its gradient history in an unintuitive way (parameters with large gradients get less regularization). <strong>AdamW</strong> (Loshchilov & Hutter, 2017) directly subtracts α·λ·θ from the parameters: θ ← θ − α·m̂/√v̂ − α·λ·θ. Weight decay applies uniformly regardless of gradient magnitude, matching the theoretical motivation for L2 regularization. This matters especially for Transformers where AdamW is now the standard."/>
      <QA q="Derive why Adam's update has magnitude approximately α, regardless of gradient scale."
          a="For large t (bias correction ≈ 1) and approximately constant gradient g: m̂_t ≈ EMA(g) ≈ g and v̂_t ≈ EMA(g²) ≈ g². The update per dimension is: α · m̂_t / (√v̂_t + ε) ≈ α · g / (|g| + ε) ≈ α · sign(g). The magnitude is α regardless of whether g = 1e-5 or g = 1e5. In practice gradients aren't constant so the update varies, but it stays in a well-bounded range around α. This scale-invariance is why Adam rarely needs per-layer LR adjustment and transfers hyperparameters across architectures."/>
      <QA q="What is AMSGrad and when should you use it?"
          a="AMSGrad (Reddi et al., 2018) replaces v̂_t with v̂_t_max = max(v̂_{t−1,max}, v̂_t), ensuring the denominator is monotonically non-decreasing. This provides a formal convergence guarantee similar to AdaGrad — standard Adam can theoretically fail to converge on certain adversarial examples. In practice AMSGrad rarely outperforms standard Adam on real-world deep learning tasks; the non-convergence pathology is mostly a theoretical concern on toy problems. Use AMSGrad if: (1) you need a provable convergence guarantee, or (2) standard Adam fails to converge on your specific problem."/>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   ROOT
══════════════════════════════════════════════════════ */
const TABS=[
  {id:"bn",   label:"Batch Norm",        sub:"Ch. 31"},
  {id:"ema",  label:"GD + EMA",          sub:"Ch. 32–33"},
  {id:"mom",  label:"Momentum + NAG",    sub:"Ch. 34–35"},
  {id:"ada",  label:"AdaGrad + RMSProp", sub:"Ch. 36–37"},
  {id:"adam", label:"Adam",              sub:"Ch. 38"},
];

export default function Optimizers() {
  const [active,setActive]=useState("bn");
  const map={bn:<SectionBN/>,ema:<SectionEMA/>,mom:<SectionMomentum/>,ada:<SectionAdaRMS/>,adam:<SectionAdam/>};
  
  return (
    <div>
      <div className="page-header">
        <div className="page-header-eyebrow">Deep Learning — Module 8</div>
        <h1 className="page-header-title">Batch Norm · GD Variants · EMA · Momentum · NAG · AdaGrad · RMSProp · Adam</h1>
        <p className="page-header-subtitle">Chapters 31–38 · Interactive visualizations · Derivations · Production-grade code</p>
      </div>

      <SectionNav tabs={TABS} active={active} onChange={setActive} />

      <div style={{ padding: "0.5rem 0 2rem" }}>
        {map[active]}
      </div>

      <NavButtons moduleId={8} />
    </div>
  );
}
