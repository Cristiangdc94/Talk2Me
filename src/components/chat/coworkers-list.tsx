
'use client';

import { useState, useEffect } from 'react';
import { UserListCard } from "@/components/chat/user-list-card";
import { User } from "@/lib/types";
import { Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { cn } from '@/lib/utils';
import { ScrollArea } from '../ui/scroll-area';
import { CreateCompanyGroupDialog } from './create-company-group-dialog';

interface CoworkersListProps {
  initialGroupedUsers: Record<string, User[]>;
}

function CreateGroupCard({ onClick }: { onClick: () => void }) {
    return (
        <Card
            className="h-full flex flex-col items-center justify-center text-center transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer bg-muted/30 hover:bg-muted/60"
            onClick={onClick}
        >
            <CardContent className="p-4 flex flex-col items-center justify-center gap-2">
                <Plus className="h-8 w-8 text-muted-foreground" />
                <p className="font-semibold text-sm">Crear Grupo de Empresa</p>
            </CardContent>
        </Card>
    );
}

export function CoworkersList({
  initialGroupedUsers,
}: CoworkersListProps) {
  const [groupedUsers, setGroupedUsers] = useState(initialGroupedUsers);
  const [isCreateGroupOpen, setCreateGroupOpen] = useState(false);

  useEffect(() => {
    setGroupedUsers(initialGroupedUsers);
  }, [initialGroupedUsers]);

  const handleCreateGroup = (companyName: string) => {
    if (companyName && !groupedUsers[companyName]) {
        setGroupedUsers(prev => ({
            ...prev,
            [companyName]: []
        }));
    }
    setCreateGroupOpen(false);
  };

  return (
    <>
        <CreateCompanyGroupDialog 
            isOpen={isCreateGroupOpen}
            onOpenChange={setCreateGroupOpen}
            onCreate={handleCreateGroup}
        />
        <div className="flex-1 overflow-x-auto px-4 sm:px-6 pb-6">
            <div className="flex gap-6 h-full">
            {Object.entries(groupedUsers).map(([company, users]) => (
                <div key={company} className="w-[320px] shrink-0 h-full">
                <Card className="h-full flex flex-col bg-muted/50">
                    <CardHeader>
                        <CardTitle className='font-bold text-lg'>{company}</CardTitle>
                        <CardDescription className='text-sm text-muted-foreground'>Descripción del grupo de la empresa.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 overflow-hidden p-0">
                        <ScrollArea className="h-full">
                            <div
                                className={cn(
                                    "space-y-4 transition-colors p-4 min-h-[100px]"
                                )}
                            >
                                {users.map((user) => (
                                    <div
                                        key={user.id}
                                        className={cn(
                                            "relative group/item"
                                        )}
                                    >
                                        <UserListCard user={user} />
                                    </div>
                                ))}
                                {users.length === 0 && (
                                    <div className="text-center py-4 text-sm text-muted-foreground h-24 flex items-center justify-center">
                                    No hay compañeros en este grupo.
                                    </div>
                                )}
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>
                </div>
            ))}
             <div className="w-[320px] shrink-0 h-full">
                <CreateGroupCard onClick={() => setCreateGroupOpen(true)} />
            </div>
            </div>
        </div>
    </>
  );
}
