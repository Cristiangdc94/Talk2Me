
'use client';

import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { UserListCard } from "@/components/chat/user-list-card";
import { User } from "@/lib/types";
import { GripVertical, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { cn } from '@/lib/utils';
import { ScrollArea } from '../ui/scroll-area';
import { CreateCompanyGroupDialog } from './create-company-group-dialog';

interface CoworkersListProps {
  initialGroupedUsers: Record<string, User[]>;
}

function CreateGroupCard({ onClick }: { onClick: () => void }) {
    return (
        <Card
            className="h-full flex flex-col items-center justify-center text-center transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer bg-muted/30 hover:bg-muted/60"
            onClick={onClick}
        >
            <CardContent className="p-4 flex flex-col items-center justify-center gap-2">
                <Plus className="h-8 w-8 text-muted-foreground" />
                <p className="font-semibold text-sm">Crear Grupo de Empresa</p>
            </CardContent>
        </Card>
    );
}

export function CoworkersList({
  initialGroupedUsers,
}: CoworkersListProps) {
  const [groupedUsers, setGroupedUsers] = useState(initialGroupedUsers);
  const [isBrowser, setIsBrowser] = useState(false);
  const [isCreateGroupOpen, setCreateGroupOpen] = useState(false);

  useEffect(() => {
    setGroupedUsers(initialGroupedUsers);
  }, [initialGroupedUsers]);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleOnDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    const sourceDroppableId = source.droppableId;
    const destDroppableId = destination.droppableId;

    const newGroupedUsers = { ...groupedUsers };

    if (sourceDroppableId === destDroppableId) {
      const items = Array.from(newGroupedUsers[sourceDroppableId]);
      const [reorderedItem] = items.splice(source.index, 1);
      items.splice(destination.index, 0, reorderedItem);
      newGroupedUsers[sourceDroppableId] = items;
    } else {
      const sourceItems = Array.from(newGroupedUsers[sourceDroppableId]);
      const destItems = Array.from(newGroupedUsers[destDroppableId] || []);
      const [movedItem] = sourceItems.splice(source.index, 1);
      
      movedItem.company = destDroppableId === 'Otros' ? undefined : destDroppableId;

      destItems.splice(destination.index, 0, movedItem);
      
      newGroupedUsers[sourceDroppableId] = sourceItems;
      newGroupedUsers[destDroppableId] = destItems;
    }

    setGroupedUsers(newGroupedUsers);
  };

  const handleCreateGroup = (companyName: string) => {
    if (companyName && !groupedUsers[companyName]) {
        setGroupedUsers(prev => ({
            ...prev,
            [companyName]: []
        }));
    }
    setCreateGroupOpen(false);
  };
  
  if (!isBrowser) {
      return null;
  }

  return (
    <>
        <CreateCompanyGroupDialog 
            isOpen={isCreateGroupOpen}
            onOpenChange={setCreateGroupOpen}
            onCreate={handleCreateGroup}
        />
        <div className="flex-1 overflow-x-auto px-4 sm:px-6 pb-6">
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <div className="flex gap-6 h-full">
            {Object.entries(groupedUsers).map(([company, users]) => (
                <div key={company} className="w-[320px] shrink-0 h-full">
                <Card className="h-full flex flex-col bg-muted/50">
                    <CardHeader>
                        <CardTitle className='font-bold text-lg'>{company}</CardTitle>
                        <CardDescription className='text-sm text-muted-foreground'>Descripción del grupo de la empresa.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 overflow-hidden p-0">
                        <ScrollArea className="h-full">
                            <Droppable droppableId={company} direction="vertical">
                            {(provided, snapshot) => (
                                <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className={cn(
                                    "space-y-4 transition-colors p-4 min-h-[100px]", 
                                    snapshot.isDraggingOver ? 'bg-accent' : 'bg-transparent'
                                )}
                                >
                                {users.map((user, index) => (
                                    <Draggable key={user.id} draggableId={user.id} index={index}>
                                    {(provided, snapshot) => (
                                        <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        className={cn(
                                            "relative group/item",
                                            snapshot.isDragging && "shadow-lg rounded-lg"
                                        )}
                                        >
                                        <div {...provided.dragHandleProps} className="absolute top-2 right-2 p-1 bg-background/50 rounded-md opacity-0 group-hover/item:opacity-100 transition-opacity cursor-grab active:cursor-grabbing z-10">
                                            <GripVertical className="h-5 w-5 text-muted-foreground" />
                                        </div>
                                        <UserListCard user={user} />
                                        </div>
                                    )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                                {users.length === 0 && (
                                    <div className="text-center py-4 text-sm text-muted-foreground h-24 flex items-center justify-center">
                                    Arrastra un compañero aquí
                                    </div>
                                )}
                                </div>
                            )}
                            </Droppable>
                        </ScrollArea>
                    </CardContent>
                </Card>
                </div>
            ))}
             <div className="w-[320px] shrink-0 h-full">
                <CreateGroupCard onClick={() => setCreateGroupOpen(true)} />
            </div>
            </div>
        </DragDropContext>
        </div>
    </>
  );
}
