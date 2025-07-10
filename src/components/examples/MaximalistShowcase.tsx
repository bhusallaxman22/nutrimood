import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Button from '../atoms/Button';
import GlassCard from '../molecules/GlassCard';
import { colors, typography, spacing, shadows, fontFamilies } from '../../theme/materialDesign';

const MaximalistShowcase: React.FC = () => {
    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            {/* Hero Section */}
            <View style={styles.heroSection}>
                <LinearGradient
                    colors={colors.gradients.maximalist}
                    style={styles.heroGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                >
                    <Text style={styles.heroTitle}>🌈 Maximalist Design</Text>
                    <Text style={styles.heroSubtitle}>Bold • Vibrant • Engaging</Text>
                </LinearGradient>
            </View>

            {/* Typography Showcase */}
            <GlassCard style={styles.section}>
                <Text style={styles.sectionTitle}>Modern Typography</Text>
                <Text style={styles.h1}>H1 Heading - Ultra Bold</Text>
                <Text style={styles.h2}>H2 Heading - Strong Impact</Text>
                <Text style={styles.h3}>H3 Heading - Clear Hierarchy</Text>
                <Text style={styles.body}>Body text with modern Inter font for excellent readability and clean appearance.</Text>
                <Text style={styles.caption}>CAPTION TEXT - BOLD UPPERCASE</Text>
            </GlassCard>

            {/* Color Palette */}
            <GlassCard style={styles.section}>
                <Text style={styles.sectionTitle}>Vibrant Color Palette</Text>
                <View style={styles.colorGrid}>
                    <View style={[styles.colorBox, { backgroundColor: colors.primary }]}>
                        <Text style={styles.colorLabel}>Primary</Text>
                    </View>
                    <View style={[styles.colorBox, { backgroundColor: colors.material.accent }]}>
                        <Text style={styles.colorLabel}>Accent</Text>
                    </View>
                    <View style={[styles.colorBox, { backgroundColor: colors.material.vibrant }]}>
                        <Text style={styles.colorLabel}>Vibrant</Text>
                    </View>
                    <View style={[styles.colorBox, { backgroundColor: colors.material.electric }]}>
                        <Text style={styles.colorLabel}>Electric</Text>
                    </View>
                </View>
            </GlassCard>

            {/* Button Variants */}
            <GlassCard style={styles.section}>
                <Text style={styles.sectionTitle}>Maximalist Buttons</Text>
                <View style={styles.buttonGrid}>
                    <Button title="Primary" variant="primary" size="medium" onPress={() => {}} />
                    <Button title="Cosmic" variant="cosmic" size="medium" onPress={() => {}} />
                    <Button title="Aurora" variant="aurora" size="medium" onPress={() => {}} />
                    <Button title="Volcano" variant="volcano" size="medium" onPress={() => {}} />
                    <Button title="Maximalist" variant="maximalist" size="large" fullWidth onPress={() => {}} />
                </View>
            </GlassCard>

            {/* Gradient Showcase */}
            <GlassCard style={styles.section}>
                <Text style={styles.sectionTitle}>Gradient Combinations</Text>
                <View style={styles.gradientGrid}>
                    {Object.entries(colors.gradients).slice(0, 6).map(([name, gradient]) => (
                        <View key={name} style={styles.gradientContainer}>
                            <LinearGradient
                                colors={gradient}
                                style={styles.gradientBox}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                            />
                            <Text style={styles.gradientLabel}>{name}</Text>
                        </View>
                    ))}
                </View>
            </GlassCard>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    content: {
        padding: spacing.lg,
    },
    heroSection: {
        marginBottom: spacing.xl,
        borderRadius: 24,
        overflow: 'hidden',
        ...shadows.dramatic,
    },
    heroGradient: {
        padding: spacing.xl,
        alignItems: 'center',
    },
    heroTitle: {
        ...typography.h1,
        color: colors.surface,
        textAlign: 'center',
        marginBottom: spacing.sm,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    heroSubtitle: {
        ...typography.h4,
        color: colors.surface,
        textAlign: 'center',
        fontFamily: fontFamilies.secondaryBold,
        letterSpacing: 2,
        textShadowColor: 'rgba(0, 0, 0, 0.2)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
    },
    section: {
        marginBottom: spacing.lg,
        padding: spacing.lg,
    },
    sectionTitle: {
        ...typography.h3,
        color: colors.primary,
        marginBottom: spacing.md,
        textAlign: 'center',
        fontFamily: fontFamilies.primaryBold,
    },
    h1: {
        ...typography.h1,
        color: colors.onSurface,
        marginBottom: spacing.xs,
    },
    h2: {
        ...typography.h2,
        color: colors.material.tertiary,
        marginBottom: spacing.xs,
    },
    h3: {
        ...typography.h3,
        color: colors.material.vibrant,
        marginBottom: spacing.sm,
    },
    body: {
        ...typography.body1,
        color: colors.onSurface,
        marginBottom: spacing.sm,
        lineHeight: 24,
    },
    caption: {
        ...typography.caption,
        color: colors.material.accent,
        fontFamily: fontFamilies.secondaryBold,
    },
    colorGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: spacing.sm,
    },
    colorBox: {
        width: '48%',
        height: 80,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: spacing.sm,
        ...shadows.medium,
    },
    colorLabel: {
        ...typography.caption,
        color: colors.surface,
        fontFamily: fontFamilies.primaryBold,
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
    },
    buttonGrid: {
        gap: spacing.md,
    },
    gradientGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: spacing.sm,
    },
    gradientContainer: {
        width: '48%',
        alignItems: 'center',
        marginBottom: spacing.md,
    },
    gradientBox: {
        width: '100%',
        height: 60,
        borderRadius: 12,
        marginBottom: spacing.xs,
        ...shadows.small,
    },
    gradientLabel: {
        ...typography.caption,
        color: colors.onSurface,
        fontFamily: fontFamilies.primary,
        textAlign: 'center',
        textTransform: 'capitalize',
    },
});

export default MaximalistShowcase;