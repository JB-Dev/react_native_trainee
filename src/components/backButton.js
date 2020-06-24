import React from 'react';
import {StyleSheet, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import colors from '../config/colors';

export const BackButton = ({action}) => {
  return (
    <TouchableOpacity
      onPress={() => action()}
      style={{
        width: 40,
        height: 40,
        marginStart: 20,
        borderRadius: 20,
        justifyContent: 'center',
        backgroundColor: colors.colorPrimary,
      }}>
      <Image
        style={{width: 36, height: 36}}
        source={require('../assets/images/ic_back.png')}
      />
    </TouchableOpacity>
  );
};
