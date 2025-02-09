import type React from "react";
import { Chat } from "../layouts/Chatlayout";
import {
  ArrowLeft,
  ArrowLeftCircleIcon,
  MessageCircle,
  MessageSquare,
  User2Icon,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

interface ChatListProps {
  chats: Chat[];
  selectedChat: number | null;
  onSelectChat: (chatId: number) => void;
  setView: React.Dispatch<React.SetStateAction<"chat-window" | "chat-list">>;
}

function onsubmit(e: React.FormEvent) {
  e.preventDefault();
}

const ChatList: React.FC<ChatListProps> = ({
  chats,
  selectedChat,
  onSelectChat,
  setView,
}) => {
  const navigate = useNavigate();
  return (
    <div className="chat-list border-r w-full md:w-1/4">
      <h2 className="text-xl font-medium  p-4 flex items-center bg-indigo-50">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft className="size-7 mr-3" />
        </button>{" "}
        Chats
      </h2>

      <form onSubmit={onsubmit} className="p-2">
        <fieldset className="flex">
          <input
            type="text"
            placeholder="Enter user name to add"
            className="border border-r-0 rounded-l-md focus:outline-none  focus:border-indigo-500 p-2 w-full text-gray-700" // Added styling here
          />
          <button className="bg-indigo-500 hover:bg-indigo-700 text-white p-2 px-4 rounded-r-md text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500">
            Add
          </button>
        </fieldset>
      </form>

      <ul>
        {chats.map((chat) => (
          <li
            key={chat.userId}
            className={`${
              chat.userId === selectedChat ? "selected" : ""
            } flex gap-3 items-center text-xl`}
            onClick={() => {
              onSelectChat(chat.userId);
              if (window.innerWidth < 768) setView("chat-window");
            }}
          >
            <button className="h-8 w-8 p-1 rounded-full bg-slate-300 relative cursor-pointer">
              <User2Icon className="h-full w-full" color="white" />
            </button>
            {chat.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
