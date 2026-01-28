import React from 'react';
import { View, Text, Pressable, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { theme } from '../constants/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export default function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  style,
  textStyle,
}: ButtonProps) {
  const getButtonStyle = (): ViewStyle[] => {
    const baseStyle = [styles.button, styles[`button_${size}`]];
    
    if (variant === 'primary') {
      baseStyle.push(styles.buttonPrimary);
    } else if (variant === 'secondary') {
      baseStyle.push(styles.buttonSecondary);
    } else if (variant === 'outline') {
      baseStyle.push(styles.buttonOutline);
    }
    
    if (disabled) {
      baseStyle.push(styles.buttonDisabled);
    }
    
    if (style) {
      baseStyle.push(style);
    }
    
    return baseStyle;
  };

  const getTextStyle = (): TextStyle[] => {
    const baseStyle = [styles.text, styles[`text_${size}`]];
    
    if (variant === 'primary') {
      baseStyle.push(styles.textPrimary);
    } else if (variant === 'secondary') {
      baseStyle.push(styles.textSecondary);
    } else if (variant === 'outline') {
      baseStyle.push(styles.textOutline);
    }
    
    if (disabled) {
      baseStyle.push(styles.textDisabled);
    }
    
    if (textStyle) {
      baseStyle.push(textStyle);
    }
    
    return baseStyle;
  };

  return (
    <View style={getButtonStyle()}>
      <Pressable
        style={styles.pressable}
        onPress={onPress}
        disabled={disabled}
      >
        <Text style={getTextStyle()}>{title}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: theme.borderRadius.md,
    overflow: 'hidden',
    ...theme.shadows.small,
  },
  button_small: {
    minHeight: 36,
  },
  button_medium: {
    minHeight: 44,
  },
  button_large: {
    minHeight: 52,
  },
  buttonPrimary: {
    backgroundColor: theme.colors.primary, // Green-500
  },
  buttonSecondary: {
    backgroundColor: theme.colors.secondary, // Green-600
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: theme.colors.primary, // Green-500
  },
  buttonDisabled: {
    backgroundColor: theme.colors.textSecondary,
  },
  pressable: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
  },
  text: {
    fontWeight: '600',
  },
  text_small: {
    fontSize: 14,
  },
  text_medium: {
    fontSize: 16,
  },
  text_large: {
    fontSize: 18,
  },
  textPrimary: {
    color: '#FFFFFF',
  },
  textSecondary: {
    color: '#FFFFFF',
  },
  textOutline: {
    color: theme.colors.primary, // Green-500
  },
  textDisabled: {
    color: '#FFFFFF',
    opacity: 0.6,
  },
});