import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/types';

export type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

export interface LoginFormData {
    email: string;
    password: string;
}

export interface LoginScreenState {
    email: string;
    password: string;
    loading: boolean;
    error: string;
}
