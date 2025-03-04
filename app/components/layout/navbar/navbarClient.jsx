"use client";

import { Switch } from "antd";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import logo2 from "../../logo2.png";
import velaDark from "../../vela-dark.png";
import LogoutButton from "./logout";

const SunIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="var(--vela-white)"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="icon icon-sun"
  >
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

const MoonIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="var(--vela-darkest-blue)"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="icon icon-moon"
  >
    <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
  </svg>
);

const NavbarClient = ({ themeView }) => {
  const { theme, setTheme } = useTheme();
  const { data: session, update } = useSession();

  const [currentTheme, setCurrentTheme] = useState(
    localStorage.getItem("vela-theme") || themeView || "dark"
  );

  useEffect(() => {
    if (theme !== currentTheme) {
      setTheme(currentTheme);
    }
  }, [currentTheme, setTheme]);

  const toggleTheme = async () => {
    const newTheme = currentTheme === "light" ? "dark" : "light";
    setCurrentTheme(newTheme);
    setTheme(newTheme);
    localStorage.setItem("vela-theme", newTheme);
  };

  return (
    <div className="flex justify-between items-center bg-vela-background-drawer p-4 transition-all duration-500 ease-in-out">
      <Link href="/">
        {currentTheme === "dark" ? (
          <Image src={logo2} height={100} width={106} alt="Vela Logo" />
        ) : (
          <Image src={velaDark} height={90} width={97} alt="Vela Logo" />
        )}
      </Link>
      <div className="flex items-center space-x-8">
        <Switch
          checked={currentTheme === "dark"}
          onChange={toggleTheme}
          size="large"
          checkedChildren={<SunIcon className="!text-vela-modal-text-color" />}
          unCheckedChildren={
            <MoonIcon className="!text-vela-modal-text-color" />
          }
          className="!bg-vela-modal-background !text-vela-modal-text-color"
        />
        <div className="bg-vela-grey w-[1px] h-5 mx-1"></div>
        <LogoutButton />
      </div>
    </div>
  );
};

export default NavbarClient;
