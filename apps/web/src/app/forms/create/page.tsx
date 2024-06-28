'use client';

import { Panel } from 'src/components';
import { useProtectedRoute } from 'src/modules';
import {
  DropPanel,
  EditDrawer,
  FormBuilderProvider,
} from 'src/modules/FormBuilder';
import styles from './styles.module.scss';

export default function Store() {
  const { PlaceholderElement } = useProtectedRoute();

  return (
    <FormBuilderProvider>
      <div className={styles['grid-wrapper']}>
        <Panel stickyHeight className="sticky top-0" />
        <DropPanel />
      </div>

      <EditDrawer />
      {PlaceholderElement}
    </FormBuilderProvider>
  );
}
