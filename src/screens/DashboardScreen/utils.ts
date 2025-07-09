import { MoodData, ChartData, ChartConfig } from './types';

export const moodToValue: { [key: string]: number } = {
    Sad: 1,
    Anxious: 2,
    Calm: 3,
    Happy: 4,
    Energized: 5,
};

export const moodColors: { [key: string]: string } = {
    Sad: '#6366f1',
    Anxious: '#f59e0b',
    Calm: '#10b981',
    Happy: '#f472b6',
    Energized: '#ef4444',
};

export const getGreeting = (): string => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
};

export const generateChartData = (moodData: MoodData[]): ChartData => {
    return {
        labels: moodData.map(d => d.timestamp.toDate().toLocaleDateString()).reverse(),
        datasets: [
            {
                data: moodData.map(d => moodToValue[d.mood] || 0).reverse(),
                color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
                strokeWidth: 2,
            },
        ],
        legend: ['Mood Trend'],
    };
};

export const getChartConfig = (): ChartConfig => ({
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#08130D',
    backgroundGradientToOpacity: 0.0,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
    propsForDots: {
        r: '6',
        strokeWidth: '2',
        stroke: '#ffa726',
    },
});

export const getUserDisplayName = (user: any): string => {
    return user.displayName || user.email?.split('@')[0] || 'User';
};
