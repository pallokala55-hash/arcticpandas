import Logo from "@/components/layout/Logo";
import SearchBox from "@/components/layout/SearchBox";

export default function Hero() {
  return (
    <section className="relative mx-auto max-w-3xl px-4 pb-14 pt-16 text-center sm:px-6">
      <div className="mb-6 flex items-center justify-center gap-4">
        <Logo size={56} />
        <span className="text-4xl font-black tracking-tight text-white sm:text-5xl">
          NLC<span className="text-accent-soft">.TRACKER</span>
        </span>
      </div>

      <SearchBox size="hero" placeholder="Search team, player, event…" />

      <p className="mt-12 text-xs font-semibold tracking-[0.35em] text-muted sm:text-sm">
        FOLLOW EVERY GAME OF THE
      </p>
      <h1 className="mt-2 text-5xl font-black uppercase leading-none tracking-tight text-white/90 sm:text-7xl">
        Northern
        <br />
        League
        <span className="ml-3 inline-block translate-y-[-0.5em] rounded-lg border border-white/15 bg-panel-2 px-2 py-1 align-middle text-xs font-bold tracking-widest text-white/80 sm:text-sm">
          NLC
        </span>
      </h1>
      <p className="mx-auto mt-4 max-w-md text-sm text-muted">
        Matches, brackets, standings and player stats for the Nordic tier-2
        circuit — an Arctic Pandas project.
      </p>
    </section>
  );
}
