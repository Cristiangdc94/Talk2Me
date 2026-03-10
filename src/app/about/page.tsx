import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle2, Zap } from 'lucide-react';
import { HelpChatbot } from '@/components/help/help-chatbot';

export const metadata = {
  title: "Sobre Nosotros",
  description: "Conoce la historia detrás de Talk2Me, nuestra misión y visión para el futuro de la comunicación digital.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white font-body py-20 px-4 relative">
      <div className="container mx-auto max-w-4xl">
        <Button asChild variant="ghost" className="mb-8 text-zinc-400 hover:text-white">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Volver al Inicio
          </Link>
        </Button>

        <header className="mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-white bg-clip-text text-transparent">
            Nuestra Historia
          </h1>
          <p className="text-xl text-zinc-400 leading-relaxed">
            Talk2Me nació para unir lo que el trabajo remoto separó: la comunicación fluida y la información verídica.
          </p>
        </header>

        <section className="space-y-12 mb-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Zap className="text-blue-500 h-6 w-6" /> Nuestra Misión
              </h2>
              <p className="text-zinc-400 leading-relaxed">
                Queremos que los equipos no solo hablen, sino que estén informados. Al integrar el feed internacional de El País, eliminamos la necesidad de saltar entre apps para saber qué pasa en el mundo.
              </p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl shadow-2xl">
              <h3 className="text-xl font-bold mb-4 text-blue-400">¿Por qué Talk2Me?</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm text-zinc-300">
                  <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                  <span>Integración nativa con noticias reales.</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-zinc-300">
                  <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                  <span>Entorno seguro y privado para empresas.</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-zinc-300">
                  <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                  <span>Diseño intuitivo pensado en la productividad.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-blue-600/10 border border-blue-500/20 p-10 rounded-3xl text-center">
          <h2 className="text-2xl font-bold mb-4">Únete a la evolución</h2>
          <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-500 text-white px-10">
            <Link href="/signup">Crear Cuenta Gratis</Link>
          </Button>
        </section>
      </div>

      <div className="fixed bottom-6 right-6 z-50">
        <HelpChatbot />
      </div>
    </main>
  );
}
