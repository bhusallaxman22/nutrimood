import { StyleSheet } from 'react-native';
import { colors, typography, spacing } from '../../../theme/materialDesign';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export const markdownStyles = StyleSheet.create({
    // Headers
    heading1: {
        ...typography.h2,
        color: colors.onSurface,
        marginBottom: spacing.md,
        fontWeight: '700',
        textAlign: 'center',
    },
    heading2: {
        ...typography.h3,
        color: colors.onSurface,
        marginBottom: spacing.sm,
        marginTop: spacing.lg,
        fontWeight: '600',
    },
    heading3: {
        ...typography.h4,
        color: colors.onSurface,
        marginBottom: spacing.sm,
        marginTop: spacing.md,
        fontWeight: '600',
    },
    // Body text
    body: {
        ...typography.body1,
        color: colors.onSurface,
        lineHeight: 22,
    },
    paragraph: {
        ...typography.body1,
        color: colors.onSurface,
        marginBottom: spacing.md,
        lineHeight: 22,
    },
    // Lists
    bullet_list: {
        marginBottom: spacing.md,
    },
    ordered_list: {
        marginBottom: spacing.md,
    },
    list_item: {
        flexDirection: 'row',
        marginBottom: spacing.xs,
        paddingLeft: spacing.md,
    },
    bullet_list_content: {
        ...typography.body1,
        color: colors.onSurface,
        flex: 1,
        lineHeight: 20,
    },
    ordered_list_content: {
        ...typography.body1,
        color: colors.onSurface,
        flex: 1,
        lineHeight: 20,
    },
    // Emphasis
    strong: {
        fontWeight: '700',
        color: colors.primary,
    },
    em: {
        fontStyle: 'italic',
        color: colors.primary,
    },
    // Code
    code_inline: {
        backgroundColor: colors.surfaceVariant,
        color: colors.onSurfaceVariant,
        paddingHorizontal: spacing.xs,
        paddingVertical: 2,
        borderRadius: 4,
        fontFamily: 'monospace',
    },
    code_block: {
        backgroundColor: colors.surfaceVariant,
        color: colors.onSurfaceVariant,
        padding: spacing.md,
        borderRadius: 8,
        marginVertical: spacing.sm,
        fontFamily: 'monospace',
    },
    // Links
    link: {
        color: colors.primary,
        textDecorationLine: 'underline',
    },
});
