"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { LeverSwitch } from "./ui/lever-switch";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const handleToggle = (isChecked: boolean) => {
    setTheme(isChecked ? "dark" : "light");
  };
  
  // Ensure the component only renders on the client
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="w-16 h-10" />; // Placeholder to prevent layout shift
  }

  return (
    <LeverSwitch
      checked={theme === "dark"}
      onToggle={handleToggle}
    />
  );
}
