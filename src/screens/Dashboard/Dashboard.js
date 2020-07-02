import React, {Component} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  ActivityIndicator,
} from 'react-native';
import Login from '../Login/Login';
import {SafeAreaView} from 'react-native-safe-area-context';

class Dashboard extends Component {
  state = {
    modalVisible: false,
  };

  setModalVisible = (visible) => {
    this.setState({modalVisible: visible});
  };

  showAlert() {
    Alert.alert(
      'Something want wrong',
      'My Alert Msg',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      {cancelable: false},
    );
  }

  render() {
    const {modalVisible} = this.state;
    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <SafeAreaView style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={(flexDirection = 'row')}>
                <Text style={styles.modalText}>Loading!</Text>
                <ActivityIndicator size="small"></ActivityIndicator>
              </View>
              <TouchableHighlight
                style={{...styles.openButton, backgroundColor: '#2196F3'}}
                onPress={() => {
                  this.setModalVisible(!modalVisible);
                }}>
                <Text style={styles.textStyle}>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </SafeAreaView>
        </Modal>

        <TouchableHighlight
          style={styles.openButton}
          onPress={() => {
            // this.showAlert();
            this.setModalVisible(true);
          }}>
          <Text style={styles.textStyle}>Show Modal</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    padding: 35,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default Dashboard;
// import React, {useState} from 'react';
// import {
//   LayoutAnimation,
//   Platform,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   UIManager,
//   View,
// } from 'react-native';

// if (
//   Platform.OS === 'android' &&
//   UIManager.setLayoutAnimationEnabledExperimental
// ) {
//   UIManager.setLayoutAnimationEnabledExperimental(true);
// }
// const Dashboard = () => {
//   const [expanded, setExpanded] = useState(false);

//   return (
//     <View style={style.container}>
//       <TouchableOpacity
//         onPress={() => {
//           LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
//           setExpanded(!expanded);
//         }}>
//         <Text>Press me to {expanded ? 'collapse' : 'expand'}!</Text>
//       </TouchableOpacity>
//       {expanded && (
//         <View>
//           <Text>I disappear sometimes!</Text>
//         </View>
//       )}
//     </View>
//   );
// };

// const style = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     overflow: 'hidden',
//   },
// });

// export default Dashboard;
// import React, {Component} from 'react';
// import {Share, View, Button} from 'react-native';

// class Dashboard extends Component {
//   onShare = async () => {
//     try {
//       const result = await Share.share({
//         message:
//           'React Native | A framework for building native apps using React',
//       });

//       if (result.action === Share.sharedAction) {
//         if (result.activityType) {
//           // shared with activity type of result.activityType
//         } else {
//           // shared
//         }
//       } else if (result.action === Share.dismissedAction) {
//         // dismissed
//       }
//     } catch (error) {
//       alert(error.message);
//     }
//   };

//   render() {
//     return (
//       <View style={{marginTop: 50}}>
//         <Button onPress={this.onShare} title="Share" />
//       </View>
//     );
//   }
// }
// export default Dashboard;

// import React, {Component} from 'react';
// import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';

// export default class Dashboard extends Component {
//   render() {
//     return (
//       <SafeAreaView style={styles.container}>
//         <ScrollView contentContainerStyle={styles.scrollContentContainer}>
//           <View style={styles.box}>
//             <Text style={styles.text}>Original Object</Text>
//           </View>

//           <View
//             style={[
//               styles.box,
//               {
//                 transform: [{scale: 2}],
//               },
//             ]}>
//             <Text style={styles.text}>Scale by 2</Text>
//           </View>

//           <View
//             style={[
//               styles.box,
//               {
//                 transform: [{scaleX: 2}],
//               },
//             ]}>
//             <Text style={styles.text}>ScaleX by 2</Text>
//           </View>

//           <View
//             style={[
//               styles.box,
//               {
//                 transform: [{scaleY: 2}],
//               },
//             ]}>
//             <Text style={styles.text}>ScaleY by 2</Text>
//           </View>

//           <View
//             style={[
//               styles.box,
//               {
//                 transform: [{rotate: '45deg'}],
//               },
//             ]}>
//             <Text style={styles.text}>Rotate by 45 deg</Text>
//           </View>

//           <View
//             style={[
//               styles.box,
//               {
//                 transform: [{rotateX: '45deg'}, {rotateZ: '45deg'}],
//               },
//             ]}>
//             <Text style={styles.text}>Rotate X&Z by 45 deg</Text>
//           </View>

//           <View
//             style={[
//               styles.box,
//               {
//                 transform: [{rotateY: '45deg'}, {rotateZ: '45deg'}],
//               },
//             ]}>
//             <Text style={styles.text}>Rotate Y&Z by 45 deg</Text>
//           </View>

//           <View
//             style={[
//               styles.box,
//               {
//                 transform: [{skewX: '45deg'}],
//               },
//             ]}>
//             <Text style={styles.text}>SkewX by 45 deg</Text>
//           </View>

//           <View
//             style={[
//               styles.box,
//               {
//                 transform: [{skewY: '45deg'}],
//               },
//             ]}>
//             <Text style={styles.text}>SkewY by 45 deg</Text>
//           </View>

//           <View
//             style={[
//               styles.box,
//               {
//                 transform: [{skewX: '30deg'}, {skewY: '30deg'}],
//               },
//             ]}>
//             <Text style={styles.text}>Skew X&Y by 30 deg</Text>
//           </View>

//           <View
//             style={[
//               styles.box,
//               {
//                 transform: [{translateX: -50}],
//               },
//             ]}>
//             <Text style={styles.text}>TranslateX by -50</Text>
//           </View>

//           <View
//             style={[
//               styles.box,
//               {
//                 transform: [{translateY: 50}],
//               },
//             ]}>
//             <Text style={styles.text}>TranslateY by 50</Text>
//           </View>
//         </ScrollView>
//       </SafeAreaView>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   scrollContentContainer: {
//     alignItems: 'center',
//     paddingBottom: 60,
//   },
//   box: {
//     height: 100,
//     width: 100,
//     borderRadius: 5,
//     marginVertical: 40,
//     backgroundColor: '#61dafb',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   text: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     margin: 8,
//     color: '#000',
//     textAlign: 'center',
//   },
// });
// import React, {Component} from 'react';
// import {Text, View, StyleSheet, BackHandler, Alert} from 'react-native';

// export default class App extends Component {
//   backAction = () => {
//     Alert.alert('Hold on!', 'Are you sure you want to go back?', [
//       {
//         text: 'Cancel',
//         onPress: () => null,
//         style: 'cancel',
//       },
//       {text: 'YES', onPress: () => BackHandler.exitApp()},
//     ]);
//     return true;
//   };

//   componentDidMount() {
//     BackHandler.addEventListener('hardwareBackPress', this.backAction);
//   }

//   componentWillUnmount() {
//     BackHandler.removeEventListener('hardwareBackPress', this.backAction);
//   }

//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.text}>Click Back button!</Text>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   text: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });
