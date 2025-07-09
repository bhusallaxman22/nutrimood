import { StyleSheet } from 'react-native';
import { spacing } from '../../../theme/materialDesign';

export const styles = StyleSheet.create({
    contentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        marginRight: spacing.sm,
    },
    gradientButton: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    disabled: {
        opacity: 0.5,
    },
});
