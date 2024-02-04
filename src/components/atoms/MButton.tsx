import { Pressable, PressableProps } from 'react-native'
import { MText } from './MText'

interface MButtonProps extends PressableProps {
  buttonText: string
}

export const MButton = ({ buttonText, ...props }: MButtonProps) => {
  return (
    <Pressable
      {...props}
      className="rounded-lg justify-center align-middle w-16 h-8  shadow-sm play-button bg-[--background] ">
      <MText className="text-center text-[--primary] ">{buttonText}</MText>
    </Pressable>
  )
}

export default MButton
