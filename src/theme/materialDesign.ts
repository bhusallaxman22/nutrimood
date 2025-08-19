import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

// Maximalism Material Design Color Palette
export const colors = {
  // Primary colors - Bold and vibrant
  primary: "#FF6B35",
  primaryVariant: "#E55527",
  secondary: "#00D4AA",
  secondaryVariant: "#00C49A",

  // Surface colors - Rich and dynamic
  surface: "#FFFFFF",
  surfaceVariant: "#FFEAA7",
  // Softer neutral background replacing saturated yellow for calmer vibe
  background: "#F5F7FA",

  // Material colors - Bold and textured
  material: {
    primary: "#FF6B35",
    secondary: "#00D4AA",
    tertiary: "#6C5CE7",
    accent: "#FD79A8",
    vibrant: "#00CEC9",
    electric: "#FDCB6E",
    neon: "#55EFC4",
    coral: "#FF7675",
  },

  // Text colors - High contrast
  onSurface: "#2D3436",
  onSurfaceVariant: "#636E72",
  onBackground: "#2D3436",
  onPrimary: "#FFFFFF",
  onSecondary: "#2D3436",

  // Status colors - Vibrant feedback colors
  error: "#E17055",
  success: "#00B894",
  warning: "#FDCB6E",
  info: "#74B9FF",

  // Gradients - Bold and multi-colored maximalist combinations
  gradients: {
    primary: ["#FF6B35", "#E55527", "#D63031"],
    secondary: ["#00D4AA", "#00B894", "#00CEC9"],
    accent: ["#6C5CE7", "#A29BFE", "#FD79A8"],
    sunset: ["#FD79A8", "#FDCB6E", "#FF7675"],
    ocean: ["#74B9FF", "#0984E3", "#00CEC9"],
    electric: ["#55EFC4", "#00B894", "#FDCB6E"],
    cosmic: ["#6C5CE7", "#A29BFE", "#DDA0DD"],
    fire: ["#FF6B35", "#E55527", "#D63031", "#E17055"],
    rainbow: ["#FF6B35", "#FDCB6E", "#55EFC4", "#74B9FF", "#6C5CE7", "#FD79A8"],
    tropical: ["#00D4AA", "#55EFC4", "#74B9FF"],
    warm: ["#FF7675", "#FD79A8", "#FDCB6E"],
    neon: ["#55EFC4", "#74B9FF", "#A29BFE", "#FD79A8"],
    volcano: ["#E17055", "#FF6B35", "#FDCB6E", "#FF7675"],
    aurora: ["#74B9FF", "#6C5CE7", "#FD79A8", "#55EFC4"],
    galaxy: ["#2D3436", "#636E72", "#6C5CE7", "#A29BFE"],
    sunshine: ["#FDCB6E", "#FFE066", "#FFF2CC", "#FF7675"],
    forest: ["#00B894", "#55EFC4", "#00D4AA", "#74B9FF"],
    maximalist: [
      "#FF6B35",
      "#FD79A8",
      "#6C5CE7",
      "#00D4AA",
      "#FDCB6E",
      "#55EFC4",
    ],
  neutralApp: ["#101419", "#1B222C", "#242E3A"],
  },
};

// Shadow configurations - Bold maximalist shadows with color variations
export const shadows = {
  none: {
    shadowColor: "transparent",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  small: {
    shadowColor: "#2D3436",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  medium: {
    shadowColor: "#2D3436",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 10,
  },
  large: {
    shadowColor: "#2D3436",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 15,
  },
  colored: {
    shadowColor: "#FF6B35",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45,
    shadowRadius: 15,
    elevation: 10,
  },
  neon: {
    shadowColor: "#55EFC4",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.6,
    shadowRadius: 18,
    elevation: 12,
  },
  vibrant: {
    shadowColor: "#FD79A8",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 22,
    elevation: 14,
  },
  dramatic: {
    shadowColor: "#6C5CE7",
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.65,
    shadowRadius: 30,
    elevation: 20,
  },
};

// Maximalism Material Design styles
export const materialStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    borderWidth: 3,
    borderColor: colors.primary,
    ...shadows.medium,
  },

  card: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.material.tertiary,
    padding: 24,
    ...shadows.colored,
  },

  button: {
    backgroundColor: colors.material.primary,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.material.vibrant,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: "center",
    justifyContent: "center",
    ...shadows.medium,
  },

  input: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.material.accent,
    paddingVertical: 16,
    paddingHorizontal: 20,
    fontSize: 16,
    color: colors.onSurface,
    ...shadows.small,
  },

  overlay: {
    backgroundColor: colors.material.vibrant,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: colors.material.coral,
    opacity: 0.9,
  },
});

// Keep glassStyles for backward compatibility but point to materialStyles
export const glassStyles = materialStyles;

