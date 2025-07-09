export const validateForm = (mood: string, goal: string): boolean => {
    return mood !== '' && goal !== '';
};

export const getSubmitButtonText = (loading: boolean): string => {
    return loading ? 'Getting Suggestion...' : 'Get Suggestion';
};
