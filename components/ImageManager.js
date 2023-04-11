import { View, Text, Button, Alert, Image } from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import MyPressable from "./MyPressable";

export default function ImageManager({
  imageUriHandler,
  customPressableStyle,
}) {
  const [imageUri, setImageUri] = useState("");
  const [permissionInfo, requestPermission] =
    ImagePicker.useCameraPermissions();

  async function verifyPermission() {
    if (permissionInfo.granted) {
      return true;
    }
    try {
      const permissionResult = await requestPermission();
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
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
      });
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
      {/* <View>
        <Button title="Take a picture" onPress={imageHandler} />
        {imageUri && (
          <Image
            source={{ uri: imageUri }}
            style={{ width: 100, height: 100 }}
          />
        )}
      </View> */}

      <MyPressable
        pressedFunction={imageHandler}
        customStyle={customPressableStyle}
        pressedStyle={{ opacity: 0.5 }}
      >
        {imageUri ? (
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
