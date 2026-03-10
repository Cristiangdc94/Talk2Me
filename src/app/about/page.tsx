import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle2, Globe, ShieldCheck, Zap } from 'lucide-react';

export const metadata = {
  title: "Sobre Nosotros",
  description: "Conoce la historia detrás de Talk2Me, nuestra misión y visión para el futuro de la comunicación digital.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white font-body py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <Button asChild variant="ghost" className="mb-8 text-zinc-400 hover:text-white">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Volver al Inicio
          </Link>
        </Button>

        <header className="mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-white bg-clip-text text-transparent">
            Sobre Nosotros
          </h1>
          <p className="text-xl text-zinc-400 leading-relaxed">
            Talk2Me nació de la necesidad de simplificar. En un mundo saturado de información, creímos que la comunicación debía ser fluida, segura y, sobre todo, informada.
          </p>
        </header>

        <section className="space-y-12 mb-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Zap className="text-blue-500 h-6 w-6" /> Nuestra Misión
              </h2>
              <p className="text-zinc-400 leading-relaxed">
                Nuestra misión es proporcionar a individuos y empresas una plataforma de comunicación unificada que no solo conecte personas, sino que también las mantenga al tanto de la realidad global a través de fuentes de noticias confiables.
              </p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl shadow-2xl">
              <h3 className="text-xl font-bold mb-4 text-blue-400">Valores Core</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm text-zinc-300">
                  <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                  <span>Transparencia en la información.</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-zinc-300">
                  <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                  <span>Seguridad de datos de grado militar.</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-zinc-300">
                  <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                  <span>Innovación constante centrada en el usuario.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-6 text-zinc-400 leading-relaxed">
            <h2 className="text-3xl font-bold text-white">¿Por qué Talk2Me?</h2>
            <p>
              En el saturado mundo de las aplicaciones de mensajería, Talk2Me surge como una respuesta a la fragmentación de la información. ¿Por qué saltar entre aplicaciones de noticias y chats de equipo cuando puedes tenerlo todo en una interfaz coherente y elegante?
            </p>
            <p>
              Nuestra plataforma no solo facilita la conversación fluida entre amigos y compañeros, sino que actúa como un centro de conocimiento. Al integrar el feed internacional de <strong>El País</strong>, garantizamos que los usuarios de Talk2Me sean los mejores informados, permitiendo que la actualidad alimente las discusiones productivas.
            </p>
            <p>
              La tecnología detrás de Talk2Me está optimizada para ofrecer latencia cero, asegurando que cada mensaje llegue al instante, sin importar en qué parte del mundo se encuentren tus contactos.
            </p>
          </div>
        </section>

        <section className="bg-blue-600/10 border border-blue-500/20 p-10 rounded-3xl text-center">
          <h2 className="text-2xl font-bold mb-4">Únete a la evolución</h2>
          <p className="text-zinc-400 mb-8 max-w-lg mx-auto">
            Sé parte de una comunidad informada y conectada. Comienza hoy mismo tu viaje con Talk2Me de forma gratuita.
          </p>
          <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-500 text-white px-10">
            <Link href="/signup">Crear Cuenta Ahora</Link>
          </Button>
        </section>
      </div>
    </main>
  );
}
