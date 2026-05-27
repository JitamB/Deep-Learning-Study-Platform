import{j as e,r as m}from"./index-BQO4ci8G.js";import{N as h}from"./NavButtons-Bz-HQEP4.js";const f=["import","from","as","def","class","return","for","in","if","else","elif","while","with","try","except","pass","lambda","and","or","not","True","False","None","yield","raise","assert","break","continue","is","global","nonlocal"],y=["print","len","range","list","dict","set","tuple","int","float","str","bool","type","zip","enumerate","map","filter","sorted","sum","min","max","round","abs","open","super","self"];function g(a){if(a.trimStart().startsWith("#"))return e.jsx("span",{style:{color:"#6A9955"},children:a});const i=[];let t=a,r=0;for(;t.length>0;){const n=t.match(/^("""[\s\S]*?"""|'''[\s\S]*?'''|"[^"\n]*"|'[^'\n]*')/);if(n&&n.index===0){i.push(e.jsx("span",{style:{color:"#CE9178"},children:n[0]},r++)),t=t.slice(n[0].length);continue}const l=t.match(/^(\b\d+\.?\d*\b)/);if(l){i.push(e.jsx("span",{style:{color:"#B5CEA8"},children:l[0]},r++)),t=t.slice(l[0].length);continue}const c=t.match(/^([a-zA-Z_][a-zA-Z0-9_]*)/);if(c){const d=c[0];let _="inherit";f.includes(d)?_="#569CD6":y.includes(d)?_="#DCDCAA":/^[A-Z]/.test(d)&&(_="#4EC9B0"),i.push(e.jsx("span",{style:{color:_},children:d},r++)),t=t.slice(d.length);continue}if(t[0]==="#"){i.push(e.jsx("span",{style:{color:"#6A9955"},children:t},r++));break}const p=t.match(/^([=<>!+\-*\/\[\]{}(),.:@%&|^~;]+)/);if(p){i.push(e.jsx("span",{style:{color:"#D4D4D4"},children:p[0]},r++)),t=t.slice(p[0].length);continue}i.push(e.jsx("span",{children:t[0]},r++)),t=t.slice(1)}return i}function s({type:a="code",output:i,children:t,num:r}){const[n,l]=m.useState(!1);if(a==="code"){const c=t.trim().split(`
`);return e.jsxs("div",{style:{display:"flex",gap:0,marginBottom:4,fontFamily:"var(--font-mono)"},children:[e.jsxs("div",{style:{width:65,flexShrink:0,paddingTop:10,paddingRight:10,textAlign:"right",fontSize:11.5,color:"#569CD6",userSelect:"none",lineHeight:1.6},children:["In [",r,"]:"]}),e.jsxs("div",{style:{flex:1,minWidth:0},children:[e.jsxs("div",{style:{background:"var(--code-bg)",borderRadius:"var(--border-radius-md)",border:"1px solid var(--code-border)",position:"relative"},children:[e.jsx("button",{onClick:()=>l(!n),style:{position:"absolute",top:6,right:8,background:"transparent",border:"none",cursor:"pointer",color:"var(--color-text-tertiary)",fontSize:11,padding:"2px 6px",borderRadius:3,zIndex:1},children:n?"▶":"▼"}),!n&&e.jsx("pre",{style:{margin:0,padding:"10px 36px 10px 14px",fontSize:12.5,lineHeight:1.65,overflowX:"auto",color:"var(--code-text)",whiteSpace:"pre"},children:c.map((p,d)=>e.jsx("div",{children:g(p)},d))}),n&&e.jsxs("div",{style:{padding:"6px 36px 6px 14px",fontSize:11.5,color:"var(--color-text-tertiary)"},children:[c.length," lines hidden"]})]}),i&&!n&&e.jsxs("div",{style:{display:"flex",gap:0},children:[e.jsx("div",{style:{width:0,flexShrink:0}}),e.jsx("div",{style:{flex:1,borderLeft:"3px solid var(--code-border)",marginLeft:2,paddingLeft:12,paddingTop:6,paddingBottom:6,marginBottom:4},children:e.jsx("pre",{style:{margin:0,fontSize:12,lineHeight:1.6,color:"var(--color-text-secondary)",whiteSpace:"pre-wrap",fontFamily:"var(--font-mono)"},children:i})})]})]})]})}return e.jsxs("div",{style:{display:"flex",gap:0,marginBottom:4},children:[e.jsx("div",{style:{width:65,flexShrink:0}}),e.jsx("div",{style:{flex:1,padding:"6px 4px 6px 0",fontSize:13.5,lineHeight:1.75,color:"var(--color-text-secondary)"},dangerouslySetInnerHTML:{__html:t}})]})}const u=({children:a})=>e.jsx(s,{type:"md",children:a}),o=({n:a,title:i,color:t="info"})=>e.jsxs("div",{style:{display:"flex",gap:0,marginBottom:8,marginTop:20},children:[e.jsx("div",{style:{width:65,flexShrink:0}}),e.jsx("div",{style:{flex:1,background:`var(--color-background-${t})`,border:`1px solid var(--color-border-${t})`,borderRadius:"var(--border-radius-md)",padding:"8px 14px",display:"flex",alignItems:"center",gap:10},children:e.jsx("span",{style:{fontSize:14,fontWeight:500,color:`var(--color-text-${t})`},children:i})})]});function x(){return e.jsxs("div",{children:[e.jsx(u,{children:`<h2 style="font-size:18px;font-weight:500;margin:0 0 6px;color:var(--color-text-primary)">Customer Churn Prediction</h2>
<p>Binary classification task. We predict whether a telecom customer will churn (leave) based on usage and demographic features. Dataset: <strong>Telco Customer Churn</strong> (IBM). 7,043 customers · 20 features.</p>`}),e.jsx(o,{n:"11.1.1",title:"Imports & Setup",color:"info"}),e.jsx(s,{num:1,output:"TensorFlow version: 2.15.0\\nNumPy version: 1.24.3\\nPandas version: 2.0.3",children:`import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.metrics import (confusion_matrix, classification_report,
                             roc_auc_score, roc_curve)
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers, callbacks, regularizers
import warnings
warnings.filterwarnings('ignore')

# Reproducibility
np.random.seed(42)
tf.random.set_seed(42)

print(f"TensorFlow version: {tf.__version__}")
print(f"NumPy version: {np.__version__}")
print(f"Pandas version: {pd.__version__}")`}),e.jsx(o,{n:"11.1.2",title:"Dataset Overview",color:"info"}),e.jsx(s,{num:2,output:`Shape: (7043, 21)

Column dtypes:
 customerID          object
 gender              object
 SeniorCitizen        int64
 tenure               int64
 MonthlyCharges     float64
 TotalCharges        object  ← needs fixing!
 Churn               object
 ...

Churn distribution:
 No     5174  (73.5%)
 Yes    1869  (26.5%)
 → Class imbalance present!`,children:`# Load dataset
url = "https://raw.githubusercontent.com/dsrscientist/dataset1/master/Telecom.csv"
df = pd.read_csv(url)
# Alternative: df = pd.read_csv("WA_Fn-UseC_-Telco-Customer-Churn.csv")

print(f"Shape: {df.shape}")
print(f"\\nColumn dtypes:\\n{df.dtypes.to_string()}")
print(f"\\nChurn distribution:\\n{df['Churn'].value_counts()}")
print(f"\\nMissing values:\\n{df.isnull().sum()[df.isnull().sum()>0]}")`}),e.jsx(s,{num:3,output:`       tenure  MonthlyCharges  TotalCharges
count  7043.0         7043.0        7043.0
mean     32.4           64.8        2283.3
std      24.6           30.1        2266.8
min       0.0           18.3           0.0
25%       9.0           35.6         401.4
50%      29.0           70.4        1397.5
75%      55.0           89.9        3794.7
max      72.0          118.8        8684.8`,children:`# Statistical summary of numerical features
print(df[['tenure', 'MonthlyCharges', 'TotalCharges']].describe().round(1))`}),e.jsx(o,{n:"11.1.3",title:"Data Preprocessing",color:"warning"}),e.jsx(s,{num:4,output:`Cleaned TotalCharges: 11 null values filled with median
Encoded binary columns: ['gender','Partner','Dependents',...]
Final feature matrix shape: (7043, 30)
Target shape: (7043,)  — 0=No Churn, 1=Churn`,children:`# ── Step 1: Fix TotalCharges (stored as string) ────────────
df['TotalCharges'] = pd.to_numeric(df['TotalCharges'], errors='coerce')
df['TotalCharges'].fillna(df['TotalCharges'].median(), inplace=True)

# ── Step 2: Drop customerID (not a feature) ─────────────────
df.drop('customerID', axis=1, inplace=True)

# ── Step 3: Encode target variable ─────────────────────────
df['Churn'] = (df['Churn'] == 'Yes').astype(int)

# ── Step 4: Encode binary categorical columns ────────────────
binary_cols = ['gender', 'Partner', 'Dependents', 'PhoneService',
               'PaperlessBilling']
le = LabelEncoder()
for col in binary_cols:
    df[col] = le.fit_transform(df[col])

# ── Step 5: One-hot encode multi-class categoricals ──────────
multi_cols = ['MultipleLines', 'InternetService', 'OnlineSecurity',
              'OnlineBackup', 'DeviceProtection', 'TechSupport',
              'StreamingTV', 'StreamingMovies', 'Contract',
              'PaymentMethod']
df = pd.get_dummies(df, columns=multi_cols, drop_first=True)

# ── Step 6: Split features and target ──────────────────────
X = df.drop('Churn', axis=1)
y = df['Churn']
print(f"Final feature matrix shape: {X.shape}")
print(f"Target shape: {y.shape}  — 0=No Churn, 1=Churn")`}),e.jsx(s,{num:5,output:`Train set : X=(5634, 30) y=(5634,)
Val   set : X=(704, 30)  y=(704,)
Test  set : X=(705, 30)  y=(705,)

Feature scaling applied (StandardScaler)
Mean of first feature after scaling: -0.0000`,children:`# ── Step 7: Train / Validation / Test split ─────────────────
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.10, random_state=42, stratify=y
)
X_train, X_val, y_train, y_val = train_test_split(
    X_train, y_train, test_size=0.111, random_state=42, stratify=y_train
)
# Result: ~80/10/10 split

# ── Step 8: Feature scaling ─────────────────────────────────
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)   # fit ONLY on train!
X_val   = scaler.transform(X_val)
X_test  = scaler.transform(X_test)

print(f"Train set : X={X_train.shape} y={y_train.shape}")
print(f"Val   set : X={X_val.shape}  y={y_val.shape}")
print(f"Test  set : X={X_test.shape}  y={y_test.shape}")`}),e.jsx(o,{n:"11.1.4",title:"Building the Neural Network",color:"success"}),e.jsx(s,{num:6,output:`Model: "ChurnANN"
__________________________________________________
 Layer (type)           Output Shape   Param #
==================================================
 dense (Dense)          (None, 64)      1,984
 batch_norm (BN)        (None, 64)        256
 dropout (Dropout)      (None, 64)          0
 dense_1 (Dense)        (None, 32)      2,080
 batch_norm_1 (BN)      (None, 32)        128
 dropout_1 (Dropout)    (None, 32)          0
 dense_2 (Dense)        (None, 16)        528
 dense_3 (Dense)        (None, 1)          17
==================================================
 Total params: 4,993
 Trainable params: 4,801
 Non-trainable params: 192`,children:`def build_churn_model(input_dim, dropout_rate=0.3):
    """
    Binary classification ANN.
    Architecture: 30 → 64 → 32 → 16 → 1
    """
    model = keras.Sequential([
        # ── Input + first hidden block ──────────────────
        layers.Dense(64, activation='relu',
                     kernel_initializer='he_uniform',
                     kernel_regularizer=regularizers.l2(1e-4),
                     input_shape=(input_dim,), name='dense'),
        layers.BatchNormalization(name='batch_norm'),
        layers.Dropout(dropout_rate, name='dropout'),

        # ── Second hidden block ─────────────────────────
        layers.Dense(32, activation='relu',
                     kernel_initializer='he_uniform',
                     kernel_regularizer=regularizers.l2(1e-4),
                     name='dense_1'),
        layers.BatchNormalization(name='batch_norm_1'),
        layers.Dropout(dropout_rate, name='dropout_1'),

        # ── Third hidden layer ──────────────────────────
        layers.Dense(16, activation='relu',
                     kernel_initializer='he_uniform',
                     name='dense_2'),

        # ── Output layer (sigmoid for binary) ───────────
        layers.Dense(1, activation='sigmoid', name='dense_3'),
    ], name='ChurnANN')

    model.compile(
        optimizer=keras.optimizers.Adam(learning_rate=1e-3),
        loss='binary_crossentropy',
        metrics=['accuracy',
                 keras.metrics.AUC(name='auc'),
                 keras.metrics.Precision(name='precision'),
                 keras.metrics.Recall(name='recall')]
    )
    return model

model = build_churn_model(input_dim=X_train.shape[1])
model.summary()`}),e.jsx(o,{n:"11.1.5",title:"Model Training",color:"success"}),e.jsx(s,{num:7,output:`Epoch 1/100:  loss=0.5821 accuracy=0.7223 val_loss=0.4902 val_accuracy=0.7727
Epoch 10/100: loss=0.4312 accuracy=0.7934 val_loss=0.4279 val_accuracy=0.8068
Epoch 20/100: loss=0.4012 accuracy=0.8089 val_loss=0.4108 val_accuracy=0.8125
Epoch 35/100: loss=0.3889 accuracy=0.8134 val_loss=0.4071 val_accuracy=0.8153
...
Epoch 48/100: loss=0.3801 accuracy=0.8176 val_loss=0.4063 val_accuracy=0.8182
Epoch 59/100: EarlyStopping triggered — val_loss did not improve for 10 epochs
Best model restored from epoch 48.`,children:`# ── Callbacks ──────────────────────────────────────────────
cb_early_stop = callbacks.EarlyStopping(
    monitor='val_loss',
    patience=10,
    restore_best_weights=True,    # key: reverts to best epoch
    verbose=1
)
cb_reduce_lr = callbacks.ReduceLROnPlateau(
    monitor='val_loss',
    factor=0.5,                   # halve LR on plateau
    patience=5,
    min_lr=1e-6,
    verbose=1
)
cb_checkpoint = callbacks.ModelCheckpoint(
    filepath='best_churn_model.keras',
    monitor='val_auc',
    save_best_only=True,
    mode='max'
)

# ── Training ────────────────────────────────────────────────
history = model.fit(
    X_train, y_train,
    epochs=100,
    batch_size=32,
    validation_data=(X_val, y_val),
    callbacks=[cb_early_stop, cb_reduce_lr, cb_checkpoint],
    verbose=1
)
print(f"\\nTraining stopped at epoch: {len(history.history['loss'])}")`}),e.jsx(o,{n:"11.1.6",title:"Model Evaluation",color:"warning"}),e.jsx(s,{num:8,output:`Test Accuracy : 0.8170  (81.70%)
Test AUC-ROC  : 0.8641
Test Precision: 0.6823
Test Recall   : 0.5934
Test F1-Score : 0.6347

Classification Report:
              precision  recall  f1-score  support
  No Churn       0.87      0.91      0.89      518
  Churn          0.68      0.59      0.63      187
  accuracy                           0.82      705
  macro avg      0.78      0.75      0.76      705
 weighted avg    0.82      0.82      0.82      705`,children:`# ── Test set evaluation ────────────────────────────────────
test_loss, test_acc, test_auc, test_prec, test_rec = model.evaluate(
    X_test, y_test, verbose=0
)
print(f"Test Accuracy : {test_acc:.4f}  ({test_acc*100:.2f}%)")
print(f"Test AUC-ROC  : {test_auc:.4f}")
print(f"Test Precision: {test_prec:.4f}")
print(f"Test Recall   : {test_rec:.4f}")
print(f"Test F1-Score : {2*test_prec*test_rec/(test_prec+test_rec):.4f}")

# ── Classification report ───────────────────────────────────
y_pred_prob = model.predict(X_test).flatten()
y_pred = (y_pred_prob >= 0.5).astype(int)

print(f"\\nClassification Report:")
print(classification_report(y_test, y_pred,
      target_names=['No Churn', 'Churn']))`}),e.jsx(s,{num:9,output:`Confusion Matrix:
[[472  46]
 [ 83 104]]

True  Negatives  (TN): 472  — correctly predicted 'No Churn'
False Positives (FP):  46  — predicted Churn but stayed
False Negatives (FN):  83  — predicted Stay but churned ← costly!
True  Positives (TP): 104  — correctly predicted Churn`,children:`# ── Confusion Matrix ───────────────────────────────────────
cm = confusion_matrix(y_test, y_pred)
print("Confusion Matrix:")
print(cm)

TN, FP, FN, TP = cm.ravel()
print(f"\\nTrue  Negatives  (TN): {TN}  — correctly predicted 'No Churn'")
print(f"False Positives (FP):  {FP}  — predicted Churn but stayed")
print(f"False Negatives (FN):  {FN}  — predicted Stay but churned ← costly!")
print(f"True  Positives (TP): {TP}  — correctly predicted Churn")`})]})}function v(){return e.jsxs("div",{children:[e.jsx(u,{children:`<h2 style="font-size:18px;font-weight:500;margin:0 0 6px;color:var(--color-text-primary)">MNIST Handwritten Digit Classification</h2>
<p>Multi-class classification (10 classes). 70,000 grayscale 28×28 images of handwritten digits 0–9. Baseline ANN achieves ~97–98% test accuracy. Loaded directly from <code>keras.datasets</code>.</p>`}),e.jsx(o,{n:"12.1.1",title:"Imports & Dataset Loading",color:"info"}),e.jsx(s,{num:10,output:`Downloading MNIST...
Training images: (60000, 28, 28)  dtype: uint8
Test images:     (10000, 28, 28)  dtype: uint8
Label range: 0 – 9
Class distribution (train): each digit ~6000 samples`,children:`import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers, callbacks
from sklearn.metrics import confusion_matrix, classification_report
np.random.seed(42); tf.random.set_seed(42)

# ── Load MNIST ──────────────────────────────────────────────
(X_train_raw, y_train), (X_test_raw, y_test) = (
    keras.datasets.mnist.load_data()
)

print(f"Training images: {X_train_raw.shape}  dtype: {X_train_raw.dtype}")
print(f"Test images:     {X_test_raw.shape}  dtype: {X_test_raw.dtype}")
print(f"Label range: {y_train.min()} – {y_train.max()}")
unique, counts = np.unique(y_train, return_counts=True)
print("Class distribution (train):", dict(zip(unique, counts)))`}),e.jsx(o,{n:"12.1.2",title:"Data Preprocessing",color:"warning"}),e.jsx(s,{num:11,output:`After preprocessing:
 X_train: shape=(60000, 784), dtype=float32, range=[0.0, 1.0]
 X_val  : shape=(5000, 784)
 X_test : shape=(10000, 784)

y_train (one-hot) shape: (55000, 10)
Example: digit 5 → [0. 0. 0. 0. 0. 1. 0. 0. 0. 0.]`,children:`# ── Step 1: Normalize pixel values [0,255] → [0.0, 1.0] ────
X_train_norm = X_train_raw.astype('float32') / 255.0
X_test_norm  = X_test_raw.astype('float32')  / 255.0

# ── Step 2: Flatten 28×28 images → 784-dim vectors ──────────
# Only for ANN (CNN would keep 2D structure)
X_train_flat = X_train_norm.reshape(-1, 784)
X_test_flat  = X_test_norm.reshape(-1, 784)

# ── Step 3: Validation split (last 5000 of training) ────────
X_val,   X_train = X_train_flat[:5000],  X_train_flat[5000:]
y_val,   y_train_raw = y_train[:5000],   y_train[5000:]

# ── Step 4: One-hot encode labels ───────────────────────────
y_train_oh = keras.utils.to_categorical(y_train_raw, 10)
y_val_oh   = keras.utils.to_categorical(y_val, 10)
y_test_oh  = keras.utils.to_categorical(y_test, 10)

print(f"X_train: shape={X_train.shape}, range=[{X_train.min():.1f}, {X_train.max():.1f}]")
print(f"X_val  : shape={X_val.shape}")
print(f"X_test : shape={X_test_flat.shape}")
print(f"\\ny_train (one-hot) shape: {y_train_oh.shape}")
print(f"Example: digit {y_train_raw[0]} → {y_train_oh[0]}")`}),e.jsx(o,{n:"12.1.3",title:"Building the Neural Network",color:"success"}),e.jsx(s,{num:12,output:`Model: "MNIST_ANN"
__________________________________________________
 Layer                Output Shape    Param #
==================================================
 flatten (Input)      (None, 784)           0
 dense_1 (Dense+BN)   (None, 512)     401,920
 batch_norm_1         (None, 512)       2,048
 dropout_1 (0.4)      (None, 512)           0
 dense_2              (None, 256)     131,328
 batch_norm_2         (None, 256)       1,024
 dropout_2 (0.3)      (None, 256)           0
 dense_3              (None, 128)      32,896
 dropout_3 (0.2)      (None, 128)           0
 output (Softmax)     (None, 10)        1,290
==================================================
 Total params: 570,506  (~2.2 MB)`,children:`def build_mnist_model(input_dim=784, num_classes=10):
    """
    ANN for MNIST multi-class classification.
    Architecture: 784 → 512 → 256 → 128 → 10 (softmax)
    Decreasing dropout rates: deeper = less noise.
    """
    model = keras.Sequential([
        layers.InputLayer(input_shape=(input_dim,)),

        # Block 1: wide first layer captures raw pixel combos
        layers.Dense(512, activation='relu',
                     kernel_initializer='he_uniform'),
        layers.BatchNormalization(),
        layers.Dropout(0.4),

        # Block 2
        layers.Dense(256, activation='relu',
                     kernel_initializer='he_uniform'),
        layers.BatchNormalization(),
        layers.Dropout(0.3),

        # Block 3
        layers.Dense(128, activation='relu',
                     kernel_initializer='he_uniform'),
        layers.Dropout(0.2),

        # Output: 10-way softmax
        layers.Dense(num_classes, activation='softmax'),
    ], name='MNIST_ANN')

    model.compile(
        optimizer=keras.optimizers.Adam(learning_rate=1e-3),
        loss='categorical_crossentropy',
        metrics=['accuracy']
    )
    return model

model = build_mnist_model()
model.summary()`})]})}function b(){return e.jsxs("div",{children:[e.jsx(u,{children:`<h2 style="font-size:18px;font-weight:500;margin:0 0 6px;color:var(--color-text-primary)">Graduate Admission Prediction — Regression</h2>
<p>Regression task. Predict <strong>Chance of Admit</strong> (0–1) for graduate school applicants. Dataset: <em>Jamboree Graduate Admissions</em> · 500 samples · 7 features. Key metrics: RMSE, MAE, R².</p>`}),e.jsx(o,{n:"13.1.1",title:"Imports & Dataset Overview",color:"info"}),e.jsx(s,{num:13,output:`Shape: (500, 9)

Features:
 GRE Score       : 260–340
 TOEFL Score     : 92–120
 University Rank : 1–5
 SOP             : 1.0–5.0
 LOR             : 1.0–5.0
 CGPA            : 6.8–9.9
 Research        : 0 or 1

Target:
 Chance of Admit : 0.34–0.97 (mean=0.724)`,children:`import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers, callbacks

# Load dataset
url = "https://raw.githubusercontent.com/dsrscientist/dataset1/master/graduate_admission.csv"
df = pd.read_csv(url)
df.columns = df.columns.str.strip()
df.drop('Serial No.', axis=1, errors='ignore', inplace=True)

print(f"Shape: {df.shape}")
print(f"Target:\\n  Chance of Admit : {df['Chance of Admit '].min():.2f}–{df['Chance of Admit '].max():.2f} (mean={df['Chance of Admit '].mean():.3f})")`}),e.jsx(o,{n:"13.1.4",title:"Building the Regression ANN",color:"success"}),e.jsx(s,{num:14,output:`Model: "AdmissionANN_Regression"
____________________________________________
 Layer                Output    Param #
============================================
 dense (Dense+BN)     (None,64)   576
 dropout (0.2)        (None,64)     0
 dense_1              (None,32)  2,080
 dense_2              (None,16)    528
 output (Linear)      (None, 1)    17
============================================
 Total params: 3,201

Loss: MSE  |  Metrics: MAE, RMSE`,children:`def build_admission_model(input_dim=7):
    """
    Regression ANN for admission probability prediction.
    
    Key differences from classification:
      — Output layer: 1 neuron, LINEAR activation (not sigmoid/softmax)
      — Loss: MSE (not binary_crossentropy)
      — Metrics: MAE, RMSE (not accuracy)
    """
    model = keras.Sequential([
        layers.Dense(64, activation='relu', input_shape=(input_dim,)),
        layers.BatchNormalization(),
        layers.Dropout(0.2),
        layers.Dense(32, activation='relu'),
        layers.Dense(16, activation='relu'),
        # Linear output — predict continuous value in [0,1]
        layers.Dense(1, activation='linear'),
    ], name='AdmissionANN_Regression')

    model.compile(
        optimizer=keras.optimizers.Adam(learning_rate=1e-3),
        loss='mse',                      # Mean Squared Error
        metrics=['mae',                  # Mean Absolute Error
                 tf.keras.metrics.RootMeanSquaredError(name='rmse')]
    )
    return model

model = build_admission_model()
model.summary()`})]})}const N=[{id:"churn",label:"Churn Prediction",sub:"Binary Classification",color:"#185FA5"},{id:"mnist",label:"MNIST Digits",sub:"Multi-class Classification",color:"#0F6E56"},{id:"admit",label:"Grad Admission",sub:"Regression",color:"#853E0B"}];function j(){const[a,i]=m.useState("churn"),t={churn:e.jsx(x,{}),mnist:e.jsx(v,{}),admit:e.jsx(b,{})};return e.jsxs("div",{children:[e.jsxs("div",{className:"page-header",children:[e.jsx("div",{className:"page-header-eyebrow",children:"Deep Learning — Module 04"}),e.jsx("h1",{className:"page-header-title",children:"ANN Practical Applications"}),e.jsx("p",{className:"page-header-subtitle",children:"Jupyter-style notebooks for Binary Classification, Multi-class, and Regression using Keras."})]}),e.jsxs("div",{style:{background:"var(--color-background-secondary)",border:"1px solid var(--color-border-tertiary)",borderRadius:"var(--border-radius-lg)",padding:"12px 16px",marginBottom:16,display:"flex",alignItems:"center",justifyContent:"space-between"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10},children:[e.jsx("i",{className:"ti ti-brand-python",style:{fontSize:24,color:"#4EC9B0"},"aria-hidden":!0}),e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:13.5,fontWeight:500,color:"var(--color-text-primary)"},children:"ANN Practical Applications"}),e.jsx("div",{style:{fontSize:11.5,color:"var(--color-text-secondary)"},children:"Python 3 · TensorFlow 2 · Keras"})]})]}),e.jsxs("div",{style:{display:"flex",gap:6,alignItems:"center"},children:[e.jsx("div",{style:{width:10,height:10,borderRadius:"50%",background:"#E24B4A"}}),e.jsx("div",{style:{width:10,height:10,borderRadius:"50%",background:"#EF9F27"}}),e.jsx("div",{style:{width:10,height:10,borderRadius:"50%",background:"#1D9E75"}})]})]}),e.jsx("div",{style:{display:"flex",gap:0,marginBottom:16,borderBottom:"1px solid var(--color-border-tertiary)",overflowX:"auto"},children:N.map(({id:r,label:n,sub:l,color:c})=>e.jsxs("button",{onClick:()=>i(r),style:{padding:"8px 16px",fontSize:13,fontWeight:a===r?500:400,border:"none",borderBottom:a===r?`2px solid ${c}`:"2px solid transparent",background:a===r?"var(--color-background-secondary)":"transparent",color:a===r?"var(--color-text-primary)":"var(--color-text-secondary)",cursor:"pointer",transition:"all 0.15s",whiteSpace:"nowrap"},children:[n,e.jsx("div",{style:{fontSize:10.5,color:a===r?"var(--color-text-secondary)":"var(--color-text-tertiary)",marginTop:2},children:l})]},r))}),e.jsx("div",{style:{paddingTop:8},children:t[a]}),e.jsx(h,{moduleId:4})]})}export{j as default};
