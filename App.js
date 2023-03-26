import * as React from 'react';
import { Text, View, Pressable } from 'react-native';
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import AddEdit from './components/AddEdit';
import Detail from './components/Detail';
import Home from './components/Home';
import Profile from './components/Profile';
import ProfileItem from './components/ProfileItem';


const Tab = createBottomTabNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" 
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (<Entypo name="home" size={size} color={color} />),
      }}/>
      <Tab.Screen name="Post" 
        component={AddEdit} 
        options={{
          tabBarIcon: ({ color, size }) => (<FontAwesome name="plus" size={size} color={color} />),
      }}/>
      <Tab.Screen name="Profile" 
        component={Profile} 
        options={{
          tabBarIcon: ({ color, size }) => (<FontAwesome5 name="user-alt" size={size} color={color} />),
      }}/>
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={BottomTabs}
          options={({ route }) => ({
            headerTitle: getFocusedRouteNameFromRoute(route),
          })}        
        />
        <Stack.Screen
          name="Item Details"
          component={Detail}
          options={({ route }) => ({
            headerTitle: getFocusedRouteNameFromRoute(route),
          })}        
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}