import { Animated, Easing, PanResponder, Dimensions } from 'react-native';
import * as Haptics from 'expo-haptics';
import { MindfulnessSession, ParticlePosition } from './types';

const { width } = Dimensions.get('window');

export const sessions: MindfulnessSession[] = [
    {
        id: 'calm',
        title: 'Calm & Center',
        duration: 180, // 3 minutes
        description: 'Find your inner peace with gentle breathing',
        emoji: '🧘‍♀️',
        breathingPattern: { inhale: 4, hold: 4, exhale: 6 },
        affirmations: [
            'I am calm and centered',
            'Peace flows through me',
            'I release all tension',
            'I am in control of my thoughts',
            'Every breath brings me peace'
        ]
    },
    {
        id: 'energy',
        title: 'Energize & Focus',
        duration: 120, // 2 minutes
        description: 'Boost your energy with revitalizing breaths',
        emoji: '⚡',
        breathingPattern: { inhale: 3, hold: 2, exhale: 3 },
        affirmations: [
            'I am energized and alert',
            'My mind is clear and focused',
            'I have unlimited energy',
            'I am ready to take on challenges',
            'Energy flows through every cell'
        ]
    },
    {
        id: 'sleep',
        title: 'Rest & Restore',
        duration: 300, // 5 minutes
        description: 'Prepare for deep, restorative sleep',
        emoji: '🌙',
        breathingPattern: { inhale: 4, hold: 2, exhale: 8 },
        affirmations: [
            'I am ready for peaceful sleep',
            'My body is completely relaxed',
            'I release the day with gratitude',
            'Sleep comes easily to me',
            'I wake up refreshed and renewed'
        ]
    },
    {
        id: 'stress',
        title: 'Stress Relief',
        duration: 240, // 4 minutes
        description: 'Melt away stress and tension',
        emoji: '🌊',
        breathingPattern: { inhale: 4, hold: 4, exhale: 8 },
        affirmations: [
            'I release all stress from my body',
            'I choose peace over worry',
            'I am safe and protected',
            'This too shall pass',
            'I respond to challenges with calm'
        ]
    }
];

export const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const getPhaseInstruction = (currentPhase: 'inhale' | 'hold' | 'exhale', selectedSession: MindfulnessSession | null): string => {
    if (!selectedSession) return '';
    const pattern = selectedSession.breathingPattern;

    switch (currentPhase) {
        case 'inhale':
            return `Breathe in slowly (${pattern.inhale}s)`;
        case 'hold':
            return `Hold your breath (${pattern.hold}s)`;
        case 'exhale':
            return `Breathe out slowly (${pattern.exhale}s)`;
        default:
            return '';
    }
};

export const createAnimationInterpolations = (
    rotationAnim: Animated.Value,
    breathingAnim: Animated.Value,
    affirmationAnim: Animated.Value,
    completionAnim: Animated.Value
) => {
    const rotateInterpolate = rotationAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    });

    const breathingScale = breathingAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0.8, 1.4]
    });

    const breathingOpacity = breathingAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0.4, 0.8]
    });

    const affirmationOpacity = affirmationAnim.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0, 1, 1],
    });

    const affirmationTranslateY = affirmationAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [20, 0],
    });

    const completionScale = completionAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
    });

    const completionOpacity = completionAnim.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0, 1, 1],
    });

    return {
        rotateInterpolate,
        breathingScale,
        breathingOpacity,
        affirmationOpacity,
        affirmationTranslateY,
        completionScale,
        completionOpacity
    };
};

export const createParticlePositions = (particleAnims: Animated.Value[]): ParticlePosition[] => {
    return particleAnims.map((anim, index) => {
        const angle = (index / particleAnims.length) * 2 * Math.PI;
        const radius = 150 + Math.sin(index) * 50;

        const translateX = anim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, Math.cos(angle) * radius],
        });

        const translateY = anim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, Math.sin(angle) * radius],
        });

        const opacity = anim.interpolate({
            inputRange: [0, 0.3, 0.7, 1],
            outputRange: [0, 1, 1, 0],
        });

        return { translateX, translateY, opacity };
    });
};

