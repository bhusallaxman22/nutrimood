import { StyleSheet, Dimensions } from 'react-native';
import { colors, typography, spacing } from '../../theme/materialDesign';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        paddingHorizontal: spacing.md, // Reduced from spacing.lg
    },
    skipButton: {
        alignSelf: 'flex-end',
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.lg,
        marginTop: spacing.md,
    },
    skipText: {
        ...typography.body1,
        color: colors.surface,
        fontWeight: '600',
    },
    mainContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        padding: spacing.xl, // Reduced from spacing.xxxl
        alignItems: 'center',
        width: '100%',
        maxWidth: 350,
    },
    emoji: {
        fontSize: 64, // Reduced from 80
        marginBottom: spacing.lg, // Reduced from spacing.xl
        textAlign: 'center',
    },
    title: {
        ...typography.h2,
        color: colors.onSurface,
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: spacing.lg,
    },
    description: {
        ...typography.body1,
        color: colors.onSurfaceVariant,
        textAlign: 'center',
        lineHeight: 24,
    },
    progressContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: spacing.xl,
        gap: spacing.sm,
    },
    progressDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: colors.surface + '50',
    },
    progressDotActive: {
        backgroundColor: colors.surface,
        width: 24,
    },
    buttonContainer: {
        paddingBottom: spacing.lg,
    },
    nextButton: {
        paddingVertical: spacing.lg,
    },
});
