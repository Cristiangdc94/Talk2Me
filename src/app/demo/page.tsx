import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MessageSquare, Newspaper, Zap, TrendingUp } from 'lucide-react';
import Image from 'next/image';

export const metadata = {
  title: "Demo en Vivo",
  description: "Prueba las funcionalidades principales de Talk2Me: chat en tiempo real y portal de noticias integradas sin necesidad de registro.",
  alternates: {
    canonical: "/demo",
  },
};

export default function DemoPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white font-body py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <Button asChild variant="ghost" className="mb-8 text-zinc-400 hover:text-white">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Volver al Inicio
          </Link>
        </Button>

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Explora Talk2Me</h1>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
            Esta es una demostración interactiva de cómo se ve y se siente nuestra plataforma. Experimenta la fluidez de nuestro chat y la integración de noticias.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Mock Chat Interface */}
          <div className="lg:col-span-7 bg-zinc-900 rounded-3xl border border-zinc-800 overflow-hidden shadow-2xl">
            <div className="bg-zinc-800/50 p-4 border-b border-zinc-700 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold">A</div>
                <div>
                  <p className="text-sm font-bold leading-none">Alice (Demo)</p>
                  <p className="text-[10px] text-green-500 mt-1">● En línea</p>
                </div>
              </div>
            </div>
            <div className="p-6 space-y-4 h-96 overflow-y-auto bg-zinc-900/50">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-zinc-700 shrink-0"></div>
                <div className="bg-zinc-800 p-3 rounded-2xl rounded-tl-none text-sm max-w-[80%]">
                  ¡Hola! ¿Has visto las noticias de hoy en el portal?
                </div>
              </div>
              <div className="flex gap-3 justify-end">
                <div className="bg-blue-600 p-3 rounded-2xl rounded-tr-none text-sm max-w-[80%]">
                  ¡Sí! Es genial tener la información de El País integrada aquí mismo.
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-zinc-700 shrink-0"></div>
                <div className="bg-zinc-800 p-3 rounded-2xl rounded-tl-none text-sm max-w-[80%] text-zinc-400 italic">
                  Alice está escribiendo...
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-zinc-800 flex gap-2 bg-zinc-950">
              <div className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2 text-sm text-zinc-500">
                Escribe un mensaje de prueba...
              </div>
              <Button className="bg-blue-600 h-10 w-10 p-0"><Zap className="w-4 h-4"/></Button>
            </div>
          </div>

          {/* Feature Highlights */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-6 rounded-3xl border border-zinc-800 bg-zinc-900/30">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-2 rounded-xl bg-orange-500/10 text-orange-500">
                  <Newspaper className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold">Portal Integrado</h3>
              </div>
              <div className="relative h-48 w-full mb-4 rounded-xl overflow-hidden group">
                <Image 
                  src="https://picsum.photos/seed/newsdemo/600/400" 
                  alt="News Demo" 
                  fill 
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent"></div>
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-xs font-bold truncate text-white">Últimas noticias: El impacto global...</p>
                  <p className="text-[10px] text-zinc-400">Vía El País Internacional</p>
                </div>
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Accede a noticias reales sin salir de tu espacio de trabajo. Mantente informado mientras colaboras.
              </p>
            </div>

            <div className="p-8 rounded-3xl border border-blue-500/20 bg-blue-500/5 text-center">
              <h3 className="text-2xl font-bold mb-4">¿Te gusta lo que ves?</h3>
              <p className="text-sm text-zinc-400 mb-6">Únete a miles de usuarios que ya disfrutan de esta experiencia.</p>
              <Button asChild className="w-full bg-blue-600 hover:bg-blue-500">
                <Link href="/signup">Empezar ahora gratis</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
