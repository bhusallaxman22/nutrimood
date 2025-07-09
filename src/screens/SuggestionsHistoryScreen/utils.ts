import { Alert, Animated, Easing } from 'react-native';
import * as Haptics from 'expo-haptics';
import { nutritionSuggestionsService, SavedSuggestion } from '../../services/database';
import type { FilterType, NavigationProp } from './types';

export const loadSuggestions = async (
    filter: FilterType,
    setSuggestions: (suggestions: SavedSuggestion[]) => void,
    setLoading: (loading: boolean) => void
): Promise<void> => {
    try {
        setLoading(true);
        let data: SavedSuggestion[];

        if (filter === 'bookmarked') {
            data = await nutritionSuggestionsService.getBookmarkedSuggestions();
        } else {
            data = await nutritionSuggestionsService.getUserSuggestions(50);
        }

        setSuggestions(data);
    } catch (error) {
        console.error('Error loading suggestions:', error);
        Alert.alert('Error', 'Failed to load your suggestions');
    } finally {
        setLoading(false);
    }
};

export const handleRefresh = async (
    filter: FilterType,
    setSuggestions: (suggestions: SavedSuggestion[]) => void,
    setLoading: (loading: boolean) => void,
    setRefreshing: (refreshing: boolean) => void
): Promise<void> => {
    setRefreshing(true);
    await loadSuggestions(filter, setSuggestions, setLoading);
    setRefreshing(false);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
};

export const handleSuggestionPress = (
    suggestion: SavedSuggestion,
    navigation: NavigationProp
): void => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigation.navigate('Suggestion', {
        suggestion: suggestion.suggestion,
        mood: suggestion.mood,
        goal: suggestion.goal
    });
};

export const handleBookmarkToggle = async (
    suggestionId: string,
    currentBookmarkStatus: boolean,
    filter: FilterType,
    setSuggestions: (suggestions: SavedSuggestion[]) => void
): Promise<void> => {
    try {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

        const newBookmarkStatus = !currentBookmarkStatus;
        await nutritionSuggestionsService.updateBookmark(suggestionId, newBookmarkStatus);

        // Get current suggestions to update them
        const currentSuggestions = await (filter === 'bookmarked'
            ? nutritionSuggestionsService.getBookmarkedSuggestions()
            : nutritionSuggestionsService.getUserSuggestions(50)
        );

        setSuggestions(currentSuggestions);
    } catch (error) {
        console.error('Error updating bookmark:', error);
        Alert.alert('Error', 'Failed to update bookmark');
    }
};

export const formatDate = (timestamp: any): string => {
    if (!timestamp) return '';

    try {
        const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    } catch (error) {
        return '';
    }
};

export const startAnimations = (
    fadeAnim: Animated.Value,
    slideAnim: Animated.Value
): void => {
    Animated.parallel([
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 600,
            useNativeDriver: true,
        }),
    ]).start();
};
