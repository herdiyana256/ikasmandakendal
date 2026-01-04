import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session || !['admin', 'IT'].includes((session.user as any).role)) {
    redirect('/masuk');
  }

  const userRole = (session.user as any).role;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Admin Sidebar (Client Component) */}
      <AdminSidebar userRole={userRole} />

      {/* Admin Content */}
      <main className="flex-1 p-6 lg:p-8 ml-0 lg:ml-64 transition-all duration-300">
        <div className="max-w-7xl mx-auto">
             {children}
        </div>
      </main>
    </div>
  );
}
