import { Text, View, Pressable } from "react-native";
import { ScreenContainer } from "../helper";
import EntriesList from "../components/EntriesList";
import React, { useState, useEffect } from "react";
import { firestore } from "../Firebase/firebase-setup";
import { onSnapshot, collection } from "firebase/firestore";

export default function Home({ navigation }) {
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

    return (
        <View style={ScreenContainer}>
            <EntriesList myEntries={entries} onEntryPress={onEntryPress} />
        </View>
    );
}
