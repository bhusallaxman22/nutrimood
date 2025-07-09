import {
    collection,
    addDoc,
    doc,
    setDoc,
    getDoc,
    getDocs,
    query,
    where,
    orderBy,
    limit,
    serverTimestamp,
    updateDoc,
    arrayUnion,
    arrayRemove,
    increment,
    onSnapshot,
    Timestamp
} from 'firebase/firestore';
import { auth, db } from './firebase';
import { NutritionSuggestion } from './openai';

// Types for database collections
export interface UserProfile {
    id: string;
    email: string;
    displayName: string;
    age?: number;
    height?: string;
    weight?: string;
    activityLevel?: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
    dietaryRestrictions?: string[];
    healthGoals?: string[];
    location?: string;
    bio?: string;
    avatarUrl?: string;
    createdAt: Timestamp;
    updatedAt: Timestamp;
}

export interface MoodEntry {
    id?: string;
    userId: string;
    mood: string;
    goal: string;
    timestamp: Timestamp;
    thoughts?: string;
    energyLevel?: number; // 1-5
    stressLevel?: number; // 1-5
    sleepHours?: number;
}

export interface Suggestion {
    id?: string;
    userId: string;
    mood: string;
    goal: string;
    itemName: string;
    category: 'breakfast' | 'lunch' | 'dinner' | 'snack';
    description?: string;
    nutritionInfo?: {
        calories?: number;
        protein?: number;
        carbs?: number;
        fat?: number;
    };
    timestamp: Timestamp;
    isBookmarked?: boolean;
}

export interface SocialPost {
    id?: string;
    userId: string;
    userDisplayName: string;
    userAvatar?: string;
    content: string;
    mood: string;
    goal: string;
    timestamp: Timestamp;
    reactions: {
        [emoji: string]: {
            count: number;
            userIds: string[];
        };
    };
    commentsCount: number;
    isAnonymous?: boolean;
}

export interface PostReaction {
    id?: string;
    postId: string;
    userId: string;
    emoji: string;
    timestamp: Timestamp;
}

export interface Comment {
    id?: string;
    postId: string;
    userId: string;
    userDisplayName: string;
    content: string;
    timestamp: Timestamp;
    reactions: {
        [emoji: string]: number;
    };
}

export interface SavedSuggestion {
    id?: string;
    userId: string;
    mood: string;
    goal: string;
    suggestion: NutritionSuggestion;
    timestamp: Timestamp;
    isBookmarked: boolean;
    notes?: string;
}

// User Profile Services
export const userProfileService = {
    async createProfile(profileData: Omit<UserProfile, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
        if (!auth.currentUser) throw new Error('User not authenticated');

        const docRef = doc(db, 'userProfiles', auth.currentUser.uid);
        const profileWithTimestamps: Omit<UserProfile, 'id'> = {
            ...profileData,
            createdAt: serverTimestamp() as Timestamp,
            updatedAt: serverTimestamp() as Timestamp,
        };

        await setDoc(docRef, profileWithTimestamps);
        return auth.currentUser.uid;
    },

    async updateProfile(updates: Partial<UserProfile>): Promise<void> {
        if (!auth.currentUser) throw new Error('User not authenticated');

        const docRef = doc(db, 'userProfiles', auth.currentUser.uid);
        await updateDoc(docRef, {
            ...updates,
            updatedAt: serverTimestamp(),
        });
    },

    async getProfile(userId?: string): Promise<UserProfile | null> {
        const uid = userId || auth.currentUser?.uid;
        if (!uid) throw new Error('User not authenticated');

        const docRef = doc(db, 'userProfiles', uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() } as UserProfile;
        }
        return null;
    },

    onProfileChange(callback: (profile: UserProfile | null) => void): () => void {
        if (!auth.currentUser) throw new Error('User not authenticated');

        const docRef = doc(db, 'userProfiles', auth.currentUser.uid);
        return onSnapshot(docRef, (doc) => {
            if (doc.exists()) {
                callback({ id: doc.id, ...doc.data() } as UserProfile);
            } else {
                callback(null);
            }
        });
    }
};

