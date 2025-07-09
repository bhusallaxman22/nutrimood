import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    ScrollView,
    StatusBar,
    TextInput,
    Animated,
    RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SocialPost } from '../../services/database';
import GlassBackground from '../../components/templates/GlassBackground';
import GlassCard from '../../components/molecules/GlassCard';
import Button from '../../components/atoms/Button';
import { colors } from '../../theme/materialDesign';
import { PostCard } from './components';
import {
    SocialScreenProps,
    SocialScreenState,
    AnimationRefs
} from './types';
import {
    createPost,
    addReaction,
    setupFeedUpdates,
    handleRefresh
} from './utils';
import { styles } from './styles';

const SocialScreen: React.FC<SocialScreenProps> = () => {
    const [posts, setPosts] = useState<SocialPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [postText, setPostText] = useState('');
    const [posting, setPosting] = useState(false);
    const [showReactions, setShowReactions] = useState<string | null>(null);

    // Animation values
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(50)).current;

    useEffect(() => {
        // Animate entrance
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 600,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }),
        ]).start();

        // Set up real-time feed updates
        const unsubscribe = setupFeedUpdates(setPosts, setLoading);
        return () => unsubscribe();
    }, [fadeAnim, slideAnim]);

    const handlePost = async () => {
        await createPost(postText, setPosting, setPostText);
    };

    const handleReaction = async (postId: string, emoji: string) => {
        await addReaction(postId, emoji);
    };

    const onRefresh = async () => {
        await handleRefresh(setRefreshing);
    };

    return (
        <GlassBackground gradient={colors.gradients.tropical} variant="vibrant">
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={styles.safeArea} edges={['top']}>
                <Animated.View
                    style={[
                        styles.container,
                        {
                            opacity: fadeAnim,
                            transform: [{ translateY: slideAnim }],
                        },
                    ]}
                >
                    {/* Compact Header */}
                    <View style={styles.header}>
                        <Text style={styles.titleText}>🌟 Social Feed</Text>
                    </View>

                    {/* Create Post Section - Always Visible */}
                    <View style={styles.createPostContainer}>
                        <GlassCard style={styles.createPostCard} variant="elevated">
                            <Text style={styles.createPostTitle}>💬 Share Your Thoughts</Text>
                            <TextInput
                                style={styles.postInput}
                                placeholder="How are you feeling today?"
                                placeholderTextColor={colors.onSurfaceVariant}
                                value={postText}
                                onChangeText={setPostText}
                                multiline
                                numberOfLines={3}
                                maxLength={280}
                                returnKeyType="default"
                                blurOnSubmit={false}
                                textAlignVertical="top"
                            />
                            <View style={styles.postActions}>
                                <Text style={styles.characterCount}>
                                    {postText.length}/280
                                </Text>
                                <Button
                                    title={posting ? "Posting..." : "Share"}
                                    onPress={handlePost}
                                    disabled={posting || !postText.trim()}
                                    style={styles.postButton}
                                />
                            </View>
                        </GlassCard>
                    </View>

                    {/* Posts Feed */}
                    <ScrollView
                        style={styles.feedContainer}
                        contentContainerStyle={styles.feedContent}
                        showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                                tintColor={colors.primary}
                                colors={[colors.primary]}
                            />
                        }
                        keyboardShouldPersistTaps="handled"
                    >
                        {loading ? (
                            <GlassCard style={styles.loadingCard} variant="elevated">
                                <Text style={styles.loadingText}>Loading social feed...</Text>
                            </GlassCard>
                        ) : posts.length === 0 ? (
                            <GlassCard style={styles.emptyCard} variant="elevated">
                                <Text style={styles.emptyEmoji}>🌱</Text>
                                <Text style={styles.emptyTitle}>No Posts Yet</Text>
                                <Text style={styles.emptyText}>
                                    Be the first to share your wellness journey!
                                </Text>
                            </GlassCard>
                        ) : (
                            posts.map((post) => (
                                <PostCard
                                    key={post.id}
                                    post={post}
                                    onReaction={handleReaction}
                                    showReactions={showReactions}
                                    setShowReactions={setShowReactions}
                                />
                            ))
                        )}
                        <View style={styles.bottomSpacer} />
                    </ScrollView>
                </Animated.View>
            </SafeAreaView>
        </GlassBackground>
    );
};

export default SocialScreen;
