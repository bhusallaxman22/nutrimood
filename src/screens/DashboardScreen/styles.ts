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
        marginBottom: spacing.lg,
        padding: spacing.xl, // Increased for better content display
        minHeight: 200, // Increased for proper text display
    },
    cardTitle: {
        ...typography.h3,
        color: colors.onSurface,
        marginBottom: spacing.lg, // Increased for better spacing
        fontWeight: '700',
        fontSize: 22, // Increased for better readability
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
