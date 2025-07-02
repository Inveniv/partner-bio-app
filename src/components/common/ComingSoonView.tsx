import ComingSoonSVG from "components/icons/ComingSoonSVG";
import React, { FC } from "react";
import { FormattedMessage } from "react-intl";
import { useTheme } from "react-native-paper";
import { StyledText, StyledView } from "utils/styled";

type ComingSoonViewProps = {
  dialog?: boolean;
};

const ComingSoonView: FC<ComingSoonViewProps> = ({ dialog }) => {
  const theme = useTheme();

  return (
    <StyledView
      className="flex-1 justify-center items-center gap-3"
      style={{
        backgroundColor: dialog
          ? theme.colors.onPrimary
          : theme.colors.background,
      }}
    >
      <ComingSoonSVG />
      <StyledText variant="medium" className="text-[36px] text-[#a7a7a7]">
        <FormattedMessage id="COMMON.COMING_SOON" />
      </StyledText>
    </StyledView>
  );
};

export default ComingSoonView;
