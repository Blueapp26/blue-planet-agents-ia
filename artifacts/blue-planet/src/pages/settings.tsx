import { Header } from "@/components/Header";

export default function SettingsPage() {
  return (
    <div className="flex flex-col flex-1">
      <Header title="Settings" description="Application preferences and configuration" />
      <div className="p-6 flex flex-col gap-6 max-w-lg">
        <div className="bg-card border border-card-border rounded-lg divide-y divide-card-border">
          {[
            { label: "Organization", value: "Blue Planet Institute" },
            { label: "Time zone", value: "UTC" },
            { label: "Data refresh rate", value: "Every 15 minutes" },
            { label: "Alert notifications", value: "Enabled" },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between px-5 py-4">
              <span className="text-sm text-muted-foreground">{item.label}</span>
              <span className="text-sm text-foreground font-medium">{item.value}</span>
            </div>
          ))}
        </div>

        <div className="bg-card border border-card-border rounded-lg p-5">
          <h2 className="text-sm font-medium text-foreground mb-1">About</h2>
          <p className="text-xs text-muted-foreground">
            Blue Planet Command Center v1.0.0. A monitoring dashboard for global ocean and environmental data.
          </p>
        </div>
      </div>
    </div>
  );
}
