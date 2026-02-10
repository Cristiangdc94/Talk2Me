"use client"; // IMPORTANTE: Esto convierte el componente en interactivo

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase"; // Asegúrate de que esta ruta apunte a tu archivo firebase.js
// Si tu firebase.js está en src, la ruta sería "@/firebase" o "../firebase"

import { AppLayout } from "@/components/app-layout"; // O tu componente principal del chat

export const dynamic = "force-dynamic";
export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Escuchamos a Firebase para ver si hay usuario
    const unsubscribe = onAuthStateChanged(auth, (currentUser: any) => {
      if (!currentUser) {
        // SI NO HAY USUARIO -> Redirigir al Login
        router.push("/login");
      } else {
        // SI HAY USUARIO -> Guardarlo y quitar la carga
        setUser(currentUser);
        setLoading(false);
      }
    });

    // Limpieza
    return () => unsubscribe();
  }, [router]);

  // Mientras comprobamos, mostramos un círculo de carga o pantalla negra
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white">
        Cargando Talk2Me...
      </div>
    );
  }

  // Si llegamos aquí, es que hay usuario. Mostramos la App.
  return (
    <div className="h-full">
       {/* Aquí va el contenido de tu chat que tenías antes */}
       <h1>Bienvenido al Chat, {user.email}</h1>
       {/* Si tenías un componente <Chat /> o similar, ponlo aquí */}
    </div>
  );
}