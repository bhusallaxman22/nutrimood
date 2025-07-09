import { Animated, Easing } from 'react-native';
import * as Haptics from 'expo-haptics';
import type { MoodData, TimeRange, MoodTrend } from './types';

export const moodToValue: { [key: string]: number } = {
    Sad: 1,
    Anxious: 2,
    Calm: 3,
    Happy: 4,
    Energized: 5,
    Stressed: 2,
    Tired: 2,
    Focused: 4,
};

export const moodColors: { [key: string]: string } = {
    Sad: '#6366f1',
    Anxious: '#f59e0b',
    Calm: '#10b981',
    Happy: '#f472b6',
    Energized: '#ef4444',
    Stressed: '#f97316',
    Tired: '#8b5cf6',
    Focused: '#06b6d4',
};

export const moodGradients: { [key: string]: string[] } = {
    Sad: ['#6366f1', '#8b5cf6'],
    Anxious: ['#f59e0b', '#f97316'],
    Calm: ['#10b981', '#34d399'],
    Happy: ['#f472b6', '#fb7185'],
    Energized: ['#ef4444', '#f87171'],
    Stressed: ['#f97316', '#fb923c'],
    Tired: ['#8b5cf6', '#a78bfa'],
    Focused: ['#06b6d4', '#22d3ee'],
};

export const insights = [
    "🌟 Great job tracking your mood! Consistency is key to emotional wellness.",
    "🧠 Did you know your mood affects your food cravings? Happy moods often crave lighter foods!",
    "💡 Try our mindfulness sessions when you're feeling stressed - they really help!",
    "🏃‍♀️ Physical activity can boost your mood score by up to 2 points!",
    "🥗 Eating nutritious meals correlates with better mood stability.",
    "😴 Quality sleep is directly linked to emotional regulation and mood.",
    "🎯 Setting small daily goals can improve your overall mood trends.",
];

export const getMoodEmoji = (mood: string): string => {
    const emojis: { [key: string]: string } = {
        Sad: '😢',
        Anxious: '😰',
        Calm: '😌',
        Happy: '😊',
        Energized: '⚡',
        Stressed: '😤',
        Tired: '😴',
        Focused: '🧠',
    };
    return emojis[mood] || '😐';
};

export const getAverageMood = (recentMoods: MoodData[]): string => {
    if (recentMoods.length === 0) return 'No data';

    const totalValue = recentMoods.reduce((sum, mood) => sum + (moodToValue[mood.mood] || 0), 0);
    const average = totalValue / recentMoods.length;

    if (average >= 4.5) return 'Excellent';
    if (average >= 3.5) return 'Good';
    if (average >= 2.5) return 'Moderate';
    if (average >= 1.5) return 'Low';
    return 'Very Low';
};

export const getMostFrequentMood = (moodStats: { [key: string]: number }): string => {
    if (Object.keys(moodStats).length === 0) return 'No data';

    return Object.entries(moodStats).reduce((a, b) =>
        moodStats[a[0]] > moodStats[b[0]] ? a : b
    )[0];
};

export const getMoodTrend = (moodData: { datasets: { data: number[] }[] } | null): MoodTrend => {
    if (!moodData || moodData.datasets[0].data.length < 2) return 'stable';

    const values = moodData.datasets[0].data;
    const recent = values.slice(-3).reduce((a, b) => a + b, 0) / 3;
    const older = values.slice(0, -3).reduce((a, b) => a + b, 0) / (values.length - 3);

    if (recent > older + 0.5) return 'improving';
    if (recent < older - 0.5) return 'declining';
    return 'stable';
};

export const getTrendEmoji = (trend: MoodTrend): string => {
    return trend === 'improving' ? '📈' : trend === 'declining' ? '📉' : '➡️';
};

export const getMoodScoreColor = (score: number): string => {
    if (score >= 4) return '#10b981';
    if (score >= 3) return '#f59e0b';
    return '#ef4444';
};

export const getStreakDays = (recentMoods: MoodData[]): number => {
    if (recentMoods.length === 0) return 0;

    let streak = 0;
    const today = new Date();
    const sortedMoods = [...recentMoods].sort((a, b) =>
        b.timestamp.toDate().getTime() - a.timestamp.toDate().getTime()
    );

    for (let i = 0; i < sortedMoods.length; i++) {
        const moodDate = sortedMoods[i].timestamp.toDate();
        const daysDiff = Math.floor((today.getTime() - moodDate.getTime()) / (1000 * 60 * 60 * 24));

        if (daysDiff === i) {
            streak++;
        } else {
            break;
        }
    }

    return streak;
};

export const animateStats = (statsAnimations: Animated.Value[]): void => {
    const animations = statsAnimations.map((anim, index) =>
        Animated.sequence([
            Animated.delay(index * 100),
            Animated.timing(anim, {
                toValue: 1,
                duration: 600,
                easing: Easing.out(Easing.back(1.7)),
                useNativeDriver: true,
            }),
        ])
    );
    Animated.parallel(animations).start();
};

