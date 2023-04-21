import { View, Text, Alert, Image } from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import { MAPS_API_KEY } from "@env";
import { useNavigation, useRoute } from "@react-navigation/native";
import MyPressable from "./MyPressable";
import MapView, { Marker } from "react-native-maps";
import Geocoder from "react-native-geocoding";
import {
  getAddressFromDB,
  writeLocationToDB,
} from "../Firebase/firestore-helper";
import {
  COLORS,
  ScreenContainer,
  DefaultLocation,
  windowWidth,
} from "../helper";

//round coordinate decimals to avoid unneccesary duplicates
const rounding = 4;

export default function LocationManager({
  customPressableStyle,
  location,
  setLocation,
  setAddress,
  returnScreen,
}) {
  const [permissionResponse, requestPermission] =
    Location.useForegroundPermissions();
  const navigation = useNavigation();
  const route = useRoute();

  //reverse geocoding api
  async function getAddressFromAPI(location) {
    try {
      const json = await Geocoder.from(location);
      const addressComponent = json.results[0].formatted_address;
      await writeLocationToDB(location, addressComponent);
      return addressComponent;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  //query in DB first, then API
  async function getAddressFromLocation(location) {
    let address = await getAddressFromDB(location);
    if (!address) {
      const apiAddress = await getAddressFromAPI(location);
      address = apiAddress || "Unknown address";
    }
    return address;
  }

  useEffect(() => {
    if (route.params && route.params.selectedLocation) {
      setLocation({
        latitude: Number(
          route.params.selectedLocation.latitude.toFixed(rounding)
        ),
        longitude: Number(
          route.params.selectedLocation.longitude.toFixed(rounding)
        ),
      });
    }
  }, [route]);

  //call on location change
  useEffect(() => {
    async function getAddress() {
      if (location) {
        const address = await getAddressFromLocation(location);
        setAddress(address);
        console.log(address);
      }
    }
    getAddress();
  }, [location]);

  async function verifyPermission() {
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
        if (!result) {
          result = await Location.getCurrentPositionAsync();
        }
        let myLocation = {
          latitude: Number(result.coords.latitude.toFixed(rounding)),
          longitude: Number(result.coords.longitude.toFixed(rounding)),
        };
        setLocation(myLocation);
        const address = await getAddressFromLocation(myLocation);
        setAddress(address);
        console.log(address);

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
        <Text style={{color: COLORS.BLACK, fontWeight: 300, }}>Pick location on map</Text>
      )}
    </MyPressable>
  );
}
