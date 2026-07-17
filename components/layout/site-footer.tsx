import Link from "next/link";

import { APP_NAME } from "@/lib/constants";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-navy text-white/70">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-heading text-lg font-extrabold text-white">
            {APP_NAME}
          </p>
          <p className="mt-1 text-sm">
            © {new Date().getFullYear()} {APP_NAME}. جميع الحقوق محفوظة.
          </p>
        </div>
        <div className="flex flex-wrap gap-5 text-sm">
          <Link href="/privacy" className="hover:text-white">
            الخصوصية
          </Link>
          <Link href="/login" className="hover:text-white">
            الدخول
          </Link>
          <Link href="/signup" className="hover:text-white">
            إنشاء حساب
          </Link>
        </div>
      </div>
    </footer>
  );
}
