import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing } from '../../theme/materialDesign';

interface MaterialBackgroundProps {
    children: React.ReactNode;
    gradient?: string[];
    style?: any;
    variant?: 'vibrant' | 'subtle' | 'bold' | 'electric' | 'neutral';
    avoidTabBar?: boolean; // Add bottom padding to avoid tab bar
    pattern?: boolean; // Add geometric patterns
}

const { width, height } = Dimensions.get('window');

const MaterialBackground: React.FC<MaterialBackgroundProps> = ({
    children,
    gradient = colors.gradients.rainbow,
    style,
    variant = 'vibrant',
    avoidTabBar = true,
    pattern = true,
}) => {
    const insets = useSafeAreaInsets();

    const getVariantGradient = () => {
        switch (variant) {
            case 'bold':
                return colors.gradients.fire;
            case 'electric':
                return colors.gradients.electric;
            case 'subtle':
                return colors.gradients.warm;
            case 'neutral':
                return colors.gradients.neutralApp;
            default:
                return gradient;
        }
    };

    // Calculate bottom padding to avoid tab bar (80px height + spacing + safe area)
    const bottomPadding = avoidTabBar ? 80 + spacing.lg * 2 + insets.bottom : 0;

    return (
        <View style={[styles.container, style]}>
            {/* Primary background gradient */}
            <LinearGradient
                colors={getVariantGradient() as any}
                style={styles.gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            />

            {/* Secondary overlay gradient for depth */}
            <LinearGradient
                colors={[
                    'rgba(255, 107, 53, 0.1)',
                    'rgba(108, 92, 231, 0.15)',
                    'rgba(0, 212, 170, 0.1)',
                    'rgba(253, 121, 168, 0.12)'
                ]}
                style={styles.overlayGradient}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 1 }}
            />

            {/* Geometric pattern overlay */}
            {pattern && (
                <View style={styles.patternOverlay}>
                    <View style={styles.circle1} />
                    <View style={styles.circle2} />
                    <View style={styles.triangle} />
                </View>
            )}

            {/* Content with safe area */}
            <SafeAreaView style={styles.safeArea} edges={['top']}>
                <View
                    style={[
                        styles.contentContainer,
                        {
                            paddingBottom: bottomPadding
                        }
                    ]}
                >
                    {children}
                </View>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
    },
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        width: width,
        height: height,
    },
    overlayGradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        width: width,
        height: height,
    },
    patternOverlay: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        overflow: 'hidden',
    },
    circle1: {
        position: 'absolute',
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        top: -50,
        right: -50,
        borderWidth: 3,
        borderColor: 'rgba(255, 107, 53, 0.3)',
    },
    circle2: {
        position: 'absolute',
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: 'rgba(108, 92, 231, 0.06)',
        bottom: 100,
        left: -30,
        borderWidth: 2,
        borderColor: 'rgba(0, 212, 170, 0.4)',
    },
    triangle: {
        position: 'absolute',
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 50,
        borderRightWidth: 50,
        borderBottomWidth: 80,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: 'rgba(253, 121, 168, 0.15)',
        top: height * 0.3,
        right: 60,
        transform: [{ rotate: '45deg' }],
    },
    contentContainer: {
        flex: 1,
    },
});

// Keep GlassBackground as alias for backward compatibility
export const GlassBackground = MaterialBackground;
export default MaterialBackground;
