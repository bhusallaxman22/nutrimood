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
import Input from '../../components/atoms/Input';
import Button from '../../components/atoms/Button';
import GlassBackground from '../../components/templates/GlassBackground';
import GlassCard from '../../components/molecules/GlassCard';
import { colors } from '../../theme/materialDesign';
import { LoginScreenNavigationProp } from './types';
import { validateLoginForm, loginUser, getErrorMessage } from './utils';
import { styles } from './styles';

const LoginScreen: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigation = useNavigation<LoginScreenNavigationProp>();

    const handleLogin = async () => {
        const validationError = validateLoginForm(email, password);
        if (validationError) {
            setError(validationError);
            return;
        }

        setLoading(true);
        setError('');

        try {
            await loginUser({ email, password });
            // Auth context will handle navigation
        } catch (error: any) {
            setError(getErrorMessage(error));
        } finally {
            setLoading(false);
        }
    };

    return (
        <GlassBackground gradient={colors.gradients.fire}>
            <StatusBar
                barStyle="light-content"
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
                                    <Text style={styles.title}>Welcome Back</Text>
                                    <Text style={styles.subtitle}>Sign in to your account</Text>
                                </View>

                                <View style={styles.form}>
                                    <Input
                                        label="Email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChangeText={setEmail}
                                        error={error && !email ? 'Email is required' : ''}
                                    />
                                    <Input
                                        label="Password"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChangeText={setPassword}
                                        secureTextEntry
                                        error={error && !password ? 'Password is required' : ''}
                                    />

                                    {error && <Text style={styles.errorText}>{error}</Text>}

                                    <Button
                                        title={loading ? "Signing in..." : "Sign In"}
                                        onPress={handleLogin}
                                        disabled={loading}
                                        style={styles.loginButton}
                                        fullWidth
                                    />

                                    <Button
                                        title="Create Account"
                                        onPress={() => navigation.navigate('SignUp')}
                                        variant="outline"
                                        style={styles.signupButton}
                                        fullWidth
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

export default LoginScreen;
