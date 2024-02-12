import { View } from 'react-native'
import { MText } from '../atoms/MText'
import MButton from '../atoms/MButton'
import { MilaHint } from '../../assets/icons/MilaHintIcon'
import { RetryIcon } from '../../assets/icons/RetryIcon'
import { PlaySlow } from '../../assets/icons/PlaySlowIcon'
import { ChatBox } from '../molecules/ChatBox'
import { ThinkingMila } from '../../assets/icons/ThinkingMila'
import LoadingDots from '../atoms/LoadingDots'
type UserResponseProps = {
  userMessage: string
}
const UserMessage = ({ userMessage }: UserResponseProps) => {
  return (
    <ChatBox loading={false} intent={'user'}>
      <View className={'flex flex-grow flex-col gap-1 p-2 align-middle  '}>
        <MText size="large" className="font-normal">
          {userMessage}
        </MText>
        <View className="flex flex-row justify-end gap-2 align-middle">
          <MButton
            leadingIcon={<MilaHint />}
            onPress={async () => {
              // await refectchFeedbackGrammar()
            }}
          />
          <MButton leadingIcon={<RetryIcon />} />
          <MButton leadingIcon={<PlaySlow />} />
        </View>
      </View>
    </ChatBox>
  )
}

export default UserMessage

export const ThinkingMessage = () => {
  return (
    <ChatBox loading={false} className="flex flex-col">
      <LoadingDots dots={3} borderRadius={50} size={15} bounceHeight={2} />
      <ThinkingMila />
    </ChatBox>
  )
}