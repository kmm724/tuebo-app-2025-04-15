import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './src/screens/HomeScreen';
import SearchResultsScreen from './src/screens/SearchResultsScreen';
import VideoSearchScreen from './src/screens/VideoSearchScreen';
import ParentToolsScreen from './src/screens/ParentToolsScreen';
import ParentInsightsScreen from './src/screens/ParentInsightsScreen';
import FunFactsScreen from './src/screens/FunFactsScreen';
import FactVideoScreen from './src/screens/FactVideoScreen';

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const ParentStack = createNativeStackNavigator();
const FunFactsStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="HomeMain" component={HomeScreen} options={{ headerShown: false }} />
      <HomeStack.Screen name="SearchResults" component={SearchResultsScreen} options={{ title: 'Results' }} />
    </HomeStack.Navigator>
  );
}

function ParentStackScreen() {
  return (
    <ParentStack.Navigator>
      <ParentStack.Screen name="ParentToolsMain" component={ParentToolsScreen} options={{ headerShown: false }} />
      <ParentStack.Screen name="ParentInsights" component={ParentInsightsScreen} options={{ title: 'Parent Insights' }} />
    </ParentStack.Navigator>
  );
}

function FunFactsStackScreen() {
  return (
    <FunFactsStack.Navigator>
      <FunFactsStack.Screen
        name="FunFactsMain"
        component={FunFactsScreen}
        options={{ headerShown: false }}
      />
      <FunFactsStack.Screen
        name="FactVideoScreen"
        component={FactVideoScreen}
        options={{ title: 'More About This!' }}
      />
    </FunFactsStack.Navigator>
  );
}

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
            } else if (route.name === 'Parent Tools') {
              iconName = 'settings';
            } else if (route.name === 'Fun Facts') {
              iconName = 'bulb';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#1d3557',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={HomeStackScreen} />
        <Tab.Screen name="Fun Facts" component={FunFactsStackScreen} />
        <Tab.Screen name="Videos" component={VideoSearchScreen} />
        <Tab.Screen name="Parent Tools" component={ParentStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
