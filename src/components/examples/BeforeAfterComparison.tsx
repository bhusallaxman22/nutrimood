import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedText } from '../../../components/ThemedText';
import Button from '../atoms/Button';
import { colors, typography, spacing, shadows, fontFamilies } from '../../theme/materialDesign';

const BeforeAfterComparison: React.FC = () => {
    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <Text style={styles.mainTitle}>🎨 Design System Evolution</Text>

            {/* Typography Comparison */}
            <View style={styles.comparisonSection}>
                <Text style={styles.sectionTitle}>Typography Transformation</Text>
                
                <View style={styles.comparisonRow}>
                    <View style={styles.beforeCard}>
                        <Text style={styles.cardLabel}>Before - Basic System</Text>
                        <Text style={styles.oldTitle}>App Title</Text>
                        <Text style={styles.oldBody}>Basic text with system fonts and minimal styling approach.</Text>
                    </View>
                    
                    <View style={styles.afterCard}>
                        <Text style={styles.cardLabel}>After - Maximalist Design</Text>
                        <ThemedText type="hero" style={styles.modernTitle}>App Title</ThemedText>
                        <Text style={styles.modernBody}>Modern text with Inter font family, enhanced readability and bold personality.</Text>
                    </View>
                </View>
            </View>

            {/* Color Comparison */}
            <View style={styles.comparisonSection}>
                <Text style={styles.sectionTitle}>Color Evolution</Text>
                
                <View style={styles.comparisonRow}>
                    <View style={styles.beforeCard}>
                        <Text style={styles.cardLabel}>Before - Muted Palette</Text>
                        <View style={styles.oldColorRow}>
                            <View style={[styles.colorSample, { backgroundColor: '#0a7ea4' }]} />
                            <View style={[styles.colorSample, { backgroundColor: '#687076' }]} />
                            <View style={[styles.colorSample, { backgroundColor: '#11181C' }]} />
                        </View>
                        <Text style={styles.colorDescription}>Conservative blues and grays</Text>
                    </View>
                    
                    <View style={styles.afterCard}>
                        <Text style={styles.cardLabel}>After - Vibrant Maximalism</Text>
                        <View style={styles.newColorRow}>
                            <View style={[styles.colorSample, { backgroundColor: colors.primary }]} />
                            <View style={[styles.colorSample, { backgroundColor: colors.material.accent }]} />
                            <View style={[styles.colorSample, { backgroundColor: colors.material.vibrant }]} />
                            <View style={[styles.colorSample, { backgroundColor: colors.material.electric }]} />
                        </View>
                        <Text style={styles.colorDescription}>Bold oranges, pinks, and teals</Text>
                    </View>
                </View>
            </View>

            {/* Button Comparison */}
            <View style={styles.comparisonSection}>
                <Text style={styles.sectionTitle}>Interactive Elements</Text>
                
                <View style={styles.comparisonRow}>
                    <View style={styles.beforeCard}>
                        <Text style={styles.cardLabel}>Before - Simple Buttons</Text>
                        <View style={styles.oldButton}>
                            <Text style={styles.oldButtonText}>Get Started</Text>
                        </View>
                        <Text style={styles.featureDescription}>Basic styling, minimal impact</Text>
                    </View>
                    
                    <View style={styles.afterCard}>
                        <Text style={styles.cardLabel}>After - Maximalist Buttons</Text>
                        <Button 
                            title="Get Started" 
                            variant="maximalist" 
                            size="medium" 
                            onPress={() => {}} 
                        />
                        <Text style={styles.featureDescription}>Gradients, shadows, bold typography</Text>
                    </View>
                </View>
            </View>

            {/* Visual Effects Comparison */}
            <View style={styles.comparisonSection}>
                <Text style={styles.sectionTitle}>Visual Impact</Text>
                
                <View style={styles.comparisonRow}>
                    <View style={styles.beforeCard}>
                        <Text style={styles.cardLabel}>Before - Flat Design</Text>
                        <View style={styles.oldCard}>
                            <Text style={styles.oldCardTitle}>Card Title</Text>
                            <Text style={styles.oldCardText}>Minimal shadows and basic borders</Text>
                        </View>
                    </View>
                    
                    <View style={styles.afterCard}>
                        <Text style={styles.cardLabel}>After - Dramatic Effects</Text>
                        <LinearGradient
                            colors={colors.gradients.cosmic}
                            style={styles.modernCard}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                        >
                            <Text style={styles.modernCardTitle}>Card Title</Text>
                            <Text style={styles.modernCardText}>Bold gradients and dramatic shadows</Text>
                        </LinearGradient>
                    </View>
                </View>
            </View>

            {/* Impact Summary */}
            <LinearGradient
                colors={colors.gradients.rainbow}
                style={styles.impactSection}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <Text style={styles.impactTitle}>✨ Transformation Complete</Text>
                <Text style={styles.impactText}>
                    From minimal to maximalist: Enhanced user engagement through bold colors, 
                    modern typography, and dramatic visual effects while maintaining usability.
                </Text>
            </LinearGradient>
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
        ...typography.h1,
        color: colors.primary,
        textAlign: 'center',
        marginBottom: spacing.xl,
        fontFamily: fontFamilies.primaryBlack,
    },
    comparisonSection: {
        marginBottom: spacing.xl,
    },
    sectionTitle: {
        ...typography.h3,
        color: colors.onSurface,
        textAlign: 'center',
        marginBottom: spacing.lg,
        fontFamily: fontFamilies.primaryBold,
    },
    comparisonRow: {
        flexDirection: 'row',
        gap: spacing.md,
    },
    beforeCard: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        borderRadius: 12,
        padding: spacing.md,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    afterCard: {
        flex: 1,
        backgroundColor: colors.surface,
        borderRadius: 16,
        padding: spacing.md,
        borderWidth: 2,
        borderColor: colors.primary,
        ...shadows.medium,
    },
    cardLabel: {
        ...typography.caption,
        color: colors.onSurfaceVariant,
        marginBottom: spacing.sm,
        textAlign: 'center',
        fontFamily: fontFamilies.primaryBold,
    },
    oldTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: spacing.xs,
    },
    modernTitle: {
        marginBottom: spacing.xs,
    },
    oldBody: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    },
    modernBody: {
        ...typography.body1,
        color: colors.onSurface,
        fontFamily: fontFamilies.primary,
    },
    oldColorRow: {
        flexDirection: 'row',
        gap: spacing.xs,
        marginBottom: spacing.sm,
    },
    newColorRow: {
        flexDirection: 'row',
        gap: spacing.xs,
        marginBottom: spacing.sm,
    },
    colorSample: {
        width: 30,
        height: 30,
        borderRadius: 15,
    },
    colorDescription: {
        fontSize: 12,
        color: colors.onSurfaceVariant,
        fontFamily: fontFamilies.primary,
    },
    oldButton: {
        backgroundColor: '#0a7ea4',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: spacing.sm,
    },
    oldButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    featureDescription: {
        fontSize: 12,
        color: colors.onSurfaceVariant,
        textAlign: 'center',
        fontFamily: fontFamilies.primary,
    },
    oldCard: {
        backgroundColor: 'white',
        padding: spacing.md,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        marginBottom: spacing.sm,
    },
    oldCardTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: spacing.xs,
    },
    oldCardText: {
        fontSize: 14,
        color: '#666',
    },
    modernCard: {
        padding: spacing.md,
        borderRadius: 16,
        marginBottom: spacing.sm,
        ...shadows.vibrant,
    },
    modernCardTitle: {
        ...typography.h4,
        color: colors.surface,
        marginBottom: spacing.xs,
        fontFamily: fontFamilies.primaryBold,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
    },
    modernCardText: {
        ...typography.body2,
        color: colors.surface,
        fontFamily: fontFamilies.primary,
        textShadowColor: 'rgba(0, 0, 0, 0.2)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 1,
    },
    impactSection: {
        padding: spacing.xl,
        borderRadius: 20,
        alignItems: 'center',
        marginTop: spacing.lg,
        ...shadows.dramatic,
    },
    impactTitle: {
        ...typography.h2,
        color: colors.surface,
        textAlign: 'center',
        marginBottom: spacing.md,
        fontFamily: fontFamilies.primaryBlack,
        textShadowColor: 'rgba(0, 0, 0, 0.4)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    impactText: {
        ...typography.body1,
        color: colors.surface,
        textAlign: 'center',
        lineHeight: 24,
        fontFamily: fontFamilies.primary,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
    },
});

export default BeforeAfterComparison;