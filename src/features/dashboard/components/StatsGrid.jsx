export function StatsGrid({ stats }) {
  return (
    <section className="stats-grid">
      {stats.map((stat) => (
        <article key={stat.label} className="stat-card">
          <span>{stat.label}</span>
          <strong>{stat.value}</strong>
          <p className={`stat-change ${stat.tone}`}>{stat.change}</p>
        </article>
      ))}
    </section>
  )
}
