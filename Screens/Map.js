import { View, Text, StyleSheet, Button } from "react-native";
import React, { useState } from "react";
import MapView, { Marker } from "react-native-maps";

export default function Map({ navigation, route }) {
    const [selectedLocation, setSelectedLocation] = useState(null);
    console.log("route.params ", route.params);
    return (
        <>
            <MapView
                onPress={(event) => {
                    setSelectedLocation({
                        latitude: event.nativeEvent.coordinate.latitude,
                        longitude: event.nativeEvent.coordinate.longitude,
                    });
                }}
                style={styles.container}
                initialRegion={{
                    latitude: route.params
                        ? route.params.currentLocation.latitude
                        : 49.280517,
                    longitude: route.params
                        ? route.params.currentLocation.longitude
                        : -123.115961,
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

            <Button
                disabled={!selectedLocation}
                title="Confirm selected location"
                onPress={() =>
                    navigation.navigate("Post", {
                        selectedLocation: selectedLocation,
                    })
                }
            />
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
});
