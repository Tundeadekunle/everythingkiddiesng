import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headerList = await headers();
  const pathname = headerList.get("x-pathname") || "";

  // The login and signup pages render standalone without sidebar
  const user = await getCurrentUser();

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-slate-100 w-full max-w-full overflow-x-clip">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0 w-full max-w-full overflow-x-clip lg:overflow-y-auto">
        <main className="flex-1 p-2.5 sm:p-6 lg:p-8 w-full max-w-full min-w-0 overflow-x-clip">{children}</main>
      </div>
    </div>
  );

}
