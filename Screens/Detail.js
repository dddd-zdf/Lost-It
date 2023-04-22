import { View, Text, StyleSheet, Alert, Image, ImageBackground, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, ScreenContainer,COLORS2, addPagePressable, DetailStyle } from "../helper";
import MyPressable from "../components/MyPressable";
import LocationManager from "../components/LocationManager";
import { deleteFromDB } from "../Firebase/firestore-helper";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Firebase/firebase-setup";
import { MAPS_API_KEY } from "@env";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../Firebase/firebase-setup";

export default function Detail({ route, navigation }) {
  const { key, title, description, userId, uploader, uploaderEmail, location, imageUri, address } = route.params;
  const [user] = useAuthState(auth);
  const [imageURL, setImageURL] = useState("");
  useEffect(() => {
    async function getImageUrl() {
      try {
        const reference = ref(storage, imageUri);
        const url = await getDownloadURL(reference);
        setImageURL(url);
      } catch (err) {
        console.log("get image url", err);
      }
    }
    getImageUrl();
  }, [imageUri]);
  function onEditPress() {
      navigation.navigate("Edit Item", {
        key, 
        title, 
        description, 
        userId, 
        uploader, 
        uploaderEmail, 
        location, 
        imageURL,
        address,
      });
  }

  function onDeletePress() {
      Alert.alert("Delete", "Are you sure you want to delete this entry?", [
        {
          text: "Yes",
          onPress: () => {
            deleteFromDB(key);
            return navigation.goBack();
          },
          style: "cancel",
        },
        {
          text: "No",
          style: "cancel",
        },
      ]);
  }

  return (
    <ScrollView>
    <View style={[ScreenContainer, { paddingTop: 40 }]}>
     
       <ImageBackground
        style={DetailStyle.poster}
        source={require("../assets/plainBG.png")}
      >
      <View style={DetailStyle.container}>
        <Text style={DetailStyle.text}>{`Title:  ${title}`}</Text>
        <Text style={DetailStyle.text}>{`User:  ${uploader}`}</Text>
        <Text style={DetailStyle.text}>{`Contact:  ${uploaderEmail}`}</Text>
        <Text style={DetailStyle.text}>{`Description:  ${description}`}</Text>
        <Text style={DetailStyle.text}>{`Address:  ${address}`}</Text>

        <View style={DetailStyle.utilitiesContainer}>
          {imageURL && (
            <Image
              source={{
                uri: imageURL,
              }}
              style={{
                width: DetailStyle.utilitiesButtons.width,
                height: DetailStyle.utilitiesButtons.height,
              }}
            />
          )}
          <Image
            source={{
              uri: `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:L%7C${location.latitude},${location.longitude}&key=${MAPS_API_KEY}`,
            }}
            style={{
              width: DetailStyle.utilitiesButtons.width,
              height: DetailStyle.utilitiesButtons.height,
            }}
          />
        </View>

        {userId === user.uid && (
  <View style={DetailStyle.pressablesContainer}>
    <MyPressable
      customStyle={DetailStyle.pressableDelete}
      pressedStyle={{ opacity: 0.8 }}
      pressedFunction={onDeletePress}
    >
      <Text style={DetailStyle.buttonText}>Delete</Text>
    </MyPressable>

    <MyPressable
      customStyle={addPagePressable}
      pressedStyle={{ opacity: 0.8 }}
      pressedFunction={onEditPress}
    >
      <Text style={DetailStyle.buttonText}>Edit</Text>
    </MyPressable>
  </View>
)}

      </View>
     </ImageBackground>
    </View>
    </ScrollView>
  );
}