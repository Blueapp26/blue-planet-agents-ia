import { Header } from "@/components/Header";

const regions = [
  { name: "North Atlantic", continent: "Atlantic", stations: 28, alerts: 0 },
  { name: "South Atlantic", continent: "Atlantic", stations: 19, alerts: 1 },
  { name: "North Pacific", continent: "Pacific", stations: 34, alerts: 0 },
  { name: "South Pacific", continent: "Pacific", stations: 22, alerts: 0 },
  { name: "Arabian Sea", continent: "Indian", stations: 15, alerts: 0 },
  { name: "Bay of Bengal", continent: "Indian", stations: 11, alerts: 0 },
  { name: "Southern Ocean West", continent: "Southern", stations: 9, alerts: 1 },
  { name: "Arctic Basin", continent: "Arctic", stations: 7, alerts: 1 },
];

export default function RegionsPage() {
  return (
    <div className="flex flex-col flex-1">
      <Header title="Regions" description="Monitoring stations by geographic region" />
      <div className="p-6">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {regions.map((region, i) => (
            <div key={i} className="bg-card border border-card-border rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium text-sm text-foreground">{region.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{region.continent} Ocean</p>
                </div>
                {region.alerts > 0 && (
                  <span className="text-xs font-medium text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 px-2 py-0.5 rounded">
                    {region.alerts} alert{region.alerts > 1 ? "s" : ""}
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                {region.stations} monitoring stations
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
