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
        'rounded-lg justify-center  gap-1 align-middle m-2 p-2  flex flex-row  shadow-sm play-button bg-primary ',
        className,
        { 'bg-success': loading }
      )}>
      {/* {loading && <ActivityIndicator className="text-primary" size="small" />} */}
      <MText className="text-center text-textsecondary font-semibold">{buttonText}</MText>
    </TouchableOpacity>
  )
}

export default MButton
