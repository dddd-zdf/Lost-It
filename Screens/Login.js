import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import MyPressable from "../components/MyPressable";
import React, { useState } from "react";
import { auth } from "../Firebase/firebase-setup";
import { signInWithEmailAndPassword } from "firebase/auth";
import {
  COLORS,
  COLORS2,
  ScreenContainer,
  inputContainer,
  loginContainer,
} from "../helper";
export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginHandler = async () => {
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      // console.log(userCred);
    } catch (err) {
      Alert.alert(err.code);
      console.log("login err ", err);
    }
  };
  const signupHandler = () => {
    navigation.replace("Signup");
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View
        style={{
          flex: 1,
          backgroundColor: "#f8f9fa",
          justifyContent: "flex-start",
        }}
      >
        <View style={styles.topContainer}>
          <Image
            source={require("../assets/logo.png")}
            style={{ height: 200, width: 200 }}
          />
        </View>

        <View style={styles.middleContainer}>
          <TextInput
            style={inputContainer}
            value={email}
            onChangeText={(newEmail) => {
              setEmail(newEmail);
            }}
            placeholder="Email"
          />
          <TextInput
            style={inputContainer}
            secureTextEntry={true}
            value={password}
            onChangeText={(newPassword) => {
              setPassword(newPassword);
            }}
            placeholder="Password"
          />
        </View>

        <View style={styles.bottomContainer}>
          <MyPressable
            pressedFunction={loginHandler}
            pressedStyle={{ opacity: 0.8 }}
            customStyle={loginContainer}
          >
            <Text
              style={{ color: COLORS.WHITE, fontSize: 20, fontWeight: "bold" }}
            >
              Login
            </Text>
          </MyPressable>

          <Text style={{ fontSize: 16 }}>New User? </Text>
          <MyPressable
            pressedFunction={signupHandler}
            pressedStyle={{ opacity: 0.8 }}
            customStyle={{ marginTop: 10 }}
          >
            <Text style={{ color: COLORS.CYAN, fontSize: 16 }}>
              Create an Account
            </Text>
          </MyPressable>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  topContainer: {
    alignItems: "center",
  },
  middleContainer: {
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
