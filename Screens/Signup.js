import { View, Text, TextInput, Button, Alert } from "react-native";
import React, { useState } from "react";
import { auth } from "../Firebase/firebase-setup";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { createUser } from "../Firebase/firestore-helper";

export default function Signup({ navigation }) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [name, setName] = useState(null);

  const loginHandler = () => {
    navigation.replace("Login");
  };

  const signupHandler = async () => {
    if (password !== confirmPassword) {
      Alert.alert("The passwords don't match")
      return;
    }
    if (!name || name.trim() === '') {
      Alert.alert("A name is required");
      return;
    }
    if (!email || !password || !confirmPassword) {
      Alert.alert("Please fill in all fields");
      return;
    }
    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Update user's display name
      await updateProfile(userCred.user, { displayName: name });
      createUser(userCred.user.uid, email, name);
    } catch (err) {
      Alert.alert(err.code);
      console.log("Auth error ", err);
    }
  };
  
  return (
    <View>
      <Text>Name</Text>
      <TextInput
        value={name}
        onChangeText={(newName) => {
          setName(newName);
        }}
        placeholder="Name"
      />

      <Text>Email</Text>
      <TextInput
        value={email}
        onChangeText={(newEmail) => {
          setEmail(newEmail);
        }}
        placeholder="Email"
      />

      <Text>Password</Text>
      <TextInput
        value={password}
        onChangeText={(newPassword) => {
          setPassword(newPassword);
        }}
        placeholder="Password"
        secureTextEntry={true}
      />
      <Text>Confirm Password</Text>
      <TextInput
        value={confirmPassword}
        onChangeText={(newPassword) => {
          setConfirmPassword(newPassword);
        }}
        placeholder="Confirm Password"
        secureTextEntry={true}
      />
      <Button title="Register" onPress={signupHandler} />
      <Button title="Already Registered? Login" onPress={loginHandler} />
    </View>
  );
}
