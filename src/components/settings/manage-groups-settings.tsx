
"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { User, CompanyRole } from "@/lib/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres."),
  description: z.string().optional(),
  members: z.array(z.string()).optional(),
});

export function ManageGroupsSettings() {
  const router = useRouter();
  const { toast } = useToast();
  const [selectedGroup, setSelectedGroup] = React.useState<string>("");
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const currentUser = users[0];
  const managedGroups = React.useMemo(() => 
    currentUser.companyRoles 
      ? Object.keys(currentUser.companyRoles).filter(companyName => 
          ['CEO', 'Administrador'].includes(currentUser.companyRoles![companyName])
        )
      : [],
    [currentUser.companyRoles]
  );
  
  const allMembersForGroup = React.useMemo(() => 
    selectedGroup ? users.filter(u => u.companyRoles && u.companyRoles[selectedGroup]) : [],
    [selectedGroup]
  );
  const groupDescription = "Descripción del grupo de la empresa."; // Mock description

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      members: [],
    },
  });

  React.useEffect(() => {
    if (selectedGroup) {
      form.reset({
        name: selectedGroup,
        description: groupDescription,
        members: allMembersForGroup.map((m) => m.id),
      });
    } else {
        form.reset({ name: "", description: "", members: [] });
    }
  }, [selectedGroup, allMembersForGroup, form]);


  const onSave = (originalName: string, newName: string, newDescription: string, newUsers: string[]) => {
    toast({
      title: "Grupo actualizado",
      description: `El grupo ${originalName} ha sido actualizado a ${newName}. (Simulación)`,
    });
    console.log("Saving changes for", originalName, { newName, newDescription, newUsers });
    // In a real app, you might want to refresh data or redirect
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (!selectedGroup) return;
    onSave(selectedGroup, values.name, values.description || "", values.members || []);
  };

  const availableContacts = users.filter(user => user.id !== '1');
  const currentMembers = form.watch("members") || [];

  const removeMember = (idToRemove: string) => {
    const newMembers = currentMembers.filter((id) => id !== idToRemove);
    form.setValue("members", newMembers);
  };
  
  if (!isMounted) {
    return null;
  }

  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle>Gestionar Grupos de Empresa</CardTitle>
        <CardDescription>
          Selecciona un grupo para editar sus detalles y miembros.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
            <Label>Seleccionar Grupo</Label>
            <Select onValueChange={setSelectedGroup} value={selectedGroup}>
                <SelectTrigger>
                    <SelectValue placeholder="Elige un grupo para gestionar..." />
                </SelectTrigger>
                <SelectContent>
                    {managedGroups.length > 0 ? (
                        managedGroups.map(group => (
                            <SelectItem key={group} value={group}>{group}</SelectItem>
                        ))
                    ) : (
                        <SelectItem value="none" disabled>No tienes grupos que gestionar</SelectItem>
                    )}
                </SelectContent>
            </Select>
        </div>

        {selectedGroup && (
           <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-4 border-t">
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
                 <FormField
                    control={form.control}
                    name="members"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                        <FormLabel>Invitar/Gestionar Miembros</FormLabel>
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
                                : <p className="text-xs text-center text-muted-foreground p-4">No hay miembros en este grupo.</p>
                            }
                            </div>
                        </ScrollArea>
                        </FormItem>
                    )}
                    />
                <div>
                     <Button type="submit">Guardar Cambios</Button>
                </div>
            </form>
           </Form>
        )}
      </CardContent>
    </Card>
  );
}
