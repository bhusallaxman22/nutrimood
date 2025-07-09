export interface Mood {
    name: string;
    emoji: string;
    color: string;
}

export interface MoodSelectorProps {
    onSelectMood: (mood: string) => void;
}
