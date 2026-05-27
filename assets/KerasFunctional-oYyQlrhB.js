import{r as j,j as e}from"./index-BQO4ci8G.js";import{S as E,H as a,b as _,a as d,T,Q as n,P as m,N as S,V as C,M as A}from"./SectionNav-BDxYvY3P.js";import{N as M}from"./NavButtons-Bz-HQEP4.js";function B(){return e.jsxs("div",{children:[e.jsxs(S,{color:"info",icon:"ti-bulb",children:[e.jsx("strong",{children:"One-line definition:"})," The Functional API lets you build Keras models as explicit computation graphs — arbitrary DAGs of tensors — rather than a fixed linear layer stack. Any architecture that Sequential cannot express can be built here."]}),e.jsx(a,{children:"What is the Functional API?"}),e.jsx(m,{children:"Keras exposes three ways to build models. All three produce the same Model object and share the same .fit() / .evaluate() / .predict() interface — they differ only in how you describe the architecture."}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,margin:"0.75rem 0"},children:[{title:"Sequential",tag:"linear only",color:"warning",body:"A list of layers applied one after another. Simple and readable, but limited to a single-input → single-output chain. Every branch, merge, or shared-weight pattern is impossible."},{title:"Functional",tag:"recommended",color:"info",body:"Build an explicit DAG of KerasTensors. Branch, merge, and share layer objects freely. Static graph (fixed at build time) — fully inspectable and shapes are validated at construction, not runtime."},{title:"Subclassing",tag:"full control",color:"success",body:"Override Model.__call__ in pure Python. Supports dynamic control flow (runtime tensor-value conditionals, variable loops). More flexible but harder to serialise without custom save logic."}].map(({title:t,tag:i,color:r,body:l})=>e.jsxs("div",{style:{border:"0.5px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",padding:"12px 13px"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:7},children:[e.jsx("span",{style:{fontWeight:500,fontSize:13.5,color:"var(--color-text-primary)"},children:t}),e.jsx("span",{style:{fontSize:11,background:`var(--color-background-${r})`,color:`var(--color-text-${r})`,padding:"2px 7px",borderRadius:20,border:`0.5px solid var(--color-border-${r})`},children:i})]}),e.jsx("div",{style:{fontSize:12.5,color:"var(--color-text-secondary)",lineHeight:1.65},children:l})]},t))}),e.jsx(a,{children:"Why Functional API? — Sequential's hard limits"}),e.jsx(m,{children:"Sequential forces a single linear execution path: layer₁ → layer₂ → … → layerₙ. This makes entire classes of modern architectures structurally inexpressible:"}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,margin:"0.75rem 0"},children:[{title:"Sequential cannot express",icon:"ti-ban",color:"danger",items:["Multiple inputs — text + image + metadata","Multiple outputs — age regression + gender clf","Skip connections — ResNet's F(x) + x shortcut","Shared / tied weights — Siamese networks","Dense connections — DenseNet","Encoder–decoder with lateral links — U-Net"]},{title:"Functional enables all of these",icon:"ti-check",color:"success",items:["Any number of Input() tensors","Any number of output tensors with separate losses","Add() / Concatenate() merge layers anywhere","Same layer object called on multiple tensors","Any intermediate tensor reusable as shortcut","Hidden-layer outputs sliceable as sub-models"]}].map(({title:t,icon:i,color:r,items:l})=>e.jsxs("div",{style:{background:`var(--color-background-${r})`,border:`0.5px solid var(--color-border-${r})`,borderRadius:"var(--border-radius-md)",padding:"12px 14px"},children:[e.jsxs("div",{style:{display:"flex",gap:7,alignItems:"center",marginBottom:9},children:[e.jsx("i",{className:`ti ${i}`,style:{fontSize:15,color:`var(--color-text-${r})`},"aria-hidden":!0}),e.jsx("span",{style:{fontWeight:500,fontSize:13,color:`var(--color-text-${r})`},children:t})]}),l.map(s=>e.jsxs("div",{style:{display:"flex",gap:6,alignItems:"flex-start",marginBottom:5,fontSize:12.5,color:`var(--color-text-${r})`},children:[e.jsx("i",{className:`ti ti-${r==="danger"?"x":"check"}`,style:{fontSize:12,flexShrink:0,marginTop:2},"aria-hidden":!0}),s]},s))]},t))}),e.jsx(a,{children:"Three-API comparison"}),e.jsx(T,{heads:["API","Graph topology","Serialisable","Dynamic flow","Best for"],rows:[["Sequential","Linear chain only","✓ full","✗","Quick prototyping, simple FFNs"],["Functional","Any static DAG","✓ full graph","✗","Multi-I/O, ResNet, Siamese — 90% of production"],["Subclassing","Full Python graph","Partial","✓","Custom loops, dynamic RNNs, research"]]}),e.jsxs(S,{color:"warning",icon:"ti-alert-triangle",children:[e.jsx("strong",{children:"Static vs dynamic graph:"})," The Functional API builds a ",e.jsx("em",{children:"static"})," graph — fixed at ",e.jsx("code",{children:"keras.Model()"})," time. Python ",e.jsx("code",{children:"if tensor_value > 0.5"})," inside the graph is impossible; that needs Subclassing. But for nearly every standard architecture — Transformers, ResNets, U-Nets, Siamese nets, multi-task models — Functional is the correct choice."]}),e.jsx(a,{children:"Interview Q&A"}),e.jsx(n,{q:"What is the core difference between Sequential and Functional API?",a:"Sequential forces a single linear chain: layer₁ → layer₂ → … → layerₙ. It is syntactic sugar for the simplest possible Functional model. The Functional API builds an explicit DAG — you create symbolic KerasTensors, pass them through layers, and call <code>keras.Model(inputs, outputs)</code>. Any Sequential model can be rewritten as Functional, but not vice versa — residual connections, multi-input/output, and shared weights are all impossible in Sequential."}),e.jsx(n,{q:"Why is the Functional API called 'functional'?",a:"The name comes from the functional programming pattern of composing functions: <code>output = f(g(h(input)))</code>. In the Functional API you write <code>x = Dense(64)(inputs)</code> — you instantiate a layer and immediately call it on a tensor in a single expression, exactly like composing mathematical functions. The full model is the composition F = f_L ∘ f_{L-1} ∘ … ∘ f_1 written explicitly as a data-flow graph."}),e.jsx(n,{q:"When should you NOT use the Functional API?",a:"Three cases: (1) <strong>Dynamic control flow on tensor values</strong> — if Python if/while branches depend on actual tensor values at runtime (not shapes), use Subclassing. (2) <strong>Pure linear pipeline</strong> — for a simple chain with one input and one output, Sequential is less boilerplate. (3) <strong>Research with custom gradient logic</strong> — if you need per-batch control, mixture-of-experts routing, or adaptive computation, Subclassing with <code>tf.GradientTape</code> gives full Python control."})]})}const b=[{tag:"keras.Input()",title:"Create a symbolic input tensor",code:`inputs = keras.Input(shape=(784,), name="digits")
# shape does NOT include batch dim — Keras adds None implicitly
# name="digits" → readable errors, summary, and dict-feeding`,desc:"Returns a <strong>KerasTensor</strong> — a symbolic placeholder carrying shape, dtype, and name but no numeric data. It is the root node of the computation graph. The batch dimension is prepended automatically as <code>None</code>."},{tag:"Layer(config)(tensor)",title:"Call a layer on a tensor → get an output tensor",code:`x = keras.layers.Dense(256, activation="relu")(inputs)
# Dense(256) instantiates the layer; (inputs) applies it
# Returns a new KerasTensor with shape (None, 256)
# No computation yet — only the graph node is recorded`,desc:"The Functional pattern: instantiate a layer, then immediately call it on a tensor in one expression. The return value is a new <strong>KerasTensor</strong> with the inferred output shape. All of this is symbolic — no real data flows yet."},{tag:"chain / branch / merge",title:"Compose tensors freely — no topology restrictions",code:`x = keras.layers.Dropout(0.3)(x)
x = keras.layers.Dense(128, activation="relu")(x)
# Save an intermediate tensor as a skip connection
shortcut = x
x = keras.layers.Dense(128)(x)
x = keras.layers.Add()([x, shortcut])   # F(x) + x
outputs = keras.layers.Dense(10, activation="softmax")(x)`,desc:"You can branch (save a tensor, use it later), merge (<code>Add</code> / <code>Concatenate</code> multiple tensors), or share (call the same layer object on different tensors). The graph nodes accumulate silently — none of this is possible in Sequential."},{tag:"keras.Model(inputs, outputs)",title:"Build the model — graph traced and validated",code:`model = keras.Model(inputs=inputs, outputs=outputs, name="mnist_clf")
# Keras traverses the graph from outputs → inputs
# Validates connectivity — unreachable tensors → ValueError immediately
# Populates model.layers, .trainable_variables, output shapes
model.summary()   # Total params: 235,146`,desc:"Keras does a depth-first traversal from <code>outputs</code> back to <code>inputs</code>, topologically sorts all nodes, validates every tensor is reachable, and wraps everything into a <code>Model</code>. Shape mismatches and disconnected layers are caught <em>here</em> at build time — not silently during training."},{tag:"compile → fit → evaluate",title:"Train — identical to Sequential from here",code:`model.compile(
    optimizer=keras.optimizers.Adam(1e-3),
    loss="sparse_categorical_crossentropy",
    metrics=["accuracy"],
)
history = model.fit(
    x_train, y_train,
    epochs=15, batch_size=128,
    validation_split=0.15,
)`,desc:"Once built, a Functional model is externally identical to a Sequential model. All standard Keras methods — <code>.compile()</code>, <code>.fit()</code>, <code>.evaluate()</code>, <code>.predict()</code>, <code>.save()</code>, <code>.summary()</code> — work without modification."}];function q(){const[t,i]=j.useState(0),r=b[t];return e.jsxs(C,{children:[e.jsx("div",{style:{display:"flex",borderBottom:"0.5px solid var(--color-border-tertiary)",overflowX:"auto"},children:b.map((l,s)=>e.jsxs("button",{onClick:()=>i(s),style:{background:s===t?"var(--color-background-info)":"transparent",border:"none",borderRight:"0.5px solid var(--color-border-tertiary)",padding:"7px 15px",cursor:"pointer",fontSize:13,whiteSpace:"nowrap",color:s===t?"var(--color-text-info)":"var(--color-text-secondary)",fontWeight:s===t?500:400,flexShrink:0},children:["Step ",s+1]},s))}),e.jsx("div",{style:{padding:"0.85rem 1.1rem",background:"#1E1E1E"},children:e.jsx("pre",{style:{margin:0,fontFamily:"var(--font-mono)",fontSize:"12.5px",lineHeight:1.65,overflowX:"auto",color:"#D4D4D4",whiteSpace:"pre"},children:r.code})}),e.jsxs("div",{style:{padding:"11px 15px"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,marginBottom:7},children:[e.jsx("code",{style:{fontFamily:"var(--font-mono)",fontSize:12,background:"var(--color-background-secondary)",padding:"2px 7px",borderRadius:4,color:"var(--color-text-info)",border:"0.5px solid var(--color-border-info)"},children:r.tag}),e.jsx("span",{style:{fontWeight:500,fontSize:13.5,color:"var(--color-text-primary)"},children:r.title})]}),e.jsx("div",{style:{fontSize:13.5,color:"var(--color-text-secondary)",lineHeight:1.75},dangerouslySetInnerHTML:{__html:r.desc}})]}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",padding:"7px 13px",borderTop:"0.5px solid var(--color-border-tertiary)",background:"var(--color-background-secondary)"},children:[e.jsx("button",{onClick:()=>i(l=>Math.max(0,l-1)),disabled:t===0,style:{background:"none",border:"0.5px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",padding:"4px 12px",cursor:t===0?"default":"pointer",fontSize:13,color:t===0?"var(--color-text-tertiary)":"var(--color-text-secondary)"},children:"← prev"}),e.jsxs("span",{style:{fontSize:12,color:"var(--color-text-tertiary)",alignSelf:"center",fontFamily:"var(--font-mono)"},children:[t+1,"/",b.length]}),e.jsx("button",{onClick:()=>i(l=>Math.min(b.length-1,l+1)),disabled:t===b.length-1,style:{background:"none",border:"0.5px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",padding:"4px 12px",cursor:t===b.length-1?"default":"pointer",fontSize:13,color:t===b.length-1?"var(--color-text-tertiary)":"var(--color-text-secondary)"},children:"next →"})]})]})}function L(){return e.jsxs("div",{children:[e.jsx(a,{children:"The three-step Functional pattern"}),e.jsx(m,{children:"Every Functional model — however complex — follows the same three steps: (1) create symbolic inputs, (2) thread tensors through layers, (3) call keras.Model() to compile the graph. Step through the annotated example:"}),e.jsx(q,{}),e.jsx(a,{children:"Input variants — shape, dtype, names"}),e.jsx(d,{children:`# Flat vector (tabular or pre-extracted embeddings)
x_in = keras.Input(shape=(784,), name="features")

# Image: (H, W, C) — batch dim always implicit
img = keras.Input(shape=(224, 224, 3), name="image")

# Variable-length sequence — use None for dynamic dims
seq = keras.Input(shape=(None, 512), name="sequence")

# Integer token IDs for embedding layers
tokens = keras.Input(shape=(128,), dtype="int32", name="token_ids")

# Named dict-style multi-input (prevents argument-order bugs)
model = keras.Model(
    inputs={"text": text_in, "image": img_in},
    outputs={"score": output},
)
# Feed as matching dict — order no longer matters
model.fit({"text": x_text, "image": x_img}, {"score": y}, epochs=5)`}),e.jsx(a,{children:"Model introspection — what you get for free"}),e.jsx(d,{children:`model.layers              # all Layer objects in topological order
model.get_layer("fc_1")   # by name — useful for feature extraction
model.input               # KerasTensor shape=(None, 784)
model.output              # KerasTensor shape=(None, 10)
model.summary()           # param count + output shapes per layer

# Visualise the graph (requires pydot + graphviz)
tf.keras.utils.plot_model(
    model,
    to_file="arch.png",
    show_shapes=True,            # annotates edges with shapes
    show_layer_names=True,
    show_layer_activations=True,
    rankdir="TB",                # "LR" for horizontal layout
    expand_nested=True,          # unwrap sub-models
)`}),e.jsxs(S,{color:"info",icon:"ti-topology-star-2",children:[e.jsx("strong",{children:"KerasTensor ≠ real tensor."})," During graph construction all operations produce ",e.jsx("em",{children:"symbolic"})," KerasTensors. Real numeric computation only begins when you call ",e.jsx("code",{children:".fit()"}),", ",e.jsx("code",{children:".predict()"}),", or ",e.jsx("code",{children:"model(x)"})," with actual data. Shape errors surface at ",e.jsx("code",{children:"keras.Model()"})," build time — not silently mid-training."]}),e.jsx(a,{children:"Interview Q&A"}),e.jsx(n,{q:"What does keras.Input() return, and is it a real tensor?",a:"It returns a <strong>KerasTensor</strong> — a symbolic placeholder carrying shape, dtype, and name metadata but holding no numeric data. Think of it as a typed variable in a computation graph. Real data flows only during <code>.fit()</code> / <code>.predict()</code>. The KerasTensor is the root node from which Keras traces all downstream layers when you call <code>keras.Model()</code>."}),e.jsx(n,{q:"What does keras.Model(inputs, outputs) do internally?",a:"It performs a depth-first traversal from <code>outputs</code> back to <code>inputs</code>, collecting every graph node. It then topologically sorts those nodes, validates that every tensor is reachable from the declared inputs (unreachable tensors raise <code>ValueError</code> immediately), infers output shapes for each layer, and populates <code>model.layers</code>, <code>model.trainable_variables</code>, and <code>model.non_trainable_variables</code>. All of this happens before any training data is touched."}),e.jsx(n,{q:"What is topological sort order in model.layers?",a:"Keras returns layers in topological order — each layer appears after all layers whose output it depends on. For a linear chain this matches construction order. For a DAG (e.g. ResNet with skip connections) it is determined by BFS from the input. This ordering guarantees that iterating <code>model.layers</code> and applying them sequentially always satisfies all tensor dependencies — used by the executor and when copying/inspecting weights."})]})}function P(){return e.jsxs("div",{children:[e.jsx(a,{children:"Fully annotated MNIST classifier"}),e.jsx(d,{children:`import tensorflow as tf
from tensorflow import keras

# ── 1. Inputs ────────────────────────────────────────────────────────────────
# shape=(784,): flat 28×28 pixel vector — no batch dim
inputs = keras.Input(shape=(784,), name="image_flat")

# ── 2. Graph ─────────────────────────────────────────────────────────────────
x = keras.layers.Dense(256, activation="relu", name="hidden_1")(inputs)
x = keras.layers.BatchNormalization()(x)   # normalise per-feature
x = keras.layers.Dropout(0.3)(x)           # 30% drop during training
x = keras.layers.Dense(128, activation="relu", name="hidden_2")(x)
x = keras.layers.Dropout(0.3)(x)
outputs = keras.layers.Dense(10, activation="softmax", name="predictions")(x)

# ── 3. Build ─────────────────────────────────────────────────────────────────
model = keras.Model(inputs=inputs, outputs=outputs, name="mnist_clf")
model.summary()  # Total params: 235,146

# ── 4. Train ─────────────────────────────────────────────────────────────────
model.compile(
    optimizer=keras.optimizers.Adam(learning_rate=1e-3),
    loss="sparse_categorical_crossentropy",
    metrics=["accuracy"],
)
history = model.fit(
    x_train, y_train,
    epochs=20, batch_size=128, validation_split=0.15,
    callbacks=[keras.callbacks.EarlyStopping(patience=4, restore_best_weights=True)],
)`}),e.jsx(a,{children:"Multi-input model — text + image"}),e.jsx(d,{children:`text_in = keras.Input(shape=(512,),  name="text_emb")
img_in  = keras.Input(shape=(2048,), name="img_feat")

# Independent processing branches
x_t = keras.layers.Dense(128, activation="relu")(text_in)
x_i = keras.layers.Dense(128, activation="relu")(img_in)

# Merge and classify
merged  = keras.layers.Concatenate(name="merged")([x_t, x_i])  # (256,)
merged  = keras.layers.Dense(64, activation="relu")(merged)
output  = keras.layers.Dense(1, activation="sigmoid", name="score")(merged)

model = keras.Model(
    inputs={"text_emb": text_in, "img_feat": img_in},
    outputs={"score": output},
)
model.compile(optimizer="adam", loss="binary_crossentropy", metrics=["accuracy"])
model.fit({"text_emb": x_text, "img_feat": x_img}, {"score": y}, epochs=10)`}),e.jsx(a,{children:"Multi-output model — multi-task learning"}),e.jsx(d,{children:`inputs = keras.Input(shape=(32,), name="user_features")
shared  = keras.layers.Dense(64, activation="relu", name="shared")(inputs)

# Task A: regression (predict age)
h_age   = keras.layers.Dense(32, activation="relu")(shared)
age_out = keras.layers.Dense(1, name="age")(h_age)              # linear

# Task B: classification (predict income bracket)
h_inc    = keras.layers.Dense(32, activation="relu")(shared)
inc_out  = keras.layers.Dense(4, activation="softmax", name="income")(h_inc)

model = keras.Model(inputs=inputs, outputs=[age_out, inc_out])
# Each output gets its own loss function and weight
# Total loss = 1.0 * MSE_age + 0.5 * CE_income
model.compile(
    optimizer="adam",
    loss={"age": "mse", "income": "sparse_categorical_crossentropy"},
    loss_weights={"age": 1.0, "income": 0.5},
    metrics={"age": "mae", "income": "accuracy"},
)
model.fit(x_train, {"age": y_age, "income": y_income}, epochs=20)`}),e.jsx(a,{children:"Residual block function"}),e.jsx(d,{children:`def residual_block(x, units):
    """Pre-activation block. Projection shortcut when shapes differ."""
    shortcut = x
    if x.shape[-1] != units:
        shortcut = keras.layers.Dense(units, use_bias=False)(shortcut)
    h = keras.layers.LayerNormalization()(x)
    h = keras.layers.Dense(units, activation="relu")(h)
    h = keras.layers.Dense(units)(h)
    return keras.layers.Add()([h, shortcut])   # H(x) = F(x) + x

inputs = keras.Input(shape=(128,))
x = keras.layers.Dense(256)(inputs)
for _ in range(4): x = residual_block(x, 256)
x = residual_block(x, 64)   # projection shortcut fires: 256→64
outputs = keras.layers.Dense(10, activation="softmax")(x)
model = keras.Model(inputs, outputs)`}),e.jsx(a,{children:"Feature extraction from any intermediate layer"}),e.jsx(d,{children:`# Full model trained on 5-class medical images
base = keras.applications.EfficientNetB0(
    weights="imagenet", include_top=False, input_shape=(224,224,3)
)
inputs  = base.input
x       = keras.layers.GlobalAveragePooling2D()(base.output)
outputs = keras.layers.Dense(5, activation="softmax")(x)
model   = keras.Model(inputs, outputs)

# Extract features from any hidden layer — ZERO memory overhead
# (both models point to the same weight tensors)
feat_model = keras.Model(
    inputs=model.inputs,
    outputs=[
        model.get_layer("block3b_activation").output,   # early, general
        model.get_layer("block6d_activation").output,   # deep, task-specific
    ],
)
early_feats, deep_feats = feat_model.predict(x_test)
print(early_feats.shape, deep_feats.shape)`}),e.jsx(a,{children:"Interview Q&A"}),e.jsx(n,{q:"How do you feed data to a multi-output model with separate losses?",a:'Pass the outputs as a list or dict keyed by output layer name. In <code>model.compile()</code>: <code>loss={"age": "mse", "income": "sparse_categorical_crossentropy"}</code>. Add <code>loss_weights={"age": 1.0, "income": 0.5}</code> — the total loss is the weighted sum α₁·L₁ + α₂·L₂. In <code>model.fit()</code> pass <code>y</code> as a matching dict: <code>{"age": y_age, "income": y_income}</code>. Using named dicts is safer than positional lists.'}),e.jsx(n,{q:"How do you extract features from a hidden layer without copying weights?",a:"Create a new Model sharing the same graph: <pre style='font-family:monospace;font-size:12.5px;background:#1E1E1E;color:#D4D4D4;padding:8px 12px;border-radius:6px;margin:6px 0'>feat_model = keras.Model(\\n    inputs=model.inputs,\\n    outputs=model.get_layer('layer_name').output\\n)</pre>Both models point to the same weight tensor objects — memory overhead is zero. Training the original model updates those weights; <code>feat_model.predict()</code> automatically uses the updated values."}),e.jsx(n,{q:"How does a functional residual block differ from a manual loop approach?",a:"In a loop you can't save intermediate tensors — each iteration overwrites <code>x</code>. In the Functional API you save <code>shortcut = x</code> before the transformation, apply the main branch, then merge with <code>Add()([x, shortcut])</code>. This is a first-class graph operation: Keras knows about both paths, validates shapes, and correctly routes gradients through both the main branch and the identity shortcut during backprop. The +1 term in ∂L/∂x = ∂L/∂H · (∂F/∂x + 1) comes directly from this graph topology."})]})}const F={linear:{label:"Linear chain",sub:"Sequential-equivalent",desc:"Simplest Functional model — identical to Sequential but written in Functional syntax. One input, one output, no branches. Every Sequential model can be expressed this way.",nodes:[{id:"in",x:210,y:55,label:"Input",sub:"(784,)",col:"teal"},{id:"d1",x:210,y:165,label:"Dense",sub:"256 units, ReLU",col:"purple"},{id:"d2",x:210,y:265,label:"Dense",sub:"128 units, ReLU",col:"purple"},{id:"out",x:210,y:365,label:"Dense",sub:"10 units, Softmax",col:"coral"}],edges:[{f:"in",t:"d1"},{f:"d1",t:"d2"},{f:"d2",t:"out"}],H:420},skip:{label:"Skip connection",sub:"ResNet residual block",desc:"x bypasses the Dense block and is added at Add(). The gradient has a direct path through the identity shortcut — vanishing gradient is prevented regardless of depth.",nodes:[{id:"in",x:195,y:55,label:"Input",sub:"(64,)",col:"teal"},{id:"d1",x:195,y:165,label:"Dense",sub:"64 units, ReLU",col:"purple"},{id:"d2",x:195,y:265,label:"Dense",sub:"64 units, linear",col:"purple"},{id:"add",x:195,y:375,label:"Add",sub:"F(x) + x",col:"amber"},{id:"out",x:195,y:465,label:"Dense",sub:"10 units, Softmax",col:"coral"}],edges:[{f:"in",t:"d1"},{f:"d1",t:"d2"},{f:"d2",t:"add"},{f:"in",t:"add",skip:!0},{f:"add",t:"out"}],H:520},multi_in:{label:"Multi-input",sub:"Two separate streams",desc:"Text and image inputs processed independently then merged via Concatenate. Each input can have a different shape — impossible in Sequential.",nodes:[{id:"ia",x:110,y:55,label:"Input A",sub:"text (512,)",col:"teal"},{id:"ib",x:390,y:55,label:"Input B",sub:"image (2048,)",col:"blue"},{id:"da",x:110,y:175,label:"Dense",sub:"128, ReLU",col:"purple"},{id:"db",x:390,y:175,label:"Dense",sub:"128, ReLU",col:"purple"},{id:"cat",x:250,y:300,label:"Concatenate",sub:"→ (256,)",col:"amber"},{id:"out",x:250,y:400,label:"Dense",sub:"1 unit, Sigmoid",col:"coral"}],edges:[{f:"ia",t:"da"},{f:"ib",t:"db"},{f:"da",t:"cat"},{f:"db",t:"cat"},{f:"cat",t:"out"}],H:455},multi_out:{label:"Multi-output",sub:"Multi-task heads",desc:"Shared representation splits into two task-specific heads, each with its own loss function and loss weight — classic multi-task learning.",nodes:[{id:"in",x:250,y:55,label:"Input",sub:"user features",col:"teal"},{id:"sh",x:250,y:165,label:"Dense",sub:"shared, 64 units",col:"purple"},{id:"o1",x:110,y:305,label:"Output 1",sub:"age, (1,), linear",col:"coral"},{id:"o2",x:390,y:305,label:"Output 2",sub:"income, softmax",col:"green"}],edges:[{f:"in",t:"sh"},{f:"sh",t:"o1"},{f:"sh",t:"o2"}],H:380},siamese:{label:"Siamese",sub:"Shared weights",desc:"Same encoder object called on two inputs — one set of weights, two graph nodes. Gradients from both branches accumulate into the shared weights in a single optimizer step.",nodes:[{id:"ia",x:108,y:55,label:"Input A",sub:"anchor (128,)",col:"teal"},{id:"ib",x:392,y:55,label:"Input B",sub:"sample (128,)",col:"teal"},{id:"ea",x:108,y:185,label:"Encoder",sub:"shared weights ⇆",col:"purple"},{id:"eb",x:392,y:185,label:"Encoder",sub:"⇆ shared weights",col:"purple"},{id:"sub",x:250,y:315,label:"Subtract",sub:"embed diff",col:"amber"},{id:"out",x:250,y:415,label:"Dense",sub:"1 unit, Sigmoid",col:"coral"}],edges:[{f:"ia",t:"ea"},{f:"ib",t:"eb"},{f:"ea",t:"sub"},{f:"eb",t:"sub"},{f:"sub",t:"out"}],shared:!0,H:470}};function R({archKey:t,isDark:i}){const r=F[t],{nodes:l,edges:s,H:u}=r,y=152,f=54,I=i?{teal:{fill:"#04342C",stroke:"#5DCAA5",t:"#9FE1CB"},purple:{fill:"#26215C",stroke:"#7F77DD",t:"#CECBF6"},amber:{fill:"#412402",stroke:"#EF9F27",t:"#FAC775"},coral:{fill:"#4A1B0C",stroke:"#D85A30",t:"#F0997B"},blue:{fill:"#042C53",stroke:"#378ADD",t:"#85B7EB"},green:{fill:"#173404",stroke:"#639922",t:"#C0DD97"}}:{teal:{fill:"#E1F5EE",stroke:"#0F6E56",t:"#085041"},purple:{fill:"#EEEDFE",stroke:"#534AB7",t:"#3C3489"},amber:{fill:"#FAEEDA",stroke:"#854F0B",t:"#633806"},coral:{fill:"#FAECE7",stroke:"#993C1D",t:"#712B13"},blue:{fill:"#E6F1FB",stroke:"#185FA5",t:"#0C447C"},green:{fill:"#EAF3DE",stroke:"#3B6D11",t:"#27500A"}},D=i?"#888780":"#5F5E5A",N=i?"#FAC775":"#854F0B",w=o=>l.find(c=>c.id===o);return e.jsxs("svg",{width:"100%",viewBox:`0 0 505 ${u}`,style:{display:"block",margin:"0 auto"},children:[e.jsxs("defs",{children:[e.jsx("marker",{id:"da",viewBox:"0 0 10 10",refX:"9",refY:"5",markerWidth:"6",markerHeight:"6",orient:"auto-start-reverse",children:e.jsx("path",{d:"M2 1L8 5L2 9",fill:"none",stroke:D,strokeWidth:1.5,strokeLinecap:"round",strokeLinejoin:"round"})}),e.jsx("marker",{id:"dsk",viewBox:"0 0 10 10",refX:"9",refY:"5",markerWidth:"6",markerHeight:"6",orient:"auto-start-reverse",children:e.jsx("path",{d:"M2 1L8 5L2 9",fill:"none",stroke:N,strokeWidth:1.5,strokeLinecap:"round",strokeLinejoin:"round"})})]}),s.map((o,c)=>{const k=w(o.f),v=w(o.t);if(!k||!v)return null;const p=k.x,g=k.y+f/2+1,x=v.x,h=v.y-f/2-1;if(o.skip)return e.jsx("path",{d:`M${p},${g} C${p+130},${g} ${x+130},${h} ${x},${h}`,fill:"none",stroke:N,strokeWidth:1.5,strokeDasharray:"5 3",markerEnd:"url(#dsk)"},c);if(Math.abs(p-x)>12){const z=(g+h)/2;return e.jsx("path",{d:`M${p},${g} C${p},${z} ${x},${z} ${x},${h}`,fill:"none",stroke:D,strokeWidth:1.5,markerEnd:"url(#da)"},c)}return e.jsx("line",{x1:p,y1:g,x2:x,y2:h,stroke:D,strokeWidth:1.5,markerEnd:"url(#da)"},c)}),r.shared&&(()=>{const o=w("ea"),c=w("eb");if(!o||!c)return null;const k=i?"#7F77DD":"#534AB7",v=i?"#CECBF6":"#3C3489",p=o.x+y/2+5,g=c.x-y/2-5,x=(p+g)/2,h=o.y;return e.jsxs("g",{children:[e.jsx("line",{x1:p,y1:h,x2:g,y2:h,stroke:k,strokeWidth:1,strokeDasharray:"4 3"}),e.jsx("text",{x,y:h-8,textAnchor:"middle",style:{fill:v,fontSize:"11px",fontFamily:"var(--font-sans)"},children:"same layer object"})]},"sb")})(),l.map(o=>{const c=I[o.col]||I.purple;return e.jsxs("g",{children:[e.jsx("rect",{x:o.x-y/2,y:o.y-f/2,width:y,height:f,rx:8,fill:c.fill,stroke:c.stroke,strokeWidth:1}),e.jsx("text",{x:o.x,y:o.y-6,textAnchor:"middle",style:{fill:c.t,fontSize:"13px",fontWeight:500,fontFamily:"var(--font-sans)"},children:o.label}),e.jsx("text",{x:o.x,y:o.y+12,textAnchor:"middle",style:{fill:c.t,fontSize:"11px",opacity:.85,fontFamily:"var(--font-sans)"},children:o.sub})]},o.id)})]})}function W(){const[t,i]=j.useState("linear"),[r,l]=j.useState(!1);return j.useEffect(()=>{const s=window.matchMedia("(prefers-color-scheme: dark)");l(s.matches);const u=y=>l(y.matches);return s.addEventListener("change",u),()=>s.removeEventListener("change",u)},[]),e.jsxs("div",{children:[e.jsx(a,{children:"Key advantages"}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,margin:"0.75rem 0"},children:[{title:"Multi-input / multi-output",icon:"ti-arrows-split-2",color:"info",body:"Accept heterogeneous inputs and produce multiple task predictions, each with its own loss. Impossible in Sequential."},{title:"Shared / tied weights",icon:"ti-link",color:"info",body:"Calling the same layer object on two tensors reuses the same weights. Gradients from both branches accumulate into one update — this is how Siamese networks work."},{title:"Skip & residual connections",icon:"ti-arrow-loop-right",color:"success",body:"Any intermediate tensor can be added to any later tensor. Enables ResNet, DenseNet, U-Net — the architectures that make very deep training stable."},{title:"Intermediate feature extraction",icon:"ti-layers-subtract",color:"success",body:"Slice any layer's output into a new Model with zero weight copying. Both models share the same tensors; the original can keep training, the feature model reflects updates instantly."}].map(({title:s,icon:u,color:y,body:f})=>e.jsxs("div",{style:{border:"0.5px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",padding:"12px 13px"},children:[e.jsxs("div",{style:{display:"flex",gap:8,alignItems:"center",marginBottom:7},children:[e.jsx("i",{className:`ti ${u}`,style:{fontSize:17,color:`var(--color-text-${y})`},"aria-hidden":!0}),e.jsx("span",{style:{fontWeight:500,fontSize:13.5,color:"var(--color-text-primary)"},children:s})]}),e.jsx("div",{style:{fontSize:13,color:"var(--color-text-secondary)",lineHeight:1.65},children:f})]},s))}),e.jsx(a,{children:"Computation graph visualiser"}),e.jsx(m,{children:"Select an architecture to see how layers form a directed acyclic graph. Teal = inputs, purple = transform layers, amber = merge ops, coral/green = outputs."}),e.jsx("div",{style:{display:"flex",gap:6,flexWrap:"wrap",marginBottom:"0.85rem"},children:Object.entries(F).map(([s,u])=>e.jsxs("button",{onClick:()=>i(s),style:{background:t===s?"var(--color-background-info)":"var(--color-background-secondary)",border:"0.5px solid "+(t===s?"var(--color-border-info)":"var(--color-border-tertiary)"),borderRadius:"var(--border-radius-md)",padding:"5px 12px",cursor:"pointer",fontSize:13,color:t===s?"var(--color-text-info)":"var(--color-text-secondary)",fontWeight:t===s?500:400},children:[u.label,e.jsxs("span",{style:{fontSize:11,opacity:.7},children:[" — ",u.sub]})]},s))}),e.jsx(S,{color:"info",icon:"ti-info-circle",children:F[t].desc}),e.jsx(C,{children:e.jsx(R,{archKey:t,isDark:r})}),e.jsx(a,{children:"The math of skip connections"}),e.jsx(m,{children:"A residual block learns the residual mapping F(x), not the full mapping H(x):"}),e.jsx(A,{block:!0,children:"H(x) = F(x) + x"}),e.jsx(m,{children:"The gradient of the loss w.r.t. x has a direct path through the identity shortcut:"}),e.jsx(A,{block:!0,children:"∂L/∂x = ∂L/∂H · (∂F/∂x + 1)"}),e.jsx(m,{children:"The constant +1 ensures the gradient never collapses to zero regardless of depth. ResNet-152 trains stably entirely because of this identity term — He et al. (2015)."}),e.jsx(a,{children:"Multi-task total loss"}),e.jsx(A,{block:!0,children:"𝓛_total = α₁·𝓛_task1(ŷ₁,y₁) + α₂·𝓛_task2(ŷ₂,y₂) + …"}),e.jsx(m,{children:"Weights α₁,α₂ are set via loss_weights in model.compile(). Outputs on different scales (MSE for regression vs cross-entropy for classification) usually need explicit weight tuning."}),e.jsx(a,{children:"Interview Q&A"}),e.jsx(n,{q:"How does calling the same layer object twice create shared weights?",a:"A Keras layer stores its weights as object attributes (<code>self.kernel</code>, <code>self.bias</code>) created once on the first call. When you call <code>layer(x)</code> a second time, a new <strong>node</strong> is added to the computation graph but no new weight tensors are created — both nodes reference the identical objects. During backpropagation, gradients from both graph nodes are <em>summed</em> into one gradient tensor and applied to those shared weights in a single optimizer step."}),e.jsx(n,{q:"Why do skip connections prevent vanishing gradients?",a:"Two reasons. (1) <strong>Gradient highway:</strong> the derivative ∂L/∂x = ∂L/∂H · (∂F/∂x + 1) always includes the +1 constant from the identity shortcut. Even if ∂F/∂x ≈ 0 (saturated or dead layers), gradients still flow back through the identity. (2) <strong>Easier optimisation target:</strong> if the optimal function is close to identity, the network only needs to push F(x) → 0, which is far simpler than learning the identity mapping from scratch through nonlinear layers."})]})}function H(){return e.jsxs("div",{children:[e.jsx(m,{children:"Four canonical patterns that appear in virtually every real-world Keras codebase."}),e.jsx(a,{children:"1 · Residual / skip-connection block"}),e.jsx(d,{children:`def residual_block(x, units):
    shortcut = x
    # Projection shortcut: align shapes when dimensions differ
    if x.shape[-1] != units:
        shortcut = keras.layers.Dense(units, use_bias=False)(shortcut)
    h = keras.layers.LayerNormalization()(x)
    h = keras.layers.Dense(units, activation="relu")(h)
    h = keras.layers.Dense(units)(h)
    return keras.layers.Add()([h, shortcut])   # H(x) = F(x) + x

inputs = keras.Input(shape=(128,))
x = keras.layers.Dense(256)(inputs)
x = residual_block(x, 256)
x = residual_block(x, 256)
x = residual_block(x, 64)   # projection shortcut fires: 256→64
outputs = keras.layers.Dense(10, activation="softmax")(x)
model = keras.Model(inputs, outputs)`}),e.jsx(a,{children:"2 · Siamese network — shared encoder"}),e.jsx(d,{children:`# Define encoder ONCE — calling it twice reuses its weights
encoder = keras.Sequential([
    keras.layers.Dense(128, activation="relu"),
    keras.layers.Dense(64),
    keras.layers.Lambda(lambda x: tf.math.l2_normalize(x, axis=1)),
], name="encoder")

anchor = keras.Input(shape=(256,), name="anchor")
sample = keras.Input(shape=(256,), name="sample")

embed_a = encoder(anchor)   # kernel/bias ─┐
embed_b = encoder(sample)   # same k/b   ─┘ shared; grads sum

diff   = keras.layers.Subtract()([embed_a, embed_b])
output = keras.layers.Dense(1, activation="sigmoid")(diff)

siamese = keras.Model([anchor, sample], output, name="siamese")
# No extra variables beyond encoder — weights are shared
print(len(siamese.trainable_variables))  # same count as encoder`}),e.jsx(a,{children:"3 · Transfer learning with gradual fine-tuning"}),e.jsx(d,{children:`base = keras.applications.EfficientNetB0(
    weights="imagenet", include_top=False, input_shape=(224,224,3)
)
# Phase 1 — head only, base frozen
base.trainable = False
inputs  = base.input
x       = keras.layers.GlobalAveragePooling2D()(base.output)
x       = keras.layers.Dense(256, activation="relu")(x)
outputs = keras.layers.Dense(5, activation="softmax")(x)
model   = keras.Model(inputs, outputs)
model.compile(optimizer=keras.optimizers.Adam(1e-3), loss="sparse_categorical_crossentropy")
model.fit(x_train, y_train, epochs=5)

# Phase 2 — unfreeze top layers, much lower LR
base.trainable = True
for layer in base.layers[:-30]: layer.trainable = False
model.compile(optimizer=keras.optimizers.Adam(1e-5), loss="sparse_categorical_crossentropy")  # must recompile!
model.fit(x_train, y_train, epochs=10)`}),e.jsx(a,{children:"4 · Encoder–decoder (U-Net style lateral connections)"}),e.jsx(d,{children:`inputs = keras.Input(shape=(256, 1))   # (timesteps, channels)

# Encoder — save feature maps for lateral connections
e1 = keras.layers.Conv1D(32, 3, activation="relu", padding="same")(inputs)
p1 = keras.layers.MaxPooling1D(2)(e1)          # 256 → 128
e2 = keras.layers.Conv1D(64, 3, activation="relu", padding="same")(p1)
p2 = keras.layers.MaxPooling1D(2)(e2)          # 128 → 64

# Bottleneck
b = keras.layers.Conv1D(128, 3, activation="relu", padding="same")(p2)

# Decoder — concatenate encoder maps (lateral connections)
u2 = keras.layers.UpSampling1D(2)(b)           # 64 → 128
c2 = keras.layers.Concatenate()([u2, e2])      # reuse e2
d2 = keras.layers.Conv1D(64, 3, activation="relu", padding="same")(c2)

u1 = keras.layers.UpSampling1D(2)(d2)          # 128 → 256
c1 = keras.layers.Concatenate()([u1, e1])      # reuse e1
d1 = keras.layers.Conv1D(32, 3, activation="relu", padding="same")(c1)

outputs = keras.layers.Conv1D(1, 1, activation="sigmoid")(d1)
model = keras.Model(inputs, outputs, name="1d_unet")`}),e.jsx(a,{children:"Architecture comparison"}),e.jsx(T,{heads:["Pattern","Functional key move","Keras merge layer","Typical use"],rows:[["Skip / residual","Save x before block, Add after","Add()","ResNet, any deep FFN"],["Multi-input","Multiple Input() tensors","Concatenate() / Add()","Multimodal, feature fusion"],["Multi-output","Multiple output tensors","(none — branch freely)","Multi-task, aux losses"],["Siamese","Same layer object called twice","Subtract() / Dot()","One-shot learning, similarity"],["Encoder–decoder","Save encoder tensors, merge in decoder","Concatenate()","U-Net, segmentation, denoising"],["Feature extraction","New Model() at intermediate layer","(none)","Transfer learning, probing"]]}),e.jsx(a,{children:"Interview Q&A"}),e.jsx(n,{q:"What is the projection shortcut in a residual block and when is it needed?",a:"The standard skip <code>Add()([F(x), x])</code> requires matching shapes. When the Dense/Conv layer changes dimension (e.g. 256→64), shapes mismatch. A projection shortcut adds a linear transformation (a bias-free Dense or 1×1 Conv) to the shortcut path so both branches have the same shape before <code>Add()</code>. He et al. (2015) call this Option B — it also learns a better linear approximation to the identity for that particular dimension change."}),e.jsx(n,{q:"In a U-Net, what do the lateral connections achieve?",a:"The encoder compresses spatial resolution to increase receptive field. The decoder must reconstruct fine-grained spatial detail. Without lateral connections it must hallucinate local texture from the compressed bottleneck alone. The skip connections directly pass high-resolution feature maps from each encoder stage to the corresponding decoder stage, giving it access to both local texture and global context simultaneously. This is why U-Net produces sharp segmentation boundaries even with small training sets."}),e.jsx(n,{q:"Why must you recompile after changing layer.trainable = False/True?",a:"When you call <code>model.compile()</code>, Keras builds the optimizer's variable list from <code>model.trainable_variables</code> <em>at that moment</em>. Changing <code>layer.trainable</code> afterwards updates the layer attribute but does NOT update the compiled optimizer's tracked variables — it still applies gradients to the old set. Calling <code>model.compile()</code> again forces Keras to re-evaluate <code>model.trainable_variables</code> and rebuild gradient tracking, ensuring frozen layers truly receive no updates."})]})}function K(){return e.jsxs("div",{children:[e.jsx(a,{children:"Best practices"}),e.jsx(_,{children:"Always name inputs and outputs"}),e.jsx(d,{children:`# ✓ Named — readable, dict-feedable, immune to order bugs
inputs  = keras.Input(shape=(512,), name="text_emb")
outputs = keras.layers.Dense(1, name="click_prob")(x)
model   = keras.Model(inputs, outputs, name="ctr_model")
model.fit({"text_emb": X}, {"click_prob": y})

# ✗ Positional — breaks silently when argument order changes
model.fit([X1, X2], [y1, y2])   # which is X1? which is y1?`}),e.jsx(_,{children:"Shared vs independent layers — a critical distinction"}),e.jsx(d,{children:`# ✓ Shared: ONE layer object called twice → same kernel/bias
enc   = keras.layers.Dense(64, name="encoder")
emb_a = enc(input_a)   # kernel_enc, bias_enc
emb_b = enc(input_b)   # same kernel_enc, bias_enc → grads sum

# ✗ Independent: two separate Dense(64) instances
emb_a = keras.layers.Dense(64)(input_a)   # kernel_1  ← different
emb_b = keras.layers.Dense(64)(input_b)   # kernel_2  ← not shared`}),e.jsx(_,{children:"Shape alignment before Add()"}),e.jsx(d,{children:`# Add() requires identical shapes — checked at keras.Model() build time
x1  = keras.layers.Dense(64)(inp1)   # (None, 64)
x2  = keras.layers.Dense(64)(inp2)   # (None, 64)  ← must match
out = keras.layers.Add()([x1, x2])   # ✓

# Concatenate() only needs same rank — joins along axis
x1  = keras.layers.Dense(64)(inp1)   # (None, 64)
x2  = keras.layers.Dense(128)(inp2)  # (None, 128)
out = keras.layers.Concatenate()([x1, x2])  # (None, 192)  ✓`}),e.jsx(_,{children:"Gradual unfreezing for fine-tuning"}),e.jsx(d,{children:`# Phase 1 — head only (high LR OK)
base.trainable = False
model.compile(optimizer=keras.optimizers.Adam(1e-3), ...)
model.fit(x_train, y_train, epochs=5)

# Phase 2 — top layers unfrozen, much lower LR
base.trainable = True
for layer in base.layers[:-20]: layer.trainable = False
model.compile(optimizer=keras.optimizers.Adam(1e-5), ...)  # MUST recompile
model.fit(x_train, y_train, epochs=10)`}),e.jsx(a,{children:"Common pitfalls"}),e.jsx(T,{heads:["Pitfall","Symptom","Fix"],rows:[["Including batch dim in Input shape","ValueError: shape mismatch at first layer","Use shape=(784,) not shape=(None,784) — batch dim is implicit"],["New layer instance inside a loop","Weights multiply per iteration, weights not shared","Instantiate once outside the loop; call inside"],["Python if/else on tensor values","Wrong branch always taken, no error","Use Subclassing for value-dependent control flow"],["Forgetting recompile after trainable change","Frozen state silently not applied","Always call model.compile() after any layer.trainable change"],["Add() shape mismatch","ValueError at keras.Model() build time","Add a Dense projection to align dimensions before Add()"],["Lambda layers in saved model","NotSerializableError across processes","Replace Lambda with a named Layer subclass or tf.keras.layers.Layer"]]}),e.jsx(a,{children:"Resources"}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,margin:"0.75rem 0"},children:[{title:"Keras Functional API guide",icon:"ti-external-link",color:"info",body:e.jsxs(e.Fragment,{children:["Official canonical guide with complete worked examples.",e.jsx("br",{}),e.jsx("a",{href:"https://keras.io/guides/functional_api/",style:{color:"var(--color-text-info)",fontSize:12},children:"keras.io/guides/functional_api"})]})},{title:"TensorFlow Keras guide",icon:"ti-external-link",color:"info",body:e.jsxs(e.Fragment,{children:["KerasTensor internals and custom layer integration.",e.jsx("br",{}),e.jsx("a",{href:"https://www.tensorflow.org/guide/keras/functional_api",style:{color:"var(--color-text-info)",fontSize:12},children:"tensorflow.org/guide/keras"})]})},{title:"ResNet — He et al. 2015",icon:"ti-file-description",color:"success",body:"Deep Residual Learning for Image Recognition — canonical motivation for skip connections and the residual formulation H(x)=F(x)+x."},{title:"Siamese Nets — Koch et al. 2015",icon:"ti-file-description",color:"success",body:"Siamese Neural Networks for One-shot Image Recognition — foundational paper on weight-sharing architectures."}].map(({title:t,icon:i,color:r,body:l})=>e.jsxs("div",{style:{border:"0.5px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",padding:"12px 13px"},children:[e.jsxs("div",{style:{display:"flex",gap:7,alignItems:"center",marginBottom:7},children:[e.jsx("i",{className:`ti ${i}`,style:{fontSize:15,color:`var(--color-text-${r})`},"aria-hidden":!0}),e.jsx("span",{style:{fontWeight:500,fontSize:13.5,color:"var(--color-text-primary)"},children:t})]}),e.jsx("div",{style:{fontSize:12.5,color:"var(--color-text-secondary)",lineHeight:1.65},children:l})]},t))}),e.jsx(a,{children:"Interview Q&A"}),e.jsx(n,{q:"How do you use a Functional model inside a custom training loop?",a:"A Functional model is a regular Python object with a <code>__call__</code> method. Use it inside <code>tf.GradientTape</code>: <pre style='font-family:monospace;font-size:12.5px;background:#1E1E1E;color:#D4D4D4;padding:8px 12px;border-radius:6px;margin:6px 0'>with tf.GradientTape() as tape:\\n    preds = model(x_batch, training=True)  # training=True → Dropout/BN active\\n    loss  = loss_fn(y_batch, preds)\\ngrads = tape.gradient(loss, model.trainable_variables)\\noptimizer.apply_gradients(zip(grads, model.trainable_variables))</pre>The <code>training=True</code> flag is critical — Dropout and BatchNormalization behave differently during training vs inference."}),e.jsx(n,{q:"What happens if you try to build a Functional model with a disconnected tensor?",a:"<code>keras.Model(inputs, outputs)</code> immediately raises a <code>ValueError</code> listing the disconnected layer. This is one of the main advantages over Subclassing — the graph is validated at build time, not silently during training. Common causes: (1) a tensor produced by a layer not connected to the declared input, (2) accidentally passing the wrong variable to a downstream layer, (3) calling a layer on <code>None</code> due to a logic error."}),e.jsx(n,{q:"Can a Functional model with frozen layers be saved and restored correctly?",a:"Yes. <code>model.save('path')</code> serialises the full graph topology AND each layer's <code>trainable</code> flag. <code>keras.models.load_model('path')</code> restores frozen layers as frozen. The caveat: <code>Lambda</code> layers are not serialisable across different Python environments — replace them with named <code>keras.layers.Layer</code> subclasses before saving any model you plan to deploy."})]})}const $=[{id:"intro",label:"Intro & Motivation",sub:"What & Why"},{id:"syntax",label:"Syntax",sub:"Three-step pattern"},{id:"code",label:"Code Examples",sub:"Annotated patterns"},{id:"adv",label:"Advantages & Viz",sub:"DAG explorer"},{id:"arch",label:"Architectures",sub:"Common patterns"},{id:"bp",label:"Best Practices",sub:"Patterns,Pitfalls"}];function V(){const[t,i]=j.useState("intro"),r={intro:e.jsx(B,{}),syntax:e.jsx(L,{}),code:e.jsx(P,{}),adv:e.jsx(W,{}),arch:e.jsx(H,{}),bp:e.jsx(K,{})};return e.jsxs("div",{children:[e.jsxs("div",{className:"page-header",children:[e.jsx("div",{className:"page-header-eyebrow",children:"Deep Learning — Module 13"}),e.jsx("h1",{className:"page-header-title",children:"Keras Functional API"}),e.jsx("p",{className:"page-header-subtitle",children:"Multi-I/O · Shared weights · Skip connections · DAG visualiser · Full implementation patterns"})]}),e.jsx(E,{tabs:$,active:t,onChange:i}),e.jsx("div",{style:{padding:"0.5rem 0 2rem"},children:r[t]}),e.jsx(M,{moduleId:13})]})}export{V as default};
