import React from "react";
import { useParams } from "react-router-dom";

const Chat = () => {
  const { targetUserId } = useParams();
  return (
    <div className="flex flex-col h-[80vh] bg-base-200 rounded-xl p-5 mt-2 w-1/2 mx-auto">
      {/* Header */}
      <h1 className="text-2xl text-center font-bold mb-4 border-b border-gray-600 pb-2">
        Chat
      </h1>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto space-y-3 mb-4">
        {/* Incoming Message */}
        <div class="chat chat-start">
          <div class="chat-bubble chat-bubble-accent">
            That's never been done in the history of the Jedi.
          </div>
        </div>

        {/* Outgoing Message */}
        <div class="chat chat-end">
          <div class="chat-bubble chat-bubble-warning">
            To be on the Council at your age.
          </div>
        </div>
      </div>

      {/* Input + Send */}
      <div className="flex gap-2 border-t border-gray-600 pt-3">
        <input
          type="text"
          placeholder="Type a message..."
          className="input input-bordered flex-1"
        />
        <button className="btn btn-secondary">Send</button>
      </div>
    </div>
  );
};

export default Chat;
