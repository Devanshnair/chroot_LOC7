import { User } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";

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

interface ChatWindowProps {
  chat: Chat;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ chat }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(
      `ws://natural-ape-severely.ngrok-free.app/ws/teams/${
        chat.id
      }/?token=${localStorage.getItem("accessToken")}`
    );

    ws.onopen = () => {
      console.log("Connected to WebSocket");
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.history) {
        setMessages(message.history);
        return;
      }
      // console.log(message);
      setMessages((prev) => [...prev, message]);
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
  }, [chat.id]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !socket) return;

    const messageData = {
      message: newMessage,
      timestamp: new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      }),
    };

    socket.send(JSON.stringify(messageData));
    setNewMessage("");
  };
  return (
    <div className="chat-window min-h-full">
      <h2 className="flex gap-2 bg-[#f2fcea]">
        <span>
          <User />
        </span>
        {chat.name}
      </h2>
      <div className="messages h-full">
        {chat.messages.map((message) => (
          <div
            key={message.id}
            className={`message ${
              message.senderId === 0 ? "sent" : "received"
            }`}
          >
            <p>{message.text}</p>
            <span className="timestamp">
              {message.timestamp.toLocaleTimeString()}
            </span>
          </div>
        ))}
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${
              message.senderId === 0 ? "sent" : "received"
            }`}
          >
            <p>{message.text}</p>
            <span className="timestamp">
              {message.timestamp.toLocaleTimeString()}
            </span>
          </div>
        ))}
      </div>
      <MessageInput onSendMessage={sendMessage} />
    </div>
  );
};

export default ChatWindow;

interface MessageInputProps {
  onSendMessage: (e: React.FormEvent) => void;
}

function MessageInput({ onSendMessage }: MessageInputProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(e);
      setMessage("");
    }
  };

  return (
    <form className="message-input" onSubmit={handleSubmit}>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button type="submit">Send</button>
    </form>
  );
}
