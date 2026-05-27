import{r as z,j as e}from"./index-BQO4ci8G.js";import{S as H,H as u,P as S,M as C,G as T,a as $,Q as _,T as M,C as I,N as D,V as P}from"./SectionNav-BDxYvY3P.js";import{N as B}from"./NavButtons-Bz-HQEP4.js";function E(){const[t,a]=z.useState(64),[r,p]=z.useState(512),c=3,b=t*t*c*r,f=32,y=3,x=f*(y*y*c+1),h=Math.round(b/x),s=o=>o>=1e6?(o/1e6).toFixed(1)+"M":o>=1e3?(o/1e3).toFixed(0)+"K":o;return e.jsxs(P,{children:[e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"100px 1fr 52px",alignItems:"center",gap:8,marginBottom:12,fontSize:13},children:[e.jsx("span",{style:{color:"var(--color-text-secondary)"},children:"Image size"}),e.jsx("input",{type:"range",min:28,max:224,step:4,value:t,onChange:o=>a(+o.target.value)}),e.jsxs("span",{style:{fontFamily:"var(--font-mono)",fontSize:12,textAlign:"right"},children:[t,"px"]}),e.jsx("span",{style:{color:"var(--color-text-secondary)"},children:"ANN hidden"}),e.jsx("input",{type:"range",min:64,max:2048,step:64,value:r,onChange:o=>p(+o.target.value)}),e.jsx("span",{style:{fontFamily:"var(--font-mono)",fontSize:12,textAlign:"right"},children:r})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10},children:[e.jsxs("div",{style:{background:"var(--color-background-danger)",border:"0.5px solid var(--color-border-danger)",borderRadius:"var(--border-radius-md)",padding:"12px 14px"},children:[e.jsx("div",{style:{fontWeight:500,fontSize:12.5,color:"var(--color-text-danger)",marginBottom:6},children:"ANN — first layer only"}),e.jsxs("div",{style:{fontFamily:"var(--font-mono)",fontSize:13,color:"var(--color-text-danger)"},children:[s(b)," parameters"]}),e.jsxs("div",{style:{fontSize:11.5,color:"var(--color-text-danger)",marginTop:4},children:[t,"×",t,"×3 × ",r]})]}),e.jsxs("div",{style:{background:"var(--color-background-success)",border:"0.5px solid var(--color-border-success)",borderRadius:"var(--border-radius-md)",padding:"12px 14px"},children:[e.jsx("div",{style:{fontWeight:500,fontSize:12.5,color:"var(--color-text-success)",marginBottom:6},children:"CNN — first conv layer"}),e.jsxs("div",{style:{fontFamily:"var(--font-mono)",fontSize:13,color:"var(--color-text-success)"},children:[s(x)," parameters"]}),e.jsxs("div",{style:{fontSize:11.5,color:"var(--color-text-success)",marginTop:4},children:["32 × (3×3×3 + 1) = ",x]})]})]}),e.jsxs("div",{style:{textAlign:"center",marginTop:10,fontSize:13,fontWeight:500,color:"var(--color-text-primary)"},children:["CNN is ",e.jsxs("span",{style:{color:"var(--color-text-success)"},children:[h.toLocaleString(),"×"]})," more parameter-efficient on this first layer"]})]})}function L(){return e.jsxs("div",{children:[e.jsxs(D,{color:"info",icon:"ti-bulb",children:[e.jsx("strong",{children:"One-sentence definition:"})," A CNN is a neural network that uses sliding learnable filters (kernels) to detect spatial patterns in data — it exploits the fact that the same feature (e.g., an edge) can appear anywhere in an image, so it makes sense to detect it everywhere with the ",e.jsx("em",{children:"same weights"}),"."]}),e.jsx(u,{children:"Why not just use a regular ANN for images?"}),e.jsx(S,{children:"Three fundamental problems make ANNs a poor fit for image data:"}),e.jsx(T,{cols:3,children:[{n:"1",title:"Parameter explosion",color:"danger",body:"A 224×224×3 RGB image has 150,528 pixels. An ANN's first layer with 1000 neurons would need 150 million parameters — just for layer 1. This is memory-prohibitive and massively overfits."},{n:"2",title:"No spatial awareness",color:"warning",body:"Flattening the 2D image to 1D destroys all spatial structure. The ANN treats pixels[0,0] and pixels[1,0] as unrelated features. Nearby pixels — which share edges, textures, corners — lose their relationship."},{n:"3",title:"No translation invariance",color:"warning",body:"A cat in the top-left vs. the bottom-right activates completely different sets of ANN weights. The network must learn the same feature repeatedly for every possible position. CNNs detect the same feature everywhere with the same weights."}].map(({n:t,title:a,color:r,body:p})=>e.jsxs("div",{style:{background:`var(--color-background-${r})`,border:`0.5px solid var(--color-border-${r})`,borderRadius:"var(--border-radius-md)",padding:"12px 13px"},children:[e.jsxs("div",{style:{fontFamily:"var(--font-mono)",fontSize:11,color:`var(--color-text-${r})`,marginBottom:5},children:["Problem ",t]}),e.jsx("div",{style:{fontWeight:500,fontSize:13,color:`var(--color-text-${r})`,marginBottom:6},children:a}),e.jsx("div",{style:{fontSize:12,color:`var(--color-text-${r})`,lineHeight:1.65},children:p})]},t))}),e.jsx(u,{children:"Parameter efficiency — ANN vs CNN"}),e.jsx(S,{children:"Drag the sliders to see how ANN parameters explode while CNN parameters stay constant regardless of image size."}),e.jsx(E,{}),e.jsx(u,{children:"How CNN solves all three problems"}),e.jsx(M,{heads:["Problem","ANN","CNN solution"],rows:[["Too many parameters","O(H×W×C×hidden)","O(F×F×C×filters) — independent of image size!"],["No spatial awareness","Flattened 1D vector","2D convolution preserves H×W neighborhood structure"],["Position-dependent","Separate weights per pixel","Same filter weights applied at every position (weight sharing)"],["Feature reuse","Not possible","One filter detects the same edge/texture anywhere in the image"]]}),e.jsx(u,{children:"Core CNN concepts — intuition first"}),e.jsx(T,{cols:2,children:[{title:"Weight sharing",icon:"ti-copy",color:"info",body:"A single 3×3 filter (9 numbers) is slid across the entire image. The same 9 weights detect, say, a vertical edge at position (0,0) AND at position (50,100). This is the core efficiency gain."},{title:"Translation invariance",icon:"ti-arrows-move",color:"info",body:"Because the same filter runs everywhere, a cat detected at top-left fires the same neurons as a cat at bottom-right. The network doesn't need to 're-learn' features at each location."},{title:"Hierarchical features",icon:"ti-layers",color:"success",body:"Early layers detect edges → Layer 2 combines edges into textures → Layer 3 combines textures into parts (eye, wheel) → Deep layers detect semantic objects (face, car)."},{title:"Local connectivity",icon:"ti-topology-star-3",color:"success",body:"Each neuron only connects to a small local region (its receptive field), not the whole image. This reflects the biological fact that nearby pixels are more related than distant pixels."}].map(({title:t,icon:a,color:r,body:p})=>e.jsxs("div",{style:{border:"0.5px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",padding:"12px 13px"},children:[e.jsxs("div",{style:{display:"flex",gap:8,alignItems:"center",marginBottom:7},children:[e.jsx("i",{className:`ti ${a}`,style:{fontSize:17,color:`var(--color-text-${r})`},"aria-hidden":!0}),e.jsx("span",{style:{fontWeight:500,fontSize:13.5,color:"var(--color-text-primary)"},children:t})]}),e.jsx("div",{style:{fontSize:13,color:"var(--color-text-secondary)",lineHeight:1.65},children:p})]},t))}),e.jsx(u,{children:"Visual cortex connection (brief)"}),e.jsx(S,{children:"Hubel & Wiesel (1959) discovered that neurons in a cat's visual cortex fire in response to oriented edges, not full objects. Simple cells detect edges at specific positions; complex cells detect them anywhere in their receptive field. CNNs mirror this: conv filters (simple cells) → pooling (complex cells / position tolerance) → hierarchical detection. This biological grounding gives CNNs a strong inductive bias for visual data."}),e.jsx(u,{children:"CNN architecture overview — the pipeline"}),e.jsx("div",{style:{background:"var(--color-background-secondary)",border:"0.5px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-lg)",padding:"1.1rem",marginBottom:"0.75rem"},children:e.jsx("div",{style:{display:"flex",gap:0,alignItems:"center",flexWrap:"wrap",justifyContent:"center"},children:[{label:"Input",sub:"224×224×3",color:"#185FA5"},{label:"Conv+ReLU",sub:"feature maps",color:"#0F6E56"},{label:"Pooling",sub:"downsample",color:"#0F6E56"},{label:"Conv+ReLU",sub:"deeper features",color:"#0F6E56"},{label:"Pooling",sub:"downsample",color:"#0F6E56"},{label:"Flatten",sub:"1D vector",color:"#853E0B"},{label:"FC + Softmax",sub:"classify",color:"#7A2048"}].map(({label:t,sub:a,color:r},p,c)=>e.jsxs("div",{style:{display:"flex",alignItems:"center"},children:[e.jsxs("div",{style:{background:r+"22",border:`1.5px solid ${r}`,borderRadius:"var(--border-radius-md)",padding:"8px 12px",textAlign:"center",minWidth:80},children:[e.jsx("div",{style:{fontSize:12,fontWeight:500,color:r},children:t}),e.jsx("div",{style:{fontSize:10.5,color:r,opacity:.8,marginTop:2},children:a})]}),p<c.length-1&&e.jsx("div",{style:{padding:"0 4px",color:"var(--color-text-tertiary)",fontSize:16},children:"→"})]},t))})}),e.jsx(_,{q:"What is the inductive bias of a CNN and why is it important?",a:"An inductive bias is an assumption baked into the model architecture about the structure of the data. CNNs have two key inductive biases: (1) <strong>Translation equivariance</strong> — moving an object in the image moves its feature map representation, but doesn't require re-learning. (2) <strong>Local connectivity</strong> — nearby pixels are more related than distant ones, so small local filters are more useful than global connections. These assumptions are almost always true for natural images, which is why CNNs generalize so well on visual tasks with far fewer parameters than fully connected networks."}),e.jsx(_,{q:"Why is convolution better than matrix multiplication for images?",a:"Matrix multiplication in a fully connected layer computes a weighted sum of ALL input pixels for each output neuron — no spatial structure is preserved and the same feature detected at different locations requires different weights. Convolution instead applies a small filter locally at each position: (1) It preserves spatial relationships (output[i,j] depends only on a local neighborhood around [i,j]). (2) Weight sharing: the same filter weights detect the same feature everywhere — a single edge detector works anywhere in the image. (3) Parameter count is O(F²×C) for a filter of size F vs O(H×W×C) for a fully connected layer."})]})}const F=[[0,0,0,0,0],[0,10,10,10,0],[0,10,20,10,0],[0,10,10,10,0],[0,0,0,0,0]],W=[[0,-1,0],[-1,4,-1],[0,-1,0]];function G(t,a){const r=t.length-a.length+1,p=t[0].length-a[0].length+1,c=Array.from({length:r},()=>Array(p).fill(0));for(let b=0;b<r;b++)for(let f=0;f<p;f++){let y=0;for(let x=0;x<a.length;x++)for(let h=0;h<a[0].length;h++)y+=t[b+x][f+h]*a[x][h];c[b][f]=y}return c}function q(){const[t,a]=z.useState(0),[r,p]=z.useState(!1),c=z.useRef(null),b=F.length-W.length+1,f=F[0].length-W[0].length+1,y=b*f,x=G(F,W),h=Math.floor(t/f),s=t%f;z.useEffect(()=>(r?c.current=setInterval(()=>{a(l=>l>=y-1?(clearInterval(c.current),p(!1),l):l+1)},900):clearInterval(c.current),()=>clearInterval(c.current)),[r]);const o=48,v=3,n=(l,g,j,m,k)=>l>=m&&l<m+3&&g>=k&&g<k+3?"#EF9F27":"var(--color-background-secondary)",i=()=>{const l=[];for(let j=0;j<3;j++)for(let m=0;m<3;m++){const k=F[h+j][s+m],R=W[j][m];R!==0&&l.push(`(${k}×${R})`)}const g=x[h][s];return{expr:l.join(" + "),result:g}},{expr:d,result:w}=i(),A={display:"inline-grid",gridTemplateColumns:`repeat(${F[0].length},${o}px)`,gap:v},N={display:"inline-grid",gridTemplateColumns:`repeat(${f},${o}px)`,gap:v};return e.jsxs(P,{children:[e.jsxs("div",{style:{display:"flex",gap:32,flexWrap:"wrap",justifyContent:"center",alignItems:"flex-start"},children:[e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx("div",{style:{fontSize:12,color:"var(--color-text-secondary)",marginBottom:8,fontWeight:500},children:"Input (5×5)"}),e.jsx("div",{style:A,children:F.map((l,g)=>l.map((j,m)=>e.jsx("div",{style:{width:o,height:o,display:"flex",alignItems:"center",justifyContent:"center",borderRadius:5,background:n(g,m,!0,h,s),border:g>=h&&g<h+3&&m>=s&&m<s+3?"2px solid #EF9F27":"0.5px solid var(--color-border-tertiary)",fontFamily:"var(--font-mono)",fontSize:14,fontWeight:500,color:g>=h&&g<h+3&&m>=s&&m<s+3?"#412402":"var(--color-text-primary)",transition:"all 0.2s"},children:j},`${g}-${m}`)))})]}),e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx("div",{style:{fontSize:12,color:"var(--color-text-secondary)",marginBottom:8,fontWeight:500},children:"Kernel (3×3)"}),e.jsx("div",{style:{display:"inline-grid",gridTemplateColumns:`repeat(3,${o}px)`,gap:v,marginBottom:8},children:W.map((l,g)=>l.map((j,m)=>e.jsx("div",{style:{width:o,height:o,display:"flex",alignItems:"center",justifyContent:"center",borderRadius:5,background:j!==0?"var(--color-background-info)":"var(--color-background-secondary)",border:`0.5px solid var(--color-border-${j!==0?"info":"tertiary"})`,fontFamily:"var(--font-mono)",fontSize:14,fontWeight:500,color:j!==0?"var(--color-text-info)":"var(--color-text-secondary)"},children:j},`k${g}-${m}`)))}),e.jsx("div",{style:{fontSize:11,color:"var(--color-text-secondary)",textAlign:"center"},children:"Laplacian edge detector"})]}),e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx("div",{style:{fontSize:12,color:"var(--color-text-secondary)",marginBottom:8,fontWeight:500},children:"Output (3×3)"}),e.jsx("div",{style:N,children:Array.from({length:b},(l,g)=>Array.from({length:f},(j,m)=>{const k=g*f+m;return e.jsx("div",{style:{width:o,height:o,display:"flex",alignItems:"center",justifyContent:"center",borderRadius:5,background:k<t?"var(--color-background-info)":k===t?"#1D9E75":"var(--color-background-secondary)",border:k===t?"2px solid #1D9E75":"0.5px solid var(--color-border-tertiary)",fontFamily:"var(--font-mono)",fontSize:14,fontWeight:500,color:k<t?"var(--color-text-info)":k===t?"white":"var(--color-text-tertiary)",transition:"all 0.2s"},children:k<=t?x[g][m]:"?"},`o${g}-${m}`)}))})]})]}),e.jsxs("div",{style:{marginTop:14,padding:"10px 14px",background:"var(--color-background-primary)",border:"0.5px solid var(--color-border-info)",borderRadius:"var(--border-radius-md)",fontFamily:"var(--font-mono)",fontSize:13},children:[e.jsxs("span",{style:{color:"var(--color-text-secondary)"},children:["output[",h,"][",s,"] = "]}),e.jsx("span",{style:{color:"var(--color-text-primary)"},children:d}),e.jsxs("span",{style:{color:"var(--color-text-success)",fontWeight:500},children:[" = ",w]})]}),e.jsxs("div",{style:{display:"flex",gap:8,justifyContent:"center",marginTop:12,alignItems:"center"},children:[e.jsx("button",{onClick:()=>{p(!1),a(0)},style:{padding:"5px 12px",fontSize:12.5,border:"0.5px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:"var(--color-text-secondary)",cursor:"pointer"},children:"⏮ Reset"}),e.jsx("button",{onClick:()=>a(l=>Math.max(0,l-1)),disabled:t===0,style:{padding:"5px 12px",fontSize:12.5,border:"0.5px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:t>0?"var(--color-text-secondary)":"var(--color-text-tertiary)",cursor:t>0?"pointer":"default"},children:"◀ Prev"}),e.jsx("button",{onClick:()=>p(l=>!l),style:{padding:"5px 16px",fontSize:13,fontWeight:500,border:"0.5px solid var(--color-border-info)",borderRadius:"var(--border-radius-md)",background:"var(--color-background-info)",color:"var(--color-text-info)",cursor:"pointer"},children:r?"⏸ Pause":"▶ Auto"}),e.jsx("button",{onClick:()=>a(l=>Math.min(y-1,l+1)),disabled:t>=y-1,style:{padding:"5px 12px",fontSize:12.5,border:"0.5px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-md)",background:"transparent",color:t<y-1?"var(--color-text-secondary)":"var(--color-text-tertiary)",cursor:t<y-1?"pointer":"default"},children:"Next ▶"}),e.jsxs("span",{style:{fontSize:12,color:"var(--color-text-tertiary)",fontFamily:"var(--font-mono)"},children:["Step ",t+1,"/",y]})]})]})}function O(){return e.jsxs("div",{children:[e.jsx(u,{children:"Digital image basics"}),e.jsx(S,{children:"Before understanding convolution, we need to understand what an image actually is in memory."}),e.jsx(C,{block:!0,children:`  Grayscale image:  2D array of integers [0, 255]
    shape = (H, W)          e.g. (28, 28) for MNIST

  RGB color image:  3D array — 3 stacked grayscale images
    shape = (H, W, 3)       e.g. (224, 224, 3) for ImageNet
    channel 0 = Red values
    channel 1 = Green values
    channel 2 = Blue values

  Single pixel RGB = [R, G, B] each in [0, 255]
    (0,0,0)   = black
    (255,255,255) = white
    (255,0,0) = pure red

  In PyTorch convention: (C, H, W)   — channels first
  In Keras convention:   (H, W, C)   — channels last (default)`}),e.jsx(u,{children:"What is the convolution operation?"}),e.jsx(S,{children:"Convolution slides a small matrix (the kernel or filter) across the input image, computing an element-wise dot product at each position. The result at each position is one number in the feature map (output)."}),e.jsx(C,{block:!0,children:`  Formal definition (discrete 2D convolution):

  (I * K)[i, j] = Σₘ Σₙ  I[i+m, j+n] · K[m, n]

  Where:
    I       = input image (or feature map)
    K       = kernel / filter (learnable weights)
    (i, j)  = output position
    (m, n)  = kernel offset coordinates

  Equivalently: at each position, flatten the receptive field
  and compute a dot product with the flattened kernel.

  Output size formula (no padding, stride=1):
    H_out = H_in - F + 1
    W_out = W_in - F + 1

  General formula (with padding P, stride S):
    H_out = ⌊(H_in - F + 2P) / S⌋ + 1`}),e.jsx(u,{children:"Step-by-step convolution tracer"}),e.jsx(S,{children:"Watch the 3×3 kernel (orange) slide across the 5×5 input. Each position computes a dot product and fills one cell in the output. Press Auto to animate, or step manually."}),e.jsx(q,{}),e.jsx(u,{children:"Stride and padding"}),e.jsxs(T,{cols:2,children:[e.jsx(I,{title:"Stride S",children:e.jsx(C,{block:!0,children:`S=1: slide kernel 1 pixel at a time
     → output is large, fine-grained

S=2: skip every other position
     → output is halved in each dim
     → faster, less memory

Example: 6×6 input, 3×3 kernel
  S=1: output = (6-3)/1+1 = 4×4
  S=2: output = (6-3)/2+1 = 2×2`})}),e.jsx(I,{title:"Padding P",children:e.jsx(C,{block:!0,children:`VALID (P=0): no padding
  → output is smaller than input
  → edge pixels contribute less

SAME  (P=(F-1)/2): zero-pad border
  → output same size as input
  → all pixels contribute equally
  → 3×3 kernel needs P=1
  → 5×5 kernel needs P=2

"Same" padding formula:
  P = (F - 1) / 2   (for odd F)`})})]}),e.jsx(u,{children:"RGB image convolution — 3D kernel"}),e.jsx(C,{block:!0,children:`  For RGB input (H, W, 3), a filter is 3D:  (F, F, 3)
  The filter has one 2D slice per channel.

  At each position (i, j):
    output[i,j] = Σ_c Σₘ Σₙ  I[i+m, j+n, c] · K[m, n, c]
                  ↑ sum over channels AND spatial position

  One filter → one 2D feature map  (H_out, W_out)
  N filters  → N feature maps      (H_out, W_out, N)

  So: 32 filters of size (3,3,3) applied to (224,224,3) input:
    Each filter: 3×3×3 = 27 weights + 1 bias = 28 params
    Total: 32 × 28 = 896 parameters
    Output: (222, 222, 32)  [with no padding]`}),e.jsx($,{children:`import numpy as np
import torch
import torch.nn as nn
import torch.nn.functional as F

# ── NumPy: manual 2D convolution (grayscale) ─────────────
def convolve2d(image, kernel, stride=1, padding=0):
    """
    image:  (H, W)
    kernel: (kH, kW)
    Returns feature map of shape (H_out, W_out)
    """
    if padding > 0:
        image = np.pad(image, padding, mode='constant')
    H, W   = image.shape
    kH, kW = kernel.shape
    H_out  = (H - kH) // stride + 1
    W_out  = (W - kW) // stride + 1
    output = np.zeros((H_out, W_out))

    for i in range(0, H_out):
        for j in range(0, W_out):
            # Extract receptive field
            patch = image[i*stride:i*stride+kH, j*stride:j*stride+kW]
            # Dot product with kernel
            output[i, j] = np.sum(patch * kernel)
    return output

# ── Example with edge detection ──────────────────────────
image = np.array([
    [ 0,  0,  0,  0,  0],
    [ 0, 10, 10, 10,  0],
    [ 0, 10, 20, 10,  0],
    [ 0, 10, 10, 10,  0],
    [ 0,  0,  0,  0,  0]], dtype=float)

laplacian = np.array([[ 0,-1, 0],
                       [-1, 4,-1],
                       [ 0,-1, 0]], dtype=float)

feature_map = convolve2d(image, laplacian)
print("Feature map (Laplacian):")
print(feature_map)

# ── PyTorch: Conv2d layer ─────────────────────────────────
# PyTorch convention: (batch, channels, height, width)
x = torch.FloatTensor(image).unsqueeze(0).unsqueeze(0)  # (1,1,5,5)

conv = nn.Conv2d(
    in_channels=1,    # grayscale
    out_channels=1,   # one filter
    kernel_size=3,
    stride=1,
    padding=0,        # VALID
    bias=True
)
# Set weights to Laplacian kernel
with torch.no_grad():
    conv.weight[0,0] = torch.FloatTensor(laplacian)
    conv.bias[0]     = 0

output = conv(x)
print("PyTorch output:", output.squeeze().numpy())

# ── RGB convolution ───────────────────────────────────────
rgb_conv = nn.Conv2d(
    in_channels=3,    # R, G, B
    out_channels=32,  # 32 different feature detectors
    kernel_size=3,
    padding=1,        # SAME padding
    bias=True
)
print(f"\\nRGB conv parameters: {sum(p.numel() for p in rgb_conv.parameters())}")
# = 32 * (3*3*3 + 1) = 32 * 28 = 896

x_rgb = torch.randn(1, 3, 224, 224)   # one RGB image
out   = rgb_conv(x_rgb)
print(f"Input: {list(x_rgb.shape)} → Output: {list(out.shape)}")`}),e.jsx(_,{q:"Why does a 3×3 kernel applied to RGB produce one number, not three?",a:"A filter for RGB input has shape (3, 3, 3) — one 3×3 slice for each color channel. At each spatial position, we compute the sum of element-wise products across ALL three channels simultaneously: output[i,j] = Σ_c Σₘ Σₙ I[i+m,j+n,c]·K[m,n,c]. This collapses the 3 channels into a single value — the filter has learned to respond to specific combinations of color and shape patterns. If we want N different feature detectors, we use N independent filters, each producing one 2D feature map, giving an output depth of N."}),e.jsx(_,{q:"What is the difference between SAME and VALID padding?",a:"<strong>VALID (P=0)</strong>: no padding added. The kernel can only be placed where it fully overlaps the input, so the output is smaller: H_out = H_in − F + 1. Edge pixels are included in fewer kernel positions than center pixels. <strong>SAME (P=(F−1)/2)</strong>: zeros are added around the border so the output has the same spatial dimensions as the input. With P=1 and F=3: H_out = (H_in − 3 + 2×1)/1 + 1 = H_in. SAME padding is standard in modern architectures to avoid rapid spatial shrinkage."})]})}function K(){const[t,a]=z.useState(0),r=[{name:"Vertical edge",k:[[-1,0,1],[-2,0,2],[-1,0,1]],desc:"Sobel X — detects vertical edges (left-right brightness change)"},{name:"Horizontal edge",k:[[-1,-2,-1],[0,0,0],[1,2,1]],desc:"Sobel Y — detects horizontal edges (top-bottom brightness change)"},{name:"Laplacian (all edges)",k:[[0,-1,0],[-1,4,-1],[0,-1,0]],desc:"Responds to any direction of edge — second derivative operator"},{name:"Sharpen",k:[[0,-1,0],[-1,5,-1],[0,-1,0]],desc:"Enhances center pixel, suppresses neighbors — accentuates fine detail"},{name:"Gaussian blur",k:[[1,2,1],[2,4,2],[1,2,1]],desc:"Weighted average emphasizing center — smooths image, removes noise"},{name:"Identity",k:[[0,0,0],[0,1,0],[0,0,0]],desc:"Passes input through unchanged — useful as baseline"}],p=[[0,0,0,0,0,0],[0,50,50,50,0,0],[0,50,100,50,0,0],[0,50,50,50,0,0],[0,0,0,0,80,80],[0,0,0,0,80,80]],c=r[t].k,b=c.flat().reduce((n,i)=>n+i,0),f=b>0?b:1,y=p.length-c.length+1,x=p[0].length-c[0].length+1,h=Array.from({length:y},(n,i)=>Array.from({length:x},(d,w)=>{let A=0;for(let N=0;N<c.length;N++)for(let l=0;l<c[0].length;l++)A+=p[i+N][w+l]*c[N][l];return t===4?Math.round(A/f):A})),s=Math.max(...h.flat().map(Math.abs),1),o=44,v=(n,i=!1)=>{if(i){const N=n/100,l=Math.round(N*100),g=Math.round(N*150),j=Math.round(200-N*100);return`rgb(${l},${g},${j})`}const d=(n+s)/(2*s),w=Math.round(d>.5?(d-.5)*2*200:0),A=Math.round(d<.5?(.5-d)*2*200:0);return`rgb(${w},40,${A})`};return e.jsxs(P,{children:[e.jsx("div",{style:{display:"flex",gap:5,flexWrap:"wrap",marginBottom:12},children:r.map((n,i)=>e.jsx("button",{onClick:()=>a(i),style:{padding:"4px 10px",fontSize:11.5,fontWeight:i===t?500:400,border:`0.5px solid var(--color-border-${i===t?"info":"tertiary"})`,borderRadius:"20px",background:i===t?"var(--color-background-info)":"transparent",color:i===t?"var(--color-text-info)":"var(--color-text-secondary)",cursor:"pointer"},children:n.name},n.name))}),e.jsxs("div",{style:{display:"flex",gap:24,flexWrap:"wrap",justifyContent:"center",alignItems:"flex-start"},children:[e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx("div",{style:{fontSize:11.5,color:"var(--color-text-secondary)",marginBottom:6,fontWeight:500},children:"Input (6×6)"}),e.jsx("div",{style:{display:"inline-grid",gridTemplateColumns:`repeat(6,${o}px)`,gap:2},children:p.map((n,i)=>n.map((d,w)=>e.jsx("div",{style:{width:o,height:o,display:"flex",alignItems:"center",justifyContent:"center",borderRadius:4,background:v(d,!0),fontFamily:"var(--font-mono)",fontSize:12,color:"white",fontWeight:500},children:d},`${i}${w}`)))})]}),e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx("div",{style:{fontSize:11.5,color:"var(--color-text-secondary)",marginBottom:6,fontWeight:500},children:"Kernel (3×3)"}),e.jsx("div",{style:{display:"inline-grid",gridTemplateColumns:`repeat(3,${o}px)`,gap:2,marginBottom:8},children:c.map((n,i)=>n.map((d,w)=>e.jsx("div",{style:{width:o,height:o,display:"flex",alignItems:"center",justifyContent:"center",borderRadius:4,background:d>0?"var(--color-background-success)":d<0?"var(--color-background-danger)":"var(--color-background-secondary)",border:`0.5px solid var(--color-border-${d>0?"success":d<0?"danger":"tertiary"})`,fontFamily:"var(--font-mono)",fontSize:14,fontWeight:500,color:d>0?"var(--color-text-success)":d<0?"var(--color-text-danger)":"var(--color-text-secondary)"},children:d},`k${i}${w}`)))}),e.jsx("div",{style:{fontSize:11,color:"var(--color-text-tertiary)",maxWidth:150},children:r[t].desc})]}),e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx("div",{style:{fontSize:11.5,color:"var(--color-text-secondary)",marginBottom:6,fontWeight:500},children:"Feature Map (4×4)"}),e.jsx("div",{style:{display:"inline-grid",gridTemplateColumns:`repeat(${x},${o}px)`,gap:2},children:h.map((n,i)=>n.map((d,w)=>e.jsx("div",{style:{width:o,height:o,display:"flex",alignItems:"center",justifyContent:"center",borderRadius:4,background:v(d),fontFamily:"var(--font-mono)",fontSize:12,fontWeight:500,color:"white"},children:d},`o${i}${w}`)))})]})]})]})}function U(){return e.jsxs("div",{children:[e.jsx(S,{children:"A kernel is a small matrix of learnable weights. Before training, engineers hand-designed kernels for specific purposes (edge detection, blur, sharpen). CNNs learn the optimal kernels automatically from data."}),e.jsx(u,{children:"Classic hand-crafted kernels"}),e.jsx(S,{children:"Understanding these helps build intuition for what CNNs automatically learn."}),e.jsx(K,{}),e.jsx(u,{children:"Key kernels reference"}),e.jsx(M,{heads:["Kernel name","Matrix","Detects","Red = positive, Blue = negative"],rows:[["Sobel X (vertical edges)","[−1,0,+1]/[−2,0,+2]/[−1,0,+1]","Left-right brightness change","Responds strongly at vertical edges"],["Sobel Y (horizontal edges)","[−1,−2,−1]/[0,0,0]/[+1,+2,+1]","Top-bottom brightness change","Responds strongly at horizontal edges"],["Prewitt X","[−1,0,+1]/[−1,0,+1]/[−1,0,+1]","Vertical edges (simpler)","Like Sobel but equal row weights"],["Laplacian","[0,−1,0]/[−1,+4,−1]/[0,−1,0]","All edges","Second-order derivative — detects any edge direction"],["Gaussian blur (3×3)","[1,2,1]/[2,4,2]/[1,2,1] ÷16","Smoothing/noise removal","Weighted average, center-heavy"],["Sharpen","[0,−1,0]/[−1,+5,−1]/[0,−1,0]","Fine detail enhancement","Center reinforced, neighbors subtracted"],["Emboss","[−2,−1,0]/[−1,+1,+1]/[0,+1,+2]","3D raised effect","Directional derivative"]]}),e.jsx(u,{children:"Feature map dimensions — complete formula"}),e.jsx(C,{block:!0,children:`  Single filter, grayscale input:
    Input:      (H_in, W_in, C_in)
    Kernel:     (F, F, C_in)            (F = filter size)
    Output:     (H_out, W_out, 1)

  H_out = ⌊(H_in - F + 2P) / S⌋ + 1
  W_out = ⌊(W_in - F + 2P) / S⌋ + 1

  N filters → output has depth N:
    N kernels of shape (F, F, C_in)
    Output: (H_out, W_out, N)
    Total kernel params: N × (F × F × C_in + 1)  (+ 1 for bias)

  Worked example — VGG first layer:
    Input:  (224, 224, 3)
    Kernel: F=3, P=1 (SAME), S=1
    Filters: N=64
    H_out = (224 - 3 + 2×1)/1 + 1 = 224   (SAME padding!)
    W_out = 224
    Output: (224, 224, 64)
    Params: 64 × (3×3×3 + 1) = 1,792`}),e.jsx(u,{children:"Receptive field — what each neuron 'sees'"}),e.jsx(C,{block:!0,children:`  Receptive field = region of the ORIGINAL input that influences
  one output neuron (after stacking multiple conv layers).

  Layer 1 (3×3 kernel): receptive field = 3×3 (9 pixels)
  Layer 2 (3×3 kernel): receptive field = 5×5 (25 pixels)
  Layer 3 (3×3 kernel): receptive field = 7×7 (49 pixels)
  ...
  Layer L: receptive field = (2L+1) × (2L+1)

  Key insight: Two stacked 3×3 conv layers have the same
  receptive field as one 5×5 layer, but with:
    Two 3×3 layers: 2 × (3×3) = 18 parameters
    One 5×5 layer:  5×5 = 25 parameters
  → Deeper with FEWER parameters!  (Why VGG uses only 3×3)`}),e.jsx(u,{children:"Multiple filters — what gets learned"}),e.jsx(S,{children:"The first conv layer of a CNN trained on ImageNet learns filters that are remarkably similar to hand-crafted ones — Gabor-like edge detectors at different orientations. Deeper layers learn increasingly complex, abstract patterns."}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8,margin:"0.75rem 0"},children:[{layer:"Layer 1",learns:"Edges, gradients, colors",color:"info"},{layer:"Layer 2",learns:"Textures, corner detectors",color:"info"},{layer:"Layer 3",learns:"Parts: eyes, wheels, fur",color:"success"},{layer:"Layer 4+",learns:"Semantic: face, dog, car",color:"success"}].map(({layer:t,learns:a,color:r})=>e.jsxs("div",{style:{background:`var(--color-background-${r})`,border:`0.5px solid var(--color-border-${r})`,borderRadius:"var(--border-radius-md)",padding:"10px 12px",textAlign:"center"},children:[e.jsx("div",{style:{fontWeight:500,fontSize:12.5,color:`var(--color-text-${r})`,marginBottom:5},children:t}),e.jsx("div",{style:{fontSize:11.5,color:`var(--color-text-${r})`},children:a})]},t))}),e.jsx(_,{q:"Why do CNNs typically use odd-sized kernels (3×3, 5×5, 7×7) rather than even (4×4)?",a:"Odd-sized kernels have a clear center pixel, which makes SAME padding straightforward: P = (F-1)/2. For F=3: P=1. For F=5: P=2. With even-sized kernels there is no single center pixel, making symmetric padding ambiguous and causing off-by-one issues in output dimensions. Additionally, having a center allows the kernel to be conceptually understood as 'this pixel, adjusted by its neighbors,' which aligns with the biological receptive field concept."}),e.jsx(_,{q:"How many parameters does a convolutional layer have vs a fully connected layer?",a:"Conv layer: N × (F×F×C_in + 1) — independent of input spatial size H and W. For 32 filters of 3×3 on 3-channel input: 32×(9×3+1) = 896 parameters. FC layer connecting same input to 32 outputs: H×W×3×32. For a 32×32 image: 32×32×3×32 = 98,304 parameters — 110× more. For 224×224: 4,816,896 parameters — 5,375× more. This is why CNNs scale to high-resolution images while fully connected layers cannot."})]})}function V(){const[t,a]=z.useState("max"),r=[[3,1,4,2],[1,5,9,3],[2,6,5,3],[8,4,7,1]],p=2,c=2,b=r.length/c,f=r[0].length/c,y=(s,o)=>{const v=[];for(let n=0;n<p;n++)for(let i=0;i<p;i++)v.push(r[s*c+n][o*c+i]);return t==="max"?Math.max(...v):Math.round(v.reduce((n,i)=>n+i)/v.length)},x=Array.from({length:b},(s,o)=>Array.from({length:f},(v,n)=>y(o,n))),h=[["#185FA5","#0C447C"],["#0F6E56","#085041"]];return e.jsxs(P,{children:[e.jsx("div",{style:{display:"flex",gap:6,marginBottom:12},children:["max","avg"].map(s=>e.jsx("button",{onClick:()=>a(s),style:{padding:"4px 14px",fontSize:12.5,fontWeight:s===t?500:400,border:`0.5px solid var(--color-border-${s===t?"info":"tertiary"})`,borderRadius:"var(--border-radius-md)",background:s===t?"var(--color-background-info)":"transparent",color:s===t?"var(--color-text-info)":"var(--color-text-secondary)",cursor:"pointer"},children:s==="max"?"Max Pooling":"Average Pooling"},s))}),e.jsxs("div",{style:{display:"flex",gap:24,flexWrap:"wrap",justifyContent:"center",alignItems:"center"},children:[e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx("div",{style:{fontSize:11.5,color:"var(--color-text-secondary)",marginBottom:6,fontWeight:500},children:"Input (4×4)"}),e.jsx("div",{style:{display:"inline-grid",gridTemplateColumns:"repeat(4,48px)",gap:2},children:r.map((s,o)=>s.map((v,n)=>{const i=Math.floor(o/2),d=Math.floor(n/2),w=h[(i*2+d)%2];return e.jsx("div",{style:{width:48,height:48,display:"flex",alignItems:"center",justifyContent:"center",borderRadius:4,background:w[0]+"33",border:`1.5px solid ${w[0]}`,fontFamily:"var(--font-mono)",fontSize:15,fontWeight:500,color:"var(--color-text-primary)"},children:v},`${o}${n}`)}))}),e.jsx("div",{style:{fontSize:10.5,color:"var(--color-text-tertiary)",marginTop:5},children:"4 color-coded 2×2 windows"})]}),e.jsx("div",{style:{fontSize:20,color:"var(--color-text-secondary)"},children:"→"}),e.jsxs("div",{style:{textAlign:"center"},children:[e.jsxs("div",{style:{fontSize:11.5,color:"var(--color-text-secondary)",marginBottom:6,fontWeight:500},children:["Output (2×2) — ",t," pooling"]}),e.jsx("div",{style:{display:"inline-grid",gridTemplateColumns:"repeat(2,48px)",gap:2},children:x.map((s,o)=>s.map((v,n)=>{const i=h[(o*2+n)%2];return e.jsx("div",{style:{width:48,height:48,display:"flex",alignItems:"center",justifyContent:"center",borderRadius:4,background:i[0]+"55",border:`2px solid ${i[0]}`,fontFamily:"var(--font-mono)",fontSize:17,fontWeight:700,color:"var(--color-text-primary)"},children:v},`${o}${n}`)}))}),e.jsx("div",{style:{fontSize:10.5,color:"var(--color-text-tertiary)",marginTop:5},children:t==="max"?"Largest value per window":"Average per window"})]})]})]})}function X(){return e.jsxs("div",{children:[e.jsx(u,{children:"Pooling layers — downsampling with purpose"}),e.jsx(S,{children:"After a conv layer produces feature maps, pooling reduces their spatial dimensions. This makes the representation smaller, cheaper to compute, and more tolerant to small position shifts."}),e.jsx(V,{}),e.jsx(C,{block:!0,children:`  Max Pooling (most common):
    Take the MAXIMUM value in each pool window.
    Effect: keeps the strongest feature activation.
    Meaning: "was this feature detected anywhere in this region?"

  Average Pooling:
    Take the MEAN value in each pool window.
    Effect: smooth representation, less sharp.
    Meaning: "how much was this feature detected on average?"

  Global Average Pooling (GAP):
    One pooling window = entire feature map.
    Output: one number per channel.
    Collapses (H, W, C) → (C,)
    Used at the end of modern CNNs instead of flatten+FC.

  Typical settings: pool_size=2×2, stride=2
    → Halves spatial dimensions: (H,W) → (H/2, W/2)
    → No parameters to learn! Pure aggregation operation.`}),e.jsx(u,{children:"Complete CNN architecture — dimensions traced"}),e.jsx(C,{block:!0,children:`  Example: simple CNN for 32×32 RGB image classification (10 classes)

  Input:        (32, 32, 3)
  ─────────────────────────────────────────────────────────
  Conv(32 filters, 3×3, SAME) + ReLU
                (32, 32, 32)    ← same H,W; 32 feature maps
  MaxPool(2×2, stride=2)
                (16, 16, 32)    ← halved spatial dims
  ─────────────────────────────────────────────────────────
  Conv(64 filters, 3×3, SAME) + ReLU
                (16, 16, 64)    ← deeper feature maps
  MaxPool(2×2, stride=2)
                (8,  8,  64)
  ─────────────────────────────────────────────────────────
  Conv(128 filters, 3×3, SAME) + ReLU
                (8,  8, 128)
  MaxPool(2×2, stride=2)
                (4,  4, 128)
  ─────────────────────────────────────────────────────────
  Flatten
                (2048,)          ← 4×4×128 = 2048
  Dense(256) + ReLU + Dropout(0.5)
                (256,)
  Dense(10) + Softmax
                (10,)            ← class probabilities
  ─────────────────────────────────────────────────────────
  Parameter count:
    Conv 1:  32×(3×3×3+1)   =     896
    Conv 2:  64×(3×3×32+1)  =  18,496
    Conv 3: 128×(3×3×64+1)  =  73,856
    Dense 1: 2048×256+256   = 524,544
    Dense 2:   256×10+10    =   2,570
    Total:                  ≈ 620K parameters (vs 150M+ for ANN!)`}),e.jsx(u,{children:"Why this architecture works — the intuition"}),e.jsx(T,{cols:2,children:[{title:"Conv layers extract features",color:"info",body:"Each conv layer applies many filters to detect patterns at that scale. Early layers: edges. Middle layers: textures, shapes. Late layers: object parts, semantic concepts."},{title:"Pooling provides translation tolerance",color:"info",body:"Max pooling says 'I don't care exactly where this edge was — just whether it exists in this region.' This makes detection robust to small shifts, rotations, and distortions."},{title:"Increasing depth, decreasing size",color:"success",body:"Spatial dims shrink (via pooling) while channel depth grows (more filters). This trades spatial resolution for semantic richness — fewer pixels, but richer per-pixel information."},{title:"FC layers classify the features",color:"success",body:"After the conv stack extracts rich features, fully connected layers combine them into class scores. The flatten converts the spatial feature map to a vector for the classifier."}].map(({title:t,color:a,body:r})=>e.jsxs("div",{style:{background:`var(--color-background-${a})`,border:`0.5px solid var(--color-border-${a})`,borderRadius:"var(--border-radius-md)",padding:"12px 13px"},children:[e.jsx("div",{style:{fontWeight:500,fontSize:13,color:`var(--color-text-${a})`,marginBottom:6},children:t}),e.jsx("div",{style:{fontSize:12.5,color:`var(--color-text-${a})`,lineHeight:1.65},children:r})]},t))}),e.jsx(u,{children:"Complete implementation (Keras)"}),e.jsx($,{children:`import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers

# ── Build CNN for CIFAR-10 (32×32 RGB, 10 classes) ────────
def build_cnn(input_shape=(32,32,3), num_classes=10):
    return keras.Sequential([
        # ── Convolutional block 1 ──────────────────────────
        layers.Conv2D(32, (3,3), padding='same',    # SAME padding
                      kernel_initializer='he_normal',
                      input_shape=input_shape),
        layers.BatchNormalization(),
        layers.Activation('relu'),
        layers.Conv2D(32, (3,3), padding='same',
                      kernel_initializer='he_normal'),
        layers.BatchNormalization(),
        layers.Activation('relu'),
        layers.MaxPooling2D((2,2)),                 # 32×32 → 16×16
        layers.Dropout(0.25),

        # ── Convolutional block 2 ──────────────────────────
        layers.Conv2D(64, (3,3), padding='same',
                      kernel_initializer='he_normal'),
        layers.BatchNormalization(),
        layers.Activation('relu'),
        layers.Conv2D(64, (3,3), padding='same',
                      kernel_initializer='he_normal'),
        layers.BatchNormalization(),
        layers.Activation('relu'),
        layers.MaxPooling2D((2,2)),                 # 16×16 → 8×8
        layers.Dropout(0.25),

        # ── Classifier head ────────────────────────────────
        layers.Flatten(),
        layers.Dense(512, activation='relu',
                     kernel_initializer='he_normal'),
        layers.Dropout(0.5),
        layers.Dense(num_classes, activation='softmax'),
    ])

model = build_cnn()
model.compile(
    optimizer=keras.optimizers.Adam(1e-3),
    loss='sparse_categorical_crossentropy',
    metrics=['accuracy']
)
model.summary()

# ── CIFAR-10 training ─────────────────────────────────────
(X_train, y_train), (X_test, y_test) = keras.datasets.cifar10.load_data()
X_train = X_train.astype('float32') / 255.0  # normalize to [0,1]
X_test  = X_test.astype('float32')  / 255.0

history = model.fit(
    X_train, y_train,
    batch_size=64,
    epochs=50,
    validation_split=0.1,
    callbacks=[
        keras.callbacks.EarlyStopping(patience=10, restore_best_weights=True),
        keras.callbacks.ReduceLROnPlateau(factor=0.5, patience=5)
    ]
)
# Typical result: ~80% test accuracy on CIFAR-10

# ── Visualize learned filters (first layer) ───────────────
import matplotlib.pyplot as plt
import numpy as np

first_layer_filters = model.layers[0].get_weights()[0]  # (3,3,3,32)
fig, axes = plt.subplots(4, 8, figsize=(12, 6))
for i, ax in enumerate(axes.flat):
    f = first_layer_filters[:,:,:,i]
    f = (f - f.min()) / (f.max() - f.min() + 1e-8)  # normalize to [0,1]
    ax.imshow(f); ax.axis('off')
    ax.set_title(f'Filter {i}', fontsize=7)
plt.suptitle('Learned Conv1 Filters', fontweight='bold')
plt.tight_layout(); plt.show()

# ── Feature map visualization ─────────────────────────────
layer_outputs = [l.output for l in model.layers[:8]]
activation_model = keras.Model(inputs=model.input, outputs=layer_outputs)
activations = activation_model.predict(X_test[:1])  # one image

for i, act in enumerate(activations):
    if len(act.shape) == 4:  # conv layer output
        print(f"Layer {i}: shape={act.shape}  "
              f"mean_activation={act.mean():.4f}")`}),e.jsx(u,{children:"CNN limitations"}),e.jsx(T,{cols:3,children:[{title:"Computationally expensive",color:"warning",body:"Deep CNNs require GPUs. Inference on edge devices requires compression (pruning, quantization, MobileNet-style depthwise convolutions)."},{title:"Overfitting on small datasets",color:"warning",body:"CNNs have many parameters and can memorize small datasets. Solutions: data augmentation, dropout, L2 regularization, transfer learning from pretrained models."},{title:"Not equivariant to rotation/scale",color:"danger",body:"CNNs are translation equivariant but NOT rotation equivariant. A tilted cat may not be recognized. Solutions: data augmentation, or specialized architectures (Capsule Networks, STN)."}].map(({title:t,color:a,body:r})=>e.jsxs("div",{style:{background:`var(--color-background-${a})`,border:`0.5px solid var(--color-border-${a})`,borderRadius:"var(--border-radius-md)",padding:"11px 13px"},children:[e.jsx("div",{style:{fontWeight:500,fontSize:12.5,color:`var(--color-text-${a})`,marginBottom:6},children:t}),e.jsx("div",{style:{fontSize:12,color:`var(--color-text-${a})`,lineHeight:1.65},children:r})]},t))}),e.jsx(_,{q:"Why does max pooling provide translation invariance?",a:"Max pooling takes the maximum over a local region (e.g., 2×2). If a feature (like an edge) shifts by 1 pixel within that 2×2 window, max pooling produces the same output — it reports the presence of the feature regardless of its exact position within the window. Stacking multiple pooling layers compounds this: after 3 max-pool layers with 2×2 windows, a feature detected anywhere within an 8×8 region produces the same response. This local invariance accumulates with depth to provide approximate global translation invariance."}),e.jsx(_,{q:"What is Global Average Pooling (GAP) and why is it used instead of Flatten+FC?",a:"GAP takes the spatial average of each feature map, collapsing (H, W, C) → (C,) — one number per channel. Benefits: (1) <strong>No parameters</strong> — the classifier head has no learnable weights in the GAP step, only in the final Dense layer. (2) <strong>Input-size agnostic</strong> — any input size produces the same (C,) vector, enabling multi-scale inference. (3) <strong>Regularization</strong> — forces each feature map to represent a complete class concept rather than specific spatial configurations. Used in GoogLeNet, ResNet, MobileNet instead of the parameter-heavy Flatten+Dense pattern."}),e.jsx(_,{q:"Why stack two 3×3 conv layers instead of one 5×5?",a:"Two 3×3 conv layers have a combined receptive field of 5×5 (same as one 5×5 layer), but: Parameter count — two 3×3: 2×9=18 weights; one 5×5: 25 weights → 28% fewer parameters. Non-linearity — two layers means two ReLU activations, giving more expressive power. Depth — more layers = deeper hierarchy of features. This was the key insight of VGGNet (Simonyan & Zisserman, 2014), which used only 3×3 kernels throughout and achieved excellent results."})]})}const Q=[{id:"intro",label:"CNN Intuition"},{id:"conv",label:"Convolution Op."},{id:"kern",label:"Kernels & Features"},{id:"arch",label:"Pooling & Full Arch"}];function ee(){const[t,a]=z.useState("intro"),r={intro:e.jsx(L,{}),conv:e.jsx(O,{}),kern:e.jsx(U,{}),arch:e.jsx(X,{})};return e.jsxs("div",{children:[e.jsxs("div",{className:"page-header",children:[e.jsx("div",{className:"page-header-eyebrow",children:"Deep Learning — Module 10"}),e.jsx("h1",{className:"page-header-title",children:"CNN Fundamentals: Intuition · Convolution · Kernels · Architecture"}),e.jsx("p",{className:"page-header-subtitle",children:"Chapters 40–42 · Interactive step-by-step tracer · Edge detection demo · Full dimensional analysis"})]}),e.jsx(H,{tabs:Q,active:t,onChange:a}),e.jsx("div",{style:{padding:"0.5rem 0 2rem"},children:r[t]}),e.jsx(B,{moduleId:10})]})}export{ee as default};
