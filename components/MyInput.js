import { View, Text, StyleSheet, TextInput } from "react-native";
import { COLORS } from "../helper";
import React from "react";

export default function MyInput({
  value,
  textUpdateFunction,
  customStyle,
  placeholder,
}) {
  return (
      <TextInput
        multiline={true}
        placeholder={placeholder}
        style={[styles.input, customStyle]}
        value={value}
        onChangeText={(newText) => {
          textUpdateFunction(newText);
        }}
      />
  );
}

const styles = StyleSheet.create({
  container: {
    // flexDirection: "column",
    // marginBottom: 10,
    // justifyContent: "center",
    // alignItems: "flex-start",
    // borderColor: "black",
    // width: "100%",
    // paddingHorizontal: 5,
    // paddingVertical: 5,
  },
  text: {
    fontSize: 17,
    fontWeight: "bold",
    color: COLORS.BLUE,
    paddingLeft: 10,
  },
  input: {
    backgroundColor: COLORS.GRAY,
    width: "80%",
    fontWeight: "bold",
    padding: 7,
    color: COLORS.BLACK,
    fontSize: 17,
    marginBottom: 15,
    textAlignVertical: "top",
    textAlign: "left",
    borderRadius: 5,
  },
});
