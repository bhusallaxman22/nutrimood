import { Animated } from 'react-native';

export interface MindfulnessSession {
    id: string;
    title: string;
    duration: number; // in seconds
    description: string;
    emoji: string;
    breathingPattern: {
        inhale: number;
        hold: number;
        exhale: number;
    };
    affirmations: string[];
}

export interface MindfulnessState {
    selectedSession: MindfulnessSession | null;
    isPlaying: boolean;
    currentPhase: 'inhale' | 'hold' | 'exhale';
    timeRemaining: number;
    currentAffirmation: string;
    favoritesList: string[];
    showTips: boolean;
    sessionCompleted: boolean;
    interactionCount: number;
}

export interface MindfulnessAnimations {
    scaleAnim: Animated.Value;
    opacityAnim: Animated.Value;
    rotationAnim: Animated.Value;
    breathingAnim: Animated.Value;
    affirmationAnim: Animated.Value;
    cardScaleAnims: Animated.Value[];
    particleAnims: Animated.Value[];
    pulseAnim: Animated.Value;
    completionAnim: Animated.Value;
    tipsPanAnim: Animated.ValueXY;
}

export interface MindfulnessRefs {
    sessionTimerRef: React.MutableRefObject<NodeJS.Timeout | null>;
    phaseTimerRef: React.MutableRefObject<NodeJS.Timeout | null>;
    affirmationTimerRef: React.MutableRefObject<NodeJS.Timeout | null>;
    animationLoop: React.MutableRefObject<Animated.CompositeAnimation | null>;
}

export interface ParticlePosition {
    translateX: Animated.AnimatedAddition<number>;
    translateY: Animated.AnimatedAddition<number>;
    opacity: Animated.AnimatedInterpolation<number>;
}
