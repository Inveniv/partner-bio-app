import { useQuery } from "@tanstack/react-query";
import { getProducts } from "api/products";
import ConfigureSVG from "components/icons/ConfigureSVG";
import HamburgerSVG from "components/icons/HamburgerSVG";
import LoveSVG from "components/icons/LoveSVG";
import SearchSVG from "components/icons/SearchSVG";
import TextInput from "components/overrides/TextInput";
import React, { useMemo } from "react";
import { Image, TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Appbar, useTheme } from "react-native-paper";
import { navigate } from "utils/navigation";
import {
  StyledButton,
  StyledScrollView,
  StyledText,
  StyledTouchableRipple,
  StyledView,
} from "utils/styled";

const HomeScreen = () => {
  const theme = useTheme();
  const { data: productsData } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const products = useMemo(() => {
    // @ts-ignore
    return productsData?.products || [];
  }, [productsData]);

  const promotionsDummyData = [
    {
      id: 1,
      title: "50% Off",
      subtitle: "On everything today",
      code: "monko50",
      image: require("assets/images/promotions/promo-1.png"),
    },
    {
      id: 2,
      title: "70% Off",
      subtitle: "On everything today",
      code: "monko70",
      image: require("assets/images/promotions/promo-1.png"),
    },
  ];

  return (
    <>
      <Appbar.Header style={{ backgroundColor: "#d4d0cc" }}>
        <StyledView className="justify-between items-center flex-row w-full flex-1 px-4">
          <StyledTouchableRipple
            style={{ backgroundColor: theme.colors.surface }}
            className="items-center justify-center rounded-full w-[35px] h-[35px]"
          >
            <HamburgerSVG />
          </StyledTouchableRipple>
          <Image source={require("assets/images/logo-dark.png")} />
          <StyledTouchableRipple
            style={{ backgroundColor: theme.colors.surface }}
            className="items-center justify-center rounded-full w-[35px] h-[35px]"
          >
            <Image source={require("assets/images/sample-avatar.png")} />
          </StyledTouchableRipple>
        </StyledView>
      </Appbar.Header>
      <StyledScrollView className="py-4 bg-white">
        <StyledView className="flex-row space-x-1 mb-3 px-4">
          <StyledText className="text-xl" variant="bold">
            Welcome
          </StyledText>
          <StyledText
            className="text-xl"
            variant="bold"
            style={{ color: "#84AA9D" }}
          >
            Miles
          </StyledText>
        </StyledView>

        <StyledView className="flex-row justify-between items-center space-x-3 px-4 mb-5 mt-5">
          <TextInput
            placeholder="Search..."
            theme={theme}
            dense
            mode="outlined"
            className={`bg-[#F3F4F5] flex-1`}
            outlineStyle={{ borderWidth: 0, borderRadius: 100 }}
            left={
              <TextInput.Icon
                icon={() => <SearchSVG />}
                style={{ marginTop: 4 }}
              />
            }
          />
          <StyledTouchableRipple className="w-[50px] h-[50px] items-center justify-center rounded-full bg-[#1D1F28]">
            <ConfigureSVG />
          </StyledTouchableRipple>
        </StyledView>

        <StyledView className="h-[160px] mt-6 mb-10">
          <FlatList
            horizontal
            data={promotionsDummyData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item, index }) => (
              <StyledView className={"w-[260px] h-[160px] relative mr-3" + (index === 0 ? " ml-4" : "")}>
                <Image source={item.image} className="rounded-[20px] absolute" />
                <StyledView className="relative w-full h-full flex-1 rounded-[20px] py-4 px-3.5" style={{ backgroundColor: "rgba(0, 0, 0, 0.35)" }}>
                  <StyledText variant="bold" className="text-white text-[25px] leading-[1]">
                    {item.title}
                  </StyledText>
                  <StyledText className="text-white">
                    {item.subtitle}
                  </StyledText>
                  <StyledText variant="medium" className="text-xs text-white mt-2">
                    With code: {item.code}
                  </StyledText>
                  <StyledButton className="w-[100px] mt-2" labelStyle={{ fontSize: 12 }}>
                    Get Now
                  </StyledButton>
                </StyledView>
              </StyledView>
            )}
          />
        </StyledView>

        <StyledView className="px-4">
          <StyledView className="flex-row justify-between items-center mb-3">
            <StyledText className="text-lg" variant="bold">
              New Arrivals
            </StyledText>
            <StyledTouchableRipple
              onPress={() => {
                console.log("View All");
              }}
            >
              <StyledText
                className="text-xs"
                style={{ color: theme.colors.tertiary }}
                variant="bold"
              >
                View All
              </StyledText>
            </StyledTouchableRipple>
          </StyledView>
          <FlatList
            data={products}
            numColumns={2}
            keyExtractor={(_item, index) => `product-${index}`}
            renderItem={({ item }) => (
              <StyledTouchableRipple
                onPress={() => {
                  navigate("ProductDetailsScreen", {
                    productId: item.id,
                  });
                }}
                className="flex-1 px-2 my-1.5 rounded-md"
              >
                <StyledView className="items-center w-full relative">
                  <StyledView
                    className="absolute z-[2] top-[12px] right-[22px] rounded-full w-[20px] h-[20px] items-center justify-center"
                    style={{ backgroundColor: "#1D1F28" }}
                  >
                    <LoveSVG />
                  </StyledView>
                  <Image
                    source={{ uri: item?.thumbnail }}
                    className="w-full h-[150px] rounded-md"
                  />
                  <StyledText variant="bold" className="text-center mt-2 mb-0">
                    {item.title}
                  </StyledText>
                  <StyledText className="text-center text-xs">
                    {item.subtitle}
                  </StyledText>
                  <StyledText
                    className="text-center text-xs mt-0.5"
                    variant="bold"
                  >
                    $
                    {item.variants?.[0]?.calculated_price?.calculated_amount?.toFixed(
                      2,
                    )}
                  </StyledText>
                </StyledView>
              </StyledTouchableRipple>
            )}
            scrollEnabled={false}
          />
        </StyledView>
      </StyledScrollView>
    </>
  );
};

export default HomeScreen;
