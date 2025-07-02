import { NavigationContainerRef } from "@react-navigation/native";
import { createRef } from "react";
import { Keyboard } from "react-native";

export const navigationRef = createRef<NavigationContainerRef<any>>();
export const isReadyRef: any = createRef();

const navigateWrapper = (callback: any) => {
  if (!isReadyRef?.current || !navigationRef?.current) {
    return;
  }

  return callback();
};

const onKeyboardClose = (callback: any) => {
  if (!Keyboard.isVisible()) {
    return callback();
  }

  Keyboard.dismiss();
  const onKeyboardHide = Keyboard.addListener("keyboardDidHide", () => {
    onKeyboardHide.remove();
    callback();
  });
};

export function getCurrentRoute() {
  return navigateWrapper(() => navigationRef.current?.getCurrentRoute());
}

export function navigate(name: any, params?: any) {
  return new Promise((resolve) => {
    navigateWrapper(() => {
      onKeyboardClose(() => {
        navigationRef.current?.navigate(name, params);
        resolve(true);
      });
    });
  });
}

export function reset(name: any) {
  navigateWrapper(() => {
    onKeyboardClose(() =>
      navigationRef.current?.reset({
        index: 0,
        routes: [{ name }],
      }),
    );
  });
}

export function goBack() {
  navigateWrapper(() => onKeyboardClose(() => navigationRef.current?.goBack()));
}

// Drawer
export function closeDrawer() {
  navigateWrapper(() =>
    //@ts-expect-error
    onKeyboardClose(() => navigationRef.current?.closeDrawer()),
  );
}
