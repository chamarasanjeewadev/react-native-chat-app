import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const SvgComponent = (props: SvgProps) => (
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
      d="M8.626 14.117a4.002 4.002 0 0 0 7.748 0M11.518 2.88 4.735 8.156c-.453.353-.68.529-.843.75a2 2 0 0 0-.318.65c-.074.264-.074.552-.074 1.126v7.235c0 1.12 0 1.68.218 2.108a2 2 0 0 0 .874.874c.428.218.988.218 2.108.218h11.6c1.12 0 1.68 0 2.108-.218a2 2 0 0 0 .874-.874c.218-.428.218-.988.218-2.108v-7.235c0-.574 0-.862-.074-1.126a2.002 2.002 0 0 0-.318-.65c-.163-.221-.39-.397-.843-.75l-6.783-5.275c-.351-.273-.527-.41-.72-.462a1 1 0 0 0-.523 0c-.194.052-.37.189-.721.462Z"
    />
  </Svg>
)
export default SvgComponent
