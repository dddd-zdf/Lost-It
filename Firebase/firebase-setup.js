// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import React from "react";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getStorage } from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
} from "@env";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDDd29F4HDcFIPahCdwbapvGgKL9V4qH-k",
    authDomain: "lost-it-7686b.firebaseapp.com",
    projectId: "lost-it-7686b",
    storageBucket: "lost-it-7686b.appspot.com",
    messagingSenderId: "1004438500007",
    appId: "1:1004438500007:web:c921e0120ad3ce2618a182"
  };

const myApp = initializeApp(firebaseConfig);
export const firestore = getFirestore(myApp);
// export const auth = getAuth(myApp);
export const auth = initializeAuth(myApp, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const storage = getStorage(myApp);