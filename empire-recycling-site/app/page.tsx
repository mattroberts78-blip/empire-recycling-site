import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="w-full">
        <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="Empire Recycling of Alabama" width={260} height={80} priority />
          </div>
          <nav>
            <Link href="/admin" className="header-link">Admin</Link>
          </nav>
        </div>
      </header>

      {/* Center content */}
      <section className="flex-1">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <div className="flex flex-col items-center justify-center pt-8 pb-16">
            <div className="w-full max-w-xl space-y-6">
              <Link href="/login" className="primary-btn text-center">User Login</Link>
              <Link href="/register" className="primary-btn text-center">New User Registration</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-gray-200/80">
        <div className="mx-auto max-w-6xl px-6 py-6 text-sm text-gray-600 flex flex-col md:flex-row items-center justify-between gap-3">
          <nav className="space-x-6">
            <Link href="/about" className="header-link">About Us</Link>
            <Link href="/contact" className="header-link">Contact Us</Link>
            <Link href="/privacy" className="header-link">Privacy Policy</Link>
            <Link href="/terms" className="header-link">Terms of Use</Link>
          </nav>
          <div>© 2025 Empire Recycling of Alabama</div>
        </div>
      </footer>
    </main>
  );
}
