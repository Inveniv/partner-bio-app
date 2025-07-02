import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { timezoneOffset } from "api/terminal/timezone";
import TextInput from "components/overrides/TextInput";
import { useField } from "formik";
import { uniqueId } from "lodash";
import { styled } from "nativewind";
import React, { FC, useMemo, useState } from "react";
import DatePicker from "react-native-date-picker";
import { TextInputProps } from "react-native-paper";
import { useTheme } from "react-native-paper";
import { RenderProps } from "react-native-paper/src/components/TextInput/types";
import { driverTimezone } from "stores/auth-store/driver-store/DriverStore";
import { useSheetsStore } from "stores/global-store/sheets-store/SheetsStore";
import FadeInAnimation from "utils/animation/FadeInAnimation";
import dayjs from "utils/dayjs";
import { StyledText, StyledTouchableRipple, StyledView } from "utils/styled";

type FormikDateTimePickerProps = TextInputProps & {
  name: string;
  type?: "default" | "bottom-sheet";
  minimize?: boolean;
  datePickerMode: "date" | "time" | "datetime";
  minDate?: string;
  maxDate?: string;
};

const FormikDateTimePicker: FC<FormikDateTimePickerProps> = ({
  name,
  type = "default",
  datePickerMode,

  minDate,
  maxDate,
  ...props
}) => {
  const theme = useTheme();
  const [field, meta, helper] = useField<string>(name);
  const [open, setOpen] = useState<boolean>(false);

  let additionalProps = {};
  if (type === "bottom-sheet") {
    additionalProps = {
      render: (renderProps: RenderProps) => (
        //@ts-expect-error
        <BottomSheetTextInput
          {...renderProps}
          onFocus={(e) => {
            useSheetsStore.getState().setInputFocused(true);

            //@ts-expect-error
            renderProps?.onFocus(e);
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
    <>
      <FadeInAnimation animateOn={true} duration={200} delay={100}>
        <StyledTouchableRipple
          onPress={() => {
            setOpen(true);
          }}
        >
          <TextInput
            id={`${name}-${uniqueId()}`}
            theme={theme}
            mode="outlined"
            onChangeText={field.onChange(name)}
            onBlur={field.onBlur(name)}
            dense
            outlineColor={meta.touched && meta.error ? "#FF0000" : outlineColor}
            {...additionalProps}
            {...props}
            className={`${theme.dark ? "bg-black" : "bg-white"}`}
            value={dayjs(field.value)
              .useTimezone(driverTimezone())
              .format("ddd, MMM DD YYYY h:mm A")}
          />
        </StyledTouchableRipple>
        {meta.touched && meta.error ? (
          <StyledText className="text-[#FF0000] text-[11px] ml-0.5">
            {meta.error}
          </StyledText>
        ) : (
          <StyledView className="h-[15]" />
        )}
      </FadeInAnimation>

      <DatePicker
        timeZoneOffsetInMinutes={timezoneOffset(driverTimezone())}
        modal
        open={open}
        date={dayjs(field.value).toDate()}
        minimumDate={minDate ? dayjs(minDate).toDate() : undefined}
        maximumDate={maxDate ? dayjs(maxDate).toDate() : undefined}
        onConfirm={(date) => {
          helper.setValue(dayjs(date).toISOString());
          setOpen(false);
        }}
        onCancel={() => {
          setOpen(false);
        }}
        mode={datePickerMode}
      />
    </>
  );
};

export default styled(FormikDateTimePicker);
