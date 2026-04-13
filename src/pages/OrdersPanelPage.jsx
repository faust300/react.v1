import { CollectionWorkspace } from '../components/common/CollectionWorkspace'
import { MetricCards } from '../components/common/MetricCards'
import { PageSection } from '../components/common/PageSection'
import { StatusBadge } from '../components/common/StatusBadge'
import { ordersRows, ordersSummary } from '../features/admin/data/adminPageDataV2'

const columns = [
  { key: 'orderNo', label: '주문번호', emphasis: true, width: '18%' },
  { key: 'customer', label: '주문자', width: '12%' },
  { key: 'product', label: '상품명', width: '28%' },
  { key: 'amount', label: '결제금액', width: '14%' },
  {
    key: 'status',
    label: '상태',
    render: (value) => <StatusBadge tone={getOrderTone(value)}>{value}</StatusBadge>,
    width: '12%',
  },
  { key: 'date', label: '주문일시', width: '16%' },
]

const filterOptions = [
  { value: 'all', label: '전체 상태' },
  { value: '결제 완료', label: '결제 완료' },
  { value: '배송 준비', label: '배송 준비' },
  { value: '배송 중', label: '배송 중' },
  { value: '환불 요청', label: '환불 요청' },
]

const sortOptions = [
  { value: 'latest', label: '최신 주문순', key: 'date', compare: (a, b) => String(b).localeCompare(String(a)) },
  { value: 'customer', label: '주문자 이름순', key: 'customer', compare: (a, b) => String(a).localeCompare(String(b)) },
]

function getOrderTone(status) {
  if (status === '결제 완료' || status === '배송 중') return 'positive'
  if (status === '배송 준비') return 'warning'
  if (status === '환불 요청') return 'danger'
  return 'default'
}

export function OrdersPanelPage() {
  return (
    <>
      <MetricCards items={ordersSummary} />
      <PageSection
        eyebrow="Orders"
        title="주문 현황"
        action={<button className="text-button" type="button">주문 내보내기</button>}
      >
        <CollectionWorkspace
          columns={columns}
          rows={ordersRows}
          searchKeys={['orderNo', 'customer', 'product']}
          filterKey="status"
          filterOptions={filterOptions}
          sortOptions={sortOptions}
          drawerEyebrow="Order Detail"
          drawerTitle={(row) => row.orderNo}
          getMeta={(row) => [
            { label: '주문자', value: row.customer },
            { label: '상태', value: row.status },
            { label: '결제금액', value: row.amount },
          ]}
          getDetails={(row) => [
            { label: '상품명', value: row.product },
            { label: '주문 채널', value: row.channel },
            { label: '결제 방식', value: row.payment },
            { label: '주문 일시', value: row.date },
            { label: '배송 주소', value: row.address },
            { label: '운영 메모', value: row.memo },
          ]}
        />
      </PageSection>
    </>
  )
}
