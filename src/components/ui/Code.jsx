import { useState } from 'react';

/**
 * Polished code block with:
 * - macOS-style header (coloured dots + language pill + copy button)
 * - Dark gradient background
 * - Monospace body with horizontal scroll
 */
export function Code({ children, lang = 'python' }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = typeof children === 'string' ? children : String(children);
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };

  return (
    <div className="code-block">
      <div className="code-block-header">
        <div className="code-block-dots">
          <span className="code-block-dot red" />
          <span className="code-block-dot yellow" />
          <span className="code-block-dot green" />
        </div>
        <span className="code-block-lang">{lang}</span>
        <button className={`code-block-copy${copied ? ' copied' : ''}`} onClick={handleCopy}>
          <i className={`ti ${copied ? 'ti-check' : 'ti-copy'}`} style={{ fontSize: 11 }} />
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <div className="code-block-body">
        <pre>{children}</pre>
      </div>
    </div>
  );
}

export default Code;
