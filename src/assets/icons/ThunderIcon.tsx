import * as React from "react";
import Svg, { Rect, G, Path, Defs, ClipPath } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgThunderIcon = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={47}
    height={47}
    fill="none"
    {...props}
  >
    <Rect width={40} height={40} x={3.5} y={3.117} fill="#FBCFE8" rx={20} />
    <Rect
      width={40}
      height={40}
      x={3.5}
      y={3.117}
      stroke="#FCE7F3"
      strokeWidth={6}
      rx={20}
    />
    <G clipPath="url(#thunderIcon_svg__a)">
      <Path
        fill="#EA580C"
        d="M15.167 22.7a3.75 3.75 0 0 1 3.4-3.734 5.001 5.001 0 0 1 9.866 0 3.75 3.75 0 0 1 .9 7.27H17.667a3.752 3.752 0 0 1-2.5-3.536"
        opacity={0.12}
      />
      <Path
        stroke="#EA580C"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.667}
        d="M29.333 26.237a3.752 3.752 0 0 0-.9-7.27 5.001 5.001 0 0 0-9.867 0 3.75 3.75 0 0 0-.9 7.27m6.667-4.787-3.333 5h5l-3.333 5"
      />
    </G>
    <Defs>
      <ClipPath id="thunderIcon_svg__a">
        <Path fill="#fff" d="M13.5 13.117h20v20h-20z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default SvgThunderIcon;
