export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

export const mediaQueries = {
  sm: `(min-width: ${breakpoints.sm})`,
  md: `(min-width: ${breakpoints.md})`,
  lg: `(min-width: ${breakpoints.lg})`,
  xl: `(min-width: ${breakpoints.xl})`,
  '2xl': `(min-width: ${breakpoints['2xl']})`,
  
  // Hover capability
  hover: '(hover: hover)',
  
  // Reduced motion preference
  reducedMotion: '(prefers-reduced-motion: reduce)',
  
  // Dark mode preference
  darkMode: '(prefers-color-scheme: dark)',
  
  // High contrast
  highContrast: '(prefers-contrast: high)',
  
  // Touch capability
  touch: '(pointer: coarse)',
} as const;
