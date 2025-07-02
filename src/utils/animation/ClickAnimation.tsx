import { styled, StyledProps } from "nativewind";
import React, { FC, PropsWithChildren, useEffect } from "react";
import { ViewProps } from "react-native";
import Animated, {
  AnimatedProps,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const AnimatedStyledView = styled(Animated.View);

type ClickAnimationProps = StyledProps<AnimatedProps<ViewProps>> & {
  duration?: number;
  trigger: boolean;
};

const ClickAnimation: FC<PropsWithChildren<ClickAnimationProps>> = ({
  children,
  duration = 0,
  trigger,
  ...rest
}) => {
  const opacity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  }, []);

  useEffect(() => {
    opacity.value = trigger ? 0 : 1;
    // Start the fade-out/fade-in animation
    opacity.value = withTiming(trigger ? 1 : 0, {
      duration,
      ...(trigger ? { easing: Easing.in(Easing.elastic(1)) } : {}),
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]); // Empty dependency array ensures the effect runs only once

  return (
    <AnimatedStyledView {...rest} style={[rest.style, animatedStyle]}>
      {children}
    </AnimatedStyledView>
  );
};

export default ClickAnimation;
