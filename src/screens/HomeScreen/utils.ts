import { QuickMood } from './types';

export const quickMoods: QuickMood[] = [
    { emoji: '😊', label: 'Happy', color: '#FFE066' },
    { emoji: '😌', label: 'Calm', color: '#A8E6CF' },
    { emoji: '😓', label: 'Stressed', color: '#FFB3BA' },
    { emoji: '😴', label: 'Tired', color: '#B3D9FF' },
    { emoji: '🔥', label: 'Energetic', color: '#FFCCCB' },
    { emoji: '🧠', label: 'Focused', color: '#E6E6FA' },
];

export const getTimeOfDay = (): string => {
    const hour = new Date().getHours();
    if (hour < 12) return 'morning';
    else if (hour < 17) return 'afternoon';
    else return 'evening';
};

export const getGreetingMessage = (timeOfDay: string): string => {
    const greetings = {
        morning: 'Good morning! Ready to nourish your day?',
        afternoon: 'Good afternoon! Time for mindful nutrition.',
        evening: 'Good evening! Let\'s wind down with healthy choices.',
    };
    return greetings[timeOfDay as keyof typeof greetings] || 'Hello! Let\'s focus on your wellness.';
};

export const formatStreakText = (count: number): string => {
    return count === 1 ? '1 day streak!' : `${count} days streak!`;
};
