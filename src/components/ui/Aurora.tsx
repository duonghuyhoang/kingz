export function Aurora() {
  return (
    <div
      aria-hidden="true"
      className="noise pointer-events-none fixed inset-0 -z-20 overflow-hidden"
    >
      <div className="grid-backdrop absolute inset-0" />
      <div className="absolute -left-40 -top-40 h-[36rem] w-[36rem] animate-aurora rounded-full bg-color-main/20 blur-[120px]" />
      <div
        className="absolute -right-40 top-1/3 h-[32rem] w-[32rem] animate-aurora rounded-full bg-accent/10 blur-[120px]"
        style={{ animationDelay: "-6s" }}
      />
      <div
        className="absolute bottom-0 left-1/3 h-[28rem] w-[28rem] animate-aurora rounded-full bg-color-main/10 blur-[120px]"
        style={{ animationDelay: "-12s" }}
      />
    </div>
  );
}
