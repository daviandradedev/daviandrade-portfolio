"use client";

import { useEffect } from "react";
import { SystemStatusView } from "@/components/system-status";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <SystemStatusView kind="error" digest={error.digest} onRetry={reset} />;
}
