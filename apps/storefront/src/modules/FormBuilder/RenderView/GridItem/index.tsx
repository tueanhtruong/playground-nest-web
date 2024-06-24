import {
  GridBuilderType,
  useFormBuilderContext,
} from 'src/modules/FormBuilder';

export type GridItemRenderViewProps = {
  id: string;
  item: GridBuilderType;
};

export const GridItem: React.FC<GridItemRenderViewProps> = ({ id }) => {
  const { uiSchema } = useFormBuilderContext();
  const renderItem = uiSchema.find((item) => item.id === id);
  if (!renderItem) return null;
  return <></>;
};
