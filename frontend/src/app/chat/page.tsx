"use client";
import { useState } from "react";
import { Outfit } from "next/font/google";
import { Search, Clock, MessageCircle, Mic, Send } from "lucide-react";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "700"], // choose the weights you need
});

export default function ChatPage() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  const handleSend = () => {
    if (!message.trim()) return;
    setMessages([...messages, message]); // add new message
    setMessage(""); // clear input
  };

  const handleNewChat = () => {
    setMessages([]); // clear messages
    setMessage(""); // clear input
  };

  return (
    <div className={`flex h-screen bg-[#121212] ${outfit.className}`}>
      {/* Sidebar */}
      <aside className="w-64 bg-[#647E6D] flex flex-col p-6">
        <h1 className="text-2xl text-[#CDE9D6] mb-10">TakeUrTime</h1>

        <nav className="flex flex-col gap-4 text-black ml-3 mt-20">
          <button
            className="flex items-center gap-3 text-lg hover:text-white"
            onClick={handleNewChat}
          >
            <MessageCircle className="w-5 h-5" />
            New Chat
          </button>
          <button className="flex items-center gap-3 text-lg hover:text-white">
            <Search className="w-5 h-5" />
            Search
          </button>
          <button className="flex items-center gap-3 text-lg hover:text-white">
            <Clock className="w-5 h-5" />
            History
          </button>
        </nav>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 bg-[#DAF1DE] flex flex-col relative">
        {/* Greeting or Chat */}
        <div className="flex-1 p-10 overflow-y-auto">
          {messages.length === 0 ? (
            // Initial Greeting
            <div className="mt-40">
              <p className="text-5xl text-gray-700">Hi User,</p>
              <h2 className="text-8xl text-black mt-2">Whats Happening?</h2>
            </div>
          ) : (
            // Chat conversation
            <div className="flex flex-col gap-4">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className="self-end bg-[#1B4D3E] text-white px-4 py-2 rounded-2xl max-w-lg"
                >
                  {msg}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="absolute bottom-8 w-full flex justify-center px-8">
          <div className="w-full max-w-6xl flex items-center bg-[#8BA89A] text-gray-700 rounded-full px-5 py-4 shadow-md">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Feeling stressed? Let’s talk."
              className="flex-1 bg-transparent outline-none placeholder-gray-700 text-black"
            />
            {message.trim() ? (
              <Send
                className="w-6 h-6 text-black cursor-pointer"
                onClick={handleSend}
              />
            ) : (
              <Mic className="w-6 h-6 text-black cursor-pointer" />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
