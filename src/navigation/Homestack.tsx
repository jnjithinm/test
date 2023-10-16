import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/Home/Home';
import Login from '../screens/Login/Login';
import SignUp from '../screens/SignUp/SignUp';

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Admin: undefined;
  SignUp:undefined
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
      <Stack.Screen name='SignUp' component={SignUp}/>
    </Stack.Navigator>
  );
};

export default AuthStack;
