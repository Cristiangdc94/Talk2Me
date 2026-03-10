import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { 
  MessageSquare, 
  Newspaper, 
  ShieldCheck, 
  Zap, 
  ArrowRight,
  Globe,
  Layout,
  Twitter,
  Github,
  Mail,
  Lock,
  ExternalLink,
  Users,
  CheckCircle2,
  TrendingUp,
  Linkedin,
} from 'lucide-react';
import Image from 'next/image';
import { HelpChatbot } from '@/components/help/help-chatbot';

/**
 * Landing Page pública de Talk2Me.
 * Optimizada para SEO con links a páginas dedicadas y chatbot de ayuda.
 */
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
    "description": "Plataforma moderna de comunicación en tiempo real que combina chat para amigos y un portal de noticias para empresas con noticias reales de El País."
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-white selection:bg-blue-500/30 font-body relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* Header / Nav */}
      <header className="fixed top-0 w-full z-50 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-logo text-2xl text-blue-500">T2M</span>
            <span className="font-headline text-2xl text-white hidden sm:block">Talk2Me</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/demo" className="text-sm text-zinc-400 hover:text-white transition-colors">Demo en Vivo</Link>
            <Link href="/about" className="text-sm text-zinc-400 hover:text-white transition-colors">Sobre Nosotros</Link>
            <Link href="/sponsors" className="text-sm text-zinc-400 hover:text-white transition-colors">Patrocinadores</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
              Iniciar Sesión
            </Link>
            <Button asChild className="bg-blue-600 hover:bg-blue-500 text-white border-none hidden sm:inline-flex">
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
            <span>Versión 2.0: Noticias reales de El País integradas</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent">
            La comunicación de tu equipo <br className="hidden md:block" /> y amigos, en un solo lugar
          </h1>
          
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10">
            Talk2Me redefine la mensajería instantánea integrando un portal de noticias internacionales verídicas. Conecta con quienes importan y mantente informado.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="h-12 px-8 bg-blue-600 hover:bg-blue-500 text-white w-full sm:w-auto">
              <Link href="/signup">
                Comenzar Gratis
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 px-8 border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 text-white w-full sm:w-auto">
              <Link href="/demo">Probar Demo Gratis</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid Summary */}
      <section id="features" className="py-20 bg-zinc-900/30 border-y border-zinc-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-8 rounded-2xl border border-zinc-800 bg-zinc-950 hover:border-blue-500/50 transition-all group">
              <div className="mb-6 p-3 rounded-xl bg-zinc-900 border border-zinc-800 w-fit group-hover:scale-110 transition-transform">
                <MessageSquare className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">Chat Instantáneo</h3>
              <p className="text-zinc-400 text-sm">Mensajería ultra-rápida con soporte multimedia y estados en tiempo real.</p>
            </div>
            <div className="p-8 rounded-2xl border border-zinc-800 bg-zinc-950 hover:border-blue-500/50 transition-all group">
              <div className="mb-6 p-3 rounded-xl bg-zinc-900 border border-zinc-800 w-fit group-hover:scale-110 transition-transform">
                <Globe className="w-6 h-6 text-purple-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">Noticias Reales</h3>
              <p className="text-zinc-400 text-sm">Acceso directo a noticias verídicas de El País Internacional en español.</p>
            </div>
            <div className="p-8 rounded-2xl border border-zinc-800 bg-zinc-950 hover:border-blue-500/50 transition-all group">
              <div className="mb-6 p-3 rounded-xl bg-zinc-900 border border-zinc-800 w-fit group-hover:scale-110 transition-transform">
                <Lock className="w-6 h-6 text-green-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">Privacidad Total</h3>
              <p className="text-zinc-400 text-sm">Encriptación de extremo a extremo y canales privados para tu equipo.</p>
            </div>
            <div className="p-8 rounded-2xl border border-zinc-800 bg-zinc-950 hover:border-blue-500/50 transition-all group">
              <div className="mb-6 p-3 rounded-xl bg-zinc-900 border border-zinc-800 w-fit group-hover:scale-110 transition-transform">
                <Layout className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">Diseño Moderno</h3>
              <p className="text-zinc-400 text-sm">Interfaz elegante y personalizable con soporte nativo para modo oscuro.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition Text Section */}
      <section className="py-24 bg-zinc-950">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">¿Por qué elegir Talk2Me?</h2>
          <div className="prose prose-invert max-w-none text-zinc-400 space-y-6 text-lg leading-relaxed">
            <p>
              En el ecosistema digital actual, la sobrecarga de información y la fragmentación de las herramientas de comunicación son desafíos constantes para la productividad. <strong>Talk2Me</strong> nace con una visión clara: unificar la interacción humana con el acceso a información verídica y relevante.
            </p>
            <p>
              Nuestra plataforma no es solo otro cliente de chat. Es un centro neurálgico donde la colaboración se encuentra con el conocimiento. Al integrar el feed internacional de <strong>El País</strong>, garantizamos que cada miembro de tu equipo esté al tanto de los acontecimientos globales más importantes sin necesidad de abandonar su flujo de trabajo. Esta integración nativa elimina las "islas de información" y fomenta un equipo más consciente y conectado con la realidad global.
            </p>
            <p>
              La seguridad es el pilar fundamental de nuestra arquitectura. Entendemos que la privacidad de tus conversaciones es innegociable. Por ello, implementamos protocolos de encriptación de última generación y ofrecemos canales privados granulares, permitiendo que la información sensible permanezca exactamente donde debe estar: dentro de tu organización.
            </p>
            <p>
              Además, Talk2Me ofrece una flexibilidad sin precedentes. Ya sea que necesites gestionar un equipo remoto de cientos de personas o simplemente mantenerte en contacto con tus amigos cercanos, nuestra interfaz se adapta a tus necesidades. El modo oscuro nativo, la personalización de perfiles y la gestión inteligente de notificaciones aseguran que la experiencia de usuario sea siempre placentera y eficiente.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action for About */}
      <section className="py-24 bg-zinc-900/20 border-y border-zinc-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">¿Quieres saber más sobre nuestra visión?</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto mb-10">
            Descubre cómo estamos cambiando la forma en que los equipos se comunican y se mantienen informados en el mundo digital actual.
          </p>
          <Button asChild variant="outline" size="lg" className="border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white transition-all">
            <Link href="/about">Leer nuestra historia</Link>
          </Button>
        </div>
      </section>

      {/* Chatbot Button Placeholder Area - Positioned Fixed at Bottom Right */}
      <div className="fixed bottom-6 right-6 z-[100] bg-zinc-900/90 backdrop-blur rounded-full p-1 border border-zinc-800 shadow-xl">
        <HelpChatbot />
      </div>

      {/* Footer */}
      <footer className="bg-zinc-950 border-t border-zinc-900 pt-20 pb-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <span className="font-logo text-3xl text-blue-500">T2M</span>
                <span className="font-headline text-2xl text-white">Talk2Me</span>
              </div>
              <p className="text-sm text-zinc-500 leading-relaxed">
                La plataforma de comunicación que une a las personas con la información real. Chat, noticias y colaboración segura.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-6 text-white uppercase text-xs tracking-widest">Navegación</h4>
              <ul className="space-y-4 text-sm text-zinc-400">
                <li><Link href="/demo" className="hover:text-blue-500 transition-colors">Demo Interactiva</Link></li>
                <li><Link href="/about" className="hover:text-blue-500 transition-colors">Sobre Nosotros</Link></li>
                <li><Link href="/sponsors" className="hover:text-blue-500 transition-colors">Sponsors</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6 text-white uppercase text-xs tracking-widest">Cuenta</h4>
              <ul className="space-y-4 text-sm text-zinc-400">
                <li><Link href="/login" className="hover:text-blue-500 transition-colors">Iniciar Sesión</Link></li>
                <li><Link href="/signup" className="hover:text-blue-500 transition-colors">Crear Cuenta</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6 text-white uppercase text-xs tracking-widest">Conéctate</h4>
              <div className="flex gap-4 mb-6">
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:border-blue-500 hover:text-blue-500 transition-all">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:border-blue-500 hover:text-blue-500 transition-all">
                  <Github className="h-5 w-5" />
                </a>
                <a href="https://www.linkedin.com/in/cristian-garc%C3%ADa-de-castro-a3564a10b/" target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:border-blue-500 hover:text-blue-500 transition-all">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="mailto:contact@talk2me.com" className="h-10 w-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:border-blue-500 hover:text-blue-500 transition-all">
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="pt-10 border-t border-zinc-900 text-center">
            <p className="text-zinc-600 text-xs">
              © {new Date().getFullYear()} Talk2Me. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
