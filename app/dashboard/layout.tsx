import { DashboardShell } from "@/components/layout/dashboard-shell";
import { isAdminUser } from "@/lib/admin";
import { requireUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireUser();
  const isAdmin = await isAdminUser(user);

  return (
    <DashboardShell email={user.email} isAdmin={isAdmin}>
      {children}
    </DashboardShell>
  );
}
