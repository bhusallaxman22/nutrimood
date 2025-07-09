import { StyleSheet } from 'react-native';
import { colors, shadows, typography, spacing, dimensions } from '../../../theme/materialDesign';

export const styles = StyleSheet.create({
    container: {
        marginBottom: spacing.lg,
    },
    label: {
        ...typography.body2,
        color: colors.onSurface,
        marginBottom: spacing.sm,
        fontWeight: '600',
    },
    inputContainer: {
        backgroundColor: colors.surfaceVariant,
        borderRadius: dimensions.borderRadius.large,
        borderWidth: 2,
        borderColor: colors.material.primary,
        overflow: 'hidden',
        ...shadows.small,
    },
    outlined: {
        backgroundColor: colors.surface,
        borderColor: colors.onSurfaceVariant + '30',
        ...shadows.none,
    },
    focused: {
        borderColor: colors.primary,
        borderWidth: 2,
        ...shadows.medium,
    },
    error: {
        borderColor: colors.error,
        borderWidth: 2,
    },
    blurView: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
    },
    input: {
        ...typography.body1,
        color: colors.onSurface,
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.lg,
        minHeight: dimensions.inputHeight.medium,
        textAlignVertical: 'top',
    },
    outlinedInput: {
        backgroundColor: colors.surface,
    },
    errorText: {
        ...typography.caption,
        color: colors.error,
        marginTop: spacing.sm,
        marginLeft: spacing.sm,
    },
});
