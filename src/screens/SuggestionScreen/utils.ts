export const getMoodEmoji = (mood: string): string => {
    const moodEmojis: { [key: string]: string } = {
        'stressed': '😰',
        'tired': '😴',
        'anxious': '😟',
        'sad': '😢',
        'calm': '😌',
        'happy': '😊',
        'energized': '⚡',
        'focused': '🧠',
        'relaxed': '😌',
        'motivated': '💪',
    };
    return moodEmojis[mood.toLowerCase()] || '😐';
};

export const getGoalEmoji = (goal: string): string => {
    const goalEmojis: { [key: string]: string } = {
        'lose weight': '⚖️',
        'gain muscle': '💪',
        'maintain health': '🌿',
        'increase energy': '⚡',
        'improve mood': '😊',
        'better sleep': '😴',
        'reduce stress': '🧘',
        'boost immunity': '🛡️',
    };
    return goalEmojis[goal.toLowerCase()] || '🎯';
};
