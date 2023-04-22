import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Dimensions,
  Image,
} from "react-native";
import MyInput from "../components/MyInput";
import LocationManager from "../components/LocationManager";
import {
  COLORS,
  ScreenContainer,
  DefaultLocation,
  windowWidth,
  COLORS2,
  addPagePressable,
  addStyle
} from "../helper";
import MyPressable from "../components/MyPressable";
import { writeToDB } from "../Firebase/firestore-helper";
import ImageManager from "../components/ImageManager";
import { ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../Firebase/firebase-setup";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Firebase/firebase-setup";
import { Timestamp } from "@firebase/firestore";

export default function Add({ navigation }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [user] = useAuthState(auth);
  const [location, setLocation] = useState(null);
  const [imageUri, setImageUri] = useState("");
  const [address, setAddress] = useState(null);
  function checkNotEmpty(title, description) {
    if (!title.trim() || !description.trim() || imageUri === "" || !location) {
      return false;
    } else {
      return true;
    }
  }

  function resetInputs() {
    setTitle("");
    setDescription("");
    setLocation(null);
    setImageUri("");
    setAddress(null);
  }

  async function onSubmit(title, description) {
    if (checkNotEmpty(title, description)) {
      let imageUriStorage = "";
      imageUriStorage = await fetchImage(imageUri);
      let newEntry = {
        title: title,
        description: description,
        userId: user.uid,
        location: location ? location : DefaultLocation,
        imageUri: imageUriStorage,
        uploader: user.displayName,
        uploaderEmail: user.email,
        address: address,
        date: new Date().toString(),
        timestamp: Timestamp.fromDate(new Date()),
      };

      // add to db
      writeToDB(newEntry);
      resetInputs();
      return navigation.goBack();
    }
    Alert.alert("Invalid Input", "Please check your input values");
  }
  const imageUriHandler = (uri) => {
    setImageUri(uri);
  };

  async function fetchImage(uri) {
    try {
      const response = await fetch(uri);
      const imageBlob = await response.blob();
      const imageName = uri.substring(uri.lastIndexOf("/") + 1);
      const imageRef = await ref(storage, `images/${imageName}`);
      const uploadResult = await uploadBytesResumable(imageRef, imageBlob);
      return uploadResult.metadata.fullPath;
    } catch (err) {
      console.log("image fetch error", err);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <ScrollView
        contentContainerStyle={[
          ScreenContainer,
          { paddingTop: 50, flexGrow: 1 },
        ]}
      >
        <MyInput
          placeholder={"Title"}
          value={title}
          textUpdateFunction={setTitle}
        />
        <MyInput
          placeholder={"Description"}
          value={description}
          textUpdateFunction={setDescription}
          customStyle={{ height: 100 }}
        />

        <LocationManager
          location={location}
          setLocation={setLocation}
          setAddress={setAddress}
          customPressableStyle={addStyle.mapButton}
          returnScreen={"Post"}
        />

        <View style={addStyle.addressContainer}>
          {address && (
            <Text style={{ fontWeight: 500, marginBottom: 15 }}>{address}</Text>
          )}
        </View>

        {imageUri && (
          <View style={addStyle.imageContainer}>
            <Image
              source={{ uri: imageUri }}
              style={{
                flex: 1,
              }}
            />
          </View>
        )}

        <ImageManager
          imageUriHandler={imageUriHandler}
          customPressableStyle={addStyle.imageButtons}
          imageURI={imageUri}
        ></ImageManager>

        <View style={addStyle.pressablesContainer}>
          <MyPressable
            pressedFunction={() => resetInputs()}
            customStyle={addStyle.pressableReset}
            pressedStyle={{ opacity: 0.8 }}
          >
            <Text style={addStyle.text}>Reset</Text>
          </MyPressable>
          <MyPressable
            pressedFunction={() => onSubmit(title, description)}
            customStyle={addPagePressable}
            pressedStyle={{ opacity: 0.5 }}
          >
            <Text style={addStyle.text}>Submit</Text>
          </MyPressable>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}