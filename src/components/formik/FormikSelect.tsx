import ArrowDropDownSVG from "components/icons/ArrowDropDownSVG";
import TextInput from "components/overrides/TextInput";
import { useField } from "formik";
import { StyledProps } from "nativewind";
import React, { FC } from "react";
import { TouchableRippleProps, useTheme } from "react-native-paper";
import { openDialog } from "stores/global-store/dialogs-store/DialogsStore";
import { StyledTouchableRipple } from "utils/styled";

import FormikTextInput from "./FormikTextInput";

type FormikSelectProps = Omit<StyledProps<TouchableRippleProps>, "children"> & {
  name: string;
  label: string;
  options: string[];
  multiple?: boolean;
  color?: string;
  disabled?: boolean;
  onChange?: (value: string | string[]) => void;
};

const FormikSelect: FC<FormikSelectProps> = ({
  name,
  label,
  options,
  multiple = false,
  color,
  disabled = false,
  onChange,
  ...rest
}) => {
  const theme = useTheme();
  const [field, _meta, helper] = useField<string | string[]>(name);

  const handleOpenDialog = () => {
    switch (multiple) {
      case true:
        openDialog("checkbox", {
          title: "Defects",
          items: options,
          initialValues: field.value,
          color,
          readOnly: disabled,
          handleSubmit: (selectedItems: string[]) => {
            helper.setValue(selectedItems);
            onChange?.(selectedItems);
          },
        });
        break;
      case false:
        openDialog("radio", {
          title: label,
          items: options,
          initialValue: field.value,
          color,
          readOnly: disabled,
          handleSubmit: (selectedItems: string) => {
            helper.setValue(selectedItems);
            onChange?.(selectedItems);
          },
        });
        break;
    }
  };

  return (
    <StyledTouchableRipple onPress={handleOpenDialog} {...rest}>
      <FormikTextInput
        name={name}
        value={
          typeof field.value === "string"
            ? field.value
            : `${field.value.length} selected`
        }
        label={label}
        style={{ pointerEvents: "none" }}
        readOnly
        right={
          <TextInput.Icon
            icon={() => <ArrowDropDownSVG color={theme.colors.primary} />}
            style={{ marginTop: 0, marginRight: 0 }}
          />
        }
      />
    </StyledTouchableRipple>
  );
};

export default FormikSelect;
