import React, { useState, useContext } from "react";
import { useAuth } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../../firebase/config";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

import { FiSend, FiPaperclip } from "react-icons/fi";
import { HiOutlinePhotograph } from "react-icons/hi";

const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const { user: currentUser } = useAuth();
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if (!data.chatId || !currentUser?.uid || !data.user?.uid) return;
    if (!text.trim() && !img) return;

    try {
      if (img) {
        const storageRef = ref(storage, uuid());
        const uploadTask = uploadBytesResumable(storageRef, img);

        uploadTask.on(
          (error) => {
            console.error("Upload error:", error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
              await updateDoc(doc(db, "chats", data.chatId), {
                messages: arrayUnion({
                  id: uuid(),
                  text,
                  senderId: currentUser.uid,
                  date: Timestamp.now(),
                  img: downloadURL,
                }),
              });
            });
          }
        );
      } else {
        await updateDoc(doc(db, "chats", data.chatId), {
          messages: arrayUnion({
            id: uuid(),
            text,
            senderId: currentUser.uid,
            date: Timestamp.now(),
          }),
        });
      }

      const lastMessageUpdate = {
        [data.chatId + ".lastMessage"]: { text },
        [data.chatId + ".date"]: serverTimestamp(),
      };

      await updateDoc(doc(db, "userChats", currentUser.uid), lastMessageUpdate);
      await updateDoc(doc(db, "userChats", data.user.uid), lastMessageUpdate);

      setText("");
      setImg(null);
    } catch (err) {
      console.error("Send message failed:", err);
    }
  };

  return (
    <div className="flex items-center gap-3 px-4 py-3 border-t bg-white">
      <input
        type="text"
        placeholder="Type something..."
        onChange={(e) => setText(e.target.value)}
        value={text}
        className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="flex items-center gap-2">
        <label htmlFor="file" className="cursor-pointer text-gray-500 hover:text-blue-500 transition">
          <HiOutlinePhotograph size={22} />
        </label>
        <input
          type="file"
          id="file"
          style={{ display: "none" }}
          onChange={(e) => setImg(e.target.files[0])}
        />

        <button
          onClick={handleSend}
          className="text-blue-600 hover:text-blue-800 transition"
        >
          <FiSend size={22} />
        </button>
      </div>
    </div>
  );
};

export default Input;
