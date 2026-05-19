import Link from "next/link";

export default function AdminNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
      <h2 className="text-4xl font-bold">404</h2>
      <p className="text-muted-foreground">
        The requested admin page could not be found.
      </p>
      <Link
        href="/admin"
        className="px-4 py-2 bg-accent text-foreground rounded-lg hover:bg-accent/80 transition-colors"
      >
        Return to Dashboard
      </Link>
    </div>
  );
}
