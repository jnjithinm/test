import React, {FC, useState} from 'react';
import {View, Text, TextInput} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation/Homestack';
import colors from '../../config/Colors';
import styles from './SignUp.styles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

type SignUpNavigationProp = StackNavigationProp<RootStackParamList, 'SignUp'>;

type SignUpRouteProp = RouteProp<RootStackParamList, 'SignUp'>;

interface SignUpScreenProps {
  navigation: SignUpNavigationProp;
  route: SignUpRouteProp;
}

export type constUserDetailsObject = {
  username: string;
  password: string;
  dob: string;
  email: string;
};

const SignUp: FC<SignUpScreenProps> = ({navigation, route}) => {
  const [UserDetailsArrayState, setUserDetailsArrayState] = useState<
    constUserDetailsObject[]
  >([]);
  const [username, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  // const GetUserDetails = async () => {
  //   let Array = AsyncStorage.getItem('UserDetailsArray');
  //   if (Array) {
  //     setUserDetailsArrayState[Array];
  //   }
  // };

  const SaveUserDetails = async () => {
    let NewObj = {
      username,
      password,
    };
    AsyncStorage.setItem('userDetails', JSON.stringify(NewObj));
  };

  type TextInputTypes = {
    label: 'username' | 'password' | 'dob' | 'email';
  };
  const TextInputCustom: FC<TextInputTypes> = ({label}) => {
    return (
      <View>
        <Text style={{}}>{label}</Text>
        <TextInput
          style={{}}
          onChangeText={text => {
            if (label === 'username') {
              setUserName(text);
            } else if (label === 'dob') {
            }
          }}
        />
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeFont}>Welcome</Text>
      <TextInputCustom label="username" />
      <TouchableOpacity onPress={() => {}}>
        <Text>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUp;
