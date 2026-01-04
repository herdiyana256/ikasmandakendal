
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/db";
import Berita from "@/models/Berita";
import BeritaForm from "@/components/admin/BeritaForm";
import { redirect } from "next/navigation";

export default async function AlumniEditArtikelPage({ params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);
    if (!session) return null;

    await connectDB();
    const berita = await Berita.findById(params.id).lean();

    if (!berita) return <div>Artikel tidak ditemukan</div>;

    // Security Check: Only Owner can edit
    if (berita.penulis_id?.toString() !== (session.user as any).id) {
         return <div className="text-red-500">Anda tidak memiliki akses untuk mengedit artikel ini.</div>;
    }

    // Serialize
    const serializedBerita = {
        ...berita,
        _id: berita._id.toString(),
        penulis_id: berita.penulis_id ? berita.penulis_id.toString() : null,
        approved_by: berita.approved_by ? berita.approved_by.toString() : null,
        createdAt: berita.createdAt.toISOString(),
        updatedAt: berita.updatedAt.toISOString(),
        published_at: berita.published_at ? berita.published_at.toISOString() : null,
        approved_at: berita.approved_at ? berita.approved_at.toISOString() : null,
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Artikel</h1>
            <BeritaForm initialData={serializedBerita} isEdit={true} isAdmin={false} />
        </div>
    );
}
