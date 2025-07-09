import { StyleSheet } from 'react-native';
import { spacing, typography, colors, shadows } from '../../../theme/materialDesign';

export const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    goalsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: spacing.md,
    },
    goalCard: {
        backgroundColor: colors.surfaceVariant,
        borderRadius: 16,
        borderWidth: 2,
        borderColor: colors.material.primary,
        padding: spacing.md,
        alignItems: 'center',
        minWidth: 140,
        minHeight: 120,
        justifyContent: 'center',
        ...shadows.small,
    },
    selectedCard: {
        backgroundColor: colors.material.accent,
        borderColor: colors.material.coral,
        borderWidth: 3,
        ...shadows.medium,
    },
    goalEmoji: {
        fontSize: 28,
        marginBottom: spacing.xs,
    },
    goalTitle: {
        ...typography.body1,
        color: colors.onSurface,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: spacing.xs,
    },
    selectedTitle: {
        color: colors.secondary,
        fontWeight: '700',
    },
    goalDescription: {
        ...typography.caption,
        color: colors.onSurfaceVariant,
        textAlign: 'center',
        lineHeight: 16,
    },
    selectedDescription: {
        color: colors.onSurface,
        fontWeight: '500',
    },
});
