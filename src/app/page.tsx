
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
  MessageCircle,
  ExternalLink,
  Users,
  CheckCircle2,
  TrendingUp,
  BarChart3
} from 'lucide-react';
import Image from 'next/image';

/**
 * Landing Page pública de Talk2Me.
 * Optimizada para SEO con más de 400 palabras, demo interactiva y sección de sponsors.
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
    <main className="min-h-screen bg-zinc-950 text-white selection:bg-blue-500/30 font-body">
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
            <Link href="#features" className="text-sm text-zinc-400 hover:text-white transition-colors">Características</Link>
            <Link href="#demo" className="text-sm text-zinc-400 hover:text-white transition-colors">Demo</Link>
            <Link href="#about" className="text-sm text-zinc-400 hover:text-white transition-colors">Sobre Nosotros</Link>
            <Link href="#sponsors" className="text-sm text-zinc-400 hover:text-white transition-colors">Sponsors</Link>
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
            <span>Versión 2.0: Ahora con noticias de El País en tiempo real</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent">
            La comunicación de tu equipo <br className="hidden md:block" /> y amigos, en un solo lugar
          </h1>
          
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10">
            Talk2Me redefine la mensajería instantánea integrando un portal de noticias internacionales verídicas. Conecta con quienes importan y mantente informado sin salir de tu espacio de trabajo.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="h-12 px-8 bg-blue-600 hover:bg-blue-500 text-white w-full sm:w-auto">
              <Link href="/signup">
                Comenzar Gratis
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 px-8 border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 text-white w-full sm:w-auto">
              <Link href="#demo">Ver Demo en Vivo</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Sponsors Section / Advertising Scripts Placeholder */}
      <section id="sponsors" className="py-12 border-y border-zinc-900 bg-zinc-950/50">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-8">Nuestros Patrocinadores y Partners</p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center opacity-50 hover:opacity-100 transition-opacity">
            <div className="flex items-center justify-center grayscale hover:grayscale-0 transition-all">
               <span className="text-2xl font-bold text-zinc-300">TECHCORP</span>
            </div>
            <div className="flex items-center justify-center grayscale hover:grayscale-0 transition-all">
               <span className="text-2xl font-bold text-zinc-300">CLOUDLY</span>
            </div>
            <div className="flex items-center justify-center grayscale hover:grayscale-0 transition-all">
               <span className="text-2xl font-bold text-zinc-300">GENESIS</span>
            </div>
            <div className="flex items-center justify-center grayscale hover:grayscale-0 transition-all">
               <span className="text-2xl font-bold text-zinc-300">FLOWAI</span>
            </div>
            <div className="flex items-center justify-center grayscale hover:grayscale-0 transition-all">
               <span className="text-2xl font-bold text-zinc-300">SECURELINK</span>
            </div>
            <div className="flex items-center justify-center grayscale hover:grayscale-0 transition-all">
               <span className="text-2xl font-bold text-zinc-300">DATANEX</span>
            </div>
          </div>
          
          {/* Espacio para Scripts de Publicidad / Ad Scripts Placeholders */}
          <div className="mt-12 p-4 border border-dashed border-zinc-800 rounded-lg max-w-4xl mx-auto bg-zinc-900/20">
            <p className="text-[10px] text-zinc-600 mb-2 italic">Contenido Patrocinado / Google Ad Manager</p>
            <div className="h-20 flex items-center justify-center text-zinc-700 text-sm font-medium">
              {/* AQUÍ PUEDES INSERTAR TUS SCRIPTS DE PUBLICIDAD (Ej. Google AdSense) */}
              {/* <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script> */}
              Espacio Publicitario Reservado - Talk2Me Network
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section id="demo" className="py-24 bg-zinc-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Explora la Experiencia</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">Prueba las funciones principales de Talk2Me directamente desde aquí. Sin registros, solo la potencia de nuestra plataforma en tus manos.</p>
          </div>

          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
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
                <div className="flex gap-2">
                  <div className="w-8 h-8 rounded-full bg-zinc-700"></div>
                  <div className="w-8 h-8 rounded-full bg-zinc-700"></div>
                </div>
              </div>
              <div className="p-6 space-y-4 h-80 overflow-y-auto bg-zinc-900/50">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-zinc-700 shrink-0"></div>
                  <div className="bg-zinc-800 p-3 rounded-2xl rounded-tl-none text-sm max-w-[80%]">
                    ¡Hola! ¿Has visto las noticias de hoy en el portal de la empresa?
                  </div>
                </div>
                <div className="flex gap-3 justify-end">
                  <div className="bg-blue-600 p-3 rounded-2xl rounded-tr-none text-sm max-w-[80%]">
                    ¡Sí! Me encanta que podamos ver El País directamente desde aquí.
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-zinc-700 shrink-0"></div>
                  <div className="bg-zinc-800 p-3 rounded-2xl rounded-tl-none text-sm max-w-[80%] text-zinc-400 italic">
                    Alice está escribiendo...
                  </div>
                </div>
              </div>
              <div className="p-4 border-t border-zinc-800 flex gap-2">
                <div className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2 text-sm text-zinc-500">
                  Escribe un mensaje de prueba...
                </div>
                <Button className="bg-blue-600 h-10 w-10 p-0"><Zap className="w-4 h-4"/></Button>
              </div>
            </div>

            {/* Mock News / Feature Highlight */}
            <div className="lg:col-span-5 space-y-8">
              <div className="p-6 rounded-3xl border border-zinc-800 bg-zinc-900/30 hover:bg-zinc-900/50 transition-colors">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-2 rounded-xl bg-orange-500/10 text-orange-500">
                    <Newspaper className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold">Portal de Noticias</h3>
                </div>
                <div className="relative h-40 w-full mb-4 rounded-xl overflow-hidden grayscale hover:grayscale-0 transition-all">
                  <Image 
                    src="https://picsum.photos/seed/newsdemo/600/400" 
                    alt="News Demo" 
                    fill 
                    className="object-cover"
                    data-ai-hint="news media"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent"></div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-xs font-bold truncate">Crisis global: El impacto en la tecnología...</p>
                    <p className="text-[10px] text-zinc-400">Vía El País • Hace 5 min</p>
                  </div>
                </div>
                <p className="text-sm text-zinc-400">Accede a información real y verídica. Filtra por categorías y comparte artículos directamente en tus canales de chat.</p>
              </div>

              <div className="p-6 rounded-3xl border border-zinc-800 bg-zinc-900/30">
                <h4 className="font-bold mb-4 flex items-center gap-2">
                   <TrendingUp className="w-4 h-4 text-green-500"/>
                   Métricas de Adopción
                </h4>
                <div className="space-y-4">
                   <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-zinc-500">Velocidad de Chat</span>
                        <span className="text-blue-500">99.9%</span>
                      </div>
                      <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 w-[99%]"></div>
                      </div>
                   </div>
                   <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-zinc-500">Seguridad de Datos</span>
                        <span className="text-green-500">Militar</span>
                      </div>
                      <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 w-[100%]"></div>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 bg-zinc-900/30 border-y border-zinc-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Todo lo que necesitas para conectar</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">Diseñado para la velocidad, la seguridad y la simplicidad. Talk2Me es la herramienta definitiva para equipos modernos y círculos sociales.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-8 rounded-2xl border border-zinc-800 bg-zinc-950 hover:border-blue-500/50 hover:bg-zinc-900/50 transition-all duration-300 group">
              <div className="mb-6 p-3 rounded-xl bg-zinc-900 border border-zinc-800 w-fit group-hover:scale-110 transition-transform">
                <MessageSquare className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">Chat en tiempo real</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">Mensajería instantánea ultra-rápida con soporte para archivos, imágenes y estados de lectura en tiempo real.</p>
            </div>
            <div className="p-8 rounded-2xl border border-zinc-800 bg-zinc-950 hover:border-blue-500/50 hover:bg-zinc-900/50 transition-all duration-300 group">
              <div className="mb-6 p-3 rounded-xl bg-zinc-900 border border-zinc-800 w-fit group-hover:scale-110 transition-transform">
                <Globe className="w-6 h-6 text-purple-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">Noticias de El País</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">Acceso directo a noticias internacionales verídicas en español. Sin desinformación, solo la realidad global.</p>
            </div>
            <div className="p-8 rounded-2xl border border-zinc-800 bg-zinc-950 hover:border-blue-500/50 hover:bg-zinc-900/50 transition-all duration-300 group">
              <div className="mb-6 p-3 rounded-xl bg-zinc-900 border border-zinc-800 w-fit group-hover:scale-110 transition-transform">
                <Lock className="w-6 h-6 text-green-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">Privacidad Estricta</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">Tus datos y conversaciones están protegidos. Canales privados y encriptación para tu tranquilidad total.</p>
            </div>
            <div className="p-8 rounded-2xl border border-zinc-800 bg-zinc-950 hover:border-blue-500/50 hover:bg-zinc-900/50 transition-all duration-300 group">
              <div className="mb-6 p-3 rounded-xl bg-zinc-900 border border-zinc-800 w-fit group-hover:scale-110 transition-transform">
                <Layout className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">Personalización Pro</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">Crea tu propio perfil, añade tus intereses y personaliza tu experiencia con temas claros y oscuros.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Expanded Content Section for SEO */}
      <section id="about" className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">¿Por qué elegir Talk2Me?</h2>
                <div className="space-y-4 text-zinc-400 leading-relaxed">
                  <p>
                    En el saturado mundo de las aplicaciones de mensajería, Talk2Me surge como una respuesta a la fragmentación de la información. ¿Por qué saltar entre aplicaciones de noticias y chats de equipo cuando puedes tenerlo todo en una interfaz coherente y elegante?
                  </p>
                  <p>
                    Nuestra plataforma no solo facilita la conversación fluida entre amigos y compañeros, sino que actúa como un centro de conocimiento. Al integrar el feed internacional de **El País**, garantizamos que los usuarios de Talk2Me sean los mejores informados, permitiendo que la actualidad alimente las discusiones productivas en los canales de la empresa.
                  </p>
                  <p>
                    La tecnología detrás de Talk2Me está optimizada para ofrecer latencia cero, asegurando que cada "hola" llegue al instante, sin importar en qué parte del mundo se encuentren tus contactos.
                  </p>
                </div>
              </div>
              <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-3xl">
                <h3 className="text-xl font-bold mb-4 text-blue-400">Ventajas Competitivas</h3>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <div className="h-6 w-6 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                      <Zap className="h-3 w-3 text-blue-500" />
                    </div>
                    <p className="text-sm text-zinc-300"><span className="font-bold">Eficiencia Operativa:</span> Reduce el ruido digital consolidando herramientas en un solo flujo de trabajo.</p>
                  </li>
                  <li className="flex gap-3">
                    <div className="h-6 w-6 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                      <ShieldCheck className="h-3 w-3 text-blue-500" />
                    </div>
                    <p className="text-sm text-zinc-300"><span className="font-bold">Seguridad de Datos:</span> Implementamos políticas de privacidad robustas para proteger tu propiedad intelectual.</p>
                  </li>
                  <li className="flex gap-3">
                    <div className="h-6 w-6 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                      <Globe className="h-3 w-3 text-blue-500" />
                    </div>
                    <p className="text-sm text-zinc-300"><span className="font-bold">Cultura Informada:</span> Fomenta equipos que entienden el contexto global en el que operan.</p>
                  </li>
                </ul>
              </div>
            </div>

            <div className="space-y-6 text-zinc-400 leading-relaxed text-center md:text-left">
              <h2 className="text-3xl font-bold text-white mb-6">Nuestra Visión de Futuro</h2>
              <p>
                Talk2Me nació de la necesidad de simplificar. Creemos que la comunicación en tiempo real es el pilar de cualquier relación exitosa, ya sea personal o profesional. Por eso, hemos optimizado cada línea de código para ofrecer una experiencia que no solo es rápida, sino también significativa.
              </p>
              <p>
                A diferencia de otras plataformas, no vendemos tus datos ni inundamos tu espacio con publicidad invasiva. Nuestro modelo se basa en la confianza y en proporcionar valor real a través de funciones como los **Canales de Empresa**, donde la jerarquía se une a la colaboración, y las **Noticias Para Ti**, que filtran el ruido mundial para darte lo que realmente te interesa.
              </p>
              <p>
                Únete a los miles de usuarios que ya han transformado su manera de chatear. Talk2Me es más que una app; es tu nueva ventana al mundo y a tu comunidad. Desde la gestión de grandes proyectos hasta la planificación de una cena con amigos, todo sucede aquí, en Talk2Me.
              </p>
              <div className="pt-6">
                <Button asChild variant="link" className="text-blue-500 p-0 text-lg">
                  <Link href="/signup">Crea tu cuenta gratuita hoy mismo →</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

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
                La plataforma de comunicación que une a las personas con la información real. Chat, noticias y colaboración en un entorno seguro y elegante.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-6 text-white uppercase text-xs tracking-widest">Navegación</h4>
              <ul className="space-y-4 text-sm text-zinc-400">
                <li><Link href="/login" className="hover:text-blue-500 transition-colors">Iniciar Sesión</Link></li>
                <li><Link href="/signup" className="hover:text-blue-500 transition-colors">Crear Cuenta</Link></li>
                <li><Link href="#features" className="hover:text-blue-500 transition-colors">Características</Link></li>
                <li><Link href="#demo" className="hover:text-blue-500 transition-colors">Demo Interactiva</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6 text-white uppercase text-xs tracking-widest">Legal</h4>
              <ul className="space-y-4 text-sm text-zinc-400">
                <li><Link href="#" className="hover:text-blue-500 transition-colors">Términos de Servicio</Link></li>
                <li><Link href="#" className="hover:text-blue-500 transition-colors">Política de Privacidad</Link></li>
                <li><Link href="#" className="hover:text-blue-500 transition-colors">Uso de Cookies</Link></li>
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
                <a href="mailto:contact@talk2me.com" className="h-10 w-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:border-blue-500 hover:text-blue-500 transition-all">
                  <Mail className="h-5 w-5" />
                </a>
              </div>
              <p className="text-xs text-zinc-600">
                ¿Tienes dudas? Escríbenos directamente o consulta nuestro repositorio oficial en GitHub.
              </p>
            </div>
          </div>

          <div className="pt-10 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-zinc-600 text-xs">
              © {new Date().getFullYear()} Talk2Me. Todos los derechos reservados. Desarrollado con Next.js y Tailwind CSS.
            </p>
            <div className="flex items-center gap-6 text-xs text-zinc-600">
              <span className="flex items-center gap-1">
                <Globe className="h-3 w-3" /> Español (España)
              </span>
              <span className="flex items-center gap-1">
                Hecho con <Zap className="h-3 w-3 text-yellow-500" /> para el mundo.
              </span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
