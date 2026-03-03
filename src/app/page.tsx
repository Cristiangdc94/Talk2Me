"use client";

// 1. Configuración para evitar errores de compilación con Firebase
export const dynamic = "force-dynamic";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";
// Importamos tu componente que ya tiene el diseño de las tarjetas
import { NewsPortal } from "@/components/news/news-portal";

export default function Home() {
  const router = useRouter();

  // 2. Comprobación de seguridad en segundo plano
  // Si no hay usuario, redirige al login, pero mientras tanto muestra la interfaz
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login");
      }
    });
    return () => unsubscribe();
  }, [router]);

  // 3. Renderizado directo (sin pantallas de carga que bloqueen)
  // Usamos view="general" para que NewsPortal sepa qué noticias mostrar
  return (
    <div className="p-4 sm:p-6 h-full">
      <NewsPortal view="general" />
    </div>
  );
}
