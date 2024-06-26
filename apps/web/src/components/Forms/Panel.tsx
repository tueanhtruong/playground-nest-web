import { Flex } from '@mantine/core';
import React, { PropsWithChildren } from 'react';

export type PanelProps = PropsWithChildren<{
  stickyHeight?: boolean;
}>;

export const Panel: React.FC<PanelProps> = ({ stickyHeight, children }) => {
  return (
    <Flex
      direction={'column'}
      className="rounded-lg w-full bg-primary-100 p-6"
      style={stickyHeight ? { height: 'calc(100vh - 6rem)' } : undefined}
    >
      {children}
    </Flex>
  );
};
