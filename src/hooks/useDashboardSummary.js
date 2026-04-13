import {
  dashboardStats,
  dashboardTasks,
  recentActivities,
} from '../features/dashboard/data/dashboardData'

export function useDashboardSummary() {
  return {
    stats: dashboardStats,
    activities: recentActivities,
    tasks: dashboardTasks,
  }
}
