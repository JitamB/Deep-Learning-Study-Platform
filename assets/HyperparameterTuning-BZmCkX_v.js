import{r as R,j as e}from"./index-BQO4ci8G.js";import{S as J,H as E,P as z,b as s,T as B,a as u,N as _,G as L,C as m,M as P,Q as x,V as X}from"./SectionNav-BDxYvY3P.js";import{N as Y}from"./NavButtons-Bz-HQEP4.js";function Z(){const H=R.useRef(null),[n,C]=R.useState("random"),[w,W]=R.useState(1);R.useEffect(()=>{const h=H.current;if(!h)return;const t=h.getContext("2d"),k=h.width,F=h.height;t.clearRect(0,0,k,F);const l=58,U=18,c=18,K=44,d=k-l-U,p=F-c-K,S=(a,r)=>{const i=Math.exp(-((a-.58)**2/.055+(r-.52)**2/.07)),b=Math.exp(-((a-.22)**2/.025+(r-.75)**2/.025))*.52;return Math.max(0,i+b)},M=t.createImageData(d,p);for(let a=0;a<d;a++)for(let r=0;r<p;r++){const i=a/d,b=1-r/p,q=S(i,b),v=Math.pow(Math.min(q,1),.55),T=(r*d+a)*4;M.data[T]=Math.round(12+v*55),M.data[T+1]=Math.round(18+v*115),M.data[T+2]=Math.round(28+v*175),M.data[T+3]=255}t.putImageData(M,l,c),t.strokeStyle="rgba(255,255,255,0.07)",t.lineWidth=.5;for(let a=1;a<5;a++)t.beginPath(),t.moveTo(l+a/5*d,c),t.lineTo(l+a/5*d,c+p),t.stroke(),t.beginPath(),t.moveTo(l,c+a/5*p),t.lineTo(l+d,c+a/5*p),t.stroke();let I=42;const g=()=>(I=I*1664525+1013904223&4294967295,(I>>>0)/4294967295),D=()=>Math.sqrt(-2*Math.log(g()+1e-9))*Math.cos(2*Math.PI*g());let o=[],f=[],y=[];if(n==="grid"){for(let a=0;a<5;a++)for(let r=0;r<5;r++)o.push([.1+a*.2,.1+r*.2]);f=o.map(()=>5),y=o.map(()=>.9)}else if(n==="random"){for(let a=0;a<25;a++)o.push([g()*.88+.06,g()*.88+.06]);f=o.map(()=>5),y=o.map(()=>.9)}else if(n==="bayesian"){for(let a=0;a<7;a++)o.push([g()*.88+.06,g()*.88+.06]);for(let a=0;a<18;a++){const r=.58+D()*.12,i=.52+D()*.14;o.push([Math.max(.04,Math.min(.96,r)),Math.max(.04,Math.min(.96,i))])}f=o.map((a,r)=>r<7?4:5.5),y=o.map((a,r)=>r<7?.5:.9)}else if(n==="hyperband"){const a=Array.from({length:27},()=>[g()*.88+.06,g()*.88+.06]),r=[...a].sort((i,b)=>S(b[0],b[1])-S(i[0],i[1]));w===1?(o=a,f=o.map(()=>4),y=o.map(()=>.7)):w===2?(o=a,f=a.map(i=>r.slice(0,9).includes(i)?6.5:3.5),y=a.map(i=>r.slice(0,9).includes(i)?.95:.25)):(o=a,f=a.map(i=>r.slice(0,3).includes(i)?8.5:3),y=a.map(i=>r.slice(0,3).includes(i)?1:.15))}o.forEach(([a,r],i)=>{const b=l+a*d,q=c+(1-r)*p,v=S(a,r),T=Math.round(80+v*175),V=Math.round(120+v*135),Q=Math.round(80+v*60);t.beginPath(),t.arc(b,q,f[i],0,Math.PI*2),t.fillStyle=`rgba(${T},${V},${Q},${y[i]})`,t.fill(),t.strokeStyle=`rgba(255,255,255,${y[i]*.5})`,t.lineWidth=.7,t.stroke()});const A=o.reduce((a,r,i)=>S(r[0],r[1])>S(a.pt[0],a.pt[1])?{pt:r,i}:a,{pt:o[0],i:0}),O=l+A.pt[0]*d,G=c+(1-A.pt[1])*p;t.strokeStyle="#FFD700",t.lineWidth=2,t.beginPath(),t.arc(O,G,f[A.i]+4,0,Math.PI*2),t.stroke(),t.fillStyle="#FFD700",t.font="9px var(--font-sans)",t.textAlign="left",t.fillText("best",O+8,G+4),t.fillStyle="rgba(180,180,180,0.75)",t.font="10px var(--font-sans)",t.textAlign="center",t.fillText("Learning Rate (log scale) →",l+d/2,F-6),["1e-5","1e-4","1e-3","1e-2","1e-1"].forEach((a,r)=>{t.fillStyle="rgba(140,140,140,0.6)",t.font="9px var(--font-mono)",t.textAlign="center",t.fillText(a,l+r/4*d,c+p+14)}),t.save(),t.translate(13,c+p/2),t.rotate(-Math.PI/2),t.fillStyle="rgba(180,180,180,0.75)",t.font="10px var(--font-sans)",t.textAlign="center",t.fillText("Hidden Units →",0,0),t.restore(),["16","64","128","256","512"].forEach((a,r)=>{t.fillStyle="rgba(140,140,140,0.6)",t.font="9px var(--font-mono)",t.textAlign="right",t.fillText(a,l-4,c+p-r/4*p+3)});const $={grid:"Grid Search — exhaustive, misses peaks between grid points",random:"Random Search — same budget, better coverage (Bergstra & Bengio, 2012)",bayesian:"Bayesian Opt — learns the landscape, focuses on promising regions",hyperband:"Hyperband — many configs with low budget → promote top fraction"};t.fillStyle="rgba(200,200,200,0.7)",t.font="10px var(--font-sans)",t.textAlign="center",t.fillText($[n]||"",l+d/2,c-4)},[n,w]);const N=[["grid","Grid","#FF7043"],["random","Random","#42A5F5"],["bayesian","Bayesian","#66BB6A"],["hyperband","Hyperband","#AB47BC"]],j={grid:{color:"danger",budget:"25 full trials",pattern:"Regular lattice over a tiny discrete search space.",tradeoff:"Easy to reason about, but off-grid optima are invisible."},random:{color:"info",budget:"25 full trials",pattern:"Independent samples cover more values along each important axis.",tradeoff:"Cheap and parallel, but variance is high if the budget is tiny."},bayesian:{color:"success",budget:"7 explore + 18 exploit",pattern:"A surrogate model shifts samples toward regions with high predicted gain.",tradeoff:"Sample-efficient, but more sequential and more sensitive to noisy metrics."},hyperband:{color:"warning",budget:["27 configs × 11 epochs","9 survivors × 33 epochs","3 finalists × 100 epochs"][w-1],pattern:"Start broad, then reallocate more budget only to surviving configs.",tradeoff:"Fast when early validation signal correlates with final quality."}};return e.jsxs(X,{children:[e.jsx("div",{style:{display:"flex",gap:7,marginBottom:8,flexWrap:"wrap"},children:N.map(([h,t,k])=>e.jsxs("button",{onClick:()=>C(h),style:{padding:"3px 11px",fontSize:12,border:`1px solid ${k}`,borderRadius:"var(--border-radius-md)",background:n===h?k+"22":"transparent",color:k,cursor:"pointer"},children:[n===h?"✓ ":"",t]},h))}),e.jsx("canvas",{ref:H,width:500,height:300,style:{display:"block",width:"100%",maxWidth:500,margin:"0 auto",borderRadius:"var(--border-radius-md)"}}),n==="hyperband"&&e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"90px 1fr 80px",gap:8,alignItems:"center",fontSize:12.5,maxWidth:380,margin:"10px auto 0"},children:[e.jsx("span",{style:{color:"var(--color-text-secondary)"},children:"Hyperband round"}),e.jsx("input",{type:"range",min:1,max:3,step:1,value:w,onChange:h=>W(+h.target.value),style:{width:"100%"}}),e.jsx("span",{style:{color:"var(--color-text-primary)",fontFamily:"var(--font-mono)",textAlign:"right"},children:["","r1: 27 configs","r2: top 9","r3: top 3"][w]})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(140px, 1fr))",gap:8,marginTop:10},children:[e.jsx(m,{color:j[n].color,title:"Budget view",children:j[n].budget}),e.jsx(m,{color:j[n].color,title:"Search pattern",children:j[n].pattern}),e.jsx(m,{color:j[n].color,title:"Tradeoff",children:j[n].tradeoff})]}),e.jsx("p",{style:{textAlign:"center",fontSize:11,color:"var(--color-text-tertiary)",margin:"6px 0 0"},children:"Bright = high validation accuracy  ·  Gold ring = best found  ·  2D slice of true HP space"})]})}function ee(){return e.jsxs("div",{children:[e.jsx(E,{children:"39.1 — What are Hyperparameters?"}),e.jsx(z,{children:"Model parameters (weights, biases) are learned by the optimizer from data. Hyperparameters are set before training and control how that learning happens. They live outside the gradient-descent loop and cannot be tuned by backprop."}),e.jsx(s,{children:"Parameters vs hyperparameters"}),e.jsxs(L,{cols:2,gap:10,children:[e.jsx(m,{color:"info",title:"Model parameters",children:"Weights and biases are internal state. Gradient descent updates them to reduce training loss."}),e.jsx(m,{color:"warning",title:"Hyperparameters",children:"Learning rate, batch size, depth, dropout, weight decay and scheduler choices shape the optimization process itself."})]}),e.jsx(s,{children:"Formal view"}),e.jsx(z,{children:"Hyperparameter tuning is a bilevel optimization problem: solve training for a fixed hyperparameter setting, then compare settings using validation loss."}),e.jsx(P,{block:!0,children:`For a hyperparameter vector λ:

θ*(λ) = argmin_θ  L_train(θ; λ)
λ*    = argmin_λ  L_val(θ*(λ), λ)

Backprop learns θ for fixed λ.
The tuner searches λ using validation feedback.`}),e.jsx(_,{color:"info",icon:"ti-bulb",children:"Intuition: the optimizer is an inner loop that learns the network weights; the tuner is an outer loop that decides how that inner loop should run."}),e.jsx(s,{children:"Taxonomy"}),e.jsx(B,{heads:["Category","Examples","Typical range"],rows:[["Architecture","# layers, # units/layer, activation fn","2–50 layers; 16–4096 units; relu/tanh/elu"],["Training","learning rate, batch size, # epochs","lr: 1e-5–1e-1; batch: 8–1024"],["Optimizer","optimizer type, β₁, β₂, momentum","Adam vs SGD; β₁: 0.85–0.95"],["Regularization","dropout rate, L1/L2 λ, weight decay","dropout: 0–0.7; λ: 1e-5–1e-1"],["Data","augmentation policy, normalization strategy","flip, crop, cutout"],["Scheduler","LR schedule type, warmup steps, decay factor","cosine, step, plateau"]]}),e.jsxs(_,{color:"info",icon:"ti-bulb",children:[e.jsx("strong",{children:"Most impactful (by empirical consensus):"})," Learning rate ",">"," Architecture depth/width ",">"," Batch size ",">"," Dropout rate. Always tune lr first."]}),e.jsx(E,{children:"Search Strategies"}),e.jsx(z,{children:"The core challenge: evaluating one configuration requires a full training run (expensive). The goal is to find a good configuration using as few evaluations as possible."}),e.jsx(Z,{}),e.jsx(s,{children:"Why brute force breaks fast"}),e.jsx(P,{block:!0,children:`If d hyperparameters each have k candidate values:

Grid search trials = k^d

Example: k = 5, d = 6  =>  5^6 = 15,625 full runs
Doubling resolution per axis multiplies total compute by 2^d.`}),e.jsx(s,{children:"Strategy comparison"}),e.jsx(B,{heads:["Strategy","How it works","Pros","Cons","Use when"],rows:[["Grid Search","Exhaustive cartesian product of discrete values","Reproducible, complete within range","Curse of dimensionality: O(nᵈ) evals","≤2 HPs, narrow well-known range"],["Random Search","Sample uniformly at random from the space","Surprisingly effective (Bergstra&Bengio), parallelizable","May miss best region with bad luck","3–8 HPs, decent compute budget"],["Bayesian Opt","Fit a surrogate model (GP) to predict perf; pick next config via acquisition fn","Sample-efficient, focuses on promising regions","Sequential (hard to parallelize), complex setup","5–15 HPs, expensive evaluations"],["Hyperband","Early stopping of bad configs; promote top fraction","Finds good configs fast with less total compute","Relies on LR-performance correlation holding","Large HP space, many configs quickly"],["ASHA / PBT","Async extensions of Hyperband / population-based","Scales to large clusters","Complex infrastructure","Distributed training at scale"]]}),e.jsx(s,{children:"Hyperband in depth"}),e.jsx(z,{children:"Hyperband (Li et al., 2018) addresses the key inefficiency: most of a full training run's compute is wasted on bad configs that could be identified early. It runs successive halving brackets:"}),e.jsx(P,{block:!0,children:`Given: max budget R (e.g. 100 epochs), reduction factor η (e.g. 3)

Round 1: n = 27 configs, each trained for R/η² = 11 epochs → keep top 1/η = 9
Round 2: 9  configs, each trained for R/η  = 33 epochs → keep top 3
Round 3: 3  configs, each trained for R     = 100 epochs → 1 winner

Total epoch-budget used = 27·11 + 9·33 + 3·100 = 894
Full-training all 27 configs would cost      = 27·100 = 2700

Savings ≈ 2700 / 894 ≈ 3.0× while still fully training the finalists`}),e.jsx(_,{color:"warning",icon:"ti-alert-triangle",children:'Hyperband assumes "speedup correlation" — that a config that is bad after 10 epochs is also bad at 100 epochs. This holds for most DL tasks but fails for warmup-heavy schedules or curriculum learning.'}),e.jsx(x,{q:"Why does random search outperform grid search despite being unstructured?",a:"Bergstra & Bengio (2012) showed that in typical HP spaces, some hyperparameters matter far more than others. Grid search wastes evaluations on all combinations of irrelevant HPs — if 3 of 6 HPs don't matter, a 6-dimensional grid has ≥ 8× redundant evaluations. Random search naturally projects well onto the important dimensions: with 25 random points in 6D, each important HP dimension sees 25 distinct values; a 25-point 6D grid (impossible anyway) would only see ~2 values per dimension. The higher the dimensionality and the more irrelevant HPs, the wider the gap in favor of random search."}),e.jsx(x,{q:"What is the explore-exploit tradeoff in Bayesian optimization?",a:"The surrogate model (usually a Gaussian Process) produces both a predicted mean performance μ(x) and an uncertainty σ(x) for any untested configuration x. The acquisition function decides the next query point. <strong>Exploitation</strong>: maximize μ(x) — pick the configuration predicted to be best. <strong>Exploration</strong>: maximize σ(x) — pick the configuration we're most uncertain about (might be better). Common acquisition functions: UCB = μ(x) + κ·σ(x) balances both; EI (Expected Improvement) integrates probability of exceeding the current best. κ controls the explore/exploit balance: high κ → explore, low κ → exploit."})]})}function te(){return e.jsxs("div",{children:[e.jsx(E,{children:"39.2 — Keras Tuner: Complete Guide"}),e.jsx(z,{children:"KerasTuner is the official hyperparameter tuning library in the Keras ecosystem. It uses a define-by-run API: declare search knobs inside your model-building code, let a tuner run trials, then rebuild the best configuration for the real final training run."}),e.jsx(s,{children:"Mental model"}),e.jsx(B,{heads:["Piece","Role","Typical form"],rows:[["HyperParameters","Declares what is allowed to vary","hp.Int / hp.Float / hp.Choice / hp.Boolean"],["HyperModel","Builds the model and optionally custom fit logic","def build_model(hp) or class MyHyperModel"],["Tuner","Chooses configurations and launches trials","RandomSearch / BayesianOptimization / Hyperband / GridSearch"],["Objective","Metric to maximize or minimize","'val_accuracy' or kt.Objective('val_loss', 'min')"],["Oracle","Internal search algorithm state","Usually managed for you by the tuner"]]}),e.jsx(s,{children:"Installation"}),e.jsx(u,{children:`pip install keras-tuner --upgrade

import keras_tuner as kt
import tensorflow as tf`}),e.jsxs(_,{color:"info",children:[e.jsx("strong",{children:"Import style:"})," Current official examples use ",e.jsx("code",{children:"keras"})," together with ",e.jsx("code",{children:"keras_tuner"}),". The code here keeps ",e.jsx("code",{children:"tf.keras"})," so it stays consistent with the rest of your study-guide series."]}),e.jsx(s,{children:"HP types — the hp object"}),e.jsx(z,{children:"Inside a model-building function, you receive an hp object to declare searchable hyperparameters:"}),e.jsx(B,{heads:["hp API","What it represents","Typical use"],rows:[["hp.Int","Discrete integer range","units, depth, kernel size"],["hp.Float","Continuous value; use log sampling for scale parameters","learning rate, weight decay, dropout"],["hp.Choice","Finite categorical set","optimizer, activation, batch size"],["hp.Boolean","Binary switch","use_batch_norm, use_dropout"],["hp.Fixed","Tracked constant","seed, ablation flag, frozen dataset version"],["hp.conditional_scope","Activate child HPs only when a parent choice is active","Adam β₁ only if optimizer='adam'"]]}),e.jsx(u,{children:`def build_model(hp):
    model = tf.keras.Sequential()

    # ── Integer hyperparameter ────────────────────────────
    units = hp.Int(
        'units',                   # name (must be unique)
        min_value=32,
        max_value=512,
        step=32,                   # values: 32, 64, 96, ..., 512
        default=128                # used if hp is fixed (optional)
    )

    # ── Float hyperparameter (log scale strongly recommended for lr) ──
    lr = hp.Float(
        'learning_rate',
        min_value=1e-5,
        max_value=1e-2,
        sampling='log'             # uniform in log-space: crucial for lr!
    )

    # ── Categorical / Choice ──────────────────────────────
    activation = hp.Choice('activation', values=['relu', 'elu', 'tanh'])
    optimizer_name = hp.Choice('optimizer', ['adam', 'sgd', 'rmsprop'])

    # ── Boolean ───────────────────────────────────────────
    use_bn = hp.Boolean('batch_norm', default=True)

    # ── Fixed (not tuned but recorded) ────────────────────
    hp.Fixed('dataset_version', 'mnist-v1')

    return model`}),e.jsx(s,{children:"Defining a tunable model"}),e.jsx(u,{children:`def build_model(hp):
    model = tf.keras.Sequential()
    model.add(tf.keras.layers.Flatten(input_shape=(28, 28)))

    # ── Tune number of layers ─────────────────────────────
    num_layers = hp.Int('num_layers', 1, 4)
    activation = hp.Choice('activation', ['relu', 'elu'])

    for i in range(num_layers):
        model.add(tf.keras.layers.Dense(
            units=hp.Int(f'units_{i}', 32, 512, step=32),
            activation=activation
        ))
        if hp.Boolean(f'dropout_{i}'):
            model.add(tf.keras.layers.Dropout(
                rate=hp.Float(f'dropout_rate_{i}', 0.1, 0.5, step=0.1)
            ))

    model.add(tf.keras.layers.Dense(10, activation='softmax'))

    # ── Tune learning rate ────────────────────────────────
    lr = hp.Float('lr', 1e-4, 1e-2, sampling='log')
    optimizer_choice = hp.Choice('optimizer', ['adam', 'sgd'])
    if optimizer_choice == 'adam':
        opt = tf.keras.optimizers.Adam(learning_rate=lr)
    else:
        opt = tf.keras.optimizers.SGD(
            learning_rate=lr, momentum=0.9, nesterov=True
        )

    model.compile(optimizer=opt,
                  loss='sparse_categorical_crossentropy',
                  metrics=['accuracy'])
    return model`}),e.jsx(_,{color:"warning",icon:"ti-alert-triangle",children:"Resist the urge to tune everything at once. A narrower, high-leverage search space usually beats a huge search space with weak priors."}),e.jsx(s,{children:"The four tuners"}),e.jsxs(L,{cols:2,gap:10,children:[e.jsx(m,{color:"info",title:"RandomSearch",children:"Independent random configs from the space. Strong baseline, easy to parallelize, almost zero algorithmic overhead."}),e.jsx(m,{color:"success",title:"BayesianOptimization",children:"Gaussian-process surrogate plus acquisition function. Best sample-efficiency when each trial is expensive."}),e.jsx(m,{color:"warning",title:"Hyperband",children:"Successive halving across brackets. Best when many configs are cheap enough to partially train and prune."}),e.jsx(m,{color:"danger",title:"GridSearch",children:"Full cartesian product over discrete values. Only reasonable for tiny, highly structured spaces."})]}),e.jsx(u,{children:`# ── Random Search ────────────────────────────────────────
tuner_rs = kt.RandomSearch(
    hypermodel=build_model,
    objective='val_accuracy',      # metric to maximize
    max_trials=30,                 # total configurations to try
    executions_per_trial=2,        # average over 2 runs (reduces noise)
    overwrite=True,                # start fresh instead of resuming old trials
    seed=42,
    directory='kt_results',        # where to save trials
    project_name='mnist_random'
)

# ── Bayesian Optimization ─────────────────────────────────
tuner_bo = kt.BayesianOptimization(
    hypermodel=build_model,
    objective='val_accuracy',
    max_trials=20,                 # needs fewer trials than random
    num_initial_points=6,          # random exploration before GP kicks in
    overwrite=True,
    directory='kt_results',
    project_name='mnist_bayesian'
)

# ── Hyperband ─────────────────────────────────────────────
tuner_hb = kt.Hyperband(
    hypermodel=build_model,
    objective='val_accuracy',
    max_epochs=50,                 # max epochs per trial (R)
    factor=3,                      # reduction factor η
    hyperband_iterations=2,        # repeat the full bracket N times
    overwrite=True,
    directory='kt_results',
    project_name='mnist_hyperband'
)

# ── GridSearch ────────────────────────────────────────────
tuner_gs = kt.GridSearch(
    hypermodel=build_model,
    objective='val_accuracy',
    overwrite=True,
    directory='kt_results',
    project_name='mnist_grid'      # only practical for tiny HP spaces
)`}),e.jsx(s,{children:"Minimal workflow"}),e.jsx(P,{block:!0,children:`Define search space → instantiate tuner → tuner.search(...)
→ inspect best_hps / trial summaries → rebuild model
→ full retrain with the chosen HPs → one final test evaluation`}),e.jsx(s,{children:"Running the search"}),e.jsx(u,{children:`import tensorflow as tf

(x_train, y_train), (x_val, y_val) = tf.keras.datasets.mnist.load_data()
x_train, x_val = x_train/255.0, x_val/255.0

# ── Early stopping callback (essential — stops bad trials early) ──
stop_early = tf.keras.callbacks.EarlyStopping(
    monitor='val_loss', patience=5, restore_best_weights=True
)

# ── Run the search ────────────────────────────────────────
tuner_hb.search(
    x_train, y_train,
    epochs=50,                     # max epochs per trial
    validation_data=(x_val, y_val),
    callbacks=[stop_early],
    verbose=0                      # suppress per-epoch output
)

# ── Summary of search space ───────────────────────────────
tuner_hb.search_space_summary()

# ── Results summary ───────────────────────────────────────
tuner_hb.results_summary(num_trials=5)  # top 5 configs`}),e.jsxs(_,{color:"info",children:[e.jsx("strong",{children:"Budget interpretation:"})," in Hyperband, ",e.jsx("code",{children:"max_epochs"})," is a maximum resource budget, not a promise that every trial will run that long. Most weak configs get terminated far earlier."]}),e.jsx(s,{children:"Retrieving best results"}),e.jsx(u,{children:`# ── Best hyperparameters ─────────────────────────────────
best_hps = tuner_hb.get_best_hyperparameters(num_trials=1)[0]

print("Best lr:", best_hps.get('lr'))
print("Best units:", best_hps.get('units_0'))
print("Best num_layers:", best_hps.get('num_layers'))

# ── Best pre-built model ──────────────────────────────────
best_model = tuner_hb.get_best_models(num_models=1)[0]
best_model.summary()

# ── Rebuild model from best HPs and retrain fully ─────────
# (recommended: tuner may have stopped early)
model = tuner_hb.hypermodel.build(best_hps)
history = model.fit(
    x_train, y_train,
    epochs=100,
    validation_data=(x_val, y_val),
    callbacks=[
        tf.keras.callbacks.EarlyStopping(patience=10, restore_best_weights=True),
        tf.keras.callbacks.ReduceLROnPlateau(patience=5, factor=0.5)
    ]
)

# ── Export all trial results as DataFrame ─────────────────
import pandas as pd

all_hps = []
for trial in tuner_hb.oracle.trials.values():
    if trial.score is None:
        continue
    row = dict(trial.hyperparameters.values)
    row['val_accuracy'] = trial.score
    all_hps.append(row)

df = pd.DataFrame(all_hps).sort_values('val_accuracy', ascending=False)
print(df.head(10))`}),e.jsx(s,{children:"Advanced: HyperModel class and conditional search spaces"}),e.jsx(u,{children:`# ── HyperModel class (reusable, testable) ────────────────
class MyHyperModel(kt.HyperModel):
    def __init__(self, num_classes):
        self.num_classes = num_classes

    def build(self, hp):
        model = tf.keras.Sequential()
        model.add(tf.keras.layers.Flatten(input_shape=(28, 28)))
        for i in range(hp.Int('layers', 1, 4)):
            model.add(tf.keras.layers.Dense(
                hp.Int(f'units_{i}', 64, 512, step=64), activation='relu'))
        model.add(tf.keras.layers.Dense(self.num_classes, activation='softmax'))
        model.compile(
            optimizer=tf.keras.optimizers.Adam(hp.Float('lr', 1e-4, 1e-2, sampling='log')),
            loss='sparse_categorical_crossentropy', metrics=['accuracy'])
        return model

    def fit(self, hp, model, *args, **kwargs):
        # Override fit to tune callbacks too
        return model.fit(
            *args,
            batch_size=hp.Choice('batch_size', [32, 64, 128]),
            **kwargs
        )

tuner = kt.Hyperband(
    MyHyperModel(num_classes=10),
    objective='val_accuracy',
    max_epochs=30,
    directory='kt_results', project_name='hypermodel_demo'
)

# ── Conditional search space ──────────────────────────────
def build_conditional(hp):
    opt_name = hp.Choice('optimizer', ['adam', 'sgd'])
    if opt_name == 'adam':
        # Only tune β₁ if Adam is selected
        b1 = hp.Float('adam_beta1', 0.85, 0.98)
        opt = tf.keras.optimizers.Adam(
            hp.Float('lr', 1e-4, 1e-2, sampling='log'), beta_1=b1)
    else:
        opt = tf.keras.optimizers.SGD(
            hp.Float('lr', 1e-3, 5e-1, sampling='log'),
            momentum=hp.Float('sgd_momentum', 0.5, 0.99))
    # model build...`}),e.jsx(u,{children:`# ── Explicit conditional scopes ───────────────────────────
hp = kt.HyperParameters()
optimizer = hp.Choice('optimizer', ['adam', 'sgd'])

with hp.conditional_scope('optimizer', ['adam']):
    hp.Float('adam_beta1', 0.85, 0.98)

with hp.conditional_scope('optimizer', ['sgd']):
    hp.Float('sgd_momentum', 0.5, 0.99)`}),e.jsx(s,{children:"Objective variants"}),e.jsx(u,{children:`# Minimize a metric (e.g. val_loss)
objective = kt.Objective('val_loss', direction='min')

# Custom metric (e.g. F1 score)
objective = kt.Objective('val_f1_score', direction='max')

# Multiple objectives are allowed too
multi_objective = [
    kt.Objective('val_loss', direction='min'),
    kt.Objective('val_accuracy', direction='max'),
]
# KerasTuner combines these as:
#   sum(objectives_to_minimize) - sum(objectives_to_maximize)

tuner = kt.BayesianOptimization(
    build_model,
    objective=multi_objective,
    max_trials=20, directory='kt_results', project_name='custom_obj'
)`}),e.jsx(s,{children:"Best practices"}),e.jsx(B,{heads:["Practice","Why"],rows:[["Always use EarlyStopping in search callbacks","Cuts wasted compute on diverging trials dramatically"],["Use sampling='log' for scale parameters","Learning rate and weight decay matter by order of magnitude, not by linear distance"],["Start with RandomSearch (20–50 trials)","Establishes a strong baseline cheaply before trying Bayesian"],["Tune high-impact knobs in stages","First lr/batch/regularization, then widen the architecture search"],["Use executions_per_trial=2–3 for noisy objectives","Averages out training noise; more important for small datasets"],["Use overwrite=True only when intentionally restarting","Otherwise let KerasTuner resume from the same directory/project_name"],["Retrain the final model from best_hps","The tuner's winning checkpoint is for selection, not for your final reported model"],["Keep the test set untouched until the very end","Using test data to tune HPs creates leakage and optimistic metrics"],["Use nested CV when the dataset is tiny","A single validation split can be too noisy in low-data regimes"]]}),e.jsx(s,{children:"Common pitfalls"}),e.jsx(B,{heads:["Pitfall","What goes wrong","Better practice"],rows:[["Searching too many knobs at once","Budget gets diluted across a huge space","Start with a smaller, theory-guided search space"],["Linear sampling for learning rate","Most samples land in the wrong scale region","Use log sampling for lr, weight decay, epsilon-like knobs"],["Aggressive early stopping with warmup schedules","Late-blooming configs get killed unfairly","Match patience to scheduler warmup and convergence speed"],["Treating get_best_models() as the final answer","Best trial may be partially trained or early-stopped","Rebuild from best_hps and retrain properly"],["Mixing fresh and resumed searches accidentally","Old trials contaminate interpretation","Be explicit about overwrite and project_name"],["Selecting on the test set","Final score becomes biased and no longer honest","Tune on validation data; report test metrics once"]]}),e.jsx(s,{children:"Nested search logic"}),e.jsx(P,{block:!0,children:`Inner loop: choose λ using validation score
Outer loop: lock λ*, retrain θ on train ∪ val, evaluate once on held-out test data

If the dataset is very small, replace the single outer test split with nested cross-validation.`}),e.jsxs(_,{color:"success",icon:"ti-check",children:[e.jsx("strong",{children:"Recommended workflow:"})," (1) Quick RandomSearch to map the landscape. (2) Narrow the space around what matters. (3) Use BayesianOptimization or Hyperband depending on trial cost. (4) Rebuild from ",e.jsx("code",{children:"best_hps"})," and do one serious final training run. (5) Report test accuracy only after that."]}),e.jsx(x,{q:"Why must you use sampling='log' for learning rate, not uniform?",a:"The learning rate is effective over many decades: 1e-5, 1e-4, 1e-3, 1e-2, 1e-1 are all meaningfully different. With uniform sampling in [1e-5, 1e-1], about 90% of drawn values would be in [9e-3, 1e-1] — the top decade — because it occupies 90% of the linear range. The other four decades (where the best LR almost always lies) get almost no samples. Log-uniform sampling gives equal probability mass to each decade: [1e-5,1e-4], [1e-4,1e-3], etc., which is the statistically correct prior for a scale parameter."}),e.jsx(x,{q:"How does Keras Tuner's Bayesian optimization work internally?",a:"Keras Tuner's BayesianOptimization uses a Gaussian Process (GP) regression model as the surrogate. After each trial, the GP is fitted to the observed (HP configuration → validation score) pairs. For the next trial, it maximizes the Expected Improvement (EI) acquisition function: EI(x) = E[max(f(x) − f_best, 0)], which balances exploration (high σ regions) and exploitation (high μ regions). The optimization of EI itself is done with L-BFGS-B from multiple random restarts. This is why BayesianOptimization requires <em>sequential</em> evaluations by default — each trial's result must be incorporated before the next config is chosen."}),e.jsx(x,{q:"When should you choose Hyperband over BayesianOptimization?",a:"<strong>Use Hyperband when:</strong> (1) each trial is quick (< 5–10 min) and you can afford many of them; (2) you can parallelize across many GPUs or workers; (3) the HP space is large and you want breadth over depth. <strong>Use Bayesian when:</strong> (1) each trial is expensive (> 30 min, such as large CNN or transformer runs); (2) the HP space is small-to-medium (< 15 dimensions); (3) you care most about sample efficiency. In practice, Hyperband is often preferred for broad architecture search while Bayesian optimization is preferred for optimizer and learning-rate tuning."}),e.jsx(x,{q:"What is the difference between tuner.get_best_models() and rebuilding from best_hps?",a:"<code>get_best_models()</code> returns the model as it was at the end of the best trial — which may have been stopped early by EarlyStopping after only 15 of 50 epochs, on the training subset. Rebuilding with <code>hypermodel.build(best_hps)</code> and fitting from scratch on the full training data (train + validation, for the final model) is almost always better: more data + more epochs + proper final schedule = stronger model. The tuner's role is to identify the best configuration; the final model should be trained independently with that configuration."}),e.jsx(x,{q:"Should number of epochs itself be tuned?",a:"Usually treat epochs as a <strong>budget</strong>, not as a primary hyperparameter. In practice you set a generous <code>max_epochs</code>, use EarlyStopping, and let validation performance decide the best stopping point. Tuning a raw epoch count directly mixes up model quality with compute budget and is much less stable."}),e.jsx(x,{q:"What does overwrite=True change?",a:"<code>overwrite=True</code> discards any previous search state in the same <code>directory/project_name</code> pair and starts a fresh experiment. If you want resumability, keep the same folder names and omit <code>overwrite=True</code> (or set it to <code>False</code>). Accidentally mixing these two modes is a very common source of confusing results."})]})}const ae=[{id:"concepts",label:"Concepts & Strategies",sub:"Ch. 39.1"},{id:"kt",label:"Keras Tuner API",sub:"Ch. 39.2"}];function oe(){const[H,n]=R.useState("concepts"),C={concepts:e.jsx(ee,{}),kt:e.jsx(te,{})};return e.jsxs("div",{children:[e.jsxs("div",{className:"page-header",children:[e.jsx("div",{className:"page-header-eyebrow",children:"Deep Learning — Module 9"}),e.jsx("h1",{className:"page-header-title",children:"Hyperparameter Tuning · Search Strategies · Keras Tuner"}),e.jsx("p",{className:"page-header-subtitle",children:"Chapter 39 · Interactive search space explorer · Complete Keras Tuner API · Best practices · pitfalls"})]}),e.jsx(J,{tabs:ae,active:H,onChange:n}),e.jsx("div",{style:{padding:"0.5rem 0 2rem"},children:C[H]}),e.jsx(Y,{moduleId:9})]})}export{oe as default};
