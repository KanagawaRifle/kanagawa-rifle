import type { ReactNode } from "react";
import "./cern.css";

interface CernBackgroundProps {
  children: ReactNode;
}

export function CernBackground({ children }: CernBackgroundProps) {
  return (
    <div className="cern-page">
      <div className="mx-auto max-w-3xl px-4 py-8">{children}</div>
    </div>
  );
}
