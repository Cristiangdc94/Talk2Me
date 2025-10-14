
'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const allCategories = [
  { id: 'technology', label: 'Tecnología' },
  { id: 'business', label: 'Negocios' },
  { id: 'sports', label: 'Deportes' },
  { id: 'health', label: 'Salud' },
  { id: 'entertainment', label: 'Entretenimiento' },
];

interface NewsPreferencesDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSave: (preferences: string[]) => void;
  currentPreferences: string[];
}

export function NewsPreferencesDialog({
  isOpen,
  onOpenChange,
  onSave,
  currentPreferences,
}: NewsPreferencesDialogProps) {
  const [selected, setSelected] = useState<string[]>(currentPreferences);

  const handleCheckboxChange = (categoryId: string) => {
    setSelected((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleSave = () => {
    onSave(selected);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Personaliza tus Noticias</DialogTitle>
          <DialogDescription>
            Elige las categorías que más te interesan para recibir noticias a tu medida.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {allCategories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={category.id}
                checked={selected.includes(category.id)}
                onCheckedChange={() => handleCheckboxChange(category.id)}
              />
              <Label htmlFor={category.id} className="cursor-pointer">
                {category.label}
              </Label>
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button onClick={handleSave}>Guardar Preferencias</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
