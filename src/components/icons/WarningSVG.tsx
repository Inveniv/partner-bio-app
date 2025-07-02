import React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

function WarningSVG(props: SvgProps) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M1 21L12 2l11 19H1zm3.45-2h15.1L12 6 4.45 19zM12 18c.283 0 .52-.096.713-.288A.968.968 0 0013 17a.968.968 0 00-.287-.712A.968.968 0 0012 16a.968.968 0 00-.713.288A.968.968 0 0011 17c0 .283.096.52.287.712.192.192.43.288.713.288zm-1-3h2v-5h-2v5z"
        fill={props.color ?? "#000"}
      />
    </Svg>
  );
}

export default WarningSVG;
