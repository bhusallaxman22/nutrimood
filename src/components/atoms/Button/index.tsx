import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { ButtonProps } from "./types";
import {
  getButtonStyle,
  getIconColor,
  getIconSize,
  getTextStyle,
} from "./utils";

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = "primary",
  size = "medium",
  disabled = false,
  style,
  fullWidth = false,
  icon,
}) => {
  const buttonStyle = getButtonStyle(variant, size, fullWidth);
  const textStyle = getTextStyle(variant, size);
  const iconColor = getIconColor(variant);
  const iconSize = getIconSize(size);

  const content = (
    <View style={styles.contentContainer}>
      {icon && (
        <Ionicons
          name={icon}
          size={iconSize}
          color={iconColor}
          style={styles.icon}
        />
      )}
      <Text style={textStyle}>{title}</Text>
    </View>
  );

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

export default Button;
