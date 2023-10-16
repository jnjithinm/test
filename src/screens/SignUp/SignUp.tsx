import React, {FC} from 'react';
import {View, Text, TextInput} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation/Homestack';
import colors from '../../config/Colors';
import styles from './SignUp.styles';

type SignUpNavigationProp = StackNavigationProp<RootStackParamList, 'SignUp'>;

type SignUpRouteProp = RouteProp<RootStackParamList, 'SignUp'>;

interface SignUpScreenProps {
  navigation: SignUpNavigationProp;
  route: SignUpRouteProp;
}

const SignUp: FC<SignUpScreenProps> = ({navigation, route}) => {
  type TextInputTypes = {
    label: 'username' | 'password' | 'dob' | 'email';
  };
  const TextInputCustom: FC<TextInputTypes> = ({label}) => {
    return (
      <View>
        <Text>{label}</Text>
        <TextInput />
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeFont}>Welcome</Text>
    </View>
  );
};

export default SignUp;
