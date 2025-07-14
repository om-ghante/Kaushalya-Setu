import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore';

import { app } from './config';

const auth = getAuth(app);
const db = getFirestore(app);

/**
 * Register a new user
 * @param {Object} formData - User data including email, password, displayName, phone, and username
 */
export const registerUser = async (formData) => {
  const { email, password, displayName, phone, username } = formData;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const userData = {
      uid: user.uid,
      displayName,
      email,
      phone,
      username,
      createdAt: new Date().toISOString(),
    };

    await setDoc(doc(db, 'users', user.uid), userData);

    localStorage.setItem('user', JSON.stringify(userData));

    return { success: true, user: userData };
  } catch (error) {
    console.error("Error registering user:", error);
    return { success: false, error: error.message };
  }
};

export const loginUser = async (identifier, password) => {
  try {
    let emailToUse = identifier;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(identifier)) {
      const usersRef = collection(db, 'users');

      const qUsername = query(usersRef, where('username', '==', identifier));
      const qPhone = query(usersRef, where('phone', '==', identifier));

      const [usernameSnap, phoneSnap] = await Promise.all([
        getDocs(qUsername),
        getDocs(qPhone),
      ]);

      let userDoc = null;
      if (!usernameSnap.empty) {
        userDoc = usernameSnap.docs[0];
      } else if (!phoneSnap.empty) {
        userDoc = phoneSnap.docs[0];
      }

      if (!userDoc) {
        return { success: false, error: 'No user found with provided identifier' };
      }

      emailToUse = userDoc.data().email;
    }

    const userCredential = await signInWithEmailAndPassword(auth, emailToUse, password);
    const user = userCredential.user;

    const docRef = doc(db, 'users', user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const userData = docSnap.data();

      localStorage.setItem('user', JSON.stringify(userData));

      return { success: true, user: userData };
    } else {
      return { success: false, error: 'User data not found in Firestore' };
    }
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, error: error.message };
  }
};

export const getUserData = async (uid) => {
  try {
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { success: true, user: docSnap.data() };
    } else {
      return { success: false, error: 'User not found in Firestore' };
    }
  } catch (error) {
    console.error("Error retrieving user data:", error);
    return { success: false, error: error.message };
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
    localStorage.clear();
    return { success: true };
  } catch (error) {
    console.error("Logout error:", error);
    return { success: false, error: error.message };
  }
};
