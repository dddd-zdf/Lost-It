import { View, Text, StyleSheet, Button } from "react-native";
import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import MyPressable from "../components/MyPressable";
import { DefaultLocation } from "../helper";
import GooglePlacesInput from "../components/AddressInput";

export default function Map({ navigation, route }) {
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [locationFromAddres, setLocationFromAddress] = useState();
    useEffect(() => {
        if (route.params.currentLocation) {
            setSelectedLocation(route.params.currentLocation);
        }
    }, [route]);

    //pass the location from API to selectedLocation
    useEffect(() => {
        if (locationFromAddres) {
            setSelectedLocation({
                latitude: locationFromAddres.lat,
                longitude: locationFromAddres.lng
            });
        }
      }, [locationFromAddres]);
    return (
        <>
        <GooglePlacesInput 
            setLocationFromAddress={setLocationFromAddress}
        />
            <MapView
                onPress={(event) => {
                    setSelectedLocation({
                        latitude: event.nativeEvent.coordinate.latitude,
                        longitude: event.nativeEvent.coordinate.longitude,
                    });
                }}
                style={styles.container}
                provider="google"
                initialRegion={{
                    latitude: route.params.currentLocation
                        ? route.params.currentLocation.latitude
                        : DefaultLocation.latitude,
                    longitude: route.params.currentLocation
                        ? route.params.currentLocation.longitude
                        : DefaultLocation.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                {selectedLocation && (
                    <Marker
                        coordinate={{
                            latitude: selectedLocation.latitude,
                            longitude: selectedLocation.longitude,
                        }}
                    />
                )}
            </MapView>

            <MyPressable
                isDisabled={!selectedLocation}
                title="Confirm selected location"
                customStyle={styles.confirmButton}
                pressedStyle={{ opacity: 0.5 }}
                pressedFunction={() =>
                    navigation.navigate(route.params.returnScreen, {
                        selectedLocation: selectedLocation,
                    })
                }
            >
                <Text> Confirm selectedLocation </Text>
            </MyPressable>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        // backgroundColor: "red",
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
    },
    confirmButton: {
        // position: "absolute",
        zIndex: 1,
        alignItems: "center",
        marginBottom: 40,
        marginTop: 10,
    },
});
