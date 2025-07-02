import "components/formik/yupErrorMessages";

import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import React, { FC, PropsWithChildren } from "react";
import { isTablet } from "react-native-device-info";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { OrientationLocker, PORTRAIT } from "react-native-orientation-locker";
import { SafeAreaProvider } from "react-native-safe-area-context";

import ErrorBoundaryProvider from "./ErrorBoundaryProvider";
import I18nProvider from "./I18nProvider";
import KeyboardAvoidingViewProvider from "./KeyboardAvoidViewProvider";
import LocaleProvider from "./LocaleProvider";
import ReactQueryProvider from "./ReactQueryProvider";
import ThemeProvider from "./ThemeProvider";

const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      {!isTablet() && <OrientationLocker orientation={PORTRAIT} />}

      <LocaleProvider>
        <I18nProvider>
          <ReactQueryProvider>
            <SafeAreaProvider style={{ flex: 1 }}>
              <KeyboardAvoidingViewProvider>
                <GestureHandlerRootView style={{ flex: 1 }}>
                  <ThemeProvider>
                    <ErrorBoundaryProvider>
                      <BottomSheetModalProvider>
                        {children}
                      </BottomSheetModalProvider>
                    </ErrorBoundaryProvider>
                  </ThemeProvider>
                </GestureHandlerRootView>
              </KeyboardAvoidingViewProvider>
            </SafeAreaProvider>
          </ReactQueryProvider>
        </I18nProvider>
      </LocaleProvider>
    </>
  );
};

export default Providers;
