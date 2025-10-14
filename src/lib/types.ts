export interface User {
  id: string;
  name: string;
  avatarUrl: string;
  status: 'online' | 'offline';
  lastSeen?: string;
}

export interface Message {
  id: string;
  text?: string;
  imageUrl?: string;
  timestamp: string;
  user: User;
}

export interface Channel {
  id: string;
  name: string;
  type: 'public' | 'private';
  messages: Message[];
}

export interface DirectMessage extends Channel {}
