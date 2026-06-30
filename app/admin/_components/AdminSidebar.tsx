"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { logoutAdmin } from "../actions";

const NAV = [
  { label: "Dashboard",       href: "/admin",                exact: true  },
  { label: "Projects",        href: "/admin/projects",       exact: false },
  { label: "Certifications",  href: "/admin/certifications", exact: false },
] as const;

export function AdminSidebar() {
  const pathname = usePathname();

  function isActive(href: string, exact: boolean) {
    return exact ? pathname === href : pathname.startsWith(href);
  }

  return (
    <aside className="w-56 shrink-0 min-h-dvh border-r border-(--glass-border) bg-(--color-glass) backdrop-blur-sm flex flex-col p-4">
      {/* Branding */}
      <div className="mb-6 px-2">
        <p className="text-xs font-semibold tracking-[0.25em] uppercase text-accent-gold font-heading">
          管理者
        </p>
        <p className="font-heading text-sm font-bold text-(--color-text) mt-0.5">
          Admin Panel
        </p>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-1">
        {NAV.map(({ label, href, exact }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "rounded-lg px-3 py-2 text-sm transition-colors duration-150",
              isActive(href, exact)
                ? "bg-(--color-glass-hover) text-(--color-text) font-medium"
                : "text-(--color-text-muted) hover:text-(--color-text) hover:bg-(--color-glass-hover)"
            )}
          >
            {label}
          </Link>
        ))}
      </nav>

      <div className="flex-1" />

      {/* Logout */}
      <form action={logoutAdmin}>
        <button
          type="submit"
          className="w-full rounded-lg px-3 py-2 text-sm text-left text-(--color-text-muted) border border-(--glass-border) hover:text-(--color-text) hover:border-accent-pink/40 transition-colors duration-150"
        >
          Logout
        </button>
      </form>
    </aside>
  );
}
