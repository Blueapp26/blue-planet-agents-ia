import { Header } from "@/components/Header";

const events = [
  { id: 1, title: "Arctic ice coverage data updated", category: "Data", time: "Today, 10:42 AM", severity: "info" },
  { id: 2, title: "Pacific current anomaly detected in North Pacific region", category: "Alert", time: "Today, 10:26 AM", severity: "warning" },
  { id: 3, title: "Atlantic monitoring station back online", category: "System", time: "Today, 09:11 AM", severity: "success" },
  { id: 4, title: "Indian Ocean sensor calibration complete", category: "Maintenance", time: "Today, 07:55 AM", severity: "info" },
  { id: 5, title: "Southern Ocean buoy battery low (Station SO-09)", category: "Alert", time: "Yesterday, 11:30 PM", severity: "warning" },
  { id: 6, title: "Daily report generated", category: "System", time: "Yesterday, 12:00 AM", severity: "info" },
];

const severityStyle: Record<string, string> = {
  info: "bg-primary/10 text-primary",
  warning: "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400",
  success: "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400",
};

export default function ActivityPage() {
  return (
    <div className="flex flex-col flex-1">
      <Header title="Activity" description="System events and monitoring alerts" />
      <div className="p-6">
        <div className="flex flex-col gap-2">
          {events.map((event) => (
            <div key={event.id} className="bg-card border border-card-border rounded-lg px-5 py-4 flex items-start gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground">{event.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{event.time}</p>
              </div>
              <span className={`text-xs font-medium px-2 py-0.5 rounded shrink-0 ${severityStyle[event.severity]}`}>
                {event.category}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
