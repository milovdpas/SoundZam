import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import UseIsLaunched from './utils/hooks/useIsLaunched';
import HomeScreen from './screens/HomeScreen';
import StartScreen from './screens/StartScreen';
import IdentificationScreen from './screens/IdentificationScreen';
import ResultsScreen from './screens/ResultsScreen';
import {Colors} from './assets/Stylesheet';

const MainStack = createNativeStackNavigator();

const StartRouting = () => {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'fade',
        animationDuration: 100,
        contentStyle: {
          backgroundColor: Colors.purple,
        },
      }}>
      <MainStack.Screen name="Start" component={StartScreen} />
      <MainStack.Screen name="Home" component={HomeScreen} />
      <MainStack.Screen
        name="Identification"
        component={IdentificationScreen}
      />
      <MainStack.Screen name="Results" component={ResultsScreen} />
    </MainStack.Navigator>
  );
};

const HomeRouting = () => {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'fade',
        animationDuration: 100,
        contentStyle: {
          backgroundColor: Colors.purple,
        },
      }}>
      <MainStack.Screen name="Home" component={HomeScreen} />
      <MainStack.Screen
        name="Identification"
        component={IdentificationScreen}
      />
      <MainStack.Screen name="Results" component={ResultsScreen} />
    </MainStack.Navigator>
  );
};

const Navigation = () => {
  const {isLaunched} = UseIsLaunched();
  return (
    <NavigationContainer>
      {!isLaunched ? StartRouting() : HomeRouting()}
    </NavigationContainer>
  );
};

export default Navigation;
