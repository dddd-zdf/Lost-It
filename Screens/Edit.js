import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  TouchableHighlight,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  COLORS,
  ScreenContainer,
  COLORS2,
  windowWidth,
  addPagePressable,
  editStyle
} from "../helper";
import MyInput from "../components/MyInput";
import MyPressable from "../components/MyPressable";
import { UpdateDB } from "../Firebase/firestore-helper";
import LocationManager from "../components/LocationManager";
import ImageManager from "../components/ImageManager";
import { ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../Firebase/firebase-setup";

export default function Edit({ route, navigation }) {
  const { title, description, location, imageURL, address } = route.params;
  const [updatedTitle, setUpdatedTitle] = useState(title);
  const [updatedDescription, setUpdatedDescription] = useState(description);
  const [updatedLocation, setUpdatedLocation] = useState(location);
  const [key, setKey] = useState();
  const [imageUri, setImageUri] = useState(imageURL);
  const [updatedAddress, setUpdatedAddress] = useState(address);
  const [uploader, setUploader] = useState();
  const [uploaderEmail, setUploaderEmail] = useState();
  const [userId, setUserId] = useState();

  useEffect(() => {
    setUploader(route.params.uploader);
    setUploaderEmail(route.params.uploaderEmail);
    setUserId(route.params.userId);
    setKey(route.params.key);
  }, []);

  function cancel() {
    return navigation.goBack();
  }

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

  const imageUriHandler = (uri) => {
    setImageUri(uri);
  };

  async function onSubmit(
    updatedTitle,
    updatedDescription,
    updatedLocation,
    updatedAddress,
    uploader,
    uploaderEmail
  ) {
    let imageUriStorage = "";
    imageUriStorage = await fetchImage(imageUri);
    UpdateDB(
      key,
      updatedTitle,
      updatedDescription,
      updatedLocation,
      imageUriStorage,
      updatedAddress
    );

    let entry = {
      key: key,
      title: updatedTitle,
      description: updatedDescription,
      location: updatedLocation,
      imageUri: imageUriStorage,
      address: updatedAddress,
      uploader: uploader,
      uploaderEmail: uploaderEmail,
      userId: userId,
    };
    return navigation.navigate("Item Details", entry);
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
          inputName={"Title"}
          value={updatedTitle}
          textUpdateFunction={setUpdatedTitle}
        />
        <MyInput
          inputName={"Description"}
          value={updatedDescription}
          textUpdateFunction={setUpdatedDescription}
          customStyle={{ height: 100 }}
        />

        <LocationManager
          location={updatedLocation ? updatedLocation : location}
          address={updatedAddress ? updatedAddress : address}
          setLocation={setUpdatedLocation}
          setAddress={setUpdatedAddress}
          customPressableStyle={editStyle.mapButton}
          returnScreen={"Edit Item"}
        />

        <View style={editStyle.addressContainer}>
          <Text style={{ fontWeight: 500, marginBottom: 15 }}>
            {updatedAddress ? updatedAddress : address}
          </Text>
        </View>

        <View style={editStyle.imageContainer}>
          <Image
            source={{ uri: imageUri }}
            style={{
              flex: 1,
            }}
          />
        </View>

        <ImageManager
          imageUriHandler={imageUriHandler}
          customPressableStyle={editStyle.imageButtons}
          imageURI={imageUri}
        ></ImageManager>

        <View style={editStyle.pressablesContainer}>
          <MyPressable
            pressedFunction={() => cancel()}
            customStyle={editStyle.pressableReset}
            pressedStyle={{ opacity: 0.8 }}
          >
            <Text style={editStyle.text}>Cancel</Text>
          </MyPressable>
          <MyPressable
            pressedFunction={() =>
              onSubmit(
                updatedTitle,
                updatedDescription,
                updatedLocation ? updatedLocation : location,
                updatedAddress ? updatedAddress : address,
                uploader,
                uploaderEmail
              )
            }
            customStyle={addPagePressable}
            pressedStyle={{ opacity: 0.5 }}
          >
            <Text style={editStyle.text}>Confirm</Text>
          </MyPressable>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}