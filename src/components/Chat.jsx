import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { socket } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";

const Chat = () => {
  const { targetUserId } = useParams();
  const [message, setMessage] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.user);
  const userId = user?._id;

  // Join chat room once
  useEffect(() => {
    if (!userId || !targetUserId) return;

    socket.emit("joinChat", { targetUserId, userId });

    const handleMessage = ({ text, senderId }) => {
      setMessage((prev) => [...prev, { text, senderId }]);
    };

    socket.on("messageReceived", handleMessage);

    return () => {
      socket.off("messageReceived", handleMessage);
    };
  }, [userId, targetUserId]);

  // Fetch old messages
  useEffect(() => {
    if (!targetUserId) return;

    const fetchChatMessages = async () => {
      const chatMessages = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/chat/${targetUserId}`,
        { withCredentials: true }
      );

      setMessage(chatMessages.data.messages);
    };

    fetchChatMessages();
  }, [targetUserId]);

  // Send message
  const HandleSend = () => {
    if (!newMessage.trim()) return;

    socket.emit("sendMessage", {
      userId,
      targetUserId,
      text: newMessage.trim(),
    });

    setNewMessage("");
  };

  return (
    <div className="flex flex-col h-[80vh] bg-base-200 rounded-xl p-5 mt-2 w-1/2 mx-auto">
      <h1 className="text-2xl text-center font-bold mb-4 border-b border-gray-600 pb-2">
        Chat
      </h1>

      <div className="flex-1 overflow-y-auto space-y-3 mb-4">
        {message.map((msg, index) => (
          <div
            key={index}
            className={`chat ${
              (msg.senderId?._id || msg.senderId) === userId
                ? "chat-end"
                : "chat-start"
            }`}
          >
            <div
              className={`chat-bubble ${
                (msg.senderId?._id || msg.senderId) === userId
                  ? "chat-bubble-warning"
                  : "chat-bubble-accent"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2 border-t border-gray-600 pt-3">
        <input
          type="text"
          value={newMessage}
          placeholder="Type a message..."
          className="input input-bordered flex-1"
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={HandleSend} className="btn btn-secondary">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
