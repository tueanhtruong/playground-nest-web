import { ActionIcon, Flex } from '@mantine/core';
import { PropsWithChildren } from 'react';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import { callAllHandlers } from 'src/hooks';
import {
  EnumValues,
  SchemaTypes,
  useFormBuilderContext,
} from 'src/modules/FormBuilder';
import styles from './styles.module.scss';

export type EditItemWrapperProps = PropsWithChildren<
  Partial<{
    schemaType: EnumValues<typeof SchemaTypes>;
    id: string;
    onEdit: (e: React.MouseEvent) => void;
    onDelete: (e: React.MouseEvent) => void;
  }>
>;

export const EditItemWrapper: React.FC<EditItemWrapperProps> = ({
  children,
  onDelete,
  onEdit,
  schemaType,
  id = '',
}) => {
  const { setEditingItem, deleteItem } = useFormBuilderContext();
  return (
    <div className={styles.wrapper}>
      <Flex className={styles['floating-buttons']}>
        <ActionIcon.Group>
          <ActionIcon
            variant="white"
            size="md"
            aria-label="Edit Item"
            onClick={callAllHandlers(onEdit, () =>
              schemaType ? setEditingItem(schemaType, id) : undefined,
            )}
            radius={0}
          >
            <FaRegEdit />
          </ActionIcon>
          <ActionIcon
            variant="white"
            size="md"
            aria-label="Delete Item"
            onClick={callAllHandlers(onDelete, () =>
              schemaType ? deleteItem(schemaType, id) : undefined,
            )}
            color="red"
            radius={0}
          >
            <FaRegTrashAlt />
          </ActionIcon>
        </ActionIcon.Group>
      </Flex>
      <div className={styles.item}>{children}</div>
    </div>
  );
};
