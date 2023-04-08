import { Text, View, Pressable } from "react-native";
import { ScreenContainer } from "../helper";
import EntriesList from "../components/EntriesList";
import React, { useState, useEffect } from "react";
import { firestore } from "../Firebase/firebase-setup";
import { onSnapshot, collection } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Firebase/firebase-setup";

export default function Home({ navigation, route }) {
    const filter = route.params.filter;
    const [entries, setEntries] = useState([]);
    const [user] = useAuthState(auth);

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
                        const data = document.data();
                        if (filter === 'user') {
                            if (data.userId === user.uid) {
                                return docs.push({
                                    ...data,
                                    key: document.id,
                                });
                            }
                        } else {
                            return docs.push({
                                ...data,
                                key: document.id,
                            });
                        }

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
