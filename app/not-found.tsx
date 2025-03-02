import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-6">Page Not Found</h2>
      <p className="mb-8 max-w-md">The page you are looking for doesn't exist or has been moved.</p>
      <Link href="/" className="bg-primary hover:bg-[#774936] text-white px-6 py-3 rounded-md">
        Return Home
      </Link>
    </div>
  )
}

