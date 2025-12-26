import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

interface Win95CardProps {
  href?: string;
  title: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
}

export function Win95Card({
  href,
  title,
  description,
  imageSrc,
  imageAlt = "",
  className,
}: Win95CardProps) {
  const content = (
    <div
      className={cn(
        "flex w-full flex-col bg-[#c0c0c0] md:flex-row",
        "border-2 border-t-white border-l-white border-r-[#808080] border-b-[#808080]",
        href &&
          "hover:border-t-[#808080] hover:border-l-[#808080] hover:border-r-white hover:border-b-white",
        "[box-shadow:inset_-1px_-1px_0_0_#000000,inset_1px_1px_0_0_#dfdfdf]",
        className
      )}
    >
      {imageSrc && (
        <div className="m-2 border-2 border-t-[#808080] border-l-[#808080] border-r-white border-b-white md:flex-shrink-0">
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={192}
            height={192}
            className="block h-48 w-full object-cover md:h-auto md:w-48"
          />
        </div>
      )}
      <div className="flex flex-col gap-2 p-3">
        <div className="flex items-center gap-1 bg-[#000080] px-1 py-0.5">
          <div className="h-3 w-3 border border-white bg-[#c0c0c0]"></div>
          <h5 className="font-bold text-white">{title}</h5>
        </div>
        <div className="border-2 border-t-[#808080] border-l-[#808080] border-r-white border-b-white bg-white p-2">
          <p className="leading-relaxed text-black">{description}</p>
        </div>
      </div>
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}
