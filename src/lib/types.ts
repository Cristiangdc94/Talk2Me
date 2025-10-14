
export interface User {
  id: string;
  name: string;
  avatarUrl: string;
  status: 'online' | 'offline' | 'busy';
  lastSeen?: string;
  role?: 'admin';
  relationship?: 'friend' | 'coworker';
  email?: string;
}

export interface Message {
  id: string;
  text?: string;
  imageUrl?: string;
  timestamp: string;
  user: User;
}

export interface Channel {
  id:string;
  name: string;
  type: 'public' | 'private';
  messages: Message[];
}

export interface DirectMessage extends Channel {}

export interface NewsArticle {
  id: string;
  category: 'technology' | 'business' | 'sports' | 'health' | 'entertainment';
  location: 'local' | 'global';
  title: string;
  summary: string;
  imageUrl: string;
  link: string;
}

export interface FriendStatus {
  id: string;
  user: User;
  statusText: string;
  timestamp: string;
}

export interface Notification {
  id: string;
  type: 'message' | 'call' | 'news';
  text: string;
  timestamp: string;
  link?: string;
}
