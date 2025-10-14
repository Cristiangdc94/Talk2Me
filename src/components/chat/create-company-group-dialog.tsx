
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

interface CreateCompanyGroupDialogProps extends React.ComponentProps<typeof Dialog> {
  onCreate: (companyName: string) => void;
}

export function CreateCompanyGroupDialog({ onCreate, ...props }: CreateCompanyGroupDialogProps) {
    const [companyName, setCompanyName] = React.useState('');

    const handleCreate = () => {
        if(companyName.trim()) {
            onCreate(companyName.trim());
            setCompanyName(''); // Reset for next time
            if (props.onOpenChange) {
                props.onOpenChange(false);
            }
        }
    };

    const handleOpenChange = (open: boolean) => {
        if (!open) {
            setCompanyName(''); // Reset on close
        }
        if (props.onOpenChange) {
            props.onOpenChange(open);
        }
    };


  return (
    <Dialog {...props} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Crear Grupo de Empresa</DialogTitle>
          <DialogDescription>
            Introduce un nombre para tu nuevo grupo de empresa. Podrás arrastrar compañeros a este grupo.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nombre
            </Label>
            <Input 
                id="name" 
                placeholder="Nombre de la empresa" 
                className="col-span-3"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        handleCreate();
                    }
                }}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleCreate}>Crear Grupo</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
