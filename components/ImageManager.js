import { View, Text, Button, Alert, Image } from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import MyPressable from "./MyPressable";

export default function ImageManager({
  imageUriHandler,
  customPressableStyle,
  imageURI,
}) {
  const [imageUri, setImageUri] = useState(imageURI);
  const [permissionInfo, requestPermission] =
    ImagePicker.useCameraPermissions();

  async function verifyPermission() {
    console.log(permissionInfo)
    if (permissionInfo.granted) {
      return true;
    }
    try {
      const permissionResult = await requestPermission();
      console.log(permissionResult)
      return permissionResult.granted;
    } catch (err) {
      console.log("Permission request error", err);
    }
  }
  async function imageHandler() {
    const hasPermission = await verifyPermission();
    if (!hasPermission) {
      Alert.alert("You need to give access to the camera");
      return;
    }

    try {
      const result = await ImagePicker.launchCameraAsync();
      
      if (!result.canceled) {
        setImageUri(result.assets[0].uri);
        imageUriHandler(result.assets[0].uri);
      }
    } catch (err) {
      console.log("launch camera failed", err);
    }
  }
  return (
    <>

      <MyPressable
        pressedFunction={imageHandler}
        customStyle={customPressableStyle}
        pressedStyle={{ opacity: 0.5 }}
      >
        {imageURI ? (
          <Image
            source={{ uri: imageUri }}
            style={{
              width: customPressableStyle.width,
              height: customPressableStyle.height,
            }}
          />
        ) : (
          <Text style={{ color: "white" }}>Take a picture</Text>
        )}
      </MyPressable>
    </>
  );
}
