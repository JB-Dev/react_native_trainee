import React, {Component} from 'react';
import Home from '../react_native_trainee/src/screens/Home/Home';
import Login from '../react_native_trainee/src/screens/Login/Login';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Profile from './src/screens/profile/profile';
import Details from './src/screens/details/details';
import Splash from './src/screens/splash/splash';
import SignUp from './src/screens/SignUp/SignUp';

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
  const [userToken, setUserToken] = React.useState(null);

  const anthContext = React.useMemo(() => {});

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return <Splash />;
  }

  return (
    <NavigationContainer>
      {userToken ? (
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name="Home" component={TabScreen} />
          <Drawer.Screen name="Profile" component={ProfileStackScreen} />
        </Drawer.Navigator>
      ) : (
        <AuthSatck.Navigator headerMode="none">
          <AuthSatck.Screen name="Login" component={Login} />
          <AuthSatck.Screen name="Sign-Up" component={SignUp} />
        </AuthSatck.Navigator>
      )}
    </NavigationContainer>
  );
};
{
  /* <Tabs.Navigator>
      <Tabs.Screen name="Home" component={HomeStackScreen} />
      <Tabs.Screen name="Profile" component={ProfileStackScreen} />
    </Tabs.Navigator> */
}
{
  /* <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator> */
}
