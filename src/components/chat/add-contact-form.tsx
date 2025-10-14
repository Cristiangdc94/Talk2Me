"use client";

import { useState } from "react";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, UserPlus, Briefcase } from "lucide-react";
import { users } from "@/lib/mock-data";
import { User } from "@/lib/types";
import { UserAvatarWithStatus } from "./user-avatar-with-status";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "../ui/separator";

const searchSchema = z.object({
  query: z.string().min(2, "La búsqueda debe tener al menos 2 caracteres."),
});

export function AddContactForm() {
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [searched, setSearched] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      query: "",
    },
  });

  function onSubmit(values: z.infer<typeof searchSchema>) {
    const query = values.query.toLowerCase();
    const filteredUsers = users.filter(
      (user) =>
        user.id !== '1' && // Exclude current user
        (user.name.toLowerCase().includes(query) ||
         (user.email && user.email.toLowerCase().includes(query)))
    );
    setSearchResults(filteredUsers);
    setSearched(true);
  }

  const handleAdd = (userName: string, type: 'amigo' | 'compañero') => {
    toast({
      title: "Solicitud Enviada",
      description: `Se ha enviado una solicitud de ${type} a ${userName}.`,
    });
  };

  return (
    <Card className="w-full h-full border-0 sm:border rounded-none sm:rounded-lg">
      <CardHeader>
        <CardTitle>Añadir Contacto</CardTitle>
        <CardDescription>
          Busca usuarios por nombre o correo electrónico para añadirlos como amigos o compañeros de trabajo.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-end gap-4 mb-6">
            <FormField
              control={form.control}
              name="query"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Buscar usuario</FormLabel>
                  <FormControl>
                    <Input placeholder="nombre@ejemplo.com o Nombre de Usuario" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">
              <Search className="mr-2 h-4 w-4" />
              Buscar
            </Button>
          </form>
        </Form>

        <Separator />

        <div className="mt-6 space-y-4">
            {searched && searchResults.length === 0 && (
                <p className="text-center text-muted-foreground">No se encontraron usuarios.</p>
            )}
            {searchResults.map(user => (
                <Card key={user.id}>
                    <CardContent className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <UserAvatarWithStatus user={user} />
                            <div>
                                <p className="font-semibold">{user.name}</p>
                                <p className="text-sm text-muted-foreground">{user.email || 'Sin correo electrónico'}</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => handleAdd(user.name, 'amigo')}>
                                <UserPlus className="mr-2 h-4 w-4" />
                                Amigo
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleAdd(user.name, 'compañero')}>
                                <Briefcase className="mr-2 h-4 w-4" />
                                Compañero
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>

      </CardContent>
    </Card>
  );
}
