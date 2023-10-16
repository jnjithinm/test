import React, {FC, useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation/Homestack';
import colors from '../../config/Colors';
import styles from './Login.styles';
import {TextInput} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UserDetailsObject} from '../SignUp/SignUp';

type LoginNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

type LoginRouteProp = RouteProp<RootStackParamList, 'Login'>;

interface LoginScreenProps {
  navigation: LoginNavigationProp;
  route: LoginRouteProp;
}

export const getUserDetails = async () => {
  try {
    const storedArray = await AsyncStorage.getItem('userDetails');
    if (storedArray) {
      const parsedArray = JSON.parse(storedArray);
      return parsedArray; 
    }
  } catch (error) {
    console.error('Error fetching UserDetailsArray from AsyncStorage:', error);
  }
  return []; 
};

const Login: FC<LoginScreenProps> = ({navigation, route}) => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [UserDetailsArrayState, setUserDetailsArrayState] = useState<
  UserDetailsObject[]
  >([]);

  useEffect(() => {
    getUserDetails().then(parsedArray => {
      setUserDetailsArrayState(parsedArray);
    });
  });

  const onPressLogin = () => {
    let findedUser = UserDetailsArrayState.find(
      item => item.username === username,
    );

    if (findedUser) {
      AsyncStorage.setItem('currentUserDetails',JSON.stringify(findedUser));
    } else {
      console.log('Username or password does not match ! Try again !');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.input}>
        <TextInput
          placeholder="username"
          placeholderTextColor={'black'}
          onChangeText={t => setUserName(t)}
        />
      </View>
      <View style={styles.input}>
        <TextInput
          placeholder="password"
          placeholderTextColor={'black'}
          secureTextEntry={true}
          onChangeText={t => setPassword(t)}
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => console.log('logged in!!')}>
        <Text style={styles.login}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.register}
        onPress={onPressLogin}>
        <Text
          style={{
            fontSize: 15,
            fontWeight: 'bold',
            color: 'red',
          }}>
          Don't have an account? Register here
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
