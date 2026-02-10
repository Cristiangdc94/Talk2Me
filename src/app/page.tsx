"use client";

// 1. FORZAR MODO DINÁMICO (Para evitar errores en Vercel)
export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";
import Image from "next/image";

// --- DATOS DE EJEMPLO (Para que se vea igual que en tu foto) ---
const friendUpdates = [
  { id: 1, name: "Alice", time: "hace 2 horas", text: "¡Qué interesante el nuevo lenguaje de programación! Definitivamente tengo que probarlo.", avatar: "/avatars/alice.png", color: "bg-blue-900" },
  { id: 2, name: "Diana", time: "hace 5 horas", text: "No puedo creer la victoria del equipo local anoche. ¡Qué partidazo!", avatar: "/avatars/diana.png", color: "bg-green-900" },
  { id: 3, name: "Frank", time: "hace 1 día", text: "La nueva campaña de salud es justo lo que la ciudad necesitaba. ¡Bravo!", avatar: "/avatars/frank.png", color: "bg-purple-900" },
];

const generalNews = [
  { id: 1, title: "InnovateCorp Lanza su Nuevo...", image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&auto=format&fit=crop&q=60", category: "Tecnología" },
  { id: 2, title: "Resultados Financieros del...", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&auto=format&fit=crop&q=60", category: "Economía" },
  { id: 3, title: "Anuncio del Hackathon Interno", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500&auto=format&fit=crop&q=60", category: "Eventos" },
  { id: 4, title: "QuantumLeap se Asocia con...", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&auto=format&fit=crop&q=60", category: "Ciencia" },
];

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push("/login");
      } else {
        setUser(currentUser);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [router]);

  // --- PANTALLA DE CARGA ---
  if (loading) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-[#1a1b1e] text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-600 border-t-blue-500"></div>
          <p className="animate-pulse text-sm font-medium text-gray-400">Cargando Talk2Me...</p>
        </div>
      </div>
    );
  }

  // --- CONTENIDO PRINCIPAL (General) ---
  return (
    <div className="flex flex-col gap-8 p-6 text-white h-full overflow-y-auto">

      {/* SECCIÓN 1: LO NUEVO ENTRE TUS AMIGOS */}
      <div>
        <h2 className="mb-4 text-xl font-bold">Lo nuevo entre tus amigos</h2>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">

          {/* Tarjeta de "Tu estado" */}
          <div className="min-w-[300px] flex-shrink-0 rounded-xl bg-[#25262b] p-4 border border-gray-800">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 rounded-full bg-gray-600 flex items-center justify-center overflow-hidden">
                 {/* Si tienes foto de usuario, úsala, si no un placeholder */}
                 {user?.photoURL ? <img src={user.photoURL} alt="Tú" /> : <span className="text-xs">Tú</span>}
              </div>
              <div>
                <p className="font-bold text-sm">Tú</p>
                <p className="text-xs text-gray-400">Comparte algo con tus amigos...</p>
              </div>
            </div>
            <textarea
              placeholder="¿Qué estás pensando?"
              className="w-full bg-[#1a1b1e] rounded-lg p-3 text-sm text-white border border-gray-700 focus:outline-none focus:border-blue-500 resize-none h-20"
            ></textarea>
            <button className="mt-3 w-full bg-gray-700 hover:bg-gray-600 text-white text-xs font-bold py-2 rounded-lg transition">
              Publicar
            </button>
          </div>

          {/* Tarjetas de amigos (Iteramos los datos de ejemplo) */}
          {friendUpdates.map((friend) => (
            <div key={friend.id} className="min-w-[300px] flex-shrink-0 rounded-xl bg-[#25262b] p-4 border border-gray-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className={`h-10 w-10 rounded-full ${friend.color} flex items-center justify-center text-xs font-bold`}>
                    {friend.name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-sm">{friend.name}</p>
                    <p className="text-xs text-gray-400">{friend.time}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {friend.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECCIÓN 2: NOTICIAS GENERALES */}
      <div>
        <h2 className="mb-4 text-xl font-bold flex items-center gap-2">
          <span className="text-2xl">📰</span> Noticias Generales
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {generalNews.map((news) => (
            <div key={news.id} className="group relative overflow-hidden rounded-xl bg-[#25262b] border border-gray-800 hover:border-gray-600 transition cursor-pointer">
              {/* Imagen de fondo */}
              <div className="relative h-48 w-full">
                <img
                  src={news.image}
                  alt={news.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-3 left-3 right-3">
                  <span className="inline-block px-2 py-1 mb-2 text-[10px] font-bold uppercase tracking-wider text-white bg-blue-600 rounded-sm">
                    {news.category}
                  </span>
                  <h3 className="text-sm font-bold text-white leading-tight">
                    {news.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}