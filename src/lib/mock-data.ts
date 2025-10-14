
import { User, Channel, DirectMessage, NewsArticle, FriendStatus, Notification, CompanyNewsArticle } from './types';
import { PlaceHolderImages } from './placeholder-images';

const findImage = (id: string) => PlaceHolderImages.find(img => img.id === id)?.imageUrl || '';

export const users: User[] = [
  { 
    id: '1', 
    name: 'Tú', 
    avatarUrl: findImage('avatar-1'), 
    status: 'online', 
    email: 'you@example.com',
    companyRoles: {
      'InnovateCorp': { role: 'CEO', tag: 'Fundador' },
      'DataSolutions': { role: 'Partner' },
      'QuantumLeap': { role: 'Partner' },
    } 
  },
  { id: '2', name: 'Alice', avatarUrl: findImage('avatar-2'), status: 'online', relationship: 'friend', email: 'alice@example.com' },
  { id: '3', name: 'Bob', avatarUrl: findImage('avatar-3'), status: 'busy', lastSeen: 'En una reunión', relationship: 'coworker', email: 'bob@example.com', company: 'InnovateCorp', companyRoles: { 'InnovateCorp': { role: 'Jefe de proyecto', tag: 'Líder Técnico' } } },
  { id: '4', name: 'Carlos', avatarUrl: findImage('avatar-4'), status: 'online', relationship: 'coworker', email: 'carlos@example.com', company: 'InnovateCorp', companyRoles: { 'InnovateCorp': { role: 'Empleado', tag: 'Frontend Dev' } } },
  { id: '5', name: 'Diana', avatarUrl: findImage('avatar-5'), status: 'offline', lastSeen: 'ayer', relationship: 'friend', email: 'diana@example.com' },
  { id: '6', name: 'Eva', avatarUrl: findImage('avatar-6'), status: 'online', email: 'eva@example.com', relationship: 'coworker', company: 'DataSolutions', companyRoles: { 'DataSolutions': { role: 'Jefe de proyecto' } } },
  { id: '7', name: 'admin', avatarUrl: findImage('avatar-1'), status: 'online', role: 'admin', email: 'admin@example.com' },
  // New Friends
  { id: '8', name: 'Frank', avatarUrl: findImage('avatar-7'), status: 'online', relationship: 'friend', email: 'frank@example.com' },
  { id: '9', name: 'Grace', avatarUrl: findImage('avatar-8'), status: 'offline', lastSeen: 'hace 2 días', relationship: 'friend', email: 'grace@example.com' },
  { id: '10', name: 'Heidi', avatarUrl: findImage('avatar-9'), status: 'busy', lastSeen: 'En una llamada', relationship: 'friend', email: 'heidi@example.com' },
  { id: '11', name: 'Ivan', avatarUrl: findImage('avatar-10'), status: 'online', relationship: 'friend', email: 'ivan@example.com' },
  { id: '12', name: 'Judy', avatarUrl: findImage('avatar-11'), status: 'offline', lastSeen: 'hace 5 horas', relationship: 'friend', email: 'judy@example.com' },
  { id: '13', name: 'Mallory', avatarUrl: findImage('avatar-12'), status: 'online', relationship: 'friend', email: 'mallory@example.com' },
  { id: '14', name: 'Niaj', avatarUrl: findImage('avatar-13'), status: 'busy', lastSeen: 'Concentrado', relationship: 'friend', email: 'niaj@example.com' },
  // New Coworkers
  { id: '15', name: 'Oscar', avatarUrl: findImage('avatar-14'), status: 'online', relationship: 'coworker', email: 'oscar@example.com', company: 'InnovateCorp', companyRoles: { 'InnovateCorp': { role: 'Empleado', tag: 'Backend Dev' } } },
  { id: '16', name: 'Peggy', avatarUrl: findImage('avatar-15'), status: 'offline', lastSeen: 'ayer', relationship: 'coworker', email: 'peggy@example.com', company: 'DataSolutions', companyRoles: { 'DataSolutions': { role: 'Empleado' } } },
  { id: '17', name: 'Quentin', avatarUrl: findImage('avatar-16'), status: 'online', relationship: 'coworker', email: 'quentin@example.com', company: 'QuantumLeap', companyRoles: { 'QuantumLeap': { role: 'Administrador' } } },
  { id: '18', name: 'Rupert', avatarUrl: findImage('avatar-17'), status: 'busy', lastSeen: 'Presentando', relationship: 'coworker', email: 'rupert@example.com', company: 'DataSolutions', companyRoles: { 'DataSolutions': { role: 'Empleado' } } },
  { id: '19', name: 'Sybil', avatarUrl: findImage('avatar-18'), status: 'online', relationship: 'coworker', email: 'sybil@example.com', company: 'QuantumLeap', companyRoles: { 'QuantumLeap': { role: 'Empleado' } } },
  { id: '20', name: 'Trent', avatarUrl: findImage('avatar-19'), status: 'offline', lastSeen: 'hace 3 horas', relationship: 'coworker', email: 'trent@example.com', company: 'InnovateCorp', companyRoles: { 'InnovateCorp': { role: 'Miembro' } } },
  { id: '21', name: 'Ursula', avatarUrl: findImage('avatar-20'), status: 'online', relationship: 'coworker', email: 'ursula@example.com', company: 'QuantumLeap', companyRoles: { 'QuantumLeap': { role: 'Miembro' } } },
  { id: '22', name: 'Victor', avatarUrl: findImage('avatar-21'), status: 'busy', lastSeen: 'Almorzando', relationship: 'coworker', email: 'victor@example.com' }
];

