import { Text } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { ThemedTextProps } from './types';
import { styles } from './styles';

export function ThemedText({
    style,
    lightColor,
    darkColor,
    type = 'default',
    ...rest
}: ThemedTextProps) {
    const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

    return (
        <Text
            style={[
                { color },
                type === 'default' ? styles.default : undefined,
                type === 'title' ? styles.title : undefined,
                type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
                type === 'subtitle' ? styles.subtitle : undefined,
                type === 'link' ? styles.link : undefined,
                type === 'caption' ? styles.caption : undefined,
                type === 'overline' ? styles.overline : undefined,
                type === 'hero' ? styles.hero : undefined,
                type === 'vibrant' ? styles.vibrant : undefined,
                type === 'neon' ? styles.neon : undefined,
                style,
            ]}
            {...rest}
        />
    );
}
