import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    StyleSheet,
    Alert,
    ActivityIndicator,
    Text,
    StatusBar,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Animated,
    TouchableOpacity,
    Dimensions,
    Easing,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import MoodAndGoalForm from '../components/organisms/MoodAndGoalForm';
import Button from '../components/atoms/Button';
import GlassBackground from '../components/templates/GlassBackground';
import GlassCard from '../components/molecules/GlassCard';
import { moodService, suggestionsService, nutritionSuggestionsService } from '../services/database';
import { auth } from '../services/firebase';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';
import { getNutritionSuggestion, NutritionSuggestion } from '../services/openai';
import { colors, typography, spacing, dimensions } from '../theme/materialDesign';

const { width } = Dimensions.get('window');

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Suggestion'>;

interface SavedSuggestion {
    id?: string;
    mood: string;
    goal: string;
    suggestion: NutritionSuggestion;
    timestamp: any;
    isBookmarked: boolean;
}

const quickMoods = [
    { emoji: '😊', label: 'Happy', color: '#FFE066' },
    { emoji: '😌', label: 'Calm', color: '#A8E6CF' },
    { emoji: '😓', label: 'Stressed', color: '#FFB3BA' },
    { emoji: '😴', label: 'Tired', color: '#B3D9FF' },
    { emoji: '🔥', label: 'Energetic', color: '#FFCCCB' },
    { emoji: '🧠', label: 'Focused', color: '#E6E6FA' },
];

