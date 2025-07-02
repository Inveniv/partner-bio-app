import React, { FC, PropsWithChildren } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const SafeAreaProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  return <SafeAreaView>{children}</SafeAreaView>;
};

export default SafeAreaProvider;
