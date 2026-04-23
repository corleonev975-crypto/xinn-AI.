import XinnAvatar from '@/components/XinnAvatar';

const chats = [
  'Cara membuat website...',
  'Ide bisnis digital 2024',
  'Script login Next.js',
  'Bantu debug error',
  'Cara menghasilkan uang...',
  'Database untuk pemula',
  'Deploy website ke Vercel',
];

export default function Sidebar() {
  return (
    <aside className="sidebar glass-panel">
      <div className="sidebar-top">
        <div className="brand-block">
          <XinnAvatar size={78} />
          <div>
            <h1>XINN AI</h1>
          </div>
        </div>

        <button className="new-chat-button" type="button">
          <span>＋</span>
          <span>New Chat</span>
        </button>
      </div>

      <div className="chat-list-wrap">
        <p className="section-label">Chat Terbaru</p>
        <div className="chat-list">
          {chats.map((chat, index) => (
            <button key={chat} className={`chat-item ${index === 0 ? 'active' : ''}`} type="button">
              <span className="chat-bullet">◔</span>
              <span className="chat-text">{chat}</span>
              <span className="chat-meta">{index === 0 ? '10:30' : index === 1 ? 'Kemarin' : `${index} hari lalu`}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="sidebar-footer-links">
        <button type="button">Riwayat</button>
        <button type="button">Pengaturan</button>
        <button type="button">Bantuan</button>
        <button type="button">Keluar</button>
      </div>

      <div className="profile-mini glass-card">
        <XinnAvatar size={42} />
        <div>
          <strong>XINN AI</strong>
          <span>
            <i className="online-dot" /> Online
          </span>
        </div>
      </div>
    </aside>
  );
}
