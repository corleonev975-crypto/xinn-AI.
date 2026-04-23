import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'XINN AI',
  description: 'XINN AI chat interface with Groq API',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
