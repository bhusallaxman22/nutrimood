import React, { useState } from 'react';
import {
    View,
    Text,
    StatusBar,
    Platform,
    KeyboardAvoidingView,
    ScrollView,
    SafeAreaView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import Input from '../../components/atoms/Input';
import Button from '../../components/atoms/Button';
import GlassBackground from '../../components/templates/GlassBackground';
import GlassCard from '../../components/molecules/GlassCard';
import { colors } from '../../theme/materialDesign';
import { RootStackParamList } from '../../navigation/types';

import { SignUpFormData } from './types';
import { validateSignUpForm, handleSignUp } from './utils';
import { styles } from './styles';

type SignUpScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SignUp'>;

const SignUpScreen: React.FC = () => {
    const [formData, setFormData] = useState<SignUpFormData>({
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigation = useNavigation<SignUpScreenNavigationProp>();

    const updateFormData = (field: keyof SignUpFormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const onSignUp = async () => {
        const validationError = validateSignUpForm(formData);
        if (validationError) {
            setError(validationError);
            return;
        }

        setLoading(true);
        setError('');

        try {
            await handleSignUp(formData.email, formData.password);
        } catch (error: any) {
            console.error('Sign up error:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <GlassBackground gradient={colors.gradients.electric}>
            <StatusBar
                barStyle="dark-content"
                backgroundColor="transparent"
                translucent={Platform.OS === 'android'}
            />
            <SafeAreaView style={styles.safeArea}>
                <KeyboardAvoidingView
                    style={styles.keyboardAvoid}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
                >
                    <ScrollView
                        contentContainerStyle={styles.scrollContent}
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                    >
                        <View style={styles.container}>
                            <GlassCard style={styles.card}>
                                <View style={styles.header}>
                                    <Text style={styles.title}>Create Account</Text>
                                    <Text style={styles.subtitle}>Join us on your wellness journey</Text>
                                </View>

                                <View style={styles.form}>
                                    <Input
                                        label="Email"
                                        placeholder="Enter your email"
                                        value={formData.email}
                                        onChangeText={(text) => updateFormData('email', text)}
                                        error={error && !formData.email ? 'Email is required' : ''}
                                    />
                                    <Input
                                        label="Password"
                                        placeholder="Create a password"
                                        value={formData.password}
                                        onChangeText={(text) => updateFormData('password', text)}
                                        secureTextEntry
                                        error={error && !formData.password ? 'Password is required' : ''}
                                    />
                                    <Input
                                        label="Confirm Password"
                                        placeholder="Confirm your password"
                                        value={formData.confirmPassword}
                                        onChangeText={(text) => updateFormData('confirmPassword', text)}
                                        secureTextEntry
                                        error={error && !formData.confirmPassword ? 'Please confirm your password' : ''}
                                    />

                                    {error && <Text style={styles.errorText}>{error}</Text>}

                                    <Button
                                        title={loading ? "Creating Account..." : "Create Account"}
                                        onPress={onSignUp}
                                        disabled={loading}
                                        style={styles.signupButton}
                                    />

                                    <Button
                                        title="Already have an account? Sign In"
                                        onPress={() => navigation.navigate('Login')}
                                        variant="outline"
                                        style={styles.loginButton}
                                    />
                                </View>
                            </GlassCard>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </GlassBackground>
    );
};

export default SignUpScreen;
