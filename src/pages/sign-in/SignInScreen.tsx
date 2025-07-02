import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Image } from "react-native";
import Video, { VideoRef } from "react-native-video";
import { navigate } from "utils/navigation";
import { StyledText, StyledTouchableRipple, StyledView } from "utils/styled";

const SignInScreen = () => {
  const videoRef = useRef<VideoRef>(null);
  const background = require("assets/videos/Monko_Splash.mov");

  // const [products, setProducts] = useState([]);

  // function fetchProducts() {
  //   axios
  //     .get(`http://192.168.1.66:9000/store/products`, {
  //       headers: {
  //         "x-publishable-api-key":
  //           "pk_c6456f0c16af6aa8b5cedad4c51a86da157af707a2a4482c0085bae66bfa469a",
  //       },
  //     })
  //     .then((res) => {
  //       console.log(res.data);
  //       setProducts(res.data.products);
  //     })
  //     .catch((err) => {
  //       console.log(`Error: ${err?.response?.data?.message}`);
  //     });
  // }

  // useEffect(() => {
  //   fetchProducts();
  // }, []);

  return (
    <>
      <StyledView className="justify-center items-center h-full w-full flex-1 relative">
        <Video
          source={background}
          ref={videoRef}
          className="absolute flex-1 top-0 left-0 w-full h-full object-cover"
          paused={false}
          repeat={true}
          muted={true}
          controls={false}
          resizeMode="cover"
        />
        <StyledView
          className="flex-1 w-full h-full items-center justify-center px-5 py-10"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <Image source={require("assets/images/logo-mini.png")} className="w-[114px] h-[135px]" resizeMode="contain" />
          <Image source={require("assets/images/logo-text-tm.png")} className="mb-16 mt-[-10px]" resizeMode="contain" />
          <StyledTouchableRipple
            onPress={() => navigate("HomeScreen")}
            className="w-full rounded-full bg-blue-500"
          >
            <StyledView className="flex-row items-center justify-center h-[45px] space-x-2">
              <Image source={require("assets/images/google.png")} className="w-[30px] h-[30px] rounded-full" />
              <StyledText className="text-white" variant="bold">Sign In with Google</StyledText>
            </StyledView>
          </StyledTouchableRipple>
          <StyledText className="text-center text-white mt-16">
            By continuing above, you acknowledge that
            you have read and agree to Monko’s{" "}
            {"\n"}
            <StyledText className="text-[#84AA9D]">
              Terms and conditions{" "}
            </StyledText>
            and{" "}
            <StyledText className="text-[#84AA9D]">
              Privacy Policy
            </StyledText>
          </StyledText>
        </StyledView>
      </StyledView>
    </>
  );
};

export default SignInScreen;
