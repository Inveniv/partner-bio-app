import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetProps as GorhomBottomSheetProps,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import BackSVG from "components/icons/BackSVG";
import CloseSVG from "components/icons/CloseSVG";
import FaqSVG from "components/icons/FaqSVG";
import React, { forwardRef, ReactNode, useMemo } from "react";
import { Dimensions } from "react-native";
import { useTheme } from "react-native-paper";
import { useSheetsStore } from "stores/global-store/sheets-store/SheetsStore";
import { navigate } from "utils/navigation";
import { StyledText, StyledTouchableRipple, StyledView } from "utils/styled";

export type BottomSheetProps = GorhomBottomSheetProps & {
  title: string | undefined;
  hasBackButton?: boolean;
  onDismiss?: () => void;
  onBackPress?: () => void;
  children: (props: any) => ReactNode | undefined;
};

const BottomSheet = forwardRef<any, BottomSheetProps>(
  (
    { children, title, hasBackButton, onDismiss, onBackPress, ...rest },
    ref,
  ) => {
    const theme = useTheme();

    const dismissable = useSheetsStore((s) => s.dismissable);

    const core = useMemo(() => {
      return (props: any) => {
        return (
          <BottomSheetView>
            <StyledView className="h-auto">
              <StyledView className="flex-row items-center justify-between pl-4 pr-3 py-4">
                {hasBackButton ? (
                  <StyledView className="flex-row items-center space-x-2">
                    <StyledTouchableRipple
                      className="rounded-full overflow-hidden p-1"
                      onPress={onBackPress}
                    >
                      <BackSVG color={theme.colors.primary} />
                    </StyledTouchableRipple>
                    <StyledText variant="bold" className="text-lg ml-2">
                      {title}
                    </StyledText>
                  </StyledView>
                ) : (
                  <StyledText variant="bold" className="text-lg">
                    {title}
                  </StyledText>
                )}

                <StyledView className="flex-row items-center space-x-1">
                  <StyledTouchableRipple
                    className="rounded-full overflow-hidden p-1"
                    onPress={async () => {
                      await navigate("PDF", {
                        title: `${title} Manual`,
                        file: "manual",
                      });

                      onDismiss?.();

                      // @ts-expect-error
                      ref?.current?.dismiss();
                    }}
                  >
                    <FaqSVG color={theme.colors.primary} />
                  </StyledTouchableRipple>
                  <StyledTouchableRipple
                    className="rounded-full overflow-hidden p-1"
                    onPress={() => {
                      onDismiss?.();

                      // @ts-expect-error
                      ref?.current?.dismiss();
                    }}
                  >
                    <CloseSVG color={theme.colors.primary} />
                  </StyledTouchableRipple>
                </StyledView>
              </StyledView>
              {children(props?.data ?? {})}
            </StyledView>
          </BottomSheetView>
        );
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
      children,
      title,
      hasBackButton,
      onDismiss,
      onBackPress,
      theme.colors.primary,
    ]);

    return (
      <BottomSheetModal
        ref={ref}
        index={0}
        onDismiss={() => {
          useSheetsStore.getState().setInputFocused(false);
        }}
        enableDismissOnClose={dismissable}
        enableOverDrag={false}
        enableContentPanningGesture // TODO Fix pager gesture
        enablePanDownToClose
        style={{
          maxWidth: 500,
          width: "100%",
          marginLeft:
            Dimensions.get("window").width > 500
              ? (Dimensions.get("window").width - 500) / 2
              : 0,
        }}
        handleStyle={{
          display: "none",
        }}
        backgroundStyle={{
          backgroundColor: theme.colors.onPrimary,
          borderRadius: 20,
        }}
        backdropComponent={(backdropProps) => (
          <BottomSheetBackdrop
            {...backdropProps}
            onPress={() => {
              onDismiss?.();
            }}
            style={{
              //@ts-expect-error
              ...(backdropProps.style ?? {}),
              backgroundColor: theme.colors.backdrop,
            }}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
          />
        )}
        keyboardBehavior="interactive"
        keyboardBlurBehavior="restore"
        android_keyboardInputMode="adjustResize"
        enableDynamicSizing
        // stackBehavior="push"
        {...rest}
      >
        {core}
      </BottomSheetModal>
    );
  },
);

export default BottomSheet;
