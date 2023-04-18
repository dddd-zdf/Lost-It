import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { MAPS_API_KEY } from "@env";
import Geocoder from 'react-native-geocoding';

const GooglePlacesInput = ({setLocationFromAddress}) => {
  return (
    <GooglePlacesAutocomplete
      placeholder='Search'
      onPress={async (data, details = null) => {
        // 'details' is provided when fetchDetails = true
        const address = data.description;
        try {
          const json = await Geocoder.from(address);
          const location = json.results[0].geometry.location;
          console.log(location);
          setLocationFromAddress(location);
        } catch (error) {
          console.warn(error);
        }
      

      }}
      query={{
        key: MAPS_API_KEY,
        language: 'en',
      }}
    />
  );
};

export default GooglePlacesInput;