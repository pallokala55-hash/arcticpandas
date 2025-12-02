"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function SmoothScroll() {
  const pathname = usePathname();
  const prevPathname = useRef(pathname);

  // Smooth scroll to top when navigating to a new page
  useEffect(() => {
    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname;
      // Check if there's a hash - if so, let the browser handle it
      if (!window.location.hash) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  }, [pathname]);

  // Handle same-page interactions
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");

      if (!anchor) return;

      const href = anchor.getAttribute("href");

      // Handle home link with smooth scroll to top when already on home
      if (href === "/" && pathname === "/") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
        history.pushState(null, "", "/");
        return;
      }

      // Handle anchor links on home page
      if (href?.startsWith("/#") && pathname === "/") {
        const id = href.slice(2);
        const element = document.getElementById(id);

        if (element) {
          e.preventDefault();
          element.scrollIntoView({ behavior: "smooth" });
          history.pushState(null, "", href);
        }
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [pathname]);

  return null;
}
