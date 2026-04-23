"use client";

import { useState, useRef, useEffect } from "react";
import Sidebar from "@/components/sidebar";
import ChatInput from "@/components/chat-input";
import MessageBubble, { type ChatMessage } from "@/components/message-bubble";
import XinnAvatar from "@/components/xinn-avatar";

export default function Page() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "user", content: "Cara membuat website simpel dengan Next.js dan Tailwind CSS" },
    {
      role: "assistant",
      content:
        "Berikut langkah membuat website simpel dengan Next.js:\n\n1. Install Node.js\n2. npx create-next-app\n3. npm run dev\n\nWebsite kamu akan jalan di http://localhost:3000",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage(text: string) {
    const next = [...messages, { role: "user", content: text }];
    setMessages(next);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();

      setMessages([
        ...next,
        {
          role: "assistant",
          content: data?.choices?.[0]?.message?.content || "Error AI",
        },
      ]);
    } catch {
      setMessages([...next, { role: "assistant", content: "Terjadi error" }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <Sidebar />

      <main className="main">
        {/* HEADER */}
        <div className="header">
          <div className="header-left">
            <XinnAvatar />
            <h2>XINN AI</h2>
          </div>
          <button
            className="toggle"
            onClick={() =>
              document.body.classList.toggle("light")
            }
          >
            🌙
          </button>
        </div>

        {/* CHAT */}
        <div className="chat">
          {messages.map((m, i) => (
            <div key={i} className={`message ${m.role}`}>
              {m.role === "assistant" && <XinnAvatar />}
              <MessageBubble message={m} />
            </div>
          ))}

          {loading && (
            <div className="message assistant">
              <XinnAvatar />
              <div className="bubble">Mengetik...</div>
            </div>
          )}

          <div ref={endRef} />
        </div>

        {/* INPUT */}
        <ChatInput onSend={sendMessage} />
      </main>
    </div>
  );
                                               }
