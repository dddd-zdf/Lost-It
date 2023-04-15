import { View, Text, Button, Alert } from "react-native";
import React from "react";
import * as Notifications from "expo-notifications";

export async function verifyPermission() {
  const permissionResponse = await Notifications.getPermissionsAsync();
  console.log(permissionResponse)
  if (permissionResponse.granted) {
    return true;
  }
  const permissionResult = await Notifications.requestPermissionsAsync();
  // // this will be user's choice:
  return permissionResult.granted;
}

export default function NotificationManager() {
  async function scheduleNotificationHandler() {
    const hasPermission = await verifyPermission();
    if (!hasPermission) {
      Alert.alert("You need to give notification permission");
      return;
    }
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Reminder to check Lostit",
          body: "Check if someone posted an item that you found",
         
        },
        trigger: { seconds: 5 },
      });
    } catch (err) {
      console.log("schedule notification error: " + err);
    }
  }
  return (
    <View>
      <Button
        title="Get a reminder to check the app in 10 minutes?"
        onPress={scheduleNotificationHandler}
      />
    </View>
  );
}
