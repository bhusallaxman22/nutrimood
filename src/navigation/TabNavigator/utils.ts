import HomeScreen from '../../screens/HomeScreen';
import MoodTrendsScreen from '../../screens/MoodTrendsScreen';
import MindfulnessScreen from '../../screens/MindfulnessScreen';
import SocialScreen from '../../screens/SocialScreen';
import SettingsScreen from '../../screens/SettingsScreen';
import { TabConfig } from './types';

export const tabConfigs: TabConfig[] = [
    {
        name: 'Home',
        component: HomeScreen,
        emoji: '🎯',
        label: 'Get Tips',
    },
    {
        name: 'Dashboard',
        component: MoodTrendsScreen,
        emoji: '📈',
        label: 'Progress',
    },
    {
        name: 'Mindfulness',
        component: MindfulnessScreen,
        emoji: '🧘‍♀️',
        label: 'Mindful',
    },
    {
        name: 'Social',
        component: SocialScreen,
        emoji: '👥',
        label: 'Community',
    },
    {
        name: 'Profile',
        component: SettingsScreen,
        emoji: '⚙️',
        label: 'Settings',
    },
];
