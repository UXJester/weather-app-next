import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "What's the Weather Willis?!?",
  description: 'Weather application built with Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="container mx-auto px-4 py-8">{children}</div>
      </body>
    </html>
  );
}
