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

    const displayName = user.displayName || '';
    const [firstName = '', lastName = ''] = displayName.split(' ');

    const userData = {
      uid: user.uid,
      firstName,
      lastName,
      email: user.email || '',
      phone: user.phoneNumber || '',
      username: user.email?.split('@')[0] || '',
      photoURL: user.photoURL || '',
      createdAt: new Date().toISOString(),
    };

    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      await setDoc(userRef, userData);
    }

    return {
      success: true,
      user: userData,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
};
