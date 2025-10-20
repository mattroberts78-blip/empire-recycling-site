import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Empire Recycling of Alabama",
  description: "Secure portal for Empire Recycling of Alabama",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Main page content */}
        {children}

        {/* Global Logout / Home button */}
        <Link
          href="/"
          aria-label="Logout / Return to Homepage"
          className="fixed bottom-4 right-4 z-50 rounded-full bg-white/90 backdrop-blur border border-gray-300 shadow-soft px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-white"
        >
          Logout / Home
        </Link>
      </body>
    </html>
  );
}
