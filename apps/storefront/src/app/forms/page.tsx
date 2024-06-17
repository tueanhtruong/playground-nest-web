'use client';

import React from 'react';
import { RequireSignInPlaceholder } from 'src/components';
import {
  AuthenticationAction,
  AuthenticationState,
  authentication,
} from 'src/modules';

export default function Store() {
  const [state, setState] = React.useState<AuthenticationAction>({});
  const { isAuthenticated } = state;
  React.useEffect(() => {
    return AuthenticationState.subscribe(setState);
  }, []);
  return (
    <>
      <h1 className="title">This is Forms Page</h1>
      {!isAuthenticated ? (
        <RequireSignInPlaceholder
          onSignIn={() => authentication({ openSignIn: true })}
        />
      ) : null}
    </>
  );
}
