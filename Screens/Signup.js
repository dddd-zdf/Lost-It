import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
} from "react-native";
import MyPressable from "../components/MyPressable";
import React, { useState } from "react";
import { auth } from "../Firebase/firebase-setup";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { createUser } from "../Firebase/firestore-helper";
import {
  COLORS,
  COLORS2,
  ScreenContainer,
  inputContainer,
  loginContainer,
} from "../helper";

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
      Alert.alert("The passwords don't match");
      return;
    }
    if (!name || name.trim() === "") {
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View
        style={{
          flex: 1,
          backgroundColor: "#f8f9fa",
          justifyContent: "flex-start",
          paddingTop: 80,
        }}
      >
        <View style={styles.topContainer}>
          <TextInput
            value={name}
            onChangeText={(newName) => {
              setName(newName);
            }}
            placeholder="Name"
            style={inputContainer}
          />

          <TextInput
            value={email}
            onChangeText={(newEmail) => {
              setEmail(newEmail);
            }}
            placeholder="Email"
            style={inputContainer}
          />

          <TextInput
            value={password}
            onChangeText={(newPassword) => {
              setPassword(newPassword);
            }}
            placeholder="Password"
            secureTextEntry={true}
            style={inputContainer}
          />

          <TextInput
            value={confirmPassword}
            onChangeText={(newPassword) => {
              setConfirmPassword(newPassword);
            }}
            placeholder="Confirm Password"
            secureTextEntry={true}
            style={inputContainer}
          />
        </View>

        <View style={styles.bottomContainer}>
          <MyPressable
            pressedFunction={signupHandler}
            pressedStyle={{ opacity: 0.8 }}
            customStyle={loginContainer}
          >
            <Text
              style={{ color: COLORS.WHITE, fontSize: 20, fontWeight: "bold" }}
            >
              Register
            </Text>
          </MyPressable>
          <Text style={{ fontSize: 16 }}>Already Registered? </Text>
          <MyPressable
            pressedFunction={loginHandler}
            pressedStyle={{ opacity: 0.8 }}
            customStyle={{ marginTop: 10 }}
          >
            <Text style={{ color: COLORS.CYAN, fontSize: 16 }}>Login</Text>
          </MyPressable>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  topContainer: {
    borderColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  bottomContainer: {
    // backgroundColor: "yellow",
    borderColor: "black",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
});
