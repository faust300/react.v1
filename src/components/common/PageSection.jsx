export function PageSection({ eyebrow, title, action, children }) {
  return (
    <article className="panel">
      <div className="panel-header">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h3>{title}</h3>
        </div>
        {action}
      </div>
      {children}
    </article>
  )
}
