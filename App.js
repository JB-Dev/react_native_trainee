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
import {Provider} from 'react-redux';
import store from './src/store/store';
import {Root} from 'native-base';
import Chat from './src/screens/Chat/Chat';

const Tabs = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const Drawer = createDrawerNavigator();
const ProfileStack = createStackNavigator();
const Stack = createStackNavigator();

const HomeStackScreen = () => (
  <HomeStack.Navigator headerMode="none">
    <HomeStack.Screen name="Home" component={Home} />
    <HomeStack.Screen name="Details" component={Details} />
  </HomeStack.Navigator>
);
const DrawerStackScreen = () => (
  <Drawer.Navigator initialRouteName="Home">
    <Drawer.Screen name="Home" component={TabScreen} />
    <Drawer.Screen name="Details" component={Details} />
    <Drawer.Screen name="Profile" component={ProfileStackScreen} />
    <Drawer.Screen name="Chat" component={Chat} />
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
  return (
    <Provider store={store}>
      <Root>
        <NavigationContainer>
          <Stack.Navigator headerMode="none" initialRouteName={Loading}>
            <Stack.Screen name="Loading" component={Loading} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="Home" component={DrawerStackScreen} />
            <Stack.Screen name="Profile" component={ProfileStackScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Root>
    </Provider>
  );
};
