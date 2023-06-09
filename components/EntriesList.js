import { View, Text, FlatList, Dimensions } from "react-native";
import React from "react";
import EntryItem from "./EntryItem";

export default function EntriesList({ myEntries, onEntryPress }) {
  const windowWidth = Dimensions.get("window").width;
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
        width: windowWidth,
      }}
    />
  );
}
