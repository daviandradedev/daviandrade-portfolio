"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100dvh",
          display: "grid",
          placeItems: "center",
          padding: "1.5rem",
          background: "#f8f8f5",
          color: "#141413",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <main
          style={{
            width: "min(100%, 32rem)",
            padding: "2rem",
            borderRadius: "16px",
            border: "1px solid #e5e4dc",
            background: "#ffffff",
            textAlign: "center",
          }}
        >
          <p style={{ margin: 0, fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.14em", color: "#243c1d" }}>
            500
          </p>
          <h1 style={{ margin: "0.6rem 0 0", fontSize: "1.5rem", fontWeight: 800 }}>
            Something went wrong
          </h1>
          <p style={{ margin: "0.75rem 0 0", fontSize: "0.92rem", lineHeight: 1.55, color: "#5a5955" }}>
            An unexpected error interrupted this page. Try again or return to daviandrade.dev.
          </p>
          <div style={{ marginTop: "1.5rem", display: "flex", gap: "0.65rem", justifyContent: "center", flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={reset}
              style={{
                minHeight: "2.75rem",
                padding: "0 1.25rem",
                borderRadius: "999px",
                border: "1px solid #243c1d",
                background: "#243c1d",
                color: "#ffffff",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Try again
            </button>
            <button
              type="button"
              onClick={() => window.location.assign("/")}
              style={{
                minHeight: "2.75rem",
                padding: "0 1.25rem",
                borderRadius: "999px",
                border: "1px solid #e5e4dc",
                background: "#ffffff",
                color: "#141413",
                fontWeight: 650,
                cursor: "pointer",
              }}
            >
              Back to home
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
