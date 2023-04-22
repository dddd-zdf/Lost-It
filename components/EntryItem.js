import { View, Text, StyleSheet, ImageBackground } from "react-native";
import React from "react";
import MyPressable from "./MyPressable";
import { COLORS, COLORS2 } from "../helper";

// source={require("../assets/bg.png")}

export default function EntryItem({ entry, onPress }) {
  return (
    <MyPressable
      pressedFunction={() => onPress(entry)}
      customStyle={styles.entryContainer}
      pressedStyle={{ opacity: 0.8 }}
    >
      <ImageBackground
        style={styles.poster}
        source={require("../assets/bg.png")}
      >
        <View style={{ paddingTop: 100, alignItems: "center" }}>
          <View style={styles.labelContainer}>
            {/* <Text style={styles.text}>Title: </Text> */}
            <Text style={styles.titleText}>{entry.title}</Text>
          </View>
          <View style={styles.labelContainer}>
            <Text style={styles.text}>{entry.description}</Text>
          </View>
          <View style={styles.labelContainer}>
            <Text style={styles.text}>Uploader: </Text>
            <Text style={styles.text}>{entry.uploader}</Text>
          </View>
          <View style={styles.labelContainer}>
            <Text style={styles.text}>Time posted: </Text>
            <Text style={styles.text}>{entry.date ? entry.date : ""}</Text>
          </View>
        </View>
      </ImageBackground>
    </MyPressable>
  );
}

const styles = StyleSheet.create({
  entryContainer: {
    flexDirection: "column",
    backgroundColor: "#EBF2EE",
    borderColor: "black",
    marginTop: 15,
    width: 300,
    height: 400,
    paddingHorizontal: 10,
    borderRadius: 5,
    shadowColor: COLORS.BLACK,
    shadowRadius: 3,
    shadowOpacity: 0.4,
    elevation: 10,
    borderRadius: 10,
    padding: 10,
  },
  titleText: {
    color: COLORS2.PRIMARY,
    fontSize: 15,
    fontWeight: "bold",
  },
  text: {
    color: COLORS.BLACK,
    fontSize: 12,
    fontWeight: "bold",
  },
  labelContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 40,
    marginBottom: 20,
    flexDirection: "column",
    alignItems: "center",
  },
  poster: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-start",
  },
});
