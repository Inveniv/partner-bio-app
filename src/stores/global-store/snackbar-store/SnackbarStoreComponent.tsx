import CheckOutlinedSVG from "components/icons/CheckOutliedSVG";
import CloseSVG from "components/icons/CloseSVG";
import ErrorSVG from "components/icons/ErrorSVG";
import InfoOutlinedSVG from "components/icons/InfoOutlinedSVG";
import WarningSVG from "components/icons/WarningSVG";
import React from "react";
import SnackbarAnimation from "utils/animation/SnackbarAnimation";
import { StyledText, StyledTouchableRipple, StyledView } from "utils/styled";

import { useSnackbarStore } from "./SnackbarStore";

const snackbarColor = {
  info: "#3E7BFA",
  success: "#34C759",
  warning: "#F38710",
  error: "#E63323",
};

const snackbarIcon = {
  info: InfoOutlinedSVG,
  success: CheckOutlinedSVG,
  warning: WarningSVG,
  error: ErrorSVG,
};

const SnackbarStoreComponent = () => {
  const snackbars = useSnackbarStore((s) => s.snackbars);

  return (
    <>
      {snackbars.map((snackbar) => {
        const Icon = snackbarIcon[snackbar.type];

        return (
          <SnackbarAnimation key={snackbar.key} isVisible={snackbar.visible}>
            <StyledView
              className="flex flex-row justify-between px-3 w-full h-full rounded-xl items-start pt-2.5 pb-2.5"
              style={{
                backgroundColor: snackbarColor[snackbar.type],
              }}
            >
              <StyledView className="flex flex-row space-x-3 flex-1 pr-6 items-start py-1.5">
                <Icon color="#fff" />
                <StyledText
                  className="color-white h-auto mt-0.5"
                  numberOfLines={2}
                >
                  {snackbar?.title}
                </StyledText>
              </StyledView>

              <StyledTouchableRipple
                className="rounded-full overflow-hidden p-1 h-8 mt-[1.5px]"
                onPress={() =>
                  useSnackbarStore.getState().closeSnackbar(snackbar.key)
                }
              >
                <CloseSVG color="#fff" />
              </StyledTouchableRipple>
            </StyledView>
          </SnackbarAnimation>
        );
      })}
    </>
  );
};

export default SnackbarStoreComponent;
