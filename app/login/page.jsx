"use client";
import React, { useEffect, useRef } from "react";
import LoginForm from "./loginForm";
import toast from "react-hot-toast";
import { useTheme } from "next-themes";
import Image from "next/image";
import logo2 from "../components/logo2.png";
import velaDark from "../components/vela-dark.png";

export default function Login({ searchParams }) {
  const toastShown = useRef(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const errorMessage = urlParams.get("error");
      if (errorMessage && !toastShown.current) {
        toastShown.current = true;
        setTimeout(() => {
          toast.error(decodeURIComponent(errorMessage));
        }, 500);
      }
    }
  }, []);

  return (
    <div className="flex h-screen">
      {/* Left Section */}
      <div className="flex flex-col h-full w-full lg:w-1/2 px-6 py-8 lg:px-10 lg:py-5 overflow-auto">
        {/* Logo */}
        <div className="mb-10 mt-1">
          <Image
            src={theme === "dark" ? logo2 : velaDark}
            alt="Vela Logo"
            height={100}
            width={106}
          />
        </div>

        {/* Main Content */}
        <div className="w-full max-w-md mx-auto">
          <h1 className="text-4xl font-bold text-left">Sign In</h1>
          <p className="text-vela-grey mt-2 mb-2 text-left">
            Please enter your details to sign in
          </p>

          {/* Login Form */}
          <LoginForm searchParams={{ searchParams }} />
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 w-full text-sm px-4 py-2">
          <span>
            Powered by <strong className="text-l-secondary">Botlhale AI</strong>
          </span>
        </div>
      </div>

      {/* Right Section */}
      <div className="hidden lg:block w-1/2">
        <img
          src="/customer-support-image.png"
          alt="Customer Support"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
