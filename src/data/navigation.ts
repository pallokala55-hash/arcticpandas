export type NavLink = {
  id: string;
  label: string;
  href: string;
  type?: "anchor" | "route";
};

export const mainNavLinks: NavLink[] = [
  { id: "team", label: "Team", href: "/#team" },
  { id: "matches", label: "Matches", href: "/matches", type: "route" },
  { id: "contact", label: "Contact", href: "/#contact" },
];

export const headerCta: NavLink = {
  id: "sponsor-deck",
  label: "Sponsor deck",
  href: "/for-partners",
};

export const footerLinks: NavLink[] = [
  { id: "roster", label: "Roster", href: "/#team" },
];
