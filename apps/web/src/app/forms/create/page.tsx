'use client';

import { Grid } from '@mantine/core';
import { EditItemWrapper, Panel } from 'src/components';
import { useProtectedRoute } from 'src/modules';
import { EditDrawer, FormBuilderProvider } from 'src/modules/FormBuilder';

export default function Store() {
  const { PlaceholderElement } = useProtectedRoute();

  return (
    <FormBuilderProvider>
      <Grid>
        <Grid.Col span={4}>
          <Panel stickyHeight />
        </Grid.Col>
        <Grid.Col span={8}>
          <Panel>
            <EditItemWrapper schemaType="uiSchema" id="1">
              <div className="w-full h-[100px] bg-white rounded-lg" />
            </EditItemWrapper>
          </Panel>
        </Grid.Col>
      </Grid>
      <EditDrawer />
      {PlaceholderElement}
    </FormBuilderProvider>
  );
}
