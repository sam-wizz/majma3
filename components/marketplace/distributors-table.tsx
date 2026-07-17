import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Distributor } from "@/types/marketplace";

export function DistributorsTable({
  distributors,
}: {
  distributors: Distributor[];
}) {
  if (!distributors.length) {
    return (
      <div className="rounded-xl border border-dashed border-border px-6 py-12 text-center text-sm text-muted-foreground">
        لا يوجد موزّعون بعد. أضف موزّعاً ليستلم الطلبات ويوصّلها.
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>الاسم</TableHead>
            <TableHead>الجوال</TableHead>
            <TableHead>المنطقة</TableHead>
            <TableHead>الحالة</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {distributors.map((distributor) => (
            <TableRow key={distributor.id}>
              <TableCell className="font-medium">{distributor.name}</TableCell>
              <TableCell dir="ltr" className="text-start">
                {distributor.phone || "—"}
              </TableCell>
              <TableCell>{distributor.area || "—"}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    distributor.status === "active" ? "default" : "secondary"
                  }
                >
                  {distributor.status === "active" ? "نشط" : "غير نشط"}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
