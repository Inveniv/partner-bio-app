import React, { FC } from "react";
import { useTheme } from "react-native-paper";
import Svg, { Path, Rect } from "react-native-svg";
import { StyledTouchableRipple } from "utils/styled";

interface CheckboxProps {
  status: "checked" | "unchecked";
  onPress: () => void;
}

const Checkbox: FC<CheckboxProps> = ({ status, onPress }) => {
  const theme = useTheme();

  return (
    <StyledTouchableRipple className="p-1 rounded-md" onPress={onPress}>
      {status === "unchecked" ? (
        <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
          <Rect
            x={1}
            y={1}
            width={18}
            height={18}
            rx={4}
            stroke={theme.colors.background}
            strokeWidth={2}
          />
        </Svg>
      ) : (
        <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
          <Rect width={20} height={20} rx={5} fill={theme.colors.primary} />
          <Path
            d="M8.367 14.001l-3.8-3.8.95-.95 2.85 2.85 6.117-6.117.95.95-7.067 7.067z"
            fill={theme.colors.onPrimary}
          />
        </Svg>
      )}
    </StyledTouchableRipple>
  );
};

export default Checkbox;
