import React, {FC, useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Keyboard,
  TextInputAndroidProps,
  Alert,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation/Homestack';
import styles from './SignUp.styles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getUserDetails} from '../Login/Login';
import useValidation from '../../hooks/useValidation';
import useActive from '../../hooks/useActive';
import colors from '../../config/Colors';

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
  mobileNumber: string;
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
      mobileNumber,
    };
    if (UserDetailsArrayState.length > 0) {
      let isUserNameExists = UserDetailsArrayState.some(
        item => item.username === username,
      );
      if (isUserNameExists) {
        Alert.alert('The UserName entered is already exists');
      } else {
        let newArray = [...UserDetailsArrayState, NewObj];
        Alert.alert('Signup Succesfully Completed');
        navigation.navigate('Login');
        AsyncStorage.setItem('userDetails', JSON.stringify(newArray));
      }
    } else {
      let newArray = [NewObj];
      Alert.alert('Succesfully registered!!');
      navigation.navigate('Login');
      AsyncStorage.setItem('userDetails', JSON.stringify(newArray));
    }
  };

  interface TextInputTypes extends TextInputAndroidProps {
    label: 'username' | 'password' | 'dob' | 'email' | 'Mobile Number';
  }
  const TextInputCustom: FC<TextInputTypes> = ({label, ...rest}) => {
    let errorFlagFinal, errorFinal;
    const [inputValue, setInputValue] = useState('');

    return (
      <View style={styles.input}>
        <Text style={{}}>{label}</Text>
        <TextInput
          key={label}
          onChangeText={text => {
            setInputValue(text);
          }}
          style={{color: 'black'}}
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
        {errorFinal && <Text style={{color: 'red'}}>{errorFinal}</Text>}
      </View>
    );
  };

  let isActive = useActive([username, password, emailId, dob, mobileNumber]);

  return (
    <View style={styles.container}>
      <View style={{width: '100%', alignItems: 'center'}}>
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
            onChangeText={t => setPassword(t)}
          />
        </View>
        <View style={styles.input}>
          <TextInput
            placeholder="dob"
            placeholderTextColor={'black'}
            onChangeText={t => setDob(t)}
          />
        </View>
        <View style={styles.input}>
          <TextInput
            placeholder="email"
            placeholderTextColor={'black'}
            onChangeText={t => setEmailId(t)}
          />
        </View>
        <View style={styles.input}>
          <TextInput
            placeholder="Mobile Number"
            placeholderTextColor={'black'}
            onChangeText={t => setMobileNumber(t)}
            maxLength={10}
            keyboardType="number-pad"
          />
        </View>
        {/* <TextInputCustom label="username" />
        <TextInputCustom label="password" />
        <TextInputCustom label="dob" />
        <TextInputCustom label="email" />
        <TextInputCustom label="Mobile Number" /> */}
      </View>
      <TouchableOpacity
        onPress={SaveUserDetails}
        style={
          isActive
            ? styles.button
            : {...styles.button, ...styles.buttondisabled}
        }>
        <Text style={{fontSize:20,color:colors.black,fontWeight:'600'}}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUp;
