import * as React from "react";
import { Text, View, Pressable } from "react-native";
import { ScreenContainer } from "../helper";
import EntriesList from "../components/EntriesList";

export default function Home({ navigation }) {
    // const filter = route.params.filter;
    entries = [
        { title: "AirPods", description: "Brand New" },
        { title: "KeyChain", description: "Kamado Tanjiro DS" },
    ];

    function onEntryPress() {
        console.log("Clicked Entry");
    }
    return (
        <View style={ScreenContainer}>
            <EntriesList myEntries={entries} onEntryPress={onEntryPress} />
        </View>
    );
}


