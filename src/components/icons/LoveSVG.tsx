import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

function LoveSVG(props: any) {
  return (
    <Svg
      width={10}
      height={10}
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        clipRule="evenodd"
        d="M1.165 4.822c-.477-1.49.08-3.191 1.644-3.695a2.67 2.67 0 012.414.406c.646-.5 1.587-.67 2.409-.406 1.563.504 2.124 2.206 1.647 3.695C8.537 7.182 5.223 9 5.223 9s-3.29-1.79-4.058-4.178z"
        stroke={props.color ?? "#fff"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M7 2.645c.476.153.812.578.853 1.076"
        stroke={props.color ?? "#fff"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default LoveSVG;
