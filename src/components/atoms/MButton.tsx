import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { MText } from './MText'

interface MButtonProps extends TouchableOpacityProps {
  buttonText: string
}

export const MButton = ({ buttonText, ...props }: MButtonProps) => {
  return (
    <TouchableOpacity
      {...props}
      className="rounded-lg justify-center align-middle m-2 p-2 active:green  shadow-sm play-button bg-[--background] ">
      <MText className="text-center text-[--muted] ">{buttonText}</MText>
    </TouchableOpacity>
  )
}

export default MButton
