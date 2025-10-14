
'use client';

import { useState } from 'react';
import { NewsPortal } from "@/components/news/news-portal";
import { UserList } from '@/components/chat/user-list';
import { MainNav } from '@/components/main-nav';
import { users } from '@/lib/mock-data';
import { Card, CardContent } from '@/components/ui/card';

export default function Home() {
  const [activeTab, setActiveTab] = useState('news');

  const friends = users.filter(u => u.relationship === 'friend');
  const coworkers = users.filter(u => u.relationship === 'coworker');

  return (
    <Card className="h-full w-full">
      <CardContent className="p-0">
          <MainNav activeTab={activeTab} onTabChange={setActiveTab} />
          <div className="p-6">
            {activeTab === 'news' && <NewsPortal />}
            {activeTab === 'friends' && <UserList title="Amigos" users={friends} />}
            {activeTab === 'coworkers' && <UserList title="Compañeros de Trabajo" users={coworkers} />}
          </div>
      </CardContent>
    </Card>
  );
}
