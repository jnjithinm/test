import React, { FC, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/Homestack';
import styles from './Admin.styes';
import colors from '../../config/Colors';
import { UserDetailsObject } from '../SignUp/SignUp';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserDetails } from '../Login/Login';
import { TouchableOpacity } from 'react-native-gesture-handler';

type AdminNavigationProp = StackNavigationProp<RootStackParamList, 'Admin'>;

type AdminRouteProp = RouteProp<RootStackParamList, 'Admin'>;

interface AdminScreenProps {
  navigation: AdminNavigationProp;
  route: AdminRouteProp;
}

const Admin: FC<AdminScreenProps> = ({ navigation, route }) => {
  const [userDetails, setUserDetails] = useState<UserDetailsObject[]>([]);
  const [UserDetailsArrayState, setUserDetailsArrayState] = useState<
    UserDetailsObject[]
  >([]);
  useEffect(() => {
    getUserDetails().then(parsedObject => {
      setUserDetails(parsedObject);
      // console.log('user list', parsedObject);
    });
  }, []);
  const OnDelete = async (userName: string) => {
    let filteredArray = UserDetailsArrayState.filter(item => {
      item.username == userName;
    });
    AsyncStorage.setItem('userDetails', JSON.stringify(filteredArray));
  };
  return (
    <View style={styles.container}>
      {userDetails.map(item => {
        return (
          <View
            key={item.dob}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              borderWidth: 0.4,
              margin: 20,
              borderRadius: 10,
              padding: 20,
            }}>
            <View style={{ justifyContent: 'space-evenly' }}>
              <Text>{item.username}</Text>
              <Text> {item.dob}</Text>
            </View>
            <View style={{ justifyContent: 'space-evenly' }}>
              <Text> {item.email}</Text>
              <Text> {item.mobileNumber}</Text>
            </View>

            <TouchableOpacity onPress={() => OnDelete(item.username)} style={{marginLeft:14}}>
              <Text>Delete</Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
};

export default Admin;
