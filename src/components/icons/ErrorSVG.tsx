import React from "react";
import Svg, { ClipPath, Defs, G, Path, SvgProps } from "react-native-svg";

function ErrorSVG(props: SvgProps) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <G clipPath="url(#clip0_1932_2336)">
        <Path
          d="M12 17c.283 0 .52-.096.713-.288A.968.968 0 0013 16a.968.968 0 00-.287-.713A.968.968 0 0012 15a.968.968 0 00-.713.287A.968.968 0 0011 16c0 .283.096.52.287.712.192.192.43.288.713.288zm-1-4h2V7h-2v6zm-2.75 8L3 15.75v-7.5L8.25 3h7.5L21 8.25v7.5L15.75 21h-7.5zm.85-2h5.8l4.1-4.1V9.1L14.9 5H9.1L5 9.1v5.8L9.1 19z"
          fill={props.color ?? "#fff"}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1932_2336">
          <Path fill={props.color ?? "#fff"} d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default ErrorSVG;