// Mood Entry Services
export const moodService = {
    async addMoodEntry(mood: string, goal: string, additionalData?: Partial<MoodEntry>): Promise<string> {
        if (!auth.currentUser) throw new Error('User not authenticated');

        const moodData: Omit<MoodEntry, 'id'> = {
            userId: auth.currentUser.uid,
            mood,
            goal,
            timestamp: serverTimestamp() as Timestamp,
            ...additionalData,
        };

        const docRef = await addDoc(collection(db, 'moods'), moodData);
        return docRef.id;
    },

    async getMoodHistory(limit = 50): Promise<MoodEntry[]> {
        if (!auth.currentUser) throw new Error('User not authenticated');

        const q = query(
            collection(db, 'moods'),
            where('userId', '==', auth.currentUser.uid),
            orderBy('timestamp', 'desc')
        );

        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as MoodEntry[];
    },

    async getMoodStats(timeRange: '7days' | '30days' | 'all' = '30days'): Promise<{ [mood: string]: number }> {
        if (!auth.currentUser) throw new Error('User not authenticated');

        let startDate: Date | null = null;
        if (timeRange === '7days') {
            startDate = new Date();
            startDate.setDate(startDate.getDate() - 7);
        } else if (timeRange === '30days') {
            startDate = new Date();
            startDate.setDate(startDate.getDate() - 30);
        }

        let q = query(
            collection(db, 'moods'),
            where('userId', '==', auth.currentUser.uid),
            orderBy('timestamp', 'desc')
        );

        if (startDate) {
            q = query(q, where('timestamp', '>=', Timestamp.fromDate(startDate)));
        }

        const querySnapshot = await getDocs(q);
        const stats: { [mood: string]: number } = {};

        querySnapshot.docs.forEach(doc => {
            const data = doc.data() as MoodEntry;
            stats[data.mood] = (stats[data.mood] || 0) + 1;
        });

        return stats;
    }
};

// Suggestions Services
export const suggestionsService = {
    async saveSuggestion(
        mood: string,
        goal: string,
        itemName: string,
        category: 'breakfast' | 'lunch' | 'dinner' | 'snack',
        additionalData?: Partial<Suggestion>
    ): Promise<string> {
        if (!auth.currentUser) throw new Error('User not authenticated');

        const suggestionData: Omit<Suggestion, 'id'> = {
            userId: auth.currentUser.uid,
            mood,
            goal,
            itemName,
            category,
            timestamp: serverTimestamp() as Timestamp,
            ...additionalData,
        };

        const docRef = await addDoc(collection(db, 'suggestions'), suggestionData);
        return docRef.id;
    },

    async getUserSuggestions(limit = 50): Promise<Suggestion[]> {
        if (!auth.currentUser) throw new Error('User not authenticated');

        const q = query(
            collection(db, 'suggestions'),
            where('userId', '==', auth.currentUser.uid),
            orderBy('timestamp', 'desc')
        );

        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as Suggestion[];
    },

    async toggleBookmark(suggestionId: string, isBookmarked: boolean): Promise<void> {
        const docRef = doc(db, 'suggestions', suggestionId);
        await updateDoc(docRef, { isBookmarked });
    },

    async getBookmarkedSuggestions(): Promise<Suggestion[]> {
        if (!auth.currentUser) throw new Error('User not authenticated');

        const q = query(
            collection(db, 'suggestions'),
            where('userId', '==', auth.currentUser.uid),
            where('isBookmarked', '==', true),
            orderBy('timestamp', 'desc')
        );

        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as Suggestion[];
    }
};

