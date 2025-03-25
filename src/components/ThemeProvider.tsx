import { createContext, useContext, useState } from "react";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: "light";
  storageKey?: string;
};

type ThemeProviderState = {
  theme: "light";
  setTheme: (theme: "light") => void;
};

const initialState: ThemeProviderState = {
  theme: "light",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "light",
  storageKey = "ui-theme",
  ...props
}: ThemeProviderProps) {
  // Always use light theme but keep the setTheme function for compatibility
  const [theme, setTheme] = useState<"light">("light");

  // Force light mode
  const handleSetTheme = () => {
    // We only support light theme, but keep the function
    setTheme("light");
    
    // Apply light theme to document
    const root = window.document.documentElement;
    root.classList.remove("dark");
    root.classList.add("light");
  };

  // Set light theme on mount
  useState(() => {
    const root = window.document.documentElement;
    root.classList.remove("dark");
    root.classList.add("light");
  });

  const value = {
    theme,
    setTheme: handleSetTheme,
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
