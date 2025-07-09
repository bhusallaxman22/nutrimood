import { Animated } from 'react-native';
import { SocialPost } from '../../services/database';

export interface SocialScreenProps { }

export interface PostCardProps {
    post: SocialPost;
}

export interface SocialScreenState {
    posts: SocialPost[];
    loading: boolean;
    refreshing: boolean;
    postText: string;
    posting: boolean;
    showReactions: string | null;
}

export interface AnimationRefs {
    fadeAnim: Animated.Value;
    slideAnim: Animated.Value;
}

export interface PostActions {
    handlePost: () => Promise<void>;
    handleReaction: (postId: string, emoji: string) => Promise<void>;
    onRefresh: () => Promise<void>;
    setShowReactions: (postId: string | null) => void;
}

export const REACTION_EMOJIS = ['❤️', '👍', '😊', '💪', '🎉', '🔥', '✨', '🙌'] as const;

export type ReactionEmoji = typeof REACTION_EMOJIS[number];
