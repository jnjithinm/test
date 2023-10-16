import React, {FC} from 'react';
import {View, Text} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation/Homestack';
import styles from './Home.styes';
import colors from '../../config/Colors';

type HomeNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type HomeRouteProp = RouteProp<RootStackParamList, 'Home'>;

interface HomeScreenProps {
  navigation: HomeNavigationProp;
  route: HomeRouteProp;
}

const Home: FC<HomeScreenProps> = ({navigation, route}) => {

  return (
    <View style={styles.container}>
      <Text style={{color: colors.primarydark}}>Welcome</Text>
    </View>
  );
};

export default Home