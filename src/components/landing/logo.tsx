import Image from "next/image";

const LOGO_SRC = "/assets/image/AeroRoute%20AI.logo.png";

type LogoProps = {
  className?: string;
  priority?: boolean;
};

export function Logo({ className = "h-10 w-auto", priority = false }: LogoProps) {
  return (
    <Image
      src={LOGO_SRC}
      alt="AeroRoute AI — Smarter routes. Better swaps."
      width={1536}
      height={1024}
      className={className}
      priority={priority}
    />
  );
}
