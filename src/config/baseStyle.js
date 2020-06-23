import {StyleSheet} from 'react-native';
import colors from './colors';
import {FontFamily} from './typography';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  textTitle: {
    fontFamily: FontFamily.robotoCondensedBold,
    fontSize: 48,
    color: colors.colorBackground,
  },
  textInput: {
    fontFamily: FontFamily.robotoCondensedBold,
    fontSize: 20,
    color: colors.colorWhite,
  },
});
