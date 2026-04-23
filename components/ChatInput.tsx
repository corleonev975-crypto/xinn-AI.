"use client";

import { useState } from "react";

export default function ChatInput({ onSend }: any) {
  const [input, setInput] = useState("");

  function handleSend() {
    if (!input.trim()) return;
    onSend(input);
    setInput("");
  }

  return (
    <div className="input-box">
      {/* tombol kiri */}
      <button className="icon-btn">＋</button>

      {/* input */}
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ketik pesan kamu..."
      />

      {/* tombol kanan */}
      <button className="send-btn" onClick={handleSend}>
        ↑
      </button>
    </div>
  );
      }
