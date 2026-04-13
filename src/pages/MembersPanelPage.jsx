import { CollectionWorkspace } from '../components/common/CollectionWorkspace'
import { MetricCards } from '../components/common/MetricCards'
import { PageSection } from '../components/common/PageSection'
import { StatusBadge } from '../components/common/StatusBadge'
import { membersRows, membersSummary } from '../features/admin/data/adminPageDataV2'

const columns = [
  { key: 'name', label: '회원명', emphasis: true, width: '14%' },
  { key: 'email', label: '이메일', width: '30%' },
  { key: 'grade', label: '등급', width: '12%' },
  { key: 'orders', label: '주문 횟수', width: '12%' },
  { key: 'joinedAt', label: '가입일', width: '14%' },
  {
    key: 'status',
    label: '상태',
    render: (value) => <StatusBadge tone={getMemberTone(value)}>{value}</StatusBadge>,
    width: '18%',
  },
]

const filterOptions = [
  { value: 'all', label: '전체 상태' },
  { value: '활성', label: '활성' },
  { value: '휴면 예정', label: '휴면 예정' },
  { value: '주의', label: '주의' },
]

const sortOptions = [
  { value: 'latest', label: '최근 가입순', key: 'joinedAt', compare: (a, b) => String(b).localeCompare(String(a)) },
  { value: 'name', label: '이름순', key: 'name', compare: (a, b) => String(a).localeCompare(String(b)) },
]

function getMemberTone(status) {
  if (status === '활성') return 'positive'
  if (status === '휴면 예정') return 'warning'
  if (status === '주의') return 'danger'
  return 'default'
}

export function MembersPanelPage() {
  return (
    <>
      <MetricCards items={membersSummary} />
      <PageSection
        eyebrow="Members"
        title="회원 목록"
        action={<button className="text-button" type="button">회원 추가</button>}
      >
        <CollectionWorkspace
          columns={columns}
          rows={membersRows}
          searchKeys={['name', 'email', 'grade']}
          filterKey="status"
          filterOptions={filterOptions}
          sortOptions={sortOptions}
          drawerEyebrow="Member Detail"
          drawerTitle={(row) => row.name}
          getMeta={(row) => [
            { label: '등급', value: row.grade },
            { label: '상태', value: row.status },
            { label: '주문 횟수', value: row.orders },
          ]}
          getDetails={(row) => [
            { label: '이메일', value: row.email },
            { label: '전화번호', value: row.phone },
            { label: '가입일', value: row.joinedAt },
            { label: '마케팅 수신', value: row.marketing },
            { label: '최근 방문', value: row.lastVisit },
            { label: '운영 메모', value: row.memo },
          ]}
        />
      </PageSection>
    </>
  )
}
