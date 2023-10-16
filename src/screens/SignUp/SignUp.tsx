import React, { FC, useState } from 'react';
import { View, Text, TextInput, KeyboardAvoidingView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/Homestack';
import colors from '../../config/Colors';
import styles from './SignUp.styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getUserDetails} from '../Login/Login';

type SignUpNavigationProp = StackNavigationProp<RootStackParamList, 'SignUp'>;

type SignUpRouteProp = RouteProp<RootStackParamList, 'SignUp'>;

interface SignUpScreenProps {
  navigation: SignUpNavigationProp;
  route: SignUpRouteProp;
}

export type UserDetailsObject = {
  username: string;
  password: string;
  dob: string;
  email: string;
};

const SignUp: FC<SignUpScreenProps> = ({ navigation, route }) => {
  const [UserDetailsArrayState, setUserDetailsArrayState] = useState<
  UserDetailsObject[]
  >([]);
  const [username, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [dob, setDob] = useState<string>('');
  const [email, SetEmail] = useState<string>('');
  const [mobile, setMobile] = useState<string>('');
  // const GetUserDetails = async () => {
  //   let Array = AsyncStorage.getItem('UserDetailsArray');
  //   if (Array) {
  //     setUserDetailsArrayState[Array];
  //   }
  // };

  const SaveUserDetails = async () => {
    let NewObj: UserDetailsObject = {
      username,
      password,
    };
    AsyncStorage.setItem('userDetails', JSON.stringify(NewObj));
  };

  type TextInputTypes = {
    label: 'username' | 'password' | 'dob' | 'email' | 'mobile';
  };
  const TextInputCustom: FC<TextInputTypes> = ({ label }) => {
    return (
      <View>
        <Text style={styles.label}>{label}</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => {
            if (label === 'username') {
              setUserName(text);
            } else if (label === 'dob') {
              setDob(text)
            } else if (label === 'password') {
              setPassword(text)
            } else if (label === 'email') {
              SetEmail(text)
            } else {
              setMobile(text)
            }
          }}
        />
      </View>
    );
  };
  return (
    <KeyboardAvoidingView style={styles.container}>
      <TextInputCustom label="username" />
      <TextInputCustom label="password" />
      <TextInputCustom label="dob" />
      <TextInputCustom label="email" />
      <TextInputCustom label="mobile" />
      <TouchableOpacity onPress={() => { }} style={styles.button}>
        <Text style={styles.submit}>Submit</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
