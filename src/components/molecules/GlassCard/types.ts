import { ViewStyle } from 'react-native';

export interface GlassCardProps {
    children: React.ReactNode;
    style?: ViewStyle;
    gradient?: string[];
    padding?: number;
    borderRadius?: number;
    variant?: 'default' | 'elevated' | 'outlined' | 'vibrant';
}
