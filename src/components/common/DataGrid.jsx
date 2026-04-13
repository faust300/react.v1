export function DataGrid({ columns, rows, selectedRowId, onRowClick }) {
  return (
    <div className="dense-table-shell">
      <table className="dense-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className={column.emphasis ? 'emphasis' : ''}
                style={column.width ? { width: column.width } : undefined}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.id}
              className={selectedRowId === row.id ? 'active' : ''}
              onClick={() => onRowClick(row)}
            >
              {columns.map((column) => (
                <td key={column.key} className={column.emphasis ? 'emphasis' : ''}>
                  {column.render ? column.render(row[column.key], row) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
