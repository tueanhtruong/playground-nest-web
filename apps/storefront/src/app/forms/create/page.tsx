'use client';

import { Grid } from '@mantine/core';
import { Panel } from 'src/components';
import { useProtectedRoute } from 'src/modules';

export default function Store() {
  const { PlaceholderElement } = useProtectedRoute();

  return (
    <>
      <Grid>
        <Grid.Col span={4}>
          <Panel stickyHeight />
        </Grid.Col>
        <Grid.Col span={8}>
          <Panel />
        </Grid.Col>
      </Grid>
      {PlaceholderElement}
    </>
  );
}
