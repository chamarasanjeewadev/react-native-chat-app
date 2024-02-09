import CheckBox, { CheckBoxProps } from '@react-native-community/checkbox'
import { View } from 'react-native'
const MCheckBox = (checkBoxProps: CheckBoxProps) => {
  return (
    <CheckBox
      {...checkBoxProps}
      boxType="square"
      style={{ margin: 0, padding: 0 }}
      lineWidth={2}
      onCheckColor="green"
      onFillColor="pink"
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
