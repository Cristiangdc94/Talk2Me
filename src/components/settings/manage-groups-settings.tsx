
"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { users, companyNews as initialCompanyNews } from "@/lib/mock-data";
import { User, CompanyRoleDetails, CompanyNewsArticle } from "@/lib/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Building2, Upload, User as UserIcon, X, Tag, Plus, Newspaper, Trash2 } from "lucide-react";
import { UserAvatarWithStatus } from "../chat/user-avatar-with-status";

const groupFormSchema = z.object({
    name: z.string().min(2, "El nombre debe tener al menos 2 caracteres."),
    description: z.string().optional(),
    members: z.array(z.object({
        id: z.string(),
        name: z.string(),
        tag: z.string().optional(),
    })),
});

const newArticleSchema = z.object({
    title: z.string().min(5, "El título debe tener al menos 5 caracteres."),
    summary: z.string().min(10, "El resumen debe tener al menos 10 caracteres."),
    imageUrl: z.string().url("Debe ser una URL válida."),
    link: z.string().url("Debe ser una URL válida."),
});

interface ManageableGroup {
    name: string;
    members: User[];
    roleDetails: CompanyRoleDetails;
}

interface GroupEditFormProps {
    group: ManageableGroup;
    allUsers: User[];
}

function GroupEditForm({ group, allUsers }: GroupEditFormProps) {
    const { toast } = useToast();
    const [companyNews, setCompanyNews] = useState(initialCompanyNews.filter(n => n.companyName === group.name));
    const [isAddNewsOpen, setIsAddNewsOpen] = useState(false);
    
    const groupManagementForm = useForm<z.infer<typeof groupFormSchema>>({
        resolver: zodResolver(groupFormSchema),
        defaultValues: {
            name: group.name,
            description: "Descripción del grupo de la empresa.",
            members: group.members.map(m => ({ 
                id: m.id, 
                name: m.name,
                tag: m.companyRoles?.[group.name]?.tag || ''
            })),
        },
    });

    const newArticleForm = useForm<z.infer<typeof newArticleSchema>>({
        resolver: zodResolver(newArticleSchema),
        defaultValues: { title: "", summary: "", imageUrl: "https://picsum.photos/seed/news_placeholder/600/400", link: "#" },
    });

    const { fields } = useFieldArray({
        control: groupManagementForm.control,
        name: "members",
    });

    const onGroupSubmit = (values: z.infer<typeof groupFormSchema>) => {
        toast({
            title: "Grupo Actualizado",
            description: `La configuración de ${values.name} ha sido guardada. (Simulación)`,
        });
        console.log("Saving group data:", values);
    };

    const handleAddArticleSubmit = (values: z.infer<typeof newArticleSchema>) => {
        const newArticle: CompanyNewsArticle = {
            ...values,
            id: `cn-${Date.now()}`,
            companyName: group.name,
            timestamp: "justo ahora"
        };
        setCompanyNews(prev => [newArticle, ...prev]);
        toast({
            title: "Noticia Publicada",
            description: `Se ha añadido "${values.title}" a las noticias de ${group.name}.`,
        });
        newArticleForm.reset();
        setIsAddNewsOpen(false);
    };

    return (
        <Form {...groupManagementForm}>
            <form onSubmit={groupManagementForm.handleSubmit(onGroupSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Columna de Logo y Nombre */}
                    <div className="md:col-span-1 space-y-6">
                        <Card>
                             <CardHeader>
                                <CardTitle className="text-base">Logo Corporativo</CardTitle>
                             </CardHeader>
                             <CardContent className="flex flex-col items-center justify-center gap-4">
                                <div className="w-32 h-32 rounded-lg bg-muted flex items-center justify-center border-dashed border-2">
                                     <Building2 className="w-16 h-16 text-muted-foreground" />
                                </div>
                                <Button type="button" variant="outline">
                                    <Upload className="mr-2 h-4 w-4" />
                                    Subir Logo
                                </Button>
                             </CardContent>
                        </Card>
                        <FormField
                            control={groupManagementForm.control}
                            name="name"
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
                         <FormField
                            control={groupManagementForm.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Descripción</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} rows={5}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    {/* Columna de Miembros y Noticias */}
                    <div className="md:col-span-2 space-y-6">
                         <Card>
                            <CardHeader>
                                <CardTitle className="text-base">Miembros del Grupo</CardTitle>
                                <CardDescription>Añade etiquetas personalizadas a cada miembro.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4 max-h-96 overflow-y-auto">
                                {fields.map((field, index) => {
                                     const user = allUsers.find(u => u.id === field.id);
                                     return (
                                        <div key={field.id} className="flex items-center gap-4 p-2 rounded-md bg-muted/50">
                                            {user && <UserAvatarWithStatus user={user} className="w-10 h-10" />}
                                            <div className="flex-1">
                                                <p className="font-semibold">{field.name}</p>
                                                <p className="text-sm text-muted-foreground">{user?.companyRoles?.[group.name]?.role || 'Miembro'}</p>
                                            </div>
                                            <FormField
                                                control={groupManagementForm.control}
                                                name={`members.${index}.tag`}
                                                render={({ field }) => (
                                                    <FormItem className="flex-1">
                                                        <div className="relative">
                                                            <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                                            <FormControl>
                                                                <Input placeholder="Ej: Líder de equipo" {...field} className="pl-9" />
                                                            </FormControl>
                                                        </div>
                                                    </FormItem>
                                                )}
                                            />
                                            <Button type="button" variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </div>
                                     )
                                })}
                            </CardContent>
                         </Card>

                         <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle className="text-base">Noticias de la Empresa</CardTitle>
                                        <CardDescription>Gestiona las noticias de tu grupo.</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                               <Collapsible open={isAddNewsOpen} onOpenChange={setIsAddNewsOpen}>
                                    <CollapsibleTrigger asChild>
                                        <Button variant="outline" className="w-full">
                                            <Plus className="mr-2 h-4 w-4" />
                                            Añadir Nueva Noticia
                                        </Button>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <Form {...newArticleForm}>
                                            <form onSubmit={newArticleForm.handleSubmit(handleAddArticleSubmit)} className="mt-4 p-4 border rounded-md space-y-4">
                                                <FormField control={newArticleForm.control} name="title" render={({ field }) => (
                                                    <FormItem><FormLabel>Título</FormLabel><FormControl><Input {...field} placeholder="Título del artículo" /></FormControl><FormMessage /></FormItem>
                                                )} />
                                                <FormField control={newArticleForm.control} name="summary" render={({ field }) => (
                                                    <FormItem><FormLabel>Resumen</FormLabel><FormControl><Textarea {...field} placeholder="Un breve resumen de la noticia..." /></FormControl><FormMessage /></FormItem>
                                                )} />
                                                <FormField control={newArticleForm.control} name="imageUrl" render={({ field }) => (
                                                    <FormItem><FormLabel>URL de la Imagen</FormLabel><FormControl><Input {...field} placeholder="https://picsum.photos/seed/..." /></FormControl><FormMessage /></FormMessage>
                                                )} />
                                                <FormField control={newArticleForm.control} name="link" render={({ field }) => (
                                                    <FormItem><FormLabel>Enlace</FormLabel><FormControl><Input {...field} placeholder="#" /></FormControl><FormMessage /></FormMessage>
                                                )} />
                                                <div className="flex justify-end gap-2">
                                                    <Button type="button" variant="ghost" onClick={() => setIsAddNewsOpen(false)}>Cancelar</Button>
                                                    <Button type="submit">Publicar Noticia</Button>
                                                </div>
                                            </form>
                                        </Form>
                                    </CollapsibleContent>
                                </Collapsible>

                                <div className="space-y-4 max-h-96 overflow-y-auto pt-4">
                                  {companyNews.map(article => (
                                      <div key={article.id} className="flex items-center gap-4 p-2 rounded-md bg-muted/50">
                                          <Newspaper className="h-5 w-5 text-muted-foreground" />
                                          <div className="flex-1">
                                              <p className="font-semibold truncate">{article.title}</p>
                                              <p className="text-sm text-muted-foreground truncate">{article.summary}</p>
                                          </div>
                                          <Button type="button" variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                                              <Trash2 className="h-4 w-4" />
                                          </Button>
                                      </div>
                                  ))}
                                  {companyNews.length === 0 && <p className="text-sm text-muted-foreground text-center py-4">No hay noticias para este grupo.</p>}
                                </div>
                             </CardContent>
                         </Card>
                    </div>
                </div>

                <div className="flex justify-end pt-4 border-t">
                    <Button type="submit">Guardar Cambios del Grupo</Button>
                </div>
            </form>
        </Form>
    )
}

export function ManageGroupsSettings() {
    const { toast } = useToast();
    const [isMounted, setIsMounted] = useState(false);
    
    const currentUser = users.find((u) => u.id === "1");
    const allUsers = users;

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const { manageableGroups, memberGroups } = useMemo(() => {
        const manageableGroups: ManageableGroup[] = [];
        const memberGroups: ManageableGroup[] = [];
        const privilegedRoles = ['Administrador', 'CEO', 'Jefe de proyecto'];

        if (currentUser?.companyRoles) {
            for (const companyName in currentUser.companyRoles) {
                const roleDetails = currentUser.companyRoles[companyName];
                const members = allUsers.filter(u => u.companyRoles?.[companyName]);
                const groupData: ManageableGroup = { name: companyName, members, roleDetails };
                
                if (privilegedRoles.includes(roleDetails.role)) {
                    manageableGroups.push(groupData);
                } else {
                    memberGroups.push(groupData);
                }
            }
        }
        return { manageableGroups, memberGroups };
    }, [currentUser, allUsers]);

    const handleLeaveGroup = (groupName: string) => {
        toast({
            title: "Has abandonado el grupo",
            description: `Has abandonado ${groupName}. (Simulación)`,
        });
    };

    if (!isMounted) {
        return (
             <div className="space-y-4">
                <div className="h-12 w-full rounded-lg bg-muted animate-pulse" />
                <div className="h-12 w-full rounded-lg bg-muted animate-pulse" />
             </div>
        )
    }

    return (
        <div className="max-w-6xl space-y-8">
            <div>
                <h3 className="text-lg font-medium">Grupos Administrables</h3>
                <p className="text-sm text-muted-foreground">
                    Edita los detalles de los grupos donde tienes rol de administrador.
                </p>
            </div>
            {manageableGroups.length > 0 ? (
                <Accordion type="single" collapsible className="w-full">
                    {manageableGroups.map((group) => (
                        <AccordionItem value={group.name} key={group.name}>
                            <AccordionTrigger>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center">
                                        <Building2 className="w-5 h-5 text-muted-foreground" />
                                    </div>
                                    <span className="font-semibold">{group.name}</span>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="p-4 bg-background border rounded-b-md">
                                <GroupEditForm group={group} allUsers={allUsers} />
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            ) : (
                <Card className="flex items-center justify-center h-24">
                     <p className="text-sm text-muted-foreground">No tienes grupos administrables.</p>
                </Card>
            )}

            <div className="pt-8">
                <h3 className="text-lg font-medium">Otros Grupos</h3>
                <p className="text-sm text-muted-foreground">
                    Aquí puedes ver otros grupos de los que eres miembro y abandonarlos.
                </p>
            </div>
             {memberGroups.length > 0 ? (
                <div className="space-y-4">
                    {memberGroups.map(group => (
                        <Card key={group.name}>
                            <CardContent className="p-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center">
                                        <UserIcon className="w-5 h-5 text-muted-foreground" />
                                    </div>
                                    <div>
                                        <p className="font-semibold">{group.name}</p>
                                        <p className="text-xs text-muted-foreground">Tu rol: {group.roleDetails.role}</p>
                                    </div>
                                </div>
                                <Button variant="destructive" onClick={() => handleLeaveGroup(group.name)}>
                                    Abandonar Grupo
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                 <Card className="flex items-center justify-center h-24">
                     <p className="text-sm text-muted-foreground">No eres miembro de otros grupos.</p>
                </Card>
            )}
        </div>
    );
}
