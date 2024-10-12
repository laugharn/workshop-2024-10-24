import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <main className="grid w-full grid-cols-1 gap-10 p-5">
      {children}
    </main>
  );
}