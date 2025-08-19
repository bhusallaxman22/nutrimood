/**
 * Maximalist Design System Colors
 * Bold, vibrant colors for an engaging user experience
 */

// Primary maximalist colors - Bold and expressive
const tintColorLight = '#FF6B35';
const tintColorDark = '#FD79A8';
// Gradients retained for potential future use (commented out to avoid lint errors)
// const primaryGradient = ['#FF6B35', '#E55527'];
// const secondaryGradient = ['#00D4AA', '#00CEC9'];

export const Colors = {
  light: {
    text: '#1F2428',
    // Replaced saturated yellow with a calm, neutral bluish gray to better match the app vibe
    background: '#F5F7FA',
    surface: '#FFFFFF',
    tint: tintColorLight,
    icon: '#6C5CE7',
    tabIconDefault: '#636E72',
    tabIconSelected: tintColorLight,
    primary: '#FF6B35',
    secondary: '#00D4AA',
    accent: '#FD79A8',
    vibrant: '#00CEC9',
    // Keep electric as accent but no longer used as base background
    electric: '#55EFC4',
    success: '#00B894',
    warning: '#FFB347',
    error: '#E17055',
    info: '#74B9FF',
  },
  dark: {
    text: '#FFFFFF',
    background: '#2D3436',
    surface: '#636E72',
    tint: tintColorDark,
    icon: '#55EFC4',
    tabIconDefault: '#A29BFE',
    tabIconSelected: tintColorDark,
    primary: '#FF6B35',
    secondary: '#55EFC4',
    accent: '#A29BFE',
    vibrant: '#74B9FF',
    electric: '#FDCB6E',
    success: '#00B894',
    warning: '#FDCB6E',
    error: '#E17055',
    info: '#74B9FF',
  },
};
