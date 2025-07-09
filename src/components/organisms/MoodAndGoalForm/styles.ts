import { StyleSheet } from 'react-native';
import { spacing, typography, colors } from '../../../theme/materialDesign';

export const styles = StyleSheet.create({
    container: {
        gap: spacing.lg,
    },
    label: {
        ...typography.h4,
        color: colors.onSurface,
        fontWeight: '600',
        textAlign: 'center',
    },
    section: {
        gap: spacing.md,
    },
    sectionTitle: {
        ...typography.h4,
        color: colors.onSurface,
        textAlign: 'center',
        marginBottom: spacing.md,
    },
    button: {
        marginTop: spacing.md,
    },
    submitButton: {
        marginTop: spacing.md,
    },
    disabledButton: {
        backgroundColor: colors.surfaceVariant,
        opacity: 0.5,
    },
});
