import { ContentPanelPage } from '../pages/ContentPanelPage'
import { DashboardPage } from '../pages/DashboardPage'
import { MembersPanelPage } from '../pages/MembersPanelPage'
import { OrdersPanelPage } from '../pages/OrdersPanelPage'
import { ProductsPanelPage } from '../pages/ProductsPanelPage'
import { AnalyticsPanelPage } from '../pages/AnalyticsPanelPage'
import { SettingsPanelPage } from '../pages/SettingsPanelPage'

export const pageRegistry = {
  dashboard: DashboardPage,
  orders: OrdersPanelPage,
  members: MembersPanelPage,
  products: ProductsPanelPage,
  content: ContentPanelPage,
  analytics: AnalyticsPanelPage,
  settings: SettingsPanelPage,
}
