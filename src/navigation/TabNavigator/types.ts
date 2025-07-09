export interface TabIconProps {
    name: string;
    focused: boolean;
    emoji: string;
}

export interface TabConfig {
    name: string;
    component: React.ComponentType<any>;
    emoji: string;
    label: string;
}
