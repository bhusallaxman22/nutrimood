import { Alert } from 'react-native';
import * as Haptics from 'expo-haptics';
import { socialService } from '../../services/database';

/**
 * Formats a timestamp to a human-readable time ago string
 */
export const formatTimeAgo = (timestamp: any): string => {
    const date = timestamp.toDate();
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;

    return date.toLocaleDateString();
};

/**
 * Creates a new post with the given text
 */
export const createPost = async (
    postText: string,
    setPosting: (posting: boolean) => void,
    setPostText: (text: string) => void
): Promise<void> => {
    if (!postText.trim()) {
        Alert.alert('Error', 'Please enter some text to post');
        return;
    }

    setPosting(true);
    console.log('Creating post with text:', postText.trim());

    try {
        // For now, we'll use default values for mood and goal
        // In a real app, you might want to let users select these
        const postId = await socialService.createPost(postText.trim(), 'Happy', 'General Wellness');
        console.log('Post created successfully with ID:', postId);

        setPostText('');
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        Alert.alert('Success', 'Your post has been shared! It should appear in the feed shortly.');
    } catch (error) {
        console.error('Error creating post:', error);
        let errorMessage = 'Unknown error';
        if (error instanceof Error) {
            errorMessage = error.message;
        } else if (typeof error === 'string') {
            errorMessage = error;
        }
        Alert.alert('Error', `Failed to create post: ${errorMessage}`);
    } finally {
        setPosting(false);
    }
};

/**
 * Adds a reaction to a post
 */
export const addReaction = async (postId: string, emoji: string): Promise<void> => {
    try {
        await socialService.addReaction(postId, emoji);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch (error) {
        console.error('Error adding reaction:', error);
    }
};

/**
 * Sets up real-time feed updates and returns the unsubscribe function
 */
export const setupFeedUpdates = (
    setPosts: (posts: any[]) => void,
    setLoading: (loading: boolean) => void
) => {
    return socialService.onFeedUpdates((updatedPosts) => {
        setPosts(updatedPosts);
        setLoading(false);
    });
};

/**
 * Handles refresh functionality
 */
export const handleRefresh = async (
    setRefreshing: (refreshing: boolean) => void
): Promise<void> => {
    setRefreshing(true);
    // The real-time listener will update the posts automatically
    setTimeout(() => setRefreshing(false), 1000);
};
