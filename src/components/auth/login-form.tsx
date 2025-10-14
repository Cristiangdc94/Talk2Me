
"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Cookies from "js-cookie";

import { Button } from "@/components/ui/button";
import {
  CardHeader,
  CardTitle,
  CardDescription
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
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  email: z.string().email({ message: "Por favor, introduce una dirección de correo electrónico válida." }),
  password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres." }),
});

export function LoginForm() {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Simulate Firebase login
    if (values.email === 'admin@example.com' && values.password === 'adminadmin') {
      toast({
        title: 'Inicio de Sesión de Administrador Exitoso',
        description: '¡Bienvenido de nuevo, administrador! Redirigiendo...',
      });
      Cookies.set('auth_token', 'mock_admin_token_for_demo', {expires: 1});
      window.location.href = '/';
    } else {
      toast({
        title: 'Inicio de Sesión Exitoso',
        description: '¡Bienvenido de nuevo! Redirigiendo...',
      });
      Cookies.set('auth_token', 'mock_user_token_for_demo', {expires: 1});
      window.location.href = '/';
    }
  }

  return (
    <div className="flex flex-col justify-center h-full">
       <CardHeader className="text-center p-0 mb-6">
        <CardTitle className="text-2xl font-semibold tracking-tight">Iniciar Sesión</CardTitle>
        <CardDescription>Introduce tus credenciales para acceder a tu cuenta</CardDescription>
      </CardHeader>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="h-[72px] md:h-[68px] flex items-center justify-center">
            <p className="text-5xl font-headline text-foreground/80">¡Bienvenido!</p>
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correo Electrónico</FormLabel>
                <FormControl>
                  <Input placeholder="nombre@ejemplo.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contraseña</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Iniciando sesión..." : "Iniciar Sesión"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
