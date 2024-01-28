import * as React from 'react'
import Svg, { Path, G, Defs } from 'react-native-svg'
/* SVGR has dropped some elements not supported by react-native-svg: filter */
import type { SvgProps } from 'react-native-svg'
const SvgGroupIcon = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={42} height={32} fill="none" {...props}>
    <Path
      fill="#94A3B8"
      fillRule="evenodd"
      d="M10.764 27.194H23.98c5.849 0 10.59-4.742 10.59-10.591 0-.923-.117-1.818-.34-2.67h6.402a.883.883 0 0 1 .625 1.505l-1.734 1.734a8.826 8.826 0 0 1-6.833 14.41H18.394a8.822 8.822 0 0 1-7.63-4.389"
      clipRule="evenodd"
    />
    <Path fill="#FDE047" d="M16.718 5.99a2.648 2.648 0 1 0 0-5.297 2.648 2.648 0 0 0 0 5.297" />
    <Path
      fill="#1E293B"
      d="M23.868 7.753H1.627a.883.883 0 0 0-.625 1.506l1.734 1.734a8.826 8.826 0 0 0 6.833 14.41h14.297a8.826 8.826 0 0 0 0-17.65z"
    />
    <G filter="url(#groupIcon_svg__a)">
      <Path fill="#FDE047" d="M23.868 19.226a2.648 2.648 0 1 0 0-5.296 2.648 2.648 0 0 0 0 5.296" />
    </G>
    <G filter="url(#groupIcon_svg__b)">
      <Path fill="#FDE047" d="M9.57 19.226a2.648 2.648 0 1 0 0-5.296 2.648 2.648 0 0 0 0 5.296" />
    </G>
    <G filter="url(#groupIcon_svg__c)">
      <Path
        fill="#FDE047"
        d="M16.718 19.404a4.478 4.478 0 0 1-1.945-.442c-.588-.282-1.234-.136-1.625.349a1.325 1.325 0 0 0 .45 2.025c.942.46 2.002.718 3.122.718s2.178-.258 3.122-.718a1.327 1.327 0 0 0 .45-2.025 1.336 1.336 0 0 0-1.625-.349 4.567 4.567 0 0 1-1.945.442z"
      />
    </G>
    <Defs></Defs>
  </Svg>
)
export default SvgGroupIcon
