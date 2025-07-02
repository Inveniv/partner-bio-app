import CloseSVG from "components/icons/CloseSVG";
import { useField } from "formik";
import React, { FC } from "react";
import { Image, Platform } from "react-native";
import DocumentScanner from "react-native-document-scanner-plugin";
import { openCamera } from "stores/global-store/camera-store/CameraStore";
import { StyledText, StyledTouchableRipple, StyledView } from "utils/styled";

type FormikPhotosProps = {
  name: string;
  type?: "camera" | "scanner";
  color?: string;
  disabled?: boolean;
};

const FormikPhotos: FC<FormikPhotosProps> = ({
  name,
  type = "camera",
  color = "#2978F3",
  disabled,
}) => {
  const [field, meta, helper] = useField<string[]>(name);

  const handleTakePhoto = async () => {
    switch (type) {
      case "camera":
        openCamera({
          handleSubmit: (photo: any) => {
            helper.setValue([...field.value, photo.path]);
          },
        });
        break;
      case "scanner":
        const { scannedImages } = await DocumentScanner.scanDocument();
        if (!scannedImages?.length) {
          return;
        }

        helper.setValue([...field.value, ...scannedImages]);
        break;
    }
  };

  return (
    <>
      <StyledView className="flex-row gap-4 flex-wrap">
        {field.value.map((photo: any, index: number) => (
          <StyledView
            key={index}
            className="w-[55px] h-[55px] rounded-xl relative"
          >
            <Image
              source={{
                uri: Platform.select({
                  ios: photo,
                  android: `file://${photo}`,
                }),
              }}
              width={55}
              height={55}
              className="bg-[#D9D9D9] rounded-xl"
            />
            {!disabled && (
              <StyledTouchableRipple
                onPress={() => {
                  helper.setValue(
                    field.value.filter((_: any, i: number) => i !== index),
                  );
                }}
                className="top-[-6px] right-[-6px] absolute z-[1] rounded-full p-0.5"
                style={{
                  backgroundColor: color,
                }}
              >
                <CloseSVG width={18} height={18} color="#fff" />
              </StyledTouchableRipple>
            )}
          </StyledView>
        ))}
        <StyledTouchableRipple
          disabled={disabled}
          onPress={handleTakePhoto}
          className="rounded-xl"
        >
          <StyledView
            className="flex items-center justify-center w-[55px] h-[55px] border-2 rounded-xl"
            style={{
              borderColor: color,
            }}
          >
            <StyledText
              className="text-[30px]"
              style={{
                color: color,
              }}
            >
              +
            </StyledText>
          </StyledView>
        </StyledTouchableRipple>
      </StyledView>

      {meta.touched && meta.error ? (
        <StyledView className="mt-1">
          <StyledText className="text-[#FF0000] text-[11px] ml-0.5">
            {meta.error}
          </StyledText>
        </StyledView>
      ) : null}
    </>
  );
};

export default FormikPhotos;
