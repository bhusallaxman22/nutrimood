import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing } from '../../theme/materialDesign';
import { TabNavigatorParamList } from '../types';
import { TabIconProps } from './types';
import { tabConfigs } from './utils';
import { styles } from './styles';

// Modern tab bar icons with better visual hierarchy
const TabIcon: React.FC<TabIconProps> = ({ name, focused, emoji }) => {
    return (
        <View style={[
            styles.tabIconContainer,
            focused && styles.tabIconFocused
        ]}>
            <View style={[
                styles.iconBackground,
                focused && styles.iconBackgroundFocused
            ]}>
                <Text style={[
                    styles.tabEmoji,
                    focused && styles.tabEmojiFocused
                ]}>
                    {emoji}
                </Text>
            </View>
            <Text style={[
                styles.tabLabel,
                focused && styles.tabLabelFocused
            ]}>
                {name}
            </Text>
        </View>
    );
};

const Tab = createBottomTabNavigator<TabNavigatorParamList>();

const TabNavigator: React.FC = () => {
    const insets = useSafeAreaInsets();

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: [
                    styles.tabBar,
                    {
                        paddingBottom: Platform.OS === 'ios'
                            ? Math.max(insets.bottom, spacing.sm)
                            : spacing.lg
                    }
                ],
                tabBarShowLabel: false,
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.onSurfaceVariant,
                tabBarBackground: () => (
                    <View style={styles.tabBarBackground} />
                ),
            }}
        >
            {tabConfigs.map((config) => (
                <Tab.Screen
                    key={config.name}
                    name={config.name as any}
                    component={config.component}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <TabIcon name={config.label} focused={focused} emoji={config.emoji} />
                        ),
                    }}
                />
            ))}
        </Tab.Navigator>
    );
};

export default TabNavigator;
