import Link from "next/link";
import SearchBox from "./SearchBox";
import Logo from "./Logo";

const navLinks = [
  { href: "/news", label: "News" },
  { href: "/matches", label: "Matches" },
  { href: "/events", label: "Events" },
  { href: "/forum", label: "Forum" },
];

export default function TopNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-ink/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-6 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <Logo size={26} />
          <span className="text-sm font-extrabold tracking-widest text-white">
            NLC<span className="text-accent-soft">.TRACKER</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-lg px-3 py-1.5 text-sm font-medium text-muted transition-colors hover:bg-white/[0.06] hover:text-white"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto hidden w-64 sm:block">
          <SearchBox />
        </div>

        <button
          type="button"
          className="ml-auto rounded-xl bg-white px-4 py-1.5 text-sm font-semibold text-ink transition-opacity hover:opacity-85 sm:ml-0"
        >
          Sign in
        </button>
      </div>
    </header>
  );
}
