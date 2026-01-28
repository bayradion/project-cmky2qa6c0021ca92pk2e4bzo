import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import GameScreen from './src/screens/GameScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator initialRouteName="Game">
        <Stack.Screen 
          name="Game" 
          component={GameScreen} 
          options={{ 
            headerShown: false 
          }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}