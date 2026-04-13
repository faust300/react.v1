import { PageSection } from '../components/common/PageSection'
import { ActivityList } from '../features/dashboard/components/ActivityList'
import { HeroPanel } from '../features/dashboard/components/HeroPanel'
import { StatsGrid } from '../features/dashboard/components/StatsGrid'
import { TaskList } from '../features/dashboard/components/TaskList'
import { useDashboardSummary } from '../hooks/useDashboardSummary'
import { AdminLayout } from '../layouts/AdminLayout'

export function DashboardPage({ activeItem, activeMenu, onNavigate }) {
  const { stats, activities, tasks } = useDashboardSummary()

  return (
    <AdminLayout
      title="기본 관리자 대시보드"
      subtitle="Overview"
      activeItem={activeItem}
      activeMenu={activeMenu}
      onNavigate={onNavigate}
    >
      <StatsGrid stats={stats} />
      <HeroPanel />

      <section className="content-grid">
        <PageSection
          eyebrow="Recent Activity"
          title="최근 활동"
          action={
            <button type="button" className="text-button">
              전체 보기
            </button>
          }
        >
          <ActivityList items={activities} />
        </PageSection>

        <PageSection
          eyebrow="Task List"
          title="할 일"
          action={
            <button type="button" className="text-button">
              일정 관리
            </button>
          }
        >
          <TaskList tasks={tasks} />
        </PageSection>
      </section>
    </AdminLayout>
  )
}
