import { useState, useRef, useEffect } from "react";
import { Code } from '../components/ui/Code.jsx';
import { Mx, H2, H3, P } from '../components/ui/Typography.jsx';
import { QA } from '../components/ui/QA.jsx';
import { Note, Table, Grid, Card, VizBox } from '../components/ui/Primitives.jsx';
import NavButtons from '../components/layout/NavButtons.jsx';
import SectionNav from '../components/layout/SectionNav.jsx';

/* ══════════════════════════════════════════════════════
   SEARCH STRATEGY VISUALIZATION
══════════════════════════════════════════════════════ */
function SearchViz() {
  const ref = useRef(null);
  const [strat, setStrat] = useState("random");
  const [hbRound, setHbRound] = useState(1);

  useEffect(() => {
    const cv = ref.current; if (!cv) return;
    const ctx = cv.getContext("2d");
    const W = cv.width, H = cv.height;
    ctx.clearRect(0, 0, W, H);

    const padL=58, padR=18, padT=18, padB=44;
    const pw=W-padL-padR, ph=H-padT-padB;

    // Performance landscape: two peaks, main at (0.58, 0.52), local at (0.22, 0.75)
    const perf = (x, y) => {
      const p1 = Math.exp(-((x-0.58)**2/0.055 + (y-0.52)**2/0.07));
      const p2 = Math.exp(-((x-0.22)**2/0.025 + (y-0.75)**2/0.025)) * 0.52;
      return Math.max(0, p1 + p2);
    };

    // Draw heatmap background
    const imgD = ctx.createImageData(pw, ph);
    for (let ix=0;ix<pw;ix++) for (let iy=0;iy<ph;iy++){
      const x=ix/pw, y=1-(iy/ph);
      const p = perf(x, y);
      const t = Math.pow(Math.min(p,1), 0.55);
      const idx=(iy*pw+ix)*4;
      imgD.data[idx]   = Math.round(12 + t*55);
      imgD.data[idx+1] = Math.round(18 + t*115);
      imgD.data[idx+2] = Math.round(28 + t*175);
      imgD.data[idx+3] = 255;
    }
    ctx.putImageData(imgD, padL, padT);

    // Faint grid lines
    ctx.strokeStyle="rgba(255,255,255,0.07)"; ctx.lineWidth=0.5;
    for(let g=1;g<5;g++){
      ctx.beginPath(); ctx.moveTo(padL+g/5*pw,padT); ctx.lineTo(padL+g/5*pw,padT+ph); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(padL,padT+g/5*ph); ctx.lineTo(padL+pw,padT+g/5*ph); ctx.stroke();
    }

    // Generate sample points
    let s=42;
    const rand=()=>{ s=(s*1664525+1013904223)&0xFFFFFFFF; return (s>>>0)/0xFFFFFFFF; };
    const randn=()=>Math.sqrt(-2*Math.log(rand()+1e-9))*Math.cos(2*Math.PI*rand());
    let pts=[], radii=[], alphas=[];

    if(strat==="grid"){
      // 5×5 grid
      for(let i=0;i<5;i++) for(let j=0;j<5;j++)
        pts.push([0.1+i*0.2, 0.1+j*0.2]);
      radii=pts.map(()=>5); alphas=pts.map(()=>0.9);
    } else if(strat==="random"){
      for(let i=0;i<25;i++) pts.push([rand()*0.88+0.06, rand()*0.88+0.06]);
      radii=pts.map(()=>5); alphas=pts.map(()=>0.9);
    } else if(strat==="bayesian"){
      // 7 random exploration, 18 adaptive around best regions
      for(let i=0;i<7;i++) pts.push([rand()*0.88+0.06, rand()*0.88+0.06]);
      for(let i=0;i<18;i++){
        const cx=0.58+(randn()*0.12), cy=0.52+(randn()*0.14);
        pts.push([Math.max(0.04,Math.min(0.96,cx)), Math.max(0.04,Math.min(0.96,cy))]);
      }
      radii=pts.map((_,i)=>i<7?4:5.5); alphas=pts.map((_,i)=>i<7?0.5:0.9);
    } else if(strat==="hyperband"){
      // Round 1: 27 random (small dots)
      // Round 2: top 9 survive (medium dots)
      // Round 3: top 3 survive (large dots)
      const all27=Array.from({length:27},()=>[rand()*0.88+0.06,rand()*0.88+0.06]);
      const sorted=[...all27].sort((a,b)=>perf(b[0],b[1])-perf(a[0],a[1]));
      if(hbRound===1){
        pts=all27; radii=pts.map(()=>4); alphas=pts.map(()=>0.7);
      } else if(hbRound===2){
        pts=all27; radii=all27.map(p=>sorted.slice(0,9).includes(p)?6.5:3.5);
        alphas=all27.map(p=>sorted.slice(0,9).includes(p)?0.95:0.25);
      } else {
        pts=all27; radii=all27.map(p=>sorted.slice(0,3).includes(p)?8.5:3);
        alphas=all27.map(p=>sorted.slice(0,3).includes(p)?1:0.15);
      }
    }

    // Draw points
    pts.forEach(([x,y],i)=>{
      const px=padL+x*pw, py=padT+(1-y)*ph;
      const p=perf(x,y);
      const r2=Math.round(80+p*175), g2=Math.round(120+p*135), b2=Math.round(80+p*60);
      ctx.beginPath(); ctx.arc(px,py,radii[i],0,Math.PI*2);
      ctx.fillStyle=`rgba(${r2},${g2},${b2},${alphas[i]})`; ctx.fill();
      ctx.strokeStyle=`rgba(255,255,255,${alphas[i]*0.5})`; ctx.lineWidth=0.7; ctx.stroke();
    });

    // Star best point
    const best=pts.reduce((b,p,i)=>perf(p[0],p[1])>perf(b.pt[0],b.pt[1])?{pt:p,i}:b, {pt:pts[0],i:0});
    const bx=padL+best.pt[0]*pw, by=padT+(1-best.pt[1])*ph;
    ctx.strokeStyle="#FFD700"; ctx.lineWidth=2;
    ctx.beginPath(); ctx.arc(bx,by,radii[best.i]+4,0,Math.PI*2); ctx.stroke();
    ctx.fillStyle="#FFD700"; ctx.font="9px var(--font-sans)"; ctx.textAlign="left";
    ctx.fillText("best",bx+8,by+4);

    // Axes & labels
    ctx.fillStyle="rgba(180,180,180,0.75)"; ctx.font="10px var(--font-sans)";
    ctx.textAlign="center"; ctx.fillText("Learning Rate (log scale) →",padL+pw/2,H-6);
    ["1e-5","1e-4","1e-3","1e-2","1e-1"].forEach((l,i)=>{
      ctx.fillStyle="rgba(140,140,140,0.6)"; ctx.font="9px var(--font-mono)";
      ctx.textAlign="center"; ctx.fillText(l,padL+i/4*pw,padT+ph+14);
    });
    ctx.save(); ctx.translate(13,padT+ph/2); ctx.rotate(-Math.PI/2);
    ctx.fillStyle="rgba(180,180,180,0.75)"; ctx.font="10px var(--font-sans)"; ctx.textAlign="center";
    ctx.fillText("Hidden Units →",0,0); ctx.restore();
    ["16","64","128","256","512"].forEach((l,i)=>{
      ctx.fillStyle="rgba(140,140,140,0.6)"; ctx.font="9px var(--font-mono)"; ctx.textAlign="right";
      ctx.fillText(l,padL-4,padT+ph-i/4*ph+3);
    });

    // Strategy label
    const labels={grid:"Grid Search — exhaustive, misses peaks between grid points",
      random:"Random Search — same budget, better coverage (Bergstra & Bengio, 2012)",
      bayesian:"Bayesian Opt — learns the landscape, focuses on promising regions",
      hyperband:"Hyperband — many configs with low budget → promote top fraction"};
    ctx.fillStyle="rgba(200,200,200,0.7)"; ctx.font="10px var(--font-sans)"; ctx.textAlign="center";
    ctx.fillText(labels[strat]||"",padL+pw/2,padT-4);
  }, [strat, hbRound]);

  const stratBtns=[["grid","Grid","#FF7043"],["random","Random","#42A5F5"],["bayesian","Bayesian","#66BB6A"],["hyperband","Hyperband","#AB47BC"]];
  const stratMeta = {
    grid: {
      color: "danger",
      budget: "25 full trials",
      pattern: "Regular lattice over a tiny discrete search space.",
      tradeoff: "Easy to reason about, but off-grid optima are invisible."
    },
    random: {
      color: "info",
      budget: "25 full trials",
      pattern: "Independent samples cover more values along each important axis.",
      tradeoff: "Cheap and parallel, but variance is high if the budget is tiny."
    },
    bayesian: {
      color: "success",
      budget: "7 explore + 18 exploit",
      pattern: "A surrogate model shifts samples toward regions with high predicted gain.",
      tradeoff: "Sample-efficient, but more sequential and more sensitive to noisy metrics."
    },
    hyperband: {
      color: "warning",
      budget: ["27 configs × 11 epochs", "9 survivors × 33 epochs", "3 finalists × 100 epochs"][hbRound-1],
      pattern: "Start broad, then reallocate more budget only to surviving configs.",
      tradeoff: "Fast when early validation signal correlates with final quality."
    }
  };

  return (
    <VizBox>
      <div style={{ display:"flex", gap:7, marginBottom:8, flexWrap:"wrap" }}>
        {stratBtns.map(([k,label,c])=>(
          <button key={k} onClick={()=>setStrat(k)}
            style={{ padding:"3px 11px", fontSize:12, border:`1px solid ${c}`, borderRadius:"var(--border-radius-md)", background:strat===k?c+"22":"transparent", color:c, cursor:"pointer" }}>
            {strat===k?"✓ ":""}{label}
          </button>
        ))}
      </div>
      <canvas ref={ref} width={500} height={300} style={{ display:"block", width:"100%", maxWidth:500, margin:"0 auto", borderRadius:"var(--border-radius-md)" }}/>
      {strat==="hyperband" && (
        <div style={{ display:"grid", gridTemplateColumns:"90px 1fr 80px", gap:8, alignItems:"center", fontSize:12.5, maxWidth:380, margin:"10px auto 0" }}>
          <span style={{ color:"var(--color-text-secondary)" }}>Hyperband round</span>
          <input type="range" min={1} max={3} step={1} value={hbRound} onChange={e=>setHbRound(+e.target.value)} style={{ width:"100%" }}/>
          <span style={{ color:"var(--color-text-primary)", fontFamily:"var(--font-mono)", textAlign:"right" }}>
            {["","r1: 27 configs","r2: top 9","r3: top 3"][hbRound]}
          </span>
        </div>
      )}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(140px, 1fr))", gap:8, marginTop:10 }}>
        <Card color={stratMeta[strat].color} title="Budget view">{stratMeta[strat].budget}</Card>
        <Card color={stratMeta[strat].color} title="Search pattern">{stratMeta[strat].pattern}</Card>
        <Card color={stratMeta[strat].color} title="Tradeoff">{stratMeta[strat].tradeoff}</Card>
      </div>
      <p style={{ textAlign:"center", fontSize:11, color:"var(--color-text-tertiary)", margin:"6px 0 0" }}>
        Bright = high validation accuracy  ·  Gold ring = best found  ·  2D slice of true HP space
      </p>
    </VizBox>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 1 — CONCEPTS & STRATEGIES
══════════════════════════════════════════════════════ */
function SectionConcepts() {
  return (
    <div>
      <H2>39.1 — What are Hyperparameters?</H2>
      <P>Model parameters (weights, biases) are learned by the optimizer from data. Hyperparameters are set before training and control how that learning happens. They live outside the gradient-descent loop and cannot be tuned by backprop.</P>

      <H3>Parameters vs hyperparameters</H3>
      <Grid cols={2} gap={10}>
        <Card color="info" title="Model parameters">Weights and biases are internal state. Gradient descent updates them to reduce training loss.</Card>
        <Card color="warning" title="Hyperparameters">Learning rate, batch size, depth, dropout, weight decay and scheduler choices shape the optimization process itself.</Card>
      </Grid>

      <H3>Formal view</H3>
      <P>Hyperparameter tuning is a bilevel optimization problem: solve training for a fixed hyperparameter setting, then compare settings using validation loss.</P>
      <Mx block>{`For a hyperparameter vector λ:

θ*(λ) = argmin_θ  L_train(θ; λ)
λ*    = argmin_λ  L_val(θ*(λ), λ)

Backprop learns θ for fixed λ.
The tuner searches λ using validation feedback.`}</Mx>
      <Note color="info" icon="ti-bulb">
        Intuition: the optimizer is an inner loop that learns the network weights; the tuner is an outer loop that decides how that inner loop should run.
      </Note>

      <H3>Taxonomy</H3>
      <Table heads={["Category","Examples","Typical range"]} rows={[
        ["Architecture","# layers, # units/layer, activation fn","2–50 layers; 16–4096 units; relu/tanh/elu"],
        ["Training","learning rate, batch size, # epochs","lr: 1e-5–1e-1; batch: 8–1024"],
        ["Optimizer","optimizer type, β₁, β₂, momentum","Adam vs SGD; β₁: 0.85–0.95"],
        ["Regularization","dropout rate, L1/L2 λ, weight decay","dropout: 0–0.7; λ: 1e-5–1e-1"],
        ["Data","augmentation policy, normalization strategy","flip, crop, cutout"],
        ["Scheduler","LR schedule type, warmup steps, decay factor","cosine, step, plateau"],
      ]}/>

      <Note color="info" icon="ti-bulb">
        <strong>Most impactful (by empirical consensus):</strong> Learning rate {">"} Architecture depth/width {">"} Batch size {">"} Dropout rate. Always tune lr first.
      </Note>

      <H2>Search Strategies</H2>
      <P>The core challenge: evaluating one configuration requires a full training run (expensive). The goal is to find a good configuration using as few evaluations as possible.</P>
      <SearchViz/>

      <H3>Why brute force breaks fast</H3>
      <Mx block>{`If d hyperparameters each have k candidate values:

Grid search trials = k^d

Example: k = 5, d = 6  =>  5^6 = 15,625 full runs
Doubling resolution per axis multiplies total compute by 2^d.`}</Mx>

      <H3>Strategy comparison</H3>
      <Table heads={["Strategy","How it works","Pros","Cons","Use when"]} rows={[
        ["Grid Search","Exhaustive cartesian product of discrete values","Reproducible, complete within range","Curse of dimensionality: O(nᵈ) evals","≤2 HPs, narrow well-known range"],
        ["Random Search","Sample uniformly at random from the space","Surprisingly effective (Bergstra&Bengio), parallelizable","May miss best region with bad luck","3–8 HPs, decent compute budget"],
        ["Bayesian Opt","Fit a surrogate model (GP) to predict perf; pick next config via acquisition fn","Sample-efficient, focuses on promising regions","Sequential (hard to parallelize), complex setup","5–15 HPs, expensive evaluations"],
        ["Hyperband","Early stopping of bad configs; promote top fraction","Finds good configs fast with less total compute","Relies on LR-performance correlation holding","Large HP space, many configs quickly"],
        ["ASHA / PBT","Async extensions of Hyperband / population-based","Scales to large clusters","Complex infrastructure","Distributed training at scale"],
      ]}/>

      <H3>Hyperband in depth</H3>
      <P>Hyperband (Li et al., 2018) addresses the key inefficiency: most of a full training run's compute is wasted on bad configs that could be identified early. It runs successive halving brackets:</P>
      <Mx block>{`Given: max budget R (e.g. 100 epochs), reduction factor η (e.g. 3)

Round 1: n = 27 configs, each trained for R/η² = 11 epochs → keep top 1/η = 9
Round 2: 9  configs, each trained for R/η  = 33 epochs → keep top 3
Round 3: 3  configs, each trained for R     = 100 epochs → 1 winner

Total epoch-budget used = 27·11 + 9·33 + 3·100 = 894
Full-training all 27 configs would cost      = 27·100 = 2700

Savings ≈ 2700 / 894 ≈ 3.0× while still fully training the finalists`}</Mx>
      <Note color="warning" icon="ti-alert-triangle">
        Hyperband assumes "speedup correlation" — that a config that is bad after 10 epochs is also bad at 100 epochs. This holds for most DL tasks but fails for warmup-heavy schedules or curriculum learning.
      </Note>

      <QA q="Why does random search outperform grid search despite being unstructured?"
          a="Bergstra & Bengio (2012) showed that in typical HP spaces, some hyperparameters matter far more than others. Grid search wastes evaluations on all combinations of irrelevant HPs — if 3 of 6 HPs don't matter, a 6-dimensional grid has ≥ 8× redundant evaluations. Random search naturally projects well onto the important dimensions: with 25 random points in 6D, each important HP dimension sees 25 distinct values; a 25-point 6D grid (impossible anyway) would only see ~2 values per dimension. The higher the dimensionality and the more irrelevant HPs, the wider the gap in favor of random search."/>
      <QA q="What is the explore-exploit tradeoff in Bayesian optimization?"
          a="The surrogate model (usually a Gaussian Process) produces both a predicted mean performance μ(x) and an uncertainty σ(x) for any untested configuration x. The acquisition function decides the next query point. <strong>Exploitation</strong>: maximize μ(x) — pick the configuration predicted to be best. <strong>Exploration</strong>: maximize σ(x) — pick the configuration we're most uncertain about (might be better). Common acquisition functions: UCB = μ(x) + κ·σ(x) balances both; EI (Expected Improvement) integrates probability of exceeding the current best. κ controls the explore/exploit balance: high κ → explore, low κ → exploit."/>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 2 — KERAS TUNER
══════════════════════════════════════════════════════ */
function SectionKerasTuner() {
  return (
    <div>
      <H2>39.2 — Keras Tuner: Complete Guide</H2>
      <P>KerasTuner is the official hyperparameter tuning library in the Keras ecosystem. It uses a define-by-run API: declare search knobs inside your model-building code, let a tuner run trials, then rebuild the best configuration for the real final training run.</P>

      <H3>Mental model</H3>
      <Table heads={["Piece","Role","Typical form"]} rows={[
        ["HyperParameters","Declares what is allowed to vary","hp.Int / hp.Float / hp.Choice / hp.Boolean"],
        ["HyperModel","Builds the model and optionally custom fit logic","def build_model(hp) or class MyHyperModel"],
        ["Tuner","Chooses configurations and launches trials","RandomSearch / BayesianOptimization / Hyperband / GridSearch"],
        ["Objective","Metric to maximize or minimize","'val_accuracy' or kt.Objective('val_loss', 'min')"],
        ["Oracle","Internal search algorithm state","Usually managed for you by the tuner"],
      ]}/>

      <H3>Installation</H3>
      <Code>{`pip install keras-tuner --upgrade

import keras_tuner as kt
import tensorflow as tf`}</Code>
      <Note color="info">
        <strong>Import style:</strong> Current official examples use <code>keras</code> together with <code>keras_tuner</code>. The code here keeps <code>tf.keras</code> so it stays consistent with the rest of your study-guide series.
      </Note>

      <H3>HP types — the hp object</H3>
      <P>Inside a model-building function, you receive an hp object to declare searchable hyperparameters:</P>
      <Table heads={["hp API","What it represents","Typical use"]} rows={[
        ["hp.Int","Discrete integer range","units, depth, kernel size"],
        ["hp.Float","Continuous value; use log sampling for scale parameters","learning rate, weight decay, dropout"],
        ["hp.Choice","Finite categorical set","optimizer, activation, batch size"],
        ["hp.Boolean","Binary switch","use_batch_norm, use_dropout"],
        ["hp.Fixed","Tracked constant","seed, ablation flag, frozen dataset version"],
        ["hp.conditional_scope","Activate child HPs only when a parent choice is active","Adam β₁ only if optimizer='adam'"],
      ]}/>
      <Code>{`def build_model(hp):
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

    return model`}</Code>

      <H3>Defining a tunable model</H3>
      <Code>{`def build_model(hp):
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
    return model`}</Code>
      <Note color="warning" icon="ti-alert-triangle">
        Resist the urge to tune everything at once. A narrower, high-leverage search space usually beats a huge search space with weak priors.
      </Note>

      <H3>The four tuners</H3>
      <Grid cols={2} gap={10}>
        <Card color="info" title="RandomSearch">Independent random configs from the space. Strong baseline, easy to parallelize, almost zero algorithmic overhead.</Card>
        <Card color="success" title="BayesianOptimization">Gaussian-process surrogate plus acquisition function. Best sample-efficiency when each trial is expensive.</Card>
        <Card color="warning" title="Hyperband">Successive halving across brackets. Best when many configs are cheap enough to partially train and prune.</Card>
        <Card color="danger" title="GridSearch">Full cartesian product over discrete values. Only reasonable for tiny, highly structured spaces.</Card>
      </Grid>

      <Code>{`# ── Random Search ────────────────────────────────────────
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
)`}</Code>

      <H3>Minimal workflow</H3>
      <Mx block>{`Define search space → instantiate tuner → tuner.search(...)
→ inspect best_hps / trial summaries → rebuild model
→ full retrain with the chosen HPs → one final test evaluation`}</Mx>

      <H3>Running the search</H3>
      <Code>{`import tensorflow as tf

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
tuner_hb.results_summary(num_trials=5)  # top 5 configs`}</Code>
      <Note color="info">
        <strong>Budget interpretation:</strong> in Hyperband, <code>max_epochs</code> is a maximum resource budget, not a promise that every trial will run that long. Most weak configs get terminated far earlier.
      </Note>

      <H3>Retrieving best results</H3>
      <Code>{`# ── Best hyperparameters ─────────────────────────────────
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
print(df.head(10))`}</Code>

      <H3>Advanced: HyperModel class and conditional search spaces</H3>
      <Code>{`# ── HyperModel class (reusable, testable) ────────────────
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
    # model build...`}</Code>
      <Code>{`# ── Explicit conditional scopes ───────────────────────────
hp = kt.HyperParameters()
optimizer = hp.Choice('optimizer', ['adam', 'sgd'])

with hp.conditional_scope('optimizer', ['adam']):
    hp.Float('adam_beta1', 0.85, 0.98)

with hp.conditional_scope('optimizer', ['sgd']):
    hp.Float('sgd_momentum', 0.5, 0.99)`}</Code>

      <H3>Objective variants</H3>
      <Code>{`# Minimize a metric (e.g. val_loss)
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
)`}</Code>

      <H3>Best practices</H3>
      <Table heads={["Practice","Why"]} rows={[
        ["Always use EarlyStopping in search callbacks","Cuts wasted compute on diverging trials dramatically"],
        ["Use sampling='log' for scale parameters","Learning rate and weight decay matter by order of magnitude, not by linear distance"],
        ["Start with RandomSearch (20–50 trials)","Establishes a strong baseline cheaply before trying Bayesian"],
        ["Tune high-impact knobs in stages","First lr/batch/regularization, then widen the architecture search"],
        ["Use executions_per_trial=2–3 for noisy objectives","Averages out training noise; more important for small datasets"],
        ["Use overwrite=True only when intentionally restarting","Otherwise let KerasTuner resume from the same directory/project_name"],
        ["Retrain the final model from best_hps","The tuner's winning checkpoint is for selection, not for your final reported model"],
        ["Keep the test set untouched until the very end","Using test data to tune HPs creates leakage and optimistic metrics"],
        ["Use nested CV when the dataset is tiny","A single validation split can be too noisy in low-data regimes"],
      ]}/>

      <H3>Common pitfalls</H3>
      <Table heads={["Pitfall","What goes wrong","Better practice"]} rows={[
        ["Searching too many knobs at once","Budget gets diluted across a huge space","Start with a smaller, theory-guided search space"],
        ["Linear sampling for learning rate","Most samples land in the wrong scale region","Use log sampling for lr, weight decay, epsilon-like knobs"],
        ["Aggressive early stopping with warmup schedules","Late-blooming configs get killed unfairly","Match patience to scheduler warmup and convergence speed"],
        ["Treating get_best_models() as the final answer","Best trial may be partially trained or early-stopped","Rebuild from best_hps and retrain properly"],
        ["Mixing fresh and resumed searches accidentally","Old trials contaminate interpretation","Be explicit about overwrite and project_name"],
        ["Selecting on the test set","Final score becomes biased and no longer honest","Tune on validation data; report test metrics once"],
      ]}/>

      <H3>Nested search logic</H3>
      <Mx block>{`Inner loop: choose λ using validation score
Outer loop: lock λ*, retrain θ on train ∪ val, evaluate once on held-out test data

If the dataset is very small, replace the single outer test split with nested cross-validation.`}</Mx>

      <Note color="success" icon="ti-check">
        <strong>Recommended workflow:</strong> (1) Quick RandomSearch to map the landscape. (2) Narrow the space around what matters. (3) Use BayesianOptimization or Hyperband depending on trial cost. (4) Rebuild from <code>best_hps</code> and do one serious final training run. (5) Report test accuracy only after that.
      </Note>

      <QA q="Why must you use sampling='log' for learning rate, not uniform?"
          a="The learning rate is effective over many decades: 1e-5, 1e-4, 1e-3, 1e-2, 1e-1 are all meaningfully different. With uniform sampling in [1e-5, 1e-1], about 90% of drawn values would be in [9e-3, 1e-1] — the top decade — because it occupies 90% of the linear range. The other four decades (where the best LR almost always lies) get almost no samples. Log-uniform sampling gives equal probability mass to each decade: [1e-5,1e-4], [1e-4,1e-3], etc., which is the statistically correct prior for a scale parameter."/>
      <QA q="How does Keras Tuner's Bayesian optimization work internally?"
          a="Keras Tuner's BayesianOptimization uses a Gaussian Process (GP) regression model as the surrogate. After each trial, the GP is fitted to the observed (HP configuration → validation score) pairs. For the next trial, it maximizes the Expected Improvement (EI) acquisition function: EI(x) = E[max(f(x) − f_best, 0)], which balances exploration (high σ regions) and exploitation (high μ regions). The optimization of EI itself is done with L-BFGS-B from multiple random restarts. This is why BayesianOptimization requires <em>sequential</em> evaluations by default — each trial's result must be incorporated before the next config is chosen."/>
      <QA q="When should you choose Hyperband over BayesianOptimization?"
          a="<strong>Use Hyperband when:</strong> (1) each trial is quick (&lt; 5–10 min) and you can afford many of them; (2) you can parallelize across many GPUs or workers; (3) the HP space is large and you want breadth over depth. <strong>Use Bayesian when:</strong> (1) each trial is expensive (&gt; 30 min, such as large CNN or transformer runs); (2) the HP space is small-to-medium (&lt; 15 dimensions); (3) you care most about sample efficiency. In practice, Hyperband is often preferred for broad architecture search while Bayesian optimization is preferred for optimizer and learning-rate tuning."/>
      <QA q="What is the difference between tuner.get_best_models() and rebuilding from best_hps?"
          a="<code>get_best_models()</code> returns the model as it was at the end of the best trial — which may have been stopped early by EarlyStopping after only 15 of 50 epochs, on the training subset. Rebuilding with <code>hypermodel.build(best_hps)</code> and fitting from scratch on the full training data (train + validation, for the final model) is almost always better: more data + more epochs + proper final schedule = stronger model. The tuner's role is to identify the best configuration; the final model should be trained independently with that configuration."/>
      <QA q="Should number of epochs itself be tuned?"
          a="Usually treat epochs as a <strong>budget</strong>, not as a primary hyperparameter. In practice you set a generous <code>max_epochs</code>, use EarlyStopping, and let validation performance decide the best stopping point. Tuning a raw epoch count directly mixes up model quality with compute budget and is much less stable."/>
      <QA q="What does overwrite=True change?"
          a="<code>overwrite=True</code> discards any previous search state in the same <code>directory/project_name</code> pair and starts a fresh experiment. If you want resumability, keep the same folder names and omit <code>overwrite=True</code> (or set it to <code>False</code>). Accidentally mixing these two modes is a very common source of confusing results."/>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   ROOT
══════════════════════════════════════════════════════ */
const TABS=[
  {id:"concepts", label:"Concepts & Strategies", sub:"Ch. 39.1"},
  {id:"kt",       label:"Keras Tuner API",        sub:"Ch. 39.2"},
];

export default function HyperparameterTuning() {
  const [active,setActive]=useState("concepts");
  const map={concepts:<SectionConcepts/>,kt:<SectionKerasTuner/>};
  
  return (
    <div>
      <div className="page-header">
        <div className="page-header-eyebrow">Deep Learning — Module 9</div>
        <h1 className="page-header-title">Hyperparameter Tuning · Search Strategies · Keras Tuner</h1>
        <p className="page-header-subtitle">Chapter 39 · Interactive search space explorer · Complete Keras Tuner API · Best practices · pitfalls</p>
      </div>

      <SectionNav tabs={TABS} active={active} onChange={setActive} />

      <div style={{ padding: "0.5rem 0 2rem" }}>
        {map[active]}
      </div>

      <NavButtons moduleId={9} />
    </div>
  );
}
