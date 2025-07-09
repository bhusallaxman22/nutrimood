// User related types
export interface User {
    id: string;
    email: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

// Mood related types
export interface MoodEntry {
    id: string;
    userId: string;
    mood: string;
    timestamp: Date;
    notes?: string;
}

export interface MoodNutrition {
    foods: string[];
    nutrients: string[];
}

export interface MoodNutritionMap {
    [moodName: string]: MoodNutrition;
}

// Goal related types
export interface Goal {
    id: string;
    name: string;
    description: string;
    emoji: string;
    userId: string;
    createdAt: Date;
}

// Suggestion related types
export interface NutritionSuggestion {
    id: string;
    userId: string;
    mood: string;
    goal: string;
    content: string;
    foods: string[];
    nutrients: string[];
    timestamp: Date;
    rating?: number;
}

// Navigation types
export interface NavigationParams {
    [key: string]: any;
}

// API response types
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
}

// Theme types
export interface ThemeColors {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    error: string;
    text: string;
}

// Form types
export interface FormField {
    value: string;
    error?: string;
    touched?: boolean;
}
