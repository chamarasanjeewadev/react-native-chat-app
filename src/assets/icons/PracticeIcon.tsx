import * as React from "react";
import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgPracticeIcon = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={25}
    fill="none"
    {...props}
  >
    <Path
      stroke="#2563EB"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m9.333 10.617 2 2 4.5-4.5m3.5 13v-13.2c0-1.68 0-2.52-.327-3.162a3 3 0 0 0-1.31-1.311c-.642-.327-1.483-.327-3.163-.327h-4.4c-1.68 0-2.52 0-3.162.327a3 3 0 0 0-1.31 1.311c-.328.642-.328 1.482-.328 3.162v13.2l7-4z"
    />
  </Svg>
);
export default SvgPracticeIcon;
