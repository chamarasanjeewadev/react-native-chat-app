import RNPickerSelect, { PickerSelectProps } from 'react-native-picker-select'
import { MFontFamily } from '../../utils/fonts/fontFamily'
import { StyleSheet } from 'react-native'
import colors, { black } from 'tailwindcss/colors'

export const MDropdown = (props: PickerSelectProps) => {
  return <RNPickerSelect style={pickerSelectStyles} {...props} />
}
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontFamily: MFontFamily.poppins400,
    borderColor: colors.slate[200],
    color: colors.slate[700],
    borderWidth: 1,
    borderRadius: 4,
    marginHorizontal: 2,
    marginVertical: 2,
    paddingTop: 2,
    paddingHorizontal: 4
  },
  inputAndroid: {
    color: colors.slate[700],
    fontFamily: MFontFamily.poppins400,
    borderColor: colors.slate[200],
    borderRadius: 4
  }
})
