import React, { ReactNode } from 'react';
import '@/styles/globals.css';
import { NavContent } from '@/components/nav';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <main className="grid w-full grid-cols-1 gap-10 p-5">
      <NavContent />
      {children}
    </main>
  );
}