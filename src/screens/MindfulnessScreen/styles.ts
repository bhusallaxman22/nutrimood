import { StyleSheet, Dimensions } from 'react-native';
import { colors, typography, spacing } from '../../theme/materialDesign';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: spacing.md, // Reduced from spacing.lg
        paddingBottom: spacing.xl, // Reduced from spacing.xxl * 3
    },
    header: {
        marginTop: spacing.lg, // Reduced from spacing.xxl
        marginBottom: spacing.lg, // Reduced from spacing.xl
        alignItems: 'center',
    },
    titleText: {
        ...typography.h2,
        color: 'white',
        textAlign: 'center',
        marginBottom: spacing.sm,
        fontWeight: '700',
    },
    subtitleText: {
        ...typography.body1,
        color: 'rgba(255, 255, 255, 0.8)',
        textAlign: 'center',
    },
    statsContainer: {
        marginTop: spacing.md,
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.sm,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    statsText: {
        ...typography.caption,
        color: 'rgba(255, 255, 255, 0.9)',
        fontWeight: '600',
    },
    sessionsGrid: {
        paddingHorizontal: spacing.md, // Reduced from spacing.lg
        paddingBottom: spacing.xl, // Reduced from spacing.xxl * 2
    },
    sessionCard: {
        width: '100%',
        padding: spacing.lg, // Reduced from spacing.xl
        marginBottom: spacing.md, // Reduced from spacing.lg
        alignItems: 'center',
        minHeight: 140, // Reduced from 180
        position: 'relative',
    },
    cardFavoriteButton: {
        position: 'absolute',
        top: spacing.sm,
        right: spacing.sm,
        zIndex: 1,
        padding: spacing.xs,
    },
    cardFavoriteIcon: {
        fontSize: 20,
    },
    sessionCardContent: {
        alignItems: 'center',
        width: '100%',
        paddingBottom: spacing.lg,
    },
    sessionEmoji: {
        fontSize: 36, // Reduced from 42
        marginBottom: spacing.sm, // Reduced from spacing.md
    },
    sessionCardTitle: {
        ...typography.h4,
        color: colors.onSurface,
        textAlign: 'center',
        marginBottom: spacing.xs, // Reduced from spacing.sm
        fontWeight: '700',
        fontSize: 18, // Reduced from 20
    },
    sessionDescription: {
        ...typography.body2,
        color: colors.onSurfaceVariant,
        textAlign: 'center',
        marginBottom: spacing.md,
        fontSize: 14,
        lineHeight: 20,
        paddingHorizontal: spacing.sm,
    },
    sessionDuration: {
        ...typography.caption,
        color: colors.primary,
        marginBottom: spacing.lg,
        fontWeight: '600',
        fontSize: 14,
    },
    sessionMetrics: {
        alignItems: 'center',
        marginBottom: spacing.lg,
        width: '100%',
    },
    metricText: {
        ...typography.caption,
        color: colors.onSurfaceVariant,
        fontSize: 12,
        marginBottom: spacing.xs,
        textAlign: 'center',
    },
    startButton: {
        paddingHorizontal: spacing.xl,
        paddingVertical: spacing.md,
        minWidth: 140,
    },
    tipsCard: {
        marginBottom: spacing.lg,
    },
    tipsCardInner: {
        padding: spacing.lg,
    },
    tipsTitle: {
        ...typography.h4,
        color: colors.onSurface,
        marginBottom: spacing.md,
        fontWeight: '600',
        textAlign: 'center',
    },
    tipsText: {
        ...typography.body2,
        color: colors.onSurfaceVariant,
        lineHeight: 20,
    },
    favoritesSection: {
        padding: spacing.lg,
        marginBottom: spacing.xl,
    },
    favoritesTitle: {
        ...typography.h4,
        color: colors.onSurface,
        marginBottom: spacing.md,
        fontWeight: '600',
    },
    favoritesList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.sm,
    },
    favoriteItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        borderRadius: 15,
        marginRight: spacing.sm,
        marginBottom: spacing.sm,
    },
    favoriteEmoji: {
        fontSize: 16,
        marginRight: spacing.xs,
    },
    favoriteText: {
        ...typography.body2,
        color: colors.onSurface,
        fontWeight: '500',
    },
    // Session screen styles
    particleContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    particle: {
        position: 'absolute',
        width: 4,
        height: 4,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 2,
    },
    sessionContainer: {
        flex: 1,
        padding: spacing.lg,
        justifyContent: 'space-between',
        zIndex: 1,
    },
    sessionHeader: {
        alignItems: 'center',
        marginTop: spacing.xxl,
        position: 'relative',
    },
    favoriteButton: {
        position: 'absolute',
        top: 0,
        right: 0,
        padding: spacing.sm,
    },
    favoriteIcon: {
        fontSize: 24,
    },
    sessionTitle: {
        ...typography.h2,
        color: 'white',
        textAlign: 'center',
        marginBottom: spacing.sm,
        fontWeight: '700',
    },
    progressContainer: {
        alignItems: 'center',
    },
    timerText: {
        ...typography.h3,
        color: 'rgba(255, 255, 255, 0.9)',
        fontWeight: '600',
        marginBottom: spacing.sm,
    },
    progressBar: {
        width: 200,
        height: 4,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 2,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 2,
    },
    breathingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    breathingBackground: {
        position: 'absolute',
        width: width * 0.8,
        height: width * 0.8,
        borderRadius: width * 0.4,
    },
    breathingGradient: {
        flex: 1,
        borderRadius: width * 0.4,
    },
    breathingCircle: {
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0.3)',
        position: 'relative',
    },
    rippleContainer: {
        position: 'absolute',
        width: 200,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ripple: {
        position: 'absolute',
        width: 150,
        height: 150,
        borderRadius: 75,
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    ripple2: {
        position: 'absolute',
        width: 180,
        height: 180,
        borderRadius: 90,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    breathingEmoji: {
        fontSize: 48,
        zIndex: 1,
    },
    phaseContainer: {
        alignItems: 'center',
        marginTop: spacing.xl,
    },
    phaseInstruction: {
        ...typography.body1,
        color: 'rgba(255, 255, 255, 0.9)',
        textAlign: 'center',
        marginBottom: spacing.sm,
    },
    phaseText: {
        ...typography.h4,
        color: 'white',
        textAlign: 'center',
        fontWeight: '600',
    },
    affirmationContainer: {
        paddingHorizontal: spacing.xl,
        paddingVertical: spacing.lg,
    },
    affirmationText: {
        ...typography.h4,
        color: 'white',
        textAlign: 'center',
        fontStyle: 'italic',
        fontWeight: '300',
    },
    sessionControls: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: spacing.xl,
        gap: spacing.lg,
    },
    pauseButton: {
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.md,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 25,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
        minWidth: 60,
        alignItems: 'center',
    },
    pauseButtonText: {
        fontSize: 18,
    },
    stopButton: {
        paddingHorizontal: spacing.xl,
        paddingVertical: spacing.md,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 25,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    stopButtonText: {
        ...typography.body1,
        color: 'white',
        fontWeight: '600',
    },
    completionOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        zIndex: 10,
    },
    completionText: {
        fontSize: 80,
        marginBottom: spacing.lg,
    },
    completionMessage: {
        ...typography.h2,
        color: 'white',
        fontWeight: '700',
        marginBottom: spacing.sm,
        textAlign: 'center',
    },
    completionSubtext: {
        ...typography.body1,
        color: 'rgba(255, 255, 255, 0.8)',
        textAlign: 'center',
    },
});
