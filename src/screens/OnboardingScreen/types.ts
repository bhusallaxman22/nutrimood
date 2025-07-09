import { Animated } from 'react-native';

export interface OnboardingStep {
    emoji: string;
    title: string;
    description: string;
    color: string[];
}

export interface OnboardingScreenProps {
    onComplete?: () => void;
}

export interface OnboardingState {
    currentStep: number;
    fadeAnim: Animated.Value;
    slideAnim: Animated.Value;
}

export interface OnboardingScreenNavigationProp {
    navigate: (screen: string) => void;
}
