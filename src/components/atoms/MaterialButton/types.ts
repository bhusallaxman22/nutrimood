import { ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export interface MaterialButtonProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'vibrant' | 'outline' | 'electric';
    size?: 'small' | 'medium' | 'large';
    disabled?: boolean;
    style?: ViewStyle;
    fullWidth?: boolean;
    icon?: keyof typeof Ionicons.glyphMap;
    gradient?: string[];
}
