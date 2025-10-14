import { User, Channel, DirectMessage } from './types';
import { PlaceHolderImages } from './placeholder-images';

const findImage = (id: string) => PlaceHolderImages.find(img => img.id === id)?.imageUrl || '';

export const users: User[] = [
  { id: '1', name: 'You', avatarUrl: findImage('avatar-1'), status: 'online' },
  { id: '2', name: 'Alice', avatarUrl: findImage('avatar-2'), status: 'online' },
  { id: '3', name: 'Bob', avatarUrl: findImage('avatar-3'), status: 'offline', lastSeen: '2 hours ago' },
  { id: '4', name: 'Charlie', avatarUrl: findImage('avatar-4'), status: 'online' },
  { id: '5', name: 'Diana', avatarUrl: findImage('avatar-5'), status: 'offline', lastSeen: 'yesterday' },
  { id: '6', name: 'Eve', avatarUrl: findImage('avatar-6'), status: 'online' },
  { id: '7', name: 'admin', avatarUrl: findImage('avatar-1'), status: 'online', role: 'admin' },
];

export const channels: Channel[] = [
  {
    id: '1',
    name: 'general',
    type: 'public',
    messages: [
      { id: 'msg1', text: 'Hey everyone, welcome to the general channel!', timestamp: '10:00 AM', user: users[1] },
      { id: 'msg2', text: 'Glad to be here!', timestamp: '10:01 AM', user: users[2] },
      { id: 'msg3', text: 'What\'s the topic for today?', timestamp: '10:02 AM', user: users[3] },
    ],
  },
  {
    id: '2',
    name: 'design-team',
    type: 'private',
    messages: [
      { id: 'msg4', text: 'Hey team, I\'ve pushed the new mockups to Figma.', timestamp: '11:30 AM', user: users[4] },
      { id: 'msg5', text: 'Awesome, will take a look now.', timestamp: '11:31 AM', user: users[0] },
      { id: 'msg6', imageUrl: findImage('chat-image-1'), timestamp: '11:35 AM', user: users[4] },
      { id: 'msg7', text: 'Looks great! One small suggestion, can we try a different shade for the primary button?', timestamp: '11:45 AM', user: users[0] },
      { id: 'msg8', text: 'Good idea. How about we discuss it on the call tomorrow?', timestamp: '11:46 AM', user: users[4] },
    ],
  },
  {
    id: '3',
    name: 'random',
    type: 'public',
    messages: [
      { id: 'msg9', text: 'Anyone seen a good movie lately?', timestamp: '1:00 PM', user: users[5] },
    ],
  },
];

export const directMessages: DirectMessage[] = [
  {
    id: '2', // Corresponds to user with id '2' (Alice)
    name: 'Alice',
    type: 'private',
    messages: [
      { id: 'dm1', text: 'Hey, do you have a minute to chat?', timestamp: '2:15 PM', user: users[1] },
      { id: 'dm2', text: 'Sure, what\'s up?', timestamp: '2:16 PM', user: users[0] },
    ],
  },
  {
    id: '4', // Corresponds to user with id '4' (Charlie)
    name: 'Charlie',
    type: 'private',
    messages: [
      { id: 'dm3', text: 'Project update is live!', timestamp: 'Yesterday', user: users[3] },
    ],
  },
];