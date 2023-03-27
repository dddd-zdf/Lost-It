import * as React from 'react';
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import AddEdit from './Screens/Add';
import Detail from './Screens/Detail';
import ItemList from './Screens/ItemList';
import Profile from './Screens/Profile';
import Mylist from './Screens/Mylist';


const Tab = createBottomTabNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" 
        component={ItemList}
        initialParams={{ filter: 'all' }}
        options={{
          tabBarIcon: ({ color, size }) => (<Entypo name="home" size={size} color={color} />),
      }}/>
       <Tab.Screen name="Mylist" 
        component={Mylist}
        initialParams={{ filter: 'all' }}
        options={{
          tabBarIcon: ({ color, size }) => (<Entypo name="list" size={24} color="black" />),
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
          name="BottomTab"
          component={BottomTabs}
          options={({ route }) => ({
            //unable to get the name when launching app. presumably a timing issue
            headerTitle: getFocusedRouteNameFromRoute(route) || 'Home'
          })}
        />
        <Stack.Screen
          name="Item Details"
          component={Detail}
          options={({ route }) => ({
            headerTitle: getFocusedRouteNameFromRoute(route),
          })}        
        />
        <Stack.Screen
          name="Item List"
          component={ItemList}
          initialParams={{ filter: 'user' }}
          options={({ route }) => ({
            headerTitle: getFocusedRouteNameFromRoute(route),
          })}        
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}