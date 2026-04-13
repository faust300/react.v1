import { useState } from 'react'
import { SidebarActionModal } from '../components/common/SidebarActionModal'
import { navigationItems } from '../constants/navigation'
import '../styles/admin-layout.css'

function getMenuInitial(label) {
  return label.slice(0, 1)
}

export function AdminLayout({
  title,
  subtitle,
  activeItem,
  activeMenu,
  onNavigate,
  children,
}) {
  const [openItem, setOpenItem] = useState(null)

  return (
    <>
      <div className="app-shell">
        <aside className="primary-sidebar">
          <div className="sidebar-top">
            <div className="brand">
              <div className="brand-mark">A</div>
              <div>
                <strong>Admin Space</strong>
                <p>운영 센터</p>
              </div>
            </div>

            <nav className="menu">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`menu-item ${activeMenu === item.id ? 'active' : ''}`}
                  onClick={() => onNavigate(item.id)}
                >
                  <span className="menu-icon">{getMenuInitial(item.label)}</span>
                  <span className="menu-copy">
                    <strong>{item.label}</strong>
                    <small>{item.subtitle}</small>
                  </span>
                </button>
              ))}
            </nav>
          </div>

          <div className="workspace-card">
            <p>Workspace</p>
            <strong>Operations Team</strong>
            <span>실시간 모니터링 활성화</span>
          </div>
        </aside>

        <aside className="secondary-sidebar">
          <div className="secondary-intro">
            <p className="eyebrow">{subtitle}</p>
            <h2>{title}</h2>
            <p className="secondary-copy">{activeItem?.description}</p>
          </div>

          <section className="subpanel-card">
            <div className="subpanel-header">
              <h3>세부 섹션</h3>
              <span>{activeItem?.sections?.length ?? 0}개</span>
            </div>
            <div className="subpanel-list">
              {activeItem?.sections?.map((section) => (
                <button
                  key={section}
                  type="button"
                  className="subpanel-item"
                  onClick={() => setOpenItem({ kind: 'section', label: section })}
                >
                  <span className="subpanel-bullet" />
                  {section}
                </button>
              ))}
            </div>
          </section>

          <section className="subpanel-card">
            <div className="subpanel-header">
              <h3>빠른 작업</h3>
            </div>
            <div className="quick-actions">
              {activeItem?.quickActions?.map((action) => (
                <button
                  key={action}
                  type="button"
                  className="quick-action-chip"
                  onClick={() => setOpenItem({ kind: 'action', label: action })}
                >
                  {action}
                </button>
              ))}
            </div>
          </section>

          <section className="subpanel-note">
            <p>운영 메모</p>
            <strong>{activeItem?.note}</strong>
          </section>
        </aside>

        <main className="main-content">
          <header className="topbar">
            <div>
              <p className="eyebrow">{subtitle}</p>
              <h1>{title}</h1>
            </div>

            <div className="topbar-actions">
              <button type="button" className="secondary-button">
                필터 열기
              </button>
              <button type="button" className="primary-button">
                새 항목 추가
              </button>
            </div>
          </header>

          {children}
        </main>
      </div>

      <SidebarActionModal
        openItem={openItem}
        activeItem={activeItem}
        onClose={() => setOpenItem(null)}
      />
    </>
  )
}
