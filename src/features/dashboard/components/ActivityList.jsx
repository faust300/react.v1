export function ActivityList({ items }) {
  return (
    <div className="activity-list">
      {items.map((activity) => (
        <div key={activity.title} className="activity-item">
          <div>
            <strong>{activity.title}</strong>
            <p>{activity.detail}</p>
          </div>
          <span className="status-pill">{activity.status}</span>
        </div>
      ))}
    </div>
  )
}
