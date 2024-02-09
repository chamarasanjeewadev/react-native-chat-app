import CheckBox, { CheckBoxProps } from '@react-native-community/checkbox'
import { View } from 'react-native'
import { MText } from './MText'
import clsx from 'clsx'
import { useSettingStore } from '../../stores/settingStore'

const MCheckBox = (checkBoxProps: CheckBoxProps) => {
  const [themeColor] = useSettingStore(state => [state.themeColor])
  return (
    <CheckBox
      className={clsx('bg-red-600')}
      {...checkBoxProps}
      boxType="square"
      style={{ margin: 0, padding: 0 }}
      lineWidth={2}
      onCheckColor="white"
      onFillColor={themeColor}
    />
  )
}

type CaptionAndCheckBoxProps = {
  caption: string
} & CheckBoxProps

export const MCheckBoxWithCaption = ({ caption, ...checkBoxProps }: CaptionAndCheckBoxProps) => {
  return (
    <View className="flex flex-row items-center gap-2 ">
      <MCheckBox {...checkBoxProps} />
      <MText intent="label">{caption}</MText>
    </View>
  )
}
export default MCheckBox
