import React, { FC, PropsWithChildren, useEffect } from "react";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";

type FadeInAnimationProps = {
  animateOn: any;
  duration: number;
  delay: number;
  style?: any;
};

const FadeInAnimation: FC<PropsWithChildren<FadeInAnimationProps>> = ({
  children,
  animateOn,
  duration,
  delay,
  style = {},
}) => {
  // Shared value for the opacity
  const opacity = useSharedValue(0);

  // Animated style that depends on the opacity shared value
  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: "100%",
      minWidth: "100%",
      opacity: opacity.value,
    };
  }, []);

  // Trigger the fade-in animation when the component mounts or animateOn changes
  useEffect(() => {
    // Set opacity to 0 instantly, without animation
    opacity.value = 0;
    // Next frame, start the fade-in animation
    requestAnimationFrame(() => {
      // Fade in
      opacity.value = withDelay(
        delay,
        withTiming(1, {
          duration,
          easing: Easing.linear,
        }),
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animateOn]); // Depend on the animateOn prop

  return (
    <Animated.View style={[style, animatedStyle]}>{children}</Animated.View>
  );
};

export default FadeInAnimation;
