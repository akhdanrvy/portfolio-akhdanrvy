"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  TbLayoutDashboard,
  TbFolderCode,
  TbCertificate,
  TbBriefcase,
  TbBulb,
  TbExternalLink,
  TbLogout,
  TbShieldCheck,
} from "react-icons/tb";
import { cn } from "@/lib/utils";
import { logoutAdmin } from "../actions";

const NAV = [
  { label: "Dashboard",       href: "/admin",                exact: true,  icon: TbLayoutDashboard },
  { label: "Projects",        href: "/admin/projects",       exact: false, icon: TbFolderCode },
  { label: "Certifications",  href: "/admin/certifications", exact: false, icon: TbCertificate },
  { label: "Experiences",     href: "/admin/experiences",    exact: false, icon: TbBriefcase },
  { label: "Innovations",     href: "/admin/innovations",    exact: false, icon: TbBulb },
] as const;

export function AdminSidebar() {
  const pathname = usePathname();

  function isActive(href: string, exact: boolean) {
    return exact ? pathname === href : pathname.startsWith(href);
  }

  return (
    <aside className="w-64 shrink-0 min-h-dvh border-r border-(--glass-border) bg-(--color-glass) backdrop-blur-xl flex flex-col p-5">
      {/* Branding */}
      <div className="mb-8 px-2">
        <Link href="/admin" className="flex items-center gap-2 group">
          <span className="font-heading text-2xl font-bold tracking-wider text-(--color-text)">
            RVY
          </span>
          <span className="h-2 w-2 rounded-full bg-(--color-accent-gold) shadow-[0_0_8px_rgba(201,168,76,0.6)]" />
          <span className="ml-auto text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full border border-accent-gold/40 bg-accent-gold/10 text-accent-gold font-semibold flex items-center gap-1">
            <TbShieldCheck size={12} /> Admin
          </span>
        </Link>
        <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-(--color-text-muted) font-heading mt-1">
          管理者パネル
        </p>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-1.5" aria-label="Admin Navigation">
        {NAV.map(({ label, href, exact, icon: Icon }) => {
          const active = isActive(href, exact);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "group relative flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all duration-200",
                active
                  ? "bg-(--color-glass-hover) text-(--color-accent-gold) border border-accent-gold/30 shadow-sm"
                  : "text-(--color-text-muted) hover:text-(--color-text) hover:bg-(--color-glass-hover)"
              )}
            >
              {/* Active gold bar */}
              {active && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-1 rounded-r-full bg-(--color-accent-gold)" />
              )}
              <Icon
                size={18}
                className={cn(
                  "transition-transform duration-200 group-hover:scale-110",
                  active ? "text-(--color-accent-gold)" : "text-(--color-text-muted) group-hover:text-(--color-text)"
                )}
              />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="flex-1" />

      {/* Bottom Section */}
      <div className="flex flex-col gap-2 pt-6 border-t border-(--glass-border)">
        {/* View Live Portfolio link */}
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-semibold text-(--color-text-muted) border border-(--glass-border) hover:text-(--color-text) hover:border-accent-pink/40 hover:bg-(--color-glass-hover) transition-all duration-150"
        >
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
            Live Website
          </span>
          <TbExternalLink size={14} />
        </Link>

        {/* Logout */}
        <form action={logoutAdmin}>
          <button
            type="submit"
            className="w-full flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-xs font-medium text-left text-red-400/80 border border-red-500/20 hover:text-red-300 hover:border-red-500/40 hover:bg-red-500/10 transition-all duration-150 cursor-pointer"
          >
            <TbLogout size={14} />
            Logout Session
          </button>
        </form>
      </div>
    </aside>
  );
}
