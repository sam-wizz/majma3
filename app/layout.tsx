import type { Metadata } from "next";
import { Figtree, Syne } from "next/font/google";

import { cn } from "@/lib/utils";
import { APP_DESCRIPTION, APP_NAME, APP_URL } from "@/lib/constants";

import "./globals.css";

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-sans",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: APP_NAME,
    template: `%s · ${APP_NAME}`,
  },
  description: APP_DESCRIPTION,
  applicationName: APP_NAME,
  openGraph: {
    title: APP_NAME,
    description: APP_DESCRIPTION,
    url: APP_URL,
    siteName: APP_NAME,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: APP_NAME,
    description: APP_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(figtree.variable, syne.variable, "font-sans antialiased")}
    >
      <body className="min-h-svh bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
