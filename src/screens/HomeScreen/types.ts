import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/types';
import { NutritionSuggestion } from '../../services/openai';

export type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Suggestion'>;

export interface SavedSuggestion {
    id?: string;
    mood: string;
    goal: string;
    suggestion: NutritionSuggestion;
    timestamp: any;
    isBookmarked: boolean;
}

export interface QuickMood {
    emoji: string;
    label: string;
    color: string;
}
