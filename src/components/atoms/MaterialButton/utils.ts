import { TextStyle, ViewStyle } from "react-native";
import { colors, dimensions, shadows, typography } from "../../../theme/materialDesign";

export const getButtonStyle = (
  variant: string,
  size: string,
  fullWidth: boolean
): ViewStyle => {
  const baseStyle: ViewStyle = {
    borderRadius: dimensions.borderRadius.large,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    ...shadows.medium,
    borderWidth: dimensions.borderWidth.medium,
  };

  const sizeStyles = {
    small: {
      paddingVertical: 12,
      paddingHorizontal: 20,
      minHeight: dimensions.buttonHeight.small,
    },
    medium: {
      paddingVertical: 16,
      paddingHorizontal: 24,
      minHeight: dimensions.buttonHeight.medium,
    },
    large: {
      paddingVertical: 20,
      paddingHorizontal: 32,
      minHeight: dimensions.buttonHeight.large,
    },
  };

  const variantStyles = {
    primary: {
      backgroundColor: colors.material.primary,
      borderColor: colors.material.vibrant,
    },
    secondary: {
      backgroundColor: colors.material.secondary,
      borderColor: colors.material.accent,
    },
    vibrant: {
      backgroundColor: colors.material.vibrant,
      borderColor: colors.material.coral,
    },
    electric: {
      backgroundColor: colors.material.electric,
      borderColor: colors.material.neon,
    },
    outline: {
      backgroundColor: colors.surface,
      borderColor: colors.material.primary,
      borderWidth: dimensions.borderWidth.thick,
    },
  };

  if (fullWidth) {
    baseStyle.width = "100%";
  }
  return {
    ...baseStyle,
    ...sizeStyles[size as keyof typeof sizeStyles],
    ...variantStyles[variant as keyof typeof variantStyles],
  };
};

export const getTextStyle = (variant: string, size: string): TextStyle => {
  const sizeStyles = {
    small: { fontSize: 14 },
    medium: { fontSize: 16 },
    large: { fontSize: 18 },
  };

  const variantStyles = {
    primary: { color: colors.onPrimary },
    secondary: { color: colors.onSecondary },
    vibrant: { color: colors.surface },
    electric: { color: colors.surface },
    outline: { color: colors.material.primary },
  };

  return {
    ...typography.body1,
    fontWeight: "700",
    ...sizeStyles[size as keyof typeof sizeStyles],
    ...variantStyles[variant as keyof typeof variantStyles],
  };
};

export const getIconColor = (variant: string): string => {
  switch (variant) {
    case "primary":
      return colors.onPrimary;
    case "secondary":
      return colors.onSecondary;
    case "outline":
      return colors.material.primary;
    case "vibrant":
    case "electric":
      return colors.surface;
    default:
      return colors.onPrimary;
  }
};

export const getIconSize = (size: string): number => {
  switch (size) {
    case "small":
      return 16;
    case "large":
      return 24;
    default:
      return 20;
  }
};
