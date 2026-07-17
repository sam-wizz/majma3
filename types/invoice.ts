export type InvoiceStatus = "processing" | "completed" | "failed";

export interface InvoiceItem {
  name: string;
  quantity?: number | null;
  unitPrice?: number | null;
  totalPrice?: number | null;
}

export interface InvoiceExtraction {
  invoiceDate: string | null;
  totalAmount: number | null;
  supplierName: string | null;
  items: InvoiceItem[];
}

export interface Invoice {
  id: string;
  user_id: string;
  file_path: string;
  file_name: string;
  invoice_date: string | null;
  total_amount: number | null;
  supplier_name: string | null;
  items: InvoiceItem[];
  status: InvoiceStatus;
  error_message: string | null;
  created_at: string;
  updated_at: string;
}

export type ActionResult =
  | { success: true; message?: string; invoiceId?: string }
  | { success: false; error: string };
