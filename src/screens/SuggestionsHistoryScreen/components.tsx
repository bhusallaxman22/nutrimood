import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import * as Haptics from 'expo-haptics';
import { styles } from './styles';
import type { FilterButtonProps, NavigationProp } from './types';

export const FilterButton: React.FC<FilterButtonProps> = ({
    type,
    label,
    count,
    currentFilter,
    onPress
}) => (
    <TouchableOpacity
        style={[
            styles.filterButton,
            currentFilter === type && styles.activeFilterButton
        ]}
        onPress={() => {
            onPress(type);
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }}
        activeOpacity={0.7}
    >
        <Text style={[
            styles.filterButtonText,
            currentFilter === type && styles.activeFilterButtonText
        ]}>
            {label} ({count})
        </Text>
    </TouchableOpacity>
);

export const EmptyState: React.FC<{
    filter: 'all' | 'bookmarked';
    navigation: NavigationProp;
}> = ({ filter, navigation }) => (
    <View style={styles.emptyState}>
        <Text style={styles.emptyStateEmoji}>
            {filter === 'bookmarked' ? '⭐' : '🍽️'}
        </Text>
        <Text style={styles.emptyStateTitle}>
            {filter === 'bookmarked'
                ? 'No Bookmarked Suggestions'
                : 'No Suggestions Yet'
            }
        </Text>
        <Text style={styles.emptyStateSubtitle}>
            {filter === 'bookmarked'
                ? 'Bookmark suggestions you love to find them here'
                : 'Get your first AI nutrition suggestion from the home screen'
            }
        </Text>
        <TouchableOpacity
            style={styles.emptyStateButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
        >
            <Text style={styles.emptyStateButtonText}>
                Go to Home
            </Text>
        </TouchableOpacity>
    </View>
);
