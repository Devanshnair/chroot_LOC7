import { ArrowLeftCircleIcon, User } from "lucide-react";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { Chat, Message } from "../layouts/Chatlayout";

interface ChatWindowProps {
  chat: Chat;
  currentUserId: number;
  setChats: React.Dispatch<React.SetStateAction<Chat[] | null>>;
  setView: React.Dispatch<React.SetStateAction<"chat-window" | "chat-list">>;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  chat,
  currentUserId,
  setChats,
  setView,
}) => {
  console.log(currentUserId);
  // const [messages, setMessages] = useState<Message[]>([]);
  const [newText, setNewText] = useState("");
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(
      // prettier-ignore
      `ws://natural-ape-severely.ngrok-free.app/ws/dm/${chat.userId}/${currentUserId}/?token=${localStorage.getItem("accessToken")}`
    );

    ws.onopen = () => {
      console.log("Connected to WebSocket");
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setChats((prevChats) => {
        if (!prevChats) return null;
        return prevChats.map((c) => {
          if (c.userId === chat.userId) {
            return {
              ...c,
              messages: [...c.messages, message],
            };
          }
          return c;
        });
      });
    };

    ws.onclose = () => {
      console.log("Disconnected from WebSocket");
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, [chat.userId]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newText.trim() || !socket) return;

    const newMessage: Message = {
      id: chat.messages.length + 1,
      senderId: currentUserId,
      text: newText,
      timestamp: new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      }),
    };
    console.log(newMessage);
    socket.send(JSON.stringify(newMessage));
    setNewText("");
    scrollToBottom();
  };

  const messagesEndRef = useRef<HTMLDivElement>(null); // Ref for the end of messages

  // Function to scroll to the bottom of the messages container
  function scrollToBottom() {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); // Smooth scroll is optional, can be 'auto' or 'instant'
  }

  useEffect(() => {
    scrollToBottom();
  }, [chat.messages]);

  return (
    <div className="chat-window min-h-full">
      <h2 className="flex gap-2 bg-green-50 text-lg font-semibold text-green-500 p-4">
        {window.innerWidth < 768 && (
          <button onClick={() => setView("chat-list")}>
            <ArrowLeftCircleIcon className="size-5 mr-1" />
          </button>
        )}

        <span>
          <User className="size-5=6" />
        </span>
        {chat.name}
      </h2>
      <div className="messages h-full">
        {chat.messages.map((message) => (
          <div
            key={message.id}
            className={`message ${
              message.senderId === currentUserId ? "sent" : "received"
            }`}
          >
            <p>{message.text}</p>
            <span className="timestamp">
              {formatTimestamp(message.timestamp)}
            </span>
          </div>
        ))}

        <div ref={messagesEndRef} />
      </div>
      <form className="message-input" onSubmit={sendMessage}>
        <input
          type="text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          placeholder="Type a message..."
          className="border rounded-sm p-2 w-full text-gray-700 outline-offset-4"
        />
        <button type="submit" className="rounded-sm">
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatWindow;

function formatTimestamp(timestamp: string) {
  const date = new Date(timestamp);
  // Format the date and time using toLocale... methods
  const formattedDate = date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const formattedTime = date.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return `${formattedDate}, ${formattedTime}`;
}
