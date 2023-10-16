import React, {FC, useEffect, useState} from 'react';
import {View, Text, TextInput, Keyboard, TextInputAndroidProps} from 'react-native';
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

  interface TextInputTypes extends TextInputAndroidProps   {
    label: 'username' | 'password' | 'dob' | 'email' | 'Mobile Number';
  };
  const TextInputCustom: FC<TextInputTypes> = ({label,...rest}) => {
    let errorFlagFinal, errorFinal;
    const [inputValue, setInputValue] = useState('');

    return (
      <View style={{flex: 1}}>
        <Text style={{}}>{label}</Text>
        <TextInput
          onChangeText={text => setInputValue(text)}
          value={inputValue}
          onBlur={() => {
            if (label === 'email') {
              let {errorFlag, error} = validateField({
                FieldName: 'email',
                value: inputValue,
              });
              errorFlag ? (errorFinal = error) : setEmailId(inputValue);
            } else if (label === 'Mobile Number') {
              let {errorFlag, error} = validateField({
                FieldName: 'Mobile Number',
                value: inputValue,
              });
              errorFlag ? (errorFinal = error) : setMobileNumber(inputValue);
            }
          }}
          {...rest}
        />
        {errorFinal && <Text style={{color:'red'}}>{errorFinal}</Text>}
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeFont}>Welcome</Text>
      <View>
        <TextInputCustom label="username" />
        <TextInputCustom label="password" />
        <TextInputCustom label="email" />
        <TextInputCustom label="Mobile Number" />
      </View>
      <TouchableOpacity onPress={SaveUserDetails}>
        <Text>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUp;
