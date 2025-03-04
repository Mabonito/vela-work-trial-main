"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { ConfigProvider } from "antd";
import { useSession } from "next-auth/react";

export default function ANTDThemeProvider({ children }) {
  const { data: session, status, update } = useSession();
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    console.log(session?.user?.view);
    if (
      theme !==
      `${
        session?.user?.view ?? localStorage.getItem("vela-theme")
          ? session?.user?.view
          : "dark"
      }`
    ) {
      setTheme(
        `${
          session?.user?.view ?? localStorage.getItem("vela-theme")
            ? session?.user?.view
            : "dark"
        }`
      );
    }
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "var(--vela-orange)",
          colorPrimaryBorder: "var(--vela-orange)",
          colorPrimaryBorderHover: "var(--vela-orange)",
          colorText: "var(--vela-text-color)",
          colorBgContainer: "var(--vela-background-card)",
          colorBgElevated: "var(--vela-background-card)",
          colorTextPlaceholder: "var(--vela-grey)",
        },
        components: {
          Select: {
            optionSelectedBg: "var(--vela-background-card)",
            colorIcon: "var(--vela-orange)",
            colorTextDisabled: "var(--vela-text-color)",
            colorPrimary: "var(--vela-orange)",
          },
          Tabs: {
            cardBg: "var(--vela-background-card)",
            itemActiveColor: "var(--vela-orange)",
            itemColor: "var(--vela-text-color)",
            itemSelectedColor: "var(--vela-orange)",
            itemHoverColor: "var(--vela-orange)",
          },
          Switch: {
            colorPrimary: "var(--vela-orange)",
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
