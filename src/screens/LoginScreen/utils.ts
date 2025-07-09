import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../services/firebase';
import { LoginFormData } from './types';

export const validateLoginForm = (email: string, password: string): string | null => {
    if (!email || !password) {
        return 'Please fill in all fields';
    }

    if (!email.includes('@')) {
        return 'Please enter a valid email address';
    }

    if (password.length < 6) {
        return 'Password must be at least 6 characters';
    }

    return null;
};

export const loginUser = async (formData: LoginFormData): Promise<void> => {
    const { email, password } = formData;
    await signInWithEmailAndPassword(auth, email, password);
};

export const getErrorMessage = (error: any): string => {
    if (error.code === 'auth/user-not-found') {
        return 'No account found with this email address';
    }
    if (error.code === 'auth/wrong-password') {
        return 'Incorrect password';
    }
    if (error.code === 'auth/invalid-email') {
        return 'Invalid email address';
    }
    return error.message || 'An error occurred during login';
};
