import { ViewStyle, TextStyle } from 'react-native';
import { colors, shadows, typography, spacing, dimensions } from '../../../theme/materialDesign';

export const getGradient = (variant: string): string[] => {
    switch (variant) {
        case 'secondary':
            return colors.gradients.secondary;
        case 'vibrant':
            return colors.gradients.sunset;
        case 'electric':
            return colors.gradients.electric;
        default:
            return colors.gradients.primary;
    }
};

export const getButtonStyle = (variant: string, size: string, fullWidth: boolean): ViewStyle => {
    const baseStyle: ViewStyle = {
        borderRadius: dimensions.borderRadius.large,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        ...shadows.medium,
        borderWidth: dimensions.borderWidth.medium,
    };

    const sizeStyles = {
        small: {
            paddingVertical: 6,
            paddingHorizontal: 12,
            minHeight: dimensions.buttonHeight.small,
        },
        medium: {
            paddingVertical: 8,
            paddingHorizontal: 16,
            minHeight: dimensions.buttonHeight.medium,
        },
        large: {
            paddingVertical: 10,
            paddingHorizontal: 20,
            minHeight: dimensions.buttonHeight.large,
        },
    };

    const variantStyles = {
        primary: {
            backgroundColor: 'transparent',
            borderColor: colors.material.vibrant,
        },
        secondary: {
            backgroundColor: colors.material.secondary,
            borderColor: colors.material.accent,
        },
        vibrant: {
            backgroundColor: 'transparent',
            borderColor: colors.material.coral,
        },
        electric: {
            backgroundColor: 'transparent',
            borderColor: colors.material.neon,
        },
        outline: {
            backgroundColor: colors.surface,
            borderColor: colors.material.primary,
            borderWidth: dimensions.borderWidth.thick,
        },
    };

    if (fullWidth) {
        baseStyle.width = '100%';
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
        fontWeight: '700',
        ...sizeStyles[size as keyof typeof sizeStyles],
        ...variantStyles[variant as keyof typeof variantStyles],
    };
};

export const getIconColor = (variant: string): string => {
    switch (variant) {
        case 'primary':
            return colors.onPrimary;
        case 'secondary':
            return colors.onSecondary;
        case 'outline':
            return colors.material.primary;
        case 'vibrant':
        case 'electric':
            return colors.surface;
        default:
            return colors.onPrimary;
    }
};

export const getIconSize = (size: string): number => {
    switch (size) {
        case 'small':
            return 16;
        case 'large':
            return 24;
        default:
            return 20;
    }
};
