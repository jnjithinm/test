import 'react-native-gesture-handler';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import Homestack from './src/navigation/Homestack';


const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
      <Homestack />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
