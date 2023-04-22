import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase/firebase-setup";
import { getUser } from "../Firebase/firestore-helper";
import { COLORS, COLORS2, windowWidth, ScreenContainer, profileStyle } from "../helper";
import NotificationManager from "../components/NotificationManager";
import { FontAwesome5 } from "@expo/vector-icons";
import MyPressable from "../components/MyPressable";

export default function Profile({ navigation }) {
  const [displayName, setDisplayName] = useState(null);
  const [email, setEmail] = useState(null);
  const [date, setDate] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user !== null) {
        const { displayName, email, createdAt } = await getUser(user.uid);
        setDisplayName(displayName);
        setEmail(email);
        setDate(new Date(createdAt).toLocaleDateString());
      }
    };

    fetchUserData();
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("Signed out.");
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
      });
  };

  return (
    <View style={[ScreenContainer, { flex: 1 }]}>
      <View style={profileStyle.topContainer}>
        <FontAwesome5 name="user-circle" size={100} color={COLORS2.PRIMARY} />
      </View>

      <View style={profileStyle.bottomContainer}>
        <Text style={profileStyle.textStyle}>Name: {displayName}</Text>
        <Text style={profileStyle.textStyle}>Email: {email}</Text>
        <Text style={profileStyle.textStyle}>Member since: {date}</Text>
        <NotificationManager />

        <MyPressable
          pressedFunction={handleSignOut}
          customStyle={profileStyle.signOutPressable}
          pressedStyle={{ opacity: 0.5 }}
        >
          <Text style={{ color: COLORS.WHITE, fontWeight: "bold" }}>
            Sign Out
          </Text>
        </MyPressable>
      </View>
    </View>
  );
}