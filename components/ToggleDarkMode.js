import { useEffect, useState } from "react";

export default function ToggleDarkMode() {
  const [darkMode, setDarkMode] = useState(false);

  // Check system theme on initial load
  useEffect(() => {
    const matchDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDarkMode(matchDark);
  }, []);

  // Apply the dark mode class to the body
  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className={`px-4 py-2 rounded-full font-medium transition-colors duration-300 
                  ${
                    darkMode
                      ? "bg-gray-800 text-white hover:bg-gray-700"
                      : "bg-gray-200 text-gray-900 hover:bg-gray-300"
                  }`}
      aria-label="Toggle Dark Mode"
    >
      {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
    </button>
  );
}
