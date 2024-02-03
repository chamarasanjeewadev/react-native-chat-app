import RNPickerSelect, { PickerSelectProps } from 'react-native-picker-select'
import { fontFamily } from '../../utils/fonts/fontFamily'
import { StyleSheet } from 'react-native'

export const MDropdown = (props: PickerSelectProps) => {
  return <RNPickerSelect style={pickerSelectStyles} {...props} />
}
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontFamily: fontFamily.poppins400,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 4,
    marginHorizontal: 2,
    paddingHorizontal: 4
  },
  inputAndroid: {
    fontFamily: fontFamily.poppins400,
    borderColor: 'gray',
    borderRadius: 4
  }
})
