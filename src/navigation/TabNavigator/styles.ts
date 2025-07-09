import { StyleSheet, Platform } from 'react-native';
import { colors, typography, spacing, shadows } from '../../theme/materialDesign';

export const styles = StyleSheet.create({
    tabBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: Platform.OS === 'ios' ? 90 : 80,
        backgroundColor: 'transparent',
        borderTopWidth: 0,
        elevation: 0,
        shadowOpacity: 0,
        paddingTop: spacing.sm,
        paddingHorizontal: spacing.md,
        paddingBottom: Platform.OS === 'ios' ? spacing.lg : spacing.md,
    },
    tabBarBackground: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.98)',
        borderTopWidth: 1,
        borderTopColor: 'rgba(0, 0, 0, 0.06)',
        backdropFilter: 'blur(20px)',
        ...shadows.medium,
    },
    tabIconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: spacing.xs,
        flex: 1,
        minHeight: 60,
    },
    tabIconFocused: {
        // No background change for the container
    },
    iconBackground: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: spacing.xs,
        backgroundColor: 'transparent',
    },
    iconBackgroundFocused: {
        backgroundColor: colors.primary,
        transform: [{ scale: 1.05 }],
        ...shadows.small,
    },
    tabEmoji: {
        fontSize: 20,
        opacity: 0.6,
    },
    tabEmojiFocused: {
        fontSize: 22,
        opacity: 1,
    },
    tabLabel: {
        ...typography.caption,
        color: colors.onSurfaceVariant,
        fontWeight: '500',
        fontSize: 10,
        textAlign: 'center',
        opacity: 0.7,
        marginTop: 1,
    },
    tabLabelFocused: {
        color: colors.primary,
        fontWeight: '700',
        opacity: 1,
    },
});
