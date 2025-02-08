import { useState, useEffect } from "react";

import ChatList from "../components/Chatlist";
import ChatWindow from "../components/Chatwindow";

interface Message {
  id: number;
  senderId: number;
  text: string;
  timestamp: Date;
}

interface Chat {
  id: number;
  name: string;
  messages: Message[];
}

export default function Chatlayout() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<number>(1);

  useEffect(() => {
    // Mock API call to get initial chats
    const initialChats: Chat[] = [
      { id: 1, name: "Alice", messages: [] },
      { id: 2, name: "Bob", messages: [] },
      { id: 3, name: "Charlie", messages: [] },
    ];
    setChats(initialChats);
  }, []);

  // const sendMessage = (text: string) => {
  //   if (selectedChat === null) return;

  //   const newMessage: Message = {
  //     id: Date.now(),
  //     senderId: 0, // Assuming 0 is the current user
  //     text,
  //     timestamp: new Date(),
  //   };

  //   setChats((prevChats) =>
  //     prevChats.map((chat) =>
  //       chat.id === selectedChat
  //         ? { ...chat, messages: [...chat.messages, newMessage] }
  //         : chat
  //     )
  //   );

  //   // Mock API call to send message
  //   console.log(`Sending message to chat ${selectedChat}: ${text}`);
  // };

  return (
    <div className="chat-app">
      <ChatList
        chats={chats}
        selectedChat={selectedChat}
        onSelectChat={setSelectedChat}
      />
      {chats.length > 0 && (
        <ChatWindow chat={chats.find((chat) => chat.id === selectedChat)!} />
      )}
    </div>
  );
}
