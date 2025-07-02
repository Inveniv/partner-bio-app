import React, { FC, PropsWithChildren, useEffect } from "react";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { SNACKBAR_ANIMATION_DURATION } from "stores/global-store/snackbar-store/SnackbarStore";

type SnackbarAnimationProps = PropsWithChildren<{
  isVisible: boolean;
}>;

const SnackbarAnimation: FC<SnackbarAnimationProps> = ({
  isVisible,
  children,
}) => {
  // Animation control values
  const topPosition = useSharedValue(-200); // Start above the screen

  useEffect(() => {
    topPosition.value = withTiming(isVisible ? 100 : -200, {
      duration: SNACKBAR_ANIMATION_DURATION,
      easing: Easing.inOut(Easing.ease),
    }); // Animate in from top
  }, [isVisible, topPosition]);

  const animatedStyle = useAnimatedStyle(
    () => ({
      zIndex: 20,
      position: "absolute",
      width: 340,
      minHeight: 55,
      height: "auto",
      left: "50%",
      transform: [{ translateX: -170 }],

      top: topPosition.value,
    }),
    [],
  );

  return <Animated.View style={animatedStyle}>{children}</Animated.View>;
};

export default SnackbarAnimation;
