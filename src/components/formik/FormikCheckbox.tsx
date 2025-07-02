import Checkbox from "components/common/Checkbox";
import { useField } from "formik";
import React, { FC, ReactElement } from "react";
import { useTheme } from "react-native-paper";
import { StyledText, StyledTouchableRipple, StyledView } from "utils/styled";

type FormikCheckboxProps = {
  label: string;
  name: string;
  value: string;
  customLabel?: ReactElement;
  disabled?: boolean;
};

const FormikCheckbox: FC<FormikCheckboxProps> = ({
  label,
  name,
  value,
  customLabel: CustomLabel,
  disabled = false,
}) => {
  const theme = useTheme();
  const [field, _meta, helper] = useField<string[]>(name);

  return (
    <StyledTouchableRipple
      disabled={disabled}
      onPress={() => {
        if (field.value.includes(value)) {
          helper.setValue(field.value.filter((el) => el !== value));
          return;
        }

        helper.setValue([...field.value, value]);
      }}
      className="mb-1 py-1"
    >
      <StyledView className="flex-row items-center justify-between">
        {CustomLabel ? (
          CustomLabel
        ) : (
          <StyledText
            className="text-sm flex-1 pr-2"
            style={{ color: theme.colors.secondary }}
            numberOfLines={1}
          >
            {label}
          </StyledText>
        )}
        <Checkbox
          status={field.value.includes(value) ? "checked" : "unchecked"}
          onPress={() => {
            if (disabled) {
              return;
            }

            if (field.value.includes(value)) {
              helper.setValue(field.value.filter((el) => el !== value));
              return;
            }

            helper.setValue([...field.value, value]);
          }}
        />
      </StyledView>
    </StyledTouchableRipple>
  );
};

export default FormikCheckbox;
