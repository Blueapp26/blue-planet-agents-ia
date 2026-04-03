import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className = "", hover = false }: Props) {
  return (
    <div
      className={`rounded-xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm ${
        hover ? "transition-all duration-200 hover:border-white/[0.12] hover:bg-white/[0.04]" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
