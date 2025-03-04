"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import Loading from "../loading";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      setLoading(false);

      if (!res.ok) {
        const errorMessage = res.error
          ? JSON.parse(res.error).message ||
            "Something went wrong. Please try again."
          : "Something went wrong. Please try again.";
        toast.error(errorMessage);
      } else {
        // Successful login
        const redirectUrl = callbackUrl || "/calls";
        router.replace(redirectUrl);
        toast.success("Login successful!");
      }
    } catch (error) {
      setLoading(false);
      toast.error("An unexpected error occurred. Please try again.");
      console.error("Login error:", error);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm mx-auto space-y-2"
      >
        {/* Email Input */}
        <div>
          <label htmlFor="email" className="block text-xs font-medium mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 text-sm border rounded-md focus:ring-vela-orange focus:border-vela-orange transition"
          />
        </div>

        {/* Password Input */}
        <div>
          <label htmlFor="password" className="block text-xs font-medium mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 text-sm border rounded-md focus:ring-vela-orange focus:border-vela-orange transition"
          />
          <div className="mt-1 mb-10 text-right">
            <Link
              href="/forgot_password"
              className="text-xs text-vela-orange hover:underline"
            >
              Forgot your password?
            </Link>
          </div>
        </div>

        {/* Sign-In Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-vela-orange text-vela-darkest-blue py-2 rounded-full shadow-lg hover:bg-opacity-50 transition font-medium text-sm"
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>
      </form>
      {loading && <Loading />}
    </>
  );
}
