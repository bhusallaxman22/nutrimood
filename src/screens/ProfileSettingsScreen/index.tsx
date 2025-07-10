import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    StatusBar,
    Alert,
    SafeAreaView,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import GlassBackground from '../../components/templates/GlassBackground';
import GlassCard from '../../components/molecules/GlassCard';
import Button from '../../components/atoms/Button';
import { colors } from '../../theme/materialDesign';
import { RootStackParamList } from '../../navigation/types';
import { UserProfile } from '../../services/database';

import { SettingsFormData } from '../SettingsScreen/types';
import {
    loadUserProfile,
    createFormDataFromProfile,
    saveUserProfile,
    getUserDisplayInfo,
    updateFormField,
} from '../SettingsScreen/utils';
import { styles } from './styles';

type ProfileSettingsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ProfileSettings'>;

const ProfileSettingsScreen: React.FC = () => {
    const navigation = useNavigation<ProfileSettingsScreenNavigationProp>();
    const [userEmail, setUserEmail] = useState<string>('');
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState<SettingsFormData>({
        displayName: '',
        age: '',
        height: '',
        weight: '',
        activityLevel: 'moderate',
        location: '',
        bio: '',
        dietaryRestrictions: [],
        healthGoals: [],
    });

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            const { userEmail: email, profile: userProfile } = await loadUserProfile();
            setUserEmail(email);
            setProfile(userProfile);

            if (userProfile) {
                setFormData(createFormDataFromProfile(userProfile));
            }
        } catch (error) {
            console.error('Error loading profile:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSaveProfile = async () => {
        setSaving(true);
        try {
            await saveUserProfile(formData, profile);
            await loadProfile();
            Alert.alert('Success', 'Profile updated successfully!', [
                { text: 'OK', onPress: () => navigation.goBack() }
            ]);
        } catch (error) {
            console.error('Error updating profile:', error);
            Alert.alert('Error', 'Failed to update profile. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    const handleCancel = () => {
        navigation.goBack();
    };

    if (loading) {
        return (
            <GlassBackground gradient={colors.gradients.ocean} variant="subtle">
                <SafeAreaView style={styles.container}>
                    <View style={styles.centered}>
                        <Text style={styles.loadingText}>Loading Profile...</Text>
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
                        <TouchableOpacity style={styles.backButton} onPress={handleCancel}>
                            <Text style={styles.backButtonText}>‹ Back</Text>
                        </TouchableOpacity>
                        <Text style={styles.titleText}>👤 Profile Settings</Text>
                        <Text style={styles.subtitleText}>Update your personal information</Text>
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

                    {/* Profile Form */}
                    <GlassCard style={styles.formCard} variant="elevated">
                        <Text style={styles.sectionTitle}>✏️ Basic Information</Text>
                        
                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Display Name</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your display name"
                                value={formData.displayName}
                                onChangeText={(text) => updateFormField('displayName', text, setFormData)}
                                maxLength={50}
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Bio</Text>
                            <TextInput
                                style={[styles.input, styles.textArea]}
                                placeholder="Tell us about yourself..."
                                value={formData.bio}
                                onChangeText={(text) => updateFormField('bio', text, setFormData)}
                                multiline
                                numberOfLines={4}
                                maxLength={200}
                                textAlignVertical="top"
                            />
                            <Text style={styles.characterCount}>{formData.bio.length}/200</Text>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Location</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="City, Country"
                                value={formData.location}
                                onChangeText={(text) => updateFormField('location', text, setFormData)}
                                maxLength={100}
                            />
                        </View>
                    </GlassCard>

                    {/* Health Information */}
                    <GlassCard style={styles.formCard} variant="elevated">
                        <Text style={styles.sectionTitle}>🏃 Health Information</Text>
                        
                        <View style={styles.inputRow}>
                            <View style={styles.inputHalf}>
                                <Text style={styles.inputLabel}>Age</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="25"
                                    value={formData.age}
                                    onChangeText={(text) => updateFormField('age', text, setFormData)}
                                    keyboardType="numeric"
                                    maxLength={3}
                                />
                            </View>
                            <View style={styles.inputHalf}>
                                <Text style={styles.inputLabel}>Height (cm)</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="170"
                                    value={formData.height}
                                    onChangeText={(text) => updateFormField('height', text, setFormData)}
                                    keyboardType="numeric"
                                    maxLength={3}
                                />
                            </View>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Weight (kg)</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="70"
                                value={formData.weight}
                                onChangeText={(text) => updateFormField('weight', text, setFormData)}
                                keyboardType="numeric"
                                maxLength={4}
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Activity Level</Text>
                            <View style={styles.activityOptions}>
                                {['sedentary', 'lightly active', 'moderate', 'very active', 'extremely active'].map((level) => (
                                    <TouchableOpacity
                                        key={level}
                                        style={[
                                            styles.activityOption,
                                            formData.activityLevel === level && styles.activityOptionSelected
                                        ]}
                                        onPress={() => updateFormField('activityLevel', level, setFormData)}
                                    >
                                        <Text style={[
                                            styles.activityOptionText,
                                            formData.activityLevel === level && styles.activityOptionTextSelected
                                        ]}>
                                            {level.charAt(0).toUpperCase() + level.slice(1)}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    </GlassCard>

                    {/* Save/Cancel Actions */}
                    <View style={styles.actions}>
                        <Button
                            title="Cancel"
                            onPress={handleCancel}
                            variant="outline"
                            style={styles.cancelButton}
                        />
                        <Button
                            title={saving ? "Saving..." : "Save Changes"}
                            onPress={handleSaveProfile}
                            disabled={saving}
                            style={styles.saveButton}
                        />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </GlassBackground>
    );
};

export default ProfileSettingsScreen;