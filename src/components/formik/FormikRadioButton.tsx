import RadioButton from "components/common/RadioButton";
import { useField } from "formik";
import React, { FC } from "react";
import { useTheme } from "react-native-paper";
import { StyledText, StyledTouchableRipple, StyledView } from "utils/styled";

type FormikRadioButtonProps = {
  label: string;
  name: string;
  value: string;
  disabled?: boolean;
};

const FormikRadioButton: FC<FormikRadioButtonProps> = ({
  label,
  name,
  value,
  disabled = false,
}) => {
  const theme = useTheme();
  const [field, _meta, helper] = useField<string>(name);

  return (
    <StyledTouchableRipple
      disabled={disabled}
      onPress={() => {
        helper.setValue(value);
      }}
      className="mb-1 py-[4.5px]"
    >
      <StyledView className="flex-row items-center justify-between">
        <StyledText
          className="text-sm"
          style={{ color: theme.colors.secondary }}
        >
          {label}
        </StyledText>
        <RadioButton
          color={theme.colors.primary}
          status={field.value === value ? "checked" : "unchecked"}
          onPress={() => {
            if (disabled) {
              return;
            }

            helper.setValue(value);
          }}
        />
      </StyledView>
    </StyledTouchableRipple>
  );
};

export default FormikRadioButton;
