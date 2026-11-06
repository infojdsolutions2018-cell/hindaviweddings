"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Phone, Mail, ArrowLeft, Loader2, ShieldCheck, Eye, EyeOff } from "lucide-react";
import { BUSINESS_CONFIG } from "@/config/business";

export default function AdminLoginPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const cleanIdentifier = identifier.trim();
    if (!cleanIdentifier) {
      setErrorMessage("Please enter your registered mobile number or email address.");
      return;
    }

    if (!password) {
      setErrorMessage("Please enter your password.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identifier: cleanIdentifier,
          password: password,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMessage(data.message || "Invalid mobile/email or password.");
      } else {
        // Successful login -> Redirect to Admin dashboard
        router.push("/admin");
        router.refresh();
      }
    } catch (err: any) {
      setErrorMessage("Unable to connect to the login service. Please check your network.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDF9F8] flex flex-col justify-center py-8 sm:py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Subtle luxury brand accents */}
      <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-blush/30 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-coral/15 blur-3xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        {/* Back to website button */}
        <div className="mb-4">
          <Link
            href="/"
            className="inline-flex items-center space-x-1.5 text-xs font-sans uppercase tracking-wider text-charcoal/70 hover:text-coral transition-colors font-semibold"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to website</span>
          </Link>
        </div>

        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#801C30] to-[#A82835] text-white flex items-center justify-center mx-auto shadow-md border border-white/20">
            <Lock className="w-7 h-7 text-white" />
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl text-charcoal tracking-tight font-medium">
            Admin Portal
          </h2>
          <p className="font-sans text-xs text-charcoal/70 uppercase tracking-widest font-semibold">
            {BUSINESS_CONFIG.displayName}
          </p>
        </div>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-white py-7 px-5 sm:px-9 shadow-xl sm:rounded-3xl rounded-2xl border border-blush/60">
          <form className="space-y-4 sm:space-y-5" onSubmit={handleLogin}>
            {/* Error Banner */}
            {errorMessage && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-sans leading-relaxed animate-in fade-in">
                {errorMessage}
              </div>
            )}

            {/* Mobile / Email Identifier Field */}
            <div>
              <label
                htmlFor="identifier"
                className="block font-sans text-xs uppercase tracking-wider font-bold text-charcoal/80 mb-1.5"
              >
                Mobile Number or Email ID
              </label>
              <div className="relative rounded-xl shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-charcoal/40">
                  {identifier.includes("@") ? (
                    <Mail className="w-4 h-4 text-coral" />
                  ) : (
                    <Phone className="w-4 h-4 text-coral" />
                  )}
                </div>
                <input
                  id="identifier"
                  name="identifier"
                  type="text"
                  autoComplete="username"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="block w-full pl-10 pr-3.5 py-2.5 sm:py-3 text-sm text-charcoal bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl focus:outline-hidden focus:ring-2 focus:ring-coral/50 focus:border-coral font-sans tracking-wide transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block font-sans text-xs uppercase tracking-wider font-bold text-charcoal/80 mb-1.5"
              >
                Password
              </label>
              <div className="relative rounded-xl shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-charcoal/40">
                  <Lock className="w-4 h-4 text-coral" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-10 py-2.5 sm:py-3 text-sm text-charcoal bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl focus:outline-hidden focus:ring-2 focus:ring-coral/50 focus:border-coral font-sans transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-charcoal/40 hover:text-charcoal"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center py-3 sm:py-3.5 px-4 border border-transparent rounded-xl text-xs sm:text-sm font-sans font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#801C30] to-[#A82835] hover:opacity-95 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-coral shadow-md hover:shadow-lg transition-all disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    <span>Verifying Credentials...</span>
                  </>
                ) : (
                  <span>Secure Login</span>
                )}
              </button>
            </div>
          </form>

          {/* Secure indicator badge */}
          <div className="mt-5 pt-4 border-t border-blush/40 flex items-center justify-center space-x-1.5 text-[11px] text-charcoal/60 font-sans">
            <ShieldCheck className="w-3.5 h-3.5 text-coral" />
            <span>Database-authenticated access only</span>
          </div>
        </div>
      </div>
    </div>
  );
}