// Social Services
export const socialService = {
    async createPost(
        content: string,
        mood: string,
        goal: string,
        isAnonymous = false
    ): Promise<string> {
        if (!auth.currentUser) throw new Error('User not authenticated');

        let userProfile;
        try {
            userProfile = await userProfileService.getProfile();
        } catch (error) {
            console.log('Error fetching user profile, using fallback:', error);
            userProfile = null;
        }

        const displayName = isAnonymous
            ? 'Anonymous'
            : (userProfile?.displayName || auth.currentUser.displayName || auth.currentUser.email?.split('@')[0] || 'User');

        const postData: Omit<SocialPost, 'id'> = {
            userId: auth.currentUser.uid,
            userDisplayName: displayName,
            userAvatar: isAnonymous ? undefined : userProfile?.avatarUrl,
            content,
            mood,
            goal,
            timestamp: serverTimestamp() as Timestamp,
            reactions: {},
            commentsCount: 0,
            isAnonymous,
        };

        console.log('Creating post with data:', postData);
        const docRef = await addDoc(collection(db, 'socialPosts'), postData);
        console.log('Post created successfully with ID:', docRef.id);
        return docRef.id;
    },

    async getFeedPosts(limit = 20): Promise<SocialPost[]> {
        const q = query(
            collection(db, 'socialPosts'),
            orderBy('timestamp', 'desc')
        );

        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as SocialPost[];
    },

    async getUserPosts(userId?: string): Promise<SocialPost[]> {
        const uid = userId || auth.currentUser?.uid;
        if (!uid) throw new Error('User not authenticated');

        const q = query(
            collection(db, 'socialPosts'),
            where('userId', '==', uid),
            orderBy('timestamp', 'desc')
        );

        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as SocialPost[];
    },

    async addReaction(postId: string, emoji: string): Promise<void> {
        if (!auth.currentUser) throw new Error('User not authenticated');

        const postRef = doc(db, 'socialPosts', postId);
        const postDoc = await getDoc(postRef);

        if (!postDoc.exists()) throw new Error('Post not found');

        const postData = postDoc.data() as SocialPost;
        const reactions = postData.reactions || {};

        // Remove user from all other emoji reactions first
        Object.keys(reactions).forEach(existingEmoji => {
            if (existingEmoji !== emoji && reactions[existingEmoji].userIds.includes(auth.currentUser!.uid)) {
                reactions[existingEmoji].userIds = reactions[existingEmoji].userIds.filter(id => id !== auth.currentUser!.uid);
                reactions[existingEmoji].count = Math.max(0, reactions[existingEmoji].count - 1);
            }
        });

        // Toggle the selected emoji
        if (!reactions[emoji]) {
            reactions[emoji] = { count: 0, userIds: [] };
        }

        const userIndex = reactions[emoji].userIds.indexOf(auth.currentUser.uid);
        if (userIndex > -1) {
            // Remove reaction
            reactions[emoji].userIds.splice(userIndex, 1);
            reactions[emoji].count = Math.max(0, reactions[emoji].count - 1);
        } else {
            // Add reaction
            reactions[emoji].userIds.push(auth.currentUser.uid);
            reactions[emoji].count += 1;
        }

        await updateDoc(postRef, { reactions });
    },

    async removeReaction(postId: string, emoji: string): Promise<void> {
        if (!auth.currentUser) throw new Error('User not authenticated');

        const postRef = doc(db, 'socialPosts', postId);
        const postDoc = await getDoc(postRef);

        if (!postDoc.exists()) throw new Error('Post not found');

        const postData = postDoc.data() as SocialPost;
        const reactions = postData.reactions || {};

        if (reactions[emoji] && reactions[emoji].userIds.includes(auth.currentUser!.uid)) {
            reactions[emoji].userIds = reactions[emoji].userIds.filter(id => id !== auth.currentUser!.uid);
            reactions[emoji].count = Math.max(0, reactions[emoji].count - 1);

            await updateDoc(postRef, { reactions });
        }
    },

    onFeedUpdates(callback: (posts: SocialPost[]) => void): () => void {
        const q = query(
            collection(db, 'socialPosts'),
            orderBy('timestamp', 'desc')
        );

        return onSnapshot(q, (querySnapshot) => {
            const posts = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as SocialPost[];
            callback(posts);
        });
    }
};

