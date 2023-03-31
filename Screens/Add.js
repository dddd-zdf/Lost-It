import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import MyInput from "../components/MyInput";
import { COLORS, ScreenContainer } from "../helper";
import MyPressable from "../components/MyPressable";
import { writeToDB } from "../Firebase/firestore-helper";

export default function Add({ navigation }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    function checkNotEmpty(title, description) {
        if (!title.trim() || !description.trim()) {
            return false;
        } else {
            return true;
        }
    }

    function resetInputs() {
        setTitle("");
        setDescription("");
    }

    function onSubmit(title, description) {
        if (checkNotEmpty(title, description)) {
            let newEntry = {
                title: title,
                description: description,
            };
            // add to db
            writeToDB(newEntry);
            resetInputs();
            return navigation.goBack();
        }
        Alert.alert("Invalid Input", "Please check your input values");
    }

    return (
        <View style={[ScreenContainer, { paddingTop: 50 }]}>
           
            <MyInput
                inputName={"Title"}
                value={title}
                textUpdateFunction={setTitle}
            />
            <MyInput
                inputName={"Description"}
                value={description}
                textUpdateFunction={setDescription}
                customStyle={{ height: 100 }}
            />

            <View style={styles.pressablesContainer}>
                <MyPressable
                    pressedFunction={() => resetInputs()}
                    customStyle={styles.pressable}
                    pressedStyle={{ opacity: 0.8 }}
                >
                    <Text style={styles.text}>Reset</Text>
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
