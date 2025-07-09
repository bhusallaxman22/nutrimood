import { Alert, Share, Animated } from 'react-native';
import * as Haptics from 'expo-haptics';
import { collection, addDoc } from 'firebase/firestore';
import { db, auth } from '../../services/firebase';
import { nutritionSuggestionsService } from '../../services/database';
import { NutritionSuggestion } from '../../services/openai';
import type { FeedbackType, SuggestionScreenNavigationProp } from './types';

export const handleFeedback = async (
    feedback: FeedbackType,
    mood: string,
    goal: string,
    suggestion: NutritionSuggestion,
    setFeedbackGiven: (value: boolean) => void,
    navigation: SuggestionScreenNavigationProp
): Promise<void> => {
    // Haptic feedback for interaction
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
            setFeedbackGiven(true);

            // Success haptic
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

export const handleBookmark = async (
    mood: string,
    goal: string,
    suggestion: NutritionSuggestion,
    setIsBookmarked: (value: boolean) => void,
    bookmarkAnim: Animated.Value
): Promise<void> => {
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
            await nutritionSuggestionsService.saveSuggestion({
                mood,
                goal,
                suggestion,
                isBookmarked: true,
            });
            setIsBookmarked(true);
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            Alert.alert('✅ Bookmarked!', 'You can find this suggestion in your saved items.');
        }
    } catch (error) {
        console.error('Error bookmarking suggestion:', error);
        Alert.alert('Error', 'Could not bookmark this suggestion.');
    }
};

export const handleShare = async (suggestion: NutritionSuggestion): Promise<void> => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    const shareText = `${suggestion.title} ${suggestion.emoji}\n\n${suggestion.meal.name} - ${suggestion.meal.description}\n\nPrep time: ${suggestion.meal.prepTime}\n\nShared from Nutrition Mood App`;

    try {
        await Share.share({
            message: shareText,
            title: suggestion.title,
        });
    } catch (error) {
        console.error('Error sharing:', error);
    }
};

export const startAnimations = (
    fadeAnim: Animated.Value,
    slideAnim: Animated.Value,
    scaleAnim: Animated.Value,
    headerAnim: Animated.Value
): void => {
    // Animate components in with enhanced timing
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

    // Success haptic for receiving suggestion
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
};
