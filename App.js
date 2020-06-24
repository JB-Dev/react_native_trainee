import React, {Component, useState} from 'react';
import Home from '../react_native_trainee/src/screens/Home/Home';
import Login from '../react_native_trainee/src/screens/Login/Login';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Profile from './src/screens/profile/profile';
import Details from './src/screens/details/details';
import SignUp from './src/screens/SignUp/SignUp';
import Loading from './src/screens/Loading/Loading';
import {View} from 'native-base';
import {set} from 'react-native-reanimated';
import {setLoginState} from './src/store/action/setLoginState';

const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const Drawer = createDrawerNavigator();
const ProfileStack = createStackNavigator();
const AuthSatck = createStackNavigator();

const HomeStackScreen = () => (
  <HomeStack.Navigator headerMode="none">
    <HomeStack.Screen name="Home" component={Home} />
    <HomeStack.Screen name="Details" component={Details} />
  </HomeStack.Navigator>
);
const DrawerStackScreen = () => (
  <Drawer.Navigator initialRouteName="Home">
    <Drawer.Screen name="Home" component={TabScreen} />
    <Drawer.Screen name="Profile" component={ProfileStackScreen} />
  </Drawer.Navigator>
);
const ProfileStackScreen = () => (
  <ProfileStack.Navigator headerMode="none">
    <ProfileStack.Screen name="Profile" component={Profile} />
  </ProfileStack.Navigator>
);
const TabScreen = () => (
  <Tabs.Navigator tabBarOptions={{showIcon: false}}>
    <Tabs.Screen name="Home" component={HomeStackScreen} />
    <Tabs.Screen name="Profile" component={ProfileStackScreen} />
  </Tabs.Navigator>
);
export default () => {
  const [isLoading, setIsLoading] = React.useState(true);
  var userData = '';
  var screen = '';
  const getUserData = async () => {
    userData = await AsyncStorage.getItem(keys.userData);
  };

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (userData === null) {
    setLoginState('true');
    screen = 'Home';
  } else {
    setLoginState('false');
    screen = 'Login';
  }

  return (
    <NavigationContainer>
      <AuthSatck.Navigator headerMode="none" initialRouteName={screen}>
        {/* <AuthSatck.Screen name="Start" component={StartScreen} /> */}
        <AuthSatck.Screen name="Login" component={Login} />
        <AuthSatck.Screen name="SignUp" component={SignUp} />
        <AuthSatck.Screen name="Home" component={DrawerStackScreen} />
        <AuthSatck.Screen name="Profile" component={ProfileStackScreen} />
      </AuthSatck.Navigator>
    </NavigationContainer>
  );
};
