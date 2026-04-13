export function DataToolbar({
  searchValue,
  onSearchChange,
  filterValue,
  onFilterChange,
  filterOptions,
  sortValue,
  onSortChange,
  sortOptions,
  density,
  onDensityChange,
  totalCount,
}) {
  return (
    <div className="data-toolbar">
      <div className="data-toolbar-main">
        <label className="toolbar-search">
          <span>검색</span>
          <input
            type="search"
            value={searchValue}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="이름, 번호, 제목으로 검색"
          />
        </label>

        <label className="toolbar-select">
          <span>필터</span>
          <select value={filterValue} onChange={(event) => onFilterChange(event.target.value)}>
            {filterOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="toolbar-select">
          <span>정렬</span>
          <select value={sortValue} onChange={(event) => onSortChange(event.target.value)}>
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="toolbar-select density-select">
          <span>행 높이</span>
          <select value={density} onChange={(event) => onDensityChange(event.target.value)}>
            <option value="compact">촘촘하게</option>
            <option value="comfortable">기본</option>
            <option value="spacious">넓게</option>
          </select>
        </label>
      </div>

      <div className="toolbar-count">
        <strong>{totalCount.toLocaleString()}</strong>
        <span>items</span>
      </div>
    </div>
  )
}
