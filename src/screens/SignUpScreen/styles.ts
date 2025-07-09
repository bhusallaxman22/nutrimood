import { StyleSheet, Platform } from 'react-native';
import { colors, typography, spacing } from '../../theme/materialDesign';

export const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    keyboardAvoid: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: spacing.md, // Reduced from spacing.lg
        paddingTop: Platform.OS === 'ios' ? spacing.xl : spacing.md, // Reduced
    },
    card: {
        padding: spacing.lg, // Reduced from spacing.xl
    },
    header: {
        alignItems: 'center',
        marginBottom: spacing.lg, // Reduced from spacing.xl
    },
    title: {
        ...typography.h2,
        color: colors.onSurface,
        marginBottom: spacing.xs,
        textAlign: 'center',
    },
    subtitle: {
        ...typography.body1,
        color: colors.onSurfaceVariant,
        textAlign: 'center',
    },
    form: {
        gap: spacing.md,
    },
    errorText: {
        ...typography.body2,
        color: colors.error,
        textAlign: 'center',
        backgroundColor: 'rgba(179, 38, 30, 0.1)',
        padding: spacing.sm,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'rgba(179, 38, 30, 0.3)',
    },
    signupButton: {
        marginTop: spacing.md,
    },
    loginButton: {
        marginTop: spacing.sm,
    },
});
