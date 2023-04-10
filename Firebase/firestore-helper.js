import {
    collection,
    addDoc,
    doc,
    deleteDoc,
    updateDoc,
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
    updatedLocation
) {
    try {
        //   await updateDoc(doc(firestore, "entries", id.toString()));
        await updateDoc(doc(firestore, "entries", id.toString()), {
            title: updatedTitle,
            description: updatedDescription,
            location: updatedLocation,
        });
    } catch (err) {
        console.log(err);
    }
}
