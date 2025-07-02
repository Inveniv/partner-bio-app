import React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

function InfoOutlinedSVG(props: SvgProps) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.3 12a8.3 8.3 0 11-16.6 0 8.3 8.3 0 0116.6 0zm1.7 0c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10zM10.954 9.73V7.46h1.757v2.27h-1.757zm1.757 1.345v6.302h-1.757v-6.302h1.757z"
        fill={props.color ?? "#000"}
      />
    </Svg>
  );
}

export default InfoOutlinedSVG;
