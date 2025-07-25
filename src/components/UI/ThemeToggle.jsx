import React from "react";
import { useTheme } from "../../context/ThemeContext";
import styles from "./ThemeToggle.module.css";

/**
 * Theme Toggle Component
 *
 * A toggle button that switches between light and dark themes.
 * Shows sun icon for light mode and moon icon for dark mode.
 *
 * @returns {JSX.Element} The theme toggle button component
 */
export default function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      className={styles.themeToggle}
      onClick={toggleTheme}
      aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
      title={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
    >
      <div className={styles.toggleContainer}>
        <div
          className={`${styles.toggleSlider} ${
            isDarkMode ? styles.dark : styles.light
          }`}
        >
          <span className={styles.icon}>{isDarkMode ? "🌙" : "☀️"}</span>
        </div>
      </div>
    </button>
  );
}
