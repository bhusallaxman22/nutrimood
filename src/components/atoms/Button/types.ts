import { Ionicons } from "@expo/vector-icons";
import { ViewStyle } from "react-native";

export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?:
    | "primary"
    | "secondary"
    | "vibrant"
    | "outline"
    | "electric"
    | "cosmic"
    | "aurora"
    | "volcano"
    | "maximalist";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  style?: ViewStyle;
  fullWidth?: boolean;
  icon?: keyof typeof Ionicons.glyphMap;
  // gradient prop removed; no gradients anywhere now
}
