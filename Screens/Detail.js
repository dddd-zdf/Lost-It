import { View, Text, StyleSheet, Alert } from "react-native";
import React from "react";
import { COLORS, ScreenContainer } from "../helper";
import MyPressable from "../components/MyPressable";

import { deleteFromDB } from "../Firebase/firestore-helper";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Firebase/firebase-setup";

export default function Detail({ route, navigation }) {
    console.log(route.params);
    const { key, title, description, userId } = route.params;
    const [user] = useAuthState(auth);
    
    function onEditPress() {
        if (userId !== user.uid) {
            Alert.alert("No Access");
        } else {
            navigation.navigate("Edit Item", { title, description, key });
        }
    }

    function onDeletePress() {
        if (userId !== user.uid) {
            Alert.alert("No Access");
        } else {
            Alert.alert("Delete", "Are you sure you want to delete this entry?", [
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
        ]);
        }
    }

    return (
        <View style={[ScreenContainer, { paddingTop: 70 }]}>
            <View style={styles.container}>
                <Text style={styles.text}>{`Title:  ${title}`}</Text>
                <Text
                    style={styles.text}
                >{`Description:  ${description}`}</Text>

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
        width: 300,
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
});
