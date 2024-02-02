import CheckBox, { CheckBoxProps } from '@react-native-community/checkbox'
const MCheckBox = (checkBoxProps: CheckBoxProps) => {
  return (
    <CheckBox
      {...checkBoxProps}
      boxType="square"
      lineWidth={2}
      onCheckColor="green"
      onFillColor="pink"
    />
  )
}
export default MCheckBox
