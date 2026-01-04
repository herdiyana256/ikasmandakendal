
import BeritaForm from "@/components/admin/BeritaForm";

export default function AlumniCreateArtikelPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Tulis Artikel Baru</h1>
            {/* Pass isAdmin={false} explicitly, though default is false */}
            <BeritaForm isAdmin={false} />
        </div>
    );
}
