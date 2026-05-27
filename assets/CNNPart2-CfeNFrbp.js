import{r as b,j as e}from"./index-BQO4ci8G.js";import{S as R,P as A,H as c,M as C,T as z,N as W,a as I,G as D,Q as k,C as _,V as E}from"./SectionNav-BDxYvY3P.js";import{N as H}from"./NavButtons-Bz-HQEP4.js";function O(){const[a,p]=b.useState(6),[n,w]=b.useState(3),[r,s]=b.useState(0),[h,L]=b.useState(1),N=b.useRef(null),j=(a-n+2*r)/h+1,l=Math.floor(j),g=j===l&&l>0;return b.useEffect(()=>{const f=N.current;if(!f)return;const t=f.getContext("2d"),m=f.width,i=f.height;t.clearRect(0,0,m,i);const d=a+2*r,o=Math.min(28,Math.floor(Math.min(m*.45,i*.85)/d)),S=d*o,y=18,v=18;for(let u=0;u<d;u++)for(let x=0;x<d;x++){const P=u<r||u>=a+r||x<r||x>=a+r;t.fillStyle=P?"rgba(226,75,74,0.18)":"var(--color-background-secondary)",t.fillRect(y+x*o,v+u*o,o-1,o-1),t.strokeStyle=P?"#E24B4A55":"var(--color-border-secondary)",t.lineWidth=.5,t.strokeRect(y+x*o,v+u*o,o-1,o-1),P&&o>14&&(t.fillStyle="#E24B4A88",t.font=`${Math.min(9,o-3)}px var(--font-mono)`,t.textAlign="center",t.textBaseline="middle",t.fillText("0",y+x*o+o/2-.5,v+u*o+o/2))}if(g&&l>0&&(t.fillStyle="rgba(55,138,221,0.22)",t.fillRect(y,v,n*o-1,n*o-1),t.strokeStyle="#378ADD",t.lineWidth=2,t.strokeRect(y,v,n*o-1,n*o-1)),t.fillStyle="var(--color-text-secondary)",t.font="11px var(--font-sans)",t.textAlign="left",t.textBaseline="alphabetic",t.fillText(`Padded input: ${d}×${d}`,y,v+d*o+14),r>0&&(t.fillStyle="#E24B4A",t.fillText(`Red border = ${r}px zero padding`,y,v+d*o+26)),t.fillStyle="#378ADD",t.fillText(`Blue = kernel position 0 (${n}×${n})`,y,v+d*o+38),g&&l>0){const u=Math.min(30,Math.floor(Math.min(m*.38,i*.8)/l)),x=y+S+32,P=v+(d*o-l*u)/2;for(let M=0;M<l;M++)for(let F=0;F<l;F++)t.fillStyle="var(--color-background-info)",t.fillRect(x+F*u,P+M*u,u-1,u-1),t.strokeStyle="var(--color-border-info)",t.lineWidth=.5,t.strokeRect(x+F*u,P+M*u,u-1,u-1);t.fillStyle="var(--color-text-info)",t.font="11px var(--font-sans)",t.textAlign="left",t.fillText(`Output: ${l}×${l}`,x,P+l*u+14);const T=v+d*o/2;t.strokeStyle="var(--color-text-tertiary)",t.lineWidth=1.5,t.beginPath(),t.moveTo(y+S+4,T),t.lineTo(x-4,T),t.stroke(),t.fillStyle="var(--color-text-tertiary)",t.font="11px var(--font-sans)",t.textAlign="center",t.fillText("conv",y+S+18,T-5)}else t.fillStyle="#E24B4A",t.font="12px var(--font-sans)",t.textAlign="left",t.fillText("⚠ Non-integer output!",220,i/2)},[a,n,r,h,g,l,j]),e.jsxs(E,{children:[e.jsx("div",{style:{display:"grid",gridTemplateColumns:"80px 1fr 44px",gap:8,marginBottom:12,fontSize:12.5,alignItems:"center"},children:[["Input H=W",a,p,2,12,1],["Filter F",n,w,2,7,1],["Padding P",r,s,0,4,1],["Stride S",h,L,1,4,1]].map(([f,t,m,i,d,o],S)=>e.jsxs("div",{style:{display:"contents"},children:[e.jsx("span",{style:{color:"var(--color-text-secondary)"},children:f}),e.jsx("input",{type:"range",min:i,max:d,step:o,value:t,onChange:y=>m(+y.target.value)}),e.jsx("span",{style:{fontFamily:"var(--font-mono)",fontSize:12,textAlign:"right",color:g?"var(--color-text-primary)":"var(--color-text-danger)"},children:t})]},S))}),e.jsx("canvas",{ref:N,width:500,height:230,style:{display:"block",margin:"0 auto",maxWidth:"100%"}}),e.jsxs("div",{style:{marginTop:10,display:"flex",gap:20,justifyContent:"center",flexWrap:"wrap",fontSize:13,fontFamily:"var(--font-mono)"},children:[e.jsxs("span",{children:["Formula: (",a," - ",n," + 2×",r,") / ",h," + 1 ="]}),e.jsx("span",{style:{fontWeight:500,color:g?"var(--color-text-success)":"var(--color-text-danger)"},children:g?`${l} × ${l}`:`${j.toFixed(2)} ← NOT integer!`})]})]})}function B(){return e.jsxs("div",{children:[e.jsx(c,{children:"Problems without padding"}),e.jsxs(D,{cols:2,children:[e.jsx(_,{color:"danger",title:"Problem 1: Spatial shrinkage",children:"Every conv layer reduces spatial dimensions. With a 3×3 kernel and no padding: 28→26→24→...→4. After just 12 layers on a 28×28 image, you're left with a tiny 4×4 feature map — too much information is lost before deep features can form."}),e.jsx(_,{color:"warning",title:"Problem 2: Border pixel bias",children:"Without padding, a corner pixel is visited by the kernel only once (in its one overlapping position). A center pixel is visited F² times. This means border pixels contribute far less to the learned features — information at image edges is systematically underused."})]}),e.jsx(c,{children:"What is padding?"}),e.jsx(A,{children:"Padding adds extra rows/columns of zeros (or other values) around the input before applying the convolution. This gives the kernel 'room' to be centered on border pixels."}),e.jsx(C,{block:!0,children:`  Without padding (VALID):
    Input 6×6, kernel 3×3, stride 1:
    H_out = (6 - 3)/1 + 1 = 4  →  output is 4×4  (shrank!)

  With padding P=1 (SAME):
    Input becomes 8×8 (padded), kernel 3×3, stride 1:
    H_out = (6 - 3 + 2×1)/1 + 1 = 6  →  output is 6×6  (preserved!)

  SAME padding formula:
    P = (F - 1) / 2    (works for odd F: 3→P=1, 5→P=2, 7→P=3)

  Zero padding: most common — pad with 0s
  Reflect padding: mirror border values — avoids zero artifacts
  Replicate padding: repeat edge pixels`}),e.jsx(c,{children:"Interactive: padding + stride explorer"}),e.jsx(A,{children:"Drag the sliders. Watch the padded input (red border = zeros) and output grid update. Set stride > 1 to see spatial shrinkage. Try non-divisible combos to see the decimal problem."}),e.jsx(O,{}),e.jsx(c,{children:"Strides — controlling step size"}),e.jsx(A,{children:"Stride S is how many pixels the kernel moves at each step. Default S=1 moves one pixel at a time. S=2 skips every other position — a fast way to downsample without a pooling layer."}),e.jsx(C,{block:!0,children:`  Stride = 1 (default):  kernel moves 1 pixel → fine-grained output
  Stride = 2:             kernel moves 2 pixels → roughly halves output
  Stride = 3:             moves 3 pixels → output ≈ 1/3 of input

  General formula:
    H_out = ⌊(H_in - F + 2P) / S⌋ + 1

  Example — same input (7×7), same kernel (3×3), no padding:
    S=1:  (7-3)/1+1 = 5×5   (moderate shrink)
    S=2:  (7-3)/2+1 = 3×3   (aggressive shrink)
    S=3:  (7-3)/3+1 = 2×2   (very aggressive)

  Note the FLOOR: (7-3)/2 = 2.0 exactly here.
  Non-integer case: (6-3)/2 = 1.5 → floor = 1 (last column skipped!)`}),e.jsx(c,{children:"The decimal / edge case problem"}),e.jsxs(W,{color:"warning",icon:"ti-alert-triangle",children:["When ",e.jsx(C,{children:"(H_in - F + 2P) % S ≠ 0"}),", the kernel's last position would partially extend beyond the input. The floor function truncates — some pixels at the right/bottom edge are silently dropped."]}),e.jsx(C,{block:!0,children:`  Problem: H=5, F=3, P=0, S=2
    H_out = (5-3+0)/2 + 1 = 2.0 + 1 = 3.0  ← OK, exact
    Positions: col=0, col=2 → col=4 would need pixels 4,5,6 → out of bounds!
    Framework behavior: DROPS the last step → output = 2 (not 3)

  Problem: H=6, F=3, P=0, S=2
    H_out = (6-3)/2 + 1 = 1.5 + 1 = 2.5 → floor = 2
    Column 4 would cover pixels [4,5,6] → col 6 doesn't exist → skipped

  Solutions:
  1. TensorFlow SAME padding + stride: automatically pads to make it work
     tf.keras.layers.Conv2D(filters, F, strides=S, padding='same')

  2. Ensure (H - F) is divisible by S before choosing hyperparameters

  3. PyTorch 'same' padding mode (added in PyTorch 1.9):
     nn.Conv2d(C_in, C_out, F, stride=S, padding='same')`}),e.jsx(c,{children:"Why use strides? Two key reasons"}),e.jsxs(D,{cols:2,children:[e.jsx(_,{color:"success",title:"1. Downsampling without pooling",children:"Strided convolutions can replace max pooling for downsampling, but they're learnable — the network learns HOW to downsample optimally. Used heavily in modern architectures (ResNet, All-CNN). Keeps more information than fixed pooling."}),e.jsx(_,{color:"success",title:"2. Computational efficiency",children:"S=2 roughly halves the number of output positions, reducing FLOPs by ~4× (halved in both H and W). This allows deeper networks without memory explosion. Used in the first layer of many large networks (ResNet-50: 7×7 conv, S=2)."})]}),e.jsx(c,{children:"Architecture comparison: padding + stride impact"}),e.jsx(z,{heads:["Architecture","Input","Config","Output","Params","Use case"],rows:[["VALID, S=1","28×28×1","F=3,P=0,S=1","26×26×32","896","Max info, shrinks"],["SAME, S=1","28×28×1","F=3,P=1,S=1","28×28×32","896","Preserve dims (standard)"],["VALID, S=2","28×28×1","F=3,P=0,S=2","13×13×32","896","Fast downsample"],["SAME, S=2","28×28×1","F=3,P=1,S=2","14×14×32","896","Clean half-size output"],["Large kernel","28×28×1","F=7,P=3,S=2","14×14×64","3,200","ResNet-style stem"]]}),e.jsx(c,{children:"MNIST CNN with explicit dimension tracking"}),e.jsx(I,{children:`import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers

# ── Model with SAME padding (recommended) ─────────────────
def build_cnn_same(input_shape=(28,28,1), num_classes=10):
    model = keras.Sequential(name="CNN_SAME")
    model.add(layers.Input(shape=input_shape))                  # (28,28,1)

    model.add(layers.Conv2D(32, (3,3), padding='same',          # SAME: (28,28,32)
                            activation='relu'))
    model.add(layers.MaxPooling2D((2,2)))                        # (14,14,32)

    model.add(layers.Conv2D(64, (3,3), padding='same',          # SAME: (14,14,64)
                            activation='relu'))
    model.add(layers.MaxPooling2D((2,2)))                        # (7, 7, 64)

    model.add(layers.Conv2D(64, (3,3), padding='same',          # SAME: (7, 7, 64)
                            activation='relu'))
    # No pooling here — 7×7 is small enough

    model.add(layers.Flatten())                                  # (7*7*64,) = (3136,)
    model.add(layers.Dense(64, activation='relu'))               # (64,)
    model.add(layers.Dense(num_classes, activation='softmax'))   # (10,)
    return model

# ── Model with VALID padding — watch the shrinkage! ────────
def build_cnn_valid(input_shape=(28,28,1), num_classes=10):
    model = keras.Sequential(name="CNN_VALID")
    model.add(layers.Input(shape=input_shape))                  # (28,28,1)

    model.add(layers.Conv2D(32, (3,3), padding='valid',         # (26,26,32)
                            activation='relu'))
    model.add(layers.MaxPooling2D((2,2)))                        # (13,13,32)

    model.add(layers.Conv2D(64, (3,3), padding='valid',         # (11,11,64)
                            activation='relu'))
    model.add(layers.MaxPooling2D((2,2)))                        # (5, 5, 64)

    model.add(layers.Conv2D(64, (3,3), padding='valid',         # (3, 3, 64)
                            activation='relu'))

    model.add(layers.Flatten())                                  # (576,) — much less!
    model.add(layers.Dense(64, activation='relu'))
    model.add(layers.Dense(num_classes, activation='softmax'))
    return model

# ── Verify dimensions programmatically ───────────────────
model_same  = build_cnn_same()
model_valid = build_cnn_valid()

def print_layer_shapes(model):
    print(f"\\n{'Layer':<35} {'Output Shape'}")
    print("─"*55)
    for layer in model.layers:
        print(f"  {layer.name:<33} {str(layer.output_shape)}")

print_layer_shapes(model_same)
print_layer_shapes(model_valid)

# ── Strides as downsampling replacement ──────────────────
# Replace MaxPool with strided conv — learnable downsampling
model_strided = keras.Sequential([
    layers.Input(shape=(28,28,1)),
    layers.Conv2D(32, (3,3), padding='same', activation='relu'),  # (28,28,32)
    layers.Conv2D(32, (3,3), strides=2, padding='same',           # (14,14,32)
                  activation='relu'),                              # ← stride replaces pool

    layers.Conv2D(64, (3,3), padding='same', activation='relu'),  # (14,14,64)
    layers.Conv2D(64, (3,3), strides=2, padding='same',           # (7, 7, 64)
                  activation='relu'),

    layers.GlobalAveragePooling2D(),                               # (64,)
    layers.Dense(10, activation='softmax'),
])`}),e.jsx(k,{q:"What is the difference between SAME and VALID padding, precisely?",a:"<strong>VALID</strong>: P=0. No zeros are added. The kernel only slides where it fully overlaps the input. Output size: H_out = ⌊(H−F)/S⌋+1. Edge pixels contribute to fewer output positions than center pixels. <strong>SAME</strong>: padding is automatically computed so H_out = ⌈H/S⌉ (with S=1, H_out = H exactly). For odd F: P=(F-1)/2. Zeros are added symmetrically around the border. Every pixel contributes equally. SAME is the standard choice for hidden conv layers to avoid uncontrolled shrinkage."}),e.jsx(k,{q:"Why does TensorFlow's 'same' padding produce different results from manual P=(F-1)/2 with even kernels?",a:"For even kernel sizes (F=2, F=4), (F-1)/2 is not an integer, so equal padding on both sides is impossible. TensorFlow's SAME adds one extra padding row/column on the right/bottom when needed — asymmetric padding. This is why even-sized kernels are rarely used in practice: they create subtle asymmetries and complicate the output dimension calculation. Sticking to odd F (3,5,7) ensures symmetric SAME padding always works cleanly."}),e.jsx(k,{q:"When should you use strided convolutions instead of pooling?",a:"Use strided convolutions (S=2 conv) instead of MaxPool when: (1) you want the network to learn how to downsample rather than using a fixed max/avg operation — strided conv is parametric and can optimize its own downsampling for the task. (2) In generative models (GANs, autoencoders) where pooling's information loss is harmful. (3) In all-convolutional networks (Springenberg et al., 2015) where pooling is completely removed. Use MaxPool when: you want guaranteed translation invariance, fewer parameters, and the computational savings of a non-parametric operation."})]})}function $(){const[a,p]=b.useState(0),[n,w]=b.useState("max"),r=[[12,20,30,0],[8,12,2,0],[34,70,37,4],[112,100,25,12]],s=2,h=[[0,0],[0,1],[1,0],[1,1]],L=(t,m)=>{const i=[r[t*s][m*s],r[t*s][m*s+1],r[t*s+1][m*s],r[t*s+1][m*s+1]];return n==="max"?Math.max(...i):Math.round(i.reduce((d,o)=>d+o)/i.length)},N=h.map(([t,m])=>L(t,m)),j=["rgba(55,138,221,0.25)","rgba(29,158,117,0.25)","rgba(239,159,39,0.25)","rgba(162,84,172,0.25)"],l=["#378ADD","#1D9E75","#EF9F27","#A254AC"],[g,f]=a<4?h[a]:[0,0];return e.jsxs(E,{children:[e.jsx("div",{style:{display:"flex",gap:8,marginBottom:12},children:["max","avg"].map(t=>e.jsx("button",{onClick:()=>{w(t),p(0)},style:{padding:"4px 14px",fontSize:12.5,fontWeight:t===n?500:400,border:`0.5px solid var(--color-border-${t===n?"info":"tertiary"})`,borderRadius:"var(--border-radius-md)",background:t===n?"var(--color-background-info)":"transparent",color:t===n?"var(--color-text-info)":"var(--color-text-secondary)",cursor:"pointer"},children:t==="max"?"Max Pooling":"Avg Pooling"},t))}),e.jsxs("div",{style:{display:"flex",gap:32,justifyContent:"center",alignItems:"flex-start",flexWrap:"wrap"},children:[e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx("div",{style:{fontSize:12,color:"var(--color-text-secondary)",marginBottom:6,fontWeight:500},children:"Input (4×4)"}),e.jsx("div",{style:{display:"inline-grid",gridTemplateColumns:"repeat(4,52px)",gap:2},children:r.map((t,m)=>t.map((i,d)=>{const o=Math.floor(m/2)*2+Math.floor(d/2),S=a<4&&Math.floor(m/2)===g&&Math.floor(d/2)===f;return e.jsx("div",{style:{width:52,height:52,display:"flex",alignItems:"center",justifyContent:"center",borderRadius:4,background:S?j[o]:o<a?j[o]+"44":"var(--color-background-secondary)",border:S?`2px solid ${l[o]}`:`0.5px solid var(--color-border-${o<a?"secondary":"tertiary"})`,fontFamily:"var(--font-mono)",fontSize:15,fontWeight:S?700:400,color:"var(--color-text-primary)",transition:"all 0.2s"},children:i},`${m}${d}`)}))})]}),e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx("div",{style:{fontSize:12,color:"var(--color-text-secondary)",marginBottom:6,fontWeight:500},children:"Output (2×2)"}),e.jsx("div",{style:{display:"inline-grid",gridTemplateColumns:"repeat(2,52px)",gap:2},children:h.map(([t,m],i)=>e.jsx("div",{style:{width:52,height:52,display:"flex",alignItems:"center",justifyContent:"center",borderRadius:4,background:i<a?j[i]:i===a?"var(--color-background-primary)":"var(--color-background-secondary)",border:i===a?`2px solid ${l[i]}`:i<a?`1.5px solid ${l[i]}`:"0.5px solid var(--color-border-tertiary)",fontFamily:"var(--font-mono)",fontSize:18,fontWeight:700,color:i<a?l[i]:"var(--color-text-tertiary)",transition:"all 0.2s"},children:i<a?N[i]:"?"},`o${t}${m}`))})]})]}),a<4&&e.jsxs("div",{style:{marginTop:12,padding:"9px 14px",background:"var(--color-background-primary)",border:`0.5px solid ${l[a]}`,borderRadius:"var(--border-radius-md)",fontFamily:"var(--font-mono)",fontSize:13},children:[e.jsxs("span",{style:{color:"var(--color-text-secondary)"},children:["Window [",g,",",f,"] values: "]}),e.jsx("span",{style:{color:"var(--color-text-primary)"},children:[r[g*2][f*2],r[g*2][f*2+1],r[g*2+1][f*2],r[g*2+1][f*2+1]].join(", ")}),e.jsxs("span",{style:{color:"var(--color-text-secondary)"},children:[" → ",n==="max"?"max":"avg"," = "]}),e.jsx("span",{style:{color:l[a],fontWeight:700},children:N[a]})]}),e.jsxs("div",{style:{display:"flex",gap:8,justifyContent:"center",marginTop:10},children:[e.jsx("button",{onClick:()=>p(0),style:{padding:"4px 10px",fontSize:12,border:"0.5px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-secondary)",cursor:"pointer"},children:"⏮"}),e.jsx("button",{onClick:()=>p(t=>Math.max(0,t-1)),disabled:a===0,style:{padding:"4px 10px",fontSize:12,border:"0.5px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:a>0?"var(--color-text-secondary)":"var(--color-text-tertiary)",cursor:a>0?"pointer":"default"},children:"◀"}),e.jsx("button",{onClick:()=>p(t=>Math.min(4,t+1)),disabled:a>=4,style:{padding:"4px 16px",fontSize:13,fontWeight:500,border:"0.5px solid var(--color-border-info)",borderRadius:"var(--border-radius-md)",background:"var(--color-background-info)",color:"var(--color-text-info)",cursor:a<4?"pointer":"default"},children:"Next ▶"})]})]})}function V(){return e.jsxs("div",{children:[e.jsx(A,{children:"Pooling solves two problems that arise after convolution: memory explosion from large feature maps, and translation variance (the network being too sensitive to exact pixel positions)."}),e.jsx(c,{children:"The two problems pooling solves"}),e.jsxs(D,{cols:2,children:[e.jsx(_,{color:"danger",title:"Problem 1: Memory",children:"A 224×224 image with 256 feature maps = 224×224×256 = ~12M activations per layer. Without downsampling, deep networks become computationally infeasible. Pooling cuts this by 4× per layer (2×2 pool, stride 2)."}),e.jsx(_,{color:"warning",title:"Problem 2: Translation variance",children:'Without pooling, a feature shifted by 1 pixel produces a completely different activation map. Pooling aggregates a local region — "was this feature somewhere in this 2×2 patch?" — making detection robust to small position shifts.'})]}),e.jsx(c,{children:"Step-by-step pooling animation"}),e.jsx($,{}),e.jsx(c,{children:"All pooling types — complete reference"}),e.jsx(C,{block:!0,children:`  Max Pooling:
    output[i,j] = max(patch[i,j])
    Effect: keeps the strongest activation in each region.
    Meaning: "Was this feature detected ANYWHERE in this patch?"
    Most common. Used in AlexNet, VGG, LeNet.

  Average Pooling:
    output[i,j] = mean(patch[i,j])
    Effect: smooth, softer representation.
    Meaning: "How much was this feature detected on average?"
    Used in: GoogLeNet, when you need smooth gradients.

  Global Average Pooling (GAP):
    One pooling window = entire feature map.
    (H, W, C) → (C,)   — one number per channel.
    No learnable parameters! Replaces Flatten+Dense.
    Used in: ResNet, MobileNet, EfficientNet.

  Global Max Pooling (GMP):
    (H, W, C) → (C,)   — max per channel.
    Less common than GAP.

  L2 Pooling:
    output = sqrt(sum(patch²))   — Euclidean norm of patch.
    Used in: some specialized architectures.

  Fractional Max Pooling (FMP):
    Pool size can be non-integer (e.g., 1.5×1.5).
    Stochastic; used as data augmentation. Rare.`}),e.jsx(c,{children:"Pooling properties — what it preserves and loses"}),e.jsx(z,{heads:["Property","Max Pooling","Average Pooling","Note"],rows:[["Translation invariance","High","Medium","Max: exact position doesn't matter within pool"],["Gradient flow","Sparse (only max)","Dense (all cells)","Avg has smoother gradients"],["Feature preservation","Strongest only","Average of all","Max can miss weak-but-consistent signals"],["Noise robustness","High","Medium","Max ignores weak activations from noise"],["Spatial info loss","Yes","Yes","Both discard exact position within window"],["Parameters","0","0","Pooling is always parameter-free!"],["Output range","Same as input","Same as input","No normalization occurs"]]}),e.jsx(c,{children:"Disadvantages of pooling"}),e.jsx(D,{cols:2,children:[{title:"Information loss",color:"danger",body:"Pooling permanently discards spatial precision. After 3 max-pool layers, you know a feature exists somewhere in an 8×8 region, but not where exactly. Fatal for tasks needing precise localization (segmentation, keypoint detection, object detection)."},{title:"Spatial hierarchy loss",color:"danger",body:"Capsule Networks (Hinton, 2017) argue pooling destroys the spatial relationships between features — a CNN could recognize 'nose above mouth above chin' and 'chin above mouth above nose' equally as a face. Pooling's invariance is too aggressive."},{title:"Not differentiable everywhere (max)",color:"warning",body:"Max pooling has zero gradient for all non-maximum elements. During backprop, only the max pixel's gradient is non-zero. This can reduce learning signal in early layers if max positions change frequently."},{title:"Fixed stride is suboptimal",color:"warning",body:"A 2×2 stride-2 pool always halves dimensions regardless of the task. Strided convolutions are learnable alternatives that can adapt the downsampling to the data."}].map(({title:a,color:p,body:n})=>e.jsxs("div",{style:{background:`var(--color-background-${p})`,border:`0.5px solid var(--color-border-${p})`,borderRadius:"var(--border-radius-md)",padding:"11px 13px"},children:[e.jsx("div",{style:{fontWeight:500,fontSize:12.5,color:`var(--color-text-${p})`,marginBottom:6},children:a}),e.jsx("div",{style:{fontSize:12,color:`var(--color-text-${p})`,lineHeight:1.65},children:n})]},a))}),e.jsx(c,{children:"Alternatives to pooling"}),e.jsx(z,{heads:["Alternative","How","Best for","Used in"],rows:[["Strided convolution","S=2 in conv layer","Learnable downsampling","ResNet, DCGAN, All-CNN"],["Dilated / Atrous conv","Skip pixels in filter application","Large receptive field, no downsample","DeepLab, semantic segmentation"],["Global Average Pooling","Average entire feature map","Final layer, no flattening","ResNet, MobileNet, EfficientNet"],["Spatial Pyramid Pooling","Pool at multiple scales","Multi-scale features","SPPNet, Faster R-CNN"],["No pooling (large FC)","Keep full spatial resolution","Very small inputs","Simple MLPs on tiny images"]]}),e.jsx(c,{children:"Complete MNIST CNN with pooling — annotated"}),e.jsx(I,{children:`import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers

# ── Build CNN with explicit pooling annotation ─────────────
model = keras.Sequential([
    layers.Input(shape=(28, 28, 1)),              # (28, 28, 1)

    # ── Block 1 ────────────────────────────────────────────
    layers.Conv2D(32, (3,3), activation='relu',
                  padding='same',
                  kernel_initializer='he_normal'), # (28, 28, 32)
    layers.MaxPooling2D(pool_size=(2,2),           # pool_size: window
                        strides=(2,2)),            # strides: step size
                                                   # (14, 14, 32)
    # ── Block 2 ────────────────────────────────────────────
    layers.Conv2D(64, (3,3), activation='relu',
                  padding='same',
                  kernel_initializer='he_normal'), # (14, 14, 64)
    layers.MaxPooling2D(2, 2),                     # (7,  7,  64)

    # ── Classifier ─────────────────────────────────────────
    layers.Flatten(),                              # (7*7*64,) = (3136,)
    layers.Dense(128, activation='relu'),          # (128,)
    layers.Dropout(0.5),
    layers.Dense(10, activation='softmax'),        # (10,)
])

model.compile(
    optimizer='adam',
    loss='sparse_categorical_crossentropy',
    metrics=['accuracy']
)

# ── Load and preprocess MNIST ─────────────────────────────
(X_train, y_train), (X_test, y_test) = keras.datasets.mnist.load_data()
X_train = X_train[..., tf.newaxis].astype('float32') / 255.0  # add channel dim
X_test  = X_test[...,  tf.newaxis].astype('float32') / 255.0

history = model.fit(
    X_train, y_train,
    epochs=15, batch_size=64,
    validation_split=0.1
)
print(f"Test accuracy: {model.evaluate(X_test, y_test, verbose=0)[1]:.4f}")
# Typical result: ~99.2% on MNIST

# ── GAP version (modern alternative) ─────────────────────
model_gap = keras.Sequential([
    layers.Input(shape=(28, 28, 1)),
    layers.Conv2D(32, 3, padding='same', activation='relu'),
    layers.MaxPooling2D(2),
    layers.Conv2D(64, 3, padding='same', activation='relu'),
    layers.MaxPooling2D(2),
    layers.Conv2D(128, 3, padding='same', activation='relu'),
    layers.GlobalAveragePooling2D(),    # (128,) — no Flatten needed!
    layers.Dense(10, activation='softmax'),
])
# Much fewer FC parameters, better generalization`}),e.jsx(k,{q:"Why does max pooling produce sparse gradients during backpropagation?",a:"During forward pass, max pooling records which element in each pool window was the maximum (the argmax). During backprop, the gradient from the output flows entirely to that maximum element — all other elements in the window receive zero gradient. This means only the 'winning' pixel in each 2×2 window gets updated. With 2×2 max pooling, 75% of pre-pooling gradients are zero. This sparsity can slow learning in early layers but also provides a form of regularization by forcing competition within each window."}),e.jsx(k,{q:"What is the key advantage of Global Average Pooling over Flatten+Dense?",a:"Three advantages: (1) <strong>Parameters</strong> — GAP has zero parameters; Flatten+(H×W×C→N) Dense has H×W×C×N weights — for a 7×7×512 feature map connecting to 4096 neurons: 7×7×512×4096 = 102M params! GAP eliminates this entirely. (2) <strong>Input-size flexibility</strong> — GAP works on any spatial size; you can test on different resolution images. (3) <strong>Regularization</strong> — GAP forces each channel to summarize a complete object concept over the entire spatial extent, reducing overfitting. It was introduced in Network-in-Network (Lin et al. 2013) and adopted by ResNet."})]})}function X({activeLayer:a}){const p=[{name:"INPUT",shape:"32×32×1",color:"#185FA5"},{name:"C1 Conv",shape:"28×28×6",color:"#0F6E56"},{name:"S2 Pool",shape:"14×14×6",color:"#1D9E75"},{name:"C3 Conv",shape:"10×10×16",color:"#0F6E56"},{name:"S4 Pool",shape:"5×5×16",color:"#1D9E75"},{name:"C5 Conv",shape:"1×1×120",color:"#0F6E56"},{name:"F6 FC",shape:"84",color:"#853E0B"},{name:"OUTPUT",shape:"10",color:"#7A2048"}];return e.jsx(E,{children:e.jsx("div",{style:{display:"flex",gap:0,alignItems:"center",flexWrap:"wrap",justifyContent:"center"},children:p.map(({name:n,shape:w,color:r},s)=>e.jsxs("div",{style:{display:"flex",alignItems:"center"},children:[e.jsxs("div",{style:{background:s===a?r:r+"22",border:`1.5px solid ${s===a?r:r+"88"}`,borderRadius:"var(--border-radius-md)",padding:"8px 10px",textAlign:"center",minWidth:72,cursor:"default",transition:"all 0.2s",transform:s===a?"scale(1.08)":"scale(1)"},children:[e.jsx("div",{style:{fontSize:11,fontWeight:600,color:s===a?"#fff":r},children:n}),e.jsx("div",{style:{fontSize:10,color:s===a?"rgba(255,255,255,0.8)":r,opacity:.85,marginTop:2},children:w})]}),s<p.length-1&&e.jsx("div",{style:{padding:"0 3px",color:"var(--color-text-tertiary)",fontSize:14},children:"→"})]},n))})})}function q(){const[a,p]=b.useState(0),n=[{name:"INPUT — 32×32×1",desc:"LeNet-5 was designed for handwritten digit recognition. Input images are 32×32 grayscale (MNIST 28×28 images are zero-padded to 32×32). Single channel (C=1) since images are grayscale.",math:`Input: (32, 32, 1)
Preprocessing: normalize to [-1, 1] (original paper)
Note: 28×28 MNIST padded with 2px border → 32×32`},{name:"C1 — Conv Layer (6 filters, 5×5, VALID)",desc:"First convolutional layer. 6 learnable 5×5 filters slide across the 32×32 input with no padding (VALID). Each filter produces one 28×28 feature map. At this stage the network learns primitive features: edges, blobs, corners.",math:`Config: 6 filters, F=5, P=0 (VALID), S=1
H_out = (32-5)/1+1 = 28
Output: (28, 28, 6)
Parameters: 6×(5×5×1+1) = 6×26 = 156
Activation: tanh (original) / ReLU (modern impl)`},{name:"S2 — Avg Pool (2×2, stride 2)",desc:"Average pooling layer (called 'subsampling' in the original paper). Reduces each 28×28 map to 14×14. Original paper used a learnable scale factor and bias after pooling (not standard today). Modern: MaxPool.",math:`Config: pool_size=(2,2), stride=2
H_out = 28/2 = 14
Output: (14, 14, 6)
Parameters: 0  (pooling has no weights)
Note: original paper had 2 trainable params per map`},{name:"C3 — Conv Layer (16 filters, 5×5, VALID)",desc:"Second conv layer. 16 filters of size 5×5. The original LeNet used a specific sparse connectivity between S2 maps and C3 filters (not all 6 input maps connect to all 16 output maps) — a form of manual regularization. Modern implementations use full connectivity.",math:`Config: 16 filters, F=5, P=0 (VALID), S=1
H_out = (14-5)/1+1 = 10
Output: (10, 10, 16)
Parameters: 16×(5×5×6+1) = 16×151 = 2,416`},{name:"S4 — Avg Pool (2×2, stride 2)",desc:"Second pooling layer. Reduces 10×10 to 5×5. After two rounds of conv+pool, the spatial resolution is greatly reduced while channel depth has increased — the spatial→semantic trade-off.",math:`Config: pool_size=(2,2), stride=2
H_out = 10/2 = 5
Output: (5, 5, 16)
Parameters: 0`},{name:"C5 — Conv Layer (120 filters, 5×5, VALID)",desc:"Third conv layer — but since input is exactly 5×5 and kernel is 5×5, this is functionally equivalent to a fully connected layer. Output is a 1×1×120 volume. This clever design bridges the conv and FC worlds.",math:`Config: 120 filters, F=5, P=0 (VALID), S=1
H_out = (5-5)/1+1 = 1
Output: (1, 1, 120) ≡ (120,) — fully connected!
Parameters: 120×(5×5×16+1) = 120×401 = 48,120`},{name:"F6 — Fully Connected (84 neurons)",desc:"Dense layer with 84 neurons. The choice of 84 was deliberate: ASCII has 84 printable characters, so in principle each neuron could represent one character in an expanded recognition system. Activation: tanh.",math:`Input: 120, Output: 84
Parameters: 120×84 + 84 = 10,164
Activation: tanh (original)
Note: 84 = number of ASCII printable chars`},{name:"OUTPUT — FC (10 neurons, Softmax)",desc:"Output layer with 10 neurons — one per digit class. Original paper used Euclidean RBF units; modern implementation uses Dense + Softmax with cross-entropy loss.",math:`Input: 84, Output: 10
Parameters: 84×10 + 10 = 850
Activation: Softmax (modern) / RBF (original)
Loss: CrossEntropy (modern) / MSE (original)`}],w=n[a];return e.jsxs("div",{children:[e.jsx(A,{children:"LeNet-5 (LeCun et al., 1998) is the foundational CNN architecture — the first deep learning model to achieve practical success at scale, deployed commercially to read cheques. Every modern CNN descends from its design principles."}),e.jsx(c,{children:"Architecture diagram — click any layer"}),e.jsx(X,{activeLayer:a}),e.jsx("div",{style:{display:"flex",gap:5,flexWrap:"wrap",marginBottom:12},children:n.map((s,h)=>e.jsx("button",{onClick:()=>p(h),style:{padding:"4px 10px",fontSize:11.5,fontWeight:h===a?500:400,border:`0.5px solid var(--color-border-${h===a?"info":"tertiary"})`,borderRadius:"20px",background:h===a?"var(--color-background-info)":"transparent",color:h===a?"var(--color-text-info)":"var(--color-text-secondary)",cursor:"pointer"},children:s.name.split(" ")[0]},h))}),e.jsxs("div",{style:{border:"0.5px solid var(--color-border-info)",borderRadius:"var(--border-radius-lg)",padding:"1.1rem",marginBottom:"1rem",background:"var(--color-background-primary)"},children:[e.jsx("div",{style:{fontWeight:500,fontSize:14.5,color:"var(--color-text-info)",marginBottom:8},children:w.name}),e.jsx(A,{c:w.desc,s:{marginBottom:8}}),e.jsx(C,{block:!0,children:w.math})]}),e.jsx(c,{children:"Complete parameter count"}),e.jsx(z,{heads:["Layer","Config","Output shape","Parameters"],rows:[["Input","—","32×32×1","0"],["C1 Conv","6×5×5, VALID","28×28×6","156"],["S2 Pool","2×2, stride 2","14×14×6","0"],["C3 Conv","16×5×5, VALID","10×10×16","2,416"],["S4 Pool","2×2, stride 2","5×5×16","0"],["C5 Conv","120×5×5, VALID","1×1×120","48,120"],["F6 FC","120→84","84","10,164"],["Output FC","84→10, softmax","10","850"],["TOTAL","—","—",61706 .toLocaleString()+" ≈ 61K"]]}),e.jsxs(W,{color:"success",icon:"ti-star",children:[e.jsx("strong",{children:"Historical context:"})," LeNet-5's ~61K parameters achieved 99.2% accuracy on MNIST in 1998 and was deployed at scale to read bank cheques. Modern ResNet-50 has 25M parameters but builds on exactly the same conv→pool→FC design principle."]}),e.jsx(c,{children:"Complete implementation — original + modern"}),e.jsx(I,{children:`import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers

# ── Original LeNet-5 (faithful to 1998 paper) ─────────────
def lenet5_original(input_shape=(32,32,1), num_classes=10):
    return keras.Sequential([
        layers.Input(shape=input_shape),

        # C1: 6 filters, 5×5, VALID, tanh
        layers.Conv2D(6, (5,5), activation='tanh',
                      padding='valid'),            # 32→28: (28,28,6)

        # S2: Average pool 2×2, stride 2
        layers.AveragePooling2D((2,2), strides=2), # 28→14: (14,14,6)

        # C3: 16 filters, 5×5, VALID, tanh
        layers.Conv2D(16, (5,5), activation='tanh',
                      padding='valid'),            # 14→10: (10,10,16)

        # S4: Average pool 2×2, stride 2
        layers.AveragePooling2D((2,2), strides=2), # 10→5:  (5,5,16)

        # C5: 120 filters, 5×5, VALID — fully connected conv!
        layers.Conv2D(120, (5,5), activation='tanh',
                      padding='valid'),            # 5→1:   (1,1,120)

        # Flatten: (1,1,120) → (120,)
        layers.Flatten(),

        # F6: Dense 84, tanh
        layers.Dense(84, activation='tanh'),       # (84,)

        # Output: 10 classes, softmax
        layers.Dense(num_classes, activation='softmax'),  # (10,)
    ], name='LeNet5_Original')

# ── Modern LeNet-5 (common improvements) ──────────────────
def lenet5_modern(input_shape=(28,28,1), num_classes=10):
    """
    Improvements over original:
    - Input 28×28 directly (no padding to 32×32 needed)
    - ReLU instead of tanh
    - MaxPool instead of AveragePool
    - BatchNorm for training stability
    - Softmax + CrossEntropy instead of RBF + MSE
    """
    return keras.Sequential([
        layers.Input(shape=input_shape),                  # (28,28,1)

        layers.Conv2D(6, (5,5), padding='same',
                      activation='relu'),                  # (28,28,6)
        layers.BatchNormalization(),
        layers.MaxPooling2D((2,2)),                        # (14,14,6)

        layers.Conv2D(16, (5,5), padding='valid',
                      activation='relu'),                  # (10,10,16)
        layers.BatchNormalization(),
        layers.MaxPooling2D((2,2)),                        # (5, 5,16)

        layers.Flatten(),                                  # (400,)
        layers.Dense(120, activation='relu'),              # (120,)
        layers.Dense(84,  activation='relu'),              # (84,)
        layers.Dense(num_classes, activation='softmax'),   # (10,)
    ], name='LeNet5_Modern')

# ── Train on MNIST ────────────────────────────────────────
(X_train, y_train), (X_test, y_test) = keras.datasets.mnist.load_data()

# For original: pad 28×28 → 32×32
X_32 = tf.pad(X_train[...,tf.newaxis], [[0,0],[2,2],[2,2],[0,0]])
X_32 = tf.cast(X_32, tf.float32) / 255.0

# For modern: use 28×28 directly
X_28 = X_train[..., tf.newaxis].astype('float32') / 255.0

model_orig   = lenet5_original()
model_modern = lenet5_modern()

for name, model, X, y in [
    ("Original LeNet-5", model_orig,   X_32[:50000], y_train[:50000]),
    ("Modern  LeNet-5",  model_modern, X_28[:50000], y_train[:50000]),
]:
    model.compile(optimizer='adam',
                  loss='sparse_categorical_crossentropy',
                  metrics=['accuracy'])
    model.fit(X, y, epochs=10, batch_size=64,
              validation_split=0.1, verbose=0)
    X_t = (tf.pad(X_test[...,tf.newaxis],[[0,0],[2,2],[2,2],[0,0]]).numpy()/255.0
           if name.startswith("Original") else
           X_test[...,tf.newaxis].astype('float32')/255.0)
    acc = model.evaluate(X_t, y_test, verbose=0)[1]
    params = model.count_params()
    print(f"{name}: accuracy={acc:.4f}  params={params:,}")

# Typical output:
# Original LeNet-5: accuracy=0.9884  params=61,470
# Modern  LeNet-5:  accuracy=0.9921  params=44,426`}),e.jsx(c,{children:"LeNet-5's legacy — what it introduced"}),e.jsx(D,{cols:3,children:[{idea:"Local receptive fields",legacy:"Every modern CNN uses locally-connected conv layers, not globally connected ones."},{idea:"Parameter sharing (weight tying)",legacy:"The same filter weights detect features anywhere in the image — fundamental to all CNNs."},{idea:"Spatial subsampling",legacy:"Pooling (or strided conv) after each conv block — the standard CNN 'block' structure."},{idea:"Hierarchical features",legacy:"Low-level (edges) → mid-level (shapes) → high-level (objects) representation learning."},{idea:"End-to-end learning",legacy:"Features and classifier trained jointly — no separate feature engineering step."},{idea:"Practical deployment",legacy:"First deep learning system deployed at industrial scale (millions of cheques/day)."}].map(({idea:s,legacy:h})=>e.jsxs("div",{style:{border:"0.5px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",padding:"10px 12px"},children:[e.jsx("div",{style:{fontWeight:500,fontSize:12.5,color:"var(--color-text-primary)",marginBottom:5},children:s}),e.jsx("div",{style:{fontSize:12,color:"var(--color-text-secondary)",lineHeight:1.6},children:h})]},s))}),e.jsx(k,{q:"Why is C5 in LeNet-5 called a convolutional layer even though it produces a 1×1 output?",a:"C5 uses 120 filters of size 5×5 applied to a 5×5×16 feature map with VALID padding. Since kernel size equals feature map size, each filter computes a dot product over the entire 5×5 spatial extent — identical to a fully connected computation from 400 inputs to 120 outputs. LeCun kept it as a conv layer (rather than Dense) because it preserves the design principle of spatially-sliding filters, and if the input were larger than 5×5, C5 would produce a spatial output (enabling the network to process larger images naturally). This is the idea behind Fully Convolutional Networks (FCN)."}),e.jsx(k,{q:"What are the two most impactful changes in modernizing LeNet-5?",a:"(1) <strong>ReLU instead of tanh</strong>: tanh saturates and causes vanishing gradients in deep networks; ReLU trains faster (no saturation for z>0) and enables much deeper architectures. (2) <strong>MaxPool instead of AveragePool</strong>: max pooling provides stronger translation invariance by reporting the peak activation (feature presence) rather than the average, and produces sparser, more discriminative representations. Secondary improvements: BatchNorm for training stability, and Softmax+CrossEntropy instead of RBF+MSE for better gradient signals at the output layer."})]})}const G=[{id:"ps",label:"Padding & Strides"},{id:"pool",label:"Pooling Deep Dive"},{id:"lenet",label:"LeNet-5"}];function Q(){const[a,p]=b.useState("ps"),n={ps:e.jsx(B,{}),pool:e.jsx(V,{}),lenet:e.jsx(q,{})};return e.jsxs("div",{children:[e.jsxs("div",{className:"page-header",children:[e.jsx("div",{className:"page-header-eyebrow",children:"Deep Learning — Module 11"}),e.jsx("h1",{className:"page-header-title",children:"Padding · Strides · Pooling Deep Dive · LeNet-5"}),e.jsx("p",{className:"page-header-subtitle",children:"Chapters 43–45 · Interactive dimension explorer · Step-by-step pooling · Full LeNet-5 layer-by-layer breakdown"})]}),e.jsx(R,{tabs:G,active:a,onChange:p}),e.jsx("div",{style:{padding:"0.5rem 0 2rem"},children:n[a]}),e.jsx(H,{moduleId:11})]})}export{Q as default};
