import React from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { MAPS_API_KEY } from "@env";
import Geocoder from "react-native-geocoding";
import { View } from "react-native";
import { GooglePlacesInputStyles } from "../helper";

const GooglePlacesInput = ({ setLocationFromAddress }) => {
  return (
    <View style={ GooglePlacesInputStyles }>
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
