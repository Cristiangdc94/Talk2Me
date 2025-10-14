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
            title: "Channel Created",
            description: "Your new channel has been successfully created.",
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
          <DialogTitle>Create a new channel</DialogTitle>
          <DialogDescription>
            Channels are where your team communicates. They’re best when organized around a topic — #marketing, for example.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" placeholder="# e.g. marketing" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Visibility</Label>
            <RadioGroup defaultValue="public" className="col-span-3 space-y-2">
              <div>
                <RadioGroupItem value="public" id="public" className="peer sr-only" />
                <Label
                  htmlFor="public"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                    <div className="flex items-center w-full justify-between">
                        <p className="font-semibold">Public</p>
                        <Hash className="h-5 w-5"/>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">Anyone in your workspace can view and join this channel.</p>
                </Label>
              </div>
              <div>
                <RadioGroupItem value="private" id="private" className="peer sr-only" />
                <Label
                  htmlFor="private"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                    <div className="flex items-center w-full justify-between">
                        <p className="font-semibold">Private</p>
                        <Lock className="h-5 w-5"/>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">Only specific people can view and join this channel.</p>
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleCreateChannel}>Create Channel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
