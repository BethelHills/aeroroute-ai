import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const LOGO_SRC = "/assets/image/AeroRoute-AI-logo.png";

type LogoProps = {
  className?: string;
  linkClassName?: string;
  priority?: boolean;
  href?: string;
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
};

export function Logo({
  className = "h-auto w-[130px] md:w-[170px] lg:w-[220px]",
  linkClassName,
  priority = false,
  href = "/",
  src = LOGO_SRC,
  alt = "AeroRoute AI",
  width = 220,
  height = 52,
}: LogoProps) {
  const image = (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={cn("block h-auto max-w-full object-contain object-left", className)}
      priority={priority}
    />
  );

  if (!href) {
    return image;
  }

  return (
    <Link
      href={href}
      className={cn("inline-block min-w-0 max-w-full shrink", linkClassName)}
    >
      {image}
    </Link>
  );
}
