import React, { FC, memo, useEffect, useMemo, useState } from "react";
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { StyledView } from "utils/styled";

type TProps = {
  value: boolean;
  onChange: () => void;
  // onColor?: string;
  // offColor?: string;
  primaryColor?: string;
  secondaryColor?: string;
  label?: string;
  labelStyle?: any;
};

const Switch: FC<TProps> = ({
  value,
  onChange,
  primaryColor = "#000000",
  secondaryColor = "#7F8081",
  label = "",
  labelStyle,
}) => {
  const [isEnabled, setIsEnabled] = useState<boolean>(false);

  const animatedValue = useMemo(() => new Animated.Value(0), []);

  const moveToggle = animatedValue.interpolate({
    inputRange: [-0.2, 0.9],
    outputRange: [0, 20],
  });

  useEffect(() => {
    value && setIsEnabled(value);

    animatedValue.setValue(value ? 0 : 1);

    Animated.timing(animatedValue, {
      toValue: value ? 1 : 0,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, [animatedValue, value]);

  const toggleSwitch = () => {
    setIsEnabled(!isEnabled);
    onChange();
  };

  return (
    <View style={styles.container}>
      {!!label && <Text style={[styles.label, labelStyle]}>{label}</Text>}

      <TouchableOpacity onPress={toggleSwitch} activeOpacity={1}>
        <StyledView
          className={"border-2"}
          style={[
            styles.toggleContainer,
            {
              backgroundColor: value ? secondaryColor : "transparent",
              borderColor: secondaryColor,
            },
          ]}
        >
          <Animated.View
            style={[
              styles.toggleWheelStyle,
              { marginLeft: moveToggle, backgroundColor: primaryColor },
            ]}
          />
        </StyledView>
      </TouchableOpacity>
    </View>
  );
};

export default memo(Switch);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  toggleContainer: {
    width: 41,
    height: 24,
    marginLeft: 3,
    borderRadius: 20,
    justifyContent: "center",
  },
  label: {
    marginRight: 2,
  },
  toggleWheelStyle: {
    width: 14,
    height: 14,
    borderRadius: 12.5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.5,
    elevation: 1.5,
  },
});
