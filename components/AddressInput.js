import React from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { MAPS_API_KEY } from "@env";
import Geocoder from "react-native-geocoding";
import { View } from "react-native";

const GooglePlacesInput = ({ setLocationFromAddress }) => {
  return (
    <View
      style={{
        position: "absolute",
        marginTop: 25,
        width: "95%",
        borderRadius: 10,
        zIndex: 1,
        marginHorizontal: 10,
        borderRadius: 10,
        borderColor: "black",
        shadowColor: "black",
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 0 },
      }}
    >
      <GooglePlacesAutocomplete
        placeholder="Search"
        onPress={async (data, details = null) => {
          // 'details' is provided when fetchDetails = true
          const address = data.description;
          console.log("address from address Input :", address);
          try {
            const json = await Geocoder.from(address);
            const location = json.results[0].geometry.location;
            console.log("Location from address input: ", location);
            setLocationFromAddress(location);
          } catch (error) {
            console.warn(error);
          }
        }}
        query={{
          key: MAPS_API_KEY,
          language: "en",
        }}
      />
    </View>
  );
};

export default GooglePlacesInput;

{
  /* <TextInput
  style={{
    borderRadius: 10,
    margin: 10,
    color: "#000",
    borderColor: "#666",
    backgroundColor: "#FFF",
    borderWidth: 1,
    height: 45,
    paddingHorizontal: 10,
    fontSize: 18,
  }}
  placeholder={"Search"}
  placeholderTextColor={"#666"}
/>; */
}
