import { useField } from "formik";
import React, { FC } from "react";
import {
  CodeField,
  CodeFieldProps,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { useTheme } from "react-native-paper";
import { StyledText, StyledView } from "utils/styled";

type FormikCodeInputProps = Omit<CodeFieldProps, "renderCell"> & {
  name: string;
};

const CELL_COUNT = 6;
const FormikCodeInput: FC<FormikCodeInputProps> = ({ name }) => {
  const theme = useTheme();
  const [field] = useField<string>(name);
  const ref = useBlurOnFulfill({ value: field.value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: field.value,
    setValue: field.onChange(name),
  });

  return (
    <CodeField
      ref={ref}
      {...props}
      value={field.value}
      onBlur={field.onBlur(name)}
      onChangeText={field.onChange(name)}
      cellCount={CELL_COUNT}
      keyboardType="number-pad"
      renderCell={({ index, symbol, isFocused }) => (
        <StyledView
          onLayout={getCellOnLayoutHandler(index)}
          className="w-[40px] h-[40px] py-2 text-center justify-center items-center rounded-md"
          style={{
            borderWidth: isFocused ? 2 : 1,
            borderColor: theme.colors.onBackground,
          }}
        >
          <StyledText>{symbol}</StyledText>
        </StyledView>
      )}
    />
  );
};

export default FormikCodeInput;
