import{r as m,j as e}from"./index-BQO4ci8G.js";import{S as I,H as o,V as B,M as b,G as E,a as P,T as M,Q as y,P as k,N as X,C as F,b as O}from"./SectionNav-BDxYvY3P.js";import{N as $}from"./NavButtons-Bz-HQEP4.js";const H=()=>{const s=m.useRef(null),[a,d]=m.useState(1),[i,n]=m.useState(1),[t,c]=m.useState(0),g=[{x:1.5,y:2,label:1},{x:2,y:2.5,label:1},{x:.5,y:3,label:1},{x:1,y:1.5,label:1},{x:-1.5,y:-1,label:-1},{x:-2,y:-2,label:-1},{x:-.5,y:-2.5,label:-1},{x:-1,y:-1.5,label:-1}];m.useEffect(()=>{const l=s.current;if(!l)return;const r=l.getContext("2d"),u=l.width,x=l.height,h=u/2,w=x/2,v=40,j=(f,z)=>[h+f*v,w-z*v];r.clearRect(0,0,u,x),r.strokeStyle="rgba(128,128,128,0.12)",r.lineWidth=.5;for(let f=-5;f<=5;f++)r.beginPath(),r.moveTo(h+f*v,0),r.lineTo(h+f*v,x),r.stroke(),r.beginPath(),r.moveTo(0,w-f*v),r.lineTo(u,w-f*v),r.stroke();if(r.strokeStyle="rgba(128,128,128,0.4)",r.lineWidth=1,r.beginPath(),r.moveTo(0,w),r.lineTo(u,w),r.stroke(),r.beginPath(),r.moveTo(h,0),r.lineTo(h,x),r.stroke(),r.strokeStyle="#378ADD",r.lineWidth=2,r.beginPath(),Math.abs(i)>.01){const z=-(a*-5+t)/i,_=5,R=-(a*_+t)/i,[W,T]=j(-5,z),[L,A]=j(_,R);r.moveTo(W,T),r.lineTo(L,A)}else{const f=-t/(a||.001),[z]=j(f,0);r.moveTo(z,0),r.lineTo(z,x)}r.stroke(),r.strokeStyle="#EF9F27",r.lineWidth=2;const S=Math.sqrt(a*a+i*i)||1,[D,q]=j(0,0),[C,N]=j(a/S*1.5,i/S*1.5);r.beginPath(),r.moveTo(D,q),r.lineTo(C,N),r.stroke(),r.fillStyle="#EF9F27",r.font="11px var(--font-sans)",r.fillText("w",C+5,N-5),g.forEach(({x:f,y:z,label:_})=>{const T=(a*f+i*z+t>=0?1:-1)===_,[L,A]=j(f,z);r.beginPath(),r.arc(L,A,7,0,Math.PI*2),r.fillStyle=_===1?T?"#1D9E75":"#E24B4A":T?"#378ADD":"#E24B4A",r.fill(),r.strokeStyle=T?"transparent":"#E24B4A",r.lineWidth=T?0:2.5,T||r.stroke()}),r.fillStyle="#378ADD",r.font="12px var(--font-sans)",r.fillText("— decision boundary",8,16),r.fillStyle="#EF9F27",r.fillText("→ weight vector",8,32)},[a,i,t]);const p=g.filter(({x:l,y:r,label:u})=>(a*l+i*r+t>=0?1:-1)===u).length;return e.jsxs("div",{children:[e.jsxs("p",{className:"p",children:["A ",e.jsx("strong",{children:"perceptron"})," is the simplest neural network: a single artificial neuron that computes a ",e.jsx("em",{children:"linear"})," combination of its inputs and emits a binary decision via a step function."]}),e.jsx(o,{children:"Formal definition"}),e.jsx(b,{block:!0,children:`  Given inputs x = [x₁, x₂, ..., xₙ]ᵀ, weights w, bias b:

  z  =  w · x + b  =  Σᵢ wᵢxᵢ + b          (net input)

        ⎧ +1   if z ≥ 0
  ŷ  =  ⎨                                    (step function)
        ⎩ -1   if z < 0

  Decision boundary:  w · x + b = 0          (hyperplane in ℝⁿ)`}),e.jsx(o,{children:"Neuron vs. Perceptron"}),e.jsx(M,{heads:["Dimension","Biological Neuron","Perceptron"],rows:[["Input signal","Dendrites (electrochemical)","Feature values x₁…xₙ"],["Weighting","Synaptic strength","Learnable weights wᵢ"],["Integration","Soma (cell body summation)","Σ wᵢxᵢ + b"],["Threshold","Action potential threshold","Step function at z = 0"],["Output","Spike / no spike (binary)","+1 / −1 (binary)"],["Learning","Hebbian / synaptic plasticity","Perceptron update rule"],["Key difference","Graded, analog, stochastic","Deterministic, discrete"]]}),e.jsx(o,{children:"Geometric intuition — interactive"}),e.jsx(k,{c:"The weight vector <Mx>w</Mx> is always perpendicular to the decision boundary. Points on the <Mx>w</Mx> side get +1; the other side gets −1. Adjust the sliders to rotate and translate the boundary."}),e.jsxs(B,{children:[e.jsx("canvas",{ref:s,width:400,height:320,style:{display:"block",margin:"0 auto",borderRadius:"var(--border-radius-md)"}}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"80px 1fr 48px",alignItems:"center",gap:8,marginTop:12,fontSize:13},children:[{label:"w₁",val:a,set:d},{label:"w₂",val:i,set:n},{label:"bias b",val:t,set:c}].map(({label:l,val:r,set:u})=>e.jsxs("div",{style:{display:"contents"},children:[e.jsx("span",{style:{color:"var(--color-text-secondary)"},children:l}),e.jsx("input",{type:"range",min:"-3",max:"3",step:"0.1",value:r,onChange:x=>u(+x.target.value),style:{width:"100%"}}),e.jsx("span",{style:{fontFamily:"var(--font-mono)",fontSize:12,textAlign:"right",color:"var(--color-text-primary)"},children:r.toFixed(1)})]},l))}),e.jsxs("div",{style:{marginTop:10,fontSize:13,display:"flex",gap:16,justifyContent:"center",flexWrap:"wrap"},children:[e.jsx("span",{style:{color:"#1D9E75"},children:"● class +1"}),e.jsx("span",{style:{color:"#378ADD"},children:"● class −1"}),e.jsx("span",{style:{color:"#E24B4A"},children:"● misclassified"}),e.jsxs("span",{style:{fontWeight:500,color:"var(--color-text-primary)"},children:["Accuracy: ",p,"/8"]})]})]}),e.jsx(O,{children:"Key geometric facts"}),e.jsx(b,{block:!0,children:`  1. The boundary w·x + b = 0 is an (n-1)-dimensional hyperplane.
     In 2D: a line. In 3D: a plane.

  2. The signed distance from point x to the boundary:
        d(x) = (w·x + b) / ‖w‖
     Positive = same side as w (class +1)
     Negative = opposite side (class -1)

  3. Scaling w and b by any positive constant λ:
     — does NOT change the boundary (same hyperplane)
     — DOES change the margin (distance to nearest point)

  4. The bias b shifts the boundary parallel to itself.
     Without b: boundary always passes through origin.`}),e.jsx(o,{children:"Understanding weights"}),e.jsxs("p",{className:"p",children:["Each weight ",e.jsx("code",{className:"math-inline",children:"wᵢ"})," measures the ",e.jsx("em",{children:"contribution"})," (and direction of influence) of feature ",e.jsx("code",{className:"math-inline",children:"xᵢ"})," on the output:"]}),e.jsxs(X,{color:"info",icon:"ti-bulb",children:["Large positive ",e.jsx("strong",{children:"wᵢ"})," → feature xᵢ strongly pushes toward class +1. Large negative wᵢ → strongly pushes toward class −1. Near-zero wᵢ → feature is irrelevant to the decision."]}),e.jsx(o,{children:"Code: Perceptron from scratch"}),e.jsx(P,{children:`import numpy as np

class Perceptron:
    """
    Binary perceptron with step-function output.
    Labels must be +1 / -1.
    """
    def __init__(self, lr=0.1, n_iter=100):
        self.lr = lr
        self.n_iter = n_iter

    def fit(self, X, y):
        n_samples, n_features = X.shape
        self.w = np.zeros(n_features)   # weight vector
        self.b = 0.0                    # bias
        self.errors_ = []

        for _ in range(self.n_iter):
            errors = 0
            for xi, yi in zip(X, y):
                pred = self.predict_single(xi)
                if pred != yi:                  # misclassified
                    self.w += self.lr * yi * xi  # rotate boundary toward xi
                    self.b += self.lr * yi        # translate boundary
                    errors += 1
            self.errors_.append(errors)
            if errors == 0:                     # converged
                break
        return self

    def net_input(self, X):
        return X @ self.w + self.b              # z = w·x + b

    def predict_single(self, x):
        return 1 if self.net_input(x) >= 0 else -1

    def predict(self, X):
        return np.where(self.net_input(X) >= 0, 1, -1)

    def score(self, X, y):
        return np.mean(self.predict(X) == y)

# ─── Usage ───────────────────────────────────────────────
from sklearn.datasets import make_blobs
X, y = make_blobs(n_samples=200, centers=2, random_state=42)
y = np.where(y == 0, -1, 1)    # convert to ±1

p = Perceptron(lr=0.1, n_iter=100)
p.fit(X, y)
print(f"Accuracy: {p.score(X, y):.2%}")
print(f"Weights: {p.w}, Bias: {p.b:.3f}")`}),e.jsx(o,{children:"Interview Q&A"}),e.jsx(y,{q:"What is the mathematical difference between a perceptron and a logistic regression neuron?",a:"Both compute z = w·x + b (linear combination), but differ in the output function. A perceptron applies the Heaviside step function: ŷ = sign(z), producing a hard binary output (+1/−1). Logistic regression applies the sigmoid: ŷ = σ(z) = 1/(1+e^{−z}), producing a probability in (0,1). Logistic regression is differentiable everywhere, enabling gradient-based optimization; the perceptron step function has zero gradient almost everywhere, requiring the special perceptron update rule."}),e.jsx(y,{q:"Why is the bias term necessary? What happens without it?",a:"Without bias, the decision boundary z = w·x = 0 must always pass through the origin. This means the model cannot separate classes whose boundary doesn't intersect the origin — e.g., AND gate labels (0,0)→0, (0,1)→0, (1,0)→0, (1,1)→1 requires a boundary that doesn't pass through origin. The bias b acts as a learnable threshold, giving the boundary translational freedom."}),e.jsx(y,{q:"What does the weight vector w represent geometrically?",a:"w is the normal vector to the decision hyperplane — it points perpendicularly away from the boundary into the positive class region. The magnitude ‖w‖ is inversely related to the margin (distance from boundary to nearest point). The signed distance from any point x to the boundary is (w·x + b)/‖w‖, which is exactly the net input z normalized by weight magnitude."})]})},G=()=>{const[s,a]=m.useState(0),d=[{title:"Initialize",desc:"Set w = 0, b = 0 (or small random values). Pick a learning rate η.",color:"info"},{title:"Pick misclassified point",desc:"Find any point xᵢ where ŷᵢ ≠ yᵢ (i.e., sign(w·xᵢ + b) ≠ yᵢ).",color:"warning"},{title:"Apply the update",desc:`w ← w + η·yᵢ·xᵢ     b ← b + η·yᵢ
This rotates the boundary toward the misclassified point.`,color:"success"},{title:"Repeat",desc:"Cycle through all points. If no misclassification, stop. Otherwise, go to step 2.",color:"info"},{title:"Convergence",desc:"If data is linearly separable, the algorithm is guaranteed to converge in a finite number of steps (Perceptron Convergence Theorem).",color:"success"}];return e.jsxs("div",{children:[e.jsx(k,{children:"The perceptron learning algorithm works by iteratively nudging the decision boundary toward each misclassified point until all points are correctly classified — or until a stopping criterion is met."}),e.jsx(o,{children:"The update rule derived"}),e.jsx(k,{c:"Suppose point <Mx>(xᵢ, yᵢ)</Mx> is misclassified: <Mx>sign(w·xᵢ + b) ≠ yᵢ</Mx>."}),e.jsx(k,{c:"We want to move the boundary so that <Mx>w·xᵢ + b</Mx> becomes more positive (if yᵢ = +1) or more negative (if yᵢ = −1). The update:"}),e.jsx(b,{block:!0,children:`  w_new = w_old + η · yᵢ · xᵢ
  b_new = b_old + η · yᵢ

  where η > 0 is the learning rate.

  Check: what does this do to the score of xᵢ?
    w_new · xᵢ + b_new
  = (w_old + η·yᵢ·xᵢ) · xᵢ + (b_old + η·yᵢ)
  = (w_old · xᵢ + b_old) + η·yᵢ·‖xᵢ‖² + η·yᵢ
  = z_old + η·yᵢ·(‖xᵢ‖² + 1)

  Since η > 0 and ‖xᵢ‖² + 1 > 0:
    yᵢ = +1 → score increases ✓ (want score ≥ 0)
    yᵢ = -1 → score decreases ✓ (want score < 0)`}),e.jsx(o,{children:"Algorithm walkthrough"}),e.jsx("div",{style:{display:"flex",gap:8,marginBottom:12,flexWrap:"wrap"},children:d.map((i,n)=>e.jsxs("button",{onClick:()=>a(n),style:{padding:"6px 14px",fontSize:12.5,fontWeight:n===s?500:400,border:`0.5px solid var(--color-border-${n===s?i.color:"tertiary"})`,borderRadius:"var(--border-radius-md)",background:n===s?`var(--color-background-${i.color})`:"var(--color-background-primary)",color:n===s?`var(--color-text-${i.color})`:"var(--color-text-secondary)",cursor:"pointer"},children:[n+1,". ",i.title]},n))}),e.jsxs("div",{style:{background:`var(--color-background-${d[s].color})`,border:`0.5px solid var(--color-border-${d[s].color})`,borderRadius:"var(--border-radius-lg)",padding:"1rem 1.25rem",minHeight:80},children:[e.jsx("div",{style:{fontWeight:500,fontSize:14,color:`var(--color-text-${d[s].color})`,marginBottom:6},children:d[s].title}),e.jsx("div",{style:{fontSize:13.5,color:`var(--color-text-${d[s].color})`,whiteSpace:"pre-line",lineHeight:1.7},children:d[s].desc})]}),e.jsx(o,{children:"Geometric intuition of the update"}),e.jsx(b,{block:!0,children:`  Case: yᵢ = +1, misclassified (w·xᵢ + b < 0, so point is on wrong side)

  Before update:    w                     (normal vector)
  After update:     w' = w + η·xᵢ         (add the point's position vector)

  Effect: w' is w rotated/pulled toward xᵢ
  → The boundary (perpendicular to w) rotates to move xᵢ
    from the negative region into the positive region.

  Case: yᵢ = -1, misclassified (w·xᵢ + b ≥ 0, so point is on wrong side)

  w' = w - η·xᵢ    (subtract, pull away from xᵢ)
  → Boundary rotates away from xᵢ, pushing it into negative region.`}),e.jsx(o,{children:"Perceptron Convergence Theorem"}),e.jsxs(X,{color:"info",icon:"ti-certificate",children:[e.jsx("strong",{children:"Theorem (Rosenblatt, 1962 / Novikoff, 1962):"})," If the training data is ",e.jsx("em",{children:"linearly separable"}),", the Perceptron algorithm converges in at most ",e.jsx("strong",{children:"(R / γ)²"})," updates, where R = max ‖xᵢ‖ (data radius) and γ = margin (distance from boundary to nearest point)."]}),e.jsx(b,{block:!0,children:`  Formal bound:
    Number of mistakes ≤ (R/γ)²

  where:
    R = max_i ‖xᵢ‖           (max norm of input vectors)
    γ = min_i yᵢ(w*·xᵢ + b*) (margin with unit-norm w*)

  Implication:
    — Convergence is guaranteed for separable data
    — The tighter the margin γ, the more updates required
    — For non-separable data: the algorithm cycles forever!`}),e.jsx(o,{children:"Positive and negative regions"}),e.jsx(k,{children:"The decision boundary splits space into two half-spaces:"}),e.jsx(E,{cols:2,children:[{label:"Positive region (+1)",color:"success",items:["w·x + b > 0","Point on the same side as weight vector w","All +1 labeled points should be here","Increasing any wᵢ pulls boundary away from this side if xᵢ > 0"]},{label:"Negative region (−1)",color:"danger",items:["w·x + b < 0","Point on opposite side from w","All −1 labeled points should be here","Boundary: w·x + b = 0 is the exact dividing surface"]}].map(({label:i,color:n,items:t})=>e.jsx(F,{color:n,title:i,children:t.map(c=>e.jsxs("div",{style:{marginBottom:4},children:["• ",c]},c))},i))}),e.jsx(o,{children:"Full training code"}),e.jsx(P,{children:`import numpy as np
import matplotlib.pyplot as plt

def perceptron_train(X, y, lr=0.1, max_iter=1000):
    """
    X: (n, d) float array
    y: (n,)  int array with values +1 / -1
    Returns: weight vector w, bias b, update history
    """
    n, d = X.shape
    w = np.zeros(d)
    b = 0.0
    history = []          # (w copy, b) at each update

    for epoch in range(max_iter):
        mistakes = 0
        for i in range(n):
            z = w @ X[i] + b
            y_pred = 1 if z >= 0 else -1
            if y_pred != y[i]:              # misclassified
                w = w + lr * y[i] * X[i]   # THE TRICK
                b = b + lr * y[i]
                history.append((w.copy(), b))
                mistakes += 1
        if mistakes == 0:
            print(f"Converged at epoch {epoch+1}")
            break
    return w, b, history

# ─── Visualization of convergence ────────────────────────
def plot_boundary(X, y, w, b, ax, title=""):
    ax.scatter(X[y==1, 0], X[y==1, 1], c='steelblue', s=40, label='+1')
    ax.scatter(X[y==-1, 0], X[y==-1, 1], c='coral', s=40, label='-1')
    if abs(w[1]) > 1e-6:
        x_range = np.linspace(X[:,0].min()-0.5, X[:,0].max()+0.5, 100)
        y_line = -(w[0]*x_range + b) / w[1]
        ax.plot(x_range, y_line, 'k-', linewidth=1.5)
    ax.set_title(title, fontsize=11); ax.legend(fontsize=9)

# Linearly separable data
from sklearn.datasets import make_blobs
X, y_raw = make_blobs(n_samples=100, centers=2, random_state=0, cluster_std=0.8)
y = np.where(y_raw == 0, -1, 1)

w, b, hist = perceptron_train(X, y)
print(f"Total updates: {len(hist)}")
print(f"Final accuracy: {np.mean(np.sign(X@w+b)==y):.1%}")`}),e.jsx(o,{children:"Interview Q&A"}),e.jsx(y,{q:"Derive the perceptron update rule from a geometric argument.",a:"For a misclassified point xᵢ with true label yᵢ = +1, the current w places xᵢ on the wrong side (w·xᵢ + b < 0). We want a new w′ such that w′·xᵢ + b′ > 0. Setting w′ = w + η·xᵢ gives w′·xᵢ = w·xᵢ + η‖xᵢ‖², which increases the score by η‖xᵢ‖² > 0. Geometrically, adding xᵢ to the weight vector rotates w toward xᵢ, which rotates the perpendicular decision boundary so that xᵢ crosses to the correct side. The symmetric argument holds for yᵢ = −1 with subtraction."}),e.jsx(y,{q:"What is the effect of the learning rate η in the perceptron algorithm?",a:"The learning rate η scales the magnitude of each update. For the perceptron, η > 0 only affects the speed of convergence, not whether convergence occurs — since convergence depends only on linear separability. A larger η makes larger rotations per step (faster but potentially oscillatory); a smaller η makes smaller, more conservative updates. Note: this is different from gradient descent where η critically affects convergence stability."}),e.jsx(y,{q:"What happens to the perceptron algorithm on non-linearly separable data?",a:"The algorithm cycles indefinitely — it never converges. Every pass through the data will have at least one misclassification, so updates continue forever without reaching a stable boundary. Practical fixes include: (1) setting a maximum iteration limit, (2) tracking the best solution found so far (Pocket Algorithm), (3) switching to logistic regression with soft probabilities, or (4) using multi-layer networks for non-linear decision boundaries."}),e.jsx(y,{q:"What is the Pocket Algorithm?",a:"The Pocket Algorithm (Gallant, 1986) extends the perceptron for non-separable data. It runs the standard perceptron update but maintains a 'pocket' storing the best weight vector seen so far (the one with the fewest misclassifications on the full training set). When done iterating, it returns the pocket weights, not the current weights. This gives the best linear classifier found rather than a diverging oscillating solution."})]})},V=()=>{const[s,a]=m.useState("perceptron"),d={perceptron:{name:"Perceptron loss",formula:"L = max(0, −y · z)   where z = w·x + b",desc:"Zero for correctly classified points (margin doesn't matter). Non-zero only for misclassified points.",color:"warning",gradient:"∂L/∂w = −y·x  if y·z < 0,  else 0",problem:"Zero gradient for all correctly classified points — no incentive to push them further from the boundary. Equivalent to the perceptron update rule."},hinge:{name:"Hinge loss (SVM)",formula:"L = max(0, 1 − y · z)",desc:"Zero only when the point is correctly classified with a margin of at least 1. Penalizes points that are correct but inside the margin.",color:"info",gradient:"∂L/∂w = −y·x  if y·z < 1,  else 0",problem:"Non-differentiable at z = 1/y. Requires subgradient methods. Not probabilistic."},bce:{name:"Binary cross-entropy",formula:`L = −[y·log(σ(z)) + (1−y)·log(1−σ(z))]
     where σ(z) = 1/(1+e^{−z}), y ∈ {0,1}`,desc:"The log-likelihood loss for Bernoulli outputs. Smooth and differentiable everywhere. Encourages the model to output calibrated probabilities.",color:"success",gradient:"∂L/∂w = (σ(z) − y) · x   [elegant!]",problem:"Requires labels y ∈ {0,1} (not ±1). Can suffer from numerical instability if not implemented with log-sum-exp trick."},mse:{name:"Squared error (MSE on perceptron)",formula:"L = (y − z)²   or   L = (y − σ(z))²",desc:"Intuitive, but problematic for classification: far-from-boundary points get large gradient, pulling incorrectly classified AND correctly classified far points back toward boundary.",color:"danger",gradient:"∂L/∂w = −2(y − z) · x",problem:"Saturated correct predictions still get gradient. Known as the 'saturation' problem. Not recommended for classification."}},i=d[s];return e.jsxs("div",{children:[e.jsx(k,{children:'The perceptron update rule works but has no principled notion of "how wrong" a prediction is. Loss functions formalize this and enable gradient-based optimization over a smooth objective.'}),e.jsx(o,{children:"The problem with the raw perceptron trick"}),e.jsxs(X,{color:"warning",icon:"ti-alert-triangle",children:["The perceptron update fires ",e.jsx("em",{children:"only"})," on misclassified points, with a fixed step size regardless of how badly wrong the prediction is. Two identical misclassifications — one barely wrong, one wildly wrong — get the same update. There is no concept of distance to the boundary."]}),e.jsx(o,{children:"The sigmoid function"}),e.jsx(k,{children:"Before discussing cross-entropy, we need the sigmoid — the bridge between a raw score and a probability:"}),e.jsx(b,{block:!0,children:`  σ(z) = 1 / (1 + e^{-z})      range: (0, 1)

  Properties:
    σ(0)   = 0.5              (uncertain at boundary)
    σ(+∞)  → 1                (strongly positive → class 1)
    σ(-∞)  → 0                (strongly negative → class 0)
    σ(-z)  = 1 - σ(z)         (antisymmetric around 0.5)

  Derivative (crucial for backprop):
    σ'(z) = σ(z) · (1 − σ(z))

  Interpretation:
    ŷ = σ(w·x + b) = P(y=1 | x; w, b)
    1 − ŷ          = P(y=0 | x; w, b)`}),e.jsx(o,{children:"Comparing loss functions"}),e.jsx("div",{style:{display:"flex",gap:6,flexWrap:"wrap",marginBottom:12},children:Object.entries(d).map(([n,t])=>e.jsx("button",{onClick:()=>a(n),style:{padding:"6px 14px",fontSize:12.5,fontWeight:n===s?500:400,border:`0.5px solid var(--color-border-${n===s?t.color:"tertiary"})`,borderRadius:"var(--border-radius-md)",background:n===s?`var(--color-background-${t.color})`:"var(--color-background-primary)",color:n===s?`var(--color-text-${t.color})`:"var(--color-text-secondary)",cursor:"pointer"},children:t.name},n))}),e.jsxs("div",{style:{border:`0.5px solid var(--color-border-${i.color})`,borderRadius:"var(--border-radius-lg)",padding:"1.25rem",background:`var(--color-background-${i.color})`},children:[e.jsx("div",{style:{fontWeight:500,fontSize:15,color:`var(--color-text-${i.color})`,marginBottom:10},children:i.name}),e.jsx("div",{style:{fontFamily:"var(--font-mono)",fontSize:12.5,background:"var(--color-background-primary)",border:"0.5px solid var(--color-border-tertiary)",padding:"8px 12px",borderRadius:"var(--border-radius-md)",marginBottom:10,whiteSpace:"pre",color:"var(--color-text-primary)"},children:i.formula}),e.jsx(k,{style:{marginBottom:6,color:`var(--color-text-${i.color})`},children:i.desc}),e.jsxs("div",{style:{fontSize:12.5,marginBottom:6,color:`var(--color-text-${i.color})`},children:[e.jsx("strong",{children:"Gradient: "}),e.jsx("span",{style:{fontFamily:"var(--font-mono)"},children:i.gradient})]}),e.jsxs("div",{style:{fontSize:12.5,color:`var(--color-text-${i.color})`,background:"rgba(0,0,0,0.04)",borderRadius:"var(--border-radius-md)",padding:"8px 10px"},children:[e.jsx("strong",{children:"Note: "}),i.problem]})]}),e.jsx(o,{children:"Loss landscape — geometric view"}),e.jsx(b,{block:!0,children:`  For a single sample (x, y), as z = w·x + b varies:

  Perceptron:   L(z) = max(0, -yz)
    — zero for z·y ≥ 0 (correct), grows linearly for z·y < 0

  Hinge:        L(z) = max(0, 1 - yz)
    — zero for z·y ≥ 1 (margin satisfied), grows linearly otherwise
    — Note: hinge > perceptron loss (higher, wider penalty zone)

  Log loss:     L(z) = log(1 + e^{-yz})   [equivalent form, y∈{±1}]
    — never truly zero, but exponentially small for large y·z
    — smooth and differentiable everywhere`}),e.jsx(o,{children:"Gradient descent with perceptron loss"}),e.jsxs(X,{color:"info",icon:"ti-trending-down",children:["Gradient descent minimizes a loss by updating parameters in the direction of the negative gradient: ",e.jsx("strong",{children:"w ← w − η · ∂L/∂w"}),". For the perceptron loss, this recovers exactly the perceptron update rule — connecting the trick to formal optimization."]}),e.jsx(b,{block:!0,children:`  Perceptron loss for one sample:
    L = max(0, -y·(w·x + b))

  Subgradient:
    ∂L/∂w = -y·x  if y·(w·x + b) < 0  (misclassified)
           =  0    otherwise

  Gradient descent step:
    w ← w - η · (-y·x) = w + η·y·x        ← same as perceptron trick!
    b ← b - η · (-y)   = b + η·y`}),e.jsx(o,{children:"Cross-entropy loss derivation"}),e.jsx(b,{block:!0,children:`  Model: P(y=1|x) = σ(z) = ŷ
  
  Negative log-likelihood (NLL) for one sample:
    L = -log P(y|x)
      = -[y·log(ŷ) + (1-y)·log(1-ŷ)]       (y ∈ {0,1})

  Gradient (elegantly simplifies via chain rule):
    ∂L/∂z = ŷ - y                           (predicted - true)
    ∂L/∂w = (ŷ - y) · x
    ∂L/∂b = (ŷ - y)

  Note: No explicit σ'(z) in the gradient! It cancels out,
  giving an intuitive form: error × input.`}),e.jsx(o,{children:"Implementation: logistic perceptron with BCE"}),e.jsx(P,{children:`import numpy as np

class LogisticPerceptron:
    """
    Single-neuron logistic classifier trained with
    binary cross-entropy + gradient descent.
    """
    def __init__(self, lr=0.01, n_iter=1000):
        self.lr, self.n_iter = lr, n_iter

    def sigmoid(self, z):
        # Numerically stable sigmoid
        return np.where(z >= 0,
                        1 / (1 + np.exp(-z)),
                        np.exp(z) / (1 + np.exp(z)))

    def fit(self, X, y):
        """y must be 0/1 (not ±1)"""
        n, d = X.shape
        self.w = np.zeros(d)
        self.b = 0.0
        self.loss_history = []

        for _ in range(self.n_iter):
            z = X @ self.w + self.b          # (n,)
            y_hat = self.sigmoid(z)          # P(y=1|x)

            # Binary cross-entropy loss (mean)
            eps = 1e-15
            loss = -np.mean(y * np.log(y_hat + eps)
                          + (1-y) * np.log(1 - y_hat + eps))
            self.loss_history.append(loss)

            # Gradients (vectorized over all samples)
            error = y_hat - y                # (n,)  ← predicted - true
            self.w -= self.lr * (X.T @ error) / n
            self.b -= self.lr * error.mean()

        return self

    def predict_proba(self, X):
        return self.sigmoid(X @ self.w + self.b)

    def predict(self, X, threshold=0.5):
        return (self.predict_proba(X) >= threshold).astype(int)

    def score(self, X, y):
        return np.mean(self.predict(X) == y)

# Hinge loss variant (for SVM-like training)
def hinge_loss_gradient(X, y, w, b):
    """y must be +1 / -1"""
    z = X @ w + b                  # (n,)
    margin = y * z                 # y·(w·x+b)
    mask = margin < 1              # inside margin or wrong side
    dw = -np.mean(y[mask, None] * X[mask], axis=0)
    db = -np.mean(y[mask])
    return dw, db`}),e.jsx(o,{children:"Interview Q&A"}),e.jsx(y,{q:"Why is binary cross-entropy preferred over MSE for classification?",a:"MSE loss (y − ŷ)² suffers from saturation: for sigmoid outputs, when a point is <em>very</em> wrong (e.g., true y=1, predicted ŷ≈0), the gradient ∂MSE/∂w = 2(ŷ−y)·σ′(z)·x becomes tiny because σ′(z) ≈ 0 near saturation — this is the exact opposite of what we want. Cross-entropy loss doesn't have this problem: its gradient is simply (ŷ−y)·x, growing large exactly when predictions are most wrong. Additionally, BCE is the proper negative log-likelihood for Bernoulli outputs, making it the principled maximum-likelihood choice."}),e.jsx(y,{q:"What is the difference between hinge loss and cross-entropy loss?",a:"Hinge loss max(0, 1 − y·z) is piecewise linear and non-differentiable at z = 1/y; it becomes exactly zero once a margin of 1 is achieved (SVM philosophy: 'good enough'). Cross-entropy − log σ(y·z) is smooth everywhere, never exactly zero, and continues to reward pushing points further from the boundary. Hinge loss leads to sparse support vectors; cross-entropy produces calibrated probabilities. Cross-entropy is generally preferred for deep networks due to smooth gradients."}),e.jsx(y,{q:"Derive the gradient of cross-entropy loss with respect to the weights.",a:"L = −[y log σ(z) + (1−y) log(1−σ(z))], z = w·x + b. By chain rule: ∂L/∂w = (∂L/∂z)(∂z/∂w). The first factor: ∂L/∂z = −y(1−σ(z)) + (1−y)σ(z) = σ(z)−y = ŷ−y. The second: ∂z/∂w = x. So ∂L/∂w = (ŷ−y)·x. The σ′(z) term cancels naturally — a key reason why sigmoid + cross-entropy is the standard pairing."}),e.jsx(y,{q:"What does 'calibrated probability' mean and why does BCE encourage it?",a:"A calibrated model means that when it predicts P(y=1|x) = 0.7, approximately 70% of such predictions should be correct. BCE is derived from maximum likelihood estimation of a Bernoulli distribution, which directly optimizes for calibration — the model is penalized not just for wrong hard decisions but for being confident in wrong directions. A model trained with MSE or hinge loss doesn't have this calibration guarantee."})]})},Q=()=>{const s=m.useRef(null),[a,d]=m.useState("xor"),i={xor:{name:"XOR (non-separable)",points:[{x:-1,y:-1,label:1},{x:-1,y:1,label:-1},{x:1,y:-1,label:-1},{x:1,y:1,label:1}]},circle:{name:"Concentric circles",points:[{x:.3,y:.3,label:1},{x:-.3,y:.3,label:1},{x:.2,y:-.3,label:1},{x:-.2,y:-.2,label:1},{x:1.5,y:.2,label:-1},{x:-1.5,y:.3,label:-1},{x:.3,y:1.5,label:-1},{x:-.2,y:-1.5,label:-1}]},linear:{name:"Linearly separable",points:[{x:-1.5,y:-1,label:1},{x:-1,y:-1.5,label:1},{x:-.5,y:-.5,label:1},{x:1.5,y:1,label:-1},{x:1,y:1.5,label:-1},{x:.5,y:.8,label:-1}]}};return m.useEffect(()=>{const n=s.current;if(!n)return;const t=n.getContext("2d"),c=n.width,g=n.height,p=c/2,l=g/2,r=70,u=(h,w)=>[p+h*r,l-w*r];t.clearRect(0,0,c,g),t.strokeStyle="rgba(128,128,128,0.12)",t.lineWidth=.5;for(let h=-3;h<=3;h++)t.beginPath(),t.moveTo(p+h*r,0),t.lineTo(p+h*r,g),t.stroke(),t.beginPath(),t.moveTo(0,l-h*r),t.lineTo(c,l-h*r),t.stroke();t.strokeStyle="rgba(128,128,128,0.35)",t.lineWidth=1,t.beginPath(),t.moveTo(0,l),t.lineTo(c,l),t.stroke(),t.beginPath(),t.moveTo(p,0),t.lineTo(p,g),t.stroke();const x=i[a].points;a==="xor"&&(t.fillStyle="rgba(231,92,76,0.1)",t.fillRect(p,0,c-p,l),t.fillRect(0,l,p,g-l),t.fillStyle="rgba(55,138,221,0.1)",t.fillRect(0,0,p,l),t.fillRect(p,l,c-p,g-l),t.font="11px var(--font-sans)",t.fillStyle="rgba(55,138,221,0.7)",t.fillText("+1",p+10,20),t.fillStyle="rgba(55,138,221,0.7)",t.fillText("+1",10,g-8),t.fillStyle="rgba(231,92,76,0.7)",t.fillText("-1",10,20),t.fillStyle="rgba(231,92,76,0.7)",t.fillText("-1",p+10,g-8),t.fillStyle="rgba(0,0,0,0.5)",t.fillText("No single line can separate these!",p-100,l+20)),x.forEach(({x:h,y:w,label:v})=>{const[j,S]=u(h,w);t.beginPath(),t.arc(j,S,9,0,Math.PI*2),t.fillStyle=v===1?"#378ADD":"#E24B4A",t.fill(),t.fillStyle="#fff",t.font="bold 10px var(--font-sans)",t.textAlign="center",t.textBaseline="middle",t.fillText(v===1?"+":"−",j,S),t.textAlign="start",t.textBaseline="alphabetic"})},[a]),e.jsxs("div",{children:[e.jsxs("p",{className:"p",children:["The perceptron is a powerful idea, but it has a fundamental and well-known limitation: it can only learn ",e.jsx("strong",{children:"linearly separable"})," functions."]}),e.jsx(o,{children:"The XOR problem"}),e.jsxs("p",{className:"p",children:["The XOR function cannot be separated by any single straight line — this was famously proved by Minsky & Papert in their 1969 book ",e.jsx("em",{children:"Perceptrons"}),", which triggered the first “AI winter”."]}),e.jsxs(B,{children:[e.jsx("div",{style:{display:"flex",gap:6,marginBottom:10,flexWrap:"wrap"},children:Object.entries(i).map(([n,{name:t}])=>e.jsx("button",{onClick:()=>d(n),style:{padding:"5px 12px",fontSize:12.5,fontWeight:n===a?500:400,border:`0.5px solid var(--color-border-${n===a?"info":"tertiary"})`,borderRadius:"var(--border-radius-md)",background:n===a?"var(--color-background-info)":"transparent",color:n===a?"var(--color-text-info)":"var(--color-text-secondary)",cursor:"pointer"},children:t},n))}),e.jsx("canvas",{ref:s,width:380,height:280,style:{display:"block",margin:"0 auto",borderRadius:"var(--border-radius-md)"}})]}),e.jsx(o,{children:"XOR truth table — why it fails"}),e.jsx(b,{block:!0,children:`  XOR:  (x₁, x₂) → y
    (-1, -1) → +1    (same sign → +1)
    (-1, +1) → -1    (different → -1)
    (+1, -1) → -1    (different → -1)
    (+1, +1) → +1    (same sign → +1)

  For a linear classifier w₁x₁ + w₂x₂ + b = 0 to work,
  we need:
    w₁(-1) + w₂(-1) + b > 0   → (i)
    w₁(-1) + w₂(+1) + b < 0   → (ii)
    w₁(+1) + w₂(-1) + b < 0   → (iii)
    w₁(+1) + w₂(+1) + b > 0   → (iv)

  Adding (i) and (iv): 2b > 0  →  b > 0
  Adding (ii) and (iii): 2b < 0  →  b < 0
  CONTRADICTION. No solution exists. QED.`}),e.jsx(o,{children:"The complete list of perceptron limitations"}),e.jsx(E,{cols:2,children:[{title:"Linear separability required",icon:"ti-topology-star",color:"danger",desc:"Can only learn linearly separable functions. Fails on XOR, circles, spirals — any non-linear boundary."},{title:"No probabilistic output",icon:"ti-chart-pie",color:"warning",desc:"Hard +1/−1 output gives no confidence estimate. Can't distinguish 'barely positive' from 'strongly positive'."},{title:"Cycles on non-separable data",icon:"ti-refresh",color:"warning",desc:"Algorithm never converges on non-separable data. The Pocket Algorithm is a workaround, not a fix."},{title:"No hidden representation",icon:"ti-layers-difference",color:"danger",desc:"Single layer can't learn compositional features. Can't detect 'eye AND nose' → 'face'."},{title:"Binary inputs/outputs only",icon:"ti-toggle-left",color:"info",desc:"Classical perceptron defined for {0,1} or {±1} only. Continuous-valued extensions require different training."},{title:"No gradient signal when correct",icon:"ti-trending-down",color:"info",desc:"Zero loss for any correctly classified point regardless of margin. No incentive to find a better boundary."}].map(({title:n,icon:t,color:c,desc:g})=>e.jsxs("div",{style:{background:`var(--color-background-${c})`,border:`0.5px solid var(--color-border-${c})`,borderRadius:"var(--border-radius-md)",padding:"12px 14px"},children:[e.jsxs("div",{style:{display:"flex",gap:8,alignItems:"center",marginBottom:6},children:[e.jsx("i",{className:`ti ${t}`,style:{fontSize:16,color:`var(--color-text-${c})`},"aria-hidden":"true"}),e.jsx("div",{style:{fontWeight:500,fontSize:13,color:`var(--color-text-${c})`},children:n})]}),e.jsx("div",{style:{fontSize:12.5,color:`var(--color-text-${c})`,lineHeight:1.6},children:g})]},n))}),e.jsx(o,{children:"Code: PyTorch proves it"}),e.jsx(P,{children:`import torch
import torch.nn as nn

X = torch.tensor([[-1., -1.], [-1., 1.], [1., -1.], [1., 1.]])
y = torch.tensor([[1.], [-1.], [-1.], [1.]])

# ─── Single Perceptron fails on XOR ───────────────────────
single = nn.Linear(2, 1)
opt = torch.optim.SGD(single.parameters(), lr=0.1)
criterion = nn.MSELoss()

for _ in range(5000):
    loss = criterion(torch.sign(single(X)), y)
    opt.zero_grad(); loss.backward(); opt.step()
preds_single = (single(X) >= 0).float() * 2 - 1
print("Perceptron XOR accuracy:",
      (preds_single == y).float().mean().item())  # ≤ 0.75 always

# ─── An MLP CAN solve XOR ─────────────────────────────────
mlp = nn.Sequential(
    nn.Linear(2, 4),          # hidden layer: 2 inputs → 4 neurons
    nn.Tanh(),                 # non-linear activation (ESSENTIAL!)
    nn.Linear(4, 1),          # output layer
    nn.Tanh()
)

opt = torch.optim.Adam(mlp.parameters(), lr=0.05)
for epoch in range(5000):
    loss = nn.MSELoss()(mlp(X), y)
    opt.zero_grad(); loss.backward(); opt.step()
    if epoch % 1000 == 0:
        print(f"Epoch {epoch}, Loss: {loss.item():.6f}")

preds_mlp = torch.sign(mlp(X))
print("\\nMLP XOR accuracy:",
      (preds_mlp == y).float().mean().item())     # 1.0

# ─── What does the hidden layer learn? ────────────────────
with torch.no_grad():
    hidden = torch.tanh(mlp[0](X))  # hidden representation
    print("\\nHidden representations of XOR inputs:")
    for i, pt in enumerate(X):
        print(f"  {pt.tolist()} → h={hidden[i].tolist()}"
              f"  y={y[i].item():.0f}")`}),e.jsx(o,{children:"The path forward: what perceptron limitations motivated"}),e.jsx(M,{heads:["Limitation","Solution","Key innovation"],rows:[["Linear separability only","Multi-layer perceptron (MLP)","Hidden layers + non-linear activations"],["No probabilistic output","Logistic regression / softmax","Sigmoid output + cross-entropy"],["No gradient through step fn.","Backpropagation","Chain rule on differentiable activations"],["Diverges on non-separable data","Gradient descent on smooth loss","Differentiable loss + SGD"],["No feature learning","Deep networks","Hierarchical layer-wise representation"],["Fixed feature space","CNNs / attention","Spatial / sequential inductive bias"]]}),e.jsx(o,{children:"Interview Q&A"}),e.jsx(y,{q:"Prove that XOR cannot be solved by a single perceptron.",a:"Assume a perceptron w₁x₁ + w₂x₂ + b satisfying XOR. The four constraints are: (i) −w₁−w₂+b > 0, (ii) −w₁+w₂+b < 0, (iii) w₁−w₂+b < 0, (iv) w₁+w₂+b > 0. Adding (i) and (iv): 2b > 0. Adding (ii) and (iii): 2b < 0. These are contradictory — no values of w₁, w₂, b can satisfy all four constraints simultaneously. Therefore, no linear classifier can solve XOR. ∎"}),e.jsx(y,{q:"Why did the Minsky & Papert XOR result cause an 'AI winter'?",a:"Their 1969 book <em>Perceptrons</em> rigorously proved that single-layer perceptrons could not learn many simple functions including XOR. The book was widely (though somewhat incorrectly) interpreted as showing that neural networks in general were fatally limited. This led to a decade-long reduction in funding and interest in neural network research. The fix — multi-layer networks trained by backpropagation — was known theoretically but wasn't demonstrated convincingly until Rumelhart, Hinton & Williams in 1986."}),e.jsx(y,{q:"How does adding a hidden layer solve XOR? What does it learn?",a:"The hidden layer performs a non-linear transformation of the input space. In the hidden representation, the XOR-pattern points that were inseparable in the original (x₁, x₂) space become linearly separable. Concretely, the network learns to detect intermediate features (e.g., OR and AND of the inputs) and the output layer combines them. The key requirement is a non-linear activation — without it, composing linear layers is still linear, and XOR remains unsolvable."}),e.jsx(y,{q:"What is the VC dimension of a perceptron in d dimensions, and what does it mean?",a:"The VC (Vapnik-Chervonenkis) dimension of a linear classifier (perceptron) in d-dimensional space is d + 1. This means it can shatter any d+1 points in general position. Shattering means it can classify all 2^(d+1) labelings of those points correctly. The VC dimension quantifies the model's capacity — if training set size n >> VC_dim, generalization is guaranteed; if n << VC_dim, overfitting is likely. A perceptron in 2D has VC dim = 3: it can classify any 3 non-collinear points in all 8 ways but cannot shatter any 4 points."}),e.jsx(y,{q:"What is the difference between a hard-margin and soft-margin classifier?",a:"A hard-margin classifier (classical perceptron, SVM with hard margin) requires all training points to be correctly classified with zero margin violation — it fails completely on non-separable data. A soft-margin classifier (SVM with slack variables ξᵢ) allows some points to violate the margin or even be misclassified, with a penalty C·Σξᵢ in the objective. This makes it robust to outliers and applicable to non-linearly separable data, at the cost of a hyperparameter C controlling the trade-off between margin width and violation penalty."})]})},K=[{id:"what",label:"What is a Perceptron?"},{id:"trick",label:"The Perceptron Trick"},{id:"loss",label:"Loss Functions"},{id:"problems",label:"Problems & Limits"}];function Y(){const[s,a]=m.useState("what"),d={what:e.jsx(H,{}),trick:e.jsx(G,{}),loss:e.jsx(V,{}),problems:e.jsx(Q,{})};return e.jsxs("div",{children:[e.jsxs("div",{className:"page-header",children:[e.jsx("div",{className:"page-header-eyebrow",children:"Deep Learning — Module 02"}),e.jsx("h1",{className:"page-header-title",children:"Perceptrons: From Geometry to Limits"}),e.jsx("p",{className:"page-header-subtitle",children:"Math · Training algorithms · Loss functions · XOR problem"})]}),e.jsx(I,{tabs:K,active:s,onChange:a}),e.jsx("div",{style:{padding:"0.5rem 0 2rem"},children:d[s]}),e.jsx($,{moduleId:2})]})}export{Y as default};
