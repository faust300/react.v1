import { DataTable } from '../components/common/DataTable'
import { MetricCards } from '../components/common/MetricCards'
import { PageSection } from '../components/common/PageSection'
import { StatusBadge } from '../components/common/StatusBadge'
import { productsSummary, productsTable } from '../features/admin/data/adminPageData'

const columns = [
  { key: 'name', label: '상품명' },
  { key: 'category', label: '카테고리' },
  { key: 'stock', label: '재고' },
  { key: 'price', label: '판매가' },
  { key: 'sales', label: '누적 판매' },
  {
    key: 'status',
    label: '상태',
    render: (value) => <StatusBadge tone={getProductTone(value)}>{value}</StatusBadge>,
  },
]

function getProductTone(status) {
  if (status === '판매 중') return 'positive'
  if (status === '품절 임박' || status === '재입고 예정') return 'warning'
  return 'default'
}

export function ProductsPage() {
  return (
    <>
      <MetricCards items={productsSummary} />
      <PageSection
        eyebrow="Products"
        title="상품 관리"
        action={<button className="text-button" type="button">상품 등록</button>}
      >
        <DataTable columns={columns} rows={productsTable} />
      </PageSection>
    </>
  )
}
