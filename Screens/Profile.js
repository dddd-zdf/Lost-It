import React from 'react';
import { View, Text, Pressable, Button } from 'react-native';
import { signOut } from "firebase/auth";
import { auth } from "../Firebase/firebase-setup";
import NotificationManager from '../components/NotificationManager';


export default function Profile({navigation}) {

  const user = auth.currentUser;
  let displayName = null;
  let email = null;

  if (user !== null) {
    // The user object has basic properties such as display name, email, etc.
    displayName = user.displayName;
    email = user.email;
  }
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
    
    <View>
      <Text>Name: {displayName}</Text>
      <Text>Email: {email}</Text>
      <NotificationManager/>
      <Button title="Sign Out" onPress={handleSignOut} />

    </View>
  );
};