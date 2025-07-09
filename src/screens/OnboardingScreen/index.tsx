import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StatusBar,
    Animated,
    TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import GlassBackground from '../../components/templates/GlassBackground';
import GlassCard from '../../components/molecules/GlassCard';
import Button from '../../components/atoms/Button';
import { RootStackParamList } from '../../navigation/types';

import { OnboardingScreenProps } from './types';
import {
    onboardingSteps,
    createAnimateInEffect,
    saveOnboardingComplete,
    handleNextStep,
} from './utils';
import { styles } from './styles';

type OnboardingScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Onboarding'>;

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
    const navigation = useNavigation<OnboardingScreenNavigationProp>();
    const [currentStep, setCurrentStep] = useState(0);
    const [fadeAnim] = useState(new Animated.Value(0));
    const [slideAnim] = useState(new Animated.Value(50));

    useEffect(() => {
        animateIn();
    }, [currentStep]);

    const animateIn = () => {
        createAnimateInEffect(fadeAnim, slideAnim).start();
    };

    const handleNext = () => {
        handleNextStep(currentStep, onboardingSteps.length, setCurrentStep, completeOnboarding);
    };

    const handleSkip = () => {
        completeOnboarding();
    };

    const completeOnboarding = async () => {
        try {
            await saveOnboardingComplete();
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

export default OnboardingScreen;
