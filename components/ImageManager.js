import { View, Text, Button, Alert } from "react-native";
import React from "react";
import * as ImagePicker from "expo-image-picker";

export default function ImageManager() {
  const [permissionInfo, requestPermission] =
    ImagePicker.useCameraPermissions();

  async function verifyPermission() {
    if (permissionInfo.granted) {
      return true;
    }
    try{
    const permissionResult = await requestPermission();
    return permissionResult.granted;
    }catch(err){
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
      console.log(result);
    } catch (err) {
      console.log("launch camera failed");
    }
  }
  return (
    <View>
      <Button title="Take a picture" onPress={imageHandler} />
    </View>
  );
}
