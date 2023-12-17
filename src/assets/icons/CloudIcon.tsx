import * as React from "react";
import Svg, { Rect, G, Path, Defs, ClipPath } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgCloudIcon = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={47}
    height={47}
    fill="none"
    {...props}
  >
    <Rect width={40} height={40} x={3.5} y={3.117} fill="#FED7AA" rx={20} />
    <Rect
      width={40}
      height={40}
      x={3.5}
      y={3.117}
      stroke="#FFEDD5"
      strokeWidth={6}
      rx={20}
    />
    <G clipPath="url(#cloudIcon_svg__a)">
      <Path
        fill="#EA580C"
        d="M18.5 31.45a3.333 3.333 0 1 1 1.104-6.48 4.168 4.168 0 0 1 7.792 0 3.333 3.333 0 1 1 1.104 6.48z"
        opacity={0.12}
      />
      <Path
        stroke="#EA580C"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.667}
        d="M22.25 14.367V15.7m-5.75 5.75h-1.333m2.876-4.207L17.1 16.3m9.358.943.943-.943m1.932 5.15H28m-9.083 0a3.333 3.333 0 0 1 6.25-1.615M18.5 31.45a3.333 3.333 0 1 1 1.104-6.48 4.168 4.168 0 0 1 7.792 0 3.333 3.333 0 1 1 1.104 6.48z"
      />
    </G>
    <Defs>
      <ClipPath id="cloudIcon_svg__a">
        <Path fill="#fff" d="M13.5 13.117h20v20h-20z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default SvgCloudIcon;
