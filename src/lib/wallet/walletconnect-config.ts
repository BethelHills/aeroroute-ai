export function getWalletConnectProjectId(): string | undefined {
  const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID?.trim();
  return projectId || undefined;
}

export function isWalletConnectConfigured(): boolean {
  return Boolean(getWalletConnectProjectId());
}
