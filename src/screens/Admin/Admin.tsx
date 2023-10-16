import React, {FC, useEffect, useState} from 'react';
import {View, Text, Image} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation/Homestack';
import styles from './Admin.styes';
import colors from '../../config/Colors';
import {UserDetailsObject} from '../SignUp/SignUp';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getUserDetails} from '../Login/Login';
import {TouchableOpacity} from 'react-native-gesture-handler';

type AdminNavigationProp = StackNavigationProp<RootStackParamList, 'Admin'>;

type AdminRouteProp = RouteProp<RootStackParamList, 'Admin'>;

interface AdminScreenProps {
  navigation: AdminNavigationProp;
  route: AdminRouteProp;
}

const Admin: FC<AdminScreenProps> = ({navigation, route}) => {
  const [userDetails, setUserDetails] = useState<UserDetailsObject[]>([]);
  const [UserDetailsArrayState, setUserDetailsArrayState] = useState<
    UserDetailsObject[]
  >([]);
  
  const GetUserRefrestDetails=()=>{
    getUserDetails().then(parsedObject => {
        setUserDetails(parsedObject);
      });
  }
  useEffect(() => {
    GetUserRefrestDetails();
  }, []);

  const OnDelete = async (userName: string) => {
    let filteredArray = UserDetailsArrayState.filter(item => {
      item.username == userName;
    });
    AsyncStorage.setItem('userDetails', JSON.stringify(filteredArray));
    GetUserRefrestDetails();
  };
  return (
    <View style={styles.container}>
      {userDetails.map(item => {
        return (
          <View
            key={item.dob}
            style={{
              justifyContent: 'space-evenly',
              borderRadius: 15,
              paddingHorizontal: 20,
              paddingVertical: 20,
              width: '80%',
              backgroundColor: colors.lightgrey,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={styles.userNameFont}>{item.username}</Text>
              <Text style={styles.mobileNumberFont}> {item.mobileNumber}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={styles.emailIdFont}> {item.email}</Text>
              <Text style={styles.dobFont}> {item.dob}</Text>
            </View>

            <TouchableOpacity
              onPress={() => OnDelete(item.username)}
              style={{alignSelf: 'flex-end', marginTop: 15}}>
              <Image
                source={require('../../assets/images/delete.png')}
                style={{width: 25, height: 25}}
              />
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
};

export default Admin;
