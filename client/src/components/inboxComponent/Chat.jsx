import React, { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import Messages from "./Messages";
import Input from "./Input";
import { BsCameraVideo, BsPersonPlus, BsThreeDots } from "react-icons/bs";

const Chat = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className="flex flex-col h-full w-full bg-white border-l border-gray-200">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gray-100">
        <span className="font-medium text-gray-800 text-md">
          {data.user?.displayName || "Select a user"}
        </span>
        <div className="flex gap-4 items-center text-gray-500">
          <BsCameraVideo className="cursor-pointer hover:text-gray-700" />
          <BsPersonPlus className="cursor-pointer hover:text-gray-700" />
          <BsThreeDots className="cursor-pointer hover:text-gray-700" />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        <Messages />
      </div>
      <div className="border-t border-gray-200 p-2">
        <Input />
      </div>
    </div>
  );
};

export default Chat;
