import { View } from 'react-native'
import { MText } from '../atoms/MText'
import MButton from '../atoms/MButton'
import { MilaHint } from '../../assets/icons/MilaHintIcon'
import { RetryIcon } from '../../assets/icons/RetryIcon'
import { PlaySlow } from '../../assets/icons/PlaySlowIcon'
type UserResponseProps = {
  userMessage: string
}
const UserResponse = ({ userMessage }: UserResponseProps) => {
  return (
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
  )
}

export default UserResponse
