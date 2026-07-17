"use client";

import { useState, useTransition } from "react";

import { updateDealStatus } from "@/app/actions/marketplace";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatSar } from "@/lib/marketplace";
import type { Deal, DealStatus } from "@/types/marketplace";

const statusLabel: Record<DealStatus, string> = {
  pending: "قيد الانتظار",
  assigned: "مُسند للموزّع",
  in_transit: "قيد التوصيل",
  delivered: "تم التسليم",
  cancelled: "ملغى",
};

export function DealsTable({ deals }: { deals: Deal[] }) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  if (!deals.length) {
    return (
      <div className="rounded-xl border border-dashed border-border px-6 py-16 text-center">
        <p className="font-heading text-lg font-semibold">لا توجد صفقات بعد</p>
        <p className="mt-2 text-sm text-muted-foreground">
          أنشئ طلبًا وأسنِده لموزّع موجود ليوصّله، وتُحتسب عمولة مد تلقائياً.
        </p>
      </div>
    );
  }

  function setStatus(dealId: string, status: DealStatus) {
    setError(null);
    startTransition(async () => {
      const result = await updateDealStatus(dealId, status);
      if (!result.success) {
        setError(result.error);
      }
    });
  }

  return (
    <div className="space-y-3">
      {error ? (
        <Alert variant="destructive">
          <AlertTitle>تعذر تحديث الحالة</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : null}

      <div className="rounded-xl border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>العميل</TableHead>
              <TableHead>الموزّع</TableHead>
              <TableHead>التوصيل</TableHead>
              <TableHead>قيمة الصفقة</TableHead>
              <TableHead>عمولة مد</TableHead>
              <TableHead>الحالة</TableHead>
              <TableHead>إجراء</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {deals.map((deal) => (
              <TableRow key={deal.id}>
                <TableCell>
                  <div className="font-medium">{deal.customer_name}</div>
                  {deal.customer_phone ? (
                    <div className="text-xs text-muted-foreground" dir="ltr">
                      {deal.customer_phone}
                    </div>
                  ) : null}
                </TableCell>
                <TableCell>{deal.distributor?.name ?? "—"}</TableCell>
                <TableCell className="max-w-[200px] truncate text-muted-foreground">
                  {deal.delivery_address}
                </TableCell>
                <TableCell dir="ltr" className="text-start">
                  {formatSar(Number(deal.amount))}
                </TableCell>
                <TableCell
                  dir="ltr"
                  className="text-start font-medium text-primary"
                >
                  {formatSar(Number(deal.commission_amount))}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      deal.status === "delivered"
                        ? "default"
                        : deal.status === "cancelled"
                          ? "destructive"
                          : "secondary"
                    }
                  >
                    {statusLabel[deal.status]}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {deal.status === "assigned" ? (
                      <Button
                        size="xs"
                        variant="outline"
                        disabled={pending}
                        onClick={() => setStatus(deal.id, "in_transit")}
                      >
                        بدء التوصيل
                      </Button>
                    ) : null}
                    {deal.status === "in_transit" ||
                    deal.status === "assigned" ? (
                      <Button
                        size="xs"
                        disabled={pending}
                        onClick={() => setStatus(deal.id, "delivered")}
                      >
                        تم التسليم
                      </Button>
                    ) : null}
                    {deal.status !== "delivered" &&
                    deal.status !== "cancelled" ? (
                      <Button
                        size="xs"
                        variant="ghost"
                        disabled={pending}
                        onClick={() => setStatus(deal.id, "cancelled")}
                      >
                        إلغاء
                      </Button>
                    ) : null}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
