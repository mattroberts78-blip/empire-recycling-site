import dynamic from "next/dynamic";

// Load the real UI on the client
const AdminUI = dynamic(() => import("./AdminUI"), { ssr: false });

export default function AdminPage() {
  return (
    <div className="min-h-[60vh]">
      <AdminUI />
      <div className="sr-only">Admin Dashboard — v1</div>
    </div>
  );
}
