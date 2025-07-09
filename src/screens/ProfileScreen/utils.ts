import { Alert } from 'react-native';
import { auth } from '../../services/firebase';
import { userProfileService, UserProfile } from '../../services/database';
import { ActivityLevel, ProfileFormData } from './types';
import * as Haptics from 'expo-haptics';

export const activityLevels: ActivityLevel[] = [
    { value: 'sedentary', label: 'Sedentary (Little to no exercise)' },
    { value: 'light', label: 'Light (Light exercise 1-3 days/week)' },
    { value: 'moderate', label: 'Moderate (Moderate exercise 3-5 days/week)' },
    { value: 'active', label: 'Active (Hard exercise 6-7 days/week)' },
    { value: 'very_active', label: 'Very Active (Physical job or 2x/day)' },
];

export const getInitialFormData = (): ProfileFormData => ({
    displayName: '',
    age: '',
    height: '',
    weight: '',
    activityLevel: 'moderate',
    location: '',
    bio: '',
    dietaryRestrictions: [],
    healthGoals: [],
});

export const mapProfileToFormData = (profile: UserProfile): ProfileFormData => ({
    displayName: profile.displayName || '',
    age: profile.age?.toString() || '',
    height: profile.height || '',
    weight: profile.weight || '',
    activityLevel: profile.activityLevel || 'moderate',
    location: profile.location || '',
    bio: profile.bio || '',
    dietaryRestrictions: profile.dietaryRestrictions || [],
    healthGoals: profile.healthGoals || [],
});

export const validateProfileForm = (formData: ProfileFormData): string | null => {
    if (!formData.displayName.trim()) {
        return 'Display name is required';
    }

    if (formData.age && (isNaN(parseInt(formData.age)) || parseInt(formData.age) < 0 || parseInt(formData.age) > 150)) {
        return 'Please enter a valid age';
    }

    return null;
};

export const saveProfile = async (
    formData: ProfileFormData,
    profile: UserProfile | null
): Promise<void> => {
    const validationError = validateProfileForm(formData);
    if (validationError) {
        throw new Error(validationError);
    }

    const profileData = {
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

export const loadUserProfile = async (): Promise<UserProfile | null> => {
    try {
        return await userProfileService.getProfile();
    } catch (error) {
        console.error('Error loading profile:', error);
        Alert.alert('Error', 'Failed to load profile');
        return null;
    }
};

export const handleLogout = async (): Promise<void> => {
    try {
        await auth.signOut();
    } catch (error) {
        console.error('Error signing out:', error);
        Alert.alert('Error', 'Failed to sign out. Please try again.');
    }
};

export const handleDeleteAccount = (): void => {
    Alert.alert(
        'Delete Account',
        'Are you sure you want to delete your account? This action cannot be undone.',
        [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Delete', style: 'destructive', onPress: confirmDeleteAccount },
        ]
    );
};

export const confirmDeleteAccount = async (): Promise<void> => {
    try {
        if (auth.currentUser) {
            await auth.currentUser.delete();
        }
    } catch (error) {
        console.error('Error deleting account:', error);
        Alert.alert('Error', 'Failed to delete account. Please try again.');
    }
};

export const getUserEmail = (): string => {
    return auth.currentUser?.email || 'No email';
};
