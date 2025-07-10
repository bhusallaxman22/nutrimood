import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { ThemedText } from '../../../components/ThemedText';
import { colors, typography, spacing, fontFamilies } from '../../theme/materialDesign';

const TypographyDemo: React.FC = () => {
    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <ThemedText type="hero" style={styles.mainTitle}>
                Typography Revolution
            </ThemedText>
            
            <Text style={styles.subtitle}>
                From system fonts to modern Inter & Poppins
            </Text>

            {/* Font Family Demo */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Font Families</Text>
                
                <View style={styles.fontDemo}>
                    <Text style={styles.fontLabel}>Inter Regular</Text>
                    <Text style={styles.interRegular}>
                        The quick brown fox jumps over the lazy dog. 
                        Inter provides excellent readability and modern aesthetics.
                    </Text>
                </View>

                <View style={styles.fontDemo}>
                    <Text style={styles.fontLabel}>Inter Bold</Text>
                    <Text style={styles.interBold}>
                        Bold headings that command attention and create clear hierarchy.
                    </Text>
                </View>

                <View style={styles.fontDemo}>
                    <Text style={styles.fontLabel}>Poppins Regular</Text>
                    <Text style={styles.poppinsRegular}>
                        Poppins adds geometric elegance and friendly personality to the interface.
                    </Text>
                </View>

                <View style={styles.fontDemo}>
                    <Text style={styles.fontLabel}>Poppins Bold</Text>
                    <Text style={styles.poppinsBold}>
                        Perfect for standout captions and accent text elements.
                    </Text>
                </View>
            </View>

            {/* Typography Scale */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Typography Scale</Text>
                
                <ThemedText type="hero" style={styles.scaleDemo}>
                    Hero Text - 42px Inter Black
                </ThemedText>
                
                <Text style={styles.h1Demo}>
                    H1 Heading - 42px Inter Black
                </Text>
                
                <Text style={styles.h2Demo}>
                    H2 Heading - 32px Inter Bold
                </Text>
                
                <Text style={styles.h3Demo}>
                    H3 Heading - 24px Inter Bold
                </Text>
                
                <Text style={styles.h4Demo}>
                    H4 Heading - 20px Inter Bold
                </Text>
                
                <Text style={styles.bodyDemo}>
                    Body Text - 16px Inter Regular. This demonstrates the readable body text that maintains excellent legibility across all screen sizes while providing a modern, clean appearance.
                </Text>
                
                <Text style={styles.captionDemo}>
                    CAPTION TEXT - 12PX POPPINS BOLD
                </Text>
            </View>

            {/* Text Variants */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Maximalist Text Variants</Text>
                
                <ThemedText type="vibrant" style={styles.variantDemo}>
                    Vibrant Text - Bold and Colorful
                </ThemedText>
                
                <ThemedText type="neon" style={styles.variantDemo}>
                    Neon Text - Glowing Effects
                </ThemedText>
                
                <Text style={styles.shadowDemo}>
                    Text with Shadow Effects
                </Text>
                
                <Text style={styles.gradientStyleText}>
                    Enhanced Contrast & Visual Impact
                </Text>
            </View>

            {/* Readability Comparison */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Readability Enhancement</Text>
                
                <View style={styles.readabilityBox}>
                    <Text style={styles.readabilityLabel}>Before: System Font</Text>
                    <Text style={styles.systemFont}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </Text>
                </View>
                
                <View style={styles.readabilityBox}>
                    <Text style={styles.readabilityLabel}>After: Inter Font</Text>
                    <Text style={styles.modernFont}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </Text>
                </View>
            </View>
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
    mainTitle: {
        textAlign: 'center',
        marginBottom: spacing.sm,
    },
    subtitle: {
        ...typography.h4,
        color: colors.material.accent,
        textAlign: 'center',
        marginBottom: spacing.xl,
        fontFamily: fontFamilies.secondaryBold,
    },
    section: {
        marginBottom: spacing.xl,
        backgroundColor: colors.surface,
        borderRadius: 16,
        padding: spacing.lg,
        borderWidth: 1,
        borderColor: colors.material.accent,
    },
    sectionTitle: {
        ...typography.h3,
        color: colors.primary,
        marginBottom: spacing.lg,
        textAlign: 'center',
        fontFamily: fontFamilies.primaryBold,
    },
    fontDemo: {
        marginBottom: spacing.lg,
    },
    fontLabel: {
        ...typography.caption,
        color: colors.material.vibrant,
        marginBottom: spacing.xs,
        fontFamily: fontFamilies.secondaryBold,
    },
    interRegular: {
        fontSize: 16,
        lineHeight: 24,
        color: colors.onSurface,
        fontFamily: fontFamilies.primary,
    },
    interBold: {
        fontSize: 16,
        lineHeight: 24,
        color: colors.onSurface,
        fontFamily: fontFamilies.primaryBold,
    },
    poppinsRegular: {
        fontSize: 16,
        lineHeight: 24,
        color: colors.onSurface,
        fontFamily: fontFamilies.secondary,
    },
    poppinsBold: {
        fontSize: 16,
        lineHeight: 24,
        color: colors.onSurface,
        fontFamily: fontFamilies.secondaryBold,
    },
    scaleDemo: {
        marginBottom: spacing.md,
        textAlign: 'center',
    },
    h1Demo: {
        ...typography.h1,
        color: colors.onSurface,
        marginBottom: spacing.sm,
    },
    h2Demo: {
        ...typography.h2,
        color: colors.material.tertiary,
        marginBottom: spacing.sm,
    },
    h3Demo: {
        ...typography.h3,
        color: colors.material.vibrant,
        marginBottom: spacing.sm,
    },
    h4Demo: {
        ...typography.h4,
        color: colors.material.electric,
        marginBottom: spacing.sm,
    },
    bodyDemo: {
        ...typography.body1,
        color: colors.onSurface,
        marginBottom: spacing.sm,
        lineHeight: 24,
    },
    captionDemo: {
        ...typography.caption,
        color: colors.material.accent,
        marginBottom: spacing.sm,
    },
    variantDemo: {
        marginBottom: spacing.md,
        textAlign: 'center',
    },
    shadowDemo: {
        ...typography.h4,
        color: colors.primary,
        textAlign: 'center',
        marginBottom: spacing.md,
        textShadowColor: 'rgba(255, 107, 53, 0.3)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
        fontFamily: fontFamilies.primaryBold,
    },
    gradientStyleText: {
        ...typography.h4,
        color: colors.material.vibrant,
        textAlign: 'center',
        fontFamily: fontFamilies.primaryBold,
        letterSpacing: 1,
    },
    readabilityBox: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        padding: spacing.md,
        borderRadius: 12,
        marginBottom: spacing.md,
        borderWidth: 1,
        borderColor: colors.material.accent,
    },
    readabilityLabel: {
        ...typography.caption,
        color: colors.material.primary,
        marginBottom: spacing.xs,
        fontFamily: fontFamilies.primaryBold,
    },
    systemFont: {
        fontSize: 16,
        lineHeight: 24,
        color: colors.onSurface,
        // Using system font (no fontFamily specified)
    },
    modernFont: {
        fontSize: 16,
        lineHeight: 24,
        color: colors.onSurface,
        fontFamily: fontFamilies.primary,
    },
});

export default TypographyDemo;