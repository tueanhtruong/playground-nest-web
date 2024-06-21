import React from 'react';
import { EnumValues } from './provider';

export type GridBuilderType = {
  id: string;
  columns: number;
  refNames: { [key: string]: string };
};

export const SchemaTypes = {
  UI_SCHEMA: 'uiSchema',
  FORM_SCHEMA: 'formSchema',
} as const;

export type FormBuilderContextType = {
  uiSchema: GridBuilderType[];
  editingItem?: { schema: EnumValues<typeof SchemaTypes>; id: string };
  setEditingItem: (schema: EnumValues<typeof SchemaTypes>, id: string) => void;
  deleteItem: (schema: EnumValues<typeof SchemaTypes>, id: string) => void;
  handleUpsertItems: (schema: GridBuilderType[]) => void;
  selectedItem?: GridBuilderType;
};

export const FormBuilderContext =
  React.createContext<FormBuilderContextType | null>(null);

export const FormBuilderContextProvider = FormBuilderContext.Provider;

export const useFormBuilderContext = () => {
  const context = React.useContext(FormBuilderContext);

  if (!context) {
    throw new Error(
      'useFormBuilderContext must be used within a FormBuilderProvider',
    );
  }

  return context;
};
