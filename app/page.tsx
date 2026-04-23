"use client";

import { useState } from "react";
import Sidebar from "@/components/sidebar";
import ChatInput from "@/components/chat-input";

export default function Page() {
  const [messages, setMessages] = useState<any[]>([]);

  async function sendMessage(text: string) {
    const newMessages = [...messages, { role: "user", content: text }];
    setMessages(newMessages);

    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ messages: newMessages }),
    });

    const data = await res.json();

    setMessages([
      ...newMessages,
      {
        role: "assistant",
        content: data?.choices?.[0]?.message?.content || "Error AI",
      },
    ]);
  }

  return (
    <div className="container">
      <Sidebar />

      <main className="main">
        <div className="chat">
          {messages.map((m, i) => (
            <div key={i} className={`message ${m.role}`}>
              <div className="bubble">{m.content}</div>
            </div>
          ))}
        </div>

        <ChatInput onSend={sendMessage} />
      </main>
    </div>
  );
}
