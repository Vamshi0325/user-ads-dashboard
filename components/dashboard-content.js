import { SitesTab } from "./tabs/sites-tab"
import { PaymentsTab } from "./tabs/payments-tab"
import { SettingsTab } from "./tabs/settings-tab"
import { HelpTab } from "./tabs/help-tab"
import { StatisticsTab } from "./tabs/statistics-tab"
import { WithdrawalTab } from "./tabs/withdrawal-tab"

export function DashboardContent({ activeTab, setActiveTab }) {
  return (
    <main className="flex-1 p-3 sm:p-4 md:p-6 overflow-y-auto scrollbar-thin">
      {activeTab === "sites" && <SitesTab />}
      {activeTab === "statistics" && <StatisticsTab />}
      {activeTab === "payments" && <PaymentsTab />}
      {activeTab === "withdrawal" && <WithdrawalTab setActiveTab={setActiveTab} />}
      {activeTab === "settings" && <SettingsTab />}
      {activeTab === "help" && <HelpTab />}
    </main>
  )
}
