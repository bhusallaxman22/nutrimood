import React from 'react';
import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, dimensions } from '../../../theme/materialDesign';
import { GlassCardProps } from './types';
import { getCardStyle } from './utils';
import { styles } from './styles';

const GlassCard: React.FC<GlassCardProps> = ({
    children,
    style,
    gradient = colors.gradients.primary,
    padding = spacing.lg,
    borderRadius = dimensions.borderRadius.xlarge,
    variant = 'default',
}) => {
    const cardStyle = getCardStyle(variant, borderRadius, padding);

    if (variant === 'vibrant') {
        return (
            <LinearGradient
                colors={gradient as any}
                style={[cardStyle, style]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <View style={styles.content}>
                    {children}
                </View>
            </LinearGradient>
        );
    }

    return (
        <View style={[cardStyle, style]}>
            <View style={styles.content}>
                {children}
            </View>
        </View>
    );
};

export default GlassCard;
