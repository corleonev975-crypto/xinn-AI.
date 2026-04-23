"use client";

import { Globe, Menu, Moon, Plus, SendHorizontal, SunMedium } from "lucide-react";
import { useEffect, useRef } from "react";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  isLoading: boolean;
  error: string;
  isLight: boolean;
  onToggleTheme: () => void;
  onOpenMobileSidebar: () => void;
}

export function ChatInput(props: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = "0px";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 160)}px`;
  }, [props.value]);

  return (
    <>
      <div className="topbar">
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button className="icon-btn mobile-sidebar-toggle" onClick={props.onOpenMobileSidebar} aria-label="Buka menu">
            <Menu size={18} />
          </button>
          <div>
            <div className="topbar-title">XINN AI</div>
          </div>
        </div>

        <button className="icon-btn" onClick={props.onToggleTheme} aria-label="Ganti tema">
          {props.isLight ? <Moon size={18} /> : <SunMedium size={18} />}
        </button>
      </div>

      <div className="quick-actions">
        <div className="quick-chip">💡 Ide Bisnis</div>
        <div className="quick-chip">🐞 Debug Code</div>
        <div className="quick-chip">💻 Buat Website</div>
        <div className="quick-chip">📈 Strategi Cuan</div>
      </div>

      <div className="input-area-wrap">
        <div className="input-area">
          <div className="input-shell">
            <textarea
              ref={textareaRef}
              className="input-textarea"
              placeholder="Ketik pesan kamu..."
              value={props.value}
              onChange={(e) => props.onChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  props.onSend();
                }
              }}
            />
            <div className="input-controls">
              <div className="input-left">
                <button className="circle-btn" type="button" aria-label="Tambah">
                  <Plus size={18} />
                </button>
                <button className="circle-btn" type="button" aria-label="Mode internet">
                  <Globe size={18} />
                </button>
              </div>
              <div className="input-right">
                <button className="circle-btn send" type="button" onClick={props.onSend} disabled={props.isLoading} aria-label="Kirim">
                  <SendHorizontal size={18} />
                </button>
              </div>
            </div>
          </div>
          {props.error ? <div className="error-note">{props.error}</div> : null}
          <div className="helper-note">XINN AI dapat membuat kesalahan. Pastikan untuk memeriksa informasi penting.</div>
        </div>
      </div>
    </>
  );
}
