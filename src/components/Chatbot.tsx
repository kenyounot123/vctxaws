"use client";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Message } from "@/types/messages";

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm your VALORANT esports team assistant. How can I help you with player scouting and recruitment today?",
    },
  ]);
  const [messageInput, setMessageInput] = useState<string>("");
  const messagesEndRef = useRef(null)

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    setTimeout(() => {
      (messagesEndRef.current as HTMLElement | null)?.scrollIntoView({
        behavior: "smooth",
        block: 'nearest',
      });
    }, 100);
  }

  const handleSend = async () => {
    if (messageInput.trim() === "") return;
    setMessageInput("");
    const newMessages:Message[] = [
      ...messages,
      {
        role: "user",
        content: messageInput,
      },
      {
        role: "assistant",
        content: "",
      },
    ];
    // get the latest message to handle agents's response
    const lastMessageIndex = newMessages.length - 1
    setMessages(newMessages);

    // when user sends a message it should send some POST request to
    // an api endpoint and this should handle the chatting to bedrock agent 
    // then update client with the agent's response and what not 

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify([
          ...messages,
          {
            role: "user",
            content: messageInput,
          },
        ]),
      })
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const botResponse = await response.json()

      setMessages((prevMessages) => {
        // Get a copy of prev messages array and store it in updatedMessages
        const updatedMessages = [...prevMessages];
        // access the last message and update its content with the bot response
        updatedMessages[lastMessageIndex] = {
          ...updatedMessages[lastMessageIndex],
          content: updatedMessages[lastMessageIndex].content + `${botResponse}`,
        };
        return updatedMessages;
      });
    } catch (error) {
      console.log('Message sent failed', error)
    }
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
        <div ref={messagesEndRef}></div>
      </ScrollArea>
      <div className="flex gap-2 p-4 bg-[#1F2933]">
        <Input
          type="text"
          placeholder="Ask about VALORANT players..."
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
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
