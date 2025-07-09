import { StyleSheet } from 'react-native';
import { colors, typography, spacing } from '../../theme/materialDesign';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        padding: spacing.md,
        paddingTop: spacing.lg,
        paddingBottom: spacing.xxl * 2,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.lg,
        paddingHorizontal: spacing.xs,
    },
    backButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: spacing.sm,
    },
    backIcon: {
        fontSize: 16,
        color: colors.onSurface,
        fontWeight: '600',
    },
    headerContent: {
        flex: 1,
    },
    headerTitle: {
        ...typography.body1,
        color: colors.onSurface,
        fontWeight: '700',
        marginBottom: spacing.xs,
    },
    headerSubtitle: {
        ...typography.caption,
        color: colors.onSurfaceVariant,
        textTransform: 'capitalize',
    },
    shareButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: spacing.sm,
    },
    shareIcon: {
        fontSize: 14,
        color: colors.primary,
        fontWeight: '600',
    },
    summaryContainer: {
        marginBottom: spacing.md,
    },
    summaryCard: {
        padding: spacing.md,
    },
    summaryTitle: {
        ...typography.body1,
        color: colors.onSurface,
        fontWeight: '600',
        marginBottom: spacing.sm,
        textAlign: 'center',
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    summaryItem: {
        alignItems: 'center',
        flex: 1,
    },
    summaryEmoji: {
        fontSize: 24,
        marginBottom: spacing.xs,
    },
    summaryLabel: {
        ...typography.caption,
        color: colors.onSurfaceVariant,
        marginBottom: spacing.xs,
    },
    summaryValue: {
        ...typography.body2,
        color: colors.onSurface,
        fontWeight: '600',
        textTransform: 'capitalize',
    },
    suggestionCard: {
        marginBottom: spacing.md,
        padding: spacing.md,
    },
    suggestionHeader: {
        marginBottom: spacing.md,
    },
    suggestionHeaderText: {
        ...typography.body1,
        color: colors.onSurface,
        fontWeight: '700',
        marginBottom: spacing.sm,
        textAlign: 'center',
    },
    moodGoalBadges: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: spacing.sm,
    },
    badge: {
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        borderRadius: 12,
    },
    moodBadge: {
        backgroundColor: colors.primary + '20',
    },
    goalBadge: {
        backgroundColor: colors.secondary + '20',
    },
    badgeText: {
        ...typography.caption,
        color: colors.onSurface,
        fontWeight: '600',
    },
    markdownContent: {
        padding: spacing.sm,
    },
    fallbackContent: {
        padding: spacing.sm,
        alignItems: 'center',
    },
    fallbackTitle: {
        ...typography.body1,
        color: colors.onSurface,
        fontWeight: '600',
        marginBottom: spacing.sm,
        textAlign: 'center',
    },
    fallbackText: {
        ...typography.body2,
        color: colors.onSurfaceVariant,
        textAlign: 'center',
        lineHeight: 20,
        marginBottom: spacing.sm,
    },
    fallbackNote: {
        ...typography.caption,
        color: colors.primary,
        textAlign: 'center',
        fontStyle: 'italic',
    },
    feedbackCard: {
        marginBottom: spacing.lg,
        padding: spacing.md,
    },
    feedbackTitle: {
        ...typography.body1,
        color: colors.onSurface,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: spacing.xs,
    },
    feedbackSubtitle: {
        ...typography.caption,
        color: colors.onSurfaceVariant,
        textAlign: 'center',
        marginBottom: spacing.md,
    },
    feedbackButtons: {
        gap: spacing.sm,
    },
    helpfulButton: {
        backgroundColor: colors.primary,
    },
    notHelpfulButton: {
        borderColor: colors.primary,
    },
    thankYouContainer: {
        alignItems: 'center',
        paddingVertical: spacing.sm,
    },
    thankYouText: {
        ...typography.body2,
        color: colors.primary,
        fontWeight: '600',
        marginBottom: spacing.xs,
    },
    thankYouSubtext: {
        ...typography.caption,
        color: colors.onSurfaceVariant,
        textAlign: 'center',
    },
    actionButtons: {
        gap: spacing.sm,
    },
    bookmarkButton: {
        backgroundColor: colors.secondary,
    },
});
