import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/types';

export type SuggestionScreenRouteProp = RouteProp<RootStackParamList, 'Suggestion'>;
export type SuggestionScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Suggestion'>;

export interface SuggestionScreenProps {
    route: SuggestionScreenRouteProp;
}

export interface NewSuggestionState {
    feedbackGiven: boolean;
    isBookmarked: boolean;
    showShareOptions: boolean;
}

export type FeedbackType = 'helpful' | 'not_helpful';
