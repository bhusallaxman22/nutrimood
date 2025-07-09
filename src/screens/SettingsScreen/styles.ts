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
    scrollContent: {
        padding: spacing.md, // Reduced from spacing.lg
        paddingBottom: spacing.xl, // Reduced from spacing.xxxl
    },
    header: {
        marginBottom: spacing.lg, // Reduced from spacing.xl
        alignItems: 'center',
    },
    titleText: {
        ...typography.h2,
        color: colors.onSurface,
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: spacing.sm,
    },
    subtitleText: {
        ...typography.body1,
        color: colors.onSurfaceVariant,
        textAlign: 'center',
    },
    loadingText: {
        ...typography.h3,
        color: colors.onSurface,
    },
    userCard: {
        marginBottom: spacing.lg, // Reduced from spacing.xl
        padding: spacing.lg, // Reduced from spacing.xl
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
    },
    avatarText: {
        ...typography.h3,
        color: colors.onPrimary,
        fontWeight: '700',
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
    settingsContainer: {
        gap: spacing.lg,
    },
    settingsCard: {
        padding: spacing.lg, // Reduced from spacing.xl
    },
    sectionTitle: {
        ...typography.h4,
        color: colors.onSurface,
        fontWeight: '600',
        marginBottom: spacing.md, // Reduced from spacing.lg
    },
    settingsItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: colors.onSurface + '10',
    },
    settingsItemText: {
        ...typography.body1,
        color: colors.onSurface,
        fontWeight: '500',
    },
    settingsItemArrow: {
        ...typography.h3,
        color: colors.onSurfaceVariant,
        fontWeight: '300',
    },
    actionsList: {
        gap: spacing.md,
    },
    logoutButton: {
        borderColor: colors.onSurfaceVariant,
    },
    deleteButton: {
        borderColor: colors.error,
    },
    editCard: {
        marginTop: spacing.xl,
        padding: spacing.xl,
    },
    editTitle: {
        ...typography.h4,
        color: colors.onSurface,
        fontWeight: '600',
        marginBottom: spacing.lg,
    },
    input: {
        backgroundColor: colors.surface,
        borderWidth: 2,
        borderColor: colors.primary + '30',
        borderRadius: dimensions.borderRadius.large,
        padding: spacing.lg,
        ...typography.body1,
        color: colors.onSurface,
        marginBottom: spacing.lg,
    },
    editActions: {
        flexDirection: 'row',
        gap: spacing.md,
        marginTop: spacing.lg,
    },
    cancelButton: {
        flex: 1,
        backgroundColor: colors.surfaceVariant,
        borderRadius: 12,
        padding: spacing.md,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 48,
    },
    cancelButtonText: {
        ...typography.body1,
        color: colors.onSurfaceVariant,
        fontWeight: '600',
    },
    saveButton: {
        flex: 1,
    },
});
