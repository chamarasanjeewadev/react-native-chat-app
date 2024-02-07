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
        'play-button flex  flex-row justify-center gap-1 rounded-lg  bg-primary align-middle shadow-sm ',
        className,
        { 'bg-success': loading }
      )}
    >
      {loading && <ActivityIndicator className="text-primary" size="small" />}
      <MText className="text-center font-semibold text-textsecondary ">{buttonText}</MText>
    </TouchableOpacity>
  )
}

export default MButton