const friends = users.filter(u => u.relationship === 'friend');

export const friendStatuses: FriendStatus[] = [
  { id: 's1', user: friends[0], statusText: '¡Qué interesante el nuevo lenguaje de programación! Definitivamente tengo que probarlo.', timestamp: 'hace 2 horas' },
  { id: 's2', user: friends[1], statusText: 'No puedo creer la victoria del equipo local anoche. ¡Qué partidazo!', timestamp: 'hace 5 horas' },
  { id: 's3', user: friends[2], statusText: 'La nueva campaña de salud es justo lo que la ciudad necesitaba. ¡Bravo!', timestamp: 'hace 1 día' },
  { id: 's4', user: friends[3], statusText: 'Pensando en las implicaciones de la IA para el futuro... da un poco de vértigo.', timestamp: 'hace 2 días' },
  { id: 's5', user: friends[4], statusText: 'Disfrutando de un buen libro y una taza de café. El plan perfecto para una tarde de lluvia.', timestamp: 'hace 10 minutos' },
  { id: 's6', user: friends[5], statusText: '¡Acabo de terminar de correr 10km! Me siento con mucha energía.', timestamp: 'hace 30 minutos' },
  { id: 's7', user: friends[6], statusText: 'Probando una receta nueva para la cena de esta noche. ¡Espero que salga bien!', timestamp: 'hace 1 hora' },
  { id: 's8', user: friends[0], statusText: 'Planeando las vacaciones de verano. ¿Alguna recomendación de destinos con playa?', timestamp: 'hace 3 horas' },
  { id: 's9', user: friends[1], statusText: 'Viendo de nuevo mi serie favorita. Nunca me canso de estos personajes.', timestamp: 'hace 6 horas' },
  { id: 's10', user: friends[2], statusText: 'El concierto de anoche fue simplemente espectacular. ¡Qué gran banda!', timestamp: 'hace 12 horas' },
  { id: 's11', user: friends[3], statusText: 'Trabajando en un proyecto personal que me tiene muy emocionado. Pronto compartiré más detalles.', timestamp: 'hace 1 día' },
  { id: 's12', user: friends[4], statusText: '¿Alguien más siente que la semana ha pasado volando?', timestamp: 'hace 1 día' },
  { id: 's13', user: friends[5], statusText: 'Visitando un museo de arte moderno. Hay algunas obras que realmente te hacen pensar.', timestamp: 'hace 2 días' },
  { id: 's14', user: friends[6], statusText: '¡Qué bien sienta un paseo por la naturaleza para desconectar de todo!', timestamp: 'hace 3 días' },
];

