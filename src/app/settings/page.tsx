
"use client";

import Link from "next/link";
import {
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { AccountSettings } from "@/components/settings/account-settings";
import { VoiceVideoSettings } from "@/components/settings/voice-video-settings";

export default function SettingsPage() {
  return (
    <div className="p-4 sm:p-6 h-full flex flex-col">
       <CardHeader className="px-0">
          <CardTitle className="text-3xl font-bold tracking-tight">Ajustes</CardTitle>
          <CardDescription>
            Gestiona tu cuenta y la configuración de la aplicación. ¿Quieres editar tus grupos de empresa?{" "}
            <Link href="/coworkers" className="text-primary hover:underline font-medium">
                Ve a la página de Compañeros
            </Link>
            .
          </CardDescription>
        </CardHeader>
      <Tabs defaultValue="account" className="flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-2 max-w-sm">
          <TabsTrigger value="account">Mi Cuenta</TabsTrigger>
          <TabsTrigger value="voice-video">Voz y Video</TabsTrigger>
        </TabsList>
        <div className="flex-1 py-6 overflow-auto">
            <TabsContent value="account">
                <AccountSettings />
            </TabsContent>
            <TabsContent value="voice-video">
                <VoiceVideoSettings />
            </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
