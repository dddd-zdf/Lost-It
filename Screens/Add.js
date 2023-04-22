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
          customPressableStyle={styles.mapButton}
          returnScreen={"Post"}
        />

        <View style={styles.addressContainer}>
          {address && (
            <Text style={{ fontWeight: 500, marginBottom: 15 }}>{address}</Text>
          )}
        </View>

        {imageUri && (
          <View style={styles.imageContainer}>
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
          customPressableStyle={styles.imageButtons}
          imageURI={imageUri}
        ></ImageManager>
        {/* <MyPressable
            pressedFunction={() => onSubmit(title, description)}
            customStyle={styles.pressable}
            pressedStyle={{ opacity: 0.5 }}
          >
            <Text style={styles.text}>Submit</Text>
          </MyPressable> */}

        <View style={styles.pressablesContainer}>
          <MyPressable
            pressedFunction={() => resetInputs()}
            customStyle={styles.pressableReset}
            pressedStyle={{ opacity: 0.8 }}
          >
            <Text style={styles.text}>Reset</Text>
          </MyPressable>
          <MyPressable
            pressedFunction={() => onSubmit(title, description)}
            customStyle={addPagePressable}
            pressedStyle={{ opacity: 0.5 }}
          >
            <Text style={styles.text}>Submit</Text>
          </MyPressable>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  pressablesContainer: {
    flexDirection: "row",
    marginVertical: 25,
    width: 0.8 * windowWidth,
    height: 40,
    borderColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  pressableReset: {
    ...addPagePressable,
    backgroundColor: "#FFA24B",
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
  mapButton: {
    width: 0.8 * windowWidth,
    height: 0.8 * windowWidth,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    backgroundColor: COLORS.GRAY,
    paddingHorizontal: 3,
    marginVertical: 15,
  },
  imageButtons: {
    width: 0.8 * windowWidth,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 7,
    borderRadius: 5,
    backgroundColor: COLORS2.PRIMARY,
    paddingHorizontal: 3,
    // marginTop: 25,
  },
  imageContainer: {
    width: 0.8 * windowWidth,
    height: 0.8 * windowWidth,
    marginBottom: 25,
  },
  addressContainer: {
    width: 0.8 * windowWidth,
    alignItems: "center",
    marginVertical: 10,
  },
});
