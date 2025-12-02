export type NavLink = {
  id: string;
  label: string;
  href: string;
  type?: "anchor" | "route";
};

export const mainNavLinks: NavLink[] = [
  { id: "explore", label: "Explore", href: "/#about" },
  { id: "team", label: "Team", href: "/#team" },
  { id: "contact", label: "Contact", href: "/#cta" },
];

export const headerCta: NavLink = {
  id: "sponsor-deck",
  label: "Sponsor deck",
  href: "/#cta",
};

export const footerLinks: NavLink[] = [
  { id: "facility", label: "Facility", href: "/#hero" },
  { id: "protocol", label: "Protocol", href: "/#about" },
  { id: "roster", label: "Roster", href: "/#team" },
];
