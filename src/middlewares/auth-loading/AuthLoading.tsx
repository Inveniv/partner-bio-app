import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useCallback, useEffect } from "react";
import { ActivityIndicator, useTheme } from "react-native-paper";
import SplashScreen from "react-native-splash-screen";
import * as navigation from "utils/navigation";
import { StyledView } from "utils/styled";

const AuthLoading = () => {
  const theme = useTheme();

  const checkUserToken = useCallback(async () => {
    const userToken = await AsyncStorage.getItem("JWToken");

    userToken ? navigation.reset("MainStack") : navigation.reset("AuthStack");
  }, []);

  // Hide splash screen
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  useEffect(() => {
    // check if user is logged in
    // if user is logged in, navigate to MainNavigator
    checkUserToken();
    // else navigate to AuthStack
  }, [checkUserToken]);

  return (
    <StyledView
      className="flex-1 items-center justify-center"
      style={{ backgroundColor: theme.colors.onPrimary }}
    >
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </StyledView>
  );
};

export default AuthLoading;
