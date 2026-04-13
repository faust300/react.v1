import { DataTable } from '../components/common/DataTable'
import { MetricCards } from '../components/common/MetricCards'
import { PageSection } from '../components/common/PageSection'
import { StatusBadge } from '../components/common/StatusBadge'
import { ordersSummary, ordersTable } from '../features/admin/data/adminPageData'

const columns = [
  { key: 'orderNo', label: '주문번호' },
  { key: 'customer', label: '주문자' },
  { key: 'product', label: '상품명' },
  { key: 'amount', label: '결제금액' },
  {
    key: 'status',
    label: '상태',
    render: (value) => <StatusBadge tone={getOrderTone(value)}>{value}</StatusBadge>,
  },
  { key: 'date', label: '주문일시' },
]

function getOrderTone(status) {
  if (status === '결제 완료' || status === '배송 중') return 'positive'
  if (status === '배송 준비') return 'warning'
  if (status === '환불 요청') return 'danger'
  return 'default'
}

export function OrdersPage() {
  return (
    <>
      <MetricCards items={ordersSummary} />
      <PageSection
        eyebrow="Orders"
        title="주문 현황"
        action={<button className="text-button" type="button">주문 내보내기</button>}
      >
        <DataTable columns={columns} rows={ordersTable} />
      </PageSection>
    </>
  )
}
