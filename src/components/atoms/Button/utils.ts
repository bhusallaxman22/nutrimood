import { ViewStyle, TextStyle } from 'react-native';
import { colors, shadows, typography, spacing, dimensions, fontFamilies } from '../../../theme/materialDesign';

export const getGradient = (variant: string): string[] => {
    switch (variant) {
        case 'secondary':
            return colors.gradients.secondary;
        case 'vibrant':
            return colors.gradients.neon;
        case 'electric':
            return colors.gradients.electric;
        case 'cosmic':
            return colors.gradients.cosmic;
        case 'aurora':
            return colors.gradients.aurora;
        case 'volcano':
            return colors.gradients.volcano;
        case 'maximalist':
            return colors.gradients.maximalist;
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
        borderWidth: dimensions.borderWidth.medium,
    };

    const sizeStyles = {
        small: {
            paddingVertical: 8,
            paddingHorizontal: 16,
            minHeight: dimensions.buttonHeight.small,
        },
        medium: {
            paddingVertical: 12,
            paddingHorizontal: 24,
            minHeight: dimensions.buttonHeight.medium,
        },
        large: {
            paddingVertical: 16,
            paddingHorizontal: 32,
            minHeight: dimensions.buttonHeight.large,
        },
    };

    const variantStyles = {
        primary: {
            backgroundColor: 'transparent',
            borderColor: colors.material.vibrant,
            ...shadows.vibrant,
        },
        secondary: {
            backgroundColor: colors.material.secondary,
            borderColor: colors.material.accent,
            ...shadows.neon,
        },
        vibrant: {
            backgroundColor: 'transparent',
            borderColor: colors.material.coral,
            ...shadows.dramatic,
        },
        electric: {
            backgroundColor: 'transparent',
            borderColor: colors.material.neon,
            ...shadows.neon,
        },
        cosmic: {
            backgroundColor: 'transparent',
            borderColor: colors.material.tertiary,
            ...shadows.vibrant,
        },
        aurora: {
            backgroundColor: 'transparent',
            borderColor: colors.material.vibrant,
            ...shadows.dramatic,
        },
        volcano: {
            backgroundColor: 'transparent',
            borderColor: colors.material.coral,
            ...shadows.colored,
        },
        maximalist: {
            backgroundColor: 'transparent',
            borderColor: colors.primary,
            borderWidth: dimensions.borderWidth.bold,
            ...shadows.dramatic,
        },
        outline: {
            backgroundColor: colors.surface,
            borderColor: colors.material.primary,
            borderWidth: dimensions.borderWidth.thick,
            ...shadows.medium,
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
    const baseFontStyle = {
        fontWeight: '700' as const,
        letterSpacing: 0.5,
        textTransform: 'uppercase' as const,
    };

    const sizeStyles = {
        small: { 
            fontSize: typography.body2.fontSize,
            lineHeight: typography.body2.lineHeight,
            fontFamily: fontFamilies.primaryBold,
        },
        medium: { 
            fontSize: typography.body1.fontSize,
            lineHeight: typography.body1.lineHeight,
            fontFamily: fontFamilies.primaryBold,
        },
        large: { 
            fontSize: typography.h5.fontSize,
            lineHeight: typography.h5.lineHeight,
            fontFamily: fontFamilies.primaryBold,
        },
    };

    const variantStyles = {
        primary: { 
            color: colors.onPrimary,
            textShadowColor: 'rgba(0, 0, 0, 0.3)',
            textShadowOffset: { width: 0, height: 1 },
            textShadowRadius: 2,
        },
        secondary: { 
            color: colors.onSecondary,
            textShadowColor: 'rgba(0, 0, 0, 0.2)',
            textShadowOffset: { width: 0, height: 1 },
            textShadowRadius: 2,
        },
        vibrant: { 
            color: colors.surface,
            textShadowColor: 'rgba(253, 121, 168, 0.4)',
            textShadowOffset: { width: 0, height: 2 },
            textShadowRadius: 4,
        },
        electric: { 
            color: colors.surface,
            textShadowColor: 'rgba(85, 239, 196, 0.4)',
            textShadowOffset: { width: 0, height: 2 },
            textShadowRadius: 4,
        },
        cosmic: { 
            color: colors.surface,
            textShadowColor: 'rgba(108, 92, 231, 0.4)',
            textShadowOffset: { width: 0, height: 2 },
            textShadowRadius: 4,
        },
        aurora: { 
            color: colors.surface,
            textShadowColor: 'rgba(116, 185, 255, 0.4)',
            textShadowOffset: { width: 0, height: 2 },
            textShadowRadius: 4,
        },
        volcano: { 
            color: colors.surface,
            textShadowColor: 'rgba(255, 107, 53, 0.4)',
            textShadowOffset: { width: 0, height: 2 },
            textShadowRadius: 4,
        },
        maximalist: { 
            color: colors.surface,
            textShadowColor: 'rgba(255, 107, 53, 0.6)',
            textShadowOffset: { width: 0, height: 3 },
            textShadowRadius: 6,
            fontFamily: fontFamilies.primaryBlack,
            fontWeight: '900' as const,
        },
        outline: { 
            color: colors.material.primary,
            fontFamily: fontFamilies.primaryBold,
        },
    };

    return {
        ...baseFontStyle,
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
