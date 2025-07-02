import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SearchSVG(props: any) {
  return (
    <Svg
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M8.482 15.964A7.482 7.482 0 108.482 1a7.482 7.482 0 000 14.964zM13.686 14.074L16.619 17"
        stroke={props.color ?? "#1D1F28"}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default SearchSVG
