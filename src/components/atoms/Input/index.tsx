import React, { useState } from 'react';
import { TextInput, View, Text } from 'react-native';
import { BlurView } from 'expo-blur';
import { colors } from '../../../theme/materialDesign';
import { InputProps } from './types';
import { styles } from './styles';

const Input: React.FC<InputProps> = ({
    placeholder,
    value,
    onChangeText,
    secureTextEntry,
    label,
    error,
    style,
    multiline = false,
    numberOfLines = 1,
    variant = 'default',
}) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <View style={[styles.container, style]}>
            {label && <Text style={styles.label}>{label}</Text>}
            <View style={[
                styles.inputContainer,
                variant === 'outlined' && styles.outlined,
                isFocused && styles.focused,
                error && styles.error,
            ]}>
                {variant === 'default' ? (
                    <BlurView intensity={15} style={styles.blurView}>
                        <TextInput
                            style={[
                                styles.input,
                                multiline && { height: numberOfLines * 24 + 32 }
                            ]}
                            placeholder={placeholder}
                            placeholderTextColor={colors.onSurfaceVariant}
                            value={value}
                            onChangeText={onChangeText}
                            secureTextEntry={secureTextEntry}
                            multiline={multiline}
                            numberOfLines={numberOfLines}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                        />
                    </BlurView>
                ) : (
                    <TextInput
                        style={[
                            styles.input,
                            styles.outlinedInput,
                            multiline && { height: numberOfLines * 24 + 32 }
                        ]}
                        placeholder={placeholder}
                        placeholderTextColor={colors.onSurfaceVariant}
                        value={value}
                        onChangeText={onChangeText}
                        secureTextEntry={secureTextEntry}
                        multiline={multiline}
                        numberOfLines={numberOfLines}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                    />
                )}
            </View>
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

export default Input;
