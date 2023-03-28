import { Text, View, Pressable } from "react-native";
import { ScreenContainer } from "../helper";
import EntriesList from "../components/EntriesList";
import React, { useState, useEffect } from "react";
import { firestore } from "../Firebase/firebase-setup";
import { onSnapshot, collection } from "firebase/firestore";

export default function Home({ navigation }) {
    // const filter = route.params.filter;
    // entries = [
    //     { title: "AirPods", description: "Brand New" },
    //     { title: "KeyChain", description: "Kamado Tanjiro DS" },
    // ];

    const [entries, setEntries] = useState([]);
    function onEntryPress(entry) {
        navigation.navigate("Item Details", entry);
    }

    useEffect(() => {
        const unsubscribe = onSnapshot(
            collection(firestore, "entries"),
            (querySnapshot) => {
                if (querySnapshot.empty) {
                    setEntries([]);
                } else {
                    let docs = [];
                    querySnapshot.docs.forEach((document) => {
                        return docs.push({
                            ...document.data(),
                            key: document.id,
                        });
                    });
                    setEntries(docs);
                }
            }
        );
        return () => {
            unsubscribe();
        };
    }, []);

    function onEntryPress() {
        console.log("Clicked Entry");
    }
    return (
        <View style={ScreenContainer}>
            <EntriesList myEntries={entries} onEntryPress={onEntryPress} />
        </View>
    );
}
