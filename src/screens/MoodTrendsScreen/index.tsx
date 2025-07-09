import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    ScrollView,
    StatusBar,
    Alert,
    SafeAreaView,
    Dimensions,
    Animated,
    TouchableOpacity,
    PanResponder,
    Easing,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { moodService, analyticsService } from '../../services/database';
import GlassBackground from '../../components/templates/GlassBackground';
import GlassCard from '../../components/molecules/GlassCard';
import { colors } from '../../theme/materialDesign';
import { EnhancedChart, SimpleChart } from './components';
import { styles } from './styles';
import {
    moodToValue,
    moodColors,
    moodGradients,
    insights,
    getMoodEmoji,
    getAverageMood,
    getMostFrequentMood,
    getMoodTrend,
    getTrendEmoji,
    getMoodScoreColor,
    getStreakDays,
    animateStats,
    animateChart,
    startFloatingMoodAnimations,
    handleTimeRangeSwipe,
    handleMoodSelect,
    toggleInsights,
    nextInsight,
    toggleChartMode,
    handleTimeRangeChange,
} from './utils';
import type { MoodTrendsState, MoodData, TimeRange, FloatingMoodAnimation } from './types';

// Try to import chart, but provide fallback
let LineChart: any;
try {
    const chartKit = require('react-native-chart-kit');
    LineChart = chartKit.LineChart;
} catch (error) {
    console.log('Chart library not available:', error);
    LineChart = null;
}

const screenWidth = Dimensions.get('window').width;

