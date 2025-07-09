// Simple test to verify Firebase configuration
const { initializeApp } = require('firebase/app');
const { getAuth, createUserWithEmailAndPassword, connectAuthEmulator } = require('firebase/auth');
require('dotenv').config();

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY || "AIzaSyAIp4NBoKiRYV2CSdAjsxR1xVxsT2APVIQ",
    authDomain: process.env.FIREBASE_AUTH_DOMAIN || "nutri-food-98d8e.firebaseapp.com",
    projectId: process.env.FIREBASE_PROJECT_ID || "nutri-food-98d8e",
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "nutri-food-98d8e.appspot.com",
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "749536652057",
    appId: process.env.FIREBASE_APP_ID || "1:749536652057:web:c62e1f12c37c1bf91db388"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

console.log('Firebase app initialized:', app.name);
console.log('Auth instance:', !!auth);
console.log('Project ID:', firebaseConfig.projectId);
console.log('Auth Domain:', firebaseConfig.authDomain);

// Test auth state
auth.onAuthStateChanged((user) => {
    if (user) {
        console.log('User is signed in:', user.email);
    } else {
        console.log('User is signed out');
    }
});

console.log('Firebase test completed successfully!');
