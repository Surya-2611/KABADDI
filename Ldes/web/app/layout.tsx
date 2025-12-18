import './globals.css';
import React from 'react';

export const metadata = {
  title: 'Learning Path Dashboard',
  description: 'AI-powered education platform',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-onyx-900 text-onyx-text-primary min-h-screen">
        {children}
      </body>
    </html>
  );
}


