import {
  connectAuthEmulator,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as signOut_,
} from "firebase/auth";
import { app } from "./app";

export const auth = getAuth(app);

if (import.meta.env.DEV) connectAuthEmulator(auth, "http://127.0.0.1:9099");

export const signIn = function (email?: string, password?: string) {
  if (email && password)
    return signInWithEmailAndPassword(auth, email, password);
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};

export const signOut = function () {
  return signOut_(auth);
};
