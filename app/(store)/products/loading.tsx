export default function Loading() {
  return (
    <div className="w-full min-h-screen bg-background animate-pulse">
      <div className="w-full h-[300px] bg-muted" />

      <div className="w-full bg-furniro-beige border-y border-border py-6 px-4 md:px-12">
        <div className="container-center flex flex-col xl:flex-row justify-between gap-4 h-11 bg-muted/60 rounded-sm" />
      </div>

      <div className="container-center py-16 px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-4">
              <div className="aspect-square w-full bg-muted rounded-sm" />
              <div className="h-6 w-3/4 bg-muted rounded-sm" />
              <div className="h-4 w-1/2 bg-muted rounded-sm" />
              <div className="h-5 w-1/4 bg-muted rounded-sm" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
