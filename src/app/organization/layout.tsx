// src/app/organization/layout.tsx
import { ClientSidebar } from "../components/layout/ClientSidebar";

export default function OrganizationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <div className="flex">
        <ClientSidebar 
          user={{
            name: "Organization Name",
            role: "organization",
            image: "/org-avatar.jpg"
          }}
        />
        <main className="flex-1 overflow-x-hidden bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}