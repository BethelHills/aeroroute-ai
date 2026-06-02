export function isWalletConnectUserDismissedError(error: unknown): boolean {
  const message =
    error instanceof Error
      ? error.message
      : typeof error === "string"
        ? error
        : "";

  return (
    /connection request reset/i.test(message) ||
    /user rejected/i.test(message) ||
    /user closed/i.test(message) ||
    /rejected/i.test(message)
  );
}

export function formatWalletConnectError(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  return "Could not connect with WalletConnect. Try again.";
}
