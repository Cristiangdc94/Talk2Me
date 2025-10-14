
'use client';

import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { UserListCard } from "@/components/chat/user-list-card";
import { User } from "@/lib/types";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, GripVertical } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { cn } from '@/lib/utils';

interface CoworkersListProps {
  title: string;
  description: string;
  initialGroupedUsers: Record<string, User[]>;
}

export function CoworkersList({
  title,
  description,
  initialGroupedUsers,
}: CoworkersListProps) {
  const [groupedUsers, setGroupedUsers] = useState(initialGroupedUsers);

  useEffect(() => {
    setGroupedUsers(initialGroupedUsers);
  }, [initialGroupedUsers]);

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
    }

    setGroupedUsers(newGroupedUsers);
  };

  return (
    <div className="flex flex-col h-full gap-6 p-4 sm:p-6">
      <div className="shrink-0">
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <div className="space-y-4">
          {Object.entries(groupedUsers).map(([company, users]) => (
            <Collapsible key={company} defaultOpen>
              <Card>
                <CollapsibleTrigger className="w-full p-4 group">
                  <div className='flex justify-between items-center'>
                    <h3 className="text-lg font-semibold">{company}</h3>
                    <ChevronDown className="h-5 w-5 transition-transform duration-200 group-data-[state=open]:-rotate-180" />
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="p-4 pt-0">
                    <Droppable droppableId={company} direction="horizontal">
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className={cn("grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 transition-colors", snapshot.isDraggingOver ? 'bg-accent' : 'bg-transparent')}
                        >
                          {users.map((user, index) => (
                            <Draggable key={user.id} draggableId={user.id} index={index}>
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  className="relative group/item"
                                >
                                  <div {...provided.dragHandleProps} className="absolute top-2 right-2 p-1 bg-background/50 rounded-md opacity-0 group-hover/item:opacity-100 transition-opacity cursor-grab active:cursor-grabbing">
                                    <GripVertical className="h-5 w-5 text-muted-foreground" />
                                  </div>
                                  <UserListCard user={user} />
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}
