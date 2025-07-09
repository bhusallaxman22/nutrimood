import { ViewStyle } from 'react-native';
import { colors, shadows, dimensions } from '../../../theme/materialDesign';

export const getCardStyle = (variant: string, borderRadius: number, padding: number): ViewStyle => {
    const baseStyle: ViewStyle = {
        borderRadius,
        padding,
        overflow: 'hidden',
    };

    const variantStyles = {
        default: {
            backgroundColor: colors.surface,
            borderWidth: dimensions.borderWidth.medium,
            borderColor: colors.material.primary,
            ...shadows.small,
        },
        elevated: {
            backgroundColor: colors.surfaceVariant,
            borderWidth: dimensions.borderWidth.thick,
            borderColor: colors.material.accent,
            ...shadows.medium,
        },
        outlined: {
            backgroundColor: colors.surface,
            borderWidth: dimensions.borderWidth.thick,
            borderColor: colors.material.tertiary,
            ...shadows.none,
        },
        vibrant: {
            borderWidth: dimensions.borderWidth.medium,
            borderColor: colors.surface,
            ...shadows.colored,
        },
    };

    return {
        ...baseStyle,
        ...variantStyles[variant as keyof typeof variantStyles],
    };
};
