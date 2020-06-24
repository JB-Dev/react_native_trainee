import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import colors from '../config/colors';
import baseStyle from '../config/baseStyle';

export const SubmitButton = ({text, action}) => {
  return (
    <TouchableOpacity
      onPress={() => action()}
      style={{
        backgroundColor: colors.colorPrimary,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginHorizontal: 20,
        marginVertical: 10,
      }}>
      <Text style={{color: '#fff', ...baseStyle.textInput}}>{text}</Text>
    </TouchableOpacity>
  );
};
