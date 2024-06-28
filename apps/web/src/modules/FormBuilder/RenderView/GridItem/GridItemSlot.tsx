type GridItemSlotProps = React.PropsWithChildren<{
  id: string;
  index: number;
}>;

export const GridItemSlot: React.FC<GridItemSlotProps> = ({
  children,
  index,
  id,
}) => <div data-grid-item-slot-index={`${id}-${index}`}>{children}</div>;
