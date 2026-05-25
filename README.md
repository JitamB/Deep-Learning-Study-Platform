# Deep Learning Study Platform

A structured, interactive single-page web application for studying Deep Learning — from first principles to advanced architectures. Built as a personal study companion that consolidates 18 topic modules into a unified, navigable platform.

---

## What It Does

This platform transforms dense Deep Learning lecture notes into a clean, interactive study experience. Rather than jumping between standalone files, everything lives under one roof with a hierarchical sidebar, per-module sub-topic tabs, and a suite of interactive visualizers embedded directly in the content.

**Key capabilities:**

- **18 curated modules** covering the full DL curriculum — from Perceptrons to Transformers
- **Hierarchical navigation** — categories in the sidebar collapse/expand; tabs within each module switch sub-topics without a page reload
- **Inline math blocks** — monospaced, pre-formatted math notation for equations and proofs
- **Q&A accordions** — interview-style questions with detailed answers, great for revision
- **Interactive visualizers** — sliders, steppers, canvas animations, and live demos embedded per topic
- **Jupyter-style cells** — Module 04 (ANN Practical) renders code + output in a notebook-like layout

---

## Module Index

| # | Module | Category |
|---|--------|----------|
| 01 | DL Fundamentals | Foundations |
| 02 | Perceptrons | Foundations |
| 03 | MLP & Forward Pass | Foundations |
| 04 | ANN Practical | Training & Optimization |
| 05 | Training Deep Networks | Training & Optimization |
| 06 | Gradient Problems | Training & Optimization |
| 07 | Improving Neural Networks | Training & Optimization |
| 08 | Optimizers | Training & Optimization |
| 09 | Hyperparameter Tuning | Training & Optimization |
| 10 | CNN Fundamentals | Convolutional Networks |
| 11 | CNN Part 2 | Convolutional Networks |
| 12 | CNN Advanced | Convolutional Networks |
| 13 | Keras Functional API | Frameworks & APIs |
| 14 | Recurrent Neural Networks | Sequence Models |
| 15 | LLM History | Attention & Seq2Seq |
| 16 | Seq2Seq & Attention | Attention & Seq2Seq |
| 17 | Transformers Part 1 | Transformers |
| 18 | Transformers Part 2 | Transformers |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| UI Framework | React 18 |
| Routing | React Router v6 |
| Bundler | Vite 5 |
| Styling | Vanilla CSS (custom design tokens) |
| Icons | Tabler Icons (CDN) |
| Fonts | Inter (sans), JetBrains Mono (code) |

No external UI library. No Tailwind. Pure CSS design system with custom tokens for both light and dark modes.

---

## Project Layout

```
Deep-Learning-Study-Platform/
├── index.html
├── vite.config.js
├── package.json
└── src/
    ├── main.jsx
    ├── App.jsx
    │
    ├── data/
    │   └── nav.js              # Single source of truth — all 18 modules,
    │                           # categories, and helper functions
    │
    ├── styles/
    │   ├── global.css          # Design tokens (colors, fonts, radii),
    │   ├── layout.css          # Sidebar, TopBar, content-shell layout
    │   └── components.css      # All reusable component styles (tables,
    │                           # code blocks, QA, notes, badges, viz-box…)
    │
    ├── components/
    │   ├── layout/
    │   │   ├── Sidebar.jsx     # Collapsible nav with category accordion
    │   │   ├── SectionNav.jsx  # Horizontal tab bar for sub-topic switching
    │   │   └── NavButtons.jsx  # Prev/Next module footer navigation
    │   └── ui/
    │       ├── Code.jsx        # Syntax-highlighted code block + copy button
    │       ├── QA.jsx          # Collapsible Q&A accordion item
    │       ├── Typography.jsx  # Mx (math), H2, H3, P typography helpers
    │       ├── Primitives.jsx  # Note, Table, Grid, Card, VizBox, SliderRow,
    │       │                   # Badge — shared content primitives
    │       └── JupyterCell.jsx # Jupyter-style input/output cell (Module 04)
    │
    └── pages/                  # One file per module — lazy-loaded via App.jsx
        ├── Fundamentals.jsx
        ├── Perceptrons.jsx
        ├── MLPForward.jsx
        ├── ANNPractical.jsx
        ├── Training.jsx        
        ├── GradientProblems.jsx
        ├── ImprovingNN.jsx     
        ├── Optimizers.jsx      
        ├── HyperparameterTuning.jsx 
        ├── CNNFundamentals.jsx 
        ├── CNNPart2.jsx        
        ├── CNNAdvanced.jsx     
        ├── KerasFunctional.jsx 
        ├── RNN.jsx             
        ├── LLMHistory.jsx      
        ├── Seq2SeqAttention.jsx
        ├── TransformersPart1.jsx 
        └── TransformersPart2.jsx 
```


---

## Getting Started

**Prerequisites:** Node.js ≥ 18

```bash
# Clone the repo
git clone https://github.com/JitamB/Deep-Learning-Study-Platform.git
cd Deep-Learning-Study-Platform

# Install dependencies
npm install

# Start the dev server
npm run dev
```

---

## Contributing

Contributions are very welcome! This platform grows in value as more people add modules, fix errors in explanations, or improve the interactive visualizers.

### Ways to contribute

**Found a bug?**
Open an [Issue](https://github.com/JitamB/Deep-Learning-Study-Platform/issues) describing:
- Which module / sub-topic is affected
- What you expected vs. what you saw
- Browser and OS (if it's a rendering issue)

**Spotted a factual error or want to improve an explanation?**
Open an Issue with the `content` label, quoting the incorrect text and your suggested correction.

**Want to add a new module or visualizer?**
1. Fork the repository
2. Create a feature branch: example - `git checkout -b feat/module-19-diffusion`
3. Follow the module structure described above
4. Open a Pull Request with a short description of what was added and why
>Adding a New Module
>1. Create `src/pages/YourModule.jsx` following the pattern of any existing page.
>2. Register it in `src/data/nav.js` — add an entry to `MODULES` and update `CATEGORIES`.
>3. Add a lazy import in `src/App.jsx` under `PAGE_MAP`.

>That's it — the sidebar, breadcrumb, prev/next buttons, and theme all work automatically.

**UI/UX improvements?**
Design tweaks, accessibility fixes, and responsive-layout improvements are always appreciated. Please keep changes within the existing CSS token system (`global.css`) so both light and dark themes stay consistent.

### Guidelines

- Keep each module self-contained in its own page file
- Use the shared component primitives (`Note`, `Code`, `QA`, `Table`, `VizBox`, etc.) rather than one-off inline styles where possible
- Math notation goes in `<Mx block>` blocks, not LaTeX — keep it readable in monospace
- Test both light and dark mode before submitting a PR
- Write clear commit messages: `fix:`, `feat:`, `content:`, `style:` prefixes help

---

> Built with ❤️ as a personal Deep Learning study companion.  
> If this helped you, consider giving it a ⭐ and sharing it with your study group!
