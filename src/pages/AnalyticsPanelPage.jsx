import { CollectionWorkspace } from '../components/common/CollectionWorkspace'
import { MetricCards } from '../components/common/MetricCards'
import { PageSection } from '../components/common/PageSection'
import { StatusBadge } from '../components/common/StatusBadge'
import { analyticsRows, analyticsSummary } from '../features/admin/data/adminPageDataV2'

const columns = [
  { key: 'channel', label: '유입 채널', emphasis: true, width: '24%' },
  { key: 'sessions', label: '세션 수', width: '18%' },
  { key: 'conversion', label: '전환율', width: '16%' },
  { key: 'revenue', label: '매출', width: '18%' },
  {
    key: 'trend',
    label: '추세',
    render: (value) => <StatusBadge tone={getTrendTone(value)}>{value}</StatusBadge>,
    width: '14%',
  },
]

const filterOptions = [
  { value: 'all', label: '전체 추세' },
  { value: '상승', label: '상승' },
  { value: '유지', label: '유지' },
  { value: '하락', label: '하락' },
]

const sortOptions = [
  { value: 'sessions', label: '세션 많은순', key: 'sessions', compare: (a, b) => parseMetric(b) - parseMetric(a) },
  { value: 'conversion', label: '전환율 높은순', key: 'conversion', compare: (a, b) => parseMetric(b) - parseMetric(a) },
]

function getTrendTone(status) {
  if (status === '상승') return 'positive'
  if (status === '하락') return 'danger'
  return 'default'
}

function parseMetric(value) {
  return Number(String(value).replace(/[^0-9.]/g, ''))
}

export function AnalyticsPanelPage() {
  return (
    <>
      <MetricCards items={analyticsSummary} />
      <PageSection
        eyebrow="Analytics"
        title="채널 성과"
        action={<button className="text-button" type="button">리포트 생성</button>}
      >
        <CollectionWorkspace
          columns={columns}
          rows={analyticsRows}
          searchKeys={['channel', 'campaign', 'memo']}
          filterKey="trend"
          filterOptions={filterOptions}
          sortOptions={sortOptions}
          drawerEyebrow="Analytics Detail"
          drawerTitle={(row) => row.channel}
          getMeta={(row) => [
            { label: '세션 수', value: row.sessions },
            { label: '전환율', value: row.conversion },
            { label: '매출', value: row.revenue },
          ]}
          getDetails={(row) => [
            { label: '추세', value: row.trend },
            { label: '이탈률', value: row.bounce },
            { label: '평균 체류', value: row.avgTime },
            { label: '캠페인', value: row.campaign },
            { label: '운영 메모', value: row.memo },
          ]}
        />
      </PageSection>
    </>
  )
}
