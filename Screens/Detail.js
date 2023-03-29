import { View, Text, StyleSheet, Alert } from "react-native";
import React from "react";
import { COLORS, ScreenContainer } from "../helper";
import MyPressable from "../components/MyPressable";
import { Entypo, Feather } from "@expo/vector-icons";
import {
    updateOverLimitInDB,
    deleteFromDB,
} from "../Firebase/firestore-helper";

export default function Detail({ route, navigation }) {
    const { key, title, description } = route.params;

    function onConfrimPress() {
        Alert.alert(
            "Important",
            "Are you sure you want to mark this entry as reviewed?",
            [
                {
                    text: "Yes",
                    onPress: () => {
                        updateOverLimitInDB(key);
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

    function onDeletePress() {
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
                        <Entypo name="trash" size={18} color="white" />
                    </MyPressable>

                    <MyPressable
                        customStyle={styles.pressable}
                        pressedStyle={{ opacity: 0.8 }}
                        pressedFunction={onConfrimPress}
                    >
                        <Feather name="check" size={18} color="white" />
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
        width: 50,
    },
    text: {
        fontSize: 15,
        marginVertical: 3,
        fontWeight: "bold",
        color: COLORS.BLUE,
    },
});
