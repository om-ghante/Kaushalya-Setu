import React, { useContext, useEffect, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";

const Message = ({ message }) => {
  const { user: currentUser } = useAuth();
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const isOwner = message.senderId === currentUser?.uid;

  return (
    <div
      ref={ref}
      className={`flex gap-3 p-2 ${isOwner ? "justify-end" : "justify-start"}`}
    >
      {!isOwner && (
        <img
          src={data.user?.photoURL}
          alt="avatar"
          className="w-8 h-8 rounded-full object-cover"
        />
      )}
      <div className={`flex flex-col max-w-[70%] ${isOwner ? "items-end" : "items-start"}`}>
        <div
          className={`rounded-lg px-4 py-2 text-sm whitespace-pre-wrap ${
            isOwner
              ? "bg-blue-500 text-white rounded-br-none"
              : "bg-gray-200 text-gray-900 rounded-bl-none"
          }`}
        >
          {message.text}
        </div>

        {message.img && (
          <img
            src={message.img}
            alt="attachment"
            className="mt-1 max-w-xs rounded-md shadow-md"
          />
        )}

        <span className="text-[10px] text-gray-400 mt-1">
          just now
        </span>
      </div>

      {isOwner && (
        <img
          src={currentUser?.photoURL}
          alt="avatar"
          className="w-8 h-8 rounded-full object-cover"
        />
      )}
    </div>
  );
};

export default Message;
