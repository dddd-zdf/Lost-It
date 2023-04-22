import { View, Text, StyleSheet, TextInput } from "react-native";
import { MyInputStyles } from "../helper";
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
        style={[MyInputStyles.input, customStyle]}
        value={value}
        maxLength={150}
        onChangeText={(newText) => {
          textUpdateFunction(newText);
        }}
      />
  );
}