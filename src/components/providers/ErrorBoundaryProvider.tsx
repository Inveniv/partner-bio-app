import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { FC, PropsWithChildren } from "react";
import ErrorBoundary from "react-native-error-boundary";
import { useTheme } from "react-native-paper";
import RNRestart from "react-native-restart"; // Import package from node modules
import { StyledButton, StyledText, StyledView } from "utils/styled";

const ErrorBoundaryProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorBoundaryScreen}>
      {/* @ts-expect-error */}
      {children}
    </ErrorBoundary>
  );
};

const ErrorBoundaryScreen: FC = ({ error }: any) => {
  const theme = useTheme();

  return (
    <StyledView
      className="h-full w-full flex-col justify-between pt-12 pb-12 px-4"
      style={{
        backgroundColor: theme.colors.onPrimary,
      }}
    >
      <StyledView />

      <StyledView>
        <StyledText
          className="font-medium text-xl mb-2"
          style={{
            color: theme.colors.secondary,
          }}
        >
          Whoops!
        </StyledText>
        <StyledText className="font-bold text-2xl mb-4">
          Something went wrong.
        </StyledText>
        <StyledText>
          Error: {error.toString().replace(/Error: /g, "")}
        </StyledText>
      </StyledView>

      <StyledView>
        <StyledButton
          style={{ backgroundColor: theme.colors.error }}
          onPress={async () => {
            await AsyncStorage.removeItem("JWToken");
            RNRestart.Restart();
          }}
        >
          Logout
        </StyledButton>
      </StyledView>
    </StyledView>
  );
};

export default ErrorBoundaryProvider;
