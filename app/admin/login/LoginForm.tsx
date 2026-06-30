"use client";

import { useActionState } from "react";
import { loginAdmin, type LoginState } from "./actions";
import { GlassCard } from "@/components/ui/GlassCard";
import { cn } from "@/lib/utils";

const inputClass = cn(
  "w-full rounded-lg px-4 py-3 text-sm",
  "bg-(--color-glass) border border-(--glass-border)",
  "text-(--color-text) placeholder:text-(--color-text-muted)",
  "transition-colors duration-200",
  "focus:outline-none focus:border-accent-gold",
  "disabled:opacity-50 disabled:cursor-not-allowed"
);

export function LoginForm() {
  const [state, formAction, isPending] = useActionState<LoginState, FormData>(
    loginAdmin,
    null
  );

  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-(--color-bg)">
      <GlassCard className="w-full max-w-md">
        {/* Header */}
        <p className="text-xs font-semibold tracking-[0.25em] uppercase text-accent-gold font-heading mb-2">
          管理者
        </p>
        <h1 className="font-heading text-3xl font-bold text-(--color-text) mb-1">
          Admin Panel
        </h1>
        <p className="text-sm text-(--color-text-muted) mb-8">
          Masuk dengan akun administrator
        </p>

        <form action={formAction} className="space-y-4">
          {/* Error banner */}
          {state?.error && (
            <div className="flex items-center gap-2 rounded-xl border border-accent-pink/30 bg-accent-pink/10 px-4 py-3">
              <span className="text-sm text-accent-pink">{state.error}</span>
            </div>
          )}

          {/* Email */}
          <div className="space-y-1.5">
            <label
              htmlFor="email"
              className="block text-xs font-semibold tracking-widest uppercase text-(--color-text-muted) font-heading"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              disabled={isPending}
              placeholder="admin@example.com"
              className={inputClass}
            />
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label
              htmlFor="password"
              className="block text-xs font-semibold tracking-widest uppercase text-(--color-text-muted) font-heading"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              disabled={isPending}
              placeholder="••••••••"
              className={inputClass}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isPending}
            className={cn(
              "w-full rounded-lg px-4 py-3 mt-2",
              "text-sm font-semibold tracking-wide",
              "bg-accent-gold text-black",
              "transition-all duration-200",
              "hover:opacity-90 active:scale-[0.98]",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
          >
            {isPending ? "Masuk..." : "Masuk"}
          </button>
        </form>
      </GlassCard>
    </main>
  );
}
