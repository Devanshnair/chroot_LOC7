import { useEffect, useState } from "react";

import ChatList from "../components/Chatlist";
import ChatWindow from "../components/Chatwindow";
import { useQuery } from "@tanstack/react-query";
import { baseUrl } from "../App";
import { Loader2 } from "lucide-react";

export interface Message {
  id: number;
  senderId: number;
  text: string;
  timestamp: string;
}

export interface Chat {
  userId: number;
  name: string;
  messages: Message[];
}

export default function Chatlayout() {
  const { data: chatsData, isLoading } = useQuery<Chat[]>({
    queryKey: ["chats"],
    queryFn: async () => {
      const response = await fetch(`${baseUrl}/api/chats/dms/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
        },
      });
      return response.json();
    },
  });
  const [chats, setChats] = useState<Chat[] | null>(null);

  const { data: currentUser } = useQuery({
    queryKey: ["currentUserId"],
    queryFn: async () => {
      const response = await fetch(`${baseUrl}/api/me/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
        },
      });
      return response.json();
    },
  });

  const [selectedChat, setSelectedChat] = useState<number>();
  const [view, setView] = useState<"chat-window" | "chat-list">("chat-list");

  useEffect(() => {
    if (chatsData) setChats(chatsData);
  }, [chatsData]);

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );

  return (
    <div className="chat-app">
      {view == "chat-list"
        ? chats && (
            <ChatList
              chats={chats || []}
              selectedChat={selectedChat || chats[0].userId}
              onSelectChat={setSelectedChat}
              setView={setView}
            />
          )
        : chats &&
          currentUser && (
            <ChatWindow
              chat={
                chats.find((chat) => chat.userId === selectedChat) || chats[0]
              }
              currentUserId={currentUser.id}
              setChats={setChats}
              setView={setView}
            />
          )}
      {window.innerWidth > 768 && chats && currentUser && (
        <ChatWindow
          chat={chats.find((chat) => chat.userId === selectedChat) || chats[0]}
          currentUserId={currentUser.id}
          setChats={setChats}
          setView={setView}
        />
      )}
    </div>
  );
}
