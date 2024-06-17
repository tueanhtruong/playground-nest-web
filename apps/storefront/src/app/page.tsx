'use client';

import { Text } from '@mantine/core';
import Link from 'next/link';
import { UserNameDisplay } from 'src/components';
import { ROUTES } from 'src/constants';

export default function Store() {
  return (
    <>
      <h1 className="title">Dev Page</h1>
      <UserNameDisplay />
      <Link href={ROUTES.forms}>
        <Text size="sm" c="blue">
          Forms Page
        </Text>
      </Link>
      <Link href={ROUTES.createForm}>
        <Text size="sm" c="blue">
          Create a Form Page
        </Text>
      </Link>
    </>
  );
}
