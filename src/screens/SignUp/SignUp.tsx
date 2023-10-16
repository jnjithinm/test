import React, {FC, useEffect, useState} from 'react';
import {View, Text, TextInput} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation/Homestack';
import styles from './SignUp.styles';
import {TouchableOpacity} from 'react-native-gesture-handler';
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

const SignUp: FC<SignUpScreenProps> = ({navigation, route}) => {
  const [UserDetailsArrayState, setUserDetailsArrayState] = useState<
  UserDetailsObject[]
  >([]);
  const [username, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailId, setEmailId] = useState<string>('');
  const [dob, setDob] = useState<string>('');

  useEffect(() => {
    getUserDetails().then(parsedArray => {
      setUserDetailsArrayState(parsedArray);
    });
  }, []);

  const SaveUserDetails = async () => {
    let NewObj: UserDetailsObject = {
      username,
      password,
      email: emailId,
      dob,
    };
    if (UserDetailsArrayState.length > 0) {
      let newArray = [...UserDetailsArrayState, NewObj];
      AsyncStorage.setItem('userDetails', JSON.stringify(newArray));
    } else {
      let newArray = [NewObj];
      AsyncStorage.setItem('userDetails', JSON.stringify(newArray));
    }
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
      <TouchableOpacity onPress={SaveUserDetails}>
        <Text>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUp;
