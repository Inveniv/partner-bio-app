import ErrorSVG from "components/icons/ErrorSVG";
import React, { FC } from "react";
import { useTheme } from "react-native-paper";
import { StyledText, StyledView } from "utils/styled";

type AlertProps = {
  text: string;
};

const Alert: FC<AlertProps> = ({ text }) => {
  const theme = useTheme();

  return (
    <StyledView
      className={
        "pl-2 pr-4 py-2 flex flex-row space-x-2 bg-opacity-50 relative rounded-lg"
      }
      style={{
        backgroundColor: theme.colors.errorContainer,
      }}
    >
      <ErrorSVG color={theme.colors.error} />
      <StyledText
        className="text-xs pr-5"
        style={{
          color: theme.colors.error,
        }}
      >
        {text}
      </StyledText>
    </StyledView>
  );
};

export default Alert;
