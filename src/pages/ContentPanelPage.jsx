import { CollectionWorkspace } from '../components/common/CollectionWorkspace'
import { MetricCards } from '../components/common/MetricCards'
import { PageSection } from '../components/common/PageSection'
import { StatusBadge } from '../components/common/StatusBadge'
import { contentRows, contentSummary } from '../features/admin/data/adminPageDataV2'

const columns = [
  { key: 'title', label: '제목', emphasis: true, width: '32%' },
  { key: 'type', label: '유형', width: '14%' },
  { key: 'owner', label: '담당 팀', width: '16%' },
  { key: 'schedule', label: '발행 일정', width: '20%' },
  {
    key: 'status',
    label: '상태',
    render: (value) => <StatusBadge tone={getContentTone(value)}>{value}</StatusBadge>,
    width: '18%',
  },
]

const filterOptions = [
  { value: 'all', label: '전체 상태' },
  { value: '게시 중', label: '게시 중' },
  { value: '예약 발행', label: '예약 발행' },
  { value: '검수 필요', label: '검수 필요' },
  { value: '초안', label: '초안' },
]

const sortOptions = [
  { value: 'updated', label: '최근 수정순', key: 'updatedAt', compare: (a, b) => String(b).localeCompare(String(a)) },
  { value: 'schedule', label: '발행 일정순', key: 'schedule', compare: (a, b) => String(a).localeCompare(String(b)) },
]

function getContentTone(status) {
  if (status === '게시 중') return 'positive'
  if (status === '예약 발행' || status === '초안') return 'warning'
  if (status === '검수 필요') return 'danger'
  return 'default'
}

export function ContentPanelPage() {
  return (
    <>
      <MetricCards items={contentSummary} />
      <PageSection
        eyebrow="Content"
        title="콘텐츠 운영"
        action={<button className="text-button" type="button">콘텐츠 작성</button>}
      >
        <CollectionWorkspace
          columns={columns}
          rows={contentRows}
          searchKeys={['title', 'type', 'owner']}
          filterKey="status"
          filterOptions={filterOptions}
          sortOptions={sortOptions}
          drawerEyebrow="Content Detail"
          drawerTitle={(row) => row.title}
          getMeta={(row) => [
            { label: '유형', value: row.type },
            { label: '상태', value: row.status },
            { label: '채널', value: row.channel },
          ]}
          getDetails={(row) => [
            { label: '담당 팀', value: row.owner },
            { label: '발행 일정', value: row.schedule },
            { label: '승인자', value: row.approver },
            { label: '최근 수정', value: row.updatedAt },
            { label: '게시 채널', value: row.channel },
            { label: '운영 메모', value: row.memo },
          ]}
        />
      </PageSection>
    </>
  )
}
