import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

const LOGO_SRC = "/assets/image/aeroroute-ai-logo.png";

type LogoProps = {
  className?: string;
  linkClassName?: string;
  priority?: boolean;
  href?: string;
  width?: number;
  height?: number;
};

export function Logo({
  className = "h-auto w-52 sm:w-60",
  linkClassName,
  priority = false,
  href = "/",
  width = 1536,
  height = 1024,
}: LogoProps) {
  const image = (
    <Image
      src={LOGO_SRC}
      alt="AeroRoute AI — Smarter routes. Better swaps."
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
