import { useEffect, useState } from "react";
import { Network, Users } from "lucide-react";
import { Card } from "../components/Card";
import { SectionHeader } from "../components/SectionHeader";

interface BusinessUnit {
  id?: string;
  name: string;
  icon?: string;
  description?: string;
  manager?: string;
}

interface SupportPole {
  id?: string;
  name: string;
  icon?: string;
  description?: string;
  manager?: string;
}

interface OrgData {
  businessUnits?: BusinessUnit[];
  supportPoles?: SupportPole[];
}

const WEBHOOK_URL = "https://blueplanet.app.n8n.cloud/webhook/dashboard-data";

export function OrgTab() {
  const [businessUnits, setBusinessUnits] = useState<BusinessUnit[]>([]);
  const [supportPoles, setSupportPoles] = useState<SupportPole[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(WEBHOOK_URL)
      .then((r) => r.json())
      .then((d: OrgData) => {
        if (d.businessUnits?.length) {
          setBusinessUnits(d.businessUnits);
        }
        if (d.supportPoles?.length) {
          setSupportPoles(d.supportPoles);
        }
      })
      .catch((e) => console.error("Org fetch error:", e))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <SectionHeader
          label="Organisation"
          title="Structure organisationnelle"
          icon={Network}
          color="purple"
        />
        <p className="text-center text-slate-500">Chargement...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <SectionHeader
        label="Organisation"
        title="Structure organisationnelle"
        icon={Network}
        color="purple"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Business Units */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Network className="h-5 w-5 text-amber-400" />
            <h2 className="text-lg font-semibold text-white">Unités métier</h2>
          </div>

          {businessUnits.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-slate-500">Aucune unité métier disponible</p>
            </Card>
          ) : (
            <div className="space-y-3">
              {businessUnits.map((unit, idx) => (
                <Card
                  key={unit.id || idx}
                  className="p-4 hover:border-white/[0.12] transition"
                >
                  <div>
                    <h3 className="font-medium text-white">{unit.name}</h3>
                    {unit.description && (
                      <p className="text-xs text-slate-400 mt-1">
                        {unit.description}
                      </p>
                    )}
                    {unit.manager && (
                      <div className="flex items-center gap-2 mt-2 text-xs text-slate-500">
                        <Users className="h-3 w-3" />
                        <span>{unit.manager}</span>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Support Poles */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Users className="h-5 w-5 text-cyan-400" />
            <h2 className="text-lg font-semibold text-white">Pôles support</h2>
          </div>

          {supportPoles.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-slate-500">Aucun pôle support disponible</p>
            </Card>
          ) : (
            <div className="space-y-3">
              {supportPoles.map((pole, idx) => (
                <Card
                  key={pole.id || idx}
                  className="p-4 hover:border-white/[0.12] transition"
                >
                  <div>
                    <h3 className="font-medium text-white">{pole.name}</h3>
                    {pole.description && (
                      <p className="text-xs text-slate-400 mt-1">
                        {pole.description}
                      </p>
                    )}
                    {pole.manager && (
                      <div className="flex items-center gap-2 mt-2 text-xs text-slate-500">
                        <Users className="h-3 w-3" />
                        <span>{pole.manager}</span>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