export const channels: Channel[] = [
  {
    id: 'channel-1',
    name: 'general',
    type: 'public',
    messages: [
      { id: 'msg1', text: '¡Hola a todos, bienvenidos al canal general!', timestamp: '10:00 AM', user: users[1], status: 'read' },
      { id: 'msg2', text: '¡Encantado de estar aquí!', timestamp: '10:01 AM', user: users[2], status: 'read' },
      { id: 'msg3', text: '¿Cuál es el tema de hoy?', timestamp: '10:02 AM', user: users[3], status: 'read' },
    ],
  },
  {
    id: 'channel-2',
    name: 'equipo-diseño',
    type: 'private',
    messages: [
      { id: 'msg4', text: 'Hola equipo, he subido los nuevos bocetos a Figma.', timestamp: '11:30 AM', user: users[4], status: 'read' },
      { id: 'msg5', text: 'Genial, les echo un vistazo ahora.', timestamp: '11:31 AM', user: users[0], status: 'sent' },
      { id: 'msg6', imageUrl: findImage('chat-image-1'), timestamp: '11:35 AM', user: users[4], status: 'read' },
      { id: 'msg7', text: '¡Se ven geniales! Una pequeña sugerencia, ¿podemos probar un tono diferente para el botón principal?', timestamp: '11:45 AM', user: users[0], status: 'sent' },
      { id: 'msg8', text: 'Buena idea. ¿Qué tal si lo discutimos en la llamada de mañana?', timestamp: '11:46 AM', user: users[4], status: 'read' },
    ],
  },
  {
    id: 'channel-3',
    name: 'varios',
    type: 'public',
    messages: [
      { id: 'msg9', text: '¿Alguien ha visto una buena película últimamente?', timestamp: '1:00 PM', user: users[5], status: 'read' },
    ],
  },
  {
    id: 'channel-innovatecorp-chat',
    name: 'InnovateCorp Chat',
    type: 'private',
    messages: [{ id: 'msg-corp1', text: 'Bienvenido al chat corporativo de InnovateCorp.', timestamp: '9:00 AM', user: users[6], status: 'read' }]
  },
  {
    id: 'channel-datasolutions-chat',
    name: 'DataSolutions Chat',
    type: 'private',
    messages: [{ id: 'msg-corp2', text: 'Bienvenido al chat corporativo de DataSolutions.', timestamp: '9:05 AM', user: users[6], status: 'read' }]
  },
  {
    id: 'channel-quantumleap-chat',
    name: 'QuantumLeap Chat',
    type: 'private',
    messages: [{ id: 'msg-corp3', text: 'Bienvenido al chat corporativo de QuantumLeap.', timestamp: '9:10 AM', user: users[6], status: 'read' }]
  }
];

export const directMessages: DirectMessage[] = [
  {
    id: 'dm-2',
    userId: '2',
    name: 'Alice',
    type: 'private',
    unreadCount: 3,
    messages: [
      { id: 'dm1', text: 'Oye, ¿tienes un minuto para hablar?', timestamp: '2:15 PM', user: users[1], status: 'read' },
      { id: 'dm2', text: 'Claro, ¿qué pasa?', timestamp: '2:16 PM', user: users[0], status: 'sent' },
    ],
  },
  {
    id: 'dm-3',
    userId: '3',
    name: 'Bob',
    type: 'private',
    unreadCount: 1,
    messages: [
      { id: 'dm_b1', text: 'Reunión en 5', timestamp: '3:00 PM', user: users[2], status: 'read' },
    ],
  },
  {
    id: 'dm-4',
    userId: '4',
    name: 'Carlos',
    type: 'private',
    unreadCount: 0,
    messages: [
      { id: 'dm3', text: '¡La actualización del proyecto ya está disponible!', timestamp: 'Ayer', user: users[3], status: 'read' },
    ],
  },
  {
    id: 'dm-5',
    userId: '5',
    name: 'Diana',
    type: 'private',
    unreadCount: 1,
    messages: [
      { id: 'dm4', text: '¡Hola! ¿Estás libre para una llamada rápida?', timestamp: 'hace 4 horas', user: users[4], status: 'read' },
    ]
  },
  {
    id: 'dm-6',
    userId: '6',
    name: 'Eva',
    type: 'private',
    unreadCount: 10,
    messages: [
      { id: 'dm_e1', text: 'Revisa por favor los informes de DataSolutions.', timestamp: 'hace 2 horas', user: users[5], status: 'read' }
    ]
  }
];


