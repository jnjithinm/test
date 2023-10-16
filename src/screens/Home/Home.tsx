import React, { FC, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/Homestack';
import styles from './Home.styes';
import colors from '../../config/Colors';
import { UserDetailsObject } from '../SignUp/SignUp';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput } from 'react-native-gesture-handler';

type HomeNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type HomeRouteProp = RouteProp<RootStackParamList, 'Home'>;

interface HomeScreenProps {
  navigation: HomeNavigationProp;
  route: HomeRouteProp;
}

const Home: FC<HomeScreenProps> = ({ navigation, route }) => {
  const UserDetailsObject = route.params;
  const [isChanged, setIsChanged] = useState(false);
  const [username, setUserName] = useState<string>(UserDetailsObject.username);
  const [password, setPassword] = useState<string>(UserDetailsObject.password);
  const [emailId, setEmailId] = useState<string>(UserDetailsObject.email);
  const [dob, setDob] = useState<string>(UserDetailsObject.dob);
  const [UserDetailsArrayState, setUserDetailsArrayState] = useState<
    UserDetailsObject[]
  >([]);
  const [mobileNumber, setMobileNumber] = useState<string>(
    UserDetailsObject.mobileNumber,
  );

  const SaveUserDetails = async () => {
    // console.log(
    //   'console',
    //   `mobileNumber:${mobileNumber}`,
    //   `dob:${dob}`,
    //   `password:${password}`,
    // );
    let NewObj: UserDetailsObject = {
      username,
      password,
      email: emailId,
      dob,
      mobileNumber,
    };
    let filteredArray = UserDetailsArrayState.filter(item => (
      item.username !== UserDetailsObject.username
    ));

    let newArray = [...filteredArray, NewObj];

    AsyncStorage.setItem('userDetails', JSON.stringify(newArray));
  };
  return (
    <View style={styles.container}>
      <TextInput
        defaultValue={UserDetailsObject.username}
        style={styles.input}
        onChangeText={t => {
          setIsChanged(true);
          setUserName(t);
        }}
      />
      <TextInput
        defaultValue={UserDetailsObject.password}
        style={styles.input}
        onChangeText={t => {
          setIsChanged(true);
          setPassword(t);
        }}
      />
      <TextInput
        defaultValue={UserDetailsObject.email}
        style={styles.input}
        onChangeText={t => {
          setIsChanged(true);
          setEmailId(t);
        }}
      />
      <TextInput
        defaultValue={UserDetailsObject.dob}
        style={styles.input}
        onChangeText={t => {
          setIsChanged(true);
          setDob(t);
        }}
      />
      <TextInput
        defaultValue={UserDetailsObject.mobileNumber}
        style={styles.input}
        onChangeText={t => {
          setIsChanged(true);
          setMobileNumber(t);
        }}
      />
      <TouchableOpacity onPress={() => navigation.navigate('Admin')}>
        <Text>sdvsdv</Text>
      </TouchableOpacity>
      <TouchableOpacity disabled={!isChanged} onPress={SaveUserDetails}>
        <Text>Update</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
