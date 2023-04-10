// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId, MAPS_API_KEY} from "@env"

// // Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey : "AIzaSyDqfNNH9jlK6e6QPg0i_83clVRtrBO4iC4",
// authDomain : "lostit-dd4db.firebaseapp.com",
// projectId :"lostit-dd4db",
// storageBucket : "lostit-dd4db.appspot.com",
// messagingSenderId : "25896468303",
// appId : "1:25896468303:web:cd2a95bf227e90c32c0f3a",
// MAPS_API_KEY : "AIzaSyCdhumcQQOIKwepzNnceWVvi9c0c829Xlo",
// };

const firebaseConfig = {
        apiKey : apiKey,
    authDomain : authDomain,
    projectId :projectId,
    storageBucket : storageBucket,
    messagingSenderId : messagingSenderId,
    appId : appId,
    MAPS_API_KEY : MAPS_API_KEY,
    };

// Initialize Firebase
const myApp = initializeApp(firebaseConfig);
export const firestore = getFirestore(myApp);
export const storage = getStorage(myApp);
