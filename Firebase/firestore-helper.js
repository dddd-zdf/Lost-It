import {
    collection,
    addDoc,
    setDoc,
    doc,
    deleteDoc,
    updateDoc,
    getDoc
} from "firebase/firestore";
import { firestore } from "./firebase-setup";


export async function writeToDB(entry) {
    try {
        const docRef = await addDoc(collection(firestore, "entries"), entry);
        console.log(docRef.id);
    } catch (err) {
        console.log(err);
    }
}

export async function deleteFromDB(id) {
    try {
        await deleteDoc(doc(firestore, "entries", id));
    } catch (err) {
        console.log(err);
    }
}

export async function UpdateDB(
    id,
    updatedTitle,
    updatedDescription,
    updatedLocation,
    updatedUri,
    updatedAddress
) {
    try {
        //   await updateDoc(doc(firestore, "entries", id.toString()));
        await updateDoc(doc(firestore, "entries", id.toString()), {
            title: updatedTitle,
            description: updatedDescription,
            location: updatedLocation,
            imageUri: updatedUri,
            address: updatedAddress,
        });
    } catch (err) {
        console.log(err);
    }
}
  
export async function createUser(id, email, displayName) {
    try {
        const docRef = await setDoc(doc(firestore, 'users', id), {
            email: email,
            displayName: displayName,
            createdAt: Date.now(),
        });
        console.log(id);
    } catch (err) {
        console.log(err);
    }
}
export async function getUser(id) {
    try {
        const docRef = doc(firestore, "users", id);
        const docSnap = await getDoc(docRef);  
        if (docSnap.exists()) {
          return docSnap.data();
        } else {
          console.log("No such user!");
          return null;
        }
      } catch (err) {
        console.log(err);
        return null;
      }
}

export async function getAddressFromDB(location) {
    try {
        const docRef = doc(firestore, "locations", `${location.latitude},${location.longitude}`);
        const docSnap = await getDoc(docRef);  
        if (docSnap.exists()) {
            return docSnap.data().address;
        } else {
            return null;
        }
    } catch (err) {
        console.log(err);
        return null;
    }
}

export async function writeLocationToDB(location, address) {
    try {
        //use coordinates as document id
        const id = `${location.latitude},${location.longitude}`;
        const locationsRef = await setDoc(doc(firestore, 'locations', id), {
            latitude: location.latitude,
            longitude: location.latitude,
            address: address,
        })
        console.log(id);
    } catch (err) {
        console.log(err);
    }
}