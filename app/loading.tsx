export default function GlobalLoading() {
  return (
    <div className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-3">
        <div className="size-10 rounded-full border-2 border-muted border-t-furniro-gold animate-spin" />
        <p className="text-sm font-medium tracking-wide text-muted-foreground animate-pulse font-heading">
          Loading page content...
        </p>
      </div>
    </div>
  );
}
