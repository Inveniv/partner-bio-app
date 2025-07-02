import Providers from "components/providers/Providers";
import AppNavigator from "navigation/AppNavigator";
import React, { JSX } from "react";
import { LogBox } from "react-native";
LogBox.ignoreLogs([
  "TextInput.Icon: Support for defaultProps",
  "[Reanimated] Tried to modify key",
]); // Ignore log notification by message

function App(): JSX.Element {
  return (
    <Providers>
      <AppNavigator />
    </Providers>
  );
}

export default App;
