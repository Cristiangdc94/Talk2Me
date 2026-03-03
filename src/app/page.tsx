import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { 
  MessageSquare, 
  Newspaper, 
  ShieldCheck, 
  Zap, 
  ArrowRight,
  Globe,
  Layout
} from 'lucide-react';

export default function LandingPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Talk2Me",
    "operatingSystem": "Web",
    "applicationCategory": "CommunicationApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Plataforma moderna de comunicación en tiempo real que combina chat para amigos y un portal de noticias para empresas."
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-white selection:bg-blue-500/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* Header / Nav */}
      <header className="fixed top-0 w-full z-50 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-headline text-2xl text-white">Talk2Me</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
              Iniciar Sesión
            </Link>
            <Button asChild className="bg-blue-600 hover:bg-blue-500 text-white border-none">
              <Link href="/signup">Empezar Gratis</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent -z-10" />
        
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-blue-400 text-xs font-medium mb-6">
            <Zap className="w-3 h-3" />
            <span>Nueva versión 2.0 disponible</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent">
            La comunicación de tu equipo <br className="hidden md:block" /> y amigos, en un solo lugar
          </h1>
          
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10">
            Talk2Me combina la mensajería instantánea más rápida con un portal de noticias corporativas inteligente. Mantente conectado y al día sin cambiar de aplicación.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="h-12 px-8 bg-blue-600 hover:bg-blue-500 text-white w-full sm:w-auto">
              <Link href="/signup">
                Comenzar Gratis
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 px-8 border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 text-white w-full sm:w-auto">
              <Link href="/login">Explorar Demo</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-zinc-900/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Todo lo que necesitas para conectar</h2>
            <p className="text-zinc-400">Diseñado para la velocidad, la seguridad y la simplicidad.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-8 rounded-2xl border border-zinc-800 bg-zinc-950 hover:border-blue-500/50 hover:bg-zinc-900/50 transition-all duration-300 group">
              <div className="mb-6 p-3 rounded-xl bg-zinc-900 border border-zinc-800 w-fit group-hover:scale-110 transition-transform">
                <MessageSquare className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">Chat en tiempo real</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">Mensajería instantánea con soporte para archivos, imágenes y estados de lectura.</p>
            </div>
            <div className="p-8 rounded-2xl border border-zinc-800 bg-zinc-950 hover:border-blue-500/50 hover:bg-zinc-900/50 transition-all duration-300 group">
              <div className="mb-6 p-3 rounded-xl bg-zinc-900 border border-zinc-800 w-fit group-hover:scale-110 transition-transform">
                <Newspaper className="w-6 h-6 text-purple-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">Noticias Corporativas</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">Un portal dedicado para noticias de tu empresa y el mundo, integrado en tu flujo.</p>
            </div>
            <div className="p-8 rounded-2xl border border-zinc-800 bg-zinc-950 hover:border-blue-500/50 hover:bg-zinc-900/50 transition-all duration-300 group">
              <div className="mb-6 p-3 rounded-xl bg-zinc-900 border border-zinc-800 w-fit group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6 text-green-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">Entorno Seguro</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">Tus datos y conversaciones están protegidos con los estándares más altos de seguridad.</p>
            </div>
            <div className="p-8 rounded-2xl border border-zinc-800 bg-zinc-950 hover:border-blue-500/50 hover:bg-zinc-900/50 transition-all duration-300 group">
              <div className="mb-6 p-3 rounded-xl bg-zinc-900 border border-zinc-800 w-fit group-hover:scale-110 transition-transform">
                <Layout className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">Diseño Personalizable</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">Ajusta tu experiencia con modo oscuro, temas dinámicos y perfiles únicos.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex flex-col md:flex-row items-center gap-12 border border-zinc-800 rounded-3xl p-8 md:p-12 bg-zinc-950">
            <div className="flex-1 text-left">
              <div className="inline-flex items-center gap-2 text-blue-400 mb-4">
                <Globe className="w-5 h-5" />
                <span className="font-semibold uppercase tracking-wider text-sm">Información Global</span>
              </div>
              <h3 className="text-3xl font-bold mb-4">Noticias reales, en español</h3>
              <p className="text-zinc-400 mb-6">
                No más contenido genérico. Talk2Me se conecta con fuentes prestigiosas para traerte lo que realmente importa en tu idioma.
              </p>
            </div>
            <div className="flex-1 w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-2xl">
              <div className="animate-pulse space-y-4">
                <div className="h-4 w-1/4 bg-zinc-800 rounded"></div>
                <div className="h-8 w-full bg-zinc-800 rounded"></div>
                <div className="h-32 w-full bg-zinc-800 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-zinc-900 bg-zinc-950">
        <div className="container mx-auto px-4 text-center">
          <p className="text-zinc-600 text-sm">
            © {new Date().getFullYear()} Talk2Me. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </main>
  );
}
