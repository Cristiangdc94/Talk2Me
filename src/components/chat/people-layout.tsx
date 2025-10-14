
'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AddContactForm } from "@/components/chat/add-contact-form";

interface PeopleLayoutProps {
    listComponent: React.ReactNode;
}

export function PeopleLayout({ listComponent }: PeopleLayoutProps) {
  return (
    <div className="p-4 sm:p-6">
        <Tabs defaultValue="list">
            <TabsList className="mb-4">
                <TabsTrigger value="list">Tu Lista</TabsTrigger>
                <TabsTrigger value="add">Añadir</TabsTrigger>
            </TabsList>
            <TabsContent value="list">
                {listComponent}
            </TabsContent>
            <TabsContent value="add">
                <AddContactForm />
            </TabsContent>
        </Tabs>
    </div>
  );
}
