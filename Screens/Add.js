import React, { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import MyInput from "../components/MyInput";
import LocationManager from "../components/LocationManager";
import { COLORS, ScreenContainer } from "../helper";
import MyPressable from "../components/MyPressable";
import { writeToDB } from "../Firebase/firestore-helper";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Firebase/firebase-setup";

export default function Add({ navigation }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [user] = useAuthState(auth);
    const [location, setLocation] = useState(null);

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
                userId: user.uid,
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

            <View style={styles.utilitiesContainer}>
                <MyPressable
                    pressedFunction={() =>
                        console.log("pressed image snapping")
                    }
                    customStyle={styles.utilitiesButtons}
                    pressedStyle={{ opacity: 0.8 }}
                >
                    <Text style={styles.text}>
                        Snap an image of probable lost location
                    </Text>
                </MyPressable>
                <LocationManager
                    location={location}
                    setLocation={setLocation}
                    customPressableStyle={styles.utilitiesButtons}
                />
            </View>

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
    utilitiesContainer: {
        flexDirection: "row",
        marginTop: 25,
        width: "90%",
        height: 200,
        borderColor: "black",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 10,
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
