import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/db";
import Berita from "@/models/Berita";
import { redirect, notFound } from "next/navigation";
import BeritaForm from "@/components/admin/BeritaForm";

export default async function EditBeritaPage({ params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);
    if (!session || !['admin', 'IT'].includes((session.user as any).role)) {
        redirect('/admin');
    }

    await connectDB();
    const berita = await Berita.findById(params.id);

    if (!berita) {
        notFound();
    }

    // Convert to plain object
    const beritaData = {
        _id: berita._id.toString(),
        judul: berita.judul,
        konten: berita.konten,
        kategori: berita.kategori,
        gambar_url: berita.gambar_url || '',
        status: berita.status,
        tags: berita.tags || []
    };

    return (
        <div className="max-w-4xl mx-auto py-8">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Edit Berita</h1>
            <BeritaForm initialData={beritaData} isEdit={true} />
        </div>
    );
}
