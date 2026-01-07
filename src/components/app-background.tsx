"use client";

import { useTheme } from "next-themes";
import { GradientDots } from "@/components/ui/gradient-dots";
import { useEffect, useState } from "react";

export function AppBackground() {
  const { resolvedTheme } = useTheme();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(resolvedTheme === 'dark');
  }, [resolvedTheme]);

  return isDark ? <GradientDots className="absolute inset-0 -z-10" /> : null;
}
