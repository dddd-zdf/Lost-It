import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import MyInput from "../components/MyInput";
import LocationManager from "../components/LocationManager";
import { COLORS, ScreenContainer, DefaultLocation } from "../helper";
import MyPressable from "../components/MyPressable";
import { writeToDB } from "../Firebase/firestore-helper";
import ImageManager from "../components/ImageManager";
import { ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../Firebase/firebase-setup";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Firebase/firebase-setup";

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
      <View style={[ScreenContainer, { paddingTop: 50 }]}>
        <MyInput
          inputName={"Title"}
          value={title}
          textUpdateFunction={setTitle}
        />
        <MyInput
          inputName={"Description"}
          value={description}
          textUpdateFunction={setDescription}
          customStyle={{ height: 100 }}
        />

        <View>
          <Text>{address}</Text>
        </View>

        <View style={styles.utilitiesContainer}>
          <ImageManager
            imageUriHandler={imageUriHandler}
            customPressableStyle={styles.utilitiesButtons}
            imageURI={imageUri}
          />
          <LocationManager
            location={location}
            setLocation={setLocation}
            setAddress={setAddress}
            customPressableStyle={styles.utilitiesButtons}
            returnScreen={"Post"}
          />
        </View>

        {/* <ImageManager /> */}
        <View style={styles.pressablesContainer}>
          <MyPressable
            pressedFunction={() => resetInputs()}
            customStyle={styles.pressable}
            pressedStyle={{ opacity: 0.8 }}
          >
            <Text style={styles.text}>Reset</Text>
          </MyPressable>
          <MyPressable
            pressedFunction={() => onSubmit(title, description)}
            customStyle={styles.pressable}
            pressedStyle={{ opacity: 0.5 }}
          >
            <Text style={styles.text}>Submit</Text>
          </MyPressable>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  pressablesContainer: {
    flexDirection: "row",
    marginTop: 25,
    width: 260,
    height: 40,
    borderColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  pressable: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 3,
    backgroundColor: COLORS.BLUE,
  },
  text: {
    fontSize: 13,
    color: COLORS.WHITE,
    fontWeight: "500",
  },
  utilitiesContainer: {
    flexDirection: "row",
    marginTop: 25,
    width: "90%",
    height: 200,
    borderColor: "black",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 10,
  },
  utilitiesButtons: {
    // flex: 1,
    width: 130,
    height: 130,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 25,
    paddingVertical: 7,
    borderRadius: 3,
    backgroundColor: COLORS.BLUE,
    paddingHorizontal: 3,
  },
});
