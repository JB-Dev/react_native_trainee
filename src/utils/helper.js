import {Toast} from 'native-base';

export const showToast = (massage) => {
  Toast.show({
    text: massage,
    textStyle: {
      color: '#fff',
      fontSize: '20',
    },
    duration: 2000,
  });
};
