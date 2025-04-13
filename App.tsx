// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './src/screens/HomeScreen';
import VideoSearchScreen from './src/screens/VideoSearchScreen';
import HistoryScreen from './src/screens/HistoryScreen';
import ParentToolsScreen from './src/screens/ParentToolsScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Videos') {
              iconName = 'play-circle';
            } else if (route.name === 'History Confirm') {
              iconName = 'time';
            } else if (route.name === 'Parent Tools') {
              iconName = 'settings';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#e91e63',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Videos" component={VideoSearchScreen} />
        <Tab.Screen name="History Confirm" component={HistoryScreen} />
        <Tab.Screen name="Parent Tools" component={ParentToolsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
