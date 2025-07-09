export interface Goal {
    name: string;
    emoji: string;
    description: string;
}

export interface GoalSelectorProps {
    onSelectGoal: (goal: string) => void;
}
