import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-white to-blue-50 px-6 text-center">
      <h1 className="text-7xl font-bold text-[#0A2E73]">404</h1>

      <h2 className="mt-4 text-3xl font-semibold">
        Page Not Found
      </h2>

      <p className="mt-4 max-w-md text-gray-600">
        Sorry, the page you are looking for doesn't exist or has been moved.
      </p>

      <Link
        href="/"
        className="mt-8 rounded-full bg-[#0A2E73] px-8 py-3 font-semibold text-white transition hover:bg-blue-900"
      >
        Back to Home
      </Link>
    </main>
  );
}