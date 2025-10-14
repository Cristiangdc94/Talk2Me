
"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { users } from "@/lib/mock-data";
import { User } from "@/lib/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { notFound, useRouter, useParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres."),
  description: z.string().optional(),
  members: z.array(z.string()).optional(),
  password: z.string().optional(),
  schedules: z.string().optional(),
  generalMessage: z.string().optional(),
  links: z.string().optional(),
  news: z.string().optional(),
});


export default function ManageCompanyGroupPage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const companyName = decodeURIComponent(params.company as string);

  // In a real app, you would fetch this data from an API
  const allMembers = React.useMemo(() => users.filter(u => u.companyRoles && u.companyRoles[companyName]), [companyName]);
  const groupDescription = "Descripción del grupo de la empresa."; // Mock description

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: companyName,
      description: groupDescription,
      members: allMembers.map(m => m.id),
      password: "",
      schedules: "",
      generalMessage: "",
      links: "",
      news: "",
    },
  });
  
  React.useEffect(() => {
    form.reset({
        name: companyName,
        description: groupDescription,
        members: allMembers.map(m => m.id),
    });
  }, [companyName, groupDescription, allMembers, form]);

  const onSave = (originalName: string, newName: string, newDescription: string, newUsers: string[]) => {
     toast({
        title: "Grupo actualizado",
        description: `El grupo ${originalName} ha sido actualizado a ${newName}. (Simulación)`
    });
    console.log("Saving changes for", originalName, {newName, newDescription, newUsers});
    router.push('/coworkers');
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    onSave(companyName, values.name, values.description || '', values.members || []);
  };

  const availableContacts = users.filter(user => user.id !== '1');
  const currentMembers = form.watch('members') || [];
  
  const removeMember = (idToRemove: string) => {
    const newMembers = currentMembers.filter(id => id !== idToRemove);
    form.setValue('members', newMembers);
  };
  
  if (!allMembers.length) {
    notFound();
  }

  return (
    <Card className="w-full h-full max-w-4xl mx-auto my-6">
        <CardHeader>
             <DialogTitle>Gestionar {companyName}</DialogTitle>
            <DialogDescription>
                Actualiza los detalles del grupo y gestiona a sus miembros.
            </DialogDescription>
        </CardHeader>
        <CardContent>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 flex flex-col overflow-hidden gap-4">
                <Tabs defaultValue="general" className="w-full flex-1 flex flex-col overflow-hidden">
                    <TabsList className="grid w-full grid-cols-3 shrink-0">
                        <TabsTrigger value="general">General</TabsTrigger>
                        <TabsTrigger value="members">Miembros</TabsTrigger>
                        <TabsTrigger value="advanced">Avanzado</TabsTrigger>
                    </TabsList>
                    <div className="flex-1 overflow-auto mt-4">
                        <TabsContent value="general" className="space-y-4 py-4 px-1">
                            <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Nombre del Grupo</FormLabel>
                                <FormControl>
                                    <Input placeholder="Nombre de la empresa" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                            <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Descripción</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Describe el propósito de este grupo" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                        </TabsContent>
                        <TabsContent value="members" className="space-y-4 py-4 px-1 h-full">
                            <FormField
                                control={form.control}
                                name="members"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col h-full">
                                    <FormLabel>Invitar a Miembros</FormLabel>
                                    <Select onValueChange={(value) => field.onChange([...(field.value || []), value])}>
                                        <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecciona usuarios para invitar" />
                                        </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                        {availableContacts.map(contact => (
                                            <SelectItem key={contact.id} value={contact.id} disabled={field.value?.includes(contact.id)}>
                                            {contact.name}
                                            </SelectItem>
                                        ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                    <p className="text-sm text-muted-foreground pt-2">Miembros actuales:</p>
                                    <ScrollArea className="flex-1 rounded-md border mt-2 min-h-[200px]">
                                        <div className="p-2 space-y-2">
                                        {currentMembers.length > 0
                                            ? currentMembers.map(id => {
                                                const member = users.find(u => u.id === id);
                                                return member ? (
                                                    <Badge key={id} variant="secondary" className="mr-2 flex justify-between items-center">
                                                        {member.name}
                                                        <Button variant="ghost" size="icon" className="h-4 w-4 ml-2" onClick={() => removeMember(id)}>
                                                            <X className="h-3 w-3" />
                                                        </Button>
                                                    </Badge>
                                                ) : null;
                                            })
                                            : <p className="text-xs text-center text-muted-foreground p-4">No hay miembros seleccionados.</p>
                                        }
                                        </div>
                                    </ScrollArea>
                                    </FormItem>
                                )}
                                />
                        </TabsContent>
                        <TabsContent value="advanced" className="space-y-4 py-4 px-1">
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Contraseña del Grupo (Opcional)</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="••••••••" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="schedules"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Horarios</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Lunes a Viernes, 9am - 5pm" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="generalMessage"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Mensaje General</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Mensaje anclado para todos los miembros" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="links"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Links de Interés</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="https://example.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="news"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Noticias</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Últimas noticias sobre el proyecto" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </TabsContent>
                    </div>
                </Tabs>
                <DialogFooter className="pt-4 shrink-0">
                    <Button type="button" variant="ghost" onClick={() => router.back()}>Cancelar</Button>
                    <Button type="submit">Guardar Cambios</Button>
                </DialogFooter>
            </form>
            </Form>
        </CardContent>
    </Card>
  );
}
