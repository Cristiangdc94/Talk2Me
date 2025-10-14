
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { UserListCard } from "@/components/chat/user-list-card";
import { User, CompanyRoleDetails, Channel } from "@/lib/types";
import { Plus, MoreVertical, Settings, MessageSquare, Building2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { ScrollArea } from '../ui/scroll-area';
import { CreateCompanyGroupDialog } from './create-company-group-dialog';
import { users, channels as initialChannels } from '@/lib/mock-data';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { useToast } from '@/hooks/use-toast';
import { useChat } from '@/hooks/use-chat';
import { Skeleton } from '../ui/skeleton';

interface CoworkersListProps {
  initialGroupedUsers: Record<string, User[]>;
}

function CompanyLogoPlaceholder() {
    return (
        <div className="mt-2 h-16 w-full bg-background/50 rounded-md flex items-center justify-center">
            <div className='text-center text-muted-foreground'>
                <Building2 className="h-5 w-5 mx-auto" />
                <p className='text-xs font-semibold mt-1'>Logo</p>
            </div>
        </div>
    );
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

const roleOrder = ['CEO', 'Administrador', 'Jefe de proyecto', 'Empleado', 'Partner', 'Miembro'];
const getRoleSortValue = (roleDetails?: CompanyRoleDetails) => {
    if (!roleDetails) return roleOrder.length;
    const index = roleOrder.indexOf(roleDetails.role);
    return index === -1 ? roleOrder.length : index;
};

export function CoworkersList({
  initialGroupedUsers,
}: CoworkersListProps) {
  const [groupedUsers, setGroupedUsers] = useState(initialGroupedUsers);
  const [isCreateGroupOpen, setCreateGroupOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(users.find(u => u.id === '1'));
  const [isMounted, setIsMounted] = useState(false);
  const { toast } = useToast();
  const { openChat } = useChat();

  const [channels, setChannels] = useState<Channel[]>(initialChannels);

  const privilegedRoles = ['Administrador', 'CEO', 'Jefe de proyecto'];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
     setGroupedUsers(initialGroupedUsers);
  }, [initialGroupedUsers]);

  const handleCreateGroup = (companyName: string) => {
    if (companyName && !groupedUsers[companyName]) {
        const newUserWithRole: User = {
            ...currentUser!,
            companyRoles: { 
                ...currentUser?.companyRoles, 
                [companyName]: { role: 'Administrador' } 
            }
        };
        
        setCurrentUser(newUserWithRole);
        
        setGroupedUsers(prev => ({
            ...prev,
            [companyName]: [newUserWithRole]
        }));

        const newChannel: Channel = {
          id: `channel-${companyName.toLowerCase().replace(/\s/g, '-')}-chat`,
          name: `${companyName} Chat`,
          type: 'private',
          messages: [{
            id: 'msg-welcome',
            text: `Bienvenido al chat corporativo de ${companyName}.`,
            timestamp: new Date().toLocaleTimeString(),
            user: users.find(u => u.role === 'admin') || users[0]
          }]
        };

        setChannels(prev => [...prev, newChannel]);
    }
    setCreateGroupOpen(false);
  };
  
  const handleCorporateChat = (companyName: string) => {
    const channelId = `channel-${companyName.toLowerCase().replace(/\s/g, '-')}-chat`;
    const channelExists = initialChannels.find(c => c.id === channelId) || channels.find(c => c.id === channelId);
    if (channelExists) {
        openChat(channelId);
    } else {
        toast({
            variant: "destructive",
            title: "Canal no encontrado",
            description: `El canal de chat para ${companyName} aún no ha sido creado.`
        });
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <>
        <CreateCompanyGroupDialog 
            isOpen={isCreateGroupOpen}
            onOpenChange={setCreateGroupOpen}
            onCreate={handleCreateGroup}
        />
        <div className="flex-1 overflow-x-auto px-4 sm:px-6 pb-6">
            <div className="flex gap-6 h-full">
            {Object.entries(groupedUsers).map(([company, userList]) => {
                const currentUserRoleDetails = currentUser?.companyRoles?.[company];

                const sortedUsers = [...userList].sort((a, b) => {
                    const roleA = a.companyRoles?.[company];
                    const roleB = b.companyRoles?.[company];
                    return getRoleSortValue(roleA) - getRoleSortValue(roleB);
                });

                return (
                    <div key={company} className="w-[320px] shrink-0 h-full">
                        <Card className="h-full flex flex-col bg-muted/50 group/card overflow-hidden">

                             <div className="absolute top-3 right-3 flex items-center gap-1">
                                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleCorporateChat(company)}>
                                    <MessageSquare className="h-4 w-4" />
                                </Button>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-7 w-7">
                                            <MoreVertical className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem asChild>
                                            <Link href={`/settings`}>
                                                <Settings className="mr-2 h-4 w-4" />
                                                <span>Gestionar Grupo</span>
                                            </Link>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>

                            <CardHeader>
                                <CardTitle className='font-bold text-lg'>{company}</CardTitle>
                                <CardDescription className='text-sm text-muted-foreground'>Descripción del grupo de la empresa.</CardDescription>
                                <CompanyLogoPlaceholder />
                            </CardHeader>
                            <CardContent className="flex-1 overflow-hidden p-0">
                                <ScrollArea className="h-full">
                                    <div className="space-y-4 transition-colors p-4 min-h-[100px]">
                                        {sortedUsers.length > 0 ? (
                                            sortedUsers.map((user) => (
                                                <UserListCard 
                                                    key={user.id} 
                                                    user={user}
                                                    currentUserRole={currentUserRoleDetails?.role}
                                                    userRoleDetails={user.companyRoles?.[company]} 
                                                />
                                            ))
                                        ) : (
                                            <div className="text-center py-4 text-sm text-muted-foreground h-24 flex items-center justify-center">
                                               No hay compañeros en este grupo.
                                            </div>
                                        )}
                                    </div>
                                </ScrollArea>
                            </CardContent>
                        </Card>
                    </div>
                )
            })}
             <div className="w-[320px] shrink-0 h-full">
                <CreateGroupCard onClick={() => setCreateGroupOpen(true)} />
            </div>
            </div>
        </div>
    </>
  );
}
