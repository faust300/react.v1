export function DetailDrawer({
  title,
  eyebrow,
  items,
  meta,
  onClose,
}) {
  return (
    <aside className="detail-drawer">
      <div className="detail-drawer-header">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h3>{title}</h3>
        </div>
        <button type="button" className="drawer-close-button" onClick={onClose}>
          닫기
        </button>
      </div>

      <div className="detail-meta">
        {meta.map((item) => (
          <div key={item.label} className="detail-meta-card">
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </div>
        ))}
      </div>

      <div className="detail-list">
        {items.map((item) => (
          <div key={item.label} className="detail-item">
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </div>
        ))}
      </div>
    </aside>
  )
}
