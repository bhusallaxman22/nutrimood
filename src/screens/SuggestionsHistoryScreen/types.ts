import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/types';
import { SavedSuggestion } from '../../services/database';

export type NavigationProp = StackNavigationProp<RootStackParamList>;

export type FilterType = 'all' | 'bookmarked';

export interface SuggestionsHistoryState {
    suggestions: SavedSuggestion[];
    loading: boolean;
    filter: FilterType;
    refreshing: boolean;
}

export interface FilterButtonProps {
    type: FilterType;
    label: string;
    count: number;
    currentFilter: FilterType;
    onPress: (type: FilterType) => void;
}
