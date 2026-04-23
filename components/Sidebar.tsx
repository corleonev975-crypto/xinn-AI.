"use client";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <button className="new-chat">＋ New Chat</button>

      <div className="chat-list">
        <div className="chat-item">Cara membuat website...</div>
        <div className="chat-item">Ide bisnis digital</div>
        <div className="chat-item">Debug code</div>
      </div>
    </aside>
  );
}
