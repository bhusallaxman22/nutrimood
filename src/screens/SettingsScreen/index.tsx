import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    StatusBar,
    SafeAreaView,
    TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import GlassBackground from '../../components/templates/GlassBackground';
import GlassCard from '../../components/molecules/GlassCard';
import Button from '../../components/atoms/Button';
import { colors } from '../../theme/materialDesign';
import { RootStackParamList } from '../../navigation/types';
import { UserProfile } from '../../services/database';

import {
    loadUserProfile,
    openPrivacyPolicy,
    showAboutDialog,
    handleLogout,
    handleDeleteAccount,
    getUserDisplayInfo,
} from './utils';
import { styles } from './styles';

type SettingsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'MainTabs'>;

const SettingsScreen: React.FC = () => {
    const navigation = useNavigation<SettingsScreenNavigationProp>();
    const [userEmail, setUserEmail] = useState<string>('');
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            const { userEmail: email, profile: userProfile } = await loadUserProfile();
            setUserEmail(email);
            setProfile(userProfile);
        } catch (error) {
            console.error('Error loading profile:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAccountSettings = () => {
        navigation.navigate('ProfileSettings');
    };

    if (loading) {
        return (
            <GlassBackground gradient={colors.gradients.ocean} variant="subtle">
                <SafeAreaView style={styles.container}>
                    <View style={styles.centered}>
                        <Text style={styles.loadingText}>Loading Settings...</Text>
                    </View>
                </SafeAreaView>
            </GlassBackground>
        );
    }

    const { displayName, avatarLetter, email } = getUserDisplayInfo(profile, userEmail);

    return (
        <GlassBackground gradient={colors.gradients.ocean} variant="subtle">
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={styles.container}>
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Header */}
                    <View style={styles.header}>
                        <Text style={styles.titleText}>⚙️ Settings</Text>
                        <Text style={styles.subtitleText}>Manage your account and preferences</Text>
                    </View>

                    {/* User Info Card */}
                    <GlassCard style={styles.userCard} variant="elevated">
                        <View style={styles.userInfo}>
                            <View style={styles.avatarContainer}>
                                <Text style={styles.avatarText}>{avatarLetter}</Text>
                            </View>
                            <View style={styles.userDetails}>
                                <Text style={styles.userName}>{displayName}</Text>
                                <Text style={styles.userEmail}>{email}</Text>
                            </View>
                        </View>
                    </GlassCard>

                    {/* Settings Sections */}
                    <View style={styles.settingsContainer}>
                        {/* Account Settings */}
                        <GlassCard style={styles.settingsCard} variant="elevated">
                            <Text style={styles.sectionTitle}>👤 Account</Text>
                            <TouchableOpacity style={styles.settingsItem} onPress={handleAccountSettings}>
                                <Text style={styles.settingsItemText}>Profile Settings</Text>
                                <Text style={styles.settingsItemArrow}>›</Text>
                            </TouchableOpacity>
                        </GlassCard>

                        {/* App Info */}
                        <GlassCard style={styles.settingsCard} variant="elevated">
                            <Text style={styles.sectionTitle}>📱 App</Text>
                            <TouchableOpacity style={styles.settingsItem} onPress={showAboutDialog}>
                                <Text style={styles.settingsItemText}>About</Text>
                                <Text style={styles.settingsItemArrow}>›</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.settingsItem} onPress={openPrivacyPolicy}>
                                <Text style={styles.settingsItemText}>Privacy Policy</Text>
                                <Text style={styles.settingsItemArrow}>›</Text>
                            </TouchableOpacity>
                        </GlassCard>

                        {/* Actions */}
                        <GlassCard style={styles.settingsCard} variant="elevated">
                            <Text style={styles.sectionTitle}>🔧 Actions</Text>
                            <View style={styles.actionsList}>
                                <Button
                                    title="Sign Out"
                                    onPress={() => handleLogout(navigation)}
                                    variant="outline"
                                    style={styles.logoutButton}
                                />
                                <Button
                                    title="Delete Account"
                                    onPress={handleDeleteAccount}
                                    variant="outline"
                                    style={styles.deleteButton}
                                />
                            </View>
                        </GlassCard>
                    </View>

                </ScrollView>
            </SafeAreaView>
        </GlassBackground>
    );
};

export default SettingsScreen;
