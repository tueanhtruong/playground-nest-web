'use client';

import { Button } from '@mantine/core';
import { authentication } from 'src/modules';

export default function Store() {
  return (
    <div className="container">
      <h1 className="title">Dev Page</h1>
      <Button onClick={() => authentication({ openSignIn: true })}>
        Sign In
      </Button>
    </div>
  );
}
