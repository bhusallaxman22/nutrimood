import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/types';
import { UserProfile } from '../../services/database';

export type SettingsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'MainTabs'>;

export interface ProfileFormData {
    displayName: string;
    age: string;
    height: string;
    weight: string;
    activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
    location: string;
    bio: string;
    dietaryRestrictions: string[];
    healthGoals: string[];
}

export interface ActivityLevel {
    value: string;
    label: string;
}

export interface ProfileScreenState {
    userEmail: string;
    profile: UserProfile | null;
    loading: boolean;
    saving: boolean;
    editing: boolean;
    formData: ProfileFormData;
}

export type ProfileState = ProfileScreenState;
