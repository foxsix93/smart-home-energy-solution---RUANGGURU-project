import React from "react";

const ChatSection = ({ handleChat, query, setQuery }) => {
  return (
    <div className="w-80 flex items-center mb-4 ">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ask a question..."
        className="p-2 border rounded w-full sm:w-auto sm:mr-2"
      />
      <button
        onClick={handleChat}
        className="text-white p-2 rounded-lg bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 shadow-2xl"
      >
        Chat
      </button>
    </div>
  );
};

export default ChatSection;
