// src/components/layout/ClientSidebar.tsx
"use client";

import { Sidebar } from './Sidebar';

interface ClientSidebarProps {
  user: {
    name: string;
    role: 'admin' | 'organization';
    image?: string;
  };
}

export function ClientSidebar({ user }: ClientSidebarProps) {
  const handleLogout = () => {
    // Implement logout logic
    console.log('Logging out...');
  };

  return <Sidebar user={user} onLogout={handleLogout} />;
}