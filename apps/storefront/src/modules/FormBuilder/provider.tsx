import React, { PropsWithChildren } from 'react';
import {
  FormBuilderContextProvider,
  FormBuilderContextType,
  GridBuilderType,
  SchemaTypes,
} from './context';

export type EnumValues<T> = T[keyof T];

export const FormActionType = {
  UPSERT: 'upsert',
  EDIT: 'edit',
  DELETE: 'delete',
} as const;

type FormAction = {
  type: EnumValues<typeof FormActionType>;
  payload: Partial<
    FormBuilderContextType & {
      deletingItem: { schema: EnumValues<typeof SchemaTypes>; id: string };
    }
  >;
};

const reducer = (
  state: FormBuilderContextType,
  action: FormAction,
): FormBuilderContextType => {
  switch (action.type) {
    case FormActionType.UPSERT:
      return { ...state, ...action.payload };
    case FormActionType.EDIT:
      const { editingItem } = action.payload;

      if (editingItem) {
        const { schema, id } = editingItem;

        if (schema && id) {
          const schemaItems = schema === 'uiSchema' ? state.uiSchema : [];
          return {
            ...state,
            editingItem: { schema, id },
            selectedItem: {
              schema,
              item: schemaItems.find(
                (item) => item.id === id,
              ) as GridBuilderType,
            },
          };
        }
      }

      return { ...state, editingItem: undefined, selectedItem: undefined };
    case FormActionType.DELETE:
      const { deletingItem } = action.payload;
      if (deletingItem) {
        return {
          ...state,
          uiSchema: state.uiSchema.filter(
            (item) => item.id !== deletingItem.id,
          ),
        };
      }
    default:
      return state;
  }
};

export const emptyFunction = (...args: any[]) => {};

export const FormBuilderProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [state, dispatch] = React.useReducer(reducer, {
    uiSchema: [
      {
        id: '1',
        columns: 1,
        refNames: {},
      },
    ],
    setEditingItem: emptyFunction,
    deleteItem: emptyFunction,
    handleUpsertItems: emptyFunction,
  });

  const setEditingItem = (item?: {
    schema: EnumValues<typeof SchemaTypes>;
    id: string;
  }) => {
    dispatch({
      type: FormActionType.EDIT,
      payload: item ? { editingItem: item } : {},
    });
  };

  const handleUpsertItems = (schema: FormBuilderContextType['uiSchema']) => {
    dispatch({
      type: FormActionType.UPSERT,
      payload: {
        uiSchema: schema,
      },
    });
  };

  const deleteItem = (item?: {
    schema: EnumValues<typeof SchemaTypes>;
    id: string;
  }) => {
    dispatch({
      type: FormActionType.DELETE,
      payload: item ? { deletingItem: item } : {},
    });
  };

  return (
    <FormBuilderContextProvider
      value={{
        ...state,
        handleUpsertItems,
        deleteItem,
        setEditingItem,
      }}
    >
      {children}
    </FormBuilderContextProvider>
  );
};
