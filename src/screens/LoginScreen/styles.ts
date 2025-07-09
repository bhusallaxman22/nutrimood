import { StyleSheet, Platform } from 'react-native';
import { colors, typography, spacing, dimensions } from '../../theme/materialDesign';

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
        padding: spacing.lg,
        paddingTop: Platform.OS === 'ios' ? spacing.xxl : spacing.lg,
    },
    card: {
        padding: spacing.xl,
        marginHorizontal: spacing.md,
    },
    header: {
        alignItems: 'center',
        marginBottom: spacing.xl,
    },
    title: {
        ...typography.h2,
        color: colors.onSurface,
        marginBottom: spacing.xs,
        textAlign: 'center',
        fontWeight: '700',
    },
    subtitle: {
        ...typography.body1,
        color: colors.onSurfaceVariant,
        textAlign: 'center',
        fontWeight: '400',
    },
    form: {
        gap: spacing.lg,
    },
    errorText: {
        ...typography.body2,
        color: colors.error,
        textAlign: 'center',
        backgroundColor: colors.error + '10',
        padding: spacing.md,
        borderRadius: dimensions.borderRadius.medium,
        borderWidth: 1,
        borderColor: colors.error + '30',
    },
    loginButton: {
        marginTop: spacing.sm,
    },
    signupButton: {
        marginTop: spacing.md,
    },
});
