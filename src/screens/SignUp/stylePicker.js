import {StyleSheet} from 'react-native';
import colors from '../../config/colors';
import baseStyle from '../../config/baseStyle';

export default stylePicker = StyleSheet.create({
  inputIOS: {
    borderRadius: 4,
    marginStart: 8,
    ...baseStyle.textInput,
    color: colors.colorAccent,
  },
  inputAndroid: {
    marginStart: 8,
    borderRadius: 4,
    ...baseStyle.textInput,
    color: colors.colorAccent,
  },
});
