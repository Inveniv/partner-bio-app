import { delay } from "lodash";
import React, { FC, PropsWithChildren, useEffect } from "react";
import { Keyboard, KeyboardAvoidingView, Platform } from "react-native";
import { useSheetsStore } from "stores/global-store/sheets-store/SheetsStore";
import { delay as awaitDelay } from "utils/delay";

const KeyboardAvoidingViewProvider: FC<PropsWithChildren> = ({ children }) => {
  const focused = useSheetsStore((s) => s.inputFocused);

  const addKeyboardShown = async () => {
    useSheetsStore.getState().setDismissable(false);
    delay(() => {
      useSheetsStore.getState().setDismissable(true);
    }, 300);

    await awaitDelay(100);
  };

  useEffect(() => {
    const willShowSubscription = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
      addKeyboardShown,
    );

    return () => {
      willShowSubscription.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      enabled={!focused}
    >
      {children}
    </KeyboardAvoidingView>
  );
};

export default KeyboardAvoidingViewProvider;
