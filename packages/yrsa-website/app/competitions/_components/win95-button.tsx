import Link from "next/link";

interface Win95ButtonProps {
  href?: string;
  children: React.ReactNode;
  variant?: "default" | "primary";
  external?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
}

const baseClasses =
  "inline-flex items-center gap-1 px-4 py-1 text-sm font-bold border-2 border-t-white border-l-white border-r-[#808080] border-b-[#808080] [box-shadow:inset_-1px_-1px_0_0_#000000,inset_1px_1px_0_0_#dfdfdf] active:border-t-[#808080] active:border-l-[#808080] active:border-r-white active:border-b-white";

const variantClasses = {
  default: "bg-[#c0c0c0] text-black hover:bg-[#d4d4d4]",
  primary: "bg-[#000080] text-white hover:bg-[#0000aa]",
};

export function Win95Button({
  href,
  children,
  variant = "default",
  external = false,
  type = "button",
  onClick,
  className = "",
}: Win95ButtonProps) {
  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
