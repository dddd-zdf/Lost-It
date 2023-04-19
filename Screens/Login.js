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
import { COLORS, COLORS2, ScreenContainer, DefaultLocation } from "../helper";
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
            style={styles.inputContainer}
            value={email}
            onChangeText={(newEmail) => {
              setEmail(newEmail);
            }}
            placeholder="Email"
          />
          <TextInput
            style={styles.inputContainer}
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
            customStyle={styles.loginContainer}
          >
            <Text style={{ color: COLORS.WHITE, fontSize: 20, fontWeight: "bold", }}>Login</Text>
          </MyPressable>


          <Text style={{fontSize: 16}}>New User? </Text>
          <MyPressable
            pressedFunction={signupHandler}
            pressedStyle={{ opacity: 0.8 }}
            customStyle={{marginTop: 10}}
          >
            <Text style={{color: COLORS.CYAN, fontSize: 16}}>Create an Account</Text>
          </MyPressable>
        </View>

        {/* <Button title="Login" onPress={loginHandler} />
      <Button title="New User? Create an Account" onPress={signupHandler} /> */}
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
  inputContainer: {
    borderWidth: 0.5,
    padding: 8,
    borderRadius: 10,
    width: "90%",
    fontSize: 18,
    color: COLORS.BLACK,
    fontWeight: "500",
    marginBottom: 5,
    marginTop: 5,
  },
  loginContainer: {
    width: "60%",
    alignItems: "center",
    borderRadius: 10,
    // borderWidth: 2,
    backgroundColor: COLORS2.PRIMARY,
    padding: 8,
    marginBottom: 20
  },
  utilitiesButtons: {
    // flex: 1,
    width: 130,
    height: 130,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 25,
    paddingVertical: 7,
    borderRadius: 3,
    backgroundColor: COLORS.BLUE,
    paddingHorizontal: 3,
  },
});
