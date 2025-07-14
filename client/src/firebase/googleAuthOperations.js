import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { app } from "./config";

const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const displayName = user.displayName || "";
    const email = user.email || "";
    const phone = user.phoneNumber || "";
    const username = email ? email.split("@")[0] : "";
    const photoURL = user.photoURL || "";

    const userData = {
      uid: user.uid,
      displayName,
      email,
      phone,
      username,
      photoURL,
      createdAt: new Date().toISOString(),
    };

    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      await setDoc(userRef, userData);
    }

    localStorage.setItem("user", JSON.stringify(userData));

    return {
      success: true,
      user: userData,
    };
  } catch (error) {
    console.error("Google Sign-In Error:", error);
    return {
      success: false,
      error: error.message,
    };
  }
};
