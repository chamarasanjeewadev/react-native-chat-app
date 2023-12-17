import * as React from "react";
import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgAtIcon = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={25}
    fill="none"
    {...props}
  >
    <Path
      stroke="#1E3A8A"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 8.117v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94M16 12.117a4 4 0 1 1-8 0 4 4 0 0 1 8 0"
    />
  </Svg>
);
export default SvgAtIcon;
