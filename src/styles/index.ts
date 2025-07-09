import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { colors, spacing, typography, shadows, dimensions } from '../theme/materialDesign';

/**
 * Common layout styles
 */
export const layoutStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    column: {
        flexDirection: 'column',
    },
    spaceBetween: {
        justifyContent: 'space-between',
    },
    spaceAround: {
        justifyContent: 'space-around',
    },
    spaceEvenly: {
        justifyContent: 'space-evenly',
    },
    fullWidth: {
        width: '100%',
    },
    fullHeight: {
        height: '100%',
    },
});

/**
 * Common spacing styles
 */
export const spacingStyles = StyleSheet.create({
    marginXs: { margin: spacing.xs },
    marginSm: { margin: spacing.sm },
    marginMd: { margin: spacing.md },
    marginLg: { margin: spacing.lg },
    marginXl: { margin: spacing.xl },

    paddingXs: { padding: spacing.xs },
    paddingSm: { padding: spacing.sm },
    paddingMd: { padding: spacing.md },
    paddingLg: { padding: spacing.lg },
    paddingXl: { padding: spacing.xl },

    marginTopXs: { marginTop: spacing.xs },
    marginTopSm: { marginTop: spacing.sm },
    marginTopMd: { marginTop: spacing.md },
    marginTopLg: { marginTop: spacing.lg },
    marginTopXl: { marginTop: spacing.xl },

    marginBottomXs: { marginBottom: spacing.xs },
    marginBottomSm: { marginBottom: spacing.sm },
    marginBottomMd: { marginBottom: spacing.md },
    marginBottomLg: { marginBottom: spacing.lg },
    marginBottomXl: { marginBottom: spacing.xl },
});

/**
 * Common text styles
 */
export const textStyles = StyleSheet.create({
    h1: typography.h1,
    h2: typography.h2,
    h3: typography.h3,
    h4: typography.h4,
    h5: typography.h5,
    body1: typography.body1,
    body2: typography.body2,
    caption: typography.caption,

    textCenter: { textAlign: 'center' },
    textLeft: { textAlign: 'left' },
    textRight: { textAlign: 'right' },

    fontBold: { fontWeight: 'bold' },
    fontSemiBold: { fontWeight: '600' },
    fontMedium: { fontWeight: '500' },
    fontRegular: { fontWeight: '400' },
    fontLight: { fontWeight: '300' },

    colorPrimary: { color: colors.primary },
    colorSecondary: { color: colors.secondary },
    colorOnSurface: { color: colors.onSurface },
    colorError: { color: colors.error },
});

/**
 * Common card styles
 */
export const cardStyles = StyleSheet.create({
    card: {
        backgroundColor: colors.surface,
        borderRadius: dimensions.borderRadius.large,
        padding: spacing.lg,
        ...shadows.medium,
    },
    cardElevated: {
        backgroundColor: colors.surface,
        borderRadius: dimensions.borderRadius.large,
        padding: spacing.lg,
        ...shadows.large,
    },
    cardOutlined: {
        backgroundColor: colors.surface,
        borderRadius: dimensions.borderRadius.large,
        padding: spacing.lg,
        borderWidth: dimensions.borderWidth.medium,
        borderColor: colors.onSurfaceVariant,
    },
});

/**
 * Common button styles
 */
export const buttonStyles = StyleSheet.create({
    buttonBase: {
        borderRadius: dimensions.borderRadius.medium,
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.lg,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: dimensions.buttonHeight.medium,
    },
    buttonPrimary: {
        backgroundColor: colors.primary,
    },
    buttonSecondary: {
        backgroundColor: colors.secondary,
    },
    buttonOutlined: {
        backgroundColor: 'transparent',
        borderWidth: dimensions.borderWidth.medium,
        borderColor: colors.primary,
    },
});

/**
 * Common input styles
 */
export const inputStyles = StyleSheet.create({
    inputBase: {
        borderRadius: dimensions.borderRadius.medium,
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.lg,
        borderWidth: dimensions.borderWidth.medium,
        borderColor: colors.onSurfaceVariant,
        backgroundColor: colors.surface,
        ...typography.body1,
        color: colors.onSurface,
    },
    inputFocused: {
        borderColor: colors.primary,
        borderWidth: dimensions.borderWidth.thick,
    },
    inputError: {
        borderColor: colors.error,
    },
});

/**
 * Utility functions for dynamic styles
 */
export const createShadowStyle = (elevation: number): ViewStyle => {
    return {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: elevation / 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: elevation,
        elevation,
    };
};

export const createBorderStyle = (color: string, width: number = 1): ViewStyle => {
    return {
        borderColor: color,
        borderWidth: width,
    };
};

export const createBackgroundGradient = (colors: string[]) => {
    return {
        colors,
        start: { x: 0, y: 0 },
        end: { x: 1, y: 1 },
    };
};
