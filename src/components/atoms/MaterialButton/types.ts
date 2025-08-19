import { Ionicons } from "@expo/vector-icons";
import { ViewStyle } from "react-native";

export interface MaterialButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "vibrant" | "outline" | "electric";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  style?: ViewStyle;
  fullWidth?: boolean;
  icon?: keyof typeof Ionicons.glyphMap;
  // gradient prop removed; kept comment for backwards compatibility
}
