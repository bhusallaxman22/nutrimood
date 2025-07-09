import { StyleSheet, Platform } from 'react-native';
import { colors, typography, spacing } from '../../theme/materialDesign';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        padding: spacing.md,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        ...typography.body2,
        color: colors.onSurface,
        marginTop: spacing.sm,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: spacing.md,
        paddingTop: Platform.OS === 'android' ? spacing.sm : 0,
    },
    backButton: {
        padding: spacing.sm,
    },
    backButtonText: {
        ...typography.body2,
        color: colors.primary,
        fontWeight: '600',
    },
    title: {
        ...typography.h4,
        color: colors.onSurface,
        fontWeight: '700',
    },
    headerSpacer: {
        width: 50, // Same width as back button for centering
    },
    filterContainer: {
        flexDirection: 'row',
        marginBottom: spacing.md,
        backgroundColor: colors.surface + '40',
        borderRadius: 20,
        padding: 3,
    },
    filterButton: {
        flex: 1,
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.sm,
        borderRadius: 16,
        alignItems: 'center',
    },
    activeFilterButton: {
        backgroundColor: colors.primary,
    },
    filterButtonText: {
        ...typography.caption,
        color: colors.onSurface,
        fontWeight: '500',
    },
    activeFilterButtonText: {
        color: colors.onPrimary,
        fontWeight: '600',
    },
    scrollView: {
        flex: 1,
    },
    suggestionsGrid: {
        gap: spacing.sm,
    },
    suggestionCard: {
        marginBottom: spacing.sm,
    },
    suggestionContent: {
        padding: spacing.sm,
    },
    suggestionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.sm,
    },
    suggestionHeaderLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    suggestionEmoji: {
        fontSize: 20,
        marginRight: spacing.sm,
    },
    suggestionMood: {
        ...typography.caption,
        color: colors.primary,
        fontWeight: '600',
        textTransform: 'capitalize',
    },
    suggestionDate: {
        ...typography.caption,
        color: colors.onSurface + '80',
        marginTop: 1,
        fontSize: 10,
    },
    bookmarkButton: {
        padding: spacing.xs,
    },
    bookmarkIcon: {
        fontSize: 16,
        color: colors.primary,
    },
    suggestionTitle: {
        ...typography.body2,
        color: colors.onSurface,
        fontWeight: '600',
        marginBottom: spacing.xs,
    },
    suggestionDescription: {
        ...typography.caption,
        color: colors.onSurface + '90',
        lineHeight: 16,
        marginBottom: spacing.sm,
    },
    suggestionFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    suggestionPrepTime: {
        ...typography.caption,
        color: colors.onSurface + '80',
        fontSize: 10,
    },
    suggestionCalories: {
        ...typography.caption,
        color: colors.onSurface + '80',
        fontSize: 10,
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: spacing.xxl,
    },
    emptyStateEmoji: {
        fontSize: 36,
        marginBottom: spacing.sm,
    },
    emptyStateTitle: {
        ...typography.body1,
        color: colors.onSurface,
        fontWeight: '600',
        marginBottom: spacing.sm,
        textAlign: 'center',
    },
    emptyStateSubtitle: {
        ...typography.caption,
        color: colors.onSurface + '80',
        textAlign: 'center',
        marginBottom: spacing.md,
        paddingHorizontal: spacing.md,
    },
    emptyStateButton: {
        backgroundColor: colors.primary,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        borderRadius: 16,
    },
    emptyStateButtonText: {
        ...typography.caption,
        color: colors.onPrimary,
        fontWeight: '600',
    },
    bottomPadding: {
        height: spacing.xxl,
    },
});
