"use client";

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export default function MessageBubble({ message }: { message: ChatMessage }) {
  return (
    <div className={`message ${message.role}`}>
      <div className="bubble">{message.content}</div>
    </div>
  );
}
