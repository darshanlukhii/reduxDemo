import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../Screens/Home';
import EditScreen from '../Screens/EditScreen';

const MainNavigation = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          headerTintColor: '#FFFFFF',
        }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="edit" component={EditScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;