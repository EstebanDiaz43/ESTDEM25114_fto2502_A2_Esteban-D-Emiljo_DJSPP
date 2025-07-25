import React, { createContext, useContext, useState, useEffect } from "react";

/**
 * Theme Context
 *
 * Provides global theme management for dark/light mode switching.
 * Persists theme preference in localStorage.
 */
const ThemeContext = createContext();

/**
 * Hook to use the theme context
 * @returns {Object} Theme context value
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

/**
 * Theme Provider Component
 *
 * Wraps the application to provide global theme state.
 * Manages dark/light mode toggle and localStorage persistence.
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @returns {JSX.Element} The provider component
 */
export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check localStorage for saved theme preference
    const savedTheme = localStorage.getItem("podcast-app-theme");
    if (savedTheme) {
      return savedTheme === "dark";
    }
    // Default to system preference
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // Apply theme to document root
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.setAttribute("data-theme", "dark");
    } else {
      root.setAttribute("data-theme", "light");
    }

    // Save preference to localStorage
    localStorage.setItem("podcast-app-theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  // Toggle theme function
  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const value = {
    isDarkMode,
    toggleTheme,
    theme: isDarkMode ? "dark" : "light",
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
