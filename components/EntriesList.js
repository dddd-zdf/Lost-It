import { View, Text, FlatList, Dimensions } from "react-native";
import React from "react";
import EntryItem from "./EntryItem";
import { textBox, textStyle, FlatListStyle } from "../helper";

export default function EntriesList({ myEntries, onEntryPress }) {
  const windowWidth = Dimensions.get("window").width;
  if (myEntries.length === 0) {
    return (
      <View style={ textBox }>
        <Text style={ textStyle }>No post yet</Text>
      </View>
    );
    
  }

  return (
    <FlatList
      data={myEntries}
      renderItem={({ item }) => {
        return <EntryItem entry={item} onPress={onEntryPress} />;
      }}
      contentContainerStyle={ FlatListStyle }
    />
  );
}
