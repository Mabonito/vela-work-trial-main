"use client";
import Image from "next/image";
import { useTheme } from "next-themes";
import logo2 from "../logo2.png";
import velaDark from "../vela-dark.png";

// import DarkLogo from "../logo.svg";
// import LightLogo from "../white_light-blue-02.png";

export default function VelaLogo() {
  const { theme, setTheme } = useTheme();
  console.log(theme, theme === "dark");
  return (
    <div className="mb-10 mt-1 mx-5">
      <Image
        src={theme === "dark" ? logo2 : velaDark}
        alt="Vela Logo"
        height={100}
        width={106}
      />
    </div>
  );
}
