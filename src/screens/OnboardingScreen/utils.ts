import { Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from '../../theme/materialDesign';
import { OnboardingStep } from './types';

export const onboardingSteps: OnboardingStep[] = [
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

export const createAnimateInEffect = (
    fadeAnim: Animated.Value,
    slideAnim: Animated.Value
) => {
    fadeAnim.setValue(0);
    slideAnim.setValue(50);

    return Animated.parallel([
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
    ]);
};

export const saveOnboardingComplete = async (): Promise<void> => {
    try {
        await AsyncStorage.setItem('hasSeenOnboarding', 'true');
    } catch (error) {
        console.error('Error saving onboarding state:', error);
        throw error;
    }
};

export const handleNextStep = (
    currentStep: number,
    totalSteps: number,
    setCurrentStep: (step: number) => void,
    completeOnboarding: () => void
): void => {
    if (currentStep < totalSteps - 1) {
        setCurrentStep(currentStep + 1);
    } else {
        completeOnboarding();
    }
};
