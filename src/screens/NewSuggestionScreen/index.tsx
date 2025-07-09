import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    Alert,
    ScrollView,
    StatusBar,
    Animated,
    TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Button from '../../components/atoms/Button';
import GlassBackground from '../../components/templates/GlassBackground';
import GlassCard from '../../components/molecules/GlassCard';
import { colors } from '../../theme/materialDesign';
import { styles } from './styles';
import { handleFeedback, handleBookmark, handleShare, startAnimations } from './utils';
import type { SuggestionScreenProps, NewSuggestionState, SuggestionScreenNavigationProp } from './types';

const NewSuggestionScreen: React.FC<SuggestionScreenProps> = ({ route }) => {
    const { suggestion, mood, goal } = route.params;
    const navigation = useNavigation<SuggestionScreenNavigationProp>();

    const [state, setState] = useState<NewSuggestionState>({
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
        startAnimations(fadeAnim, slideAnim, scaleAnim, headerAnim);
    }, []);

    const onFeedback = (feedback: 'helpful' | 'not_helpful') => {
        handleFeedback(
            feedback,
            mood,
            goal,
            suggestion,
            (value: boolean) => setState(prev => ({ ...prev, feedbackGiven: value })),
            navigation
        );
    };

    const onBookmark = () => {
        handleBookmark(
            mood,
            goal,
            suggestion,
            (value: boolean) => setState(prev => ({ ...prev, isBookmarked: value })),
            bookmarkAnim
        );
    };

    const onShare = () => {
        handleShare(suggestion);
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
                        <Text style={styles.headerTitle}>{suggestion.title}</Text>
                        <Text style={styles.headerSubtitle}>For {mood} • {goal}</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.shareButton}
                        onPress={onShare}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                        <Text style={styles.shareIcon}>↗</Text>
                    </TouchableOpacity>
                </Animated.View>

                {/* Main Suggestion Card */}
                <Animated.View
                    style={[
                        {
                            opacity: fadeAnim,
                            transform: [{ scale: scaleAnim }]
                        }
                    ]}
                >
                    <GlassCard style={styles.mainCard} variant="elevated">
                        <View style={styles.mealHeader}>
                            <Text style={styles.mealEmoji}>{suggestion.emoji}</Text>
                            <View style={styles.mealInfo}>
                                <Text style={styles.mealName}>{suggestion.meal.name}</Text>
                                <Text style={styles.mealDescription}>{suggestion.meal.description}</Text>
                                <Text style={styles.prepTime}>⏱ {suggestion.meal.prepTime}</Text>
                            </View>
                        </View>
                    </GlassCard>
                </Animated.View>

                {/* Ingredients Section */}
                <Animated.View style={{ opacity: fadeAnim }}>
                    <GlassCard style={styles.sectionCard} variant="default">
                        <Text style={styles.sectionTitle}>🥗 Key Ingredients</Text>
                        {suggestion.ingredients.map((ingredient, index) => (
                            <View key={index} style={styles.ingredientItem}>
                                <Text style={styles.ingredientEmoji}>{ingredient.emoji}</Text>
                                <View style={styles.ingredientInfo}>
                                    <Text style={styles.ingredientName}>{ingredient.name}</Text>
                                    <Text style={styles.ingredientBenefit}>{ingredient.benefit}</Text>
                                </View>
                            </View>
                        ))}
                    </GlassCard>
                </Animated.View>

                {/* Timing Section */}
                <Animated.View style={{ opacity: fadeAnim }}>
                    <GlassCard style={styles.sectionCard} variant="default">
                        <Text style={styles.sectionTitle}>⏰ Optimal Timing</Text>
                        <Text style={styles.timingWhen}>{suggestion.timing.when}</Text>
                        <Text style={styles.timingWhy}>{suggestion.timing.why}</Text>
                    </GlassCard>
                </Animated.View>

                {/* Preparation Steps */}
                <Animated.View style={{ opacity: fadeAnim }}>
                    <GlassCard style={styles.sectionCard} variant="default">
                        <Text style={styles.sectionTitle}>👨‍🍳 Quick Preparation</Text>
                        {suggestion.preparation.map((step, index) => (
                            <View key={index} style={styles.stepItem}>
                                <View style={styles.stepNumber}>
                                    <Text style={styles.stepNumberText}>{index + 1}</Text>
                                </View>
                                <Text style={styles.stepText}>{step}</Text>
                            </View>
                        ))}
                    </GlassCard>
                </Animated.View>

                {/* Tips Section */}
                <Animated.View style={{ opacity: fadeAnim }}>
                    <GlassCard style={styles.sectionCard} variant="default">
                        <Text style={styles.sectionTitle}>💡 Pro Tips</Text>
                        {suggestion.tips.map((tip, index) => (
                            <View key={index} style={styles.tipItem}>
                                <Text style={styles.tipBullet}>•</Text>
                                <Text style={styles.tipText}>{tip}</Text>
                            </View>
                        ))}
                    </GlassCard>
                </Animated.View>

                {/* Nutrition Info */}
                <Animated.View style={{ opacity: fadeAnim }}>
                    <GlassCard style={styles.nutritionCard} variant="default">
                        <Text style={styles.sectionTitle}>📊 Nutrition Overview</Text>
                        <View style={styles.nutritionRow}>
                            <Text style={styles.caloriesLabel}>Calories:</Text>
                            <Text style={styles.caloriesValue}>{suggestion.nutrition.calories}</Text>
                        </View>
                        <View style={styles.nutrientsContainer}>
                            <Text style={styles.nutrientsLabel}>Key Nutrients:</Text>
                            <View style={styles.nutrientTags}>
                                {suggestion.nutrition.mainNutrients.map((nutrient, index) => (
                                    <View key={index} style={styles.nutrientTag}>
                                        <Text style={styles.nutrientTagText}>{nutrient}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>
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
                                onPress={onBookmark}
                                variant="outline"
                                style={styles.actionButton}
                            />
                        </Animated.View>
                    )}

                    {!state.feedbackGiven && (
                        <View style={styles.feedbackButtons}>
                            <Button
                                title="👍 Helpful"
                                onPress={() => onFeedback('helpful')}
                                variant="primary"
                                style={styles.actionButton}
                            />
                            <Button
                                title="👎 Not Helpful"
                                onPress={() => onFeedback('not_helpful')}
                                variant="outline"
                                style={styles.actionButton}
                            />
                        </View>
                    )}

                    <Button
                        title="🏠 Back to Home"
                        onPress={() => navigation.goBack()}
                        variant="primary"
                        style={styles.backToHomeButton}
                    />
                </Animated.View>
            </ScrollView>
        </GlassBackground>
    );
};

export default NewSuggestionScreen;
