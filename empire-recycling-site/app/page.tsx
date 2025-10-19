import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="w-full">
        <div className="mx-auto max-w-6xl flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5">
          <div className="flex items-center gap-3">
            {/* Responsive logo size */}
            <Image
              src="/logo.png"
              alt="Empire Recycling of Alabama"
              width={200}   // mobile
              height={62}
              priority
              className="h-auto w-[180px] sm:w-[220px] md:w-[260px]"
            />
          </div>
          <nav>
            <Link href="/admin" className="header-link text-sm sm:text-base py-2 px-2 sm:px-3 rounded-md">
              Admin
            </Link>
          </nav>
        </div>
      </header>

      {/* Center content */}
      <section className="flex-1 flex items-center">
        <div className="mx-auto max-w-6xl w-full px-4 sm:px-6">
          <div className="flex flex-col items-center justify-center py-10 sm:py-14 md:py-16">
            <div className="w-full max-w-md sm:max-w-xl space-y-4 sm:space-y-5">
              <Link href="/login" className="primary-btn mx-auto text-center">
                User Login
              </Link>
              <Link href="/register" className="primary-btn mx-auto text-center">
                New User Registration
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-gray-200/80">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-5 text-sm text-gray-600 flex flex-col items-center gap-3">
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <Link href="/about" className="header-link">About Us</Link>
            <Link href="/contact" className="header-link">Contact Us</Link>
            <Link href="/privacy" className="header-link">Privacy Policy</Link>
            <Link href="/terms" className="header-link">Terms of Use</Link>
          </nav>
          <div className="text-center">© 2025 Empire Recycling of Alabama</div>
        </div>
      </footer>
    </main>
  );
}
