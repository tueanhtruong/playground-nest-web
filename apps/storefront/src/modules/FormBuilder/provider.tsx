import React, { PropsWithChildren } from 'react';
import {
  FormBuilderContextProvider,
  FormBuilderContextType,
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

const reducer = (state: FormBuilderContextType, action: FormAction) => {
  switch (action.type) {
    case FormActionType.UPSERT:
      return { ...state, ...action.payload };
    case FormActionType.EDIT:
      return { ...state, ...action.payload };
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

const emptyFunction = () => {};

export const FormBuilderProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [state, dispatch] = React.useReducer(reducer, {
    uiSchema: [],
    setEditingItem: emptyFunction,
    deleteItem: emptyFunction,
    handleUpsertItems: emptyFunction,
  });

  const setEditingItem = (
    schema: EnumValues<typeof SchemaTypes>,
    id: string,
  ) => {
    dispatch({
      type: FormActionType.EDIT,
      payload: {
        editingItem: { schema, id },
      },
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

  const deleteItem = (schema: EnumValues<typeof SchemaTypes>, id: string) => {
    dispatch({
      type: FormActionType.DELETE,
      payload: {
        deletingItem: { schema, id },
      },
    });
  };

  return (
    <FormBuilderContextProvider
      value={{
        ...state,
        setEditingItem,
        handleUpsertItems,
        deleteItem,
      }}
    >
      {children}
    </FormBuilderContextProvider>
  );
};
