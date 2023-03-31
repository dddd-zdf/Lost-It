import { View, Text, FlatList } from "react-native";
import React from "react";
import EntryItem from "./EntryItem";

export default function EntriesList({ myEntries, onEntryPress }) {
    
    return (
        <FlatList
            data={myEntries}
            renderItem={({ item }) => {
                return <EntryItem entry={item} onPress={onEntryPress} />;
            }}
            contentContainerStyle={{
                flexGrow: 1,
                paddingBottom: 100,
                paddingTop: 25,
                alignItems: "center",
                width: 390,
            }}
        />
    );
}
