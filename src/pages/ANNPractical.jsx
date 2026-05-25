import { useState } from 'react';
import { Cell, MDCell, SectionHeader } from '../components/ui/JupyterCell.jsx';
import NavButtons from '../components/layout/NavButtons.jsx';

/* ══════════════════════════════════════════════════════
   NOTEBOOK 1 — CUSTOMER CHURN
   ══════════════════════════════════════════════════════ */
function NotebookChurn() {
  return (
    <div>
      <MDCell>{`<h2 style="font-size:18px;font-weight:500;margin:0 0 6px;color:var(--color-text-primary)">Customer Churn Prediction</h2>
<p>Binary classification task. We predict whether a telecom customer will churn (leave) based on usage and demographic features. Dataset: <strong>Telco Customer Churn</strong> (IBM). 7,043 customers · 20 features.</p>`}</MDCell>

      <SectionHeader n="11.1.1" title="Imports & Setup" color="info" />
      <Cell num={1} output="TensorFlow version: 2.15.0\nNumPy version: 1.24.3\nPandas version: 2.0.3">
        {`import numpy as np
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
print(f"Pandas version: {pd.__version__}")`}
      </Cell>

      <SectionHeader n="11.1.2" title="Dataset Overview" color="info" />
      <Cell num={2} output={`Shape: (7043, 21)\n\nColumn dtypes:\n customerID          object\n gender              object\n SeniorCitizen        int64\n tenure               int64\n MonthlyCharges     float64\n TotalCharges        object  ← needs fixing!\n Churn               object\n ...\n\nChurn distribution:\n No     5174  (73.5%)\n Yes    1869  (26.5%)\n → Class imbalance present!`}>
        {`# Load dataset
url = "https://raw.githubusercontent.com/dsrscientist/dataset1/master/Telecom.csv"
df = pd.read_csv(url)
# Alternative: df = pd.read_csv("WA_Fn-UseC_-Telco-Customer-Churn.csv")

print(f"Shape: {df.shape}")
print(f"\\nColumn dtypes:\\n{df.dtypes.to_string()}")
print(f"\\nChurn distribution:\\n{df['Churn'].value_counts()}")
print(f"\\nMissing values:\\n{df.isnull().sum()[df.isnull().sum()>0]}")`}
      </Cell>

      <Cell num={3} output={`       tenure  MonthlyCharges  TotalCharges\ncount  7043.0         7043.0        7043.0\nmean     32.4           64.8        2283.3\nstd      24.6           30.1        2266.8\nmin       0.0           18.3           0.0\n25%       9.0           35.6         401.4\n50%      29.0           70.4        1397.5\n75%      55.0           89.9        3794.7\nmax      72.0          118.8        8684.8`}>
        {`# Statistical summary of numerical features
print(df[['tenure', 'MonthlyCharges', 'TotalCharges']].describe().round(1))`}
      </Cell>

      <SectionHeader n="11.1.3" title="Data Preprocessing" color="warning" />
      <Cell num={4} output={`Cleaned TotalCharges: 11 null values filled with median\nEncoded binary columns: ['gender','Partner','Dependents',...]\nFinal feature matrix shape: (7043, 30)\nTarget shape: (7043,)  — 0=No Churn, 1=Churn`}>
        {`# ── Step 1: Fix TotalCharges (stored as string) ────────────
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
print(f"Target shape: {y.shape}  — 0=No Churn, 1=Churn")`}
      </Cell>

      <Cell num={5} output={`Train set : X=(5634, 30) y=(5634,)\nVal   set : X=(704, 30)  y=(704,)\nTest  set : X=(705, 30)  y=(705,)\n\nFeature scaling applied (StandardScaler)\nMean of first feature after scaling: -0.0000`}>
        {`# ── Step 7: Train / Validation / Test split ─────────────────
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
print(f"Test  set : X={X_test.shape}  y={y_test.shape}")`}
      </Cell>

      <SectionHeader n="11.1.4" title="Building the Neural Network" color="success" />
      <Cell num={6} output={`Model: "ChurnANN"\n__________________________________________________\n Layer (type)           Output Shape   Param #\n==================================================\n dense (Dense)          (None, 64)      1,984\n batch_norm (BN)        (None, 64)        256\n dropout (Dropout)      (None, 64)          0\n dense_1 (Dense)        (None, 32)      2,080\n batch_norm_1 (BN)      (None, 32)        128\n dropout_1 (Dropout)    (None, 32)          0\n dense_2 (Dense)        (None, 16)        528\n dense_3 (Dense)        (None, 1)          17\n==================================================\n Total params: 4,993\n Trainable params: 4,801\n Non-trainable params: 192`}>
        {`def build_churn_model(input_dim, dropout_rate=0.3):
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
model.summary()`}
      </Cell>

      <SectionHeader n="11.1.5" title="Model Training" color="success" />
      <Cell num={7} output={`Epoch 1/100:  loss=0.5821 accuracy=0.7223 val_loss=0.4902 val_accuracy=0.7727\nEpoch 10/100: loss=0.4312 accuracy=0.7934 val_loss=0.4279 val_accuracy=0.8068\nEpoch 20/100: loss=0.4012 accuracy=0.8089 val_loss=0.4108 val_accuracy=0.8125\nEpoch 35/100: loss=0.3889 accuracy=0.8134 val_loss=0.4071 val_accuracy=0.8153\n...\nEpoch 48/100: loss=0.3801 accuracy=0.8176 val_loss=0.4063 val_accuracy=0.8182\nEpoch 59/100: EarlyStopping triggered — val_loss did not improve for 10 epochs\nBest model restored from epoch 48.`}>
        {`# ── Callbacks ──────────────────────────────────────────────
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
print(f"\\nTraining stopped at epoch: {len(history.history['loss'])}")`}
      </Cell>

      <SectionHeader n="11.1.6" title="Model Evaluation" color="warning" />
      <Cell num={8} output={`Test Accuracy : 0.8170  (81.70%)\nTest AUC-ROC  : 0.8641\nTest Precision: 0.6823\nTest Recall   : 0.5934\nTest F1-Score : 0.6347\n\nClassification Report:\n              precision  recall  f1-score  support\n  No Churn       0.87      0.91      0.89      518\n  Churn          0.68      0.59      0.63      187\n  accuracy                           0.82      705\n  macro avg      0.78      0.75      0.76      705\n weighted avg    0.82      0.82      0.82      705`}>
        {`# ── Test set evaluation ────────────────────────────────────
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
      target_names=['No Churn', 'Churn']))`}
      </Cell>

      <Cell num={9} output={`Confusion Matrix:\n[[472  46]\n [ 83 104]]\n\nTrue  Negatives  (TN): 472  — correctly predicted 'No Churn'\nFalse Positives (FP):  46  — predicted Churn but stayed\nFalse Negatives (FN):  83  — predicted Stay but churned ← costly!\nTrue  Positives (TP): 104  — correctly predicted Churn`}>
        {`# ── Confusion Matrix ───────────────────────────────────────
cm = confusion_matrix(y_test, y_pred)
print("Confusion Matrix:")
print(cm)

TN, FP, FN, TP = cm.ravel()
print(f"\\nTrue  Negatives  (TN): {TN}  — correctly predicted 'No Churn'")
print(f"False Positives (FP):  {FP}  — predicted Churn but stayed")
print(f"False Negatives (FN):  {FN}  — predicted Stay but churned ← costly!")
print(f"True  Positives (TP): {TP}  — correctly predicted Churn")`}
      </Cell>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   NOTEBOOK 2 — MNIST
   ══════════════════════════════════════════════════════ */
function NotebookMNIST() {
  return (
    <div>
      <MDCell>{`<h2 style="font-size:18px;font-weight:500;margin:0 0 6px;color:var(--color-text-primary)">MNIST Handwritten Digit Classification</h2>
<p>Multi-class classification (10 classes). 70,000 grayscale 28×28 images of handwritten digits 0–9. Baseline ANN achieves ~97–98% test accuracy. Loaded directly from <code>keras.datasets</code>.</p>`}</MDCell>

      <SectionHeader n="12.1.1" title="Imports & Dataset Loading" color="info" />
      <Cell num={10} output={`Downloading MNIST...\nTraining images: (60000, 28, 28)  dtype: uint8\nTest images:     (10000, 28, 28)  dtype: uint8\nLabel range: 0 – 9\nClass distribution (train): each digit ~6000 samples`}>
        {`import numpy as np
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
print("Class distribution (train):", dict(zip(unique, counts)))`}
      </Cell>

      <SectionHeader n="12.1.2" title="Data Preprocessing" color="warning" />
      <Cell num={11} output={`After preprocessing:\n X_train: shape=(60000, 784), dtype=float32, range=[0.0, 1.0]\n X_val  : shape=(5000, 784)\n X_test : shape=(10000, 784)\n\ny_train (one-hot) shape: (55000, 10)\nExample: digit 5 → [0. 0. 0. 0. 0. 1. 0. 0. 0. 0.]`}>
        {`# ── Step 1: Normalize pixel values [0,255] → [0.0, 1.0] ────
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
print(f"Example: digit {y_train_raw[0]} → {y_train_oh[0]}")`}
      </Cell>

      <SectionHeader n="12.1.3" title="Building the Neural Network" color="success" />
      <Cell num={12} output={`Model: "MNIST_ANN"\n__________________________________________________\n Layer                Output Shape    Param #\n==================================================\n flatten (Input)      (None, 784)           0\n dense_1 (Dense+BN)   (None, 512)     401,920\n batch_norm_1         (None, 512)       2,048\n dropout_1 (0.4)      (None, 512)           0\n dense_2              (None, 256)     131,328\n batch_norm_2         (None, 256)       1,024\n dropout_2 (0.3)      (None, 256)           0\n dense_3              (None, 128)      32,896\n dropout_3 (0.2)      (None, 128)           0\n output (Softmax)     (None, 10)        1,290\n==================================================\n Total params: 570,506  (~2.2 MB)`}>
        {`def build_mnist_model(input_dim=784, num_classes=10):
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
model.summary()`}
      </Cell>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   NOTEBOOK 3 — GRADUATE ADMISSION (REGRESSION)
   ══════════════════════════════════════════════════════ */
function NotebookAdmission() {
  return (
    <div>
      <MDCell>{`<h2 style="font-size:18px;font-weight:500;margin:0 0 6px;color:var(--color-text-primary)">Graduate Admission Prediction — Regression</h2>
<p>Regression task. Predict <strong>Chance of Admit</strong> (0–1) for graduate school applicants. Dataset: <em>Jamboree Graduate Admissions</em> · 500 samples · 7 features. Key metrics: RMSE, MAE, R².</p>`}</MDCell>

      <SectionHeader n="13.1.1" title="Imports & Dataset Overview" color="info" />
      <Cell num={13} output={`Shape: (500, 9)\n\nFeatures:\n GRE Score       : 260–340\n TOEFL Score     : 92–120\n University Rank : 1–5\n SOP             : 1.0–5.0\n LOR             : 1.0–5.0\n CGPA            : 6.8–9.9\n Research        : 0 or 1\n\nTarget:\n Chance of Admit : 0.34–0.97 (mean=0.724)`}>
        {`import numpy as np
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
print(f"Target:\\n  Chance of Admit : {df['Chance of Admit '].min():.2f}–{df['Chance of Admit '].max():.2f} (mean={df['Chance of Admit '].mean():.3f})")`}
      </Cell>

      <SectionHeader n="13.1.4" title="Building the Regression ANN" color="success" />
      <Cell num={14} output={`Model: "AdmissionANN_Regression"\n____________________________________________\n Layer                Output    Param #\n============================================\n dense (Dense+BN)     (None,64)   576\n dropout (0.2)        (None,64)     0\n dense_1              (None,32)  2,080\n dense_2              (None,16)    528\n output (Linear)      (None, 1)    17\n============================================\n Total params: 3,201\n\nLoss: MSE  |  Metrics: MAE, RMSE`}>
        {`def build_admission_model(input_dim=7):
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
model.summary()`}
      </Cell>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   ROOT PAGE
   ══════════════════════════════════════════════════════ */
const NOTEBOOKS = [
  { id: "churn", label: "Churn Prediction", sub: "Binary Classification", color: "#185FA5" },
  { id: "mnist", label: "MNIST Digits", sub: "Multi-class Classification", color: "#0F6E56" },
  { id: "admit", label: "Grad Admission", sub: "Regression", color: "#853E0B" },
];

export default function ANNPractical() {
  const [active, setActive] = useState("churn");
  const map = { churn: <NotebookChurn />, mnist: <NotebookMNIST />, admit: <NotebookAdmission /> };

  return (
    <div>
      <div className="page-header">
        <div className="page-header-eyebrow">Deep Learning — Module 04</div>
        <h1 className="page-header-title">ANN Practical Applications</h1>
        <p className="page-header-subtitle">Jupyter-style notebooks for Binary Classification, Multi-class, and Regression using Keras.</p>
      </div>

      <div style={{ background: "var(--color-background-secondary)", border: "1px solid var(--color-border-tertiary)", borderRadius: "var(--border-radius-lg)", padding: "12px 16px", marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <i className="ti ti-brand-python" style={{ fontSize: 24, color: "#4EC9B0" }} aria-hidden />
          <div>
            <div style={{ fontSize: 13.5, fontWeight: 500, color: "var(--color-text-primary)" }}>ANN Practical Applications</div>
            <div style={{ fontSize: 11.5, color: "var(--color-text-secondary)" }}>Python 3 · TensorFlow 2 · Keras</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#E24B4A" }} />
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#EF9F27" }} />
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#1D9E75" }} />
        </div>
      </div>

      <div style={{ display: "flex", gap: 0, marginBottom: 16, borderBottom: "1px solid var(--color-border-tertiary)", overflowX: "auto" }}>
        {NOTEBOOKS.map(({ id, label, sub, color }) => (
          <button key={id} onClick={() => setActive(id)} style={{ padding: "8px 16px", fontSize: 13, fontWeight: active === id ? 500 : 400, border: "none", borderBottom: active === id ? `2px solid ${color}` : "2px solid transparent", background: active === id ? "var(--color-background-secondary)" : "transparent", color: active === id ? "var(--color-text-primary)" : "var(--color-text-secondary)", cursor: "pointer", transition: "all 0.15s", whiteSpace: "nowrap" }}>
            {label}
            <div style={{ fontSize: 10.5, color: active === id ? "var(--color-text-secondary)" : "var(--color-text-tertiary)", marginTop: 2 }}>{sub}</div>
          </button>
        ))}
      </div>

      <div style={{ paddingTop: 8 }}>
        {map[active]}
      </div>

      <NavButtons moduleId={4} />
    </div>
  );
}
