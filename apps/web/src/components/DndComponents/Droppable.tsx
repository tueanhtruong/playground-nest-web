import { useDroppable } from '@dnd-kit/core';
import React from 'react';
import { OverridableComponentProps } from 'src/hooks';

export type DroppableProps = OverridableComponentProps<
  'div',
  {
    id: string;
  }
>;

export const Droppable: React.FC<DroppableProps> = (props) => {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });
  const style = {
    opacity: isOver ? 1 : 0.5,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
};
