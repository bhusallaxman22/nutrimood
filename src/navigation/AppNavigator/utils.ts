import AsyncStorage from '@react-native-async-storage/async-storage';

export const checkOnboardingStatus = async (): Promise<boolean> => {
    try {
        const hasSeenIt = await AsyncStorage.getItem('hasSeenOnboarding');
        return hasSeenIt === 'true';
    } catch (error) {
        console.error('Error checking onboarding status:', error);
        return false;
    }
};

export const setOnboardingComplete = async (): Promise<void> => {
    try {
        await AsyncStorage.setItem('hasSeenOnboarding', 'true');
    } catch (error) {
        console.error('Error setting onboarding status:', error);
    }
};

export const logAuthState = (user: any, isLoading: boolean, isAuthenticated: boolean, hasSeenOnboarding: boolean | null): void => {
    console.log('AppNavigator - Auth state:', {
        user: !!user,
        userEmail: user?.email,
        isLoading,
        isAuthenticated,
        hasSeenOnboarding
    });
};
