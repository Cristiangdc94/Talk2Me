
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

interface ManageCompanyGroupDialogProps extends Omit<React.ComponentProps<typeof Dialog>, 'onOpenChange'> {
  onOpenChange: (open: boolean) => void;
  groupName: string;
  groupDescription: string;
  members: User[];
  onSave: (originalName: string, newName: string, newDescription: string, newUsers: string[]) => void;
}

export function ManageCompanyGroupDialog({
  onSave,
  groupName,
  groupDescription,
  members,
  ...props
}: ManageCompanyGroupDialogProps) {
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: groupName,
      description: groupDescription,
      members: members.map(m => m.id),
      password: "",
      schedules: "",
      generalMessage: "",
      links: "",
      news: "",
    },
  });
  
  React.useEffect(() => {
    form.reset({
        name: groupName,
        description: groupDescription,
        members: members.map(m => m.id),
    });
  }, [groupName, groupDescription, members, form]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Here you would handle saving all the new values
    onSave(groupName, values.name, values.description || '', values.members || []);
    form.reset();
    props.onOpenChange(false);
  };
  
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      form.reset();
    }
    props.onOpenChange(open);
  };

  const availableContacts = users.filter(user => user.id !== '1' && (user.relationship === 'friend' || user.relationship === 'coworker'));

  return (
    <Dialog {...props} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Gestionar {groupName}</DialogTitle>
          <DialogDescription>
            Actualiza los detalles del grupo y gestiona a sus miembros.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Tabs defaultValue="general" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="members">Miembros</TabsTrigger>
                    <TabsTrigger value="advanced">Avanzado</TabsTrigger>
                </TabsList>
                <TabsContent value="general" className="space-y-4 py-4">
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
                <TabsContent value="members" className="space-y-4 py-4">
                    <FormField
                        control={form.control}
                        name="members"
                        render={({ field }) => (
                            <FormItem>
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
                            <div className="text-sm text-muted-foreground pt-2">
                                {form.getValues('members') && form.getValues('members').length > 0
                                    ? `Miembros: ${form.getValues('members').map(id => users.find(c => c.id === id)?.name).filter(Boolean).join(', ')}`
                                    : "No hay miembros seleccionados."}
                                </div>
                            </FormItem>
                        )}
                        />
                </TabsContent>
                <TabsContent value="advanced" className="space-y-4 py-4">
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
            </Tabs>
            <DialogFooter className="pt-4">
                <Button type="button" variant="ghost" onClick={() => props.onOpenChange(false)}>Cancelar</Button>
                <Button type="submit">Guardar Cambios</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