export const createPanResponder = (tipsPanAnim: Animated.ValueXY) => {
    return PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        },
        onPanResponderMove: Animated.event(
            [null, { dx: tipsPanAnim.x, dy: tipsPanAnim.y }],
            { useNativeDriver: false }
        ),
        onPanResponderRelease: () => {
            Animated.spring(tipsPanAnim, {
                toValue: { x: 0, y: 0 },
                useNativeDriver: false,
            }).start();
        },
    });
};

export const startRotationAnimation = (rotationAnim: Animated.Value) => {
    rotationAnim.setValue(0);
    Animated.loop(
        Animated.timing(rotationAnim, {
            toValue: 1,
            duration: 20000,
            easing: Easing.linear,
            useNativeDriver: true,
        }),
        { iterations: -1 }
    ).start();
};

export const startParticleAnimations = (particleAnims: Animated.Value[]) => {
    particleAnims.forEach((anim, index) => {
        const delay = index * 200;
        setTimeout(() => {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(anim, {
                        toValue: 1,
                        duration: 3000 + Math.random() * 2000,
                        easing: Easing.inOut(Easing.ease),
                        useNativeDriver: true,
                    }),
                    Animated.timing(anim, {
                        toValue: 0,
                        duration: 2000 + Math.random() * 1000,
                        easing: Easing.inOut(Easing.ease),
                        useNativeDriver: true,
                    }),
                ])
            ).start();
        }, delay);
    });
};

export const startPulseAnimation = (pulseAnim: Animated.Value) => {
    Animated.loop(
        Animated.sequence([
            Animated.timing(pulseAnim, {
                toValue: 1.1,
                duration: 2000,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: true,
            }),
            Animated.timing(pulseAnim, {
                toValue: 1,
                duration: 2000,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: true,
            }),
        ])
    ).start();
};

export const createCompletionAnimation = (completionAnim: Animated.Value) => {
    return Animated.sequence([
        Animated.timing(completionAnim, {
            toValue: 1,
            duration: 800,
            easing: Easing.elastic(1.2),
            useNativeDriver: true,
        }),
        Animated.delay(2000),
        Animated.timing(completionAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
        }),
    ]);
};

export const createCardScaleAnimation = (cardScaleAnim: Animated.Value, isFavorite: boolean) => {
    return Animated.sequence([
        Animated.timing(cardScaleAnim, {
            toValue: isFavorite ? 1.1 : 0.95,
            duration: isFavorite ? 150 : 100,
            useNativeDriver: true,
        }),
        Animated.timing(cardScaleAnim, {
            toValue: 1,
            duration: isFavorite ? 150 : 100,
            useNativeDriver: true,
        }),
    ]);
};

export const createBreathingAnimation = (breathingAnim: Animated.Value, session: MindfulnessSession) => {
    const { inhale, hold, exhale } = session.breathingPattern;

    return Animated.loop(
        Animated.sequence([
            Animated.timing(breathingAnim, {
                toValue: 1,
                duration: inhale * 1000,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: true,
            }),
            Animated.timing(breathingAnim, {
                toValue: 1, // Hold phase
                duration: hold * 1000,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: true,
            }),
            Animated.timing(breathingAnim, {
                toValue: 0,
                duration: exhale * 1000,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: true,
            }),
        ])
    );
};

export const createAffirmationChangeAnimation = (affirmationAnim: Animated.Value) => {
    return Animated.timing(affirmationAnim, {
        toValue: 0,
        duration: 500,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
    });
};

export const createAffirmationShowAnimation = (affirmationAnim: Animated.Value) => {
    return Animated.timing(affirmationAnim, {
        toValue: 1,
        duration: 500,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
    });
};
