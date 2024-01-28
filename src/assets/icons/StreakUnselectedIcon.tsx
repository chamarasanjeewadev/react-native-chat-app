import * as React from 'react'
import Svg, { G, Rect, Path, Defs, ClipPath } from 'react-native-svg'
/* SVGR has dropped some elements not supported by react-native-svg: filter */
import type { SvgProps } from 'react-native-svg'
const SvgStreakUnselectedIcon = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={52} height={53} fill="none" {...props}>
    <G filter="url(#streakUnselectedIcon_svg__a)">
      <Rect width={40} height={40} x={6} y={5.117} fill="#DBEAFE" rx={20} />
      <Rect width={40} height={40} x={6} y={5.117} stroke="#EFF6FF" strokeWidth={6} rx={20} />
      <G clipPath="url(#streakUnselectedIcon_svg__b)">
        <Path
          fill="#2563EB"
          d="m26.833 16.784-7.422 8.906c-.29.349-.436.523-.438.67a.416.416 0 0 0 .155.331c.114.093.341.093.795.093H26l-.833 6.666 7.422-8.906c.29-.35.436-.524.438-.67a.417.417 0 0 0-.155-.331c-.114-.093-.341-.093-.795-.093H26z"
          opacity={0.12}
        />
        <Path
          stroke="#2563EB"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.667}
          d="m26.833 16.784-7.422 8.906c-.29.349-.436.523-.438.67a.417.417 0 0 0 .155.331c.114.093.341.093.795.093H26l-.833 6.666 7.422-8.906c.29-.35.436-.524.438-.67a.417.417 0 0 0-.155-.331c-.114-.093-.341-.093-.795-.093H26z"
        />
      </G>
    </G>
    <Defs>
      <ClipPath id="streakUnselectedIcon_svg__b">
        <Path fill="#fff" d="M16 15.117h20v20H16z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default SvgStreakUnselectedIcon
