import { StyleSheet } from 'react-native';
import { colors, typography, fontFamilies } from '../../src/theme/materialDesign';

export const styles = StyleSheet.create({
    default: {
        ...typography.body1,
        color: colors.onSurface,
    },
    defaultSemiBold: {
        ...typography.body1,
        fontFamily: fontFamilies.primaryBold,
        fontWeight: '600',
        color: colors.onSurface,
    },
    title: {
        ...typography.h2,
        color: colors.primary,
        textShadowColor: 'rgba(255, 107, 53, 0.2)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    subtitle: {
        ...typography.h4,
        color: colors.onSurfaceVariant,
    },
    link: {
        ...typography.body1,
        color: colors.material.vibrant,
        fontFamily: fontFamilies.primaryBold,
        fontWeight: '600',
        textDecorationLine: 'underline',
    },
    caption: {
        ...typography.caption,
        color: colors.material.accent,
    },
    overline: {
        ...typography.overline,
        color: colors.material.electric,
    },
    // Maximalist text variants
    hero: {
        ...typography.h1,
        color: colors.primary,
        textShadowColor: 'rgba(255, 107, 53, 0.3)',
        textShadowOffset: { width: 0, height: 4 },
        textShadowRadius: 8,
    },
    vibrant: {
        ...typography.body1,
        color: colors.material.vibrant,
        fontFamily: fontFamilies.secondaryBold,
        fontWeight: '700',
    },
    neon: {
        ...typography.body1,
        color: colors.material.neon,
        fontFamily: fontFamilies.secondaryBold,
        fontWeight: '600',
        textShadowColor: 'rgba(85, 239, 196, 0.5)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 10,
    },
});
