import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import TextInput from "components/overrides/TextInput";
import { useField } from "formik";
import { uniqueId } from "lodash";
import { styled } from "nativewind";
import React, { forwardRef, useMemo } from "react";
import { TextInputProps } from "react-native-paper";
import { useTheme } from "react-native-paper";
import { RenderProps } from "react-native-paper/src/components/TextInput/types";
import { useSheetsStore } from "stores/global-store/sheets-store/SheetsStore";
import FadeInAnimation from "utils/animation/FadeInAnimation";
import { StyledText, StyledView } from "utils/styled";

type FormikTextFieldProps = TextInputProps & {
  name: string;
  type?: "default" | "bottom-sheet";
  minimize?: boolean;
  helperText?: string;
};

const FormikTextField = forwardRef<any, FormikTextFieldProps>(
  ({ name, type, helperText, ...props }, ref) => {
    const theme = useTheme();
    const [field, meta] = useField<string>(name);

    let additionalProps = {};
    if (type === "bottom-sheet") {
      additionalProps = {
        render: (renderProps: RenderProps) => (
          //@ts-expect-error
          <BottomSheetTextInput
            {...renderProps}
            onFocus={() => {
              useSheetsStore.getState().setInputFocused(true);
            }}
          />
        ),
      };
    }

    const outlineColor = useMemo(
      () => (theme.dark ? "#EBEDEF" : "#827E86"),
      [theme.dark],
    );

    return (
      <FadeInAnimation animateOn={true} duration={200} delay={100}>
        <TextInput
          ref={ref}
          id={`${name}-${uniqueId()}`}
          theme={theme}
          value={field.value}
          mode="outlined"
          onChangeText={field.onChange(name)}
          onBlur={field.onBlur(name)}
          dense
          outlineColor={meta.touched && meta.error ? "#FF0000" : outlineColor}
          {...additionalProps}
          {...props}
          className={`${theme.dark ? "bg-black" : "bg-white"}`}
        />
        {meta.touched && meta.error ? (
          <StyledText
            className="text-[#FF0000] text-[11px] ml-0.5"
            numberOfLines={1}
          >
            {meta.error}
          </StyledText>
        ) : helperText ? (
          <StyledText
            className="text-[11px] ml-0.5"
            numberOfLines={1}
            style={{
              color: theme.colors.secondary,
            }}
          >
            {helperText}
          </StyledText>
        ) : (
          <StyledView className="h-[16]" />
        )}
      </FadeInAnimation>
    );
  },
);

export default styled(FormikTextField);
