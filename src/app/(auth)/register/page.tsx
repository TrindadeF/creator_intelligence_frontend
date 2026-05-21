"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react";
import { authApi } from "@/lib/api";
import { setTokens } from "@/lib/auth";

const schema = z.object({
  name:     z.string().min(2, "Name must be at least 2 characters"),
  email:    z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  niche:    z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const niches = [
  "Dance & Music", "Comedy", "Lifestyle", "Beauty & Fashion",
  "Food & Cooking", "Fitness", "Education", "Gaming",
  "Travel", "Tech", "Finance", "Other",
];

export default function RegisterPage() {
  const router = useRouter();
  const [showPw, setShowPw] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setApiError(null);
    try {
      const res = await authApi.register(data.name, data.email, data.password, data.niche);
      setTokens(res.access_token, res.refresh_token);
      router.push("/dashboard");
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { errors?: string[] } } })?.response?.data?.errors?.[0] ??
        "Registration failed. Please try again.";
      setApiError(message);
    }
  };

  return (
    <div className="min-h-screen bg-bg-base grid-bg flex items-center justify-center px-4 py-12">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-cyan-glow/5 blur-[120px]" />
      </div>

      <div className="w-full max-w-sm relative animate-slide-up opacity-0" style={{ animationFillMode: "forwards" }}>
        <div className="mb-10 text-center">
          <span className="label tracking-[0.3em]">Creator Intelligence</span>
          <h1 className="mt-3 font-display text-3xl font-bold text-ink-50 tracking-tight">Start your journey</h1>
          <p className="mt-2 text-sm text-ink-400">Understand your TikTok performance like never before</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {[
            { id: "name",  label: "Your name",  type: "text",     autocomplete: "name",     placeholder: "Creator name" },
            { id: "email", label: "Email",       type: "email",    autocomplete: "email",    placeholder: "you@example.com" },
          ].map(({ id, label, type, autocomplete, placeholder }) => (
            <div key={id} className="space-y-1.5">
              <label className="label" htmlFor={id}>{label}</label>
              <input id={id} type={type} autoComplete={autocomplete} placeholder={placeholder}
                className="w-full bg-bg-raised border border-border rounded-lg px-4 py-3 text-sm text-ink-100 placeholder-ink-600 outline-none transition-all duration-200 focus:border-cyan-glow focus:shadow-glow-cyan"
                {...register(id as "name" | "email")} />
              {errors[id as "name" | "email"] && (
                <p className="text-xs text-rose-glow">{errors[id as "name" | "email"]?.message}</p>
              )}
            </div>
          ))}

          <div className="space-y-1.5">
            <label className="label" htmlFor="password">Password</label>
            <div className="relative">
              <input id="password" type={showPw ? "text" : "password"} autoComplete="new-password" placeholder="8+ characters"
                className="w-full bg-bg-raised border border-border rounded-lg px-4 py-3 pr-10 text-sm text-ink-100 placeholder-ink-600 outline-none transition-all duration-200 focus:border-cyan-glow focus:shadow-glow-cyan"
                {...register("password")} />
              <button type="button" onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-600 hover:text-ink-400 transition-colors">
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && <p className="text-xs text-rose-glow">{errors.password.message}</p>}
          </div>

          <div className="space-y-1.5">
            <label className="label" htmlFor="niche">Content niche <span className="text-ink-600">(optional)</span></label>
            <select id="niche"
              className="w-full bg-bg-raised border border-border rounded-lg px-4 py-3 text-sm text-ink-100 outline-none transition-all duration-200 focus:border-cyan-glow focus:shadow-glow-cyan appearance-none cursor-pointer"
              {...register("niche")}>
              <option value="">Select your niche…</option>
              {niches.map((n) => (
                <option key={n} value={n.toLowerCase().replace(/\s+/g, "_")}>{n}</option>
              ))}
            </select>
          </div>

          {apiError && (
            <div className="rounded-lg border border-rose-glow/30 bg-rose-glow/10 px-4 py-3 text-sm text-rose-glow">{apiError}</div>
          )}

          <button type="submit" disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 bg-cyan-glow text-bg-base font-semibold rounded-lg px-4 py-3 text-sm transition-all duration-200 hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed shadow-glow-cyan">
            {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <>Create account <ArrowRight size={16} /></>}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-ink-400">
          Already have an account?{" "}
          <Link href="/login" className="text-cyan-glow hover:underline underline-offset-4">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
