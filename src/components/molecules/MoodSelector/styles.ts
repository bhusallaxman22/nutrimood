import { StyleSheet } from 'react-native';
import { spacing, typography, colors, shadows } from '../../../theme/materialDesign';

export const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    moodsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: spacing.md,
    },
    moodCard: {
        backgroundColor: colors.surfaceVariant,
        borderRadius: 16,
        borderWidth: 2,
        borderColor: colors.material.tertiary,
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.lg,
        alignItems: 'center',
        minWidth: 100,
        ...shadows.small,
    },
    selectedCard: {
        backgroundColor: colors.material.electric,
        borderColor: colors.material.neon,
        borderWidth: 3,
        ...shadows.medium,
    },
    moodEmoji: {
        fontSize: 32,
        marginBottom: spacing.xs,
    },
    moodText: {
        ...typography.body2,
        color: colors.onSurface,
        fontWeight: '500',
        textAlign: 'center',
    },
    selectedText: {
        color: colors.primary,
        fontWeight: '600',
    },
});
