import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './src/screens/HomeScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';
import VideoSearchScreen from './src/screens/VideoSearchScreen';
import ParentToolsScreen from './src/screens/ParentToolsScreen';
import SearchResultsScreen from './src/screens/SearchResultsScreen';

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator(); // new stack navigator

// 👇 Nested stack navigator for the Home tab
function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="HomeMain" component={HomeScreen} options={{ headerShown: false }} />
      <HomeStack.Screen name="SearchResults" component={SearchResultsScreen} options={{ title: 'Results' }} />
    </HomeStack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = 'home';
            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Favorites') {
              iconName = focused ? 'heart' : 'heart-outline';
            } else if (route.name === 'Videos') {
              iconName = focused ? 'play-circle' : 'play-circle-outline';
            } else if (route.name === 'ParentTools') {
              iconName = focused ? 'lock-closed' : 'lock-closed-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#e63946',
          tabBarInactiveTintColor: '#999',
        })}
      >
        <Tab.Screen name="Home" component={HomeStackScreen} />
        <Tab.Screen name="Favorites" component={FavoritesScreen} />
        <Tab.Screen name="Videos" component={VideoSearchScreen} />
        <Tab.Screen name="ParentTools" component={ParentToolsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
