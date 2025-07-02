import React, { FC, Fragment } from "react";
import { FormattedMessage } from "react-intl";
import { useTheme } from "react-native-paper";
import { StyledText, StyledView } from "utils/styled";

type StepperProps = {
  currentStep: number;
  steps: string[];
  color?: string;
};

const Stepper: FC<StepperProps> = ({ currentStep, steps, color }) => {
  const theme = useTheme();

  return (
    <StyledView className="flex-row items-center mb-4">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isCompleted = currentStep > stepNumber;
        const isActive = currentStep === stepNumber;

        return (
          <Fragment key={index}>
            {/* NUMBER BOX */}
            <StyledView
              className={
                "w-[23px] h-[23px] items-center justify-center rounded-full"
              }
              style={{
                marginLeft: index === 0 ? 0 : 8,
                backgroundColor: isCompleted ? color ?? "#2978F3" : "#D9D9D9",
              }}
            >
              <StyledText
                style={{ color: isCompleted ? "#fff" : theme.colors.onPrimary }}
                className="text-xs text-center"
              >
                {stepNumber}
              </StyledText>
            </StyledView>
            {/* TEXT */}
            {isActive && (
              <StyledText
                variant="medium"
                className="text-xs w-2/3 text-left mr-auto ml-2"
              >
                <FormattedMessage id={step} />
              </StyledText>
            )}
          </Fragment>
        );
      })}
    </StyledView>
  );
};

export default Stepper;
