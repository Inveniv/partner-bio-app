import { useQuery } from "@tanstack/react-query";
import { getSingleProduct } from "api/products";
import BackSVG from "components/icons/BackSVG";
import CartSVG from "components/icons/CartSVG";
import LoveSVG from "components/icons/LoveSVG";
import StarSVG from "components/icons/StarSVG";
import SunSVG from "components/icons/SunSVG";
import React, { useEffect, useMemo } from "react";
import { Image } from "react-native";
import { Appbar, useTheme } from "react-native-paper";
import { goBack } from "utils/navigation";
import {
  StyledScrollView,
  StyledText,
  StyledTouchableRipple,
  StyledView,
} from "utils/styled";

const ProductDetailsScreen = ({ route }: { route: any }) => {
  const { productId } = route.params;

  const theme = useTheme();

  const { data: productDetails } = useQuery({
    queryKey: ["products", productId],
    queryFn: () => getSingleProduct(productId),
    enabled: !!productId,
  });

  const productDetailsData = useMemo(() => {
    // @ts-ignore
    return productDetails?.product || {};
  }, [productDetails]);

  const [selectedVariant, setSelectedVariant] = React.useState<any>(
    productDetailsData?.variants?.[0] ?? null,
  );
  const [quantity, setQuantity] = React.useState<number>(1);

  useEffect(() => {
    setSelectedVariant(productDetailsData?.variants?.[0] ?? null);
  }, [productDetailsData]);

  return (
    <>
      <Appbar.Header style={{ backgroundColor: "#d4d0cc" }}>
        <StyledView className="justify-between items-center flex-row w-full flex-1 px-4">
          <StyledTouchableRipple
            style={{ backgroundColor: theme.colors.surface }}
            onPress={() => goBack()}
            className="items-center justify-center rounded-full w-[35px] h-[35px]"
          >
            <BackSVG />
          </StyledTouchableRipple>
          <Image
            source={require("assets/images/logo-dark.png")}
            width={115}
            height={25}
            resizeMode="contain"
            style={{
              width: 115,
              height: 25,
            }}
          />
          <StyledTouchableRipple
            style={{ backgroundColor: theme.colors.background }}
            className="items-center justify-center rounded-full w-[35px] h-[35px]"
          >
            <CartSVG />
          </StyledTouchableRipple>
        </StyledView>
      </Appbar.Header>

      <StyledView className="flex-1 h-full bg-white">
        {/* Product Details */}
        {productDetailsData && (
          <StyledView className="flex-1 h-full justify-between relative">
            <StyledScrollView className="flex-1 h-full">
              <StyledView className="px-4 flex-1 h-full">
                <StyledView className="relative h-[330px]">
                  {productDetailsData?.thumbnail && (
                    <Image
                      source={{ uri: productDetailsData?.thumbnail }}
                      className="w-full h-[330px] rounded-[13px]"
                    />
                  )}
                  <StyledView className="absolute bottom-0 right-0 bg-black rounded-[13px] items-center pt-0.5 pb-1 px-2">
                    <StyledView className="flex-row items-center space-x-1.5">
                      <StarSVG />
                      <StyledText className="text-white mt-0.5" variant="bold">
                        4.9
                      </StyledText>
                    </StyledView>
                    <StyledText variant="bold" className="text-white text-[9px]">
                      170 Reviews
                    </StyledText>
                  </StyledView>
                </StyledView>

                <StyledView className="mt-3 flex-row justify-between items-center">
                  <StyledView>
                    <StyledText className="text-lg" variant="bold">
                      {productDetailsData?.title}
                    </StyledText>
                    <StyledView className="flex-row space-x-1.5">
                      <SunSVG color={theme.colors.tertiary} width={16} />
                      <StyledView className="flex-row space-x-1">
                        <StyledText style={{ color: theme.colors.tertiary }}>
                          Sativa strain
                        </StyledText>
                        <StyledText>/ 30% THC</StyledText>
                      </StyledView>
                    </StyledView>
                  </StyledView>
                  {/* quantity */}
                  <StyledView className="flex-row items-center bg-[#EEEEEE] rounded-full px-2 h-[30px]">
                    <StyledTouchableRipple
                      onPress={() => quantity > 1 && setQuantity(quantity - 1)}
                      className="w-[20px] justify-center items-center rounded-lg"
                    >
                      <StyledText variant="bold">-</StyledText>
                    </StyledTouchableRipple>
                    <StyledText className="mx-2 mt-0.5 w-[15px] text-center">{quantity}</StyledText>
                    <StyledTouchableRipple
                      onPress={() => setQuantity(quantity + 1)}
                      className="w-[20px] justify-center items-center rounded-lg"
                    >
                      <StyledText variant="bold">+</StyledText>
                    </StyledTouchableRipple>
                  </StyledView>
                </StyledView>

                <StyledText className="text-lg mt-4" variant="bold">
                  Description
                </StyledText>
                <StyledText className="text-xs text-[#666666] mt-1.5">
                  {productDetailsData?.description || ""}
                </StyledText>

                <StyledText className="text-lg mt-4" variant="bold">
                  Variants
                </StyledText>
                <StyledView className="flex-row space-x-2">
                  {productDetailsData?.variants?.map(
                    (variant: any, index: number) => (
                      <StyledTouchableRipple
                        key={index}
                        onPress={() => setSelectedVariant(variant)}
                        className="rounded-full"
                      >
                        <StyledView
                          className={
                            "border border-[#888888] rounded-full h-[40px] min-w-[40px] items-center justify-center " +
                            (selectedVariant?.id === variant?.id
                              ? "border-black bg-black"
                              : "")
                          }
                        >
                          <StyledText
                            className={
                              selectedVariant?.id === variant?.id
                                ? "text-white"
                                : "text-[#888]"
                            }
                            variant="bold"
                          >
                            {variant?.title}
                          </StyledText>
                        </StyledView>
                      </StyledTouchableRipple>
                    ),
                  )}
                </StyledView>
              </StyledView>
            </StyledScrollView>

            <StyledView className="w-full pl-7 pr-4 pb-2 flex-row justify-between items-center space-x-4">
              <StyledText className="text-[24px]" variant="bold">
                $
                {selectedVariant?.calculated_price?.calculated_amount?.toFixed(
                  2,
                )}
              </StyledText>
              <StyledView className="flex-row space-x-2">
                <StyledTouchableRipple
                  style={{ backgroundColor: theme.colors.tertiary }}
                  onPress={() => { }}
                  className="items-center justify-center rounded-[13px] h-[50px] w-[160px]"
                >
                  <StyledView className="flex-row items-center justify-center space-x-3">
                    <CartSVG color="#fff" width={17} height={17} />
                    <StyledText className="text-base text-white" variant="bold">
                      Add to Cart
                    </StyledText>
                  </StyledView>
                </StyledTouchableRipple>

                <StyledTouchableRipple
                  onPress={() => { }}
                  className="items-center justify-center rounded-[13px] h-[50px] w-[50px] bg-[#EBEBEB]"
                >
                  <LoveSVG color="#000" width={17} height={17} />
                </StyledTouchableRipple>
              </StyledView>
            </StyledView>
          </StyledView>
        )}
      </StyledView>
    </>
  );
};

export default ProductDetailsScreen;
