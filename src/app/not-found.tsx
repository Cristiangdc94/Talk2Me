import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 text-white text-center p-6">
      <h2 className="text-6xl font-bold text-blue-500 mb-4">404</h2>
      <p className="text-xl text-zinc-400 mb-8">¡Ups! Parece que esta página no existe en Talk2Me.</p>
      <Link href="/" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-bold transition">
        Volver al inicio
      </Link>
    </div>
  );
}