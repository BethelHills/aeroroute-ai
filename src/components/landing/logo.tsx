import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/** Canonical path — must match filename in public/ (case-sensitive on Linux). */
export const LOGO_SRC = "/AeroRoute-AI-logo.png";

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
  className = "h-auto w-[100px] sm:w-[130px] md:w-[170px] lg:w-[220px]",
  linkClassName,
  priority = false,
  href = "/",
  src = LOGO_SRC,
  alt = "AeroRoute AI",
  width = 1536,
  height = 1024,
}: LogoProps) {
  const image = (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes="(max-width: 640px) 100px, (max-width: 768px) 130px, (max-width: 1024px) 170px, 220px"
      className={cn("block h-auto w-auto max-w-full object-contain object-left", className)}
      priority={priority}
    />
  );

  if (!href) {
    return image;
  }

  return (
    <Link
      href={href}
      className={cn("inline-flex shrink-0 items-center", linkClassName)}
    >
      {image}
    </Link>
  );
}
