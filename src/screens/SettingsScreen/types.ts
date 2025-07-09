import { UserProfile } from '../../services/database';

export interface SettingsScreenNavigationProp {
    getParent: () => { navigate: (screen: string) => void } | undefined;
}

export interface SettingsState {
    userEmail: string;
    profile: UserProfile | null;
    loading: boolean;
    saving: boolean;
    editing: boolean;
}

export interface SettingsFormData {
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

export interface SettingsSection {
    title: string;
    icon: string;
    items: SettingsItem[];
}

export interface SettingsItem {
    label: string;
    onPress: () => void;
    arrow?: boolean;
}
