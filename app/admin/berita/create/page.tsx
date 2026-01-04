import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import BeritaForm from "@/components/admin/BeritaForm";

export default async function CreateBeritaPage() {
    const session = await getServerSession(authOptions);
    if (!session || !['admin', 'IT', 'alumni'].includes((session.user as any).role)) {
        redirect('/admin');
    }

    return (
        <div className="max-w-4xl mx-auto py-8">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Buat Berita / Artikel Baru</h1>
            <BeritaForm />
        </div>
    );
}
