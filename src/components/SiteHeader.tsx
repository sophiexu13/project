"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ctaItem, navItems } from "@/lib/content";
import { Brand } from "@/components/Brand";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  return (
    <div className="site-header">
      <nav className="nav" aria-label="Main navigation">
        <Brand />
        <button
          className="nav-toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="navLinks"
          onClick={() => setOpen(!open)}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
        <ul className={"navlinks" + (open ? " open" : "")} id="navLinks">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href} aria-current={pathname === item.href ? "page" : undefined}>
                {item.label}
              </Link>
            </li>
          ))}
          <li className="nav-cta">
            <Link href={ctaItem.href} aria-current={pathname === ctaItem.href ? "page" : undefined}>
              {ctaItem.label}
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
