export default function Loading() {
  return (
    <main className="page-shell system-loader-shell" role="status" aria-live="polite">
      <span className="system-spinner" aria-hidden="true" />
      <span className="sr-only">Loading</span>
    </main>
  );
}
