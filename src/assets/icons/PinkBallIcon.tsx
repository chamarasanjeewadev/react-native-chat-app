import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import type { SvgProps } from 'react-native-svg'
const SvgPinkBallIcon = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={50} height={51} fill="none" {...props}>
    <Path
      fill="#F472B6"
      d="M25 .117c-13.81 0-25 11.19-25 25s11.19 25 25 25 25-11.19 25-25-11.19-25-25-25m0 42.34c-9.58 0-17.34-7.76-17.34-17.34S15.42 7.777 25 7.777s17.34 7.76 17.34 17.34-7.76 17.34-17.34 17.34"
    />
    <Path
      fill="#FDF2F8"
      d="M25 44.477c-10.69 0-19.36-8.67-19.36-19.36S14.31 5.757 25 5.757s19.36 8.67 19.36 19.36-8.67 19.36-19.36 19.36"
    />
    <Path
      fill="#F9A8D4"
      d="M24.934 8.606a1.7 1.7 0 1 0 .134 3.398 1.7 1.7 0 0 0-.134-3.398M15.73 15.847c1.67-1.67 3.69-2.79 5.82-3.37.74-.2 1.25-.87 1.25-1.63 0-1.14-1.09-1.93-2.19-1.63-2.67.73-5.19 2.13-7.28 4.23-2.09 2.1-3.5 4.62-4.23 7.28-.3 1.1.49 2.19 1.63 2.19.77 0 1.43-.51 1.63-1.25.58-2.13 1.7-4.14 3.37-5.82"
    />
  </Svg>
)
export default SvgPinkBallIcon
