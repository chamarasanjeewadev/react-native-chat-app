import { ActivityIndicator, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { MText } from './MText'
import { cn } from '../../utils/cnUtil'

interface MButtonProps extends TouchableOpacityProps {
  buttonText: string
  loading?: boolean
}

export const MButton = ({ loading, buttonText, className, ...props }: MButtonProps) => {
  return (
    <TouchableOpacity
      {...props}
      className={cn(
        'rounded-lg justify-center  gap-1 align-middle m-2 p-2 active:green flex flex-row  shadow-sm play-button bg-primary',
        className,
        { 'bg-secondary': loading }
      )}>
      {loading && <ActivityIndicator size="small" color="#0000ff" />}
      <MText className="text-center text-[--muted] ">{buttonText}</MText>
    </TouchableOpacity>
  )
}

export default MButton
// return (
//   <Pressable
//     {...props}
//     className={cn(
//       'rounded-lg text-center p-2 gap-2  play-button   flex flex-row bg-[#4453] ',
//       className,
//       { 'bg-gray-50': loading }
//     )}>
//     {loading && <ActivityIndicator size="small" color="#0000ff" />}
//     {children}
//   </Pressable>
// )