export const newsArticles: NewsArticle[] = [
  { id: 'n1', category: 'technology', location: 'global', title: 'El Futuro de la IA: ¿Qué nos espera en 2025?', summary: 'Expertos de la industria comparten sus predicciones sobre los avances en inteligencia artificial.', imageUrl: findImage('news-1'), link: '#', timestamp: 'hace 2 horas' },
  { id: 'n2', category: 'business', location: 'global', title: 'Los Mercados Globales Reaccionan a las Nuevas Políticas Comerciales', summary: 'Un análisis del impacto de las recientes decisiones comerciales en la economía mundial.', imageUrl: findImage('news-2'), link: '#', timestamp: 'hace 8 horas' },
  { id: 'n3', category: 'sports', location: 'local', title: 'El Equipo Local Gana el Campeonato en un Partido Emocionante', summary: 'Una victoria histórica para el equipo de la ciudad que desata la euforia de los aficionados.', imageUrl: findImage('news-3'), link: '#', timestamp: 'ayer' },
  { id: 'n4', category: 'technology', location: 'global', title: 'Nuevo Lenguaje de Programación Promete Revolucionar el Desarrollo', summary: 'Descubre "Mojo", el nuevo lenguaje que combina la simplicidad de Python con el rendimiento de C.', imageUrl: findImage('news-4'), link: '#', timestamp: 'hace 2 días' },
  { id: 'n5', category: 'health', location: 'local', title: 'Nueva Campaña de Salud Pública se Lanza en la Ciudad', summary: 'Iniciativas para promover el bienestar y la prevención de enfermedades en la comunidad local.', imageUrl: findImage('news-5'), link: '#', timestamp: 'hace 3 días' },
  { id: 'n6', category: 'sports', location: 'global', title: 'Resumen de los Partidos de Anoche y Próximos Encuentros', summary: 'No te pierdas los momentos más destacados de la jornada deportiva y lo que viene.', imageUrl: findImage('news-6'), link: '#', timestamp: 'hace 1 día' },
];

export const companyNews: CompanyNewsArticle[] = [
  { id: 'cn1', companyName: 'InnovateCorp', title: 'InnovateCorp Lanza su Nuevo Producto "QuantumConnect"', summary: 'Nuestro equipo ha trabajado incansablemente para lanzar esta nueva plataforma que revolucionará la comunicación empresarial.', imageUrl: findImage('news-1'), link: '#', timestamp: 'hace 1 día', likes: ['2', '4', '15'] },
  { id: 'cn2', companyName: 'DataSolutions', title: 'Resultados Financieros del Tercer Trimestre de DataSolutions', summary: 'Un crecimiento récord impulsado por nuestras soluciones de análisis de datos de vanguardia.', imageUrl: findImage('news-2'), link: '#', timestamp: 'hace 3 días', likes: ['6', '16', '18', '1'] },
  { id: 'cn3', companyName: 'InnovateCorp', title: 'Anuncio del Hackathon Interno de InnovateCorp', summary: 'Prepara tus ideas más innovadoras para nuestro hackathon anual. ¡Habrá grandes premios!', imageUrl: findImage('news-4'), link: '#', timestamp: 'hace 5 días', likes: ['3'] },
  { id: 'cn4', companyName: 'QuantumLeap', title: 'QuantumLeap se Asocia con una Importante Empresa Tecnológica', summary: 'Esta alianza estratégica nos permitirá acelerar nuestra investigación en computación cuántica.', imageUrl: findImage('news-5'), link: '#', timestamp: 'hace 1 semana', likes: ['17', '19', '21', '2', '5'] },
];

export const notifications: Notification[] = [
  { id: 'notif1', type: 'message', text: 'Alice te ha enviado un mensaje.', timestamp: 'hace 5 minutos', chatId: 'dm-2', chatType: 'dm' },
  { id: 'notif2', type: 'message', text: 'Nuevo mensaje en el canal #general.', timestamp: 'hace 10 minutos', chatId: 'channel-1', chatType: 'channel' },
  { id: 'notif3', type: 'call', text: 'Llamada perdida de Bob.', timestamp: 'hace 1 hora', chatId: 'dm-3', chatType: 'dm' },
  { id: 'notif4', type: 'news', text: 'Se ha publicado un nuevo artículo de tecnología que podría interesarte.', timestamp: 'hace 3 horas', link: '/' },
  { id: 'notif5', type: 'message', text: 'Diana ha respondido a tu mensaje.', timestamp: 'hace 4 horas', chatId: 'dm-5', chatType: 'dm' },
];
