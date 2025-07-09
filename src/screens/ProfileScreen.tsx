import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    StatusBar,
    Alert,
    SafeAreaView,
    TouchableOpacity,
    TextInput,
    Linking,
} from 'react-native';
import { auth } from '../services/firebase';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';
import GlassBackground from '../components/templates/GlassBackground';
import GlassCard from '../components/molecules/GlassCard';
import Button from '../components/atoms/Button';
import { colors, typography, spacing, dimensions } from '../theme/materialDesign';
import { userProfileService, UserProfile } from '../services/database';
import * as Haptics from 'expo-haptics';

type SettingsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'MainTabs'>;

const SettingsScreen: React.FC = () => {
    const navigation = useNavigation<SettingsScreenNavigationProp>();
    const [userEmail, setUserEmail] = useState<string>('');
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [editing, setEditing] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        displayName: '',
        age: '',
        height: '',
        weight: '',
        activityLevel: 'moderate' as 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active',
        location: '',
        bio: '',
        dietaryRestrictions: [] as string[],
        healthGoals: [] as string[],
    });

    const activityLevels = [
        { value: 'sedentary', label: 'Sedentary (Little to no exercise)' },
        { value: 'light', label: 'Light (Light exercise 1-3 days/week)' },
        { value: 'moderate', label: 'Moderate (Moderate exercise 3-5 days/week)' },
        { value: 'active', label: 'Active (Hard exercise 6-7 days/week)' },
        { value: 'very_active', label: 'Very Active (Physical job or 2x/day)' },
    ];

    useEffect(() => {
        if (auth.currentUser) {
            setUserEmail(auth.currentUser.email || 'No email');
        }
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            const userProfile = await userProfileService.getProfile();
            if (userProfile) {
                setProfile(userProfile);
                setFormData({
                    displayName: userProfile.displayName || '',
                    age: userProfile.age?.toString() || '',
                    height: userProfile.height || '',
                    weight: userProfile.weight || '',
                    activityLevel: userProfile.activityLevel || 'moderate',
                    location: userProfile.location || '',
                    bio: userProfile.bio || '',
                    dietaryRestrictions: userProfile.dietaryRestrictions || [],
                    healthGoals: userProfile.healthGoals || [],
                });
            } else {
                // Create initial profile if doesn't exist
                setEditing(true);
            }
        } catch (error) {
            console.error('Error loading profile:', error);
            Alert.alert('Error', 'Failed to load profile');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        if (!formData.displayName.trim()) {
            Alert.alert('Error', 'Display name is required');
            return;
        }

        setSaving(true);
        try {
            const profileData = {
                email: auth.currentUser?.email || '',
                displayName: formData.displayName.trim(),
                age: formData.age ? parseInt(formData.age) : undefined,
                height: formData.height.trim() || undefined,
                weight: formData.weight.trim() || undefined,
                activityLevel: formData.activityLevel,
                location: formData.location.trim() || undefined,
                bio: formData.bio.trim() || undefined,
                dietaryRestrictions: formData.dietaryRestrictions,
                healthGoals: formData.healthGoals,
            };

            if (profile) {
                await userProfileService.updateProfile(profileData);
            } else {
                await userProfileService.createProfile(profileData);
            }

            await loadProfile();
            setEditing(false);
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            Alert.alert('Success', 'Profile saved successfully!');
        } catch (error) {
            console.error('Error saving profile:', error);
            Alert.alert('Error', 'Failed to save profile');
        } finally {
            setSaving(false);
        }
    };

    const updateFormData = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleLogout = async () => {
        try {
            await auth.signOut();
            // Don't manually navigate - let the AuthContext handle it
            // This ensures proper auth state management
        } catch (error) {
            console.error('Error signing out:', error);
            Alert.alert('Error', 'Failed to sign out. Please try again.');
        }
    };

    const handleDeleteAccount = () => {
        Alert.alert(
            'Delete Account',
            'Are you sure you want to delete your account? This action cannot be undone.',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Delete', style: 'destructive', onPress: confirmDeleteAccount },
            ]
        );
    };

    const confirmDeleteAccount = async () => {
        try {
            if (auth.currentUser) {
                await auth.currentUser.delete();
                navigation.getParent()?.navigate('Login');
            }
        } catch (error) {
            console.error('Error deleting account:', error);
            Alert.alert('Error', 'Failed to delete account. Please try again.');
        }
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
                            <View style={[styles.formGroup, { flex: 1, marginRight: spacing.sm }]}>
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

                            <View style={[styles.formGroup, { flex: 1, marginLeft: spacing.sm }]}>
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
                            <View style={[styles.formGroup, { flex: 1, marginRight: spacing.sm }]}>
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

                            <View style={[styles.formGroup, { flex: 1, marginLeft: spacing.sm }]}>
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
                                onPress={() => {
                                    setEditing(false);
                                    loadProfile(); // Reset form data
                                }}
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

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        flex: 1,
        padding: spacing.lg,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        ...typography.body1,
        color: colors.onSurface,
    },
    header: {
        marginTop: spacing.lg,
        marginBottom: spacing.xl,
        alignItems: 'center',
    },
    titleText: {
        ...typography.h1,
        color: colors.onSurface,
        textAlign: 'center',
        fontWeight: '700',
        fontSize: 32,
        lineHeight: 38,
        letterSpacing: -0.5,
    },
    subtitle: {
        ...typography.body1,
        color: colors.onSurfaceVariant,
        textAlign: 'center',
        marginTop: spacing.sm,
        marginBottom: spacing.md,
    },
    editButton: {
        backgroundColor: colors.primary,
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.sm,
        borderRadius: 20,
        marginTop: spacing.md,
    },
    editButtonText: {
        ...typography.body1,
        color: colors.onPrimary,
        fontWeight: '600',
    },
    card: {
        marginBottom: spacing.lg,
    },
    sectionTitle: {
        ...typography.h4,
        color: colors.onSurface,
        fontWeight: '600',
        marginBottom: spacing.md,
    },
    formGroup: {
        marginBottom: spacing.md,
    },
    formRow: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    label: {
        ...typography.caption,
        color: colors.onSurface,
        fontWeight: '500',
        marginBottom: spacing.xs,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    input: {
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.onSurfaceVariant,
        borderRadius: 12,
        padding: spacing.md,
        ...typography.body1,
        color: colors.onSurface,
        minHeight: 48,
    },
    inputDisabled: {
        backgroundColor: colors.surfaceVariant,
        color: colors.onSurfaceVariant,
        opacity: 0.7,
    },
    textArea: {
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.onSurfaceVariant,
        borderRadius: 12,
        padding: spacing.md,
        ...typography.body1,
        color: colors.onSurface,
        minHeight: 80,
        textAlignVertical: 'top',
    },
    optionButton: {
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.onSurfaceVariant,
        borderRadius: 12,
        padding: spacing.md,
        marginBottom: spacing.sm,
    },
    optionButtonActive: {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
    },
    optionButtonDisabled: {
        opacity: 0.6,
    },
    optionText: {
        ...typography.body1,
        color: colors.onSurface,
    },
    optionTextActive: {
        color: colors.onPrimary,
        fontWeight: '600',
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: spacing.md,
        marginBottom: spacing.lg,
    },
    cancelButton: {
        flex: 1,
        backgroundColor: colors.surfaceVariant,
        borderRadius: 12,
        padding: spacing.md,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 48,
    },
    cancelButtonText: {
        ...typography.body1,
        color: colors.onSurfaceVariant,
        fontWeight: '600',
    },
    saveButton: {
        flex: 1,
    },
    actionsList: {
        gap: spacing.md,
    },
    logoutButton: {
        borderColor: colors.onSurfaceVariant,
        marginBottom: spacing.xs,
    },
    deleteButton: {
        borderColor: colors.error,
    },
});

export default ProfileScreen;
