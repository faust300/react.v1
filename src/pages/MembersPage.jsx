import { DataTable } from '../components/common/DataTable'
import { MetricCards } from '../components/common/MetricCards'
import { PageSection } from '../components/common/PageSection'
import { StatusBadge } from '../components/common/StatusBadge'
import { membersSummary, membersTable } from '../features/admin/data/adminPageData'

const columns = [
  { key: 'name', label: '회원명' },
  { key: 'email', label: '이메일' },
  { key: 'grade', label: '등급' },
  { key: 'orders', label: '주문 횟수' },
  { key: 'joinedAt', label: '가입일' },
  {
    key: 'status',
    label: '상태',
    render: (value) => <StatusBadge tone={getMemberTone(value)}>{value}</StatusBadge>,
  },
]

function getMemberTone(status) {
  if (status === '활성') return 'positive'
  if (status === '휴면 예정') return 'warning'
  if (status === '주의') return 'danger'
  return 'default'
}

export function MembersPage() {
  return (
    <>
      <MetricCards items={membersSummary} />
      <PageSection
        eyebrow="Members"
        title="회원 목록"
        action={<button className="text-button" type="button">회원 추가</button>}
      >
        <DataTable columns={columns} rows={membersTable} />
      </PageSection>
    </>
  )
}
