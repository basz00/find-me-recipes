export const colors = {
  // Primary colors
  primary: {
    main: "#007AFF",
    light: "#47A1FF",
    dark: "#0055B3",
  },

  // Secondary colors
  secondary: {
    main: "#FF9500",
    light: "#FFB340",
    dark: "#CC7700",
  },

  // Neutral colors
  neutral: {
    white: "#FFFFFF",
    black: "#000000",
    grey: {
      50: "#F9FAFB",
      100: "#F3F4F6",
      200: "#E5E7EB",
      300: "#D1D5DB",
      400: "#9CA3AF",
      500: "#6B7280",
      600: "#4B5563",
      700: "#374151",
      800: "#1F2937",
      900: "#111827",
    },
  },

  // Semantic colors
  semantic: {
    success: "#34C759",
    error: "#FF3B30",
    warning: "#FF9500",
    info: "#5856D6",
  },

  // Background colors
  background: {
    default: "#FFFFFF",
    paper: "#F9FAFB",
    dark: "#1F2937",
  },

  // Text colors
  text: {
    primary: "#1F2937",
    secondary: "#6B7280",
    disabled: "#9CA3AF",
    inverse: "#FFFFFF",
  },
} as const;
