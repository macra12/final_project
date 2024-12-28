// src/app/admin/layout.tsx
import { ClientSidebar } from "../components/layout/ClientSidebar";
import Picture from "../../images/admin.jpg";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <div className="flex">
        <ClientSidebar 
          user={{
            name: "Admin User",
            role: "admin",
            image: Picture
          }}
        />
        <main className="flex-1 overflow-x-hidden bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}