import * as React from "react";
import Svg, { Rect, SvgProps } from "react-native-svg";

function HamburgerSVG(props: any) {
  return (
    <Svg
      width={18}
      height={12}
      viewBox="0 0 18 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Rect
        y={5.14258}
        width={17.1429}
        height={1.71429}
        rx={0.857143}
        fill={props.color ?? "#fff"}
      />
      <Rect
        y={10.2852}
        width={10.2857}
        height={1.71429}
        rx={0.857143}
        fill={props.color ?? "#fff"}
      />
      <Rect
        x={6.85718}
        width={10.2857}
        height={1.71429}
        rx={0.857143}
        fill={props.color ?? "#fff"}
      />
    </Svg>
  );
}

export default HamburgerSVG;
