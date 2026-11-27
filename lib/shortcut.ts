import { useSyncExternalStore } from "react";

function subscribeNoop() {
  return () => {};
}

export function isApplePlatform() {
  if (typeof navigator === "undefined") return false;
  const platform =
    (navigator as Navigator & { userAgentData?: { platform?: string } }).userAgentData
      ?.platform ??
    navigator.platform ??
    navigator.userAgent;
  return /mac|iphone|ipad|ipod/i.test(platform);
}

export function useCommandShortcutLabel() {
  return useSyncExternalStore(
    subscribeNoop,
    () => (isApplePlatform() ? "⌘K" : "Ctrl K"),
    () => "⌘K",
  );
}
