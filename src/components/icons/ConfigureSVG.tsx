import * as React from "react"
import Svg, { Path } from "react-native-svg"

function ConfigureSVG(props: any) {
  return (
    <Svg
      width={18}
      height={16}
      viewBox="0 0 18 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        opacity={0.4}
        d="M7.275 11.662H1.357C.608 11.662 0 12.26 0 12.995c0 .735.608 1.334 1.357 1.334h5.918c.749 0 1.357-.599 1.357-1.334 0-.736-.608-1.333-1.357-1.333zM18 3.041c0-.735-.608-1.332-1.356-1.332h-5.918c-.749 0-1.357.597-1.357 1.332 0 .736.608 1.333 1.357 1.333h5.918c.748 0 1.356-.597 1.356-1.333z"
        fill={props.color ?? "#fff"}
      />
      <Path
        d="M6.19 3.04c0 1.68-1.385 3.042-3.095 3.042C1.386 6.082 0 4.721 0 3.041S1.386 0 3.095 0C4.805 0 6.19 1.362 6.19 3.04zM18 12.96c0 1.679-1.385 3.04-3.095 3.04-1.709 0-3.095-1.361-3.095-3.04 0-1.68 1.386-3.042 3.095-3.042 1.71 0 3.095 1.362 3.095 3.042z"
        fill={props.color ?? "#fff"}
      />
    </Svg>
  )
}

export default ConfigureSVG
