import { CollectionWorkspace } from '../components/common/CollectionWorkspace'
import { MetricCards } from '../components/common/MetricCards'
import { PageSection } from '../components/common/PageSection'
import { StatusBadge } from '../components/common/StatusBadge'
import { productsRows, productsSummary } from '../features/admin/data/adminPageDataV2'

const columns = [
  { key: 'name', label: '상품명', emphasis: true, width: '28%' },
  { key: 'category', label: '카테고리', width: '16%' },
  { key: 'stock', label: '재고', width: '10%' },
  { key: 'price', label: '판매가', width: '14%' },
  { key: 'sales', label: '누적 판매', width: '14%' },
  {
    key: 'status',
    label: '상태',
    render: (value) => <StatusBadge tone={getProductTone(value)}>{value}</StatusBadge>,
    width: '18%',
  },
]

const filterOptions = [
  { value: 'all', label: '전체 상태' },
  { value: '판매 중', label: '판매 중' },
  { value: '품절 임박', label: '품절 임박' },
  { value: '재입고 예정', label: '재입고 예정' },
]

const sortOptions = [
  { value: 'latest', label: '최근 수정순', key: 'updatedAt', compare: (a, b) => String(b).localeCompare(String(a)) },
  { value: 'name', label: '상품명순', key: 'name', compare: (a, b) => String(a).localeCompare(String(b)) },
]

function getProductTone(status) {
  if (status === '판매 중') return 'positive'
  if (status === '품절 임박' || status === '재입고 예정') return 'warning'
  return 'default'
}

export function ProductsPanelPage() {
  return (
    <>
      <MetricCards items={productsSummary} />
      <PageSection
        eyebrow="Products"
        title="상품 관리"
        action={<button className="text-button" type="button">상품 등록</button>}
      >
        <CollectionWorkspace
          columns={columns}
          rows={productsRows}
          searchKeys={['name', 'category', 'sku']}
          filterKey="status"
          filterOptions={filterOptions}
          sortOptions={sortOptions}
          drawerEyebrow="Product Detail"
          drawerTitle={(row) => row.name}
          getMeta={(row) => [
            { label: '상태', value: row.status },
            { label: '재고', value: row.stock },
            { label: '판매가', value: row.price },
          ]}
          getDetails={(row) => [
            { label: '카테고리', value: row.category },
            { label: 'SKU', value: row.sku },
            { label: '공급사', value: row.supplier },
            { label: '누적 판매', value: row.sales },
            { label: '최근 수정', value: row.updatedAt },
            { label: '운영 메모', value: row.memo },
          ]}
        />
      </PageSection>
    </>
  )
}
