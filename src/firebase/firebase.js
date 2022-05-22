import { config } from "../config/config";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";


const firebaseConfig = {
  apiKey: config.apiKey,

  authDomain: config.authDomain,

  projectId: config.projectId,

  storageBucket: config.storageBucket,

  messagingSenderId: config.messagingSenderId,

  appId: config.appId,
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export const createDoc = async (doc, data) => {
  try {
    const refs = collection(db, doc);
    const response = await addDoc(refs, data);
    return response;
  } catch (error) {
    return null;
  }
};

export const getCollections = async (path) => {
  const querySnapshot = await getDocs(collection(db, path));
  return querySnapshot;
};

export const getDocRef = async (uuid, path) => {
  const docRef = doc(db, path, uuid);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
};

export const filterDoc = async (
  uuid,
  path,
  filterKey
) => {
  const fromQuery = query(collection(db, path), where(filterKey, "==", uuid));
  const querySnapshot = await getDocs(fromQuery);
  return querySnapshot;
};

export const updateCustomDoc = async (path, id, data) => {
  const docRef = doc(db, path, id);
  await updateDoc(docRef, data);
}

export const deleteCustomDoc = async (path, id) => {
  const docRef = doc(db, path, id);
  await deleteDoc(docRef);
}
