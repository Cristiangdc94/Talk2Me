"use client";

// 1. FORZAR MODO DINÁMICO (Evita errores de construcción)
export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";

// --- IMPORTANTE: Si tenías un componente de Chat, impórtalo aquí ---
// Por ejemplo: import Chat from "@/components/chat";
// Si no recuerdas cuál era, no te preocupes, abajo te dejo un hueco para él.

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Escuchamos a Firebase
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        // SI NO HAY USUARIO -> Al Login
        console.log("No hay usuario, redirigiendo a login...");
        router.push("/login");
      } else {
        // SI HAY USUARIO -> Guardamos y mostramos la app
        console.log("Usuario detectado:", currentUser.email);
        setUser(currentUser);
        setLoading(false);
      }
    });

    // Limpieza al salir
    return () => unsubscribe();
  }, [router]);

  // --- 1. PANTALLA DE CARGA (Centrada y bonita) ---
  if (loading) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-gray-900 text-white">
        <div className="flex flex-col items-center gap-4">
          {/* Un spinner sencillo */}
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-500"></div>
          <p className="animate-pulse text-lg font-medium">Cargando Talk2Me...</p>
        </div>
      </div>
    );
  }

  // --- 2. PANTALLA PRINCIPAL (Cuando ya ha cargado) ---
  return (
    <div className="flex h-full flex-col text-white">
      {/* AQUÍ es donde debe ir tu componente de Chat original.
          Como lo borramos sin querer, he puesto este mensaje temporal.

          Si tienes el archivo del chat (ej: components/Chat.tsx),
          impórtalo arriba y pon <Chat /> aquí en vez de este <div>.
      */}

      <div className="flex h-full flex-col items-center justify-center p-8 text-center">
        <h1 className="mb-4 text-3xl font-bold">¡Hola de nuevo! 👋</h1>
        <p className="text-xl text-gray-300">
          Has iniciado sesión como: <span className="text-blue-400 font-bold">{user?.email}</span>
        </p>
        <p className="mt-4 text-gray-500">
          (Aquí debería aparecer tu panel de Noticias/General)
        </p>
      </div>

    </div>
  );
}