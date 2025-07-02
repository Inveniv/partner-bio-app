import React, { FC } from "react";
import Svg, { Circle } from "react-native-svg";
import { StyledTouchableRipple } from "utils/styled";

interface RadioButtonProps {
  status: "checked" | "unchecked";
  onPress: () => void;
  color?: string;
}

const RadioButton: FC<RadioButtonProps> = ({
  status,
  onPress,
  color = "#000",
}) => {
  return (
    <StyledTouchableRipple className="p-1 rounded-full" onPress={onPress}>
      <Svg width={19} height={19} viewBox="0 0 19 19" fill="none">
        <Circle cx={9.5} cy={9.5} r={8.5} stroke={color} strokeWidth={2} />
        {status === "checked" && (
          <Circle cx={9.5} cy={9.5} r={5} fill={color} />
        )}
      </Svg>
    </StyledTouchableRipple>
  );
};

export default RadioButton;
