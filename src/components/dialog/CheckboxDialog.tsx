import FormikCheckbox from "components/formik/FormikCheckbox";
import { FormikProvider, useFormik } from "formik";
import React, { FC, Fragment, ReactElement } from "react";
import { ScrollView } from "react-native";
import { Dialog, Divider } from "react-native-paper";
import { CustomDialog, StyledButton } from "utils/styled";

interface CheckboxDialogProps {
  visible: boolean;
  handleClose: () => void;
  handleSubmit: (items: string[]) => void;
  title?: string;
  items?: string[];
  renderItem?: (label: string, index: number) => ReactElement | null;
  initialValues?: string[];
  color?: string;
  readOnly?: boolean;
  divider?: boolean;
}

const CheckboxDialog: FC<CheckboxDialogProps> = ({
  visible,
  handleClose,
  handleSubmit,
  title,
  items,
  renderItem,
  initialValues = [],
  color = "#2978F3",
  readOnly = false,
  divider = false,
}) => {
  const formik = useFormik({
    initialValues: {
      selectedItems: initialValues,
    },
    enableReinitialize: true,
    onSubmit: ({ selectedItems }) => {
      handleSubmit(selectedItems);
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
              <Fragment key={index}>
                {divider && index !== 0 && <Divider className="my-1" />}
                <FormikCheckbox
                  name="selectedItems"
                  label={item}
                  customLabel={renderItem?.(item, index) ?? undefined}
                  value={item}
                  disabled={readOnly}
                />
              </Fragment>
            ))}
          </ScrollView>

          <Divider className="mt-2" />
        </Dialog.Content>
        <Dialog.Actions>
          {readOnly ? (
            <StyledButton
              mode="text"
              className="px-3"
              labelStyle={{ color }}
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
                labelStyle={{ color }}
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

export default CheckboxDialog;
