import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MoodSelectorProps } from './types';
import { moods } from './utils';
import { styles } from './styles';

const MoodSelector: React.FC<MoodSelectorProps> = ({ onSelectMood }) => {
    const [selectedMood, setSelectedMood] = useState<string>('');

    const handleSelectMood = (moodName: string) => {
        setSelectedMood(moodName);
        onSelectMood(moodName);
    };

    return (
        <View style={styles.container}>
            <View style={styles.moodsGrid}>
                {moods.map((mood) => (
                    <TouchableOpacity
                        key={mood.name}
                        style={[
                            styles.moodCard,
                            selectedMood === mood.name && styles.selectedCard
                        ]}
                        onPress={() => handleSelectMood(mood.name)}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.moodEmoji}>{mood.emoji}</Text>
                        <Text style={[
                            styles.moodText,
                            selectedMood === mood.name && styles.selectedText
                        ]}>
                            {mood.name}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

export default MoodSelector;
