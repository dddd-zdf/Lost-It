import { View, Text, Button, Alert, StyleSheet } from "react-native";
import React from "react";
import * as Notifications from "expo-notifications";
import MyPressable from "./MyPressable";
import { addPagePressable, COLORS2, COLORS } from "../helper";

export async function verifyPermission() {
  const permissionResponse = await Notifications.getPermissionsAsync();
  console.log(permissionResponse);
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
          title: "Reminder to check LostIt",
          body: "Check if someone posted an item that you found",
        },
        // trigger: { seconds: 10 },
        trigger: { hour: 12, minute: 0, repeats: true },
      });
      Alert.alert("Daily reminder set at 12pm");
    } catch (err) {
      console.log("schedule notification error: " + err);
    }
  }
  return (
    <MyPressable
      pressedFunction={scheduleNotificationHandler}
      customStyle={styles.notificationPressable}
      pressedStyle={{ opacity: 0.5 }}
    >
      <Text style={{color:COLORS.WHITE}}>Get a reminder to check the app once daily?</Text>
    </MyPressable>
  );
}

const styles = StyleSheet.create({
  notificationPressable: {
    alignItems: "center",
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 3,
    backgroundColor: COLORS2.PRIMARY,
    marginBottom: 20,
    marginTop: 20
  },
});
