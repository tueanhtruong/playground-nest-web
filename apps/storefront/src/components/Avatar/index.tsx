import { Button, Flex, Text } from '@mantine/core';
import React from 'react';
import {
  AuthenticationAction,
  AuthenticationState,
  authentication,
  useGetMyProfile,
} from 'src/modules';

export const UserNameDisplay: React.FC = () => {
  const [state, setState] = React.useState<AuthenticationAction>({});
  const { data, refetch } = useGetMyProfile({ enabled: false });

  React.useEffect(() => {
    if (state.isAuthenticated) {
      refetch();
    }
  }, [state]);

  React.useEffect(() => {
    return AuthenticationState.subscribe(setState);
  }, []);

  const isShowAvatar = state.isAuthenticated && data;

  return isShowAvatar ? (
    <Flex gap={'md'}>
      <Text>{data.data.displayName}</Text>
      <Button onClick={() => authentication({ isAuthenticated: false })}>
        Sign Out
      </Button>
    </Flex>
  ) : (
    <Button onClick={() => authentication({ openSignIn: true })}>
      Sign In
    </Button>
  );
};
