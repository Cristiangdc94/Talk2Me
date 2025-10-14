
"use client";

import React, { useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { users } from '@/lib/mock-data';
import type { User, CompanyRole } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { UserAvatarWithStatus } from '../chat/user-avatar-with-status';
import { Badge } from '../ui/badge';
import { Building2, Save, Trash2, X, Edit } from 'lucide-react';

const groupSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres."),
  description: z.string().optional(),
});

export function ManageGroupsSettings() {
  const [currentUser, setCurrentUser] = useState(users.find(u => u.id === '1'));
  const [editingTagFor, setEditingTagFor] = useState<{ groupId: string; userId: string } | null>(null);
  const [tagValue, setTagValue] = useState('');
  const { toast } = useToast();

  const form = useForm<z.infer<typeof groupSchema>>({
    resolver: zodResolver(groupSchema),
  });

  const privilegedRoles: CompanyRole[] = ['Administrador', 'CEO', 'Jefe de proyecto'];

  const { managedGroups, memberGroups } = useMemo(() => {
    const managed: { id: string; name: string; description: string; members: User[] }[] = [];
    const member: { id: string; name: string }[] = [];

    if (currentUser?.companyRoles) {
      for (const companyName in currentUser.companyRoles) {
        const roleDetails = currentUser.companyRoles[companyName];
        if (roleDetails && privilegedRoles.includes(roleDetails.role)) {
          managed.push({
            id: companyName,
            name: companyName,
            description: `Descripción del grupo de la empresa ${companyName}.`,
            members: users.filter(u => u.companyRoles?.[companyName]),
          });
        } else {
          member.push({ id: companyName, name: companyName });
        }
      }
    }
    return { managedGroups: managed, memberGroups: member };
  }, [currentUser]);

  const onGroupSubmit = (values: z.infer<typeof groupSchema>, groupName: string) => {
    toast({
      title: 'Grupo Actualizado',
      description: `La información de "${groupName}" ha sido guardada. (Simulación)`,
    });
    console.log(`Updating group ${groupName}:`, values);
  };

  const handleLeaveGroup = (groupName: string) => {
    toast({
      title: 'Has Abandonado el Grupo',
      description: `Ya no eres miembro de "${groupName}". (Simulación)`,
    });
    console.log(`Leaving group ${groupName}`);
  };

  const handleTagEdit = (memberId: string, groupId: string, currentTag?: string) => {
    setEditingTagFor({ groupId, userId: memberId });
    setTagValue(currentTag || '');
  };

  const handleTagSave = () => {
    if (!editingTagFor) return;
    // In a real app, you would save the tag here.
    toast({
      title: 'Etiqueta Actualizada',
      description: `La etiqueta para el usuario ha sido guardada. (Simulación)`,
    });
    console.log(`Saving tag for user ${editingTagFor.userId} in group ${editingTagFor.groupId}: ${tagValue}`);
    // This is a simulation, so we need to update the mock data locally
    const updatedUsers = users.map(u => {
        if(u.id === editingTagFor.userId && u.companyRoles?.[editingTagFor.groupId]) {
            u.companyRoles[editingTagFor.groupId].tag = tagValue;
        }
        return u;
    });
    // This part is tricky without a global state, for the demo we just reset.
    // In a real app, you'd refetch or update a global state.
    setEditingTagFor(null);
    setTagValue('');
  };

  if (managedGroups.length === 0 && memberGroups.length === 0) {
    return (
      <Card className="max-w-4xl">
        <CardHeader>
          <CardTitle>Gestionar Grupos</CardTitle>
          <CardDescription>No eres miembro de ningún grupo de empresa.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="max-w-4xl space-y-8">
      {managedGroups.map(group => (
        <Card key={group.id}>
          <CardHeader>
            <CardTitle>{group.name}</CardTitle>
            <CardDescription>Tienes permisos de administrador en este grupo.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit((data) => onGroupSubmit(data, group.name))} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Columna de Logo y Nombre */}
                  <div className="space-y-4 md:col-span-1">
                    <FormItem>
                      <FormLabel>Logo Corporativo</FormLabel>
                      <div className="w-full aspect-square bg-muted rounded-lg flex items-center justify-center border-2 border-dashed">
                        <div className="text-center text-muted-foreground">
                            <Building2 className="h-10 w-10 mx-auto" />
                            <p className="text-xs mt-2">Haz clic para subir</p>
                        </div>
                      </div>
                    </FormItem>
                    <FormField
                      control={form.control}
                      name="name"
                      defaultValue={group.name}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nombre del Grupo</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  {/* Columna de Descripción y Miembros */}
                  <div className="space-y-4 md:col-span-2">
                    <FormField
                      control={form.control}
                      name="description"
                      defaultValue={group.description}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Descripción del Grupo</FormLabel>
                          <FormControl>
                            <Textarea {...field} rows={5} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div>
                      <h4 className="font-medium mb-2">Miembros</h4>
                      <div className="space-y-2">
                        {group.members.map(member => (
                          <div key={member.id} className="flex items-center justify-between p-2 rounded-md border">
                            <div className="flex items-center gap-3">
                              <UserAvatarWithStatus user={member} />
                              <div>
                                <p className="font-semibold">{member.name} {member.id === currentUser?.id && '(Tú)'}</p>
                                <p className="text-sm text-muted-foreground">{member.companyRoles?.[group.id]?.role}</p>
                              </div>
                            </div>
                            <div className='flex items-center gap-2'>
                              {editingTagFor?.userId === member.id && editingTagFor.groupId === group.id ? (
                                <div className="flex items-center gap-2">
                                  <Input value={tagValue} onChange={e => setTagValue(e.target.value)} placeholder="Ej: Frontend Dev" className="h-8"/>
                                  <Button type="button" size="icon" className="h-8 w-8" onClick={handleTagSave}><Save className="h-4 w-4"/></Button>
                                  <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={() => setEditingTagFor(null)}><X className="h-4 w-4"/></Button>
                                </div>
                              ) : (
                                <>
                                  {member.companyRoles?.[group.id]?.tag && <Badge variant="secondary">{member.companyRoles?.[group.id]?.tag}</Badge>}
                                  <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleTagEdit(member.id, group.id, member.companyRoles?.[group.id]?.tag)}>
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                </>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button type="submit">
                    <Save className="mr-2 h-4 w-4" /> Guardar Cambios
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      ))}

      {memberGroups.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Otros Grupos</CardTitle>
            <CardDescription>Perteneces a estos grupos como miembro o partner.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {memberGroups.map(group => (
              <div key={group.id} className="flex items-center justify-between p-3 rounded-lg border">
                <p className="font-semibold">{group.name}</p>
                <Button variant="destructive" onClick={() => handleLeaveGroup(group.name)}>
                  <Trash2 className="mr-2 h-4 w-4" /> Abandonar Grupo
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
