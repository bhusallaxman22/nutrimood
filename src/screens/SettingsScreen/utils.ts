import { Alert, Linking } from 'react-native';
import { auth } from '../../services/firebase';
import { userProfileService, UserProfile } from '../../services/database';
import { SettingsFormData } from './types';
import * as Haptics from 'expo-haptics';

export const loadUserProfile = async (): Promise<{
    userEmail: string;
    profile: UserProfile | null;
}> => {
    const user = auth.currentUser;
    if (!user) {
        return { userEmail: '', profile: null };
    }

    const userEmail = user.email || '';
    try {
        const userProfile = await userProfileService.getProfile(user.uid);
        return { userEmail, profile: userProfile };
    } catch (error) {
        console.error('Error loading profile:', error);
        return { userEmail, profile: null };
    }
};

export const createFormDataFromProfile = (profile: UserProfile | null): SettingsFormData => {
    return {
        displayName: profile?.displayName || '',
        age: profile?.age?.toString() || '',
        height: profile?.height || '',
        weight: profile?.weight || '',
        activityLevel: profile?.activityLevel || 'moderate',
        location: profile?.location || '',
        bio: profile?.bio || '',
        dietaryRestrictions: profile?.dietaryRestrictions || [],
        healthGoals: profile?.healthGoals || [],
    };
};

export const saveUserProfile = async (
    formData: SettingsFormData,
    profile: UserProfile | null
): Promise<void> => {
    if (!auth.currentUser) throw new Error('No authenticated user');

    const profileData = {
        userId: auth.currentUser.uid,
        email: auth.currentUser?.email || '',
        displayName: formData.displayName.trim(),
        age: formData.age ? parseInt(formData.age) : undefined,
        height: formData.height.trim() || undefined,
        weight: formData.weight.trim() || undefined,
        activityLevel: formData.activityLevel,
        location: formData.location.trim() || undefined,
        bio: formData.bio.trim() || undefined,
        dietaryRestrictions: formData.dietaryRestrictions,
        healthGoals: formData.healthGoals,
    };

    if (profile) {
        await userProfileService.updateProfile(profileData);
    } else {
        await userProfileService.createProfile(profileData);
    }

    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
};

export const openPrivacyPolicy = (): void => {
    const url = 'https://example.com/privacy-policy'; // Replace with actual URL
    Linking.openURL(url).catch(() => {
        Alert.alert('Error', 'Unable to open privacy policy');
    });
};

export const showAboutDialog = (): void => {
    Alert.alert(
        'About Nutrition Tracker',
        'Version 1.0.0\n\nA wellness app that helps you track your mood and get personalized nutrition suggestions.\n\nDeveloped with ❤️ for your health journey.',
        [{ text: 'OK', onPress: () => { } }]
    );
};

export const handleLogout = (navigation: any): void => {
    Alert.alert(
        'Sign Out',
        'Are you sure you want to sign out?',
        [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Sign Out',
                style: 'destructive',
                onPress: () => {
                    auth.signOut().then(() => {
                        navigation.getParent()?.navigate('Login');
                    });
                },
            },
        ]
    );
};

export const handleDeleteAccount = (): void => {
    Alert.alert(
        'Delete Account',
        'This action cannot be undone. All your data will be permanently deleted.',
        [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Delete',
                style: 'destructive',
                onPress: () => {
                    // Implement account deletion logic
                    Alert.alert('Feature Coming Soon', 'Account deletion will be available in a future update.');
                },
            },
        ]
    );
};

export const getUserDisplayInfo = (profile: UserProfile | null, userEmail: string) => {
    const displayName = profile?.displayName || userEmail.split('@')[0] || 'User';
    const avatarLetter = (profile?.displayName || userEmail)?.charAt(0).toUpperCase() || '👤';

    return {
        displayName,
        avatarLetter,
        email: userEmail
    };
};

export const updateFormField = (
    field: keyof SettingsFormData,
    value: any,
    setFormData: React.Dispatch<React.SetStateAction<SettingsFormData>>
): void => {
    setFormData(prev => ({ ...prev, [field]: value }));
};
