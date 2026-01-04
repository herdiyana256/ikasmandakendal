
import AlumniSidebar from '@/components/alumni/AlumniSidebar';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function AlumniLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/api/auth/signin');

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <AlumniSidebar />

      {/* Main Content Area */}
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
          
          {/* Header Bar */}
          <header className="bg-white shadow-sm border-b sticky top-0 z-40">
              <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-700 capitalize">
                      Hi, {session.user?.name || (session.user as any).username} 👋
                  </h2>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>{session.user?.email}</span>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-bold uppercase">{(session.user as any).role}</span>
                  </div>
              </div>
          </header>

          <main className="flex-1 p-8">
            {children}
          </main>
      </div>
    </div>
  );
}
