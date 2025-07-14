import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { useAuth } from "./AuthContext"; 

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const { user: currentUser } = useAuth();
  const [initializing, setInitializing] = useState(true);

  const INITIAL_STATE = {
    chatId: "null",
    user: {},
  };

  useEffect(() => {
    if (currentUser) {
      setInitializing(false);
    }
  }, [currentUser]);

  const chatReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          user: action.payload,
          chatId:
            currentUser.uid > action.payload.uid
              ? currentUser.uid + action.payload.uid
              : action.payload.uid + currentUser.uid,
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChatContext must be used within a ChatContextProvider");
  }
  return context;
};
