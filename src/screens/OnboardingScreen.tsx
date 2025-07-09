import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    Animated,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';
import GlassBackground from '../components/templates/GlassBackground';
import GlassCard from '../components/molecules/GlassCard';
import Button from '../components/atoms/Button';
import { colors, typography, spacing, dimensions } from '../theme/materialDesign';

const { width, height } = Dimensions.get('window');

type OnboardingScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Onboarding'>;

const onboardingSteps = [
    {
        emoji: '🎯',
        title: 'Mood-Based Nutrition',
        description: 'Tell us how you\'re feeling and get instant, personalized nutrition suggestions powered by AI.',
        color: colors.gradients.primary,
    },
    {
        emoji: '📊',
        title: 'Track Your Progress',
        description: 'See your mood patterns and wellness journey over time with beautiful insights.',
        color: colors.gradients.ocean,
    },
    {
        emoji: '👥',
        title: 'Join the Community',
        description: 'Share your wellness journey and connect with others on similar paths.',
        color: colors.gradients.sunset,
    },
];

interface OnboardingScreenProps {
    onComplete?: () => void;
}

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
    const navigation = useNavigation<OnboardingScreenNavigationProp>();
    const [currentStep, setCurrentStep] = useState(0);
    const [fadeAnim] = useState(new Animated.Value(0));
    const [slideAnim] = useState(new Animated.Value(50));

    useEffect(() => {
        animateIn();
    }, [currentStep]);

    const animateIn = () => {
        fadeAnim.setValue(0);
        slideAnim.setValue(50);

        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 600,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const handleNext = () => {
        if (currentStep < onboardingSteps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            completeOnboarding();
        }
    };

    const handleSkip = () => {
        completeOnboarding();
    };

    const completeOnboarding = async () => {
        try {
            await AsyncStorage.setItem('hasSeenOnboarding', 'true');
            // Call the parent callback to update state
            onComplete?.();
        } catch (error) {
            console.error('Error saving onboarding state:', error);
            onComplete?.();
        }
    };

    const currentData = onboardingSteps[currentStep];

    return (
        <GlassBackground gradient={currentData.color} variant="vibrant">
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
                <View style={styles.content}>
                    {/* Skip Button */}
                    <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
                        <Text style={styles.skipText}>Skip</Text>
                    </TouchableOpacity>

                    {/* Main Content */}
                    <Animated.View
                        style={[
                            styles.mainContent,
                            {
                                opacity: fadeAnim,
                                transform: [{ translateY: slideAnim }],
                            },
                        ]}
                    >
                        <GlassCard style={styles.card} variant="elevated">
                            <Text style={styles.emoji}>{currentData.emoji}</Text>
                            <Text style={styles.title}>{currentData.title}</Text>
                            <Text style={styles.description}>{currentData.description}</Text>
                        </GlassCard>
                    </Animated.View>

                    {/* Progress Indicators */}
                    <View style={styles.progressContainer}>
                        {onboardingSteps.map((_, index) => (
                            <View
                                key={index}
                                style={[
                                    styles.progressDot,
                                    index === currentStep && styles.progressDotActive,
                                ]}
                            />
                        ))}
                    </View>

                    {/* Navigation Buttons */}
                    <View style={styles.buttonContainer}>
                        <Button
                            title={currentStep === onboardingSteps.length - 1 ? "Get Started" : "Next"}
                            onPress={handleNext}
                            style={styles.nextButton}
                            fullWidth
                        />
                    </View>
                </View>
            </SafeAreaView>
        </GlassBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        paddingHorizontal: spacing.lg,
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
        padding: spacing.xxxl,
        alignItems: 'center',
        width: '100%',
        maxWidth: 350,
    },
    emoji: {
        fontSize: 80,
        marginBottom: spacing.xl,
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

export default OnboardingScreen;
