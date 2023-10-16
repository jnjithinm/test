import React, { FC, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/Homestack';
import colors from '../../config/Colors';
import styles from './Login.styles';
import { TextInput } from 'react-native-gesture-handler';

type LoginNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

type LoginRouteProp = RouteProp<RootStackParamList, 'Login'>;

interface LoginScreenProps {
  navigation: LoginNavigationProp;
  route: LoginRouteProp;
}



const Login: FC<LoginScreenProps> = ({ navigation, route }) => {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  return (
    <View style={styles.container}>
      <View style={styles.input}>
        <TextInput
          placeholder='username'
          placeholderTextColor={'black'}
          onChangeText={(t) => setName(t)} />
      </View>
      <View style={styles.input}>
        <TextInput
          placeholder='password'
          placeholderTextColor={'black'}
          secureTextEntry={true}
          onChangeText={(t) => setPassword(t)} />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => console.log('logged in!!')}>
        <Text style={styles.login}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.register} onPress={() => navigation.navigate('SignUp')}>
        <Text style={{
          fontSize: 15,
          fontWeight: 'bold',
          color: 'red'
        }}>Don't have an account? Register here</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
