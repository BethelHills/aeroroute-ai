/**
 * Resolves the Aomi runtime base URL for the current environment.
 * In the browser, cross-origin API URLs are rewritten to the same-origin proxy
 * (`/api/aomi`) so chat requests are not blocked by CORS.
 */
export function resolveAomiBackendUrl(explicit?: string): string {
  if (explicit) return explicit;

  const env = process.env.NEXT_PUBLIC_BACKEND_URL?.trim();

  if (typeof window !== "undefined") {
    if (!env || /^https?:\/\//i.test(env)) {
      return `${window.location.origin}/api/aomi`;
    }
    if (env.startsWith("/")) {
      return `${window.location.origin}${env}`;
    }
    return `${window.location.origin}/${env}`;
  }

  if (env) return env;
  return "https://api.aomi.dev";
}

/** Server-side upstream target for the `/api/aomi` proxy (rewrites). */
export function resolveAomiProxyTarget(): string {
  const target =
    process.env.AOMI_BACKEND_PROXY_TARGET?.trim() ??
    process.env.NEXT_PUBLIC_BACKEND_URL?.trim() ??
    "https://api.aomi.dev";

  return target.replace(/\/$/, "");
}
