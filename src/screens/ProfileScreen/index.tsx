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
import GlassBackground from '../../components/templates/GlassBackground';
import GlassCard from '../../components/molecules/GlassCard';
import Button from '../../components/atoms/Button';
import { colors } from '../../theme/materialDesign';
import {
    SettingsScreenNavigationProp,
    ProfileFormData
} from './types';
import {
    activityLevels,
    getInitialFormData,
    mapProfileToFormData,
    saveProfile,
    loadUserProfile,
    handleLogout,
    handleDeleteAccount,
    getUserEmail,
} from './utils';
import { styles } from './styles';

const ProfileScreen: React.FC = () => {
    const navigation = useNavigation<SettingsScreenNavigationProp>();
    const [userEmail, setUserEmail] = useState<string>('');
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState<ProfileFormData>(getInitialFormData());

    useEffect(() => {
        setUserEmail(getUserEmail());
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            const userProfile = await loadUserProfile();
            if (userProfile) {
                setProfile(userProfile);
                setFormData(mapProfileToFormData(userProfile));
            } else {
                setEditing(true);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await saveProfile(formData, profile);
            await loadProfile();
            setEditing(false);
            Alert.alert('Success', 'Profile saved successfully!');
        } catch (error: any) {
            Alert.alert('Error', error.message || 'Failed to save profile');
        } finally {
            setSaving(false);
        }
    };

    const updateFormData = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleCancel = () => {
        setEditing(false);
        loadProfile(); // Reset form data
    };

    if (loading) {
        return (
            <GlassBackground gradient={colors.gradients.warm} variant="subtle">
                <SafeAreaView style={styles.safeArea}>
                    <View style={styles.loadingContainer}>
                        <Text style={styles.loadingText}>Loading profile...</Text>
                    </View>
                </SafeAreaView>
            </GlassBackground>
        );
    }

    return (
        <GlassBackground gradient={colors.gradients.warm} variant="subtle">
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={styles.safeArea}>
                <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                    {/* Header */}
                    <View style={styles.header}>
                        <Text style={styles.titleText}>👤 My Profile</Text>
                        <Text style={styles.subtitle}>
                            {editing ? 'Edit your personal information' : 'Your nutrition journey profile'}
                        </Text>

                        {!editing && (
                            <TouchableOpacity
                                style={styles.editButton}
                                onPress={() => setEditing(true)}
                                activeOpacity={0.8}
                            >
                                <Text style={styles.editButtonText}>✏️ Edit Profile</Text>
                            </TouchableOpacity>
                        )}
                    </View>

                    {/* Basic Information */}
                    <GlassCard style={styles.card}>
                        <Text style={styles.sectionTitle}>📋 Basic Information</Text>

                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Email</Text>
                            <TextInput
                                style={[styles.input, styles.inputDisabled]}
                                value={userEmail}
                                editable={false}
                                placeholderTextColor={colors.onSurfaceVariant}
                            />
                        </View>

                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Display Name *</Text>
                            <TextInput
                                style={[styles.input, !editing && styles.inputDisabled]}
                                value={formData.displayName}
                                onChangeText={(text) => updateFormData('displayName', text)}
                                placeholder="Enter your display name"
                                editable={editing}
                                placeholderTextColor={colors.onSurfaceVariant}
                            />
                        </View>

                        <View style={styles.formRow}>
                            <View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
                                <Text style={styles.label}>Age</Text>
                                <TextInput
                                    style={[styles.input, !editing && styles.inputDisabled]}
                                    value={formData.age}
                                    onChangeText={(text) => updateFormData('age', text)}
                                    placeholder="25"
                                    keyboardType="numeric"
                                    editable={editing}
                                    placeholderTextColor={colors.onSurfaceVariant}
                                />
                            </View>

                            <View style={[styles.formGroup, { flex: 1, marginLeft: 8 }]}>
                                <Text style={styles.label}>Location</Text>
                                <TextInput
                                    style={[styles.input, !editing && styles.inputDisabled]}
                                    value={formData.location}
                                    onChangeText={(text) => updateFormData('location', text)}
                                    placeholder="City, Country"
                                    editable={editing}
                                    placeholderTextColor={colors.onSurfaceVariant}
                                />
                            </View>
                        </View>

                        <View style={styles.formRow}>
                            <View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
                                <Text style={styles.label}>Height</Text>
                                <TextInput
                                    style={[styles.input, !editing && styles.inputDisabled]}
                                    value={formData.height}
                                    onChangeText={(text) => updateFormData('height', text)}
                                    placeholder="5'8&quot; or 173cm"
                                    editable={editing}
                                    placeholderTextColor={colors.onSurfaceVariant}
                                />
                            </View>

                            <View style={[styles.formGroup, { flex: 1, marginLeft: 8 }]}>
                                <Text style={styles.label}>Weight</Text>
                                <TextInput
                                    style={[styles.input, !editing && styles.inputDisabled]}
                                    value={formData.weight}
                                    onChangeText={(text) => updateFormData('weight', text)}
                                    placeholder="150lbs or 68kg"
                                    editable={editing}
                                    placeholderTextColor={colors.onSurfaceVariant}
                                />
                            </View>
                        </View>

                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Bio</Text>
                            <TextInput
                                style={[styles.textArea, !editing && styles.inputDisabled]}
                                value={formData.bio}
                                onChangeText={(text) => updateFormData('bio', text)}
                                placeholder="Tell us about yourself..."
                                multiline
                                numberOfLines={3}
                                editable={editing}
                                placeholderTextColor={colors.onSurfaceVariant}
                            />
                        </View>
                    </GlassCard>

                    {/* Activity Level */}
                    <GlassCard style={styles.card}>
                        <Text style={styles.sectionTitle}>🏃‍♀️ Activity Level</Text>

                        {activityLevels.map((level) => (
                            <TouchableOpacity
                                key={level.value}
                                style={[
                                    styles.optionButton,
                                    formData.activityLevel === level.value && styles.optionButtonActive,
                                    !editing && styles.optionButtonDisabled
                                ]}
                                onPress={() => editing && updateFormData('activityLevel', level.value)}
                                disabled={!editing}
                                activeOpacity={0.7}
                            >
                                <Text style={[
                                    styles.optionText,
                                    formData.activityLevel === level.value && styles.optionTextActive
                                ]}>
                                    {level.label}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </GlassCard>

                    {/* Action Buttons */}
                    {editing && (
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={styles.cancelButton}
                                onPress={handleCancel}
                                activeOpacity={0.8}
                            >
                                <Text style={styles.cancelButtonText}>Cancel</Text>
                            </TouchableOpacity>

                            <Button
                                title={saving ? "Saving..." : "Save Profile"}
                                onPress={handleSave}
                                disabled={saving}
                                style={styles.saveButton}
                            />
                        </View>
                    )}

                    {/* Account Actions */}
                    {!editing && (
                        <GlassCard style={styles.card}>
                            <Text style={styles.sectionTitle}>⚙️ Account Settings</Text>

                            <View style={styles.actionsList}>
                                <Button
                                    title="Sign Out"
                                    onPress={handleLogout}
                                    variant="outline"
                                    style={styles.logoutButton}
                                    fullWidth
                                />

                                <Button
                                    title="Delete Account"
                                    onPress={handleDeleteAccount}
                                    variant="outline"
                                    style={styles.deleteButton}
                                    fullWidth
                                />
                            </View>
                        </GlassCard>
                    )}
                </ScrollView>
            </SafeAreaView>
        </GlassBackground>
    );
};

export default ProfileScreen;
