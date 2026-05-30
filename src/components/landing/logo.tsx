import Image from "next/image";
import Link from "next/link";

const LOGO_SRC = "/assets/image/aeroroute-ai-logo.png";

type LogoProps = {
  className?: string;
  priority?: boolean;
  href?: string;
};

export function Logo({
  className = "h-14 w-auto sm:h-16",
  priority = false,
  href = "/",
}: LogoProps) {
  const image = (
    <Image
      src={LOGO_SRC}
      alt="AeroRoute AI — Smarter routes. Better swaps."
      width={1536}
      height={1024}
      className={`block max-w-none ${className}`}
      priority={priority}
    />
  );

  if (!href) {
    return image;
  }

  return (
    <Link href={href} className="inline-block shrink-0">
      {image}
    </Link>
  );
}
