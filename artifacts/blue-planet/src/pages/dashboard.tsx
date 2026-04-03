import { Header } from "@/components/Header";
import { StatCard } from "@/components/StatCard";
import { Waves, Globe, Activity, Thermometer } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="flex flex-col flex-1">
      <Header
        title="Dashboard"
        description="Overview of Blue Planet monitoring systems"
      />
      <div className="p-6 flex flex-col gap-6">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard
            label="Oceans Monitored"
            value="5"
            description="All major ocean basins"
            icon={Waves}
          />
          <StatCard
            label="Active Regions"
            value="142"
            description="Across 6 continents"
            icon={Globe}
          />
          <StatCard
            label="Alerts Today"
            value="3"
            description="2 resolved, 1 open"
            icon={Activity}
          />
          <StatCard
            label="Avg. Sea Temp"
            value="17.4°C"
            description="+0.3°C from last month"
            icon={Thermometer}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="bg-card border border-card-border rounded-lg p-5">
            <h2 className="text-sm font-medium text-foreground mb-3">Recent Activity</h2>
            <ul className="space-y-3">
              {[
                { label: "Arctic ice coverage updated", time: "2 min ago", status: "info" },
                { label: "Pacific current anomaly detected", time: "18 min ago", status: "warning" },
                { label: "Atlantic monitoring resumed", time: "1 hr ago", status: "success" },
                { label: "Indian Ocean sensor calibrated", time: "3 hr ago", status: "info" },
              ].map((item, i) => (
                <li key={i} className="flex items-center justify-between text-sm">
                  <span className="text-foreground">{item.label}</span>
                  <span className="text-muted-foreground text-xs shrink-0 ml-4">{item.time}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-card border border-card-border rounded-lg p-5">
            <h2 className="text-sm font-medium text-foreground mb-3">System Status</h2>
            <ul className="space-y-3">
              {[
                { label: "Satellite feed", status: "Online" },
                { label: "Sensor network", status: "Online" },
                { label: "Data pipeline", status: "Online" },
                { label: "Alert engine", status: "Degraded" },
              ].map((item, i) => (
                <li key={i} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{item.label}</span>
                  <span
                    className={
                      item.status === "Online"
                        ? "text-green-600 dark:text-green-400 font-medium"
                        : "text-yellow-600 dark:text-yellow-400 font-medium"
                    }
                  >
                    {item.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
