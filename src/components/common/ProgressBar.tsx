import React, { FC } from "react";
import { useTheme } from "react-native-paper";
import { StyledView } from "utils/styled";

type ProgressBarProps = {
  progress: number;
  className: string;
  color: string;
};

const ProgressBar: FC<ProgressBarProps> = ({ progress, className, color }) => {
  const theme = useTheme();

  return (
    <StyledView
      className={`w-full h-1 my-1.5 ${className}`}
      style={{ backgroundColor: theme.colors.background }}
    >
      <StyledView
        className="h-full bg-primary"
        style={{
          width: `${progress * 100}%`,
          backgroundColor: color ?? theme.colors.primary,
        }}
      />
    </StyledView>
  );
};

export default ProgressBar;
