import { View, Text, Alert, Image } from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import { MAPS_API_KEY } from "@env";
import { useNavigation, useRoute } from "@react-navigation/native";
import MyPressable from "./MyPressable";
import MapView, { Marker } from "react-native-maps";

export default function LocationManager({
    customPressableStyle,
    location,
    setLocation,
    returnScreen,
}) {
    const [permissionResponse, requestPermission] =
        Location.useForegroundPermissions();

    const navigation = useNavigation();
    const route = useRoute();

    useEffect(() => {
        if (route.params) {
            setLocation(route.params.selectedLocation);
        }
    }, [route]);

    async function verifyPermission() {
        console.log(permissionResponse);
        if (permissionResponse.granted) {
            return true;
        }
        const permissionResult = await requestPermission();
        return permissionResult.granted;
    }

    async function pickLocationHandler() {
        const permissionReceived = await verifyPermission();
        if (location) {
            navigation.navigate("Map", {
                currentLocation: location,
                returnScreen: returnScreen,
            });
        } else if (!permissionReceived) {
            navigation.goBack();
        } else {
            try {
                const result = await Location.getLastKnownPositionAsync();
                let myLocation = {
                    latitude: result.coords.latitude,
                    longitude: result.coords.longitude,
                };
                setLocation(myLocation);
                navigation.navigate("Map", {
                    currentLocation: myLocation,
                    returnScreen: returnScreen,
                });
            } catch (err) {
                console.log("location handler ", err);
            }
        }
    }

    return (
        <MyPressable
            pressedFunction={pickLocationHandler}
            customStyle={customPressableStyle}
            pressedStyle={{ opacity: 0.5 }}
        >
            {location ? (
                <Image
                    source={{
                        uri: `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:L%7C${location.latitude},${location.longitude}&key=${MAPS_API_KEY}`,
                    }}
                    style={{
                        width: customPressableStyle.width,
                        height: customPressableStyle.height,
                    }}
                />
            ) : (
                <Text style={{ color: "white" }}>Pick location on map</Text>
            )}
        </MyPressable>
    );
}
