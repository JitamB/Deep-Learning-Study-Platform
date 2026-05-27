import{r as _,j as e}from"./index-BQO4ci8G.js";import{S as V,P as W,H as z,G as F,C as R,M as D,T as P,a as A,Q as N,b as U,V as M,N as I}from"./SectionNav-BDxYvY3P.js";import{N as q}from"./NavButtons-Bz-HQEP4.js";function B(){const c=_.useRef(null),[i,u]=_.useState(10),[h,a]=_.useState(.5);return _.useEffect(()=>{const t=c.current;if(!t)return;const r=t.getContext("2d"),o=t.width,n=t.height;r.clearRect(0,0,o,n);const p=80,L=[],f=[];let d=42;const x=()=>(d=d*1664525+1013904223&4294967295,(d>>>0)/4294967295);for(let l=0;l<p;l++){const g=l/p;L.push(1.8*Math.exp(-4.5*g)+.12+.03*(x()-.5));const w=l>35?.008*(l-35):0;f.push(1.9*Math.exp(-4*g)+.18+h*.06*(x()-.5)+w)}let y=0,E=1/0;f.forEach((l,g)=>{l<E&&(E=l,y=g)});const b=Math.min(p-1,y+i),j=45,C=15,s=15,m=25,v=l=>j+l/(p-1)*(o-j-C),T=Math.max(...L,...f.slice(0,b+1)),k=l=>s+(1-l/T)*(n-s-m);r.strokeStyle="rgba(128,128,128,0.12)",r.lineWidth=.5;for(let l=0;l<=4;l++){const g=k(T*l/4);r.beginPath(),r.moveTo(j,g),r.lineTo(o-C,g),r.stroke()}r.fillStyle="rgba(128,128,128,0.45)",r.font="10px var(--font-mono)",r.textAlign="right";for(let l=0;l<=4;l++)r.fillText((T*l/4).toFixed(2),42,k(T*l/4)+3);r.textAlign="start",r.strokeStyle="rgba(29,158,117,0.5)",r.lineWidth=1.5,r.setLineDash([4,3]),r.beginPath(),r.moveTo(v(y),s),r.lineTo(v(y),n-m),r.stroke(),r.setLineDash([]),r.strokeStyle="rgba(226,75,74,0.6)",r.lineWidth=1.5,r.setLineDash([4,3]),r.beginPath(),r.moveTo(v(b),s),r.lineTo(v(b),n-m),r.stroke(),r.setLineDash([]),r.fillStyle="rgba(226,75,74,0.06)",r.fillRect(v(y),s,v(b)-v(y),n-s-m),r.beginPath(),r.strokeStyle="#4FC3F7",r.lineWidth=2,L.slice(0,b+1).forEach((l,g)=>g===0?r.moveTo(v(g),k(l)):r.lineTo(v(g),k(l))),r.stroke(),r.beginPath(),r.strokeStyle="#FF8A65",r.lineWidth=2,f.slice(0,b+1).forEach((l,g)=>g===0?r.moveTo(v(g),k(l)):r.lineTo(v(g),k(l))),r.stroke(),r.beginPath(),r.arc(v(y),k(f[y]),6,0,Math.PI*2),r.fillStyle="#1D9E75",r.fill(),r.font="11px var(--font-sans)",r.fillStyle="#4FC3F7",r.fillText("Training loss",j+4,s+14),r.fillStyle="#FF8A65",r.fillText("Validation loss",j+4,s+28),r.fillStyle="#1D9E75",r.fillText(`Best: epoch ${y}`,v(y)+5,s+14),r.fillStyle="#E24B4A",r.fillText(`Stop: epoch ${b} (patience=${i})`,v(Math.max(0,b-18))-2,s+32),r.fillStyle="rgba(128,128,128,0.5)",r.textAlign="center",r.fillText("Epoch →",o/2,n-3),r.textAlign="left"},[i,h]),e.jsxs(M,{children:[e.jsx("canvas",{ref:c,width:520,height:200,style:{display:"block",margin:"0 auto",maxWidth:"100%"}}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"80px 1fr 44px",gap:8,maxWidth:400,margin:"10px auto 0",fontSize:12.5,alignItems:"center"},children:[e.jsx("span",{style:{color:"var(--color-text-secondary)"},children:"Patience"}),e.jsx("input",{type:"range",min:3,max:25,value:i,onChange:t=>u(+t.target.value)}),e.jsx("span",{style:{fontFamily:"var(--font-mono)",fontSize:12,textAlign:"right"},children:i}),e.jsx("span",{style:{color:"var(--color-text-secondary)"},children:"Val noise"}),e.jsx("input",{type:"range",min:0,max:1,step:.05,value:h,onChange:t=>a(+t.target.value)}),e.jsx("span",{style:{fontFamily:"var(--font-mono)",fontSize:12,textAlign:"right"},children:h.toFixed(2)})]})]})}function X(){return e.jsxs("div",{children:[e.jsx(z,{children:"Ch. 21 — How to improve a neural network: the full map"}),e.jsxs(F,{cols:2,children:[e.jsx(R,{color:"info",title:"Part I: Hyperparameter Tuning",children:`• Learning rate (most important)
• Batch size
• Network depth and width
• Activation functions
• Weight initialization
• Optimizer choice (SGD, Adam…)`.split(`
`).map(c=>e.jsx("div",{children:c},c))}),e.jsx(R,{color:"warning",title:"Part II: Common problems & fixes",children:`• Overfitting → Dropout, Regularization, Early Stopping
• Vanishing grad → ReLU, BatchNorm, ResNets
• Slow convergence → Feature scaling, better init
• Exploding grad → Gradient clipping
• Poor generalization → Data augmentation`.split(`
`).map(c=>e.jsx("div",{children:c},c))})]}),e.jsx(z,{children:"Ch. 22 — Early Stopping"}),e.jsx(W,{children:"Early stopping halts training when a monitored metric (typically validation loss) stops improving for a specified number of epochs, and optionally restores the weights from the best epoch."}),e.jsxs(I,{color:"info",icon:"ti-bulb",children:["Early stopping is both a ",e.jsx("strong",{children:"regularization technique"})," (prevents overfitting) and a ",e.jsx("strong",{children:"compute optimization"})," (avoids wasted training). It is arguably the most widely used improvement technique in practice."]}),e.jsx(U,{children:"Interactive: patience vs. overfitting"}),e.jsx(W,{children:"Drag patience to see how long training continues after the best validation loss. The green dot marks where best weights are saved."}),e.jsx(B,{}),e.jsx(U,{children:"The bias-variance view"}),e.jsx(D,{block:!0,children:`  Too few epochs  → High bias (underfitting)
                        model hasn't learned the data yet

  Too many epochs → High variance (overfitting)
                        memorizes training noise, val loss rises

  Early stopping  → Finds the sweet spot (bias-variance tradeoff)
                        stops before val loss begins to degrade

  Regularization effect:
    The norm ‖w‖ grows monotonically during training.
    Early stopping implicitly bounds ‖w‖ ← equivalent to L2 reg!`}),e.jsx(U,{children:"All early stopping parameters"}),e.jsx(P,{heads:["Parameter","Default","Meaning"],rows:[["monitor","'val_loss'","Metric to watch. Use 'val_accuracy' for classification"],["patience","0","Epochs with no improvement before stopping. Typical: 10–20"],["min_delta","0","Minimum change to qualify as improvement"],["mode","'auto'","'min' for loss, 'max' for accuracy"],["restore_best_weights","False","Set True to get best-epoch weights back (almost always True)"],["start_from_epoch","0","Skip early stop check for first N epochs (warm-up)"],["baseline","None","Stop only if metric improves beyond this baseline"]]}),e.jsx(U,{children:"Complete implementation with all best practices"}),e.jsx(A,{children:`import tensorflow as tf
from tensorflow import keras

# ── Core callback ─────────────────────────────────────────
early_stop = keras.callbacks.EarlyStopping(
    monitor='val_loss',
    patience=15,                   # wait 15 epochs after best
    min_delta=1e-4,                # ignore tiny improvements
    restore_best_weights=True,     # CRITICAL: revert to best epoch
    mode='min',
    verbose=1,
    start_from_epoch=10            # let model warm up first
)

# ── Combine with LR reduction ─────────────────────────────
reduce_lr = keras.callbacks.ReduceLROnPlateau(
    monitor='val_loss',
    factor=0.5,       # halve LR on plateau
    patience=5,       # sooner than early stop patience
    min_lr=1e-7,
    verbose=1
)

# ── Save best model independently ────────────────────────
checkpoint = keras.callbacks.ModelCheckpoint(
    filepath='best_model.keras',
    monitor='val_loss',
    save_best_only=True,
    mode='min'
)

# ── Full training loop ────────────────────────────────────
history = model.fit(
    X_train, y_train,
    epochs=1000,             # large upper bound; early stop controls actual
    batch_size=32,
    validation_split=0.2,   # or validation_data=(X_val, y_val)
    callbacks=[early_stop, reduce_lr, checkpoint],
    verbose=1
)

stopped_epoch = early_stop.stopped_epoch
best_epoch    = stopped_epoch - early_stop.patience
print(f"Training stopped at epoch {stopped_epoch}")
print(f"Best weights from epoch {best_epoch}")
print(f"Best val_loss: {min(history.history['val_loss']):.5f}")

# ── Plot training history ─────────────────────────────────
import matplotlib.pyplot as plt
plt.plot(history.history['loss'],     label='Train loss')
plt.plot(history.history['val_loss'], label='Val loss')
plt.axvline(best_epoch, c='green',   ls='--', label='Best weights')
plt.axvline(stopped_epoch, c='red',  ls='--', label='Stopped here')
plt.legend(); plt.xlabel('Epoch'); plt.ylabel('Loss')
plt.title('Early Stopping Visualization'); plt.show()`}),e.jsx(N,{q:"Why should restore_best_weights=True almost always be set?",a:"Without restore_best_weights=True, training stops at epoch best+patience, but the returned model has the weights from the last epoch — not the best epoch. These later weights are by definition overfitted (the validation loss was worse). restore_best_weights=True internally saves a copy of weights at each validation improvement and restores them at the end, giving you the model from epoch best rather than epoch best+patience. This is almost always what you want."}),e.jsx(N,{q:"Is early stopping equivalent to L2 regularization?",a:"They are closely related but not identical. During gradient descent, weight norms grow monotonically. Early stopping halts this growth at some point, implicitly bounding ‖w‖ — similar to L2 regularization which penalizes large weights. For linear models with quadratic loss, there is a precise mathematical equivalence (Goodfellow et al., 2016). For deep networks the equivalence is approximate, but both achieve similar regularization effect. In practice, early stopping is preferred when you want to avoid tuning λ, and L2 is preferred when you want a fixed regularization strength."})]})}function G(){const c=_.useRef(null),[i,u]=_.useState(!1);return _.useEffect(()=>{const h=c.current;if(!h)return;const a=h.getContext("2d"),t=h.width,r=h.height;a.clearRect(0,0,t,r);const o=t/2,n=r/2,p=i?1:4,L=i?1:.25;for(let d=.5;d<=3;d+=.5){a.beginPath(),a.ellipse(o,n,d*60*p,d*60*L,0,0,Math.PI*2);const x=.12+d*.08;a.strokeStyle=`rgba(55,138,221,${Math.min(.7,x)})`,a.lineWidth=1,a.stroke()}const f=i?[[o-160,n+60],[o-110,n+30],[o-60,n+10],[o-20,n+3],[o,n]]:[[o-160,n+20],[o-80,n-30],[o-20,n+25],[o+10,n-15],[o+3,n+5],[o,n]];a.beginPath(),a.strokeStyle="#FF8A65",a.lineWidth=2,f.forEach(([d,x],y)=>y===0?a.moveTo(d,x):a.lineTo(d,x)),a.stroke(),f.forEach(([d,x],y)=>{a.beginPath(),a.arc(d,x,y===0?6:3.5,0,Math.PI*2),a.fillStyle=y===0?"#FF8A65":`rgba(255,138,101,${.5+.5*y/f.length})`,a.fill()}),a.beginPath(),a.arc(o,n,6,0,Math.PI*2),a.fillStyle="#FFD700",a.fill(),a.strokeStyle="#000",a.lineWidth=1.5,a.stroke(),a.font="12px var(--font-sans)",a.fillStyle="rgba(128,128,128,0.7)",a.fillText(i?"Scaled features → circular contours → direct path":"Unscaled → elongated → zig-zag path",8,r-6),a.fillStyle="#FF8A65",a.fillText("─ GD path",8,14),a.fillStyle="#FFD700",a.fillText("⭐ optimum",8,28)},[i]),e.jsxs(M,{children:[e.jsx("canvas",{ref:c,width:480,height:200,style:{display:"block",margin:"0 auto",maxWidth:"100%"}}),e.jsx("div",{style:{display:"flex",gap:8,justifyContent:"center",marginTop:8},children:["Unscaled (zig-zag)","Scaled (direct)"].map((h,a)=>e.jsx("button",{onClick:()=>u(!!a),style:{padding:"5px 14px",fontSize:12.5,fontWeight:i===!!a?500:400,border:`0.5px solid var(--color-border-${i===!!a?"success":"tertiary"})`,borderRadius:"var(--border-radius-md)",background:i===!!a?"var(--color-background-success)":"transparent",color:i===!!a?"var(--color-text-success)":"var(--color-text-secondary)",cursor:"pointer"},children:h},h))})]})}function O(){return e.jsxs("div",{children:[e.jsx(W,{children:"Feature scaling ensures all input features have comparable magnitudes. Without it, gradient descent follows an inefficient zig-zag path on an elongated loss landscape — features with large ranges dominate the gradient."}),e.jsx(z,{children:"Why scaling matters — loss landscape geometry"}),e.jsx(G,{}),e.jsx(D,{block:!0,children:`  Unscaled features: feature₁ ∈ [0,1], feature₂ ∈ [0,10000]
  
  Loss contours are elongated ellipses (like a valley):
    ∂L/∂w₁ ≪ ∂L/∂w₂ → gradient dominated by w₂ direction
    → gradient descent oscillates in w₂, barely moves in w₁
    → many more iterations to converge

  After scaling: both features ∈ [0,1] or N(0,1)
    Contours are roughly circular
    Gradient descent takes direct paths → faster convergence`}),e.jsx(z,{children:"The three main scaling techniques"}),e.jsx(D,{block:!0,children:`  1. Standard Scaler (Z-score normalization):
     x̃ = (x − μ) / σ        result: mean=0, std=1
     μ = mean(X_train),  σ = std(X_train)
     Best for: normally distributed data, neural networks (default)

  2. Min-Max Scaler:
     x̃ = (x − x_min) / (x_max − x_min)   result: x̃ ∈ [0,1]
     Best for: bounded distributions, image pixel values (÷255)
     Weakness: sensitive to outliers (outlier → everything else squashed)

  3. Robust Scaler:
     x̃ = (x − median) / IQR    (IQR = Q75 − Q25)
     Best for: data with many outliers
     IQR is resistant to extreme values`}),e.jsx(z,{children:"Critical rule: fit on train, transform all"}),e.jsxs(I,{color:"danger",icon:"ti-alert-triangle",children:[e.jsx("strong",{children:"Never fit the scaler on test/validation data."})," Fitting on test data leaks test statistics into your preprocessing — a form of data leakage that gives overly optimistic performance estimates."]}),e.jsx(A,{children:`from sklearn.preprocessing import StandardScaler, MinMaxScaler, RobustScaler
import numpy as np

# ── CORRECT: fit only on training data ───────────────────
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)  # learns μ, σ from train
X_val_scaled   = scaler.transform(X_val)         # applies SAME μ, σ
X_test_scaled  = scaler.transform(X_test)        # applies SAME μ, σ

# ── WRONG: leaks test info ────────────────────────────────
# scaler.fit(X_test)  ← DO NOT DO THIS

# ── Visual impact on convergence ─────────────────────────
results = {}
for name, scale in [("no_scaling", False), ("standard", True)]:
    X = X_train_scaled if scale else X_train
    model = build_model()
    h = model.fit(X, y_train, validation_split=0.2,
                  epochs=100, verbose=0)
    results[name] = {
        'final_val_loss': min(h.history['val_loss']),
        'epochs_to_95':  next((i for i,v in enumerate(h.history['val_accuracy'])
                               if v>=0.95), None)
    }

for name, r in results.items():
    print(f"{name:15}: val_loss={r['final_val_loss']:.4f}  "
          f"epochs_to_95={r['epochs_to_95']}")`}),e.jsx(z,{children:"When NOT to scale"}),e.jsxs(F,{cols:2,children:[e.jsx(R,{color:"warning",title:"Do NOT scale",children:`• Target variable in regression (usually)
• Tree-based models (RF, XGBoost)
• Features that are already probabilities
• Binary/one-hot features
• Ordinal features where order matters (sometimes)`.split(`
`).map((c,i)=>e.jsx("div",{children:c},i))}),e.jsx(R,{color:"success",title:"Always scale for",children:`• Neural network inputs (always)
• Distance-based models (KNN, SVM, K-means)
• PCA / dimensionality reduction
• Lasso/Ridge regression
• Any gradient descent optimization`.split(`
`).map((c,i)=>e.jsx("div",{children:c},i))})]}),e.jsx(N,{q:"Why does lack of feature scaling cause the zig-zag convergence pattern?",a:"Without scaling, features with large ranges produce large partial derivatives ∂L/∂w for the corresponding weights. The gradient vector is dominated by these large-scale dimensions, causing the optimizer to make big steps in those directions and overshoot repeatedly. Features with small ranges have tiny gradients and barely update. This creates an elongated loss landscape where gradient descent bounces between the steep walls of the elongated contours — the zig-zag pattern — instead of going directly to the minimum. Scaling makes all features contribute proportionally, creating approximately circular contours and allowing the gradient to point nearly directly toward the minimum."})]})}function H({dropRate:c}){const i=[4,6,4,2],u=[60,180,300,420],h=i.map((a,t)=>Array.from({length:a},(r,o)=>t>0&&t<i.length-1&&Math.random()<c));return e.jsxs("svg",{width:"100%",viewBox:"0 0 480 180",role:"img",children:[e.jsx("title",{children:"Dropout visualization"}),i.map((a,t)=>Array.from({length:a},(r,o)=>{const n=30+o*(140/(a-1||1)),p=h[t][o];return t<i.length-1?e.jsxs("g",{children:[Array.from({length:i[t+1]},(L,f)=>{const d=30+f*(140/(i[t+1]-1||1)),x=p||h[t+1][f];return e.jsx("line",{x1:u[t]+12,y1:n,x2:u[t+1]-12,y2:d,stroke:x?"transparent":"rgba(128,128,128,0.2)",strokeWidth:.8},f)}),e.jsx("circle",{cx:u[t],cy:n,r:12,fill:p?"rgba(226,75,74,0.15)":"var(--color-background-secondary)",stroke:p?"var(--color-border-danger)":"var(--color-border-secondary)",strokeWidth:p?1.5:.8}),p&&e.jsx("line",{x1:u[t]-6,y1:n-6,x2:u[t]+6,y2:n+6,stroke:"var(--color-border-danger)",strokeWidth:1.5}),p&&e.jsx("line",{x1:u[t]+6,y1:n-6,x2:u[t]-6,y2:n+6,stroke:"var(--color-border-danger)",strokeWidth:1.5}),!p&&e.jsx("circle",{cx:u[t],cy:n,r:5,fill:"var(--color-border-info)"})]},`${t}-${o}-g`):e.jsxs("g",{children:[e.jsx("circle",{cx:u[t],cy:n,r:12,fill:"var(--color-background-secondary)",stroke:"var(--color-border-secondary)",strokeWidth:.8}),e.jsx("circle",{cx:u[t],cy:n,r:5,fill:"var(--color-border-success)"})]},`${t}-${o}-end`)})),["Input","Hidden 1","Hidden 2","Output"].map((a,t)=>e.jsx("text",{x:u[t],y:170,textAnchor:"middle",style:{fontSize:10,fontFamily:"var(--font-sans)",fill:"var(--color-text-tertiary)"},children:a},a))]})}function K(){const[c,i]=_.useState(.3),[u,h]=_.useState(0);return e.jsxs("div",{children:[e.jsx(z,{children:"Ch. 24–25 — Dropout"}),e.jsx(W,{children:"Dropout randomly deactivates neurons during each training forward pass with probability p, forcing the network to learn redundant, distributed representations. At inference time, all neurons are active."}),e.jsx(U,{children:"Interactive: neurons dropped (×) at each forward pass"}),e.jsxs(M,{children:[e.jsx(H,{dropRate:c},u),e.jsxs("div",{style:{display:"flex",gap:10,justifyContent:"center",alignItems:"center",marginTop:8,fontSize:12.5,flexWrap:"wrap"},children:[e.jsx("span",{style:{color:"var(--color-text-secondary)"},children:"Drop rate p"}),e.jsx("input",{type:"range",min:0,max:.7,step:.05,value:c,onChange:a=>i(+a.target.value),style:{width:100}}),e.jsx("span",{style:{fontFamily:"var(--font-mono)",fontSize:12},children:c.toFixed(2)}),e.jsx("button",{onClick:()=>h(a=>a+1),style:{padding:"4px 12px",fontSize:12,border:"0.5px solid var(--color-border-info)",background:"var(--color-background-info)",color:"var(--color-text-info)",borderRadius:"var(--border-radius-md)",cursor:"pointer"},children:"Resample"})]})]}),e.jsx(U,{children:"The mathematics of inverted dropout"}),e.jsx(D,{block:!0,children:`  Training forward pass (drop rate = p):

  mask ~ Bernoulli(1-p)          each element 0 or 1
  a_dropped = a ⊙ mask           zero out dropped neurons
  a_scaled  = a_dropped / (1-p)  ← INVERTED DROPOUT: scale up!

  Why scale? Maintain expected value:
    E[a_scaled] = E[mask/(1-p)] · a = [(1-p)·1 + p·0]/(1-p) · a = a
    → Expected activation at test time equals training time.

  Inference: NO dropout, NO scaling. Use full network.
  
  Ensemble interpretation:
    N neurons → 2^N possible sub-networks per forward pass.
    Training = simultaneously training 2^N different models.
    Inference = geometric mean over all 2^N sub-networks.`}),e.jsx(A,{children:`# ── Manual inverted dropout (NumPy) ──────────────────────
def dropout_forward(A, p, training=True):
    """
    A: activation matrix (batch, n_neurons)
    p: dropout probability (fraction to DROP, not keep)
    """
    if not training:
        return A, None                       # no dropout at inference

    keep_prob = 1 - p
    mask = (np.random.rand(*A.shape) < keep_prob).astype(float)
    A_out = A * mask / keep_prob             # inverted scaling
    return A_out, mask                       # cache mask for backprop

def dropout_backward(dA_out, mask, p):
    """Gradient flows only through kept neurons, same scaling."""
    return dA_out * mask / (1 - p)

# ── Keras/TensorFlow ──────────────────────────────────────
model = keras.Sequential([
    layers.Dense(256, activation='relu'),
    layers.Dropout(0.4),           # p=0.4 during training only
    layers.Dense(128, activation='relu'),
    layers.Dropout(0.3),
    layers.Dense(10, activation='softmax'),
])
# keras.layers.Dropout handles train vs test mode automatically
# via the training= argument in layer.call()

# ── Regression vs Classification dropout rates ──────────
DROPOUT_GUIDELINES = {
    "classification (few classes)": 0.2,
    "classification (many classes)": 0.3,
    "regression":                    0.1,   # gentler
    "convolutional layers":           0.1,   # spatial dropout preferred
    "recurrent layers (LSTM)":        0.2,   # Variational dropout
    "transformer feedforward":        0.1,
    "very small dataset":             0.5,   # stronger regularization
}

# ── SpatialDropout2D for CNNs ─────────────────────────────
# Drops entire feature maps (channels), not individual pixels
layers.SpatialDropout2D(rate=0.1)  # better than Dropout for conv layers

# ── MC Dropout: uncertainty estimation at inference ───────
def mc_predict(model, X, n_samples=100):
    """Run n_samples forward passes with dropout ON → uncertainty."""
    preds = np.stack([
        model(X, training=True).numpy()   # training=True keeps dropout
        for _ in range(n_samples)
    ])
    return preds.mean(0), preds.std(0)    # mean prediction, uncertainty`}),e.jsx(z,{children:"Ch. 26 — L1 and L2 Regularization"}),e.jsx(W,{children:"Regularization adds a penalty term to the loss function that discourages large weights, controlling model complexity."}),e.jsx(U,{children:"Modified cost function"}),e.jsx(D,{block:!0,children:`  Original:   C = (1/m) Σᵢ L(ŷᵢ, yᵢ)

  ── L2 (Ridge / Weight Decay) ──────────────────────────
  C_L2 = C + (λ/2m) Σₗ ‖W⁽ˡ⁾‖²_F       (Frobenius norm)
       = C + (λ/2m) Σₗ Σⱼ Σₖ (w⁽ˡ⁾_{jk})²

  Weight gradient:   ∂C/∂W = ∂C_orig/∂W + (λ/m)W

  Update rule:       W ← W - η(∂C_orig/∂W + (λ/m)W)
                        = W(1 - ηλ/m) - η·∂C_orig/∂W
                           ↑ weight decay factor < 1

  ── L1 (Lasso) ─────────────────────────────────────────
  C_L1 = C + (λ/m) Σₗ ‖W⁽ˡ⁾‖₁
       = C + (λ/m) Σₗ Σⱼ Σₖ |w⁽ˡ⁾_{jk}|

  Weight gradient:   ∂C/∂W = ∂C_orig/∂W + (λ/m)·sign(W)

  Effect: drives weights exactly to 0 (sparse weights!)
          L2 shrinks weights but keeps them non-zero`}),e.jsx(U,{children:"Geometric intuition"}),e.jsx(D,{block:!0,children:`  L2 constraint: weights must lie in a ball  ‖w‖₂ ≤ r
  L1 constraint: weights must lie in a diamond ‖w‖₁ ≤ r

  The optimal (unregularized) solution is outside these regions.
  The regularized solution is where the loss contour first TOUCHES
  the constraint region:

  L2 ball (smooth): tangency → small weights everywhere
  L1 diamond (corners): tangency → solution often at corner
                         where one or more weights = EXACTLY 0
                         → automatic feature selection!`}),e.jsx(A,{children:`import tensorflow as tf
from tensorflow.keras import regularizers

# ── L2 regularization in Keras ────────────────────────────
model_l2 = keras.Sequential([
    layers.Dense(128, activation='relu',
                 kernel_regularizer=regularizers.l2(1e-4)),   # λ=0.0001
    layers.Dense(64,  activation='relu',
                 kernel_regularizer=regularizers.l2(1e-4)),
    layers.Dense(1,   activation='sigmoid')
])

# ── L1 regularization ─────────────────────────────────────
model_l1 = keras.Sequential([
    layers.Dense(128, activation='relu',
                 kernel_regularizer=regularizers.l1(1e-4)),
])

# ── L1 + L2 combined (Elastic Net) ────────────────────────
model_en = keras.Sequential([
    layers.Dense(128, activation='relu',
                 kernel_regularizer=regularizers.l1_l2(l1=1e-5, l2=1e-4)),
])

# ── Manual L2 in PyTorch (weight decay in optimizer) ──────
# PyTorch's weight_decay IS L2 regularization:
optimizer = torch.optim.Adam(
    model.parameters(),
    lr=1e-3,
    weight_decay=1e-4     # λ/m — equivalent to L2 regularizer
)

# ── Comparison: λ effect on weight norms ──────────────────
for lam in [0, 1e-5, 1e-4, 1e-3, 1e-2]:
    m = build_model_l2(lam)
    m.fit(X_train, y_train, epochs=50, verbose=0)
    w_norms = [np.linalg.norm(w.numpy())
               for w in m.trainable_variables if len(w.shape)==2]
    val_acc = m.evaluate(X_val, y_val, verbose=0)[1]
    print(f"λ={lam:.0e}  ‖W‖={np.mean(w_norms):.2f}  val_acc={val_acc:.4f}")`}),e.jsxs(F,{cols:2,children:[e.jsx(R,{color:"info",title:"L2 (Ridge / Weight Decay)",children:`✓ Smooth penalty — easy gradient
✓ Works well in practice for NNs
✓ Equivalent to Gaussian weight prior
✓ weight_decay param in optimizers
✗ Doesn't produce sparse weights`.split(`
`).map((a,t)=>e.jsx("div",{children:a},t))}),e.jsx(R,{color:"warning",title:"L1 (Lasso)",children:`✓ Produces sparse weights (many = 0)
✓ Implicit feature selection
✓ Equivalent to Laplace weight prior
✗ Non-differentiable at 0
✗ Less common in deep learning
✗ Use Elastic Net for best of both`.split(`
`).map((a,t)=>e.jsx("div",{children:a},t))})]}),e.jsx(N,{q:"Why is L2 regularization called 'weight decay'?",a:"The L2 gradient update is: W ← W(1 − ηλ/m) − η·∂Loss/∂W. The factor (1 − ηλ/m) multiplies the current weight before adding the loss gradient. This is equivalent to decaying (shrinking) the weights by a fixed fraction each step — hence 'weight decay'. In PyTorch, the weight_decay parameter in optimizers implements exactly this multiplicative shrinkage, which is computationally equivalent to adding (λ/2m)‖W‖² to the loss."}),e.jsx(N,{q:"When should you use Dropout vs L2 regularization?",a:"Both address overfitting but via different mechanisms. <strong>Dropout</strong> prevents co-adaptation (neurons relying on specific others) and approximates ensemble averaging — best for large networks with many neurons. <strong>L2</strong> directly constrains weight magnitude — more interpretable, better when you want principled Bayesian justification. In practice: use both together. L2 on weights (small λ=1e-4) + Dropout (p=0.2–0.5) in hidden layers is the standard recipe for large networks."})]})}function $(){const c=_.useRef(null),[i,u]=_.useState("relu"),h={sigmoid:{f:a=>1/(1+Math.exp(-a)),fp:a=>{const t=1/(1+Math.exp(-a));return t*(1-t)},color:"#4FC3F7",range:[-4,4],yrange:[-.2,1.2]},tanh:{f:a=>Math.tanh(a),fp:a=>1-Math.tanh(a)**2,color:"#81C784",range:[-3,3],yrange:[-1.2,1.2]},relu:{f:a=>Math.max(0,a),fp:a=>a>0?1:0,color:"#FF8A65",range:[-3,3],yrange:[-.5,3]},"leaky-relu":{f:a=>a>0?a:.1*a,fp:a=>a>0?1:.1,color:"#CE93D8",range:[-3,3],yrange:[-.5,3]},elu:{f:a=>a>0?a:Math.exp(a)-1,fp:a=>a>0?1:Math.exp(a),color:"#F48FB1",range:[-3,3],yrange:[-1.5,3]},gelu:{f:a=>.5*a*(1+Math.tanh(Math.sqrt(2/Math.PI)*(a+.044715*a**3))),fp:a=>{const t=o=>.5*(1+Math.tanh(Math.sqrt(2/Math.PI)*(o+.044715*o**3)));return(t(a+1e-4)-t(a-1e-4))/(2*1e-4)},color:"#80DEEA",range:[-3,3],yrange:[-.5,3]},selu:{f:a=>a>0?1.0507*a:1.0507*1.6733*(Math.exp(a)-1),fp:a=>a>0?1.0507:1.0507*1.6733*Math.exp(a),color:"#FFCC80",range:[-3,3],yrange:[-2,3]}};return _.useEffect(()=>{const a=c.current;if(!a)return;const t=a.getContext("2d"),r=a.width,o=a.height,n=o/2;t.clearRect(0,0,r,o);const{f:p,fp:L,color:f,range:d,yrange:x}=h[i],y=200,E=Array.from({length:y},(w,S)=>d[0]+S*(d[1]-d[0])/(y-1)),b=w=>(w-d[0])/(d[1]-d[0])*r,j=E.map(p),C=x[0],s=x[1],m=w=>n-10-(w-C)/(s-C)*(n-25);t.strokeStyle="rgba(128,128,128,0.12)",t.lineWidth=.5,[0,1].forEach(w=>{const S=m(w);t.beginPath(),t.moveTo(0,S),t.lineTo(r,S),t.stroke()}),t.strokeStyle="rgba(128,128,128,0.3)",t.lineWidth=1;const v=m(0);t.beginPath(),t.moveTo(0,v),t.lineTo(r,v),t.stroke();const T=b(0);t.beginPath(),t.moveTo(T,0),t.lineTo(T,n-5),t.stroke(),t.beginPath(),t.strokeStyle=f,t.lineWidth=2.5,E.forEach((w,S)=>S===0?t.moveTo(b(w),m(j[S])):t.lineTo(b(w),m(j[S]))),t.stroke(),t.font="11px var(--font-sans)",t.fillStyle=f,t.fillText(`f(z) = ${i}`,6,14);const k=E.map(L),l=Math.max(...k.map(Math.abs))*1.2||1,g=w=>o-10-(w+l)/(2*l)*(n-25);t.strokeStyle="rgba(128,128,128,0.12)",t.lineWidth=.5,t.beginPath(),t.moveTo(0,g(0)),t.lineTo(r,g(0)),t.stroke(),t.strokeStyle="rgba(128,128,128,0.3)",t.lineWidth=1,t.beginPath(),t.moveTo(0,g(0)),t.lineTo(r,g(0)),t.stroke(),t.beginPath(),t.moveTo(T,n+5),t.lineTo(T,o),t.stroke(),t.beginPath(),t.strokeStyle=f,t.lineWidth=2,t.setLineDash([4,3]),E.forEach((w,S)=>S===0?t.moveTo(b(w),g(k[S])):t.lineTo(b(w),g(k[S]))),t.stroke(),t.setLineDash([]),t.fillStyle=f,t.fillText("f'(z) — derivative",6,n+18),t.fillStyle="rgba(128,128,128,0.5)",t.fillText("z →",r-30,g(0)-4)},[i]),e.jsxs(M,{children:[e.jsx("div",{style:{display:"flex",gap:5,flexWrap:"wrap",marginBottom:10},children:Object.keys(h).map(a=>e.jsx("button",{onClick:()=>u(a),style:{padding:"4px 10px",fontSize:11.5,fontWeight:a===i?500:400,border:`0.5px solid var(--color-border-${a===i?"info":"tertiary"})`,borderRadius:"20px",background:a===i?"var(--color-background-info)":"transparent",color:a===i?"var(--color-text-info)":"var(--color-text-secondary)",cursor:"pointer"},children:a},a))}),e.jsx("canvas",{ref:c,width:480,height:240,style:{display:"block",margin:"0 auto",maxWidth:"100%"}})]})}function Q(){return e.jsxs("div",{children:[e.jsx(W,{children:"Activation functions introduce non-linearity. Without them, any depth network collapses to a single linear transformation. The choice of activation affects gradient flow, training speed, and achievable function class."}),e.jsx(z,{children:"Interactive: function and derivative"}),e.jsx(W,{children:"Click any activation to see f(z) (solid) and f′(z) (dashed). The derivative shape directly determines gradient flow in backpropagation."}),e.jsx($,{}),e.jsx(z,{children:"Complete reference"}),e.jsx(P,{heads:["Function","Formula","Range","f′ max","Key trait","Use when"],rows:[["Sigmoid","1/(1+e^{−z})","(0,1)","0.25","Saturates","Output: binary prob"],["Tanh","(e^z−e^{−z})/(e^z+e^{−z})","(−1,1)","1.0","Zero-centered","Hidden: shallow nets"],["ReLU","max(0,z)","[0,∞)","1.0","Sparse, fast","Default: all hidden layers"],["Leaky ReLU","max(αz,z)  α=0.01","(−∞,∞)","1.0","No dead neurons","When dying ReLU is issue"],["PReLU","max(αz,z)  α learned","(−∞,∞)","1.0","Adaptive slope","CNNs, more params OK"],["ELU","z≥0→z;  z<0→α(e^z−1)","(−α,∞)","1.0","Smooth, neg mean","Deep nets, better than ReLU"],["SELU","λ·ELU(z)  self-normalizing","auto","λ≈1.05","Self-normalizing","Very deep, no BatchNorm"],["GELU","z·Φ(z)","(−0.17,∞)","≈1.0","Smooth ReLU","Transformers, BERT, GPT"],["Softmax","e^{zₖ}/Σe^{zⱼ}","(0,1)","—","Prob distribution","Output: multi-class"],["Swish","z·σ(z)","(−0.28,∞)","≈1.0","Smooth, non-mono","EfficientNet, modern CNNs"]]}),e.jsx(z,{children:"Leaky ReLU and PReLU — fixing the dying neuron"}),e.jsx(D,{block:!0,children:`  Dying ReLU: if z < 0 for ALL training samples,
  neuron gets gradient = 0 forever → never recovers.

  Leaky ReLU:   f(z) = z       if z > 0
                       αz      if z ≤ 0    (α = 0.01, fixed)
                f'(z) = 1       if z > 0
                        α       if z ≤ 0   (always non-zero!)

  PReLU (Parametric):  same, but α is a LEARNED parameter
    — One α per channel (in CNNs) or one per neuron
    — Updated by backprop: ∂L/∂α = δ · z  for z ≤ 0

  SELU (Self-normalizing):
    f(z) = λ·z                    if z ≥ 0   λ = 1.0507
           λ·α·(e^z − 1)          if z < 0   α = 1.6733
    
    Self-normalizing property: if inputs ~ N(0,1),
    outputs also ~ N(0,1) → no BatchNorm needed!
    Requires LeCun normal initialization + AlphaDropout`}),e.jsx(A,{children:`# Activation function implementation and comparison
import tensorflow as tf
from tensorflow.keras import layers

# Built-in activations
act_map = {
    'relu':       layers.ReLU(),
    'leaky_relu': layers.LeakyReLU(alpha=0.01),
    'prelu':      layers.PReLU(),              # learned alpha
    'elu':        layers.ELU(alpha=1.0),
    'selu':       layers.Activation('selu'),
    'gelu':       layers.Activation('gelu'),
    'swish':      layers.Activation('swish'),
}

# Build identical networks with different activations
def build_with_act(act_name, act_layer):
    return keras.Sequential([
        layers.Dense(256, input_shape=(784,)),
        act_layer,
        layers.Dense(128),
        act_layer.__class__(**act_layer.get_config()) if hasattr(act_layer,'get_config') else act_layer,
        layers.Dense(10, activation='softmax'),
    ], name=f'model_{act_name}')

# SELU requires specific init and dropout
model_selu = keras.Sequential([
    layers.Dense(256, activation='selu',
                 kernel_initializer='lecun_normal',  # required!
                 input_shape=(784,)),
    layers.AlphaDropout(0.1),                        # not regular Dropout!
    layers.Dense(128, activation='selu',
                 kernel_initializer='lecun_normal'),
    layers.Dense(10, activation='softmax'),
])`}),e.jsx(N,{q:"Why is ReLU preferred over sigmoid/tanh in hidden layers?",a:"Three reasons: (1) <strong>No vanishing gradient</strong> — ReLU derivative is exactly 1 for z>0, allowing clean gradient flow in deep networks, while sigmoid derivative ≤ 0.25 causes exponential attenuation. (2) <strong>Sparsity</strong> — roughly 50% of neurons are inactive (output 0) at any step, creating sparse representations that are often more efficient. (3) <strong>Computation</strong> — max(0,z) is a single comparison operation, much faster than exp() in sigmoid/tanh. Sigmoid/tanh are still used at output layers (probability outputs) and in LSTM gates."}),e.jsx(N,{q:"What is GELU and why do Transformers use it instead of ReLU?",a:"GELU (Gaussian Error Linear Unit) is f(z) = z·Φ(z) where Φ is the Gaussian CDF. It can be approximated as 0.5z(1+tanh(√(2/π)(z+0.044715z³))). Unlike ReLU which hard-gates at 0, GELU softly gates: for z≪0 the output smoothly approaches 0, and for z≫0 it's approximately z. This smooth, non-monotonic shape empirically performs better in Transformers (BERT, GPT use GELU; ViT and many modern models prefer it). The smooth gradient everywhere (no kink at 0) helps in deep architectures with attention mechanisms."})]})}function Y(){const c=_.useRef(null),[i,u]=_.useState("he"),[h,a]=_.useState(8);return _.useEffect(()=>{const t=c.current;if(!t)return;const r=t.getContext("2d"),o=t.width,n=t.height;r.clearRect(0,0,o,n);const p=32;let L=Array.from({length:p},()=>Math.random()*2-1);const f=[];for(let s=0;s<h;s++){let m;i==="zeros"?m=0:i==="large"?m=3/Math.sqrt(p):i==="small"?m=.01/Math.sqrt(p):i==="xavier"?m=Math.sqrt(2/(p+p)):m=Math.sqrt(2/p);const v=Array.from({length:p},()=>Array.from({length:p},()=>m*(Math.random()*2-1)*(i==="zeros"?0:1)));L=L.map((T,k)=>{const l=v[k].reduce((g,w,S)=>g+w*L[S],0);return i==="xavier"?Math.tanh(l):Math.max(0,l)}),f.push(L.reduce((T,k)=>T+k*k,0)/p)}const d=Math.max(...f,.01),x=50,y=25,E=15,b=s=>x+s/(h-1)*(o-x-15),j=s=>n-y-s/d*(n-E-y);r.strokeStyle="rgba(128,128,128,0.12)",r.lineWidth=.5;for(let s=0;s<=4;s++){const m=j(d*s/4);r.beginPath(),r.moveTo(x,m),r.lineTo(o,m),r.stroke()}r.fillStyle="rgba(128,128,128,0.45)",r.font="10px var(--font-mono)",r.textAlign="right";for(let s=0;s<=4;s++)r.fillText((d*s/4).toFixed(3),44,j(d*s/4)+3);r.textAlign="start";const C={zeros:"var(--color-border-danger)",large:"var(--color-border-danger)",small:"var(--color-border-warning)",xavier:"var(--color-border-success)",he:"var(--color-border-info)"};r.beginPath(),r.strokeStyle=C[i]||"var(--color-border-info)",r.lineWidth=2.5,f.forEach((s,m)=>m===0?r.moveTo(b(m),j(s)):r.lineTo(b(m),j(s))),r.stroke(),f.forEach((s,m)=>{r.beginPath(),r.arc(b(m),j(s),4,0,Math.PI*2),r.fillStyle=C[i],r.fill()}),r.fillStyle="rgba(128,128,128,0.5)",r.font="10px var(--font-sans)",r.fillText("Layer →",o-50,n-5),r.save(),r.translate(12,n/2),r.rotate(-Math.PI/2),r.textAlign="center",r.fillText("Activation variance",0,0),r.restore()},[i,h]),e.jsxs(M,{children:[e.jsx("div",{style:{display:"flex",gap:5,flexWrap:"wrap",marginBottom:8},children:[["zeros","All zeros (symmetry!)"],["large","Too large"],["small","Too small"],["xavier","Xavier/Glorot"],["he","He (ReLU)"]].map(([t,r])=>e.jsx("button",{onClick:()=>u(t),style:{padding:"4px 10px",fontSize:11.5,fontWeight:t===i?500:400,border:`0.5px solid var(--color-border-${t===i?"info":"tertiary"})`,borderRadius:"20px",background:t===i?"var(--color-background-info)":"transparent",color:t===i?"var(--color-text-info)":"var(--color-text-secondary)",cursor:"pointer"},children:r},t))}),e.jsx("canvas",{ref:c,width:460,height:180,style:{display:"block",margin:"0 auto",maxWidth:"100%"}}),e.jsxs("div",{style:{display:"flex",gap:8,alignItems:"center",justifyContent:"center",marginTop:8,fontSize:12.5},children:[e.jsx("span",{style:{color:"var(--color-text-secondary)"},children:"Depth"}),e.jsx("input",{type:"range",min:3,max:15,value:h,onChange:t=>a(+t.target.value),style:{width:100}}),e.jsxs("span",{style:{fontFamily:"var(--font-mono)",fontSize:12},children:[h," layers"]})]})]})}function Z(){return e.jsxs("div",{children:[e.jsx(W,{children:"Weight initialization determines the starting point of optimization and critically affects whether gradients vanish or explode in the first forward and backward passes."}),e.jsx(z,{children:"Interactive: activation variance across layers"}),e.jsx(W,{children:"Good initialization preserves variance ~ 1 throughout the network. See what happens with zeros, too-large, or too-small weights."}),e.jsx(Y,{}),e.jsx(z,{children:"Why initialization matters — 4 failure modes"}),e.jsxs(F,{cols:2,children:[e.jsxs(R,{color:"danger",title:"All zeros (symmetry breaking failure)",children:["All neurons in a layer receive the same gradient and update identically — they never differentiate. The network is equivalent to a single neuron per layer, regardless of width. ",e.jsx("strong",{children:"Never initialize to all zeros."})]}),e.jsx(R,{color:"danger",title:"Large random values (exploding activations)",children:"Forward pass: activations grow exponentially layer by layer → saturate tanh/sigmoid → zero gradient. Backward pass: gradients explode. Signs: NaN loss, activations >> 1."}),e.jsx(R,{color:"warning",title:"Small random values (vanishing activations)",children:"Forward pass: activations shrink layer by layer → all near zero. Backward pass: gradients vanish (∂L/∂W = δ·a ≈ 0 if a≈0). Signs: very slow training, early layers frozen."}),e.jsx(R,{color:"success",title:"Correct initialization (variance preserved)",children:"Variance of activations stays approximately 1 through all layers. Gradients flow cleanly. Training is fast and stable. This is exactly what Xavier and He achieve."})]}),e.jsx(z,{children:"Xavier / Glorot Initialization (for tanh/sigmoid)"}),e.jsx(D,{block:!0,children:`  Goal: Var[a⁽ˡ⁾] ≈ Var[a⁽ˡ⁻¹⁾]   for all layers l

  Derivation:
    Var[z] = Var[Σⱼ wⱼaⱼ] = nᵢₙ · Var[w] · Var[a]
    For Var[z] = Var[a]: need Var[w] = 1/nᵢₙ

  Similarly for backward pass:  Var[w] = 1/nₒᵤₜ

  Xavier compromise (geometric mean of forward/backward):
    Var[w] = 2 / (nᵢₙ + nₒᵤₜ)

  Implementations:
    Normal:  w ~ N(0, 2/(nᵢₙ + nₒᵤₜ))
    Uniform: w ~ U[-√(6/(nᵢₙ+nₒᵤₜ)),  √(6/(nᵢₙ+nₒᵤₜ))]

  Best for: tanh, sigmoid, linear activations`}),e.jsx(z,{children:"He Initialization (for ReLU)"}),e.jsx(D,{block:!0,children:`  Problem with Xavier + ReLU:
    ReLU zeroes out ~50% of activations → effective nᵢₙ halved
    Xavier variance is too small → vanishing activations

  He (Kaiming) fix: compensate for ReLU's 50% kill rate
    Var[w] = 2 / nᵢₙ   (double the Xavier variance)

  Implementations:
    Normal:  w ~ N(0, 2/nᵢₙ)
    Uniform: w ~ U[-√(6/nᵢₙ),  √(6/nᵢₙ)]

  Proof sketch:
    E[ReLU(z)²] = E[z²]/2  (half the inputs are zeroed)
    → to maintain variance: Var[w] · nᵢₙ · E[a²] = Var[a]
    → Var[w] = 2/nᵢₙ  ✓

  Best for: ReLU, Leaky ReLU, ELU, GELU, Swish`}),e.jsx(z,{children:"Complete comparison"}),e.jsx(P,{heads:["Init","Variance","Distribution","Best for","PyTorch / Keras"],rows:[["All zeros","0","—","❌ Never","zeros()"],["Random Normal","0.01²","N(0,0.01)","Tiny networks only","normal(0,0.01)"],["LeCun Normal","1/nᵢₙ","N(0,1/nᵢₙ)","SELU activation","lecun_normal"],["Xavier Uniform","6/(nᵢₙ+nₒᵤₜ)","Uniform","tanh, sigmoid","glorot_uniform (default Keras)"],["Xavier Normal","2/(nᵢₙ+nₒᵤₜ)","Normal","tanh, sigmoid","glorot_normal"],["He Uniform","6/nᵢₙ","Uniform","ReLU, variants","he_uniform"],["He Normal","2/nᵢₙ","Normal","ReLU, variants","he_normal / kaiming_normal"],["Orthogonal","—","Orthogonal matrix","Deep RNNs, ResNets","orthogonal"]]}),e.jsx(A,{children:`import torch
import torch.nn as nn
import numpy as np

# ── PyTorch initialization ────────────────────────────────
layer = nn.Linear(256, 128)

# He (Kaiming) — for ReLU
nn.init.kaiming_normal_(layer.weight, mode='fan_in', nonlinearity='relu')
nn.init.zeros_(layer.bias)

# Xavier — for tanh/sigmoid
nn.init.xavier_normal_(layer.weight)
nn.init.zeros_(layer.bias)

# Apply globally across a model
def init_weights(m):
    if isinstance(m, nn.Linear):
        nn.init.kaiming_uniform_(m.weight, nonlinearity='relu')
        if m.bias is not None:
            nn.init.constant_(m.bias, 0)
    elif isinstance(m, nn.Conv2d):
        nn.init.kaiming_normal_(m.weight, mode='fan_out', nonlinearity='relu')

model = MyModel()
model.apply(init_weights)   # applies recursively

# ── Keras initialization ──────────────────────────────────
from tensorflow.keras import initializers

# Keras default is glorot_uniform — fine for tanh, change for ReLU
layer_tanh = tf.keras.layers.Dense(
    128, activation='tanh',
    kernel_initializer='glorot_uniform'    # default, explicit
)
layer_relu = tf.keras.layers.Dense(
    128, activation='relu',
    kernel_initializer='he_normal'         # correct for ReLU!
)
layer_selu = tf.keras.layers.Dense(
    128, activation='selu',
    kernel_initializer='lecun_normal'      # required for SELU
)

# ── Verify initialization quality ────────────────────────
def check_init_quality(model, X_sample):
    """Forward pass once and check activation statistics per layer."""
    activations = []
    def hook_fn(module, inp, out):
        activations.append(out.detach())

    hooks = [l.register_forward_hook(hook_fn)
             for l in model.modules() if isinstance(l, nn.ReLU)]

    with torch.no_grad(): model(X_sample)
    for hook in hooks: hook.remove()

    print(f"{'Layer':<8} {'Mean':>10} {'Std':>10} {'% dead':>10}")
    for i, act in enumerate(activations):
        mean = act.mean().item(); std = act.std().item()
        dead = (act == 0).float().mean().item()
        status = "✓" if 0.4 < std < 1.5 else "⚠️"
        print(f"  {i:<6} {mean:>10.4f} {std:>10.4f} {dead*100:>9.1f}%  {status}")`}),e.jsx(N,{q:"Derive the He initialization variance from first principles.",a:"For a ReLU network: z = Σⱼ wⱼaⱼ where Var[aⱼ] = σ²_a. Assuming i.i.d. weights with E[w]=0, E[a]=0: Var[z] = nᵢₙ · Var[w] · Var[a]. After ReLU, activations have: E[ReLU(z)] = 0 (by symmetry when z ~ N(0,σ²)), E[ReLU(z)²] = E[z²]/2 = σ²_z/2 (half the Gaussian mass is zeroed). For variance to be preserved layer to layer: Var[z_{l+1}] = Var[z_l]. This requires nᵢₙ · Var[w] · Var[a] = Var[a], so Var[w] = 1/nᵢₙ. But since ReLU halves the effective variance, we need to double it: <strong>Var[w] = 2/nᵢₙ</strong>."}),e.jsx(N,{q:"Why does Keras default to glorot_uniform and not he_uniform?",a:"Keras was designed when sigmoid/tanh were the dominant activations (pre-2012), and glorot_uniform is optimal for those. It was kept as the default for backward compatibility. When using ReLU (the modern default), you should always explicitly set kernel_initializer='he_normal' or 'he_uniform'. In practice, for deep networks with ReLU, glorot_uniform's variance of 2/(nᵢₙ+nₒᵤₜ) ≈ 1/nᵢₙ is close to He's 2/nᵢₙ only for the first few layers, but diverges increasingly with depth."})]})}const J=[{id:"es",label:"Early Stopping"},{id:"scale",label:"Feature Scaling"},{id:"drop",label:"Dropout & L1/L2"},{id:"act",label:"Activation Fns"},{id:"init",label:"Weight Init"}];function re(){const[c,i]=_.useState("es"),u={es:e.jsx(X,{}),scale:e.jsx(O,{}),drop:e.jsx(K,{}),act:e.jsx(Q,{}),init:e.jsx(Z,{})};return e.jsxs("div",{children:[e.jsxs("div",{className:"page-header",children:[e.jsx("div",{className:"page-header-eyebrow",children:"Deep Learning — Module 07"}),e.jsx("h1",{className:"page-header-title",children:"Performance: Early Stopping · Scaling · Dropout · Regularization · Activations · Init"}),e.jsx("p",{className:"page-header-subtitle",children:"Chapters 21–30 · Interactive visualizations · Complete math · Production code"})]}),e.jsx(V,{tabs:J,active:c,onChange:i}),e.jsx("div",{style:{padding:"0.5rem 0 2rem"},children:u[c]}),e.jsx(q,{moduleId:7})]})}export{re as default};
