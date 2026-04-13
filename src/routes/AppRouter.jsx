import { useState } from 'react'
import { navigationItems } from '../constants/navigation'
import { pageRegistry } from '../constants/pageRegistry'
import { AdminLayout } from '../layouts/AdminLayout'

export function AppRouter() {
  const [activePageId, setActivePageId] = useState('dashboard')

  const activePage = navigationItems.find((item) => item.id === activePageId) ?? navigationItems[0]
  const ActiveComponent = pageRegistry[activePage.id]

  if (activePage.id === 'dashboard') {
    return (
      <ActiveComponent
        activeItem={activePage}
        activeMenu={activePageId}
        onNavigate={setActivePageId}
      />
    )
  }

  return (
    <AdminLayout
      title={activePage.title}
      subtitle={activePage.subtitle}
      activeItem={activePage}
      activeMenu={activePageId}
      onNavigate={setActivePageId}
    >
      <ActiveComponent />
    </AdminLayout>
  )
}
