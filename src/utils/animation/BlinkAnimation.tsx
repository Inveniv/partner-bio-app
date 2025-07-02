import React, { FC, PropsWithChildren, useEffect } from "react";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

type BlinkAnimationProps = {
  style?: any;
};

const BlinkAnimation: FC<PropsWithChildren<BlinkAnimationProps>> = ({
  children,
  style,
}) => {
  const opacity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      ...style,
      opacity: opacity.value,
    };
  }, []);

  // Trigger the fade-in animation when the component mounts or animateOn changes
  useEffect(() => {
    // Set opacity to 0 instantly, without animation
    opacity.value = 0;
    // Next frame, start the fade-in animation
    requestAnimationFrame(() => {
      opacity.value = withRepeat(
        withTiming(1, {
          duration: 700,
          easing: Easing.linear,
        }),
        -1,
        true, // True to automatically reverse the animation, creating the blink effect
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Depend on the animateOn prop

  return <Animated.View style={animatedStyle}>{children}</Animated.View>;
};

export default BlinkAnimation;
