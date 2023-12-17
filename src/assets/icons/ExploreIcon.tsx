import * as React from "react";
import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgExploreIcon = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={25}
    fill="none"
    {...props}
  >
    <Path
      fill="#2563EB"
      d="m10.667 10.617-2.5 1.5 2.5 1.5 1.5 2.5 1.5-2.5 2.5-1.5-2.5-1.5-1.5-2.5z"
      opacity={0.12}
    />
    <Path
      stroke="#2563EB"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M22.167 12.117c0 5.523-4.478 10-10 10m10-10c0-5.523-4.478-10-10-10m10 10h-2m-8 10c-5.523 0-10-4.477-10-10m10 10v-2m-10-8c0-5.523 4.477-10 10-10m-10 10h2m8-10v2m7.07 15.071-1.413-1.414M6.51 6.46 5.096 5.046M17.824 6.46l1.414-1.414M5.096 19.188l1.414-1.414m1.657-5.657 2.5-1.5 1.5-2.5 1.5 2.5 2.5 1.5-2.5 1.5-1.5 2.5-1.5-2.5z"
    />
  </Svg>
);
export default SvgExploreIcon;