// Analytics Services
export const analyticsService = {
    async getMoodTrends(days = 30): Promise<{ date: string; mood: string; value: number }[]> {
        if (!auth.currentUser) throw new Error('User not authenticated');

        const startDate = new Date();
        startDate.setDate(startDate.getDate() - days);

        const q = query(
            collection(db, 'moods'),
            where('userId', '==', auth.currentUser.uid),
            where('timestamp', '>=', Timestamp.fromDate(startDate)),
            orderBy('timestamp', 'asc')
        );

        const querySnapshot = await getDocs(q);
        const moodValues: { [mood: string]: number } = {
            'Sad': 1,
            'Anxious': 2,
            'Calm': 3,
            'Happy': 4,
            'Energized': 5,
            'Stressed': 2,
            'Tired': 2,
            'Focused': 4,
        };

        return querySnapshot.docs.map(doc => {
            const data = doc.data() as MoodEntry;
            return {
                date: data.timestamp.toDate().toISOString().split('T')[0],
                mood: data.mood,
                value: moodValues[data.mood] || 3
            };
        });
    },

    async getWeeklyMoodSummary(): Promise<{ [day: string]: { mood: string; count: number } }> {
        if (!auth.currentUser) throw new Error('User not authenticated');

        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 7);

        const q = query(
            collection(db, 'moods'),
            where('userId', '==', auth.currentUser.uid),
            where('timestamp', '>=', Timestamp.fromDate(startDate)),
            orderBy('timestamp', 'desc')
        );

        const querySnapshot = await getDocs(q);
        const weeklyData: { [day: string]: { [mood: string]: number } } = {};

        querySnapshot.docs.forEach(doc => {
            const data = doc.data() as MoodEntry;
            const day = data.timestamp.toDate().toLocaleDateString('en-US', { weekday: 'short' });

            if (!weeklyData[day]) {
                weeklyData[day] = {};
            }

            weeklyData[day][data.mood] = (weeklyData[day][data.mood] || 0) + 1;
        });

        // Convert to most frequent mood per day
        const summary: { [day: string]: { mood: string; count: number } } = {};
        Object.keys(weeklyData).forEach(day => {
            const dayMoods = weeklyData[day];
            const mostFrequent = Object.entries(dayMoods).reduce((a, b) =>
                dayMoods[a[0]] > dayMoods[b[0]] ? a : b
            );
            summary[day] = { mood: mostFrequent[0], count: mostFrequent[1] };
        });

        return summary;
    }
};

// Nutrition suggestions service
export const nutritionSuggestionsService = {
    // Save a new nutrition suggestion
    saveSuggestion: async (suggestionData: Omit<SavedSuggestion, 'id' | 'timestamp' | 'userId'>): Promise<string> => {
        const user = auth.currentUser;
        if (!user) throw new Error('User not authenticated');

        const suggestionDoc = {
            ...suggestionData,
            userId: user.uid,
            timestamp: serverTimestamp(),
        };

        const docRef = await addDoc(collection(db, 'nutrition_suggestions'), suggestionDoc);
        return docRef.id;
    },

    // Get user's saved suggestions
    getUserSuggestions: async (limitCount: number = 20): Promise<SavedSuggestion[]> => {
        const user = auth.currentUser;
        if (!user) throw new Error('User not authenticated');

        const q = query(
            collection(db, 'nutrition_suggestions'),
            where('userId', '==', user.uid),
            orderBy('timestamp', 'desc'),
            limit(limitCount)
        );

        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as SavedSuggestion));
    },

    // Get recent suggestions for home screen
    getRecentSuggestions: async (limitCount: number = 5): Promise<SavedSuggestion[]> => {
        const user = auth.currentUser;
        if (!user) throw new Error('User not authenticated');

        const q = query(
            collection(db, 'nutrition_suggestions'),
            where('userId', '==', user.uid),
            orderBy('timestamp', 'desc'),
            limit(limitCount)
        );

        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as SavedSuggestion));
    },

    // Update bookmark status
    updateBookmark: async (suggestionId: string, isBookmarked: boolean): Promise<void> => {
        const suggestionRef = doc(db, 'nutrition_suggestions', suggestionId);
        await updateDoc(suggestionRef, {
            isBookmarked,
            updatedAt: serverTimestamp()
        });
    },

    // Get bookmarked suggestions
    getBookmarkedSuggestions: async (): Promise<SavedSuggestion[]> => {
        const user = auth.currentUser;
        if (!user) throw new Error('User not authenticated');

        const q = query(
            collection(db, 'nutrition_suggestions'),
            where('userId', '==', user.uid),
            where('isBookmarked', '==', true),
            orderBy('timestamp', 'desc')
        );

        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as SavedSuggestion));
    },

    // Add notes to a suggestion
    addNotes: async (suggestionId: string, notes: string): Promise<void> => {
        const suggestionRef = doc(db, 'nutrition_suggestions', suggestionId);
        await updateDoc(suggestionRef, {
            notes,
            updatedAt: serverTimestamp()
        });
    },
};

export default {
    userProfile: userProfileService,
    mood: moodService,
    suggestions: suggestionsService,
    social: socialService,
    analytics: analyticsService,
    nutritionSuggestions: nutritionSuggestionsService,
};
