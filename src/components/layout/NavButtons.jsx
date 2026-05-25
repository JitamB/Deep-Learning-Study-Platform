import { useNavigate } from 'react-router-dom';
import { getAdjacentModules } from '../../data/nav.js';

/**
 * Module-level prev/next navigation bar rendered at the bottom of each page.
 * moduleId: the current module's numeric id
 */
export default function NavButtons({ moduleId }) {
  const navigate = useNavigate();
  const { prev, next } = getAdjacentModules(moduleId);

  return (
    <div className="module-nav">
      <button
        className="module-nav-btn"
        disabled={!prev}
        onClick={() => prev && navigate(`/module/${prev.id}`)}
        title={prev ? prev.title : undefined}
      >
        <i className="ti ti-arrow-left" aria-hidden="true" />
        <span className="module-nav-btn-label">{prev ? prev.title : ''}</span>
      </button>

      <span className="module-nav-center">
        {moduleId} / 18
      </span>

      <button
        className="module-nav-btn"
        disabled={!next}
        onClick={() => next && navigate(`/module/${next.id}`)}
        title={next ? next.title : undefined}
      >
        <span className="module-nav-btn-label">{next ? next.title : ''}</span>
        <i className="ti ti-arrow-right" aria-hidden="true" />
      </button>
    </div>
  );
}
