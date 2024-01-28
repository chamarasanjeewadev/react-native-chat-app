import * as React from 'react'
import Svg, { Rect, G, Path, Defs, ClipPath } from 'react-native-svg'
import type { SvgProps } from 'react-native-svg'
const SvgSunIcon = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={47} height={47} fill="none" {...props}>
    <Rect width={40} height={40} x={3.5} y={3.117} fill="#A7F3D0" rx={20} />
    <Rect width={40} height={40} x={3.5} y={3.117} stroke="#D1FAE5" strokeWidth={6} rx={20} />
    <G clipPath="url(#sunIcon_svg__a)">
      <Path
        fill="#059669"
        d="M23.5 27.284a4.167 4.167 0 1 0 0-8.334 4.167 4.167 0 0 0 0 8.334"
        opacity={0.12}
      />
      <Path
        stroke="#059669"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.667}
        d="M23.5 14.784v1.666m0 13.334v1.666m-6.667-8.333h-1.666m3.595-4.738L17.583 17.2m10.655 1.179 1.179-1.179M18.762 27.86l-1.179 1.178m10.655-1.178 1.179 1.178m2.416-5.92h-1.666m-2.5 0a4.167 4.167 0 1 1-8.334 0 4.167 4.167 0 0 1 8.334 0"
      />
    </G>
    <Defs>
      <ClipPath id="sunIcon_svg__a">
        <Path fill="#fff" d="M13.5 13.117h20v20h-20z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default SvgSunIcon
