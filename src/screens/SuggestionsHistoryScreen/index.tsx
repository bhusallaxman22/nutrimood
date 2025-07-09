import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    ActivityIndicator,
    Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import GlassBackground from '../../components/templates/GlassBackground';
import GlassCard from '../../components/molecules/GlassCard';
import { colors } from '../../theme/materialDesign';
import { styles } from './styles';
import { FilterButton, EmptyState } from './components';
import {
    loadSuggestions,
    handleRefresh,
    handleSuggestionPress,
    handleBookmarkToggle,
    formatDate,
    startAnimations,
} from './utils';
import type { SuggestionsHistoryState, NavigationProp, FilterType } from './types';

const SuggestionsHistoryScreen: React.FC = () => {
    const navigation = useNavigation<NavigationProp>();

    const [state, setState] = useState<SuggestionsHistoryState>({
        suggestions: [],
        loading: true,
        filter: 'all',
        refreshing: false,
    });

    // Animation values
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(50)).current;

    useEffect(() => {
        loadSuggestions(
            state.filter,
            (suggestions) => setState(prev => ({ ...prev, suggestions })),
            (loading) => setState(prev => ({ ...prev, loading }))
        );

        startAnimations(fadeAnim, slideAnim);
    }, []);

    useEffect(() => {
        loadSuggestions(
            state.filter,
            (suggestions) => setState(prev => ({ ...prev, suggestions })),
            (loading) => setState(prev => ({ ...prev, loading }))
        );
    }, [state.filter]);

    const onRefresh = async () => {
        await handleRefresh(
            state.filter,
            (suggestions) => setState(prev => ({ ...prev, suggestions })),
            (loading) => setState(prev => ({ ...prev, loading })),
            (refreshing) => setState(prev => ({ ...prev, refreshing }))
        );
    };

    const onSuggestionPress = (suggestion: any) => {
        handleSuggestionPress(suggestion, navigation);
    };

    const onBookmarkToggle = async (suggestionId: string, currentBookmarkStatus: boolean) => {
        await handleBookmarkToggle(
            suggestionId,
            currentBookmarkStatus,
            state.filter,
            (suggestions) => setState(prev => ({ ...prev, suggestions }))
        );
    };

    const onFilterChange = (filter: FilterType) => {
        setState(prev => ({ ...prev, filter }));
    };

    if (state.loading && !state.refreshing) {
        return (
            <GlassBackground gradient={colors.gradients.ocean}>
                <SafeAreaView style={styles.container}>
                    <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color={colors.primary} />
                        <Text style={styles.loadingText}>Loading your suggestions...</Text>
                    </View>
                </SafeAreaView>
            </GlassBackground>
        );
    }

    return (
        <GlassBackground gradient={colors.gradients.ocean}>
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

                <Animated.View
                    style={[
                        styles.content,
                        {
                            opacity: fadeAnim,
                            transform: [{ translateY: slideAnim }]
                        }
                    ]}
                >
                    {/* Header */}
                    <View style={styles.header}>
                        <TouchableOpacity
                            style={styles.backButton}
                            onPress={() => navigation.goBack()}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.backButtonText}>← Back</Text>
                        </TouchableOpacity>
                        <Text style={styles.title}>Suggestions History</Text>
                        <View style={styles.headerSpacer} />
                    </View>

                    {/* Filter Buttons */}
                    <View style={styles.filterContainer}>
                        <FilterButton
                            type="all"
                            label="All"
                            count={state.suggestions.length}
                            currentFilter={state.filter}
                            onPress={onFilterChange}
                        />
                        <FilterButton
                            type="bookmarked"
                            label="Bookmarked"
                            count={state.suggestions.filter(s => s.isBookmarked).length}
                            currentFilter={state.filter}
                            onPress={onFilterChange}
                        />
                    </View>

                    {/* Suggestions List */}
                    <ScrollView
                        style={styles.scrollView}
                        showsVerticalScrollIndicator={false}
                    >
                        {state.suggestions.length === 0 ? (
                            <EmptyState filter={state.filter} navigation={navigation} />
                        ) : (
                            <View style={styles.suggestionsGrid}>
                                {state.suggestions.map((suggestion, index) => (
                                    <GlassCard
                                        key={suggestion.id || index}
                                        style={styles.suggestionCard}
                                        variant="elevated"
                                    >
                                        <TouchableOpacity
                                            onPress={() => onSuggestionPress(suggestion)}
                                            activeOpacity={0.7}
                                            style={styles.suggestionContent}
                                        >
                                            {/* Header with emoji and bookmark */}
                                            <View style={styles.suggestionHeader}>
                                                <View style={styles.suggestionHeaderLeft}>
                                                    <Text style={styles.suggestionEmoji}>
                                                        {suggestion.suggestion.emoji}
                                                    </Text>
                                                    <View>
                                                        <Text style={styles.suggestionMood}>
                                                            {suggestion.mood}
                                                        </Text>
                                                        <Text style={styles.suggestionDate}>
                                                            {formatDate(suggestion.timestamp)}
                                                        </Text>
                                                    </View>
                                                </View>
                                                <TouchableOpacity
                                                    style={styles.bookmarkButton}
                                                    onPress={() => onBookmarkToggle(
                                                        suggestion.id!,
                                                        suggestion.isBookmarked
                                                    )}
                                                    activeOpacity={0.7}
                                                >
                                                    <Text style={styles.bookmarkIcon}>
                                                        {suggestion.isBookmarked ? '⭐' : '☆'}
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>

                                            {/* Suggestion Content */}
                                            <Text style={styles.suggestionTitle} numberOfLines={2}>
                                                {suggestion.suggestion.meal.name}
                                            </Text>
                                            <Text style={styles.suggestionDescription} numberOfLines={3}>
                                                {suggestion.suggestion.meal.description}
                                            </Text>

                                            {/* Footer */}
                                            <View style={styles.suggestionFooter}>
                                                <Text style={styles.suggestionPrepTime}>
                                                    ⏱️ {suggestion.suggestion.meal.prepTime}
                                                </Text>
                                                <Text style={styles.suggestionCalories}>
                                                    🔥 {suggestion.suggestion.nutrition.calories}
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    </GlassCard>
                                ))}
                            </View>
                        )}

                        <View style={styles.bottomPadding} />
                    </ScrollView>
                </Animated.View>
            </SafeAreaView>
        </GlassBackground>
    );
};

export default SuggestionsHistoryScreen;
