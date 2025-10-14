
'use client';

import { useState, useEffect } from 'react';
import { UserListCard } from "@/components/chat/user-list-card";
import { User, CompanyRole } from "@/lib/types";
import { Plus, Tag, MoreVertical, Settings, UserPlus, MessageSquare, Trash2, LogOut, Info, Building2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { ScrollArea } from '../ui/scroll-area';
import { CreateCompanyGroupDialog } from './create-company-group-dialog';
import { users } from '@/lib/mock-data';
import { Separator } from '../ui/separator';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { useToast } from '@/hooks/use-toast';

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

const roleOrder: CompanyRole[] = ['CEO', 'Administrador', 'Jefe de proyecto', 'Empleado', 'Partner', 'Miembro'];
const getRoleSortValue = (role: CompanyRole) => {
    const index = roleOrder.indexOf(role);
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

  const privilegedRoles: CompanyRole[] = ['Administrador', 'CEO', 'Jefe de proyecto'];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setGroupedUsers(initialGroupedUsers);
  }, [initialGroupedUsers]);

  const handleCreateGroup = (companyName: string) => {
    if (companyName && !groupedUsers[companyName]) {
        setGroupedUsers(prev => {
          const newUser = {
              ...(users.find(u => u.id === '1')),
              companyRoles: { ...currentUser?.companyRoles, [companyName]: 'Administrador' as const }
          } as User;
            return {
                ...prev,
                [companyName]: [newUser]
            };
        });
        setCurrentUser(prevUser => {
            if (!prevUser) return prevUser;
            const newRoles = { ...prevUser.companyRoles, [companyName]: 'Administrador' as const };
            console.log(`User ${prevUser.name} is now Administrator of ${companyName}`);
            return { ...prevUser, companyRoles: newRoles };
        });
    }
    setCreateGroupOpen(false);
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
                const currentUserRole = currentUser?.companyRoles?.[company];
                const isPrivileged = currentUserRole && privilegedRoles.includes(currentUserRole);

                const sortedUsers = [...userList].sort((a, b) => {
                    const roleA = a.companyRoles?.[company] || 'Miembro';
                    const roleB = b.companyRoles?.[company] || 'Miembro';
                    return getRoleSortValue(roleA) - getRoleSortValue(roleB);
                });

                return (
                    <div key={company} className="w-[320px] shrink-0 h-full">
                        <Card className="h-full flex flex-col bg-muted/50 relative group/card">
                             <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="absolute top-3 right-3 h-7 w-7">
                                        <MoreVertical className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    {isPrivileged ? (
                                        <>
                                            <DropdownMenuItem onClick={() => toast({title: "Función no implementada"})}>
                                                <Settings className="mr-2 h-4 w-4" />
                                                <span>Gestionar Grupo</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => toast({title: "Función no implementada"})}>
                                                <UserPlus className="mr-2 h-4 w-4" />
                                                <span>Invitar gente</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => toast({title: "Función no implementada"})}>
                                                <MessageSquare className="mr-2 h-4 w-4" />
                                                <span>Mensaje general</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem className="text-destructive" onClick={() => toast({variant: 'destructive', title: "Grupo eliminado"})}>
                                                <Trash2 className="mr-2 h-4 w-4" />
                                                <span>Eliminar Grupo</span>
                                            </DropdownMenuItem>
                                        </>
                                    ) : (
                                        <>
                                            <DropdownMenuItem onClick={() => toast({title: "Función no implementada"})}>
                                                <Info className="mr-2 h-4 w-4" />
                                                <span>Ver detalles</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => toast({title: "Has abandonado el grupo"})}>
                                                <LogOut className="mr-2 h-4 w-4" />
                                                <span>Abandonar el grupo</span>
                                            </DropdownMenuItem>
                                        </>
                                    )}
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <CardHeader>
                                <CardTitle className='font-bold text-lg'>{company}</CardTitle>
                                <CardDescription className='text-sm text-muted-foreground'>Descripción del grupo de la empresa.</CardDescription>
                                <div className="mt-2 h-16 w-full bg-background/50 rounded-md flex items-center justify-center">
                                    <div className='text-center text-muted-foreground'>
                                        <Building2 className="h-5 w-5 mx-auto" />
                                        <p className='text-xs font-semibold mt-1'>Logo de la Empresa</p>
                                    </div>
                                </div>
                                {currentUserRole && (
                                    <>
                                        <Separator className="my-2 bg-border/50"/>
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground pt-1">
                                            <Tag className="h-3 w-3" />
                                            <span>Tu Rol: <span className="font-semibold text-foreground">{currentUserRole}</span></span>
                                        </div>
                                    </>
                                )}
                            </CardHeader>
                            <CardContent className="flex-1 overflow-hidden p-0">
                                <ScrollArea className="h-full">
                                    <div className="space-y-4 transition-colors p-4 min-h-[100px]">
                                        {sortedUsers.length > 0 ? (
                                            sortedUsers.map((user) => (
                                                <UserListCard 
                                                    key={user.id} 
                                                    user={user}
                                                    currentUserRole={currentUserRole}
                                                    userRole={user.companyRoles?.[company]} 
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
