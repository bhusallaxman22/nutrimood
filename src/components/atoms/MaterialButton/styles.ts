import { StyleSheet } from 'react-native';
import { spacing } from '../../../theme/materialDesign';

export const styles = StyleSheet.create({
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    marginRight: spacing.sm,
  },
  // gradientButton removed – kept for reference; solid backgrounds now
  disabled: {
    opacity: 0.5,
  },
});
