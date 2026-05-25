/* Central navigation configuration — single source of truth for all 18 modules */

export const MODULES = [
  { id: 1,  slug: 'fundamentals',          title: 'DL Fundamentals',          subtitle: 'Architectures & History',         category: 'Foundations' },
  { id: 2,  slug: 'perceptrons',           title: 'Perceptrons',               subtitle: 'Linear classifiers & limits',      category: 'Foundations' },
  { id: 3,  slug: 'mlp-forward',           title: 'MLP & Forward Pass',        subtitle: 'Layers, activations, computation', category: 'Foundations' },
  { id: 4,  slug: 'ann-practical',         title: 'ANN Practical',             subtitle: 'Jupyter-style implementation',     category: 'Training & Optimization' },
  { id: 5,  slug: 'training',              title: 'Training Deep Networks',    subtitle: 'Loss, backprop, epochs',          category: 'Training & Optimization' },
  { id: 6,  slug: 'gradient-problems',     title: 'Gradient Problems',         subtitle: 'Vanishing, exploding gradients',  category: 'Training & Optimization' },
  { id: 7,  slug: 'improving-nn',          title: 'Improving Neural Networks', subtitle: 'Dropout, BN, regularization',     category: 'Training & Optimization' },
  { id: 8,  slug: 'optimizers',            title: 'Optimizers',                subtitle: 'BN, EMA, Momentum, Adam, LR',    category: 'Training & Optimization' },
  { id: 9,  slug: 'hyperparameter-tuning', title: 'Hyperparameter Tuning',     subtitle: 'Search strategies, Keras Tuner', category: 'Training & Optimization' },
  { id: 10, slug: 'cnn-fundamentals',      title: 'CNN Fundamentals',          subtitle: 'Convolution, pooling, filters',   category: 'Convolutional Networks' },
  { id: 11, slug: 'cnn-part2',             title: 'CNN Part 2',                subtitle: 'Architectures, deep CNNs',        category: 'Convolutional Networks' },
  { id: 12, slug: 'cnn-advanced',          title: 'CNN Advanced',              subtitle: 'ResNet, transfer learning',       category: 'Convolutional Networks' },
  { id: 13, slug: 'keras-functional',      title: 'Keras Functional API',      subtitle: 'DAGs, multi-I/O, shared weights', category: 'Frameworks & APIs' },
  { id: 14, slug: 'rnn',                   title: 'Recurrent Neural Networks', subtitle: 'LSTM, GRU, sequence modelling',  category: 'Sequence Models' },
  { id: 15, slug: 'llm-history',           title: 'LLM History',               subtitle: 'Evolution of language models',    category: 'Attention & Seq2Seq' },
  { id: 16, slug: 'seq2seq-attention',     title: 'Seq2Seq & Attention',       subtitle: 'Encoder-decoder, alignment',      category: 'Attention & Seq2Seq' },
  { id: 17, slug: 'transformers-p1',       title: 'Transformers Part 1',       subtitle: 'Self-attention, architecture',    category: 'Transformers' },
  { id: 18, slug: 'transformers-p2',       title: 'Transformers Part 2',       subtitle: 'Pre-training, fine-tuning, BERT', category: 'Transformers' },
];

export const CATEGORIES = [
  { label: 'Foundations',            icon: 'ti-brain',              moduleIds: [1, 2, 3] },
  { label: 'Training & Optimization',icon: 'ti-settings',           moduleIds: [4, 5, 6, 7, 8, 9] },
  { label: 'Convolutional Networks', icon: 'ti-eye',                moduleIds: [10, 11, 12] },
  { label: 'Frameworks & APIs',      icon: 'ti-code',               moduleIds: [13] },
  { label: 'Sequence Models',        icon: 'ti-repeat',             moduleIds: [14] },
  { label: 'Attention & Seq2Seq',    icon: 'ti-arrows-right-left',  moduleIds: [15, 16] },
  { label: 'Transformers',           icon: 'ti-bolt',               moduleIds: [17, 18] },
];

/** Lookup a module by its numeric id */
export function getModule(id) {
  return MODULES.find(m => m.id === id) ?? null;
}

/** Get the category label string for a given module id */
export function getCategoryForModule(id) {
  const mod = getModule(id);
  return mod?.category ?? '';
}

/** Prev / next module relative to a given id */
export function getAdjacentModules(id) {
  const idx = MODULES.findIndex(m => m.id === id);
  return {
    prev: idx > 0 ? MODULES[idx - 1] : null,
    next: idx < MODULES.length - 1 ? MODULES[idx + 1] : null,
  };
}
