import { NavigationContainer, useTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthLoading from "middlewares/auth-loading/AuthLoading";
import OnboardingScreen from "pages/onboarding/OnboardingScreen";
import ProductDetailsScreen from "pages/product-details/ProductDetailsScreen";
import HomeScreen from "pages/home/HomeScreen";
import SignInScreen from "pages/sign-in/SignInScreen";
import React from "react";
import GlobalStore from "stores/global-store/GlobalStore";
import { isReadyRef, navigationRef } from "utils/navigation";

// Create Stack Navigation
const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* */}
      <Stack.Screen
        name="HomeScreen"
        getComponent={() => HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="OnboardingScreen"
        getComponent={() => OnboardingScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="ProductDetailsScreen"
        getComponent={() => ProductDetailsScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SignInScreen"
        getComponent={() => SignInScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const MainNavigator = () => {
  return (
    <>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <></>
      </Stack.Navigator>
    </>
  );
};

export default function AppNavigator() {
  const theme = useTheme();

  return (
    <>
      <NavigationContainer
        ref={navigationRef}
        onReady={() => {
          isReadyRef.current = true;
        }}
        theme={theme}
      >
        <Stack.Navigator
          screenOptions={{
            headerBackTitleVisible: false,
            headerShown: false,
            headerTitleAlign: "center",
          }}
        >
          <Stack.Screen name="AuthLoading" getComponent={() => AuthLoading} />
          <Stack.Screen name="AuthStack" getComponent={() => AuthStack} />
          <Stack.Screen name="MainStack" getComponent={() => MainNavigator} />
        </Stack.Navigator>
      </NavigationContainer>

      <GlobalStore />
    </>
  );
}
