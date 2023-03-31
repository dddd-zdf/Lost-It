import { View, Text, StyleSheet, TextInput } from "react-native";
import { COLORS } from "../helper";
import React from "react";

export default function MyInput({
    inputName,
    value,
    textUpdateFunction,
    customStyle,
}) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{inputName}</Text>
            <View>
                <TextInput
                    multiline={true}
                    style={[styles.input, customStyle]}
                    value={value}
                    onChangeText={(newText) => {
                        textUpdateFunction(newText);
                    }}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginBottom: 5,
        justifyContent: "space-between",
        alignItems: "flex-start",
        borderColor: "black",
        width: 360,
        paddingHorizontal: 5,
        paddingVertical: 5,
    },
    text: {
        fontSize: 17,
        fontWeight: "bold",
        color: COLORS.BLUE,
        paddingLeft: 10,
    },
    input: {
        backgroundColor: COLORS.LIGHTBLUE,
        width: 220,
        fontWeight: "bold",
        padding: 7,
        color: COLORS.BLUE,
        borderColor: COLORS.GOLD,
        fontSize: 17,
        marginBottom: 0,
        marginHorizontal: 5,
        textAlignVertical: "top",
        textAlign: "left",
        borderRadius: 5,
    },
});
