import { User, Channel, DirectMessage } from './types';
import { PlaceHolderImages } from './placeholder-images';

const findImage = (id: string) => PlaceHolderImages.find(img => img.id === id)?.imageUrl || '';

export const users: User[] = [
  { id: '1', name: 'Tú', avatarUrl: findImage('avatar-1'), status: 'online' },
  { id: '2', name: 'Alice', avatarUrl: findImage('avatar-2'), status: 'online' },
  { id: '3', name: 'Bob', avatarUrl: findImage('avatar-3'), status: 'offline', lastSeen: 'hace 2 horas' },
  { id: '4', name: 'Carlos', avatarUrl: findImage('avatar-4'), status: 'online' },
  { id: '5', name: 'Diana', avatarUrl: findImage('avatar-5'), status: 'offline', lastSeen: 'ayer' },
  { id: '6', name: 'Eva', avatarUrl: findImage('avatar-6'), status: 'online' },
  { id: '7', name: 'admin', avatarUrl: findImage('avatar-1'), status: 'online', role: 'admin' },
];

export const channels: Channel[] = [
  {
    id: '1',
    name: 'general',
    type: 'public',
    messages: [
      { id: 'msg1', text: '¡Hola a todos, bienvenidos al canal general!', timestamp: '10:00 AM', user: users[1] },
      { id: 'msg2', text: '¡Encantado de estar aquí!', timestamp: '10:01 AM', user: users[2] },
      { id: 'msg3', text: '¿Cuál es el tema de hoy?', timestamp: '10:02 AM', user: users[3] },
    ],
  },
  {
    id: '2',
    name: 'equipo-diseño',
    type: 'private',
    messages: [
      { id: 'msg4', text: 'Hola equipo, he subido los nuevos bocetos a Figma.', timestamp: '11:30 AM', user: users[4] },
      { id: 'msg5', text: 'Genial, les echo un vistazo ahora.', timestamp: '11:31 AM', user: users[0] },
      { id: 'msg6', imageUrl: findImage('chat-image-1'), timestamp: '11:35 AM', user: users[4] },
      { id: 'msg7', text: '¡Se ven geniales! Una pequeña sugerencia, ¿podemos probar un tono diferente para el botón principal?', timestamp: '11:45 AM', user: users[0] },
      { id: 'msg8', text: 'Buena idea. ¿Qué tal si lo discutimos en la llamada de mañana?', timestamp: '11:46 AM', user: users[4] },
    ],
  },
  {
    id: '3',
    name: 'varios',
    type: 'public',
    messages: [
      { id: 'msg9', text: '¿Alguien ha visto una buena película últimamente?', timestamp: '1:00 PM', user: users[5] },
    ],
  },
];

export const directMessages: DirectMessage[] = [
  {
    id: '2', // Corresponds to user with id '2' (Alice)
    name: 'Alice',
    type: 'private',
    messages: [
      { id: 'dm1', text: 'Oye, ¿tienes un minuto para hablar?', timestamp: '2:15 PM', user: users[1] },
      { id: 'dm2', text: 'Claro, ¿qué pasa?', timestamp: '2:16 PM', user: users[0] },
    ],
  },
  {
    id: '4', // Corresponds to user with id '4' (Charlie)
    name: 'Carlos',
    type: 'private',
    messages: [
      { id: 'dm3', text: '¡La actualización del proyecto ya está disponible!', timestamp: 'Ayer', user: users[3] },
    ],
  },
];
