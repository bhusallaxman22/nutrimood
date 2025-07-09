import { StyleSheet } from 'react-native';
import { colors, spacing } from '../../theme/materialDesign';

export const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
    },
    loadingGradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingIndicator: {
        transform: [{ scale: 1.2 }],
    },
});
