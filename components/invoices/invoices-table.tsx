import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Invoice, InvoiceItem } from "@/types/invoice";

function formatAmount(value: number | null) {
  if (value === null || Number.isNaN(value)) return "—";
  return new Intl.NumberFormat("ar-SA", {
    style: "currency",
    currency: "SAR",
    maximumFractionDigits: 2,
  }).format(value);
}

function formatDate(value: string | null) {
  if (!value) return "—";
  return new Intl.DateTimeFormat("ar-SA", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(value));
}

function statusLabel(status: Invoice["status"]) {
  switch (status) {
    case "completed":
      return "مكتمل";
    case "processing":
      return "قيد المعالجة";
    case "failed":
      return "فشل";
    default:
      return status;
  }
}

function itemsSummary(items: InvoiceItem[]) {
  if (!items?.length) return "—";
  const names = items
    .map((item) => item.name)
    .filter(Boolean)
    .slice(0, 3);
  const extra = items.length > 3 ? ` +${items.length - 3}` : "";
  return `${names.join("، ")}${extra}`;
}

export function InvoicesTable({ invoices }: { invoices: Invoice[] }) {
  if (!invoices.length) {
    return (
      <div className="rounded-xl border border-dashed border-border px-6 py-16 text-center">
        <p className="font-heading text-lg font-semibold">لا توجد فواتير بعد</p>
        <p className="mt-2 text-sm text-muted-foreground">
          ارفع أول فاتورة من صفحة الرفع ليظهر التحليل هنا.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>المورد</TableHead>
            <TableHead>التاريخ</TableHead>
            <TableHead>الإجمالي</TableHead>
            <TableHead>البنود</TableHead>
            <TableHead>الملف</TableHead>
            <TableHead>الحالة</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell className="font-medium">
                {invoice.supplier_name || "—"}
              </TableCell>
              <TableCell>{formatDate(invoice.invoice_date)}</TableCell>
              <TableCell dir="ltr" className="text-start">
                {formatAmount(
                  invoice.total_amount === null
                    ? null
                    : Number(invoice.total_amount)
                )}
              </TableCell>
              <TableCell className="max-w-[240px] truncate text-muted-foreground">
                {itemsSummary(invoice.items ?? [])}
              </TableCell>
              <TableCell className="max-w-[160px] truncate text-muted-foreground">
                {invoice.file_name}
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    invoice.status === "completed"
                      ? "default"
                      : invoice.status === "failed"
                        ? "destructive"
                        : "secondary"
                  }
                >
                  {statusLabel(invoice.status)}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
