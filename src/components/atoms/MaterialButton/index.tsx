import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { MaterialButtonProps } from './types';
import { getButtonStyle, getTextStyle, getIconColor, getIconSize, getGradient } from './utils';
import { styles } from './styles';

const MaterialButton: React.FC<MaterialButtonProps> = ({
    title,
    onPress,
    variant = 'primary',
    size = 'medium',
    disabled = false,
    style,
    fullWidth = false,
    icon,
    gradient,
}) => {
    const buttonStyle = getButtonStyle(variant, size, fullWidth);
    const textStyle = getTextStyle(variant, size);
    const iconColor = getIconColor(variant);
    const iconSize = getIconSize(size);
    const buttonGradient = gradient || getGradient(variant);

    const content = (
        <View style={styles.contentContainer}>
            {icon && <Ionicons name={icon} size={iconSize} color={iconColor} style={styles.icon} />}
            <Text style={textStyle}>{title}</Text>
        </View>
    );

    if (variant === 'vibrant' || variant === 'electric' || variant === 'primary') {
        return (
            <TouchableOpacity
                style={[style, disabled && styles.disabled]}
                onPress={onPress}
                disabled={disabled}
                activeOpacity={0.8}
            >
                <LinearGradient
                    colors={buttonGradient as any}
                    style={[buttonStyle, styles.gradientButton]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                >
                    {content}
                </LinearGradient>
            </TouchableOpacity>
        );
    }

    return (
        <TouchableOpacity
            style={[buttonStyle, style, disabled && styles.disabled]}
            onPress={onPress}
            disabled={disabled}
            activeOpacity={0.8}
        >
            {content}
        </TouchableOpacity>
    );
};

export default MaterialButton;
