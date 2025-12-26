import { cn } from "@/lib/utils";

interface Win95WindowProps {
  title: string;
  icon?: string;
  children: React.ReactNode;
  className?: string;
}

export function Win95Window({
  title,
  icon = "📅",
  children,
  className,
}: Win95WindowProps) {
  return (
    <div
      className={cn(
        "bg-[#c0c0c0] border-2 border-t-white border-l-white border-r-[#808080] border-b-[#808080]",
        "[box-shadow:inset_-1px_-1px_0_0_#000000,inset_1px_1px_0_0_#dfdfdf]",
        className
      )}
    >
      <div className="flex items-center justify-between bg-gradient-to-r from-[#000080] to-[#1084d0] px-1 py-1">
        <div className="flex items-center gap-1">
          <div className="flex h-4 w-4 items-center justify-center border border-white bg-[#c0c0c0]">
            <span className="text-[10px] font-bold text-black">{icon}</span>
          </div>
          <span
            className="text-sm font-bold text-white"
            style={{
              fontFamily: "'MS Sans Serif', 'Microsoft Sans Serif', sans-serif",
            }}
          >
            {title}
          </span>
        </div>
      </div>
      <div className="p-1">{children}</div>
    </div>
  );
}
