import { Button, Flex, Text } from '@mantine/core';
import React from 'react';
import {
  AuthenticationAction,
  AuthenticationState,
  authentication,
  useGetMyProfile,
  useSignOut,
} from 'src/modules';

export const UserNameDisplay: React.FC = () => {
  const [state, setState] = React.useState<AuthenticationAction>({});
  const { data, isFetching } = useGetMyProfile({
    enabled: state.isAuthenticated === true,
  });
  const { signOut } = useSignOut();

  React.useEffect(() => {
    return AuthenticationState.subscribe(setState);
  }, []);

  const isShowAvatar = state.isAuthenticated && data;

  return isShowAvatar ? (
    <Flex gap={'md'}>
      <Text>{data.data.displayName}</Text>
      <Button onClick={signOut}>Sign Out</Button>
    </Flex>
  ) : (
    <Button
      onClick={() => authentication({ openSignIn: true })}
      loading={isFetching}
    >
      Sign In
    </Button>
  );
};
