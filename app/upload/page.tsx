import { UploadForm } from "@/components/invoices/upload-form";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { requireUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function UploadPage() {
  const user = await requireUser();

  return (
    <DashboardShell email={user.email}>
      <div className="mx-auto max-w-2xl space-y-6">
        <div>
          <h1 className="font-heading text-3xl font-semibold tracking-tight">
            رفع فاتورة
          </h1>
          <p className="mt-2 text-muted-foreground">
            ارفع صورة أو ملف PDF ليتم استخراج التاريخ والإجمالي والمورد والبنود
            تلقائياً وحفظها في قاعدة البيانات.
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-background/90 p-6 shadow-sm">
          <UploadForm />
        </div>
      </div>
    </DashboardShell>
  );
}
