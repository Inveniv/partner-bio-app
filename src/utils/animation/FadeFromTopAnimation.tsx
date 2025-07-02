import React, { FC, PropsWithChildren, useEffect } from "react";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";

type FadeFromTopAnimationProps = {
  animateOn: any;
  duration: number;
  delay: number;
  style?: any;
};

const FadeFromTopAnimation: FC<
  PropsWithChildren<FadeFromTopAnimationProps>
> = ({ children, animateOn, duration, delay, style = {} }) => {
  // Shared value for the opacity
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(-100);

  // Animated style that depends on the opacity shared value
  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: "100%",
      minWidth: "100%",
      opacity: opacity.value,
      top: `${translateY.value}%`,
      // transform: [{ x: `${translateY.value}%` }],
    };
  }, []);

  // Trigger the fade-in animation when the component mounts or animateOn changes
  useEffect(() => {
    // Set opacity to 0 instantly, without animation
    opacity.value = 0;
    translateY.value = -100;

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

      translateY.value = withDelay(
        delay,
        withTiming(0, {
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

export default FadeFromTopAnimation;
