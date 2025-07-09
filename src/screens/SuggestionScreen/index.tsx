import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    Alert,
    ScrollView,
    StatusBar,
    Animated,
    TouchableOpacity,
    Share
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Button from '../../components/atoms/Button';
import MarkdownRenderer from '../../components/atoms/MarkdownRenderer';
import GlassBackground from '../../components/templates/GlassBackground';
import GlassCard from '../../components/molecules/GlassCard';
import { db, auth } from '../../services/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { colors } from '../../theme/materialDesign';
import * as Haptics from 'expo-haptics';
import { styles } from './styles';
import { getMoodEmoji, getGoalEmoji } from './utils';
import type { SuggestionScreenProps, SuggestionState, FeedbackType, SuggestionScreenNavigationProp } from './types';

const SuggestionScreen: React.FC<SuggestionScreenProps> = ({ route }) => {
    const { suggestion, mood, goal } = route.params;
    const navigation = useNavigation<SuggestionScreenNavigationProp>();

    const [state, setState] = useState<SuggestionState>({
        feedbackGiven: false,
        isBookmarked: false,
        showShareOptions: false,
    });

    // Animation values
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(50)).current;
    const scaleAnim = useRef(new Animated.Value(0.8)).current;
    const bookmarkAnim = useRef(new Animated.Value(1)).current;
    const headerAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Animate components in
        Animated.sequence([
            Animated.delay(100),
            Animated.parallel([
                Animated.timing(headerAnim, {
                    toValue: 1,
                    duration: 600,
                    useNativeDriver: true,
                }),
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
            ])
        ]).start();

        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }, []);

    const handleFeedback = async (feedback: FeedbackType) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

        try {
            if (auth.currentUser) {
                await addDoc(collection(db, 'feedback'), {
                    userId: auth.currentUser.uid,
                    mood,
                    goal,
                    suggestion,
                    feedback,
                    timestamp: new Date(),
                });
                setState(prev => ({ ...prev, feedbackGiven: true }));

                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

                Alert.alert(
                    'Thank you! 🙏',
                    'Your feedback helps us provide better suggestions.',
                    [
                        {
                            text: 'OK',
                            onPress: () => navigation.goBack()
                        }
                    ]
                );
            }
        } catch (e) {
            console.error("Error adding document: ", e);
            Alert.alert('Error', 'Could not save your feedback.');
        }
    };

    const handleBookmark = async () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

        // Animate bookmark button
        Animated.sequence([
            Animated.timing(bookmarkAnim, {
                toValue: 1.3,
                duration: 150,
                useNativeDriver: true,
            }),
            Animated.timing(bookmarkAnim, {
                toValue: 1,
                duration: 150,
                useNativeDriver: true,
            }),
        ]).start();

        try {
            if (auth.currentUser) {
                await addDoc(collection(db, 'bookmarks'), {
                    userId: auth.currentUser.uid,
                    mood,
                    goal,
                    suggestion,
                    timestamp: new Date(),
                });
                setState(prev => ({ ...prev, isBookmarked: true }));
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                Alert.alert('✅ Bookmarked!', 'You can find this suggestion in your saved items.');
            }
        } catch (error) {
            console.error('Error bookmarking suggestion:', error);
            Alert.alert('Error', 'Could not bookmark this suggestion.');
        }
    };

    const handleShare = async () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

        const shareText = `Check out this nutrition suggestion for ${mood} mood and ${goal} goal:\n\n${typeof suggestion === 'string' ? suggestion : 'Personalized nutrition recommendation'}\n\nShared from Nutrition Mood App`;

        try {
            await Share.share({
                message: shareText,
                title: 'Nutrition Suggestion',
            });
        } catch (error) {
            console.error('Error sharing:', error);
        }
    };

    return (
        <GlassBackground gradient={colors.gradients.ocean} variant="subtle">
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <Animated.View
                    style={[
                        styles.header,
                        {
                            opacity: headerAnim,
                            transform: [{ translateY: slideAnim }]
                        }
                    ]}
                >
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                        <Text style={styles.backIcon}>←</Text>
                    </TouchableOpacity>
                    <View style={styles.headerContent}>
                        <Text style={styles.headerTitle}>Nutrition Suggestion</Text>
                        <Text style={styles.headerSubtitle}>For {mood} • {goal}</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.shareButton}
                        onPress={handleShare}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                        <Text style={styles.shareIcon}>↗</Text>
                    </TouchableOpacity>
                </Animated.View>

                {/* Mood & Goal Summary */}
                <Animated.View
                    style={[
                        styles.summaryContainer,
                        {
                            opacity: fadeAnim,
                            transform: [{ translateY: slideAnim }]
                        }
                    ]}
                >
                    <GlassCard style={styles.summaryCard}>
                        <Text style={styles.summaryTitle}>Your Profile</Text>
                        <View style={styles.summaryRow}>
                            <View style={styles.summaryItem}>
                                <Text style={styles.summaryEmoji}>{getMoodEmoji(mood)}</Text>
                                <Text style={styles.summaryLabel}>Mood</Text>
                                <Text style={styles.summaryValue}>{mood}</Text>
                            </View>
                            <View style={styles.summaryItem}>
                                <Text style={styles.summaryEmoji}>{getGoalEmoji(goal)}</Text>
                                <Text style={styles.summaryLabel}>Goal</Text>
                                <Text style={styles.summaryValue}>{goal}</Text>
                            </View>
                        </View>
                    </GlassCard>
                </Animated.View>

                {/* Enhanced Suggestion Card */}
                <Animated.View
                    style={[
                        {
                            opacity: fadeAnim,
                            transform: [{ translateY: slideAnim }]
                        }
                    ]}
                >
                    <GlassCard style={styles.suggestionCard} variant="elevated">
                        <View style={styles.suggestionHeader}>
                            <Text style={styles.suggestionHeaderText}>🎯 Your Nutrition Plan</Text>
                            <View style={styles.moodGoalBadges}>
                                <View style={[styles.badge, styles.moodBadge]}>
                                    <Text style={styles.badgeText}>{getMoodEmoji(mood)} {mood}</Text>
                                </View>
                                <View style={[styles.badge, styles.goalBadge]}>
                                    <Text style={styles.badgeText}>{getGoalEmoji(goal)} {goal}</Text>
                                </View>
                            </View>
                        </View>

                        {suggestion && typeof suggestion === 'object' && suggestion.meal ? (
                            <View style={styles.fallbackContent}>
                                <Text style={styles.fallbackTitle}>🌟 {suggestion.title || 'Personalized Suggestion'}</Text>
                                <Text style={styles.fallbackText}>
                                    {suggestion.meal.name}: {suggestion.meal.description}
                                </Text>
                                <Text style={styles.fallbackNote}>
                                    ⏱ Prep time: {suggestion.meal.prepTime}
                                </Text>
                            </View>
                        ) : (
                            <View style={styles.fallbackContent}>
                                <Text style={styles.fallbackTitle}>🌟 Personalized Suggestion</Text>
                                <Text style={styles.fallbackText}>
                                    Based on your mood ({mood}) and goal ({goal}), we recommend focusing on balanced nutrition with plenty of hydration and foods that support your current state.
                                </Text>
                                <Text style={styles.fallbackNote}>
                                    💡 Try again with an internet connection for AI-powered suggestions!
                                </Text>
                            </View>
                        )}
                    </GlassCard>
                </Animated.View>

                {/* Enhanced Feedback Section */}
                <Animated.View
                    style={[
                        {
                            opacity: fadeAnim,
                            transform: [{ translateY: slideAnim }]
                        }
                    ]}
                >
                    <GlassCard style={styles.feedbackCard} variant="elevated">
                        <Text style={styles.feedbackTitle}>💬 How was this suggestion?</Text>
                        <Text style={styles.feedbackSubtitle}>Your feedback helps us improve our AI recommendations</Text>

                        {!state.feedbackGiven ? (
                            <View style={styles.feedbackButtons}>
                                <Button
                                    title="✨ Amazing!"
                                    onPress={() => handleFeedback('helpful')}
                                    style={styles.helpfulButton}
                                />
                                <Button
                                    title="🤔 Could be better"
                                    onPress={() => handleFeedback('not_helpful')}
                                    variant="outline"
                                    style={styles.notHelpfulButton}
                                />
                            </View>
                        ) : (
                            <View style={styles.thankYouContainer}>
                                <Text style={styles.thankYouText}>🎉 Thank you for your feedback!</Text>
                                <Text style={styles.thankYouSubtext}>We're constantly improving our suggestions</Text>
                            </View>
                        )}
                    </GlassCard>
                </Animated.View>

                {/* Action Buttons */}
                <Animated.View
                    style={[
                        styles.actionButtons,
                        { opacity: fadeAnim }
                    ]}
                >
                    {!state.isBookmarked && (
                        <Animated.View style={{ transform: [{ scale: bookmarkAnim }] }}>
                            <Button
                                title="🔖 Save for Later"
                                onPress={handleBookmark}
                                variant="outline"
                                style={styles.bookmarkButton}
                            />
                        </Animated.View>
                    )}

                    <Button
                        title="🏠 Back to Home"
                        onPress={() => navigation.goBack()}
                        variant="primary"
                    />
                </Animated.View>
            </ScrollView>
        </GlassBackground>
    );
};

export default SuggestionScreen;
