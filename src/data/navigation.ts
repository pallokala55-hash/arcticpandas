export type NavLink = {
  id: string;
  label: string;
  href: string;
  type?: "anchor" | "route";
};

export const mainNavLinks: NavLink[] = [
  { id: "team", label: "Team", href: "/#team" },
  { id: "contact", label: "Contact", href: "/#cta" },
];

export const headerCta: NavLink = {
  id: "sponsor-deck",
  label: "Sponsor deck",
  href: "/#cta",
};

export const footerLinks: NavLink[] = [
  { id: "roster", label: "Roster", href: "/#team" },
];
