import React, {FC} from 'react';
import {View, Text} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation/Homestack';
import colors from '../../config/Colors';
import styles from './Login.styles';

type LoginNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

type LoginRouteProp = RouteProp<RootStackParamList, 'Login'>;

interface LoginScreenProps {
  navigation: LoginNavigationProp;
  route: LoginRouteProp;
}



const Login: FC<LoginScreenProps> = ({navigation, route}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeFont}>Welcome</Text>
      
    </View>
  );
};

export default Login;
