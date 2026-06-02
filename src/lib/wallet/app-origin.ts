/** Origin used for WalletConnect metadata — must match the page URL. */
export function getAppOrigin(): string {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }

  const explicit = process.env.NEXT_PUBLIC_APP_URL?.trim();
  if (explicit) {
    return explicit.replace(/\/$/, "");
  }

  const vercelUrl = process.env.NEXT_PUBLIC_VERCEL_URL?.trim();
  if (vercelUrl) {
    return vercelUrl.startsWith("http")
      ? vercelUrl.replace(/\/$/, "")
      : `https://${vercelUrl}`;
  }

  return "https://aeroroute.ai";
}