const MoodTrendsScreen: React.FC = () => {
    const [state, setState] = useState<MoodTrendsState>({
        moodData: null,
        recentMoods: [],
        moodStats: {},
        loading: true,
        selectedTimeRange: '7days',
        selectedMood: null,
        showInsights: false,
        interactionCount: 0,
        currentInsight: 0,
        chartMode: 'line',
    });

    // Animation values
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(30)).current;
    const scaleAnim = useRef(new Animated.Value(0.8)).current;
    const statsAnimations = useRef(Array.from({ length: 5 }, () => new Animated.Value(0))).current;
    const pulseAnim = useRef(new Animated.Value(1)).current;
    const rotateAnim = useRef(new Animated.Value(0)).current;
    const insightAnim = useRef(new Animated.Value(0)).current;
    const chartAnimations = useRef(Array.from({ length: 7 }, () => new Animated.Value(0))).current;
    const floatingMoods = useRef(Array.from({ length: 10 }, () => ({
        translateY: new Animated.Value(0),
        opacity: new Animated.Value(0),
        scale: new Animated.Value(1),
    }))).current;

    // Pan responder for swipe interactions
    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: (evt, gestureState) => {
                return Math.abs(gestureState.dx) > 20;
            },
            onPanResponderMove: (evt, gestureState) => {
                if (gestureState.dx > 50) {
                    // Swipe right - previous time range
                    handleTimeRangeSwipe(
                        'previous',
                        state.selectedTimeRange,
                        (range: TimeRange) => setState(prev => ({ ...prev, selectedTimeRange: range })),
                        (fn: (prev: number) => number) => setState(prev => ({ ...prev, interactionCount: fn(prev.interactionCount) }))
                    );
                } else if (gestureState.dx < -50) {
                    // Swipe left - next time range
                    handleTimeRangeSwipe(
                        'next',
                        state.selectedTimeRange,
                        (range: TimeRange) => setState(prev => ({ ...prev, selectedTimeRange: range })),
                        (fn: (prev: number) => number) => setState(prev => ({ ...prev, interactionCount: fn(prev.interactionCount) }))
                    );
                }
            },
            onPanResponderRelease: () => {
                // Reset any animations
            },
        })
    ).current;

    useEffect(() => {
        // Animate in the components with staggered effect
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 600,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                tension: 50,
                friction: 7,
                useNativeDriver: true,
            }),
        ]).start();

        // Start pulse animation
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1.05,
                    duration: 2000,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 2000,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
            ])
        ).start();

        // Start floating mood animations
        startFloatingMoodAnimations(floatingMoods);

        // Rotate animation for loading states
        Animated.loop(
            Animated.timing(rotateAnim, {
                toValue: 1,
                duration: 3000,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start();
    }, []);

    useEffect(() => {
        const fetchMoodData = async () => {
            try {
                // Get mood history from database service
                const moodHistory = await moodService.getMoodHistory(100);

                // Convert to the format expected by the component
                const data: MoodData[] = moodHistory.map(entry => ({
                    timestamp: { toDate: () => entry.timestamp.toDate() },
                    mood: entry.mood,
                    goal: entry.goal
                }));

                setState(prev => ({ ...prev, recentMoods: data.slice(0, 20) }));

                if (data.length > 0) {
                    // Prepare chart data based on selected time range
                    let filteredData = data;
                    const daysToShow = state.selectedTimeRange === '7days' ? 7 :
                        state.selectedTimeRange === '30days' ? 30 : data.length;

                    filteredData = data.slice(0, daysToShow).reverse();

                    const labels = filteredData.map(d => {
                        const date = d.timestamp.toDate();
                        return state.selectedTimeRange === '7days'
                            ? `${date.getMonth() + 1}/${date.getDate()}`
                            : `${date.getDate()}`;
                    });
                    const values = filteredData.map(d => moodToValue[d.mood] || 0);

                    setState(prev => ({
                        ...prev,
                        moodData: {
                            labels,
                            datasets: [{ data: values }],
                        }
                    }));

                    // Get mood statistics from database service
                    const stats = await moodService.getMoodStats(state.selectedTimeRange);
                    setState(prev => ({ ...prev, moodStats: stats }));

                    // Animate charts and stats when data loads
                    setTimeout(() => {
                        animateStats(statsAnimations);
                        animateChart(chartAnimations);
                    }, 300);
                }
            } catch (error) {
                console.error('Error fetching mood data:', error);
                Alert.alert('Error', 'Failed to load mood trends. Please try again.');
            } finally {
                setState(prev => ({ ...prev, loading: false }));
            }
        };

        fetchMoodData();
    }, [state.selectedTimeRange]); // Re-fetch when time range changes

    const rotateInterpolate = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <GlassBackground gradient={colors.gradients.ocean} variant="subtle">
            <StatusBar barStyle="dark-content" />

            {/* Floating Mood Elements Background */}
            <View style={styles.floatingContainer}>
                {floatingMoods.map((anim, index) => {
                    const moods = ['😊', '😌', '⚡', '🧠', '😴'];
                    return (
                        <Animated.View
                            key={index}
                            style={[
                                styles.floatingMood,
                                {
                                    left: `${(index * 11) % 100}%`,
                                    opacity: anim.opacity,
                                    transform: [
                                        { translateY: anim.translateY },
                                        { scale: anim.scale }
                                    ],
                                },
                            ]}
                        >
                            <Text style={styles.floatingMoodEmoji}>
                                {moods[index % moods.length]}
                            </Text>
                        </Animated.View>
                    );
                })}
            </View>

            <SafeAreaView style={styles.safeArea}>
                <ScrollView
                    style={styles.container}
                    showsVerticalScrollIndicator={false}
                    {...panResponder.panHandlers}
                >
                    {/* Enhanced Header with Animations */}
                    <Animated.View
                        style={[
                            styles.header,
                            {
                                opacity: fadeAnim,
                                transform: [{ translateY: slideAnim }]
                            }
                        ]}
                    >
                        <Text style={styles.titleText}>Mood Analytics 📊</Text>
                        <Text style={styles.subtitleText}>Track your emotional wellness journey</Text>
                        <TouchableOpacity
                            style={styles.insightButton}
                            onPress={() => toggleInsights(
                                state.showInsights,
                                (show: boolean) => setState(prev => ({ ...prev, showInsights: show })),
                                (fn: (prev: number) => number) => setState(prev => ({ ...prev, interactionCount: fn(prev.interactionCount) })),
                                insightAnim
                            )}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.insightButtonText}>
                                💡 {state.showInsights ? 'Hide' : 'Show'} Daily Insights
                            </Text>
                        </TouchableOpacity>
                    </Animated.View>

                    {/* Interactive Time Range Selector */}
                    <View style={styles.timeRangeContainer}>
                        <Text style={styles.timeRangeTitle}>📅 Time Period</Text>
                        <View style={styles.timeRangeButtons}>
                            {(['7days', '30days', 'all'] as const).map((range) => (
                                <TouchableOpacity
                                    key={range}
                                    style={[
                                        styles.timeRangeButton,
                                        state.selectedTimeRange === range && styles.timeRangeButtonActive
                                    ]}
                                    onPress={() => handleTimeRangeChange(
                                        range,
                                        (range: TimeRange) => setState(prev => ({ ...prev, selectedTimeRange: range })),
                                        (fn: (prev: number) => number) => setState(prev => ({ ...prev, interactionCount: fn(prev.interactionCount) })),
                                        scaleAnim
                                    )}
                                    activeOpacity={0.7}
                                >
                                    <Text style={[
                                        styles.timeRangeButtonText,
                                        state.selectedTimeRange === range && styles.timeRangeButtonTextActive
                                    ]}>
                                        {range === '7days' ? '7 Days' :
                                            range === '30days' ? '30 Days' : 'All Time'}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                        <Text style={styles.swipeHint}>👆 Tap to select or swipe to change</Text>
                    </View>

                    {/* Daily Insights Card */}
                    {state.showInsights && (
                        <Animated.View
                            style={[
                                styles.insightsCard,
                                {
                                    opacity: insightAnim,
                                    transform: [
                                        {
                                            translateY: insightAnim.interpolate({
                                                inputRange: [0, 1],
                                                outputRange: [-20, 0],
                                            })
                                        }
                                    ]
                                }
                            ]}
                        >
                            <GlassCard style={styles.insightsCardInner} variant="elevated">
                                <TouchableOpacity
                                    onPress={() => nextInsight(
                                        state.currentInsight,
                                        (insight: number) => setState(prev => ({ ...prev, currentInsight: insight })),
                                        (fn: (prev: number) => number) => setState(prev => ({ ...prev, interactionCount: fn(prev.interactionCount) })),
                                        insightAnim
                                    )}
                                    activeOpacity={0.8}
                                >
                                    <Text style={styles.insightText}>{insights[state.currentInsight]}</Text>
                                    <Text style={styles.insightTap}>Tap for next insight</Text>
                                </TouchableOpacity>
                            </GlassCard>
                        </Animated.View>
                    )}

                    {state.loading ? (
                        <GlassCard style={styles.loadingCard} variant="elevated">
                            <Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
                                <Text style={styles.loadingEmoji}>🧠</Text>
                            </Animated.View>
                            <Text style={styles.loadingText}>Analyzing your mood patterns...</Text>
                            <Text style={styles.loadingSubtext}>Creating personalized insights</Text>
                        </GlassCard>
                    ) : (
                        <>
                            {/* Enhanced Statistics Grid */}
                            <View style={styles.statsGrid}>
                                {/* Total Entries Card */}
                                <Animated.View
                                    style={[
                                        {
                                            opacity: statsAnimations[0],
                                            transform: [
                                                { scale: statsAnimations[0] },
                                                {
                                                    rotateY: statsAnimations[0].interpolate({
                                                        inputRange: [0, 1],
                                                        outputRange: ['90deg', '0deg'],
                                                    })
                                                }
                                            ]
                                        }
                                    ]}
                                >
                                    <TouchableOpacity
                                        style={styles.statCard}
                                        onPress={() => {
                                            setState(prev => ({ ...prev, interactionCount: prev.interactionCount + 1 }));
                                            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

                                            // Add bounce animation on press
                                            Animated.sequence([
                                                Animated.timing(statsAnimations[0], {
                                                    toValue: 1.1,
                                                    duration: 100,
                                                    useNativeDriver: true,
                                                }),
                                                Animated.timing(statsAnimations[0], {
                                                    toValue: 1,
                                                    duration: 100,
                                                    useNativeDriver: true,
                                                })
                                            ]).start();
                                        }}
                                        activeOpacity={0.9}
                                    >
                                        <LinearGradient
                                            colors={['#667eea', '#764ba2']}
                                            start={{ x: 0, y: 0 }}
                                            end={{ x: 1, y: 1 }}
                                            style={styles.enhancedStatCard}
                                        >
                                            <View style={styles.statIconContainer}>
                                                <Text style={styles.statEmoji}>📊</Text>
                                                <View style={styles.statIconGlow} />
                                            </View>
                                            <Text style={styles.enhancedStatValue}>{state.recentMoods.length}</Text>
                                            <Text style={styles.enhancedStatLabel}>Total Entries</Text>
                                            <View style={styles.statProgressBar}>
                                                <View
                                                    style={[
                                                        styles.statProgressFill,
                                                        { width: `${Math.min(100, (state.recentMoods.length / 50) * 100)}%` }
                                                    ]}
                                                />
                                            </View>
                                            <Text style={styles.statSubtext}>
                                                {state.recentMoods.length > 30 ? 'Great tracking!' : 'Keep logging!'}
                                            </Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                </Animated.View>

                                {/* Average Mood Card */}
                                <Animated.View
                                    style={[
                                        {
                                            opacity: statsAnimations[1],
                                            transform: [
                                                { scale: statsAnimations[1] },
                                                {
                                                    rotateY: statsAnimations[1].interpolate({
                                                        inputRange: [0, 1],
                                                        outputRange: ['90deg', '0deg'],
                                                    })
                                                }
                                            ]
                                        }
                                    ]}
                                >
                                    <TouchableOpacity
                                        style={styles.statCard}
                                        onPress={() => {
                                            setState(prev => ({ ...prev, interactionCount: prev.interactionCount + 1 }));
                                            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                                        }}
                                        activeOpacity={0.9}
                                    >
                                        <LinearGradient
                                            colors={['#ffecd2', '#fcb69f']}
                                            start={{ x: 0, y: 0 }}
                                            end={{ x: 1, y: 1 }}
                                            style={styles.enhancedStatCard}
                                        >
                                            <View style={styles.statIconContainer}>
                                                <Text style={styles.statEmoji}>🎯</Text>
                                                <View style={styles.statIconGlow} />
                                            </View>
                                            <Text style={[styles.enhancedStatValue, { color: '#8B4513' }]}>
                                                {getAverageMood(state.recentMoods)}
                                            </Text>
                                            <Text style={[styles.enhancedStatLabel, { color: '#A0522D' }]}>
                                                Average Mood
                                            </Text>
                                            <View style={styles.moodIndicatorDots}>
                                                {['Very Low', 'Low', 'Moderate', 'Good', 'Excellent'].map((level, index) => (
                                                    <View
                                                        key={level}
                                                        style={[
                                                            styles.moodDot,
                                                            {
                                                                backgroundColor: getAverageMood(state.recentMoods) === level
                                                                    ? '#8B4513'
                                                                    : 'rgba(139, 69, 19, 0.3)'
                                                            }
                                                        ]}
                                                    />
                                                ))}
                                            </View>
                                            <Text style={[styles.statSubtext, { color: '#A0522D' }]}>
                                                {state.recentMoods.length > 0 ? 'Keep it up!' : 'Start tracking'}
                                            </Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                </Animated.View>

                                {/* Trend Card */}
                                <Animated.View
                                    style={[
                                        {
                                            opacity: statsAnimations[2],
                                            transform: [
                                                { scale: statsAnimations[2] },
                                                {
                                                    rotateY: statsAnimations[2].interpolate({
                                                        inputRange: [0, 1],
                                                        outputRange: ['90deg', '0deg'],
                                                    })
                                                }
                                            ]
                                        }
                                    ]}
                                >
                                    <TouchableOpacity
                                        style={styles.statCard}
                                        onPress={() => {
                                            setState(prev => ({ ...prev, interactionCount: prev.interactionCount + 1 }));
                                            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                                        }}
                                        activeOpacity={0.9}
                                    >
                                        <LinearGradient
                                            colors={
                                                getMoodTrend(state.moodData) === 'improving' ? ['#a8edea', '#fed6e3'] :
                                                    getMoodTrend(state.moodData) === 'declining' ? ['#ffecd2', '#fcb69f'] :
                                                        ['#d299c2', '#fef9d7']
                                            }
                                            start={{ x: 0, y: 0 }}
                                            end={{ x: 1, y: 1 }}
                                            style={styles.enhancedStatCard}
                                        >
                                            <View style={styles.statIconContainer}>
                                                <Animated.Text
                                                    style={[
                                                        styles.statEmoji,
                                                        {
                                                            transform: [
                                                                {
                                                                    rotate: pulseAnim.interpolate({
                                                                        inputRange: [0.8, 1.2],
                                                                        outputRange: ['-5deg', '5deg'],
                                                                    })
                                                                }
                                                            ]
                                                        }
                                                    ]}
                                                >
                                                    {getTrendEmoji(getMoodTrend(state.moodData))}
                                                </Animated.Text>
                                                <View style={styles.statIconGlow} />
                                            </View>
                                            <Text style={[
                                                styles.enhancedStatValue,
                                                {
                                                    color: getMoodTrend(state.moodData) === 'improving' ? '#2D5A5A' :
                                                        getMoodTrend(state.moodData) === 'declining' ? '#8B4513' :
                                                            '#6B5B95',
                                                    textTransform: 'capitalize'
                                                }
                                            ]}>
                                                {getMoodTrend(state.moodData)}
                                            </Text>
                                            <Text style={[
                                                styles.enhancedStatLabel,
                                                {
                                                    color: getMoodTrend(state.moodData) === 'improving' ? '#3A6A6A' :
                                                        getMoodTrend(state.moodData) === 'declining' ? '#A0522D' :
                                                            '#8B7BA8'
                                                }
                                            ]}>
                                                Mood Trend
                                            </Text>
                                            <View style={styles.trendIndicator}>
                                                <View style={[
                                                    styles.trendArrow,
                                                    {
                                                        backgroundColor: getMoodTrend(state.moodData) === 'improving' ? '#10b981' :
                                                            getMoodTrend(state.moodData) === 'declining' ? '#ef4444' :
                                                                '#6b7280'
                                                    }
                                                ]} />
                                            </View>
                                            <Text style={[
                                                styles.statSubtext,
                                                {
                                                    color: getMoodTrend(state.moodData) === 'improving' ? '#3A6A6A' :
                                                        getMoodTrend(state.moodData) === 'declining' ? '#A0522D' :
                                                            '#8B7BA8'
                                                }
                                            ]}>
                                                {getMoodTrend(state.moodData) === 'improving' ? 'Great progress!' :
                                                    getMoodTrend(state.moodData) === 'declining' ? 'Take care of yourself' :
                                                        'Steady as you go'}
                                            </Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                </Animated.View>

                                {/* Streak Card */}
                                <Animated.View
                                    style={[
                                        {
                                            opacity: statsAnimations[3],
                                            transform: [
                                                { scale: statsAnimations[3] },
                                                {
                                                    rotateY: statsAnimations[3].interpolate({
                                                        inputRange: [0, 1],
                                                        outputRange: ['90deg', '0deg'],
                                                    })
                                                }
                                            ]
                                        }
                                    ]}
                                >
                                    <TouchableOpacity
                                        style={styles.statCard}
                                        onPress={() => {
                                            setState(prev => ({ ...prev, interactionCount: prev.interactionCount + 1 }));
                                            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
                                        }}
                                        activeOpacity={0.9}
                                    >
                                        <LinearGradient
                                            colors={getStreakDays(state.recentMoods) > 7 ? ['#ff9a9e', '#fecfef'] : ['#ffecd2', '#fcb69f']}
                                            start={{ x: 0, y: 0 }}
                                            end={{ x: 1, y: 1 }}
                                            style={styles.enhancedStatCard}
                                        >
                                            <View style={styles.statIconContainer}>
                                                <Animated.Text
                                                    style={[
                                                        styles.statEmoji,
                                                        {
                                                            transform: [
                                                                {
                                                                    scale: pulseAnim.interpolate({
                                                                        inputRange: [0.8, 1.2],
                                                                        outputRange: [1, 1.3],
                                                                    })
                                                                }
                                                            ]
                                                        }
                                                    ]}
                                                >
                                                    🔥
                                                </Animated.Text>
                                                <View style={styles.statIconGlow} />
                                            </View>
                                            <Text style={[
                                                styles.enhancedStatValue,
                                                { color: getStreakDays(state.recentMoods) > 7 ? '#8B0066' : '#8B4513' }
                                            ]}>
                                                {getStreakDays(state.recentMoods)}
                                            </Text>
                                            <Text style={[
                                                styles.enhancedStatLabel,
                                                { color: getStreakDays(state.recentMoods) > 7 ? '#A0527D' : '#A0522D' }
                                            ]}>
                                                Day Streak
                                            </Text>
                                            <View style={styles.streakVisualization}>
                                                {Array.from({ length: Math.min(getStreakDays(state.recentMoods), 7) }).map((_, index) => (
                                                    <Animated.View
                                                        key={index}
                                                        style={[
                                                            styles.streakFlame,
                                                            {
                                                                transform: [
                                                                    {
                                                                        scale: pulseAnim.interpolate({
                                                                            inputRange: [0.8, 1.2],
                                                                            outputRange: [0.8, 1.1],
                                                                        })
                                                                    }
                                                                ]
                                                            }
                                                        ]}
                                                    />
                                                ))}
                                            </View>
                                            <Text style={[
                                                styles.statSubtext,
                                                { color: getStreakDays(state.recentMoods) > 7 ? '#A0527D' : '#A0522D' }
                                            ]}>
                                                {getStreakDays(state.recentMoods) === 0 ? 'Start your streak!' :
                                                    getStreakDays(state.recentMoods) < 3 ? 'Building momentum!' :
                                                        getStreakDays(state.recentMoods) < 7 ? 'Great consistency!' :
                                                            'Amazing dedication!'}
                                            </Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                </Animated.View>
                            </View>

                            {/* Interactive Most Frequent Mood */}
                            <Animated.View
                                style={[
                                    { opacity: statsAnimations[4], transform: [{ scale: pulseAnim }] }
                                ]}
                            >
                                <TouchableOpacity
                                    onPress={() => handleMoodSelect(
                                        getMostFrequentMood(state.moodStats),
                                        state.selectedMood,
                                        (mood: string | null) => setState(prev => ({ ...prev, selectedMood: mood })),
                                        (fn: (prev: number) => number) => setState(prev => ({ ...prev, interactionCount: fn(prev.interactionCount) })),
                                        scaleAnim
                                    )}
                                    activeOpacity={0.8}
                                >
                                    <GlassCard style={styles.frequentMoodCard} variant="elevated">
                                        <Text style={styles.cardTitle}>🏆 Most Frequent Mood</Text>
                                        <View style={styles.frequentMoodDisplay}>
                                            <LinearGradient
                                                colors={moodGradients[getMostFrequentMood(state.moodStats)] as any || ['#6366f1', '#8b5cf6']}
                                                style={styles.frequentMoodGradient}
                                            >
                                                <Text style={styles.frequentMoodEmoji}>
                                                    {getMoodEmoji(getMostFrequentMood(state.moodStats))}
                                                </Text>
                                            </LinearGradient>
                                            <Text style={styles.frequentMoodText}>
                                                {getMostFrequentMood(state.moodStats)}
                                            </Text>
                                            <Text style={styles.frequentMoodCount}>
                                                {state.moodStats[getMostFrequentMood(state.moodStats)] || 0} times
                                            </Text>
                                        </View>
                                    </GlassCard>
                                </TouchableOpacity>
                            </Animated.View>

                            {/* Enhanced Chart Card */}
                            <GlassCard style={styles.chartCard} variant="elevated">
                                <View style={styles.chartHeader}>
                                    <Text style={styles.cardTitle}>
                                        📈 {state.selectedTimeRange === '7days' ? '7-Day' :
                                            state.selectedTimeRange === '30days' ? '30-Day' : 'All-Time'} Mood Trend
                                    </Text>
                                    <TouchableOpacity
                                        style={styles.chartModeButton}
                                        onPress={() => toggleChartMode(
                                            state.chartMode,
                                            (mode: 'line' | 'bar') => setState(prev => ({ ...prev, chartMode: mode })),
                                            (fn: (prev: number) => number) => setState(prev => ({ ...prev, interactionCount: fn(prev.interactionCount) })),
                                            chartAnimations
                                        )}
                                    >
                                        <Text style={styles.chartModeText}>
                                            {state.chartMode === 'line' ? '📊' : '📈'}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                {state.moodData && LineChart ? (
                                    <LineChart
                                        data={state.moodData}
                                        width={screenWidth - 80}
                                        height={200}
                                        chartConfig={{
                                            backgroundColor: 'transparent',
                                            backgroundGradientFrom: 'transparent',
                                            backgroundGradientTo: 'transparent',
                                            decimalPlaces: 0,
                                            color: (opacity = 1) => `rgba(37, 99, 235, ${opacity})`,
                                            labelColor: (opacity = 1) => `rgba(15, 23, 42, ${opacity})`,
                                            style: { borderRadius: 16 },
                                            propsForDots: {
                                                r: '6',
                                                strokeWidth: '2',
                                                stroke: colors.primary,
                                            },
                                        }}
                                        bezier
                                        style={styles.chart}
                                    />
                                ) : (
                                    <EnhancedChart
                                        data={state.moodData}
                                        mode={state.chartMode}
                                        animations={chartAnimations}
                                    />
                                )}
                            </GlassCard>

                            {/* Interactive Mood Breakdown */}
                            <GlassCard style={styles.breakdownCard} variant="elevated">
                                <Text style={styles.cardTitle}>🎨 Interactive Mood Breakdown</Text>
                                <View style={styles.moodBreakdown}>
                                    {Object.entries(state.moodStats).map(([mood, count], index) => (
                                        <TouchableOpacity
                                            key={mood}
                                            style={[
                                                styles.moodBreakdownItem,
                                                state.selectedMood === mood && styles.moodBreakdownItemSelected
                                            ]}
                                            onPress={() => handleMoodSelect(
                                                mood,
                                                state.selectedMood,
                                                (mood: string | null) => setState(prev => ({ ...prev, selectedMood: mood })),
                                                (fn: (prev: number) => number) => setState(prev => ({ ...prev, interactionCount: fn(prev.interactionCount) })),
                                                scaleAnim
                                            )}
                                            activeOpacity={0.7}
                                        >
                                            <LinearGradient
                                                colors={moodGradients[mood] as any || ['#6366f1', '#8b5cf6']}
                                                style={styles.moodBreakdownGradient}
                                            >
                                                <View style={styles.moodBreakdownLeft}>
                                                    <Text style={styles.moodBreakdownEmoji}>
                                                        {getMoodEmoji(mood)}
                                                    </Text>
                                                    <View>
                                                        <Text style={styles.moodBreakdownMood}>{mood}</Text>
                                                        <Text style={styles.moodBreakdownPercentage}>
                                                            {Math.round((count / state.recentMoods.length) * 100)}%
                                                        </Text>
                                                    </View>
                                                </View>
                                                <Text style={styles.moodBreakdownCount}>{count}</Text>
                                            </LinearGradient>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </GlassCard>

                            {/* Enhanced Recent Moods */}
                            <GlassCard style={styles.recentCard} variant="elevated">
                                <View style={styles.recentHeader}>
                                    <Text style={styles.cardTitle}>📋 Recent Mood History</Text>
                                    <Text style={styles.interactionCounter}>
                                        ✨ {state.interactionCount} interactions
                                    </Text>
                                </View>
                                <View style={styles.recentMoods}>
                                    {state.recentMoods.slice(0, 8).map((mood, index) => (
                                        <TouchableOpacity
                                            key={index}
                                            style={styles.recentMoodItem}
                                            onPress={() => {
                                                setState(prev => ({ ...prev, interactionCount: prev.interactionCount + 1 }));
                                                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                                            }}
                                            activeOpacity={0.8}
                                        >
                                            <LinearGradient
                                                colors={moodGradients[mood.mood] as any || ['#6366f1', '#8b5cf6']}
                                                style={styles.recentMoodGradient}
                                            >
                                                <View style={styles.recentMoodLeft}>
                                                    <Text style={styles.recentMoodEmoji}>
                                                        {getMoodEmoji(mood.mood)}
                                                    </Text>
                                                    <View>
                                                        <Text style={styles.recentMoodText}>{mood.mood}</Text>
                                                        <Text style={styles.recentGoalText}>
                                                            Goal: {mood.goal}
                                                        </Text>
                                                    </View>
                                                </View>
                                                <View style={styles.recentMoodRight}>
                                                    <Text style={styles.recentMoodDate}>
                                                        {mood.timestamp.toDate().toLocaleDateString()}
                                                    </Text>
                                                    <View
                                                        style={[
                                                            styles.moodScoreIndicator,
                                                            { backgroundColor: getMoodScoreColor(moodToValue[mood.mood] || 0) }
                                                        ]}
                                                    >
                                                        <Text style={styles.moodScoreText}>
                                                            {moodToValue[mood.mood] || 0}
                                                        </Text>
                                                    </View>
                                                </View>
                                            </LinearGradient>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </GlassCard>
                        </>
                    )}
                </ScrollView>
            </SafeAreaView>
        </GlassBackground>
    );
};

export default MoodTrendsScreen;
