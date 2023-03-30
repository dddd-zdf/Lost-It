import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { COLORS, ScreenContainer } from "../helper";
import MyInput from "../components/MyInput";
import MyPressable from "../components/MyPressable";

export default function Edit({ route, navigation }) {
  const { title, description, key } = route.params;

  const [updatedTitle, setUpdatedTitle] = useState(title);
  const [updatedDescription, setUpdatedDescription] = useState(description);

  function cancel() {
    return navigation.goBack();
  }

  return (
    <View style={[ScreenContainer, { paddingTop: 50 }]}>
      <MyInput
        inputName={"Title"}
        value={title}
        textUpdateFunction={setUpdatedTitle}
      />
      <MyInput
        inputName={"Description"}
        value={description}
        textUpdateFunction={setUpdatedDescription}
        customStyle={{ height: 100 }}
      />

      <View style={styles.pressablesContainer}>
        <MyPressable
          pressedFunction={() => cancel()}
          customStyle={styles.pressable}
          pressedStyle={{ opacity: 0.8 }}
        >
          <Text style={styles.text}>Cancel</Text>
        </MyPressable>
        <MyPressable
          pressedFunction={() => onSubmit(title, description)}
          customStyle={styles.pressable}
          pressedStyle={{ opacity: 0.5 }}
        >
          <Text style={styles.text}>Submit</Text>
        </MyPressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pressablesContainer: {
    flexDirection: "row",
    marginTop: 25,
    width: 260,
    height: 40,
    borderColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  pressable: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 3,
    backgroundColor: COLORS.BLUE,
  },
  text: {
    fontSize: 13,
    color: COLORS.WHITE,
    fontWeight: "500",
  },
});
