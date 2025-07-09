/**
 * Validation utilities
 */

export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
    return password.length >= 6;
};

export const validateRequired = (value: string): boolean => {
    return value.trim().length > 0;
};

/**
 * Date utilities
 */

export const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

export const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
    });
};

export const formatDateTime = (date: Date): string => {
    return `${formatDate(date)} at ${formatTime(date)}`;
};

export const isToday = (date: Date): boolean => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
};

/**
 * String utilities
 */

export const capitalize = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const truncate = (str: string, maxLength: number): string => {
    if (str.length <= maxLength) return str;
    return str.slice(0, maxLength - 3) + '...';
};

/**
 * Array utilities
 */

export const shuffleArray = <T>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

export const removeDuplicates = <T>(array: T[]): T[] => {
    return [...new Set(array)];
};

/**
 * Mood utilities
 */

export const getMoodEmoji = (mood: string): string => {
    const moodEmojis: { [key: string]: string } = {
        happy: '😊',
        sad: '😢',
        anxious: '😰',
        calm: '😌',
        energized: '⚡',
    };
    return moodEmojis[mood.toLowerCase()] || '😐';
};

/**
 * Storage utilities
 */

export const generateId = (): string => {
    return Math.random().toString(36).substr(2, 9);
};

/**
 * Viewport utilities
 */

import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const isSmallScreen = (): boolean => {
    return width < 375 || height < 667;
};

export const isMediumScreen = (): boolean => {
    return width >= 375 && width < 414;
};

export const isLargeScreen = (): boolean => {
    return width >= 414;
};

export const getResponsiveFontSize = (baseSize: number): number => {
    if (isSmallScreen()) return baseSize * 0.9;
    if (isLargeScreen()) return baseSize * 1.1;
    return baseSize;
};

export const createResponsiveSpacing = (baseSpacing: { [key: string]: number }) => {
    const multiplier = isSmallScreen() ? 0.8 : isLargeScreen() ? 1.2 : 1;

    const responsiveSpacing: { [key: string]: number } = {};
    Object.keys(baseSpacing).forEach(key => {
        responsiveSpacing[key] = Math.round(baseSpacing[key] * multiplier);
    });

    return responsiveSpacing;
};

export const getViewportDimensions = () => {
    return {
        width,
        height,
        isSmall: isSmallScreen(),
        isMedium: isMediumScreen(),
        isLarge: isLargeScreen(),
    };
};
