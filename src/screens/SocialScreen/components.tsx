import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import GlassCard from '../../components/molecules/GlassCard';
import { PostCardProps, REACTION_EMOJIS } from './types';
import { formatTimeAgo } from './utils';
import { styles } from './styles';

export const PostCard: React.FC<PostCardProps & {
    onReaction: (postId: string, emoji: string) => void;
    showReactions: string | null;
    setShowReactions: (postId: string | null) => void;
}> = ({ post, onReaction, showReactions, setShowReactions }) => {
    const hasReactions = post.reactions && Object.keys(post.reactions).length > 0;

    return (
        <GlassCard style={styles.postCard} variant="elevated">
            <View style={styles.postHeader}>
                <View style={styles.avatarContainer}>
                    <Text style={styles.avatarText}>
                        {post.userDisplayName?.charAt(0).toUpperCase() || '?'}
                    </Text>
                </View>
                <View style={styles.postInfo}>
                    <Text style={styles.authorName}>{post.userDisplayName || 'Anonymous'}</Text>
                    <Text style={styles.postTime}>{formatTimeAgo(post.timestamp)}</Text>
                </View>
            </View>

            <Text style={styles.postContent}>{post.content}</Text>

            {/* Reactions Display */}
            {hasReactions && (
                <View style={styles.reactionsDisplay}>
                    {Object.entries(post.reactions).map(([emoji, data]) => (
                        <TouchableOpacity
                            key={emoji}
                            style={styles.reactionChip}
                            onPress={() => post.id && onReaction(post.id, emoji)}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.reactionEmoji}>{emoji}</Text>
                            <Text style={styles.reactionCount}>{data.count}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}

            {/* Reaction Buttons */}
            <View style={styles.actionsContainer}>
                <TouchableOpacity
                    style={styles.reactButton}
                    onPress={() => setShowReactions(showReactions === post.id ? null : (post.id || null))}
                    activeOpacity={0.7}
                >
                    <Text style={styles.reactButtonText}>
                        {showReactions === post.id ? '✨ Close' : '✨ React'}
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Reaction Picker */}
            {showReactions === post.id && (
                <View style={styles.reactionPicker}>
                    {REACTION_EMOJIS.map((emoji) => (
                        <TouchableOpacity
                            key={emoji}
                            style={styles.reactionOption}
                            onPress={() => {
                                if (post.id) {
                                    onReaction(post.id, emoji);
                                    setShowReactions(null);
                                }
                            }}
                            activeOpacity={0.6}
                        >
                            <Text style={styles.reactionOptionEmoji}>{emoji}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
        </GlassCard>
    );
};
