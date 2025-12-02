
"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { UserAvatarWithStatus } from "@/components/chat/user-avatar-with-status";
import { Edit, Save, X, Camera } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { User } from "@/lib/types";

interface UserProfilePageProps {
  user: User;
  currentUser: User;
}

export function UserProfilePage({ user: initialUser, currentUser }: UserProfilePageProps) {
  const [user, setUser] = useState(initialUser);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    description: user.description || "",
    interests: user.interests || [],
  });
  const { toast } = useToast();
  const isOwner = user.id === currentUser.id;

  const handleEditToggle = () => {
    if (isEditing) {
      // If canceling, reset the form data
      setEditData({
        description: user.description || "",
        interests: user.interests || [],
      });
    }
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    // In a real app, you would save this data to your backend
    setUser({
      ...user,
      description: editData.description,
      interests: editData.interests,
    });
    setIsEditing(false);
    toast({
      title: "Perfil Actualizado",
      description: "Tu perfil ha sido actualizado correctamente.",
    });
  };

  const handleInterestsChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.currentTarget.value) {
      e.preventDefault();
      const newInterest = e.currentTarget.value.trim();
      if (newInterest && !editData.interests.includes(newInterest)) {
        setEditData((prev) => ({
          ...prev,
          interests: [...prev.interests, newInterest],
        }));
        e.currentTarget.value = "";
      }
    }
  };
  
  const handleRemoveInterest = (interestToRemove: string) => {
    setEditData(prev => ({
        ...prev,
        interests: prev.interests.filter(interest => interest !== interestToRemove)
    }));
  };

  const handleImageChange = () => {
    toast({
        title: "Función no implementada",
        description: "En una aplicación real, esto abriría un diálogo para subir una imagen.",
    });
  }

  return (
    <div className="p-4 sm:p-6 h-full flex items-center justify-center">
      <Card className="w-full max-w-3xl">
        <CardHeader className="text-center relative">
          {isOwner && (
            <div className="absolute top-4 right-4 flex gap-2">
              {isEditing ? (
                <>
                  <Button onClick={handleSave}>
                    <Save className="mr-2 h-4 w-4" /> Guardar
                  </Button>
                  <Button variant="outline" onClick={handleEditToggle}>
                    <X className="mr-2 h-4 w-4" /> Cancelar
                  </Button>
                </>
              ) : (
                <Button variant="outline" onClick={handleEditToggle}>
                  <Edit className="mr-2 h-4 w-4" /> Editar Perfil
                </Button>
              )}
            </div>
          )}
          <div className="relative w-32 h-32 mx-auto">
             <UserAvatarWithStatus user={user} className="w-32 h-32" />
             {isEditing && (
                 <Button size="icon" variant="outline" className="absolute bottom-1 right-1 rounded-full h-8 w-8" onClick={handleImageChange}>
                    <Camera className="h-4 w-4"/>
                    <span className="sr-only">Cambiar imagen</span>
                 </Button>
             )}
          </div>
          <CardTitle className="text-3xl mt-4">{user.name}</CardTitle>
          <CardDescription>{user.email}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-semibold text-lg mb-2">Sobre mí</h3>
            {isEditing ? (
              <Textarea
                placeholder="Escribe algo sobre ti..."
                value={editData.description}
                onChange={(e) =>
                  setEditData({ ...editData, description: e.target.value })
                }
                rows={4}
              />
            ) : (
              <p className="text-muted-foreground">
                {user.description || "Este usuario aún no ha añadido una descripción."}
              </p>
            )}
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">Gustos</h3>
            <div className="flex flex-wrap gap-2">
              {isEditing ? (
                <>
                  {editData.interests.map((interest) => (
                    <Badge key={interest} variant="secondary" className="text-base">
                      {interest}
                      <button onClick={() => handleRemoveInterest(interest)} className="ml-2 rounded-full hover:bg-destructive/20 p-0.5">
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                   <Input
                        placeholder="Añadir gusto y presionar Enter"
                        onKeyDown={handleInterestsChange}
                        className="h-8 flex-1 min-w-[200px]"
                    />
                </>
              ) : (
                <>
                  {user.interests && user.interests.length > 0 ? (
                    user.interests.map((interest) => (
                      <Badge key={interest} variant="secondary" className="text-base">
                        {interest}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No se han añadido gustos.
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
}