const HomeScreen: React.FC = () => {
    const navigation = useNavigation<HomeScreenNavigationProp>();
    const [loading, setLoading] = useState(false);
    const [streakCount, setStreakCount] = useState(3);
    const [todaysMood, setTodaysMood] = useState<string | null>(null);
    const [showQuickMoods, setShowQuickMoods] = useState(true);
    const [interactionCount, setInteractionCount] = useState(0);
    const [weeklyGoal, setWeeklyGoal] = useState(7);
    const [timeOfDay, setTimeOfDay] = useState('');
    const [recentSuggestions, setRecentSuggestions] = useState<SavedSuggestion[]>([]);

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.8)).current;
    const streakAnim = useRef(new Animated.Value(1)).current;
    const quickMoodAnims = useRef(quickMoods.map(() => new Animated.Value(0))).current;
    const greetingAnim = useRef(new Animated.Value(0)).current;
    const floatingAnims = useRef(Array.from({ length: 15 }, () => ({
        translateY: new Animated.Value(0),
        opacity: new Animated.Value(0),
        scale: new Animated.Value(1),
    }))).current;

    useEffect(() => {
        // Determine time of day for greeting
        const hour = new Date().getHours();
        if (hour < 12) setTimeOfDay('morning');
        else if (hour < 17) setTimeOfDay('afternoon');
        else setTimeOfDay('evening');

        // Animate in the components
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                tension: 50,
                friction: 7,
                useNativeDriver: true,
            }),
        ]).start();

        // Animated greeting
        Animated.sequence([
            Animated.delay(300),
            Animated.timing(greetingAnim, {
                toValue: 1,
                duration: 600,
                easing: Easing.out(Easing.ease),
                useNativeDriver: true,
            }),
        ]).start();

        // Stagger quick mood animations
        const moodAnimations = quickMoodAnims.map((anim, index) =>
            Animated.sequence([
                Animated.delay(500 + index * 100),
                Animated.spring(anim, {
                    toValue: 1,
                    tension: 80,
                    friction: 8,
                    useNativeDriver: true,
                }),
            ])
        );
        Animated.parallel(moodAnimations).start();

        // Start floating elements animation
        startFloatingAnimation();

        // Load user's streak and today's mood
        loadUserData();
    }, []);

    const startFloatingAnimation = () => {
        const animations = floatingAnims.map((anim, index) => {
            const delay = index * 200;
            return Animated.loop(
                Animated.sequence([
                    Animated.delay(delay),
                    Animated.parallel([
                        Animated.timing(anim.translateY, {
                            toValue: -30,
                            duration: 3000 + Math.random() * 2000,
                            easing: Easing.inOut(Easing.sin),
                            useNativeDriver: true,
                        }),
                        Animated.timing(anim.opacity, {
                            toValue: 0.6,
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
        Animated.stagger(100, animations).start();
    };

    const loadUserData = async () => {
        // Load streak and interaction data
        setStreakCount(Math.floor(Math.random() * 21) + 1);
        setWeeklyGoal(7);
        setInteractionCount(Math.floor(Math.random() * 50) + 1);

        // Load recent suggestions
        try {
            const recent = await nutritionSuggestionsService.getRecentSuggestions(3);
            setRecentSuggestions(recent);
        } catch (error) {
            console.error('Error loading recent suggestions:', error);
        }
    };

    const animateStreak = () => {
        Animated.sequence([
            Animated.timing(streakAnim, {
                toValue: 1.2,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(streakAnim, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const getGreeting = () => {
        const greetings = {
            morning: ['Good morning! 🌅', 'Ready to start fresh?'],
            afternoon: ['Good afternoon! ☀️', 'How\'s your day going?'],
            evening: ['Good evening! 🌙', 'Time to wind down?']
        };
        return greetings[timeOfDay as keyof typeof greetings] || greetings.morning;
    };

    const handleStreakPress = () => {
        setInteractionCount(prev => prev + 1);
        animateStreak();
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    };

    const handleSubmit = async (mood: string, goal: string) => {
        setLoading(true);
        setTodaysMood(mood);
        setInteractionCount(prev => prev + 1);

        // Haptic feedback for better interaction
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

        try {
            // Save mood data using database service
            await moodService.addMoodEntry(mood, goal);

            // Update streak when mood is submitted
            setStreakCount(prev => prev + 1);
            animateStreak();

            // Show success message with clear options
            Alert.alert(
                '✅ Mood Tracked!',
                'Your mood has been recorded successfully. What would you like to do next?',
                [
                    { text: 'Just Track', style: 'cancel' },
                    {
                        text: '✨ Get AI Suggestion',
                        style: 'default',
                        onPress: () => handleGetSuggestion(mood, goal)
                    }
                ]
            );
        } catch (error) {
            console.error('Error saving mood data:', error);
            Alert.alert('Error', 'Could not save your mood at this time.');
        }
        setLoading(false);
    };

    const handleGetSuggestion = async (mood: string, goal: string) => {
        setLoading(true);

        try {
            // Get AI suggestion
            const suggestion = await getNutritionSuggestion(mood, goal);

            // Save the suggestion to database
            if (suggestion && auth.currentUser) {
                await nutritionSuggestionsService.saveSuggestion({
                    mood,
                    goal,
                    suggestion,
                    isBookmarked: false
                });

                // Success haptic
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            }

            navigation.navigate('Suggestion', { suggestion, mood, goal });
        } catch (error) {
            console.error('Error getting suggestion:', error);
            Alert.alert(
                '😔 Oops!',
                'Could not get a suggestion right now. Please check your internet connection and try again.',
                [
                    { text: 'OK', style: 'cancel' },
                    { text: 'Try Again', onPress: () => handleGetSuggestion(mood, goal) }
                ]
            );
        }
        setLoading(false);
    };

    const handleQuickMoodSelect = async (mood: string) => {
        setInteractionCount(prev => prev + 1);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        setTodaysMood(mood);
        setShowQuickMoods(false);

        // Immediately show loading and get AI suggestion without asking for goals
        setLoading(true);

        try {
            const suggestion = await getNutritionSuggestion(mood, 'General Wellness');

            // Save to database
            await handleSubmit(mood, 'General Wellness');

            // Navigate directly to suggestion with the AI response
            navigation.navigate('Suggestion', {
                suggestion,
                mood,
                goal: 'General Wellness'
            });
        } catch (error) {
            console.error('Error getting suggestion:', error);
            Alert.alert('Error', 'Failed to get suggestion. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const resetQuickMoods = () => {
        setShowQuickMoods(true);
        setTodaysMood(null);
        setInteractionCount(prev => prev + 1);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    };

    const handleLogout = () => {
        auth.signOut().then(() => {
            navigation.getParent()?.navigate('Login');
        });
    };

    const handleRecentSuggestionPress = (suggestion: SavedSuggestion) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        navigation.navigate('Suggestion', {
            suggestion: suggestion.suggestion,
            mood: suggestion.mood,
            goal: suggestion.goal
        });
    };

    const [greeting, subGreeting] = getGreeting();

    return (
        <GlassBackground gradient={colors.gradients.maximalist} variant="subtle">
            <StatusBar
                barStyle="dark-content"
                backgroundColor="transparent"
                translucent={Platform.OS === 'android'}
            />

            {/* Floating Elements Background */}
            <View style={styles.floatingContainer}>
                {floatingAnims.map((anim, index) => (
                    <Animated.View
                        key={index}
                        style={[
                            styles.floatingElement,
                            {
                                left: `${(index * 7) % 100}%`,
                                opacity: anim.opacity,
                                transform: [
                                    { translateY: anim.translateY },
                                    { scale: anim.scale }
                                ],
                            },
                        ]}
                    >
                        <Text style={styles.floatingEmoji}>
                            {['🍎', '🥗', '🥑', '🍊', '🥕'][index % 5]}
                        </Text>
                    </Animated.View>
                ))}
            </View>

            <SafeAreaView style={styles.safeArea} edges={['top']}>
                <KeyboardAvoidingView
                    style={styles.keyboardAvoid}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
                >
                    <ScrollView
                        style={styles.scrollView}
                        contentContainerStyle={styles.container}
                        keyboardShouldPersistTaps="handled"
                        showsVerticalScrollIndicator={false}
                    >
                        {/* Animated Header with Time-based Greeting */}
                        <Animated.View
                            style={[
                                styles.header,
                                {
                                    opacity: greetingAnim,
                                    transform: [
                                        {
                                            translateY: greetingAnim.interpolate({
                                                inputRange: [0, 1],
                                                outputRange: [-20, 0],
                                            })
                                        }
                                    ]
                                }
                            ]}
                        >
                            <Text style={styles.greetingText}>{greeting}</Text>
                            <Text style={styles.titleText}>{subGreeting}</Text>
                            <Text style={styles.subtitleText}>Let's find the perfect nutrition for your mood and goals</Text>
                        </Animated.View>

                        {/* Welcome Guide for new users */}
                        {!todaysMood && interactionCount === 0 && (
                            <GlassCard style={styles.welcomeCard} variant="elevated">
                                <Text style={styles.welcomeEmoji}>👋</Text>
                                <Text style={styles.welcomeTitle}>Welcome to Your Wellness Journey!</Text>
                                <Text style={styles.welcomeText}>
                                    Get started by selecting how you're feeling below. Our AI will instantly provide personalized nutrition suggestions for you.
                                </Text>
                            </GlassCard>
                        )}

                        {/* Interactive Stats Dashboard */}
                        <View style={styles.statsContainer}>
                            <TouchableOpacity
                                style={styles.statCard}
                                onPress={handleStreakPress}
                                activeOpacity={0.8}
                            >
                                <Animated.View style={[styles.statContent, { transform: [{ scale: streakAnim }] }]}>
                                    <Text style={styles.statEmoji}>🔥</Text>
                                    <Text style={styles.statNumber}>{streakCount}</Text>
                                    <Text style={styles.statLabel}>Day Streak</Text>
                                </Animated.View>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.statCard}
                                onPress={() => {
                                    setInteractionCount(prev => prev + 1);
                                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                                }}
                                activeOpacity={0.8}
                            >
                                <View style={styles.statContent}>
                                    <Text style={styles.statEmoji}>📊</Text>
                                    <Text style={styles.statNumber}>{Math.round((streakCount / weeklyGoal) * 100)}%</Text>
                                    <Text style={styles.statLabel}>Weekly Goal</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.statCard}
                                onPress={() => {
                                    setInteractionCount(prev => prev + 1);
                                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                                }}
                                activeOpacity={0.8}
                            >
                                <View style={styles.statContent}>
                                    <Text style={styles.statEmoji}>✨</Text>
                                    <Text style={styles.statNumber}>{interactionCount}</Text>
                                    <Text style={styles.statLabel}>Interactions</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        {/* Quick Mood Selector */}
                        {showQuickMoods && !todaysMood && (
                            <GlassCard style={styles.quickMoodCard} variant="elevated">
                                <Text style={styles.quickMoodTitle}>🎯 How are you feeling?</Text>
                                <Text style={styles.quickMoodSubtitle}>Get instant AI-powered nutrition suggestions</Text>
                                <View style={styles.quickMoodGrid}>
                                    {quickMoods.map((mood, index) => (
                                        <Animated.View
                                            key={mood.label}
                                            style={[
                                                {
                                                    opacity: quickMoodAnims[index],
                                                    transform: [
                                                        {
                                                            scale: quickMoodAnims[index].interpolate({
                                                                inputRange: [0, 1],
                                                                outputRange: [0.8, 1],
                                                            })
                                                        }
                                                    ]
                                                }
                                            ]}
                                        >
                                            <TouchableOpacity
                                                style={[styles.quickMoodButton, { borderColor: mood.color }]}
                                                onPress={() => handleQuickMoodSelect(mood.label)}
                                                activeOpacity={0.7}
                                                disabled={loading}
                                            >
                                                <Text style={styles.quickMoodEmoji}>{mood.emoji}</Text>
                                                <Text style={styles.quickMoodLabel}>{mood.label}</Text>
                                            </TouchableOpacity>
                                        </Animated.View>
                                    ))}
                                </View>
                                {loading && (
                                    <View style={styles.loadingContainer}>
                                        <ActivityIndicator size="large" color={colors.primary} />
                                        <Text style={styles.loadingText}>Getting your personalized suggestions...</Text>
                                    </View>
                                )}
                            </GlassCard>
                        )}

                        {/* Today's Summary */}
                        {todaysMood && (
                            <GlassCard style={styles.summaryCard} variant="elevated">
                                <View style={styles.summaryContent}>
                                    <Text style={styles.summaryTitle}>🌟 Today's Wellness</Text>
                                    <View style={styles.todayMoodDisplay}>
                                        <Text style={styles.currentMoodEmoji}>
                                            {quickMoods.find(m => m.label === todaysMood)?.emoji || '😊'}
                                        </Text>
                                        <Text style={styles.summaryMoodText}>Feeling {todaysMood}</Text>
                                    </View>
                                    <Button
                                        title="📱 Get Another Suggestion"
                                        onPress={resetQuickMoods}
                                        variant="maximalist"
                                        style={styles.anotherSuggestionButton}
                                    />
                                </View>
                            </GlassCard>
                        )}

                        {/* Enhanced Form Card */}
                        <Animated.View
                            style={[
                                { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }
                            ]}
                        >
                            <GlassCard style={styles.formCard} variant="elevated">
                                {loading ? (
                                    <View style={styles.loadingContainer}>
                                        <ActivityIndicator size="large" color={colors.primary} />
                                        <Text style={styles.loadingText}>🧠 Getting your personalized suggestions...</Text>
                                    </View>
                                ) : (
                                    <MoodAndGoalForm onSubmit={handleSubmit} loading={loading} />
                                )}
                            </GlassCard>
                        </Animated.View>

                        {/* Recent Suggestions */}
                        {recentSuggestions.length > 0 && (
                            <GlassCard style={styles.recentSuggestionsCard} variant="elevated">
                                <View style={styles.recentSuggestionsHeader}>
                                    <View>
                                        <Text style={styles.recentSuggestionsTitle}>📚 Your Recent Suggestions</Text>
                                        <Text style={styles.recentSuggestionsSubtitle}>Tap to view again</Text>
                                    </View>
                                    <TouchableOpacity
                                        style={styles.viewAllButton}
                                        onPress={() => navigation.navigate('SuggestionsHistory')}
                                        activeOpacity={0.7}
                                    >
                                        <Text style={styles.viewAllText}>View All</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.recentSuggestionsGrid}>
                                    {recentSuggestions.map((suggestion, index) => (
                                        <TouchableOpacity
                                            key={suggestion.id || index}
                                            style={styles.recentSuggestionItem}
                                            onPress={() => handleRecentSuggestionPress(suggestion)}
                                            activeOpacity={0.7}
                                        >
                                            <View style={styles.recentSuggestionHeader}>
                                                <Text style={styles.recentSuggestionEmoji}>{suggestion.suggestion.emoji}</Text>
                                                <Text style={styles.recentSuggestionMood}>{suggestion.mood}</Text>
                                            </View>
                                            <Text style={styles.recentSuggestionTitle} numberOfLines={2}>
                                                {suggestion.suggestion.meal.name}
                                            </Text>
                                            <Text style={styles.recentSuggestionTime}>
                                                {suggestion.suggestion.meal.prepTime}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </GlassCard>
                        )}

                        {/* Interactive Tips Card */}
                        <GlassCard style={styles.tipsCard} variant="elevated">
                            <TouchableOpacity
                                onPress={() => {
                                    setInteractionCount(prev => prev + 1);
                                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                                }}
                                activeOpacity={0.8}
                            >
                                <Text style={styles.tipsTitle}>💡 Daily Nutrition Tip</Text>
                                <Text style={styles.tipsText}>
                                    Your mood affects your nutritional needs. When stressed, your body needs more B vitamins and magnesium. Try incorporating leafy greens and nuts into your meals!
                                </Text>
                            </TouchableOpacity>
                        </GlassCard>

                        <View style={styles.actions}>
                            <Button
                                title="Sign Out"
                                onPress={handleLogout}
                                variant="volcano"
                                style={styles.logoutButton}
                            />
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </GlassBackground>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    keyboardAvoid: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    container: {
        flexGrow: 1,
        padding: spacing.lg,
        paddingBottom: spacing.xxxl + 20, // Extra padding for tab bar
    },
    // Floating Background Elements
    floatingContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0,
    },
    floatingElement: {
        position: 'absolute',
        top: '20%',
    },
    floatingEmoji: {
        fontSize: 20,
        opacity: 0.3,
    },
    // Enhanced Header
    header: {
        marginTop: spacing.xl,
        marginBottom: spacing.lg,
        alignItems: 'center',
        zIndex: 1,
    },
    greetingText: {
        ...typography.h3,
        color: colors.primary,
        textAlign: 'center',
        marginBottom: spacing.xs,
        fontWeight: '600',
    },
    titleText: {
        ...typography.h1,
        color: colors.onSurface,
        textAlign: 'center',
        marginBottom: spacing.sm,
        fontWeight: '700',
    },
    subtitleText: {
        ...typography.body1,
        color: colors.onSurfaceVariant,
        textAlign: 'center',
        paddingHorizontal: spacing.md,
    },
    // Interactive Stats Dashboard
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: spacing.lg,
        gap: spacing.sm,
    },
    statCard: {
        flex: 1,
        minWidth: 100,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 20,
        padding: spacing.lg,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0.4)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 5,
        marginHorizontal: spacing.xs,
    },
    statContent: {
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 80,
    },
    statEmoji: {
        fontSize: 28,
        marginBottom: spacing.xs,
    },
    statNumber: {
        ...typography.h3,
        color: colors.onSurface,
        fontWeight: '700',
        marginBottom: spacing.xs,
    },
    statLabel: {
        ...typography.caption,
        color: colors.onSurfaceVariant,
        fontWeight: '500',
        textAlign: 'center',
    },
    // Quick Mood Selector
    quickMoodCard: {
        marginBottom: spacing.lg,
        padding: spacing.lg,
    },
    quickMoodTitle: {
        ...typography.h3,
        color: colors.onSurface,
        textAlign: 'center',
        marginBottom: spacing.xs,
        fontWeight: '600',
    },
    quickMoodSubtitle: {
        ...typography.body2,
        color: colors.onSurfaceVariant,
        textAlign: 'center',
        marginBottom: spacing.lg,
    },
    quickMoodGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: spacing.sm,
    },
    quickMoodButton: {
        width: (width - spacing.lg * 2 - spacing.lg * 2 - spacing.sm * 2) / 3,
        aspectRatio: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        marginBottom: spacing.sm,
    },
    quickMoodEmoji: {
        fontSize: 24,
        marginBottom: spacing.xs,
    },
    quickMoodLabel: {
        ...typography.caption,
        color: colors.onSurface,
        fontWeight: '600',
        textAlign: 'center',
    },
    // Current Mood Display
    currentMoodCard: {
        marginBottom: spacing.lg,
        padding: spacing.lg,
    },
    currentMoodContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    currentMoodEmoji: {
        fontSize: 32,
        marginRight: spacing.md,
    },
    currentMoodText: {
        flex: 1,
    },
    currentMoodLabel: {
        ...typography.h4,
        color: colors.onSurface,
        fontWeight: '600',
        marginBottom: spacing.xs,
    },
    currentMoodSubtext: {
        ...typography.body2,
        color: colors.onSurfaceVariant,
    },
    changeMoodButton: {
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        backgroundColor: colors.primary,
        borderRadius: 12,
    },
    changeMoodText: {
        ...typography.caption,
        color: 'white',
        fontWeight: '600',
    },
    // Enhanced Form Card
    formCard: {
        marginBottom: spacing.lg,
        zIndex: 1,
    },
    // Suggestion Button Styles
    suggestionButtonContainer: {
        marginTop: spacing.md,
        paddingTop: spacing.md,
        borderTopWidth: 1,
        borderTopColor: colors.onSurfaceVariant + '20',
    },
    suggestionButton: {
        backgroundColor: colors.primary + '15',
        borderWidth: 1,
        borderColor: colors.primary + '40',
    },
    // Loading container
    loadingContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: spacing.xl,
        marginTop: spacing.lg,
    },
    loadingText: {
        ...typography.body1,
        color: colors.primary,
        fontWeight: '600',
        marginTop: spacing.md,
        textAlign: 'center',
    },
    // Summary card styles
    summaryCard: {
        marginBottom: spacing.lg,
        padding: spacing.xl,
    },
    summaryContent: {
        alignItems: 'center',
    },
    summaryTitle: {
        ...typography.h4,
        color: colors.onSurface,
        fontWeight: '600',
        marginBottom: spacing.lg,
        textAlign: 'center',
    },
    todayMoodDisplay: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.lg,
    },
    summaryMoodText: {
        ...typography.h5,
        color: colors.onSurface,
        fontWeight: '500',
        marginLeft: spacing.md,
    },
    anotherSuggestionButton: {
        paddingHorizontal: spacing.xl,
    },
    // Welcome card styles
    welcomeCard: {
        marginBottom: spacing.lg,
        padding: spacing.xl,
        alignItems: 'center',
    },
    welcomeEmoji: {
        fontSize: 40,
        marginBottom: spacing.md,
    },
    welcomeTitle: {
        ...typography.h4,
        color: colors.onSurface,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: spacing.md,
    },
    welcomeText: {
        ...typography.body1,
        color: colors.onSurfaceVariant,
        textAlign: 'center',
        lineHeight: 22,
    },
    // Tips Card
    tipsCard: {
        marginBottom: spacing.lg,
        padding: spacing.lg,
    },
    tipsTitle: {
        ...typography.h4,
        color: colors.onSurface,
        marginBottom: spacing.sm,
        fontWeight: '600',
    },
    tipsText: {
        ...typography.body2,
        color: colors.onSurfaceVariant,
        lineHeight: 20,
    },
    // Actions
    actions: {
        gap: spacing.md,
        zIndex: 1,
    },
    actionButton: {
        marginBottom: spacing.xs,
    },
    logoutButton: {
        backgroundColor: 'rgba(239, 68, 68, 0.2)',
        borderColor: 'rgba(239, 68, 68, 0.3)',
    },
    // Recent Suggestions Styles
    recentSuggestionsCard: {
        marginBottom: spacing.lg,
        padding: spacing.lg,
    },
    recentSuggestionsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: spacing.md,
    },
    recentSuggestionsTitle: {
        ...typography.h4,
        color: colors.onSurface,
        fontWeight: '600',
        marginBottom: spacing.xs,
    },
    recentSuggestionsSubtitle: {
        ...typography.body2,
        color: colors.onSurfaceVariant,
    },
    viewAllButton: {
        backgroundColor: colors.primary,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        borderRadius: dimensions.borderRadius.small,
    },
    viewAllText: {
        ...typography.caption,
        color: colors.onPrimary,
        fontWeight: '600',
        fontSize: 12,
    },
    recentSuggestionsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.sm,
        justifyContent: 'space-between',
    },
    recentSuggestionItem: {
        flex: 1,
        minWidth: (width - spacing.xl * 2 - spacing.lg * 2 - spacing.sm) / 2,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: dimensions.borderRadius.medium,
        padding: spacing.md,
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.08)',
    },
    recentSuggestionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.xs,
    },
    recentSuggestionEmoji: {
        fontSize: 20,
        marginRight: spacing.xs,
    },
    recentSuggestionMood: {
        ...typography.caption,
        color: colors.primary,
        fontWeight: '600',
        textTransform: 'capitalize',
    },
    recentSuggestionTitle: {
        ...typography.body2,
        color: colors.onSurface,
        fontWeight: '500',
        marginBottom: spacing.xs,
    },
    recentSuggestionTime: {
        ...typography.caption,
        color: colors.onSurfaceVariant,
        fontSize: 11,
    },
});

export default HomeScreen;
