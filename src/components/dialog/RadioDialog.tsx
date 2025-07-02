import FormikRadioButton from "components/formik/FormikRadioButton";
import { FormikProvider, useFormik } from "formik";
import React, { FC } from "react";
import { ScrollView } from "react-native";
import { Dialog, Divider } from "react-native-paper";
import { CustomDialog, StyledButton } from "utils/styled";

interface RadioDialogProps {
  visible: boolean;
  handleClose: () => void;
  handleSubmit: (item: string) => void;
  title?: string;
  items?: string[];
  initialValue?: string;
  color?: string;
  readOnly?: boolean;
}

const RadioDialog: FC<RadioDialogProps> = ({
  visible,
  handleClose,
  handleSubmit,
  title,
  items,
  initialValue = "",
  color = "#2978F3",
  readOnly = false,
}) => {
  const formik = useFormik({
    initialValues: {
      selectedItem: initialValue,
    },
    enableReinitialize: true,
    onSubmit: ({ selectedItem }) => {
      handleSubmit(selectedItem);
      handleClose();
      resetForm();
    },
  });

  const { resetForm, handleSubmit: submitForm } = formik;

  return (
    <CustomDialog
      visible={visible}
      onDismiss={() => {
        handleClose();
        resetForm();
      }}
    >
      <FormikProvider value={formik}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>
          <Divider className="mb-2" />

          <ScrollView className="max-h-[230] pr-1">
            {items?.map((item, index) => (
              <FormikRadioButton
                key={index}
                name="selectedItem"
                label={item}
                value={item}
                disabled={readOnly}
              />
            ))}
          </ScrollView>

          <Divider className="mt-2" />
        </Dialog.Content>
        <Dialog.Actions>
          {readOnly ? (
            <StyledButton
              mode="text"
              className="px-3"
              labelStyle={{ color: color }}
              onPress={() => {
                handleClose();
                resetForm();
              }}
            >
              Close
            </StyledButton>
          ) : (
            <>
              <StyledButton
                mode="text"
                className="px-3"
                labelStyle={{ color: color }}
                onPress={() => {
                  handleClose();
                  resetForm();
                }}
              >
                Cancel
              </StyledButton>
              <StyledButton
                mode="contained"
                className="px-3"
                style={{ backgroundColor: color }}
                onPress={() => submitForm()}
              >
                Save
              </StyledButton>
            </>
          )}
        </Dialog.Actions>
      </FormikProvider>
    </CustomDialog>
  );
};

export default RadioDialog;
