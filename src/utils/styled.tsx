import color from "color";
import Button from "components/overrides/Button";
import { styled } from "nativewind";
import React, { PropsWithChildren, useMemo } from "react";
import { FC } from "react";
import { Pressable, StyleProp, TextStyle, View, ViewStyle } from "react-native";
import { isTablet } from "react-native-device-info";
import {
  Appbar,
  ButtonProps,
  Dialog,
  DialogProps,
  Divider,
  Icon,
  IconButton,
  Text,
  TextProps,
  TouchableRipple,
  TouchableRippleProps,
  useTheme,
} from "react-native-paper";
import Animated, { AnimatedScrollViewProps } from "react-native-reanimated";

// Pressable
export const StyledPressable = styled(Pressable);

// View
export const StyledView = styled(View);

// ScrollView
const CustomScrollView: FC<AnimatedScrollViewProps> = ({ ...props }) => {
  return <Animated.ScrollView scrollEventThrottle={1} {...props} />;
};
export const StyledScrollView = styled(CustomScrollView);

// Text
//@ts-expect-error
Text.defaultProps = Text.defaultProps || {};
//@ts-expect-error
Text.defaultProps.allowFontScaling = false;

interface CustomTextProps extends Omit<TextProps<any>, "variant"> {
  variant?: "medium" | "bold";
}

const CustomText: FC<CustomTextProps> = ({ variant, ...props }) => {
  //@ts-expect-error
  return <Text variant={variant} {...props} />;
};
export const StyledText = styled(CustomText);

// Icon
export const StyledIcon = styled(Icon);

// Button
const CustomButton: FC<ButtonProps> = ({ loading, onPress, ...props }) => {
  const style = useMemo(() => {
    const buttonStyle: { [key: string]: any } = {};
    const labelStyle: { [key: string]: any } = {};

    if (props.disabled) {
      switch (props.mode) {
        case "contained":
          buttonStyle.backgroundColor = color("#000")
            .alpha(0.12)
            .rgb()
            .string();
          break;
        case "text":
          labelStyle.color = color("#000").alpha(0.38).rgb().string();
          break;
      }
    }

    return {
      buttonStyle,
      labelStyle,
    };
  }, [props.disabled, props.mode]);

  return (
    <Button
      mode="contained"
      loading={loading}
      onPress={(e) => {
        if (loading) {
          return;
        }

        onPress?.(e);
      }}
      {...props}
      labelStyle={[
        {
          fontSize: 16,
          fontFamily: "Poppins-Medium",
          // flex: 1,
          alignSelf: "stretch",
          textAlign: "center",
          //@ts-expect-error
          ...(props.labelStyle ?? {}),
        },
        style.labelStyle,
      ]}
      style={[props.style, style.buttonStyle]}
    >
      {props.children}
    </Button>
  );
};
export const StyledButton = styled(CustomButton);

// Icon Button
export const StyledIconButton = styled(IconButton);

// AppBar
export const StyledAppbar = styled(Appbar);

// Tocuhable Ripple
const CustomTouchableRipple: FC<TouchableRippleProps> = ({ ...props }) => {
  return <TouchableRipple borderless {...props} />;
};
export const StyledTouchableRipple = styled(CustomTouchableRipple);

// Divider
export const StyledDivider = styled(Divider);

type CustomDividerWithTextProps = PropsWithChildren & {
  dividerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

const CustomDividerWithText: FC<CustomDividerWithTextProps> = ({
  children,
  dividerStyle,
  textStyle,
}) => {
  const theme = useTheme();
  return (
    <StyledView className="flex justify-center items-center relative w-full">
      <Divider
        style={{
          width: "100%",
          position: "absolute",
          left: 0,
          top: 16,
          height: 1,
          //@ts-expect-error
          ...(dividerStyle ?? {}),
        }}
      />
      {children && (
        <StyledText
          className="relative text-center z-2 p-2 top-0 text-xs text-[#A7A7A7]"
          style={{
            backgroundColor: theme.colors.onPrimary,
            //@ts-expect-error
            ...(textStyle ?? {}),
          }}
        >
          {children}
        </StyledText>
      )}
    </StyledView>
  );
};
export const StyledDividerWithText = styled(CustomDividerWithText);

// Dialog
export const CustomDialog: FC<DialogProps> = ({ ...props }) => {
  const theme = useTheme();
  const style = useMemo(() => {
    const additionalStyling: { [key: string]: any } = {};
    if (isTablet()) {
      additionalStyling.width = 500;
      additionalStyling.marginLeft = "auto";
      additionalStyling.marginRight = "auto";
    }

    return {
      backgroundColor: theme.colors.onPrimary,
      borderRadius: 12,
      paddingTop: 10,
      ...additionalStyling,
    };
  }, [theme.colors.onPrimary]);

  return <Dialog style={style} {...props} />;
};
