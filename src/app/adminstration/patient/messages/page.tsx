"use client";

import React, { useState } from "react";
import { Send, Search, Paperclip, MoreVertical } from "lucide-react";

const conversations = [
  { id: 1, doctor: "Dr. Sarah Smith", lastMessage: "Your test results are ready", time: "10:30 AM", unread: 2, avatar: "SS" },
  { id: 2, doctor: "Dr. John Johnson", lastMessage: "Please take the medication as prescribed", time: "Yesterday", unread: 0, avatar: "JJ" },
  { id: 3, doctor: "Dr. Emily Davis", lastMessage: "Follow-up appointment scheduled", time: "2 days ago", unread: 1, avatar: "ED" },
  { id: 4, doctor: "Dr. Michael Brown", lastMessage: "Thank you for visiting", time: "1 week ago", unread: 0, avatar: "MB" },
];

const messages = [
  { id: 1, sender: "doctor", text: "Hello! How are you feeling today?", time: "10:15 AM" },
  { id: 2, sender: "patient", text: "Much better, thank you doctor!", time: "10:20 AM" },
  { id: 3, sender: "doctor", text: "That's great to hear. Your test results are ready.", time: "10:30 AM" },
  { id: 4, sender: "doctor", text: "Everything looks normal. Continue with your current medication.", time: "10:30 AM" },
];

export default function PatientMessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [messageText, setMessageText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSendMessage = () => {
    if (messageText.trim()) {
      alert(`Message sent: ${messageText}`);
      setMessageText("");
    }
  };

  const filteredConversations = conversations.filter((conv) =>
    conv.doctor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      <div className="bg-white border-b px-8 py-4">
        <h1 className="text-2xl font-bold text-gray-800">Messages</h1>
        <p className="text-gray-600 text-sm">Communicate with your healthcare providers</p>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Conversations List */}
        <div className="w-80 bg-white border-r flex flex-col">
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a3fac]"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {filteredConversations.map((conv) => (
              <div
                key={conv.id}
                onClick={() => setSelectedConversation(conv)}
                className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition ${
                  selectedConversation.id === conv.id ? "bg-purple-50" : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#1a3fac] to-[#1a3fac] rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    {conv.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-800 truncate">{conv.doctor}</h3>
                      <span className="text-xs text-gray-500">{conv.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 truncate mt-1">{conv.lastMessage}</p>
                  </div>
                  {conv.unread > 0 && (
                    <div className="w-5 h-5 bg-[#1a3fac] rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {conv.unread}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-gray-50">
          {/* Chat Header */}
          <div className="bg-white border-b px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#1a3fac] to-[#1a3fac] rounded-full flex items-center justify-center text-white font-bold">
                {selectedConversation.avatar}
              </div>
              <div>
                <h2 className="font-semibold text-gray-800">{selectedConversation.doctor}</h2>
                <p className="text-xs text-green-600">Online</p>
              </div>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition">
              <MoreVertical className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "patient" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-md px-4 py-3 rounded-2xl ${
                    msg.sender === "patient"
                      ? "bg-[#1a3fac] text-white"
                      : "bg-white text-gray-800 shadow-sm"
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                  <p
                    className={`text-xs mt-1 ${
                      msg.sender === "patient" ? "text-[#1a3fac]" : "text-gray-500"
                    }`}
                  >
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="bg-white border-t px-6 py-4">
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                <Paperclip className="w-5 h-5 text-gray-600" />
              </button>
              <input
                type="text"
                placeholder="Type your message..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a3fac]"
              />
              <button
                onClick={handleSendMessage}
                className="px-4 py-2 bg-[#1a3fac] hover:bg-[#1a3fac] text-white rounded-lg flex items-center gap-2 transition"
              >
                <Send className="w-4 h-4" />
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
