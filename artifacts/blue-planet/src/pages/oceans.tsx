import { Header } from "@/components/Header";

const oceans = [
  { name: "Pacific Ocean", area: "165,250,000 km²", avgDepth: "4,028 m", temp: "16.4°C", status: "Nominal" },
  { name: "Atlantic Ocean", area: "106,460,000 km²", avgDepth: "3,332 m", temp: "17.1°C", status: "Nominal" },
  { name: "Indian Ocean", area: "70,560,000 km²", avgDepth: "3,963 m", temp: "26.8°C", status: "Nominal" },
  { name: "Southern Ocean", area: "21,960,000 km²", avgDepth: "3,270 m", temp: "2.1°C", status: "Alert" },
  { name: "Arctic Ocean", area: "14,060,000 km²", avgDepth: "1,205 m", temp: "-1.8°C", status: "Nominal" },
];

export default function OceansPage() {
  return (
    <div className="flex flex-col flex-1">
      <Header title="Oceans" description="Major ocean basin monitoring" />
      <div className="p-6">
        <div className="bg-card border border-card-border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-card-border">
                <th className="text-left px-5 py-3 text-muted-foreground font-medium">Ocean</th>
                <th className="text-left px-5 py-3 text-muted-foreground font-medium">Area</th>
                <th className="text-left px-5 py-3 text-muted-foreground font-medium">Avg Depth</th>
                <th className="text-left px-5 py-3 text-muted-foreground font-medium">Avg Temp</th>
                <th className="text-left px-5 py-3 text-muted-foreground font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {oceans.map((ocean, i) => (
                <tr key={i} className="border-b border-card-border last:border-0">
                  <td className="px-5 py-3 font-medium text-foreground">{ocean.name}</td>
                  <td className="px-5 py-3 text-muted-foreground">{ocean.area}</td>
                  <td className="px-5 py-3 text-muted-foreground">{ocean.avgDepth}</td>
                  <td className="px-5 py-3 text-muted-foreground">{ocean.temp}</td>
                  <td className="px-5 py-3">
                    <span
                      className={
                        ocean.status === "Nominal"
                          ? "text-green-600 dark:text-green-400 font-medium"
                          : "text-yellow-600 dark:text-yellow-400 font-medium"
                      }
                    >
                      {ocean.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
