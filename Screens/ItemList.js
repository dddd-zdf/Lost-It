import * as React from 'react';
import { Text, View, Pressable } from 'react-native';

export default function ItemList({route},{navigation}) {

  const filter = route.params.filter;
  return (
    <View>
      {/* <Text>
        {
          filter == 'user' ? ('item list under a user profile') : ('item list for all items')
        }
      </Text>
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
      </Pressable> */}
      <Text>Home</Text>
    </View>
  );
}