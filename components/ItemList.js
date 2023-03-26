import * as React from 'react';
import { Text, View, Pressable } from 'react-native';

export default function ItemList({navigation}) {
  return (
    <View>
      <Text>ItemList Screen</Text>
      <Pressable
        onPress={() => navigation.navigate('Item Details')}
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
      <Text>Go to Item Details</Text>
      </Pressable>
    </View>
  );
}