import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Empire Recycling of Alabama",
  description: "Secure partner portal",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-brushed-metal text-gray-800 min-h-screen`}>
        {/* Page content */}
        {children}

        {/* Global Logout / Home button (appears on*


