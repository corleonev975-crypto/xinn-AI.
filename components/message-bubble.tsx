"use client";

import { Copy } from "lucide-react";
import { XinnAvatar } from "@/components/avatar";
import type { ChatMessage } from "@/lib/types";

function renderAssistantContent(content: string) {
  const hasDemo = content.includes("npx create-next-app@latest xinn-website");

  if (!hasDemo) {
    return <div className="message-text">{content}</div>;
  }

  return (
    <div className="message-text">
      <p>Berikut langkah membuat website simpel dengan Next.js dan Tailwind CSS:</p>

      <p><strong>1. Buat Project Next.js</strong></p>
      <CodeBlock
        label="bash"
        code={`npx create-next-app@latest xinn-website\ncd xinn-website\nnpm run dev`}
      />

      <p><strong>2. Install Tailwind CSS</strong></p>
      <CodeBlock
        label="bash"
        code={`npm install -D tailwindcss postcss autoprefixer\nnpx tailwindcss init -p`}
      />

      <p><strong>3. Konfigurasi tailwind.config.js</strong></p>
      <CodeBlock
        label="js"
        code={`module.exports = {\n  content: ["./pages/**/*.{js,ts,jsx,tsx}",\n    "./components/**/*.{js,ts,jsx,tsx}"],\n  theme: { extend: {} },\n  plugins: [],\n}`}
      />

      <p><strong>4. Import Tailwind di globals.css</strong></p>
      <CodeBlock label="css" code={`@tailwind base;\n@tailwind components;\n@tailwind utilities;`} />

      <p><strong>5. Jalankan Project</strong></p>
      <CodeBlock label="bash" code={`npm run dev`} />

      <p>Website kamu akan berjalan di <span className="cyan">http://localhost:3000</span> 🚀</p>
    </div>
  );
}

function CodeBlock({ label, code }: { label: string; code: string }) {
  return (
    <div className="code-block">
      <div className="code-head">
        <span>{label}</span>
        <button className="code-copy" type="button">
          <Copy size={14} />
        </button>
      </div>
      <div className="code-body">
        <pre>{code}</pre>
      </div>
    </div>
  );
}

export function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";

  return (
    <div className={`message-row ${isUser ? "user" : "assistant"}`}>
      {!isUser ? (
        <div className="message-avatar">
          <XinnAvatar size={46} />
        </div>
      ) : null}
      <div className={`message-bubble ${isUser ? "user" : "ai"}`}>
        {isUser ? <div className="message-text">{message.content}</div> : renderAssistantContent(message.content)}
      </div>
    </div>
  );
}
