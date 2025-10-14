
'use client';

import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { UserListCard } from "@/components/chat/user-list-card";
import { User } from "@/lib/types";
import { GripVertical } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { cn } from '@/lib/utils';
import { ScrollArea } from '../ui/scroll-area';

interface CoworkersListProps {
  initialGroupedUsers: Record<string, User[]>;
}

export function CoworkersList({
  initialGroupedUsers,
}: CoworkersListProps) {
  const [groupedUsers, setGroupedUsers] = useState(initialGroupedUsers);
  const [isBrowser, setIsBrowser] = useState(false);

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
      // Reordering within the same list
      const items = Array.from(newGroupedUsers[sourceDroppableId]);
      const [reorderedItem] = items.splice(source.index, 1);
      items.splice(destination.index, 0, reorderedItem);
      newGroupedUsers[sourceDroppableId] = items;
    } else {
      // Moving from one list to another
      const sourceItems = Array.from(newGroupedUsers[sourceDroppableId]);
      const destItems = Array.from(newGroupedUsers[destDroppableId] || []);
      const [movedItem] = sourceItems.splice(source.index, 1);
      
      // Update company property of the moved item
      movedItem.company = destDroppableId === 'Otros' ? undefined : destDroppableId;

      destItems.splice(destination.index, 0, movedItem);
      
      newGroupedUsers[sourceDroppableId] = sourceItems;
      newGroupedUsers[destDroppableId] = destItems;

      // Do not delete empty groups as they serve as drop targets
      // if (newGroupedUsers[sourceDroppableId].length === 0) {
      //   delete newGroupedUsers[sourceDroppableId];
      // }
    }

    setGroupedUsers(newGroupedUsers);
  };
  
  // react-beautiful-dnd doesn't work with SSR, so we only render it on the client
  if (!isBrowser) {
      return null;
  }

  return (
    <div className="flex-1 overflow-x-auto px-4 sm:px-6 pb-6">
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <div className="flex gap-6 h-full">
          {Object.entries(groupedUsers).map(([company, users]) => (
            <div key={company} className="w-[320px] shrink-0 h-full">
               <Card className="h-full flex flex-col bg-muted/50">
                  <CardHeader>
                    <CardTitle className='text-lg'>{company}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 overflow-hidden">
                    <ScrollArea className="h-full">
                        <Droppable droppableId={company} direction="vertical">
                        {(provided, snapshot) => (
                            <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className={cn(
                                "space-y-4 transition-colors p-1", 
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
        </div>
      </DragDropContext>
    </div>
  );
}
