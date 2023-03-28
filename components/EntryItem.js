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
            <Text style={styles.text}>{entry.title}</Text>
            <Text style={styles.text}>{entry.description}</Text>
        </MyPressable>
    );
}

const styles = StyleSheet.create({
    entryContainer: {
        flexDirection: "row",
        backgroundColor: COLORS.BLUE,
        justifyContent: "space-between",
        alignItems: "center",
        borderColor: "black",
        marginTop: 15,
        width: 340,
        height: 50,
        paddingHorizontal: 10,
        borderRadius: 5,
        shadowColor: COLORS.BLACK,
        shadowRadius: 3,
        shadowOpacity: 0.4,
        elevation: 3,
        shadowOffset: { width: 0, height: 0 },
    },
    text: {
        color: COLORS.WHITE,
        fontSize: 15,
        fontWeight: "bold",
        textAlign: "center",
    },
});
