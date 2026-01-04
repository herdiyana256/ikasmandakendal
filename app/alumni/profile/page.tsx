
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/db";
import User from "@/models/User";
import AlumniProfileClient from "./AlumniProfileClient";

export default async function AlumniProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session) return null;

  await connectDB();
  const userData = await User.findOne({ email: session.user?.email }).lean();

  if (!userData) return <div>User not found</div>;

  // Serialize object for client component
  const user = JSON.parse(JSON.stringify(userData));

  return <AlumniProfileClient initialUser={user} />;
}
