"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
// import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // On mount, read the theme from localStorage
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const isDark = storedTheme === "dark" || (!storedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches);
    setIsDarkMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newMode);
  };

  return (
    <button variant="outline" size="icon" onClick={toggleTheme}>
      {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
