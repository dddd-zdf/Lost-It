import { Text, View, Pressable } from "react-native";
import { ScreenContainer } from "../helper";
import EntriesList from "../components/EntriesList";
import React, { useState, useEffect } from "react";
import { firestore } from "../Firebase/firebase-setup";
import { onSnapshot, collection, orderBy, query } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Firebase/firebase-setup";
import { COLORS, COLORS2 } from "../helper";

export default function Home({ navigation, route }) {
  const filter = route.params.filter;
  const [entries, setEntries] = useState([]);
  const [user] = useAuthState(auth);

  function onEntryPress(entry) {
    navigation.navigate("Item Details", entry);
  }

  const q = query(
    collection(firestore, "entries"),
    orderBy("timestamp", "desc")
  );

  useEffect(() => {
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      if (querySnapshot.empty) {
        setEntries([]);
      } else {
        let docs = [];
        querySnapshot.docs.forEach((document) => {
          const data = document.data();
          if (filter === "user") {
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
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <View style={ScreenContainer}>
      {entries.length === 0 && (
        <Text
          style={{
            marginTop: 50,
            fontSize: 30,
            fontStyle: "italic",
            padding: 10,
            color: COLORS2.PRIMARY,
          }}
        >
          {filter === "user"
            ? "You have no lost item posted"
            : "No lost items reported in your community"}
        </Text>
      )}
      <EntriesList myEntries={entries} onEntryPress={onEntryPress} />
    </View>
  );
}
