import { View, Text, StyleSheet, Alert, Image } from "react-native";
import React from "react";
import { COLORS, ScreenContainer } from "../helper";
import MyPressable from "../components/MyPressable";
import LocationManager from "../components/LocationManager";
import { deleteFromDB } from "../Firebase/firestore-helper";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Firebase/firebase-setup";
import { MAPS_API_KEY } from "@env";

export default function Detail({ route, navigation }) {
    const { key, title, description, userId, location } = route.params;
    const [user] = useAuthState(auth);

    function onEditPress() {
        if (userId !== user.uid) {
            Alert.alert("No Access");
        } else {
            navigation.navigate("Edit Item", {
                title,
                description,
                key,
                location,
            });
        }
    }

    function onDeletePress() {
        if (userId !== user.uid) {
            Alert.alert("No Access");
        } else {
            Alert.alert(
                "Delete",
                "Are you sure you want to delete this entry?",
                [
                    {
                        text: "Yes",
                        onPress: () => {
                            deleteFromDB(key);
                            return navigation.goBack();
                        },
                        style: "cancel",
                    },
                    {
                        text: "No",
                        style: "cancel",
                    },
                ]
            );
        }
    }

    return (
        <View style={[ScreenContainer, { paddingTop: 70 }]}>
            <View style={styles.container}>
                <Text style={styles.text}>{`Title:  ${title}`}</Text>
                <Text
                    style={styles.text}
                >{`Description:  ${description}`}</Text>

                <View style={styles.utilitiesContainer}>
                    <MyPressable
                        pressedFunction={() =>
                            console.log("pressed image snapping")
                        }
                        customStyle={styles.utilitiesButtons}
                        pressedStyle={{ opacity: 0.8 }}
                    >
                        <Text style={styles.text}>Image</Text>
                    </MyPressable>
                    <Image
                        source={{
                            uri: `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:L%7C${location.latitude},${location.longitude}&key=${MAPS_API_KEY}`,
                        }}
                        style={{
                            width: styles.utilitiesButtons.width,
                            height: styles.utilitiesButtons.height,
                        }}
                    />
                </View>

                <View style={styles.pressablesContainer}>
                    <MyPressable
                        customStyle={styles.pressable}
                        pressedStyle={{ opacity: 0.8 }}
                        pressedFunction={onDeletePress}
                    >
                        <Text style={styles.buttonText}>Delete</Text>
                    </MyPressable>

                    <MyPressable
                        customStyle={styles.pressable}
                        pressedStyle={{ opacity: 0.8 }}
                        pressedFunction={onEditPress}
                    >
                        <Text style={styles.buttonText}>Edit</Text>
                    </MyPressable>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.LIGHTBLUE,
        alignItems: "center",
        justifyContent: "center",
        borderColor: "black",
        width: 350,
        paddingVertical: 15,
        borderRadius: 5,
        shadowColor: COLORS.BLACK,
        shadowRadius: 10,
        shadowOpacity: 0.3,
        elevation: 15,
        shadowOffset: { width: 0, height: 0 },
    },
    pressablesContainer: {
        flexDirection: "row",
        marginTop: 10,
        width: 260,
        height: 50,
        borderColor: "black",
        justifyContent: "center",
        alignItems: "center",
    },
    pressable: {
        alignItems: "center",
        marginHorizontal: 15,
        padding: 12,
        borderRadius: 3,
        backgroundColor: COLORS.BLUE,
        width: 80,
    },
    text: {
        fontSize: 15,
        marginVertical: 3,
        fontWeight: "bold",
        color: COLORS.BLUE,
    },
    buttonText: {
        color: COLORS.WHITE,
    },
    utilitiesContainer: {
        flexDirection: "row",
        marginTop: 25,
        width: "90%",
        height: 200,
        borderColor: "black",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 0,
    },
    utilitiesButtons: {
        // flex: 1,
        width: 130,
        height: 130,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 10,
        paddingVertical: 7,
        borderRadius: 3,
        backgroundColor: COLORS.GOLD,
        paddingHorizontal: 3,
    },
});