// Responsive spacing system - Adaptable to viewport
const baseSpacing = {
  xs: 6,
  sm: 12,
  md: 20,
  lg: 28,
  xl: 36,
  xxl: 56,
  xxxl: 72,
};

// Create responsive spacing based on screen size
const getResponsiveSpacing = () => {
  const screenWidth = width;
  let multiplier = 1;

  if (screenWidth < 375) {
    multiplier = 0.8; // Small screens
  } else if (screenWidth > 414) {
    multiplier = 1.1; // Large screens
  }

  return {
    xs: Math.round(baseSpacing.xs * multiplier),
    sm: Math.round(baseSpacing.sm * multiplier),
    md: Math.round(baseSpacing.md * multiplier),
    lg: Math.round(baseSpacing.lg * multiplier),
    xl: Math.round(baseSpacing.xl * multiplier),
    xxl: Math.round(baseSpacing.xxl * multiplier),
    xxxl: Math.round(baseSpacing.xxxl * multiplier),
  };
};

export const spacing = getResponsiveSpacing();

// Modern font families for maximalist design
export const fontFamilies = {
  primary: "Inter_400Regular",
  primaryBold: "Inter_700Bold",
  primaryBlack: "Inter_900Black",
  secondary: "Poppins_400Regular",
  secondaryBold: "Poppins_700Bold",
  secondaryBlack: "Poppins_900Black",
  fallback: "System",
};

// Responsive Typography system with modern fonts
const getResponsiveTypography = () => {
  const screenWidth = width;
  let fontMultiplier = 1;

  if (screenWidth < 375) {
    fontMultiplier = 0.9; // Smaller fonts for small screens
  } else if (screenWidth > 414) {
    fontMultiplier = 1.05; // Slightly larger fonts for large screens
  }

  return {
    h1: {
      fontSize: Math.round(42 * fontMultiplier),
      fontFamily: fontFamilies.primaryBlack,
      fontWeight: "900" as const,
      lineHeight: Math.round(50 * fontMultiplier),
      letterSpacing: -1.2,
    },
    h2: {
      fontSize: Math.round(32 * fontMultiplier),
      fontFamily: fontFamilies.primaryBold,
      fontWeight: "800" as const,
      lineHeight: Math.round(40 * fontMultiplier),
      letterSpacing: -1.0,
    },
    h3: {
      fontSize: Math.round(24 * fontMultiplier),
      fontFamily: fontFamilies.primaryBold,
      fontWeight: "700" as const,
      lineHeight: Math.round(32 * fontMultiplier),
      letterSpacing: -0.8,
    },
    h4: {
      fontSize: Math.round(20 * fontMultiplier),
      fontFamily: fontFamilies.primaryBold,
      fontWeight: "600" as const,
      lineHeight: Math.round(28 * fontMultiplier),
      letterSpacing: -0.6,
    },
    h5: {
      fontSize: Math.round(18 * fontMultiplier),
      fontFamily: fontFamilies.secondaryBold,
      fontWeight: "600" as const,
      lineHeight: Math.round(24 * fontMultiplier),
      letterSpacing: -0.4,
    },
    body1: {
      fontSize: Math.round(16 * fontMultiplier),
      fontFamily: fontFamilies.primary,
      fontWeight: "400" as const,
      lineHeight: Math.round(24 * fontMultiplier),
      letterSpacing: 0,
    },
    body2: {
      fontSize: Math.round(14 * fontMultiplier),
      fontFamily: fontFamilies.primary,
      fontWeight: "400" as const,
      lineHeight: Math.round(20 * fontMultiplier),
      letterSpacing: 0.1,
    },
    caption: {
      fontSize: Math.round(12 * fontMultiplier),
      fontFamily: fontFamilies.secondaryBold,
      fontWeight: "500" as const,
      lineHeight: Math.round(16 * fontMultiplier),
      letterSpacing: 0.4,
      textTransform: "uppercase" as const,
    },
    overline: {
      fontSize: Math.round(10 * fontMultiplier),
      fontFamily: fontFamilies.secondaryBlack,
      fontWeight: "700" as const,
      lineHeight: Math.round(16 * fontMultiplier),
      letterSpacing: 1.5,
      textTransform: "uppercase" as const,
    },
  };
};

export const typography = getResponsiveTypography();

// Enhanced dimensions for maximalist design
export const dimensions = {
  screenWidth: width,
  screenHeight: height,
  borderRadius: {
    small: 12,
    medium: 16,
    large: 24,
    xlarge: 28,
    xxlarge: 32,
  },
  buttonHeight: {
    small: 40,
    medium: 44,
    large: 48,
  },
  inputHeight: {
    small: 40,
    medium: 44,
    large: 48,
  },
  borderWidth: {
    thin: 1,
    medium: 2,
    thick: 3,
    bold: 4,
  },
};

// Animation durations
export const animations = {
  fast: 150,
  normal: 250,
  slow: 350,
};
