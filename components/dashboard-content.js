import { SidebarInset, useSidebar } from "@/components/ui/sidebar"
import { SitesTab } from "./tabs/sites-tab"
import { PaymentsTab } from "./tabs/payments-tab"
import { SettingsTab } from "./tabs/settings-tab"
import { HelpTab } from "./tabs/help-tab"
import { StatisticsTab } from "./tabs/statistics-tab"
import { WithdrawalTab } from "./tabs/withdrawal-tab"
import { Header } from "./header"

export function DashboardContent({ activeTab }) {
  const { isCollapsed } = useSidebar()

  return (
    <SidebarInset className={`bg-transparent overflow-x-hidden flex flex-col h-screen ${isCollapsed ? "ml-0" : ""}`}>
      <Header activeTab={activeTab} />
      <main className="flex-1 p-3 sm:p-4 md:p-6 overflow-y-auto scrollbar-thin">
        {activeTab === "sites" && <SitesTab />}
        {activeTab === "statistics" && <StatisticsTab />}
        {activeTab === "payments" && <PaymentsTab />}
        {activeTab === "withdrawal" && <WithdrawalTab />}
        {activeTab === "settings" && <SettingsTab />}
        {activeTab === "help" && <HelpTab />}
      </main>
    </SidebarInset>
  )
}
