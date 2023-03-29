import { View, Text } from "react-native";
import React, { useState } from "react";

export default function Edit({ route }) {
    const { title, description, key } = route.params;

    const [updatedTitle, setUpdatedTitle] = useState(title);
    const [updatedDescription, setUpdatedDescription] = useState(description);

    return (
        <View>
            <Text>{title}</Text>
        </View>
    );
}
