"use client";
import React from "react";
import { useTheme } from "next-themes";

const darkColors = {
  critical: "var(--vela-red)",
  serious: "var(--vela-red)",
  caution: "var(--vela-yellow)",
  good: "var(--vela-green)",
};

const lightColors = {
  critical: "var(--vela-red)",
  serious: "var(--vela-red)",
  caution: "var(--vela-yellow)",
  good: "var(--vela-green)",
};

export default function AgentScore({ score, fail, failScore }) {
  const { theme, setTheme } = useTheme();

  const getStatus = (score) => {
    if (0 <= score && score <= 30) {
      return "critical";
    } else if (30 < score && score <= 50) {
      return "serious";
    } else if (50 < score && score <= 80) {
      return "caution";
    } else if (80 < score && score <= 100) {
      return "good";
    }
  };

  return (
    <p
      className="font-semibold"
      style={{
        color:
          theme === "dark"
            ? darkColors[getStatus(score)]
            : lightColors[getStatus(score)],
      }}
    >
      {score?.toFixed(1)}%
    </p>
  );
}
