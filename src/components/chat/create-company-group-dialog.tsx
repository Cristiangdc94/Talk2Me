
"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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

const formSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres."),
  description: z.string().optional(),
  maxMembers: z.coerce.number().int().positive("Debe ser un número positivo.").optional(),
  members: z.array(z.string()).optional(),
});

interface CreateCompanyGroupDialogProps extends React.ComponentProps<typeof Dialog> {
  onCreate: (name: string, description?: string, maxMembers?: number, members?: string[]) => void;
}

export function CreateCompanyGroupDialog({ onCreate, ...props }: CreateCompanyGroupDialogProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      members: [],
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    onCreate(values.name, values.description, values.maxMembers, values.members);
    form.reset();
    if (props.onOpenChange) {
        props.onOpenChange(false);
    }
  };
  
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      form.reset();
    }
    if (props.onOpenChange) {
        props.onOpenChange(open);
    }
  };

  const availableContacts = users.filter(user => user.id !== '1' && (user.relationship === 'friend' || user.relationship === 'coworker'));

  return (
    <Dialog {...props} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Crear Grupo de Empresa</DialogTitle>
          <DialogDescription>
            Crea un nuevo grupo para organizar a tus compañeros de trabajo.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                  <FormLabel>Descripción (Opcional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe el propósito de este grupo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="maxMembers"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Máximo de Integrantes (Opcional)</FormLabel>
                  <FormControl>
                    <Input type="number" min="1" placeholder="Ej: 10" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="members"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Invitar a Miembros (Opcional)</FormLabel>
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
                        ? `Miembros seleccionados: ${form.getValues('members').map(id => availableContacts.find(c => c.id === id)?.name).join(', ')}`
                        : "No hay miembros seleccionados."}
                    </div>
                </FormItem>
              )}
            />

            <DialogFooter className="pt-4">
                <Button type="submit">Crear Grupo</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
