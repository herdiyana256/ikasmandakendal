import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { FaUsers, FaNewspaper, FaCalendarAlt } from "react-icons/fa";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/masuk");
  }

  const role = (session.user as any).role;

  if (['admin', 'IT'].includes(role)) {
      redirect("/admin");
  } else if (role === 'alumni') {
      redirect("/alumni");
  } else {
      redirect("/");
  }
}