export const animateChart = (chartAnimations: Animated.Value[]): void => {
    const animations = chartAnimations.map((anim, index) =>
        Animated.sequence([
            Animated.delay(index * 100),
            Animated.timing(anim, {
                toValue: 1,
                duration: 800,
                easing: Easing.out(Easing.ease),
                useNativeDriver: true,
            }),
        ])
    );
    Animated.parallel(animations).start();
};

export const startFloatingMoodAnimations = (floatingMoods: any[]): void => {
    const animations = floatingMoods.map((anim, index) => {
        const delay = index * 300;
        return Animated.loop(
            Animated.sequence([
                Animated.delay(delay),
                Animated.parallel([
                    Animated.timing(anim.translateY, {
                        toValue: -40,
                        duration: 3000 + Math.random() * 2000,
                        easing: Easing.inOut(Easing.sin),
                        useNativeDriver: true,
                    }),
                    Animated.timing(anim.opacity, {
                        toValue: 0.7,
                        duration: 1000,
                        useNativeDriver: true,
                    }),
                ]),
                Animated.parallel([
                    Animated.timing(anim.translateY, {
                        toValue: 0,
                        duration: 3000 + Math.random() * 2000,
                        easing: Easing.inOut(Easing.sin),
                        useNativeDriver: true,
                    }),
                    Animated.timing(anim.opacity, {
                        toValue: 0,
                        duration: 1000,
                        useNativeDriver: true,
                    }),
                ]),
            ])
        );
    });
    Animated.stagger(200, animations).start();
};

export const handleTimeRangeSwipe = (
    direction: 'previous' | 'next',
    selectedTimeRange: TimeRange,
    setSelectedTimeRange: (range: TimeRange) => void,
    setInteractionCount: (fn: (prev: number) => number) => void
): void => {
    const ranges: TimeRange[] = ['7days', '30days', 'all'];
    const currentIndex = ranges.indexOf(selectedTimeRange);

    let newIndex;
    if (direction === 'next') {
        newIndex = (currentIndex + 1) % ranges.length;
    } else {
        newIndex = currentIndex === 0 ? ranges.length - 1 : currentIndex - 1;
    }

    setSelectedTimeRange(ranges[newIndex]);
    setInteractionCount(prev => prev + 1);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
};

export const handleMoodSelect = (
    mood: string,
    selectedMood: string | null,
    setSelectedMood: (mood: string | null) => void,
    setInteractionCount: (fn: (prev: number) => number) => void,
    scaleAnim: Animated.Value
): void => {
    setSelectedMood(selectedMood === mood ? null : mood);
    setInteractionCount(prev => prev + 1);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    // Animate the selected mood
    Animated.sequence([
        Animated.timing(scaleAnim, {
            toValue: 1.1,
            duration: 150,
            useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 150,
            useNativeDriver: true,
        }),
    ]).start();
};

export const toggleInsights = (
    showInsights: boolean,
    setShowInsights: (show: boolean) => void,
    setInteractionCount: (fn: (prev: number) => number) => void,
    insightAnim: Animated.Value
): void => {
    setShowInsights(!showInsights);
    setInteractionCount(prev => prev + 1);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    Animated.timing(insightAnim, {
        toValue: showInsights ? 0 : 1,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
    }).start();
};

export const nextInsight = (
    currentInsight: number,
    setCurrentInsight: (insight: number) => void,
    setInteractionCount: (fn: (prev: number) => number) => void,
    insightAnim: Animated.Value
): void => {
    setCurrentInsight((currentInsight + 1) % insights.length);
    setInteractionCount(prev => prev + 1);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    // Animate insight change
    Animated.sequence([
        Animated.timing(insightAnim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
        }),
        Animated.timing(insightAnim, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
        }),
    ]).start();
};

export const toggleChartMode = (
    chartMode: 'line' | 'bar',
    setChartMode: (mode: 'line' | 'bar') => void,
    setInteractionCount: (fn: (prev: number) => number) => void,
    chartAnimations: Animated.Value[]
): void => {
    setChartMode(chartMode === 'line' ? 'bar' : 'line');
    setInteractionCount(prev => prev + 1);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    animateChart(chartAnimations);
};

export const handleTimeRangeChange = (
    range: TimeRange,
    setSelectedTimeRange: (range: TimeRange) => void,
    setInteractionCount: (fn: (prev: number) => number) => void,
    scaleAnim: Animated.Value
): void => {
    setSelectedTimeRange(range);
    setInteractionCount(prev => prev + 1);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    // Animate time range change
    Animated.sequence([
        Animated.timing(scaleAnim, {
            toValue: 0.95,
            duration: 100,
            useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true,
        }),
    ]).start();
};
