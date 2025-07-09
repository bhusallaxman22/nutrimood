import { auth } from '../../services/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { SignUpFormData } from './types';

export const validateSignUpForm = (formData: SignUpFormData): string | null => {
    const { email, password, confirmPassword } = formData;

    if (!email || !password || !confirmPassword) {
        return 'Please fill in all fields';
    }

    if (password !== confirmPassword) {
        return 'Passwords do not match';
    }

    if (password.length < 6) {
        return 'Password must be at least 6 characters';
    }

    return null;
};

export const handleSignUp = async (email: string, password: string): Promise<void> => {
    console.log('Attempting to sign up with:', email);
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log('Sign up successful:', userCredential.user);
    // Don't manually navigate - let the AuthContext handle it
    // This ensures proper auth state management
};
