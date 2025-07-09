export interface MoodData {
    timestamp: { toDate: () => Date };
    mood: string;
}

export interface DashboardScreenNavigationProp {
    navigate: (screen: string) => void;
}

export interface DashboardState {
    moodData: MoodData[];
    loading: boolean;
    error: string | null;
    userName: string;
    recentMood: string | null;
}

export interface ChartConfig {
    backgroundGradientFrom: string;
    backgroundGradientFromOpacity: number;
    backgroundGradientTo: string;
    backgroundGradientToOpacity: number;
    color: (opacity?: number) => string;
    strokeWidth: number;
    barPercentage: number;
    useShadowColorFromDataset: boolean;
    propsForDots: {
        r: string;
        strokeWidth: string;
        stroke: string;
    };
}

export interface ChartData {
    labels: string[];
    datasets: Array<{
        data: number[];
        color: (opacity?: number) => string;
        strokeWidth: number;
    }>;
    legend: string[];
}
