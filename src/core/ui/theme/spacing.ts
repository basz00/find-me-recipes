export const spacing = {
  // Base spacing units
  none: 0,
  "3xs": 2, // 2px
  "2xs": 4, // 4px
  xs: 8, // 8px
  sm: 12, // 12px
  md: 16, // 16px
  lg: 20, // 20px
  xl: 24, // 24px
  "2xl": 32, // 32px
  "3xl": 40, // 40px
  "4xl": 48, // 48px
  "5xl": 56, // 56px
  "6xl": 64, // 64px

  // Semantic spacing
  screen: {
    padding: 16,
  },
  card: {
    padding: 16,
    gap: 8,
  },
  input: {
    padding: 16,
    gap: 8,
  },
  list: {
    gap: 8,
  },
} as const;

export const radius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  round: 999,
} as const;
