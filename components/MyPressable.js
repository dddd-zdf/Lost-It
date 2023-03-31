import { Pressable } from "react-native";
import React from "react";

export default function MyPressable({
    children,
    pressedFunction,
    customStyle,
    pressedStyle,
}) {
    return (
        <Pressable
            onPress={pressedFunction}
            style={({ pressed }) => {
                return [customStyle, pressed && pressedStyle];
            }}
        >
            {children}
        </Pressable>
    );
}
