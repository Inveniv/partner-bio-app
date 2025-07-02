import BackSVG from "components/icons/BackSVG";
import React, { useRef, useState } from "react";
import { Image } from "react-native";
import PagerView from "react-native-pager-view";
import { useTheme } from "react-native-paper";
import { navigate } from "utils/navigation";
import { StyledText, StyledTouchableRipple, StyledView } from "utils/styled";

const OnboardingScreen = () => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const pagerRef = useRef<PagerView>(null);

  const onboardingPages = [
    () => <StyledView className="flex-1 w-full h-full">
      <Image
        source={require("assets/images/onboarding/onboarding-1.png")}
        className=""
        resizeMode="contain"
      />
      <StyledText className="text-[30px]" variant="bold">
        <StyledText className="text-[#F15E3A]" variant="bold">Top-Rated</StyledText> Luxury
        Cannabis Brand in DC
      </StyledText>
      <StyledText className="text-[15px]">
        Discover our finely curated strains,
        hand-selected for the most discerning tastes.
      </StyledText>
    </StyledView>,
    () => <StyledView className="flex-1 w-full h-full">
      <Image
        source={require("assets/images/onboarding/onboarding-2.png")}
        className=""
        resizeMode="contain"
      />
      <StyledText className="text-[30px]" variant="bold">
        Your DC Medical Card
        <StyledText className="text-[#F15E3A]" variant="bold">Instantly</StyledText>
      </StyledText>
      <StyledText className="text-[15px]">
        Indulge in Artfully Crafted Edibles and
        Gourmet Gummies – Now Available
        at Exclusive Prices.
      </StyledText>
    </StyledView>,
    () => <StyledView className="flex-1 w-full h-full">
      <Image
        source={require("assets/images/onboarding/onboarding-3.png")}
        className=""
        resizeMode="contain"
      />
      <StyledText className="text-[30px]" variant="bold">
        <StyledText className="text-[#F15E3A]" variant="bold">Convenient</StyledText>Ordering
        & Pickup
      </StyledText>
      <StyledText className="text-[15px]">
        Order ahead with ease and enjoy a
        seamless in-store pickup experience.
      </StyledText>
    </StyledView>
  ]

  return (
    <StyledView className="flex-1 py-4 px-4">
      <PagerView
        useNext={true}
        onPageSelected={(e) => {
          setPage(e.nativeEvent.position);
        }}
        style={{ flex: 1 }}
        initialPage={0}
        ref={pagerRef}
      >
        {onboardingPages.map((page, index) => (
          <StyledView key={index} className="flex-1 w-full h-full">
            {page()}
          </StyledView>
        ))}
      </PagerView>
      {/* pagination */}
      <StyledView className="flex-row items-center justify-between gap-2 pb-4">
        <StyledView className="flex-row items-center gap-2">
          {onboardingPages.map((_, index) => (
            <StyledView key={index} className={`w-[7px] h-[7px] rounded-full ${index === page ? "bg-[#84AA9D] w-[20px]" : "bg-gray-300"}`} />
          ))}
        </StyledView>
        <StyledTouchableRipple
          onPress={() => {
            if (page < onboardingPages.length - 1) {
              pagerRef.current?.setPage(page + 1);
            } else {
              navigate("SignInScreen");
            }
          }}
          className="w-[60px] h-[60px] rounded-full bg-[#84AA9D] items-center justify-center">
          <StyledView className="rotate-[180deg]">
            <BackSVG width={24} height={24} />
          </StyledView>
        </StyledTouchableRipple>
      </StyledView>
    </StyledView >
  );
};

export default OnboardingScreen;
