import { View, Text, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { COLORS, ScreenContainer } from "../helper";
import MyInput from "../components/MyInput";
import MyPressable from "../components/MyPressable";
import { UpdateDB } from "../Firebase/firestore-helper";
import LocationManager from "../components/LocationManager";

export default function Edit({ route, navigation }) {
    const { title, description, key, location } = route.params;

    const [updatedTitle, setUpdatedTitle] = useState(title);
    const [updatedDescription, setUpdatedDescription] = useState(description);
    const [updatedLocation, setUpdatedLocation] = useState(location);
    const [savedKey, setSavedKey] = useState(key);

    function cancel() {
        return navigation.goBack();
    }

    function onSubmit(updatedTitle, updatedDescription, updatedLocation) {
        UpdateDB(savedKey, updatedTitle, updatedDescription, updatedLocation);
        let entry = {
            title: updatedTitle,
            description: updatedDescription,
            location: updatedLocation,
        };
        return navigation.navigate("Item Details", entry);
    }

    return (
        <View style={[ScreenContainer, { paddingTop: 50 }]}>
            <MyInput
                inputName={"Title"}
                value={updatedTitle}
                textUpdateFunction={setUpdatedTitle}
            />
            <MyInput
                inputName={"Description"}
                value={updatedDescription}
                textUpdateFunction={setUpdatedDescription}
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
                    location={updatedLocation ? updatedLocation : location}
                    setLocation={setUpdatedLocation}
                    customPressableStyle={styles.utilitiesButtons}
                    returnScreen={"Edit Item"}
                />
            </View>

            <View style={styles.pressablesContainer}>
                <MyPressable
                    pressedFunction={() => cancel()}
                    customStyle={styles.pressable}
                    pressedStyle={{ opacity: 0.8 }}
                >
                    <Text style={styles.text}>Cancel</Text>
                </MyPressable>
                <MyPressable
                    pressedFunction={() =>
                        onSubmit(
                            updatedTitle,
                            updatedDescription,
                            updatedLocation ? updatedLocation : location
                        )
                    }
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
