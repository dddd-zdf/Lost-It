import React from 'react';
import { View, Text, Pressable, Button } from 'react-native';
import { signOut } from "firebase/auth";
import { auth } from "../Firebase/firebase-setup";


export default function Profile({navigation}) {
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
      {/* <Text>Profile Screen</Text>
      <Pressable
        onPress={() => navigation.navigate('Item List')}
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? 'gray' : 'white'
          },
          {
            padding: 10,
            borderRadius: 5,
            marginTop: 10
          }
        ]}
      >
        <Text>Go to item list under this user profile</Text>
      </Pressable> */}
      <Text>Profile Screen</Text>
      <Button title="Sign Out" onPress={handleSignOut} />

    </View>
  );
};