import React, {FC, useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation/Homestack';
import styles from './Home.styes';
import colors from '../../config/Colors';
import {UserDetailsObject} from '../SignUp/SignUp';
import AsyncStorage from '@react-native-async-storage/async-storage';

type HomeNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type HomeRouteProp = RouteProp<RootStackParamList, 'Home'>;

interface HomeScreenProps {
  navigation: HomeNavigationProp;
  route: HomeRouteProp;
}

const Home: FC<HomeScreenProps> = ({navigation, route}) => {
  const [userDetails, setUserDetails] = useState<UserDetailsObject>({
    username: '',
    email: '',
    password: '',
    dob: '',
  });

  const getCurrentUserDetails = async () => {
    try {
      const storedArray = await AsyncStorage.getItem('currentUserDetails');
      if (storedArray) {
        const parsedArray = JSON.parse(storedArray);
        return parsedArray;
      }
    } catch (error) {
      console.error(
        'Error fetching UserDetailsArray from AsyncStorage:',
        error,
      );
    }
    return {};
  };

  useEffect(() => {
    getCurrentUserDetails().then(parsedObject => {
      setUserDetails(parsedObject);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={{color: colors.primarydark}}>Welcome</Text>
    </View>
  );
};

export default Home;
