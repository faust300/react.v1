export function TaskList({ tasks }) {
  return (
    <div className="task-list">
      {tasks.map((task) => (
        <label key={task.title} className="task-item">
          <input type="checkbox" />
          <div>
            <strong>{task.title}</strong>
            <p>
              {task.assignee} · {task.due}
            </p>
          </div>
        </label>
      ))}
    </div>
  )
}
