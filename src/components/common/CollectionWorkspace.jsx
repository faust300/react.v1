import { useEffect, useMemo, useState } from 'react'
import { DataGrid } from './DataGrid'
import { DataToolbar } from './DataToolbar'
import { DetailDrawer } from './DetailDrawer'

export function CollectionWorkspace({
  columns,
  rows,
  drawerTitle,
  drawerEyebrow,
  getMeta,
  getDetails,
  searchKeys,
  filterKey,
  filterOptions,
  sortOptions,
}) {
  const pageSize = 12
  const [selectedRow, setSelectedRow] = useState(rows[0] ?? null)
  const [searchValue, setSearchValue] = useState('')
  const [filterValue, setFilterValue] = useState(filterOptions[0]?.value ?? 'all')
  const [sortValue, setSortValue] = useState(sortOptions[0]?.value ?? '')
  const [density, setDensity] = useState('compact')
  const [page, setPage] = useState(1)

  const visibleRows = useMemo(() => {
    const normalizedSearch = searchValue.trim().toLowerCase()

    let nextRows = rows.filter((row) => {
      const passesSearch =
        !normalizedSearch ||
        searchKeys.some((key) =>
          String(row[key] ?? '')
            .toLowerCase()
            .includes(normalizedSearch),
        )

      const passesFilter =
        !filterKey || filterValue === 'all' || String(row[filterKey]) === filterValue

      return passesSearch && passesFilter
    })

    const selectedSort = sortOptions.find((option) => option.value === sortValue)

    if (selectedSort) {
      nextRows = [...nextRows].sort((a, b) =>
        selectedSort.compare(a[selectedSort.key], b[selectedSort.key], a, b),
      )
    }

    return nextRows
  }, [filterKey, filterValue, rows, searchKeys, searchValue, sortOptions, sortValue])

  const totalPages = Math.max(1, Math.ceil(visibleRows.length / pageSize))
  const safePage = Math.min(page, totalPages)
  const pagedRows = useMemo(() => {
    const startIndex = (safePage - 1) * pageSize
    return visibleRows.slice(startIndex, startIndex + pageSize)
  }, [pageSize, safePage, visibleRows])

  const paginationItems = useMemo(() => {
    const pages = []
    const start = Math.max(1, safePage - 2)
    const end = Math.min(totalPages, start + 4)

    for (let current = start; current <= end; current += 1) {
      pages.push(current)
    }

    return pages
  }, [safePage, totalPages])

  useEffect(() => {
    if (page !== safePage) {
      setPage(safePage)
    }
  }, [page, safePage])

  useEffect(() => {
    setPage(1)
  }, [searchValue, filterValue, sortValue])

  useEffect(() => {
    if (!pagedRows.length) {
      setSelectedRow(null)
      return
    }

    const exists = pagedRows.some((row) => row.id === selectedRow?.id)
    setSelectedRow(exists ? selectedRow : pagedRows[0])
  }, [pagedRows, selectedRow])

  return (
    <div className={`collection-workspace density-${density}`}>
      <div className="collection-main">
        <DataToolbar
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          filterValue={filterValue}
          onFilterChange={setFilterValue}
          filterOptions={filterOptions}
          sortValue={sortValue}
          onSortChange={setSortValue}
          sortOptions={sortOptions}
          density={density}
          onDensityChange={setDensity}
          totalCount={visibleRows.length}
        />
        <DataGrid
          columns={columns}
          rows={pagedRows}
          selectedRowId={selectedRow?.id}
          onRowClick={setSelectedRow}
        />
        <div className="pagination-bar">
          <div className="pagination-summary">
            <strong>{safePage}</strong>
            <span>
              / {totalPages} 페이지 · 총 {visibleRows.length.toLocaleString()}건
            </span>
          </div>

          <div className="pagination-controls">
            <button
              type="button"
              className="pagination-button"
              onClick={() => setPage((current) => Math.max(1, current - 1))}
              disabled={safePage === 1}
            >
              이전
            </button>

            {paginationItems.map((item) => (
              <button
                key={item}
                type="button"
                className={`pagination-button ${item === safePage ? 'active' : ''}`}
                onClick={() => setPage(item)}
              >
                {item}
              </button>
            ))}

            <button
              type="button"
              className="pagination-button"
              onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
              disabled={safePage === totalPages}
            >
              다음
            </button>
          </div>
        </div>
      </div>
      {selectedRow ? (
        <DetailDrawer
          title={drawerTitle(selectedRow)}
          eyebrow={drawerEyebrow}
          meta={getMeta(selectedRow)}
          items={getDetails(selectedRow)}
          onClose={() => setSelectedRow(null)}
        />
      ) : null}
    </div>
  )
}
