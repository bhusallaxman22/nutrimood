
import { initializeApp } from "firebase/app";
import { getAuth, getReactNativePersistence, initializeAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import {
    FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID
} from '@env';

const firebaseConfig = {
    apiKey: FIREBASE_API_KEY,
    authDomain: FIREBASE_AUTH_DOMAIN,
    projectId: FIREBASE_PROJECT_ID,
    storageBucket: FIREBASE_STORAGE_BUCKET,
    messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
    appId: FIREBASE_APP_ID
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);


// for web use getAuth and fro native use initializeAuth

// check if the environment is React Native or web
const isReactNative = typeof window === 'undefined' || !window.document;
// Initialize Firebase Auth with persistence
const auth = isReactNative
    ? initializeAuth(app, {
        persistence: getReactNativePersistence(ReactNativeAsyncStorage)
    })
    : getAuth(app);




// Initialize Firebase Auth with AsyncStorage persistence for React Native
// Initialize Firebase Auth
const db = getFirestore(app);

// Export the initialized services
export { auth, db };