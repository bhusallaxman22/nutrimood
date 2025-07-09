import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Maximalism Material Design Color Palette
export const colors = {
    // Primary colors - Bold and vibrant
    primary: '#FF6B35',
    primaryVariant: '#E55527',
    secondary: '#00D4AA',
    secondaryVariant: '#00C49A',

    // Surface colors - Rich and dynamic
    surface: '#FFFFFF',
    surfaceVariant: '#FFEAA7',
    background: '#FDCB6E',

    // Material colors - Bold and textured
    material: {
        primary: '#FF6B35',
        secondary: '#00D4AA',
        tertiary: '#6C5CE7',
        accent: '#FD79A8',
        vibrant: '#00CEC9',
        electric: '#FDCB6E',
        neon: '#55EFC4',
        coral: '#FF7675',
    },

    // Text colors - High contrast
    onSurface: '#2D3436',
    onSurfaceVariant: '#636E72',
    onBackground: '#2D3436',
    onPrimary: '#FFFFFF',
    onSecondary: '#2D3436',

    // Status colors - Vibrant feedback colors
    error: '#E17055',
    success: '#00B894',
    warning: '#FDCB6E',
    info: '#74B9FF',

    // Gradients - Bold and multi-colored
    gradients: {
        primary: ['#FF6B35', '#E55527', '#D63031'],
        secondary: ['#00D4AA', '#00B894', '#00CEC9'],
        accent: ['#6C5CE7', '#A29BFE', '#FD79A8'],
        sunset: ['#FD79A8', '#FDCB6E', '#FF7675'],
        ocean: ['#74B9FF', '#0984E3', '#00CEC9'],
        electric: ['#55EFC4', '#00B894', '#FDCB6E'],
        cosmic: ['#6C5CE7', '#A29BFE', '#DDA0DD'],
        fire: ['#FF6B35', '#E55527', '#D63031', '#E17055'],
        rainbow: ['#FF6B35', '#FDCB6E', '#55EFC4', '#74B9FF', '#6C5CE7', '#FD79A8'],
        tropical: ['#00D4AA', '#55EFC4', '#74B9FF'],
        warm: ['#FF7675', '#FD79A8', '#FDCB6E'],
    },
};

// Shadow configurations - Bold material shadows
export const shadows = {
    none: {
        shadowColor: 'transparent',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0,
        shadowRadius: 0,
        elevation: 0,
    },
    small: {
        shadowColor: '#2D3436',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 4,
    },
    medium: {
        shadowColor: '#2D3436',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    large: {
        shadowColor: '#2D3436',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.35,
        shadowRadius: 16,
        elevation: 12,
    },
    colored: {
        shadowColor: '#FF6B35',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 12,
        elevation: 8,
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
        backgroundImage: 'linear-gradient(45deg, #FF6B35, #FDCB6E)',
    },

    card: {
        backgroundColor: colors.surface,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: colors.material.tertiary,
        padding: 24,
        ...shadows.colored,
        backgroundImage: 'linear-gradient(135deg, #FFFFFF, #FFEAA7)',
    },

    button: {
        backgroundColor: colors.material.primary,
        borderRadius: 16,
        borderWidth: 2,
        borderColor: colors.material.vibrant,
        paddingVertical: 16,
        paddingHorizontal: 32,
        alignItems: 'center',
        justifyContent: 'center',
        ...shadows.medium,
        backgroundImage: 'linear-gradient(45deg, #FF6B35, #E55527)',
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
        backgroundImage: 'linear-gradient(135deg, #FFFFFF, #FFEAA7)',
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

// Responsive Typography system - Adaptable to viewport
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
            fontWeight: '900' as const,
            lineHeight: Math.round(50 * fontMultiplier),
            letterSpacing: -1.2,
        },
        h2: {
            fontSize: Math.round(32 * fontMultiplier),
            fontWeight: '800' as const,
            lineHeight: Math.round(40 * fontMultiplier),
            letterSpacing: -1.0,
        },
        h3: {
            fontSize: Math.round(24 * fontMultiplier),
            fontWeight: '700' as const,
            lineHeight: Math.round(32 * fontMultiplier),
            letterSpacing: -0.8,
        },
        h4: {
            fontSize: Math.round(20 * fontMultiplier),
            fontWeight: '600' as const,
            lineHeight: Math.round(28 * fontMultiplier),
            letterSpacing: -0.6,
        },
        h5: {
            fontSize: Math.round(18 * fontMultiplier),
            fontWeight: '600' as const,
            lineHeight: Math.round(24 * fontMultiplier),
            letterSpacing: -0.4,
        },
        body1: {
            fontSize: Math.round(16 * fontMultiplier),
            fontWeight: '400' as const,
            lineHeight: Math.round(24 * fontMultiplier),
            letterSpacing: 0,
        },
        body2: {
            fontSize: Math.round(14 * fontMultiplier),
            fontWeight: '400' as const,
            lineHeight: Math.round(20 * fontMultiplier),
            letterSpacing: 0.1,
        },
        caption: {
            fontSize: Math.round(12 * fontMultiplier),
            fontWeight: '500' as const,
            lineHeight: Math.round(16 * fontMultiplier),
            letterSpacing: 0.4,
        },
        overline: {
            fontSize: Math.round(10 * fontMultiplier),
            fontWeight: '700' as const,
            lineHeight: Math.round(16 * fontMultiplier),
            letterSpacing: 1.5,
            textTransform: 'uppercase' as const,
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
