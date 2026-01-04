import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from '@/lib/db';
import Organization from "@/models/Organization";
import { redirect } from "next/navigation";
import OrganizationForm from "@/components/admin/OrganizationForm";

export const dynamic = 'force-dynamic';

export default async function AdminOrganisasiPage() {
    const session = await getServerSession(authOptions);
    if (!session || !['admin', 'IT'].includes((session.user as any).role)) {
        redirect('/admin');
    }

    await connectDB();
    let org = await Organization.findOne().lean();

    // Create default if not exists (handled in API too, but good for UI initial state)
    if (!org) {
        org = { visi: '', misi: [], sejarah: '', struktur_pengurus: [] };
    } else {
        org._id = (org as any)._id.toString();
        if ((org as any).updatedAt) (org as any).updatedAt = (org as any).updatedAt.toISOString();
        if ((org as any).createdAt) (org as any).createdAt = (org as any).createdAt.toISOString();
        if ((org as any).updated_by) (org as any).updated_by = (org as any).updated_by.toString();
        // Mongoose arrays might need spread if they are special objects, but .lean() handles most
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Manajemen Struktur Organisasi</h1>
            <OrganizationForm initialData={org} />
        </div>
    );
}
