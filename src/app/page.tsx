"use client";

// 1. Evitamos errores de construcción en Vercel
export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";
// Importamos TU componente de diseño original
import { NewsPortal } from "@/components/news/news-portal";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  // --- LÓGICA DE SEGURIDAD (Protección de ruta) ---
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        // Si no está logueado, lo mandamos al login
        router.push("/login");
      } else {
        // Si está logueado, quitamos el cargando y mostramos la web
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [router]);

  // --- PANTALLA DE CARGA ---
  if (loading) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-zinc-950 text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-700 border-t-blue-500"></div>
          <p className="animate-pulse text-sm font-medium text-zinc-400">Cargando Talk2Me...</p>
        </div>
      </div>
    );
  }

  // --- VISTA GENERAL (Usando tu diseño original) ---
  // Usamos el mismo padding que en CompanyNewsPage
  return (
    <div className="p-4 sm:p-6 h-full">
      {/* Aquí está la magia:
         view="general" cargará automáticamente "Lo nuevo entre tus amigos"
         y las "Noticias Generales" que ya tienes programadas.
      */}
      <NewsPortal view="general" />
    </div>
  );
}