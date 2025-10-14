
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useParams, useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres."),
  description: z.string().optional(),
  members: z.array(z.string()).optional(),
});

export default function ManageCompanyGroupPage() {
    const params = useParams();
    const router = useRouter();
    const { toast } = useToast();
    const companyName = typeof params.company === 'string' ? decodeURIComponent(params.company) : '';

    const allMembersForGroup = React.useMemo(() => 
        companyName ? users.filter(u => u.companyRoles && u.companyRoles[companyName]) : [],
        [companyName]
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
        if (companyName) {
            form.reset({
                name: companyName,
                description: groupDescription,
                members: allMembersForGroup.map((m) => m.id),
            });
        }
    }, [companyName, allMembersForGroup, form, groupDescription]);


    const onSave = (originalName: string, newName: string, newDescription: string, newUsers: string[]) => {
        toast({
        title: "Grupo actualizado",
        description: `El grupo ${originalName} ha sido actualizado a ${newName}. (Simulación)`,
        });
        console.log("Saving changes for", originalName, { newName, newDescription, newUsers });
        router.push('/coworkers');
    };

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        if (!companyName) return;
        onSave(companyName, values.name, values.description || "", values.members || []);
    };

    const availableContacts = users.filter(user => user.id !== '1');
    const currentMembers = form.watch("members") || [];

    const removeMember = (idToRemove: string) => {
        const newMembers = currentMembers.filter((id) => id !== idToRemove);
        form.setValue("members", newMembers);
    };

    if (!companyName) {
        return (
            <div className="p-4 sm:p-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Grupo no encontrado</CardTitle>
                        <CardDescription>Por favor, selecciona un grupo desde la página de compañeros.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button onClick={() => router.push('/coworkers')}>Volver a Compañeros</Button>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="p-4 sm:p-6">
        <Card className="max-w-2xl mx-auto">
        <CardHeader>
            <CardTitle>Gestionar {companyName}</CardTitle>
            <CardDescription>
            Edita los detalles y miembros del grupo.
            </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
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
                    <div className="flex justify-end gap-2">
                        <Button type="button" variant="ghost" onClick={() => router.push('/coworkers')}>Cancelar</Button>
                        <Button type="submit">Guardar Cambios</Button>
                    </div>
                </form>
            </Form>
        </CardContent>
        </Card>
        </div>
    );
}
