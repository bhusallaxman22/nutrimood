export interface MoodData {
    timestamp: { toDate: () => Date };
    mood: string;
    goal: string;
}

export interface ChartData {
    labels: string[];
    datasets: { data: number[] }[];
}

export interface MoodStats {
    [key: string]: number;
}

export type TimeRange = '7days' | '30days' | 'all';
export type ChartMode = 'line' | 'bar';
export type MoodTrend = 'improving' | 'declining' | 'stable';

export interface EnhancedChartProps {
    data: ChartData | null;
    mode: ChartMode;
    animations: any[];
}

export interface SimpleChartProps {
    data: ChartData | null;
}

export interface FloatingMoodAnimation {
    translateY: any;
    opacity: any;
    scale: any;
}

export interface MoodTrendsState {
    moodData: ChartData | null;
    recentMoods: MoodData[];
    moodStats: MoodStats;
    loading: boolean;
    selectedTimeRange: TimeRange;
    selectedMood: string | null;
    showInsights: boolean;
    interactionCount: number;
    currentInsight: number;
    chartMode: ChartMode;
}
