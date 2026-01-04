import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/db";
import User from "@/models/User";
import { redirect } from "next/navigation";
import UsersClient from "./UsersClient";

export const dynamic = 'force-dynamic';

export default async function UsersManagementPage() {
  const session = await getServerSession(authOptions);
  
  if (!session || (session.user as any).role !== 'IT') {
      redirect('/admin');
  }

  await connectDB();
  const users = await User.find({}).sort({ createdAt: -1 }).lean();

  // Serialization to basic JSON for Client Component
  const serializableUsers = users.map((u: any) => ({
      ...u,
      _id: u._id.toString(),
      createdAt: u.createdAt.toISOString(),
      updatedAt: u.updatedAt.toISOString(),
      tanggal_lahir: u.tanggal_lahir ? u.tanggal_lahir.toISOString() : null
  }));

  return <UsersClient initialUsers={serializableUsers} />;
}

