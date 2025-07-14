import React, { useContext, useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { db } from "../../firebase/config";

const Chats = () => {
  const [chats, setChats] = useState({});
  const { user } = useAuth();
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    if (!user?.uid) return;

    const unsub = onSnapshot(doc(db, "userChats", user.uid), (docSnap) => {
      setChats(docSnap.data() || {});
    });

    return () => unsub();
  }, [user?.uid]);

  const handleSelect = (selectedUserInfo) => {
    dispatch({ type: "CHANGE_USER", payload: selectedUserInfo });
  };

  return (
    <div className="flex flex-col overflow-y-auto px-4 py-2 space-y-3 h-full bg-gray-50">
      {Object.entries(chats)
        .filter(([_, chatData]) => chatData && chatData.userInfo) 
        .sort((a, b) => (b[1]?.date?.seconds || 0) - (a[1]?.date?.seconds || 0))
        .map(([chatId, chatData]) => (
          <div
            key={chatId}
            onClick={() => handleSelect(chatData.userInfo)}
            className="flex items-center gap-3 p-3 bg-white rounded-lg shadow hover:bg-gray-100 cursor-pointer transition"
          >
            <img
              src={chatData.userInfo.photoURL || "/default-avatar.png"}
              alt="user"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex flex-col truncate">
              <span className="font-medium text-gray-900 truncate">
                {chatData.userInfo.displayName || "Unknown User"}
              </span>
              <p className="text-sm text-gray-500 truncate">
                {chatData.lastMessage?.text || "No messages yet"}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Chats;
