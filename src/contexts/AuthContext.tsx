import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../services/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
});

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        // Check if we have a cached auth state
        const checkCachedAuth = async () => {
            try {
                const cachedUser = await AsyncStorage.getItem('firebase_auth_user');
                if (cachedUser) {
                    // We have cached auth, but wait for Firebase to confirm
                    console.log('Found cached auth state, waiting for Firebase confirmation...');
                }
            } catch (error) {
                console.log('Error checking cached auth:', error);
            }
        };

        checkCachedAuth();

        // Set up auth state listener
        const unsubscribe = onAuthStateChanged(auth,
            async (user) => {
                console.log('Auth state changed:', user ? `User logged in: ${user.email}` : 'No user');

                setUser(user);

                // Cache the auth state
                try {
                    if (user) {
                        await AsyncStorage.setItem('firebase_auth_user', JSON.stringify({
                            uid: user.uid,
                            email: user.email,
                            timestamp: Date.now()
                        }));
                        console.log('Auth state cached successfully');
                    } else {
                        await AsyncStorage.removeItem('firebase_auth_user');
                        console.log('Auth state cache cleared');
                    }
                } catch (error) {
                    console.log('Error caching auth state:', error);
                }

                // Always set loading to false after first auth state change
                if (isLoading) {
                    setIsLoading(false);
                }
                setIsInitialized(true);
            },
            (error) => {
                console.error('Auth state change error:', error);
                setIsLoading(false);
                setIsInitialized(true);
            }
        );

        // Timeout to prevent infinite loading
        const timeout = setTimeout(() => {
            if (!isInitialized) {
                console.log('Auth initialization timeout, proceeding...');
                setIsLoading(false);
                setIsInitialized(true);
            }
        }, 5000); // 5 second timeout

        return () => {
            unsubscribe();
            clearTimeout(timeout);
        };
    }, [isInitialized]);

    const value: AuthContextType = {
        user,
        isLoading,
        isAuthenticated: !!user,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
