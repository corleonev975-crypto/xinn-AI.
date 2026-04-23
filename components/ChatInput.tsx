'use client';

import { FormEvent, useState } from 'react';

export default function ChatInput({
  onSend,
  loading,
}: {
  onSend: (value: string) => Promise<void> | void;
  loading: boolean;
}) {
  const [value, setValue] = useState('');

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const trimmed = value.trim();
    if (!trimmed || loading) return;
    setValue('');
    await onSend(trimmed);
  };

  return (
    <form className="chat-input-wrap glass-panel" onSubmit={handleSubmit}>
      <div className="chat-input-toolbar">
        <button type="button" className="tool-circle" aria-label="Tambah fitur">
          +
        </button>
        <button type="button" className="tool-circle" aria-label="Internet mode">
          ◌
        </button>
      </div>

      <textarea
        rows={1}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="chat-textarea"
        placeholder="Ketik pesan kamu..."
      />

      <button type="submit" className="send-button" aria-label="Kirim" disabled={loading}>
        ↑
      </button>
    </form>
  );
}
