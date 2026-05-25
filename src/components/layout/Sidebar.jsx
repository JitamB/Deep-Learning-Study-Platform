import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { CATEGORIES, MODULES } from '../../data/nav.js';

export default function Sidebar({ collapsed, onClose }) {
  const location = useLocation();

  // Derive active category from current route
  const currentId = parseInt(location.pathname.split('/module/')[1], 10) || 1;

  // All categories start expanded
  const [expanded, setExpanded] = useState(
    () => Object.fromEntries(CATEGORIES.map(c => [c.label, true]))
  );

  const toggle = label =>
    setExpanded(prev => ({ ...prev, [label]: !prev[label] }));

  // Only close sidebar on mobile (≤768px)
  const handleModuleClick = () => {
    if (window.innerWidth <= 768) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile backdrop */}
      {!collapsed && (
        <div
          className="sidebar-overlay"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside className={`sidebar${collapsed ? ' collapsed' : ''}`} aria-label="Module navigation">
        {/* Brand header */}
        <div className="sidebar-header">
          <div className="sidebar-brand">
            <span className="sidebar-brand-title">Deep Learning Companion</span>
            <span className="sidebar-brand-sub">18 Modules</span>
          </div>
        </div>

        {/* Nav tree */}
        <nav className="sidebar-nav" aria-label="Module list">
          {CATEGORIES.map(cat => {
            const mods = MODULES.filter(m => cat.moduleIds.includes(m.id));
            const isOpen = expanded[cat.label];
            const isActive = cat.moduleIds.includes(currentId);
            return (
              <div className="nav-category" key={cat.label}>
                <button
                  className={`nav-category-header${isActive ? ' active-cat' : ''}`}
                  onClick={() => toggle(cat.label)}
                  aria-expanded={isOpen}
                >
                  <i className={`ti ${cat.icon}`} aria-hidden="true" />
                  <span>{cat.label}</span>
                  <i className={`ti ti-chevron-right nav-category-chevron${isOpen ? ' open' : ''}`} aria-hidden="true" />
                </button>

                {isOpen && (
                  <div className="nav-module-list">
                    {mods.map(mod => (
                      <NavLink
                        key={mod.id}
                        to={`/module/${mod.id}`}
                        className={({ isActive }) =>
                          `nav-module-item${isActive ? ' active' : ''}`
                        }
                        onClick={handleModuleClick}
                        title={mod.subtitle}
                      >
                        <span className="nav-module-num">{String(mod.id).padStart(2, '0')}</span>
                        <span className="nav-module-title">{mod.title}</span>
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="sidebar-header">
          <div className="sidebar-brand">
            <span className="sidebar-brand-title" style={{color: "#0e569b"}}>
              <a href='https://github.com/JitamB/Deep-Learning-Study-Platform/' target='_blank'>Open in Github</a>
            </span>
            <span className="sidebar-brand-sub">Contributions are very welcome!</span>
          </div>
        </div>
      </aside>
    </>
  );
}
