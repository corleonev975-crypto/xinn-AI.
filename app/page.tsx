'use client';

import { useMemo, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import MessageBubble, { type ChatMessage } from '@/components/MessageBubble';
import ChatInput from '@/components/ChatInput';
import XinnAvatar from '@/components/XinnAvatar';

const starterAssistant = `Berikut langkah membuat website simpel dengan Next.js dan Tailwind CSS:\n\n1. Buat Project Next.js\n\n\`\`\`bash\nnpx create-next-app@latest xinn-website\ncd xinn-website\nnpm run dev\n\`\`\`\n\n2. Install Tailwind CSS\n\n\`\`\`bash\nnpm install -D tailwindcss postcss autoprefixer\nnpx tailwindcss init -p\n\`\`\`\n\n3. Konfigurasi tailwind.config.js\n\n\`\`\`js\nmodule.exports = {\n  content: [\"./pages/**/*.{js,ts,jsx,tsx}\",\n    \"./components/**/*.{js,ts,jsx,tsx}\"],\n  theme: { extend: {} },\n  plugins: [],\n}\n\`\`\`\n\n4. Import Tailwind di globals.css\n\n\`\`\`css\n@tailwind base;\n@tailwind components;\n@tailwind utilities;\n\`\`\`\n\n5. Jalankan Project\n\n\`\`\`bash\nnpm run dev\n\`\`\`\n\nWebsite kamu akan berjalan di http://localhost:3000 🚀`;

const quickActions = ['Ide Bisnis', 'Debug Code', 'Buat Website', 'Strategi Cuan'];

export default function HomePage() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'user',
      content: 'Cara membuat website simpel dengan Next.js dan Tailwind CSS',
    },
    {
      role: 'assistant',
      content: starterAssistant,
    },
  ]);

  const apiMessages = useMemo(
    () => messages.map((message) => ({ role: message.role, content: message.content })),
    [messages]
  );

  const sendMessage = async (value: string) => {
    const nextMessages: ChatMessage[] = [...messages, { role: 'user', content: value }];
    setMessages(nextMessages);
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...apiMessages, { role: 'user', content: value }] }),
      });

      const data = await response.json();

      const content =
        data?.choices?.[0]?.message?.content ||
        data?.error?.message ||
        'Maaf, belum ada balasan dari server.';

      setMessages([...nextMessages, { role: 'assistant', content }]);
    } catch {
      setMessages([
        ...nextMessages,
        {
          role: 'assistant',
          content: 'Koneksi ke API Groq gagal. Cek GROQ_API_KEY di .env.local lalu coba lagi.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={`app-shell ${theme}`}>
      <div className="mode-switcher">
        <button
          type="button"
          className={theme === 'dark' ? 'mode-pill active' : 'mode-pill'}
          onClick={() => setTheme('dark')}
        >
          🌙 Mode Gelap
        </button>
        <button
          type="button"
          className={theme === 'light' ? 'mode-pill active' : 'mode-pill'}
          onClick={() => setTheme('light')}
        >
          ☀️ Mode Terang
        </button>
      </div>

      <div className="workspace">
        <Sidebar />

        <section className="chat-panel glass-panel">
          <header className="chat-header">
            <div className="chat-header-left">
              <XinnAvatar size={34} />
              <div className="chat-title-wrap">
                <strong>XINN AI</strong>
                <span>⌄</span>
              </div>
            </div>
            <button
              type="button"
              className="theme-toggle-circle"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Ubah tema"
            >
              {theme === 'dark' ? '☾' : '☼'}
            </button>
          </header>

          <div className="conversation">
            {messages.map((message, index) => (
              <MessageBubble key={`${message.role}-${index}`} message={message} />
            ))}
            {loading ? (
              <div className="message-row assistant-row">
                <XinnAvatar size={48} />
                <div className="message-bubble assistant-bubble typing-bubble">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            ) : null}
          </div>

          <div className="quick-actions">
            {quickActions.map((item) => (
              <button key={item} type="button" className="quick-chip" onClick={() => void sendMessage(item)}>
                {item}
              </button>
            ))}
          </div>

          <ChatInput onSend={sendMessage} loading={loading} />

          <p className="bottom-note">XINN AI dapat membuat kesalahan. Pastikan untuk memeriksa informasi penting.</p>
        </section>
      </div>
    </main>
  );
}
