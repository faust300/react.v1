import { DataTable } from '../components/common/DataTable'
import { MetricCards } from '../components/common/MetricCards'
import { PageSection } from '../components/common/PageSection'
import { StatusBadge } from '../components/common/StatusBadge'
import { contentSummary, contentTable } from '../features/admin/data/adminPageData'

const columns = [
  { key: 'title', label: '제목' },
  { key: 'type', label: '유형' },
  { key: 'owner', label: '담당 팀' },
  { key: 'schedule', label: '발행 일정' },
  {
    key: 'status',
    label: '상태',
    render: (value) => <StatusBadge tone={getContentTone(value)}>{value}</StatusBadge>,
  },
]

function getContentTone(status) {
  if (status === '게시 중') return 'positive'
  if (status === '예약 발행' || status === '초안') return 'warning'
  if (status === '검수 필요') return 'danger'
  return 'default'
}

export function ContentPage() {
  return (
    <>
      <MetricCards items={contentSummary} />
      <PageSection
        eyebrow="Content"
        title="콘텐츠 운영"
        action={<button className="text-button" type="button">콘텐츠 작성</button>}
      >
        <DataTable columns={columns} rows={contentTable} />
      </PageSection>
    </>
  )
}
