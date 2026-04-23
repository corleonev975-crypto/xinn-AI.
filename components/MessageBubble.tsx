import XinnAvatar from '@/components/XinnAvatar';

export type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

function formatContent(content: string) {
  const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = codeBlockRegex.exec(content)) !== null) {
    if (match.index > lastIndex) {
      parts.push(
        <p key={`text-${lastIndex}`} className="message-text">
          {content.slice(lastIndex, match.index)}
        </p>
      );
    }

    parts.push(
      <div key={`code-${match.index}`} className="code-block">
        <div className="code-block-top">
          <span>{match[1] || 'code'}</span>
          <button type="button">Salin</button>
        </div>
        <pre>
          <code>{match[2].trim()}</code>
        </pre>
      </div>
    );

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < content.length) {
    parts.push(
      <p key={`text-final`} className="message-text">
        {content.slice(lastIndex)}
      </p>
    );
  }

  return parts.length ? parts : <p className="message-text">{content}</p>;
}

export default function MessageBubble({ message }: { message: ChatMessage }) {
  if (message.role === 'user') {
    return (
      <div className="message-row user-row">
        <div className="message-bubble user-bubble">
          <div className="message-text">{message.content}</div>
          <span className="message-time">10:30 ✓✓</span>
        </div>
      </div>
    );
  }

  return (
    <div className="message-row assistant-row">
      <XinnAvatar size={48} />
      <div className="message-bubble assistant-bubble">{formatContent(message.content)}</div>
    </div>
  );
}
