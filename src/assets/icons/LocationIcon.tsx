import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import type { SvgProps } from 'react-native-svg'
const SvgLocationIcon = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={24} height={25} fill="none" {...props}>
    <Path
      stroke="#1E3A8A"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 14.403c-1.851.817-3 1.955-3 3.214 0 2.485 4.477 4.5 10 4.5s10-2.015 10-4.5c0-1.259-1.149-2.397-3-3.214"
      opacity={0.4}
    />
    <Path
      stroke="#1E3A8A"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 17.117c1.5-3 6-4.936 6-9a6 6 0 0 0-12 0c0 4.064 4.5 6 6 9"
    />
    <Path
      stroke="#1E3A8A"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 9.117a1 1 0 1 0 0-2 1 1 0 0 0 0 2"
    />
  </Svg>
)
export default SvgLocationIcon
