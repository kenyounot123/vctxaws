"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Chatbot() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hello! I'm your VALORANT esports team assistant. How can I help you with player scouting and recruitment today?",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (input.trim() === "") return;

    setMessages((prev) => [...prev, { role: "user", content: input }]);
    setInput("");

    // Simulated response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I'm processing your request about VALORANT esports players. Once integrated with Amazon Bedrock, I'll provide detailed insights based on the data sources provided.",
        },
      ]);
    }, 1000);
  };

  return (
    <div className="flex flex-col self-end h-full max-w-md mx-auto bg-[#0F1923]">
      <header className="bg-[#FF4655] text-white p-4">
        <h1 className="text-2xl font-bold">VALORANT Esports Assistant</h1>
      </header>
      <ScrollArea className="flex-grow p-4 my-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 ${
              message.role === "user" ? "text-right" : "text-left"
            }`}
          >
            <div
              className={`inline-block p-2 rounded-lg ${
                message.role === "user"
                  ? "bg-[#FF4655] text-white"
                  : "bg-[#1F2933] text-[#ECF0F3]"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
      </ScrollArea>
      <div className="flex gap-2 p-4 bg-[#1F2933]">
        <Input
          type="text"
          placeholder="Ask about VALORANT players..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
          className="bg-[#0F1923] text-white border-[#FF4655] placeholder-gray-400"
        />
        <Button
          onClick={handleSend}
          className="bg-[#FF4655] text-white hover:bg-[#FF6B76]"
        >
          Send
        </Button>
      </div>
    </div>
  );
}
