"use client";

import * as React from "react";
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
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Hash, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type CreateChannelDialogProps = React.ComponentProps<typeof Dialog>;

export function CreateChannelDialog(props: CreateChannelDialogProps) {
    const { toast } = useToast();
    
    const handleCreateChannel = () => {
        // In a real app, you would handle channel creation logic here
        toast({
            title: "Canal Creado",
            description: "Tu nuevo canal ha sido creado exitosamente.",
        });
        // This should also trigger a refresh of the channel list
        if (props.onOpenChange) {
            props.onOpenChange(false);
        }
    };

  return (
    <Dialog {...props}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Crear un nuevo canal</DialogTitle>
          <DialogDescription>
            Los canales son donde tu equipo se comunica. Son mejores cuando se organizan en torno a un tema, #marketing, por ejemplo.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nombre
            </Label>
            <Input id="name" placeholder="# ej. marketing" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Visibilidad</Label>
            <RadioGroup defaultValue="public" className="col-span-3 space-y-2">
              <div>
                <RadioGroupItem value="public" id="public" className="peer sr-only" />
                <Label
                  htmlFor="public"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                    <div className="flex items-center w-full justify-between">
                        <p className="font-semibold">Público</p>
                        <Hash className="h-5 w-5"/>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">Cualquiera en tu espacio de trabajo puede ver y unirse a este canal.</p>
                </Label>
              </div>
              <div>
                <RadioGroupItem value="private" id="private" className="peer sr-only" />
                <Label
                  htmlFor="private"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                    <div className="flex items-center w-full justify-between">
                        <p className="font-semibold">Privado</p>
                        <Lock className="h-5 w-5"/>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">Solo personas específicas pueden ver y unirse a este canal.</p>
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleCreateChannel}>Crear Canal</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
