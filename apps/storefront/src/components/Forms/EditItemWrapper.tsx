import { Flex } from '@mantine/core';
import { PropsWithChildren } from 'react';

export type EditItemWrapperProps = PropsWithChildren<{
  schemaType: string;
  id: string;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}>;

export const EditItemWrapper: React.FC<EditItemWrapperProps> = ({
  children,
}) => {
  return (
    <div className="relative p-1">
      {children}
      <Flex className="absolute top-0 right-16 p-1"></Flex>
    </div>
  );
};
