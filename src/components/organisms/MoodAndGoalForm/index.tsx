import React, { useState } from 'react';
import { View, Text } from 'react-native';
import MoodSelector from '../../molecules/MoodSelector';
import GoalSelector from '../../molecules/GoalSelector';
import Button from '../../atoms/Button';
import { MoodAndGoalFormProps } from './types';
import { validateForm, getSubmitButtonText } from './utils';
import { styles } from './styles';

const MoodAndGoalForm: React.FC<MoodAndGoalFormProps> = ({ onSubmit, loading }) => {
    const [mood, setMood] = useState('');
    const [goal, setGoal] = useState('');

    const handleSubmit = () => {
        if (validateForm(mood, goal)) {
            onSubmit(mood, goal);
        }
    };

    const canSubmit = validateForm(mood, goal);

    return (
        <View style={styles.container}>
            <Text style={styles.label}>How are you feeling today?</Text>
            <MoodSelector onSelectMood={setMood} />
            <Text style={styles.label}>What's your primary goal?</Text>
            <GoalSelector onSelectGoal={setGoal} />
            <Button
                title={getSubmitButtonText(loading)}
                onPress={handleSubmit}
                disabled={!canSubmit || loading}
                style={styles.button}
                icon="arrow-forward-circle-outline"
            />
        </View>
    );
};

export default MoodAndGoalForm;
