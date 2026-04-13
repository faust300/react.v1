import { CollectionWorkspace } from '../components/common/CollectionWorkspace'
import { MetricCards } from '../components/common/MetricCards'
import { PageSection } from '../components/common/PageSection'
import { StatusBadge } from '../components/common/StatusBadge'
import { settingsRows, settingsSummary } from '../features/admin/data/adminPageDataV2'

const columns = [
  { key: 'category', label: '분류', emphasis: true, width: '16%' },
  { key: 'item', label: '설정 항목', width: '30%' },
  { key: 'owner', label: '담당자', width: '14%' },
  { key: 'updatedAt', label: '최근 수정', width: '20%' },
  {
    key: 'status',
    label: '상태',
    render: (value) => <StatusBadge tone={getSettingsTone(value)}>{value}</StatusBadge>,
    width: '20%',
  },
]

const filterOptions = [
  { value: 'all', label: '전체 상태' },
  { value: '사용 중', label: '사용 중' },
  { value: '승인 필요', label: '승인 필요' },
  { value: '점검 예정', label: '점검 예정' },
]

const sortOptions = [
  { value: 'updated', label: '최근 수정순', key: 'updatedAt', compare: (a, b) => String(b).localeCompare(String(a)) },
  { value: 'category', label: '분류순', key: 'category', compare: (a, b) => String(a).localeCompare(String(b)) },
]

function getSettingsTone(status) {
  if (status === '사용 중') return 'positive'
  if (status === '승인 필요' || status === '점검 예정') return 'warning'
  return 'default'
}

export function SettingsPanelPage() {
  return (
    <>
      <MetricCards items={settingsSummary} />
      <PageSection
        eyebrow="Settings"
        title="시스템 설정"
        action={<button className="text-button" type="button">설정 저장</button>}
      >
        <CollectionWorkspace
          columns={columns}
          rows={settingsRows}
          searchKeys={['category', 'item', 'owner', 'target']}
          filterKey="status"
          filterOptions={filterOptions}
          sortOptions={sortOptions}
          drawerEyebrow="Setting Detail"
          drawerTitle={(row) => row.item}
          getMeta={(row) => [
            { label: '분류', value: row.category },
            { label: '상태', value: row.status },
            { label: '담당자', value: row.owner },
          ]}
          getDetails={(row) => [
            { label: '적용 범위', value: row.scope },
            { label: '대상', value: row.target },
            { label: '승인자', value: row.approver },
            { label: '최근 수정', value: row.updatedAt },
            { label: '운영 메모', value: row.memo },
          ]}
        />
      </PageSection>
    </>
  )
}
