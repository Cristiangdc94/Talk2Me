





export type CompanyRole = 'Empleado' | 'Partner' | 'Administrador' | 'Jefe de proyecto' | 'CEO' | 'Miembro';

export interface CompanyRoleDetails {
    role: CompanyRole;
    tag?: string;
}

export interface User {
  id: string;
  name: string;
  avatarUrl: string;
  status: 'online' | 'offline' | 'busy';
  lastSeen?: string;
  role?: 'admin';
  relationship?: 'friend' | 'coworker';
  email?: string;
  company?: string;
  companyRoles?: { [companyName: string]: CompanyRoleDetails };
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

export interface DirectMessage extends Channel {
  userId: string;
  unreadCount?: number;
}

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
  chatId?: string;
  chatType?: 'channel' | 'dm';
}
