import { View, ViewProps } from 'react-native'
import { cn } from '../../utils/cnUtil'

export const ChatBox = ({ children, ...props }: ViewProps) => {
  return (
    <View
      className={cn('m-1 flex flex-row flex-wrap rounded-md bg-white p-2')}
      //   className="rounded-bl-2xl rounded-br-2xl bg-slate-200 py-1 text-slate-800 dark:bg-slate-600 dark:text-white"
      {...props}>
      {children}
    </View>
  )
}
export const TranslateBox = ({ children, ...props }: ViewProps) => {
  return (
    <View
      className={cn(
        'rounded-bl-2xl rounded-br-2xl bg-slate-200 py-1 text-slate-800 dark:bg-slate-600 dark:text-white'
      )}
      {...props}>
      {children}
    </View>
  )
}
