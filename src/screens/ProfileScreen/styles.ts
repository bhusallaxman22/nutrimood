import { StyleSheet, Platform } from 'react-native';
import { colors, typography, spacing, dimensions } from '../../theme/materialDesign';

export const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        flex: 1,
        padding: spacing.md, // Reduced from spacing.lg
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        ...typography.body1,
        color: colors.onSurface,
    },
    header: {
        marginTop: spacing.sm, // Reduced from spacing.lg
        marginBottom: spacing.lg, // Reduced from spacing.xl
        alignItems: 'center',
    },
    titleText: {
        ...typography.h1,
        color: colors.onSurface,
        textAlign: 'center',
        fontWeight: '700',
        fontSize: 28, // Reduced from 32
        lineHeight: 34, // Reduced from 38
        letterSpacing: -0.5,
    },
    subtitle: {
        ...typography.body1,
        color: colors.onSurfaceVariant,
        textAlign: 'center',
        marginTop: spacing.sm,
        marginBottom: spacing.md,
    },
    editButton: {
        backgroundColor: colors.primary,
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.sm,
        borderRadius: 20,
        marginTop: spacing.md,
    },
    editButtonText: {
        ...typography.body1,
        color: colors.onPrimary,
        fontWeight: '600',
    },
    card: {
        marginBottom: spacing.md, // Reduced from spacing.lg
    },
    sectionTitle: {
        ...typography.h4,
        color: colors.onSurface,
        fontWeight: '600',
        marginBottom: spacing.sm, // Reduced from spacing.md
    },
    formGroup: {
        marginBottom: spacing.sm, // Reduced from spacing.md
    },
    formRow: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    label: {
        ...typography.caption,
        color: colors.onSurface,
        fontWeight: '500',
        marginBottom: spacing.xs,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    input: {
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.onSurfaceVariant,
        borderRadius: 12,
        padding: spacing.sm, // Reduced from spacing.md
        ...typography.body1,
        color: colors.onSurface,
        minHeight: 44, // Reduced from 48
    },
    inputDisabled: {
        backgroundColor: colors.surfaceVariant,
        color: colors.onSurfaceVariant,
        opacity: 0.7,
    },
    textArea: {
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.onSurfaceVariant,
        borderRadius: 12,
        padding: spacing.sm, // Reduced from spacing.md
        ...typography.body1,
        color: colors.onSurface,
        minHeight: 60, // Reduced from 80
        textAlignVertical: 'top',
    },
    optionButton: {
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.onSurfaceVariant,
        borderRadius: 12,
        padding: spacing.md,
        marginBottom: spacing.sm,
    },
    optionButtonActive: {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
    },
    optionButtonDisabled: {
        opacity: 0.6,
    },
    optionText: {
        ...typography.body1,
        color: colors.onSurface,
    },
    optionTextActive: {
        color: colors.onPrimary,
        fontWeight: '600',
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: spacing.md,
        marginBottom: spacing.lg,
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
    actionsList: {
        gap: spacing.md,
    },
    logoutButton: {
        borderColor: colors.onSurfaceVariant,
        marginBottom: spacing.xs,
    },
    deleteButton: {
        borderColor: colors.error,
    },
});
