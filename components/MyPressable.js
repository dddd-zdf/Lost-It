import { Pressable } from "react-native";
import React from "react";

export default function MyPressable({
    children,
    pressedFunction,
    customStyle,
    pressedStyle,
    isDisabled
}) {
    return (
        <Pressable
            onPress={pressedFunction}
            style={({ pressed }) => {
                return [(customStyle), pressed && pressedStyle];
            }}
            disabled = {!isDisabled ? false : true}
        >
            {children}
        </Pressable>
    );
}
