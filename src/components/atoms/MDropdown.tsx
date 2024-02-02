import RNPickerSelect, { PickerSelectProps } from 'react-native-picker-select'

export const MDropdown = (props: PickerSelectProps) => {
  return (
    <RNPickerSelect
      {...props}
      //   onValueChange={value => console.log(value)}
      //   items={[
      //     { label: 'Football', value: 'football' },
      //     { label: 'Baseball', value: 'baseball' },
      //     { label: 'Hockey', value: 'hockey' }
      //   ]}
    />
  )
}
