import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { GoalSelectorProps } from './types';
import { goals } from './utils';
import { styles } from './styles';

const GoalSelector: React.FC<GoalSelectorProps> = ({ onSelectGoal }) => {
    const [selectedGoal, setSelectedGoal] = useState<string>('');

    const handleSelectGoal = (goalName: string) => {
        setSelectedGoal(goalName);
        onSelectGoal(goalName);
    };

    return (
        <View style={styles.container}>
            <View style={styles.goalsGrid}>
                {goals.map((goal) => (
                    <TouchableOpacity
                        key={goal.name}
                        style={[
                            styles.goalCard,
                            selectedGoal === goal.name && styles.selectedCard
                        ]}
                        onPress={() => handleSelectGoal(goal.name)}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.goalEmoji}>{goal.emoji}</Text>
                        <Text style={[
                            styles.goalTitle,
                            selectedGoal === goal.name && styles.selectedTitle
                        ]}>
                            {goal.name}
                        </Text>
                        <Text style={[
                            styles.goalDescription,
                            selectedGoal === goal.name && styles.selectedDescription
                        ]}>
                            {goal.description}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

export default GoalSelector;
