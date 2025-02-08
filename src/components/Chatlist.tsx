import type React from "react";
import { Chat } from "../layouts/Chatlayout";
import { ArrowLeftCircleIcon } from "lucide-react";
import { use } from "react";
import { useNavigate } from "react-router-dom";

interface ChatListProps {
  chats: Chat[];
  selectedChat: number | null;
  onSelectChat: (chatId: number) => void;
}

function onsubmit(e: React.FormEvent) {
  e.preventDefault();
}

const ChatList: React.FC<ChatListProps> = ({
  chats,
  selectedChat,
  onSelectChat,
}) => {
  const navigate = useNavigate();
  return (
    <div className="chat-list border-r">
      <div className="bg-green-50 flex items-center">
        <button onClick={() => navigate(-1)}>
          <ArrowLeftCircleIcon className="size-5 ml-2" />
        </button>

        <h2>Chats</h2>
      </div>

      <form onSubmit={onsubmit} className="p-2">
        <fieldset className="flex">
          <input
            type="text"
            placeholder="Enter user name to add"
            className="border border-r-0 rounded-l-md focus:outline-none  focus:border-green-500 p-2 w-full text-gray-700" // Added styling here
          />
          <button className="bg-green-500 hover:bg-green-700 text-white p-2 px-4 rounded-r-md text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green-500">
            Add
          </button>
        </fieldset>
      </form>

      <ul>
        {chats.map((chat) => (
          <li
            key={chat.userId}
            className={chat.userId === selectedChat ? "selected" : ""}
            onClick={() => onSelectChat(chat.userId)}
          >
            {chat.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
