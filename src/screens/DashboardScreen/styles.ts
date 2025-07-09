import { StyleSheet } from 'react-native';
import { colors, typography, spacing, shadows, dimensions } from '../../theme/materialDesign';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: spacing.md, // Reduced from spacing.lg
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
    errorText: {
        ...typography.body1,
        color: colors.error,
        textAlign: 'center',
        padding: spacing.md, // Reduced from spacing.lg
    },
    header: {
        marginBottom: spacing.md, // Reduced from spacing.lg
    },
    greetingText: {
        ...typography.h1,
        color: colors.onSurface,
        fontWeight: 'bold',
        fontSize: 24, // Reduced for better viewport
    },
    subtitleText: {
        ...typography.body1,
        color: colors.onSurfaceVariant,
    },
    card: {
        marginBottom: spacing.lg, // Reduced from spacing.xl
        padding: spacing.lg, // Reduced from spacing.xl
        minHeight: 140, // Reduced from 180
    },
    cardTitle: {
        ...typography.h3,
        color: colors.onSurface,
        marginBottom: spacing.md, // Reduced from spacing.lg
        fontWeight: '700',
        fontSize: 20, // Reduced from 22
    },
    moodText: {
        ...typography.body1,
        color: colors.onSurfaceVariant,
        marginBottom: spacing.md,
    },
    chart: {
        borderRadius: dimensions.borderRadius.large,
        ...shadows.medium,
    },
    chartErrorText: {
        ...typography.body2,
        color: colors.onSurfaceVariant,
        textAlign: 'center',
        paddingVertical: spacing.xl,
    },
    noDataText: {
        ...typography.body1,
        color: colors.onSurfaceVariant,
        textAlign: 'center',
        paddingVertical: spacing.xl,
    },
    actionButton: {
        paddingVertical: spacing.sm, // Reduced from spacing.md
        paddingHorizontal: spacing.md, // Reduced from spacing.lg
    },
});
