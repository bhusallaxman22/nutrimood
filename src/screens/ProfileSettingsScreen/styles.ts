import { StyleSheet } from 'react-native';
import { colors, typography, spacing, dimensions } from '../../theme/materialDesign';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        ...typography.h3,
        color: colors.onSurface,
    },
    scrollContent: {
        paddingBottom: spacing.xxxl,
    },
    header: {
        padding: spacing.lg,
        alignItems: 'center',
        position: 'relative',
    },
    backButton: {
        position: 'absolute',
        left: spacing.lg,
        top: spacing.lg,
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.md,
        backgroundColor: colors.surface + 'B0',
        borderRadius: dimensions.borderRadius.medium,
    },
    backButtonText: {
        ...typography.body2,
        color: colors.primary,
        fontWeight: '600',
        fontSize: 16,
    },
    titleText: {
        ...typography.h2,
        color: colors.onSurface,
        fontWeight: '700',
        marginBottom: spacing.xs,
        marginTop: spacing.lg,
    },
    subtitleText: {
        ...typography.body1,
        color: colors.onSurfaceVariant,
        textAlign: 'center',
    },
    userCard: {
        marginHorizontal: spacing.lg,
        marginBottom: spacing.lg,
        padding: spacing.lg,
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatarContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: spacing.lg,
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 4,
    },
    avatarText: {
        ...typography.h3,
        color: colors.onPrimary,
        fontWeight: '700',
        fontSize: 24,
    },
    userDetails: {
        flex: 1,
    },
    userName: {
        ...typography.h4,
        color: colors.onSurface,
        fontWeight: '600',
        marginBottom: spacing.xs,
    },
    userEmail: {
        ...typography.body2,
        color: colors.onSurfaceVariant,
    },
    formCard: {
        marginHorizontal: spacing.lg,
        marginBottom: spacing.lg,
        padding: spacing.lg,
    },
    sectionTitle: {
        ...typography.h4,
        color: colors.onSurface,
        fontWeight: '600',
        marginBottom: spacing.lg,
    },
    inputGroup: {
        marginBottom: spacing.lg,
    },
    inputLabel: {
        ...typography.body2,
        color: colors.onSurface,
        fontWeight: '500',
        marginBottom: spacing.sm,
    },
    input: {
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.primary + '30',
        borderRadius: dimensions.borderRadius.medium,
        padding: spacing.md,
        ...typography.body1,
        color: colors.onSurface,
        fontSize: 16,
    },
    textArea: {
        minHeight: 100,
        textAlignVertical: 'top',
    },
    characterCount: {
        ...typography.caption,
        color: colors.onSurfaceVariant,
        textAlign: 'right',
        marginTop: spacing.xs,
        fontSize: 12,
    },
    inputRow: {
        flexDirection: 'row',
        gap: spacing.md,
        marginBottom: spacing.lg,
    },
    inputHalf: {
        flex: 1,
    },
    activityOptions: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.sm,
        marginTop: spacing.sm,
    },
    activityOption: {
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        backgroundColor: colors.surfaceVariant,
        borderRadius: dimensions.borderRadius.medium,
        borderWidth: 1,
        borderColor: colors.primary + '20',
    },
    activityOptionSelected: {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
    },
    activityOptionText: {
        ...typography.caption,
        color: colors.onSurfaceVariant,
        fontWeight: '500',
        fontSize: 12,
    },
    activityOptionTextSelected: {
        color: colors.onPrimary,
        fontWeight: '600',
    },
    actions: {
        flexDirection: 'row',
        gap: spacing.md,
        paddingHorizontal: spacing.lg,
        marginTop: spacing.lg,
    },
    cancelButton: {
        flex: 1,
        backgroundColor: colors.surfaceVariant,
        borderColor: colors.onSurfaceVariant + '30',
    },
    saveButton: {
        flex: 1,
    },
});