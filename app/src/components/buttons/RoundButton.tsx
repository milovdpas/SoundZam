import React, {ReactNode} from 'react';
import {
  GestureResponderEvent,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
} from 'react-native';
import {Border, Spacing, Colors} from '../../assets/Stylesheet';
import {Shadow} from 'react-native-shadow-2';
import LinearGradient from 'react-native-linear-gradient';

type ButtonProps = {
  accessibilityHint?: string;
  children?: ReactNode;
  style?: TextStyle;
  type?: 'primary' | 'secondary';
  size?: 'small' | 'big';
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  disabled?: boolean | undefined;
};

const RoundButton = ({
  accessibilityHint,
  children,
  style = {},
  type = 'primary',
  size = 'big',
  onPress,
  disabled = false,
}: ButtonProps) => {
  return (
    <Shadow
      distance={shadowSizes[size]}
      startColor={'rgba(224, 167, 252, 0.2)'}>
      <TouchableOpacity
        accessibilityRole={'button'}
        accessibilityHint={accessibilityHint}
        style={styles.rounded}
        onPress={onPress}
        disabled={disabled}>
        <LinearGradient
          colors={buttonColors[type]}
          style={[style, styles.button, buttonSizes[size]]}>
          {children}
        </LinearGradient>
      </TouchableOpacity>
    </Shadow>
  );
};

const styles = StyleSheet.create({
  rounded: {
    borderRadius: Border.round,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Border.round,
  },
});

const buttonColors = {
  primary: [Colors.orange, Colors.red],
  secondary: [Colors.red, Colors.pink],
};

const shadowSizes = {
  small: 15,
  big: 30,
};

const buttonSizes = StyleSheet.create({
  small: {paddingHorizontal: Spacing.small, paddingVertical: Spacing.small},
  big: {
    paddingHorizontal: Spacing.large,
    paddingVertical: Spacing.large,
  },
});

export default RoundButton;
