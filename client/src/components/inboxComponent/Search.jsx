import React, { useState, useContext } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  setDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import { useAuth } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";

const Search = () => {
  const [username, setUsername] = useState("");
  const [foundUser, setFoundUser] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();
  const { dispatch } = useContext(ChatContext);

  const handleSearch = async () => {
    setLoading(true);
    setError(false);
    setFoundUser(null);

    if (!username.trim()) return;

    try {
      const q = query(
        collection(db, "users"),
        where("username", "==", username.trim())
      );

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setError(true);
      } else {
        const userDoc = querySnapshot.docs[0];
        setFoundUser({ ...userDoc.data(), uid: userDoc.id });
      }
    } catch (err) {
      console.error("Search failed:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.code === "Enter") handleSearch();
  };

  const handleSelect = async () => {
    if (!foundUser || !user) return;

    const combinedId =
      user.uid > foundUser.uid
        ? user.uid + foundUser.uid
        : foundUser.uid + user.uid;

    try {
      const chatRef = doc(db, "chats", combinedId);
      const chatDoc = await getDoc(chatRef);

      if (!chatDoc.exists()) {
        await setDoc(chatRef, { messages: [] });
      }

      const userChatData = {
        userInfo: {
          uid: foundUser.uid,
          displayName: foundUser.displayName || "Unknown",
          photoURL: foundUser.photoURL || "/default-avatar.png",
        },
        date: serverTimestamp(),
        lastMessage: {
          text: "Hi",
        },
      };

      const foundUserChatData = {
        userInfo: {
          uid: user.uid,
          displayName: user.displayName || "Unknown",
          photoURL: user.photoURL || "/default-avatar.png",
        },
        date: serverTimestamp(),
        lastMessage: {
          text: "Hi",
        },
      };

      await setDoc(doc(db, "userChats", user.uid), {
        [combinedId]: userChatData,
      }, { merge: true });

      await setDoc(doc(db, "userChats", foundUser.uid), {
        [combinedId]: foundUserChatData,
      }, { merge: true });

      dispatch({ type: "CHANGE_USER", payload: foundUser });

      setUsername("");
      setFoundUser(null);
    } catch (err) {
      console.error("Chat creation failed:", err);
      setError(true);
    }
  };

  return (
    <div className="search p-4">
      <div className="searchForm flex items-center gap-2 mb-4">
        <input
          type="text"
          placeholder="Find a user"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {loading ? "..." : "Search"}
        </button>
      </div>

      {error && (
        <div className="text-sm text-red-500 mb-2">User not found.</div>
      )}

      {foundUser && (
        <div
          onClick={handleSelect}
          className="userChat flex items-center gap-4 p-3 bg-gray-100 rounded-md hover:bg-gray-200 cursor-pointer transition"
        >
          <img
            src={foundUser.photoURL || "/default-avatar.png"}
            alt="avatar"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="flex flex-col">
            <span className="font-medium">{foundUser.displayName || "Unknown User"}</span>
            <span className="text-sm text-gray-500">Click to start chat</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
