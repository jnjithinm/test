import React, {FC, useEffect, useState} from 'react';
import {View, Text, TextInput, Keyboard} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation/Homestack';
import styles from './SignUp.styles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getUserDetails} from '../Login/Login';
import useValidation from '../../hooks/useValidation';

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
  const [mobileNumber, setMobileNumber] = useState<string>('');
  const {validateField} = useValidation();

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
    label: 'username' | 'password' | 'dob' | 'email' | 'Mobile Number';
    numPad?: boolean;
  };
  const TextInputCustom: FC<TextInputTypes> = ({label, numPad}) => {
    let errorFlagFinal, errorFinal;
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
          onBlur={() => {
            if (label === 'email') {
              let {errorFlag, error} = validateField({
                FieldName: 'email',
                value: emailId,
              });
              errorFinal=error;
            } else if (label === 'Mobile Number') {
              const {errorFlag, error} = validateField({
                FieldName: 'mobilenumber',
                value: mobileNumber,
              });
              errorFinal=error;
            }
          }}
        />
        {errorFinal && <Text>{errorFinal}</Text>}
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeFont}>Welcome</Text>
      <TextInputCustom label="username" />
      <TextInputCustom label="password" />
      <TextInputCustom label="email" />
      <TextInputCustom label="Mobile Number" />
      <TouchableOpacity onPress={SaveUserDetails}>
        <Text>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUp;
