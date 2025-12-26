import { cn } from "@/lib/utils";
import { Check, Info, AlertTriangle, X } from "lucide-react";

type AlertSeverity = "success" | "info" | "warning" | "error";

interface AlertProps {
  severity?: AlertSeverity;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const severityConfig = {
  success: {
    bgColor: "bg-[#C0DCC0]",
    iconBg: "bg-[#008000]",
    icon: Check,
    iconText: "text-white",
  },
  info: {
    bgColor: "bg-[#C0D8E8]",
    iconBg: "bg-[#000080]",
    icon: Info,
    iconText: "text-white",
  },
  warning: {
    bgColor: "bg-[#F0E0A0]",
    iconBg: "bg-[#FFFF00]",
    icon: AlertTriangle,
    iconText: "text-black",
  },
  error: {
    bgColor: "bg-[#F0C0C0]",
    iconBg: "bg-[#FF0000]",
    icon: X,
    iconText: "text-white",
  },
};

export function Alert({
  severity = "info",
  title,
  children,
  className,
}: AlertProps) {
  const config = severityConfig[severity];
  const IconComponent = config.icon;

  return (
    <div
      className={cn(
        "flex gap-3 p-3",
        config.bgColor,
        "border-t-2 border-l-2 border-r-2 border-b-2",
        "border-t-white border-l-white border-r-[#808080] border-b-[#808080]",
        "[box-shadow:inset_1px_1px_0_#DFDFDF,inset_-1px_-1px_0_#000000]",
        className
      )}
    >
      <div
        className={cn(
          "flex h-8 w-8 flex-shrink-0 items-center justify-center",
          config.iconBg,
          "border-t-2 border-l-2 border-r-2 border-b-2",
          "border-t-white border-l-white border-r-black border-b-black",
          "[box-shadow:inset_1px_1px_0_rgba(255,255,255,0.3)]"
        )}
      >
        <IconComponent className={cn("h-5 w-5", config.iconText)} />
      </div>
      <div className="min-w-0 flex-1">
        {title && (
          <div className="mb-1 text-lg font-bold text-black">{title}</div>
        )}
        <div className="text-black">{children}</div>
      </div>
    </div>
  );
}
