import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ExternalLink, ShieldCheck, Zap } from 'lucide-react';

export const metadata = {
  title: "Patrocinadores y Publicidad",
  description: "Conoce a nuestros socios estratégicos y descubre oportunidades publicitarias dentro de la plataforma Talk2Me.",
  alternates: {
    canonical: "/sponsors",
  },
};

export default function SponsorsPage() {
  const sponsors = [
    { name: "TECHCORP", desc: "Socio en infraestructura cloud", color: "text-blue-500" },
    { name: "CLOUDLY", desc: "Proveedores de servicios en la nube", color: "text-purple-500" },
    { name: "GENESIS", desc: "Expertos en seguridad digital", color: "text-green-500" },
    { name: "FLOWAI", desc: "Inteligencia artificial aplicada", color: "text-orange-500" },
    { name: "SECURELINK", desc: "Redes privadas y encriptación", color: "text-red-500" },
    { name: "DATANEX", desc: "Análisis de datos a gran escala", color: "text-cyan-500" },
  ];

  return (
    <main className="min-h-screen bg-zinc-950 text-white font-body py-20 px-4">
      <div className="container mx-auto max-w-5xl">
        <Button asChild variant="ghost" className="mb-8 text-zinc-400 hover:text-white">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Volver al Inicio
          </Link>
        </Button>

        <header className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Patrocinadores y Partners</h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Talk2Me es posible gracias a la colaboración de empresas líderes en tecnología y seguridad que confían en nuestra visión.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {sponsors.map((sponsor) => (
            <div key={sponsor.name} className="p-8 rounded-3xl border border-zinc-800 bg-zinc-900/50 hover:border-zinc-700 transition-all text-center">
              <span className={`text-2xl font-bold tracking-tighter mb-2 block ${sponsor.color}`}>{sponsor.name}</span>
              <p className="text-sm text-zinc-500">{sponsor.desc}</p>
            </div>
          ))}
        </div>

        {/* Ad Space for SEO and Monetization */}
        <section className="bg-zinc-900/30 border border-dashed border-zinc-800 rounded-3xl p-12 text-center">
          <div className="max-w-xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Oportunidades Publicitarias</h2>
            <p className="text-zinc-400 mb-8">
              ¿Quieres que tu marca llegue a miles de profesionales informados? Únete a nuestra red de patrocinadores y posiciona tu marca en el feed de noticias de Talk2Me.
            </p>
            <Button asChild size="lg" className="bg-white text-black hover:bg-zinc-200">
              <a href="mailto:ads@talk2me.com">Contactar con Ventas</a>
            </Button>
          </div>
          
          <div className="mt-12 h-32 w-full flex items-center justify-center border border-zinc-800 rounded-2xl bg-zinc-950 text-zinc-600 italic">
            [Espacio reservado para Scripts de Publicidad / Google Adsense]
          </div>
        </section>

        <footer className="mt-20 text-center">
          <p className="text-zinc-600 text-sm">
            Talk2Me se compromete a una publicidad ética y transparente que no comprometa la privacidad de nuestros usuarios.
          </p>
        </footer>
      </div>
    </main>
  );
}
