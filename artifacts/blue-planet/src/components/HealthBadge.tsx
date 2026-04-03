import { HEALTH_STYLES } from "../styles/colors";

interface Props {
  health: string;
}

export function HealthBadge({ health }: Props) {
  const h = HEALTH_STYLES[health] || HEALTH_STYLES["Test"];
  return (
    <span className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-medium ${h.bg} ${h.text} ${h.border}`}>
      {health}
    </span>
  );
}
