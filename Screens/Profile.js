import React from 'react';
import { View, Text, Pressable } from 'react-native';

export default function Profile({navigation}) {
  return (
    <View>
      <Text>Profile Screen</Text>
      <Pressable
        onPress={() => navigation.navigate('Item List')}
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? 'gray' : 'white'
          },
          {
            padding: 10,
            borderRadius: 5,
            marginTop: 10
          }
        ]}
      >
        <Text>Go to item list under this user profile</Text>
      </Pressable>
    </View>
  );
};