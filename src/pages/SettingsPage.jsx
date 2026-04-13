import { DataTable } from '../components/common/DataTable'
import { MetricCards } from '../components/common/MetricCards'
import { PageSection } from '../components/common/PageSection'
import { StatusBadge } from '../components/common/StatusBadge'
import { settingsSummary, settingsTable } from '../features/admin/data/adminPageData'

const columns = [
  { key: 'category', label: '분류' },
  { key: 'item', label: '설정 항목' },
  { key: 'owner', label: '담당자' },
  { key: 'updatedAt', label: '최근 수정' },
  {
    key: 'status',
    label: '상태',
    render: (value) => <StatusBadge tone={getSettingsTone(value)}>{value}</StatusBadge>,
  },
]

function getSettingsTone(status) {
  if (status === '사용 중') return 'positive'
  if (status === '승인 필요' || status === '점검 예정') return 'warning'
  return 'default'
}

export function SettingsPage() {
  return (
    <>
      <MetricCards items={settingsSummary} />
      <PageSection
        eyebrow="Settings"
        title="시스템 설정"
        action={<button className="text-button" type="button">설정 저장</button>}
      >
        <DataTable columns={columns} rows={settingsTable} />
      </PageSection>
    </>
  )
}
