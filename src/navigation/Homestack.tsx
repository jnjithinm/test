import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home/Home';
import Login from '../screens/Login/Login';
import SignUp, { UserDetailsObject } from '../screens/SignUp/SignUp';
import Admin from '../screens/Admin/Admin';
export type RootStackParamList = {
  Home: UserDetailsObject;
  Login: undefined;
  Admin: undefined;
  SignUp: undefined
};
const Stack = createStackNavigator<RootStackParamList>();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name='SignUp' component={SignUp} />
      <Stack.Screen name='Admin' component={Admin} />
    </Stack.Navigator>
  );
};

export default AuthStack;
