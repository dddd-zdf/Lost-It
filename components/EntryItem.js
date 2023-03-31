import { View, Text, StyleSheet } from "react-native";
import React from "react";
import MyPressable from "./MyPressable";
import { COLORS } from "../helper";

export default function EntryItem({ entry, onPress }) {
  return (
    <MyPressable
      pressedFunction={() => onPress(entry)}
      customStyle={styles.entryContainer}
      pressedStyle={{ opacity: 0.8 }}
    >
      <View style={styles.labelContainer}>
        <Text style={styles.text}>Title: </Text>
        <Text style={styles.text}>{entry.title}</Text>
      </View>
      <View style={styles.labelContainer}>
        <Text style={styles.text}>Description: </Text>
        <Text style={styles.text}>{entry.description}</Text>
      </View>
    </MyPressable>
  );
}

const styles = StyleSheet.create({
  entryContainer: {
    flexDirection: "column",
    backgroundColor: COLORS.LIGHTBLUE,
    // justifyContent: "space-between",
    alignItems: "left",
    borderColor: "black",
    marginTop: 15,
    width: 340,
    height: 100,
    paddingHorizontal: 10,
    borderRadius: 5,
    shadowColor: COLORS.BLACK,
    shadowRadius: 3,
    shadowOpacity: 0.4,
    elevation: 3,
    shadowOffset: { width: 0, height: 0 },
  },
  text: {
    color: COLORS.BLUE,
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
  labelContainer: {
    flexDirection: "row",
  },
});
