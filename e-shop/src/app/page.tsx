export default function HomePage() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-blue-950 text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to E-Shop 🛒</h1>
        <p className="text-lg mb-6">Your one-stop shop for all products.</p>
        <a
          href="/login"
          className="bg-white text-blue-950 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
        >
          Go to Login
        </a>
      </div>
    </main>
  )
}
