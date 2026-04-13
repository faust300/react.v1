import { DataTable } from '../components/common/DataTable'
import { MetricCards } from '../components/common/MetricCards'
import { PageSection } from '../components/common/PageSection'
import { StatusBadge } from '../components/common/StatusBadge'
import { analyticsSummary, analyticsTable } from '../features/admin/data/adminPageData'

const columns = [
  { key: 'channel', label: '유입 채널' },
  { key: 'sessions', label: '세션 수' },
  { key: 'conversion', label: '전환율' },
  { key: 'revenue', label: '매출' },
  {
    key: 'trend',
    label: '추세',
    render: (value) => <StatusBadge tone={getTrendTone(value)}>{value}</StatusBadge>,
  },
]

function getTrendTone(status) {
  if (status === '상승') return 'positive'
  if (status === '하락') return 'danger'
  return 'default'
}

export function AnalyticsPage() {
  return (
    <>
      <MetricCards items={analyticsSummary} />
      <PageSection
        eyebrow="Analytics"
        title="채널 성과"
        action={<button className="text-button" type="button">리포트 생성</button>}
      >
        <DataTable columns={columns} rows={analyticsTable} />
      </PageSection>
    </>
  )
}
