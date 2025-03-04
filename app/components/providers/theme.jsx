"use client";

import { ThemeProvider, useTheme } from "next-themes";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export function VelaThemeProvider({ children }) {
  const { data: session, status } = useSession();
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    let newTheme;

    if (status === "authenticated" && session?.user?.view) {
      newTheme = session.user?.view;
    } else {
      newTheme =
        localStorage.getItem("vela-theme") ||
        (window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light");
    }

    if (newTheme && theme !== newTheme) {
      setTheme(newTheme);
    }
  }, [session, status, mounted, setTheme]);

  if (!mounted) return null;

  return (
    <ThemeProvider
      themes={["light", "dark"]}
      enableSystem={false}
      defaultTheme="dark"
    >
      {children}
    </ThemeProvider>
  );
}
