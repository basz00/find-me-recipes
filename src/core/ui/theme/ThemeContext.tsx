import React, { createContext, useContext, ReactNode } from "react";
import { colors } from "./colors";
import { typography } from "./typography";
import { spacing } from "./spacing";

type ThemeContextType = {
  colors: typeof colors;
  typography: typeof typography;
  spacing: typeof spacing;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const theme = {
    colors,
    typography,
    spacing,
  };

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
