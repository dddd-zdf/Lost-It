import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../Firebase/firebase-setup';
import { getUser } from '../Firebase/firestore-helper';
import NotificationManager from '../components/NotificationManager';

export default function Profile({ navigation }) {
  const [displayName, setDisplayName] = useState(null);
  const [email, setEmail] = useState(null);
  const [date, setDate] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user !== null) {
        const { displayName, email, createdAt } = await getUser(user.uid);
        setDisplayName(displayName);
        setEmail(email);
        setDate(new Date(createdAt).toLocaleDateString());
      }
    };

    fetchUserData();
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log('Signed out.');
      })
      .catch((error) => {
        console.error('Error signing out: ', error);
      });
  };

  return (
    <View>
      <Text>Name: {displayName}</Text>
      <Text>Email: {email}</Text>
      <Text>Member since: {date}</Text>
      <NotificationManager/>
      <Button title="Sign Out" onPress={handleSignOut} />
    </View>
  );
};
