import { ViewStyle } from 'react-native';

export interface InputProps {
    placeholder: string;
    value: string;
    onChangeText: (text: string) => void;
    secureTextEntry?: boolean;
    label?: string;
    error?: string;
    style?: ViewStyle;
    multiline?: boolean;
    numberOfLines?: number;
    variant?: 'default' | 'outlined';
}
