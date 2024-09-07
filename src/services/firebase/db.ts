import { GENERAL, INFO, LINK, USAGE } from "@/constants";
import { app } from "./app";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  deleteDoc,
  connectFirestoreEmulator,
  collection,
  query,
  where,
  orderBy,
  getDocs,
  addDoc,
} from "firebase/firestore";
import { auth } from "./auth";
import { encode } from "../sqids";

export const db = getFirestore(app);

if (import.meta.env.DEV) connectFirestoreEmulator(db, "127.0.0.1", 8080);

const getUserId = () =>
  auth.currentUser?.uid != undefined ? auth.currentUser.uid : "anonymous";

export const getIndex = async () => {
  const docRef = doc(db, GENERAL, INFO);
  const snapshot = await getDoc(docRef);
  if (!snapshot.exists()) return 0;
  return (snapshot.data().index as number) ?? 0;
};

export const getLink = async (id: string) => {
  const docRef = doc(db, LINK, id);
  const snapshot = await getDoc(docRef);
  if (!snapshot.exists()) return null;
  return { id: snapshot.id, ...snapshot.data() } as UDocument<ULink>;
};

export const getLinks = async () => {
  const colRef = collection(db, LINK);
  const w = where("uid", "==", getUserId());
  const queryRef = query(colRef, w, orderBy("timestamp"));
  const snapshot = await getDocs(queryRef);
  return snapshot.docs.map((i) => i.data() as UDocument<ULink>);
};

export const createLink = async (data: UDocument<ULink>) => {
  data.id = encode(await getIndex());
  data.uid = getUserId();
  data.timestamp = Date.now();
  data.utimestamp = Date.now();
  await setDoc(doc(db, LINK, data.id), data);
  return data;
};

export const updateLink = async (data: UDocument<ULink>) => {
  data.uid = getUserId();
  data.utimestamp = Date.now();
  await setDoc(doc(db, LINK, data.id), data);
  return data;
};

export const removeLink = (id: string) => {
  return deleteDoc(doc(db, LINK, id));
};

export const addUsage = async (id: string) => {
  return addDoc(collection(db, USAGE), { id: id, uid: getUserId() });
};
