import React, { useState, useEffect } from "react";
import {
    NavigationContainer,
    getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import Add from "./Screens/Add";
import Detail from "./Screens/Detail";
import Home from "./Screens/Home";
import Profile from "./Screens/Profile";
import Edit from "./Screens/Edit";
import Login from "./Screens/Login";
import Signup from "./Screens/Signup";
import Map from "./Screens/Map";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Firebase/firebase-setup";
import * as Notifications from "expo-notifications";
import { MAPS_API_KEY } from "@env";
import Geocoder from 'react-native-geocoding';
import { COLORS, ScreenContainer,COLORS2, addPagePressable } from "./helper";


Geocoder.init(MAPS_API_KEY);

const Tab = createBottomTabNavigator();

function BottomTabs() {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen
                name="Home"
                component={Home}
                initialParams={{ filter: "all" }}
                options={{
                    tabBarActiveTintColor: COLORS2.PRIMARY,
                    tabBarIcon: ({ color, size }) => (
                        <Entypo name="home" size={size} color={color} />
                    ),  
                }}
            />
            <Tab.Screen
                name="Mylist"
                component={Home}
                initialParams={{ filter: "user" }}
                options={{
                    tabBarActiveTintColor: COLORS2.PRIMARY,
                    tabBarIcon: ({ color, size }) => (
                        <Entypo name="list" size={24} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Post"
                component={Add}
                options={{
                    tabBarActiveTintColor: COLORS2.PRIMARY,
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="plus" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarActiveTintColor: COLORS2.PRIMARY,
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5
                            name="user-alt"
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

const Stack = createNativeStackNavigator();

const AuthStack = (
    <>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
    </>
);

const AppStack = (
    <>
        <Stack.Screen
            name="BottomTab"
            component={BottomTabs}
            options={({ route }) => ({
                //unable to get the name when launching app. presumably a timing issue
                headerTitle: getFocusedRouteNameFromRoute(route) || "Home",
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
            name="Edit Item"
            component={Edit}
            initialParams={{ filter: "user" }}
            options={({ route }) => ({
                headerTitle: getFocusedRouteNameFromRoute(route),
            })}
        />

        <Stack.Screen
            name="Map"
            component={Map}
            options={({ route }) => ({
                headerTitle: getFocusedRouteNameFromRoute(route),
            })}
        />
    </>
);

Notifications.setNotificationHandler({
    handleNotification: async () => {
      return {
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      };
    },
  });

export default function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
        });
    }, []);

    return (
        <NavigationContainer>
            <Stack.Navigator 
            screenOptions={{
                headerStyle: {
                  backgroundColor: COLORS2.PRIMARY,
                },
                headerTintColor: "#eee",
                headerTitleStyle: {
                  fontSize: 20,
                },
              }}>
                {isAuthenticated ? AppStack : AuthStack}
            </Stack.Navigator>
        </NavigationContainer>
    );
}
