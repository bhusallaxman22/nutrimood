export interface SignUpFormData {
    email: string;
    password: string;
    confirmPassword: string;
}

export interface SignUpState {
    loading: boolean;
    error: string;
}

export interface SignUpScreenNavigationProp {
    navigate: (screen: string) => void;
}
