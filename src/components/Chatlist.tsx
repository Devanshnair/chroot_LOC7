import type React from "react";

interface Chat {
  id: number;
  name: string;
}

interface ChatListProps {
  chats: Chat[];
  selectedChat: number | null;
  onSelectChat: (chatId: number) => void;
}

const ChatList: React.FC<ChatListProps> = ({
  chats,
  selectedChat,
  onSelectChat,
}) => {
  return (
    <div className="chat-list border-r">
      <h2 className="bg-[#f2fcea]">Chats</h2>
      <ul>
        {chats.map((chat) => (
          <li
            key={chat.id}
            className={chat.id === selectedChat ? "selected" : ""}
            onClick={() => onSelectChat(chat.id)}
          >
            {chat.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
